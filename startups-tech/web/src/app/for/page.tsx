import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { siteContainerLg, sectionY, focusRing } from "@/components/ui/layout-utils";
import StartupsBackdrop from "@/components/layout/StartupsBackdrop";
import { ScrollGlowGroup } from "@accounting-network/web-shared/design/marketing/ScrollGlowGroup";
import { startupsHubs } from "@/data/startups-hubs";
import { siteConfig } from "@/config/site";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { LeadForm } from "@/components/forms/LeadForm";
export const metadata: Metadata = {
  title: "Startup Accountants by Company Type | Who We Help",
  description: "Specialist startup tax advice by company type: pre-seed founders, funded startups, SaaS companies, software development companies and fintech startups.",
  alternates: { canonical: `${siteConfig.url}/for` },
};

/**
 * Contrast wrapper for the adopted kit Breadcrumb on the brand hero. See
 * src/app/services/page.tsx for the measurement: the kit's onDark slate-300 /
 * slate-400 trail (packages/web-shared/design/primitives/Breadcrumb.tsx) is
 * written for navy and sits at 4.11:1 / 2.90:1 on primary-700 (the 700 step).
 * Identical string on all four route files in this family.
 */
const crumbOnBrand = "[&_a]:text-white [&_a]:hover:text-white [&_svg]:text-white/80";

export default function ForIndexPage() {
  return (<>
    {/* ADOPTION DECLINED: packages/web-shared/design/primitives/SlimHero.tsx,
        the token-gated noindex hero with a hardcoded slate-900 ground.

        ADOPTION DECLINED: `Eyebrow` from
        packages/web-shared/design/primitives/page-blocks.tsx. Adopting it means
        AUTHORING a new label string above a section that has none today, and
        this package writes no prose. Reported to the manager.

        ADOPTED: packages/web-shared/design/primitives/Breadcrumb.tsx. Trailing
        crumb is the nav label this route already carries in
        src/app/layout.tsx:49, so no copy is authored. It emits this route's
        only BreadcrumbList JSON-LD. `ground-dark` goes on with it, because the
        breadcrumb is the first focusable element in this hero and the default
        ring is primary-600 on a primary-700 ground, about 1.26:1.

        ADOPTED (U2 item 1): src/components/layout/StartupsBackdrop.tsx. Its
        contrast table carries this ground: on bg-primary-700 #4338ca the
        composite at the motif's strongest point is #4940cf, white 7.20 and
        slate-300 4.85, both past the 4.5 text floor. Host contract
        (`relative overflow-hidden` on the section, `relative z-10` on the
        content) added with it. */}
    <section className="ground-dark relative overflow-hidden border-b border-slate-200 bg-primary-700 py-16 sm:py-20">
      <StartupsBackdrop />
      <div className={`${siteContainerLg} relative z-10`}>
        <div className={crumbOnBrand}>
          <Breadcrumb onDark siteUrl={siteConfig.url} items={[{ label: "Home", href: "/" }, { label: "Who we help" }]} />
        </div>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">Specialist startup tax for every stage and structure.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">Each company type faces different tax rules and compliance obligations. We work with all of them.</p>
      </div>
    </section>
    {/* ADOPTION DECLINED, re-measured 2026-09-29 (the "escaped markup" half of
        this decline is STALE and dropped: both gained an `html` prop,
        CoverageCards.tsx:35 and page-blocks.tsx:99):
        packages/web-shared/design/marketing/CoverageCards.tsx `CoverageItem`
        (:5-15) is `{title, body, outcome?, icon}` with NO `href` and a REQUIRED
        `icon`, and `CardStack` in
        packages/web-shared/design/primitives/page-blocks.tsx (:88-99) is
        `{title, body}` with no `href` either. These five cards ARE the five
        /for/<slug> links that carry this route to its link floor of 5, so
        either swap deletes all five.
        ADOPTED instead: packages/web-shared/design/marketing/ScrollGlowGroup.tsx,
        a wrapper that changes no markup, no href and no copy inside it. */}
    <section className={`bg-primary-600/5 ${sectionY}`}>
      <div className={siteContainerLg}>
        <ScrollGlowGroup className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {startupsHubs.map((hub) => (
            <Link key={hub.slug} href={`/for/${hub.slug}`} className={`group block bg-white border border-slate-200 p-5 sm:p-6 transition-all hover:border-primary-600 hover:shadow-md ${focusRing}`}>
              <span className="text-base font-bold text-slate-900 group-hover:text-primary-700 transition-colors">{hub.title}</span>
              <p className="mt-2 text-sm text-slate-500 line-clamp-2">{hub.headline}</p>
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
      backdrop={<StartupsBackdrop patternId="for-panel" />}
    />
  </>);
}
