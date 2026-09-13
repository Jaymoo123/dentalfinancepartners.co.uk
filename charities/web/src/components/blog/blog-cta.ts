/**
 * Blog CTA copy.
 *
 * COPY. Every string here is already published on this site today, lifted
 * verbatim so the design port changes no words:
 *   heading / body / button  -> src/app/blog/[category]/[slug]/page.tsx:148-153
 *                               at production SHA 958460de
 * P2-4 owns the per-category map (`src/data/blog-cta-copy.ts`). Until that
 * lands, every category gets this one block, which is what every post already
 * showed. Nothing here is authored copy.
 */
export const BLOG_CTA = {
  heading: "Need help with your charity's accounts?",
  body: "Tell us about your charity, CIC or social enterprise and we will arrange a short introductory call.",
  button: "Get in touch",
} as const;
