/**
 * Smoke tests for the blog lib against the checked-in fixture post.
 * Pure Node.js module tests only — no react/window/fetch.
 */
import { describe, it, expect } from "vitest";
import {
  getAllPosts,
  getPostBySlug,
  getPostByCategoryAndSlug,
  getCategorySlug,
  slugifyCategory,
  getAllCategories,
  calculateReadTime,
} from "./blog";

const FIXTURE = "what-is-an-independent-examination";

describe("blog lib smoke tests", () => {
  it("getAllPosts parses the fixture post", () => {
    const posts = getAllPosts();
    const fixture = posts.find((p) => p.slug === FIXTURE);
    expect(fixture).toBeDefined();
    expect(fixture?.title).toBeTruthy();
    expect(fixture?.category).toBe("Independent Examination and Audit");
    expect(fixture?.metaDescription).toBeTruthy();
    expect(fixture?.date).toMatch(/^\d{4}-\d{2}-\d{2}/);
    expect(fixture?.contentHtml).toContain("<h2 id=");
  });

  it("getPostBySlug returns null for unknown slug", () => {
    expect(getPostBySlug("non-existent-slug-abc123")).toBeNull();
  });

  it("category slugging + nested lookup work", () => {
    const post = getPostBySlug(FIXTURE);
    expect(post).not.toBeNull();
    const catSlug = getCategorySlug(post!);
    expect(catSlug).toBe("independent-examination-and-audit");
    expect(getPostByCategoryAndSlug(catSlug, FIXTURE)?.slug).toBe(FIXTURE);
    expect(getPostByCategoryAndSlug("gift-aid", FIXTURE)).toBeNull();
  });

  it("slugifyCategory handles special characters", () => {
    expect(slugifyCategory("CICs and Social Enterprises")).toBe("cics-and-social-enterprises");
    expect(slugifyCategory("Gift Aid")).toBe("gift-aid");
  });

  it("getAllCategories counts the fixture category", () => {
    const cat = getAllCategories().find((c) => c.slug === "independent-examination-and-audit");
    expect(cat).toBeDefined();
    expect(cat!.count).toBeGreaterThanOrEqual(1);
  });

  it("calculateReadTime returns a positive integer", () => {
    const post = getPostBySlug(FIXTURE);
    expect(calculateReadTime(post!.contentHtml)).toBeGreaterThanOrEqual(1);
  });
});
