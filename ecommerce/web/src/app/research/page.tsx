import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { siteContainerLg } from "@/components/ui/layout-utils";
import onlineSellerIndex from "@/data/online-seller-index.json";
import survivalSnapshot from "@/data/online-seller-survival-index.json";
import { fmtPct } from "@/lib/research/survival-index";

export const metadata: Metadata = {
  title: "Ecommerce and online-retail research | Ecommerce Finance",
  description:
    "Original, sourced data on the UK online-retail and marketplace-seller economy, built entirely from official Companies House and ONS open data. Free to read and cite.",
  alternates: { canonical: `${siteConfig.url}/research` },
};

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
    <main>
      <section className="border-b border-neutral-200 bg-[#1a3a5c] py-16 sm:py-20">
        <div className={siteContainerLg}>
          <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-6">Research</p>
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

      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="grid gap-6 sm:grid-cols-2">
            {reports.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="group border border-neutral-200 bg-white p-6 transition hover:border-[#1a3a5c] hover:shadow-md sm:p-8"
              >
                <div className="text-3xl font-bold font-mono text-[#1a3a5c] sm:text-4xl">{r.stat}</div>
                <div className="mt-1 text-sm text-neutral-500">{r.statLabel}</div>
                <h2 className="mt-5 text-xl font-bold text-neutral-900 group-hover:text-[#1a3a5c]">
                  {r.title}
                </h2>
                <p className="mt-2 text-base leading-relaxed text-neutral-600">{r.blurb}</p>
                <p className="mt-4 text-xs text-neutral-400">Updated {r.updated}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
