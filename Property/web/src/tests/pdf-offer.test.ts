/**
 * Paid workings-PDF test: the pure helpers plus both routes.
 *
 * The guard that matters most is in the POST block: adminInsert must be called
 * with `calc_pdf_requests` and never with `leads` or `lead_contact_events`, so a
 * purchase can never fire the lead notification or the partner CC.
 *
 * Mocking style mirrors leads-submit.test.ts.
 */
import { describe, it, expect, vi, beforeEach } from "vitest";

const mockAdminSelect = vi.fn();
const mockAdminInsert = vi.fn();
const mockAdminConfigured = vi.fn(() => true);

vi.mock("@/lib/supabase/admin", () => ({
  adminConfigured: () => mockAdminConfigured(),
  adminSelect: (...args: unknown[]) => mockAdminSelect(...args),
  adminInsert: (...args: unknown[]) => mockAdminInsert(...args),
}));

import {
  PDF_TOOLS,
  PDF_PAYLOAD_MAX_BYTES,
  buildPdfRequest,
  parseOfferFlag,
} from "@/lib/calculators/premium/pdfRequest";
import { GET } from "@/app/api/calc/pdf-offer/route";
import { POST } from "@/app/api/calc/pdf-request/route";
import type { PremiumResult } from "@/lib/calculators/premium/types";

const LINK = "https://buy.stripe.com/test_abc123";

const result = {
  headline: { label: "Capital gains tax", value: "£12,345" },
  breakdown: [{ label: "Gain", value: "£50,000" }],
  scenarioResults: [{ id: "a", label: "Personal", headline: { label: "Tax", value: "£1" } }],
  chart: { data: [{ name: "x", v: 1 }] },
} as unknown as PremiumResult;

const base = {
  toolId: "capital-gains-premium",
  placement: "blog",
  values: { gain: 50000, fn: (() => 1) as unknown as number },
  rows: [{ id: "r1", label: "Flat", value: 100 }],
  scenario: "personal",
  result,
};

function post(body: unknown) {
  return POST(
    new Request("https://x/api/calc/pdf-request", {
      method: "POST",
      headers: { "user-agent": "vitest" },
      body: typeof body === "string" ? body : JSON.stringify(body),
    }),
  );
}

beforeEach(() => {
  vi.clearAllMocks();
  mockAdminConfigured.mockReturnValue(true);
});

describe("PDF_TOOLS", () => {
  it("is exactly the three premium tools", () => {
    expect([...PDF_TOOLS].sort()).toEqual([
      "capital-gains-premium",
      "incorporation-premium",
      "section-24-premium",
    ]);
  });
});

describe("buildPdfRequest", () => {
  it("keeps the figures and drops chart plus functions", () => {
    const body = buildPdfRequest(base)!;
    expect(body.tool_id).toBe("capital-gains-premium");
    expect(body.placement).toBe("blog");
    expect(body.values).toEqual({ gain: 50000 });
    expect(body.rows).toEqual([{ id: "r1", label: "Flat", value: 100 }]);
    expect(body.scenario).toBe("personal");
    expect(body.result.headline).toEqual(result.headline);
    expect(body.result.breakdown).toEqual(result.breakdown);
    expect(body.result.scenarioResults).toEqual(result.scenarioResults);
    expect(JSON.stringify(body)).not.toContain("chart");
  });

  it("is null for a foreign tool", () => {
    expect(buildPdfRequest({ ...base, toolId: "stamp-duty-premium" })).toBeNull();
  });

  it("is null over 32KB", () => {
    const rows = Array.from({ length: 2000 }, (_, i) => ({ id: `r${i}`, label: "x".repeat(40) }));
    expect(buildPdfRequest({ ...base, rows })).toBeNull();
    expect(JSON.stringify(rows).length).toBeGreaterThan(PDF_PAYLOAD_MAX_BYTES);
  });
});

