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
    const fixture = posts.find((p) => p.slug === "what-is-ir35");
    expect(fixture).toBeDefined();
    expect(fixture?.title).toBeTruthy();
    expect(fixture?.category).toBe("IR35 Status");
    expect(fixture?.metaDescription).toBeTruthy();
    expect(fixture?.date).toMatch(/^\d{4}-\d{2}-\d{2}/);
  });

  it("getPostBySlug returns the fixture post", () => {
    const post = getPostBySlug("what-is-ir35");
    expect(post).not.toBeNull();
    expect(post?.slug).toBe("what-is-ir35");
  });

  it("getPostBySlug returns null for unknown slug", () => {
    const post = getPostBySlug("non-existent-slug-abc123");
    expect(post).toBeNull();
  });

  it("getCategorySlug slugifies correctly", () => {
    const post = getPostBySlug("what-is-ir35");
    expect(post).not.toBeNull();
    const slug = getCategorySlug(post!);
    expect(slug).toBe("ir35-status");
  });

  it("slugifyCategory handles special characters", () => {
    expect(slugifyCategory("IR35 Status")).toBe("ir35-status");
    expect(slugifyCategory("Umbrella vs Limited Company")).toBe("umbrella-vs-limited-company");
    expect(slugifyCategory("Expenses and Deductions")).toBe("expenses-and-deductions");
  });

  it("getPostByCategoryAndSlug returns the fixture post at the correct category", () => {
    const post = getPostByCategoryAndSlug("ir35-status", "what-is-ir35");
    expect(post).not.toBeNull();
    expect(post?.slug).toBe("what-is-ir35");
  });

  it("getPostByCategoryAndSlug returns null for wrong category", () => {
    const post = getPostByCategoryAndSlug("limited-company-tax", "what-is-ir35");
    expect(post).toBeNull();
  });

  it("getAllCategories returns at least the IR35 Status category", () => {
    const cats = getAllCategories();
    expect(Array.isArray(cats)).toBe(true);
    const ir35 = cats.find((c) => c.slug === "ir35-status");
    expect(ir35).toBeDefined();
    expect(ir35?.count).toBeGreaterThanOrEqual(1);
  });

  it("calculateReadTime returns a positive integer", () => {
    const post = getPostBySlug("what-is-ir35");
    expect(post).not.toBeNull();
    const rt = calculateReadTime(post!.contentHtml);
    expect(rt).toBeGreaterThan(0);
    expect(Number.isInteger(rt)).toBe(true);
  });

  it("fixture post has non-empty contentHtml", () => {
    const post = getPostBySlug("what-is-ir35");
    expect(post?.contentHtml.length).toBeGreaterThan(100);
  });
});
