import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { tradeTypes } from "@/data/trade-types";
import { getAllPosts, getAllCategories, getCategorySlug } from "@/lib/blog";
import { allTools } from "@/lib/calculators/registry";
import { GLOSSARY } from "@/app/glossary/[slug]/data";
import { CITIES } from "@/app/locations/[slug]/data";
import { publishedGuideTopicsWithFile } from "@/lib/resources/content";

/** Newest real edit date across a set of posts, or undefined if the set is empty. */
function newest(posts: { date: string; updatedDate?: string }[]): string | undefined {
  const dates = posts.map((p) => p.updatedDate || p.date).filter(Boolean).sort();
  return dates.length ? dates[dates.length - 1] : undefined;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  // ponytail: lastModified is omitted wherever we do not track a real edit date.
  // A build-time `new Date()` told every crawler that all 130 URLs changed on
  // every deploy, which is the same as telling it nothing. Property's pattern.

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/cis-refund`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/gross-payment-status`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/cis-invoice-template`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/cis-payment-deduction-statement-template`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/for`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/blog`, changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/calculators`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/privacy-policy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/cookie-policy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/glossary`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/locations`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/research`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/research/uk-construction-index`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/research/uk-construction-insolvency-index`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/research/uk-construction-survival-index`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/research/uk-construction-payment-practices-league`, changeFrequency: "monthly", priority: 0.75 },
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
    lastModified: newest(posts.filter((p) => getCategorySlug(p) === cat.slug)),
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

  const cityRoutes: MetadataRoute.Sitemap = Object.keys(CITIES).map(
    (slug) => ({
      url: `${base}/locations/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
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
    ...cityRoutes,
  ];
}
