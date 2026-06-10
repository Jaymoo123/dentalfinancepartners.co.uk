import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { fmtInt, monthLabel, type LandlordIndexSnapshot } from "@/lib/research/landlord-index";
import snapshot from "@/data/landlord-tax-index.json";

const lti = snapshot as unknown as LandlordIndexSnapshot;

export const metadata: Metadata = {
  title: "Property tax research and data | Property Tax Partners",
  description:
    "Original, sourced data on UK property tax and the buy-to-let market, built from official open data. Free to read and cite.",
  alternates: { canonical: `${siteConfig.url}/research` },
};

const reports = [
  {
    href: "/research/landlord-tax-index",
    title: "UK Landlord Tax Index",
    blurb: `Buy-to-let limited-company incorporations set against UK house prices. ${
      lti.headline.decade
        ? `Up ${lti.headline.decade.multiple}x since ${lti.headline.decade.from_year}.`
        : ""
    }`,
    stat: fmtInt(lti.headline.all_property_cos_ttm),
    statLabel: "property companies incorporated in the last 12 months",
    updated: monthLabel(lti.meta.incorporations_settled_through ?? lti.meta.incorporations_through),
  },
];

export default function ResearchIndexPage() {
  return (
    <>
      <section className="bg-slate-900 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Research" }]} />
          <h1 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Property tax research and data
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-300">
            Original, sourced reads on UK property tax and the buy-to-let market, built entirely from
            official open data. Free to read and cite with attribution.
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
                className="group rounded-2xl border border-slate-200 p-6 transition hover:border-emerald-500 hover:shadow-md sm:p-8"
              >
                <div className="text-3xl font-bold text-emerald-700 sm:text-4xl">{r.stat}</div>
                <div className="mt-1 text-sm text-slate-500">{r.statLabel}</div>
                <h2 className="mt-5 text-xl font-bold text-slate-900 group-hover:text-emerald-700">
                  {r.title}
                </h2>
                <p className="mt-2 text-base leading-relaxed text-slate-600">{r.blurb}</p>
                <p className="mt-4 text-xs text-slate-400">Updated {r.updated}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
