import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllPosts, getAllCategories, getCategorySlug } from "@/lib/blog";
import { allTools } from "@/lib/tools/registry";
import { getGuideSlugs } from "@/lib/solicitor-guides";
import { enabledGuideTopics } from "@/lib/resources/registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");

  const staticPaths = [
    "",
    "/services",
    "/sra-compliance",
    "/about",
    "/contact",
    "/locations",
    "/blog",
    "/calculators",
    "/solicitor-guides",
    "/for-partners",
    "/for-firm-buyers",
    "/for-junior-solicitors",
    "/for-locum-solicitors",
    "/free-firm-health-check",
    "/law-firm-chart-of-accounts-template",
    "/tools/equity-partner-buy-in",
    "/uk-solicitor-tax-rates",
    "/specialist-vs-generalist-accountant",
    "/research",
    "/research/uk-legal-incorporation-index",
    "/research/law-firm-survival-index",
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

  // Calculator tool pages
  for (const tool of allTools().filter((t) => t.kind === "generic")) {
    const url = `${base}/calculators/${tool.slug}`;
    entries.push({
      url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: hreflang(url),
    });
  }

  // Solicitor guide pages (derived from the content directory via getGuideSlugs)
  for (const slug of getGuideSlugs()) {
    const url = `${base}/solicitor-guides/${slug}`;
    entries.push({
      url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: hreflang(url),
    });
  }

  // Resource guide pages (open, indexable from 2026-07-17)
  for (const topic of enabledGuideTopics()) {
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
