import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllPosts, getAllCategories, getCategorySlug } from "@/lib/blog";
import { getAllFundamentals } from "@/lib/fundamentals";
import { CITIES } from "@/app/locations/[slug]/data";
import { GLOSSARY } from "@/app/glossary/[slug]/data";
import { STORIES } from "@/app/founder-stories/[slug]/data";
import { GUIDES } from "@/app/guides/[slug]/data";
import { TEAM } from "@/app/team/[slug]/data";
import { allTools } from "@/lib/tools/registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");

  const staticPaths = [
    "",
    "/services",
    "/about",
    "/contact",
    "/agencies",
    "/agencies/marketing-agencies",
    "/agencies/digital-agencies",
    "/agencies/creative-agencies",
    "/agencies/advertising-agencies",
    "/agencies/pr-agencies",
    "/agencies/web-design-agencies",
    "/agencies/seo-agencies",
    "/agencies/recruitment-agencies",
    "/agencies/ppc-agencies",
    "/agencies/performance-marketing-agencies",
    "/agencies/influencer-marketing-agencies",
    "/agencies/email-marketing-agencies",
    "/agencies/branding-agencies",
    "/agencies/social-media-agencies",
    "/agencies/ai-agencies",
    "/agencies/ecommerce-agencies",
    "/agencies/video-production-agencies",
    "/agencies/saas-agencies",
    "/agencies/crypto-web3-agencies",
    "/free-health-check",
    "/incorporation",
    "/dubai-relocation",
    "/portugal-relocation",
    "/cyprus-relocation",
    "/spain-relocation",
    "/singapore-relocation",
    "/malta-relocation",
    "/estonia-relocation",
    "/greece-relocation",
    "/italy-relocation",
    "/switzerland-relocation",
    "/r-and-d-credits",
    "/guides",
    "/blog",
    "/fundamentals",
    "/calculators",
    "/locations",
    "/glossary",
    "/founder-stories",
    "/for-new-founders",
    "/for-growth-stage",
    "/for-pre-exit",
    "/mazuma-vs",
    "/crunch-alternative",
    "/specialist-vs-generalist-accountant",
    "/uk-tax-rates",
    "/research",
    "/research/uk-agency-formation-index",
    "/research/uk-agency-survival-churn-index",
    "/research/uk-agency-insolvency-index",
    // /newsletter removed from sitemap (newsletter retired, owner-locked).
    // The /newsletter page itself stays live returning 200 for graceful landings.
    "/privacy-policy",
    "/terms",
    "/cookie-policy",
  ];

  const hreflang = (url: string) => ({
    languages: { "en-GB": url, "x-default": url },
  });

  // ponytail: pinned date stops sitemap churn on every deploy; bump when site structure changes
  const STATIC_LAST_MOD = new Date("2026-07-08");

  const entries: MetadataRoute.Sitemap = staticPaths.map((path) => {
    const url = `${base}${path}`;
    return {
      url,
      lastModified: STATIC_LAST_MOD,
      changeFrequency: path === "/blog" ? "weekly" : "monthly",
      priority: path === "" ? 1 : path.startsWith("/agencies/") ? 0.8 : 0.7,
      alternates: hreflang(url),
    };
  });

  // TL-01: tool pages derived from registry — no hard-listed slugs.
  for (const t of allTools()) {
    const url = `${base}/calculators/${t.slug}`;
    entries.push({
      url,
      lastModified: STATIC_LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: hreflang(url),
    });
  }

  const categories = getAllCategories();
  for (const cat of categories) {
    const url = `${base}/blog/${cat.slug}`;
    entries.push({
      url,
      lastModified: STATIC_LAST_MOD,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: hreflang(url),
    });
  }

  for (const post of getAllPosts()) {
    const categorySlug = getCategorySlug(post);
    const url = `${base}/blog/${categorySlug}/${post.slug}`;
    entries.push({
      url,
      lastModified: post.updatedDate ? new Date(post.updatedDate) : post.date ? new Date(post.date) : STATIC_LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: hreflang(url),
    });
  }

  for (const guide of getAllFundamentals()) {
    const url = `${base}/fundamentals/${guide.slug}`;
    entries.push({
      url,
      lastModified: guide.date ? new Date(guide.date) : STATIC_LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: hreflang(url),
    });
  }

  for (const slug of Object.keys(CITIES)) {
    const url = `${base}/locations/${slug}`;
    entries.push({
      url,
      lastModified: STATIC_LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.85,
      alternates: hreflang(url),
    });
  }

  for (const slug of Object.keys(GLOSSARY)) {
    const url = `${base}/glossary/${slug}`;
    entries.push({
      url,
      lastModified: STATIC_LAST_MOD,
      changeFrequency: "yearly",
      priority: 0.6,
      alternates: hreflang(url),
    });
  }

  for (const slug of Object.keys(STORIES)) {
    const url = `${base}/founder-stories/${slug}`;
    entries.push({
      url,
      lastModified: STATIC_LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: hreflang(url),
    });
  }

  for (const slug of Object.keys(GUIDES)) {
    const url = `${base}/guides/${slug}`;
    entries.push({
      url,
      lastModified: STATIC_LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: hreflang(url),
    });
  }

  for (const slug of Object.keys(TEAM)) {
    const url = `${base}/team/${slug}`;
    entries.push({
      url,
      lastModified: STATIC_LAST_MOD,
      changeFrequency: "yearly",
      priority: 0.5,
      alternates: hreflang(url),
    });
  }

  return entries;
}
