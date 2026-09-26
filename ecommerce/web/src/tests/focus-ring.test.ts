import { readFileSync, readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { describe, it, expect } from "vitest";
import * as L from "@/components/ui/layout-utils";

/**
 * Row 8 of the kit-adoption gate (DESIGN_PORT_PLAYBOOK §9.1).
 *
 * THE DEFECT THIS EXISTS FOR. contractors-ir35 shipped a focus-ring guard that
 * imported `layout-utils` and asserted on the five shared recipes only, and it
 * stayed green while 29 elements hand-rolled their own ring straight onto the
 * element. A token fix could not reach any of them. So the corpus here is
 * WALKED off the filesystem, never pinned: a file added tomorrow is covered the
 * day it lands.
 *
 * THIS SITE'S RING CONTRACT, two mechanisms, and the guard covers BOTH:
 *   1. Site-local recipes paint `outline-[var(--focus-ring)]` and nothing else.
 *      `:root` binds --focus-ring to #8a5e1a (light grounds) and `.ground-dark`
 *      rebinds it to #ffffff. See src/components/ui/layout-utils.ts.
 *   2. Shared-kit components (Breadcrumb, SlimHero, the kit buttons) build
 *      their ring INTERNALLY and read `--kit-focus-ring`, so no call site can
 *      override it. A guard that knew only about mechanism 1 would not see a
 *      kit-ring regression at all, and that regression has already shipped
 *      twice here: the kit breadcrumb ring measured 1.00 on the #8a5e1a brand
 *      hero AFTER two attempts to fix it, because `--kit-focus-ring` was
 *      written as `var(--focus-ring)` and froze to the light value at :root.
 *      So the globals.css assertions below are part of the guard, not decoration.
 *
 * `focusRingOnBrand` (layout-utils.ts:64-79) has ZERO call sites since phase 6
 * removed its only one, correctly. It is an escape hatch for element-level dark
 * islands and is deliberately NOT asserted as used; nothing here fails over it.
 *
 * Comments are stripped before anything is measured. §9.1 was corrected twice
 * for counting comments as code, and it bites here in two places: a decline
 * note can name a banned utility, and a prose semicolon inside a `const`
 * docblock breaks naive class-string resolution.
 */

const SRC = join(__dirname, "..");

/** Block and line comments out, so a comment can never score as markup. */
const strip = (s: string) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");

/**
 * `src/app/admin/**` is EXCLUDED: staff analytics behind a password, not a
 * published surface and not in the design port's lease. Same carve-out as
 * contractors-ir35. `.ts` files are outside the corpus by extension, which
 * matters: layout-utils.ts and this file both legitimately contain the banned
 * literals.
 */
const walk = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name);
    if (e.isDirectory()) return e.name === "admin" ? [] : walk(p);
    return e.isFile() && e.name.endsWith(".tsx") ? [p] : [];
  });

const corpus = [...walk(join(SRC, "app")), ...walk(join(SRC, "components"))];
const bodies = new Map(corpus.map((p) => [p, strip(readFileSync(p, "utf8"))]));

