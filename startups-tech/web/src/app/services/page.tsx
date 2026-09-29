import type { Metadata } from "next";
import Link from "next/link";
import { ServiceTiers } from "@accounting-network/web-shared/components/ServiceTiers";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { siteContainerLg, sectionY, focusRing } from "@/components/ui/layout-utils";
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
        island sits inside this section. */}
    <section className="ground-dark border-b border-neutral-200 bg-primary-700 py-16 sm:py-20">
      <div className={siteContainerLg}>
        <div className={crumbOnBrand}>
          <Breadcrumb onDark siteUrl={siteConfig.url} items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
        </div>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">Specialist services for funded and scaling UK startups.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">R&D relief, SEIS and EIS, EMI and share schemes, fractional CFO and core compliance.</p>
      </div>
    </section>

    {/* Service tiers. ServiceTiers is the live consumer of
        --brand-primary-ground (plan section D row 8) and stays. */}
    <section className="bg-neutral-50 border-b border-neutral-200">
      <div className={`${siteContainerLg} ${sectionY}`}>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            Three service tiers
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Start with company setup and investor-ready compliance, add R&D claims and share schemes as you raise, then move to exit and group advisory as you scale.
          </p>
        </div>
        <div className="mt-12">
          <ServiceTiers tiers={serviceTiers} featuredBadge="Most popular" />
        </div>
      </div>
    </section>

    {/* ADOPTION DECLINED: packages/web-shared/design/marketing/CoverageCards.tsx
        and `CardStack` from packages/web-shared/design/primitives/page-blocks.tsx.
        Both render a fixed title + body card; neither takes a per-card href,
        and these cards ARE the six links that carry this route to its link
        floor of 7. Swapping either in would delete every one of them. */}
    <section className={`bg-primary-600/5 ${sectionY}`}>
      <div className={siteContainerLg}>
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {startupsServices.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className={`group block bg-white border border-neutral-200 p-5 sm:p-6 transition-all hover:border-primary-600 hover:shadow-md ${focusRing}`}>
              <span className="text-base font-bold text-neutral-900 group-hover:text-primary-700 transition-colors">{s.title}</span>
              <p className="mt-2 text-sm text-neutral-500 line-clamp-2">{s.headline}</p>
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
