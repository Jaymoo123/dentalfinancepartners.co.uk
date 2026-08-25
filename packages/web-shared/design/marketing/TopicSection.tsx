import type { ReactNode } from "react";
import { Eyebrow, Prose } from "../primitives/page-blocks";
import { heroCreamSurface, siteContainerLg } from "../layout-utils";

/**
 * One full-width body band on a topic pillar page.
 *
 * WHY THIS FILE EXISTS. The five topic pillars the designer never saw
 * (/cost-of-selling-a-property, /leasehold, /landed-estates,
 * /landlord-compliance, /for-letting-agents) each carried a byte-identical
 * local `function Section` helper: a `border-t border-slate-200 py-8` hairline
 * strip with a `text-2xl sm:text-3xl` heading and a wrapped row of arrow links,
 * all of it inside one `mx-auto max-w-4xl` box. Five copies of the same
 * pre-redesign construct. This is that construct rebuilt out of the designer's
 * own primitives, once, so the five pages read as siblings of the seven pillar
 * pages rather than as five copies of the old template.
 *
 * NOTHING HERE IS INVENTED. Every value is lifted from a shipped designer
 * surface rather than chosen:
 *   - section rhythm `py-12 sm:py-16 lg:py-20`  = FaqSection.tsx:16 and the
 *     contained LeadCTAPanel, which report 01 §7.6 records as the observed
 *     default for a standard section;
 *   - `Eyebrow` is the only permitted pre-header treatment (report 12 rule 20)
 *     and carries its own `mb-3`, so the heading below needs no top margin;
 *   - the h2 recipe `text-2xl font-bold text-slate-900 sm:text-4xl` is the
 *     designer's section heading (report 01 §1.3), and is what the seven pillar
 *     pages ship;
 *   - `Prose` is their body stack.
 *
 * `tone` exists because consecutive sections must never share a ground
 * (report 12 rule 7). Callers alternate it explicitly, section by section,
 * rather than this component counting: the alternation has to survive a section
 * being inserted or a figure band being dropped in between, and a hidden
 * counter would silently re-key the whole run when that happens.
 *
 * Server component. No JavaScript beyond the eyebrow's own 24px rule.
 */
export function TopicSection({
  id,
  eyebrow,
  title,
  tone = "white",
  children,
  related,
  figure,
}: {
  id: string;
  /** The pre-header label. Must not repeat the heading's words (rule 21). */
  eyebrow: string;
  title: string;
  /** Section ground. Alternate it: two touching sections must not match. */
  tone?: "white" | "slate";
  children: ReactNode;
  /**
   * Related-reading slot, rendered after `figure` in a `mt-8` wrapper.
   * Per-site; replaces Property's `links`/`linksAs` pair, which rendered
   * either its own underlined link list or, via `linksAs="cards"`, ran
   * `@/lib/blog`'s `relatedItemsFromLinks` into `@/components/blog/RelatedArticles`
   * (an O.5 component, not yet in web-shared, and its Property-only content
   * lookups). Both are outside this package, so the computation and the card
   * grid both move to the caller: build the `RelatedArticles` (or list) markup
   * there and pass the result here.
   */
  related?: ReactNode;
  /** Extra content between the prose and `related`, for a section's figure. */
  figure?: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 py-12 sm:py-16 lg:py-20 ${tone === "slate" ? "bg-slate-50" : "bg-white"}`}
    >
      <div className={siteContainerLg}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">{title}</h2>
        <Prose>{children}</Prose>
        {figure}
        {related && <div className="mt-8">{related}</div>}
      </div>
    </section>
  );
}

/**
 * The hero these five pages share, in the designer's cream treatment.
 *
 * Same shape as the seven pillar pages after Phase 6: `heroCreamSurface` plus
 * a brand backdrop, the light-variant breadcrumb, the hero copy in a
 * `max-w-3xl` block (which is the ONE place `contentNarrow`'s measure is
 * allowed, rule 37), and a CTA row whose primary is `btnPrimary` to `#book`.
 *
 * The host contract for `backdrop` is enforced by construction here: `relative
 * overflow-hidden` on the section, `relative z-10` on the content (rule 39).
 * Getting that wrong paints the texture over the copy.
 */
export function TopicHero({
  breadcrumb,
  title,
  standfirst,
  primary,
  secondary,
  backdrop,
}: {
  breadcrumb: ReactNode;
  title: string;
  standfirst: ReactNode;
  primary: ReactNode;
  secondary: ReactNode;
  /**
   * Per-site brick/texture motif slot, cream variant. Replaces
   * `@/components/layout/HeroBrickBackdrop tone="cream"`, same treatment as
   * `SlimHero`'s `backdrop` prop: this file only reserves the position.
   */
  backdrop?: ReactNode;
}) {
  return (
    <section
      className={`relative flex min-h-[360px] items-center overflow-hidden py-10 sm:min-h-[420px] sm:py-12 lg:min-h-[440px] lg:py-14 ${heroCreamSurface}`}
    >
      {backdrop}
      <div className={`${siteContainerLg} relative z-10`}>
        <div className="max-w-3xl">
          {breadcrumb}
          <h1 className="mt-4 text-2xl font-bold leading-tight text-slate-900 sm:mt-6 sm:text-4xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-700 sm:mt-6 sm:text-lg">{standfirst}</p>
          <div className="mt-6 flex flex-col flex-wrap gap-3 sm:mt-8 sm:flex-row sm:gap-4">
            {primary}
            {secondary}
          </div>
        </div>
      </div>
    </section>
  );
}
