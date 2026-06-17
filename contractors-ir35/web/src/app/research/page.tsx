import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { fmtNumber, monthLabel, type ContractorIndexSnapshot } from "@/lib/research/contractor-index";
import snapshot from "@/data/uk-contractor-index.json";

const cti = snapshot as unknown as ContractorIndexSnapshot;

export const metadata: Metadata = {
  title: { absolute: "Contractor economy research and data | Contractor Tax Accountants" },
  description:
    "Original, sourced data on UK contractor and personal service company formation trends, built from official Companies House open data. Free to read and cite.",
  alternates: { canonical: `${siteConfig.url}/research` },
};

const reports = [
  {
    href: "/research/uk-contractor-index",
    title: "UK Contractor Index",
    blurb: `New IT consultancy and contractor-sector company incorporations over the past decade, sourced from Companies House. Up ${cti.headline.decade.change_pct.toFixed(0)}% since ${cti.headline.decade.from_year}.`,
    stat: fmtNumber(cti.headline.all_contractor_cos_ttm),
    statLabel: "contractor-sector companies incorporated in the last 12 months",
    updated: monthLabel(cti.meta.incorporations_settled_through),
  },
];

export default function ResearchIndexPage() {
  return (
    <>
      <section className="bg-neutral-900 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <Breadcrumb variant="light" items={[{ label: "Home", href: "/" }, { label: "Research" }]} />
          <h1 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Contractor economy research and data
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-neutral-300">
            Original, sourced reads on UK contractor and personal service company formation trends,
            built entirely from official open data. Free to read and cite with attribution.
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
                className="group rounded-2xl border border-neutral-200 p-6 transition hover:border-cyan-600 hover:shadow-md sm:p-8"
              >
                <div className="text-3xl font-bold text-cyan-700 sm:text-4xl">{r.stat}</div>
                <div className="mt-1 text-sm text-neutral-500">{r.statLabel}</div>
                <h2 className="mt-5 text-xl font-bold text-neutral-900 group-hover:text-cyan-700">
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
