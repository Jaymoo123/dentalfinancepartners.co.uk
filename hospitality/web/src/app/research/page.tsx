import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { fmtNumber, fmtPercent, monthLabel } from "@/lib/research/hospitality-insolvency-index";
import type { HospitalityInsolvencyIndexSnapshot } from "@/lib/research/hospitality-insolvency-index";
import { fmtPct, fmtNumber as fmtFsaNumber } from "@/lib/research/hospitality-fsa-hygiene-index";
import type { FsaHygieneIndexSnapshot } from "@/lib/research/hospitality-fsa-hygiene-index";
import insolvencySnapshot from "@/data/hospitality-insolvency-index.json";
import fsaSnapshot from "@/data/hospitality-fsa-hygiene-index.json";
import openingsSnapshot from "@/data/uk-hospitality-openings-closures-index.json";

const insolvency = insolvencySnapshot as unknown as HospitalityInsolvencyIndexSnapshot;
const fsa = fsaSnapshot as unknown as FsaHygieneIndexSnapshot;
const openings = openingsSnapshot;

export const metadata: Metadata = {
  title: "UK hospitality data and research | Hospitality Tax",
  description:
    "Original, sourced data on UK hospitality company insolvency, business survival, food hygiene ratings and company formations, built entirely from official open data. Free to read and cite.",
  alternates: { canonical: `${siteConfig.url}/research` },
};

const reports = [
  {
    href: "/research/uk-hospitality-insolvency-index",
    title: "UK Hospitality Insolvency Index",
    blurb: `${fmtNumber(insolvency.headline.ttm_total)} hospitality company insolvencies in the trailing 12 months to ${monthLabel(insolvency.meta.data_through)}, up ${fmtPercent(insolvency.headline.decade.change_pct, false)} since ${insolvency.headline.decade.from_year}. Paired with an ONS 5-year business survival curve.`,
    stat: fmtNumber(insolvency.headline.ttm_total),
    statLabel: "hospitality company insolvencies (trailing 12 months)",
    updated: monthLabel(insolvency.meta.data_through),
  },
  {
    href: "/research/uk-hospitality-food-hygiene-map",
    title: "UK Hospitality Food Hygiene Map",
    blurb: `${fmtFsaNumber(fsa.headline.total_establishments)} UK hospitality establishments rated for food hygiene, ${fmtPct(fsa.headline.national_top_rating_5_share_pct)} at the top FHRS rating. Aggregate counts by local authority and business type; no business is named.`,
    stat: fmtPct(fsa.headline.national_top_rating_5_share_pct),
    statLabel: "of rated establishments hold the top FHRS score (5)",
    updated: fsa.meta.pull_date,
  },
  {
    href: "/research/hospitality-openings-closures-index",
    title: "UK Hospitality Openings & Closures Index",
    blurb: `Quarterly Companies House incorporation and dissolution tracker across restaurants, cafes, takeaways, pubs, bars and hotels. ${fmtNumber(openings.headline.pub_count_proxy.count)} pub and bar companies currently active on the register.`,
    stat: fmtNumber(openings.headline.pub_count_proxy.count),
    statLabel: "active pub and bar companies (Companies House)",
    updated: openings.meta.pull_date,
  },
];

export default function ResearchIndexPage() {
  return (
    <>
      <section className="bg-[var(--brand-primary)] py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-white/70">Research</p>
          <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
            UK hospitality data and research
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            Original, sourced reads on hospitality company insolvency, business survival, food hygiene
            ratings and company formation trends, built entirely from official open data (Insolvency
            Service, ONS, FSA and Companies House). Free to read and cite with attribution.
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
