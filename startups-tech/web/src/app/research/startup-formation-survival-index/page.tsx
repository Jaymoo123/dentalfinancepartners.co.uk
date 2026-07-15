import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { buildDatasetJsonLd } from "@/lib/schema";
import data from "@/data/startup-formation-survival-index.json";

export const metadata: Metadata = {
  title: "UK Startup Formation & Survival Index 2026",
  description:
    "Real-data index of UK tech and software company formation and status from the Companies House register. 359,507 active companies, 67,529 formed in 2025. Free, citable, methodology-transparent.",
  alternates: {
    canonical: `${siteConfig.url}/research/startup-formation-survival-index`,
  },
};

const BRAND = "#4f46e5";

// Pulls the combined totals from JSON. Zero hardcoding of figures in JSX
const combined = data.combinedTechSector;
const annual = data.annualFormations;
const quarterly = data.quarterlyChurn;
const perSic = data.perSicBreakdown;

// Compute the two broad SIC groups from perSic for the sub-sector table
// 62xxx = software/IT, 58xxx = publishing, 63xxx = data/portals
function groupActive(codes: string[]): number {
  return perSic
    .filter((r) => codes.includes(r.sicCode))
    .reduce((s, r) => s + r.active, 0);
}
function groupDissolved(codes: string[]): number {
  return perSic
    .filter((r) => codes.includes(r.sicCode))
    .reduce((s, r) => s + r.dissolved, 0);
}

const group62Active = groupActive(["62011", "62012", "62020", "62090"]);
const group62Dissolved = groupDissolved(["62011", "62012", "62020", "62090"]);
const group63Active = groupActive(["63110", "63120"]);
const group63Dissolved = groupDissolved(["63110", "63120"]);
const group58Active = groupActive(["58210", "58290"]);
const group58Dissolved = groupDissolved(["58210", "58290"]);

function fmt(n: number): string {
  return n.toLocaleString("en-GB");
}

// Most recent full-year formation figure
const latest2025 = annual.years.find((y) => y.year === "2025")!;
const latest2024 = annual.years.find((y) => y.year === "2024")!;
const formationChange = (
  ((latest2025.formations - latest2024.formations) / latest2024.formations) *
  100
).toFixed(1);

const datasetJsonLd = buildDatasetJsonLd({
  name: "UK Startup Formation and Survival Index",
  description: data.meta.description,
  url: `${siteConfig.url}/research/startup-formation-survival-index`,
  dateModified: data.meta.lastUpdated,
  sources: [
    {
      name: "Companies House Advanced Search API",
      url: "https://developer.company-information.service.gov.uk/api/docs/",
      licence: "Open Government Licence v3.0",
      publisher: "Companies House",
    },
    {
      name: "Companies House SIC code list",
      url: "https://resources.companieshouse.gov.uk/sic/",
      licence: "Open Government Licence v3.0",
      publisher: "Companies House",
    },
  ],
});

export default function StartupFormationSurvivalIndexPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: datasetJsonLd }} />
      {/* Hero */}
      <section className="border-b border-neutral-200 bg-[#1e1b4b] py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Link
            href="/research"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 uppercase tracking-wider hover:text-white transition-colors mb-6"
          >
            Research
          </Link>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            UK Startup Formation &amp; Survival Index
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            A free, citable index of UK tech and software company formation and
            status, derived from the{" "}
            <a
              href="https://developer.company-information.service.gov.uk/api/docs/"
              className="underline hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              Companies House public register
            </a>
            . Every figure here is real and reproducible. Data pulled{" "}
            {data.meta.pullDate}.
          </p>

          {/* Three headline stats */}
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="bg-white/10 border border-white/20 p-6">
              <div className="text-4xl font-bold font-mono text-white">
                {combined.activeCompanies.label}
              </div>
              <div className="mt-2 text-sm font-semibold text-white/60 uppercase tracking-wider">
                active UK tech companies
              </div>
              <p className="mt-2 text-sm text-white/60">
                On the Companies House register as at {combined.activeCompanies.asOf}.
              </p>
            </div>
            <div className="bg-white/10 border border-white/20 p-6">
              <div className="text-4xl font-bold font-mono text-white">
                {fmt(latest2025.formations)}
              </div>
              <div className="mt-2 text-sm font-semibold text-white/60 uppercase tracking-wider">
                new tech companies in 2025
              </div>
              <p className="mt-2 text-sm text-white/60">
                Up {formationChange}% on 2024 ({fmt(latest2024.formations)}).
                The highest annual total in this series.
              </p>
            </div>
            <div className="bg-white/10 border border-white/20 p-6">
              <div className="text-4xl font-bold font-mono text-white">
                {combined.totalEverRegistered.label}
              </div>
              <div className="mt-2 text-sm font-semibold text-white/60 uppercase tracking-wider">
                ever registered (all-time)
              </div>
              <p className="mt-2 text-sm text-white/60">
                Active + dissolved since Companies House records began.
              </p>
            </div>
          </div>

          <p className="mt-6 text-xs text-white/40 max-w-2xl">
            SIC codes covered: 62011, 62012, 62020, 62090, 63110, 63120,
            58210, 58290. Source:{" "}
            <a
              href="https://developer.company-information.service.gov.uk/api/docs/"
              className="underline hover:text-white/60"
              target="_blank"
              rel="noopener noreferrer"
            >
              Companies House Advanced Search API
            </a>
            . Open Government Licence v3.0.
          </p>
        </div>
      </section>

      {/* BLUF: what this measures */}
      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-4">
            What this index measures
          </h2>
          <div className="max-w-2xl rounded-md border-l-4 border-[#4f46e5] bg-neutral-50 p-6 text-neutral-700 text-base leading-relaxed">
            As at {data.meta.pullDate}, {combined.activeCompanies.label} UK
            companies registered under tech and software SIC codes are currently
            active on the Companies House register, out of{" "}
            {combined.totalEverRegistered.label} ever incorporated. This is a
            cross-sectional snapshot: it does not tell you what percentage of
            any given year's cohort survives. It tells you the current state of
            the full register.
          </div>
          <div className="mt-8 prose prose-neutral max-w-2xl text-neutral-700 text-sm leading-relaxed space-y-4">
            <p>
              The index tracks two things: <strong>formation volume</strong>{" "}
              (how many UK tech companies are incorporated each quarter and
              year) and <strong>register status</strong> (how many are
              currently active versus dissolved). Formation data runs from 2015
              to 2025 annually, and from 2020-Q1 to 2026-Q2 quarterly. Status
              data is a live snapshot from{" "}
              <a
                href="https://developer.company-information.service.gov.uk/api/docs/"
                className="text-[#4f46e5] underline hover:opacity-75"
                target="_blank"
                rel="noopener noreferrer"
              >
                the Companies House Advanced Search API
              </a>
              .
            </p>
            <p>
              This index is designed for journalists, policy researchers and
              founders who need a free, methodologically transparent alternative
              to paywalled startup data providers. Every figure is derived from
              the same public Companies House data you can query yourself, and
              the pull script is{" "}
              <a href="#methodology" className="text-[#4f46e5] underline hover:opacity-75">
                documented and re-runnable
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Annual formation trends */}
      <section className="bg-neutral-50 border-t border-b border-neutral-200 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-4">
            Annual formation trends (2015 to 2025)
          </h2>
          <p className="mb-8 max-w-2xl text-neutral-600 text-sm">
            Count of all companies incorporating under tech/software SIC codes
            in each calendar year, regardless of current status. Source:{" "}
            <a
              href="https://developer.company-information.service.gov.uk/api/docs/"
              className="text-[#4f46e5] underline hover:opacity-75"
              target="_blank"
              rel="noopener noreferrer"
            >
              Companies House Advanced Search API
            </a>
            , incorporated_from/to filter. 2026 not shown (year in progress).
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-neutral-900">
                  <th className="text-left py-3 pr-8 font-semibold text-neutral-900">
                    Year
                  </th>
                  <th className="text-right py-3 font-semibold text-neutral-900">
                    Tech company formations
                  </th>
                  <th className="text-right py-3 pl-8 font-semibold text-neutral-900">
                    Year-on-year change
                  </th>
                </tr>
              </thead>
              <tbody>
                {annual.years.map((row, i) => {
                  const prev = i > 0 ? annual.years[i - 1].formations : null;
                  const pct =
                    prev !== null
                      ? (((row.formations - prev) / prev) * 100).toFixed(1)
                      : null;
                  const isLatest = row.year === "2025";
                  return (
                    <tr
                      key={row.year}
                      className={`border-b border-neutral-100 ${isLatest ? "bg-indigo-50 font-semibold" : ""}`}
                    >
                      <td className="py-3 pr-8 text-neutral-700 font-mono">
                        {row.year}
                        {isLatest && (
                          <span className="ml-2 text-xs text-[#4f46e5] font-semibold">
                            latest full year
                          </span>
                        )}
                      </td>
                      <td className="py-3 text-right text-neutral-900 font-mono">
                        {fmt(row.formations)}
                      </td>
                      <td className="py-3 pl-8 text-right text-neutral-500 font-mono text-xs">
                        {pct !== null
                          ? `${parseFloat(pct) >= 0 ? "+" : ""}${pct}%`
                          : "n/a"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-neutral-400">
            Note: these are formations (incorporations), not trading starts. A
            company is counted from its date of incorporation regardless of when
            or whether it began trading.
          </p>
        </div>
      </section>

      {/* Quarterly formations and dissolutions */}
      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-4">
            Quarterly incorporations and dissolutions (2020-Q1 to 2026-Q2)
          </h2>
          <p className="mb-4 max-w-2xl text-neutral-600 text-sm">
            New companies incorporated and companies dissolved per quarter.
            Net = incorporations minus dissolutions. Data covers 26 quarters.
          </p>
          <div className="mb-6 rounded-md border border-amber-200 bg-amber-50 p-4 max-w-2xl text-xs text-amber-800">
            <strong>2020-Q2 anomaly note:</strong> the 892 dissolutions in
            2020-Q2 are anomalously low because Companies House suspended
            compulsory strike-off actions from April to September 2020 under
            the Corporate Insolvency and Governance Act 2020. The backlog
            cleared in 2020-Q4 (14,469) and 2021-Q1 (12,069). These three
            quarters should not be read as genuine trend signals.
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-neutral-900">
                  <th className="text-left py-3 pr-4 font-semibold text-neutral-900">
                    Quarter
                  </th>
                  <th className="text-right py-3 pr-4 font-semibold text-neutral-900">
                    Incorporations
                  </th>
                  <th className="text-right py-3 pr-4 font-semibold text-neutral-900">
                    Dissolutions
                  </th>
                  <th className="text-right py-3 font-semibold text-neutral-900">
                    Net
                  </th>
                </tr>
              </thead>
              <tbody>
                {quarterly.quarters.map((row) => {
                  const isAnomaly = row.quarter === "2020-Q2";
                  const isQ4Surge =
                    row.quarter === "2020-Q4" || row.quarter === "2021-Q1";
                  return (
                    <tr
                      key={row.quarter}
                      className={`border-b border-neutral-100 ${isAnomaly || isQ4Surge ? "bg-amber-50" : ""}`}
                    >
                      <td className="py-2 pr-4 text-neutral-700 font-mono text-xs whitespace-nowrap">
                        {row.quarter}
                        {isAnomaly && (
                          <span className="ml-1 text-amber-600">*</span>
                        )}
                        {isQ4Surge && (
                          <span className="ml-1 text-amber-600">†</span>
                        )}
                      </td>
                      <td className="py-2 pr-4 text-right text-neutral-900 font-mono text-xs">
                        {fmt(row.incorporations)}
                      </td>
                      <td className="py-2 pr-4 text-right text-neutral-700 font-mono text-xs">
                        {fmt(row.dissolutions)}
                      </td>
                      <td
                        className={`py-2 text-right font-mono text-xs font-semibold ${row.net >= 0 ? "text-emerald-700" : "text-red-600"}`}
                      >
                        {row.net >= 0 ? "+" : ""}
                        {fmt(row.net)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-neutral-400">
            * 2020-Q2: strike-off suspended (see anomaly note above). {" "}
            † 2020-Q4 / 2021-Q1: backlog clearance.
          </p>
        </div>
      </section>

      {/* Sub-sector breakdown */}
      <section className="bg-neutral-50 border-t border-b border-neutral-200 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-4">
            Sub-sector breakdown by SIC group
          </h2>
          <p className="mb-8 max-w-2xl text-neutral-600 text-sm">
            Current active and dissolved counts by SIC code group. Combined
            totals are lower than the sum of individual groups because Companies
            House deduplicates companies that list multiple SIC codes.
          </p>

          {/* Group summary */}
          <div className="grid gap-6 sm:grid-cols-3 mb-8">
            <div className="bg-white border border-neutral-200 p-6">
              <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                SIC 62xxx · Software &amp; IT services
              </div>
              <div className="text-3xl font-bold font-mono text-[#4f46e5]">
                {fmt(group62Active)}
              </div>
              <div className="text-sm text-neutral-500 mt-1">active</div>
              <div className="text-sm text-neutral-400 mt-1">
                {fmt(group62Dissolved)} dissolved (all-time)
              </div>
            </div>
            <div className="bg-white border border-neutral-200 p-6">
              <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                SIC 63xxx · Data processing &amp; web portals
              </div>
              <div className="text-3xl font-bold font-mono text-[#4f46e5]">
                {fmt(group63Active)}
              </div>
              <div className="text-sm text-neutral-500 mt-1">active</div>
              <div className="text-sm text-neutral-400 mt-1">
                {fmt(group63Dissolved)} dissolved (all-time)
              </div>
            </div>
            <div className="bg-white border border-neutral-200 p-6">
              <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                SIC 58xxx · Software publishing
              </div>
              <div className="text-3xl font-bold font-mono text-[#4f46e5]">
                {fmt(group58Active)}
              </div>
              <div className="text-sm text-neutral-500 mt-1">active</div>
              <div className="text-sm text-neutral-400 mt-1">
                {fmt(group58Dissolved)} dissolved (all-time)
              </div>
            </div>
          </div>

          {/* Per-SIC detail table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-neutral-900">
                  <th className="text-left py-3 pr-4 font-semibold text-neutral-900">
                    SIC code
                  </th>
                  <th className="text-left py-3 pr-4 font-semibold text-neutral-900 max-w-xs">
                    Description
                  </th>
                  <th className="text-right py-3 pr-4 font-semibold text-neutral-900">
                    Active
                  </th>
                  <th className="text-right py-3 font-semibold text-neutral-900">
                    Dissolved (all-time)
                  </th>
                </tr>
              </thead>
              <tbody>
                {perSic.map((row) => (
                  <tr key={row.sicCode} className="border-b border-neutral-100">
                    <td className="py-2 pr-4 text-neutral-700 font-mono text-xs whitespace-nowrap">
                      {row.sicCode}
                    </td>
                    <td className="py-2 pr-4 text-neutral-600 text-xs">
                      {row.label}
                    </td>
                    <td className="py-2 pr-4 text-right text-neutral-900 font-mono text-xs">
                      {row.activeLabel}
                    </td>
                    <td className="py-2 text-right text-neutral-500 font-mono text-xs">
                      {row.dissolvedLabel}
                    </td>
                  </tr>
                ))}
                <tr className="border-t-2 border-neutral-900 font-semibold">
                  <td className="py-3 pr-4 text-neutral-900 font-mono text-xs">
                    Combined
                  </td>
                  <td className="py-3 pr-4 text-neutral-500 text-xs">
                    (deduped by CH; lower than column sums)
                  </td>
                  <td className="py-3 pr-4 text-right text-neutral-900 font-mono text-xs">
                    {combined.activeCompanies.label}
                  </td>
                  <td className="py-3 text-right text-neutral-900 font-mono text-xs">
                    {combined.dissolvedCompanies.label}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-neutral-400">
            Source:{" "}
            <a
              href="https://resources.companieshouse.gov.uk/sic/"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Companies House SIC code list
            </a>{" "}
            and Advanced Search API. Snapshot as at {data.meta.pullDate}.
          </p>
        </div>
      </section>

      {/* Register status snapshot */}
      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-4">
            Register status snapshot
          </h2>
          <div className="max-w-2xl rounded-md border-l-4 border-amber-400 bg-amber-50 p-6 text-sm text-neutral-700 leading-relaxed mb-8">
            <strong>Read this carefully before citing the 44% figure.</strong>{" "}
            Of {combined.totalEverRegistered.label} UK tech companies ever
            registered, {combined.activeCompanies.label} ({combined.snapshotSurvivalRate.label}) are
            currently active on the Companies House register. This is a{" "}
            <strong>cross-sectional snapshot, not a cohort survival curve.</strong>{" "}
            The correct citation is: &ldquo;44% of UK tech companies on the Companies
            House register are currently active.&rdquo; It is not correct to say
            &ldquo;44% of tech startups survive.&rdquo; The snapshot mixes companies of all
            ages: a company formed last year has had far less time to fail than
            one formed in 2010. Cohort survival curves require time-series
            snapshot archiving, which is ongoing.
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="bg-neutral-50 border border-neutral-200 p-6">
              <div
                className="text-4xl font-bold font-mono"
                style={{ color: BRAND }}
              >
                {combined.snapshotSurvivalRate.label}
              </div>
              <div className="mt-2 text-sm font-semibold text-neutral-500 uppercase tracking-wider">
                currently active on register
              </div>
              <p className="mt-3 text-xs text-neutral-500">
                Cross-sectional snapshot as at {data.meta.pullDate}. See framing
                note above before citing.
              </p>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 p-6">
              <div
                className="text-4xl font-bold font-mono"
                style={{ color: BRAND }}
              >
                {combined.activeCompanies.label}
              </div>
              <div className="mt-2 text-sm font-semibold text-neutral-500 uppercase tracking-wider">
                active companies
              </div>
              <p className="mt-3 text-xs text-neutral-500">
                Status &ldquo;active&rdquo; per Companies House. This includes dormant
                companies, shell companies and companies that have not yet
                started trading.
              </p>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 p-6">
              <div className="text-4xl font-bold font-mono text-neutral-500">
                {combined.dissolvedCompanies.label}
              </div>
              <div className="mt-2 text-sm font-semibold text-neutral-500 uppercase tracking-wider">
                dissolved (all-time cumulative)
              </div>
              <p className="mt-3 text-xs text-neutral-500">
                Includes voluntary strike-offs (e.g. members&rsquo; voluntary
                liquidations by profitable founders), not only failures. Dissolved
                does not equal failed.
              </p>
            </div>
          </div>

          <div className="mt-8 max-w-2xl text-sm text-neutral-600 space-y-3">
            <p>
              <strong>Why the 44% figure should carry caveats:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-600">
              <li>
                A company with &ldquo;active&rdquo; status is not necessarily trading.
                Dormant companies, holding companies and shell vehicles all
                count as active on the register.
              </li>
              <li>
                The dissolved count includes members&rsquo; voluntary liquidations,
                a common and tax-efficient exit route for profitable founders.
                It is not a pure measure of failures or closures.
              </li>
              <li>
                SIC codes are self-reported by directors. Many non-tech businesses
                register under tech codes, and many genuine tech companies use
                non-standard codes.
              </li>
              <li>
                The snapshot rate changes every month as new companies form and
                old ones dissolve. It is a point-in-time reading, not a stable
                rate.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Survival curves forthcoming */}
      <section className="bg-neutral-50 border-t border-b border-neutral-200 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-4">
            Cohort survival curves (forthcoming)
          </h2>
          <p className="max-w-2xl text-neutral-600 text-sm leading-relaxed">
            A cohort survival curve would answer the question &ldquo;of UK tech
            companies incorporated in 2019, what percentage are still active
            today?&rdquo; This requires time-series archiving of the Companies House
            snapshot: by diffing monthly snapshots, it is possible to track
            when each cohort company left the register. Snapshot archiving
            started with this v1 pull on {data.meta.pullDate}. Cohort survival
            curves for prior years (derived from API sampling of company
            numbers) will be added in a future release when enough archived
            snapshots are available to validate the methodology. This section
            will be updated transparently. No estimated survival rates are
            stated here in advance of real data.
          </p>
          <p className="mt-4 max-w-2xl text-neutral-500 text-xs">
            If you are a researcher or journalist who wants to run the cohort
            survival analysis on the archived data, see the{" "}
            <a href="#methodology" className="text-[#4f46e5] underline hover:opacity-75">
              methodology
            </a>{" "}
            section for the re-run instructions and data licence.
          </p>
        </div>
      </section>

      {/* Methodology */}
      <section id="methodology" className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-4">
            Methodology and honest limitations
          </h2>
          <div className="max-w-2xl space-y-6 text-sm text-neutral-700 leading-relaxed">
            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">
                Source
              </h3>
              <p>
                All figures are live hit-counts from the{" "}
                <a
                  href="https://developer.company-information.service.gov.uk/api/docs/"
                  className="text-[#4f46e5] underline hover:opacity-75"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Companies House Advanced Search API
                </a>{" "}
                (Open Government Licence v3.0), pulled {data.meta.pullDate}. No
                third-party data sources are used. SIC code definitions from the{" "}
                <a
                  href="https://resources.companieshouse.gov.uk/sic/"
                  className="text-[#4f46e5] underline hover:opacity-75"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Companies House SIC code list
                </a>
                .
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">
                SIC codes included
              </h3>
              <p className="mb-2">
                62011 (leisure/entertainment software development), 62012
                (business and domestic software development), 62020 (IT
                consultancy), 62090 (other IT services), 63110 (data
                processing and hosting), 63120 (web portals), 58210 (computer
                games publishing), 58290 (other software publishing). A company
                is in-scope if any of its registered SIC codes falls in this
                set. CH deduplicates companies that list multiple in-scope SIC
                codes, so the combined total is correct to use rather than
                summing per-SIC counts.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">
                Formation counts
              </h3>
              <p>
                Count of all incorporations under the above SIC codes per
                quarter (incorporated_from / incorporated_to filter on the CH
                Advanced Search API) with no company_status restriction. This
                counts all companies ever incorporated in that window,
                regardless of whether they are currently active, dissolved or
                otherwise. Annual figures use calendar-year windows.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">
                Active / dissolved totals
              </h3>
              <p>
                Single combined API query with all 8 SIC codes and
                company_status=active or company_status=dissolved. The combined
                total is a deduplicated count; it is lower than the sum of
                per-SIC counts.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">
                Honest limitations
              </h3>
              <ol className="list-decimal list-inside space-y-3">
                <li>
                  <strong>Snapshot, not cohort survival.</strong> The active/dissolved
                  ratio (44% active as at {data.meta.pullDate}) is a
                  cross-sectional snapshot of all companies ever incorporated
                  under these SIC codes. It is not a cohort survival rate. A
                  company incorporated in 2024 has had far less time to fail
                  than one incorporated in 2010. Cite it as a snapshot rate
                  with this caveat, never as &ldquo;X% of tech startups survive.&rdquo;
                </li>
                <li>
                  <strong>SIC self-reporting noise.</strong> SIC codes are
                  chosen by directors at incorporation. Many IT-services
                  companies register under 62020 (IT consultancy) regardless of
                  their actual activity, including agencies, freelancers and
                  non-tech businesses run through a limited company. The figures
                  include a tail of companies whose primary activity is not
                  technology.
                </li>
                <li>
                  <strong>Dissolved does not mean failed.</strong> The dissolved
                  count includes members&rsquo; voluntary liquidations (a common,
                  tax-efficient exit for profitable founders), dormant shell
                  companies struck off for non-filing, genuine failures, and
                  companies that changed SIC code and were re-registered under
                  a different code.
                </li>
                <li>
                  <strong>2020-Q2 strike-off suspension anomaly.</strong>{" "}
                  Companies House suspended compulsory strike-off actions under
                  the Corporate Insolvency and Governance Act 2020 from April
                  to September 2020. 2020-Q2 shows only 892 dissolutions versus
                  a typical 8,000 to 14,000 per quarter. The backlog cleared in
                  2020-Q4 and 2021-Q1, which are correspondingly elevated. All
                  three quarters should be excluded from trend analysis.
                </li>
                <li>
                  <strong>Dormant is not trading.</strong> &ldquo;Active&rdquo; status on
                  Companies House means the company has not been struck off or
                  dissolved. It includes dormant companies that have filed
                  dormant accounts and have no trading activity.
                </li>
                <li>
                  <strong>UK-wide, no regional split in v1.</strong> England,
                  Scotland, Wales and Northern Ireland are all included. The
                  Companies House Advanced Search API does not support
                  postcode-based filtering in combination with SIC and date
                  filters at the hit-count level. A regional breakdown will be
                  added when bulk-download diffing allows postcode-based
                  aggregation.
                </li>
                <li>
                  <strong>Sole traders and partnerships excluded.</strong>{" "}
                  Companies House covers incorporated companies only. Freelance
                  developers and unincorporated partnerships are invisible in
                  this dataset.
                </li>
              </ol>
            </div>

            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">
                Re-running the pull
              </h3>
              <p>
                The pull script is at{" "}
                <code className="bg-neutral-100 px-1 rounded text-xs">
                  startups-tech/pipeline/pull_ch_startup_index.py
                </code>{" "}
                in the public repository. It requires a Companies House API key
                (free, from{" "}
                <a
                  href="https://developer.company-information.service.gov.uk/"
                  className="text-[#4f46e5] underline hover:opacity-75"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  developer.company-information.service.gov.uk
                </a>
                ) and takes approximately two minutes. Output is written to the
                same JSON file that powers this page.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sources and cite-as */}
      <section className="bg-neutral-50 border-t border-neutral-200 py-10 sm:py-12">
        <div className={siteContainerLg}>
          <h2 className="text-lg font-bold text-neutral-900 mb-3">
            Sources and how to cite
          </h2>
          <div className="max-w-2xl space-y-4 text-sm text-neutral-600">
            <div>
              <p className="font-semibold text-neutral-900">Primary source</p>
              <p>
                <a
                  href="https://developer.company-information.service.gov.uk/api/docs/"
                  className="text-[#4f46e5] underline hover:opacity-75"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Companies House Advanced Search API
                </a>
                . Publisher: Companies House (executive agency of the Department
                for Business and Trade). Licence: Open Government Licence v3.0.
                Data pulled {data.meta.pullDate}.
              </p>
            </div>
            <div>
              <p className="font-semibold text-neutral-900">SIC code reference</p>
              <p>
                <a
                  href="https://resources.companieshouse.gov.uk/sic/"
                  className="text-[#4f46e5] underline hover:opacity-75"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Companies House SIC code list
                </a>
                . Licence: Open Government Licence v3.0.
              </p>
            </div>
            <div>
              <p className="font-semibold text-neutral-900">Cite this index as</p>
              <blockquote className="border-l-4 border-neutral-300 pl-4 text-neutral-500 italic text-xs">
                {data.meta.citeAs}
              </blockquote>
            </div>
            <div>
              <p className="font-semibold text-neutral-900">Licence</p>
              <p className="text-xs">
                {data.meta.licence}
              </p>
            </div>
            <p className="text-xs text-neutral-400">
              Last updated: {data.meta.lastUpdated}.
            </p>
          </div>
        </div>
      </section>

      {/* Internal link / soft CTA */}
      <section className="bg-[#1e1b4b] py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Planning your UK tech company?
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl">
            67,529 UK tech companies incorporated in 2025. Getting the
            structure and compliance right from day one is what separates the
            ones that stay active. See our guides for founders at different
            stages.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/for/pre-seed-founders"
              className="inline-flex min-h-12 items-center justify-center bg-white px-8 py-3.5 text-sm font-semibold text-[#1e1b4b] hover:bg-white/90 transition-colors"
            >
              Pre-seed founder guide
            </Link>
            <Link
              href="/for/funded-startups"
              className="inline-flex min-h-12 items-center justify-center border border-white/30 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Funded startups
            </Link>
            <Link
              href="/calculators/rd-relief-estimator"
              className="inline-flex min-h-12 items-center justify-center border border-white/30 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              R&amp;D relief estimator
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
