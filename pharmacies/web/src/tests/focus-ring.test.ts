import { readFileSync, readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { describe, it, expect } from "vitest";
import * as L from "@/components/ui/layout-utils";

/* P1-F ring guard. Does NOT pin the five shared recipe names (btnPrimary, btnSecondary,
 * btnOnDark, btnOnCream, focusRing) the way contractors-ir35's copy does — pinning the
 * recipe list is the defect named in the brief that let 29 hand-rolled rings through on
 * contractors-ir35 (a new recipe added later is invisible to a fixed list). Instead this
 * walks the real .tsx corpus and bans the hand-rolled shapes directly, so a new file or a
 * new recipe is covered the day it lands. `src/app/admin` is excluded: staff analytics
 * behind a password, not a published surface, not in the port's lease. */
const SRC = join(__dirname, "..");
const walk = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name);
    if (e.isDirectory()) return e.name === "admin" ? [] : walk(p);
    return e.isFile() && e.name.endsWith(".tsx") ? [p] : [];
  });
const corpus = [...walk(join(SRC, "app")), ...walk(join(SRC, "components"))];

// Strip block and line comments before matching, same as the playbook gate's own
// strip() (section 9.1: "it counted comments as code"). Without this, a comment that
// merely describes an old hex ring (e.g. StickyCTA.tsx:31, prose explaining the P1-C
// fix) reads as a live offender even though the className below it already uses the
// recipe token.
const stripComments = (s: string): string => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");

describe("focus ring never falls back to a hand-rolled outline", () => {
  it("the corpus walk actually found the surfaces (guards the guard)", () => {
    // An empty or tiny corpus would make every assertion below pass vacuously, which is
    // exactly how a sibling site shipped a guard that tested nothing.
    expect(corpus.length).toBeGreaterThan(25);
    expect(corpus.some((p) => p.endsWith(join("app", "page.tsx")))).toBe(true);
    // Every real consumer on this site reaches the ring through the `focusRing`/
    // `btnPrimary`/etc. recipe symbol, never an inline literal — that is the intended,
    // better state (P1-F2), not a gap. So the known-present-literal check reads the
    // recipe module itself for the token, then proves at least one .tsx actually imports
    // the recipe that carries it, which is what would go silently empty if the reads
    // broke.
    const layoutUtilsSrc = readFileSync(join(SRC, "components", "ui", "layout-utils.ts"), "utf8");
    expect(layoutUtilsSrc).toContain("focus-visible:outline-[var(--focus-ring)]");
    const bodies = corpus.map((p) => readFileSync(p, "utf8"));
    expect(bodies.some((b) => /\bfocusRing\b/.test(b) && b.includes("layout-utils"))).toBe(true);
    expect(corpus.every((p) => !p.includes(`${sep}admin${sep}`))).toBe(true);
  });

  it("no .tsx surface hand-writes a non-token focus outline or ring", () => {
    const offenders = corpus.filter((p) => {
      const b = stripComments(readFileSync(p, "utf8"));
      // Bare utility-ramp outline (contractors-ir35 shape).
      if (/focus-visible:outline-primary-/.test(b)) return true;
      // Bracketed outline whose value is not the ring token — every pre-port ring on this
      // site is a bracketed `#0f3a4a` literal, so this is the ban that does the work; a
      // regex that only bans the bare form (above) misses it entirely.
      const bracketed = b.match(/focus-visible:outline-\[[^\]]*\]/g) ?? [];
      if (bracketed.some((m) => m !== "focus-visible:outline-[var(--focus-ring)]")) return true;
      // StickyCTA close-button shape: a hex ring instead of the token.
      if (/focus:ring-\[#?[0-9a-fA-F]{3,8}\]/.test(b)) return true;
      // Bare focus:outline-none with no sibling ring token on the same element is a dead
      // end for keyboard focus. (A crude same-string check, not a per-element parse: good
      // enough to catch the known shape without a JSX parser.)
      if (/focus:outline-none/.test(b) && !b.includes("var(--focus-ring)")) return true;
      return false;
    });
    expect(offenders.map((p) => relative(SRC, p))).toEqual([]);
  });

  it("btnPrimary is the kit recipe, not a local square one", () => {
    expect(L.btnPrimary).toContain("rounded-xl");
    expect(L.btnPrimary).toContain("font-bold");
    expect(L.btnPrimary).toContain("min-w-[10rem]");
    expect(L.btnPrimary).toContain("var(--btn-ground,");
  });
});
