import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { tradeTypes } from "@/data/trade-types";
import { getAllPosts, getAllCategories, getCategorySlug } from "@/lib/blog";
import { allTools } from "@/lib/calculators/registry";
import { GLOSSARY } from "@/app/glossary/[slug]/data";
import { CITIES } from "@/app/locations/[slug]/data";
import { publishedGuideTopicsWithFile } from "@/lib/resources/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date().toISOString();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/cis-refund`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/gross-payment-status`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/cis-invoice-template`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/cis-payment-deduction-statement-template`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/for`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/calculators`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/cookie-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/glossary`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/locations`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/research`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/research/uk-construction-index`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/research/uk-construction-insolvency-index`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
  ];

  const tradeTypeRoutes: MetadataRoute.Sitemap = tradeTypes.map((t) => ({
    url: `${base}/for/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Blog: category indexes + individual posts
  const posts = getAllPosts();
  const categories = getAllCategories();

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${base}/blog/${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${base}/blog/${getCategorySlug(post)}/${post.slug}`,
    lastModified: post.updatedDate || post.date,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const calculatorRoutes: MetadataRoute.Sitemap = allTools().map((tool) => ({
    url: `${base}/calculators/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const glossaryRoutes: MetadataRoute.Sitemap = Object.keys(GLOSSARY).map(
    (slug) => ({
      url: `${base}/glossary/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })
  );

  const cityRoutes: MetadataRoute.Sitemap = Object.keys(CITIES).map(
    (slug) => ({
      url: `${base}/locations/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })
  );

  // Resource guide pages (open + indexable from 2026-07-18; email gate retired)
  const resourceRoutes: MetadataRoute.Sitemap = publishedGuideTopicsWithFile().map(
    (slug) => ({
      url: `${base}/resources/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })
  );

  return [
    ...staticRoutes,
    ...tradeTypeRoutes,
    ...resourceRoutes,
    ...categoryRoutes,
    ...postRoutes,
    ...calculatorRoutes,
    ...glossaryRoutes,
    ...cityRoutes,
  ];
}
