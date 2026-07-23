import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { fmtNumber, fmtPct } from "@/lib/research/care-density-quality-index";
import type { CareDensityQualitySnapshot } from "@/lib/research/care-density-quality-index";
import type { CareSurvivalIndexSnapshot } from "@/lib/research/care-survival-index";
import densitySnapshot from "@/data/uk-care-density-quality-index.json";
import providerIndexSnapshot from "@/data/uk-care-provider-business-index.json";
import survivalSnapshot from "@/data/uk-care-business-survival-index.json";

const density = densitySnapshot as unknown as CareDensityQualitySnapshot;
const providerIndex = providerIndexSnapshot;
const survival = survivalSnapshot as unknown as CareSurvivalIndexSnapshot;
const combined5yr = survival.headline.combined_5yr_curve.find((p) => p.year === 5)?.survival_pct ?? null;

export const metadata: Metadata = {
  title: `UK care sector data and research | ${siteConfig.name}`,
  description:
    "Original, sourced data on UK care home bed density, CQC rating quality, closure churn and care company formations, built entirely from official open data. Free to read and cite.",
  alternates: { canonical: `${siteConfig.url}/research` },
};

const reports = [
  {
    href: "/research/uk-care-density-quality-index",
    title: "UK Care Home Density & Quality Index",
    blurb: `${fmtPct(density.national.beds_per_100_over65)} care home beds per 100 people aged 65 and over in England, and ${fmtPct(density.national.good_or_above_pct)} of care homes rated Good or Outstanding by CQC. Region and local-authority level; no care home is named.`,
    stat: fmtNumber(density.national.beds_total),
    statLabel: "registered care home beds across England",
    updated: density.meta.pull_date,
  },
  {
    href: "/research/care-provider-business-index",
    title: "Care Provider Business Index",
    blurb: `Quarterly Companies House incorporation and dissolution tracker for UK care providers across residential nursing, residential care and domiciliary care. ${fmtNumber(providerIndex.headline.care_company_count_proxy.count)} care companies currently active on the register.`,
    stat: fmtNumber(providerIndex.headline.care_company_count_proxy.count),
    statLabel: "active care companies (Companies House)",
    updated: providerIndex.meta.pull_date,
  },
  {
    href: "/research/uk-care-business-survival-index",
    title: "UK Care Business Survival Index",
    blurb: `${fmtPct(combined5yr)} of care businesses born in 2019 were still trading five years later. A 1 to 5-year survival curve for residential care and social work without accommodation, built from ONS Business Demography birth-cohort data.`,
    stat: fmtPct(combined5yr),
    statLabel: "of care businesses survive to 5 years (2019 cohort)",
    updated: survival.meta.pull_date,
  },
];

export default function ResearchIndexPage() {
  return (
    <>
      <section className="bg-[var(--brand-primary)] py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-white/70">Research</p>
          <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
            UK care sector data and research
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            Original, sourced reads on care home bed density, CQC rating quality, closure churn and
            care company formation trends, built entirely from official open data (CQC, ONS and
            Companies House). Free to read and cite with attribution.
          </p>
        </div>
      </section>

      <section className="bg-[var(--surface)] py-10 sm:py-14">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {reports.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="group rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm transition hover:border-[var(--brand-primary)] hover:shadow-md sm:p-8"
              >
                <div className="text-3xl font-bold text-[var(--brand-primary)] sm:text-4xl">{r.stat}</div>
                <div className="mt-1 text-sm text-[var(--muted)]">{r.statLabel}</div>
                <h2 className="mt-5 text-xl font-bold text-[var(--ink)]">{r.title}</h2>
                <p className="mt-2 text-base leading-relaxed text-[var(--ink-soft)]">{r.blurb}</p>
                <p className="mt-4 text-xs text-[var(--muted)]">Updated {r.updated}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
