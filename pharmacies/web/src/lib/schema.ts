import { siteConfig } from "@/config/site";
import { niche } from "@/config/niche-loader";
import { buildOrganization, buildService } from "@accounting-network/web-shared/schema";
import type { HowToStep } from "@/types/blog";

export function buildOgImageUrl(title: string, category?: string) {
  const params = new URLSearchParams({ title });
  if (category) params.set("category", category);
  return `${siteConfig.url}/api/og?${params.toString()}`;
}

// Ported to the shared builder (packages/web-shared/schema/organization.ts,
// Medical's lib/organization-schema.ts is the reference pattern). Every field
// the hand-rolled version carried survives: name, legalName, alternateName,
// url, logo, description, address, areaServed, priceRange, knowsAbout, sameAs.
export function buildOrganizationJsonLd() {
  const office = siteConfig.company.registeredOffice;
  return JSON.stringify(
    buildOrganization({
      siteUrl: siteConfig.url,
      siteName: siteConfig.name,
      legalName: "Ashfield Trading Ltd",
      alternateName: siteConfig.company.tradingName,
      description: niche.entity?.firm ?? siteConfig.description,
      tagline: siteConfig.tagline,
      organizationType: niche.seo.organization_type,
      publisherLogoUrl: siteConfig.publisherLogoUrl,
      address: {
        "@type": "PostalAddress",
        streetAddress: `${office.line1}, ${office.line2}`,
        addressLocality: office.city,
        postalCode: office.postcode,
        addressCountry: "GB",
      },
      areaServedCountry: "United Kingdom",
      knowsAbout: [
        "pharmacy acquisition",
        "NHS contract economics",
        "FP34 cash-flow planning",
        "VAT zero-rating on NHS dispensing",
        "pharmacy goodwill valuation",
        "Business Asset Disposal Relief",
        "Drug Tariff margin analysis",
      ],
      sameAs: ["https://find-and-update.company-information.service.gov.uk/company/16358723"],
      parentOrganization: {
        name: siteConfig.company.legalName,
        companyNumber: siteConfig.company.number,
      },
    }),
  );
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

// K9: FAQ answers in src/data/pharmacies-hubs.ts are authored HTML (5 of 61
// carry <a> cross-references); src/data/pharmacies-services.ts carries none
// today but is the same shape by rule. `acceptedAnswer.text` must be TEXT, so
// every answer is stripped and the five entities an HTML answer can legally
// carry are decoded, once here rather than at each call site.
// ponytail: regex, not a parser. These are authored strings in two data files,
// not user input; swap in an HTML parser if answers ever come from outside.
function toPlainText(html: string) {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

export function buildFaqJsonLd(faqs: { question: string; answer: string }[]) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: toPlainText(faq.answer) },
    })),
  });
}

/**
 * BlogPosting for a blog article. No post in content/blog carries a `schema:`
 * frontmatter field (W2 verified 0 of 22), so before this every post shipped
 * FAQPage and HowTo but no Article markup at all.
 *
 * `headline` takes the SAME field the visible <h1> renders (`post.h1`, which
 * lib/blog.ts already defaults to `title`), so the two cannot disagree: on
 * startups-tech the headline drifted from the <h1> on 19 of 32 posts because
 * the builder read `title` while the template rendered `h1`.
 *
 * `author` and `publisher` both point at the canonical Organization node from
 * buildOrganizationJsonLd rather than a bare name string: this site publishes
 * no person author and inventing one is a claim.
 */
export function buildBlogPostingJsonLd(opts: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
}) {
  const org = { "@type": "Organization", "@id": `${siteConfig.url}#organization` };
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: opts.headline,
    description: opts.description,
    url: opts.url,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    author: org,
    publisher: org,
    mainEntityOfPage: { "@type": "WebPage", "@id": opts.url },
  });
}

export function buildServiceJsonLd(opts: { name: string; description: string; url: string }) {
  return JSON.stringify(
    buildService(
      { name: opts.name, description: opts.description, url: opts.url, serviceType: "AccountingService" },
      { siteUrl: siteConfig.url, siteName: siteConfig.name, publisherLogoUrl: siteConfig.publisherLogoUrl },
    ),
  );
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
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    url: `${siteConfig.url}${opts.url}`,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    publisher: {
      "@type": "Organization",
      "@id": `${siteConfig.url}#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}${opts.url}` },
  });
}

export function buildHowToJsonLd(opts: {
  name: string;
  description?: string;
  steps: HowToStep[];
}) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.name,
    ...(opts.description && { description: opts.description }),
    step: opts.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  });
}

export function buildDatasetJsonLd(opts: {
  name: string;
  description: string;
  url: string;
}) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: opts.name,
    description: opts.description,
    url: `${siteConfig.url}${opts.url}`,
    creator: { "@id": `${siteConfig.url}#organization` },
    sourceOrganization: [
      {
        "@type": "Organization",
        name: "NHS Business Services Authority",
        url: "https://www.nhsbsa.nhs.uk",
        license: "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
      },
      {
        "@type": "Organization",
        name: "Companies House",
        url: "https://www.gov.uk/government/organisations/companies-house",
        license: "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
      },
    ],
    license: "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
    inLanguage: "en-GB",
    spatialCoverage: "England",
  });
}
