import type { Metadata } from "next";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { siteConfig } from "@/config/site";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { LeadForm } from "@/components/forms/LeadForm";
import PharmaciesBackdrop from "@/components/layout/PharmaciesBackdrop";

export const metadata: Metadata = {
  title: "Contact us",
  description: `Speak to ${siteConfig.name} about pharmacy accounting, buying or selling a pharmacy, or NHS contract income. We reply within 24 hours.`,
  alternates: { canonical: `${siteConfig.url}/contact` },
};

/**
 * CHROME ONLY. This route published exactly three strings before the port, and
 * all three survive byte for byte: the h1 "Contact us", "Tell us about your
 * pharmacy situation." and "We reply within 24 hours." The pre-port page ran
 * the last two together in one `<p>`; they are now the LeadCTAPanel's required
 * `title` and `description`. No sentence is authored, reworded or dropped.
 *
 * ADOPTED: packages/web-shared/design/primitives/Breadcrumb.tsx at
 * `tone="onBrand"` (:39,68-80). Replaces src/components/ui/Breadcrumb.tsx,
 * which W3 retires this phase; the kit component emits the same single
 * BreadcrumbList block, through `serialize()` (:86) rather than a bare
 * JSON.stringify, so a `</script>` inside a crumb label cannot break out.
 * ADOPTED: packages/web-shared/design/marketing/LeadCTAPanel.tsx, wrapping the
 * existing LeadForm. `eyebrow=""` and `formTitle=""` because this site
 * publishes neither of the component's defaults ("Free consultation" /
 * "Book your free consultation", :18,27) and both render only when non-empty
 * (:156,194). `proofPoints={[]}`: the page publishes no proof list and
 * inventing three would be authoring copy. `contained` with `ground="white"`
 * because the brand hero above and the kit's slate-900 footer below would
 * otherwise sandwich a third dark band (DESIGN_SYSTEM 9, navy must not touch
 * navy); the contained variant is the one written for that case (:59-64).
 *
 * ADOPTION DECLINED: packages/web-shared/design/primitives/SlimHero.tsx. Its
 * docblock (:5-13) scopes it to the three token-gated post-submit pages and
 * states it carries no breadcrumb because those routes are noindex. /contact
 * is indexed and carries a trail, and SlimHero holds Eyebrow, h1 and children
 * in one container (:52-57) with no slot above the eyebrow, so the breadcrumb
 * could only land under the h1. Adopted on /book, /complete and /thank-you
 * instead, which is where its own docblock sends it.
 * ADOPTION DECLINED: packages/web-shared/design/marketing/WhatToExpectCard.tsx.
 * Its `items` must be passed explicitly, because the defaults publish a fee
 * line this site never promises ("Fixed fee quote if you decide to proceed",
 * :22-27). This route publishes no "what happens next" list to pass: the four
 * items would have to be written here, and the sentences would be
 * "Instant text and email from us", "Initial call to understand your
 * situation", "Clear recommendations with no obligation" and a fourth about
 * fees. That is authored copy, which the owner ruling forbids.
 */
export default function ContactPage() {
  return (
    <>
      {/* `.ground-dark` rebinds --focus-ring / --kit-focus-ring to white: the
          brand hex rings at 1.47 against its own ground. No light-ground card
          with focusable children sits inside this section, which is the one
          case globals.css warns the class must not wrap.

          GROUND ROW for PharmaciesBackdrop, which phase 1 measured on
          slate-900 only and whose header asks each new ground to add its own.
          New ground: bg-primary-950 #0f3a4a. Motif stroke #45cdff at the
          component's 0.10 group opacity composites to #15485c. Bare #0f3a4a:
          white 12.18, slate-300 8.20. Composited #15485c: white 9.95,
          white/80 7.02, slate-300 6.70. Every pair PASSES the 4.5 text floor,
          and the component's own left-fading mask means copy never sits on a
          rule at full alpha anyway. */}
      <section className="ground-dark relative overflow-hidden border-b border-slate-200 bg-primary-950 py-16 sm:py-20">
        <PharmaciesBackdrop patternId="pharmacies-dispensary-shelving-contact" />
        <div className={`relative z-10 ${siteContainerLg}`}>
          <Breadcrumb
            tone="onBrand"
            siteUrl={siteConfig.url}
            items={[{ label: "Home", href: "/" }, { label: "Contact" }]}
          />
          {/* Reuses the published nav label (niche.config.json navigation[5]), same
              pattern as /about's SlimHero eyebrow. No sentence authored. */}
          <Eyebrow onDark className="mt-4">Contact</Eyebrow>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Contact us
          </h1>
        </div>
      </section>

      {/* data-cta: `contact_pricing_link` DECLINED. Grepped this route for a
          pricing link (`grep -n pricing app/contact/page.tsx`) and this page
          publishes none - LeadCTAPanel's form submit already carries
          `lead_form_submit` from LeadForm.tsx:438, so the conversion path on
          this route is already instrumented; no new link is added to carry
          an id that doesn't exist. */}
      <LeadCTAPanel
        contained
        ground="white"
        eyebrow=""
        formTitle=""
        title="Tell us about your pharmacy situation."
        description="We reply within 24 hours."
        proofPoints={[]}
        form={<LeadForm />}
      />
    </>
  );
}
