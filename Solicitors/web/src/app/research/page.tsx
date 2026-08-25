import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import {
  monthLabel,
  type LegalIncorporationIndexSnapshot,
} from "@/lib/research/legal-incorporation-index";
import { type LegalSurvivalSnapshot } from "@/lib/research/legal-survival-index";
import { type SraProfessionStructureSnapshot } from "@/lib/research/sra-profession-structure";
import { fmtNumber } from "@/lib/research/sra-profession-structure";
import incSnapshot from "@/data/uk-legal-incorporation-index.json";
import survSnapshot from "@/data/legal-survival-index.json";
import proSnapshot from "@/data/sra-profession-structure.json";

const inc = incSnapshot as unknown as LegalIncorporationIndexSnapshot;
const surv = survSnapshot as unknown as LegalSurvivalSnapshot;
const pro = proSnapshot as unknown as SraProfessionStructureSnapshot;

export const metadata: Metadata = {
  title: "Law firm research and data | Accounts for Lawyers",
  description:
    "Original, sourced data on UK law firm structure, incorporation trends and survival rates, built from Companies House, SRA and ONS official open data. Free to read and cite.",
  alternates: { canonical: `${siteConfig.url}/research` },
};

const reports = [
  {
    href: "/research/uk-legal-incorporation-index",
    title: "UK Legal Incorporation Index",
    blurb: `Incorporated companies now account for ${inc.headline.sra_incorporated_latest_pct}% of SRA-regulated law firms, up from ${inc.headline.sra_incorporated_2011_pct}% in 2011. Monthly incorporation counts from Companies House, plus the full SRA firm structure trend.`,
    stat: `${inc.headline.sra_incorporated_latest_pct}%`,
    statLabel: `of SRA-regulated firms were incorporated companies in ${inc.headline.sra_incorporated_latest_month} ${inc.headline.sra_incorporated_latest_year}`,
    updated: monthLabel(inc.meta.data_through),
  },
  {
    href: "/research/law-firm-survival-index",
    title: "Law Firm Survival Index",
    blurb: `${surv.headline.legal_activities_5yr_pct_2019.toFixed(0)}% of legal businesses born in 2019 were still trading after five years, compared with ${surv.headline.all_industry_5yr_pct_2019.toFixed(0)}% across all industries. Drawn from ONS Business Demography open data.`,
    stat: `${surv.headline.legal_activities_5yr_pct_2019.toFixed(0)}%`,
    statLabel: "five-year survival for legal businesses born in 2019 (SIC 691)",
    updated: surv.meta.source_release,
  },
  {
    href: "/research/uk-solicitor-profession-structure",
    title: "UK Solicitor Profession Structure",
    blurb: `${fmtNumber(pro.roll.on_the_roll)} solicitors are on the roll in England and Wales, but only ${fmtNumber(pro.roll.with_practising_certificate)} hold a practising certificate. A sourced read on the roll, the practising population and the SRA-regulated firm mix (incorporated ${pro.firm_structure.incorporated_pct_2011}% to ${pro.firm_structure.incorporated_pct_latest}%).`,
    stat: fmtNumber(pro.roll.with_practising_certificate),
    statLabel: "solicitors holding a current practising certificate",
    updated: monthLabel(pro.meta.data_through),
  },
];

export default function ResearchIndexPage() {
  return (
    <>
      <section className="bg-neutral-900 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <Breadcrumb
            variant="light"
            items={[{ label: "Home", href: "/" }, { label: "Research" }]}
          />
          <h1 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Law firm research and data
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-neutral-300">
            Original, sourced reads on UK law firm structure, incorporation trends and survival
            rates, built entirely from official open data. Free to read and cite with attribution.
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
                className="group rounded-2xl border border-neutral-200 p-6 transition hover:border-[var(--primary)] hover:shadow-md sm:p-8"
              >
                <div className="text-3xl font-bold text-[var(--primary)] sm:text-4xl">{r.stat}</div>
                <div className="mt-1 text-sm text-neutral-500">{r.statLabel}</div>
                <h2 className="mt-5 text-xl font-bold text-neutral-900 group-hover:text-[var(--primary)]">
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
