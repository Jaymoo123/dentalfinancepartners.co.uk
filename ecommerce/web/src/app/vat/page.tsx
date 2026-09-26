import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { siteContainerLg, focusRing } from "@/components/ui/layout-utils";
import { vatPages } from "@/data/vat";
import { siteConfig } from "@/config/site";
export const metadata: Metadata = {
  title: "Ecommerce VAT Hub | UK Online Seller VAT Guides",
  description: "VAT guidance for UK ecommerce and marketplace sellers: deemed supplier rules, marketplace fee VAT, the £135 import rule, IOSS/OSS, postponed VAT and margin scheme.",
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
    <section className="ground-dark border-b border-neutral-200 bg-primary-700 py-16 sm:py-20">
      <div className={siteContainerLg}>
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
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">Ecommerce VAT is specific. Deemed supplier rules, marketplace fee reverse charge, the £135 import rule, IOSS and postponed VAT all apply differently to online sellers.</p>
      </div>
    </section>
    {/* DECLINED: packages/web-shared/design/marketing/CoverageCards.tsx. Its cards
        are not links, so adopting it would delete the five hrefs that are the
        entire job of this grid, and it requires a per-item `icon: LucideIcon`
        (new data, and lucide-react is not a dependency of ecommerce/web).
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
            <Link key={vp.slug} href={`/vat/${vp.slug}`} className={`group block bg-white border border-neutral-200 p-5 sm:p-6 transition-all hover:border-primary-400 hover:shadow-md ${focusRing}`}>
              <span className="text-base font-bold text-neutral-900 group-hover:text-primary-700 transition-colors">{vp.title}</span>
              <p className="mt-2 text-sm text-neutral-500 line-clamp-2">{vp.headline}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  </>);
}