describe("focus ring: one token mechanism, on every focusable surface", () => {
  it("the corpus walk actually found the surfaces (guards the guard)", () => {
    // An empty or tiny corpus makes every assertion below pass vacuously, which
    // is exactly how a sibling site shipped a guard that tested nothing.
    expect(corpus.length).toBeGreaterThan(30);
    expect(corpus.some((p) => p.endsWith(join("app", "page.tsx")))).toBe(true);
    expect(corpus.some((p) => p.endsWith(join("forms", "LeadForm.tsx")))).toBe(true);
    // Known-present strings. If the reads are silently returning "", both fail.
    // The .tsx corpus reaches the ring through the recipes, so the spelling it
    // carries is `${focusRing}`; the literal lives in layout-utils.ts, which is
    // .ts and therefore outside the corpus by extension.
    expect([...bodies.values()].some((b) => b.includes("${focusRing}"))).toBe(true);
    expect(readFileSync(join(SRC, "components", "ui", "layout-utils.ts"), "utf8")).toContain(
      "outline-[var(--focus-ring)]",
    );
    expect(corpus.every((p) => !p.includes(`${sep}admin${sep}`))).toBe(true);
  });

  it("the site recipes paint --focus-ring and no ramp outline", () => {
    for (const name of [
      "btnPrimary",
      "focusRing",
      "focusRingOnBrand",
      "focusRingAuthoredLinks",
    ] as const) {
      const s = (L as Record<string, string>)[name];
      expect(typeof s).toBe("string");
      expect(s).not.toMatch(/outline-(primary|amber|yellow|orange|neutral|slate|white|\[#)/);
      expect(s).toMatch(/outline-\[var\(--focus-ring(-on-brand)?\)\]/);
    }
  });

  it("no .tsx surface hand-writes its own coloured focus outline", () => {
    const offenders = [...bodies].filter(([, b]) =>
      /focus-visible:outline-(?!(2|4|8|none|offset|\[var\(--focus-ring))/.test(b),
    );
    expect(offenders.map(([p]) => relative(SRC, p))).toEqual([]);
  });

  /**
   * Mechanism 2. These four declarations are the whole of the kit ring's
   * ground selection, and every one of them has been wrong at least once.
   */
  it("globals.css binds both ring tokens on light AND on .ground-dark", () => {
    const css = readFileSync(join(SRC, "app", "globals.css"), "utf8");
    const dark = css.slice(css.indexOf(".ground-dark"));
    expect(css).toMatch(/--focus-ring:\s*var\(--focus-ring-on-light\)/);
    expect(css).toMatch(/--kit-focus-ring:\s*var\(--focus-ring-on-light\)/);
    expect(dark).toMatch(/--focus-ring:\s*var\(--focus-ring-on-brand\)/);
    // NOT var(--focus-ring): a custom property holding a var() is substituted at
    // computed-value time on the element that declares it, so that spelling
    // freezes to the light value at :root and the rebind never arrives.
    expect(dark).toMatch(/--kit-focus-ring:\s*var\(--focus-ring-on-brand\)/);
  });

  /**
   * The 29-element class: a focusable CONTROL that carries no ring at all.
   *
   * Scope is `button`, `input`, `select`, `textarea` and `summary`. A bare
   * prose `<a>` is deliberately OUT of scope: it suppresses nothing, so it
   * keeps the user agent's own focus ring, and pulling 13 gov.uk citations in
   * the homepage body into a ring contract is a copy change this port does not
   * make. An anchor styled as a control reaches the contract through the button
   * recipes, which this test does cover.
   *
   * EXEMPTIONS, explicit rather than a loosened rule:
   *   - `aria-hidden` elements, which are not reachable.
   *   - the off-screen honeypot `enquiry_ref` (LeadForm.tsx:201), which lives
   *     inside an aria-hidden wrapper and must never be styled into view.
   *   - `tabIndex={-1}` headings focused programmatically (LeadForm's step-2
   *     header), which take focus from script, not from the keyboard.
   */
  const RING =
    /\b(focusRing|focusRingOnBrand|focusRingAuthoredLinks|btnPrimary|btnPrimaryBase|btnSecondary)\b|outline-\[var\(--focus-ring/;

  /** Attributes of one JSX opening tag: scan to the `>` that is not inside {}. */
  const attrsAt = (s: string, from: number) => {
    let depth = 0;
    for (let i = from; i < s.length; i++) {
      const c = s[i];
      if (c === "{") depth++;
      else if (c === "}") depth--;
      else if (c === ">" && depth === 0) return s.slice(from, i);
    }
    return s.slice(from);
  };

  it("every focusable control carries the ring, directly or through a recipe", () => {
    const offenders: string[] = [];
    for (const [p, body] of bodies) {
      // Local class constants that already carry the ring (fieldClass,
      // inputClass, btnClass, chipBase...). Resolved on stripped source: a
      // semicolon inside a prose comment used to cut these off mid-value and
      // report three false offenders.
      const carriers = [
        ...body.matchAll(
          /(?:const|let)\s+(\w+)\s*=\s*[^;]*?(?:outline-\[var\(--focus-ring|\$\{focusRing\})/g,
        ),
      ].map((m) => m[1]);
      const ok = new RegExp(`${RING.source}|\\b(?:${["__none__", ...carriers].join("|")})\\b`);
      for (const m of body.matchAll(/<(button|input|select|textarea|summary)(?=[\s/>])/g)) {
        const a = attrsAt(body, (m.index ?? 0) + m[0].length);
        if (ok.test(a)) continue;
        if (a.includes("aria-hidden") || a.includes("tabIndex={-1}") || a.includes("enquiry_ref")) continue;
        // No line number: it would be measured on comment-stripped source and
        // would not match the file. The tag head is enough to find it.
        offenders.push(`${relative(SRC, p)} <${m[1]}${a.replace(/\s+/g, " ").slice(0, 60)}`);
      }
    }
    expect(offenders).toEqual([]);
  });
});
