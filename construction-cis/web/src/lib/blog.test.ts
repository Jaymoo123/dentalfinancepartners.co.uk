/**
 * Smoke tests for the blog lib.
 *
 * TL-03: no react/window/document/fetch — pure Node.js module tests only.
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

describe("blog lib smoke tests", () => {
  it("getAllPosts returns an array", () => {
    const posts = getAllPosts();
    expect(Array.isArray(posts)).toBe(true);
  });

  it("getAllPosts contains the fixture post", () => {
    const posts = getAllPosts();
    const fixture = posts.find((p) => p.slug === "what-is-cis");
    expect(fixture).toBeDefined();
    expect(fixture?.title).toBeTruthy();
    expect(fixture?.category).toBe("CIS Basics");
    expect(fixture?.metaDescription).toBeTruthy();
    expect(fixture?.date).toMatch(/^\d{4}-\d{2}-\d{2}/);
  });

  it("getPostBySlug returns the fixture post", () => {
    const post = getPostBySlug("what-is-cis");
    expect(post).not.toBeNull();
    expect(post?.slug).toBe("what-is-cis");
  });

  it("getPostBySlug returns null for unknown slug", () => {
    const post = getPostBySlug("non-existent-slug-abc123");
    expect(post).toBeNull();
  });

  it("getCategorySlug slugifies correctly", () => {
    const post = getPostBySlug("what-is-cis");
    expect(post).not.toBeNull();
    const slug = getCategorySlug(post!);
    expect(slug).toBe("cis-basics");
  });

  it("slugifyCategory handles special characters", () => {
    expect(slugifyCategory("CIS Basics")).toBe("cis-basics");
    expect(slugifyCategory("CIS Compliance")).toBe("cis-compliance");
    expect(slugifyCategory("VAT and MTD")).toBe("vat-and-mtd");
  });

  it("getPostByCategoryAndSlug returns the fixture post at the correct category", () => {
    const post = getPostByCategoryAndSlug("cis-basics", "what-is-cis");
    expect(post).not.toBeNull();
    expect(post?.slug).toBe("what-is-cis");
  });

  it("getPostByCategoryAndSlug returns null for wrong category", () => {
    const post = getPostByCategoryAndSlug("cis-compliance", "what-is-cis");
    expect(post).toBeNull();
  });

  it("getAllCategories returns at least the CIS Basics category", () => {
    const cats = getAllCategories();
    expect(Array.isArray(cats)).toBe(true);
    const basics = cats.find((c) => c.slug === "cis-basics");
    expect(basics).toBeDefined();
    expect(basics?.count).toBeGreaterThanOrEqual(1);
  });

  it("calculateReadTime returns a positive integer", () => {
    const post = getPostBySlug("what-is-cis");
    expect(post).not.toBeNull();
    const rt = calculateReadTime(post!.contentHtml);
    expect(rt).toBeGreaterThan(0);
    expect(Number.isInteger(rt)).toBe(true);
  });

  it("fixture post has non-empty contentHtml", () => {
    const post = getPostBySlug("what-is-cis");
    expect(post?.contentHtml.length).toBeGreaterThan(100);
  });
});
