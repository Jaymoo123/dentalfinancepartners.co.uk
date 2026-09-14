import { describe, it, expect } from "vitest";
import {
  summarisePdfTest,
  type PdfFlag,
  type PdfRequestRow,
  type PdfViewRow,
} from "./pdfTestData";

const NOW = new Date("2026-09-14T12:00:00.000Z");
const daysAgo = (n: number) => new Date(NOW.getTime() - n * 86400_000).toISOString();

const flag = (over: Partial<PdfFlag> = {}): PdfFlag => ({
  enabled: true,
  link: "https://buy.stripe.com/test",
  price_gbp: 29,
  started_at: daysAgo(20),
  updated_at: daysAgo(20),
  ...over,
});

const view = (over: Partial<PdfViewRow> = {}): PdfViewRow => ({
  day: daysAgo(1),
  tool_id: "capital-gains-premium",
  placement: "calculator",
  exposure_sessions: 0,
  click_sessions: 0,
  clicks: 0,
  ...over,
});

const req = (over: Partial<PdfRequestRow> = {}): PdfRequestRow => ({
  created_at: daysAgo(1),
  tool_id: "capital-gains-premium",
  placement: "calculator",
  stripe_session_id: null,
  fulfilled_at: null,
  ...over,
});

function ready(
  rows: PdfViewRow[],
  requests: PdfRequestRow[],
  f: PdfFlag = flag(),
) {
  const m = summarisePdfTest(f, rows, requests, NOW);
  if (m.state !== "ready") throw new Error(`expected ready, got ${m.state}`);
  return m;
}
const win = (m: ReturnType<typeof ready>, key: string) =>
  m.windows.find((w) => w.key === key)!;

describe("summarisePdfTest states", () => {
  it("returns not_set_up when the flag row is missing", () => {
    expect(summarisePdfTest(null, [], [], NOW)).toEqual({ state: "not_set_up" });
  });

  it("returns off_never_started when started_at is null", () => {
    const m = summarisePdfTest(flag({ started_at: null, enabled: false }), [], [], NOW);
    expect(m.state).toBe("off_never_started");
  });
});

describe("window cuts", () => {
  const rows = [
    view({ day: daysAgo(3), exposure_sessions: 10, clicks: 1 }),
    view({ day: daysAgo(10), exposure_sessions: 20, clicks: 2 }),
    view({ day: daysAgo(18), exposure_sessions: 40, clicks: 4 }),
    view({ day: daysAgo(30), exposure_sessions: 999, clicks: 99 }), // before start
  ];

  it("cuts at 7d, 14d and the start date", () => {
    const m = ready(rows, []);
    expect(win(m, "d7").exposures).toBe(10);
    expect(win(m, "d14").exposures).toBe(30);
    expect(win(m, "all").exposures).toBe(70);
    expect(win(m, "all").clicks).toBe(7);
  });
});

describe("paid and fulfilment arithmetic", () => {
  it("counts paid as rows with a stripe session, awaiting as paid minus fulfilled", () => {
    const requests = [
      req({ stripe_session_id: "cs_1", fulfilled_at: daysAgo(0) }),
      req({ stripe_session_id: "cs_2" }),
      req({ stripe_session_id: "cs_3" }),
      req(), // abandoned checkout
    ];
    const w = win(ready([], requests), "d7");
    expect(w.checkouts).toBe(4);
    expect(w.paid).toBe(3);
    expect(w.fulfilled).toBe(1);
    expect(w.awaiting).toBe(2);
    expect(w.revenue).toBe(87);
  });
});

describe("rates", () => {
  it("are null when exposures are zero", () => {
    const w = win(ready([], [req({ stripe_session_id: "cs_1" })]), "d7");
    expect(w.click_rate).toBeNull();
    expect(w.paid_rate).toBeNull();
  });

  it("divide by exposures", () => {
    const w = win(ready([view({ exposure_sessions: 200, clicks: 10 })], []), "d7");
    expect(w.click_rate).toBeCloseTo(0.05);
  });
});

describe("kill lines", () => {
  const killOf = (exposures: number, clicks: number, paid: number) => {
    const requests = Array.from({ length: paid }, (_, i) =>
      req({ stripe_session_id: `cs_${i}` }),
    );
    return win(ready([view({ exposure_sessions: exposures, clicks })], requests), "d7").kill;
  };

  it("waits below 250 exposures and clears at 250", () => {
    expect(killOf(249, 249, 249).exposures).toBe("waiting");
    expect(killOf(249, 249, 249).clicks).toBe("waiting");
    expect(killOf(250, 250, 250).exposures).toBe("build");
  });

  it("kills clicks at 1.99% and builds at 2.0%", () => {
    expect(killOf(10000, 199, 200).clicks).toBe("kill"); // 1.99%
    expect(killOf(10000, 200, 200).clicks).toBe("build"); // 2.00%
  });

  it("kills paid under 1%, extends between 1% and 2%, builds at 2%", () => {
    expect(killOf(10000, 1000, 99).paid).toBe("kill"); // 0.99%
    expect(killOf(10000, 1000, 100).paid).toBe("extend"); // 1.00%
    expect(killOf(10000, 1000, 199).paid).toBe("extend"); // 1.99%
    expect(killOf(10000, 1000, 200).paid).toBe("build"); // 2.00%
  });
});

describe("breakdowns and recent list", () => {
  it("splits by tool and placement and keeps the last 20 requests newest first", () => {
    const rows = [
      view({ tool_id: "capital-gains-premium", placement: "blog", exposure_sessions: 5, clicks: 1 }),
      view({ tool_id: "incorporation-premium", placement: "calculator", exposure_sessions: 3, clicks: 2 }),
    ];
    const requests = Array.from({ length: 25 }, (_, i) =>
      req({ created_at: daysAgo(i / 24), tool_id: "capital-gains-premium", placement: "blog" }),
    );
    const m = ready(rows, requests);
    expect(m.byTool.map((r) => r.key)).toEqual([
      "capital-gains-premium",
      "incorporation-premium",
    ]);
    expect(m.byTool[0].checkouts).toBe(25);
    expect(m.byPlacement.find((r) => r.key === "blog")!.exposures).toBe(5);
    expect(m.recent).toHaveLength(20);
    expect(m.recent[0].created_at >= m.recent[1].created_at).toBe(true);
    expect(m.dailyClicks.reduce((a, d) => a + d.clicks, 0)).toBe(3);
  });
});
