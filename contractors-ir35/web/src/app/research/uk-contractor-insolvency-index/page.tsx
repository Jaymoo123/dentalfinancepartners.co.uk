import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import {
  buildArticleJsonLd,
  buildDatasetJsonLd,
  buildFaqJsonLd,
} from "@/lib/schema";
import {
  AnnualInsolvencyChart,
  MonthlyInsolvencyChart,
  CapturedShareChart,
} from "@/components/research/ContractorInsolvencyCharts";
import {
  fmtNumber,
  fmtPercent,
  monthLabel,
  type ContractorInsolvencyIndexSnapshot,
} from "@/lib/research/contractor-insolvency-index";
import snapshot from "@/data/uk-contractor-insolvency-index.json";

const data = snapshot as unknown as ContractorInsolvencyIndexSnapshot;
const { meta, headline, insolvencies, sections, captured } = data;
const { decade } = headline;

const PAGE_PATH = "/research/uk-contractor-insolvency-index";

const HEADLINE_SENTENCE = `UK contractor-sector company insolvencies rose ${fmtPercent(decade.change_pct, false)} between ${decade.from_year} and ${decade.to_year}`;

export const metadata: Metadata = {
  title: { absolute: "UK Contractor Insolvency Index | IT, consultancy and engineering insolvency trends | Contractor Tax Accountants" },
  description: `${HEADLINE_SENTENCE}. A sourced index of contractor-sector company insolvencies across SIC Sections J and M, compiled from Insolvency Service open data.`,
  alternates: { canonical: `${siteConfig.url}${PAGE_PATH}` },
  openGraph: {
    title: "UK Contractor Insolvency Index | Contractor Tax Accountants",
    description: `${HEADLINE_SENTENCE}. Contractor-sector insolvency trends from Insolvency Service official open data.`,
    url: `${siteConfig.url}${PAGE_PATH}`,
    type: "article",
  },
};

const faqs = [
  {
    question: "What does the UK Contractor Insolvency Index measure?",
    answer:
      "It counts company insolvencies registered each month under two SIC Section headings that between them cover most contractor activity: Section J (Information and communication, which captures IT contracting) and Section M (Professional, scientific and technical activities, which captures management consultancy and engineering). Counts are drawn from Insolvency Service record-level data covering England, Wales and Scotland, and track five main procedures: Creditors Voluntary Liquidation (CVL), compulsory liquidation, administration, Company Voluntary Arrangement (CVA), and administrative receivership.",
  },
  {
    question: "Why use Sections J and M rather than exact SIC codes?",
    answer:
      "The Insolvency Service's monthly record-level data identifies each insolvency by 1-digit SIC section and, separately, by 2-digit SIC division, but not down to the specific 5-digit codes this site's UK Contractor Index tracks. Sections J and M are the closest coarse match: J also includes publishing, broadcasting and telecoms firms that are not contracting businesses, and M also includes legal and accounting firms, advertising agencies and R&D labs. To narrow this, the 'captured' figures on this page isolate the 2-digit SIC divisions that overlap the Contractor Index SIC set (division 62 IT consultancy, 70 management consultancy, 71 engineering), and report what share of the wider Section J+M total those divisions actually account for.",
  },
  {
    question: "What share of Section J and M insolvencies are actually contractor divisions?",
    answer:
      `In the trailing 12 months to ${monthLabel(meta.data_through)}, divisions 62, 70 and 71 accounted for ${fmtPercent(headline.captured_share_pct, false)} of all Section J and M insolvencies combined (${fmtNumber(headline.captured_ttm)} of ${fmtNumber(headline.ttm_total)}). The remainder sits in adjacent but distinct industries within the same two sections, publishing, telecoms, legal and accounting, advertising and R&D among them.`,
  },
  {
    question: "What is a Creditors Voluntary Liquidation (CVL)?",
    answer:
      "A CVL is the most common insolvency procedure for UK companies generally, contractor-sector businesses included. The company's directors resolve to wind up the business voluntarily when they conclude it cannot pay its debts, and a licensed insolvency practitioner is appointed as liquidator to realise assets and distribute proceeds to creditors. CVLs typically account for the large majority of insolvency events in this dataset, reflecting how much more often directors choose to wind up voluntarily than have a compulsory liquidation forced on them by the courts.",
  },
  {
    question: "Where does this data come from?",
    answer:
      "All insolvency counts come from the Insolvency Service's record-level data file, published as part of the Company Insolvency Statistics statistical release on gov.uk. The Insolvency Service is the UK government agency that handles corporate and personal insolvency. Its data is published under the Open Government Licence v3.0 and covers England, Wales and Scotland. The figures are updated monthly.",
  },
];

// ---------------------------------------------------------------------------
// JSON-LD
// ---------------------------------------------------------------------------

