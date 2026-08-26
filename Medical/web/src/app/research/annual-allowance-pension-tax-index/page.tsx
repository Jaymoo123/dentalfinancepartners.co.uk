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

// A year whose Accounting for Tax figures HMRC flags as materially incomplete is
// excluded from this chart and from the derived mean below: its count and value
// are not comparable with the other years, so plotting it would fake a trend.
const schemePaysData: SchemePaysRow[] = hmrc.series
  .filter((r) => r.aft_charges_value_gbp_m !== null && !r.aft_incomplete)
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
// Standard lifetime allowance by tax year.
// Source: gov.uk "Pension schemes rates", table headed "Lifetime allowance",
// https://www.gov.uk/government/publications/rates-and-allowances-pension-schemes/pension-schemes-rates
// fetched 2026-08-26. That published table begins at 2011/12; earlier years are
// not on it and are therefore not published here.
// ---------------------------------------------------------------------------

const ltaByYear: { taxYear: string; lta: number }[] = [
  { taxYear: "2011/12", lta: 1800000 },
  { taxYear: "2012/13", lta: 1500000 },
  { taxYear: "2013/14", lta: 1500000 },
  { taxYear: "2014/15", lta: 1250000 },
  { taxYear: "2015/16", lta: 1250000 },
  { taxYear: "2016/17", lta: 1000000 },
  { taxYear: "2017/18", lta: 1000000 },
  { taxYear: "2018/19", lta: 1030000 },
  { taxYear: "2019/20", lta: 1055000 },
  { taxYear: "2020/21", lta: 1073100 },
  { taxYear: "2021/22", lta: 1073100 },
  { taxYear: "2022/23", lta: 1073100 },
  { taxYear: "2023/24", lta: 1073100 },
];

// Derived: lifetime allowance divided by the standard annual allowance for the
// same year, i.e. years of maximum permitted growth to fill the lifetime cap.
// Rounded half up to one decimal place, so 31.25 renders as 31.3.
const allowanceRatioRows = ltaByYear.map((row) => {
  const aa = hmrc.series.find((r) => r.tax_year === row.taxYear)?.standard_aa_gbp ?? null;
  return {
    taxYear: row.taxYear,
    aa,
    lta: row.lta,
    years: aa ? (Math.floor((row.lta / aa) * 10 + 0.5) / 10).toFixed(1) : "n/a",
  };
});

// Derived: mean annual allowance charge settled through Accounting for Tax
// returns = value / count, both taken from the same HMRC Table 7 row.
// Rounded to the nearest £100.
const meanChargeRows = hmrc.series
  .filter((r) => r.aft_charges_n && r.aft_charges_value_gbp_m && !r.aft_incomplete)
  .map((r) => ({
    taxYear: r.tax_year,
    n: r.aft_charges_n as number,
    valueM: r.aft_charges_value_gbp_m as number,
    mean:
      Math.round(
        ((r.aft_charges_value_gbp_m as number) * 1000000) / (r.aft_charges_n as number) / 100
      ) * 100,
    provisional: r.provisional,
  }));

// ---------------------------------------------------------------------------
// FAQs
// ---------------------------------------------------------------------------

