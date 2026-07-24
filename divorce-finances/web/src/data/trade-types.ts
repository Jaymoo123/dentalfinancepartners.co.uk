export interface TradeType {
  slug: string;
  segment: "trade" | "business";
  title: string;
  headline: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  stats: Array<{ value: string; label: string }>;
  challenges: Array<{ title: string; body: string }>;
  howWeHelp: Array<{ title: string; body: string }>;
  faqs: Array<{ question: string; answer: string }>;
  testimonial?: { quote: string; attribution: string };
}

/**
 * STUB (scaffold phase): empty. Audience content for the /for routes lands
 * with the content build. Interface unchanged so the /for routes keep
 * working generically.
 */
export const tradeTypes: TradeType[] = [];

/** Look up an audience entry by slug (or undefined). */
export function getTradeType(slug: string): TradeType | undefined {
  return tradeTypes.find((t) => t.slug === slug);
}
