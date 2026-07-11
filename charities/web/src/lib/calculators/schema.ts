import { site } from "./site";

/**
 * WebApplication JSON-LD for an indexable calculator page (estate calculator
 * schema pattern, lifted from construction-cis/lib/calculator-schema.ts).
 * price "0" describes the free TOOL, not advisory fees.
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
    url: `${site.url}${path}`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any (web browser)",
    browserRequirements: "Requires JavaScript",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
    provider: {
      "@type": "Organization",
      "@id": `${site.url}#organization`,
      name: site.name,
      url: site.url,
    },
    inLanguage: "en-GB",
  });
}

/** FAQPage JSON-LD for a tool's FAQ block. */
export function buildFaqPageJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
