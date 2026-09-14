import { describe, it, expect } from "vitest";
import * as L from "@/components/ui/layout-utils";

/* The one thing that silently undoes the 2026-09-14 focus-ring fix: the kit's button
 * recipes embed `focus-visible:outline-primary-600` (btnOnDark: -400) in their own class
 * strings. On this site --color-primary-600 is #8f421f, 2.42:1 on the navy band ground,
 * under the 3.0 graphic floor. Keeping the local focusRing constant does NOT protect
 * against that, because the failing utility rides inside the recipe. If a future edit
 * re-exports a kit recipe raw, this fails. */
const recipes = ["btnPrimary", "btnSecondary", "btnOnDark", "btnOnCream", "focusRing"] as const;

describe("focus ring never falls back to the primary ramp", () => {
  for (const name of recipes) {
    it(`${name} paints --focus-ring and no primary-* outline`, () => {
      const s = (L as Record<string, string>)[name];
      expect(typeof s).toBe("string");
      expect(s).not.toMatch(/focus-visible:outline-primary-/);
      expect(s).toContain("focus-visible:outline-[var(--focus-ring)]");
    });
  }

  it("btnPrimary is the kit recipe, not a local square one", () => {
    expect(L.btnPrimary).toContain("rounded-xl");
    expect(L.btnPrimary).toContain("font-bold");
    expect(L.btnPrimary).toContain("min-w-[10rem]");
    expect(L.btnPrimary).toContain("var(--btn-ground,");
  });
});
