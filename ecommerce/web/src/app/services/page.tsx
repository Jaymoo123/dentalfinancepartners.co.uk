import type { Metadata } from "next";
import Link from "next/link";
import { ServiceTiers } from "@accounting-network/web-shared/components/ServiceTiers";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { siteContainerLg, sectionY, focusRing } from "@/components/ui/layout-utils";
import { serviceTiers } from "@/config/service-tiers";
import { ecommerceServices } from "@/data/services";
import { siteConfig } from "@/config/site";
export const metadata: Metadata = {
  title: "Ecommerce Tax Services | VAT, Accounts and Seller Compliance",
  description: "Specialist ecommerce accountancy services: VAT compliance, settlement reconciliation, EU selling and HMRC platform-reporting letter response.",
  alternates: { canonical: `${siteConfig.url}/services` },
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

export default function ServicesIndexPage() {
  return (<>
    {/* ADOPTION DECLINED: packages/web-shared/design/primitives/SlimHero.tsx.
        Its own header says it is the shallow hero for the token-gated noindex
        pages and is "deliberately not the content-page hero"; it also hardcodes
        a slate-900 ground, which would replace the locked #8a5e1a brand hero.

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
    <section className="ground-dark border-b border-neutral-200 bg-primary-700 py-16 sm:py-20">
      <div className={siteContainerLg}>
        <div className={crumbOnBrand}>
          <Breadcrumb onDark siteUrl={siteConfig.url} items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
        </div>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">Specialist services for UK online sellers.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">VAT compliance, settlement reconciliation, EU selling and HMRC letter response.</p>
      </div>
    </section>
    <section className="bg-white border-b border-neutral-200">
      <div className={`${siteContainerLg} ${sectionY}`}>
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">Three service tiers</h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-600">
            Start with self assessment essentials, add VAT and reconciliation as your store grows, move to full cross-border compliance as you scale. You can move tier at any month-end.
          </p>
        </div>
        <ServiceTiers tiers={serviceTiers} featuredBadge="Most popular" />
      </div>
    </section>

    {/* ADOPTION DECLINED: packages/web-shared/design/marketing/CoverageCards.tsx.
        Its cards are <div>s with no link slot, so swapping it in would delete
        the four /services/<slug> links that are the entire job of this grid,
        and it requires a LucideIcon value per item, which is an invented icon
        mapping plus a lucide-react dependency this app does not declare.
        ADOPTION DECLINED: packages/web-shared/design/marketing/LeadCTAPanel.tsx
        and packages/web-shared/design/marketing/StickyCTA.tsx. Both add a new
        lead-capture surface to a page whose CTA snapshot is a gate. */}
    <section className={`bg-primary-400/5 ${sectionY}`}>
      <div className={siteContainerLg}>
        <Eyebrow>What we do</Eyebrow>
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {ecommerceServices.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className={`group block bg-white border border-neutral-200 p-5 sm:p-6 transition-all hover:border-primary-400 hover:shadow-md ${focusRing}`}>
              {/* Hover colour is text-primary-700 (#8a5e1a, 5.68 on white), not
                  the brand hex #c9861b: that hex is 3.04 on white and is
                  decoration only, never text. The card border keeps it, because
                  a border is a graphic and clears the 3:1 floor. */}
              <span className="text-base font-bold text-neutral-900 group-hover:text-primary-700 transition-colors">{s.title}</span>
              <p className="mt-2 text-sm text-neutral-500 line-clamp-2">{s.headline}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  </>);
}
