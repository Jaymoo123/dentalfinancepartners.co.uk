import type { Metadata } from "next";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { siteConfig } from "@/config/site";
import { siteContainerLg, sectionYLoose } from "@/components/ui/layout-utils";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { LeadForm } from "@/components/forms/LeadForm";
export const metadata: Metadata = {
  title: "About | Specialist UK Startup Tax Accountants",
  description: `${siteConfig.name} are specialist UK accountants for funded and scaling startups.`,
  alternates: { canonical: `${siteConfig.url}/about` },
};
/**
 * Contrast wrapper for the adopted kit Breadcrumb on the brand hero.
 * packages/web-shared/design/primitives/Breadcrumb.tsx paints its onDark trail
 * slate-300 with slate-400 chevrons, both written for the kit's slate-900 navy.
 * Measured against this site's brand ground primary-600 (relative
 * luminance 0.1170, which is what puts white at 6.29 there): slate-300
 * is 4.23:1, under the 4.5 text floor, and slate-400 is 2.39:1, under
 * the 3.0 graphic floor. The kit is a carve-out (trap 12), so the ground-correct
 * palette is applied from the call site: white 6.29, white/80 composited over
 * the brand ground 4.63.
 */
const crumbOnBrand = "[&_a]:text-white [&_a]:hover:text-white [&_svg]:text-white/80";
export default function AboutPage() {
  const co = siteConfig.company;
  return (<>
    {/* The hero ground was a literal brand hex. It is the same colour as
        `bg-primary-600`, the locked 600 step minted in globals.css, so this is a
        token swap and not a colour change. `ground-dark` rebinds --focus-ring
        and --kit-focus-ring to the on-brand white: without it the breadcrumb
        links ring in the brand colour on the brand ground, 1.00:1. No light island with
        focusable children sits inside this section, which is the one condition
        globals.css puts on that class.

        ADOPTION DECLINED: packages/web-shared/design/primitives/SlimHero.tsx.
        Its own docblock scopes it to /thank-you, /book and /complete, the three
        noindex outcome pages. /about is indexed content and keeps its hero.
        ADOPTION DECLINED: packages/web-shared/design/marketing/StatsCounter.tsx
        (numeric targets nobody authored for this page, and it would read as a
        client-count claim), marketing/TestimonialsSection.tsx (hardcodes
        Property's quotes; this site has no authored social proof) and
        marketing/WhatToExpectCard.tsx (its default props publish a fee line no
        page here authored, T12). */}
    <section className="ground-dark border-b border-neutral-200 bg-primary-600 py-16 sm:py-20">
      <div className={siteContainerLg}>
        {/* ADOPTED: packages/web-shared/design/primitives/Breadcrumb.tsx. The
            Home crumb is not a new internal link: the phase-1 header wordmark
            and footer already emit href="/" on every route, so this route's
            UNIQUE internal link set is unchanged. It also emits a
            BreadcrumbList JSON-LD and nothing else on this route emits one. */}
        <div className={crumbOnBrand}>
          <Breadcrumb
            onDark
            siteUrl={siteConfig.url}
            items={[{ label: "Home", href: "/" }, { label: "About" }]}
          />
        </div>
        <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">We work exclusively with funded and scaling UK startups.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90">R&D relief, SEIS and EIS, EMI and share schemes, and investor-ready accounts are specialist enough that general accounting experience is not the same as specialist experience.</p>
      </div>
    </section>
    {/* ADOPTED: packages/web-shared/design/primitives/page-blocks.tsx `Eyebrow`.
        A structural section label, and the word is lifted from this route's own
        metaTitle, so no copy is authored. */}
    <section className="bg-white">
      <div className={`${siteContainerLg} ${sectionYLoose}`}>
        <Eyebrow>About</Eyebrow>
        <div className="max-w-3xl space-y-8 text-base leading-relaxed text-neutral-600 sm:text-lg">
          <p>We are specialist accountants for funded and scaling UK startups: pre-seed founders preparing for a first raise, VC-backed companies managing R&D and EIS compliance, SaaS businesses navigating VAT place-of-supply, and software development companies with EMI option pools.</p>
          <p>The compliance obligations at each stage of growth are specific: claim notification deadlines for R&D, EIS1 and EIS3 compliance statements after investment, EMI grant notifications and the annual ERS return by 6 July. Getting these right is the substance of the engagement, not a side effect of it.</p>
          <p>We handle R&D merged scheme and ERIS claims, SEIS and EIS advance assurance and compliance, EMI scheme setup and ongoing reporting, share scheme design, Corporation Tax planning, and the investor-ready accounts that boards and future investors expect.</p>
          <p>We work on a fixed-fee basis and you hear back within one working day.</p>
        </div>
        <div className="mt-10 border-t border-neutral-100 pt-8 text-sm text-neutral-500">
          <p>{co.tradingName} is a trading name of {co.legalName}, registered in {co.placeOfRegistration} (company no. {co.number}). Registered office: {co.registeredOfficeLine}.</p>
        </div>
      </div>
    </section>
    {/* KEPT, not added: this LeadCTAPanel is the page's pre-port capture surface
        and stays exactly where it was, with the same props. */}
    <LeadCTAPanel
      title="Speak to a startup tax specialist."
      description="Tell us about your situation and we will reply within 24 hours."
      proofPoints={[]}
      form={<LeadForm submitLabel="Send enquiry" />}
    />
  </>);
}
