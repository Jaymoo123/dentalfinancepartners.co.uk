import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildFaqPage } from "@/lib/schema";
import {
  SchemePaysValueChart,
  SaIndividualsChart,
  NhsExceededChart,
  AllowancePathChart,
  type SchemePaysRow,
  type SaRow,
  type NhsExceededRow,
  type AllowanceRow,
} from "@/components/research/AaIndexCharts";
import {
  fmtInt,
  fmtGBP,
  fmtGBPm,
  type AaIndexSnapshot,
} from "@/lib/research/nhs-aa-index";
import snapshot from "@/data/nhs-aa-index.json";

const data = snapshot as unknown as AaIndexSnapshot;
const { meta, headline, hmrc, nhs, nhs_role_split_2019_20 } = data;

const PAGE_PATH = "/research/annual-allowance-pension-tax-index";

// ---------------------------------------------------------------------------
// Chart data arrays (plain serialisable; server -> client boundary)
// ---------------------------------------------------------------------------

const schemePaysData: SchemePaysRow[] = hmrc.series
  .filter((r) => r.aft_charges_value_gbp_m !== null)
  .map((r) => ({
    taxYear: r.tax_year,
    value: r.aft_charges_value_gbp_m as number,
    provisional: r.provisional,
  }));

const saData: SaRow[] = hmrc.series.map((r) => ({
  taxYear: r.tax_year,
  value: r.sa_individuals_over_aa_n,
  provisional: r.provisional,
  artefact: r.tax_year === "2022/23",
}));

const nhsData: NhsExceededRow[] = nhs.exceeded_aa.map((r) => ({
  taxYear: r.tax_year,
  practitioner: r.practitioner_exceeded,
  officer: r.officer_exceeded,
}));

const allowancePath: AllowanceRow[] = hmrc.series.map((r) => ({
  taxYear: r.tax_year,
  value: r.standard_aa_gbp,
}));

// ---------------------------------------------------------------------------
// FAQs (§6, exact copy)
// ---------------------------------------------------------------------------

const faqs = [
  {
    question: "Does an annual allowance charge mean a doctor has to leave the NHS pension scheme?",
    answer:
      "No. An annual allowance charge is a tax charge on pension growth above the allowance in a year, and it does not remove the member from the scheme or stop future accrual. Many members settle the charge through Scheme Pays, where the NHS scheme pays the charge to HMRC in exchange for a permanent, actuarially assessed reduction in that member's benefits. The figures in this report are gross counts of members and charges, so a member appearing in one year is still an active or deferred member of the scheme.",
  },
  {
    question: "Why does this data lag by around two years?",
    answer:
      "HMRC publishes its Private pension statistics once a year, each July, and the newest tax year it covers is around 18 to 24 months behind because annual allowance charges are reported through Self Assessment and through schemes' Accounting for Tax returns, which are filed and processed after the tax year ends. The July 2025 edition used here reaches the 2023/24 tax year, and that year is still marked provisional. The next edition is due in summer 2026.",
  },
  {
    question: "What changed in 2023/24?",
    answer:
      "The standard annual allowance rose from £40,000 to £60,000 from 6 April 2023, and the minimum tapered allowance rose from £4,000 to £10,000. A higher allowance means fewer members breach it, which is one reason Self Assessment counts fall in 2023/24. Because 2023/24 also overlaps the McCloud reporting change, the two effects should be read together, not treated as a single clean trend.",
  },
  {
    question: "What is Scheme Pays?",
    answer:
      "Scheme Pays lets a pension scheme settle a member's annual allowance charge with HMRC, so the member does not have to fund it from cash, in exchange for a permanent reduction in their scheme benefits. In the NHS scheme, mandatory Scheme Pays is available where the charge is more than £2,000 and the member's pension input in the NHS scheme alone exceeds the £60,000 standard allowance; a charge driven only by the taper below £60,000 is voluntary Scheme Pays. The election deadline is 31 July in the year after the year the charge relates to, so a 2025/26 charge must be elected by 31 July 2027. The money series in this report is HMRC's national count of charges reported and paid this way, across all UK registered pension schemes.",
  },
  {
    question: "Why did reported charges fall in 2022/23?",
    answer:
      "The fall is a reporting artefact, not a real decline. For 2022/23, public-service pension members, a group that includes NHS doctors, were directed to report their annual allowance position through HMRC's public service pension adjustment service, set up for the McCloud remedy, rather than through Self Assessment. That pulled a large block of charges out of the Self Assessment count, which dropped from 56,270 individuals in 2021/22 to 34,190. The underlying burden did not fall; it was recorded elsewhere.",
  },
  {
    question: "Is this an NHS-specific dataset?",
    answer:
      "Partly. The recurring money and count series comes from HMRC and covers all UK registered pension schemes, not the NHS alone, although HMRC states that a significant share of annual allowance charges come from public-service scheme members. The NHS-specific layer comes from NHSBSA Freedom of Information data for the England and Wales scheme, which counts how many practitioner and officer members had pension growth above the standard allowance. We keep the two clearly separate throughout, and we do not present a national money figure as if it were NHS-only.",
  },
  {
    question: "Can I use these figures?",
    answer:
      "Yes. Every source here is published under the Open Government Licence v3.0. You are free to cite the figures and download the underlying data, with attribution to Medical Accountants UK. If you are a doctor trying to work out your own annual allowance position, our NHS pension annual allowance calculator models your pension input against the £60,000 allowance and the taper, and we can review your position directly.",
  },
];

