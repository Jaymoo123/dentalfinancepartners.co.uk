import type { Metadata } from "next";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { CoverageCards } from "@accounting-network/web-shared/design/marketing/CoverageCards";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { siteContainerLg, sectionY } from "@/components/ui/layout-utils";
import { sellerHubs } from "@/data/for";
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
  title: "Accountants for UK Online Sellers",
  description: "Specialist ecommerce tax support by seller type: Amazon FBA/FBM, Shopify, marketplace sellers (eBay/Etsy/Vinted/TikTok Shop) and dropshippers.",
  alternates: { canonical: `${siteConfig.url}/for` },
};
export default function ForIndexPage() {
  return (<>
    {/* ADOPTION DECLINED: packages/web-shared/design/primitives/SlimHero.tsx.
        Its own header says it is deliberately not the content-page hero: fixed
        bg-slate-900, no CTA row, written for the three noindex token-gated
        pages. This hub hero is the brand ground #8a5e1a (white on it is 5.68)
        and is indexed, so the swap would repaint an indexed hero navy and drop
        the brand.
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
        config strings and the hand-rolled heroes stay.
        `ground-dark` added here, not removed: this section paints a brand
        ground, so every focus ring inside it must resolve to the on-brand white
        (5.68 on #8a5e1a) rather than the default #8a5e1a ring, which would be
        1.00 against its own ground. Same treatment the research heroes carry.
        No light island sits inside it. */}
    <section className="ground-dark relative overflow-hidden border-b border-slate-200 bg-primary-700 py-16 sm:py-20">
      {/* Decoration only, aria-hidden, pointer-events-none. The section
          carries `relative overflow-hidden` and the container below
          `relative z-10`: that is the backdrop host contract, and getting
          it wrong paints the texture over the copy. */}
      <EcommerceBackdrop />
      <div className={`relative z-10 ${siteContainerLg}`}>
        {/* ADOPTED: packages/web-shared/design/primitives/Breadcrumb.tsx, the
            same call the /services and /vat hubs now make. The Home crumb is
            not a new internal link (the kit header wordmark and footer already
            emit href="/" on every page), and the trailing crumb reuses the
            words this route's own metaTitle already publishes. It emits the
            route's only BreadcrumbList JSON-LD. */}
        <Breadcrumb tone="onBrand" siteUrl={siteConfig.url} items={[{ label: "Home", href: "/" }, { label: "Who we help" }]} />
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">Specialist ecommerce tax support for every type of online seller.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90">Each selling model carries different VAT, platform and tax considerations. We work with all of them.</p>
      </div>
    </section>
    {/* ADOPTED (U2, 2026-09-29), reversing the decline above it:
        packages/web-shared/design/marketing/CoverageCards.tsx. The decisive
        half of the old reason ("its cards are <div>s with no link slot, and on
        this hub the cards ARE the four /for/<slug> links") is now false:
        `CoverageItem.href` landed 2026-09-29 (CoverageCards.tsx:24-31) and
        makes the whole card the link, with the kit focusRing. The other half
        ("it would still need an invented LucideIcon per record") is also gone:
        `icon` became optional on the same date (:17-23) and a card with no icon
        renders with no badge. Every /for/<slug> href is preserved, so the
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
    <section className={`bg-primary-400/5 ${sectionY}`}>
      <div className={siteContainerLg}>
        {/* D4 (owner, 2026-09-29): this hub already published a section label,
            so the string moves to ecommerce/niche.config.json
            `hub_labels.for` byte-identical and nothing rendered changes. */}
        <Eyebrow>{hubLabels.for}</Eyebrow>
        {/* R5 G3: `columns={3}` orphaned the fourth card on a row of its own
            (the kit rendered `341px 341px 341px` for four items). The set is
            four, so the grid is four: `columns={4}` resolves to
            `md:grid-cols-2 lg:grid-cols-4` and the count and the grid agree,
            which is the rule the estate fixed elsewhere at `21bff5e8`. */}
        <CoverageCards
          columns={4}
          tone="white"
          items={sellerHubs.map((hub) => ({
            title: hub.title,
            body: hub.headline,
            href: `/for/${hub.slug}`,
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
      title="Speak to an ecommerce tax specialist."
      description="Tell us about your situation and we will reply within 24 hours."
      proofPoints={[]}
      formTitle=""
      form={<LeadForm ctaId="for_hub_book" />}
    />
  </>);
}
