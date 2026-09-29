import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";
import { btnPrimary, siteContainerLg, sectionYLoose } from "@/components/ui/layout-utils";
import EcommerceBackdrop from "@/components/layout/EcommerceBackdrop";
export const metadata: Metadata = {
  title: "About | Ecommerce Accountants",
  description: `${siteConfig.name} are specialist UK accountants for online sellers.`,
  alternates: { canonical: `${siteConfig.url}/about` },
};
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
        content and keeps the brand hero.
        RE-EXAMINED U2 2026-09-29 and the decline STANDS on two testable facts,
        neither of which `sectionClassName` (SlimHero.tsx:27,35-47) addresses.
        That prop does remove the ground half of the old objection: it replaces
        the single class `bg-slate-900` and nothing else, so the brand hero
        could keep its ground. What it cannot do:
        (a) SlimHero renders no breadcrumb slot at all (SlimHero.tsx:49-59 is
            section > container > Eyebrow + h1 + children, and `children` is the
            standfirst position under the h1). This hero's Breadcrumb emits the
            route's ONLY BreadcrumbList JSON-LD, so adopting would either delete
            that node or move the trail below the h1.
        (b) its eyebrow is hardcoded `Eyebrow onDark` (SlimHero.tsx:54) with no
            override, and on this site's #8a5e1a brand ground the kit's on-dark
            branch (text-slate-300, #cbd5e1) measures 3.83:1, under the 4.5
            floor for an 11-12px label. That is the same measurement that keeps
            `Eyebrow onDark` declined on every hero in this family.
        It also shortens the rhythm from py-16 sm:py-20 to py-8 sm:py-10 lg:py-12,
        which is a structural class the prop explicitly does not touch. So gate
        D4 is answered without SlimHero: the four hub section labels became
        config strings and the hand-rolled heroes stay. */}
    <section className="ground-dark relative overflow-hidden border-b border-slate-200 bg-primary-700 py-16 sm:py-20">
      {/* Decoration only, aria-hidden, pointer-events-none. The section
          carries `relative overflow-hidden` and the container below
          `relative z-10`: that is the backdrop host contract, and getting
          it wrong paints the texture over the copy. */}
      <EcommerceBackdrop />
      <div className={`relative z-10 ${siteContainerLg}`}>
        {/* ADOPTED: packages/web-shared/design/primitives/Breadcrumb.tsx, the
            same call shape as the phase-3 hubs. The Home crumb is not a new
            internal link: the kit header wordmark and footer already emit
            href="/" on every page, so this route's UNIQUE internal link set is
            unchanged. It also emits a BreadcrumbList JSON-LD and nothing else
            on this route emits one. */}
        <Breadcrumb
          tone="onBrand"
          siteUrl={siteConfig.url}
          items={[{ label: "Home", href: "/" }, { label: "About" }]}
        />
        <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">We work with UK online sellers.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90">Ecommerce accounts, VAT, settlement reconciliation and marketplace compliance are specialist enough that general accounting experience is not the same as ecommerce experience.</p>
      </div>
    </section>
    {/* ADOPTED: packages/web-shared/design/primitives/page-blocks.tsx `Eyebrow`.
        A structural section label, and the word is lifted from this route's own
        metaTitle, so no copy is authored.
        ADOPTION DECLINED on this page:
        packages/web-shared/design/marketing/TestimonialsSection.tsx. R5 G5, and
        rewritten rather than appended to (plan item E8): the old reason
        ("hardcodes Property's quotes") is STALE, because the `items` prop landed
        at `4a267372`. The live reason is the other half on its own: this site
        publishes no authored social proof, so there is nothing to pass.
        packages/web-shared/design/marketing/StatsCounter.tsx (numeric targets
        nobody has authored for this page; it would also be a client-count
        claim), packages/web-shared/design/marketing/WhatToExpectCard.tsx (its
        default props publish a fee line nobody here authored) and
        packages/web-shared/design/marketing/StickyCTA.tsx (an interruption,
        banned estate-wide).
        NOT declined, R5 G5: LeadCTAPanel was listed here as owner-gated while
        this file imports it at :5 and mounts it at the foot of the page. The
        owner answered gate D3 yes; the mount is the truth and this list was
        stale. */}
    <section className="bg-white">
      <div className={`${siteContainerLg} ${sectionYLoose}`}>
        <Eyebrow>About</Eyebrow>
        <div className="max-w-3xl space-y-8 text-base leading-relaxed text-slate-600 sm:text-lg">
          <p>We are specialist accountants for UK online sellers: Amazon FBA and FBM sellers, Shopify store owners, marketplace sellers on eBay, Etsy and TikTok Shop, and dropshipping businesses.</p>
          <p>We support accounts, VAT compliance, settlement reconciliation and tax returns for ecommerce businesses. This page is being prepared and will set out our approach in more detail.</p>
        </div>
        <div className="mt-10 border-t border-slate-100 pt-8 text-sm text-slate-500">
          <p>{co.tradingName} is a trading name of {co.legalName}, registered in {co.placeOfRegistration} (company no. {co.number}). Registered office: {co.registeredOfficeLine}.</p>
        </div>
        {/* `data-cta` triple added U2 2026-09-29 (owner gate D2). Attribute only:
            the link, its href and its label are unchanged. */}
        <div className="mt-8"><Link href="/contact" data-cta="about_body_book" data-cta-placement="body" data-cta-goal="contact" className={btnPrimary}>Get in touch</Link></div>
      </div>
    </section>
    {/* ADDED 2026-09-28 parity phase 0: section 4 requires a LeadCTAPanel with
        the site's LeadForm at the foot of /about, which this route had none of.
        Same call shape as the three slug templates (/for, /services, /vat):
        eyebrow, formTitle and proofPoints overridden to empty so no component
        default publishes copy nobody here authored.
        2026-09-28 late (owner ruling, wording reversal): the mount stays, the
        agent-written eyebrow/title/description do not. The strings below are
        this site's own published panel copy, taken from /services/[slug]. */}
    <LeadCTAPanel
      eyebrow=""
      title="Speak to an ecommerce tax specialist."
      description="Tell us about your situation and we will reply within 24 hours."
      proofPoints={[]}
      formTitle=""
      form={<LeadForm ctaId="about_panel_book" />}
    />
  </>);
}
