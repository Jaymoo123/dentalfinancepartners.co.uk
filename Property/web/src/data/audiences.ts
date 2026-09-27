/**
 * Row shape for a Property `/for/[slug]` segment page (LEADS_250 §13 S4a).
 * Writers fill this via the S3 manifest and the S4a wave integrator; empty
 * here so T1 (the route) builds cleanly before any page is written.
 */
export interface Audience {
  slug: string;
  title: string;
  headline: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  stats: Array<{ value: string; label: string }>;
  challenges: Array<{ title: string; body: string }>;
  howWeHelp: Array<{ title: string; body: string }>;
  faqs: Array<{ question: string; answer: string }>;
  /** Sources for `stats`/claims, per house_positions.md. Not rendered. */
  sources?: string[];
}

export const audiences: Audience[] = [];

export function getAudience(slug: string): Audience | undefined {
  return audiences.find((a) => a.slug === slug);
}
