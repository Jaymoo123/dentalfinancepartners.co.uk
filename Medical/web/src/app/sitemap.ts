import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllPosts, getAllCategories } from "@/lib/blog";
import { allTools } from "@/lib/tools/registry";
import { MEDICAL_GUIDES } from "@/lib/medical-guides-data";

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
    "/medical-guides",
    "/free-practice-health-check",
    // /for-* audience pages
    "/for-gps",
    "/for-consultants",
    "/for-locum-doctors",
    "/for-junior-doctors",
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

  // Calculator tool pages — derived from registry (SEO-01, no hand-listing)
  for (const tool of allTools()) {
    const url = `${base}/calculators/${tool.slug}`;
    entries.push({
      url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: hreflang(url),
    });
  }

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

  // Medical guide pages — derived from the TS data array (no file system glob needed)
  for (const guide of MEDICAL_GUIDES) {
    const url = `${base}/medical-guides/${guide.slug}`;
    entries.push({
      url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: hreflang(url),
    });
  }

  return entries;
}
