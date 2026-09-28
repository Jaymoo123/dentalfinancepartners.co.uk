import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { tradeTypes } from "@/data/trade-types";
import { getAllPosts, getAllCategories, getCategorySlug } from "@/lib/blog";
import { allTools } from "@/lib/calculators/registry";
import { GLOSSARY } from "@/app/glossary/[slug]/data";
import { publishedGuideTopicsWithFile } from "@/lib/resources/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  // Blog: category indexes + individual posts
  const posts = getAllPosts();
  const categories = getAllCategories();

  // ponytail: lastModified is a real content date or it is omitted. It used
  // to be `new Date()` (or an ISO string of it) on every static/hub/category/
  // glossary/guide entry, which told crawlers every one of those pages
  // changed on every deploy. Only posts carry a genuine edit date, so only
  // posts (and the /blog and category indexes derived from them) keep one.
  const editedAt = (p: (typeof posts)[number]) =>
    new Date(p.updatedDate || p.date);
  const newest = (list: typeof posts) =>
    list.length
      ? new Date(Math.max(...list.map((p) => editedAt(p).getTime())))
      : undefined;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/probate`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/wills`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/inheritance-tax`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/lasting-power-of-attorney`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/for`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/blog`, lastModified: newest(posts), changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/calculators`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/privacy-policy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/cookie-policy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/glossary`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/research`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/research/uk-probate-wait-times-index`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/research/pensions-inheritance-tax-2027`, changeFrequency: "monthly", priority: 0.8 },
  ];

  const tradeTypeRoutes: MetadataRoute.Sitemap = tradeTypes.map((t) => ({
    url: `${base}/for/${t.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

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
