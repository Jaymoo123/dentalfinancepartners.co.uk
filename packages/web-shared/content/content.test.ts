/**
 * Content module unit tests — GAP-8 W4b suite.
 *
 * Verifies: markdown-utils pure functions · feed factory content-type +
 * structure · llms factory handler existence.
 */
import { describe, it, expect } from "vitest";
import { addHeadingIds, extractHeadings } from "./markdown-utils";
import { buildFeedRoute } from "./feed";
import { buildLlmsFullRoute } from "./llmsFull";

// ---------------------------------------------------------------------------
// markdown-utils
// ---------------------------------------------------------------------------
describe("addHeadingIds", () => {
  it("adds id attribute to h2", () => {
    const out = addHeadingIds("<h2>Hello World</h2>");
    expect(out).toMatch(/<h2 id="hello-world">/);
  });

  it("adds id attribute to h3", () => {
    const out = addHeadingIds("<h3>Section One</h3>");
    expect(out).toMatch(/<h3 id="section-one">/);
  });

  it("deduplicates repeated headings", () => {
    const out = addHeadingIds("<h2>Dup</h2><h2>Dup</h2>");
    expect(out).toContain('id="dup"');
    expect(out).toContain('id="dup-2"');
  });

  it("strips inner HTML from id generation", () => {
    const out = addHeadingIds("<h2><strong>Bold</strong> heading</h2>");
    expect(out).toMatch(/<h2 id="bold-heading">/);
  });

  it("leaves non-heading elements untouched", () => {
    const html = "<p>unchanged</p>";
    expect(addHeadingIds(html)).toBe(html);
  });
});

describe("extractHeadings", () => {
  it("extracts headings with id, text, level", () => {
    const html = `<h2 id="intro">Introduction</h2><h3 id="sub">Sub</h3>`;
    const headings = extractHeadings(html);
    expect(headings).toHaveLength(2);
    expect(headings[0]).toEqual({ id: "intro", text: "Introduction", level: 2 });
    expect(headings[1]).toEqual({ id: "sub", text: "Sub", level: 3 });
  });

  it("strips inner HTML from text", () => {
    const html = `<h2 id="x"><strong>Bold</strong> text</h2>`;
    const headings = extractHeadings(html);
    expect(headings[0].text).toBe("Bold text");
  });

  it("returns empty array for no headings", () => {
    expect(extractHeadings("<p>No headings here</p>")).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// feed factory
// ---------------------------------------------------------------------------
describe("buildFeedRoute", () => {
  const ITEMS = [
    {
      title: "First post",
      url: "https://www.example.co.uk/blog/tax/first-post",
      date: "2025-03-01",
      description: "About tax.",
      category: "Tax",
      author: "Emma",
    },
    {
      title: "Second post",
      url: "https://www.example.co.uk/blog/vat/second-post",
      date: "2025-02-01",
      description: "About VAT.",
    },
  ];

  it("returns a function", () => {
    const GET = buildFeedRoute({
      siteUrl: "https://www.example.co.uk",
      title: "Example Accountants",
      description: "UK tax experts.",
      getItems: () => ITEMS,
    });
    expect(typeof GET).toBe("function");
  });

  it("GET returns correct Content-Type", async () => {
    const GET = buildFeedRoute({
      siteUrl: "https://www.example.co.uk",
      title: "Example Accountants",
      description: "UK tax experts.",
      getItems: () => ITEMS,
    });
    const response = await GET();
    expect(response.headers.get("Content-Type")).toContain("application/rss+xml");
  });

  it("GET body contains channel title and both items", async () => {
    const GET = buildFeedRoute({
      siteUrl: "https://www.example.co.uk",
      title: "Example Accountants",
      description: "UK tax experts.",
      getItems: () => ITEMS,
    });
    const response = await GET();
    const text = await response.text();
    expect(text).toContain("<title>Example Accountants</title>");
    expect(text).toContain("First post");
    expect(text).toContain("Second post");
    expect(text).toContain('isPermaLink="true"');
  });

  it("GET escapes ampersands in title", async () => {
    const GET = buildFeedRoute({
      siteUrl: "https://www.example.co.uk",
      title: "Cats & Dogs",
      description: "Pets.",
      getItems: () => [],
    });
    const response = await GET();
    const text = await response.text();
    expect(text).toContain("Cats &amp; Dogs");
  });

  it("GET uses custom feedPath in atom:link", async () => {
    const GET = buildFeedRoute({
      siteUrl: "https://www.example.co.uk",
      title: "Site",
      description: "Desc.",
      feedPath: "/rss.xml",
      getItems: () => [],
    });
    const response = await GET();
    const text = await response.text();
    expect(text).toContain('href="https://www.example.co.uk/rss.xml"');
  });
});

// ---------------------------------------------------------------------------
// llmsFull factory
// ---------------------------------------------------------------------------
describe("buildLlmsFullRoute", () => {
  it("returns a function", () => {
    const GET = buildLlmsFullRoute({
      siteUrl: "https://www.example.co.uk",
      header: "# Example Site\n\nFull content.",
      sections: [{ dir: "blog", prefix: "blog", title: "BLOG POSTS" }],
    });
    expect(typeof GET).toBe("function");
  });
});
