import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import { LeadForm } from "@/components/forms/LeadForm";
import { siteConfig } from "@/config/site";
import { buildFaqJsonLd } from "@/lib/schema";
import { SequentialBarChart } from "@/components/research/CareDensityQualityCharts";
import { fmtNumber, fmtPct, type CareSurvivalIndexSnapshot } from "@/lib/research/care-survival-index";
import snapshot from "@/data/uk-care-business-survival-index.json";

const data = snapshot as unknown as CareSurvivalIndexSnapshot;
const { meta, headline, segments } = data;

const PAGE_PATH = "/research/uk-care-business-survival-index";

const combined5yr = headline.combined_5yr_curve.find((p) => p.year === 5)?.survival_pct ?? null;
const residential5yr = headline.sic_87_5yr_curve.find((p) => p.year === 5)?.survival_pct ?? null;
const domiciliary5yr = headline.sic_88_5yr_curve.find((p) => p.year === 5)?.survival_pct ?? null;

const HEADLINE_SENTENCE = `${fmtPct(combined5yr)} of UK care businesses born in 2019 were still trading five years later`;

export const metadata: Metadata = {
  title: `UK Care Business Survival Index | ${siteConfig.name}`,
  description: `${HEADLINE_SENTENCE}. A 1 to 5-year survival curve for UK care businesses (SIC 87 residential care, SIC 88 social work without accommodation), built from ONS Business Demography birth-cohort data.`,
  alternates: { canonical: `${siteConfig.url}${PAGE_PATH}` },
  openGraph: {
    title: `UK Care Business Survival Index | ${siteConfig.name}`,
    description: HEADLINE_SENTENCE,
    url: `${siteConfig.url}${PAGE_PATH}`,
    type: "article",
  },
};

const faqs = [
  {
    question: "How long do UK care businesses survive?",
    answer: `Of care businesses (SIC 87 residential care and SIC 88 social work without accommodation, combined) incorporated in 2019, ${fmtPct(combined5yr)} were still active five years later, based on ONS Business Demography birth-cohort survival data. Residential care businesses (${fmtPct(residential5yr)} five-year survival) fold at a materially higher rate than domiciliary and social-work-without-accommodation businesses (${fmtPct(domiciliary5yr)}), reflecting the higher capital intensity and regulatory burden of running a physical care home.`,
  },
  {
    question: "Why is residential care home survival lower than domiciliary care survival?",
    answer: "Residential care homes carry building costs, staffing ratios tied to physical bed occupancy, and CQC registration requirements from day one, so a slow occupancy ramp or a single adverse inspection can be terminal. Domiciliary and other social-work-without-accommodation businesses have materially lower fixed costs and can scale headcount with contracted hours, which is consistent with their higher one, three and five-year survival rates in the ONS data.",
  },
  {
    question: "What does 'survival' mean in this data?",
    answer: "ONS defines survival as the enterprise remaining VAT and/or PAYE registered at each anniversary of its birth (first appearance on the Inter-Departmental Business Register). It does not necessarily mean the same care service, ownership or CQC registration continued unchanged: a care home can survive as a legal enterprise while changing registered manager or provider on the CQC register, and conversely a home can be sold as a going concern in a way that shows up as one enterprise dying and another being born.",
  },
  {
    question: "Where does this data come from?",
    answer: "The Office for National Statistics' Business Demography reference tables, published annually and derived from the Inter-Departmental Business Register. Table 5.2 tracks birth-year cohorts (here, enterprises born in 2019 to 2023) and their survival at each subsequent anniversary, broken down by Standard Industrial Classification 2007 group. Published under the Open Government Licence v3.0.",
  },
];

const datasetSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: meta.title,
  description: meta.description,
  inLanguage: "en-GB",
  license: "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
  creator: { "@type": "Organization", "@id": `${siteConfig.url}#organization`, name: siteConfig.name },
  dateModified: meta.generated_at,
  isAccessibleForFree: true,
  distribution: [
    { "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: `${siteConfig.url}${PAGE_PATH}/data` },
  ],
  variableMeasured: [
    "1, 2, 3, 4 and 5-year enterprise survival rate, SIC 87 (residential care)",
    "1, 2, 3, 4 and 5-year enterprise survival rate, SIC 88 (social work without accommodation)",
    "1-year survival rate by birth-year cohort, 2019 to 2023",
  ],
};

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-white p-5 shadow-sm">
      <div className="text-3xl font-bold text-[var(--brand-primary)] sm:text-4xl">{value}</div>
      <div className="mt-1 text-sm text-[var(--muted)]">{label}</div>
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-[var(--border)] py-10 first:border-t-0">
      <h2 className="text-2xl font-bold text-[var(--ink)] sm:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-[var(--ink-soft)]">{children}</div>
    </section>
  );
}

