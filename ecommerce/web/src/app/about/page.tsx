import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { siteConfig } from "@/config/site";
import { btnPrimary, siteContainerLg, sectionYLoose } from "@/components/ui/layout-utils";
export const metadata: Metadata = {
  title: "About | Specialist UK Ecommerce Accountants",
  description: `${siteConfig.name} are specialist UK accountants for online sellers.`,
  alternates: { canonical: `${siteConfig.url}/about` },
};
/**
 * Contrast wrapper for the adopted kit Breadcrumb on the brand hero.
 * packages/web-shared/design/primitives/Breadcrumb.tsx paints its onDark trail
 * slate-300 with slate-400 chevrons, both written for the kit's navy: on
 * #8a5e1a they measure 3.76:1 and about 2.0:1, under the 4.5 text and 3.0
 * graphic floors. The kit is a carve-out, so the ground-correct palette is
 * applied from the call site (white 5.68, white/80 4.3). Identical string to
 * the phase-3, -4 and -5 route files.
 */
const crumbOnBrand = "[&_a]:text-white [&_a]:hover:text-white [&_svg]:text-white/80";
export default function AboutPage() {
  const co = siteConfig.company;
  return (<>
    {/* Hero ground was the research navy #1a3a5c, an untokenised hex used
        nowhere else outside /research. Every other indexed content route in
        this port paints the brand hero (bg-primary-700, #8a5e1a, white on it
        5.68), so this one now does too. `ground-dark` rebinds --focus-ring and
        --kit-focus-ring to the on-brand white: without it the breadcrumb links
        ring in #8a5e1a on an #8a5e1a ground, 1.00:1. No light island sits
        inside this section.

        ADOPTION DECLINED: packages/web-shared/design/primitives/SlimHero.tsx.
        Its own docblock scopes it to /thank-you, /book and /complete, which are
        noindex outcome pages and another builder's lease. /about is indexed
        content and keeps the brand hero. */}
    <section className="ground-dark border-b border-neutral-200 bg-primary-700 py-16 sm:py-20">
      <div className={siteContainerLg}>
        {/* ADOPTED: packages/web-shared/design/primitives/Breadcrumb.tsx, the
            same call shape as the phase-3 hubs. The Home crumb is not a new
            internal link: the kit header wordmark and footer already emit
            href="/" on every page, so this route's UNIQUE internal link set is
            unchanged. It also emits a BreadcrumbList JSON-LD and nothing else
            on this route emits one. */}
        <div className={crumbOnBrand}>
          <Breadcrumb
            onDark
            siteUrl={siteConfig.url}
            items={[{ label: "Home", href: "/" }, { label: "About" }]}
          />
        </div>
        <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">We work with UK online sellers.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">Ecommerce accounts, VAT, settlement reconciliation and marketplace compliance are specialist enough that general accounting experience is not the same as ecommerce experience.</p>
      </div>
    </section>
    {/* ADOPTED: packages/web-shared/design/primitives/page-blocks.tsx `Eyebrow`.
        A structural section label, and the word is lifted from this route's own
        metaTitle, so no copy is authored.
        ADOPTION DECLINED on this page:
        packages/web-shared/design/marketing/TestimonialsSection.tsx (hardcodes
        Property's quotes; this site has no authored social proof),
        packages/web-shared/design/marketing/StatsCounter.tsx (numeric targets
        nobody has authored for this page; it would also be a client-count
        claim), packages/web-shared/design/marketing/WhatToExpectCard.tsx (its
        default props publish a fee line nobody here authored),
        packages/web-shared/design/marketing/LeadCTAPanel.tsx and
        packages/web-shared/design/marketing/StickyCTA.tsx (a new lead-capture
        surface and an interruption, both owner-gated). */}
    <section className="bg-white">
      <div className={`${siteContainerLg} ${sectionYLoose}`}>
        <Eyebrow>About</Eyebrow>
        <div className="max-w-3xl space-y-8 text-base leading-relaxed text-neutral-600 sm:text-lg">
          <p>We are specialist accountants for UK online sellers: Amazon FBA and FBM sellers, Shopify store owners, marketplace sellers on eBay, Etsy and TikTok Shop, and dropshipping businesses.</p>
          <p>We support accounts, VAT compliance, settlement reconciliation and tax returns for ecommerce businesses. This page is being prepared and will set out our approach in more detail.</p>
        </div>
        <div className="mt-10 border-t border-neutral-100 pt-8 text-sm text-neutral-500">
          <p>{co.tradingName} is a trading name of {co.legalName}, registered in {co.placeOfRegistration} (company no. {co.number}). Registered office: {co.registeredOfficeLine}.</p>
        </div>
        <div className="mt-8"><Link href="/contact" className={btnPrimary}>Get in touch</Link></div>
      </div>
    </section>
  </>);
}
