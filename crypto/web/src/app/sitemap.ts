import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllPosts, getAllCategories, getCategorySlug } from "@/lib/blog";
import { allTools } from "@/lib/calculators/registry";
import { cryptoServices } from "@/data/crypto-services";
import { cryptoHubs } from "@/data/crypto-hubs";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  // ponytail: lastModified omitted wherever no real edit date is tracked. It
  // used to be build-time `new Date()` on every static/service/for/tool/
  // category route, which told crawlers every one of those pages changed on
  // every deploy; an inaccurate lastmod gets the whole sitemap's dates
  // ignored (Property's sitemap.ts fix, same shape here). Blog post routes
  // below keep their genuine per-post date.
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/for`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/blog`, changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/calculators`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/research/crypto-tax-gap-index`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/privacy-policy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/cookie-policy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = cryptoServices.map((s) => ({
    url: `${base}/services/${s.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const forRoutes: MetadataRoute.Sitemap = cryptoHubs.map((h) => ({
    url: `${base}/for/${h.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const toolRoutes: MetadataRoute.Sitemap = allTools().map((tool) => ({
    url: `${base}/calculators/${tool.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = getAllCategories().map((cat) => ({
    url: `${base}/blog/${cat.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${base}/blog/${getCategorySlug(post)}/${post.slug}`,
    lastModified: post.updatedDate || post.date,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...forRoutes,
    ...toolRoutes,
    ...categoryRoutes,
    ...postRoutes,
  ];
}
