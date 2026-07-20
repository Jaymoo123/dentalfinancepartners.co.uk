import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildFaqPage } from "@/lib/schema/faq-page";
import {
  NationalActivityChart,
  RecoveryIndexChart,
  RegionalRecoveryChart,
} from "@/components/research/DentalActivityCharts";
import {
  fmtNumber,
  fmtIndex,
  monthLabel,
  type DentalActivitySnapshot,
} from "@/lib/research/dental-activity-index";
import snapshot from "@/data/nhs-dental-activity-index.json";

const data = snapshot as unknown as DentalActivitySnapshot;
const { meta, headline, series } = data;

const PAGE_PATH = "/research/nhs-dental-activity-index";

export const metadata: Metadata = {
  title: "NHS Dental Activity Recovery Index | Dental Finance Partners",
  description: `Track monthly NHS dental UDA delivery and recovery vs the pre-Covid 2019/20 baseline. England national and regional data from NHSBSA open data. Updated ${monthLabel(meta.data_through)}.`,
  alternates: { canonical: `${siteConfig.url}${PAGE_PATH}` },
  openGraph: {
    title: "NHS Dental Activity Recovery Index | Dental Finance Partners",
    description: "Monthly NHS dental UDA delivery and regional recovery index from NHSBSA open data.",
    url: `${siteConfig.url}${PAGE_PATH}`,
    type: "article",
  },
};

