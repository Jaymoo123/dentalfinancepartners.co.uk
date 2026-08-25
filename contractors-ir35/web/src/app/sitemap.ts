import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { contractorTypes } from "@/data/contractor-types";
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
    { url: `${base}/ir35-status`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/for`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/calculators`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/glossary`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/locations`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/research`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/research/uk-contractor-index`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/research/uk-contractor-survival-index`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/research/uk-contractor-insolvency-index`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/cookie-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const contractorTypeRoutes: MetadataRoute.Sitemap = contractorTypes.map((t) => ({
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
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const glossaryRoutes: MetadataRoute.Sitemap = Object.keys(GLOSSARY).map((slug) => ({
    url: `${base}/glossary/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const cityRoutes: MetadataRoute.Sitemap = Object.keys(CITIES).map((slug) => ({
    url: `${base}/locations/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Open resource guides (email gate retired 2026-07-18, now indexable).
  const resourceRoutes: MetadataRoute.Sitemap = publishedGuideTopicsWithFile().map((topic) => ({
    url: `${base}/resources/${topic}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...contractorTypeRoutes,
    ...categoryRoutes,
    ...postRoutes,
    ...calculatorRoutes,
    ...glossaryRoutes,
    ...cityRoutes,
    ...resourceRoutes,
  ];
}