// ---------------------------------------------------------------------------
// JSON-LD
// ---------------------------------------------------------------------------

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Annual Allowance Pension Tax Index",
  description:
    "How annual allowance pension tax charges have grown across UK registered pension schemes (HMRC), with an NHS Pension Scheme lens on doctors.",
  inLanguage: "en-GB",
  datePublished: "2026-07-06",
  dateModified: meta.generated_at,
  author: { "@type": "Organization", name: siteConfig.name },
  publisher: { "@type": "Organization", name: siteConfig.name },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${siteConfig.url}${PAGE_PATH}`,
  },
};

const datasetSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "Annual Allowance Pension Tax Index: UK pension tax charges (HMRC) with an NHS Pension Scheme lens",
  description:
    "Annual counts and values of pension annual allowance charges across all UK registered pension schemes (HMRC Private pension statistics, Table 7), with an NHS Pension Scheme (England and Wales) corroboration layer from NHSBSA Freedom of Information data.",
  inLanguage: "en-GB",
  license: meta.license_url,
  creator: { "@type": "Organization", name: siteConfig.name },
  publisher: { "@type": "Organization", name: siteConfig.name },
  dateModified: meta.generated_at,
  temporalCoverage: meta.temporal_coverage,
  spatialCoverage: { "@type": "Country", name: "United Kingdom" },
  isAccessibleForFree: true,
  distribution: [
    {
      "@type": "DataDownload",
      encodingFormat: "text/csv",
      contentUrl: `${siteConfig.url}${PAGE_PATH}/data`,
    },
  ],
  variableMeasured: [
    "Annual allowance charges reported and paid via Scheme Pays (count and value), all UK registered schemes",
    "Individuals reporting pension savings above the annual allowance via Self Assessment",
    "Standard annual allowance by tax year",
    "NHS Pension Scheme members exceeding the standard annual allowance (England and Wales)",
  ],
};

const faqJsonLd = buildFaqPage(faqs);

// ---------------------------------------------------------------------------
// Presentational helpers
// ---------------------------------------------------------------------------

function Stat({
  value,
  label,
  flag,
}: {
  value: string;
  label: string;
  flag?: string;
}) {
  return (
    <div className="rounded-xl bg-white/5 p-5 ring-1 ring-white/10">
      <div className="text-3xl font-bold text-white sm:text-4xl">
        {value}
        {flag && (
          <span className="ml-1 align-super text-xs font-normal text-white/60">
            {flag}
          </span>
        )}
      </div>
      <div className="mt-1 text-sm text-white/70">{label}</div>
    </div>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 border-t border-[var(--border)] py-10 first:border-t-0"
    >
      <h2 className="text-2xl font-bold text-[var(--navy)] sm:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-[var(--ink-soft)]">
        {children}
      </div>
    </section>
  );
}

function Caption({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] italic">{children}</p>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Annual Allowance Pension Tax Index | NHS & UK data",
  description:
    "How annual allowance pension tax charges grew across UK pension schemes (HMRC data), with an NHS Pension Scheme lens on doctors. Free to cite.",
  alternates: { canonical: `${siteConfig.url}${PAGE_PATH}` },
  openGraph: {
    type: "article",
    title: "Annual Allowance Pension Tax Index | NHS & UK data",
    description:
      "Annual allowance charges across UK pension schemes, with an NHS Pension Scheme lens, from official open data.",
    url: `${siteConfig.url}${PAGE_PATH}`,
  },
};

export default function AaIndexPage() {
  return (
    <>
      {/* JSON-LD: Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {/* JSON-LD: Dataset */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />
      {/* JSON-LD: FAQPage */}
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Hero                                                                */}
      {/* ------------------------------------------------------------------ */}
      <section className="hero-brand py-12 sm:py-16">
        <div className="hero-inner">
          <div className={siteContainerLg}>
            <Breadcrumb
              variant="light"
              items={[
                { label: "Home", href: "/" },
                { label: "Research", href: "/research" },
                { label: "Annual Allowance Pension Tax Index" },
              ]}
            />
            <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-[var(--copper-light)]">
              Annual Allowance Pension Tax Index
            </p>
            <h1 className="mt-2 max-w-4xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              The annual allowance and NHS doctors: pension tax charges across UK registered
              pension schemes
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-white/80">
              A sourced read on how annual allowance pension tax has grown in the UK. The
              recurring money series is HMRC data for all UK registered pension schemes. A
              separate NHS layer, from NHSBSA Freedom of Information data for the England and
              Wales scheme, shows how doctors sit within it. Built entirely from official open
              data. Annual data, published by HMRC each July, so the latest figures are around
              two tax years behind.
            </p>

            {/* 4 hero stats */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Stat
                value={`${fmtGBPm(headline.scheme_pays_value_latest_gbp_m)}`}
                label={`annual allowance charges settled through schemes' Accounting for Tax returns (Scheme Pays) in ${headline.scheme_pays_value_latest_year}, across all UK registered pension schemes`}
                flag="provisional"
              />
              <Stat
                value={fmtInt(headline.sa_peak_individuals)}
                label={`individuals who reported pension savings above the annual allowance through Self Assessment, at the ${headline.sa_peak_year} peak (all UK registered schemes)`}
              />
              <Stat
                value={fmtInt(headline.nhs_officer_peak_2021_22)}
                label="NHS Pension Scheme officer members in England and Wales whose pension growth exceeded the standard annual allowance in 2021/22 (NHSBSA FOI snapshot)"
              />
              <Stat
                value="£215k → £60k"
                label="the standard annual allowance in 2006/07 versus 2023/24: the cap has fallen while charges climbed (all UK schemes)"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Body                                                                */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-[var(--background)] py-10 sm:py-14">
        <div className={siteContainerLg}>
          <div className="max-w-4xl">

            {/* Key facts box */}
            <div className="rounded-2xl border border-[var(--copper)]/20 bg-[var(--copper)]/5 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-[var(--copper-strong)]">Key facts</h2>
              <ul className="mt-4 space-y-2 text-base leading-relaxed text-[var(--ink)]">
                <li>
                  Across all UK registered pension schemes, £350m of annual allowance charges were
                  settled through pension schemes&rsquo; Accounting for Tax returns (Scheme Pays) in
                  2023/24, provisional (HMRC).
                </li>
                <li>
                  The value of annual allowance charges paid through Scheme Pays rose from £64m in
                  2016/17 to £350m in 2023/24 (provisional), across all UK registered pension schemes
                  (HMRC).
                </li>
                <li>
                  The number of people reporting pension savings above the annual allowance through
                  Self Assessment peaked at 56,270 in 2021/22, up from 18,720 in 2016/17, across all
                  UK registered schemes (HMRC). This is a count of individuals, not a tax charge value.
                </li>
                <li>
                  The standard annual allowance was cut from £215,000 in 2006/07 to £40,000 for most
                  of the 2016/17 to 2022/23 period, then raised to £60,000 from 2023/24, so more
                  savers were pulled over the threshold even before pensions grew (HMRC).
                </li>
                <li>
                  In the NHS Pension Scheme for England and Wales, 46,135 officer members (hospital
                  doctors and other non-practitioner staff) had pension growth above the standard annual
                  allowance in 2021/22, alongside 7,991 practitioners (GPs), on an NHSBSA Freedom of
                  Information snapshot.
                </li>
                <li>
                  The 2021/22 NHS spike reflects that year&rsquo;s high CPI revaluation of the 2015
                  pension scheme, which inflated members&rsquo; measured pension growth. It is a
                  mechanical effect of how defined-benefit growth is calculated, not a change in pay.
                </li>
                <li>
                  Reported charges appear to fall in 2022/23, but this is a reporting artefact: NHS and
                  other public-service members were directed to report 2022/23 annual allowance charges
                  through HMRC&rsquo;s public service pension adjustment service (the McCloud remedy
                  route) rather than Self Assessment. The underlying burden did not fall.
                </li>
              </ul>
              <p className="mt-4 text-xs text-[var(--muted)]">
                Source: Medical Accountants UK analysis of HMRC Private pension statistics (July 2025)
                and NHSBSA data, all under the Open Government Licence v3.0. Free to cite with
                attribution to Medical Accountants UK. This page is a data summary and not tax advice
                on any individual situation.
              </p>
            </div>

            {/* Section 1: Scheme Pays value */}
            <Section id="scheme-pays-value" title="The money settled through Scheme Pays is climbing">
              <p>
                Each bar is the total value of annual allowance charges settled through pension
                schemes&rsquo; Accounting for Tax (AfT) returns in that year, across all UK registered
                pension schemes (HMRC Private pension statistics, Table 7). This is the Scheme Pays
                route: the scheme settles the charge with HMRC in exchange for a permanent reduction in
                the member&rsquo;s benefits. The 2023/24 bar is provisional.
              </p>
              <div className="not-prose mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-6">
                <SchemePaysValueChart series={schemePaysData} />
              </div>
              <Caption>
                Scheme Pays reporting through the Accounting for Tax return began in 2012/13, so this
                series does not extend earlier. The PODS digital service (from 2020/21) improved
                reporting and may lift later years. All UK registered pension schemes (HMRC).
              </Caption>
            </Section>

            {/* Section 2: SA individuals */}
            <Section
              id="sa-individuals"
              title="Reports of pension savings above the allowance"
            >
              <p>
                Each bar shows the number of individuals who reported pension savings above the annual
                allowance through Self Assessment that year, across all UK registered pension schemes
                (HMRC). This is not a count of charges paid; it is a count of people whose pension
                input exceeded the allowance and who reported it via Self Assessment.
              </p>
              <div className="not-prose mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-6">
                <SaIndividualsChart series={saData} />
              </div>
              <Caption>
                All UK registered pension schemes (HMRC). The Taper marker (2016/17) shows where the
                count also began including members caught by the tapered allowance and the money
                purchase allowance, a definitional widening (visible step up), not purely a behavioural
                rise. The McCloud marker (2022/23) shows where the fall occurred: public-service
                members were directed to report 2022/23 charges through HMRC&rsquo;s public service
                pension adjustment service instead of Self Assessment (see note below). 2023/24
                provisional.
              </Caption>
              <div className="rounded-xl border-l-4 border-[var(--copper)] bg-[var(--copper)]/5 p-4">
                <p className="font-semibold text-[var(--navy)]">The 2016/17 taper widening</p>
                <p className="mt-1 text-sm text-[var(--ink-soft)]">
                  From 2016/17 this count also includes members caught by the tapered allowance and the
                  money purchase allowance, a definitional widening (visible step up), not purely a
                  behavioural rise.
                </p>
              </div>
              <div className="rounded-xl border-l-4 border-[var(--copper)] bg-[var(--copper)]/5 p-4">
                <p className="font-semibold text-[var(--navy)]">The 2022/23 McCloud reporting artefact</p>
                <p className="mt-1 text-sm text-[var(--ink-soft)]">
                  The 2022/23 fall (56,270 in 2021/22 to 34,190) is a reporting artefact:
                  public-service (McCloud) members were told to report 2022/23 charges through
                  HMRC&rsquo;s public service pension adjustment service instead of Self Assessment. It
                  is not a real fall in the burden.
                </p>
              </div>
            </Section>

            {/* Section 3: Allowance path */}
            <Section id="allowance-path" title="How the standard allowance has changed">
              <p>
                The step chart below shows the standard annual allowance set by policy each tax year.
                Falling allowances, not just larger pensions, drove the rise in the number of people
                caught above the limit. The chart covers all UK registered pension schemes (HMRC). The
                allowance rose from £40,000 to £60,000 from 2023/24; the 2023/24 £60,000 level is a
                legislated figure (the provisional flag applies to the accompanying charge data, not to
                the allowance itself).
              </p>
              <div className="not-prose mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-6">
                <AllowancePathChart series={allowancePath} />
              </div>
              <Caption>
                The standard annual allowance, set by policy. It fell from £215,000 (2006/07) to
                £40,000, then rose to £60,000 from 2023/24. Falling allowances, not just larger
                pensions, drove the rise in charges. All UK schemes.
              </Caption>
            </Section>

            {/* Section 4: NHS layer */}
            <Section
              id="nhs-layer"
              title="Inside the NHS Pension Scheme (England and Wales)"
            >
              <p>
                The chart below is drawn from NHSBSA Freedom of Information data (FOI-02228) for the
                NHS Pension Scheme in England and Wales only. It shows how many practitioner members
                (GPs) and officer members (hospital doctors and other non-practitioner staff) had
                pension growth exceeding the standard annual allowance in each year. The data covers
                2015/16 to 2021/22 only; 2022/23 and 2023/24 are excluded because they were not yet
                fully calculated at the snapshot date (26 September 2024). These figures count the
                standard allowance only and do not include members caught solely by the taper.
              </p>
              <div className="not-prose mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-6">
                <NhsExceededChart series={nhsData} />
              </div>
              <Caption>
                NHS Pension Scheme, England and Wales. A point-in-time NHSBSA Freedom of Information
                snapshot (data as at 26 September 2024, on the pre-McCloud-rollback basis). Counts
                members whose pension growth exceeded the standard annual allowance only, so members
                caught by the taper are not included. The 2021/22 officer spike (46,135) reflects that
                year&rsquo;s high CPI revaluation of the 2015 scheme.
              </Caption>

              {/* Secondary NHS table */}
              <div className="not-prose mt-8 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left text-xs text-[var(--muted)]">
                    NHS Pension Scheme, England and Wales (NHSBSA FOI-02228). Members whose pension
                    growth exceeded the standard annual allowance. Point-in-time snapshot; standard
                    allowance only (excludes taper cases); 2022/23 and 2023/24 omitted because they
                    were not yet fully calculated at the snapshot date.
                  </caption>
                  <thead>
                    <tr className="border-b-2 border-[var(--copper)] text-left">
                      <th className="py-2 pr-4 font-bold text-[var(--navy)]">Tax year</th>
                      <th className="py-2 pr-4 font-bold text-[var(--navy)]">
                        Practitioners over standard AA
                      </th>
                      <th className="py-2 pr-4 font-bold text-[var(--navy)]">
                        Officers over standard AA
                      </th>
                      <th className="py-2 font-bold text-[var(--navy)]">Total over standard AA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nhs.exceeded_aa.map((r) => (
                      <tr key={r.tax_year} className="border-b border-[var(--border)]">
                        <td className="py-2 pr-4 font-semibold text-[var(--navy)]">{r.tax_year}</td>
                        <td className="py-2 pr-4 text-[var(--ink-soft)]">
                          {fmtInt(r.practitioner_exceeded)}
                        </td>
                        <td className="py-2 pr-4 text-[var(--ink-soft)]">
                          {fmtInt(r.officer_exceeded)}
                        </td>
                        <td className="py-2 font-semibold text-[var(--ink-soft)]">
                          {fmtInt(r.total_exceeded)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Role-split callout */}
              <div className="mt-6 rounded-xl bg-[var(--surface-elevated)] p-4 text-sm text-[var(--ink-soft)]">
                <p>
                  In 2019/20, GPs registered{" "}
                  {fmtInt(
                    nhs_role_split_2019_20.rows.find((r) => r.employment_type === "GP")
                      ?.scheme_pays_forms ?? null
                  )}{" "}
                  Scheme Pays election forms and hospital doctors{" "}
                  {fmtInt(
                    nhs_role_split_2019_20.rows.find((r) => r.employment_type === "Hospital Doctor")
                      ?.scheme_pays_forms ?? null
                  )}
                  , together about 90% of the roughly 19,900 forms that year (NHSBSA FOI-02711,
                  submission-date basis, England and Wales). Label clearly as a single-year illustration
                  on a different counting basis from the table above, so it is not tied into any trend.
                </p>
              </div>
            </Section>

            {/* Section 5: Full HMRC series table */}
            <Section id="hmrc-series" title="The full HMRC series">
              <div className="not-prose overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left text-xs text-[var(--muted)]">
                    All UK registered pension schemes (HMRC). Scheme Pays (Accounting for Tax) columns
                    begin in 2012/13, marked n/a before then. The Self Assessment value column is
                    contributions above the allowance, not a tax charge. The 2022/23 fall in the Self
                    Assessment count is a McCloud reporting artefact (public-service members reported
                    via HMRC&rsquo;s adjustment service, see the Self Assessment section above), not a
                    real decline. Counts rounded to the nearest 10, values to the nearest £1 million.
                  </caption>
                  <thead>
                    <tr className="border-b-2 border-[var(--copper)] text-left">
                      <th className="py-2 pr-3 font-bold text-[var(--navy)] text-xs">Tax year</th>
                      <th className="py-2 pr-3 font-bold text-[var(--navy)] text-xs">Standard AA</th>
                      <th className="py-2 pr-3 font-bold text-[var(--navy)] text-xs">
                        Scheme Pays charges (AfT)
                      </th>
                      <th className="py-2 pr-3 font-bold text-[var(--navy)] text-xs">
                        Value of Scheme Pays charges
                      </th>
                      <th className="py-2 pr-3 font-bold text-[var(--navy)] text-xs">
                        Individuals over AA (SA)
                      </th>
                      <th className="py-2 pr-3 font-bold text-[var(--navy)] text-xs">
                        Value of contributions in excess of AA (SA)
                      </th>
                      <th className="py-2 font-bold text-[var(--navy)] text-xs">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hmrc.series.map((r) => {
                      const status = r.provisional
                        ? "Provisional"
                        : r.revised
                        ? "Revised"
                        : "";
                      return (
                        <tr key={r.tax_year} className="border-b border-[var(--border)]">
                          <td className="py-2 pr-3 font-semibold text-[var(--navy)] text-xs">
                            {r.tax_year}
                          </td>
                          <td className="py-2 pr-3 text-[var(--ink-soft)] text-xs">
                            {fmtGBP(r.standard_aa_gbp)}
                          </td>
                          <td className="py-2 pr-3 text-[var(--ink-soft)] text-xs">
                            {r.aft_charges_n !== null ? fmtInt(r.aft_charges_n) : "n/a"}
                          </td>
                          <td className="py-2 pr-3 text-[var(--ink-soft)] text-xs">
                            {r.aft_charges_value_gbp_m !== null
                              ? fmtGBPm(r.aft_charges_value_gbp_m)
                              : "n/a"}
                          </td>
                          <td className="py-2 pr-3 text-[var(--ink-soft)] text-xs">
                            {fmtInt(r.sa_individuals_over_aa_n)}
                          </td>
                          <td className="py-2 pr-3 text-[var(--ink-soft)] text-xs">
                            {fmtGBPm(r.sa_excess_value_gbp_m)}
                          </td>
                          <td className="py-2 text-[var(--muted)] text-xs">{status}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Section>

            {/* Section 6: Methodology */}
            <Section id="methodology" title="Methodology and sources">
              <p>
                <strong>HMRC Private pension statistics, Table 7 (annual allowance), July 2025
                edition.</strong>{" "}
                Taken: the standard annual allowance by year; the number and value of annual allowance
                charges reported through schemes&rsquo; Accounting for Tax returns (Scheme Pays),
                2012/13 onward; and the number of individuals reporting pension savings above the
                allowance through Self Assessment, plus the value of those excess contributions,
                2006/07 onward. This is all UK registered pension schemes; there is no NHS split in
                this source.
              </p>
              <p>
                <strong>NHSBSA FOI-02228.</strong>{" "}
                Taken: the number of NHS Pension Scheme (England and Wales) practitioner and officer
                members whose pension growth exceeded the standard annual allowance, 2015/16 to
                2021/22. Used as a point-in-time snapshot only.
              </p>
              <p>
                <strong>NHSBSA FOI-02711.</strong>{" "}
                Taken: the single-year 2019/20 split of Scheme Pays election forms by role (GPs,
                hospital doctors and others). Illustrative role colour only, on a different counting
                basis.
              </p>
              <p>
                <strong>
                  NHS Pension Scheme Annual Report and Accounts (section 3.3 movement table).
                </strong>{" "}
                Taken: closing active, deferred and pensioner member counts at 31 March 2023, 2024 and
                2025 (England and Wales), as population context.
              </p>

              <p className="font-semibold text-[var(--navy)]">Honesty caveats</p>
              <ol className="list-decimal pl-5 space-y-1 text-sm">
                <li>
                  Annual data with a lag of roughly 18 to 24 months; HMRC publishes each July; the
                  July 2025 edition reaches 2023/24, still provisional; next release summer 2026.
                </li>
                <li>
                  The Self Assessment money column is the value of contributions above the allowance,
                  not a tax charge. HMRC does not publish a Self Assessment annual allowance charge
                  value.
                </li>
                <li>
                  Scheme Pays (Accounting for Tax) charge values begin in 2012/13, so the money series
                  does not extend earlier.
                </li>
                <li>
                  From 2016/17 the Self Assessment count also captures tapered and money-purchase
                  allowance breaches, a definitional widening.
                </li>
                <li>
                  The 2022/23 fall in Self Assessment figures is a McCloud reporting artefact, not a
                  real decline.
                </li>
                <li>
                  Counts are gross; an annual allowance charge does not mean a member left the scheme.
                </li>
                <li>
                  NHS figures are England and Wales only (Scotland and Northern Ireland run separate
                  schemes). The FOI figures are a pre-McCloud-rollback snapshot, standard allowance
                  only, with 2022/23 and 2023/24 excluded as undercounted at the snapshot date.
                </li>
                <li>
                  The HMRC series is all UK registered pension schemes, not NHS-only; the two layers
                  are kept separate.
                </li>
              </ol>

              <ul className="not-prose mt-4 space-y-1 text-sm">
                {meta.sources.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.url}
                      className="font-semibold text-[var(--copper-strong)] hover:text-[var(--copper)]"
                      rel="nofollow"
                    >
                      {s.name}
                    </a>{" "}
                    <span className="text-[var(--muted)]">({s.publisher})</span>
                  </li>
                ))}
              </ul>

              <p className="text-sm">
                <Link
                  href={`${PAGE_PATH}/data`}
                  className="font-semibold text-[var(--copper-strong)] hover:text-[var(--copper)]"
                >
                  Download the HMRC annual allowance data (CSV)
                </Link>
              </p>

              <p className="text-sm text-[var(--muted)]">
                All sources are published under the Open Government Licence v3.0. This report is
                Medical Accountants UK analysis of HMRC and NHSBSA data.
              </p>

              <div className="rounded-xl bg-[var(--surface-elevated)] p-4 text-sm text-[var(--ink-soft)]">
                <p className="font-semibold text-[var(--navy)]">How to cite</p>
                <p className="mt-1">
                  Cite as: Medical Accountants UK, Annual Allowance Pension Tax Index, analysis of
                  HMRC Private pension statistics (July 2025) and NHSBSA data, 2026. Free to reuse
                  with attribution.
                </p>
                <p className="mt-2 text-xs text-[var(--muted)]">
                  Reviewed on each HMRC annual publication (each July). This edition uses data to the
                  2023/24 tax year.
                </p>
              </div>
            </Section>

            {/* Conversion block */}
            <div className="mt-10 rounded-2xl border-2 border-[var(--copper)]/20 bg-gradient-to-br from-[var(--copper)]/5 to-[var(--navy-light)]/10 p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-[var(--navy)] sm:text-3xl">
                Concerned about your annual allowance position?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
                The numbers in this report show the scale of the issue across the profession. Your own
                position depends on your pension input, income level, and whether the taper applies to
                you. Our NHS pension annual allowance calculator models your situation, and we can
                review your position directly.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                <Link
                  href="/calculators/nhs-pension-annual-allowance"
                  className="text-[var(--copper-strong)] hover:text-[var(--copper)]"
                >
                  NHS pension annual allowance calculator &rarr;
                </Link>
                <Link
                  href="/nhs-pension"
                  className="text-[var(--ink-soft)] hover:text-[var(--copper-strong)]"
                >
                  NHS pension planning guide &rarr;
                </Link>
              </div>
              <div className="mt-8">
                <LeadForm redirectOnSuccess={false} submitLabel="Request a review" />
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-[var(--navy)] sm:text-3xl">
                Frequently asked questions
              </h2>
              <div className="mt-6 space-y-6">
                {faqs.map((f, i) => (
                  <div key={i}>
                    <h3 className="text-lg font-bold text-[var(--navy)]">{f.question}</h3>
                    <p className="mt-2 text-base leading-relaxed text-[var(--ink-soft)]">
                      {f.answer}
                    </p>
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
