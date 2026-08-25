import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildFaqPageJsonLd } from "@/lib/faq-page-schema";
import { YearValueBarChart, type YearValuePoint } from "@/components/research/ResearchCharts";
import { fmtGbp, fmtGbpM, fmtNumber } from "@/lib/research/format";
import type { PensionsIhtSnapshot } from "@/lib/research/types";
import snapshot from "@/data/pensions-iht-2027.json";

const data = snapshot as unknown as PensionsIhtSnapshot;
const { meta, policy, impact, context_series, worked_model } = data;

const PAGE_PATH = "/research/pensions-inheritance-tax-2027";

const yieldChartData: YearValuePoint[] = impact.exchequer_yield_by_year.map((y) => ({
  year: y.year,
  value: y.gbp_m,
}));

const HEADLINE_SENTENCE = `From 6 April 2027 most unused pension funds count for Inheritance Tax, and HMRC expects ${fmtNumber(impact.newly_liable_pa)} estates a year to become newly liable`;

export const metadata: Metadata = {
  title: `Pensions and Inheritance Tax from April 2027 | Impact Model | ${siteConfig.name}`,
  description: `From 6 April 2027 most unused pension funds and death benefits count for Inheritance Tax. HMRC expects 10,500 newly liable estates a year and 38,500 paying more. Sourced impact model with worked examples.`,
  alternates: { canonical: `${siteConfig.url}${PAGE_PATH}` },
  openGraph: {
    title: `Pensions into Inheritance Tax from April 2027: the impact model | ${siteConfig.name}`,
    description: `${HEADLINE_SENTENCE}. A sourced impact model from HMRC's own policy paper and statistics.`,
    url: `${siteConfig.url}${PAGE_PATH}`,
    type: "article",
  },
};

const faqs = [
  {
    question: "Do pensions pay Inheritance Tax now?",
    answer:
      "Generally no. Before 6 April 2027, unused defined contribution pension funds and most discretionary death benefits sit outside the estate for Inheritance Tax. That is precisely what changes: from 6 April 2027 most unused pension funds and death benefits are counted in the estate.",
  },
  {
    question: "How many people will actually be affected?",
    answer:
      "HMRC's own impact note estimates around 10,500 estates a year will become newly liable (about 1.5% of UK deaths) and around 38,500 a year will pay more than they otherwise would, out of roughly 213,000 estates a year with inheritable pension wealth. Most estates will still pay no Inheritance Tax at all: in 2022-23 only 4.62% of UK deaths resulted in a bill.",
  },
  {
    question: "Will my spouse pay Inheritance Tax on my pension?",
    answer:
      "No. Anything passing to a surviving spouse or civil partner remains covered by the spouse exemption, including pension death benefits and survivor payments under a joint life annuity. Exempt beneficiaries will be able to take their benefits immediately.",
  },
  {
    question: "Are death in service benefits caught?",
    answer:
      "No. The consultation response confirmed that from 6 April 2027 all death in service benefits payable from a registered pension scheme are out of scope, whether the scheme is discretionary or non-discretionary. Dependants' scheme pensions from defined benefit or collective money purchase arrangements are also excluded.",
  },
  {
    question: "Who actually pays the tax on a pension from 2027?",
    answer:
      "Personal representatives (usually the executors) are liable for reporting and paying it, alongside the rest of the estate's Inheritance Tax. A new scheme will allow beneficiaries to direct the pension scheme administrator to pay the tax on their behalf directly to HMRC.",
  },
  {
    question: "What is the 60% rate people mention?",
    answer:
      "It is the effective marginal rate inside the residence nil rate band taper. The RNRB is withdrawn by £1 for every £2 an estate exceeds £2,000,000, so each £1 in that band costs 40p of tax plus 20p of clawed-back allowance. From April 2027 a pension counts towards that £2,000,000 test, so a pension can push an estate into the taper even though it never did before.",
  },
];