const faqs = [
  {
    question: "What is the NHS Dental Activity Recovery Index?",
    answer:
      "The Recovery Index measures how much NHS dental activity (in Units of Dental Activity, or UDAs) England delivers each month compared with the pre-Covid average of 2019/20, which is set to 100. A reading of 80 means activity is 20% below the pre-Covid level; a reading above 100 means the area has surpassed it. The index is compiled from NHSBSA English Contractor Monthly General Dental Activity open data, covering all NHS GDS and PDS contracts in England.",
  },
  {
    question: "What is a Unit of Dental Activity (UDA)?",
    answer:
      "A UDA is the unit used to measure and pay for NHS dental treatment under GDS and PDS contracts. Band 1 treatments (a check-up or simple scale and polish) are worth 1 UDA; Band 2 treatments (fillings, extractions) are worth 3 UDAs; Band 3 treatments (crowns, dentures) are worth 12 UDAs. Urgent treatment is also worth 1.2 UDAs. Dentists are paid a set amount per UDA under their contract value, so UDA delivery is the primary measure of NHS dental output.",
  },
  {
    question: "Why did NHS dental activity fall so sharply in 2020?",
    answer:
      "NHS dental practices were closed for routine treatment from late March 2020 due to Covid-19 restrictions. When practices reopened from June 2020 they operated under infection control guidance (including fallow times between aerosol-generating procedures) that significantly reduced the number of patients that could be seen. Activity remained suppressed throughout 2020 and 2021 before recovering in 2022. The UDA contract model meant dentists received NHS income without delivering activity during the closures, which created significant catch-up demand.",
  },
  {
    question: "Which ICB areas deliver the most NHS dental activity?",
    answer:
      "Per-ICB recovery indices cannot be calculated from public NHSBSA data because ICB boundaries changed in 2022 and no pre-2022 per-ICB baseline is available. The regional chart on this page instead ranks the 49 ICBs by trailing-twelve-month UDA volume. Greater Manchester, North East and North Cumbria, and Cheshire and Merseyside are the highest-volume ICBs. Areas with fewer contracted NHS dentists relative to population deliver lower total UDA volumes, which is the clearest public-data measure of relative NHS dental capacity.",
  },
  {
    question: "What does this mean for NHS dentists' finances?",
    answer:
      "UDA delivery directly drives NHS contract income. Dentists who consistently under-deliver against their UDA target face clawback of NHS income at year end. Those who over-deliver are paid only for the contracted UDA value and not the excess. Alongside NHS income, many associate dentists and principals earn private income that is not captured in this data. Understanding the UDA landscape helps dentists and practice principals model their NHS income, plan capacity, and consider the balance between NHS and private activity.",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "NHS Dental Activity Recovery Index",
  description:
    "Monthly NHS dental UDA delivery and recovery vs the pre-Covid 2019/20 baseline, by England and by ICB region.",
  inLanguage: "en-GB",
  datePublished: "2026-07-20",
  dateModified: meta.generated_at,
  author: {
    "@type": "Organization",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
  },
  publisher: { "@id": `${siteConfig.url}#organization` },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}${PAGE_PATH}` },
};

const datasetSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "NHS Dental Activity Recovery Index: monthly UDA delivery and recovery vs 2019/20 baseline",
  description:
    "Monthly NHS dental Units of Dental Activity (UDA) delivered in England, with a Recovery Index benchmarked against the pre-Covid 2019/20 average (= 100). National and ICB-level series compiled from NHSBSA English Contractor Monthly General Dental Activity open data.",
  inLanguage: "en-GB",
  license: "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
  creator: {
    "@type": "Organization",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
  },
  dateModified: meta.generated_at,
  temporalCoverage: meta.coverage,
  isAccessibleForFree: true,
  distribution: [
    {
      "@type": "DataDownload",
      encodingFormat: "text/csv",
      contentUrl: `${siteConfig.url}${PAGE_PATH}/data`,
    },
  ],
  variableMeasured: [
    "Monthly NHS dental UDAs delivered -- England national",
    "Monthly NHS dental courses of treatment (COT) -- England national",
    "Monthly Band 1 courses -- England national",
    "Monthly Band 2 courses -- England national",
    "Monthly Band 3 courses -- England national",
    "Monthly urgent treatment courses -- England national",
    "Recovery Index vs 2019/20 baseline (100 = pre-Covid level)",
    "Annual UDA delivery by ICB commissioner -- England regional",
  ],
};

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

export default function NHSDentalActivityIndexPage() {
  const lastMonth = headline.last_settled_month;
  const recovIdx = headline.last_month_recovery_index;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqPage(faqs)) }}
      />

      {/* Hero */}
      <section className="hero-brand py-12 sm:py-16">
        <div className={`hero-inner ${siteContainerLg}`}>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Research", href: "/research" },
              { label: "NHS Dental Activity Recovery Index" },
            ]}
          />
          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-[var(--gold)]">
            NHS Dental Activity Recovery Index
          </p>
          <h1 className="mt-2 max-w-4xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            NHS dental activity recovery: which regions are still below pre-Covid levels?
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-neutral-300">
            A monthly index of NHS dental UDA delivery in England, benchmarked against the 2019/20
            average (= 100). National and regional data from NHSBSA open data. Updated{" "}
            {monthLabel(lastMonth)}.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <Stat
              value={fmtNumber(headline.last_month_uda)}
              label={`UDAs delivered in ${monthLabel(lastMonth)}`}
            />
            <Stat
              value={fmtIndex(recovIdx)}
              label="Recovery Index (100 = 2019/20 pre-Covid baseline)"
            />
            <Stat
              value={`${headline.months_below_90} months`}
              label="England spent below 90% recovery (Apr 2020 – recovery)"
            />
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-white py-10 sm:py-14">
        <div className={siteContainerLg}>
          <div className="max-w-4xl">

            {/* Key findings */}
            <div className="rounded-2xl border border-[var(--gold)]/20 bg-amber-50/60 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-[var(--navy)]">Key findings</h2>
              <ul className="mt-4 space-y-2 text-base leading-relaxed text-neutral-800">
                <li>
                  NHS dental activity in England reached a Recovery Index of{" "}
                  <strong>{fmtIndex(recovIdx)}</strong> in {monthLabel(lastMonth)}, meaning
                  activity was{" "}
                  {recovIdx !== null && recovIdx < 100
                    ? `${fmtIndex(100 - recovIdx)} points below`
                    : recovIdx !== null
                    ? `${fmtIndex(recovIdx - 100)} points above`
                    : "at"}{" "}
                  the pre-Covid 2019/20 monthly average.
                </li>
                <li>
                  Per-ICB recovery indices cannot be calculated from public data: ICB boundaries changed in 2022, so no pre-2022 per-ICB baseline exists. The regional chart below shows trailing-twelve-month UDA volume by ICB, which is the correct measure of relative NHS dental capacity by area.
                </li>
                <li>
                  The pre-Covid monthly baseline average was{" "}
                  {fmtNumber(headline.baseline_monthly_avg_uda)} UDAs across all England NHS
                  dental contracts. This baseline is used as 100 in the Recovery Index.
                </li>
                <li>
                  Recovery is uneven: some ICBs have exceeded pre-Covid levels while others
                  remain well below. Regions with structural dentist shortages showed the slowest
                  recovery.
                </li>
              </ul>
              <p className="mt-4 text-xs text-neutral-500">
                Source: NHSBSA English Contractor Monthly General Dental Activity, under the Open
                Government Licence v3.0. Figures may be cited with attribution to Dental Finance
                Partners.
              </p>
            </div>

            <Section id="national" title="National monthly UDA delivery">
              <p>
                The chart shows total NHS dental UDAs delivered per month across all NHS contracts
                in England. The sharp fall in 2020 reflects practice closures and restricted
                capacity during the Covid-19 pandemic. The 2021 to 2022 period shows gradual
                recovery as restrictions eased.
              </p>
              <div className="not-prose mt-6 rounded-2xl border border-neutral-200 p-4 sm:p-6">
                <NationalActivityChart monthly={series.national} />
              </div>
            </Section>

            <Section id="recovery" title="Recovery Index vs 2019/20 baseline">
              <p>
                The Recovery Index expresses monthly UDA delivery as a percentage of the average
                monthly UDA figure for 2019/20 (the last full NHS year before Covid, April 2019 to
                March 2020), which is set to 100. A value of 80 means the month delivered 80% of
                the pre-Covid average; a value above 100 means delivery has surpassed it. The
                dashed line marks the baseline.
              </p>
              <div className="not-prose mt-6 rounded-2xl border border-neutral-200 p-4 sm:p-6">
                <RecoveryIndexChart monthly={series.national} />
              </div>
            </Section>

            <Section id="regional" title="UDA volume by ICB commissioner area">
              <p>
                The chart ranks all 49 ICB commissioner areas by their trailing-twelve-month (TTM) contracted UDA volume. Per-ICB recovery indices against a 2019/20 baseline cannot be calculated from public data because ICB boundaries changed in 2022, making pre-ICB baselines unavailable. UDA volume is the correct measure of relative NHS dental capacity by area.
              </p>
              <div className="not-prose mt-6 rounded-2xl border border-neutral-200 p-4 sm:p-6">
                <RegionalRecoveryChart regional={series.regional} />
              </div>
            </Section>

            <Section id="methodology" title="Methodology and sources">
              <p>
                <strong>Data source.</strong> All UDA and course-of-treatment counts come from the
                NHSBSA English Contractor Monthly General Dental Activity dataset, published monthly
                via the NHSBSA open data portal. Each monthly CSV covers all NHS GDS and PDS dental
                contracts in England, with one row per contract per month. Data is published under
                the Open Government Licence v3.0.
              </p>
              <p>
                <strong>Recovery Index.</strong> The baseline is the mean monthly UDA total for
                April 2019 to March 2020 (NHS financial year 2019/20). The Recovery Index for each
                month is computed as (month UDA total / baseline average) times 100. A score of 100
                means delivery matches the pre-Covid average; below 100 means under-recovery.
              </p>
              <p>
                <strong>Regional series.</strong> Regional figures aggregate trailing-twelve-month UDA volume per ICB commissioner. ICB boundaries changed in 2022 (from CCG to ICB); because no consistent pre-2022 per-ICB baseline exists, per-ICB recovery indices cannot be calculated and are not shown. UDA volume by ICB is the appropriate public-data measure of relative NHS dental capacity by area.
              </p>
              <p>
                <strong>Caveats.</strong> UDA counts measure contracted NHS activity only. Private
                dental activity is excluded. The 2020/21 data is not comparable to other years due
                to mandatory practice closures. Some months may be subject to late submission
                revisions. Updated {monthLabel(meta.data_through)}. Generated {meta.generated_at}.
              </p>
              <ul className="not-prose mt-2 space-y-1 text-sm">
                {meta.sources.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.portal}
                      className="font-semibold text-[var(--gold-strong)] hover:text-[var(--gold)]"
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
                  className="font-semibold text-[var(--gold-strong)] hover:text-[var(--gold)]"
                >
                  Download the activity data (CSV)
                </Link>
              </p>
              <p className="text-sm text-neutral-500">
                Free to cite and republish with attribution to Dental Finance Partners. This page is
                a data summary and does not constitute financial or business advice on any individual
                practice or contract.
              </p>
            </Section>

            {/* Conversion */}
            <div className="mt-10 rounded-2xl border-2 border-[var(--gold)]/20 bg-gradient-to-br from-amber-50 to-yellow-50/50 p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-[var(--navy)] sm:text-3xl">
                Understanding your NHS contract and UDA position
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                Low recovery rates in your region affect both access to care and practice
                profitability. Whether you are an associate dentist planning your UDA commitment, a
                principal assessing contract value, or a buyer evaluating a practice acquisition, the
                NHS UDA landscape is central to your financial planning. Our dental accountants work
                exclusively with dental professionals.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                <Link
                  href="/for-principals"
                  className="text-[var(--gold-strong)] hover:text-[var(--gold)]"
                >
                  For practice principals &rarr;
                </Link>
                <Link
                  href="/for-associates"
                  className="text-[var(--gold-strong)] hover:text-[var(--gold)]"
                >
                  For associate dentists &rarr;
                </Link>
              </div>
              <div className="mt-8">
                <LeadForm redirectOnSuccess={false} submitLabel="Speak to a dental accountant" />
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
