/**
 * P1-GUARD: every published tax constant matches docs/contractors-ir35/house_positions.md.
 *
 * WHY THIS SHAPE. A suite that asserts only the constants someone thought to
 * check goes green over whatever it forgot. So the gate is enumerated from
 * BOTH ends and cannot pass by omission:
 *
 *   1. EXHAUSTIVENESS. Every numeric/string leaf exported by
 *      `lib/calculators/tax2026.ts` is discovered at runtime and must appear
 *      in the EXPECTED table below. Add or rename a constant without adding a
 *      ground-truth row and this fails, rather than sailing through unchecked.
 *   2. VALUE. Each constant must equal the HP figure.
 *   3. GROUND TRUTH. Each expected value must still be stated in
 *      house_positions.md (`hpAnchor`). If HP is re-locked with a new figure
 *      the anchor stops matching and the gate fires, instead of the code
 *      quietly drifting from the document it claims to trace to.
 *
 * Figures the HP locks that are NOT held as constants get their own block at
 * the foot: the £6,708 LEL is hardcoded as a salary option in four calculator
 * files, so it is asserted where it actually lives.
 */
import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import * as tax from "@/lib/calculators/tax2026";

const HP = readFileSync(
  join(__dirname, "..", "..", "..", "..", "docs", "contractors-ir35", "house_positions.md"),
  "utf8",
);

interface Expected {
  value: number | string;
  /** Text that must still appear in house_positions.md for this figure. */
  hpAnchor: string | null;
  note?: string;
}

/** Ground truth, HP §5 (income tax and dividends), §6 (NIC), §7 (CT). */
const EXPECTED: Record<string, Expected> = {
  TAX_YEAR: { value: "2026/27", hpAnchor: "2026/27" },

  PERSONAL_ALLOWANCE: { value: 12570, hpAnchor: "Personal allowance £12,570" },
  PA_TAPER_THRESHOLD: { value: 100000, hpAnchor: "above £100,000" },
  ADDITIONAL_RATE_GROSS_THRESHOLD: { value: 125140, hpAnchor: "above £125,140" },
  BASIC_RATE_LIMIT: {
    value: 37700,
    // Not stated as a figure in HP: it is the band width, HRT £50,270 less PA
    // £12,570, and is re-derived from two anchored figures in the test below.
    hpAnchor: null,
    note: "derived: UEL/HRT £50,270 - PA £12,570",
  },

  "INCOME_TAX.basic": { value: 0.2, hpAnchor: "basic 20%" },
  "INCOME_TAX.higher": { value: 0.4, hpAnchor: "higher 40%" },
  "INCOME_TAX.additional": { value: 0.45, hpAnchor: "additional 45%" },

  DIVIDEND_ALLOWANCE: { value: 500, hpAnchor: "Dividend allowance £500" },
  "DIVIDEND_RATES.ordinary": { value: 0.1075, hpAnchor: "ordinary 10.75%" },
  "DIVIDEND_RATES.upper": { value: 0.3575, hpAnchor: "upper 35.75%" },
  "DIVIDEND_RATES.additional": { value: 0.3935, hpAnchor: "additional 39.35%" },

  "NI.primaryThreshold": { value: 12570, hpAnchor: "primary threshold £12,570" },
  "NI.upperEarningsLimit": { value: 50270, hpAnchor: "upper earnings limit £50,270" },
  "NI.employeeMain": { value: 0.08, hpAnchor: "Employee primary Class 1:** **8%" },
  "NI.employeeUpper": { value: 0.02, hpAnchor: "then **2%** above" },
  "NI.secondaryThreshold": { value: 5000, hpAnchor: "secondary threshold of £5,000" },
  "NI.employerRate": { value: 0.15, hpAnchor: "Employer secondary Class 1:** **15%" },
  "NI.employmentAllowance": { value: 10500, hpAnchor: "Employment Allowance £10,500" },

  APPRENTICESHIP_LEVY: {
    value: 0.005,
    // KNOWN GAP, reported with the P1 guard pack: the HP locks that the
    // Apprenticeship Levy is funded from the assignment rate (§12) but never
    // states the 0.5% RATE, which this site publishes inside every umbrella
    // take-home figure. The fix is an HP edit, not a code edit.
    hpAnchor: "Apprenticeship Levy** is **0.5%",
  },

  "CT.smallRate": { value: 0.19, hpAnchor: "Small profits rate 19%" },
  "CT.mainRate": { value: 0.25, hpAnchor: "main rate 25%" },
  "CT.lowerLimit": { value: 50000, hpAnchor: "not exceed **£50,000**" },
  "CT.upperLimit": { value: 250000, hpAnchor: "exceed **£250,000**" },
  "CT.marginalFraction": { value: 3 / 200, hpAnchor: "standard fraction **3/200**" },
};

