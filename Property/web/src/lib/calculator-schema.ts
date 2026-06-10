import { siteConfig } from "@/config/site";

/**
 * WebApplication JSON-LD for an interactive calculator page. Calculators are
 * exactly the kind of free tool AI engines and Google surface, so each
 * indexable calculator page emits this to be discoverable and citable.
 * `price: "0"` / isAccessibleForFree describe the TOOL being free — this is not
 * service pricing (the lead-gen "no pricing" rule is about advisory fees).
 */
export function buildCalculatorJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url: `${siteConfig.url}${path}`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any (web browser)",
    browserRequirements: "Requires JavaScript",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
    provider: {
      "@type": "Organization",
      "@id": `${siteConfig.url}#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
    inLanguage: "en-GB",
  });
}
