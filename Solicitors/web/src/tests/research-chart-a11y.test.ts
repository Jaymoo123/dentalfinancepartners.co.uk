/**
 * Guard for the research charts' accessibility, the defect phase 6 fixed.
 *
 * The three charts in LegalIncorporationCharts.tsx each carried
 * `aria-hidden="true"` on the wrapper div AND a `role="img"` + `aria-label`
 * on the svg inside it. The wrapper removed the whole subtree from the
 * accessibility tree, so the role and the label never spoke and every value
 * was unreachable. The fix (the phase-4 PremiumBarChart pattern) keeps the
 * bars decorative and publishes the values as an `sr-only` <table>.
 *
 * This is a source-shape guard, not a render test: there is no DOM harness in
 * this suite, and the three failure modes are all visible in the source.
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";

const SRC = readFileSync(
  join(__dirname, "..", "components", "research", "LegalIncorporationCharts.tsx"),
  "utf8",
);

// Comment bodies are exempt: the comments explain the defect and name it.
const CODE = SRC.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");

describe("research charts stay in the accessibility tree", () => {
  it("has no role=\"img\" anywhere (it was dead under an aria-hidden wrapper)", () => {
    expect(CODE).not.toMatch(/role=["']img["']/);
  });

  it("puts aria-hidden on no chart wrapper div", () => {
    const wrappers = CODE.match(/<div[^>]*style=\{\{ height: CHART_H[^>]*>/g) ?? [];
    expect(wrappers.length).toBe(3);
    for (const w of wrappers) expect(w).not.toMatch(/aria-hidden/);
  });

  it("publishes one sr-only data table per chart", () => {
    expect((CODE.match(/<table className="sr-only">/g) ?? []).length).toBe(3);
  });

  it("routes every series value through a shared formatter into a text node", () => {
    // fmtCount / fmtPctFull feed BOTH the <title> tooltips and the table cells,
    // so a number can never be typed twice or drift between the two sides.
    for (const fn of ["fmtCount", "fmtPctFull"]) {
      const uses = (CODE.match(new RegExp(`${fn}\\(`, "g")) ?? []).length;
      expect(uses).toBeGreaterThanOrEqual(3); // definition + title + table cell
    }
    expect(CODE).toMatch(/<td>\{fmtCount\(/);
  });

  it("keeps chart text at 11px or larger", () => {
    for (const m of CODE.matchAll(/fontSize=\{(\d+)\}/g)) {
      expect(Number(m[1])).toBeGreaterThanOrEqual(11);
    }
    expect(CODE).toMatch(/const LABEL_SIZE = 11;/);
  });
});
