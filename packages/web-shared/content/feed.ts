/**
 * RSS 2.0 route factory. Returns a Next.js App Router GET handler.
 *
 * Usage in a route file:
 *
 *   export const dynamic = "force-static";
 *   export const revalidate = 3600;
 *   export const GET = buildFeedRoute({
 *     siteUrl: siteConfig.url,
 *     title: siteConfig.name,
 *     description: siteConfig.description,
 *     getItems: () => getAllPosts().filter(p => p.date).sort(...).slice(0, 50).map(p => ({
 *       title: p.title,
 *       url: `${siteConfig.url}/blog/${getCategorySlug(p)}/${p.slug}`,
 *       date: p.date,
 *       description: p.metaDescription || p.summary || "",
 *       category: p.category,
 *       author: p.author,
 *     })),
 *   });
 */

export type FeedItem = {
  title: string;
  /** Absolute URL for the post. */
  url: string;
  date?: string;
  description: string;
  category?: string;
  author?: string;
};

export type BuildFeedRouteOptions = {
  siteUrl: string;
  title: string;
  description: string;
  /** Defaults to "/feed.xml" */
  feedPath?: string;
  getItems: () => FeedItem[];
};

function xmlEscape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function buildFeedRoute(opts: BuildFeedRouteOptions) {
  return async function GET() {
    const base = opts.siteUrl.replace(/\/$/, "");
    const feedPath = opts.feedPath || "/feed.xml";
    const items = opts.getItems();

    const lastBuildDate =
      items[0]?.date ? new Date(items[0].date).toUTCString() : new Date().toUTCString();

    const itemsXml = items
      .map((p) => {
        const pubDate = p.date ? new Date(p.date).toUTCString() : new Date().toUTCString();
        return `    <item>
      <title>${xmlEscape(p.title)}</title>
      <link>${p.url}</link>
      <guid isPermaLink="true">${p.url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${xmlEscape(p.description)}</description>
      ${p.category ? `<category>${xmlEscape(p.category)}</category>` : ""}
      ${p.author ? `<dc:creator>${xmlEscape(p.author)}</dc:creator>` : ""}
    </item>`;
      })
      .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${xmlEscape(opts.title)}</title>
    <link>${base}</link>
    <description>${xmlEscape(opts.description)}</description>
    <language>en-GB</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${base}${feedPath}" rel="self" type="application/rss+xml" />
${itemsXml}
  </channel>
</rss>
`;

    return new Response(xml, {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        "X-Robots-Tag": "all",
      },
    });
  };
}
