import { siteConfig } from "@/config/site";
import type { SchemaThing } from "./types";

/**
 * Build a Service JSON-LD block. Use on the /services hub and on each
 * /services/[slug] sub-page so the listing earns rich result eligibility
 * (FAQ + Service together is a strong SERP signal for accountancy queries).
 */
export type ServiceInput = {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
  areaServed?: string | string[];
  audience?: string;
  category?: string;
};

export function buildService({
  name,
  description,
  path,
  serviceType,
  areaServed = "United Kingdom",
  audience = "UK dentists, dental practice owners and dental associates",
  category = "Accounting Services",
}: ServiceInput): SchemaThing {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${siteConfig.url}${path}`,
    serviceType: serviceType || name,
    category,
    areaServed,
    audience: {
      "@type": "Audience",
      audienceType: audience,
    },
    provider: {
      "@type": "AccountingService",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}
