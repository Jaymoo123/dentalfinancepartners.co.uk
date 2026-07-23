import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { buildDatasetJsonLd } from "@/lib/schema";
import { buildFaqPage } from "@accounting-network/web-shared/schema";
import { FormationSeasonalityChart } from "@/components/research/FormationSeasonalityChart";
import {
  deriveSeasonality,
  fmtNumber as fmtFormationNumber,
  fmtPercent as fmtFormationPercent,
  monthLabel as formationMonthLabel,
  type FormationSeasonalitySnapshot,
} from "@/lib/research/formation-seasonality";
import data from "@/data/online-seller-index.json";
import formationSnapshot from "@/data/online-seller-formation-seasonality.json";

const formationData = formationSnapshot as unknown as FormationSeasonalitySnapshot;

const faqs = [
  {
    question: "What does the UK Online Seller Business Index measure?",
    answer:
      "It tracks UK-incorporated companies registered with SIC code 47910 (retail sale via mail order houses or via internet), the primary code for Amazon FBA sellers, Shopify merchants, and marketplace operators that have incorporated as a limited company. The index reports active and dissolved counts, quarterly incorporations and dissolutions, formation-year cohort survival, and an ONS demand-side overlay (internet retail's share of all UK retail sales), all derived from official Companies House and ONS data.",
  },
  {
    question: "Why do online-retail company dissolutions keep rising?",
    answer:
      "SIC 47910 quarterly dissolutions climbed from around 6,000 to 8,000 per quarter in 2021 to 2022 to over 21,000 per quarter through 2025. Three structural drivers recur: the VAT registration threshold is measured on gross marketplace turnover (not net settlement payout), so sellers can cross it without realising; platform reporting under the UK's DAC7 rules has made incorporated sellers' transaction data visible to HMRC since January 2024; and thin margins in a fast-churning, low-barrier-to-entry sector leave little room to absorb a compliance shock.",
  },
  {
    question: "Is there a seasonal pattern to online-retail company formations?",
    answer:
      "Yes. Averaged across every complete year in the Companies House incorporation series, SIC 47910 formations peak in January and are lowest in December, a 'new year, new business' pattern consistent with a low-barrier-to-entry sector where forming a company is often the first step taken alongside a New Year resolution to start selling online. See the seasonality chart below for the exact monthly averages.",
  },
  {
    question: "How does this relate to the Online Seller Survival Index?",
    answer:
      "This index counts Companies House limited companies and LLPs specifically (SIC 47910), reporting incorporations, dissolutions, and a register-snapshot active rate. Our companion Online Seller Survival Index uses a different ONS dataset (enterprise survival by broad industry group, including sole traders and partnerships) to show what proportion of a birth-year retail cohort is still trading after 1 to 5 years. Read together: this index shows an accelerating incorporated-seller churn wave since 2022, and the survival index shows that retail as a whole survives at a below-average rate over five years even before that churn wave.",
  },
];

export const metadata: Metadata = {
  title: "UK Online Seller Business Index | Companies House SIC 47910 Data",
  description:
    "Quarterly index of UK incorporated online-retail companies: births, deaths and net change derived from Companies House SIC 47910 and ONS internet-retail sales data. Reproducible methodology, open sources.",
  alternates: {
    canonical: `${siteConfig.url}/research/online-seller-index`,
  },
};

