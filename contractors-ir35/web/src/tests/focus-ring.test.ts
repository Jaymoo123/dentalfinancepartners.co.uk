import { readFileSync, readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { describe, it, expect } from "vitest";
import * as L from "@/components/ui/layout-utils";

/* The one thing that silently undoes the 2026-09-14 focus-ring fix: the kit's button
 * recipes embed `focus-visible:outline-primary-600` (btnOnDark: -400) in their own class
 * strings. On this site --color-primary-600 is the brand cyan #0e7490, which is ALSO the
 * ground of the cyan bands and hero gradients - it measures 1.00 on primary-600, 1.70 on
 * primary-800, and 2.50 / 1.70 on the cyan-950 and cyan-900 stops of the
 * /locations/[slug] hero gradient, where both btnPrimary and the Breadcrumb live. All
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
      expect(s).not.toMatch(/focus-visible:outline-cyan-/);
      expect(s).toContain("focus-visible:outline-[var(--focus-ring)]");
    });
  }

  /* The recipe assertions above only see `layout-utils.ts`. On 2026-09-14 a sweep found
   * 29 call sites that had hand-written `focus-visible:outline-primary-*` /
   * `-cyan-*` straight onto an element, bypassing the recipes entirely - invisible to a
   * test that imports the module. This walks the real directories instead, so a file
   * added tomorrow is covered the day it lands.
   *
   * `src/app/admin/**` is EXCLUDED: it is the staff analytics login behind a password,
   * not a published surface, and it is not in the design port's lease.
   * `layout-utils.ts` and this file are outside the corpus by extension (.ts, not .tsx),
   * which matters: both legitimately contain the banned literal, one in the regex that
   * strips it and one in the assertions below. */
  const SRC = join(__dirname, "..");
  const walk = (dir: string): string[] =>
    readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
      const p = join(dir, e.name);
      if (e.isDirectory()) return e.name === "admin" ? [] : walk(p);
      return e.isFile() && e.name.endsWith(".tsx") ? [p] : [];
    });
  const corpus = [...walk(join(SRC, "app")), ...walk(join(SRC, "components"))];

  it("the corpus walk actually found the surfaces (guards the guard)", () => {
    // An empty or tiny corpus would make the assertion below pass vacuously, which is
    // exactly how a sibling site shipped a guard that tested nothing.
    expect(corpus.length).toBeGreaterThan(30);
    expect(corpus.some((p) => p.endsWith(join("app", "page.tsx")))).toBe(true);
    // A known-present literal: the ring this whole file exists to protect is written out
    // on at least one element. If the reads are silently returning "", this fails.
    const bodies = corpus.map((p) => readFileSync(p, "utf8"));
    expect(bodies.some((b) => b.includes("focus-visible:outline-[var(--focus-ring)]"))).toBe(true);
    expect(corpus.every((p) => !p.includes(`${sep}admin${sep}`))).toBe(true);
  });

  it("no .tsx surface hand-writes a primary-* or cyan-* focus outline", () => {
    const offenders = corpus.filter((p) =>
      /focus-visible:outline-(primary|cyan)-/.test(readFileSync(p, "utf8")),
    );
    expect(offenders.map((p) => relative(SRC, p))).toEqual([]);
  });

  it("btnPrimary is the kit recipe, not a local square one", () => {
    expect(L.btnPrimary).toContain("rounded-xl");
    expect(L.btnPrimary).toContain("font-bold");
    expect(L.btnPrimary).toContain("min-w-[10rem]");
    expect(L.btnPrimary).toContain("var(--btn-ground,");
  });
});
