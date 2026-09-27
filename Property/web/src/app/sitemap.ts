import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllPosts, getAllCategories, getCategorySlug } from "@/lib/blog";
import { allTools } from "@/lib/calculators/registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");

  const staticPaths = [
    "",
    "/services",
    "/services/property-accountant",
    "/services/landlord-accountant",
    "/services/property-tax-advice",
    "/services/non-resident-landlord",
    "/landlord-tax",
    "/landlord-compliance",
    "/section-24",
    "/leasehold",
    "/landed-estates",
    "/cost-of-selling-a-property",
    "/for-letting-agents",
    "/making-tax-digital-landlords",
    "/about",
    "/contact",
    "/incorporation",
    "/spv-company",
    "/calculators",
    "/embed",
    "/property-tax-rates",
    "/research",
    "/research/landlord-tax-index",
    "/locations",
    "/blog",
    "/privacy-policy",
    "/terms",
    "/cookie-policy",
  ];

  const hreflang = (url: string) => ({
    languages: { "en-GB": url, "x-default": url },
  });

  // ponytail: lastModified is omitted wherever we do not track a real edit date.
  // It used to be `new Date()`, which told crawlers every static page changed on
  // every deploy; an inaccurate lastmod gets the whole sitemap's dates ignored.
  // Omitting is legal and honest. Blog URLs below carry genuine dates.
  const posts = getAllPosts().filter((p) => !p.noindex);
  const editedAt = (p: (typeof posts)[number]) =>
    new Date(p.dateModified ?? p.date);
  const newest = (list: typeof posts) =>
    list.length
      ? new Date(Math.max(...list.map((p) => editedAt(p).getTime())))
      : undefined;

  const entries: MetadataRoute.Sitemap = staticPaths.map((path) => {
    const url = `${base}${path}`;
    return {
      url,
      // /blog is an index of the posts, so its newest post date is a real date.
      ...(path === "/blog" ? { lastModified: newest(posts) } : {}),
      changeFrequency: path === "/blog" ? "weekly" : "monthly",
      priority: path === "" ? 1 : 0.7,
      alternates: hreflang(url),
    };
  });

  for (const loc of siteConfig.locations) {
    // Every configured city renders live at /locations/<slug> since the city
    // blog posts were merged in and reversed to 301 here.
    const url = `${base}/locations/${loc.slug}`;
    entries.push({
      url,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: hreflang(url),
    });
  }

  for (const tool of allTools()) {
    const url = `${base}/calculators/${tool.slug}`;
    entries.push({
      url,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: hreflang(url),
    });
  }

  const categories = getAllCategories();
  for (const cat of categories) {
    const url = `${base}/blog/${cat.slug}`;
    entries.push({
      url,
      // A category index is as fresh as its newest post: a real date.
      lastModified: newest(posts.filter((p) => getCategorySlug(p) === cat.slug)),
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: hreflang(url),
    });
  }

  for (const post of posts) {
    const categorySlug = getCategorySlug(post);
    const url = `${base}/blog/${categorySlug}/${post.slug}`;
    entries.push({
      url,
      // The real edit date, not the publish date. Falls back to publish date
      // only when the post has genuinely never been revised.
      lastModified: editedAt(post),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: hreflang(url),
    });
  }

  return entries;
}