export default function OnlineSellerIndexPage() {
  const active = data.sic47910.activeCompanies.count;
  const dissolved = data.sic47910.dissolvedCompanies.count;
  const totalEver = data.sic47910.totalEverRegistered.count;
  const activeLabel = data.sic47910.activeCompanies.label;
  const snapshotPct = data.sic47910.snapshotActiveRate.label;
  const pullDate = data.meta.lastUpdated;

  const quarters = data.quarterlyChurn47910.quarters;
  const latestQ = quarters[quarters.length - 1];
  const prevQ = quarters[quarters.length - 2];

  // 2021 lockdown cohort
  const cohort2021 = data.cohortNote.lockdownCohort2021IncorporationsLabel;
  const cohorts = data.cohortSurvival47910.cohorts;

  // ONS J4MC latest annual figure
  const onsAnnual = data.onsJ4mc.annual ?? [];
  const latestOns = onsAnnual.length > 0 ? onsAnnual[onsAnnual.length - 1] : null;

  // Secondary SICs
  const sec47990 = data.secondarySics.find((s) => s.sicCode === "47990")!;
  const sec46900 = data.secondarySics.find((s) => s.sicCode === "46900")!;

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildDatasetJsonLd({
            name: "UK Online Seller Business Index (SIC 47910)",
            description:
              "Quarterly index of UK incorporated online-retail companies: births, deaths and net change derived from Companies House SIC 47910 data and ONS internet-retail sales series J4MC. Reproducible methodology, open-government-licensed sources.",
            url: "/research/online-seller-index",
            dateModified: pullDate,
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqPage(faqs)) }}
      />
      {/* Hero */}
      <section className="border-b border-neutral-200 bg-[#1a3a5c] py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Link
            href="/research"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 uppercase tracking-wider hover:text-white transition-colors mb-6"
          >
            Research
          </Link>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            UK Online Seller Business Index.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            A quarterly index of the UK incorporated online-retail economy, derived from{" "}
            <a
              href="https://developer.company-information.service.gov.uk/api/docs/"
              className="underline hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Companies House data
            </a>{" "}
            (SIC 47910) and the{" "}
            <a
              href="https://www.ons.gov.uk/businessindustryandtrade/retailindustry/timeseries/j4mc/drsi"
              className="underline hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              ONS internet-retail sales series
            </a>
            . Company births, deaths and net change from 2021 to 2026. No survey
            estimates: every number is computed from a named official source.
          </p>
          <p className="mt-3 text-sm text-white/50">
            Last updated: {pullDate}. Next refresh: {data.meta.nextRefresh}. Published under{" "}
            <a
              href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/"
              className="underline hover:text-white/70"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Government Licence v3.0
            </a>
            .
          </p>
        </div>
      </section>

      {/* Headline stat cards */}
      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-2">
            UK incorporated online-retail companies (SIC 47910)
          </h2>
          <p className="mb-8 max-w-2xl text-sm text-neutral-500">
            Source:{" "}
            <a
              href="https://developer.company-information.service.gov.uk/api/docs/"
              className="text-[#1a3a5c] underline hover:opacity-75"
              target="_blank"
              rel="noopener noreferrer"
            >
              Companies House Advanced Search API
            </a>
            . Retrieved {pullDate}.
          </p>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="bg-[#1a3a5c] text-white p-6">
              <div className="text-5xl font-bold font-mono">{activeLabel}</div>
              <div className="mt-2 text-sm font-semibold text-white/70 uppercase tracking-wider">
                currently active on register
              </div>
              <p className="mt-3 text-sm text-white/60">
                Companies with SIC 47910 (retail via mail order or internet) showing
                active status on the Companies House register as at {pullDate}.
              </p>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 p-6">
              <div className="text-5xl font-bold font-mono text-[#1a3a5c]">
                {dissolved.toLocaleString("en-GB")}
              </div>
              <div className="mt-2 text-sm font-semibold text-neutral-500 uppercase tracking-wider">
                dissolved (all-time, cumulative)
              </div>
              <p className="mt-3 text-sm text-neutral-600">
                All SIC 47910 companies dissolved at any point since the register began.
                This is a cumulative stock, not a rate.
              </p>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 p-6">
              <div className="text-5xl font-bold font-mono text-[#1a3a5c]">
                {totalEver.toLocaleString("en-GB")}
              </div>
              <div className="mt-2 text-sm font-semibold text-neutral-500 uppercase tracking-wider">
                total ever registered
              </div>
              <p className="mt-3 text-sm text-neutral-600">
                Active plus dissolved. {snapshotPct} of all SIC 47910 companies ever
                registered are still active. See methodology note on this figure.
              </p>
            </div>
          </div>
          <p className="mt-4 text-xs text-neutral-400 max-w-2xl">
            The {snapshotPct} figure is a register snapshot, NOT a cohort survival rate. It
            mixes companies of all ages and is inflated by recently formed companies that have not
            yet had time to fail. See the methodology section.
          </p>
        </div>
      </section>

      {/* 2021 lockdown cohort callout */}
      <section className="bg-[#1a3a5c]/5 border-t border-b border-[#1a3a5c]/20 py-10 sm:py-12">
        <div className={siteContainerLg}>
          <div className="max-w-2xl">
            <div className="text-sm font-semibold text-[#c9861b] uppercase tracking-wider mb-2">
              Lockdown boom cohort
            </div>
            <p className="text-2xl font-bold text-neutral-900 mb-3">
              {cohort2021} SIC 47910 companies incorporated in 2021
            </p>
            <p className="text-neutral-600 text-sm">
              The four quarters of 2021 produced the largest single-year incorporation wave
              in the SIC 47910 series. True cohort survival curves (how many of that 2021
              intake are still active today) require cross-referencing individual company
              incorporation and dissolution dates from the Companies House bulk snapshot.
              That analysis is planned for the next update. The quarterly births and deaths
              table below shows the aggregate dissolution wave that followed: SIC 47910
              dissolutions climbed from around 6,000 to 7,000 per quarter in 2022 to over
              21,000 per quarter in 2025.
            </p>
            <p className="mt-3 text-xs text-neutral-400">
              Source: Companies House Advanced Search API, incorporated_from/to filters.
              Retrieved {pullDate}.
            </p>
          </div>
        </div>
      </section>

      {/* Quarterly births and deaths table */}
      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-2">
            Quarterly incorporations and dissolutions: SIC 47910
          </h2>
          <p className="mb-6 max-w-2xl text-neutral-600 text-sm">
            2021-Q1 to 2026-Q2. Source:{" "}
            <a
              href="https://developer.company-information.service.gov.uk/api/docs/"
              className="text-[#1a3a5c] underline hover:opacity-75"
              target="_blank"
              rel="noopener noreferrer"
            >
              Companies House Advanced Search API
            </a>{" "}
            (incorporated_from/to and dissolved_from/to filters). Retrieved {pullDate}.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-neutral-100">
                  <th className="text-left px-3 py-2 font-semibold text-neutral-700 border border-neutral-200">
                    Quarter
                  </th>
                  <th className="text-right px-3 py-2 font-semibold text-neutral-700 border border-neutral-200">
                    Incorporations
                  </th>
                  <th className="text-right px-3 py-2 font-semibold text-neutral-700 border border-neutral-200">
                    Dissolutions
                  </th>
                  <th className="text-right px-3 py-2 font-semibold text-neutral-700 border border-neutral-200">
                    Net
                  </th>
                </tr>
              </thead>
              <tbody>
                {quarters.map((q, i) => (
                  <tr key={q.quarter} className={i % 2 === 0 ? "bg-white" : "bg-neutral-50"}>
                    <td className="px-3 py-2 font-mono text-neutral-800 border border-neutral-200">
                      {q.quarter}
                    </td>
                    <td className="px-3 py-2 text-right font-mono text-neutral-800 border border-neutral-200">
                      {q.incorporations.toLocaleString("en-GB")}
                    </td>
                    <td className="px-3 py-2 text-right font-mono text-neutral-800 border border-neutral-200">
                      {q.dissolutions.toLocaleString("en-GB")}
                    </td>
                    <td
                      className={`px-3 py-2 text-right font-mono font-semibold border border-neutral-200 ${
                        q.net >= 0 ? "text-emerald-700" : "text-red-600"
                      }`}
                    >
                      {q.net >= 0 ? "+" : ""}
                      {q.net.toLocaleString("en-GB")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-neutral-400 max-w-2xl">
            Incorporations: all companies incorporating with SIC 47910 in that quarter regardless
            of current status. Dissolutions: companies whose dissolution date falls within that
            quarter. Net = incorporations minus dissolutions.
          </p>
        </div>
      </section>

      {/* Cohort survival */}
      <section className="bg-neutral-50 border-t border-b border-neutral-200 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-2">
            Formation-year cohort survival: SIC 47910
          </h2>
          <p className="mb-6 max-w-2xl text-neutral-600 text-sm">
            Companies incorporated in each calendar year, tracked to their current register
            status. Survival at 1, 2 and 3 years = the share of that cohort not formally
            dissolved by 31 December of the formation year plus 1, 2 or 3. Source: Companies
            House Advanced Search API (company_status, incorporated_from/to and dissolved_to
            filters). Retrieved {pullDate}.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-neutral-100">
                  <th className="text-left px-3 py-2 font-semibold text-neutral-700 border border-neutral-200">
                    Formed in
                  </th>
                  <th className="text-right px-3 py-2 font-semibold text-neutral-700 border border-neutral-200">
                    Ever registered
                  </th>
                  <th className="text-right px-3 py-2 font-semibold text-neutral-700 border border-neutral-200">
                    Still active
                  </th>
                  <th className="text-right px-3 py-2 font-semibold text-neutral-700 border border-neutral-200">
                    Still active (%)
                  </th>
                  <th className="text-right px-3 py-2 font-semibold text-neutral-700 border border-neutral-200">
                    Survival at 1yr
                  </th>
                  <th className="text-right px-3 py-2 font-semibold text-neutral-700 border border-neutral-200">
                    at 2yr
                  </th>
                  <th className="text-right px-3 py-2 font-semibold text-neutral-700 border border-neutral-200">
                    at 3yr
                  </th>
                </tr>
              </thead>
              <tbody>
                {cohorts.map((c, i) => (
                  <tr key={c.year} className={i % 2 === 0 ? "bg-white" : "bg-neutral-50"}>
                    <td className="px-3 py-2 font-mono text-neutral-800 border border-neutral-200">
                      {c.year}
                    </td>
                    <td className="px-3 py-2 text-right font-mono text-neutral-800 border border-neutral-200">
                      {c.everRegistered.toLocaleString("en-GB")}
                    </td>
                    <td className="px-3 py-2 text-right font-mono text-neutral-800 border border-neutral-200">
                      {c.stillActive.toLocaleString("en-GB")}
                    </td>
                    <td className="px-3 py-2 text-right font-mono font-semibold text-[#1a3a5c] border border-neutral-200">
                      {c.stillActivePct}%
                    </td>
                    {(["1", "2", "3"] as const).map((k) => (
                      <td
                        key={k}
                        className="px-3 py-2 text-right font-mono text-neutral-800 border border-neutral-200"
                      >
                        {(c.survivalByYear as Record<string, number>)[k] !== undefined
                          ? `${(c.survivalByYear as Record<string, number>)[k]}%`
                          : "·"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-neutral-400 max-w-2xl">
            The denominator is active plus dissolved companies only; companies in liquidation,
            administration or live strike-off proceedings sit in neither bucket, so recent-cohort
            figures are slightly overstated. Formal dissolution also lags actual trading closure,
            typically by months. Compare cohorts at the same age (the survival columns), not on
            the raw still-active percentage, which is inflated for young cohorts.
          </p>
        </div>
      </section>

      {/* ONS demand overlay */}
      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-2">
            ONS demand-side overlay: internet sales as a proportion of all retail
          </h2>
          <p className="mb-6 max-w-2xl text-neutral-600 text-sm">
            Series J4MC from the{" "}
            <a
              href="https://www.ons.gov.uk/businessindustryandtrade/retailindustry/timeseries/j4mc/drsi"
              className="text-[#1a3a5c] underline hover:opacity-75"
              target="_blank"
              rel="noopener noreferrer"
            >
              ONS Retail Sales Index (DRSI)
            </a>
            . Annual figures, seasonally adjusted. Used as a demand-side external anchor
            against company incorporation rates. Retrieved {pullDate}.
          </p>
          {latestOns && (
            <div className="mb-6 bg-white border border-neutral-200 p-5 inline-block">
              <div className="text-4xl font-bold font-mono text-[#1a3a5c]">
                {latestOns.pct}%
              </div>
              <div className="mt-1 text-sm font-semibold text-neutral-500 uppercase tracking-wider">
                internet retail share of all retail ({latestOns.year})
              </div>
              <p className="mt-2 text-xs text-neutral-400">
                ONS J4MC, dataset DRSI. {latestOns.year} annual average.
              </p>
            </div>
          )}
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse max-w-lg">
              <thead>
                <tr className="bg-neutral-100">
                  <th className="text-left px-3 py-2 font-semibold text-neutral-700 border border-neutral-200">
                    Year
                  </th>
                  <th className="text-right px-3 py-2 font-semibold text-neutral-700 border border-neutral-200">
                    Internet retail share (%)
                  </th>
                </tr>
              </thead>
              <tbody>
                {onsAnnual.map((row, i) => (
                  <tr key={row.year} className={i % 2 === 0 ? "bg-white" : "bg-neutral-50"}>
                    <td className="px-3 py-2 font-mono text-neutral-800 border border-neutral-200">
                      {row.year}
                    </td>
                    <td className="px-3 py-2 text-right font-mono text-neutral-800 border border-neutral-200">
                      {row.pct}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-neutral-400 max-w-2xl">
            The 2020 peak (27.9%) reflects lockdown-driven online spending. The subsequent
            partial reversal reflects in-store recovery. 2025 at 27.4% shows internet retail
            holding just below the 2020 peak as a share of all retail sales.
          </p>
        </div>
      </section>

      {/* Secondary SIC series */}
      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-2">
            Secondary SIC series (labelled separately, never blended)
          </h2>
          <p className="mb-6 max-w-2xl text-neutral-600 text-sm">
            Two adjacent codes tracked as separate series. Neither is added to the SIC 47910
            headline. Source: Companies House Advanced Search API. Retrieved {pullDate}.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 max-w-2xl">
            <div className="border border-neutral-200 p-5">
              <div className="text-xs font-semibold text-[#c9861b] uppercase tracking-wider mb-2">
                SIC 47990
              </div>
              <div className="font-semibold text-neutral-900 mb-1">
                Other retail not in stores
              </div>
              <div className="flex gap-6 mt-3">
                <div>
                  <div className="text-2xl font-bold font-mono text-[#1a3a5c]">
                    {sec47990.activeLabel}
                  </div>
                  <div className="text-xs text-neutral-500">active</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-mono text-neutral-500">
                    {sec47990.dissolvedLabel}
                  </div>
                  <div className="text-xs text-neutral-500">dissolved (cumulative)</div>
                </div>
              </div>
            </div>
            <div className="border border-neutral-200 p-5">
              <div className="text-xs font-semibold text-[#c9861b] uppercase tracking-wider mb-2">
                SIC 46900
              </div>
              <div className="font-semibold text-neutral-900 mb-1">
                Non-specialised wholesale (common FBA-wholesaler filing code)
              </div>
              <div className="flex gap-6 mt-3">
                <div>
                  <div className="text-2xl font-bold font-mono text-[#1a3a5c]">
                    {sec46900.activeLabel}
                  </div>
                  <div className="text-xs text-neutral-500">active</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-mono text-neutral-500">
                    {sec46900.dissolvedLabel}
                  </div>
                  <div className="text-xs text-neutral-500">dissolved (cumulative)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seasonality (engine-derived, monthly series) */}
      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-2">
            Seasonality and the long-run formation trend
          </h2>
          <p className="mb-6 max-w-2xl text-neutral-600 text-sm">
            A second, independently-pulled monthly Companies House series (
            {formationMonthLabel(formationData.incorporations.monthly[0].month)} to{" "}
            {formationMonthLabel(formationData.meta.incorporations_settled_through)}), used here to
            surface month-of-year seasonality and a longer-run decade view than the quarterly table
            above. Figures on this section will not tie out exactly to the quarterly table: the two
            series come from separate live pulls of the same underlying register using slightly
            different date windows, not a single reconciled source.
          </p>
          {formationData.headline.decade && (
            <div className="mb-8 grid gap-6 sm:grid-cols-2 max-w-2xl">
              <div className="bg-[#1a3a5c] text-white p-6">
                <div className="text-4xl font-bold font-mono">
                  {fmtFormationPercent(formationData.headline.decade.change_pct, true)}
                </div>
                <div className="mt-2 text-sm font-semibold text-white/70 uppercase tracking-wider">
                  SIC 47910 formations, {formationData.headline.decade.from_year} to{" "}
                  {formationData.headline.decade.to_year}
                </div>
                <p className="mt-3 text-sm text-white/60">
                  From {fmtFormationNumber(formationData.headline.decade.from_value)} to{" "}
                  {fmtFormationNumber(formationData.headline.decade.to_value)} incorporations a year
                  ({formationData.headline.decade.multiple}&times;).
                </p>
              </div>
              <div className="bg-neutral-50 border border-neutral-200 p-6">
                <div className="text-4xl font-bold font-mono text-[#1a3a5c]">
                  {fmtFormationNumber(formationData.headline.online_retail_cos_ttm)}
                </div>
                <div className="mt-2 text-sm font-semibold text-neutral-500 uppercase tracking-wider">
                  SIC 47910 incorporations, trailing 12 months
                </div>
                <p className="mt-3 text-sm text-neutral-600">
                  {fmtFormationPercent(formationData.headline.online_retail_cos_yoy_pct)} year-on-year
                  to {formationMonthLabel(formationData.headline.last_settled_month)}.
                </p>
              </div>
            </div>
          )}
          <p className="mb-4 max-w-2xl text-neutral-600 text-sm">
            Averaged across every complete year in the series, SIC 47910 incorporations peak in
            January and fall to their lowest in December, a &quot;new year, new business&quot;
            pattern typical of a low-barrier-to-entry sector.
          </p>
          <div className="bg-white border border-neutral-200 p-4 sm:p-6 max-w-2xl">
            <FormationSeasonalityChart points={deriveSeasonality(formationData)} />
          </div>
          <p className="mt-4 text-xs text-neutral-400 max-w-2xl">
            Source: Companies House Advanced Search API, monthly incorporated_from/to filters,
            SIC 47910. {formationData.meta.provisional_months.length > 0 && (
              <>Excludes provisional months ({formationData.meta.provisional_months.join(", ")}).</>
            )}{" "}
            Retrieved {formationData.meta.generated_at}.
          </p>
        </div>
      </section>

      {/* What this index measures */}
      <section className="bg-neutral-50 border-t border-b border-neutral-200 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-6">
            What this index measures
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 max-w-3xl">
            <div className="bg-white border border-neutral-200 p-5">
              <div className="font-semibold text-neutral-900 mb-2">What the index captures</div>
              <ul className="text-sm text-neutral-600 space-y-1.5 list-disc list-inside">
                <li>Limited companies and LLPs with SIC code 47910 as primary or secondary</li>
                <li>
                  Corporate Amazon FBA sellers, Shopify merchants, and marketplace operators
                  that have incorporated
                </li>
                <li>The growth and contraction of that incorporated layer over time</li>
                <li>
                  Aggregate births and deaths by quarter (not attributed to cohorts in v1)
                </li>
              </ul>
            </div>
            <div className="bg-white border border-neutral-200 p-5">
              <div className="font-semibold text-neutral-900 mb-2">
                What the index does not capture
              </div>
              <ul className="text-sm text-neutral-600 space-y-1.5 list-disc list-inside">
                <li>
                  Sole traders and individuals selling via marketplaces (the side-hustle layer)
                </li>
                <li>
                  Companies filing under product-specific retail SIC codes (e.g. 47410
                  computers, 47640 sports goods) rather than the generic 47910
                </li>
                <li>
                  Legacy catalogue or mail-order firms that carry SIC 47910 but trade
                  primarily offline
                </li>
                <li>Dormant companies retained at Companies House but not trading</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* On-funnel links */}
      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-4">
            Tax and compliance context for online sellers
          </h2>
          <p className="mb-8 max-w-2xl text-neutral-600">
            Corporate churn in the online-retail sector tracks predictable tax and compliance
            pressure points: VAT registration thresholds reached on gross marketplace payout
            (not net settlement), platform reporting making HMRC visibility near-total, and
            the genuine cost difference between sole trader and limited company structures as
            margins compress.
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/for/amazon-sellers"
              className="group border border-neutral-200 bg-white p-5 hover:border-[#1a3a5c] transition-colors"
            >
              <div className="text-xs font-semibold text-[#c9861b] uppercase tracking-wider mb-2">
                Hub
              </div>
              <div className="font-bold text-neutral-900 group-hover:text-[#1a3a5c] transition-colors">
                Amazon sellers
              </div>
              <p className="mt-1.5 text-sm text-neutral-600">
                VAT on marketplace fees, deemed-supplier rules, and settlement reconciliation
                for FBA and FBM sellers.
              </p>
            </Link>
            <Link
              href="/for/shopify-sellers"
              className="group border border-neutral-200 bg-white p-5 hover:border-[#1a3a5c] transition-colors"
            >
              <div className="text-xs font-semibold text-[#c9861b] uppercase tracking-wider mb-2">
                Hub
              </div>
              <div className="font-bold text-neutral-900 group-hover:text-[#1a3a5c] transition-colors">
                Shopify sellers
              </div>
              <p className="mt-1.5 text-sm text-neutral-600">
                DTC merchant tax: VAT on UK and EU sales, bookkeeping for multi-currency
                payouts, and the sole-trader vs Ltd decision.
              </p>
            </Link>
            <Link
              href="/for/marketplace-sellers"
              className="group border border-neutral-200 bg-white p-5 hover:border-[#1a3a5c] transition-colors"
            >
              <div className="text-xs font-semibold text-[#c9861b] uppercase tracking-wider mb-2">
                Hub
              </div>
              <div className="font-bold text-neutral-900 group-hover:text-[#1a3a5c] transition-colors">
                Marketplace sellers
              </div>
              <p className="mt-1.5 text-sm text-neutral-600">
                eBay, Etsy, Vinted, TikTok Shop: platform reporting obligations, the trading
                allowance, and when you cross into formal self-assessment.
              </p>
            </Link>
            <Link
              href="/for/dropshippers"
              className="group border border-neutral-200 bg-white p-5 hover:border-[#1a3a5c] transition-colors"
            >
              <div className="text-xs font-semibold text-[#c9861b] uppercase tracking-wider mb-2">
                Hub
              </div>
              <div className="font-bold text-neutral-900 group-hover:text-[#1a3a5c] transition-colors">
                Dropshippers
              </div>
              <p className="mt-1.5 text-sm text-neutral-600">
                Customs, import VAT under the{" "}
                {/* ponytail: plain span — a nested <a> inside the card <Link> is invalid HTML and fails next/no-html-link-for-pages */}
                <span className="underline">£135 consignment rule</span>
                , COGS treatment, and the structural risks specific to high-volume low-margin
                models.
              </p>
            </Link>
            <Link
              href="/services/ecommerce-vat-compliance"
              className="group border border-neutral-200 bg-white p-5 hover:border-[#1a3a5c] transition-colors"
            >
              <div className="text-xs font-semibold text-[#c9861b] uppercase tracking-wider mb-2">
                Service
              </div>
              <div className="font-bold text-neutral-900 group-hover:text-[#1a3a5c] transition-colors">
                Ecommerce VAT compliance
              </div>
              <p className="mt-1.5 text-sm text-neutral-600">
                VAT registration on gross marketplace revenue, the{" "}
                <span className="underline">deemed-supplier mechanism</span>
                , and quarterly returns for multi-platform sellers.
              </p>
            </Link>
            <Link
              href="/services/settlement-payout-reconciliation"
              className="group border border-neutral-200 bg-white p-5 hover:border-[#1a3a5c] transition-colors"
            >
              <div className="text-xs font-semibold text-[#c9861b] uppercase tracking-wider mb-2">
                Service
              </div>
              <div className="font-bold text-neutral-900 group-hover:text-[#1a3a5c] transition-colors">
                Settlement and payout reconciliation
              </div>
              <p className="mt-1.5 text-sm text-neutral-600">
                Matching platform payouts to gross sales, returns, fees, and reserve holds
                across Amazon, eBay and Shopify Payments.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* VAT threshold note */}
      <section className="bg-neutral-50 border-t border-b border-neutral-200 py-10 sm:py-12">
        <div className={siteContainerLg}>
          <h2 className="text-lg font-bold text-neutral-900 mb-3">
            A recurring driver of seller closures: the VAT threshold on gross turnover
          </h2>
          <p className="max-w-2xl text-sm text-neutral-700 mb-3">
            The UK{" "}
            <a
              href="https://www.gov.uk/vat-registration/when-to-register"
              className="text-[#1a3a5c] underline hover:opacity-75"
              target="_blank"
              rel="noopener noreferrer"
            >
              VAT registration threshold
            </a>{" "}
            is measured against your gross taxable turnover, not the net payout you receive
            from a marketplace. For Amazon and eBay sellers in particular, gross sales include
            the platform&apos;s fees and fulfilment costs before any deduction: the settlement
            amount that hits your bank account is materially lower than the figure HMRC uses
            to determine whether you must register.
          </p>
          <p className="max-w-2xl text-sm text-neutral-600">
            The quarterly dissolution data above shows SIC 47910 company deaths climbing from
            around 6,000 to 8,000 per quarter in 2021 to 2022 to over 21,000 per quarter in
            2025. One structural driver: incorporated sellers who did not anticipate crossing
            the VAT threshold face back-registration obligations, interest and penalties that
            compress margins to the point where dissolution becomes rational.
          </p>
          <div className="mt-5 flex flex-wrap gap-4">
            <Link
              href="/calculators/vat-threshold-tracker"
              className="text-sm font-semibold text-[#1a3a5c] hover:underline"
            >
              Use the VAT threshold tracker
            </Link>
            <Link
              href="/vat/deemed-supplier-establishment"
              className="text-sm font-semibold text-[#1a3a5c] hover:underline"
            >
              Deemed-supplier and establishment rules
            </Link>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="bg-white py-10 sm:py-12">
        <div className={siteContainerLg}>
          <h2 className="text-lg font-bold text-neutral-900 mb-4">Methodology</h2>
          <div className="max-w-2xl space-y-4 text-sm text-neutral-600">
            <div>
              <strong className="text-neutral-900">Primary SIC code.</strong> SIC 47910
              (retail sale via mail order houses or via internet), as defined in the{" "}
              <a
                href="https://resources.companieshouse.gov.uk/sic/"
                className="text-[#1a3a5c] underline hover:opacity-75"
                target="_blank"
                rel="noopener noreferrer"
              >
                Companies House SIC table
              </a>
              . Used as the headline series for births, deaths and active counts.
            </div>
            <div>
              <strong className="text-neutral-900">Labelled secondary series.</strong> SIC 47990
              (other retail not in stores) and SIC 46900 (non-specialised wholesale, the common
              FBA-wholesaler filing code) are tracked separately and never blended silently into
              the SIC 47910 headline.
            </div>
            <div>
              <strong className="text-neutral-900">Active and dissolved counts.</strong> Live hit
              counts from the{" "}
              <a
                href="https://developer.company-information.service.gov.uk/api/docs/"
                className="text-[#1a3a5c] underline hover:opacity-75"
                target="_blank"
                rel="noopener noreferrer"
              >
                Companies House Advanced Search API
              </a>{" "}
              filtered by sic_codes and company_status (active or dissolved). The active count
              is a register snapshot as at {pullDate}, not a survival rate.
            </div>
            <div>
              <strong className="text-neutral-900">Quarterly incorporations.</strong> CH
              incorporated_from / incorporated_to date filters with no company_status restriction.
              Counts all companies ever incorporated with SIC 47910 in that quarter regardless of
              current status.
            </div>
            <div>
              <strong className="text-neutral-900">Quarterly dissolutions.</strong> CH
              dissolved_from / dissolved_to date filters. Counts companies whose dissolution date
              falls within that quarter.
            </div>
            <div>
              <strong className="text-neutral-900">ONS overlay.</strong> Series J4MC (internet
              retail as a proportion of all retail sales, seasonally adjusted) from the{" "}
              <a
                href="https://www.ons.gov.uk/businessindustryandtrade/retailindustry/timeseries/j4mc/drsi"
                className="text-[#1a3a5c] underline hover:opacity-75"
                target="_blank"
                rel="noopener noreferrer"
              >
                ONS Retail Sales Index (DRSI)
              </a>
              , fetched via the ONS generator CSV endpoint. Annual figures only in v1. Used as a
              demand-side external anchor against company-birth rates.
            </div>
            <div>
              <strong className="text-neutral-900">Snapshot active rate.</strong> Active
              divided by (active plus dissolved) as at the pull date. This is NOT a cohort
              survival rate: it mixes companies of all ages and is inflated by recently formed
              companies that have not yet had time to dissolve. A true cohort survival curve
              requires the Companies House bulk snapshot cross-referenced by incorporation date
              at the company level; this is planned for a future update.
            </div>
          </div>
          <div className="mt-6 max-w-2xl">
            <h3 className="text-sm font-semibold text-neutral-900 mb-2">Caveats</h3>
            <ul className="text-sm text-neutral-500 space-y-1.5 list-disc list-inside">
              {data.meta.caveats.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
          <p className="mt-6 text-sm text-neutral-500 max-w-2xl">
            <strong>Data licences:</strong> Companies House data is published under the{" "}
            <a
              href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Government Licence v3.0
            </a>
            . ONS data is published under the same licence.
          </p>
          <p className="mt-3 text-sm text-neutral-500 max-w-2xl">
            Update cadence: quarterly. Last updated: {pullDate}. Next scheduled refresh:{" "}
            {data.meta.nextRefresh}.
          </p>
          <p className="mt-3 text-xs text-neutral-400 max-w-2xl">
            Cite as: {data.meta.citeAs}
          </p>
          <p className="mt-4 text-sm">
            <Link
              href="/research/online-seller-index/data"
              className="font-semibold text-[#1a3a5c] hover:underline"
            >
              Download the quarterly churn and seasonality data (CSV)
            </Link>
          </p>
          <p className="mt-2 text-sm">
            <Link
              href="/research/online-seller-survival-index"
              className="font-semibold text-[#1a3a5c] hover:underline"
            >
              See the companion Online Seller Survival Index (ONS retail enterprise survival)
            </Link>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-6">
            Frequently asked questions
          </h2>
          <div className="max-w-2xl space-y-6">
            {faqs.map((f, i) => (
              <div key={i}>
                <h3 className="text-lg font-bold text-neutral-900">{f.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-700">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform reporting context */}
      <section className="bg-neutral-50 border-t border-b border-neutral-200 py-10 sm:py-12">
        <div className={siteContainerLg}>
          <h2 className="text-lg font-bold text-neutral-900 mb-3">
            Platform reporting: the HMRC lens on seller data
          </h2>
          <p className="max-w-2xl text-sm text-neutral-700 mb-3">
            Since{" "}
            <a
              href="https://www.gov.uk/guidance/digital-platform-reporting"
              className="text-[#1a3a5c] underline hover:opacity-75"
              target="_blank"
              rel="noopener noreferrer"
            >
              1 January 2024
            </a>
            , digital platforms (Amazon, eBay, Vinted, Etsy and others) have been required
            to report seller transaction data to HMRC under the UK&apos;s implementation of
            the OECD DAC7 rules. The incorporated-seller population tracked by this index is
            now systematically visible to HMRC in a way it was not before.
          </p>
          <div className="mt-5 flex flex-wrap gap-4">
            <Link
              href="/services/hmrc-letter-online-sales"
              className="text-sm font-semibold text-[#1a3a5c] hover:underline"
            >
              HMRC letters about online sales: what to do
            </Link>
            <Link
              href="/blog/blog-platform-reporting-rules"
              className="text-sm font-semibold text-[#1a3a5c] hover:underline"
            >
              Platform reporting rules explained
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-neutral-900 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Running an online retail business?
          </h2>
          <p className="mt-4 text-lg text-neutral-200 max-w-2xl">
            The incorporated-seller economy is more visible to HMRC than it has ever been.
            Platform reporting, gross-turnover VAT thresholds and the bookkeeping gap between
            settlement payout and taxable revenue are the three issues that drive the most
            avoidable costs for incorporated sellers.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center bg-[#c9861b] px-8 py-3.5 text-sm font-semibold text-white hover:bg-[#b5761a] transition-colors"
            >
              Speak to a specialist
            </Link>
            <Link
              href="/calculators/seller-take-home"
              className="inline-flex min-h-12 items-center justify-center border border-white/30 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Seller take-home calculator
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