const articleJsonLd = buildArticleJsonLd({
  headline: "UK Contractor Insolvency Index",
  description: `${HEADLINE_SENTENCE}, tracked from Insolvency Service open data.`,
  url: `${siteConfig.url}${PAGE_PATH}`,
  datePublished: "2026-07-23",
  dateModified: meta.generated_at,
});

const datasetJsonLd = buildDatasetJsonLd({
  name: "UK Contractor Insolvency Index: contractor-sector company insolvencies by procedure type",
  description:
    "Monthly counts of registered UK company insolvencies across SIC Sections J (Information and communication) and M (Professional, scientific and technical activities), with a narrower 'captured' figure isolating SIC divisions 62, 70 and 71, compiled from Insolvency Service record-level data.",
  url: `${siteConfig.url}${PAGE_PATH}`,
  csvUrl: `${siteConfig.url}${PAGE_PATH}/data`,
  dateModified: meta.generated_at,
  temporalCoverage: `${insolvencies.monthly[0]?.month ?? ""}/${meta.data_through}`,
  variableMeasured: [
    "Monthly contractor-sector company insolvencies -- total (SIC Sections J and M)",
    "Monthly company insolvencies -- Section J (Information and communication)",
    "Monthly company insolvencies -- Section M (Professional, scientific and technical activities)",
    "Monthly company insolvencies -- captured divisions (62, 70, 71)",
    "Monthly contractor-sector company insolvencies by procedure type",
  ],
});

const faqJsonLd = buildFaqJsonLd(faqs);

// ---------------------------------------------------------------------------
// Presentational helpers
// ---------------------------------------------------------------------------

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl bg-white/5 p-5 ring-1 ring-white/10">
      <div className="text-3xl font-bold text-white sm:text-4xl">{value}</div>
      <div className="mt-1 text-sm text-neutral-300">{label}</div>
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-neutral-200 py-10 first:border-t-0">
      <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-neutral-700">{children}</div>
    </section>
  );
}

const PROCEDURES: { key: "cvl" | "compulsory" | "administration" | "cva" | "receivership"; label: string }[] = [
  { key: "cvl", label: "Creditors Voluntary Liquidation (CVL)" },
  { key: "compulsory", label: "Compulsory Liquidation" },
  { key: "administration", label: "Administration" },
  { key: "cva", label: "Company Voluntary Arrangement (CVA)" },
  { key: "receivership", label: "Administrative Receivership" },
];

// ---------------------------------------------------------------------------

