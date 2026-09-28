import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllPosts, getAllCategories, getCategorySlug } from "@/lib/blog";
import { allTools } from "@/lib/calculators/registry";
import { startupsServices } from "@/data/startups-services";
import { startupsHubs } from "@/data/startups-hubs";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  // ponytail: lastModified is a real content date or it is omitted. It used
  // to be `new Date()` on every static/hub/category entry, which told
  // crawlers every one of those pages changed on every deploy.
  const posts = getAllPosts();
  const editedAt = (p: (typeof posts)[number]) =>
    new Date(p.updatedDate || p.date);
  const newest = (list: typeof posts) =>
    list.length
      ? new Date(Math.max(...list.map((p) => editedAt(p).getTime())))
      : undefined;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/for`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/blog`, lastModified: newest(posts), changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/calculators`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/research`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/research/startup-formation-survival-index`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/research/uk-tech-funding-reliefs-index`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/research/rd-tax-relief-index`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/research/tech-startup-survival-index`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/research/uk-tech-formations-index`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/privacy-policy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/cookie-policy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = startupsServices.map((s) => ({
    url: `${base}/services/${s.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const forRoutes: MetadataRoute.Sitemap = startupsHubs.map((h) => ({
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

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...forRoutes,
    ...toolRoutes,
    ...categoryRoutes,
    ...postRoutes,
  ];
}
