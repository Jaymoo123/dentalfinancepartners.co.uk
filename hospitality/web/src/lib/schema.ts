import { siteConfig } from "@/config/site";
import { niche } from "@/config/niche-loader";
import {
  buildOrganization,
  buildService as buildServiceThing,
  buildBlogPosting,
  buildBreadcrumb,
  referencedOrganization,
} from "@accounting-network/web-shared/schema";
import type { ArticleInput, SiteSchemaOpts } from "@accounting-network/web-shared/schema";

export function buildOgImageUrl(title: string, category?: string) {
  const params = new URLSearchParams({ title });
  if (category) params.set("category", category);
  return `${siteConfig.url}/api/og?${params.toString()}`;
}

/**
 * Site-wide schema opts, built once from siteConfig/niche and reused by every
 * shared builder below (Organization, Service). 2026-09-28 parity: ported off
 * a hand-rolled JSON.stringify to the shared `packages/web-shared/schema`
 * builder so parentOrganization (missing before) comes for free and every
 * other site emits Organization the same way.
 */
export function siteSchemaOpts(): SiteSchemaOpts {
  const office = siteConfig.company.registeredOffice;
  return {
    siteUrl: siteConfig.url,
    siteName: siteConfig.name,
    legalName: "Ashfield Trading Ltd",
    description: siteConfig.description,
    organizationType: ["ProfessionalService", niche.seo.organization_type],
    publisherLogoUrl: siteConfig.publisherLogoUrl,
    alternateName: siteConfig.company.tradingName,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${office.line1}, ${office.line2}`,
      addressLocality: office.city,
      postalCode: office.postcode,
      addressCountry: "GB",
    },
    // F2 fix 3: niche.seo.service_areas holds a country name ("United Kingdom"),
    // not a list of cities. Passing it as `serviceAreas` made the shared builder
    // type it "City" (organization.ts:16 maps every serviceAreas entry to City).
    // areaServedCountry is the correct opt for a country-wide area.
    areaServedCountry: niche.seo.service_areas?.[0] ?? "United Kingdom",
    // F2 fix 1: this firm publishes no prices (fees quoted after a call).
    knowsAbout: [
      "Hospitality accounting",
      "Tronc and tips compliance",
      "Food and drink VAT",
      "Hospitality payroll",
      "Alcohol duty and draught relief",
      "Machine Games Duty",
      "Business rates relief",
      "Making Tax Digital for Income Tax",
      "TOMS margin scheme",
      "Capital allowances for kitchen fit-out",
    ],
    sameAs: ["https://find-and-update.company-information.service.gov.uk/company/16358723"],
    parentOrganization: {
      name: "Ashfield Trading Ltd",
      companyNumber: "16358723",
    },
  };
}

export function buildOrganizationJsonLd() {
  return JSON.stringify(buildOrganization(siteSchemaOpts()));
}

export function buildServiceJsonLd(input: {
  name: string;
  description: string;
  url: string;
  serviceType?: string;
}) {
  return JSON.stringify(buildServiceThing(input, siteSchemaOpts()));
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
  datePublished?: string;
  dateModified?: string;
}) {
  const datePublished = opts.datePublished;
  const dateModified = opts.dateModified ?? opts.datePublished;
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    url: `${siteConfig.url}${opts.url}`,
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    publisher: {
      "@type": "Organization",
      "@id": `${siteConfig.url}#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}${opts.url}` },
  });
}

/**
 * BlogPosting JSON-LD for a blog post, via the shared kit builder (F2 fix 5).
 * No post carries a real `author` (frontmatter author is always ""), so the
 * Organization stub stands in as author, same as publisher.
 */
export function buildBlogPostingJsonLd(post: ArticleInput, path: string) {
  const opts = siteSchemaOpts();
  return JSON.stringify(buildBlogPosting(post, path, opts, referencedOrganization(opts)));
}

/** BreadcrumbList JSON-LD via the shared kit builder (F2 fix 6). */
export function buildPageBreadcrumbJsonLd(items: { label: string; href?: string }[]) {
  return JSON.stringify(buildBreadcrumb(items, siteSchemaOpts()));
}

export function buildHowToJsonLd(
  post: { h1: string; metaDescription?: string; howToSteps?: Array<{ name: string; text: string }> },
) {
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
