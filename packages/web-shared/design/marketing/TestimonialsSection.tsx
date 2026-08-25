import { Star } from "lucide-react";
import type { ReactNode } from "react";
import { siteContainerLg } from "../layout-utils";
import { Eyebrow } from "../primitives/page-blocks";

// Anonymised social proof only (no client names), per the lead-gen model.
// `highlight` is bolded inside the quote and must appear verbatim in `quote`.
export const testimonials = [
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
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  /** Hero-band texture layer behind the quotes. Per-site; replaces Property's
   *  `<HeroBrickBackdrop />` (`components/layout/HeroBrickBackdrop.tsx`, outside
   *  web-shared) — same slot treatment as `SlimHero`'s `backdrop`. */
  backdrop?: ReactNode;
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
          {testimonials.map((t) => (
            <figure
              key={t.who + t.detail}
              className="rounded-xl bg-white/5 p-6 sm:p-8 ring-1 ring-white/10 backdrop-blur-sm flex flex-col transition-colors hover:ring-primary-500/60"
            >
              <div className="flex items-center gap-1" aria-label="Rated 5 out of 5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} aria-hidden className="h-4 w-4 fill-primary-400 text-primary-400" />
                ))}
              </div>
              <blockquote className="mt-4 text-sm sm:text-base leading-relaxed text-slate-300 flex-grow">
                &ldquo;{t.quote}
                <strong className="font-bold text-white">{t.highlight}</strong>&rdquo;
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
                <span
                  aria-hidden
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white"
                >
                  {t.initials}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-bold text-white">{t.who}</span>
                  <span className="block text-xs text-slate-400">{t.detail}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
