import { describe, it, expect } from "vitest";
import { assertFrontmatter, STANDARD_MANIFEST } from "./frontmatter";

const FILE = "content/blog/test-post.md";

function valid(): Record<string, unknown> {
  return {
    slug: "test-post",
    title: "Test Post",
    date: "2026-01-15",
    category: "Tax",
    metaDescription: "A description for this test post.",
  };
}

describe("assertFrontmatter", () => {
  it("passes silently on a fully valid frontmatter object", () => {
    expect(() => assertFrontmatter(valid(), STANDARD_MANIFEST, FILE)).not.toThrow();
  });

  // Missing required field
  it("throws naming file and field when a required field is absent", () => {
    const data = valid();
    delete data.date;
    expect(() => assertFrontmatter(data, STANDARD_MANIFEST, FILE))
      .toThrow(`${FILE}: missing required frontmatter "date"`);
  });

  // Bad date shape — invalid date string
  it("throws naming file and field when date is not a valid ISO date", () => {
    const data = { ...valid(), date: "not-a-date" };
    expect(() => assertFrontmatter(data, STANDARD_MANIFEST, FILE))
      .toThrow(`${FILE}: missing required frontmatter "date"`);
  });

  // Empty string required field
  it("throws naming file and field when a required string field is empty", () => {
    const data = { ...valid(), metaDescription: "" };
    expect(() => assertFrontmatter(data, STANDARD_MANIFEST, FILE))
      .toThrow(`${FILE}: missing required frontmatter "metaDescription"`);
  });

  // Clean pass — verifies that a valid non-trivial object clears all rules
  it("passes for all STANDARD_MANIFEST fields with valid ISO date including time", () => {
    const data = { ...valid(), date: "2026-06-10T09:30:00.000Z" };
    expect(() => assertFrontmatter(data, STANDARD_MANIFEST, FILE)).not.toThrow();
  });
});
