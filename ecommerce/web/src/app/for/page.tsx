import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { siteContainerLg, sectionY, focusRing } from "@/components/ui/layout-utils";
import { sellerHubs } from "@/data/for";
import { siteConfig } from "@/config/site";
import EcommerceBackdrop from "@/components/layout/EcommerceBackdrop";
export const metadata: Metadata = {
  title: "Accountants for UK Online Sellers",
  description: "Specialist ecommerce tax support by seller type: Amazon FBA/FBM, Shopify, marketplace sellers (eBay/Etsy/Vinted/TikTok Shop) and dropshippers.",
  alternates: { canonical: `${siteConfig.url}/for` },
};
/**
 * Contrast wrapper for the adopted kit Breadcrumb on the brand hero.
 * packages/web-shared/design/primitives/Breadcrumb.tsx paints its onDark trail
 * slate-300 with slate-400 chevrons, both written for the kit's navy: on
 * #8a5e1a they measure 3.76:1 and about 2.0:1, under the 4.5 text and 3.0
 * graphic floors. The kit is a carve-out, so the ground-correct palette is
 * applied from the call site (white 5.68, white/80 4.3). Identical string on
 * all six route files in this family.
 */
const crumbOnBrand = "[&_a]:text-white [&_a]:hover:text-white [&_svg]:text-white/80";

export default function ForIndexPage() {
  return (<>
    {/* ADOPTION DECLINED: packages/web-shared/design/primitives/SlimHero.tsx.
        Its own header says it is deliberately not the content-page hero: fixed
        bg-slate-900, no CTA row, written for the three noindex token-gated
        pages. This hub hero is the brand ground #8a5e1a (white on it is 5.68)
        and is indexed, so the swap would repaint an indexed hero navy and drop
        the brand.
        `ground-dark` added here, not removed: this section paints a brand
        ground, so every focus ring inside it must resolve to the on-brand white
        (5.68 on #8a5e1a) rather than the default #8a5e1a ring, which would be
        1.00 against its own ground. Same treatment the research heroes carry.
        No light island sits inside it. */}
    <section className="ground-dark relative overflow-hidden border-b border-neutral-200 bg-primary-700 py-16 sm:py-20">
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
        <div className={crumbOnBrand}>
          <Breadcrumb onDark siteUrl={siteConfig.url} items={[{ label: "Home", href: "/" }, { label: "Who we help" }]} />
        </div>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">Specialist ecommerce tax support for every type of online seller.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90">Each selling model carries different VAT, platform and tax considerations. We work with all of them.</p>
      </div>
    </section>
    {/* ADOPTION DECLINED, re-examined: packages/web-shared/design/marketing/CoverageCards.tsx.
        lucide-react is now declared in ecommerce/web/package.json, so that half
        of the old reason is gone. The other half is decisive and unchanged: its
        cards are plain <div>s with no link slot, and on this hub the cards ARE
        the four /for/<slug> links, which is the whole job of the grid.
        Adopting it would delete them. It may fit a grid that is not navigation;
        this one is. It would also still need an invented `icon: LucideIcon` per
        record, which no seller-hub record carries.
        What lucide DOES buy is the affordance these cards lacked: an ArrowRight
        that slides on hover, the mark generalist puts on every card-shaped
        link. aria-hidden decoration, text-primary-600 (#9e6615, 4.81 on the
        white card, past the 3.0 graphic floor).

        ADOPTION DECLINED: packages/web-shared/design/marketing/LeadCTAPanel.tsx,
        now owner-approved and adopted on all three slug templates, but not
        here: it requires a `title` and a `description` and this hub publishes
        neither a CTA heading nor a CTA line to hand it. Writing them is
        authoring marketing copy. Owner item.
        Row 1 rhythm is adopted: `sectionY` from the kit via the local
        re-export. */}
    <section className={`bg-primary-400/5 ${sectionY}`}>
      <div className={siteContainerLg}>
        {/* ADOPTED: `Eyebrow` from packages/web-shared/design/primitives/page-blocks.tsx,
            matching /services and /vat. The label is a structural section
            label, not a claim, and reuses the words this route's own metaTitle
            already publishes. */}
        <Eyebrow>Who we help</Eyebrow>
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {sellerHubs.map((hub) => (
            /* #c9861b is 3.04 on white: decoration only. It was the hover text
               colour on the card title, which is text. Moved to primary-700
               (#8a5e1a, 5.68 on white). The hover border keeps the brand hex,
               which is a graphic use and passes the 3:1 floor. */
            <Link key={hub.slug} href={`/for/${hub.slug}`} className={`group flex flex-col bg-white border border-neutral-200 p-5 sm:p-6 transition-all hover:border-primary-400 hover:shadow-md ${focusRing}`}>
              <span className="text-base font-bold text-neutral-900 group-hover:text-primary-700 transition-colors">{hub.title}</span>
              <p className="mt-2 text-sm text-neutral-500 line-clamp-2">{hub.headline}</p>
              {/* Affordance only, no label: the card already carries its title
                  and words here would be authored copy. aria-hidden, so the
                  link's accessible name is unchanged. */}
              <ArrowRight aria-hidden className="mt-4 h-4 w-4 text-primary-600 transition-transform group-hover:translate-x-1" strokeWidth={2} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  </>);
}
