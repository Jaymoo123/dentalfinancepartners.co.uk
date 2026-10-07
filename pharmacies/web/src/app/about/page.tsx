import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";
import { btnPrimary, siteContainerLg, sectionYLoose } from "@/components/ui/layout-utils";
import PharmaciesBackdrop from "@/components/layout/PharmaciesBackdrop";
import { SlimHero } from "@accounting-network/web-shared/design/primitives/SlimHero";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
export const metadata: Metadata = {
  title: "About | Specialist Accountants for UK Pharmacy Owners",
  description: `${siteConfig.name} are specialist accountants for UK community pharmacy owners, buyers, sellers, and groups.`,
  alternates: { canonical: `${siteConfig.url}/about` },
};
export default function AboutPage() {
  const co = siteConfig.company;
  return (<>
    {/* Kit `SlimHero` ADOPTED. The hospitality-era K1 decline ("ground is
        hardcoded bg-slate-900") is STALE: `sectionClassName` shipped at
        packages/web-shared/design/primitives/SlimHero.tsx:47, and it was read
        on source today - the prop replaces the single ground class inside the
        section's own class string (`relative overflow-hidden ${sectionClassName}
        py-8 sm:py-10 lg:py-12`), so `relative overflow-hidden` and the backdrop
        contract survive. Ground is this site's brand step `primary-950`
        the brand hex: the fixed white h1 measures 12.18 and the `Eyebrow onDark`
        slate-300 measures 8.20, both PASS.
        `eyebrow` is REQUIRED by the component and this page publishes no
        section label, so it takes "About" - the site's own published navigation
        label for this route (pharmacies/niche.config.json navigation[4]). No
        sentence is authored.
        `.ground-dark` on the wrapper, not inside the kit: SlimHero exposes no
        className for it, so the class goes on the element that carries both the
        hero and the breadcrumb trail, which is the only focusable content on
        this dark ground. */}
    <div className="ground-dark bg-primary-950">
      <div className={`${siteContainerLg} pt-6`}>
        <Breadcrumb
          siteUrl={siteConfig.url}
          tone="onBrand"
          items={[{ label: "Home", href: "/" }, { label: "About" }]}
        />
      </div>
      <SlimHero
        eyebrow="About"
        title="We only work with pharmacy businesses and their owners."
        sectionClassName="bg-primary-950"
        backdrop={<PharmaciesBackdrop patternId="pharmacies-shelving-about" />}
      >
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">NHS contract economics, VAT retail schemes, goodwill transactions, and community pharmacy payroll are specific enough that general accounting experience is not the same as specialist experience.</p>
      </SlimHero>
    </div>
    <section className="bg-white">
      <div className={`${siteContainerLg} ${sectionYLoose}`}>
        {/* The only new label on this page, and it is not new copy: "About" is
            the published navigation label for this route, reused as the section
            eyebrow so the body stack gets the kit's label rhythm. */}
        <Eyebrow>About</Eyebrow>
        <div className="max-w-3xl space-y-8 text-base leading-relaxed text-slate-600 sm:text-lg">
          <p>We are specialist accountants for UK community pharmacy businesses: independent owners, buyers and sellers, pharmacy groups, and locum pharmacists.</p>
          <p>Community pharmacies operate under a set of financial rules that differ from most small businesses: NHS Drug Tariff payments, dispensing contractor reconciliation, FP34 claims, VAT retail scheme apportionment, and goodwill-heavy transactions at purchase or sale.</p>
          <p>We handle purchase accounting, sale and CGT planning, pharmacy valuation support, NHS payment reconciliation, VAT retail schemes, payroll for dispensing and retail staff, incorporation and structure, and benchmarking against sector margins.</p>
          <p>We work on a fixed-fee basis and reply within 24 hours.</p>
        </div>
        <div className="mt-10 border-t border-slate-100 pt-8 text-sm text-slate-500">
          <p>{co.tradingName} is a trading name of {co.legalName}, registered in {co.placeOfRegistration} (company no. {co.number}). Registered office: {co.registeredOfficeLine}.</p>
        </div>
        <div className="mt-8">
          <Link
            href="/contact"
            className={btnPrimary}
            data-cta="about_hero_book"
            data-cta-placement="about_body"
            data-cta-goal="form"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </section>
    {/* ADDED 2026-09-28 parity phase 0 (Opus read): brief section 4 requires one
        lead form on every money page and this route rendered none. Same band as
        the /for and /services slug templates, not a new pattern.
        2026-09-28 late (owner ruling, wording reversal): the mount stays, the
        agent-written copy does not; the band below carries this site's own
        published /services/[slug] copy.
        2026-10-07 (W5): the hand-rolled band becomes the kit `LeadCTAPanel`,
        fed those same two sentences byte-identical.
        `eyebrow=""` and `formTitle=""`: this page publishes neither label, and
        the kit defaults are "Free consultation" (LeadCTAPanel.tsx:18) and "Book
        your free consultation" (:27), neither of which this site publishes
        anywhere (locked rule 9). Both render nothing when empty (:156, :194).
        `proofPoints={[]}`: this page publishes no tick rows, and the panel
        renders no list for an empty array (:163).
        DECLINED: packages/web-shared/design/marketing/WhatToExpectCard.tsx:29.
        Its `items` prop must be passed explicitly, because the DEFAULT_ITEMS at
        :22-27 publish a fee line ("Fixed fee quote if you decide to proceed")
        and a callback promise ("Instant text and email from us. Reply to
        confirm your callback") that are not this page's copy. But /about has no
        list of short expectation items to pass: its four body paragraphs are
        50-to-60-word paragraphs, not card rows. To mount it I would have to
        write a sentence such as "A call to understand your pharmacy, then
        clear recommendations" - which is exactly the authored copy the
        2026-09-28 reversal forbids. Named sentence, measured decline. */}
    {/* G3 (grounds fix, V1 blocker B2): the panel's slate-900 band was the last
        band before the slate-900 footer on this route (darkOnDark). It moves to
        the kit's `contained` light variant with `ground="slate"`, because the
        body section above it is white. Same copy, same `<LeadForm>`, same
        single mount; no new band and nothing removed. `backdrop` is dropped
        because the kit renders it on the navy variant only
        (LeadCTAPanel.tsx:72-77). */}
    <LeadCTAPanel
      eyebrow=""
      title="Speak to a pharmacy finance specialist."
      description="Tell us about your situation and we will reply within 24 hours."
      proofPoints={[]}
      formTitle=""
      contained
      ground="slate"
      form={<LeadForm submitLabel="Send enquiry" />}
    />
  </>);
}
