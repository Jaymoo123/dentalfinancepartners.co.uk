import { buildFeedRoute } from "@accounting-network/web-shared/content/feed";
import { getAllPosts, getCategorySlug } from "@/lib/blog";
import { niche } from "@/config/niche-loader";

export const dynamic = "force-static";
export const revalidate = 3600;

const siteUrl = `https://${niche.domain}`;

export const GET = buildFeedRoute({
  siteUrl,
  title: niche.display_name,
  description: niche.description,
  getItems: () =>
    getAllPosts()
      .filter((p) => p.date)
      .sort((a, b) => (a.date < b.date ? 1 : -1))
      .slice(0, 50)
      .map((p) => ({
        title: p.title,
        url: `${siteUrl}/blog/${getCategorySlug(p)}/${p.slug}`,
        date: p.date,
        description: p.metaDescription || p.summary || "",
        category: p.category,
        author: p.author,
      })),
});
