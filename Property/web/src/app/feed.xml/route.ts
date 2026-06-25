import { siteConfig } from "@/config/site";
import { getAllPosts, getCategorySlug } from "@/lib/blog";

// File-based posts only change at deploy, so prerender like sitemap.ts / the CSV route.
export const dynamic = "force-static";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * RSS 2.0 feed for the Property blog. Summary-only items (no full article body)
 * so aggregators / AI answer engines can discover and link back without anyone
 * republishing whole posts from the feed. URLs are built identically to sitemap.ts.
 */
export function GET() {
  const base = siteConfig.url.replace(/\/$/, "");
  const feedUrl = `${base}/feed.xml`;
  const posts = getAllPosts(); // already newest-first

  const items = posts.map((post) => {
    const url =
      post.canonical?.trim() ||
      `${base}/blog/${getCategorySlug(post)}/${post.slug}`;
    const pubDate = new Date(post.date || Date.now()).toUTCString(); // RFC-822
    const description = post.summary || post.metaDescription || "";
    return [
      "    <item>",
      `      <title>${escapeXml(post.title)}</title>`,
      `      <link>${escapeXml(url)}</link>`,
      `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
      `      <pubDate>${pubDate}</pubDate>`,
      post.author ? `      <dc:creator>${escapeXml(post.author)}</dc:creator>` : "",
      post.category ? `      <category>${escapeXml(post.category)}</category>` : "",
      `      <description>${escapeXml(description)}</description>`,
      "    </item>",
    ]
      .filter(Boolean)
      .join("\n");
  });

  const lastBuild = new Date(posts[0]?.date || Date.now()).toUTCString();

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">',
    "  <channel>",
    `    <title>${escapeXml(siteConfig.name)}</title>`,
    `    <link>${escapeXml(base)}</link>`,
    `    <description>${escapeXml(siteConfig.description)}</description>`,
    `    <language>${escapeXml(siteConfig.locale || "en-GB")}</language>`,
    `    <lastBuildDate>${lastBuild}</lastBuildDate>`,
    `    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />`,
    "    <generator>Property Tax Partners</generator>",
    ...items,
    "  </channel>",
    "</rss>",
  ].join("\n");

  return new Response(xml + "\n", {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