export default function UKContractorInsolvencyIndexPage() {
  const lastMonth = headline.last_settled_month;
  const latestFullAnnual = insolvencies.annual.filter((r) => r.year < 2026).at(-1);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleJsonLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: datasetJsonLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />

      {/* Hero */}
      <section className="bg-neutral-900 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <Breadcrumb
            variant="light"
            items={[
              { label: "Home", href: "/" },
              { label: "Research", href: "/research" },
              { label: "UK Contractor Insolvency Index" },
            ]}
          />
          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-cyan-300">
            UK Contractor Insolvency Index
          </p>
          <h1 className="mt-2 max-w-4xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {HEADLINE_SENTENCE}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-neutral-300">
            A sourced, monthly read on company insolvencies across the two SIC sections
            contractors sit in, drawn from Insolvency Service public records, with a narrower
            figure isolating the specific IT, consultancy and engineering divisions this site
            tracks. Updated {monthLabel(meta.data_through)}.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat
              value={fmtNumber(headline.ttm_total)}
              label="Section J+M company insolvencies in the trailing 12 months"
            />
            <Stat
              value={fmtPercent(headline.captured_share_pct, false)}
              label="of those insolvencies sit in the captured contractor divisions (62/70/71)"
            />
            <Stat
              value={fmtPercent(decade.change_pct, false)}
              label={`more insolvencies in ${decade.to_year} than in ${decade.from_year}`}
            />
            <Stat
              value={fmtNumber(headline.peak_total)}
              label={`insolvencies in ${monthLabel(headline.peak_month)}, the highest month on record`}
            />
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-white py-10 sm:py-14">
        <div className={siteContainerLg}>
          <div className="max-w-4xl">

            {/* Key findings */}
            <div className="rounded-2xl border border-cyan-500/20 bg-cyan-50/60 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-cyan-900">Key findings</h2>
              <ul className="mt-4 space-y-2 text-base leading-relaxed text-neutral-800">
                <li>
                  Combined Section J and M insolvencies rose {fmtPercent(decade.change_pct, false)}{" "}
                  from {fmtNumber(decade.from_total)} in {decade.from_year} to{" "}
                  {fmtNumber(decade.to_total)} in {decade.to_year}.
                </li>
                <li>
                  In the trailing 12 months to {monthLabel(meta.data_through)},{" "}
                  {fmtNumber(headline.ttm_total)} companies entered insolvency across Section J
                  ({fmtNumber(headline.sections_ttm.J)}) and Section M (
                  {fmtNumber(headline.sections_ttm.M)}) combined.
                </li>
                <li>
                  Of that total, {fmtNumber(headline.captured_ttm)} ({fmtPercent(headline.captured_share_pct, false)})
                  sat in the specific divisions this site tracks, computer programming and IT
                  consultancy (division 62), management consultancy (division 70) and
                  architectural and engineering activities (division 71). The captured share rose{" "}
                  {fmtPercent(headline.captured_decade.change_pct, false)} between{" "}
                  {headline.captured_decade.from_year} and {headline.captured_decade.to_year}.
                </li>
                <li>
                  Creditors Voluntary Liquidation (CVL) is the dominant procedure across both
                  sections, as it is economy-wide: directors choose voluntary wind-up far more
                  often than creditors force a compulsory liquidation through the courts.
                </li>
                <li>
                  In {monthLabel(lastMonth)}, {fmtNumber(headline.last_month_total)} contractor-sector
                  companies entered insolvency, of which {fmtNumber(headline.last_month_cvl)} were
                  CVLs, {fmtNumber(headline.last_month_compulsory)} compulsory liquidations, and{" "}
                  {fmtNumber(headline.last_month_administration)} administrations.
                </li>
              </ul>
              <p className="mt-4 text-xs text-neutral-500">
                Source: Insolvency Service, Company Insolvency Statistics (record-level data),
                under the Open Government Licence v3.0. England, Wales and Scotland. Figures may
                be cited with attribution to Contractor Tax Accountants.
              </p>
            </div>

            <Section id="annual" title="Contractor-sector insolvencies by year">
              <p>
                Each bar shows the combined total for Section J and Section M registered in that
                calendar year (complete years only). The rise from 2022 broadly follows the same
                pattern seen across UK company insolvencies economy-wide, as the pandemic-era
                moratorium on winding-up petitions unwound.
              </p>
              <div className="not-prose mt-6 rounded-2xl border border-neutral-200 p-4 sm:p-6">
                <AnnualInsolvencyChart annual={insolvencies.annual} />
              </div>
            </Section>

            <Section id="monthly" title="The monthly trend by procedure">
              <p>
                The stacked area chart shows monthly insolvency registrations across Section J and
                M combined, broken down by the three main procedures: CVL, compulsory liquidation,
                and administration.
              </p>
              <div className="not-prose mt-6 rounded-2xl border border-neutral-200 p-4 sm:p-6">
                <MonthlyInsolvencyChart monthly={insolvencies.monthly} />
              </div>
            </Section>

            <Section id="procedures" title="Breakdown by procedure">
              <p>
                The table shows the number of Section J+M insolvencies by procedure type in{" "}
                {latestFullAnnual ? String(latestFullAnnual.year) : "the latest full year"}.
              </p>
              {latestFullAnnual && (
                <div className="not-prose mt-4 overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b-2 border-neutral-300 text-left">
                        <th className="py-2 pr-4 font-bold text-neutral-900">Procedure</th>
                        <th className="py-2 pr-4 font-bold text-neutral-900 text-right">{latestFullAnnual.year} count</th>
                        <th className="py-2 font-bold text-neutral-900 text-right">% of total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PROCEDURES.map(({ key, label }) => {
                        const count = Number(latestFullAnnual[key] ?? 0);
                        const pct = latestFullAnnual.total > 0 ? (count / latestFullAnnual.total * 100).toFixed(1) : "n/a";
                        return (
                          <tr key={key} className="border-b border-neutral-200">
                            <td className="py-2 pr-4 text-neutral-700">{label}</td>
                            <td className="py-2 pr-4 text-right font-semibold text-neutral-900">{fmtNumber(count)}</td>
                            <td className="py-2 text-right text-neutral-700">{pct}%</td>
                          </tr>
                        );
                      })}
                      <tr className="border-b border-neutral-300">
                        <td className="py-2 pr-4 font-bold text-cyan-700">Total</td>
                        <td className="py-2 pr-4 text-right font-bold text-cyan-700">{fmtNumber(latestFullAnnual.total)}</td>
                        <td className="py-2 text-right font-bold text-cyan-700">100%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </Section>

            <Section id="captured" title="How much of Section J and M is actually contracting?">
              <p>
                Sections J and M are coarse: Section J also covers publishing, broadcasting and
                telecoms, and Section M also covers legal and accounting, advertising, R&D and
                veterinary activities, none of which are contractor-heavy. The chart splits each
                year&apos;s Section J+M total into the captured contractor divisions (62 IT
                consultancy, 70 management consultancy, 71 engineering, dark bars) and everything
                else in the same two sections (light bars).
              </p>
              <div className="not-prose mt-6 rounded-2xl border border-neutral-200 p-4 sm:p-6">
                <CapturedShareChart sectionAnnual={sections.annual} capturedAnnual={captured.annual} />
              </div>
              <p className="mt-4 text-sm text-neutral-600">
                In the trailing 12 months to {monthLabel(meta.data_through)}, the captured
                divisions accounted for {fmtPercent(headline.captured_share_pct, false)} of the
                combined Section J+M total, {fmtNumber(headline.captured_ttm)} of{" "}
                {fmtNumber(headline.ttm_total)} insolvencies.
              </p>
            </Section>

            <Section id="methodology" title="Methodology and sources">
              <p>
                <strong>Data source.</strong> Counts are drawn from the Insolvency Service
                record-level data file, published monthly as part of the Company Insolvency
                Statistics release on gov.uk. Each record represents a single insolvency event
                registered with Companies House or the Insolvency Service, tagged with the
                company&apos;s SIC code and procedure type. We filter to SIC 1-digit Sections J
                (Information and communication) and M (Professional, scientific and technical
                activities), the two sections that between them cover most contractor-sector
                activity.
              </p>
              <p>
                <strong>What is counted.</strong> Each figure is the number of insolvency events
                registered in that period, not the number of unique companies. A company that
                enters administration and subsequently converts to CVL appears twice: once for
                each procedure. This is consistent with how the Insolvency Service reports its own
                headline figures.
              </p>
              <p>
                <strong>Captured divisions.</strong> The same record-level file tags every
                insolvency with a 2-digit SIC division as well as the procedure type, so the
                &quot;captured&quot; figures above (divisions 62, 70 and 71) use no additional
                source: they are the same Insolvency Service data, split one level deeper, and
                sit entirely within the Section J+M totals shown elsewhere on this page.
              </p>
              <p>
                <strong>Caveats.</strong> Section-level figures are coarse: SIC Sections J and M
                each cover several industries beyond contracting, so a rise or fall in the section
                total does not necessarily track the contractor-specific captured figure exactly.
                Counts are not rates: an increase in insolvency numbers may partly reflect growth
                in the total number of active companies rather than a worsening of sector
                conditions. The pandemic years (2020 to 2021) are not comparable to other years
                because temporary legislation suppressed compulsory liquidations. CVA and
                receivership counts are low and should be read as indicative only.
              </p>
              <p>
                <strong>Updated.</strong> Data through {monthLabel(meta.data_through)} (latest
                Insolvency Service release). Generated {monthLabel(meta.generated_at.slice(0, 7))}.
              </p>
              <ul className="not-prose mt-2 space-y-1 text-sm">
                {meta.sources.map((s) => (
                  <li key={s.name}>
                    <a href={s.release_page} className="font-semibold text-cyan-800 hover:text-cyan-900" rel="nofollow">
                      {s.name}
                    </a>{" "}
                    <span className="text-neutral-500">({s.publisher})</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm">
                <Link href={`${PAGE_PATH}/data`} className="font-semibold text-cyan-800 hover:text-cyan-900">
                  Download the insolvency data (CSV)
                </Link>
              </p>
              <p className="text-sm text-neutral-500">
                Free to cite and republish with attribution to Contractor Tax Accountants. This
                page is a data summary and does not constitute insolvency or tax advice on any
                individual situation.
              </p>
            </Section>

            {/* Conversion */}
            <div className="mt-10 rounded-2xl border-2 border-cyan-200 bg-gradient-to-br from-cyan-50 to-white p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-cyan-900 sm:text-3xl">
                Between contracts or worried about a client going under? Get your position right.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                Rising insolvency in the contractor-heavy parts of the economy affects everyone in
                the payment chain, including limited-company contractors waiting on invoices.
                Understanding your IR35 status, your company&apos;s reserves, and your own tax
                position is a practical buffer against client-side financial difficulties. Our
                calculators help you model what you would keep, inside or outside IR35.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                <Link href="/calculators/outside-ir35-take-home-calculator" className="text-cyan-800 hover:text-cyan-900">
                  Outside IR35 take-home calculator &rarr;
                </Link>
                <Link href="/calculators/inside-ir35-take-home-calculator" className="text-cyan-800 hover:text-cyan-900">
                  Inside IR35 take-home calculator &rarr;
                </Link>
              </div>
              <div className="mt-8">
                <LeadForm redirectOnSuccess={false} submitLabel="Get a free IR35 review" />
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
                Frequently asked questions
              </h2>
              <div className="mt-6 space-y-6">
                {faqs.map((f, i) => (
                  <div key={i}>
                    <h3 className="text-lg font-bold text-neutral-900">{f.question}</h3>
                    <p className="mt-2 text-base leading-relaxed text-neutral-700">{f.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
