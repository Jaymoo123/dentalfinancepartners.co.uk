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
    "/making-tax-digital-landlords",
    "/about",
    "/contact",
    "/incorporation",
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

  const entries: MetadataRoute.Sitemap = staticPaths.map((path) => {
    const url = `${base}${path}`;
    return {
      url,
      lastModified: new Date(),
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
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: hreflang(url),
    });
  }

  for (const tool of allTools()) {
    const url = `${base}/calculators/${tool.slug}`;
    entries.push({
      url,
      lastModified: new Date(),
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
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: hreflang(url),
    });
  }

  for (const post of getAllPosts()) {
    if (post.noindex) continue;
    const categorySlug = getCategorySlug(post);
    const url = `${base}/blog/${categorySlug}/${post.slug}`;
    entries.push({
      url,
      lastModified: post.date ? new Date(post.date) : new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: hreflang(url),
    });
  }

  return entries;
}
