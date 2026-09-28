import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllPosts, getAllCategories, getCategorySlug } from "@/lib/blog";
import { allTools } from "@/lib/calculators/registry";
import { hospitalityServices } from "@/data/hospitality-services";
import { hospitalityHubs } from "@/data/hospitality-hubs";

// Domain flows from niche.config.json via siteConfig.url — never hardcoded.
// 2026-09-28 parity fix (brief section 5, G7): lastModified was build-time
// `new Date()` on every route, which tells crawlers every static page changed
// on every deploy; an inaccurate lastmod gets the whole sitemap's dates
// ignored. Property's pattern: omit it wherever there is no real per-item
// edit date to report. Blog post routes below already carry a genuine date.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/for`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/blog`, changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/calculators`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/research`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/research/uk-hospitality-insolvency-index`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/research/uk-hospitality-food-hygiene-map`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/research/hospitality-openings-closures-index`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/privacy-policy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/cookie-policy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = hospitalityServices.map((s) => ({
    url: `${base}/services/${s.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const forRoutes: MetadataRoute.Sitemap = hospitalityHubs.map((h) => ({
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
