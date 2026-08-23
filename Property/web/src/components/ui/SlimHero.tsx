import { HeroBrickBackdrop } from "@/components/layout/HeroBrickBackdrop";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Eyebrow } from "@/components/ui/page-blocks";

/**
 * The shallow navy hero the three token-gated post-submit pages open on:
 * /thank-you, /book and /complete.
 *
 * Deliberately not the content-page hero (DESIGN_SYSTEM §4b) and deliberately
 * not configurable into one. No `min-h`, no tick badge, no CTA row, no
 * breadcrumb. Owner 2026-08-23: these pages are an acknowledgement plus one job,
 * and a tall hero with its own button pushed that job under the fold. All three
 * are `noindex`, so a breadcrumb trail to them would be fiction.
 *
 * The section is navy, so whatever a host renders under it must be light. The
 * footer is `slate-900` and navy must never touch navy (§9), which is why none
 * of the three ends on this hero.
 *
 * `relative overflow-hidden` on the section and `relative z-10` on the content
 * are the `HeroBrickBackdrop` host contract: get them wrong and the texture
 * paints over the copy.
 */
export function SlimHero({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  /** Standfirst. One or more paragraphs, styled by the caller. */
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-slate-900 py-8 sm:py-10 lg:py-12">
      <HeroBrickBackdrop />
      <div className={`${siteContainerLg} relative z-10`}>
        <div className="max-w-3xl">
          <Eyebrow onDark>{eyebrow}</Eyebrow>
          <h1 className="text-2xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">{title}</h1>
          {children}
        </div>
      </div>
    </section>
  );
}
