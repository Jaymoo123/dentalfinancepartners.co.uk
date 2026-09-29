import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { siteContainerLg, sectionY, focusRing } from "@/components/ui/layout-utils";
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
        ring is primary-600 on a primary-700 ground, about 1.26:1. */}
    <section className="ground-dark border-b border-neutral-200 bg-primary-700 py-16 sm:py-20">
      <div className={siteContainerLg}>
        <div className={crumbOnBrand}>
          <Breadcrumb onDark siteUrl={siteConfig.url} items={[{ label: "Home", href: "/" }, { label: "Who we help" }]} />
        </div>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">Specialist startup tax for every stage and structure.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">Each company type faces different tax rules and compliance obligations. We work with all of them.</p>
      </div>
    </section>
    {/* ADOPTION DECLINED: packages/web-shared/design/marketing/CoverageCards.tsx
        and `CardStack` from packages/web-shared/design/primitives/page-blocks.tsx.
        Neither takes a per-card href, and these cards ARE the five links that
        carry this route to its link floor of 5. */}
    <section className={`bg-primary-600/5 ${sectionY}`}>
      <div className={siteContainerLg}>
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {startupsHubs.map((hub) => (
            <Link key={hub.slug} href={`/for/${hub.slug}`} className={`group block bg-white border border-neutral-200 p-5 sm:p-6 transition-all hover:border-primary-600 hover:shadow-md ${focusRing}`}>
              <span className="text-base font-bold text-neutral-900 group-hover:text-primary-700 transition-colors">{hub.title}</span>
              <p className="mt-2 text-sm text-neutral-500 line-clamp-2">{hub.headline}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
    <LeadCTAPanel
      title="Speak to a startup tax specialist."
      description="Tell us about your situation and we will reply within 24 hours."
      proofPoints={[]}
      form={<LeadForm submitLabel="Send enquiry" />}
    />
  </>);
}
