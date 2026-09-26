import type { Metadata } from "next";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { siteConfig } from "@/config/site";
import { contentNarrow, siteContainerLg, sectionY } from "@/components/ui/layout-utils";
import { LeadForm } from "@/components/forms/LeadForm";
import EcommerceBackdrop from "@/components/layout/EcommerceBackdrop";
export const metadata: Metadata = {
  title: "Contact us",
  description: `Speak to ${siteConfig.name} about ecommerce accounts, VAT, marketplace compliance or online seller tax. We reply within 24 hours.`,
  alternates: { canonical: `${siteConfig.url}/contact` },
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
export default function ContactPage() {
  return (<>
    {/* This route had no hero, no breadcrumb and no section structure at all:
        an h1 and a paragraph in a bare max-w-2xl div. It now carries the same
        brand hero as every other indexed route in this port. `ground-dark`
        rebinds --focus-ring and --kit-focus-ring to the on-brand white, or the
        breadcrumb links ring #8a5e1a on an #8a5e1a ground, 1.00:1. No light
        island sits inside this section: the form is in the section below.

        ADOPTION DECLINED: packages/web-shared/design/primitives/SlimHero.tsx.
        Its docblock scopes it to /thank-you, /book and /complete, and those
        three are another builder's lease this phase.
        ADOPTION DECLINED: packages/web-shared/design/marketing/LeadCTAPanel.tsx.
        /contact already IS this site's lead-capture surface; the panel would
        add a second form and its own authored copy. Also
        packages/web-shared/design/marketing/StickyCTA.tsx (an interruption,
        banned estate-wide) and
        packages/web-shared/design/marketing/WhatToExpectCard.tsx (its default
        props publish a fee line nobody here authored). */}
    <section className="ground-dark relative overflow-hidden border-b border-neutral-200 bg-primary-700 py-16 sm:py-20">
      {/* Decoration only, aria-hidden, pointer-events-none. The section
          carries `relative overflow-hidden` and the container below
          `relative z-10`: that is the backdrop host contract, and getting
          it wrong paints the texture over the copy. */}
      <EcommerceBackdrop />
      <div className={`relative z-10 ${siteContainerLg}`}>
        <div className={crumbOnBrand}>
          <Breadcrumb
            onDark
            siteUrl={siteConfig.url}
            items={[{ label: "Home", href: "/" }, { label: "Contact" }]}
          />
        </div>
        <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">Contact us</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90">Tell us about your online selling. We reply within 24 hours.</p>
      </div>
    </section>
    {/* The form itself is src/components/forms/LeadForm.tsx, another builder's
        lease this phase. Untouched here: this file is the page shell only. */}
    <section className={`bg-white ${sectionY}`}>
      <div className={contentNarrow}>
        <LeadForm />
      </div>
    </section>
  </>);
}
