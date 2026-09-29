import { readFileSync, readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { describe, it, expect } from "vitest";
import * as L from "@/components/ui/layout-utils";

/* The one thing that silently undoes the phase-1 focus-ring fix: a recipe embeds
 * `focus-visible:outline-primary-600` (the kit's own literal, see layout-utils.ts's
 * "DECLINED" comments) instead of reading `--focus-ring`.
 *
 * R1 nit 3 (2026-09-29): the guarded list is DERIVED from the module's own
 * string exports rather than pinned to a fixed set of names, so a fifth recipe
 * added to layout-utils.ts is gated the day it lands instead of shipping
 * ungated. EVERY string export is checked for the banned literal; the ones that
 * actually paint a ring (they carry `focus-visible:outline`) are additionally
 * required to read the token. The container/spacing re-exports are strings with
 * no ring and correctly fall in the first set only. The count assertion below
 * keeps an empty or renamed module from making every case vacuous. */
const allStrings = Object.entries(L)
  .filter(([, v]) => typeof v === "string")
  .map(([k]) => k);
const recipes = allStrings.filter((k) =>
  (L as Record<string, string>)[k].includes("focus-visible:outline"),
);

describe("focus ring never falls back to the primary ramp", () => {
  it("the export list is real (guards the guard)", () => {
    expect(allStrings.length).toBeGreaterThan(5);
    expect(recipes.length).toBeGreaterThanOrEqual(3);
    expect(recipes).toContain("focusRing");
    expect(recipes).toContain("btnPrimary");
  });

  for (const name of allStrings) {
    it(`${name} carries no primary-* outline literal`, () => {
      expect((L as Record<string, string>)[name]).not.toMatch(/focus-visible:outline-primary-/);
    });
  }

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
   * that only imports the module - is covered the day it lands. Not pinned to the
   * six files named in the build brief: that is the defect (contractors-ir35, 29
   * hand-rolled rings) that a fixed file list would let back in.
   *
   * `src/app/admin/**` is EXCLUDED, and only that path: R1 nit 3 caught the old
   * test skipping ANY directory named `admin` at any depth, which would have
   * silently dropped a real surface from the corpus. Staff-only, not in this
   * design port's lease. `layout-utils.ts` and this file are outside the corpus by extension
   * (.ts, not .tsx), which matters: both legitimately contain the banned literal,
   * one in the regex that finds it and one in the assertions below. */
  const SRC = join(__dirname, "..");
  const ADMIN = join(SRC, "app", "admin");
  const walk = (dir: string): string[] =>
    readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
      const p = join(dir, e.name);
      if (e.isDirectory()) return p === ADMIN ? [] : walk(p);
      return e.isFile() && e.name.endsWith(".tsx") ? [p] : [];
    });
  const corpus = [...walk(join(SRC, "app")), ...walk(join(SRC, "components"))];

  it("the corpus walk actually found the surfaces (guards the guard)", () => {
    // An empty or tiny corpus would make the assertions below pass vacuously,
    // which is exactly how a sibling site shipped a guard that tested nothing.
    expect(corpus.length).toBeGreaterThan(25);
    expect(corpus.some((p) => p.endsWith(join("app", "page.tsx")))).toBe(true);
    const bodies = corpus.map((p) => readFileSync(p, "utf8"));
    expect(bodies.some((b) => /\b(btnPrimary|focusRing)\b/.test(b))).toBe(true);
    expect(corpus.every((p) => !p.startsWith(ADMIN + sep))).toBe(true);
  });

  it("no .tsx surface hand-writes a primary-* focus outline", () => {
    const offenders = corpus.filter((p) => /focus-visible:outline-primary-/.test(readFileSync(p, "utf8")));
    expect(offenders.map((p) => relative(SRC, p))).toEqual([]);
  });

  /* Bans any focus-visible:outline-[...] bracket value that is not exactly
   * var(--focus-ring). A regex that only bans the -primary-* literal utility
   * (above) misses a hand-rolled bracket value pointing at a different
   * variable or a raw hex, which skips the .ground-dark / footer token rebind
   * just as completely. */
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

  /* A bare `outline-none` (with no `focus-visible:` prefix requirement - the
   * defect is the missing ring, not the missing variant) removes the browser
   * default ring. That is only safe when the same class string also carries a
   * focus-visible ring to replace it. Banning outline-none outright would
   * false-positive on the deliberate `outline-none` some non-interactive
   * elements carry with no focus ring needed at all, so this only fires when
   * outline-none is paired with a `focus` or `focus-visible` context and no
   * compensating focus-visible ring exists in the same file. */
  it("no .tsx surface ships a bare outline-none without a compensating focus-visible ring", () => {
    const offenders: string[] = [];
    for (const p of corpus) {
      const body = readFileSync(p, "utf8");
      const hasBareOutlineNone = /focus:outline-none|focus-visible:outline-none/.test(body);
      const hasCompensatingRing = /focus-visible:outline-\[var\(--focus-ring\)\]|focus-visible:ring-/.test(body);
      if (hasBareOutlineNone && !hasCompensatingRing) offenders.push(relative(SRC, p));
    }
    expect(offenders).toEqual([]);
  });

  it("btnOnDark routes through this module, not the raw kit export", () => {
    expect(typeof L.btnOnDark).toBe("string");
    expect(L.btnOnDark).not.toMatch(/focus-visible:outline-primary-/);
    expect(L.btnOnDark).toContain("focus-visible:outline-[var(--focus-ring)]");
  });

  it("btnPrimary is the kit shape, not a square local one", () => {
    expect(L.btnPrimary).toContain("rounded-xl");
    expect(L.btnPrimary).toContain("font-bold");
    expect(L.btnPrimary).toContain("min-w-[10rem]");
    expect(L.btnPrimary).toContain("var(--btn-ground,");
  });
});
