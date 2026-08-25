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
  AnnualIncorporationsChart,
  MonthlyIncorporationsChart,
  ReformOverlayChart,
} from "@/components/research/ContractorIndexCharts";
import {
  fmtNumber,
  fmtPercent,
  monthLabel,
  type ContractorIndexSnapshot,
} from "@/lib/research/contractor-index";
import snapshot from "@/data/uk-contractor-index.json";

const data = snapshot as unknown as ContractorIndexSnapshot;
const { meta, headline, incorporations, reform_overlay } = data;
const { decade } = headline;
const PRIMARY = headline.primary_sic;

const PAGE_PATH = "/research/uk-contractor-index";

const HEADLINE_SENTENCE = `New UK IT consultancy companies rose ${fmtPercent(decade.change_pct, false)} between ${decade.from_year} and ${decade.to_year}`;

export const metadata: Metadata = {
  title: { absolute: "UK Contractor Index | Contractor Tax Accountants" },
  description: `${HEADLINE_SENTENCE}. A sourced index of contractor-sector company formations from Companies House open data.`,
  alternates: { canonical: `${siteConfig.url}${PAGE_PATH}` },
  openGraph: {
    title: "UK Contractor Index | Contractor Tax Accountants",
    description: `${HEADLINE_SENTENCE}. New contractor-sector company formations from Companies House official open data.`,
    url: `${siteConfig.url}${PAGE_PATH}`,
    type: "article",
  },
};

const SIC_COUNT = Object.keys(meta.sic_labels).length;

const faqs = [
  {
    question: "What does the UK Contractor Index measure?",
    answer:
      `It counts new companies incorporated each month across ${SIC_COUNT} contractor-heavy Standard Industrial Classification (SIC) codes, drawn from Companies House public records. The headline figure tracks SIC 62020 (information technology consultancy activities), the archetypal personal service company (PSC) sector, alongside the deduplicated union of all ${SIC_COUNT} codes as a broader all-contractor figure. It spans IT and software, management consultancy, engineering and technical consulting, and creative and design work. Counts are gross: the Companies House Advanced Search API counts companies by incorporation date across all statuses, so companies dissolved since formation are still included in the year they were formed and the series carries no survivorship bias.`,
  },
  {
    question: "Why use company incorporations as a proxy for the contractor economy?",
    answer:
      "Most independent contractors and freelancers in IT, consultancy and engineering trade through their own limited company, the personal service company (PSC). New incorporations in these professional and technical SIC codes are therefore a reasonable proxy for the rate at which people are setting up to work independently. It is a proxy, not a census: it does not capture umbrella workers, sole traders, or contractors operating through an existing company, and a new incorporation is not always a new contractor. Read alongside the wider picture, the trend still tracks the health of the contractor market.",
  },
  {
    question: "Where does this data come from?",
    answer:
      "All incorporation counts come from the Companies House Advanced Search API. Companies House is the UK register of companies, operated by His Majesty's Government, and its data is published under the Open Government Licence v3.0. The figures are updated as Companies House releases new records, though the most recent two months are provisional due to indexing lag.",
  },
  {
    question: "What does 'provisional' mean on the chart?",
    answer:
      "Companies House indexes very recent incorporations with a short lag of four to six weeks. The two most recent months in the series are therefore provisional: they will be revised upward as late-indexed records are captured. These months are shown with a dashed line on the chart and are excluded from all headline figures and decade comparisons to avoid understating the trend.",
  },
  {
    question: "How does IR35 affect contractors setting up a limited company?",
    answer:
      "Whether a limited company is the right structure depends on your IR35 status. If your contracts fall outside IR35 (genuine self-employment), a personal service company is usually the most tax-efficient way to work, drawing a small salary plus dividends. For 2026/27 the dividend ordinary rate is 10.75% and the higher rate 35.75% after the £500 dividend allowance. If your work falls inside IR35, the off-payroll rules treat your income largely as employment income, which narrows the advantage of a company. Our take-home calculators let you compare both positions before you decide.",
  },
];

