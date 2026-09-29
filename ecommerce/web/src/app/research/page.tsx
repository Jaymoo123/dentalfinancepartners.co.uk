import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { siteConfig } from "@/config/site";
import nicheConfig from "../../../../niche.config.json";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteContainerLg, sectionY, focusRing } from "@/components/ui/layout-utils";
import onlineSellerIndex from "@/data/online-seller-index.json";
import survivalSnapshot from "@/data/online-seller-survival-index.json";
import { fmtPct } from "@/lib/research/survival-index";

/**
 * D4 (owner ruling, 2026-09-29): the hub section labels are config strings.
 * Read straight off niche.config.json rather than through src/config/niche-loader.ts,
 * because `NicheConfig` (packages/web-shared/lib/niche-config.ts) is a closed
 * interface with no index signature and packages/ is a manager carve-out, so a
 * new key cannot be typed there from this lease. The text is byte-identical to
 * the literal it replaces: nothing rendered changes.
 */
const hubLabels = nicheConfig.hub_labels;

export const metadata: Metadata = {
  title: "Ecommerce and online-retail research",
  description:
    "Original, sourced data on the UK online-retail and marketplace-seller economy, built from official Companies House and ONS open data. Free to cite.",
  alternates: { canonical: `${siteConfig.url}/research` },
};

const active = onlineSellerIndex.sic47910.activeCompanies.label;
const latestOns = onlineSellerIndex.onsJ4mc.annual.at(-1);

/**
 * `data-cta` ids for the two report cards (owner gate D2, 2026-09-29). The site
 * emitted exactly one id, `header_book`, on all 51 routes before this wave, so
 * nothing below the header could be attributed in `vw_cta_performance`. These
 * are attributes on links that already exist: no link is added, no wrapper is
 * tagged, and no word changes.
 */
const reports = [
  {
    ctaId: "research_hub_seller_index",
    href: "/research/online-seller-index",
    title: "Online Seller Business Index",
    blurb: `Companies House SIC 47910 (retail via mail order or internet) incorporations and dissolutions, paired with the ONS internet-retail sales share of all UK retail (${latestOns?.pct}% in ${latestOns?.year}). Quarterly churn, formation-year cohort survival, formation seasonality and secondary SIC series.`,
    stat: active,
    statLabel: "SIC 47910 companies currently active on the register",
    updated: onlineSellerIndex.meta.lastUpdated,
  },
  {
    ctaId: "research_hub_survival_index",
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
      <section className="ground-dark border-b border-slate-200 bg-[#1a3a5c] py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Breadcrumb
            tone="onBrand"
            siteUrl={siteConfig.url}
            items={[{ label: "Home", href: "/" }, { label: "Research" }]}
          />
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
          site for exactly that reason. Also declined estate-wide or on a
          reason that still holds: .../StickyCTA.tsx (an interruption),
          .../TestimonialsSection.tsx (ships another site's quotes; this site
          publishes no authored social proof, which is the live reason now that
          `items` exists) and .../WhatToExpectCard.tsx (its default props
          publish a fee line nobody here authored). LeadCTAPanel is no longer
          declined on this route: the owner answered gate D3 yes and it is
          mounted at the foot of the page.

          The #1a3a5c research navy is NOT swapped for the primary-* ramp. It is
          the shared accent of the whole research family (51 occurrences, mostly
          on /research/online-seller-index) and of /about, it has no declared
          token, and src/app/globals.css is outside this lease so one cannot be
          added. As text it measures 11.64 on white and 11.13 on slate-50, so
          it is not a contrast defect either. Reported to the manager instead. */}
      <section className={`bg-white ${sectionY}`}>
        <div className={siteContainerLg}>
          {/* D4 (owner, 2026-09-29): this hub already published a section
              label, so the string moves to ecommerce/niche.config.json
              `hub_labels.research` byte-identical. Nothing rendered changes. */}
          <Eyebrow>{hubLabels.research}</Eyebrow>
          <div className="mt-2 grid gap-6 sm:grid-cols-2">
            {reports.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                data-cta={r.ctaId}
                data-cta-placement="hub_card"
                data-cta-goal="research"
                className={`group border border-slate-200 bg-white p-6 transition hover:border-[#1a3a5c] hover:shadow-md sm:p-8 ${focusRing}`}
              >
                <div className="text-3xl font-bold font-mono text-[#1a3a5c] sm:text-4xl">{r.stat}</div>
                <div className="mt-1 text-sm text-slate-500">{r.statLabel}</div>
                <h2 className="mt-5 text-xl font-bold text-slate-900 group-hover:text-[#1a3a5c]">
                  {r.title}
                </h2>
                <p className="mt-2 text-base leading-relaxed text-slate-600">{r.blurb}</p>
                {/* slate-400 measured 2.56 on white, under the 4.5 text floor.
                    slate-500 is 4.76. Same fix as the two footnote lines on
                    the survival study. */}
                <p className="mt-4 text-xs text-slate-500">Updated {r.updated}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* ADOPTED (U2, 2026-09-29, owner gate D3 answered yes), reversing the
          "owner gate" decline in the block above:
          packages/web-shared/design/marketing/LeadCTAPanel.tsx. The owner
          ruling names the research indexes explicitly, and this route rendered
          zero capture. One <LeadForm> mount, the site's own component.

          NO COPY IS AUTHORED. `title` and `description` are this site's own
          published panel strings, taken verbatim from /services, /for and
          /about. `eyebrow=""` (the kit default is a fee claim, K7),
          `formTitle=""` and `proofPoints={[]}` (K8) keep every component
          default that would publish unwritten copy switched off. */}
      <LeadCTAPanel
        eyebrow=""
        title="Speak to an ecommerce tax specialist."
        description="Tell us about your situation and we will reply within 24 hours."
        proofPoints={[]}
        formTitle=""
        form={<LeadForm ctaId="research_hub_book" />}
      />
    </>
  );
}
