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

export function buildDatasetJsonLd(opts: {
  name: string;
  description: string;
  url: string;
  dateModified: string;
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
      "@type": "Organization",
      "@id": `${siteConfig.url}#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
    isAccessibleForFree: true,
    license: "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
    sourceOrganization: [
      {
        "@type": "Organization",
        name: "Companies House",
        url: "https://developer.company-information.service.gov.uk/api/docs/",
        description: "UK companies register data (SIC 47910) under Open Government Licence v3.0",
      },
      {
        "@type": "Organization",
        name: "Office for National Statistics",
        url: "https://www.ons.gov.uk/businessindustryandtrade/retailindustry/timeseries/j4mc/drsi",
        description: "ONS Retail Sales Index series J4MC (internet retail as % of all retail) under Open Government Licence v3.0",
      },
    ],
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
