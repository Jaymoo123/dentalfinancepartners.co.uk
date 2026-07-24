import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildFaqPageJsonLd } from "@/lib/faq-page-schema";
import { ProbateWaitTimesChart, type WaitTimesPoint } from "@/components/research/ResearchCharts";
import { fmtNumber, fmtSignedWeeks, fmtWeeks, quarterLabel } from "@/lib/research/format";
import type { ProbateWaitTimesSnapshot } from "@/lib/research/types";
import snapshot from "@/data/probate-wait-times.json";

const data = snapshot as unknown as ProbateWaitTimesSnapshot;
const { meta, headline, series } = data;

const PAGE_PATH = "/research/uk-probate-wait-times-index";

const chartData: WaitTimesPoint[] = series.map((r) => ({
  quarter: quarterLabel(r.quarter),
  digital: r.mean_weeks_digital,
  paper: r.mean_weeks_paper,
}));

const HEADLINE_SENTENCE = `Probate in England and Wales took a mean of ${fmtWeeks(headline.mean_weeks_all)} in ${quarterLabel(headline.latest_quarter)}`;

export const metadata: Metadata = {
  title: `UK Probate Wait Times Index | How long probate takes, quarter by quarter | ${siteConfig.name}`,
  description: `Probate in England and Wales took a mean of 6.4 weeks in Q1 2026: 4.5 weeks for digital applications, 16.5 for paper. Official HMCTS data from 2019, updated quarterly.`,
  alternates: { canonical: `${siteConfig.url}${PAGE_PATH}` },
  openGraph: {
    title: `UK Probate Wait Times Index | ${siteConfig.name}`,
    description: `${HEADLINE_SENTENCE}. A sourced index of probate timeliness from Ministry of Justice open data.`,
    url: `${siteConfig.url}${PAGE_PATH}`,
    type: "article",
  },
};

const faqs = [
  {
    question: "How long does probate take in the UK right now?",
    answer:
      "In the latest published quarter (January to March 2026), the mean time from submitting an application to the grant being issued was 6.4 weeks across all applications in England and Wales. Digital applications averaged 4.5 weeks and paper applications 16.5 weeks. Half of all digital grants were issued within 1.3 weeks of submission.",
  },
  {
    question: "Why do paper probate applications take so much longer than digital ones?",
    answer:
      "The published data does not state a cause, but the pattern is consistent: in every recent quarter, paper applications have taken two to three times as long as digital ones on the mean measure. Paper applications are also a shrinking share of the workload, at around 17 per cent of applications in the latest quarter, and their mean wait has lengthened over the past year while digital waits have held steady.",
  },
  {
    question: "Where does this data come from?",
    answer:
      "All figures come from the probate tables published within the Ministry of Justice's Family Court Statistics Quarterly, an accredited official statistics series covering England and Wales. The latest release covers January to March 2026 and was published on 25 June 2026. The data is used under the Open Government Licence v3.0, and nothing on this page is estimated or modelled.",
  },
  {
    question: "When was probate slowest?",
    answer:
      "The worst quarter in the published series was July to September 2023, when the mean wait across all applications reached 15.0 weeks. Paper applications were slowest slightly later, averaging 23.6 weeks in January to March 2024. Waits then improved through 2024 and reached a series best of 6.0 weeks in April to June 2025.",
  },
  {
    question: "Does this index cover Scotland and Northern Ireland?",
    answer:
      "No. The Family Court Statistics Quarterly probate tables cover England and Wales only. Scotland has a separate process (confirmation) administered by the sheriff courts, and Northern Ireland has its own Probate Office, each with separately published statistics.",
  },
];