/** Every exported constant leaf, flattened to "NAME" / "NAME.key". */
function publishedConstants(): Record<string, number | string> {
  const out: Record<string, number | string> = {};
  for (const [name, value] of Object.entries(tax as Record<string, unknown>)) {
    if (typeof value === "function") continue;
    if (typeof value === "number" || typeof value === "string") {
      out[name] = value;
    } else if (value && typeof value === "object") {
      for (const [key, leaf] of Object.entries(value as Record<string, unknown>)) {
        if (typeof leaf === "number" || typeof leaf === "string") out[`${name}.${key}`] = leaf;
      }
    }
  }
  return out;
}

const published = publishedConstants();

describe("published tax constants vs house_positions.md", () => {
  it("the ground-truth document is readable and locked", () => {
    expect(HP.length).toBeGreaterThan(1000);
    expect(HP).toContain("Document is LOCKED for page writing");
  });

  it("every published constant has a ground-truth row (no passing by omission)", () => {
    const unchecked = Object.keys(published).filter((k) => !(k in EXPECTED));
    expect(
      unchecked,
      `these constants are published to users but asserted nowhere: ${unchecked.join(", ")}. ` +
        "Add the HP figure to EXPECTED rather than leaving them unguarded.",
    ).toEqual([]);
  });

  it("every ground-truth row still names a live constant", () => {
    const stale = Object.keys(EXPECTED).filter((k) => !(k in published));
    expect(stale, `EXPECTED rows with no matching export: ${stale.join(", ")}`).toEqual([]);
  });

  it("every constant equals its house position", () => {
    const wrong: string[] = [];
    for (const [key, exp] of Object.entries(EXPECTED)) {
      if (!(key in published)) continue; // reported above
      const actual = published[key];
      const same =
        typeof exp.value === "number" && typeof actual === "number"
          ? Math.abs(actual - exp.value) < 1e-12
          : actual === exp.value;
      if (!same) wrong.push(`${key}: published ${String(actual)}, HP says ${String(exp.value)}`);
    }
    expect(wrong, wrong.join("\n")).toEqual([]);
  });

  it("every asserted figure is still stated in house_positions.md", () => {
    const drifted: string[] = [];
    for (const [key, exp] of Object.entries(EXPECTED)) {
      if (exp.hpAnchor === null) continue;
      if (!HP.includes(exp.hpAnchor)) {
        drifted.push(`${key}: house_positions.md no longer contains "${exp.hpAnchor}"`);
      }
    }
    expect(
      drifted,
      "the code and the ground-truth document have parted company. Either HP was re-locked with new " +
        `figures and the constants must follow, or the figure was never locked at all:\n${drifted.join("\n")}`,
    ).toEqual([]);
  });

  it("BASIC_RATE_LIMIT is the derived band width, not an independent figure", () => {
    expect(tax.BASIC_RATE_LIMIT).toBe(tax.NI.upperEarningsLimit - tax.PERSONAL_ALLOWANCE);
  });
});

describe("house positions published outside the constants module", () => {
  const TOOLS_DIR = join(__dirname, "..", "lib", "calculators");

  it("the £6,708 lower earnings limit is the only LEL salary option offered", () => {
    // HP §6: LEL £6,708. It is hardcoded as a salary preset in the calculator
    // and premium configs rather than imported, so it is asserted where it is.
    const files: string[] = [];
    const walk = (dir: string) => {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = join(dir, entry.name);
        if (entry.isDirectory()) walk(full);
        else if (/\.tsx?$/.test(entry.name) && !entry.name.includes(".test.")) files.push(full);
      }
    };
    walk(TOOLS_DIR);

    const wrong: string[] = [];
    let seen = 0;
    for (const file of files) {
      const src = readFileSync(file, "utf8");
      for (const m of src.matchAll(/(\d[\d,]*)\s*\(lower earnings limit\)/g)) {
        seen++;
        if (m[1].replace(/,/g, "") !== "6708") wrong.push(`${file}: £${m[1]} offered as the LEL`);
      }
    }
    expect(seen, "no LEL salary option found at all, so this check is vacuous").toBeGreaterThan(0);
    expect(wrong, `HP §6 locks the LEL at £6,708:\n${wrong.join("\n")}`).toEqual([]);
    expect(HP).toContain("lower earnings limit (LEL) is £6,708");
  });
});
