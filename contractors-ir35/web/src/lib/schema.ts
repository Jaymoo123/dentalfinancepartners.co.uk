import type { BlogPost } from "@/types/blog";
import { siteConfig } from "@/config/site";
import type { BreadcrumbItem } from "@/components/ui/Breadcrumb";

/** IR35 / contractor-accountancy expertise signals, reused across Organization + LocalBusiness. */
const KNOWS_ABOUT = [
  "IR35",
  "Off-payroll working rules",
  "Contractor accountancy",
  "Limited company contractor tax",
  "Umbrella vs limited company",
  "Personal service company (PSC) tax",
  "CEST and IR35 status determination",
  "Deemed employment payment",
  "Director salary and dividends",
  "Contractor tax planning",
];

const AREA_SERVED = [
  "London",
  "Manchester",
  "Birmingham",
  "Leeds",
  "Bristol",
  "Glasgow",
  "Edinburgh",
  "Reading",
  "Cambridge",
  "Oxford",
];

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
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "AccountingService"],
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.publisherLogoUrl}`,
    description: siteConfig.description,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    areaServed: AREA_SERVED,
    knowsAbout: KNOWS_ABOUT,
    priceRange: "££",
  });
}

/** Build WebSite JSON-LD (entity-graph node, emitted site-wide from the root layout). */
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

/** Build DefinedTerm JSON-LD for a glossary entry (returns an object for embedding in a set) */
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
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
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
    knowsAbout: KNOWS_ABOUT,
    ...(opts.serviceTypes && { serviceType: opts.serviceTypes }),
  });
}

/** Build Dataset + Article JSON-LD for the research / data-PR index (AI-citable). */
export function buildDatasetJsonLd(opts: {
  name: string;
  description: string;
  url: string;
  csvUrl: string;
  dateModified: string;
  temporalCoverage: string;
  variableMeasured: string[];
}) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    license: "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
    creator: { "@type": "Organization", "@id": `${siteConfig.url}#organization`, name: siteConfig.name },
    dateModified: opts.dateModified,
    temporalCoverage: opts.temporalCoverage,
    isAccessibleForFree: true,
    distribution: [
      { "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: opts.csvUrl },
    ],
    variableMeasured: opts.variableMeasured,
  });
}

/** Build Article JSON-LD for research / editorial pages. */
export function buildArticleJsonLd(opts: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
}) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    author: { "@type": "Organization", "@id": `${siteConfig.url}#organization`, name: siteConfig.name },
    publisher: { "@id": `${siteConfig.url}#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": opts.url },
  });
}

/** Fallback BlogPosting JSON-LD when Python `schema` frontmatter is absent. */
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
    // Faceless editorial review when present (E-E-A-T signal for answer engines).
    ...(post.reviewedBy && {
      reviewedBy: {
        "@type": "Person",
        name: post.reviewedBy,
        ...(post.reviewerCredentials && { jobTitle: post.reviewerCredentials }),
      },
    }),
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}${siteConfig.publisherLogoUrl}`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    // Tells voice / answer engines which DOM nodes carry the clean extractable answer.
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".tldr", "h1"],
    },
  });
}
