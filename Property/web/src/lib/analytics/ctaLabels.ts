/**
 * Human labels for the machine `cta_id` values stamped by `data-cta` attributes
 * across the site, so the analytics dashboard reads "Sticky bar — dismiss (×)"
 * instead of `sticky_cta_close`. Pure data + a prettify fallback for any id not
 * yet mapped (e.g. a brand-new CTA). Keep in sync with the `data-cta=` values in
 * the site components (SiteHeader, StickyCTA, DeepScrollModal, ReturningBar,
 * SpecialistWidget, the hero, and the calculator result CTAs).
 */
export type CtaLabel = { name: string; where: string };

const CTA_LABELS: Record<string, CtaLabel> = {
  hero_book: { name: "Book free consultation", where: "Homepage hero" },
  hero_calculators: { name: "Try free calculators", where: "Homepage hero" },
  header_book: { name: "Book consultation", where: "Header (desktop)" },
  header_book_mobile: { name: "Book consultation", where: "Header (mobile menu)" },
  sticky_cta: { name: "Sticky bar offer", where: "Bar pinned to the bottom of the screen" },
  sticky_cta_close: { name: "Dismiss (×)", where: "Sticky bar close button" },
  deep_scroll_modal: { name: "Deep-scroll offer", where: "One-time popup after a deep scroll" },
  deep_scroll_close: { name: "Dismiss (×)", where: "Deep-scroll popup close button" },
  returning_bar: { name: "Returning-visitor offer", where: "Greeting bar shown on a return visit" },
  returning_bar_close: { name: "Dismiss (×)", where: "Returning bar close button" },
  specialist_widget: { name: "Ask a specialist", where: "Bottom-right support widget" },
};

/** Human label + location for a cta_id. Falls back to a prettified id. */
export function ctaLabel(id: string): CtaLabel {
  if (CTA_LABELS[id]) return CTA_LABELS[id];
  if (id.startsWith("calc_result_")) {
    const slug = id.slice("calc_result_".length);
    return { name: "Calculator result CTA", where: `After a result on the ${slug} tool` };
  }
  const name = id
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return { name, where: id };
}

/** A dismiss/close control (these emit cta_click too, but are dead-ends by design). */
export function isDismissCta(id: string): boolean {
  return id.endsWith("_close") || id.endsWith("-close") || /dismiss/i.test(id);
}
