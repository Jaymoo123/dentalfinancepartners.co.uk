import { buildFeedRoute } from "@accounting-network/web-shared/content/feed";
import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";
export const revalidate = 3600;

export const GET = buildFeedRoute({
  siteUrl: siteConfig.url,
  title: siteConfig.name,
  description: siteConfig.description,
  getItems: () =>
    getAllPosts()
      .filter((p) => p.date)
      .sort((a, b) => (a.date < b.date ? 1 : -1))
      .slice(0, 50)
      .map((p) => ({
        title: p.title,
        // FLAT blog routing: posts live at /blog/<slug>. A nested
        // /blog/<category>/<slug> URL 404s, so the feed (consumed by AI
        // crawlers and readers) must emit the flat, canonical path.
        url: `${siteConfig.url}/blog/${p.slug}`,
        date: p.date,
        description: p.metaDescription || p.summary || "",
        category: p.category,
        author: p.author,
      })),
});
