import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, focusRing, siteContainerLg } from "@/components/ui/layout-utils";
import HospitalityBackdrop from "@/components/layout/HospitalityBackdrop";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { ScrollGlowGroup } from "@accounting-network/web-shared/design/marketing/ScrollGlowGroup";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { LeadForm } from "@/components/forms/LeadForm";
import { hospitalityHubs } from "@/data/hospitality-hubs";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Hospitality Sectors We Work With | Restaurants, Pubs, Hotels and More",
  description:
    "Specialist hospitality accounting for restaurants, pubs and bars, takeaways, hotels, cafes and caterers. Sector-specific advice on tronc, VAT, payroll and accounts.",
  alternates: { canonical: `${siteConfig.url}/for` },
};

export default function ForIndexPage() {
  return (
    <>
      {/* The full adoption and decline record for this hero shape is written
          once, at src/app/services/page.tsx:24-60, and applies here character
          for character: Breadcrumb tone="onBrand" ADOPTED, SlimHero DECLINED
          (hardcoded bg-slate-900 at SlimHero.tsx:36 would repaint a
          designer-set brand hero navy, kit gap K1), Eyebrow DECLINED in the
          hero (its only candidate label, "For", is the crumb one line above),
          HospitalityBackdrop ADOPTED with the host contract and .ground-dark.
          Measured on this same ground: bg-primary-600 #b0532f, composite
          #b55834, white 5.09 bare / 4.76 composited PASS, white/80 standfirst
          3.87 / 3.66 SUB-FLOOR and sub-floor before this package.
          "For" is the site's own published route name
          (hospitality/niche.config.json navigation), so no copy is authored.
          This hub emitted no BreadcrumbList before, so there is still exactly
          one per URL. */}
      <section className="ground-dark relative overflow-hidden border-b border-slate-200 bg-primary-600 py-16 sm:py-20">
        <HospitalityBackdrop patternId="for-hero" />
        <div className={`${siteContainerLg} relative z-10`}>
          <Breadcrumb
            tone="onBrand"
            siteUrl={siteConfig.url}
            items={[{ label: "Home", href: "/" }, { label: "For" }]}
          />
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Specialist accounting for every hospitality sector.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            Each hospitality sector has different VAT rules, payroll complexity and compliance requirements. We work with operators across all of them, week in and week out.
          </p>
        </div>
      </section>

      {/* ADOPTED: ScrollGlowGroup (wrapper only, no copy or markup change).
          DECLINED: CoverageCards, for the reason written at
          src/app/services/page.tsx:106-113 - CoverageItem has no `href`
          (CoverageCards.tsx:5-15) and these six cards ARE this route's link
          floor, and `icon: LucideIcon` is required and unpublished. Kit gap K2. */}
      <section className="bg-primary-600/5 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <ScrollGlowGroup className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {hospitalityHubs.map((hub) => (
              <Link key={hub.slug} href={`/for/${hub.slug}`} className={`group block bg-white border border-slate-200 p-5 sm:p-6 transition-all hover:border-primary-600 hover:shadow-md ${focusRing}`}>
                <span className="text-base font-bold text-slate-900 group-hover:text-primary-600 transition-colors">{hub.title}</span>
                <p className="mt-2 text-sm text-slate-500 group-hover:text-slate-600 transition-colors line-clamp-2">{hub.intro.split(".")[0]}.</p>
              </Link>
            ))}
          </ScrollGlowGroup>
        </div>
      </section>

      {/* #fafaf7 is a warm off-white with no step on this site's ramp; slate-50
          #f8fafc is cool, so swapping it is a visible colour change (R6 on
          startups-tech). It stays a literal until the manager declares a
          --surface-warm token in globals.css, a P1-A file this package may not
          edit. Requested in the receipt. */}
      <section className="bg-[#fafaf7] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Each sector has its own rules.</h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              <p>A restaurant, a pub and a hotel all sit in the hospitality sector but face different VAT rules, different payroll complexity and different compliance obligations. The accounting requirements are not interchangeable.</p>
              <p>Getting tronc wrong costs employer NIC that should have been saved. Getting food VAT wrong costs 20% on supplies that were actually zero-rated, or creates an HMRC liability on supplies that should have been standard-rated. We know the specific rules for each sector.</p>
            </div>
            <div className="mt-8">
              {/* data-cta on the control, never on the wrapper (R5 B2). Link,
                  destination and label unchanged. */}
              <Link href="/contact" data-cta="for_mid_contact" data-cta-placement="body" data-cta-goal="form" className={btnPrimary}>Get in touch</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ADDED by W3: locked rule 6 requires one non-interruptive enquiry form
          on every money page, and this hub was the one template route with
          none (plan E.1, P0E section 5). Strings are the ones /services
          already publishes on the identical panel
          (src/app/services/page.tsx:160-166), copied verbatim; nothing is
          written. eyebrow="" and formTitle="" per locked rules 16 and 8: the
          component's own defaults are a fee claim
          ("Free first call, then a fixed fee in writing", LeadCTAPanel.tsx:18)
          and a label this route does not publish.
          NO .ground-dark wrapper, for the reason at
          src/app/services/page.tsx:152-160. */}
      <LeadCTAPanel
        eyebrow=""
        title="Speak to a hospitality accounts specialist."
        description="Tell us about your hospitality business and we will reply within 24 hours. No obligation."
        proofPoints={[]}
        formTitle=""
        form={<LeadForm submitLabel="Request callback" />}
        backdrop={<HospitalityBackdrop patternId="for-cta" />}
      />
    </>
  );
}