describe("parseOfferFlag", () => {
  it("reads a live row", () => {
    expect(parseOfferFlag({ enabled: true, link: LINK, price_gbp: 29, started_at: null })).toEqual({
      enabled: true,
      link: LINK,
      priceGbp: 29,
    });
  });

  it("reads an off row as disabled", () => {
    expect(parseOfferFlag({ enabled: false, link: LINK, price_gbp: 29 })?.enabled).toBe(false);
  });

  it("is null for a non-Stripe link, a missing link or garbage", () => {
    expect(parseOfferFlag({ enabled: true, link: "https://evil.test/x", price_gbp: 29 })).toBeNull();
    expect(parseOfferFlag({ enabled: true, price_gbp: 29 })).toBeNull();
    expect(parseOfferFlag({ enabled: true, link: LINK })).toBeNull();
    expect(parseOfferFlag("nonsense")).toBeNull();
    expect(parseOfferFlag(null)).toBeNull();
  });
});

describe("GET /api/calc/pdf-offer", () => {
  it("returns the offer when the row is on, with the CDN cache header", async () => {
    mockAdminSelect.mockResolvedValue({
      ok: true,
      data: [{ value: { enabled: true, link: LINK, price_gbp: 29 } }],
    });
    const res = await GET();
    expect(await res.json()).toEqual({ enabled: true, link: LINK, price_gbp: 29 });
    expect(res.headers.get("cache-control")).toContain("s-maxage=60");
  });

  it("is off for an off row, a missing row, a select error or no admin config", async () => {
    mockAdminSelect.mockResolvedValue({
      ok: true,
      data: [{ value: { enabled: false, link: LINK, price_gbp: 29 } }],
    });
    expect(await (await GET()).json()).toEqual({ enabled: false });

    mockAdminSelect.mockResolvedValue({ ok: true, data: [] });
    expect(await (await GET()).json()).toEqual({ enabled: false });

    mockAdminSelect.mockResolvedValue({ ok: false, data: [], error: "boom" });
    expect(await (await GET()).json()).toEqual({ enabled: false });

    mockAdminConfigured.mockReturnValue(false);
    expect(await (await GET()).json()).toEqual({ enabled: false });
    expect(mockAdminSelect).toHaveBeenCalledTimes(3);
  });
});

describe("POST /api/calc/pdf-request", () => {
  it("inserts into calc_pdf_requests and returns the id, touching no lead table", async () => {
    mockAdminInsert.mockResolvedValue({ ok: true, data: [{ id: "row-1" }] });
    const res = await post(buildPdfRequest(base));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ id: "row-1" });
    expect(mockAdminInsert).toHaveBeenCalledTimes(1);
    const [table, row] = mockAdminInsert.mock.calls[0] as [string, Record<string, unknown>];
    expect(table).toBe("calc_pdf_requests");
    expect(row.site_key).toBe("property");
    expect(row.tool_id).toBe("capital-gains-premium");
    expect(row.user_agent).toBe("vitest");
    const tables = mockAdminInsert.mock.calls.map((c) => c[0]);
    expect(tables).not.toContain("leads");
    expect(tables).not.toContain("lead_contact_events");
  });

  it("rejects an unknown tool, a bad body, an oversized body and no admin config", async () => {
    expect((await post({ tool_id: "stamp-duty-premium", values: {} })).status).toBe(400);
    expect((await post({ tool_id: "capital-gains-premium" })).status).toBe(400);
    expect((await post("{not json")).status).toBe(400);
    expect((await post({ tool_id: "capital-gains-premium", pad: "x".repeat(40000) })).status).toBe(
      413,
    );
    mockAdminConfigured.mockReturnValue(false);
    expect((await post(buildPdfRequest(base))).status).toBe(503);
    expect(mockAdminInsert).not.toHaveBeenCalled();
  });

  it("is 502 when the insert fails", async () => {
    mockAdminInsert.mockResolvedValue({ ok: false, data: [], error: "boom" });
    const res = await post(buildPdfRequest(base));
    expect(res.status).toBe(502);
    expect(await res.json()).toEqual({ error: "store_failed" });
  });
});
