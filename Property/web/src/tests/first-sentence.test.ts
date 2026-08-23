/**
 * `firstSentence` feeds the related-article cards, so it runs over all 783 posts
 * in production and has to be well behaved on every one of them. A card with a
 * three-word excerpt, or one carrying a table cell instead of prose, is worse
 * than no card. These assertions are corpus-wide rather than sampled for that
 * reason: the failure mode is one bad post, not a bad average.
 */
import { describe, it, expect } from "vitest";
import { getAllPosts, firstSentence } from "@/lib/blog";

describe("firstSentence", () => {
  it("cuts at the sentence end, not at a decimal or a statute reference", () => {
    expect(firstSentence("A landlord earning £30,000.50 pays more. Then a second sentence.")).toBe(
      "A landlord earning £30,000.50 pays more.",
    );
    expect(
      firstSentence("An open enquiry under TMA s.9A blocks the switch entirely here. Next one."),
    ).toBe("An open enquiry under TMA s.9A blocks the switch entirely here.");
  });

  it("strips markdown and HTML rather than rendering it", () => {
    const out = firstSentence(
      "## Heading\n\nThe **finance cost** restriction applies to [landlords](/blog/x) in full. More.",
    );
    expect(out).toBe("The finance cost restriction applies to landlords in full.");
  });

  it("skips an opening table so the excerpt is prose, not a cell", () => {
    const out = firstSentence(
      "<table><tr><td>Band</td><td>Rate</td></tr></table>\n\nThe bands above set what a landlord actually pays each year. More.",
      "fallback summary that is comfortably long enough to be used",
    );
    expect(out).toBe("The bands above set what a landlord actually pays each year.");
  });

  it("falls back when the body opens with something too short to be a hook", () => {
    const fallback = "A practical guide to the finance cost restriction for UK landlords.";
    expect(firstSentence("Yes.", fallback)).toBe(fallback);
  });

  it("prefers a short first sentence over an enormous summary", () => {
    // `change-landlord-accountants.md` carries a ~1,000 character summary. The
    // fallback must not win just because the sentence missed the range.
    const huge = "x".repeat(1000);
    expect(firstSentence("Short.", huge)).toBe("Short.");
  });

  const posts = getAllPosts();

  it("has a corpus to run against", () => {
    expect(posts.length).toBeGreaterThan(100);
  });

  it("produces a readable excerpt for every published post", () => {
    const bad: string[] = [];
    for (const post of posts) {
      const excerpt = firstSentence(post.contentHtml, post.summary);
      if (excerpt.length < 30) bad.push(`${post.slug}: too short (${excerpt.length}) ${excerpt}`);
      if (/[<>]/.test(excerpt)) bad.push(`${post.slug}: leaked markup ${excerpt}`);
      if (/^(#|\||-\s)/.test(excerpt)) bad.push(`${post.slug}: leaked markdown ${excerpt}`);
    }
    expect(bad, bad.slice(0, 10).join("\n")).toEqual([]);
  });
});