// ---------------------------------------------------------------------------
// JSON-LD
// ---------------------------------------------------------------------------

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Pensions into Inheritance Tax from April 2027: the impact model",
  description: `${HEADLINE_SENTENCE}, drawn from HMRC's own policy paper and statistics.`,
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
  name: "Pensions into Inheritance Tax from April 2027: impact and context figures",
  description:
    "HMRC's own impact estimates for the 2027 pensions Inheritance Tax change (newly liable estates, estates paying more, average increase, Exchequer yield), plus context figures on current IHT-taxpaying estates and liabilities.",
  inLanguage: "en-GB",
  license: "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
  creator: {
    "@type": "Organization",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
  },
  dateModified: meta.generated_at,
  isAccessibleForFree: true,
  distribution: [
    {
      "@type": "DataDownload",
      encodingFormat: "text/csv",
      contentUrl: `${siteConfig.url}${PAGE_PATH}/data`,
    },
  ],
  variableMeasured: [
    "Estates with inheritable pension wealth (2027-28)",
    "Estates newly liable for Inheritance Tax",
    "Estates paying more Inheritance Tax",
    "Average Inheritance Tax increase per estate",
    "Exchequer yield by year, 2027-28 to 2029-30",
    "Taxpaying estates and Inheritance Tax liabilities, 2020-21 to 2022-23",
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

export default function PensionsInheritanceTax2027Page() {
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
              { label: "Pensions into Inheritance Tax from April 2027" },
            ]}
            variant="light"
          />
          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-orange-400">
            Pensions into Inheritance Tax from April 2027
          </p>
          <h1 className="mt-2 max-w-4xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Pensions into Inheritance Tax from April 2027: the impact model
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-neutral-300">
            From 6 April 2027 most unused pension funds and death benefits count towards Inheritance
            Tax. A sourced read on who is affected, drawn from HMRC&apos;s own policy paper and
            statistics, with worked examples showing the effect on real estates.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat value={fmtNumber(impact.newly_liable_pa)} label="estates a year newly liable for IHT" />
            <Stat value={fmtNumber(impact.paying_more_pa)} label="estates a year paying more IHT" />
            <Stat value={fmtGbp(impact.average_iht_increase_gbp)} label="average IHT increase per estate" />
            <Stat value={fmtGbpM(impact.exchequer_yield_by_year[2]?.gbp_m)} label="Exchequer yield, 2029-30" />
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
                  HMRC expects around {fmtNumber(impact.newly_liable_pa)} estates a year to become newly
                  liable for Inheritance Tax ({impact.newly_liable_share_of_uk_deaths_pct}% of UK deaths)
                  and around {fmtNumber(impact.paying_more_pa)} a year to pay more than they otherwise
                  would, out of roughly {fmtNumber(impact.estates_with_inheritable_pension_wealth)} estates
                  a year with inheritable pension wealth.
                </li>
                <li>
                  The average Inheritance Tax increase is around {fmtGbp(impact.average_iht_increase_gbp)}{" "}
                  per estate.
                </li>
                <li>
                  HMRC expects the measure to raise {fmtGbpM(impact.exchequer_yield_by_year[0]?.gbp_m)} in{" "}
                  {impact.exchequer_yield_by_year[0]?.year}, rising to{" "}
                  {fmtGbpM(impact.exchequer_yield_by_year[2]?.gbp_m)} by {impact.exchequer_yield_by_year[2]?.year}.
                </li>
                <li>
                  It will be personal representatives, not pension scheme administrators, who are liable
                  for reporting and paying the tax, a reversal of the original consultation proposal.
                </li>
                <li>
                  Money passing to a surviving spouse or civil partner, and to registered charities,
                  remains exempt.
                </li>
              </ul>
              <p className="mt-4 text-xs text-neutral-500">
                Source: HMRC policy paper and tax information and impact note, 21 July 2025. Figures may
                be cited with attribution to {siteConfig.name}.
              </p>
            </div>

            <Section id="what-changes" title="What is changing">
              <p>{policy.what_changes}</p>
              <p>
                The change was announced at Autumn Budget 2024, consulted on between 30 October 2024 and
                22 January 2025, and confirmed in the government response and policy paper published on
                21 July 2025. HMRC&apos;s stated reason: &ldquo;{policy.stated_rationale}&rdquo;
              </p>
            </Section>

            <Section id="out-of-scope" title="What stays outside Inheritance Tax">
              <p>The consultation response confirmed several exclusions:</p>
              <ul className="not-prose list-disc space-y-2 pl-5">
                {policy.out_of_scope.map((item) => (
                  <li key={item} className="text-base leading-relaxed text-neutral-700">
                    {item}
                  </li>
                ))}
              </ul>
            </Section>

            <Section id="who-affected" title="Who is affected: HMRC's own numbers">
              <p>
                HMRC&apos;s tax information and impact note (21 July 2025) estimates that in{" "}
                {impact.reference_year}, out of around {fmtNumber(impact.estates_with_inheritable_pension_wealth)}{" "}
                estates with inheritable pension wealth, around {fmtNumber(impact.newly_liable_pa)}{" "}
                estates a year will become liable for Inheritance Tax where previously they would not
                (roughly {impact.newly_liable_share_of_uk_deaths_pct}% of UK deaths), and approximately{" "}
                {fmtNumber(impact.paying_more_pa)} estates a year will pay more Inheritance Tax than they
                otherwise would, with an average increase of around {fmtGbp(impact.average_iht_increase_gbp)}.
              </p>
              <p>
                For context, HMRC&apos;s Inheritance Tax liabilities statistics show{" "}
                {fmtNumber(context_series.years[2]?.taxpaying_estates)} taxpaying estates in{" "}
                {context_series.years[2]?.tax_year}, which is {context_series.share_of_deaths_2022_23_pct}%
                of UK deaths, with total liabilities of £{context_series.years[2]?.liabilities_gbp_bn}{" "}
                billion and an average bill of {fmtGbp(context_series.average_liability_2022_23_gbp)}.
              </p>
              <div className="not-prose mt-6 rounded-2xl border border-neutral-200 p-4 sm:p-6">
                <p className="mb-3 text-xs text-neutral-500">
                  Expected Exchequer yield from the measure, by year (£m).
                </p>
                <YearValueBarChart data={yieldChartData} label="Exchequer yield" unitPrefix="£" unitSuffix="m" />
              </div>
              <div className="not-prose mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-neutral-300 text-left">
                      <th className="py-2 pr-4 font-bold text-neutral-900">Tax year</th>
                      <th className="py-2 pr-4 text-right font-bold text-neutral-900">Taxpaying estates</th>
                      <th className="py-2 text-right font-bold text-neutral-900">IHT liabilities</th>
                    </tr>
                  </thead>
                  <tbody>
                    {context_series.years.map((y) => (
                      <tr key={y.tax_year} className="border-b border-neutral-200">
                        <td className="py-2 pr-4 text-neutral-700">{y.tax_year}</td>
                        <td className="py-2 pr-4 text-right text-neutral-900">{fmtNumber(y.taxpaying_estates)}</td>
                        <td className="py-2 text-right text-neutral-900">£{y.liabilities_gbp_bn}bn</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            <Section id="rnrb-taper" title="The residence nil rate band taper: the hidden 60% band">
              <p>
                The change interacts with the residence nil rate band (RNRB) in a way that catches
                larger estates. The RNRB, worth up to £{worked_model.assumptions.rnrb_gbp.toLocaleString("en-GB")}{" "}
                where a home passes to direct descendants, is tapered away by £1 for every £2 the estate
                exceeds £{worked_model.assumptions.rnrb_taper_threshold_gbp.toLocaleString("en-GB")}. Under
                current rules a pension pot does not count towards that threshold. From April 2027 it
                will.
              </p>
              <p>
                That means a pension can do double damage: it is taxed at {worked_model.assumptions.iht_rate_pct}%
                itself, and it can strip out RNRB that the estate would otherwise have kept. Within the
                taper band, each extra £1 of estate costs 40p of tax plus 20p of lost allowance relief, an
                effective marginal rate of 60%.
              </p>
            </Section>

            <Section id="scenarios" title="Worked scenarios (illustrations, not statistics)">
              <p>{worked_model.disclaimer}</p>
              <div className="not-prose mt-4 space-y-4">
                {worked_model.scenarios.map((s, i) => (
                  <div key={s.id} className="rounded-xl border border-neutral-200 p-5">
                    <h3 className="text-base font-bold text-neutral-900">
                      Scenario {i + 1}: {s.label}
                    </h3>
                    <div className="mt-3 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                      <div>
                        <div className="text-neutral-500">IHT today</div>
                        <div className="font-semibold text-neutral-900">{fmtGbp(s.iht_now_gbp)}</div>
                      </div>
                      <div>
                        <div className="text-neutral-500">IHT from April 2027</div>
                        <div className="font-semibold text-orange-700">{fmtGbp(s.iht_2027_gbp)}</div>
                      </div>
                      <div>
                        <div className="text-neutral-500">Pension in scenario</div>
                        <div className="font-semibold text-neutral-900">{fmtGbp(s.pension_gbp)}</div>
                      </div>
                      <div>
                        <div className="text-neutral-500">Extra IHT</div>
                        <div className="font-semibold text-neutral-900">
                          {fmtGbp(s.iht_2027_gbp - s.iht_now_gbp)}
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-600">{s.note}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4">
                Money left directly to a surviving spouse or civil partner, including pension death
                benefits, remains exempt in all cases.
              </p>
              <p>
                Want your own numbers? Use our pensions and IHT 2027 estimator to model your estate and
                pension against the April 2027 rules in under a minute.
              </p>
              <p className="not-prose">
                <Link
                  href="/calculators/pensions-iht-2027-estimator"
                  className="text-sm font-semibold text-orange-700 hover:text-orange-800"
                >
                  Pensions and IHT 2027 estimator &rarr;
                </Link>
              </p>
            </Section>

            <Section id="methodology" title="Methodology and sources">
              <p>
                Impact figures (estates with inheritable pension wealth, newly liable estates, estates
                paying more, average increase, Exchequer yield) are taken directly from HMRC&apos;s policy
                paper and tax information and impact note, &ldquo;Inheritance Tax on unused pension funds
                and death benefits&rdquo;, published 21 July 2025. Scope and process details come from
                the technical consultation &ldquo;Inheritance Tax on pensions: liability, reporting and
                payment&rdquo; and its summary of responses (both 21 July 2025). Context figures on
                taxpaying estates and liabilities come from HMRC&apos;s accredited official statistics,
                &ldquo;Inheritance Tax liabilities statistics&rdquo; commentary, updated 31 July 2025
                (latest detailed data: tax year 2022 to 2023). Worked scenarios are our own arithmetic
                from stated assumptions and are clearly labelled as illustrations.
              </p>
              <ul className="not-prose mt-2 space-y-1 text-sm">
                {meta.sources.map((s) => (
                  <li key={s.id}>
                    <a href={s.url} className="font-semibold text-orange-700 hover:text-orange-800" rel="nofollow">
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="text-sm">
                <Link href={`${PAGE_PATH}/data`} className="font-semibold text-orange-700 hover:text-orange-800">
                  Download the impact and context figures (CSV)
                </Link>
              </p>
              <p className="text-sm text-neutral-500">
                Free to cite and republish with attribution to {siteConfig.name}. This page is a data
                summary and does not constitute tax or legal advice on any individual situation.
              </p>
            </Section>

            {/* Conversion */}
            <div className="mt-10 rounded-2xl border-2 border-orange-500/20 bg-gradient-to-br from-orange-50 to-amber-50 p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-orange-700 sm:text-3xl">
                Wondering what this means for your own estate?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                If you hold a defined contribution pension, the April 2027 change may bring your estate
                into Inheritance Tax for the first time, or increase the bill you already expect. Our
                team can talk through your specific pension and estate position.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                <Link href="/inheritance-tax" className="text-orange-700 hover:text-orange-800">
                  Inheritance tax guidance &rarr;
                </Link>
                <Link
                  href="/calculators/pensions-iht-2027-estimator"
                  className="text-orange-700 hover:text-orange-800"
                >
                  Pensions and IHT 2027 estimator &rarr;
                </Link>
              </div>
              <div className="mt-8">
                <LeadForm redirectOnSuccess={false} submitLabel="Get a free IHT review" />
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
