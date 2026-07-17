/**
 * Post-deploy watch decision functions. Each threshold is exercised right at its
 * boundary so a future edit to a comparison operator (>, <, >=) is caught. These
 * are the pure, I/O-free core of the mini-form multi-step rollout watch.
 */
import { describe, it, expect } from "vitest";
import {
  errorShareVerdict,
  stepCompletionVerdict,
  weekOneLeadVerdict,
  volumeVerdict,
} from "@/config/deploy-watch";

describe("errorShareVerdict (ACTION when error share > 40%)", () => {
  it("PASS at 39% (below the threshold)", () => {
    expect(errorShareVerdict(39, 100).verdict).toBe("PASS");
  });

  it("PASS at exactly 40% (threshold is strict >)", () => {
    const r = errorShareVerdict(40, 100);
    expect(r.verdict).toBe("PASS");
    expect(r.action).toBeUndefined();
  });

  it("ACTION at 41% (above the threshold)", () => {
    const r = errorShareVerdict(41, 100);
    expect(r.verdict).toBe("ACTION");
    expect(r.action).toBeTruthy();
  });

  it("LOW_VOLUME when step advances are below the floor of 10 (no false ACTION on thin data)", () => {
    expect(errorShareVerdict(0, 0).verdict).toBe("LOW_VOLUME");
    expect(errorShareVerdict(14, 2).verdict).toBe("LOW_VOLUME"); // the false-alarm case: 700% share, but n=2
    expect(errorShareVerdict(5, 9).verdict).toBe("LOW_VOLUME");
  });

  it("PASS at exactly the floor (10 advances, below 40% share)", () => {
    expect(errorShareVerdict(4, 10).verdict).toBe("PASS");
  });
});

describe("stepCompletionVerdict (ACTION when step-2 completion < 35%)", () => {
  it("ACTION at 34% (below the threshold)", () => {
    const r = stepCompletionVerdict(34, 100);
    expect(r.verdict).toBe("ACTION");
    expect(r.action).toBeTruthy();
  });

  it("PASS at exactly 35% (threshold is strict <)", () => {
    const r = stepCompletionVerdict(35, 100);
    expect(r.verdict).toBe("PASS");
    expect(r.action).toBeUndefined();
  });

  it("PASS above 35% (36%)", () => {
    expect(stepCompletionVerdict(36, 100).verdict).toBe("PASS");
  });

  it("PASS when there are no step-1 completions (no data)", () => {
    expect(stepCompletionVerdict(0, 0).verdict).toBe("PASS");
  });
});

describe("weekOneLeadVerdict (ACTION when 0 leads AND weekly baseline >= 3.5)", () => {
  it("PASS with 0 leads when the baseline is 3.4 (below 3.5)", () => {
    expect(weekOneLeadVerdict(0, 3.4).verdict).toBe("PASS");
  });

  it("ACTION with 0 leads when the baseline is exactly 3.5", () => {
    const r = weekOneLeadVerdict(0, 3.5);
    expect(r.verdict).toBe("ACTION");
    expect(r.action).toBeTruthy();
  });

  it("PASS when at least one lead was captured, whatever the baseline", () => {
    expect(weekOneLeadVerdict(1, 3.5).verdict).toBe("PASS");
    expect(weekOneLeadVerdict(2, 10).verdict).toBe("PASS");
  });
});

describe("volumeVerdict (ACTION when actual < 50% of baseline)", () => {
  it("ACTION at 49% of baseline", () => {
    const r = volumeVerdict(49, 100);
    expect(r.verdict).toBe("ACTION");
    expect(r.action).toBeTruthy();
  });

  it("PASS at exactly 50% of baseline (threshold is strict <)", () => {
    const r = volumeVerdict(50, 100);
    expect(r.verdict).toBe("PASS");
    expect(r.action).toBeUndefined();
  });

  it("PASS at 51% of baseline", () => {
    expect(volumeVerdict(51, 100).verdict).toBe("PASS");
  });
});

describe("gate result copy contains no em-dashes", () => {
  it("holds across representative PASS and ACTION results", () => {
    const results = [
      errorShareVerdict(41, 100),
      stepCompletionVerdict(34, 100),
      weekOneLeadVerdict(0, 3.5),
      volumeVerdict(49, 100),
      volumeVerdict(80, 100),
    ];
    for (const r of results) {
      const blob = [r.headline, ...r.lines, r.action ?? ""].join(" ");
      expect(blob).not.toContain("—");
    }
  });
});
