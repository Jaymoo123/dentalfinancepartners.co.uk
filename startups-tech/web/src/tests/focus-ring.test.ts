import { readFileSync, readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { describe, it, expect } from "vitest";
import * as L from "@/components/ui/layout-utils";

/* The one thing that silently undoes the phase-1 focus-ring fix: a recipe embeds
 * `focus-visible:outline-primary-600` (the kit's own literal, see layout-utils.ts's
 * "DECLINED: btnPrimary" comment) instead of reading `--focus-ring`. On this site
 * --color-primary-600 is the brand indigo #4f46e5, which measures 2.03-2.99 on the
 * homepage hero's dark grounds (app/page.tsx:404-405,445), all under the 3.0 graphic
 * floor. Keeping a local focusRing constant does NOT protect against that if a future
 * edit re-exports a kit recipe raw instead of the local one - this file only exports
 * `btnPrimary` and `focusRing`, so those are the only recipes to guard. */
const recipes = ["btnPrimary", "focusRing"] as const;

describe("focus ring never falls back to the primary ramp", () => {
  for (const name of recipes) {
    it(`${name} paints --focus-ring and no primary-* outline`, () => {
      const s = (L as Record<string, string>)[name];
      expect(typeof s).toBe("string");
      expect(s).not.toMatch(/focus-visible:outline-primary-/);
      expect(s).toContain("focus-visible:outline-[var(--focus-ring)]");
    });
  }

  /* The recipe assertions above only see `layout-utils.ts`. This walks the real
   * directories instead, so a hand-written ring on an element - invisible to a test
   * that only imports the module - is covered the day it lands.
   *
   * `src/app/admin/**` is EXCLUDED if present: staff-only surfaces are not in this
   * design port's lease. `layout-utils.ts` and this file are outside the corpus by
   * extension (.ts, not .tsx), which matters: both legitimately contain the banned
   * literal, one in the regex that finds it and one in the assertions below. */
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
    // A known-present reference: the corpus-not-empty proof is that at least one file
    // actually imports one of the `btnPrimary`/`focusRing` recipes. If the reads are
    // silently returning "", this fails.
    const bodies = corpus.map((p) => readFileSync(p, "utf8"));
    expect(bodies.some((b) => /\b(btnPrimary|focusRing)\b/.test(b))).toBe(true);
    expect(corpus.every((p) => !p.includes(`${sep}admin${sep}`))).toBe(true);
  });

  it("no .tsx surface hand-writes a primary-* focus outline", () => {
    const offenders = corpus.filter((p) => /focus-visible:outline-primary-/.test(readFileSync(p, "utf8")));
    expect(offenders.map((p) => relative(SRC, p))).toEqual([]);
  });

  /* S3: four files bypassed --focus-ring entirely with focus-visible:outline-[#4f46e5]
   * or focus-visible:outline-[var(--brand-primary)], which skips the .ground-dark /
   * footer token rebind. Ban any focus-visible:outline-[...] bracket value that is not
   * exactly var(--focus-ring). */
  it("no .tsx surface hand-writes a focus outline bracket value other than var(--focus-ring)", () => {
    const offenders: string[] = [];
    for (const p of corpus) {
      const body = readFileSync(p, "utf8");
      for (const m of body.matchAll(/focus-visible:outline-\[([^\]]+)\]/g)) {
        if (m[1] !== "var(--focus-ring)") offenders.push(`${relative(SRC, p)}: ${m[0]}`);
      }
    }
    expect(offenders).toEqual([]);
  });

  it("btnPrimary is the kit shape, not a square local one", () => {
    expect(L.btnPrimary).toContain("rounded-xl");
    expect(L.btnPrimary).toContain("font-bold");
    expect(L.btnPrimary).toContain("min-w-[10rem]");
    expect(L.btnPrimary).toContain("var(--btn-ground,");
  });
});
