import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllPosts, getAllCategories, getCategorySlug } from "@/lib/blog";
import { allTools } from "@/lib/tools/registry";
import { MEDICAL_GUIDES } from "@/lib/medical-guides-data";
import { publishedGuideTopics } from "@/lib/resources/registry";

// Stable last-modified dates: no new Date() churn on every build.
// Google documents that churning lastmod degrades sitemap crawl-scheduling trust.
// Calculator fleet + audience landing pages shipped in the CRO-parity wave 2026-07-05.
// Informational statics and content structure pages stable since site launch 2026-06-03.
const CRO_WAVE = new Date("2026-07-05");
const STATIC = new Date("2026-06-03");
// Research asset shipped 2026-07-06; stable lastmod independent of CRO wave.
const RESEARCH_DATE = new Date("2026-07-06");
// Resource guides opened as public research pages 2026-07-17.
const RESOURCES_DATE = new Date("2026-07-17");

// Paths that received content changes in the 2026-07-05 CRO-parity wave.
// Everything else in staticPaths defaults to STATIC.
const CRO_WAVE_PATHS = new Set([
  "/calculators",
  "/free-practice-health-check",
  "/for-gps",
  "/for-consultants",
  "/for-locum-doctors",
  "/for-junior-doctors",
]);

// Research pages carry their own stable lastmod (RESEARCH_DATE), not CRO_WAVE.
const RESEARCH_PATHS = new Set([
  "/research",
  "/research/annual-allowance-pension-tax-index",
]);

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
    // /research pages: Annual Allowance Pension Tax Index (launched 2026-07-06)
    "/research",
    "/research/annual-allowance-pension-tax-index",
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
      lastModified: CRO_WAVE_PATHS.has(path) ? CRO_WAVE : RESEARCH_PATHS.has(path) ? RESEARCH_DATE : STATIC,
      changeFrequency: path === "/blog" ? "weekly" : "monthly",
      priority: path === "" ? 1 : 0.7,
      alternates: hreflang(url),
    };
  });

  // Calculator tool pages, derived from registry (SEO-01, no hand-listing)
  for (const tool of allTools()) {
    const url = `${base}/calculators/${tool.slug}`;
    entries.push({
      url,
      lastModified: CRO_WAVE,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: hreflang(url),
    });
  }

  for (const loc of siteConfig.locations) {
    const url = `${base}/locations/${loc.slug}`;
    entries.push({
      url,
      lastModified: STATIC,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: hreflang(url),
    });
  }

  // Precompute posts once; reused for both the category max-date map and the post loop.
  const posts = getAllPosts();

  // Build category-slug -> max(post.date) so each category page reflects its
  // most recently published post rather than churning on every deploy.
  const categoryMaxDate = new Map<string, Date>();
  for (const post of posts) {
    if (!post.date) continue;
    const d = new Date(post.date);
    const slug = getCategorySlug(post);
    const existing = categoryMaxDate.get(slug);
    if (!existing || d > existing) {
      categoryMaxDate.set(slug, d);
    }
  }

  for (const cat of getAllCategories()) {
    const url = `${base}/blog/${cat.slug}`;
    entries.push({
      url,
      lastModified: categoryMaxDate.get(cat.slug) ?? STATIC,
      changeFrequency: "weekly",
      priority: 0.75,
      alternates: hreflang(url),
    });
  }

  for (const post of posts) {
    const url = `${base}/blog/${post.slug}`;
    // Freshness signal: prefer the real last-modified date when present so an
    // actively maintained post does not signal as stale at its publish date.
    const postLastMod = post.dateModified || post.date;
    entries.push({
      url,
      lastModified: postLastMod ? new Date(postLastMod) : STATIC,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: hreflang(url),
    });
  }

  // Medical guide pages, derived from the TS data array (no file system glob needed)
  for (const guide of MEDICAL_GUIDES) {
    const url = `${base}/medical-guides/${guide.slug}`;
    entries.push({
      url,
      lastModified: STATIC,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: hreflang(url),
    });
  }

  // Resource guide pages: now open research resources (no email gate).
  for (const slug of publishedGuideTopics()) {
    const url = `${base}/resources/${slug}`;
    entries.push({
      url,
      lastModified: RESOURCES_DATE,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: hreflang(url),
    });
  }

  return entries;
}
