import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CTASection } from "@/components/ui/CTASection";
import { siteConfig } from "@/config/site";
import { JsonLd, buildDataset, buildFaqPage } from "@/lib/schema";
import { BarChart, LineChart, StackedBarChart, CHART_COLORS } from "@/components/research/Charts";
import {
  fmtNumber,
  fmtPercent,
  monthLabel,
  monthLabelShort,
  type InsolvencyIndexSnapshot,
} from "@/lib/research/insolvency-index";
import snapshot from "@/data/uk-agency-insolvency-index.json";

const data = snapshot as unknown as InsolvencyIndexSnapshot;
const { meta, headline, insolvencies } = data;
const { decade } = headline;

const PAGE_PATH = "/research/uk-agency-insolvency-index";

const SIC_LABELS = meta.agency_sic_labels;
const SIC_ORDER = ["73110", "73120", "70210", "74100", "73200", "62012", "62020"] as const;

const HEADLINE_SENTENCE = `UK agency insolvencies rose ${fmtPercent(decade.change_pct, false)} between ${decade.from_year} and ${decade.to_year}`;

export const metadata: Metadata = {
  title: "UK Agency Insolvency Index | Agency company insolvency trends | Agency Founder Finance",
  description: `${HEADLINE_SENTENCE}. A sourced index of marketing, creative, advertising and digital agency insolvencies, isolated by exact SIC code from Insolvency Service open data. Updated ${monthLabel(meta.data_through)}.`,
  alternates: { canonical: `${siteConfig.url}${PAGE_PATH}` },
  openGraph: {
    title: "UK Agency Insolvency Index | Agency Founder Finance",
    description: `${HEADLINE_SENTENCE}. Agency insolvency trends from Insolvency Service official open data.`,
    url: `${siteConfig.url}${PAGE_PATH}`,
    type: "article",
  },
};

const faqs = [
  {
    q: "What does the UK Agency Insolvency Index measure?",
    a: "It counts UK company insolvencies registered each month under the exact 7-code agency SIC cluster used throughout this site's research: 73110 (advertising agencies), 73120 (media representation), 70210 (PR and communications), 74100 (specialised design), 73200 (market research), 62012 (business and domestic software development) and 62020 (IT consultancy). Counts come from the Insolvency Service's record-level data, which carries a 5-digit SIC field, so this is an exact match, not a division- or section-level approximation.",
  },
  {
    q: "Which part of the agency cluster has the most insolvencies?",
    a: `Information technology consultancy (SIC 62020) is consistently the largest single contributor, ${fmtNumber(headline.ttm_by_sic["62020"])} insolvencies in the trailing 12 months, roughly ${fmtPercent((headline.ttm_by_sic["62020"] / headline.ttm_union) * 100, false)} of the whole agency cluster. Software development (62012) is second. Advertising agencies (73110) and specialised design (74100) each run a similar, smaller volume, and market research (73200) is consistently the smallest, reflecting how few market research companies exist relative to the other categories.`,
  },
  {
    q: "What is a Creditors Voluntary Liquidation (CVL)?",
    a: "A CVL is the most common insolvency procedure among agencies in this data. The company's own directors resolve to wind up the business voluntarily once they conclude it cannot pay its debts, and a licensed insolvency practitioner is appointed to realise assets and distribute proceeds to creditors. Across the agency cluster, CVLs consistently account for the large majority of all insolvency events, directors choosing voluntary wind-up far more often than a creditor forcing a compulsory liquidation through the courts.",
  },
  {
    q: "What does 'share of captured' mean?",
    a: `The Insolvency Service record-level file tags every registered company insolvency with a SIC code. In the trailing 12 months, ${fmtNumber(headline.ttm_captured_total)} insolvencies were captured with a usable SIC classification across all of England, Wales and Scotland, and ${fmtNumber(headline.ttm_union)} of those were in the agency cluster, ${headline.ttm_share_of_captured_pct}% of the total. This is a share of classified insolvencies, not a share of the whole UK economy.`,
  },
  {
    q: "Are Section J and Section M the same as the agency figures?",
    a: "No. Section J (Information and Communication) and Section M (Professional, Scientific and Technical Activities) are included only as broader backdrop context, and cover every company in those SIC sections, including many with nothing to do with agencies, such as telecoms firms in Section J or veterinary practices in Section M. The agency-specific figures are the 7-code union and per-SIC breakdown, isolated to the exact SIC codes above.",
  },
  {
    q: "Where does this data come from?",
    a: "All insolvency counts come from the Insolvency Service's record-level data file, published as part of the Company Insolvency Statistics statistical release on gov.uk, under the Open Government Licence v3.0, covering England, Wales and Scotland. Figures are updated as the Insolvency Service publishes new monthly releases.",
  },
  {
    q: "Does rising insolvency affect my agency directly?",
    a: "It can, particularly if you rely on a small number of large clients or subcontract work to other agencies. If a client or supplier agency enters insolvency, unpaid invoices and work in progress are often difficult to recover in full. Reviewing your own cash-flow position, credit control and client concentration is a practical response regardless of the wider trend. Our team works with agency founders on exactly this kind of financial resilience planning.",
  },
];

