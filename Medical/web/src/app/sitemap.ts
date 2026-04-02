import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllPosts, getAllCategories } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");

  const staticPaths = [
    "",
    "/services",
    "/nhs-pension",
    "/calculators",
    "/about",
    "/contact",
    "/locations",
    "/blog",
    "/privacy-policy",
    "/terms",
    "/cookie-policy",
  ];

  const entries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/blog" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  for (const loc of siteConfig.locations) {
    entries.push({
      url: `${base}/locations/${loc.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  for (const cat of getAllCategories()) {
    entries.push({
      url: `${base}/blog/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.75,
    });
  }

  for (const post of getAllPosts()) {
    entries.push({
      url: `${base}/blog/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  return entries;
}
