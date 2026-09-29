import { Star } from "lucide-react";
import type { ReactNode } from "react";
import { siteContainerLg } from "../layout-utils";
import { Eyebrow } from "../primitives/page-blocks";

// Anonymised social proof only (no client names), per the lead-gen model.
// `highlight` is bolded inside the quote and must appear verbatim in `quote`.
export type TestimonialItem = {
  quote: string;
  /** Bolded tail of the quote; optional since 2026-09-29 (a site may pass a
   *  whole quote with nothing emphasised). */
  highlight?: string;
  who: string;
  detail?: string;
  initials?: string;
};

export const testimonials: TestimonialItem[] = [
  {
    quote: "They modelled our Section 24 position properly for the first time and showed us exactly where incorporation did and did not make sense. ",
    highlight: "No hard sell, just the numbers.",
    who: "Higher-rate landlord",
    detail: "7-property portfolio, London",
    initials: "HL",
  },
  {
    quote: "We were weeks from missing the 60-day capital gains deadline on a sale. They turned the computation around and filed on time. ",
    highlight: "Worth the fee on that alone.",
    who: "Buy-to-let investor",
    detail: "Manchester",
    initials: "BI",
  },
  {
    quote: "Getting ready for Making Tax Digital felt overwhelming. They set up the software, mapped every property, and ",
    highlight: "now the quarterly filing just happens.",
    who: "Individual landlord",
    detail: "2 properties, Leeds",
    initials: "IL",
  },
];

/**
 * Navy testimonial band, echoing the hero backdrop. Shared by the homepage and
 * /services so the quotes stay identical in both places: one edit, both pages.
 * `description` varies because the two pages arrive at the proof from different
 * contexts, so it is a prop rather than baked in.
 */
export function TestimonialsSection({
  eyebrow = "Testimonials",
  title = "What landlords say",
  description = "Anonymised feedback from landlords and investors we have worked with.",
  backdrop,
  items = testimonials,
  showRating = true,
  footnote,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  /** Hero-band texture layer behind the quotes. Per-site; replaces Property's
   *  `<HeroBrickBackdrop />` (`components/layout/HeroBrickBackdrop.tsx`, outside
   *  web-shared) — same slot treatment as `SlimHero`'s `backdrop`. */
  backdrop?: ReactNode;
  /** The quotes to render. Default = the module constant above (Property's),
   *  so every existing caller is byte-identical; a site passes its own
   *  already-published, anonymised quotes (2026-09-29, startups-tech). */
  items?: TestimonialItem[];
  /** The five-star row above each quote. Default true = every existing caller.
   *  Pass false on a site that publishes no rating: the row is a claim, not
   *  decoration (2026-09-29, startups-tech). */
  showRating?: boolean;
  /** Optional line under the grid, for a site's own disclaimer about the
   *  quotes (for example that they are anonymised composites). Unset = nothing
   *  renders, byte-identical for every existing caller. */
  footnote?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-slate-900 py-12 sm:py-16 lg:py-20">
      {backdrop}
      <div className={`${siteContainerLg} relative z-10`}>
        <div className="max-w-3xl mb-8 sm:mb-12">
          <Eyebrow onDark>{eyebrow}</Eyebrow>
          <h2 className="text-2xl font-bold text-white sm:text-4xl">{title}</h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-300">{description}</p>
        </div>
        <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
          {items.map((t) => (
            <figure
              key={t.who + (t.detail ?? "") + t.quote.slice(0, 24)}
              className="rounded-xl bg-white/5 p-6 sm:p-8 ring-1 ring-white/10 backdrop-blur-sm flex flex-col transition-colors hover:ring-primary-500/60"
            >
              {showRating ? (
                <div className="flex items-center gap-1" aria-label="Rated 5 out of 5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} aria-hidden className="h-4 w-4 fill-primary-400 text-primary-400" />
                  ))}
                </div>
              ) : null}
              <blockquote
                className={`${showRating ? "mt-4 " : ""}text-sm sm:text-base leading-relaxed text-slate-300 flex-grow`}
              >
                &ldquo;{t.quote}
                {t.highlight ? <strong className="font-bold text-white">{t.highlight}</strong> : null}&rdquo;
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
                {t.initials ? (
                  <span
                    aria-hidden
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white"
                  >
                    {t.initials}
                  </span>
                ) : null}
                <span className="min-w-0">
                  <span className="block text-sm font-bold text-white">{t.who}</span>
                  {t.detail ? <span className="block text-xs text-slate-400">{t.detail}</span> : null}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        {footnote ? (
          <p className="mt-6 sm:mt-8 text-xs sm:text-sm text-slate-400 max-w-3xl">{footnote}</p>
        ) : null}
      </div>
    </section>
  );
}
