import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildFaqPageJsonLd } from "@/lib/faq-page-schema";
import snapshot from "@/data/uk-child-maintenance-tracker.json";

interface CmsSnapshot {
  meta: {
    generated_at: string;
    edition: string;
    published: string;
    next_release: string;
    coverage: string;
    notes: string;
    sources: { name: string; publisher: string; url: string; licence: string }[];
  };
  headline: {
    quarter: string;
    quarter_label: string;
    arrangements_total: number;
    paying_parents: number;
    children_covered: number;
    children_covered_yoy_change: number;
    direct_pay_share_pct: number;
    direct_pay_arrangements: number;
    collect_and_pay_share_pct: number;
    collect_and_pay_arrangements: number;
    unassigned_share_pct: number;
    unassigned_arrangements: number;
    maintenance_due_total_gbp_m: number;
    maintenance_due_direct_pay_gbp_m: number;
    maintenance_due_collect_and_pay_gbp_m: number;
    collect_and_pay_paid_gbp_m: number;
    collect_and_pay_unpaid_gbp_m: number;
    collect_and_pay_paid_some_pct: number;
    collect_and_pay_paid_over_90pct_share_pct: number;
    collect_and_pay_paid_up_to_90pct_share_pct: number;
    cumulative_arrears_since_2012_gbp_m: number;
    cumulative_arrears_share_of_due_pct: number;
    applications_quarter: number;
    applications_year_to_march_2026: number;
    applications_yoy_pct: number;
  };
  quarterly: Record<string, number | string | null>[];
}

const data = snapshot as unknown as CmsSnapshot;
const { meta, headline } = data;

const PAGE_PATH = "/research/uk-child-maintenance-tracker";

const fmtNumber = (n: number) => n.toLocaleString("en-GB");
const fmtM = (n: number) => `£${n.toFixed(1)}m`;

const HEADLINE_SENTENCE = `Unpaid child maintenance has reached £${headline.cumulative_arrears_since_2012_gbp_m.toFixed(
  1,
)} million since the Child Maintenance Service began in 2012`;

export const metadata: Metadata = {
  title: `UK Child Maintenance Tracker | CMS caseload, compliance and arrears | ${siteConfig.name}`,
  description: `${HEADLINE_SENTENCE}. A sourced tracker of Child Maintenance Service caseloads, Direct Pay and Collect and Pay money flows, compliance and arrears, compiled from official DWP quarterly statistics. Updated with data to March 2026.`,
  alternates: { canonical: `${siteConfig.url}${PAGE_PATH}` },
  openGraph: {
    title: `UK Child Maintenance Tracker | ${siteConfig.name}`,
    description: `${HEADLINE_SENTENCE}. CMS caseloads, money flows and compliance from official DWP statistics.`,
    url: `${siteConfig.url}${PAGE_PATH}`,
    type: "article",
  },
};

const faqs = [
  {
    question: "What is the difference between Direct Pay and Collect and Pay?",
    answer:
      `Under Direct Pay, the Child Maintenance Service calculates the maintenance amount but the paying parent transfers the money directly to the receiving parent, with no collection fee. Under Collect and Pay, the CMS collects and passes on the money itself, charging the paying parent a 20 percent collection fee on top of the liability and deducting 4 percent from the receiving parent. As at March 2026, ${headline.direct_pay_share_pct} percent of arrangements used Direct Pay and ${headline.collect_and_pay_share_pct} percent used Collect and Pay.`,
  },
  {
    question: "How much child maintenance goes unpaid?",
    answer:
      `On DWP figures to March 2026, £${headline.cumulative_arrears_since_2012_gbp_m.toFixed(
        1,
      )} million of child maintenance due through the Collect and Pay service has gone unpaid since the CMS began in 2012, equal to ${headline.cumulative_arrears_share_of_due_pct} percent of all maintenance due to be paid since the start of the service. In the quarter to March 2026 alone, £${headline.collect_and_pay_unpaid_gbp_m.toFixed(
        1,
      )} million of Collect and Pay maintenance went unpaid.`,
  },
  {
    question: "How many families use the Child Maintenance Service?",
    answer:
      `As at March 2026 the CMS managed around ${fmtNumber(
        headline.arrangements_total,
      )} arrangements involving roughly ${fmtNumber(headline.paying_parents)} paying parents, covering ${(
        headline.children_covered / 1000000
      ).toFixed(1)} million children, an increase of ${fmtNumber(
        headline.children_covered_yoy_change,
      )} children on a year earlier. The service received around ${fmtNumber(
        headline.applications_year_to_march_2026,
      )} new applications in the year to March 2026.`,
  },
  {
    question: "What share of paying parents actually pay?",
    answer:
      `Compliance is only measured for Collect and Pay, where the CMS handles the money. In the quarter to March 2026, ${headline.collect_and_pay_paid_some_pct} percent of Collect and Pay paying parents paid some maintenance: ${headline.collect_and_pay_paid_over_90pct_share_pct} percent paid more than 90 percent of the amount due in the quarter and ${headline.collect_and_pay_paid_up_to_90pct_share_pct} percent paid up to 90 percent. Direct Pay compliance is not measured by DWP, because payments pass directly between parents.`,
  },
  {
    question: "Is child maintenance taxable?",
    answer:
      "No. Child maintenance payments are not taxable income for the receiving parent, and the paying parent gets no tax relief on them. The maintenance calculation itself, however, is based on the paying parent's gross taxable income as reported to HMRC, so changes in salary, dividends or pension contributions can change the liability.",
  },
  {
    question: "Where does this data come from?",
    answer:
      "All figures come from the Department for Work and Pensions Child Maintenance Service statistics, an official quarterly publication covering Great Britain, released under the Open Government Licence v3.0. This tracker is refreshed each quarter when a new edition is published; the next release is due on 29 September 2026.",
  },
];

