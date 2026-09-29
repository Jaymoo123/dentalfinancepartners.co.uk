import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";
import { fmtNumber, fmtPercent, monthLabel } from "@/lib/research/hospitality-insolvency-index";
import type { HospitalityInsolvencyIndexSnapshot } from "@/lib/research/hospitality-insolvency-index";
import { fmtPct, fmtNumber as fmtFsaNumber } from "@/lib/research/hospitality-fsa-hygiene-index";
import type { FsaHygieneIndexSnapshot } from "@/lib/research/hospitality-fsa-hygiene-index";
import insolvencySnapshot from "@/data/hospitality-insolvency-index.json";
import fsaSnapshot from "@/data/hospitality-fsa-hygiene-index.json";
import openingsSnapshot from "@/data/uk-hospitality-openings-closures-index.json";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import HospitalityBackdrop from "@/components/layout/HospitalityBackdrop";

const insolvency = insolvencySnapshot as unknown as HospitalityInsolvencyIndexSnapshot;
const fsa = fsaSnapshot as unknown as FsaHygieneIndexSnapshot;
const openings = openingsSnapshot;

export const metadata: Metadata = {
  title: "UK hospitality data and research",
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
      {/*
        SlimHero DECLINED. The ground half of this reason is STALE and is dropped:
        `sectionClassName` exists (SlimHero.tsx:27/47/50) and would carry this ground
        exactly. Re-derived at kit 1437cb9e, two reasons stand: SlimHero holds Eyebrow, h1
        and children in ONE container (:51-57) with no slot above the eyebrow, so this
        hero's Breadcrumb could only drop below the h1 or into `backdrop`, which sits
        outside the container and under the absolute motif; and the py-8/10/12 rhythm is
        structural (:38-40) against this hero's py-12 sm:py-16. Kit gap K1 restated: a
        `breadcrumb` slot above the eyebrow.
        Kept the brand ground, added HospitalityBackdrop + .ground-dark, and swapped the
        hand-rolled "Research" label for the kit Eyebrow + Breadcrumb tone="onBrand".
        EYEBROW CONTRAST, recorded (R2 G4): `onDark` hardcodes text-slate-300
        (page-blocks.tsx:45) and slate-300 rgb(202,213,226) on this brand ground #b0532f
        measures 3.43 against a 4.5 floor. No call site can reach that class: Eyebrow takes
        `children` and `onDark` only. KIT ASK: `className?: string` on Eyebrow, appended to
        its own class string; this site would then pass `text-white` (5.09, measured) or
        `text-primary-50` #fff2eb (4.64). The ground is designer-set and stays put.
      */}
      <section className="ground-dark relative overflow-hidden bg-[var(--brand-primary)] py-12 sm:py-16">
        <HospitalityBackdrop patternId="hospitality-table-setting-research-hero" />
        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Research" }]}
            siteUrl={siteConfig.url}
            tone="onBrand"
          />
          <Eyebrow onDark className="text-white">Research</Eyebrow>
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
                {/*
                  StatsCounter DECLINED (marketing/StatsCounter.tsx): r.stat is a pre-formatted
                  string (fmtNumber/fmtPct) with no source href, and the component's `value`
                  escape hatch exists for exactly this, but the card ALSO needs the raw string
                  to stay a plain <div>, not a <button>/<a> counter wrapper, so as not to
                  disturb the whole-card <Link>. Feeding it here would nest an interactive
                  counter inside the card's own link for no visual gain. Kept as plain text.
                */}
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

      {/*
        LeadCTAPanel fed this page's OWN existing sentences (the hero's h1 + standfirst,
        verbatim, above) rather than an authored CTA line: locked rule 4, no invented copy.
        eyebrow="" / formTitle="" per locked rule 16.
      */}
      <LeadCTAPanel
        eyebrow=""
        title="UK hospitality data and research"
        description="Original, sourced reads on hospitality company insolvency, business survival, food hygiene ratings and company formation trends, built entirely from official open data (Insolvency Service, ONS, FSA and Companies House). Free to read and cite with attribution."
        proofPoints={[]}
        formTitle=""
        form={<LeadForm redirectOnSuccess={false} submitLabel="Send enquiry" />}
        backdrop={<HospitalityBackdrop patternId="hospitality-table-setting-research-cta" />}
      />
    </>
  );
}
