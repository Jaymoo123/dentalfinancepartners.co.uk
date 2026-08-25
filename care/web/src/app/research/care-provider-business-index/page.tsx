import type { Metadata } from "next";
import type { ReactNode } from "react";

import snapshot from "@/data/uk-care-provider-business-index.json";
import formationSnapshot from "@/data/uk-care-company-formation-index.json";
import type { CareFormationIndexSnapshot } from "@/lib/research/care-formation-index";
import { monthLabel, seasonalityFromMonthly } from "@/lib/research/care-formation-index";
import { SequentialBarChart } from "@/components/research/CareDensityQualityCharts";

const { meta, quarters, sub_trades, headline, cqc } = snapshot;
const formations = formationSnapshot as unknown as CareFormationIndexSnapshot;
const formationsUnion = formations.incorporations.monthly.map((r) => ({
  month: r.month,
  count: Number(r.union ?? 0),
}));
const formationsSeasonality = seasonalityFromMonthly(
  formationsUnion,
  formations.meta.incorporations_settled_through
);

const PAGE_PATH = "/research/care-provider-business-index";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://care.example.com";

function fmt(n: number): string {
  return n.toLocaleString("en-GB");
}

function fmtNet(n: number): string {
  return (n >= 0 ? "+" : "") + fmt(n);
}

export const metadata: Metadata = {
  title: "UK Care Provider Business Index",
  description: `Quarterly tracker of UK care company incorporations and dissolutions by segment, built from Companies House data. ${fmt(headline.care_company_count_proxy.count)} care companies currently active on the register.`,
  alternates: { canonical: `${SITE_URL}${PAGE_PATH}` },
  openGraph: {
    title: "UK Care Provider Business Index",
    description: `Companies House data on UK care company registrations and dissolutions by quarter, from Q1 2021. Covers residential nursing, residential care, and domiciliary care.`,
    url: `${SITE_URL}${PAGE_PATH}`,
    type: "article",
  },
};

const datasetSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: meta.title,
  description: meta.description,
  inLanguage: "en-GB",
  license: "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
  dateModified: meta.generated_at,
  isAccessibleForFree: true,
  url: `${SITE_URL}${PAGE_PATH}`,
  variableMeasured: [
    "Quarterly care company incorporations by sub-segment",
    "Quarterly care company dissolutions by sub-segment",
    "Net openings per quarter per sub-segment",
    "Rolling 4-quarter average net openings",
    "Live care company count across all care SIC codes",
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
    <section
      id={id}
      className="scroll-mt-24 border-t border-[var(--border)] py-10 first:border-t-0"
    >
      <h2 className="text-2xl font-bold text-[var(--ink)] sm:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-[var(--ink-soft)]">
        {children}
      </div>
    </section>
  );
}

type SubTradeKey = keyof typeof sub_trades;

const TRADE_KEYS = Object.keys(sub_trades) as SubTradeKey[];

// Show last 12 quarters in the detail tables (most recent first)
const DISPLAY_QUARTERS = quarters.slice(-12).reverse();