const faqs = [
  {
    question: "What is the lifetime allowance in 2026/27?",
    answer:
      "There is not one. The standard lifetime allowance was abolished from 6 April 2024, so no lifetime cap applies to the size of your pension in 2026/27 and no lifetime allowance charge can arise. Two caps on tax-free cash replaced it: a lump sum allowance of £268,275 and a lump sum and death benefit allowance of £1,073,100. Guidance still quoting a live lifetime allowance of £1,073,100 has confused the abolished cap with the death benefit allowance that inherited its value.",
  },
  {
    question:
      "What is the lump sum allowance, and does an old lifetime allowance protection still raise it?",
    answer:
      "Your lump sum allowance is £268,275 for 2026/27, and it caps the tax-free lump sums you take across every pension you hold, not the NHS one alone. A protection you registered with HMRC before 6 April 2024 can lift it. HMRC's Pensions Tax Manual applies the £268,275 lump sum allowance and the £1,073,100 lump sum and death benefit allowance only where you hold no protected right to a higher amount (PTM174100 and PTM174200, read 26 August 2026). That is why a certificate issued years ago still carries cash value in 2026/27, and why the evidence is your own HMRC certificate or protection reference rather than a published table.",
  },
  {
    question: "How big is a typical annual allowance charge?",
    answer:
      "Smaller than the older guidance implies, and it has been falling. Dividing the value of annual allowance charges settled through schemes' Accounting for Tax returns by the number of them, both taken from the same HMRC table, gives a mean of about £23,700 across 590 charges in 2012/13 and about £6,300 across 55,070 charges in 2022/23. The count rose roughly ninety-three fold while the mean fell by nearly three quarters. That is a derived figure, one division of two published HMRC numbers, and it covers all UK registered pension schemes rather than the NHS alone. HMRC's 2024/25 Accounting for Tax figures are left out of that comparison because HMRC warns they may be revised substantially, some public sector schemes implementing the McCloud remedy having been delayed. Your own charge depends on your pension input amount and your marginal rate, so treat the mean as scale rather than as a prediction.",
  },
  {
    question: "What is Scheme Pays?",
    answer:
      "Scheme Pays lets your pension scheme settle an annual allowance charge with HMRC, in exchange for a permanent, actuarially assessed reduction in your benefits. Mandatory Scheme Pays needs a charge above £2,000 and a pension input amount in the NHS scheme alone above the £60,000 standard allowance; a charge driven only by the taper below £60,000 is voluntary Scheme Pays. The statutory deadline is to give notice no later than 31 July in the year following the year in which the tax year ends, so 31 July 2028 for a 2026/27 charge (Finance Act 2004 section 237BA, read 26 August 2026).",
  },
  {
    question: "What if my NHS pension savings statement arrives late or is revised?",
    answer:
      "Your Scheme Pays deadline can extend. Section 237BA of the Finance Act 2004 covers a revised pension savings statement issued on or after 2 May. In that case you get the earlier of three months from the statement or six years from the end of the tax year, instead of the plain 31 July date. Late and revised NHSBSA statements are common rather than exceptional. The deadline is brought forward instead if you become entitled to all your benefits.",
  },
  {
    question: "Why does this data lag by around two years?",
    answer:
      "HMRC publishes its Private pension statistics once a year, each July, and the newest tax year it covers is around 18 to 24 months behind. That gap exists because annual allowance charges are reported through Self Assessment and through schemes' Accounting for Tax returns, which are filed and processed after the tax year ends. This page reports the July 2026 edition, published on 30 July 2026 and incorporated here on 26 August 2026, which reaches the 2024/25 tax year. That edition also revised 2020/21 to 2023/24, and the figures on this page are the revised ones. HMRC warns that its 2024/25 Accounting for Tax figures may be revised substantially, because of delays in some public sector schemes implementing the McCloud remedy, so those figures are shown but excluded from the trend charts and the derived mean (gov.uk, Private pension statistics commentary, read 26 August 2026). The next edition is due Summer 2027.",
  },
  {
    question: "Is this an NHS-specific dataset?",
    answer:
      "Partly. The recurring money and count series comes from HMRC and covers all UK registered pension schemes, not the NHS alone, although HMRC states that a significant share of annual allowance charges come from public-service scheme members. The NHS-specific layer comes from NHSBSA Freedom of Information data for the England and Wales scheme, which counts how many practitioner and officer members had pension growth above the standard annual allowance. Those two layers are kept separate throughout, and no national money figure is presented as if it were NHS-only.",
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
  headline: "Annual Allowance and Lifetime Allowance Pension Tax Index",
  description:
    "How annual allowance pension tax charges have grown across UK registered pension schemes (HMRC), set against the abolished lifetime allowance and the lump sum allowance that replaced it, with an NHS Pension Scheme lens on doctors.",
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
  title: "Annual Allowance & Lifetime Allowance Pension Tax Index | NHS & UK data",
  description:
    "The pension lifetime allowance was abolished on 6 April 2024 and replaced by a £268,275 lump sum allowance. Sourced HMRC and NHSBSA data on annual allowance pension tax charges. Free to cite.",
  alternates: { canonical: `${siteConfig.url}${PAGE_PATH}` },
  openGraph: {
    type: "article",
    title: "Annual Allowance & Lifetime Allowance Pension Tax Index | NHS & UK data",
    description:
      "Annual allowance charges across UK pension schemes, the abolished lifetime allowance and the lump sum allowance that replaced it, from official open data.",
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
              The annual allowance, the lifetime allowance and NHS doctors: pension tax charges
              across UK registered pension schemes
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-white/80">
              The pension lifetime allowance was abolished on 6 April 2024. It was replaced by a
              lump sum allowance of £268,275 and a lump sum and death benefit allowance of
              £1,073,100, both unchanged for 2026/27. This page sets those caps against HMRC&rsquo;s
              published record of annual allowance charges, so you can see how far pension tax now
              reaches. Every figure below is official open data, free to cite, with its source and
              tax year attached.
            </p>

            {/* 4 hero stats */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Stat
                value={`${fmtGBPm(headline.scheme_pays_value_latest_gbp_m)}`}
                label={`annual allowance charges settled through schemes' Accounting for Tax returns (Scheme Pays) in ${headline.scheme_pays_value_latest_year}, the latest year with complete Accounting for Tax reporting, across all UK registered pension schemes`}
                flag="revised"
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
                label="the standard annual allowance in 2006/07 versus 2024/25: the cap has fallen while charges climbed (all UK schemes)"
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
              <h2 className="text-lg font-bold text-[var(--copper-strong)]">
                Key facts on annual allowance and lifetime allowance pension tax
              </h2>
              <ul className="mt-4 space-y-2 text-base leading-relaxed text-[var(--ink)]">
                <li>
                  The lifetime allowance was abolished from 6 April 2024 and replaced by a lump sum
                  allowance of £268,275 and a lump sum and death benefit allowance of £1,073,100,
                  both unchanged for 2026/27 (gov.uk, fetched 26 August 2026).
                </li>
                <li>
                  Across all UK registered pension schemes, £353m of annual allowance charges were
                  settled through pension schemes&rsquo; Accounting for Tax returns (Scheme Pays) in
                  2023/24, revised (HMRC).
                </li>
                <li>
                  The value of annual allowance charges paid through Scheme Pays rose from £64m in
                  2016/17 to £353m in 2023/24 (revised), across all UK registered pension schemes
                  (HMRC). 2023/24 is the latest year whose Accounting for Tax reporting HMRC treats as
                  complete: the 2024/25 figures are on the page but are excluded from this trend, for
                  the reason set out below.
                </li>
                <li>
                  The number of people reporting pension savings above the annual allowance through
                  Self Assessment peaked at 56,370 in 2021/22, up from 18,720 in 2016/17, across all
                  UK registered schemes (HMRC). It fell to 24,950 in 2023/24 and rose again to 30,440
                  in 2024/25. This is a count of individuals, not a tax charge value.
                </li>
                <li>
                  The standard annual allowance was cut from £215,000 in 2006/07 to £40,000, the level
                  it held for every year from 2014/15 to 2022/23, then raised to £60,000 from 2023/24
                  and held there for 2024/25, so more
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
                  Reported charges appear to fall in 2022/23, but this is a reporting artefact. NHS and
                  other public-service members were directed to report 2022/23 annual allowance charges
                  through HMRC&rsquo;s public service pension adjustment service, the McCloud remedy
                  route, rather than Self Assessment. The underlying burden did not fall.
                </li>
                <li>
                  HMRC&rsquo;s 2024/25 Accounting for Tax figures (15,250 charges, £164m) are on this
                  page but are deliberately kept out of the Scheme Pays chart and the mean-charge
                  table. HMRC states that revisions to them may be particularly substantial, because
                  some public sector schemes implementing the McCloud remedy have been delayed and the
                  reporting deadline for many 2024/25 Scheme Pays cases is February 2027. Dividing that
                  incomplete value by that incomplete count would suggest the mean charge had jumped
                  back to about £10,800, which would be an artefact of missing public sector schemes
                  rather than a real reversal (HMRC, Private pension statistics commentary, read 26
                  August 2026).
                </li>
              </ul>
              <p className="mt-4 text-xs text-[var(--muted)]">
                Source: Medical Accountants UK analysis of HMRC Private pension statistics (July 2026),
                HMRC and gov.uk published allowance rates, and NHSBSA data, all under the Open
                Government Licence v3.0. The HMRC money and count series covers all UK registered
                pension schemes; the NHS layer is England and Wales only, and the two are never
                blended. Free to cite with attribution to Medical Accountants UK. This page is a data
                summary and not tax advice on any individual situation.
              </p>
            </div>

            {/* Section 1: Scheme Pays value */}
            <Section
              id="scheme-pays-value"
              title="How much money is settled through Scheme Pays each year?"
            >
              <p>
                Each bar is the total value of annual allowance charges settled through pension
                schemes&rsquo; Accounting for Tax (AfT) returns in that year, across all UK registered
                pension schemes (HMRC Private pension statistics, Table 7). This is the Scheme Pays
                route: the scheme settles the charge with HMRC in exchange for a permanent reduction in
                the member&rsquo;s benefits. The 2023/24 bar is HMRC&rsquo;s revised figure and is the
                last bar in the chart. There is no 2024/25 bar: HMRC has published a 2024/25 figure of
                £164m, but warns that revisions to its 2024/25 Accounting for Tax data may be
                particularly substantial because of delays in some public sector schemes implementing
                the McCloud remedy, with a reporting deadline of February 2027 for many 2024/25 Scheme
                Pays cases. Charting an incomplete year next to complete ones would show a collapse
                that has not happened, so it is stated here and left out of the series.
              </p>
              <p>
                A charge does not push anyone out of the scheme. It is a tax charge on one year&rsquo;s
                pension growth, and the member carries on accruing. These are gross counts, so a doctor
                who appears in one year is still an active or deferred member of the scheme.
              </p>
              <div className="not-prose mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-6">
                <SchemePaysValueChart series={schemePaysData} />
              </div>
              <Caption>
                Scheme Pays reporting through the Accounting for Tax return began in 2012/13, so this
                series does not extend earlier. The PODS digital service (from 2020/21) improved
                reporting and may lift later years. All UK registered pension schemes (HMRC).
              </Caption>

              <p className="font-semibold text-[var(--navy)]">
                The charges got smaller as they got commoner
              </p>
              <p>
                One further figure comes out of the same HMRC table by division, and it is the finding
                this page exists to publish. Divide the value of Scheme Pays charges in a year by the
                number of them and you get the mean charge settled that way. In 2012/13 that was about
                £23,700 across 590 charges. By 2022/23 it was about £6,300 across 55,070. The count
                rose roughly ninety-three fold while the average charge fell by nearly three quarters.
                HMRC&rsquo;s July 2026 edition revised the 2022/23 count from 54,920 to 55,070 and the
                value from £348m to £349m, which moves the finding by less than a percentage point and
                leaves it intact.
              </p>
              <p>
                Read plainly, the annual allowance stopped being a large tax on a few very large
                pensions and became a modest tax on a great many ordinary ones. That matters for how
                you read your own position. If your first charge lands, you are joining a group of
                roughly fifty thousand people a year, and your charge is more likely to look like the
                mean than like the outliers the older guidance was written about. It is a routine
                consequence of a good pay year in a defined-benefit scheme, not a signal that you have
                done something wrong.
              </p>

              <div className="not-prose mt-6 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left text-xs text-[var(--muted)]">
                    Derived. Mean annual allowance charge settled through Accounting for Tax returns,
                    all UK registered pension schemes. Both inputs are HMRC Private pension statistics
                    Table 7 (July 2026 edition, read 26 August 2026), the same population in the same
                    table. The mean is the value divided by the count, rounded to the nearest £100.
                    HMRC rounds counts to the nearest 10 and values to the nearest £1 million, so the
                    mean carries roughly ±0.2% of rounding imprecision in the later years and roughly
                    ±4% in 2012/13, where the count is small. Charges paid directly through Self
                    Assessment are a different and larger population and are not in this table.
                    2024/25 is deliberately absent: HMRC warns its 2024/25 Accounting for Tax figures
                    may be revised substantially because of public sector McCloud reporting delays, and
                    a mean drawn from an incomplete count and an incomplete value would not be
                    comparable with the years above it.
                  </caption>
                  <thead>
                    <tr className="border-b-2 border-[var(--copper)] text-left">
                      <th className="py-2 pr-4 font-bold text-[var(--navy)]">Tax year</th>
                      <th className="py-2 pr-4 font-bold text-[var(--navy)]">Charges settled (AfT)</th>
                      <th className="py-2 pr-4 font-bold text-[var(--navy)]">Total value</th>
                      <th className="py-2 font-bold text-[var(--navy)]">Mean charge (derived)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {meanChargeRows.map((r) => (
                      <tr key={r.taxYear} className="border-b border-[var(--border)]">
                        <td className="py-2 pr-4 font-semibold text-[var(--navy)]">
                          {r.taxYear}
                          {r.provisional ? " (provisional)" : ""}
                        </td>
                        <td className="py-2 pr-4 text-[var(--ink-soft)]">{fmtInt(r.n)}</td>
                        <td className="py-2 pr-4 text-[var(--ink-soft)]">{fmtGBPm(r.valueM)}</td>
                        <td className="py-2 font-semibold text-[var(--ink-soft)]">
                          {fmtGBP(r.mean)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            {/* Section 2: SA individuals */}
            <Section
              id="sa-individuals"
              title="How many people report pension savings above the allowance?"
            >
              <p>
                Each bar shows the number of individuals who reported pension savings above the annual
                allowance through Self Assessment that year, across all UK registered pension schemes
                (HMRC). This is not a count of charges paid; it is a count of people whose pension
                input exceeded the allowance and who reported it via Self Assessment.
              </p>
              <p>
                Pension input amount is the phrase to hold on to here. It is the growth in the value of
                your pension over the year, not the contributions you paid in, and in a defined-benefit
                scheme like the NHS one those two numbers are nothing like each other.
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
                pension adjustment service instead of Self Assessment (see note below). The series runs
                to 2024/25. HMRC&rsquo;s warning about incomplete 2024/25 data applies to the
                Accounting for Tax figures, not to this Self Assessment count, so 2024/25 is charted
                here.
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
                  The 2022/23 fall (56,370 in 2021/22 to 34,370) is a reporting artefact:
                  public-service members were told to report 2022/23 charges through HMRC&rsquo;s
                  public service pension adjustment service instead of Self Assessment. The McCloud
                  remedy moved affected members&rsquo; 2015 to 2022 service back into their legacy
                  scheme section, and the reporting service was built to handle the resulting
                  recalculations. It is not a real fall in the burden.
                </p>
              </div>
            </Section>

            {/* Section 3: Allowance path */}
            <Section
              id="allowance-path"
              title="How has the standard annual allowance changed?"
            >
              <p>
                The step chart below shows the standard annual allowance set by policy each tax year.
                Falling allowances, not just larger pensions, drove the rise in the number of people
                caught above the limit. The chart covers all UK registered pension schemes (HMRC). The
                allowance rose from £40,000 to £60,000 from 6 April 2023, and the minimum tapered
                allowance rose from £4,000 to £10,000 at the same time. The allowance held at £60,000
                for 2024/25 (gov.uk, Pension schemes rates, read 26 August 2026). Those are legislated
                figures, so any incompleteness flag on this page attaches to the accompanying charge
                data rather than to the allowance itself.
              </p>
              <p>
                A higher allowance means fewer members breach it, which is part of why Self Assessment
                counts fall in 2023/24. Because 2023/24 also overlaps the McCloud reporting change,
                read the two effects together rather than as a single clean trend. The count then rose
                again in 2024/25, from 24,950 to 30,440, with the allowance unchanged, so that rise is
                pension growth and reporting catching up rather than a policy change.
              </p>
              <div className="not-prose mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-6">
                <AllowancePathChart series={allowancePath} />
              </div>
              <Caption>
                The standard annual allowance, set by policy. It fell from £215,000 (2006/07) to
                £40,000, then rose to £60,000 from 2023/24 and held there for 2024/25. Falling allowances, not just larger
                pensions, drove the rise in charges. All UK schemes.
              </Caption>
            </Section>

            {/* Section 4: The lifetime allowance and what replaced it */}
            <Section
              id="lifetime-allowance"
              title="What was the pension lifetime allowance, and what replaced it?"
            >
              <p>
                The pension lifetime allowance was a single cap on the total pension benefits you could
                take before an extra tax charge applied. It was tested when you took benefits or died,
                not every year, and that is what separated it from the annual allowance. The lifetime
                allowance pension test ran from 6 April 2006 to 5 April 2024. Nothing has replaced the
                cap itself.
              </p>
              <p>
                Two dated steps ended it, and most published guidance describes only the first. The
                lifetime allowance charge was reduced to nil from 6 April 2023. The lifetime allowance
                legislation was then abolished from 6 April 2024, confirmed at gov.uk, Abolition of the
                Lifetime Allowance from 6 April 2024, fetched 26 August 2026. Anything giving a single
                abolition date of 2023 is describing the charge, not the allowance.
              </p>
              <p>
                From 6 April 2024 two allowances took over, and both cap tax-free cash rather than the
                size of your pension. Your pension lump sum allowance is £268,275 for 2026/27. Your
                lump sum and death benefit allowance is £1,073,100 for 2026/27. Both are unchanged
                from the previous year, so the lump sum allowance 2025 to 2026 figure was also
                £268,275 (gov.uk, pension schemes rates, fetched 26 August 2026). For NHS doctors this
                bites hardest in
                the 1995 section, which pays an automatic tax-free lump sum of three times the annual
                pension.
              </p>

              <div className="rounded-xl border-l-4 border-[var(--copper)] bg-[var(--copper)]/5 p-4">
                <p className="font-semibold text-[var(--navy)]">
                  How a 1995 section pension sits against the £268,275 cap
                </p>
                <p className="mt-1 text-sm text-[var(--ink-soft)]">
                  Take Dr A, an illustrative hospital consultant retiring in 2026/27 on a 1995 section
                  pension of £60,000 a year. The 1995 section pays an automatic lump sum of three times
                  the annual pension, so her lump sum is 3 × £60,000 = £180,000. Her lump sum allowance
                  for 2026/27 is £268,275. Subtract one from the other: £268,275 − £180,000 = £88,275
                  of allowance left unused. Her tax-free cash sits comfortably inside the cap, so no
                  lump sum allowance issue arises. Three things move that answer. Tax-free lump sums
                  from any other pension count against the same £268,275. A registered protection can
                  lift her allowance above it. Commuting pension for extra cash consumes more of it.
                  Figures are illustrative and rounded.
                </p>
              </div>

              <p>
                £1,073,100 is the number that causes the confusion, and it is worth being blunt about
                it. That was the standard lifetime allowance, frozen from 2020/21 through 2023/24, and
                it is now the lump sum and death benefit allowance. The value survived. The allowance
                did not. Two things changed at once, which is why the answer to what is lump sum
                allowance only makes sense alongside what the lifetime allowance was.
              </p>
              <p>
                There was never a maximum pension contribution lifetime allowance rule either. The
                annual allowance capped the growth in your pension each year; the lifetime allowance
                tested the benefits you eventually took. Read the table below as the answer to what is
                a lifetime allowance in historic terms: one cap, tested once.
              </p>
              <p>
                The pension LTA regime ran for eighteen tax years. There is no LTA pension test on
                benefits you take from 6 April 2024, and there is no simple answer to what is LTA
                pension shorthand for any more, because the allowance it names no longer exists. The
                lifetime allowance (LTA) is history with a data series attached, which is exactly why
                it belongs on a research page rather than a planning one.
              </p>
              <p>
                The pension lifetime allowance UK savers were tested against applied to every UK
                registered pension scheme, the NHS scheme included. Because it was a UK pension
                lifetime allowance rather than a scheme rule, a doctor holding an NHS pension and a
                private pension was tested on both together. The lifetime allowance UK doctors met was
                a whole-of-life total, not an NHS figure. That is the NHS pension lifetime allowance
                position in one line: there was never a separate NHS Pension Scheme lifetime allowance,
                only the national one applied to NHS benefits. There is no lifetime allowance NHS
                pension members must test against today, and NHS pensions lifetime allowance queries
                about an old protection certificate go to HMRC and NHSBSA rather than to an employer.
              </p>

              <div className="not-prose mt-6 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left text-xs text-[var(--muted)]">
                    Terms and their status on 26 August 2026. Allowance values from gov.uk, Pension
                    schemes rates, fetched 26 August 2026. Abolition dates from gov.uk, Abolition of
                    the Lifetime Allowance from 6 April 2024, fetched the same day. Charge rates that
                    applied before 6 April 2023 are archived by HMRC at The National Archives and are
                    deliberately not restated here.
                  </caption>
                  <thead>
                    <tr className="border-b-2 border-[var(--copper)] text-left">
                      <th className="py-2 pr-4 font-bold text-[var(--navy)]">Term</th>
                      <th className="py-2 pr-4 font-bold text-[var(--navy)]">What it did</th>
                      <th className="py-2 font-bold text-[var(--navy)]">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[var(--border)]">
                      <td className="py-2 pr-4 font-semibold text-[var(--navy)]">
                        Lifetime allowance (LTA, sometimes written LTA allowance)
                      </td>
                      <td className="py-2 pr-4 text-[var(--ink-soft)]">
                        Capped total tax-privileged pension benefits, tested when benefits were taken
                        or on death
                      </td>
                      <td className="py-2 text-[var(--ink-soft)]">
                        Abolished from 6 April 2024. Final standard value £1,073,100
                      </td>
                    </tr>
                    <tr className="border-b border-[var(--border)]">
                      <td className="py-2 pr-4 font-semibold text-[var(--navy)]">
                        Standard lifetime allowance
                      </td>
                      <td className="py-2 pr-4 text-[var(--ink-soft)]">
                        The default cap for a member holding no protection
                      </td>
                      <td className="py-2 text-[var(--ink-soft)]">Abolished from 6 April 2024</td>
                    </tr>
                    <tr className="border-b border-[var(--border)]">
                      <td className="py-2 pr-4 font-semibold text-[var(--navy)]">
                        Lifetime allowance charge
                      </td>
                      <td className="py-2 pr-4 text-[var(--ink-soft)]">
                        The tax charge that applied to benefits above the cap
                      </td>
                      <td className="py-2 text-[var(--ink-soft)]">
                        Reduced to nil from 6 April 2023, then removed with the allowance from 6 April
                        2024
                      </td>
                    </tr>
                    <tr className="border-b border-[var(--border)]">
                      <td className="py-2 pr-4 font-semibold text-[var(--navy)]">
                        Lump sum allowance (LSA)
                      </td>
                      <td className="py-2 pr-4 text-[var(--ink-soft)]">
                        Caps the tax-free lump sums you take across all your pensions
                      </td>
                      <td className="py-2 text-[var(--ink-soft)]">Live. £268,275 for 2026/27</td>
                    </tr>
                    <tr className="border-b border-[var(--border)]">
                      <td className="py-2 pr-4 font-semibold text-[var(--navy)]">
                        Lump sum and death benefit allowance (LSDBA)
                      </td>
                      <td className="py-2 pr-4 text-[var(--ink-soft)]">
                        Caps tax-free lump sums including those paid on death
                      </td>
                      <td className="py-2 text-[var(--ink-soft)]">Live. £1,073,100 for 2026/27</td>
                    </tr>
                    <tr className="border-b border-[var(--border)]">
                      <td className="py-2 pr-4 font-semibold text-[var(--navy)]">
                        Lifetime allowance protection
                      </td>
                      <td className="py-2 pr-4 text-[var(--ink-soft)]">
                        Fixed a higher personal cap for members who registered with HMRC
                      </td>
                      <td className="py-2 text-[var(--ink-soft)]">
                        Still relevant: can give a protected right to a higher lump sum allowance
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Section>

            {/* Section 5: The derived index */}
            <Section
              id="allowance-ratio"
              title="How far apart were the annual allowance and the lifetime allowance?"
            >
              <p>
                This is the one figure on the page that is ours rather than HMRC&rsquo;s, and it is a
                division rather than an estimate. Take the standard annual allowance for a tax year.
                Take the standard lifetime allowance for the same year. Divide the second by the first.
                The result is the number of years of maximum permitted pension growth it would have
                taken to fill the lifetime cap.
              </p>
              <p>
                In 2011/12 that was 36.0 years. By 2023/24 it was 17.9. The two caps closed on the
                saver from opposite directions: the lifetime allowance fell from £1,800,000 to
                £1,073,100, while the annual allowance was cut from £50,000 to £40,000 before rising to
                £60,000. A career that cleared both comfortably at the start of the decade could breach
                both by the end of it. If you trained through that period, your exposure to pension tax
                rose without you changing anything about your pension.
              </p>
              <p>
                The lifetime allowance 2023/24 figure of £1,073,100 was the last one that ever existed.
                The pension lifetime allowance changes then arrived in two steps rather than one, which
                is why so much published guidance is out by a year. Each lifetime allowance change is
                dated in the table below. The pensions lifetime allowance changes did not touch the
                annual allowance at all, and the charge data on this page runs on straight past them.
              </p>

              <div className="not-prose mt-6 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left text-xs text-[var(--muted)]">
                    Derived. Column 2 is the standard annual allowance from HMRC Private pension
                    statistics Table 7 (July 2026 edition, read 26 August 2026). Column 3 is the standard lifetime allowance
                    from gov.uk, Pension schemes rates, fetched 26 August 2026. Column 4 is column 3
                    divided by column 2, rounded to one decimal place. It is arithmetic on two
                    published series, not a measurement of anybody&rsquo;s pension, and both caps
                    applied to all UK registered pension schemes. The gov.uk lifetime allowance table
                    begins at 2011/12, so earlier years are not shown. There is no lifetime allowance
                    2024/25 row: the allowance was abolished on the first day of that tax year.
                  </caption>
                  <thead>
                    <tr className="border-b-2 border-[var(--copper)] text-left">
                      <th className="py-2 pr-4 font-bold text-[var(--navy)]">Tax year</th>
                      <th className="py-2 pr-4 font-bold text-[var(--navy)]">
                        Standard annual allowance
                      </th>
                      <th className="py-2 pr-4 font-bold text-[var(--navy)]">
                        Standard lifetime allowance
                      </th>
                      <th className="py-2 font-bold text-[var(--navy)]">
                        Years of maximum growth to fill the lifetime cap (derived)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allowanceRatioRows.map((r) => (
                      <tr key={r.taxYear} className="border-b border-[var(--border)]">
                        <td className="py-2 pr-4 font-semibold text-[var(--navy)]">{r.taxYear}</td>
                        <td className="py-2 pr-4 text-[var(--ink-soft)]">{fmtGBP(r.aa)}</td>
                        <td className="py-2 pr-4 text-[var(--ink-soft)]">{fmtGBP(r.lta)}</td>
                        <td className="py-2 font-semibold text-[var(--ink-soft)]">{r.years}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p>
                Every HMRC lifetime allowance value in that table is the published standard figure for
                the tax year, taken from the gov.uk pension schemes rates page on 26 August 2026, under
                the heading Lifetime allowance. That page is where the lifetime allowance HMRC set each
                year still sits. Any pension LTA UK figure for a year before 2011/12 is absent from it,
                and HMRC&rsquo;s pensions LTA guidance on protections and on the charge is archived at
                The National Archives.
              </p>
            </Section>

            {/* Section 6: Protection */}
            <Section id="protections" title="Does lifetime allowance protection still matter?">
              <p>
                Yes, and this is where most published guidance stops. Lifetime allowance protection was
                a registration you made with HMRC to fix a higher personal cap than the standard one.
                The allowance it protected you against is gone. The protection itself is not.
              </p>
              <p>
                HMRC&rsquo;s Pensions Tax Manual states the rule plainly. An individual&rsquo;s lump
                sum allowance is £268,275 unless they have a protected right to a higher lump sum
                allowance, or transitional rules apply (PTM174100). An individual&rsquo;s lump sum and
                death benefit allowance is £1,073,100 unless they have a protected right to a higher
                one (PTM174200). Both pages were fetched on 26 August 2026. So a pension lifetime
                allowance protection registered before 6 April 2024 can still raise the tax-free cash
                you are able to take.
              </p>
              <p>
                The lifetime allowance protections that can do this are enhanced protection, primary
                protection, fixed protection and individual protection. Each was fixed at the value in
                force when it was taken, which is why the certificate matters more than the memory of
                it. Find any lifetime allowance protection HMRC issued to you before 6 April 2024, and
                find it before you take a lump sum rather than after, because the reference on it is
                what your scheme administrator will ask for.
              </p>
              <p className="font-semibold text-[var(--navy)]">One figure this page will not give you</p>
              <p>
                The gov.uk protection guidance no longer lists the protected amount for each protection
                type. On 26 August 2026 it carried only the line directing readers to read the previous
                rates of standard lifetime allowance, and a link out. Per-protection amounts are
                therefore stated here as a gap rather than guessed at. Confirm yours from your own HMRC
                certificate or protection reference. The protected amount differs by protection type
                and by the date of registration, and a figure quoted for the wrong type is worse than
                no figure at all.
              </p>
            </Section>

            {/* Section 7: Abatement */}
            <Section id="abatement" title="What is pension abatement, and when does it apply?">
              <p>
                Pension abatement is a reduction of a pension already in payment when the pensioner
                returns to work. The pension abatement meaning NHSBSA uses is narrow: your pension is
                reduced, not stopped, and only in defined circumstances. Abatement of pension has
                nothing to do with the annual allowance or the lifetime allowance, and it is the one
                rule on this page that is not a tax rule at all. It is included because it is the other
                thing that quietly cuts a doctor&rsquo;s pension, and because no published source
                treats it with figures.
              </p>
              <p>
                NHSBSA states that abatement takes effect if you are under your normal pension age and
                return to NHS work having retired on one of five grounds. Those grounds are ill health
                under the previous ill health retirement arrangements, ill health tier 1 or tier 2
                under the current arrangements, early payment of preserved benefits due to ill health,
                redundancy if you retired before 1 October 2011, and early retirement in the interests
                of the efficiency of the service. NHSBSA also states that abatement rules stop once you
                reach the normal pension age of the section or scheme you claimed your benefits from,
                which is 60 in the 1995 section, 65 in the 2008 section, and state pension age or 65 if
                later in the 2015 scheme. Two exclusions are easy to miss. The Department of Health and
                Social Care removed abatement from 1 April 2023 for members with Special Class or
                Mental Health Officer status and for those claiming age retirement benefits before age
                60. Benefits are also unaffected where you took actuarially reduced early retirement,
                or where you retired on redundancy on or after 1 October 2011, because in both cases
                you have already funded the early payment (NHSBSA, Re-employment, read 26 August 2026).
              </p>
              <p className="font-semibold text-[var(--navy)]">
                Why there is no abatement arithmetic here
              </p>
              <p>
                NHSBSA does publish the principle, and it is worth having in plain words: the
                regulations do not permit a re-employed pensioner to receive more in pension plus
                re-employed salary than the salary they earned before retirement, and going over that
                earnings margin reduces the pension rather than stopping it (NHSBSA, Re-employment,
                read 26 August 2026). What is not restated here is the section by section arithmetic.
                That sits on NHSBSA&rsquo;s knowledge base, which is served from a subdomain whose TLS
                certificate had expired when we tried to read it on 26 August 2026, so we could not
                open the page we would have been quoting. The rest of the NHSBSA site, including its
                published scheme guides, serves normally. Rather than restate a calculation from a
                source we could not open, the size of the reduction is recorded here as a gap. Ask
                NHSBSA for an abatement estimate before you accept a post, not after you start it.
              </p>
              <p>
                Abatement is not an NHS invention. Civil service pension abatement runs on the same
                principle and is written down more plainly. The Civil Service scheme reduces a pension
                where your combined post-retirement salary and pension is more than you earned before
                retirement, measured against a salary of reference set before you retired (Civil
                Service Pension Scheme, fetched 26 August 2026). Pension abatement civil service
                questions go to that scheme&rsquo;s administrator. The schemes share the idea and not
                the rules.
              </p>
            </Section>

            {/* Section 8: NHS layer */}
            <Section
              id="nhs-layer"
              title="How many NHS Pension Scheme members exceeded the allowance?"
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
                  submission-date basis, England and Wales). This is a single-year illustration on a
                  different counting basis from the table above, so it is not tied into any trend.
                </p>
              </div>
            </Section>

            {/* Section 9: Full HMRC series table */}
            <Section id="hmrc-series" title="The full HMRC annual allowance series">
              <div className="not-prose overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left text-xs text-[var(--muted)]">
                    All UK registered pension schemes (HMRC). Scheme Pays (Accounting for Tax) columns
                    begin in 2012/13, marked n/a before then. The Self Assessment value column is
                    contributions above the allowance, not a tax charge. The 2022/23 fall in the Self
                    Assessment count is a McCloud reporting artefact (public-service members reported
                    via HMRC&rsquo;s adjustment service, see the Self Assessment section above), not a
                    real decline. Counts rounded to the nearest 10, values to the nearest £1 million.
                    HMRC Private pension statistics, July 2026 edition, published 30 July 2026. Rows to
                    2023/24 are from the Table 7 CSV, read 26 August 2026; the 2024/25 row is not yet in
                    that CSV and is taken from HMRC&rsquo;s published commentary of the same edition,
                    read the same day, with its 2024/25 standard allowance from gov.uk, Pension schemes
                    rates. The 2024/25 Accounting for Tax count and value are shown but marked
                    incomplete and excluded from the chart and mean above.
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
                      const status = r.aft_incomplete
                        ? "AfT figures incomplete, excluded from trend"
                        : r.provisional
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
                            {r.aft_incomplete ? " (incomplete)" : ""}
                          </td>
                          <td className="py-2 pr-3 text-[var(--ink-soft)] text-xs">
                            {r.aft_charges_value_gbp_m !== null
                              ? fmtGBPm(r.aft_charges_value_gbp_m)
                              : "n/a"}
                            {r.aft_incomplete ? " (incomplete)" : ""}
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

            {/* Section 10: Methodology */}
            <Section
              id="methodology"
              title="Methodology: where the annual allowance and lifetime allowance figures come from"
            >
              <p>
                <strong>HMRC Private pension statistics, Table 7 (annual allowance), July 2026
                edition, published 30 July 2026.</strong>{" "}
                Taken: the standard annual allowance by year. Also taken: the number and value of
                annual allowance charges reported through schemes&rsquo; Accounting for Tax returns
                (Scheme Pays), 2012/13 onward. Also taken: the number of individuals reporting pension
                savings above the allowance through Self Assessment, plus the value of those excess
                contributions, 2006/07 onward. This is all UK registered pension schemes; there is no
                NHS split in this source. Rows for 2006/07 to 2023/24 were read from the Table 7 CSV on
                26 August 2026. That CSV did not carry a 2024/25 row on that date, so the 2024/25
                figures come from the published commentary for the same edition, read the same day, and
                the 2024/25 standard allowance of £60,000 comes from gov.uk, Pension schemes rates.
              </p>
              <p>
                <strong>Why 2024/25 is on the page but out of the trend.</strong>{" "}
                HMRC states that revisions may be particularly substantial for the 2024/25 Accounting
                for Tax figures, because some public sector pension schemes have been delayed,
                especially those implementing the McCloud remedy, and the deadline for reporting many
                2024/25 Scheme Pays cases is February 2027. The published 2024/25 figures are 15,250
                charges worth £164m. Dividing one by the other gives about £10,800, which would read as
                a sharp reversal of the falling mean charge. It is not one. It is what a series looks
                like when the large public sector schemes have not reported yet. So the row is
                published, labelled incomplete, and excluded from the Scheme Pays chart and from the
                derived mean-charge table, with the exclusion stated in both places. Suppressing the
                row entirely would have hidden a published HMRC figure; charting it would have
                published a false turning point. The 2024/25 Self Assessment count and value carry no
                such warning and are charted normally.
              </p>
              <p>
                <strong>gov.uk, Pension schemes rates, fetched 26 August 2026.</strong>{" "}
                Taken: the standard lifetime allowance by tax year, 2011/12 to 2023/24, which is the
                full span that page publishes. Also taken: the standard individual lump sum allowance
                of £268,275 and the standard individual lump sum and death benefit allowance of
                £1,073,100, both listed identically for 2025 to 2026 and 2026 to 2027. The same page
                gives the 2026/27 annual allowance of £60,000, the money purchase annual allowance of
                £10,000 and the minimum tapered annual allowance of £10,000. It also gives the
                £200,000 threshold income limit and the £260,000 adjusted income limit.
              </p>
              <p>
                <strong>
                  gov.uk, Abolition of the Lifetime Allowance from 6 April 2024, fetched 26 August
                  2026.
                </strong>{" "}
                Taken: the abolition date of 6 April 2024 and the confirmation that the measure was
                delivered through Finance (No.2) Act 2023 and clarifies the position of individuals
                holding protections. The separate reduction of the lifetime allowance charge to nil
                from 6 April 2023 is the earlier step and is stated as such throughout.
              </p>
              <p>
                <strong>HMRC Pensions Tax Manual, PTM174100 and PTM174200, fetched 26 August
                2026.</strong>{" "}
                Taken: the rule that the £268,275 lump sum allowance and the £1,073,100 lump sum and
                death benefit allowance apply unless the individual has a protected right to a higher
                amount. Per-protection amounts are not published on the current gov.uk protection page
                and are not stated anywhere on this page.
              </p>
              <p>
                <strong>NHSBSA Re-employment page and Civil Service Pension Scheme, both read 26 August
                2026.</strong>{" "}
                Taken: the NHS abatement grounds, the earnings margin principle, the exclusions from
                1 April 2023, and the rule that abatement stops at normal pension age; and, for
                contrast, the Civil Service definition of abatement against a salary of reference.
                NHSBSA&rsquo;s section-by-section abatement arithmetic sits on its knowledge base
                subdomain, which presented an expired TLS certificate to an automated request that day,
                so it was not read and no abatement arithmetic is published here.
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
              <p>
                <strong>Two derived figures, and how to reproduce them.</strong>{" "}
                The mean charge column divides the value of Scheme Pays charges by the number of them,
                both from the same HMRC Table 7 row, rounded to the nearest £100. The years-of-growth
                column divides the standard lifetime allowance for a tax year by the standard annual
                allowance for the same year, rounded to one decimal place. Both are labelled derived
                wherever they appear. Neither is an estimate, a model or a survey: each is one division
                of two published figures, and any reader can reproduce them from the two source tables.
              </p>

              <p className="font-semibold text-[var(--navy)]">Honesty caveats</p>
              <ol className="list-decimal pl-5 space-y-1 text-sm">
                <li>
                  Annual data with a lag of roughly 18 to 24 months, and HMRC publishes each July.
                  Every HMRC figure on this page is from the July 2026 edition, published 30 July 2026
                  and read on 26 August 2026, which reaches 2024/25. That edition revised 2020/21,
                  2021/22, 2022/23 and 2023/24; 2006/07 to 2019/20 were unchanged. The next edition is
                  due Summer 2027, and figures published now may be revised again then.
                </li>
                <li>
                  HMRC&rsquo;s 2024/25 Accounting for Tax count and value are flagged incomplete and
                  are excluded from the Scheme Pays chart and the derived mean-charge table. The Self
                  Assessment figures for the same year are not affected and are included.
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
                <li>
                  <a
                    href="https://www.gov.uk/government/publications/rates-and-allowances-pension-schemes/pension-schemes-rates"
                    className="font-semibold text-[var(--copper-strong)] hover:text-[var(--copper)]"
                    rel="nofollow"
                  >
                    Pension schemes rates (allowances by tax year)
                  </a>{" "}
                  <span className="text-[var(--muted)]">(HM Revenue and Customs)</span>
                </li>
                <li>
                  <a
                    href="https://www.gov.uk/government/publications/abolition-of-the-lifetime-allowance-from-6-april-2024"
                    className="font-semibold text-[var(--copper-strong)] hover:text-[var(--copper)]"
                    rel="nofollow"
                  >
                    Abolition of the Lifetime Allowance from 6 April 2024
                  </a>{" "}
                  <span className="text-[var(--muted)]">(HM Revenue and Customs)</span>
                </li>
                <li>
                  <a
                    href="https://www.nhsbsa.nhs.uk/pensioner-hub/re-employment"
                    className="font-semibold text-[var(--copper-strong)] hover:text-[var(--copper)]"
                    rel="nofollow"
                  >
                    Re-employment and abatement
                  </a>{" "}
                  <span className="text-[var(--muted)]">(NHS Business Services Authority)</span>
                </li>
                <li>
                  <a
                    href="https://www.gov.uk/hmrc-internal-manuals/pensions-tax-manual/ptm174100"
                    className="font-semibold text-[var(--copper-strong)] hover:text-[var(--copper)]"
                    rel="nofollow"
                  >
                    Pensions Tax Manual PTM174100 (lump sum allowance)
                  </a>{" "}
                  <span className="text-[var(--muted)]">(HM Revenue and Customs)</span>
                </li>
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
                Medical Accountants UK analysis of HMRC and NHSBSA data. The downloadable CSV carries
                the HMRC annual allowance series; the lifetime allowance and lump sum allowance figures
                are reproduced on the page with their gov.uk source and fetch date.
              </p>

              <div className="rounded-xl bg-[var(--surface-elevated)] p-4 text-sm text-[var(--ink-soft)]">
                <p className="font-semibold text-[var(--navy)]">How to cite</p>
                <p className="mt-1">
                  Cite as: Medical Accountants UK, Annual Allowance Pension Tax Index, analysis of
                  HMRC Private pension statistics (July 2026), gov.uk published allowance rates and
                  NHSBSA data, 2026. Free to reuse with attribution.
                </p>
                <p className="mt-2 text-xs text-[var(--muted)]">
                  Reviewed on each HMRC annual publication (each July). The charge data here is
                  HMRC&rsquo;s July 2026 edition, published 30 July 2026 and running to the 2024/25 tax
                  year, incorporated on 26 August 2026. Allowance and lifetime allowance rates were
                  checked the same day. Next release: HMRC&rsquo;s next annual edition, due Summer 2027.
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
                Annual allowance and lifetime allowance questions
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
