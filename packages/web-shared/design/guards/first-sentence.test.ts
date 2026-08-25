/**
 * Self-test for the first-sentence guard TEMPLATE.
 *
 * `registerFirstSentenceGuard` takes the excerpt function and the post corpus
 * as parameters (see the module docblock for why), so this self-test supplies
 * both as synthetic in-memory fixtures — a small local reimplementation of
 * the sentence-boundary contract, and a handful of made-up posts. No
 * filesystem access, no import from Property, no site content directory.
 */
import { describe, it, expect } from "vitest";
import { registerFirstSentenceGuard, type FirstSentencePost } from "./first-sentence";

/**
 * Fixture excerpt function satisfying the contract the guard asserts:
 * sentence-boundary splitting that does not cut mid-decimal or mid-statute
 * reference, markdown/HTML stripping, opening-table skipping, and a
 * short-hook fallback. Not imported from anywhere — a self-contained stand-in
 * so the registrar can be exercised end to end without touching Property.
 */
function fixtureFirstSentence(contentHtml: string, fallback = ""): string {
  const text = contentHtml
    .replace(/<(table|ul|ol|figure|blockquote|pre)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/^#{1,6}\s+.*$/gm, " ")
    .replace(/^\s*[-*+]\s+/gm, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`]/g, "")
    .replace(/&(nbsp|amp|lt|gt|#39|quot);/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const sentences = text.split(/(?<=[.!?])\s+(?=[A-Z£"'(])/);

  let excerpt = "";
  for (const s of sentences) {
    const next = excerpt ? `${excerpt} ${s}` : s;
    if (excerpt && next.length > 320) break;
    excerpt = next;
    if (excerpt.length >= 40) break;
  }
  excerpt = excerpt.trim();

  const fb = fallback.trim();
  const usable = (s: string) => s.length >= 40 && s.length <= 320;
  if (usable(excerpt)) return excerpt;
  if (usable(fb)) return fb;
  return excerpt || fb;
}

const fixturePosts: FirstSentencePost[] = [
  {
    slug: "post-a",
    contentHtml: "<p>A well-formed opening paragraph that easily clears the minimum excerpt length.</p>",
  },
  {
    slug: "post-b",
    contentHtml: "<p>Short.</p>",
    summary: "A fallback summary long enough to clear the minimum excerpt length on its own.",
  },
];

describe("registerFirstSentenceGuard (synthetic fixture, not a real corpus)", () => {
  registerFirstSentenceGuard({
    firstSentence: fixtureFirstSentence,
    getPosts: () => fixturePosts,
    minPosts: 1,
  });
});

describe("fixtureFirstSentence direct checks", () => {
  it("matches the contract the guard enforces", () => {
    expect(fixtureFirstSentence("Yes.", "A usable fallback that is comfortably long enough.")).toBe(
      "A usable fallback that is comfortably long enough.",
    );
  });
});
