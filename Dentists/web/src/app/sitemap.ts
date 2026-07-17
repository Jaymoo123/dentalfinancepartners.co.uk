import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllPosts, getAllCategories, getCategorySlug } from "@/lib/blog";
import { allTools } from "@/lib/tools/registry";
import { getAllGuides } from "@/lib/dental-guides";
import { publishedGuideTopicsWithFile } from "@/lib/resources/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");

  const staticPaths = [
    "",
    "/services",
    "/about",
    "/contact",
    "/locations",
    "/blog",
    "/calculators",
    "/dental-guides",
    "/for-associates",
    "/for-principals",
    "/for-practice-buyers",
    "/for-locum-dentists",
    "/free-practice-health-check",
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

  const categories = getAllCategories();
  for (const cat of categories) {
    const url = `${base}/blog/${cat.slug}`;
    entries.push({
      url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.75,
      alternates: hreflang(url),
    });
  }

  const allPosts = getAllPosts();
  for (const post of allPosts) {
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

  for (const tool of allTools()) {
    const url = `${base}/calculators/${tool.slug}`;
    entries.push({
      url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: hreflang(url),
    });
  }

  // Pillar guides (/dental-guides/[slug])
  const guides = getAllGuides();
  for (const guide of guides) {
    const url = `${base}/dental-guides/${guide.slug}`;
    entries.push({
      url,
      lastModified: guide.date ? new Date(guide.date) : new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: hreflang(url),
    });
  }

  // Open resource guides (/resources/[topic]) — indexable since 2026-07-17
  for (const topic of publishedGuideTopicsWithFile()) {
    const url = `${base}/resources/${topic}`;
    entries.push({
      url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: hreflang(url),
    });
  }

  return entries;
}
