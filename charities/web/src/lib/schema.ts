import { siteConfig } from "@/config/site";
import { niche } from "@/config/niche-loader";
import {
  buildOrganization,
  referencedOrganization,
  type SiteSchemaOpts,
} from "@accounting-network/web-shared/schema";
import { charityTypes } from "@/data/charity-types";

// ponytail: only the builders the site uses today (Organization/WebSite/OG url).
// Borrow FAQ/Service/LocalBusiness builders from contractors-ir35 when pages need them.

/** OG image URL for a blog post based on title (+ optional category). */
export function buildOgImageUrl(title: string, category?: string) {
  const params = new URLSearchParams({ title });
  if (category) params.set("category", category);
  return `${siteConfig.url}/api/og?${params.toString()}`;
}

// LEADS_250 §13 T2/T5: ported onto the shared buildOrganization() so charities
// gets legalName/parentOrganization/sameAs/knowsAbout via the same builder
// every other site uses, instead of a hand-rolled object. One Organization
// node, one stable @id, referenced (never duplicated) from every other page.
const ORG_OPTS: SiteSchemaOpts = {
  siteUrl: siteConfig.url,
  siteName: siteConfig.name,
  legalName: siteConfig.company.legalName,
  description: siteConfig.description,
  // Array form preserves the pre-port ["ProfessionalService", <niche type>] @type.
  // SiteSchemaOpts.organizationType is typed as string, but buildOrganization
  // passes it straight through to Organization["@type"] (string | string[]).
  organizationType: ["ProfessionalService", niche.seo.organization_type] as unknown as string,
  publisherLogoUrl: siteConfig.publisherLogoUrl,
  // No serviceAreas: niche.seo.service_areas is just ["United Kingdom"], and
  // passing it makes buildOrganization emit a City node. Omitting it takes the
  // builder's default areaServedCountry Country node instead (same meaning as
  // the pre-port literal ["United Kingdom"], correct @type).
  address: {
    "@type": "PostalAddress",
    streetAddress: `${siteConfig.company.registeredOffice.line1}, ${siteConfig.company.registeredOffice.line2}`,
    addressLocality: siteConfig.company.registeredOffice.city,
    postalCode: siteConfig.company.registeredOffice.postcode,
    addressCountry: "GB",
  },
  // Titles of the /for/* sector hub pages, so knowsAbout tracks the pages that
  // actually exist instead of a hand-picked list drifting out of date.
  knowsAbout: charityTypes.map((t) => t.title),
  sameAs: [
    "https://find-and-update.company-information.service.gov.uk/company/16358723",
    // Canonical homepages of the other four LEADS_250 programme brands.
    "https://www.propertytaxpartners.co.uk",
    "https://www.medicalaccounts.co.uk",
    "https://www.contractortaxaccountants.co.uk",
    "https://www.carehometax.co.uk",
  ],
  parentOrganization: {
    name: "Ashfield Trading Ltd",
    companyNumber: "16358723",
  },
};

/** Organization JSON-LD — every field flows from niche.config.json (BRAND_TBD safe). */
export function buildOrganizationJsonLd() {
  return JSON.stringify(buildOrganization(ORG_OPTS));
}

/** Reference to the canonical Organization, for author/publisher on downstream nodes. */
export function organizationRef() {
  return referencedOrganization(ORG_OPTS);
}

/** WebSite JSON-LD (entity-graph node, emitted site-wide from the root layout). */
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

/** FAQPage JSON-LD */
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

/** BreadcrumbList JSON-LD */
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

/** Article JSON-LD for blog and guide pages */
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
    author: organizationRef(),
    publisher: organizationRef(),
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}${opts.url}` },
  });
}

/** HowTo JSON-LD for step-by-step pages (only emit when howToSteps is present). */
export function buildHowToJsonLd(opts: {
  name: string;
  description?: string;
  steps: { name: string; text: string }[];
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
