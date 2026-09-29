import type { Metadata } from "next";
import { ServiceTiers } from "@accounting-network/web-shared/components/ServiceTiers";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { CoverageCards } from "@accounting-network/web-shared/design/marketing/CoverageCards";
import { siteContainerLg, sectionY } from "@/components/ui/layout-utils";
import { serviceTiers } from "@/config/service-tiers";
import { ecommerceServices } from "@/data/services";
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
  title: "Ecommerce Tax Services for UK Sellers",
  description: "Specialist ecommerce accountancy services: VAT compliance, settlement reconciliation, EU selling and HMRC platform-reporting letter response.",
  alternates: { canonical: `${siteConfig.url}/services` },
};
export default function ServicesIndexPage() {
  return (<>
    {/* ADOPTION DECLINED: packages/web-shared/design/primitives/SlimHero.tsx.
        Its own header says it is the shallow hero for the token-gated noindex
        pages and is "deliberately not the content-page hero"; it also hardcodes
        a slate-900 ground, which would replace the locked #8a5e1a brand hero.
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

        ADOPTION DECLINED here only: packages/web-shared/design/primitives/page-blocks.tsx
        `Eyebrow onDark`. Its on-dark branch is text-slate-300 (#cbd5e1), which I
        measured at 3.83:1 against this #8a5e1a ground, under the 4.5 floor for
        an 11-12px label. It is adopted below on the light sections, where its
        slate-600 branch clears the floor.

        ADOPTED: packages/web-shared/design/primitives/Breadcrumb.tsx, the same
        call the /for and /vat hubs now make. The Home crumb is NOT a new
        internal link: the kit header wordmark
        (packages/web-shared/design/chrome/SiteHeader.tsx:128) and footer
        (SiteFooter.tsx:145) already emit href="/" on every page of this site,
        so the route's unique internal link set is unchanged. The trailing crumb
        is the nav label this route already carries in layout.tsx, not new copy.
        It also emits the route's only BreadcrumbList JSON-LD.
        `ground-dark` added with it: the breadcrumb is the first focusable thing
        ever placed in this hero, and without the rebind its focus ring would
        paint #8a5e1a on an #8a5e1a ground, i.e. 1.00:1. No light island sits
        inside this section. */}
    <section className="ground-dark relative overflow-hidden border-b border-slate-200 bg-primary-700 py-16 sm:py-20">
      {/* Decoration only, aria-hidden, pointer-events-none. The section
          carries `relative overflow-hidden` and the container below
          `relative z-10`: that is the backdrop host contract, and getting
          it wrong paints the texture over the copy. */}
      <EcommerceBackdrop />
      <div className={`relative z-10 ${siteContainerLg}`}>
        <Breadcrumb tone="onBrand" siteUrl={siteConfig.url} items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">Specialist services for UK online sellers.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90">VAT compliance, settlement reconciliation, EU selling and HMRC letter response.</p>
      </div>
    </section>
    <section className="bg-white border-b border-slate-200">
      <div className={`${siteContainerLg} ${sectionY}`}>
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Three service tiers</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Start with self assessment essentials, add VAT and reconciliation as your store grows, move to full cross-border compliance as you scale. You can move tier at any month-end.
          </p>
        </div>
        <ServiceTiers tiers={serviceTiers} featuredBadge="Most popular" />
      </div>
    </section>

    {/* ADOPTED (U2, 2026-09-29), reversing the decline above it:
        packages/web-shared/design/marketing/CoverageCards.tsx. The decisive
        half of the old reason ("its cards are <div>s with no link slot, and on
        this hub the cards ARE the four /services/<slug> links") is now false:
        `CoverageItem.href` landed 2026-09-29 (CoverageCards.tsx:24-31) and
        makes the whole card the link, with the kit focusRing. The other half
        ("it would still need an invented LucideIcon per record") is also gone:
        `icon` became optional on the same date (:17-23) and a card with no icon
        renders with no badge. Every /services/<slug> href is preserved, so the
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

        ADOPTION DECLINED: packages/web-shared/design/marketing/StickyCTA.tsx,
        an interruption, banned estate-wide. */}
    <section className={`bg-primary-400/5 ${sectionY}`}>
      <div className={siteContainerLg}>
        {/* D4 (owner, 2026-09-29): the four hub section labels become config
            strings. This hub already published one, so the string moves to
            ecommerce/niche.config.json `hub_labels.services` byte-identical and
            nothing rendered changes. */}
        <Eyebrow>{hubLabels.services}</Eyebrow>
        <CoverageCards
          columns={3}
          tone="white"
          items={ecommerceServices.map((s) => ({
            title: s.title,
            body: s.headline,
            href: `/services/${s.slug}`,
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
      form={<LeadForm />}
    />
  </>);
}
