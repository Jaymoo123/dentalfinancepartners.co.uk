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
      "Enterprise Management Incentives (EMI)",
      "Seed Enterprise Investment Scheme (SEIS)",
      "Enterprise Investment Scheme (EIS)",
      "R&D tax relief merged scheme",
      "Enhanced R&D Intensive Support (ERIS)",
      "Section 431 elections on restricted securities",
      "EIS/SEIS investor relief",
      "R&D claim notification",
      "SaaS accounting and VAT place-of-supply",
      "Startup tax planning",
      "Business Asset Disposal Relief",
      "EMI option pool setup and ERS returns",
      "Fractional CFO for funded startups",
    ],
    sameAs: [
      "https://find-and-update.company-information.service.gov.uk/company/16358723",
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

export function buildHowToJsonLd(post: { h1: string; metaDescription?: string; howToSteps?: { name: string; text: string }[] }) {
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

export function buildDatasetJsonLd(opts: {
  name: string;
  description: string;
  url: string;
  dateModified: string;
  sources: { name: string; url: string; licence: string; publisher: string }[];
}) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    dateModified: opts.dateModified,
    creator: { "@type": "Organization", "@id": `${siteConfig.url}#organization`, name: siteConfig.name },
    license: "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
    isAccessibleForFree: true,
    inLanguage: "en-GB",
    sourceOrganization: opts.sources.map((s) => ({
      "@type": "Organization",
      name: s.publisher,
      url: s.url,
      description: `${s.name}. Licence: ${s.licence}`,
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
