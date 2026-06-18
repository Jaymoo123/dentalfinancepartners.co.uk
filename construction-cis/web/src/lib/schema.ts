import type { BlogPost } from "@/types/blog";
import { siteConfig } from "@/config/site";
import type { BreadcrumbItem } from "@/components/ui/Breadcrumb";

/** Build BreadcrumbList JSON-LD schema */
export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
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

/** Build OG image URL for a blog post based on category and title */
export function buildOgImageUrl(title: string, category?: string) {
  const params = new URLSearchParams({ title });
  if (category) params.set("category", category);
  return `${siteConfig.url}/api/og?${params.toString()}`;
}

/** Build Organization JSON-LD schema for the site */
export function buildOrganizationJsonLd() {
  const office = siteConfig.company.registeredOffice;
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "AccountingService"],
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
    // Registered legal entity vs the public-facing trading name (brand).
    legalName: siteConfig.company.legalName,
    alternateName: siteConfig.company.tradingName,
    // When Ashfield Trading Ltd becomes VAT-registered, add: vatID: siteConfig.company.vatNumber
    url: siteConfig.url,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${office.line1}, ${office.line2}`,
      addressLocality: office.city,
      postalCode: office.postcode,
      addressCountry: "GB",
    },
    areaServed: [
      "London",
      "Manchester",
      "Birmingham",
      "Leeds",
      "Bristol",
      "Glasgow",
      "Edinburgh",
      "Sheffield",
      "Liverpool",
      "Newcastle",
    ],
    knowsAbout: [
      "CIS tax refunds",
      "Construction Industry Scheme",
      "Gross Payment Status",
      "CIS accounting",
      "CIS deduction rates",
    ],
    priceRange: "££",
  });
}

/** Build FAQPage JSON-LD schema from an array of question/answer pairs */
export function buildFaqJsonLd(faqs: { question: string; answer: string }[]) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  });
}

/** Build HowTo JSON-LD schema for step-by-step process pages */
export function buildHowToJsonLd(opts: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.name,
    description: opts.description,
    step: opts.steps.map((step) => ({
      "@type": "HowToStep",
      name: step.name,
      text: step.text,
    })),
  });
}

/** Build Service JSON-LD schema for individual service pages */
export function buildServiceJsonLd(opts: {
  name: string;
  description: string;
  url: string;
}) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    provider: {
      "@type": "ProfessionalService",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: "United Kingdom",
  });
}

/** Build DefinedTerm JSON-LD for a glossary entry */
export function buildDefinedTerm(opts: {
  slug: string;
  term: string;
  definition: string;
  inDefinedTermSet: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: opts.term,
    description: opts.definition,
    url: `${siteConfig.url}/glossary/${opts.slug}`,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: opts.inDefinedTermSet,
      url: `${siteConfig.url}/glossary`,
    },
  };
}

/** Build LocalBusiness / AccountingService JSON-LD for city pages */
export function buildLocalBusinessJsonLd(opts: {
  name: string;
  description: string;
  url: string;
  city: string;
  region: string;
  geo?: { lat: number; lng: number };
  areaServed: string[];
  serviceTypes?: string[];
}) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "AccountingService"],
    name: opts.name,
    description: opts.description,
    url: `${siteConfig.url}${opts.url}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: opts.city,
      addressRegion: opts.region,
      addressCountry: "GB",
    },
    ...(opts.geo && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: opts.geo.lat,
        longitude: opts.geo.lng,
      },
    }),
    areaServed: opts.areaServed.map((area) => ({
      "@type": "City",
      name: area,
    })),
    priceRange: "££",
    knowsAbout: [
      "CIS tax refunds",
      "Construction Industry Scheme",
      "Gross Payment Status",
      "CIS accounting",
      "CIS deduction rates",
    ],
    ...(opts.serviceTypes && { serviceType: opts.serviceTypes }),
  });
}

/** Fallback BlogPosting JSON-LD when Python `schema` frontmatter is absent */
export function buildBlogPostingJsonLd(post: BlogPost, path: string) {
  const url = `${siteConfig.url}${path}`;
  const imageUrl = post.image
    ? (post.image.startsWith("http") ? post.image : `${siteConfig.url}${post.image}`)
    : buildOgImageUrl(post.title, post.category);

  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.h1 || post.title,
    description: post.metaDescription,
    image: imageUrl,
    url,
    datePublished: post.date,
    dateModified: post.updatedDate || post.date,
    author: {
      "@type": "Person",
      name: post.author || siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  });
}
