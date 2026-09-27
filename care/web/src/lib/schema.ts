import { siteConfig } from "@/config/site";
import { niche } from "@/config/niche-loader";
import type { BlogFrontmatter } from "@/types/blog";
import {
  buildOrganization,
  buildBlogPosting,
  referencedOrganization,
  type SiteSchemaOpts,
} from "@accounting-network/web-shared/schema";
import { careHubs } from "@/data/care-hubs";

export function buildOgImageUrl(title: string, category?: string) {
  const params = new URLSearchParams({ title });
  if (category) params.set("category", category);
  return `${siteConfig.url}/api/og?${params.toString()}`;
}

// LEADS_250 §13 T2/T5: ported onto the shared buildOrganization() so care
// gets legalName/parentOrganization/sameAs/knowsAbout via the same builder
// every other site uses, instead of a hand-rolled object. One Organization
// node, one stable @id, referenced (never duplicated) from every other page.
const office = siteConfig.company.registeredOffice;
const ORG_OPTS: SiteSchemaOpts = {
  siteUrl: siteConfig.url,
  siteName: siteConfig.name,
  legalName: siteConfig.company.legalName,
  alternateName: siteConfig.company.tradingName,
  description: siteConfig.description,
  // Array form preserves the pre-port ["ProfessionalService", <niche type>] @type.
  organizationType: ["ProfessionalService", niche.seo.organization_type],
  publisherLogoUrl: siteConfig.publisherLogoUrl,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${office.line1}, ${office.line2}`,
    addressLocality: office.city,
    postalCode: office.postcode,
    addressCountry: "GB",
  },
  areaServedCountry: "United Kingdom",
  priceRange: "££",
  // Titles of the /for/* sector hub pages (care-hubs.ts), so knowsAbout tracks
  // the pages that actually exist instead of a hand-picked list drifting out
  // of date (matches the charities port pattern).
  knowsAbout: careHubs.map((h) => h.title),
  sameAs: [
    "https://find-and-update.company-information.service.gov.uk/company/16358723",
    // Canonical homepages of the other four LEADS_250 programme brands.
    "https://www.propertytaxpartners.co.uk",
    "https://www.medicalaccounts.co.uk",
    "https://www.contractortaxaccountants.co.uk",
    "https://www.trusteetax.co.uk",
  ],
  parentOrganization: {
    name: "Ashfield Trading Ltd",
    companyNumber: "16358723",
  },
};

/** Organization JSON-LD — single site-wide node, emitted once from the root layout. */
export function buildOrganizationJsonLd() {
  return JSON.stringify(buildOrganization(ORG_OPTS));
}

/** Reference to the canonical Organization, for author/publisher on downstream nodes. */
export function organizationRef() {
  return referencedOrganization(ORG_OPTS);
}

/** BlogPosting JSON-LD for a blog post — author/publisher reference the canonical Organization. */
export function buildBlogPostingJsonLd(post: BlogFrontmatter, path: string) {
  return JSON.stringify(buildBlogPosting(post, path, ORG_OPTS, organizationRef()));
}

/** Build HowTo JSON-LD for step-by-step procedural posts (only when howToSteps present). */
export function buildHowToJsonLd(post: Pick<BlogFrontmatter, "h1" | "metaDescription" | "howToSteps">) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: post.h1,
    ...(post.metaDescription && { description: post.metaDescription }),
    step: (post.howToSteps ?? []).map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  });
}

export function buildWebsiteJsonLd() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: { "@id": `${siteConfig.url}#organization` },
    inLanguage: "en-GB",
  });
}

export function buildFaqJsonLd(faqs: { question: string; answer: string }[]) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  });
}

export function buildBreadcrumbJsonLd(items: { label: string; href?: string }[]) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href && { item: `${siteConfig.url}${item.href}` }),
    })),
  });
}

export function buildArticleJsonLd(opts: {
  title: string;
  description: string;
  url: string;
  dateModified?: string;
}) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    url: `${siteConfig.url}${opts.url}`,
    dateModified: opts.dateModified,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}${opts.url}` },
  });
}
