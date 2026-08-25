import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumb } from "@/components/ui/Breadcrumb";
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
      <section className="bg-neutral-900 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <Breadcrumb variant="light" items={[{ label: "Home", href: "/" }, { label: "Research" }]} />
          <h1 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            UK small business research and data
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-neutral-300">
            Original, sourced reads on UK small business conditions, built entirely from official
            open data (Companies House, The Insolvency Service, ONS and DBT). Free to read and cite
            with attribution.
          </p>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-14">
        <div className={siteContainerLg}>
          <div className="grid gap-6 sm:grid-cols-2">
            {reports.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="group rounded-2xl border border-neutral-200 p-6 transition hover:border-orange-500 hover:shadow-md sm:p-8"
              >
                <div className="text-3xl font-bold text-orange-600 sm:text-4xl">{r.stat}</div>
                <div className="mt-1 text-sm text-neutral-500">{r.statLabel}</div>
                <h2 className="mt-5 text-xl font-bold text-neutral-900 group-hover:text-orange-700">
                  {r.title}
                </h2>
                <p className="mt-2 text-base leading-relaxed text-neutral-600">{r.blurb}</p>
                <p className="mt-4 text-xs text-neutral-400">Updated {r.updated}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