const sic87 = segments.find((s) => s.sic_group === "87");
const sic88 = segments.find((s) => s.sic_group === "88");
const childSegments = segments.filter((s) => s.sic_group.length === 3 && s.sic_group !== "88" && s.sic_group !== "87");

export default function CareSurvivalIndexPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(faqs) }} />

      <main>
        <section className="bg-[var(--brand-primary)] py-14 sm:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-white/70">Research</p>
            <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
              UK Care Business Survival Index
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/85">
              {HEADLINE_SENTENCE}. A 1 to 5-year survival curve for UK care businesses, built from
              ONS Business Demography birth-cohort data. Updated {meta.pull_date}.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-6">
          <div className="-mt-8 grid gap-4 sm:grid-cols-3">
            <Stat value={fmtPct(combined5yr)} label="all care businesses still trading after 5 years (2019 cohort)" />
            <Stat value={fmtPct(residential5yr)} label="residential care (SIC 87) 5-year survival" />
            <Stat value={fmtPct(domiciliary5yr)} label="social work without accommodation (SIC 88) 5-year survival" />
          </div>

          <Section id="curve" title="Survival curve: residential care vs. social work without accommodation">
            <p>
              Of the enterprises born in 2019, the share still active at each anniversary. Residential
              care (SIC 87: care homes, nursing homes) falls away faster than social work without
              accommodation (SIC 88: domiciliary care, day services), which has lower fixed costs and
              can scale headcount with contracted hours rather than a fixed building and bed base.
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-[var(--muted)]">
                  Residential care (SIC 87)
                </h3>
                <div className="not-prose mt-3 rounded-xl border border-[var(--border)] bg-white p-4">
                  <SequentialBarChart
                    rows={headline.sic_87_5yr_curve.map((p) => ({ label: `Year ${p.year}`, value: p.survival_pct }))}
                    unit="%"
                    maxOverride={100}
                  />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-[var(--muted)]">
                  Social work without accommodation (SIC 88)
                </h3>
                <div className="not-prose mt-3 rounded-xl border border-[var(--border)] bg-white p-4">
                  <SequentialBarChart
                    rows={headline.sic_88_5yr_curve.map((p) => ({ label: `Year ${p.year}`, value: p.survival_pct }))}
                    unit="%"
                    maxOverride={100}
                  />
                </div>
              </div>
            </div>
            <p className="text-xs text-[var(--muted)]">
              2019 birth cohort: {fmtNumber(sic87?.cohorts.find((c) => c.birth_year === 2019)?.births ?? null)}{" "}
              residential care births, {fmtNumber(sic88?.cohorts.find((c) => c.birth_year === 2019)?.births ?? null)}{" "}
              social-work-without-accommodation births. Counts are control-rounded to base 5 by ONS.
            </p>
          </Section>

          <Section id="sub-segments" title="5-year survival by sub-segment (2019 cohort)">
            <div className="overflow-x-auto">
              <table className="mt-2 w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] text-left text-[var(--muted)]">
                    <th className="py-2 pr-4 font-semibold">Segment</th>
                    <th className="py-2 pr-4 text-right font-semibold">2019 births</th>
                    <th className="py-2 pr-4 text-right font-semibold">1-year</th>
                    <th className="py-2 pr-4 text-right font-semibold">3-year</th>
                    <th className="py-2 text-right font-semibold">5-year</th>
                  </tr>
                </thead>
                <tbody>
                  {childSegments.map((s) => {
                    const c = s.cohorts.find((x) => x.birth_year === 2019);
                    return (
                      <tr key={s.sic_group} className="border-b border-[var(--border)]/60">
                        <td className="py-2 pr-4">{s.label}</td>
                        <td className="py-2 pr-4 text-right tabular-nums">{fmtNumber(c?.births ?? null)}</td>
                        <td className="py-2 pr-4 text-right tabular-nums">{fmtPct(c?.survival_pct["1"] ?? null)}</td>
                        <td className="py-2 pr-4 text-right tabular-nums">{fmtPct(c?.survival_pct["3"] ?? null)}</td>
                        <td className="py-2 text-right tabular-nums">{fmtPct(c?.survival_pct["5"] ?? null)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Section>

          <Section id="trend" title="1-year survival by birth-year cohort, 2019 to 2023">
            <p>
              Each recent birth cohort&apos;s 1-year survival rate, the fairest recent-years comparison
              since only the 2019 cohort has a full 5-year curve published so far.
            </p>
            <div className="overflow-x-auto">
              <table className="mt-2 w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] text-left text-[var(--muted)]">
                    <th className="py-2 pr-4 font-semibold">Birth year</th>
                    <th className="py-2 pr-4 text-right font-semibold">Residential care (87)</th>
                    <th className="py-2 text-right font-semibold">Social work without accommodation (88)</th>
                  </tr>
                </thead>
                <tbody>
                  {headline.one_year_survival_trend["87"].map((row, i) => (
                    <tr key={row.birth_year} className="border-b border-[var(--border)]/60">
                      <td className="py-2 pr-4">{row.birth_year}</td>
                      <td className="py-2 pr-4 text-right tabular-nums">{fmtPct(row.survival_pct)}</td>
                      <td className="py-2 text-right tabular-nums">
                        {fmtPct(headline.one_year_survival_trend["88"][i]?.survival_pct ?? null)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section id="methodology" title="Methodology and sources">
            <p>{meta.methodology}</p>
            <h3 className="mt-4 text-lg font-semibold text-[var(--ink)]">Caveats</h3>
            <ul className="list-disc space-y-1 pl-6 text-sm">
              {meta.caveats.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
            <h3 className="mt-4 text-lg font-semibold text-[var(--ink)]">Source</h3>
            <p className="text-sm">
              <a href={meta.source.url} rel="noopener noreferrer" className="text-[var(--brand-primary)] underline">
                {meta.source.name}
              </a>{" "}
              <span className="text-[var(--muted)]">
                ({meta.source.publisher}, {meta.source.licence}, released {meta.source.release_date})
              </span>
            </p>
            <p className="text-sm">
              Download the full dataset:{" "}
              <Link href={`${PAGE_PATH}/data`} className="font-semibold text-[var(--brand-primary)] underline">
                {PAGE_PATH}/data
              </Link>{" "}
              (CSV). See also the{" "}
              <Link href="/research/uk-care-density-quality-index" className="font-semibold text-[var(--brand-primary)] underline">
                UK Care Home Density &amp; Quality Index
              </Link>{" "}
              and the{" "}
              <Link href="/research/care-provider-business-index" className="font-semibold text-[var(--brand-primary)] underline">
                Care Provider Business Index
              </Link>
              .
            </p>
            <p className="text-xs text-[var(--muted)]">
              Free to cite and republish with attribution to {siteConfig.name}. This page is a data summary and
              does not constitute financial or business advice on any individual care business.
            </p>
          </Section>

          <div className="mt-10 rounded-2xl border-2 border-[var(--brand-primary)]/20 bg-gradient-to-br from-[var(--brand-primary)]/10 to-white p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-[var(--ink)] sm:text-3xl">
              Starting or growing a care business?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
              A financially sound opening structure, CQC-compliant viability statement, and realistic
              cash-flow model materially improve your odds against these survival curves. We work with
              new and growing care providers on exactly this.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
              <Link href="/services/cqc-financial-viability-statement" className="text-[var(--brand-primary)] underline">
                CQC financial viability statement &rarr;
              </Link>
              <Link href="/services/start-a-domiciliary-care-agency" className="text-[var(--brand-primary)] underline">
                Start a domiciliary care agency &rarr;
              </Link>
            </div>
            <div className="mt-8">
              <LeadForm redirectOnSuccess={false} submitLabel="Get a free care business review" />
            </div>
          </div>

          <div className="mt-12 pb-16">
            <h2 className="text-2xl font-bold text-[var(--ink)] sm:text-3xl">Frequently asked questions</h2>
            <div className="mt-6 space-y-6">
              {faqs.map((f, i) => (
                <div key={i}>
                  <h3 className="text-lg font-bold text-[var(--ink)]">{f.question}</h3>
                  <p className="mt-2 text-base leading-relaxed text-[var(--ink-soft)]">{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
