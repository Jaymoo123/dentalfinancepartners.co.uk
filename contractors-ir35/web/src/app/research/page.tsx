import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { LeadForm } from "@/components/forms/LeadForm";
import { btnPrimary, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { fmtNumber, monthLabel, type ContractorIndexSnapshot } from "@/lib/research/contractor-index";
import { fmtPct, type ContractorSurvivalIndexSnapshot } from "@/lib/research/contractor-survival-index";
import { fmtPercent as fmtInsolvencyPercent, type ContractorInsolvencyIndexSnapshot } from "@/lib/research/contractor-insolvency-index";
import snapshot from "@/data/uk-contractor-index.json";
import survivalSnapshot from "@/data/uk-contractor-survival-index.json";
import insolvencySnapshot from "@/data/uk-contractor-insolvency-index.json";
import ContractorsBackdrop from "@/components/layout/ContractorsBackdrop";

const cti = snapshot as unknown as ContractorIndexSnapshot;
const survival = survivalSnapshot as unknown as ContractorSurvivalIndexSnapshot;
const insolvency = insolvencySnapshot as unknown as ContractorInsolvencyIndexSnapshot;

export const metadata: Metadata = {
  title: { absolute: "Contractor economy research and data | Contractor Tax Accountants" },
  description:
    "Original, sourced data on UK contractor and personal service company formation, survival and insolvency trends, built from official open data. Free to read and cite.",
  alternates: { canonical: `${siteConfig.url}/research` },
};

const reports = [
  {
    href: "/research/uk-contractor-index",
    title: "UK Contractor Index",
    blurb: `New IT consultancy and contractor-sector company incorporations over the past decade, sourced from Companies House. Up ${cti.headline.decade.change_pct.toFixed(0)}% since ${cti.headline.decade.from_year}, including a reform-overlay read on the two IR35 off-payroll reforms.`,
    stat: fmtNumber(cti.headline.all_contractor_cos_ttm),
    statLabel: "contractor-sector companies incorporated in the last 12 months",
    updated: monthLabel(cti.meta.incorporations_settled_through),
  },
  {
    href: "/research/uk-contractor-survival-index",
    title: "UK Contractor Survival Index",
    blurb: `How long UK contractor-sector businesses survive, 1 to 5 years after formation, sourced from ONS Business Demography birth-cohort data, against the all-industries average.`,
    stat: fmtPct(survival.headline.latest_5yr_contractor_pct),
    statLabel: `of the ${survival.headline.latest_5yr_cohort_year} birth cohort still active after 5 years`,
    updated: survival.meta.release_date,
  },
  {
    href: "/research/uk-contractor-insolvency-index",
    title: "UK Contractor Insolvency Index",
    blurb: `Company insolvencies across the two SIC sections contractors sit in, sourced from Insolvency Service open data, with a narrower figure isolating the specific IT, consultancy and engineering divisions this site tracks.`,
    stat: fmtInsolvencyPercent(insolvency.headline.captured_share_pct, false),
    statLabel: "of Section J+M insolvencies sit in the captured contractor divisions",
    updated: monthLabel(insolvency.meta.data_through),
  },
];

export default function ResearchIndexPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-neutral-900 py-12 sm:py-16">
        <ContractorsBackdrop />
        <div className={`${siteContainerLg} relative z-10`}>
          <Breadcrumb siteUrl={siteConfig.url} onDark items={[{ label: "Home", href: "/" }, { label: "Research" }]} />
          <h1 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Contractor economy research and data
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-neutral-300">
            Original, sourced reads on UK contractor and personal service company formation trends,
            built entirely from official open data. Free to read and cite with attribution.
          </p>
          <a
            href="#book"
            data-cta="hero_book"
            data-cta-placement="hero"
            data-cta-goal="form"
            className={`mt-8 ${btnPrimary}`}
          >
            Get a free IR35 review
          </a>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-6 sm:grid-cols-2">
            {reports.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="group rounded-xl p-6 ring-1 ring-slate-200/70 transition hover:ring-cyan-700 hover:shadow-md sm:p-8"
              >
                <div className="text-3xl font-bold text-cyan-700 sm:text-4xl">{r.stat}</div>
                <div className="mt-1 text-sm text-neutral-500">{r.statLabel}</div>
                <h2 className="mt-5 text-xl font-bold text-neutral-900 group-hover:text-cyan-700">
                  {r.title}
                </h2>
                <p className="mt-2 text-base leading-relaxed text-neutral-600">{r.blurb}</p>
                {/* slate-500 #64748b on white = 4.76:1. Was neutral-400 #a3a3a3 = 2.52:1,
                    the --ink-whisper ramp step, a live contrast failure. */}
                <p className="mt-4 text-xs text-slate-500">Updated {r.updated}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Closing ask: the kit's LeadCTAPanel, same call shape as the locations
          and glossary routes. `proofPoints` EMPTY on purpose, see the articles. */}
      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          contained
          ground="slate"
          eyebrow="Free call"
          title="Working out where you sit in this data?"
          description="We do the work on contractor tax positions every day. Tell us about your contract and we will review your IR35 position and the structure around it on a free call, with no obligation."
          proofPoints={[]}
          formTitle="Book your free call"
          form={<LeadForm redirectOnSuccess={false} submitLabel="Get a free IR35 review" />}
        />
      </div>
    </>
  );
}
