/**
 * Site instantiation of the estate `first-sentence` guard.
 *
 * WHAT THE KIT TEMPLATE ASSERTS, and why it cannot be called as written here.
 * `packages/web-shared/design/guards/first-sentence.ts` takes the site's own
 * excerpt FUNCTION as a parameter and asserts a contract on it: sentence
 * boundaries that survive decimals and statute references, markdown and HTML
 * stripping, opening-table skipping, a short-hook fallback. **Trade has no such
 * function.** `grep -rn firstSentence src` returns one hit and it is a sentence
 * inside a docblock (`src/lib/page-summaries.ts:22`, describing Property). Trade
 * renders the AUTHORED `summary` frontmatter instead: `src/lib/blog.ts:33` reads
 * it, and `BlogPostRenderer.tsx:390` passes it straight through as the
 * `excerpt` of every related-article card. Calling the registrar with a
 * pass-through would assert a contract nothing implements and prove nothing.
 *
 * SO THIS GUARDS THE SAME FAILURE ON THE SURFACE TRADE ACTUALLY RENDERS. The
 * template's real subject is not the regex, it is the corpus: the failure mode
 * is ONE bad card excerpt on ONE post out of 82, not a bad average. Same
 * assertion, applied to `summary`, over the whole corpus, plus the two things a
 * hand-authored summary can be that a derived one cannot: empty, or a duplicate
 * of the title.
 *
 * AND IT KEEPS THE PREMISE HONEST. The last block asserts that no
 * `firstSentence`-shaped excerpt function has appeared in `src/lib`. If one is
 * ever added, this test goes red and the fix is to call
 * `registerFirstSentenceGuard` from the kit with it, not to delete the check.
 */
import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import { getAllPosts } from "@/lib/blog";

const LIB = join(__dirname, "..", "..", "lib");
const MIN_EXCERPT = 30;

const posts = getAllPosts();

describe("every post's related-card excerpt is readable (corpus-wide)", () => {
  it("guard-the-guard: there is a corpus to run against", () => {
    // A renamed content directory would otherwise make every check below pass
    // over zero posts.
    expect(posts.length).toBeGreaterThanOrEqual(80);
  });

  it("produces a readable excerpt for every published post", () => {
    const bad: string[] = [];
    for (const post of posts) {
      const excerpt = (post.summary ?? "").trim();
      if (excerpt.length < MIN_EXCERPT) {
        bad.push(`${post.slug}: too short (${excerpt.length}) "${excerpt}"`);
      }
      if (/[<>]/.test(excerpt)) bad.push(`${post.slug}: leaked markup "${excerpt}"`);
      if (/^(#|\||-\s)|\[[^\]]*\]\(/.test(excerpt)) {
        bad.push(`${post.slug}: leaked markdown "${excerpt}"`);
      }
      if (excerpt.trim().toLowerCase() === post.title.trim().toLowerCase()) {
        bad.push(`${post.slug}: excerpt is just the title, so the card says nothing new`);
      }
    }
    expect(
      bad,
      [
        `${bad.length} post(s) render an unusable related-article card excerpt.`,
        "The excerpt is the post's own `summary:` frontmatter, rendered verbatim",
        "on every card that points at it. Fix the frontmatter, not this test.",
        ...bad.slice(0, 10),
      ].join("\n"),
    ).toEqual([]);
  });

  it("the premise holds: no derived excerpt function exists to be tested instead", () => {
    // If this fails, Trade has grown a firstSentence-shaped function. Point the
    // kit registrar at it (see the docblock) rather than removing this check.
    const libSources = readdirSync(LIB)
      .filter((f) => f.endsWith(".ts") && !f.endsWith(".test.ts"))
      .map((f) => readFileSync(join(LIB, f), "utf8"))
      .join("\n")
      .replace(/\/\*[\s\S]*?\*\//g, " ");
    expect(/export function firstSentence|export const firstSentence/.test(libSources)).toBe(false);
  });
});
