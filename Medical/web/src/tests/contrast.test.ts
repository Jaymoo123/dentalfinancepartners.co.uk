/**
 * G3 — contrast floors for the Medical token layer.
 *
 * Appendix N of the rollout shipped a WRONG documented ratio twice (its
 * slate-400 value reads 2.51; the truth is 2.5640), which is why this file
 * carries its own WCAG relative-luminance implementation and self-tests it
 * against two reference pairs BEFORE it asserts anything about the brand. A
 * documented ratio is never trusted; it is recomputed.
 *
 * Node-only, no DOM, no dependency: the ratios are computed from the token
 * hexes, which are the same literals declared in src/app/globals.css :root.
 */
import { describe, it, expect } from "vitest";

/** WCAG 2.x relative luminance of an #rrggbb colour. */
function luminance(hex: string): number {
  const h = hex.replace("#", "");
  const chan = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  const lin = chan.map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
}

/** WCAG contrast ratio, rounded to 4dp so a reference value can be pinned. */
export function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return Math.round(((hi + 0.05) / (lo + 0.05)) * 10_000) / 10_000;
}

const WHITE = "#ffffff";
const SLATE_50 = "#f8fafc"; // --background
const ELEVATED = "#eef1f6"; // --surface-elevated
const NAVY = "#001b3d"; // --navy, and the slate-900 dark ground's stand-in

const COPPER = "#b87333"; // --brand-primary / --copper
const COPPER_STRONG = "#a0622b"; // --copper-strong / --btn-ground
const COPPER_DEEP = "#7d4b22"; // --copper-deep

describe("G3 instrument self-test (runs first; never trust a documented ratio)", () => {
  it("reproduces the two reference pairs exactly", () => {
    expect(contrast("#64748b", WHITE)).toBe(4.7588); // slate-500 on white
    expect(contrast("#94a3b8", WHITE)).toBe(2.564); // slate-400 on white, NOT 2.51
  });

  it("is symmetric and bottoms out at 1", () => {
    expect(contrast(WHITE, NAVY)).toBe(contrast(NAVY, WHITE));
    expect(contrast(WHITE, WHITE)).toBe(1);
  });
});

describe("G3 brand contrast floors", () => {
  it("copper is illegal as text or as a white-label ground on every light surface", () => {
    // The whole shape of DESIGN_DELTA follows from these three numbers.
    expect(contrast(COPPER, WHITE)).toBeLessThan(4.5);
    expect(contrast(COPPER, SLATE_50)).toBeLessThan(4.5);
    expect(contrast(WHITE, COPPER)).toBeLessThan(4.5);
  });

  it("copper IS legal as text on the navy ground, which is the inversion the port turns on", () => {
    expect(contrast(COPPER, NAVY)).toBeGreaterThanOrEqual(4.5);
  });

  it("the button ground carries a white label above the 4.5 floor", () => {
    expect(contrast(WHITE, COPPER_STRONG)).toBeGreaterThanOrEqual(4.5);
  });

  it("--copper-strong clears the floor on white and slate-50 but NOT on --surface-elevated", () => {
    expect(contrast(COPPER_STRONG, WHITE)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(COPPER_STRONG, SLATE_50)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(COPPER_STRONG, ELEVATED)).toBeLessThan(4.5);
  });

  it("--copper-deep is the step that survives every light ground, which is why tinted panels use it", () => {
    for (const ground of [WHITE, SLATE_50, ELEVATED]) {
      expect(contrast(COPPER_DEEP, ground)).toBeGreaterThanOrEqual(4.5);
    }
  });

  it("the M-W1 warning ladder clears 4.5 on white and slate-50, the two grounds it was derived for", () => {
    for (const step of ["#dc2626", "#7e22ce", "#4338ca"]) {
      for (const ground of [WHITE, SLATE_50]) {
        expect(contrast(step, ground)).toBeGreaterThanOrEqual(4.5);
      }
    }
  });

  it("red-600, step 1 of the ladder, does NOT survive --surface-elevated", () => {
    // 4.2656, measured, not quoted. DESIGN_DELTA derives M-W1 against white,
    // cream and slate-50 only, so a warning chip must not be placed on the
    // elevated grey without moving to step 2 or 3.
    expect(contrast("#dc2626", ELEVATED)).toBe(4.2656);
    expect(contrast("#7e22ce", ELEVATED)).toBeGreaterThanOrEqual(4.5);
    expect(contrast("#4338ca", ELEVATED)).toBeGreaterThanOrEqual(4.5);
  });

  it("the on-dark warning ladder clears 4.5 on navy", () => {
    for (const step of ["#f87171", "#c084fc", "#818cf8"]) {
      expect(contrast(step, NAVY)).toBeGreaterThanOrEqual(4.5);
    }
  });
});