// ---------------------------------------------------------------------------
// JSON-LD
// ---------------------------------------------------------------------------

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "UK Child Maintenance Tracker",
  description: `${HEADLINE_SENTENCE}, tracked from DWP Child Maintenance Service quarterly statistics.`,
  inLanguage: "en-GB",
  datePublished: "2026-07-24",
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
  name: "UK Child Maintenance Tracker: CMS caseload, money flows, compliance and arrears",
  description:
    "Quarterly Child Maintenance Service figures for Great Britain: maintenance due through Direct Pay and Collect and Pay, amounts paid and unpaid, compliance, applications and cumulative arrears, compiled from DWP official statistics.",
  inLanguage: "en-GB",
  license: "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
  creator: {
    "@type": "Organization",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
  },
  dateModified: meta.generated_at,
  temporalCoverage: "2026-Q1",
  spatialCoverage: "Great Britain",
  isAccessibleForFree: true,
  distribution: [
    {
      "@type": "DataDownload",
      encodingFormat: "text/csv",
      contentUrl: `${siteConfig.url}${PAGE_PATH}/data`,
    },
  ],
  variableMeasured: [
    "CMS arrangements by service type (Direct Pay, Collect and Pay)",
    "Maintenance due per quarter, total and by service type (GBP millions)",
    "Collect and Pay maintenance paid and unpaid per quarter (GBP millions)",
    "Collect and Pay compliance (share of paying parents paying some maintenance)",
    "New CMS applications per quarter",
    "Cumulative unpaid maintenance since 2012 (GBP millions)",
  ],
};

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

export default function UKChildMaintenanceTrackerPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqPageJsonLd(faqs)) }}
      />

      {/* Hero */}
      <section className="bg-neutral-900 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <Breadcrumb
            variant="light"
            items={[
              { label: "Home", href: "/" },
              { label: "Research", href: "/research" },
              { label: "UK Child Maintenance Tracker" },
            ]}
          />
          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-orange-400">
            UK Child Maintenance Tracker
          </p>
          <h1 className="mt-2 max-w-4xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {HEADLINE_SENTENCE}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-neutral-300">
            A sourced, quarterly tracker of Child Maintenance Service caseloads, money flows,
            compliance and arrears across Great Britain, compiled from official DWP statistics.
            Latest edition: data to March 2026, published 30 June 2026.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat
              value={`£${headline.cumulative_arrears_since_2012_gbp_m.toFixed(1)}m`}
              label="child maintenance unpaid since 2012"
            />
            <Stat
              value={`${(headline.children_covered / 1000000).toFixed(1)}m`}
              label="children covered by CMS arrangements"
            />
            <Stat
              value={fmtM(headline.maintenance_due_total_gbp_m)}
              label={`maintenance due in the ${headline.quarter_label}`}
            />
            <Stat
              value={`${headline.collect_and_pay_paid_some_pct}%`}
              label="of Collect and Pay parents paid some maintenance"
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
                  {"£"}
                  {headline.cumulative_arrears_since_2012_gbp_m.toFixed(1)} million of child
                  maintenance has gone unpaid since the CMS began in 2012, equal to{" "}
                  {headline.cumulative_arrears_share_of_due_pct} percent of all maintenance due to
                  be paid since the start of the service.
                </li>
                <li>
                  The CMS managed around {fmtNumber(headline.arrangements_total)} arrangements as
                  at March 2026, covering {(headline.children_covered / 1000000).toFixed(1)}{" "}
                  million children, up {fmtNumber(headline.children_covered_yoy_change)} on a year
                  earlier.
                </li>
                <li>
                  Of the {fmtM(headline.maintenance_due_total_gbp_m)} due in the{" "}
                  {headline.quarter_label}, {fmtM(headline.maintenance_due_direct_pay_gbp_m)} was
                  due through Direct Pay and{" "}
                  {fmtM(headline.maintenance_due_collect_and_pay_gbp_m)} through Collect and Pay.
                </li>
                <li>
                  Within Collect and Pay, {fmtM(headline.collect_and_pay_paid_gbp_m)} was paid and{" "}
                  {fmtM(headline.collect_and_pay_unpaid_gbp_m)} went unpaid in the quarter;{" "}
                  {headline.collect_and_pay_paid_some_pct} percent of paying parents paid some
                  maintenance, and {headline.collect_and_pay_paid_over_90pct_share_pct} percent
                  paid more than 90 percent of what they owed.
                </li>
                <li>
                  The service received around {fmtNumber(headline.applications_quarter)} new
                  applications in the quarter and{" "}
                  {fmtNumber(headline.applications_year_to_march_2026)} in the year to March 2026,
                  down {Math.abs(headline.applications_yoy_pct).toFixed(0)} percent on the previous
                  year.
                </li>
              </ul>
              <p className="mt-4 text-xs text-neutral-500">
                Source: Department for Work and Pensions, Child Maintenance Service statistics,
                data to March 2026, published under the Open Government Licence v3.0. Figures may
                be cited with attribution to {siteConfig.name}.
              </p>
            </div>

            <Section id="caseload" title="Who uses the Child Maintenance Service">
              <p>
                The CMS is the statutory scheme for child maintenance in Great Britain, used when
                separated parents do not make a purely private family based arrangement. As at
                March 2026 it managed around {fmtNumber(headline.arrangements_total)} arrangements
                involving roughly {fmtNumber(headline.paying_parents)} paying parents and covering{" "}
                {(headline.children_covered / 1000000).toFixed(1)} million children. The caseload
                continues to grow: the number of children covered rose by{" "}
                {fmtNumber(headline.children_covered_yoy_change)} over the year.
              </p>
              <div className="not-prose mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-neutral-300 text-left">
                      <th className="py-2 pr-4 font-bold text-neutral-900">Service type</th>
                      <th className="py-2 pr-4 text-right font-bold text-neutral-900">
                        Arrangements
                      </th>
                      <th className="py-2 text-right font-bold text-neutral-900">Share</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-neutral-200">
                      <td className="py-2 pr-4 text-neutral-700">Direct Pay</td>
                      <td className="py-2 pr-4 text-right text-neutral-900">
                        {fmtNumber(headline.direct_pay_arrangements)}
                      </td>
                      <td className="py-2 text-right text-neutral-900">
                        {headline.direct_pay_share_pct}%
                      </td>
                    </tr>
                    <tr className="border-b border-neutral-200">
                      <td className="py-2 pr-4 text-neutral-700">Collect and Pay</td>
                      <td className="py-2 pr-4 text-right text-neutral-900">
                        {fmtNumber(headline.collect_and_pay_arrangements)}
                      </td>
                      <td className="py-2 text-right text-neutral-900">
                        {headline.collect_and_pay_share_pct}%
                      </td>
                    </tr>
                    <tr className="border-b border-neutral-200">
                      <td className="py-2 pr-4 text-neutral-700">Not yet assigned</td>
                      <td className="py-2 pr-4 text-right text-neutral-900">
                        {fmtNumber(headline.unassigned_arrangements)}
                      </td>
                      <td className="py-2 text-right text-neutral-900">
                        {headline.unassigned_share_pct}%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-neutral-500">
                Caseload figures are rounded as published by DWP, so shares and components do not
                sum exactly.
              </p>
            </Section>

            <Section id="money" title="The money: Direct Pay vs Collect and Pay">
              <p>
                In the {headline.quarter_label}, {fmtM(headline.maintenance_due_total_gbp_m)} of
                child maintenance was due through the CMS. Most of it,{" "}
                {fmtM(headline.maintenance_due_direct_pay_gbp_m)}, was due through Direct Pay,
                where the CMS sets the amount but parents transfer the money between themselves
                with no collection fee. The remaining{" "}
                {fmtM(headline.maintenance_due_collect_and_pay_gbp_m)} was due through Collect and
                Pay, where the CMS collects the money, charging the paying parent a 20 percent
                collection fee and deducting 4 percent from the receiving parent.
              </p>
              <p>
                The fee structure matters for separated parents doing the sums: on a{" "}
                {"£"}100 weekly liability, Collect and Pay costs the paying parent{" "}
                {"£"}120 and delivers {"£"}96 to the receiving parent, so{" "}
                {"£"}24 a week is absorbed in fees. That is the price of enforcement when
                Direct Pay breaks down.
              </p>
            </Section>

            <Section id="compliance" title="Compliance and arrears">
              <p>
                Compliance is only measured where the CMS handles the money. In the{" "}
                {headline.quarter_label}, {headline.collect_and_pay_paid_some_pct} percent of
                Collect and Pay paying parents paid some maintenance:{" "}
                {headline.collect_and_pay_paid_over_90pct_share_pct} percent paid more than 90
                percent of their quarterly liability and{" "}
                {headline.collect_and_pay_paid_up_to_90pct_share_pct} percent paid up to 90
                percent. In money terms, {fmtM(headline.collect_and_pay_paid_gbp_m)} of the{" "}
                {fmtM(headline.maintenance_due_collect_and_pay_gbp_m)} due through Collect and Pay
                was paid, leaving {fmtM(headline.collect_and_pay_unpaid_gbp_m)} unpaid in a single
                quarter.
              </p>
              <p>
                Those quarterly shortfalls accumulate. Since the CMS began in 2012,{" "}
                {"£"}
                {headline.cumulative_arrears_since_2012_gbp_m.toFixed(1)} million of maintenance
                due has gone unpaid, {headline.cumulative_arrears_share_of_due_pct} percent of all
                maintenance due to be paid since the start of the service. Direct Pay
                non-compliance is not captured in these figures at all, because DWP does not
                observe payments made directly between parents, so the true amount of missed
                maintenance across both service types is higher than the published arrears figure.
              </p>
            </Section>

            <Section id="methodology" title="Methodology and sources">
              <p>
                <strong>Source data.</strong> All figures are taken from the DWP Child Maintenance
                Service statistics, the official quarterly publication covering Great Britain.
                This edition uses data to March 2026, published 30 June 2026; the next release is
                due 29 September 2026, and this tracker is refreshed each quarter.
              </p>
              <p>
                <strong>Definitions.</strong> Caseload figures are rounded as published by DWP.
                Money figures are for maintenance scheduled to be paid in the quarter.
                Compliance covers Collect and Pay only; Direct Pay payments pass between parents
                and are not observed. Cumulative arrears run from the start of the service in 2012
                and are expressed by DWP as a share of all maintenance due since then. Where a
                figure is not published, it is left blank in this tracker; nothing is estimated.
              </p>
              <ul className="not-prose mt-2 space-y-1 text-sm">
                {meta.sources.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.url}
                      className="font-semibold text-orange-700 hover:text-orange-800"
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
                  className="font-semibold text-orange-700 hover:text-orange-800"
                >
                  Download the tracker data (CSV)
                </Link>
              </p>
              <p className="text-sm text-neutral-500">
                Contains public sector information licensed under the Open Government Licence
                v3.0. Free to cite and republish with attribution to {siteConfig.name}. This page
                is a data summary and does not constitute legal or financial advice on any
                individual situation.
              </p>
            </Section>

            {/* Conversion */}
            <div className="mt-10 rounded-2xl border-2 border-orange-500/20 bg-gradient-to-br from-orange-50 to-amber-50 p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-orange-700 sm:text-3xl">
                Working out the money side of separation?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                Child maintenance is one piece of the financial picture when parents separate,
                alongside the family home, pensions and everyday budgeting. Our calculators and
                guides cover the numbers so you can see where you stand.
              </p>
              <div className="mt-8">
                <LeadForm redirectOnSuccess={false} submitLabel="Get in touch" />
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
