import { siteConfig } from "@/config/site";
import { niche } from "@/config/niche-loader";
import {
  buildOrganization as buildOrganizationShared,
  referencedOrganization as referencedOrganizationShared,
  buildWebSite as buildWebSiteShared,
  type SiteSchemaOpts,
} from "@accounting-network/web-shared/schema";
import type { Organization, SchemaThing } from "./types";

/**
 * Ported to the shared builder (parity ruling 2026-09-28): the Organization
 * JSON-LD is no longer hand-rolled per site, it is `SiteSchemaOpts` fed into
 * `@accounting-network/web-shared/schema`. Every field the old hand-rolled
 * version emitted (name, legalName, alternateName, url, address, description,
 * logo, image, areaServed, knowsAbout, slogan, sameAs) survives via opts
 * below; `parentOrganization` (Ashfield Trading Ltd 16358723) is new.
 */
function opts(): SiteSchemaOpts {
  const office = siteConfig.company.registeredOffice;
  return {
    siteUrl: siteConfig.url,
    siteName: siteConfig.name,
    legalName: siteConfig.company.legalName,
    alternateName: siteConfig.company.tradingName,
    description: niche.entity?.firm ?? siteConfig.description,
    tagline: siteConfig.tagline,
    // The firm is an accountancy practice (owner ruling 2026-09-28; the shared
    // builder defaults to ProfessionalService).
    organizationType: "AccountingService",
    publisherLogoUrl: siteConfig.publisherLogoUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${office.line1}, ${office.line2}`,
      addressLocality: office.city,
      postalCode: office.postcode,
      addressCountry: "GB",
    },
    serviceAreas: niche.seo.service_areas,
    knowsAbout: [
      "UK agency taxation",
      "Corporation tax",
      "Dividend tax planning",
      "R&D tax credits for marketing and digital agencies",
      "IR35 for contractor engagements",
      "Business Asset Disposal Relief",
      "International tax for UK-UAE agency founders",
      "Making Tax Digital",
    ],
    // Only verifiable records: the Companies House filing. No LinkedIn company
    // page exists for this brand, so none is added.
    sameAs: [
      `https://find-and-update.company-information.service.gov.uk/company/${siteConfig.company.number}`,
    ],
    parentOrganization: {
      name: siteConfig.company.legalName,
      companyNumber: siteConfig.company.number,
    },
  };
}

/**
 * Canonical Organization for Agency Founder Finance (Ashfield Trading Ltd). Use as the
 * top-level Organization on the homepage, and as a referenced @id on
 * downstream pages via `referencedOrganization()`.
 */
export function buildOrganization(): Organization {
  return buildOrganizationShared(opts()) as unknown as Organization;
}

/**
 * Lightweight reference to the canonical Organization, used as `publisher`
 * or `provider` on downstream schema objects so JSON-LD parsers can
 * de-duplicate to the single full record.
 */
export function referencedOrganization(): SchemaThing {
  return referencedOrganizationShared(opts());
}

/**
 * WebSite schema for the homepage, includes a SearchAction so Google can
 * render the sitelinks search box.
 */
export function buildWebSite(): SchemaThing {
  return buildWebSiteShared(opts());
}
