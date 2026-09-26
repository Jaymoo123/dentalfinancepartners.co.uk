import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { siteConfig } from "@/config/site";
import { siteContainerLg, sectionY, focusRing } from "@/components/ui/layout-utils";
import onlineSellerIndex from "@/data/online-seller-index.json";
import survivalSnapshot from "@/data/online-seller-survival-index.json";
import { fmtPct } from "@/lib/research/survival-index";

export const metadata: Metadata = {
  title: "Ecommerce and online-retail research | Ecommerce Finance",
  description:
    "Original, sourced data on the UK online-retail and marketplace-seller economy, built entirely from official Companies House and ONS open data. Free to read and cite.",
  alternates: { canonical: `${siteConfig.url}/research` },
};

/**
 * Contrast wrapper for the adopted kit Breadcrumb, the same string phases 3 and
 * 4 use on the brand hero. On THIS ground it is parity, not a fix: the research
 * family paints #1a3a5c, where the kit's own onDark palette
 * (packages/web-shared/design/primitives/Breadcrumb.tsx) already measures
 * slate-300 links 7.84:1 and slate-400 chevrons 4.54:1, both past the 4.5 text
 * and 3.0 graphic floors. It is kept so every hero trail on the site reads the
 * same white (11.64 links, 8.09 chevrons), not because the kit fails here.
 */
const crumbOnBrand = "[&_a]:text-white [&_a]:hover:text-white [&_svg]:text-white/80";

const active = onlineSellerIndex.sic47910.activeCompanies.label;
const latestOns = onlineSellerIndex.onsJ4mc.annual.at(-1);

const reports = [
  {
    href: "/research/online-seller-index",
    title: "Online Seller Business Index",
    blurb: `Companies House SIC 47910 (retail via mail order or internet) incorporations and dissolutions, paired with the ONS internet-retail sales share of all UK retail (${latestOns?.pct}% in ${latestOns?.year}). Quarterly churn, formation-year cohort survival, formation seasonality and secondary SIC series.`,
    stat: active,
    statLabel: "SIC 47910 companies currently active on the register",
    updated: onlineSellerIndex.meta.lastUpdated,
  },
  {
    href: "/research/online-seller-survival-index",
    title: "Online Seller Survival Index",
    blurb: `How long UK retail enterprises actually last: ${fmtPct(survivalSnapshot.headline.latest_5yr_retail_pct)} of the ${survivalSnapshot.headline.latest_5yr_cohort_year} Retail birth cohort survived 5 years, trailing the ${fmtPct(survivalSnapshot.headline.latest_5yr_all_industries_pct)} all-industries average.`,
    stat: fmtPct(survivalSnapshot.headline.latest_5yr_retail_pct),
    statLabel: `5-year survival rate, ${survivalSnapshot.headline.latest_5yr_cohort_year} birth cohort`,
    updated: survivalSnapshot.meta.release_date,
  },
];

export default function ResearchIndexPage() {
  return (
    <>
      {/* ADOPTED: packages/web-shared/design/primitives/Breadcrumb.tsx, the same
          trail the phase-3 hub families and the phase-4 calculator template
          carry. It replaces a hand-rolled uppercase "Research" label that was an
          Eyebrow in all but name; the word survives as the trail's current
          crumb, so no copy is added or dropped. The only href it emits is "/",
          which packages/web-shared/design/chrome/SiteHeader.tsx:128 and
          SiteFooter.tsx:145 already emit on every page, so the route's unique
          internal link set is unchanged.

          ADOPTION DECLINED here only: `Eyebrow onDark` from
          packages/web-shared/design/primitives/page-blocks.tsx. The breadcrumb
          already carries the section label; stacking an eyebrow reading
          "Research" directly above a crumb reading "Research" is duplication,
          not structure. Eyebrow IS adopted on the light section below.

          `ground-dark` rebinds --focus-ring to white for the trail's Home link,
          which is the only focusable element in this band. No light island sits
          inside it. */}
      <section className="ground-dark border-b border-neutral-200 bg-[#1a3a5c] py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className={crumbOnBrand}>
            <Breadcrumb
              onDark
              siteUrl={siteConfig.url}
              items={[{ label: "Home", href: "/" }, { label: "Research" }]}
            />
          </div>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Ecommerce and online-retail research.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            Original, sourced reads on the UK online-retail and marketplace-seller economy, built
            entirely from official Companies House and ONS open data. Free to read and cite with
            attribution.
          </p>
        </div>
      </section>

      {/* ADOPTION DECLINED on these cards:
          packages/web-shared/design/marketing/StatsCounter.tsx. It takes ONE
          number and a plain-string label, renders no markup in the label and no
          link, so it would strip the sourcing that is the whole point of these
          tiles: each stat's label names the register or cohort the figure came
          from and the card itself is the link to the study. It is banned on this
          site for exactly that reason. Also declined estate-wide or by owner
          gate: packages/web-shared/design/marketing/LeadCTAPanel.tsx,
          .../StickyCTA.tsx, .../TestimonialsSection.tsx, .../WhatToExpectCard.tsx.

          The #1a3a5c research navy is NOT swapped for the primary-* ramp. It is
          the shared accent of the whole research family (51 occurrences, mostly
          on /research/online-seller-index) and of /about, it has no declared
          token, and src/app/globals.css is outside this lease so one cannot be
          added. As text it measures 11.64 on white and 11.15 on neutral-50, so
          it is not a contrast defect either. Reported to the manager instead. */}
      <section className={`bg-white ${sectionY}`}>
        <div className={siteContainerLg}>
          <Eyebrow>Reports</Eyebrow>
          <div className="mt-2 grid gap-6 sm:grid-cols-2">
            {reports.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className={`group border border-neutral-200 bg-white p-6 transition hover:border-[#1a3a5c] hover:shadow-md sm:p-8 ${focusRing}`}
              >
                <div className="text-3xl font-bold font-mono text-[#1a3a5c] sm:text-4xl">{r.stat}</div>
                <div className="mt-1 text-sm text-neutral-500">{r.statLabel}</div>
                <h2 className="mt-5 text-xl font-bold text-neutral-900 group-hover:text-[#1a3a5c]">
                  {r.title}
                </h2>
                <p className="mt-2 text-base leading-relaxed text-neutral-600">{r.blurb}</p>
                {/* neutral-400 measured 2.52 on white, under the 4.5 text floor.
                    neutral-500 is 4.74. Same fix as the two footnote lines on
                    the survival study. */}
                <p className="mt-4 text-xs text-neutral-500">Updated {r.updated}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
