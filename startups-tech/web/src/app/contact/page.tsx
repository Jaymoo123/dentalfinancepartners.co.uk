import type { Metadata } from "next";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { siteConfig } from "@/config/site";
import { contentNarrow, sectionY } from "@/components/ui/layout-utils";
import { LeadForm } from "@/components/forms/LeadForm";
export const metadata: Metadata = {
  title: "Contact us",
  description: `Speak to ${siteConfig.name} about startup tax, R&D relief, SEIS/EIS or EMI. You will hear back within 24 hours.`,
  alternates: { canonical: `${siteConfig.url}/contact` },
};
/**
 * CHROME ONLY. Every sentence on this page is the pre-port copy, byte for byte,
 * including the partner-network sentence below: that is an owner item, not a
 * design one, and this package does not touch it.
 *
 * ADOPTED: packages/web-shared/design/primitives/Breadcrumb.tsx (the trail plus
 * its BreadcrumbList JSON-LD; nothing else on this route emits one) and
 * packages/web-shared/design/primitives/page-blocks.tsx `Eyebrow`, whose word is
 * lifted from this route's own metaTitle so no copy is authored. The page moves
 * off its hand-rolled `mx-auto max-w-2xl px-6 py-16` onto the kit's
 * `contentNarrow` + `sectionY`.
 *
 * The Home crumb is not a new internal link: the phase-1 header wordmark and
 * footer already emit href="/" on every route, so this route's UNIQUE internal
 * link set is unchanged by it.
 *
 * ADOPTION DECLINED, for this route and stated once for the whole package:
 * packages/web-shared/design/marketing/StickyCTA.tsx, and every modal, banner,
 * popup, toast and exit-intent surface. This site has zero interruptive surfaces
 * today (P0E_STRUCTURAL_INVENTORY.md section 6) and the owner ruling is that it
 * must still have zero.
 * packages/web-shared/design/marketing/WhatToExpectCard.tsx: its DEFAULT props
 * publish a fee line no page here authored (T12).
 * packages/web-shared/leads/MiniCapture.tsx: this site runs a LOCAL
 * src/components/calculators/MiniCapture.tsx and the two are different
 * components. Consolidating them is lead plumbing, not design.
 * packages/web-shared/design/marketing/LeadCTAPanel.tsx: /contact already is the
 * form. A second capture surface on it would be a new one, which is owner-gated.
 *
 * DECLINED, U3.5: `data-cta="contact_pricing_link"`. `grep -rn "pricing"
 * app/contact/page.tsx` and `grep -rln "pricing" app --include=*.tsx` both
 * return nothing: this route has no link that points at pricing to
 * instrument. Nothing to tag.
 */
export default function ContactPage() {
  return (
    <div className={`${contentNarrow} ${sectionY}`}>
      <Breadcrumb
        siteUrl={siteConfig.url}
        items={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />
      <Eyebrow>Contact</Eyebrow>
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Contact us</h1>
      <p className="mt-4 text-base leading-relaxed text-slate-600">
        Tell us about your startup tax situation. One of our startup tax specialists will
        contact you directly, and you will hear back within 24 hours.
      </p>
      <div className="mt-10"><LeadForm /></div>
    </div>
  );
}
