import type { Metadata } from "next";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { CoverageCards } from "@accounting-network/web-shared/design/marketing/CoverageCards";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { vatPages } from "@/data/vat";
import { siteConfig } from "@/config/site";
import nicheConfig from "../../../../niche.config.json";
import EcommerceBackdrop from "@/components/layout/EcommerceBackdrop";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { LeadForm } from "@/components/forms/LeadForm";
/**
 * D4 (owner ruling, 2026-09-29): the hub section labels are config strings.
 * Read straight off niche.config.json rather than through src/config/niche-loader.ts,
 * because `NicheConfig` (packages/web-shared/lib/niche-config.ts) is a closed
 * interface with no index signature and packages/ is a manager carve-out, so a
 * new key cannot be typed there from this lease. Texts are byte-identical to
 * the literals they replace: nothing rendered changes.
 */
const hubLabels = nicheConfig.hub_labels;

export const metadata: Metadata = {
  title: "Ecommerce VAT Guides for UK Sellers",
  description: "VAT guidance for UK ecommerce and marketplace sellers: deemed supplier rules, marketplace fee VAT, the £135 import rule, IOSS/OSS and postponed VAT.",
  alternates: { canonical: `${siteConfig.url}/vat` },
};
export default function VatIndexPage() {
  return (<>
    {/* `ground-dark` rebinds --focus-ring to the on-brand white for everything
        inside this section. Without it the breadcrumb links ring in #8a5e1a on
        an #8a5e1a ground, i.e. 1.00:1. The ground itself is unchanged: the hex
        is now read from the --color-primary-700 token that globals.css already
        anchors on #8a5e1a (white on it = 5.68). No light island sits inside
        this section, so the inherited rebind cannot leak onto one. */}
    <section className="ground-dark relative overflow-hidden border-b border-slate-200 bg-primary-700 py-16 sm:py-20">
      {/* Decoration only, aria-hidden, pointer-events-none. The section
          carries `relative overflow-hidden` and the container below
          `relative z-10`: that is the backdrop host contract, and getting
          it wrong paints the texture over the copy. */}
      <EcommerceBackdrop />
      <div className={`relative z-10 ${siteContainerLg}`}>
        {/* ADOPTED: packages/web-shared/design/primitives/Breadcrumb.tsx. It also
            emits the BreadcrumbList JSON-LD; this route emitted none before, and
            no other node on the page emits one, so there is still exactly one. */}
        <Breadcrumb
          tone="onBrand"
          siteUrl={siteConfig.url}
          items={[{ label: "Home", href: "/" }, { label: "VAT" }]}
        />
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">VAT for online sellers: the depth cluster.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90">Ecommerce VAT is specific. Deemed supplier rules, marketplace fee reverse charge, the £135 import rule, IOSS and postponed VAT all apply differently to online sellers.</p>
      </div>
    </section>
    {/* ADOPTED (U2, 2026-09-29), reversing the decline above it:
        packages/web-shared/design/marketing/CoverageCards.tsx. The decisive
        half of the old reason ("its cards are <div>s with no link slot, and on
        this hub the cards ARE the five /vat/<slug> links") is now false:
        `CoverageItem.href` landed 2026-09-29 (CoverageCards.tsx:24-31) and
        makes the whole card the link, with the kit focusRing. The other half
        ("it would still need an invented LucideIcon per record") is also gone:
        `icon` became optional on the same date (:17-23) and a card with no icon
        renders with no badge. Every /vat/<slug> href is preserved, so the
        route's link floor is unchanged.
        CARRIED (two facts, both reported rather than patched, because
        packages/ is a manager carve-out):
        1. the kit renders a plain <a>, not next/link, so these are full-page
           navigations rather than client transitions. The kit's own comment at
           :26-29 states that and scopes it to internal paths, which these are.
        2. the card's ring is the KIT focusRing (CoverageCards.tsx:5,110),
           `outline-primary-600` = #9e6615, not this site's
           `outline-[var(--focus-ring)]`. On this section's near-white
           bg-primary-400/5 ground #9e6615 measures 4.81, past the 3.0 graphic
           floor, so it is legible; what it is not is inside the one-mechanism
           ring grep this port established. The site-side grep
           `outline-\[var\(--focus-ring\)\]` therefore no longer finds every
           ring on this route.
        DROPPED with the hand-rolled card: the aria-hidden ArrowRight hover
        affordance and the `line-clamp-2` truncation. Neither carries copy; the
        headline now renders in full, and the card is still the link.
        STILL DECLINED: packages/web-shared/design/marketing/TopicSection.tsx
        (would restructure the grid around a heading and body this route does
        not publish) and packages/web-shared/design/marketing/StickyCTA.tsx (an
        interruption, banned estate-wide). */}
    <section className="bg-primary-400/5 py-12 sm:py-16 lg:py-20">
      <div className={siteContainerLg}>
        {/* D4 (owner, 2026-09-29): this hub already published a section label,
            so the string moves to ecommerce/niche.config.json
            `hub_labels.vat` byte-identical and nothing rendered changes. */}
        <Eyebrow>{hubLabels.vat}</Eyebrow>
        {/* R5 G3 named this hub alongside /services and /for as orphaning "the
            fourth card". It does not: `vatPages` has FIVE records (data/vat.ts),
            which is also why the review counted five `vat_hero_book` mounts on
            the detail template. `columns={3}` renders 3 + 2 and orphans nothing;
            `columns={4}` here would render 4 + 1 and create the defect. Left at
            3 deliberately. */}
        <CoverageCards
          columns={3}
          tone="white"
          items={vatPages.map((vp) => ({
            title: vp.title,
            body: vp.headline,
            href: `/vat/${vp.slug}`,
          }))}
        />
      </div>
    </section>
    {/* ADDED 2026-09-28 parity phase 0 (Opus read): brief section 4 requires one
        LeadCTAPanel with the site's LeadForm on every money page. This hub
        rendered zero forms. The earlier decline was "writing a CTA heading and
        line is authoring copy"; authoring it is exactly what this pass is for. */}
    <LeadCTAPanel
      eyebrow=""
      title="Speak to an ecommerce VAT specialist."
      description="Tell us about your VAT situation and we will reply within 24 hours."
      proofPoints={[]}
      formTitle=""
      form={<LeadForm ctaId="vat_hub_book" />}
    />
  </>);
}
