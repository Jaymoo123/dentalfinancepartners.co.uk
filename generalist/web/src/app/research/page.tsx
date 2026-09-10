import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { GeneralistBackdrop } from "@/components/layout/GeneralistBackdrop";
import { LeadForm } from "@/components/forms/LeadForm";
import { LEAD_PROOF_POINTS } from "@/lib/blog-cta-map";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { fmtNumber, fmtPct1, monthLabel } from "@/lib/research/format";
import type { SmeBarometerSnapshot } from "@/lib/research/sme-barometer";
import type { SectorInsolvencyLeagueSnapshot } from "@/lib/research/sector-insolvency-league";
import type { LatePaymentIndexSnapshot } from "@/lib/research/late-payment-index";
import type { BusinessDensityMapSnapshot } from "@/lib/research/business-density-map";
import { periodLabel } from "@/lib/research/late-payment-index";
import barometerSnapshot from "@/data/uk-small-business-barometer.json";
import leagueSnapshot from "@/data/uk-sector-insolvency-league.json";
import paymentSnapshot from "@/data/uk-late-payment-index.json";
import densitySnapshot from "@/data/uk-business-density-map.json";

const barometer = barometerSnapshot as unknown as SmeBarometerSnapshot;
const league = leagueSnapshot as unknown as SectorInsolvencyLeagueSnapshot;
const payment = paymentSnapshot as unknown as LatePaymentIndexSnapshot;
const density = densitySnapshot as unknown as BusinessDensityMapSnapshot;

export const metadata: Metadata = {
  title: "UK Small Business Research and Data | Holloway Davies",
  description:
    "Original, sourced research on UK small business conditions: company formations, insolvencies, survival rates, late payment and regional density, built entirely from official open data. Free to read and cite.",
  alternates: { canonical: `${siteConfig.url}/research` },
};

const reports = [
  {
    href: "/research/uk-small-business-barometer",
    title: "State of UK Small Business Barometer",
    blurb: `${fmtNumber(barometer.headline.incorporations.incorporations_fye)} new companies incorporated ${barometer.headline.incorporations.fye_label}, against ${fmtNumber(barometer.headline.incorporations.dissolutions_fye)} dissolutions. Fusing formations, insolvencies, survival and population into one all-sector barometer.`,
    stat: fmtNumber(barometer.headline.incorporations.incorporations_fye),
    statLabel: `new company incorporations, ${barometer.headline.incorporations.fye_label}`,
    updated: monthLabel(barometer.headline.insolvency.last_settled_month),
  },
  {
    href: "/research/uk-sector-insolvency-league",
    title: "UK Sector Insolvency League",
    blurb: `${league.headline.top_sector_label} has the most company insolvencies of any sector (${fmtNumber(league.headline.top_sector_ttm)}, ${fmtPct1(league.headline.top_sector_share_pct)} of the total). Every SIC section ranked.`,
    stat: fmtPct1(league.headline.top_sector_share_pct),
    statLabel: `of all insolvencies are in ${league.headline.top_sector_label}`,
    updated: monthLabel(league.headline.data_through),
  },
  {
    href: "/research/uk-late-payment-index",
    title: "UK Late Payment Index",
    blurb: `Large UK businesses took an average of ${payment.headline.latest_mean_days_to_pay} days to pay invoices in ${periodLabel(payment.headline.latest_period)}. Aggregate trend from statutory Payment Practices Reporting, no company named.`,
    stat: `${payment.headline.latest_mean_days_to_pay} days`,
    statLabel: "average time to pay, large UK businesses",
    updated: periodLabel(payment.headline.latest_period),
  },
  {
    href: "/research/uk-business-density-map",
    title: "UK Business Density Map",
    blurb: `${density.headline.highest_region} has the most businesses per person of any UK region (${fmtNumber(density.headline.highest_density_per_10k_adults)} per 10,000 adults), ${density.headline.density_ratio_highest_to_lowest}x ${density.headline.lowest_region}'s rate.`,
    stat: fmtNumber(density.headline.uk_density_per_10k_adults),
    statLabel: "UK businesses per 10,000 adults",
    updated: density.headline.as_of,
  },
];

export default function ResearchIndexPage() {
  return (
    <>
      <section className="relative flex min-h-[300px] items-center overflow-hidden bg-slate-900 py-10 sm:min-h-[350px] sm:py-12 lg:py-14">
        <GeneralistBackdrop tone="navy" />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Breadcrumb
              siteUrl={siteConfig.url}
              onDark
              items={[{ label: "Home", href: "/" }, { label: "Research" }]}
            />
            <Eyebrow onDark>Open data, free to cite</Eyebrow>
            <h1 className="text-3xl font-bold leading-[1.15] text-white text-balance sm:text-4xl lg:text-5xl">
              UK small business research and data
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
              Original, sourced reads on UK small business conditions, built entirely from official
              open data (Companies House, The Insolvency Service, ONS and DBT). Free to read and cite
              with attribution.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-6 sm:grid-cols-2">
            {reports.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                data-cta={`research_hub_${r.href.split("/").pop()!.replace(/-/g, "_")}`}
                data-cta-placement="hub_grid"
                className="group rounded-xl border border-slate-200 p-6 transition hover:border-primary-600 hover:shadow-md sm:p-8"
              >
                <div className="text-3xl font-bold tabular-nums text-primary-700 sm:text-4xl">{r.stat}</div>
                <div className="mt-1 text-sm text-slate-600">{r.statLabel}</div>
                <h2 className="mt-5 text-xl font-bold text-slate-900 group-hover:text-primary-700">
                  {r.title}
                </h2>
                <p className="mt-2 text-base leading-relaxed text-slate-600">{r.blurb}</p>
                <p className="mt-4 text-xs text-slate-500">Updated {r.updated}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* In-flow closing ask. The hub had no capture at all: a reader who came
          for the data and stayed had nothing to do next but leave. Contained,
          not the navy band, because this page ends here and the footer is
          already slate-900: navy must never touch navy. */}
      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          eyebrow="Free consultation"
          title="Want this read applied to your own numbers?"
          description="These pages are the national picture. What matters is where your own company, structure and cash position sit inside it. Book a free call and we will talk it through."
          proofPoints={LEAD_PROOF_POINTS}
          form={<LeadForm submitLabel="Speak to an accountant" redirectOnSuccess={false} />}
          contained
          ground="slate"
          footnote="Every figure on these pages is drawn from published official statistics and is free to cite with attribution. If your position is already right, we will say so."
        />
      </div>
    </>
  );
}
