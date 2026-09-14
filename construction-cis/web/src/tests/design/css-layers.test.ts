/**
 * Guard for playbook trap T30, which has now produced five instances in this one
 * stylesheet (.eyebrow, .prose-blog a, .prose-blog p/h2/..., .section-label, and the
 * heading line-height rule that is deliberately kept). `.section-label` was DELETED
 * on 2026-09-14 (zero consumers; not declared anywhere else on this site), so it is
 * no longer pinned below.
 *
 * Tailwind v4's `@import "tailwindcss"` declares the layer order
 * `theme, base, components, utilities` and emits every generated utility into
 * `utilities`. Unlayered author CSS outranks EVERY layered rule regardless of
 * specificity, so an unlayered class rule that sets `color`, `background`, a margin or
 * a font-size silently beats the utility a component author wrote on the same element,
 * with every existing test still green.
 *
 * This test parses globals.css with a character-stream walk (comments and string
 * literals stripped, nested at-rule stack tracked) and pins the exact set of rules that
 * are allowed to remain unlayered. Adding an unlayered rule, or un-layering an existing
 * one, fails here and forces a human to state why.
 *
 * What this tests: SOURCE CSS ONLY. It does not read the built stylesheet and it makes
 * no contrast claim. Contrast lives in src/tests/design/eyebrow-ground.test.ts and in
 * the ground tables in globals.css and components/ui/layout-utils.ts.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const CSS = join(process.cwd(), "src/app/globals.css");
const LAYOUT_UTILS = join(process.cwd(), "src/components/ui/layout-utils.ts");

/** Returns [selectorPrelude, enclosingLayerNames] for every rule in the sheet. */
function walkLayers(src: string): Array<[string, string[]]> {
  const out: Array<[string, string[]]> = [];
  const stack: (string | null)[] = [];
  let buf = "";
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (c === "/" && src[i + 1] === "*") {
      const j = src.indexOf("*/", i + 2);
      i = j < 0 ? src.length : j + 2;
      continue;
    }
    if (c === '"' || c === "'") {
      const q = c;
      i += 1;
      while (i < src.length && src[i] !== q) i += src[i] === "\\" ? 2 : 1;
      i += 1;
      buf += '""';
      continue;
    }
    if (c === "{") {
      const prelude = buf.split(/\s+/).filter(Boolean).join(" ");
      buf = "";
      if (prelude.startsWith("@")) {
        const word = prelude.split(" ")[0];
        stack.push(word === "@layer" ? prelude.slice(word.length).trim() : word);
      } else {
        out.push([prelude, stack.filter((s): s is string => !!s && !s.startsWith("@"))]);
        stack.push(null);
      }
      i += 1;
      continue;
    }
    if (c === "}") {
      stack.pop();
      buf = "";
      i += 1;
      continue;
    }
    if (c === ";") {
      buf = "";
      i += 1;
      continue;
    }
    buf += c;
    i += 1;
  }
  return out;
}

/* Every rule allowed to sit outside a @layer, and why. Anything else is trap T30.
   The three class-ish entries are load-bearing precisely BECAUSE they beat utilities:
   - the heading line-height rule keeps the house 1.2 rhythm instead of Tailwind's
     per-text-size bundled leading (see the long comment above it in globals.css);
   - .font-mono/.font-geist-mono repoint Tailwind's own font-mono at Geist Mono;
   - .hairline and .hero-reveal* set a border-top and an animation, neither of which
     any component in src currently writes a competing utility for. */
const ALLOWED_UNLAYERED = new Set([
  ":root",
  "*, *::before, *::after",
  "html",
  "body",
  "from",
  "to",
  "h1, h2, h3, h4, h5, h6",
  ".font-mono, .font-geist-mono",
  ".hairline",
  ".hero-reveal",
  ".hero-reveal-delay",
  'input[type=""], input[type=""], input[type=""], input[type=""], textarea, select',
  "button:disabled, input:disabled, select:disabled",
]);

describe("globals.css layering (trap T30)", () => {
  const rules = walkLayers(readFileSync(CSS, "utf-8").replace(/^﻿/, ""));

  it("parses a plausible number of rules (guards the walker itself)", () => {
    expect(rules.length).toBeGreaterThan(25);
  });

  it("has no unexpected unlayered rule", () => {
    const stray = rules.filter(([sel, layers]) => layers.length === 0 && !ALLOWED_UNLAYERED.has(sel));
    expect(stray.map(([s]) => s)).toEqual([]);
  });

  it("keeps the colour-bearing component classes inside @layer components", () => {
    const layered = new Map(rules.map(([sel, layers]) => [sel, layers]));
    for (const sel of [".eyebrow", ".prose-blog", ".prose-blog p", ".prose-blog a"]) {
      expect(layered.get(sel), `${sel} must stay in @layer components`).toEqual(["components"]);
    }
  });
});

describe("layout-utils adopts the shared design kit", () => {
  const src = readFileSync(LAYOUT_UTILS, "utf-8");

  it("re-exports from the kit and hand-rolls nothing", () => {
    expect(src).toContain('from "@accounting-network/web-shared/design/layout-utils"');
    // A hand-rolled recipe would have to spell out its own utilities here.
    expect(src).not.toMatch(/^\s*export const (btn|focusRing|section|site|content|hero)/m);
  });

  it("does not hard-code an outline colour, so the kit's ring stays single-sourced", () => {
    // Comments stripped first: the file's own ground table names the kit's
    // `focus-visible:outline-primary-600` in prose, which is documentation, not paint.
    const code = src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
    expect(code).not.toMatch(/focus-visible:outline-[a-z]/);
  });
});