export default function CareProviderIndexPage() {
  const latestQ = headline.latest_quarter;
  const latestNet = headline.latest_quarter_net_by_sub_trade as Record<string, number>;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />
      <main>
        <section className="bg-[var(--brand-primary)] py-14 sm:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-white/70">Research</p>
            <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
              UK Care Provider Business Index
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/85">
              Quarterly tracker of UK care company incorporations and dissolutions by segment,
              built from Companies House data. Updated {meta.pull_date}.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-6">
          <div className="-mt-8 grid gap-4 sm:grid-cols-3">
            <Stat
              value={fmt(headline.care_company_count_proxy.count)}
              label="care companies on the register (all care SIC codes)"
            />
            <Stat
              value={fmtNet(latestNet.domiciliary ?? 0)}
              label={`domiciliary care net openings (${latestQ})`}
            />
            <Stat
              value={fmtNet(latestNet.residential_nursing ?? 0)}
              label={`residential nursing net openings (${latestQ})`}
            />
          </div>

          <Section id="how-many-care-companies" title="How many care companies are in the UK?">
            <p>
              As at {headline.care_company_count_proxy.as_of}, the Companies House register shows{" "}
              <strong>{fmt(headline.care_company_count_proxy.count)}</strong> active companies
              with at least one care-related SIC code (87100, 87200, 87300, 87900, or 88100).
              This covers the full spectrum: residential nursing homes, supported living and
              learning disability services, elderly care homes, and domiciliary (home care) agencies.
            </p>
            <p>
              The figure is an incorporated-company count only. Sole traders, partnerships, and
              businesses operating without a Companies House registration are not captured. The
              true number of care providers operating in the UK across all legal structures is
              materially higher. For regulated locations in England specifically, the Care Quality
              Commission (CQC) publishes a separate register (see the CQC data section below).
            </p>
          </Section>

          <Section id="overview" title={`Net openings by segment (${latestQ})`}>
            <p>
              Net openings is incorporations minus dissolutions for the quarter. A positive
              number means more businesses registered than dissolved; negative means more
              dissolved than registered. Because dissolution filings lag actual closures by
              months, the rolling 4-quarter average (shown in the segment tables below)
              gives a more stable signal.
            </p>
            <div className="overflow-x-auto">
              <table className="mt-2 w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] text-left text-[var(--muted)]">
                    <th className="py-2 pr-4 font-semibold">Segment</th>
                    <th className="py-2 pr-4 text-right font-semibold">Incorporations</th>
                    <th className="py-2 pr-4 text-right font-semibold">Dissolutions</th>
                    <th className="py-2 text-right font-semibold">Net openings</th>
                  </tr>
                </thead>
                <tbody>
                  {TRADE_KEYS.map((k) => {
                    const t = sub_trades[k];
                    const idx = quarters.indexOf(latestQ);
                    return (
                      <tr key={k} className="border-b border-[var(--border)]/60">
                        <td className="py-2 pr-4">{t.label}</td>
                        <td className="py-2 pr-4 text-right tabular-nums">
                          {fmt(t.incorporations[idx] ?? 0)}
                        </td>
                        <td className="py-2 pr-4 text-right tabular-nums">
                          {fmt(t.dissolutions[idx] ?? 0)}
                        </td>
                        <td className="py-2 text-right tabular-nums font-medium">
                          {fmtNet(t.net_openings[idx] ?? 0)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Section>

          {TRADE_KEYS.map((k) => {
            const t = sub_trades[k];
            return (
              <Section key={k} id={k} title={t.label}>
                <div className="overflow-x-auto">
                  <table className="mt-2 w-full text-sm">
                    <thead>
                      <tr className="border-b border-[var(--border)] text-left text-[var(--muted)]">
                        <th className="py-2 pr-4 font-semibold">Quarter</th>
                        <th className="py-2 pr-4 text-right font-semibold">Incorporations</th>
                        <th className="py-2 pr-4 text-right font-semibold">Dissolutions</th>
                        <th className="py-2 pr-4 text-right font-semibold">Net</th>
                        <th className="py-2 text-right font-semibold">4Q avg</th>
                      </tr>
                    </thead>
                    <tbody>
                      {DISPLAY_QUARTERS.map((q) => {
                        const idx = quarters.indexOf(q);
                        const avg = t.rolling_4q_avg_net[idx];
                        return (
                          <tr key={q} className="border-b border-[var(--border)]/60">
                            <td className="py-2 pr-4 font-medium">{q}</td>
                            <td className="py-2 pr-4 text-right tabular-nums">
                              {fmt(t.incorporations[idx] ?? 0)}
                            </td>
                            <td className="py-2 pr-4 text-right tabular-nums">
                              {fmt(t.dissolutions[idx] ?? 0)}
                            </td>
                            <td className="py-2 pr-4 text-right tabular-nums">
                              {fmtNet(t.net_openings[idx] ?? 0)}
                            </td>
                            <td className="py-2 text-right tabular-nums text-[var(--muted)]">
                              {avg !== null ? fmtNet(Math.round(avg)) : ""}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-[var(--muted)]">
                  SIC codes: {t.sic_codes.join(", ")}. 4Q avg = rolling 4-quarter average net openings.
                </p>
              </Section>
            );
          })}

          <Section id="cqc" title="CQC registered locations (England)">
            <p>
              The Care Quality Commission (CQC) registers and inspects care services in England.
              Its active locations dataset is a separate count from Companies House data: CQC
              counts regulated service locations (each physical address or service), while
              Companies House counts incorporated legal entities. A single company may operate
              multiple CQC-registered locations, and vice versa.
            </p>
            {cqc.registered_locations !== null ? (
              <>
                <p>
                  The CQC active locations dataset (sourced from{" "}
                  <a href={cqc.source_url} rel="noopener noreferrer" className="text-[var(--brand-primary)] underline">
                    the CQC transparency page
                  </a>
                  ) shows <strong>{fmt(cqc.registered_locations)}</strong> active registered
                  locations in England at the time of this data pull, of which{" "}
                  <strong>{fmt(cqc.care_homes ?? 0)}</strong> are flagged as care homes.
                  The adult social care share breaks down as follows.
                </p>
                <div className="overflow-x-auto">
                  <table className="mt-2 w-full text-sm">
                    <thead>
                      <tr className="border-b border-[var(--border)] text-left text-[var(--muted)]">
                        <th className="py-2 pr-4 font-semibold">Primary inspection category</th>
                        <th className="py-2 text-right font-semibold">Active locations</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(
                        (cqc.by_primary_inspection_category ?? {}) as Record<string, number>
                      )
                        .filter(([k]) => /social care/i.test(k))
                        .map(([k, v]) => (
                          <tr key={k} className="border-b border-[var(--border)]/60">
                            <td className="py-2 pr-4">{k}</td>
                            <td className="py-2 text-right tabular-nums">{fmt(v)}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-[var(--muted)]">{cqc.note}</p>
              </>
            ) : (
              <p>
                {cqc.note} The CQC publishes its active locations dataset at{" "}
                <a href={cqc.source_url} rel="noopener noreferrer" className="text-[var(--brand-primary)] underline">
                  cqc.org.uk
                </a>
                . CQC data covers England only; Companies House data in this index covers the
                whole of the UK.
              </p>
            )}
          </Section>

          <Section id="formations-seasonality" title="Monthly formations and seasonality (all care SIC codes)">
            <p>
              A deeper, monthly-cadence read of care company formations, built from the same
              Companies House data using the estate&apos;s shared research-ingestion engine. It adds a
              sixth SIC code (88990, other social work activities not elsewhere classified, where
              supported-living operators frequently register) and computes the average number of
              incorporations by calendar month across all settled years, to show whether care
              company formation is seasonal.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              <Stat
                value={fmt(formations.headline.all_care_cos_ttm ?? 0)}
                label="care company incorporations, trailing 12 months (all 6 SIC codes, deduplicated)"
              />
              <Stat
                value={fmt(formations.headline.care_cos_settled ?? 0)}
                label={`residential nursing (87100) incorporations, ${monthLabel(formations.headline.last_settled_month)}`}
              />
              <Stat
                value={fmtNet(formations.headline.care_cos_yoy_pct ?? 0) + "%"}
                label="residential nursing incorporations, year on year"
              />
            </div>
            <h3 className="mt-6 text-lg font-semibold text-[var(--ink)]">
              Seasonality: average incorporations by calendar month
            </h3>
            <p>
              Each bar is the average number of new care companies (across all 6 SIC codes,
              deduplicated) incorporated in that calendar month, averaged across every settled year
              in the series. A flat pattern would mean no seasonality; a peak in a given month
              suggests founders cluster new registrations around it (for example, the start of a new
              tax year or calendar year).
            </p>
            <div className="not-prose mt-4 rounded-xl border border-[var(--border)] bg-white p-4 sm:p-6">
              <SequentialBarChart
                rows={formationsSeasonality.map((s) => ({ label: s.monthName, value: s.avgCount }))}
              />
            </div>
            <p className="text-xs text-[var(--muted)]">
              Based on {formationsSeasonality[0]?.yearsOfData ?? 0} years of settled monthly data
              through {monthLabel(formations.meta.incorporations_settled_through)}. The most recent{" "}
              {formations.meta.provisional_months.length} month(s) are provisional (Companies House
              indexing lag) and excluded.
            </p>
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
              Data from the{" "}
              <a
                href={meta.source_url}
                rel="noopener noreferrer"
                className="text-[var(--brand-primary)] underline"
              >
                {meta.source}
              </a>
              , published under the{" "}
              <a
                href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/"
                rel="noopener noreferrer"
                className="text-[var(--brand-primary)] underline"
              >
                Open Government Licence v3.0
              </a>
              . Pull date: {meta.pull_date}. Refreshed quarterly.
            </p>
            <p className="text-sm">
              Embed this data on your own site:{" "}
              <a
                href={`${PAGE_PATH}/embed`}
                className="font-semibold text-[var(--brand-primary)] underline"
              >
                /research/care-provider-business-index/embed
              </a>
            </p>
            <p className="text-sm">
              See also the{" "}
              <a
                href="/research/uk-care-density-quality-index"
                className="font-semibold text-[var(--brand-primary)] underline"
              >
                UK Care Home Density &amp; Quality Index
              </a>
              , our region and local-authority level map of care home beds, CQC rating quality and
              closure churn.
            </p>
          </Section>

          <div className="pb-16" />
        </div>
      </main>
    </>
  );
}
