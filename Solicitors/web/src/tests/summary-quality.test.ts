/**
 * Corpus-wide excerpt guard, this site's version of the estate
 * `first-sentence` guard.
 *
 * WHY NOT `first-sentence`: that guard is a contract test for a `firstSentence`
 * helper that derives an excerpt from post body HTML. This site has no such
 * helper (`grep -rn firstSentence src/` returns nothing) and no consumer for
 * one. Every card excerpt on this site comes from the frontmatter `summary`
 * field: the seven hand-built category hubs, /blog/[category]/[slug] related
 * cards, /locations/[slug] and the homepage all render `post.summary`
 * directly, and feed.xml falls back to it. Importing the shared guard here
 * would mean inventing a module with no consumer, so this guard asserts the
 * same property (every excerpt in the WHOLE corpus is readable prose, because
 * the failure mode is one bad post, not a bad average) against the real
 * mechanism.
 *
 * Covers both corpora that ship summaries: blog posts and pillar guides.
 */
import { describe, it, expect } from "vitest";
import { getAllPosts } from "@/lib/blog";
import { getAllGuides } from "@/lib/solicitor-guides";

const MIN_LENGTH = 40;

function summaryFaults(id: string, summary: string): string[] {
  const faults: string[] = [];
  if (!summary || !summary.trim()) {
    faults.push(`${id}: no summary, the card renders a blank excerpt`);
    return faults;
  }
  if (summary.trim().length < MIN_LENGTH) {
    faults.push(`${id}: too short (${summary.trim().length}) "${summary}"`);
  }
  if (/[<>]/.test(summary)) faults.push(`${id}: leaked markup "${summary}"`);
  if (/(^|\s)(#{1,6}\s|\|\s|\*\*|\[.*\]\()/.test(summary)) {
    faults.push(`${id}: leaked markdown "${summary}"`);
  }
  if (!/[.!?]["')\]]?$/.test(summary.trim())) {
    faults.push(`${id}: does not end in a full stop "${summary}"`);
  }
  return faults;
}

describe("summary quality (excerpt corpus guard)", () => {
  const posts = getAllPosts();
  const guides = getAllGuides();

  it("has a corpus to run against", () => {
    expect(posts.length).toBeGreaterThan(50);
    expect(guides.length).toBeGreaterThan(0);
  });

  it("gives every published post a readable card excerpt", () => {
    const bad = posts.flatMap((p) => summaryFaults(p.slug, p.summary ?? ""));
    expect(bad, bad.slice(0, 15).join("\n")).toEqual([]);
  });

  it("gives every pillar guide a readable card excerpt", () => {
    const bad = guides.flatMap((g) => summaryFaults(g.slug, g.summary ?? ""));
    expect(bad, bad.slice(0, 15).join("\n")).toEqual([]);
  });

  it("never falls back to the metaDescription being empty as well", () => {
    // feed.xml renders `metaDescription || summary`, so an empty pair ships an
    // empty RSS description.
    const bad = posts
      .filter((p) => !(p.metaDescription ?? "").trim() && !(p.summary ?? "").trim())
      .map((p) => p.slug);
    expect(bad, bad.join("\n")).toEqual([]);
  });
});