// ---------------------------------------------------------------------------
// JSON-LD
// ---------------------------------------------------------------------------

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "UK Probate Wait Times Index",
  description: `${HEADLINE_SENTENCE}, tracked from Ministry of Justice open data.`,
  inLanguage: "en-GB",
  datePublished: "2026-07-24",
  dateModified: meta.generated_at,
  author: {
    "@type": "Organization",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
  },
  publisher: { "@id": `${siteConfig.url}#organization` },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${siteConfig.url}${PAGE_PATH}`,
  },
};

const datasetSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "UK Probate Wait Times Index: grant of representation timeliness by quarter",
  description:
    "Quarterly mean and median weeks from probate application to grant, split by digital and paper channel, plus application and grant volumes, England and Wales.",
  inLanguage: "en-GB",
  license: "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
  creator: {
    "@type": "Organization",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
  },
  dateModified: meta.generated_at,
  temporalCoverage: `${meta.series_start}/${meta.latest_period}`,
  isAccessibleForFree: true,
  distribution: [
    {
      "@type": "DataDownload",
      encodingFormat: "text/csv",
      contentUrl: `${siteConfig.url}${PAGE_PATH}/data`,
    },
  ],
  variableMeasured: [
    "Applications for a grant of representation, by quarter",
    "Grants of representation issued, by quarter",
    "Applications by digital and paper channel",
    "Mean weeks from application to grant, all applications",
    "Median weeks from application to grant, all applications",
    "Mean and median weeks from application to grant, digital channel",
    "Mean and median weeks from application to grant, paper channel",
  ],
};

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

// ---------------------------------------------------------------------------

export default function UKProbateWaitTimesIndexPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqPageJsonLd(faqs)) }}
      />

      {/* Hero */}
      <section className="bg-neutral-900 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Research", href: "/research" },
              { label: "UK Probate Wait Times Index" },
            ]}
            variant="light"
          />
          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-orange-400">
            UK Probate Wait Times Index
          </p>
          <h1 className="mt-2 max-w-4xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {HEADLINE_SENTENCE}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-neutral-300">
            A sourced, quarterly read on how long HM Courts and Tribunals Service takes to issue a
            grant of representation in England and Wales, split by digital and paper applications.
            Covers every quarter from mid 2019 to {quarterLabel(headline.latest_quarter)}.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat value={fmtWeeks(headline.mean_weeks_all)} label="mean wait, all applications" />
            <Stat value={fmtWeeks(headline.mean_weeks_digital)} label="mean wait, digital applications" />
            <Stat value={fmtWeeks(headline.mean_weeks_paper)} label="mean wait, paper applications" />
            <Stat
              value={`${headline.digital_share_applications_latest_pct.toFixed(1)}%`}
              label="of applications made digitally"
            />
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-white py-10 sm:py-14">
        <div className={siteContainerLg}>
          <div className="max-w-4xl">
            {/* Key findings */}
            <div className="rounded-2xl border border-orange-500/20 bg-orange-50/60 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-orange-800">Key findings</h2>
              <ul className="mt-4 space-y-2 text-base leading-relaxed text-neutral-800">
                <li>
                  In {quarterLabel(headline.latest_quarter)} the mean time from submission to grant
                  was {fmtWeeks(headline.mean_weeks_all)} across all applications, {fmtWeeks(headline.mean_weeks_digital)} for
                  digital applications and {fmtWeeks(headline.mean_weeks_paper)} for paper.
                </li>
                <li>
                  There were {fmtNumber(headline.applications_latest)} applications for a grant of
                  representation in the quarter and {fmtNumber(headline.grants_latest)} grants issued.
                  Over the twelve months to March 2026, {fmtNumber(headline.applications_ttm)}{" "}
                  applications were made and {fmtNumber(headline.grants_ttm)} grants issued.
                </li>
                <li>
                  Digital applications made up {headline.digital_share_applications_latest_pct.toFixed(1)}%
                  of all applications in the latest quarter.
                </li>
                <li>
                  Compared with {quarterLabel(headline.yoy.vs_quarter)}, the overall mean wait moved{" "}
                  {fmtSignedWeeks(headline.yoy.mean_weeks_all_change)} weeks, the digital mean moved{" "}
                  {fmtSignedWeeks(headline.yoy.mean_weeks_digital_change)} weeks, and the paper mean moved{" "}
                  {fmtSignedWeeks(headline.yoy.mean_weeks_paper_change)} weeks.
                </li>
                <li>
                  The worst quarter on record was {quarterLabel(headline.worst_quarter.quarter)}, at a
                  mean of {fmtWeeks(headline.worst_quarter.mean_weeks_all)} across all applications. The
                  best was {quarterLabel(headline.best_quarter.quarter)}, at {fmtWeeks(headline.best_quarter.mean_weeks_all)}.
                </li>
              </ul>
              <p className="mt-4 text-xs text-neutral-500">
                Source: Ministry of Justice, Family Court Statistics Quarterly (probate tables), under
                the Open Government Licence v3.0. Figures may be cited with attribution to{" "}
                {siteConfig.name}. Nothing on this page is estimated, interpolated or adjusted.
              </p>
            </div>

            <Section id="latest" title={`Latest position (${quarterLabel(headline.latest_quarter)})`}>
              <p>
                In January to March 2026 the mean time from submission to grant across all applications
                was {fmtWeeks(headline.mean_weeks_all)}. Digital applications averaged{" "}
                {fmtWeeks(headline.mean_weeks_digital)} (median {fmtWeeks(headline.median_weeks_digital)}), while
                paper applications averaged {fmtWeeks(headline.mean_weeks_paper)} (median{" "}
                {fmtWeeks(headline.median_weeks_paper)}). Paper applications now take more than three and a
                half times as long as digital ones on the mean measure.
              </p>
              <p>
                There were {fmtNumber(headline.applications_latest)} applications for a grant of
                representation in the quarter and {fmtNumber(headline.grants_latest)} grants issued.
                Over the twelve months to March 2026, {fmtNumber(headline.applications_ttm)} applications
                were made and {fmtNumber(headline.grants_ttm)} grants were issued. Digital applications
                made up {headline.digital_share_applications_latest_pct.toFixed(1)}% of all applications in
                the latest quarter.
              </p>
              <p>
                Compared with the same quarter a year earlier, the overall mean wait rose by 0.2 weeks,
                the digital mean fell by 0.2 weeks, and the paper mean rose by 3.3 weeks. The service is
                holding steady for digital applicants while paper applications are drifting slower.
              </p>
            </Section>

            <Section id="trend" title="The trend since 2019">
              <p>
                The series opens in 2019 with mean waits of around eight weeks, at a time when almost
                all applications were on paper. Digital take-up climbed quickly: by mid 2020, roughly a
                third of applications were digital, and by 2023 more than three quarters were.
              </p>
              <p>
                The clear low point for the service was 2023. In July to September 2023 the mean wait
                across all applications reached 15.0 weeks, the worst quarter in the published series,
                with paper applications averaging 21.8 weeks. Paper waits peaked slightly later, at a
                mean of 23.6 weeks in January to March 2024.
              </p>
              <p>
                Recovery through 2024 was steady. By October to December 2024 the overall mean was back
                to 7.9 weeks, and 2025 saw the best quarter in the series: a mean of 6.0 weeks in April
                to June 2025. Since then the overall mean has held between 6.0 and 6.4 weeks, entirely
                because digital applications, which dominate the volume, are processed quickly. The
                paper channel tells a different story: paper means have worsened from 13.2 weeks in Q1
                2025 to 16.5 weeks in Q1 2026.
              </p>
              <p>
                The gap between the median and the mean is also worth reading. The digital median in Q1
                2026 was just 1.3 weeks against a mean of 4.5, which tells you most digital grants come
                through fast, while a minority of complex or stopped cases pull the average up.
              </p>
              <div className="not-prose mt-6 rounded-2xl border border-neutral-200 p-4 sm:p-6">
                <p className="mb-3 text-xs text-neutral-500">
                  Mean weeks from application to grant, digital vs paper, every quarter since{" "}
                  {quarterLabel(meta.series_start)}.
                </p>
                <ProbateWaitTimesChart data={chartData} />
              </div>
            </Section>

            <Section id="methodology" title="Methodology and sources">
              <p>
                <strong>Scope.</strong> {meta.scope}
              </p>
              <p>
                <strong>Coverage.</strong> {meta.geography}, every quarter from {quarterLabel(meta.series_start)}{" "}
                to {quarterLabel(meta.latest_period)}. {meta.notes}
              </p>
              <p>
                <strong>Updated.</strong> Data to {quarterLabel(meta.latest_period)}, generated{" "}
                {meta.generated_at}.
              </p>
              <ul className="not-prose mt-2 space-y-1 text-sm">
                {meta.sources.map((s) => (
                  <li key={s.name}>
                    <a href={s.publication_page} className="font-semibold text-orange-700 hover:text-orange-800" rel="nofollow">
                      {s.name}
                    </a>{" "}
                    <span className="text-neutral-500">({s.publisher})</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm">
                <Link href={`${PAGE_PATH}/data`} className="font-semibold text-orange-700 hover:text-orange-800">
                  Download the full quarterly series (CSV)
                </Link>
              </p>
              <p className="text-sm text-neutral-500">
                Free to cite and republish with attribution to {siteConfig.name}. This page is a data
                summary and does not constitute legal or tax advice on any individual situation.
              </p>
            </Section>

            {/* Conversion */}
            <div className="mt-10 rounded-2xl border-2 border-orange-500/20 bg-gradient-to-br from-orange-50 to-amber-50 p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-orange-700 sm:text-3xl">
                Dealing with probate and want it done right the first time?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                Paper applications and stopped cases are the slowest part of the process shown above.
                Getting the application right first time, on the digital service where possible, is the
                single biggest factor in how long your grant takes. Our team can guide you through it.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                <Link href="/probate" className="text-orange-700 hover:text-orange-800">
                  How probate works &rarr;
                </Link>
                <Link href="/calculators" className="text-orange-700 hover:text-orange-800">
                  Our calculators &rarr;
                </Link>
              </div>
              <div className="mt-8">
                <LeadForm redirectOnSuccess={false} submitLabel="Get a free probate review" />
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">Frequently asked questions</h2>
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
