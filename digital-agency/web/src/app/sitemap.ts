import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllPosts, getAllCategories, getCategorySlug } from "@/lib/blog";
import { getAllFundamentals } from "@/lib/fundamentals";
import { CITIES } from "@/app/locations/[slug]/data";
import { GLOSSARY } from "@/app/glossary/[slug]/data";
import { STORIES } from "@/app/founder-stories/[slug]/data";
import { GUIDES } from "@/app/guides/[slug]/data";
import { TEAM } from "@/app/team/[slug]/data";

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
    "/calculators/salary-dividend-optimiser",
    "/calculators/take-home-pay-calculator",
    "/calculators/employer-ni-calculator",
    "/calculators/pension-contribution-optimiser",
    "/calculators/rd-tax-credit-estimator",
    "/calculators/agency-valuation",
    "/calculators/badr-cgt-calculator",
    "/calculators/vat-scheme-comparator",
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
    "/newsletter",
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
      priority: path === "" ? 1 : path.startsWith("/agencies/") ? 0.8 : 0.7,
      alternates: hreflang(url),
    };
  });

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

  for (const guide of getAllFundamentals()) {
    const url = `${base}/fundamentals/${guide.slug}`;
    entries.push({
      url,
      lastModified: guide.date ? new Date(guide.date) : new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: hreflang(url),
    });
  }

  for (const slug of Object.keys(CITIES)) {
    const url = `${base}/locations/${slug}`;
    entries.push({
      url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
      alternates: hreflang(url),
    });
  }

  for (const slug of Object.keys(GLOSSARY)) {
    const url = `${base}/glossary/${slug}`;
    entries.push({
      url,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
      alternates: hreflang(url),
    });
  }

  for (const slug of Object.keys(STORIES)) {
    const url = `${base}/founder-stories/${slug}`;
    entries.push({
      url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: hreflang(url),
    });
  }

  for (const slug of Object.keys(GUIDES)) {
    const url = `${base}/guides/${slug}`;
    entries.push({
      url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: hreflang(url),
    });
  }

  for (const slug of Object.keys(TEAM)) {
    const url = `${base}/team/${slug}`;
    entries.push({
      url,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
      alternates: hreflang(url),
    });
  }

  return entries;
}
