import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { siteContainerLg, sectionYLoose } from "@/components/ui/layout-utils";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { LeadForm } from "@/components/forms/LeadForm";
import HospitalityBackdrop from "@/components/layout/HospitalityBackdrop";

/* W5 (2026-09-29). Kit adoption on this page, playbook gate 9.1.
 * ADOPTED: design/primitives/Breadcrumb.tsx with `tone="onBrand"` (:29-36,
 *   :68-79). The two legacy tones are written for navy and measure 4.23 / 2.39
 *   on a mid-tone brand ground; `onBrand` is white and white/80. No
 *   `crumbOnBrand` arbitrary-variant string and no hand-rolled trail.
 * DECLINED: design/primitives/page-blocks.tsx `Eyebrow` on this hero. The brief
 *   asks for one, but this page publishes no label above its h1 and the locked
 *   rule routes a NEW label to hospitality/niche.config.json, which the manager
 *   owns and no builder writes. Testable: `grep -n "section-label\|Eyebrow"` on
 *   this file before this change returns 0. Raised in the W5 receipt.
 */

export const metadata: Metadata = {
  title: "About | Specialist Hospitality Accountants",
  description: `${siteConfig.name} is a specialist accountancy practice for UK hospitality businesses. Tronc and tips compliance, food VAT, payroll and accounts for restaurants, pubs, hotels, cafes and takeaways.`,
  alternates: { canonical: `${siteConfig.url}/about` },
};

export default function AboutPage() {
  const co = siteConfig.company;

  return (
    <>
      {/* Brand hero. `ground-dark` rebinds --focus-ring and --kit-focus-ring to
          white for this subtree: checked before applying, the only focusable
          thing here is the breadcrumb's "Home" link, which sits directly on the
          brand ground, and there is no light-ground card to inherit it.
          Measured on bg-primary-600 (#b0532f): white 5.09 PASS; with the
          backdrop's strongest composite (0.10 of #e58764, ground #b55834) white
          4.78, still PASS. The existing text-white/80 standfirst measures 3.93
          bare and 3.67 composited, both under the 4.5 text floor; that is a
          PRE-EXISTING failure of a designer-set opacity, flagged in the W5
          receipt rather than changed here, and the backdrop is masked to the
          right 55% with a left fade so the copy column never sits on it. */}
      <section className="ground-dark relative overflow-hidden border-b border-slate-200 bg-primary-600 py-16 sm:py-20">
        <HospitalityBackdrop patternId="hospitality-table-setting-about" />
        <div className={`${siteContainerLg} relative z-10`}>
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "About" }]}
            siteUrl={siteConfig.url}
            tone="onBrand"
          />
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            We only work with hospitality businesses.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            Because tronc and tips compliance, food and drink VAT, payroll for variable-hours teams and the specific requirements of the licensed trade are specific enough that general accounting experience is not the same as specialist experience.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <div className="max-w-3xl space-y-8 text-base leading-relaxed text-slate-600 sm:text-lg">
            <p>We are specialist accountants for hospitality operators: restaurants, pubs and bars, hotels, cafes, takeaways, caterers and street food businesses. Every client we work with operates in the hospitality sector. That focus means we understand the financial specifics of the industry in a way that a general practice does not.</p>
            <p>Tronc and tips compliance is the clearest example. Many operators do not know what HMRC is looking for, what the Employment (Allocation of Tips) Act 2023 requires, or how to structure a scheme that actually saves employer National Insurance. We set up and operate tronc schemes week in, week out and we know where the compliance risks are.</p>
            <p>The same applies to food and drink VAT, payroll for zero-hours and variable-hours staff, business rates relief for licensed premises, and the Corporation Tax position for hospitality businesses. These are not things that come up occasionally for us. They are the core of what we do.</p>
            <p>We work on a fixed-fee basis. You know what you are paying before we start. We reply within one working day.</p>
          </div>
          <div className="mt-10 border-t border-slate-100 pt-8 text-sm text-slate-500">
            <p>{co.tradingName} is a trading name of {co.legalName}, registered in {co.placeOfRegistration} (company no. {co.number}). Registered office: {co.registeredOfficeLine}.</p>
          </div>
        </div>
      </section>

      {/* 2026-09-28 parity fix (brief section 4): /about rendered zero forms.
        2026-09-28 late (owner ruling, wording reversal): the mount stays, the
        agent-written copy does not; the strings below are this page's own
        published band copy.
        2026-09-29 (W5): `backdrop` added, the kit's own per-site motif slot.
        The panel's ground is unchanged (its own bg-slate-900); the component's
        contrast table already measures this exact pair (composited white 16.34,
        slate-300 11.00, both PASS). NOT `ground-dark`: the panel holds a white
        form card with focusable inputs and custom properties inherit. */}
      <LeadCTAPanel
        eyebrow=""
        title="Speak to a hospitality accounts specialist."
        description="Tell us about your hospitality business and we will reply within 24 hours. No obligation."
        proofPoints={[]}
        formTitle=""
        form={<LeadForm submitLabel="Request callback" />}
        backdrop={<HospitalityBackdrop patternId="hospitality-table-setting-about-cta" />}
      />
    </>
  );
}
