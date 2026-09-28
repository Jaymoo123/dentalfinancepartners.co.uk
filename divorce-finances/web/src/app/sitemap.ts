import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { tradeTypes } from "@/data/trade-types";
import { getAllPosts, getAllCategories, getCategorySlug } from "@/lib/blog";
import { allTools } from "@/lib/calculators/registry";
import { GLOSSARY } from "@/app/glossary/[slug]/data";
import { publishedGuideTopicsWithFile } from "@/lib/resources/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  // No per-page modified date is tracked for these evergreen routes, so
  // lastModified is omitted rather than stamped with build time (brief
  // ESTATE_PARITY_PHASE0 section 5: never a frozen build-time `new Date()`).
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/financial-settlements`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/pension-sharing`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/capital-gains-tax-divorce`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/for`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/blog`, changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/calculators`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/privacy-policy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/cookie-policy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/glossary`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/research`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/research/uk-divorce-financial-remedy-index`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/research/uk-child-maintenance-tracker`, changeFrequency: "monthly", priority: 0.75 },
  ];

  const tradeTypeRoutes: MetadataRoute.Sitemap = tradeTypes.map((t) => ({
    url: `${base}/for/${t.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Blog: category indexes + individual posts
  const posts = getAllPosts();
  const categories = getAllCategories();

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${base}/blog/${cat.slug}`,
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
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const glossaryRoutes: MetadataRoute.Sitemap = Object.keys(GLOSSARY).map(
    (slug) => ({
      url: `${base}/glossary/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })
  );

  // Resource guide pages (open + indexable from 2026-07-18; email gate retired)
  const resourceRoutes: MetadataRoute.Sitemap = publishedGuideTopicsWithFile().map(
    (slug) => ({
      url: `${base}/resources/${slug}`,
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
  ];
}
