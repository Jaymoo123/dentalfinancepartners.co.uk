import type { PackagesConfig } from "./types";

/**
 * FAQPage JSON-LD for a site's /pricing page, built from the same shared
 * default FAQ the PackagesSection renders plus the site's extra items, so
 * markup and visible content can never drift.
 */
export const PRICING_DEFAULT_FAQ = [
  {
    q: "What exactly is included?",
    a: "Each package covers the statutory compliance work listed on the card: the returns, accounts and filings named there, the software to keep your records straight, and answers to compliance questions by email. Tax planning and advisory work is scoped separately as project work with a fixed quote.",
  },
  {
    q: "How does onboarding work?",
    a: "Choose a package and complete the short signup form. No payment is taken today. We contact you within 1 working day to confirm scope, collect what we need, and get you set up. If you are switching accountants we handle the professional handover letter for you.",
  },
  {
    q: "Is there a contract or minimum term?",
    a: "No fixed term. You can cancel with 1 month's notice. If you join partway through your accounting year we will agree any catch-up work and price it before you commit.",
  },
  {
    q: "Do prices include VAT?",
    a: "Prices are shown exclusive of VAT. Where VAT applies it is added at the standard rate and shown clearly before you confirm anything.",
  },
];

export function buildPricingFaqJsonLd(config: PackagesConfig): Record<string, unknown> {
  const items = [...PRICING_DEFAULT_FAQ, ...(config.faq ?? [])];
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}
