/**
 * Guard for the defect WP4 fixed: the six pillar guides carried `prose-dental`
 * and the six resource topics carried `prose prose-slate prose-*`, and NEITHER
 * stylesheet exists. `prose-dental` is defined nowhere, and
 * @tailwindcss/typography is not a dependency of this site or of the monorepo,
 * so both long-form bodies rendered with no heading hierarchy and no list
 * markers on production.
 *
 * The fix is to reuse `.article-body.prose-blog` from globals.css, which is the
 * stylesheet the 223 blog articles already use and which also carries the 6rem
 * scroll-margin-top rule for :is(h2,h3)[id].
 *
 * This test fails if either body reverts to a class nothing defines.
 */
import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

const SRC = path.join(process.cwd(), "src");
const GUIDE = path.join(SRC, "app", "dental-guides", "[slug]", "page.tsx");
const RESOURCE = path.join(SRC, "app", "resources", "[topic]", "page.tsx");
const GLOBALS = path.join(SRC, "app", "globals.css");

/** JSX className attribute values only, so the doc comments do not count. */
function classNames(source: string): string[] {
  return [...source.matchAll(/className="([^"]*)"/g)].map((m) => m[1]);
}

describe("long-form bodies use a stylesheet that exists", () => {
  const css = fs.readFileSync(GLOBALS, "utf8");

  it("globals.css really defines .article-body.prose-blog", () => {
    expect(css).toContain(".article-body.prose-blog h2");
    expect(css).toContain(".article-body.prose-blog li");
  });

  it("globals.css does NOT define prose-dental", () => {
    expect(css).not.toContain("prose-dental");
  });

  for (const [label, file] of [
    ["dental-guides/[slug]", GUIDE],
    ["resources/[topic]", RESOURCE],
  ] as const) {
    it(`${label} renders its body with article-body prose-blog`, () => {
      const source = fs.readFileSync(file, "utf8");
      const classes = classNames(source);
      expect(classes).toContain("article-body prose-blog");
    });

    it(`${label} uses no undefined prose-* class`, () => {
      const source = fs.readFileSync(file, "utf8");
      // Every prose-* token in the file, minus the one class globals.css
      // actually defines.
      const offenders = classNames(source)
        .flatMap((c) => c.split(/\s+/))
        .filter((t) => t.startsWith("prose") && t !== "prose-blog");
      expect(offenders).toEqual([]);
    });

    it(`${label} anchors its closing enquiry panel with an id`, () => {
      const source = fs.readFileSync(file, "utf8");
      expect(source).toContain('id="enquiry-form"');
      expect(source).toContain('aria-labelledby="enquiry-form-heading"');
      expect(source).toContain('id="enquiry-form-heading"');
    });
  }
});
