/**
 * Guard-test TEMPLATE: an excerpt function stays readable across an entire
 * blog corpus, not just on the handful of posts someone eyeballed.
 *
 * Ported from Property's `Property/web/src/tests/first-sentence.test.ts`.
 * `firstSentence` (or a site's own equivalent) feeds every related-article
 * card, so it runs over the WHOLE corpus in production; a three-word excerpt,
 * or one carrying a table cell instead of prose, is worse than no card. The
 * corpus-wide assertion is deliberate for that reason: the failure mode is
 * one bad post, not a bad average.
 *
 * NOTE ON GENERALITY: `firstSentence` itself has not been extracted into
 * web-shared — it still lives at `Property/web/src/lib/blog.ts`, and this
 * template must not import from Property. So the function is a PARAMETER,
 * not an import: any site with a same-shaped excerpt function runs the same
 * contract tests against its own implementation. The fixed unit cases below
 * assert the CONTRACT the function must honour (sentence-boundary handling
 * around decimals/statute references, markdown/HTML stripping, table
 * skipping, short-hook fallback, preferring a short sentence over a huge
 * summary) — not Property's specific regex choices, and the example text is
 * generic rather than property-tax flavoured so it reads sensibly on any
 * site's corpus.
 *
 * ---- Worked example (crypto, the pilot site) ----
 *
 *   // crypto/web/src/tests/first-sentence.test.ts
 *   import { registerFirstSentenceGuard } from
 *     "@accounting-network/web-shared/design/guards/first-sentence";
 *   import { getAllPosts, firstSentence } from "../../lib/blog"; // the site's own module, however it aliases it
 *
 *   registerFirstSentenceGuard({
 *     firstSentence,
 *     getPosts: () => getAllPosts().map((p) => ({
 *       slug: p.slug,
 *       contentHtml: p.contentHtml,
 *       summary: p.summary,
 *     })),
 *     minPosts: 1, // crypto's corpus is nowhere near Property's 783 posts
 *   });
 */
import { describe, it, expect } from "vitest";

export interface FirstSentencePost {
  slug: string;
  contentHtml: string;
  summary?: string;
}

export interface FirstSentenceGuardOptions {
  /** The site's own excerpt function: (contentHtml, fallback?) => excerpt. */
  firstSentence: (contentHtml: string, fallback?: string) => string;
  /** Returns every published post the corpus-wide check should run over. */
  getPosts: () => FirstSentencePost[];
  /** The corpus-presence check requires at least this many posts. Default 1. */
  minPosts?: number;
  /** An excerpt shorter than this is treated as unreadable. Default 30. */
  minExcerptLength?: number;
}

/**
 * Call this from the SITE's own test file (not from web-shared). It registers
 * real `describe`/`it` blocks in whatever vitest run is currently executing,
 * calling `opts.getPosts()` at call time.
 */
export function registerFirstSentenceGuard(opts: FirstSentenceGuardOptions) {
  const { firstSentence } = opts;
  const minPosts = opts.minPosts ?? 1;
  const minExcerptLength = opts.minExcerptLength ?? 30;

  describe("firstSentence", () => {
    it("cuts at the sentence end, not at a decimal or a statute reference", () => {
      expect(firstSentence("A taxpayer earning £30,000.50 pays more. Then a second sentence.")).toBe(
        "A taxpayer earning £30,000.50 pays more.",
      );
      expect(
        firstSentence("An open enquiry under TMA s.9A blocks the switch entirely here. Next one."),
      ).toBe("An open enquiry under TMA s.9A blocks the switch entirely here.");
    });

    it("strips markdown and HTML rather than rendering it", () => {
      const out = firstSentence(
        "## Heading\n\nThe **finance cost** restriction applies to [clients](/blog/x) in full. More.",
      );
      expect(out).toBe("The finance cost restriction applies to clients in full.");
    });

    it("skips an opening table so the excerpt is prose, not a cell", () => {
      const out = firstSentence(
        "<table><tr><td>Band</td><td>Rate</td></tr></table>\n\nThe bands above set what a client actually pays each year. More.",
        "fallback summary that is comfortably long enough to be used",
      );
      expect(out).toBe("The bands above set what a client actually pays each year.");
    });

    it("falls back when the body opens with something too short to be a hook", () => {
      const fallback = "A practical guide to the topic for the site's readers.";
      expect(firstSentence("Yes.", fallback)).toBe(fallback);
    });

    it("prefers a short first sentence over an enormous summary", () => {
      const huge = "x".repeat(1000);
      expect(firstSentence("Short.", huge)).toBe("Short.");
    });

    const posts = opts.getPosts();

    it("has a corpus to run against", () => {
      expect(posts.length).toBeGreaterThanOrEqual(minPosts);
    });

    it("produces a readable excerpt for every published post", () => {
      const bad: string[] = [];
      for (const post of posts) {
        const excerpt = firstSentence(post.contentHtml, post.summary);
        if (excerpt.length < minExcerptLength) {
          bad.push(`${post.slug}: too short (${excerpt.length}) ${excerpt}`);
        }
        if (/[<>]/.test(excerpt)) bad.push(`${post.slug}: leaked markup ${excerpt}`);
        if (/^(#|\||-\s)/.test(excerpt)) bad.push(`${post.slug}: leaked markdown ${excerpt}`);
      }
      expect(bad, bad.slice(0, 10).join("\n")).toEqual([]);
    });
  });
}