const datasetSchema = buildDataset({
  name: "UK Agency Insolvency Index: agency company insolvencies by exact SIC code",
  description:
    "Monthly counts of UK marketing, creative, advertising and digital agency company insolvencies (7-code SIC cluster: 73110, 73120, 70210, 74100, 73200, 62012, 62020) across five procedure types, compiled from Insolvency Service record-level data.",
  path: PAGE_PATH,
  distributionPath: `${PAGE_PATH}/data`,
  dateModified: meta.generated_at,
  temporalCoverage: meta.coverage.replace("/", "/"),
  keywords: ["agency insolvency", "creative agency insolvency", "advertising agency insolvency", "UK company insolvency statistics"],
  license: "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
  spatialCoverage: "United Kingdom",
});

const faqSchema = buildFaqPage(faqs.map((f) => ({ question: f.q, answer: f.a })));

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <div className="text-3xl font-bold text-indigo-600 sm:text-4xl">{value}</div>
      <div className="mt-1 text-sm text-slate-600">{label}</div>
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-slate-200 py-10 first:border-t-0">
      <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-slate-700">{children}</div>
    </section>
  );
}

export default function UkAgencyInsolvencyIndexPage() {
  const latestFullAnnual = insolvencies.annual.filter((r) => r.year < 2026).at(-1);

  const procedures: { key: "cvl" | "compulsory" | "administration" | "cva" | "receivership"; label: string }[] = [
    { key: "cvl", label: "Creditors Voluntary Liquidation (CVL)" },
    { key: "compulsory", label: "Compulsory Liquidation" },
    { key: "administration", label: "Administration" },
    { key: "cva", label: "Company Voluntary Arrangement (CVA)" },
    { key: "receivership", label: "Administrative Receivership" },
  ];

  const annualBars = insolvencies.annual.filter((r) => r.year < 2026).map((r) => ({ label: String(r.year), value: r.union }));

  const monthlyLinePoints = insolvencies.monthly.map((m) => ({
    tick: monthLabelShort(m.month),
    month: m.month,
    union: m.union,
  }));

  const procedureStack = insolvencies.annual
    .filter((r) => r.year < 2026)
    .map((r) => ({
      label: String(r.year),
      cvl: r.cvl,
      compulsory: r.compulsory,
      administration: r.administration + r.administration_to_cvl,
      other: r.cva + r.receivership + r.moratorium,
    }));

  const sicBreakdown = SIC_ORDER.map((code) => ({
    code,
    label: SIC_LABELS[code],
    ttm: headline.ttm_by_sic[code] ?? 0,
  })).sort((a, b) => b.ttm - a.ttm);

  const creativeClusterTtm = ["73110", "73120", "70210", "74100", "73200"].reduce((s, c) => s + (headline.ttm_by_sic[c] ?? 0), 0);
  const techClusterTtm = ["62012", "62020"].reduce((s, c) => s + (headline.ttm_by_sic[c] ?? 0), 0);
  const creativeShareOfM = headline.ttm_by_section.M > 0 ? (creativeClusterTtm / headline.ttm_by_section.M) * 100 : null;
  const techShareOfJ = headline.ttm_by_section.J > 0 ? (techClusterTtm / headline.ttm_by_section.J) * 100 : null;

  return (
    <>
      <JsonLd data={faqSchema ? [datasetSchema, faqSchema] : [datasetSchema]} />

      <div className="mx-auto max-w-4xl px-6 py-12">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Research", href: "/research" }, { label: "UK Agency Insolvency Index" }]} />

        <header className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">UK Agency Insolvency Index</p>
          <h1 className="mt-2 text-4xl font-bold text-slate-900">{HEADLINE_SENTENCE}</h1>
          <p className="mt-4 text-lg text-slate-700">
            A sourced, monthly read on agency company insolvencies across the UK, isolated to the exact 7-code agency
            SIC cluster (not a broader section approximation), drawn from Insolvency Service public records. Updated{" "}
            {monthLabel(meta.data_through)}.
          </p>
        </header>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Stat value={fmtNumber(headline.ttm_union)} label="agency insolvencies in the trailing 12 months" />
          <Stat value={`${headline.ttm_share_of_captured_pct}%`} label="share of all captured company insolvencies" />
          <Stat value={fmtPercent(decade.change_pct, false)} label={`more insolvencies in ${decade.to_year} than in ${decade.from_year}`} />
          <Stat value={fmtNumber(headline.peak_union)} label={`insolvencies in ${monthLabel(headline.peak_month)}, the highest month on record`} />
        </div>

        <div className="mt-10 rounded-2xl border border-indigo-200 bg-indigo-50 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-indigo-900">Key findings</h2>
          <ul className="mt-4 space-y-2 text-base leading-relaxed text-slate-800">
            <li>
              Agency insolvencies rose {fmtPercent(decade.change_pct, false)} from {fmtNumber(decade.from_total)} in{" "}
              {decade.from_year} to {fmtNumber(decade.to_total)} in {decade.to_year}, the highest annual total in this
              series.
            </li>
            <li>
              In the trailing 12 months to {monthLabel(meta.data_through)}, {fmtNumber(headline.ttm_union)} agencies
              across the 7-code cluster entered insolvency, {headline.ttm_share_of_captured_pct}% of all{" "}
              {fmtNumber(headline.ttm_captured_total)} SIC-classified company insolvencies captured in the same window.
            </li>
            <li>
              IT consultancy (SIC 62020) is the single largest contributor at {fmtNumber(headline.ttm_by_sic["62020"])}{" "}
              insolvencies in the trailing 12 months, {fmtPercent((headline.ttm_by_sic["62020"] / headline.ttm_union) * 100, false)}{" "}
              of the whole agency cluster. Market research (73200) is the smallest, at just {fmtNumber(headline.ttm_by_sic["73200"])}.
            </li>
            <li>
              The 5 creative-cluster codes (advertising, media representation, PR, design, market research) account for
              {creativeShareOfM !== null ? ` ${fmtPercent(creativeShareOfM, false)}` : " an unavailable share"} of all
              Section M (Professional, Scientific and Technical) insolvencies, while the 2 tech-cluster codes account for
              {techShareOfJ !== null ? ` ${fmtPercent(techShareOfJ, false)}` : " an unavailable share"} of Section J
              (Information and Communication), the two broader sections these agency codes sit within.
            </li>
          </ul>
          <p className="mt-4 text-xs text-slate-500">
            Source: Insolvency Service, Company Insolvency Statistics (record-level data), under the Open Government
            Licence v3.0. England, Wales and Scotland. Figures may be cited with attribution to Agency Founder Finance.
          </p>
        </div>

        <Section id="annual" title="Agency insolvencies by year">
          <p>
            Each bar shows the total number of agency-cluster company insolvencies registered in that calendar year
            (complete years only), summed across all 7 SIC codes. The rise from 2020 reflects both the unwinding of
            pandemic-era restrictions on winding-up petitions and underlying growth in the number of active agencies.
          </p>
          <div className="not-prose mt-6 rounded-2xl border border-slate-200 p-4 sm:p-6">
            <BarChart data={annualBars} />
          </div>
        </Section>

        <Section id="monthly" title="The monthly trend">
          <p>
            Monthly agency-cluster insolvency registrations from January 2016 to {monthLabel(meta.data_through)}. Month
            to month figures are noisy at this volume (a few dozen events a month across the whole UK), so the annual
            view above is the more reliable trend read.
          </p>
          <div className="not-prose mt-6 rounded-2xl border border-slate-200 p-4 sm:p-6">
            <LineChart
              points={monthlyLinePoints}
              series={[{ key: "union", label: "Agency insolvencies", color: CHART_COLORS.primary }]}
            />
          </div>
        </Section>

        <Section id="sic-breakdown" title="Breakdown by exact agency SIC code">
          <p>
            The table ranks the 7 agency SIC codes by trailing-12-month insolvency count, the same exact cluster used
            throughout this site&apos;s agency research.
          </p>
          <div className="not-prose mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-slate-300 text-left">
                  <th className="py-2 pr-4 font-bold text-slate-900">SIC code</th>
                  <th className="py-2 pr-4 font-bold text-slate-900">What it covers</th>
                  <th className="py-2 font-bold text-slate-900 text-right">TTM insolvencies</th>
                </tr>
              </thead>
              <tbody>
                {sicBreakdown.map((s) => (
                  <tr key={s.code} className="border-b border-slate-200">
                    <td className="py-2 pr-4 font-semibold text-slate-900">{s.code}</td>
                    <td className="py-2 pr-4 text-slate-700">{s.label}</td>
                    <td className="py-2 text-right font-semibold text-slate-900">{fmtNumber(s.ttm)}</td>
                  </tr>
                ))}
                <tr className="border-b border-slate-300">
                  <td className="py-2 pr-4 font-bold text-indigo-700">All 7 codes (union)</td>
                  <td className="py-2 pr-4 text-slate-700">Every agency SIC code in the cluster</td>
                  <td className="py-2 text-right font-bold text-indigo-700">{fmtNumber(headline.ttm_union)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section id="procedures" title="Breakdown by procedure">
          <p>
            The chart shows the mix of insolvency procedures agencies went through each year. CVL dominates throughout;
            compulsory liquidation and administration are smaller but persistent categories.
          </p>
          <div className="not-prose mt-6 rounded-2xl border border-slate-200 p-4 sm:p-6">
            <StackedBarChart
              data={procedureStack}
              series={[
                { key: "cvl", label: "CVL", color: CHART_COLORS.primary },
                { key: "compulsory", label: "Compulsory liquidation", color: CHART_COLORS.secondary },
                { key: "administration", label: "Administration", color: CHART_COLORS.muted },
                { key: "other", label: "CVA / receivership / moratorium", color: CHART_COLORS.primaryLight },
              ]}
            />
          </div>
          {latestFullAnnual && (
            <div className="not-prose mt-6 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-slate-300 text-left">
                    <th className="py-2 pr-4 font-bold text-slate-900">Procedure</th>
                    <th className="py-2 pr-4 font-bold text-slate-900 text-right">{latestFullAnnual.year} count</th>
                    <th className="py-2 font-bold text-slate-900 text-right">% of total</th>
                  </tr>
                </thead>
                <tbody>
                  {procedures.map(({ key, label }) => {
                    const count = Number(latestFullAnnual[key] ?? 0);
                    const pct = latestFullAnnual.union > 0 ? ((count / latestFullAnnual.union) * 100).toFixed(1) : "n/a";
                    return (
                      <tr key={key} className="border-b border-slate-200">
                        <td className="py-2 pr-4 text-slate-700">{label}</td>
                        <td className="py-2 pr-4 text-right font-semibold text-slate-900">{fmtNumber(count)}</td>
                        <td className="py-2 text-right text-slate-700">{pct}%</td>
                      </tr>
                    );
                  })}
                  <tr className="border-b border-slate-300">
                    <td className="py-2 pr-4 font-bold text-indigo-700">Total</td>
                    <td className="py-2 pr-4 text-right font-bold text-indigo-700">{fmtNumber(latestFullAnnual.union)}</td>
                    <td className="py-2 text-right font-bold text-indigo-700">100%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </Section>

        <Section id="section-context" title="Agencies in context: Section J and Section M">
          <p>
            Every agency SIC code sits within one of two broader Insolvency Service sections: Section J (Information
            and Communication) for the 2 IT-consultancy codes, and Section M (Professional, Scientific and Technical
            Activities) for the 5 creative-cluster codes. These section totals include many companies that are not
            agencies at all, telecoms firms and software houses in Section J, or veterinary practices and legal firms
            in Section M, so they are backdrop context only, not agency-specific figures.
          </p>
          <div className="not-prose mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-slate-300 text-left">
                  <th className="py-2 pr-4 font-bold text-slate-900">Section</th>
                  <th className="py-2 pr-4 font-bold text-slate-900 text-right">Section TTM total</th>
                  <th className="py-2 pr-4 font-bold text-slate-900 text-right">Agency-cluster TTM within it</th>
                  <th className="py-2 font-bold text-slate-900 text-right">Agency share</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="py-2 pr-4 text-slate-700">J: {meta.section_labels.J}</td>
                  <td className="py-2 pr-4 text-right text-slate-900">{fmtNumber(headline.ttm_by_section.J)}</td>
                  <td className="py-2 pr-4 text-right text-slate-900">{fmtNumber(techClusterTtm)} (62012 + 62020)</td>
                  <td className="py-2 text-right font-semibold text-indigo-700">{techShareOfJ !== null ? `${techShareOfJ.toFixed(1)}%` : "n/a"}</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-2 pr-4 text-slate-700">M: {meta.section_labels.M}</td>
                  <td className="py-2 pr-4 text-right text-slate-900">{fmtNumber(headline.ttm_by_section.M)}</td>
                  <td className="py-2 pr-4 text-right text-slate-900">{fmtNumber(creativeClusterTtm)} (creative cluster)</td>
                  <td className="py-2 text-right font-semibold text-indigo-700">{creativeShareOfM !== null ? `${creativeShareOfM.toFixed(1)}%` : "n/a"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section id="methodology" title="Methodology and sources">
          <p>
            <strong>Data source.</strong> Counts are drawn from the Insolvency Service record-level data file, published
            as part of the Company Insolvency Statistics release on gov.uk. Each record is a single insolvency event
            registered with Companies House or the Insolvency Service, tagged with a 5-digit SIC code where available.
            We filter to the exact 7-code agency cluster: 73110, 73120, 70210, 74100, 73200, 62012, 62020.
          </p>
          <p>
            <strong>Why 5-digit matters.</strong> Most sector-specific insolvency research settles for a section- or
            division-level cut (a whole SIC letter or 2-digit code) because that is the finest breakdown many
            government releases publish. The Insolvency Service record-level file carries a 5-digit SIC field, so this
            index is an exact match to the same SIC codes used in the UK Agency Formation Index, not an approximation.
          </p>
          <p>
            <strong>What is counted.</strong> Each figure is the number of insolvency events registered in that period,
            not the number of unique companies. A company that enters administration and subsequently converts to CVL
            appears twice: once for each procedure, consistent with how the Insolvency Service reports its own
            headline figures.
          </p>
          <p>
            <strong>Caveats.</strong> Counts are not rates: an increase may partly reflect growth in the number of
            active agencies rather than a worsening of sector conditions. Section J and Section M context figures are
            not agency-specific and should not be read as agency insolvency counts. CVA, receivership and moratorium
            counts are low and should be read as indicative only.
          </p>
          <p>
            <strong>Updated.</strong> Data through {monthLabel(meta.data_through)} (latest Insolvency Service release,
            published {meta.generated_at}). Generated {meta.generated_at}.
          </p>
          <ul className="not-prose mt-2 space-y-1 text-sm">
            {meta.sources.map((s) => (
              <li key={s.name}>
                <a href={s.release_page} className="font-semibold text-indigo-700 hover:text-indigo-800" rel="nofollow">
                  {s.name}
                </a>{" "}
                <span className="text-slate-500">({s.publisher})</span>
              </li>
            ))}
          </ul>
          <p className="text-sm">
            <Link href={`${PAGE_PATH}/data`} className="font-semibold text-indigo-700 hover:text-indigo-800">
              Download the insolvency data (CSV)
            </Link>
          </p>
          <p className="text-sm text-slate-500">
            Free to cite and republish with attribution to Agency Founder Finance. This page is a data summary and
            does not constitute insolvency or tax advice on any individual situation.
          </p>
        </Section>

        <div className="mt-10">
          <CTASection
            title="Running an agency? Protect your cash position before a client or supplier failure hits you."
            description="Rising insolvency in the agency cluster affects the whole payment chain, not just the company that fails. Understanding your cash-flow buffer, client concentration and tax position is a practical defence. Book a free health check with an agency specialist accountant."
            primaryHref="/free-health-check"
            primaryLabel="Get a free agency finance health check"
            secondaryHref="/services"
            secondaryLabel="View services"
          />
        </div>

        <div className="mt-8">
          <LeadForm redirectOnSuccess={false} submitLabel="Book a free call" />
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Frequently asked questions</h2>
          <div className="mt-6 space-y-4">
            {faqs.map((f) => (
              <div key={f.q} className="border-l-4 border-slate-300 bg-white p-6 transition-all hover:border-indigo-600">
                <h3 className="text-lg font-bold text-slate-900">{f.q}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-700">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
