import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { siteContainerLg, focusRing } from "@/components/ui/layout-utils";
import { vatPages } from "@/data/vat";
import { siteConfig } from "@/config/site";
import EcommerceBackdrop from "@/components/layout/EcommerceBackdrop";
export const metadata: Metadata = {
  title: "Ecommerce VAT Guides for UK Sellers",
  description: "VAT guidance for UK ecommerce and marketplace sellers: deemed supplier rules, marketplace fee VAT, the £135 import rule, IOSS/OSS and postponed VAT.",
  alternates: { canonical: `${siteConfig.url}/vat` },
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

export default function VatIndexPage() {
  return (<>
    {/* `ground-dark` rebinds --focus-ring to the on-brand white for everything
        inside this section. Without it the breadcrumb links ring in #8a5e1a on
        an #8a5e1a ground, i.e. 1.00:1. The ground itself is unchanged: the hex
        is now read from the --color-primary-700 token that globals.css already
        anchors on #8a5e1a (white on it = 5.68). No light island sits inside
        this section, so the inherited rebind cannot leak onto one. */}
    <section className="ground-dark relative overflow-hidden border-b border-neutral-200 bg-primary-700 py-16 sm:py-20">
      {/* Decoration only, aria-hidden, pointer-events-none. The section
          carries `relative overflow-hidden` and the container below
          `relative z-10`: that is the backdrop host contract, and getting
          it wrong paints the texture over the copy. */}
      <EcommerceBackdrop />
      <div className={`relative z-10 ${siteContainerLg}`}>
        {/* ADOPTED: packages/web-shared/design/primitives/Breadcrumb.tsx. It also
            emits the BreadcrumbList JSON-LD; this route emitted none before, and
            no other node on the page emits one, so there is still exactly one. */}
        <div className={crumbOnBrand}>
          <Breadcrumb
            onDark
            siteUrl={siteConfig.url}
            items={[{ label: "Home", href: "/" }, { label: "VAT" }]}
          />
        </div>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">VAT for online sellers: the depth cluster.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90">Ecommerce VAT is specific. Deemed supplier rules, marketplace fee reverse charge, the £135 import rule, IOSS and postponed VAT all apply differently to online sellers.</p>
      </div>
    </section>
    {/* DECLINED, re-examined: packages/web-shared/design/marketing/CoverageCards.tsx.
        lucide-react IS a dependency of ecommerce/web now, so that half of the
        old reason is gone. The other half is decisive: its cards are not links,
        and on this hub the cards are the five /vat/<slug> hrefs, which is the
        entire job of the grid. Adopting it would delete them. It may fit a grid
        that is not navigation; this one is. It would also still need a per-item
        `icon: LucideIcon` that no vat record carries.
        What lucide buys here is the affordance the cards lacked: an ArrowRight
        that slides on hover, aria-hidden, text-primary-600 (#9e6615, 4.81 on
        the white card, past the 3.0 graphic floor).
        DECLINED: packages/web-shared/design/marketing/LeadCTAPanel.tsx, now
        owner-approved and adopted on all three slug templates, but this hub
        publishes no CTA heading and no CTA line to hand its required `title`
        and `description`, and writing them is authoring marketing copy.
        Owner item.
        ADOPTED (reversing the earlier decline, and matching /services and
        /for): packages/web-shared/design/primitives/page-blocks.tsx `Eyebrow`.
        A structural section label is not a claim, and the words are lifted
        verbatim from this route's own metaTitle, so no copy is authored.
        Still DECLINED: packages/web-shared/design/marketing/TopicSection.tsx,
        which would restructure the grid around a heading and body this route
        does not have. */}
    <section className="bg-primary-400/5 py-12 sm:py-16 lg:py-20">
      <div className={siteContainerLg}>
        <Eyebrow>VAT guides</Eyebrow>
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {vatPages.map((vp) => (
            <Link key={vp.slug} href={`/vat/${vp.slug}`} className={`group flex flex-col bg-white border border-neutral-200 p-5 sm:p-6 transition-all hover:border-primary-400 hover:shadow-md ${focusRing}`}>
              <span className="text-base font-bold text-neutral-900 group-hover:text-primary-700 transition-colors">{vp.title}</span>
              <p className="mt-2 text-sm text-neutral-500 line-clamp-2">{vp.headline}</p>
              {/* Affordance only, no label: aria-hidden, so the link's
                  accessible name is unchanged and no copy is authored. */}
              <ArrowRight aria-hidden className="mt-4 h-4 w-4 text-primary-600 transition-transform group-hover:translate-x-1" strokeWidth={2} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  </>);
}
