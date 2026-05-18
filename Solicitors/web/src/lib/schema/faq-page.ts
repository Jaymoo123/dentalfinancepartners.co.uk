import type { SchemaThing } from "./types";

/**
 * Build a FAQPage JSON-LD block. Use on pages with an explicit FAQ block
 * (service pages, pillar guides, calculators). Blog posts already have FAQ
 * schema generated inside buildBlogPostingJsonLd; do not double up.
 */
export type FaqInput = {
  question: string;
  answer: string;
};

export function buildFaqPage(faqs: FaqInput[]): SchemaThing | null {
  if (!faqs || faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}
