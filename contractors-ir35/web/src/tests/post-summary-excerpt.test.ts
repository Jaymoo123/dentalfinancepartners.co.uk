/**
 * P1-GUARD: the excerpt mechanism this site actually uses.
 *
 * SITE-DERIVED, and deliberately NOT the estate `first-sentence` guard. There
 * is no `firstSentence` helper anywhere on contractors-ir35: `lib/blog.ts`
 * reads frontmatter `summary` (defaulting to "") and that string is the ONLY
 * excerpt in the product. It is rendered in three places:
 *   - the listing card in `BlogListWithSearch` ({p.summary}),
 *   - the TLDR panel at the top of an article when there are no keyTakeaways,
 *   - the related-article cards at the foot of an article.
 * Registering the shared guard against a function this site does not have
 * would either not compile or pass vacuously, which is the exact failure the
 * brief warns about.
 *
 * `summary` is NOT in STANDARD_MANIFEST, so `assertFrontmatter` does not
 * require it: a post shipped without one renders an empty card and an empty
 * TLDR with no error anywhere. That gap is what this guard closes.
 */
import { describe, it, expect } from "vitest";
import { getAllPosts } from "@/lib/blog";

// MIN only. There is deliberately no upper bound: the card and the TLDR panel
// both render the summary in full with no line clamp, and the live corpus runs
// from 247 to 659 characters, so any ceiling would be an invented rule failing
// on copy that renders correctly today.
const MIN = 60;
const posts = getAllPosts();

describe("post summary (this site's excerpt mechanism)", () => {
  it("has a corpus to test", () => {
    expect(posts.length).toBeGreaterThan(0);
  });

  it("every post carries a summary, because nothing derives one from the body", () => {
    const missing = posts.filter((p) => !p.summary || p.summary.trim() === "").map((p) => p.slug);
    expect(
      missing,
      `these posts render an empty excerpt card and an empty TLDR panel: ${missing.join(", ")}. ` +
        "lib/blog.ts defaults summary to \"\" and no first-sentence fallback exists on this site.",
    ).toEqual([]);
  });

  it("every summary is a readable sentence, not a fragment", () => {
    const bad: string[] = [];
    for (const p of posts) {
      const s = (p.summary ?? "").trim();
      if (!s) continue; // already reported above
      if (s.length < MIN) bad.push(`${p.slug}: too short (${s.length} < ${MIN})`);
      if (!/[.!?]$/.test(s)) bad.push(`${p.slug}: does not end in a full stop`);
      if (/[<>]|\]\(|\*\*|^#/.test(s)) bad.push(`${p.slug}: carries markup, it is rendered as text`);
      if (s.includes("—")) bad.push(`${p.slug}: contains an em dash`);
      if (s.toLowerCase() === p.title.toLowerCase()) bad.push(`${p.slug}: is just the title`);
    }
    expect(bad, bad.join("\n")).toEqual([]);
  });

  it("summaries are distinct, so cards do not read as duplicates", () => {
    const seen = new Map<string, string>();
    const dupes: string[] = [];
    for (const p of posts) {
      const key = (p.summary ?? "").trim().toLowerCase();
      if (!key) continue;
      const prior = seen.get(key);
      if (prior) dupes.push(`${p.slug} repeats ${prior}`);
      else seen.set(key, p.slug);
    }
    expect(dupes, dupes.join("\n")).toEqual([]);
  });
});
