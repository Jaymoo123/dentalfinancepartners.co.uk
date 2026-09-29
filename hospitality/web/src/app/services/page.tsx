import type { Metadata } from "next";
import Link from "next/link";
import { ServiceTiers } from "@accounting-network/web-shared/components/ServiceTiers";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { ScrollGlowGroup } from "@accounting-network/web-shared/design/marketing/ScrollGlowGroup";
import { btnPrimary, focusRing, siteContainerLg } from "@/components/ui/layout-utils";
import HospitalityBackdrop from "@/components/layout/HospitalityBackdrop";
import { hospitalityServices } from "@/data/hospitality-services";
import { serviceTiers } from "@/config/service-tiers";
import { siteConfig } from "@/config/site";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: { absolute: "Hospitality Accounting Services | Hospitality Tax" },
  description:
    "Hospitality accounting services: tronc scheme setup, payroll, VAT, TOMS and business rates relief. Specialist support for UK restaurants, pubs, hotels, cafes and takeaways.",
  alternates: { canonical: `${siteConfig.url}/services` },
};

export default function ServicesPage() {
  return (
    <>
      {/* ADOPTED: packages/web-shared/design/primitives/Breadcrumb.tsx with
          tone="onBrand" (Breadcrumb.tsx:29-33, the recipe written for exactly
          this mid-tone brand ground). No crumbOnBrand arbitrary-variant string
          and no hand-rolled trail. Crumb labels are the site's own published
          route names from hospitality/niche.config.json navigation ("Services"),
          so no copy is authored. The kit component emits the page's only
          BreadcrumbList; this hub had none before, so there is still exactly
          one per URL.

          ADOPTION DECLINED: packages/web-shared/design/primitives/SlimHero.tsx.
          Its section ground is the hardcoded literal `bg-slate-900` at
          SlimHero.tsx:36 with no prop to change it, so adopting it would repaint
          this hero navy. #b0532f is the owner's designer-set hero colour (locked
          rule 7) and 5.09 on white, so it is not a contrast forced move either.
          Kit gap K1, reported to the manager, not worked around here.

          ADOPTION DECLINED (this hero only): `Eyebrow` from
          packages/web-shared/design/primitives/page-blocks.tsx. The only label
          this route publishes for itself is "Services", which the Breadcrumb
          above already renders one line higher; an Eyebrow here would print the
          same word twice in the same viewport, and inventing a second label is
          authoring prose. Eyebrow IS adopted on the two detail templates, where
          a published uppercase micro-label already exists.

          ADOPTED: src/components/layout/HospitalityBackdrop.tsx. Host contract
          (`relative overflow-hidden` here, `relative z-10` on the content)
          applied with it. Measured on THIS ground for the manager's table:
          bg-primary-600 #b0532f, composited at the motif's strongest point
          (1px stroke at full alpha inside the 0.10 group) = #b55834. White
          5.09 bare / 4.76 composited, both past the 4.5 text floor, so the
          white h1 is unaffected. The white/80 standfirst measures 3.87 bare
          and 3.66 composited: SUB-FLOOR, and it was sub-floor before this
          package touched the file. Reported, not silently reworded.
          `ground-dark` goes on with it: the breadcrumb links are the focusable
          elements in this hero and the light-ground ring would paint
          primary-600 on primary-600. No light-ground card with focusable
          children sits inside this section (globals.css:213-215). */}
      <section className="ground-dark relative overflow-hidden border-b border-slate-200 bg-primary-600 py-16 sm:py-20">
        <HospitalityBackdrop patternId="services-hero" />
        <div className={`${siteContainerLg} relative z-10`}>
          <Breadcrumb
            tone="onBrand"
            siteUrl={siteConfig.url}
            items={[{ label: "Home", href: "/" }, { label: "Services" }]}
          />
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Hospitality accounting services.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            Every service is built around how hospitality finance actually works: tronc and tips compliance, food and drink VAT, payroll for variable-hours teams and the specific requirements of each sector.
          </p>
        </div>
      </section>

      {/* #fafaf9 is a warm off-white with no step on this site's ramp and no
          slate equivalent (slate-50 #f8fafc is cool). Normalising it would be a
          visible colour change, so it stays a literal until the manager
          declares a --surface-warm token in globals.css, which is a P1-A file
          this package may not edit. Requested in the receipt. */}
      <section className="bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="mb-12">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Three service tiers
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
              Start with annual compliance, add tronc and management accounts as you grow, move to specialist advisory when you are expanding or planning a sale.
            </p>
            {/* The inline style={{ "--brand-primary": "#b0532f" }} wrapper is
                GONE: globals.css:126 declares --brand-primary globally at the
                same value, so the kit ServiceTiers reads it without help.
                featuredBadge stays: removing the prop would not remove the
                badge, it would fall back to the component's own default (T13). */}
            <div className="mt-8">
              <ServiceTiers tiers={serviceTiers} featuredBadge="Most popular" />
            </div>
          </div>

          {/* ADOPTED: packages/web-shared/design/marketing/ScrollGlowGroup.tsx,
              a wrapper that changes no markup, no copy and no link inside it.
              The motion layer it keys off is live (globals.css:19-31).

              ADOPTION DECLINED: packages/web-shared/design/marketing/CoverageCards.tsx.
              The "would print escaped markup" half of the old reason is STALE
              (an `html` prop exists at CoverageCards.tsx:35) and is dropped.
              What stands: CoverageItem (CoverageCards.tsx:5-15) has title, body,
              outcome? and a REQUIRED icon, and no `href`. These cards ARE this
              route's link floor, one per service, so adopting the component
              would delete five internal links, and the icons would have to be
              chosen, which is authoring. Kit gap K2. */}
          <ScrollGlowGroup className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {hospitalityServices.map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`} className={`group block bg-white border border-slate-200 p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-primary-600 transition-all ${focusRing}`}>
                <h2 className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-primary-600 transition-colors sm:text-2xl">{service.title}</h2>
                {/* 2026-09-28 parity fix: service.intro is authored HTML with a
                    real anchor (section 5). This card already sits inside a
                    Link, so rendering that anchor here would nest <a> inside
                    <a>; strip the markup for this truncated teaser instead,
                    the full HTML renders untouched on the detail page. */}
                <p className="mt-3 text-sm leading-relaxed text-slate-600 line-clamp-3">
                  {service.intro.replace(/<[^>]+>/g, "")}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-600">Learn more</span>
              </Link>
            ))}
          </ScrollGlowGroup>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Not sure which service you need?</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
            Tell us about your hospitality business and we will tell you what is required and how we can help.
          </p>
          <div className="mt-8">
            {/* data-cta on the control itself, never on the wrapper div (R5 B2).
                Naming matches generalist/startups-tech so vw_cta_performance
                reads one series across sites. The link, its destination and its
                label are unchanged. */}
            <Link href="/contact" data-cta="services_mid_contact" data-cta-placement="body" data-cta-goal="form" className={btnPrimary}>Get in touch</Link>
          </div>
        </div>
      </section>
    {/* ADDED 2026-09-28 parity phase 0 (Opus read): brief section 4 requires one
        lead panel with the site's LeadForm on every money page. This hub
        rendered zero forms, only a /contact link. Strings unchanged by W3.
        `backdrop` added (LeadCTAPanel.tsx:78, the slot SlimHero uses too); the
        panel's own ground is bg-slate-900 (LeadCTAPanel.tsx:101), the ground
        HospitalityBackdrop's contrast table already carries from phase 1.
        NO `.ground-dark` wrapper here, deliberately: the form sits in a
        rounded-xl bg-white card (LeadCTAPanel.tsx:191) and .ground-dark
        inherits, so wrapping would rebind every input ring to white on white,
        which is the exact hazard globals.css:213-215 names. Nothing on the
        panel's dark half is focusable (eyebrow, title, description, and
        proofPoints is empty), so there is no ring left un-rebound. */}
    <LeadCTAPanel
      eyebrow=""
      title="Speak to a hospitality accounts specialist."
      description="Tell us about your hospitality business and we will reply within 24 hours. No obligation."
      proofPoints={[]}
      formTitle=""
      form={<LeadForm submitLabel="Request callback" />}
      backdrop={<HospitalityBackdrop patternId="services-cta" />}
    />
    </>
  );
}
