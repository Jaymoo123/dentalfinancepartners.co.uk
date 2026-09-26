import { siteConfig } from "@/config/site";
import { niche } from "@/config/niche-loader";

export function buildOgImageUrl(title: string, category?: string) {
  const params = new URLSearchParams({ title });
  if (category) params.set("category", category);
  return `${siteConfig.url}/api/og?${params.toString()}`;
}

export function buildOrganizationJsonLd() {
  const office = siteConfig.company.registeredOffice;
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", niche.seo.organization_type],
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
    legalName: siteConfig.company.legalName,
    alternateName: siteConfig.company.tradingName,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.publisherLogoUrl}`,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${office.line1}, ${office.line2}`,
      addressLocality: office.city,
      postalCode: office.postcode,
      addressCountry: "GB",
    },
    areaServed: niche.seo.service_areas,
    priceRange: "££",
    knowsAbout: [
      "VAT registration for online sellers",
      "Ecommerce VAT compliance",
      "Marketplace deemed-supplier rules",
      "Settlement and payout reconciliation",
      "Platform reporting obligations (DAC7)",
      "Making Tax Digital for Income Tax",
      "Cross-border selling IOSS and OSS",
      "Sole trader vs limited company for online sellers",
      "Amazon FBA and FBM tax",
      "Shopify seller accounts",
    ],
    sameAs: [
      "https://find-and-update.company-information.service.gov.uk/company/16358723",
    ],
  });
}

export function buildHowToJsonLd(post: { h1: string; metaDescription?: string; howToSteps?: { name: string; text: string }[] }) {
  return {
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
  };
}

type DatasetSource = {
  "@type": "Organization";
  name: string;
  url: string;
  description: string;
};

/**
 * The Index page's sources, and the DEFAULT, so that page stays byte-identical.
 * The survival study passes its own: an adversarial review found it publishing
 * these two in its Dataset schema while its every figure comes from ONS
 * Business Demography Table 4.2. Companies House SIC 47910 and the ONS Retail
 * Sales Index contribute nothing to that page, so the schema was telling Google
 * a provenance the page itself never claims.
 */
const INDEX_SOURCES: DatasetSource[] = [
  {
    "@type": "Organization",
    name: "Companies House",
    // The old developer.company-information.service.gov.uk/api/docs/ path is a
    // 404 and was published inside the Dataset schema on BOTH research pages.
    // This is where the Advanced Company Search reference moved to, and its
    // body documents the exact parameters these citations name (sic_codes,
    // company_status, incorporated_from, dissolved_from).
    url: "https://developer-specs.company-information.service.gov.uk/companies-house-public-data-api/reference/search/advanced-company-search",
    description: "UK companies register data (SIC 47910) under Open Government Licence v3.0",
  },
  {
    "@type": "Organization",
    name: "Office for National Statistics",
    url: "https://www.ons.gov.uk/businessindustryandtrade/retailindustry/timeseries/j4mc/drsi",
    description: "ONS Retail Sales Index series J4MC (internet retail as % of all retail) under Open Government Licence v3.0",
  },
];

export function buildDatasetJsonLd(opts: {
  name: string;
  description: string;
  url: string;
  dateModified: string;
  sourceOrganization?: DatasetSource[];
}) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: opts.name,
    description: opts.description,
    url: `${siteConfig.url}${opts.url}`,
    dateModified: opts.dateModified,
    inLanguage: "en-GB",
    creator: {
      // The "@id" RESOLVES and must stay. `buildOrganizationJsonLd` in this
      // file is indeed dead, but it is not the only definition: app/layout.tsx
      // declares its own `organizationJsonLd` with the same
      // `${siteUrl}#organization` id and renders it on EVERY page
      // (layout.tsx:61 and :145, verified in the served HTML). So this is a
      // real node reference, which is the whole point of an @id.
      //
      // A re-review reported this as a dangling reference and the manager
      // removed it before checking whether anything emitted the node. Do not
      // remove it again without grepping app/layout.tsx first.
      "@type": "Organization",
      "@id": `${siteConfig.url}#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
    isAccessibleForFree: true,
    license: "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
    sourceOrganization: opts.sourceOrganization ?? INDEX_SOURCES,
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
    // The publisher reference RESOLVES and is restored. It was removed on the
    // reasoning that `buildOrganizationJsonLd` in this file is dead, which is
    // true but irrelevant: app/layout.tsx declares its own `organizationJsonLd`
    // carrying the same `${siteUrl}#organization` id and renders it on every
    // page (layout.tsx:61 and :145, verified in the served HTML). Linking the
    // WebSite node to the Organization node is the reason both have an @id.
    publisher: { "@id": `${siteConfig.url}#organization` },
    inLanguage: "en-GB",
  });
}

/**
 * FAQ answers in src/data/{services,for,vat}.ts are authored with real anchors
 * inside the string, and the templates now render them as HTML so those links
 * work. Schema.org's acceptedAnswer.text tolerates a limited HTML subset, but
 * the conventional and safe value is plain text, so the tags come off HERE,
 * once, rather than at each of the five call sites. Plain-text answers (the
 * home page and the calculator pages) are unaffected: the regex matches
 * nothing and the string passes through byte-identical.
 *
 * ponytail: a regex, not a parser. The input is first-party content in this
 * repo, never user input, and it is markup we author, so there is no
 * adversarial case for a parser to win.
 */
function stripTags(html: string) {
  return html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

export function buildFaqJsonLd(faqs: { question: string; answer: string }[]) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: stripTags(faq.answer) },
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