// ---------------------------------------------------------------------------
// JSON-LD (Article + Dataset + FAQPage via shared schema helpers)
// ---------------------------------------------------------------------------

const articleJsonLd = buildArticleJsonLd({
  headline: "UK Contractor Index",
  description: `${HEADLINE_SENTENCE}, tracked from Companies House open data.`,
  url: `${siteConfig.url}${PAGE_PATH}`,
  datePublished: "2026-06-16",
  dateModified: meta.generated_at,
});

const datasetJsonLd = buildDatasetJsonLd({
  name: "UK Contractor Index: contractor-sector company incorporations by SIC code",
  description: `Monthly counts of newly incorporated UK companies across ${SIC_COUNT} contractor-heavy SIC codes (Companies House), including the deduplicated union across all sectors. A proxy for personal service company (PSC) formation.`,
  url: `${siteConfig.url}${PAGE_PATH}`,
  csvUrl: `${siteConfig.url}${PAGE_PATH}/data`,
  dateModified: meta.generated_at,
  temporalCoverage: `${incorporations.monthly[0]?.month ?? ""}/${meta.incorporations_settled_through}`,
  variableMeasured: [
    "Monthly company incorporations by contractor SIC code",
    `Deduplicated union across all ${SIC_COUNT} contractor SIC codes`,
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

// Divisions for the breakdown table, in display order.
const DIVISIONS: { key: "it" | "consultancy" | "engineering" | "creative"; sics: string[] }[] = [
  { key: "it", sics: ["62011", "62012", "62020", "62090"] },
  { key: "consultancy", sics: ["70210", "70221", "70229"] },
  { key: "engineering", sics: ["71121", "71122", "71129"] },
  { key: "creative", sics: ["73110", "74100", "74201"] },
];

const isPlaceholder =
  typeof meta.status === "string" && meta.status.toUpperCase().includes("PLACEHOLDER");

// ---------------------------------------------------------------------------

export default function UKContractorIndexPage() {
  const settledThrough = meta.incorporations_settled_through;
  const lastSettled = headline.last_settled_month;
  const latestRow = incorporations.monthly.find((m) => m.month === lastSettled);
  const latestAnnual = incorporations.annual_by_division[incorporations.annual_by_division.length - 1];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: articleJsonLd }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: datasetJsonLd }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJsonLd }}
      />

      {/* Hero */}
      <section className="bg-neutral-900 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <Breadcrumb
            variant="light"
            items={[
              { label: "Home", href: "/" },
              { label: "Research", href: "/research" },
              { label: "UK Contractor Index" },
            ]}
          />
          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-cyan-300">
            UK Contractor Index
          </p>
          <h1 className="mt-2 max-w-4xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {HEADLINE_SENTENCE}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-neutral-300">
            A sourced, monthly read on new limited-company formations in contractor-heavy
            sectors, a proxy for personal service company (PSC) formation, drawn from Companies
            House public records. Covering {SIC_COUNT} professional and technical SIC codes from IT
            consultancy to engineering and design. Updated {monthLabel(settledThrough)}.
          </p>

          {isPlaceholder ? (
            <p className="mt-4 max-w-3xl rounded-lg border border-amber-400/40 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
              Preview build: the figures shown are placeholder values awaiting the Companies House
              ingest. They are illustrative only and not for citation until the live dataset lands.
            </p>
          ) : null}

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat
              value={fmtNumber(headline.all_contractor_cos_ttm)}
              label="contractor-sector companies incorporated in the last 12 months"
            />
            <Stat
              value={fmtNumber(headline.it_consultancy_cos_ttm)}
              label={`IT consultancy companies (SIC ${PRIMARY}) in the last 12 months`}
            />
            <Stat
              value={fmtPercent(decade.change_pct, false)}
              label={`more IT consultancy companies than in ${decade.from_year}`}
            />
            <Stat
              value={fmtPercent(headline.it_consultancy_cos_yoy_pct)}
              label={`year-on-year change in ${monthLabel(lastSettled)}`}
            />
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-white py-10 sm:py-14">
        <div className={siteContainerLg}>
          <div className="max-w-4xl">

            {/* Key facts */}
            <div className="rounded-2xl border border-cyan-500/20 bg-cyan-50/60 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-cyan-900">Key facts</h2>
              <ul className="mt-4 space-y-2 text-base leading-relaxed text-neutral-800">
                <li>
                  New IT consultancy companies (SIC {PRIMARY}) grew from{" "}
                  {fmtNumber(decade.from_value)} in {decade.from_year} to{" "}
                  {fmtNumber(decade.to_value)} in {decade.to_year}, a rise of{" "}
                  {fmtPercent(decade.change_pct, false)}.
                </li>
                <li>
                  In the 12 months to {monthLabel(settledThrough)},{" "}
                  {fmtNumber(headline.all_contractor_cos_ttm)} UK companies were incorporated across
                  all {SIC_COUNT} contractor-sector SIC codes.
                </li>
                <li>
                  IT consultancy formations peaked in {headline.peak_month.replace("-", " ")} at{" "}
                  {fmtNumber(headline.peak_value)} new companies in a single month, the highest in
                  the series.
                </li>
                <li>
                  The all-contractor union rose {fmtPercent(decade.union_change_pct, false)} over the
                  decade, from {fmtNumber(decade.union_from)} to {fmtNumber(decade.union_to)}{" "}
                  annually, reflecting broad growth across IT, consultancy, engineering and creative
                  work.
                </li>
                <li>
                  Year-on-year growth in {monthLabel(lastSettled)} was{" "}
                  {fmtPercent(headline.it_consultancy_cos_yoy_pct)} for IT consultancy companies.
                </li>
              </ul>
              <p className="mt-4 text-xs text-neutral-500">
                Source: Companies House Advanced Search API, under the Open Government Licence v3.0.
                The most recent {meta.provisional_months.length} months of incorporation data are
                provisional (Companies House indexing lag) and are excluded from the headline figures
                above. Figures may be cited with attribution to Contractor Tax Accountants.
              </p>
            </div>

            <Section id="incorporations" title="IT consultancy company formations by year">
              <p>
                Each bar shows the number of new companies incorporated in that calendar year under
                SIC code {PRIMARY}, {meta.sic_labels[PRIMARY]?.toLowerCase()}. Only complete calendar
                years are shown. IT consultancy is the single largest contractor sector by company
                formation and the clearest signal of the limited-company route into independent work.
              </p>
              <div className="not-prose mt-6 rounded-2xl border border-neutral-200 p-4 sm:p-6">
                <AnnualIncorporationsChart annual={incorporations.annual} sic={PRIMARY} />
              </div>
            </Section>

            <Section id="monthly" title="The monthly trend">
              <p>
                The same measure shown month by month across the series. The dashed tail marks the
                most recent {meta.provisional_months.length} months, which are provisional because
                Companies House indexes very recent incorporations with a short lag.
              </p>
              <div className="not-prose mt-6 rounded-2xl border border-neutral-200 p-4 sm:p-6">
                <MonthlyIncorporationsChart
                  monthly={incorporations.monthly}
                  sic={PRIMARY}
                  provisionalMonths={meta.provisional_months}
                />
              </div>
            </Section>

            {reform_overlay ? (
              <Section id="reform-overlay" title="Did IR35 kill the PSC? The two reform dates">
                <p>
                  All-contractor company formations (the deduplicated union across all{" "}
                  {SIC_COUNT} SIC codes) by year, with the two off-payroll (IR35) reform dates
                  marked: April 2017, when the rules extended to the public sector, and April
                  2021, when they extended to medium and large private sector engagers, the point
                  at which most of the contractor market became affected.
                </p>
                <div className="not-prose mt-6 rounded-2xl border border-neutral-200 p-4 sm:p-6">
                  <ReformOverlayChart
                    annual={incorporations.annual}
                    reformYears={reform_overlay.reform_dates.map((r) => ({
                      year: Number(r.date.slice(0, 4)),
                      label: r.label.replace("Off-payroll reform: ", ""),
                    }))}
                  />
                </div>
                <div className="not-prose mt-6 overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b-2 border-neutral-300 text-left">
                        <th className="py-2 pr-4 font-bold text-neutral-900">Era</th>
                        <th className="py-2 pr-4 font-bold text-neutral-900 text-right">
                          TTM union formations
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {reform_overlay.periods.map((p) => (
                        <tr key={p.key} className="border-b border-neutral-200">
                          <td className="py-2 pr-4 text-neutral-700">{p.label}</td>
                          <td className="py-2 pr-4 text-right font-semibold text-neutral-900">
                            {fmtNumber(p.ttm_union)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <ul className="mt-4 space-y-2">
                  {reform_overlay.deltas.map((d) => (
                    <li key={`${d.from_period}-${d.to_period}`}>
                      <strong>{d.label}:</strong> {fmtPercent(d.change_pct, true)} in trailing-12-month
                      union formations{d.cagr_pct !== null ? ` (${fmtPercent(d.cagr_pct, true)} CAGR over ${d.years} years)` : ""}.
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-neutral-600">
                  As independent context, HMRC&apos;s own published estimate is that the private
                  sector reform raised an additional {reform_overlay.hmrc_context.additional_tax_label}{" "}
                  in tax, National Insurance and the Apprenticeship Levy between{" "}
                  {reform_overlay.hmrc_context.period}, affecting around{" "}
                  {fmtNumber(reform_overlay.hmrc_context.contractors_affected)} contractors. That
                  figure is a separate HMRC estimate, not derived from this dataset; the
                  formations trend above is this site&apos;s own independent read on the same
                  question.{" "}
                  <a
                    href={reform_overlay.hmrc_context.source_url}
                    className="font-semibold text-cyan-800 hover:text-cyan-900"
                    rel="nofollow"
                  >
                    {reform_overlay.hmrc_context.source_name}
                  </a>
                  .
                </p>
              </Section>
            ) : null}

            <Section id="breakdown" title="By contractor sector">
              <p>
                The table below breaks down new company formations in{" "}
                {lastSettled ? monthLabel(lastSettled) : "the latest settled month"}, grouped into
                the four contractor divisions the index tracks. It shows where independent
                limited-company working is concentrated across the professional and technical
                economy.
              </p>
              <div className="not-prose mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-neutral-300 text-left">
                      <th className="py-2 pr-4 font-bold text-neutral-900">SIC code</th>
                      <th className="py-2 pr-4 font-bold text-neutral-900">What it covers</th>
                      <th className="py-2 font-bold text-neutral-900">New companies</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DIVISIONS.map((div) => (
                      <DivisionRows
                        key={div.key}
                        divisionLabel={meta.division_labels[div.key] ?? div.key}
                        sics={div.sics}
                        sicLabels={meta.sic_labels}
                        latestRow={latestRow}
                      />
                    ))}
                    <tr className="border-b border-neutral-300">
                      <td className="py-2 pr-4 font-semibold text-cyan-800">
                        All {SIC_COUNT} codes (deduplicated)
                      </td>
                      <td className="py-2 pr-4 text-neutral-700">
                        Unique companies across all contractor SIC codes
                      </td>
                      <td className="py-2 font-bold text-cyan-800">
                        {latestRow ? fmtNumber(Number(latestRow["union"])) : "n/a"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {latestAnnual ? (
                <p className="mt-4 text-sm text-neutral-500">
                  Over the most recent complete year, IT and software accounted for{" "}
                  {fmtNumber(latestAnnual.it)} new companies, management consultancy{" "}
                  {fmtNumber(latestAnnual.consultancy)}, engineering and technical{" "}
                  {fmtNumber(latestAnnual.engineering)}, and creative and other{" "}
                  {fmtNumber(latestAnnual.creative)}.
                </p>
              ) : null}
            </Section>

            <Section id="methodology" title="Methodology and sources">
              <p>
                <strong>Incorporations.</strong> For each month, we query the Companies House
                Advanced Search API for companies incorporated under each of the {SIC_COUNT}{" "}
                contractor-heavy SIC codes spanning IT and software (Division 62), management
                consultancy (Division 70), engineering and technical consulting (Division 71), and
                creative and design work (Divisions 73 and 74). The deduplicated union counts each
                company once even where it registers under multiple of these SIC codes. Counts are
                gross: the Advanced Search API counts companies by incorporation date across all
                company statuses, so companies that have since been dissolved are still included in
                the year they were formed and the series carries no survivorship bias. The most recent {meta.provisional_months.length}{" "}
                months are provisional and excluded from headline figures.
              </p>
              <p>
                <strong>Proxy, not a census.</strong> The index measures limited-company formation in
                contractor-heavy sectors as a proxy for personal service company (PSC) activity. It
                does not capture umbrella workers, sole traders, or contractors working through an
                existing company, and a new incorporation is not always a newly self-employed person.
                It is best read as a directional signal of the limited-company contractor market.
              </p>
              <p>
                <strong>Licence.</strong> Companies House data is published under the Open Government
                Licence v3.0, which permits free reuse with attribution. This index, and the CSV
                export below, are free to cite and republish with attribution to Contractor Tax
                Accountants.
              </p>
              <p>
                <strong>Updated.</strong> Incorporations to {monthLabel(settledThrough)} (settled
                data). Data generated {monthLabel(meta.generated_at.slice(0, 7))}.
              </p>
              <ul className="not-prose mt-2 space-y-1 text-sm">
                {meta.sources.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.url}
                      className="font-semibold text-cyan-800 hover:text-cyan-900"
                      rel="nofollow"
                    >
                      {s.name}
                    </a>{" "}
                    <span className="text-neutral-500">({s.publisher})</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm">
                <Link
                  href={`${PAGE_PATH}/data`}
                  className="font-semibold text-cyan-800 hover:text-cyan-900"
                >
                  Download the incorporation data (CSV)
                </Link>
              </p>
              <p className="text-sm text-neutral-500">
                Free to cite and republish with attribution to Contractor Tax Accountants. This page
                is a data summary and does not constitute tax advice on any individual situation.
              </p>
            </Section>

            {/* Conversion */}
            <div className="mt-10 rounded-2xl border-2 border-cyan-200 bg-gradient-to-br from-cyan-50 to-white p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-cyan-900 sm:text-3xl">
                Going limited? Model your take-home first.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                The rise in contractor-sector companies reflects how most independent professionals
                now work: through their own limited company. Whether that is right for you turns on
                your IR35 status. Our calculators show what you would actually keep, inside or outside
                IR35, on 2026/27 rates.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                <Link
                  href="/calculators/outside-ir35-take-home-calculator"
                  className="text-cyan-800 hover:text-cyan-900"
                >
                  Outside IR35 take-home calculator &rarr;
                </Link>
                <Link
                  href="/calculators/inside-ir35-take-home-calculator"
                  className="text-cyan-800 hover:text-cyan-900"
                >
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

function DivisionRows({
  divisionLabel,
  sics,
  sicLabels,
  latestRow,
}: {
  divisionLabel: string;
  sics: string[];
  sicLabels: Record<string, string>;
  latestRow: (Record<string, number | string> & { month: string }) | undefined;
}) {
  return (
    <>
      <tr className="border-b border-neutral-200 bg-neutral-50">
        <td colSpan={3} className="py-2 pr-4 text-xs font-bold uppercase tracking-wide text-cyan-800">
          {divisionLabel}
        </td>
      </tr>
      {sics.map((code) => (
        <tr key={code} className="border-b border-neutral-200">
          <td className="py-2 pr-4 font-semibold text-neutral-900">{code}</td>
          <td className="py-2 pr-4 text-neutral-700">{sicLabels[code]}</td>
          <td className="py-2 font-semibold text-neutral-900">
            {latestRow ? fmtNumber(Number(latestRow[code])) : "n/a"}
          </td>
        </tr>
      ))}
    </>
  );
}
