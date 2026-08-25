export type FaqEntry = { question: string; answer: string };

/**
 * FAQPage with a mainEntity Question/Answer pair list. Use on any page that
 * has a Q&A section so Google and AI engines can surface direct-answer cards.
 */
export function buildFaqPageJsonLd(faqs: FaqEntry[]) {
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
