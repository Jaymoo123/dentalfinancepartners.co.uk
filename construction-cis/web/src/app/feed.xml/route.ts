import { buildFeedRoute } from "@accounting-network/web-shared/content/feed";
import { getAllPosts, getCategorySlug } from "@/lib/blog";
import { siteConfig } from "@/config/site";

export const runtime = "nodejs";
export const maxDuration = 10;
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
        url: `${siteConfig.url}/blog/${getCategorySlug(p)}/${p.slug}`,
        date: p.date,
        description: p.metaDescription || p.summary || "",
        category: p.category,
        author: p.author,
      })),
});
