import type { Metadata } from "next";
import Link from "next/link";
import { ServiceTiers } from "@accounting-network/web-shared/components/ServiceTiers";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { siteContainerLg, sectionY, focusRing } from "@/components/ui/layout-utils";
import StartupsBackdrop from "@/components/layout/StartupsBackdrop";
import { ScrollGlowGroup } from "@accounting-network/web-shared/design/marketing/ScrollGlowGroup";
import { startupsServices } from "@/data/startups-services";
import { serviceTiers } from "@/config/service-tiers";
import { siteConfig } from "@/config/site";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "Startup Accountancy Services | R&D, SEIS/EIS, EMI and More",
  description: "Specialist startup accountancy services: R&D tax claims, SEIS/EIS advance assurance, EMI scheme setup, share schemes, fractional CFO and core compliance.",
  alternates: { canonical: `${siteConfig.url}/services` },
};

/**
 * Contrast wrapper for the adopted kit Breadcrumb on the brand hero.
 * packages/web-shared/design/primitives/Breadcrumb.tsx paints its onDark trail
 * slate-300 with slate-400 chevrons, both written for the kit's navy ground.
 * On this site's primary-700 (the 700 step) hero they measure 4.11:1 and 2.90:1,
 * under the 4.5 text and 3.0 graphic floors. The kit is a manager carve-out,
 * so the ground-correct palette is applied from the call site: white on
 * the 700 step is 7.90 and white/80 composited is 5.3. Identical string on all
 * four route files in this family.
 */
const crumbOnBrand = "[&_a]:text-white [&_a]:hover:text-white [&_svg]:text-white/80";

export default function ServicesIndexPage() {
  return (<>
    {/* ADOPTION DECLINED: packages/web-shared/design/primitives/SlimHero.tsx.
        Its own header states it is the shallow hero for the token-gated
        noindex pages and is "deliberately not the content-page hero"; it also
        hardcodes a slate-900 ground, which would replace the locked indigo.

        ADOPTION DECLINED: packages/web-shared/design/primitives/page-blocks.tsx
        `Eyebrow`. Every section on this route already opens with an authored
        h2 and carries no label above it. Adopting Eyebrow would mean AUTHORING
        a new label string on each section, and the owner ruling for this port
        is that this package writes no prose. Reported to the manager rather
        than taken unilaterally.

        ADOPTED: packages/web-shared/design/primitives/Breadcrumb.tsx. The Home
        crumb is not a new internal link: the kit header wordmark
        (packages/web-shared/design/chrome/SiteHeader.tsx) and SiteFooter
        already emit href="/" on every page of this site, so the route's unique
        internal link set only grows. It also emits this route's only
        BreadcrumbList JSON-LD; nothing else on /services emitted one before.
        No copy is authored: the trailing crumb is the nav label this route
        already carries in src/app/layout.tsx:41, and "Home" is the label the
        sibling slug template already puts in its BreadcrumbList.
        `ground-dark` goes on with it: the breadcrumb is the first focusable
        thing ever placed in this hero, and without the rebind its ring would
        paint primary-600 on a primary-700 ground, about 1.26:1. No light
        island sits inside this section.

        ADOPTED (U2 item 1): src/components/layout/StartupsBackdrop.tsx, the
        per-site motif, in place of a flat colour band. Its own contrast table
        now carries the row for this ground: on bg-primary-700 #4338ca the
        composite at the backdrop's strongest point is #4940cf, white 7.20 and
        slate-300 4.85, both past the 4.5 text floor, so the white h1 and the
        white/80 standfirst below are unaffected. The component's host contract
        is `relative overflow-hidden` on the section and `relative z-10` on the
        content, both added here. No copy, no kit change. */}
    <section className="ground-dark relative overflow-hidden border-b border-slate-200 bg-primary-700 py-16 sm:py-20">
      <StartupsBackdrop />
      <div className={`${siteContainerLg} relative z-10`}>
        <div className={crumbOnBrand}>
          <Breadcrumb onDark siteUrl={siteConfig.url} items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
        </div>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">Specialist services for funded and scaling UK startups.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">R&D relief, SEIS and EIS, EMI and share schemes, fractional CFO and core compliance.</p>
      </div>
    </section>

    {/* Service tiers. ServiceTiers is the live consumer of
        --brand-primary-ground (plan section D row 8) and stays. */}
    <section className="bg-slate-50 border-b border-slate-200">
      <div className={`${siteContainerLg} ${sectionY}`}>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Three service tiers
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            Start with company setup and investor-ready compliance, add R&D claims and share schemes as you raise, then move to exit and group advisory as you scale.
          </p>
        </div>
        <div className="mt-12">
          <ServiceTiers tiers={serviceTiers} featuredBadge="Most popular" />
        </div>
      </div>
    </section>

    {/* ADOPTION DECLINED, re-measured 2026-09-29 (the earlier "escaped markup"
        half of this decline is STALE and has been dropped: both components
        gained an `html` prop, CoverageCards.tsx:35 and page-blocks.tsx:99):
        packages/web-shared/design/marketing/CoverageCards.tsx `CoverageItem`
        (:5-15) is `{title, body, outcome?, icon}` with NO `href`, and
        `CardStack` in packages/web-shared/design/primitives/page-blocks.tsx
        (:88-99) is `{title, body}` with no `href` either. These six cards ARE
        the six /services/<slug> links that carry this route to its link floor
        of 7, so either swap deletes all six. `CardStack` also types `columns`
        as `1 | 2` (:99), so it cannot lay out this three-up grid regardless.

        ADOPTED instead: packages/web-shared/design/marketing/ScrollGlowGroup.tsx,
        which is a wrapper and changes no markup inside it. It flips
        data-glow="on" once the grid is fully on screen and the card-glow rules
        that U4's globals.css:1-12 motion table now ships do the rest. The
        <a> children, their hrefs and their copy are untouched. */}
    <section className={`bg-primary-600/5 ${sectionY}`}>
      <div className={siteContainerLg}>
        <ScrollGlowGroup className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {startupsServices.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className={`group block bg-white border border-slate-200 p-5 sm:p-6 transition-all hover:border-primary-600 hover:shadow-md ${focusRing}`}>
              <span className="text-base font-bold text-slate-900 group-hover:text-primary-700 transition-colors">{s.title}</span>
              <p className="mt-2 text-sm text-slate-500 line-clamp-2">{s.headline}</p>
            </Link>
          ))}
        </ScrollGlowGroup>
      </div>
    </section>
    {/* ADOPTED: the kit panel's own `backdrop` slot (LeadCTAPanel.tsx:33,79,
        104). The dark variant is `relative overflow-hidden bg-slate-900`
        (:103), which is the backdrop's host contract and the one ground its
        contrast table was originally written for (white 15.49, slate-300
        10.43 on the composited #1a233f). A distinct `patternId` is passed
        because a <pattern> id must be unique per DOCUMENT and this page
        mounts the motif twice. */}
    <LeadCTAPanel
      title="Speak to a startup tax specialist."
      description="Tell us about your situation and we will reply within 24 hours."
      proofPoints={[]}
      form={<LeadForm submitLabel="Send enquiry" />}
      backdrop={<StartupsBackdrop patternId="services-panel" />}
    />
  </>);
}
