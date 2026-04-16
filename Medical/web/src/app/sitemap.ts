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
    const url = `${base}/locations/${loc.slug}`;
    entries.push({
      url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: hreflang(url),
    });
  }

  for (const cat of getAllCategories()) {
    const url = `${base}/blog/${cat.slug}`;
    entries.push({
      url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.75,
      alternates: hreflang(url),
    });
  }

  for (const post of getAllPosts()) {
    const url = `${base}/blog/${post.slug}`;
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
