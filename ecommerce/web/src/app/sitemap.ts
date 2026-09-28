import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllPosts, getAllCategories, getCategorySlug } from "@/lib/blog";
import { allTools } from "@/lib/calculators/registry";
import { ecommerceServices } from "@/data/services";
import { sellerHubs } from "@/data/for";
import { vatPages } from "@/data/vat";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  // ponytail: lastModified is omitted wherever there is no real edit date to
  // report. It used to be `new Date()` (build time) on every static and
  // structural-hub route, which told crawlers every one of them changed on
  // every deploy; an inaccurate lastmod risks the whole sitemap's dates being
  // ignored. Omitting is legal and honest (same fix Property's sitemap.ts
  // carries). Blog post routes below keep their genuine content dates.
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/for`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/vat`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/blog`, changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/calculators`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/research`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/research/online-seller-index`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/research/online-seller-survival-index`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/privacy-policy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/cookie-policy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = ecommerceServices.map((s) => ({
    url: `${base}/services/${s.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const forRoutes: MetadataRoute.Sitemap = sellerHubs.map((h) => ({
    url: `${base}/for/${h.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const vatRoutes: MetadataRoute.Sitemap = vatPages.map((v) => ({
    url: `${base}/vat/${v.slug}`,
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
    ...vatRoutes,
    ...toolRoutes,
    ...categoryRoutes,
    ...postRoutes,
  ];
}
