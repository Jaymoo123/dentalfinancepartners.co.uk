import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { contractorTypes } from "@/data/contractor-types";
import { getAllPosts, getAllCategories, getCategorySlug } from "@/lib/blog";
import { allTools } from "@/lib/calculators/registry";
import { GLOSSARY } from "@/app/glossary/[slug]/data";
import { CITIES } from "@/app/locations/[slug]/data";
import { indexableGuideTopics } from "@/lib/resources/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  // Blog: category indexes + individual posts
  const posts = getAllPosts();
  const categories = getAllCategories();

  // ponytail: lastModified is a real content date or it is omitted. It used
  // to be `new Date()` on every static/hub/category/glossary/location/guide
  // entry, which told crawlers every one of those pages changed on every
  // deploy. Only posts carry a genuine edit date, so only posts (and the
  // /blog and category indexes derived from them) keep a lastModified.
  const editedAt = (p: (typeof posts)[number]) =>
    new Date(p.updatedDate || p.date);
  const newest = (list: typeof posts) =>
    list.length
      ? new Date(Math.max(...list.map((p) => editedAt(p).getTime())))
      : undefined;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/ir35-status`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/for`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/blog`, lastModified: newest(posts), changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/calculators`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/glossary`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/locations`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/research`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/research/uk-contractor-index`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/research/uk-contractor-survival-index`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/research/uk-contractor-insolvency-index`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/privacy-policy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/cookie-policy`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const contractorTypeRoutes: MetadataRoute.Sitemap = contractorTypes.map((t) => ({
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

  const glossaryRoutes: MetadataRoute.Sitemap = Object.keys(GLOSSARY).map((slug) => ({
    url: `${base}/glossary/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const cityRoutes: MetadataRoute.Sitemap = Object.keys(CITIES).map((slug) => ({
    url: `${base}/locations/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Open resource guides. Guides whose frontmatter sets `noindex: true` are
  // excluded here so the sitemap agrees with the robots meta on the page.
  const resourceRoutes: MetadataRoute.Sitemap = indexableGuideTopics().map((topic) => ({
    url: `${base}/resources/${topic}`,
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
