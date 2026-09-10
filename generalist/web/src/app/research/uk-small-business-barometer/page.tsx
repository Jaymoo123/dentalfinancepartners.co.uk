import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow, InlineLink } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { FaqSection } from "@accounting-network/web-shared/design/primitives/FaqSection";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { GeneralistBackdrop } from "@/components/layout/GeneralistBackdrop";
import { LeadForm } from "@/components/forms/LeadForm";
import { LEAD_PROOF_POINTS } from "@/lib/blog-cta-map";
import { siteContainerLg, btnOnDark, linkArrow } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { JsonLd, buildDataset, buildFaqPage } from "@/lib/schema";
import { Stat, Section, FigureCard } from "@/components/research/ResearchLayout";
import { VerticalBarChart } from "@/components/research/Charts";
import { fmtNumber, fmtPercent, fmtPct1, monthLabel } from "@/lib/research/format";
import type { SmeBarometerSnapshot } from "@/lib/research/sme-barometer";
import snapshot from "@/data/uk-small-business-barometer.json";

const data = snapshot as unknown as SmeBarometerSnapshot;
const { meta, headline, register, insolvency, survival, population } = data;

const PAGE_PATH = "/research/uk-small-business-barometer";

const SOURCE_COMPANIES_HOUSE = "Companies House, Incorporated companies in the UK (Open Government Licence v3.0)";
const SOURCE_INSOLVENCY_SERVICE = "The Insolvency Service, Company Insolvency Statistics, England and Wales (Open Government Licence v3.0)";
const SOURCE_ONS = "ONS / Department for Business and Trade, Business Demography and Business Population Estimates (Open Government Licence v3.0)";

const HEADLINE_SENTENCE = `${fmtNumber(headline.incorporations.incorporations_fye)} new UK companies were incorporated in the year to ${monthLabel(headline.incorporations.as_of)}, against ${fmtNumber(headline.incorporations.dissolutions_fye)} dissolutions`;

export const metadata: Metadata = {
  title: "State of UK Small Business Barometer 2026 | Holloway Davies",
  description: `${HEADLINE_SENTENCE}. Fusing Companies House formations, Insolvency Service data, and ONS survival and population statistics into one all-sector UK SME barometer. Free to cite.`,
  alternates: { canonical: `${siteConfig.url}${PAGE_PATH}` },
  openGraph: {
    title: "State of UK Small Business Barometer | Holloway Davies",
    description: HEADLINE_SENTENCE,
    url: `${siteConfig.url}${PAGE_PATH}`,
    type: "article",
  },
};

const faqs = [
  {
    question: "What is the State of UK Small Business Barometer?",
    answer:
      "It is a quarterly-refreshed, all-sector barometer that fuses four national UK series into one read on small business conditions: Companies House company formations and dissolutions, Insolvency Service company insolvency statistics, ONS Business Demography survival rates, and ONS/DBT Business Population Estimates. Unlike a single-sector index, it covers the whole UK economy, every SIC section, every legal structure.",
  },
  {
    question: "Is the number of UK businesses growing or shrinking?",
    answer: `The UK private sector business population stood at ${fmtNumber(population.timeseries.at(-1)?.total)} at the start of ${headline.population.as_of_start_year}, up ${fmtPercent(headline.population.yoy_pct)} on the year before. Growth has been positive most years since 2010, though the population fell in 2021 to 2023 following the pandemic before recovering. Company incorporations are still comfortably outpacing dissolutions nationally, but the gap has narrowed.`,
  },
  {
    question: "What share of UK businesses are small or medium-sized?",
    answer: `${fmtPct1(headline.population.sme_pct)} of UK private sector businesses are SMEs (fewer than 250 employees) by the official Business Population Estimates definition. ${fmtPct1(headline.population.no_employees_pct)} employ nobody except the owner. Large businesses with 250 or more employees are a small fraction of the total business count, though they employ a disproportionate share of the workforce.`,
  },
  {
    question: "How many UK businesses survive five years?",
    answer: `Of the enterprises born in ${headline.survival.latest_5yr_cohort_year} (the most recent birth-year cohort with a full five-year track record), ${fmtPct1(headline.survival.latest_5yr_pct)} were still active five years later, according to ONS Business Demography. Survival drops off fastest in the first year or two; a large majority of businesses that fail do so early.`,
  },
  {
    question: "Which sectors have the most company insolvencies?",
    answer:
      "See our companion page, the UK Sector Insolvency League, which ranks every SIC section by trailing 12-month company insolvencies. Construction, wholesale and retail, and accommodation and food service consistently rank highest by volume, though that partly reflects the size of those sectors, not just their riskiness.",
  },
  {
    question: "Where does this data come from and how often is it updated?",
    answer:
      "Every figure is drawn directly from official UK government statistics: Companies House quarterly official statistics (Incorporated companies in the UK), The Insolvency Service's monthly Company Insolvency Statistics, and ONS/DBT's Business Demography and Business Population Estimates releases. All are published under the Open Government Licence v3.0. We refresh this barometer as each new release lands: monthly for insolvencies, quarterly for company formations, annually for survival and population.",
  },
];

export default function UkSmallBusinessBarometerPage() {
  const dataset = buildDataset({
    name: "State of UK Small Business Barometer",
    description:
      "Fused national UK series: company formations and dissolutions (Companies House), company insolvencies (Insolvency Service), business survival rates and business population (ONS/DBT). All-sector, all UK.",
    path: PAGE_PATH,
    distributionPath: `${PAGE_PATH}/data`,
    dateModified: meta.generated_at,
    temporalCoverage: "2010/2026",
    keywords: [
      "UK small business statistics",
      "company insolvencies UK",
      "company formations UK",
      "business survival rate UK",
      "UK business population",
      "SME statistics",
    ],
    license: "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
    spatialCoverage: "United Kingdom",
  });
  // ONE binding: this exact array is what `<FaqSection faqs={faqs}>` renders at
  // the foot of the page. A projection here is how schema and visible copy drift.
  const faqPage = buildFaqPage(faqs);

  const annualInsolvency = insolvency.annual
    .filter((r) => r.year < 2026)
    .map((r) => ({ label: String(r.year), value: r.total }));

  const registerByYear = (() => {
    const byYear = new Map<string, { inc: number; diss: number }>();
    for (const q of register.quarterly) {
      const y = q.quarter_end.slice(0, 4);
      const cur = byYear.get(y) ?? { inc: 0, diss: 0 };
      cur.inc += q.incorporations;
      cur.diss += q.dissolutions;
      byYear.set(y, cur);
    }
    return Array.from(byYear.entries())
      .slice(0, -1) // drop the in-progress current year (partial)
      .map(([y, v]) => ({ label: y, value: v.inc, secondaryValue: v.diss }));
  })();

  const survivalCurve = survival.cohorts
    .filter((c) => c.y5_pct !== null)
    .slice(-1)
    .flatMap((c) => [
      { label: "1 yr", value: c.y1_pct ?? 0 },
      { label: "2 yr", value: c.y2_pct ?? 0 },
      { label: "3 yr", value: c.y3_pct ?? 0 },
      { label: "4 yr", value: c.y4_pct ?? 0 },
      { label: "5 yr", value: c.y5_pct ?? 0 },
    ]);

  const populationSeries = population.timeseries.map((r) => ({ label: String(r.year).slice(2), value: r.total }));

  return (
    <>
      <JsonLd data={faqPage ? [dataset, faqPage] : [dataset]} />

      <section className="relative flex min-h-[300px] items-center overflow-hidden bg-slate-900 py-10 sm:min-h-[350px] sm:py-12 lg:py-14">
        <GeneralistBackdrop tone="navy" />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Breadcrumb
              siteUrl={siteConfig.url}
              onDark
              items={[
                { label: "Home", href: "/" },
                { label: "Research", href: "/research" },
                { label: "State of UK Small Business" },
              ]}
            />
            <Eyebrow onDark>State of UK Small Business Barometer</Eyebrow>
            <h1 className="text-3xl font-bold leading-[1.15] text-white text-balance sm:text-4xl lg:text-5xl">
              {HEADLINE_SENTENCE}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
              The all-sector, all-UK read on small business conditions, fusing Companies House
              formations, Insolvency Service insolvencies, and ONS/DBT survival and population data
              into one quarterly barometer. Updated {monthLabel(headline.insolvency.last_settled_month)}.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href="#book"
                data-cta="research_uk_small_business_barometer_hero_book"
                data-cta-placement="hero"
                data-cta-goal="form"
                className={btnOnDark}
              >
                Speak to an accountant
              </a>
              <Link
                href={`${PAGE_PATH}/data`}
                data-cta="research_uk_small_business_barometer_hero_data"
                data-cta-placement="hero"
                className="py-0.5 text-sm font-semibold text-primary-400 underline underline-offset-4 transition-colors hover:text-primary-300"
              >
                Download the data (CSV)
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Section id="key-findings" title="Key findings" tone="slate">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Stat
            value={fmtNumber(headline.incorporations.incorporations_fye)}
            label={`new company incorporations, ${headline.incorporations.fye_label}`}
          />
          <Stat
            value={fmtPercent(headline.incorporations.register_yoy_pct)}
            label="growth in the UK company register, year on year"
          />
          <Stat
            value={fmtNumber(headline.insolvency.ttm_total)}
            label="company insolvencies, trailing 12 months (England and Wales)"
          />
          <Stat
            value={fmtPct1(headline.population.sme_pct)}
            label={`of ${fmtNumber(headline.population.total_businesses)} UK businesses are SMEs`}
          />
        </div>
        <ul className="list-disc space-y-3 pl-5 marker:text-primary-600">
          <li>
            {fmtNumber(headline.incorporations.incorporations_fye)} new companies were
            incorporated across the UK in the year to {monthLabel(headline.incorporations.as_of)},
            up {fmtPercent(headline.incorporations.incorporations_yoy_pct)} year on year, against{" "}
            {fmtNumber(headline.incorporations.dissolutions_fye)} dissolutions, up{" "}
            {fmtPercent(headline.incorporations.dissolutions_yoy_pct)}. Britain is still starting
            companies faster than it closes them, but dissolutions are growing faster than
            formations, narrowing the gap.
          </li>
          <li>
            The effective UK company register stood at{" "}
            {fmtNumber(headline.incorporations.register_effective)} companies as of{" "}
            {monthLabel(headline.incorporations.as_of)}, growth of{" "}
            {fmtPercent(headline.incorporations.register_yoy_pct)} on the year.
          </li>
          <li>
            {fmtNumber(headline.insolvency.ttm_total)} companies entered insolvency across
            England and Wales in the 12 months to {monthLabel(headline.insolvency.last_settled_month)}.{" "}
            {fmtPct1(headline.insolvency.cvl_pct_ttm)} of these were Creditors&apos; Voluntary
            Liquidations, directors choosing to wind up voluntarily rather than a bank or
            creditor forcing the issue through the courts, the clearest signal of owner-led
            distress rather than external pressure.
          </li>
          <li>
            Of businesses born in {headline.survival.latest_5yr_cohort_year}, only{" "}
            {fmtPct1(headline.survival.latest_5yr_pct)} were still trading five years later.
            The UK private sector counted {fmtNumber(headline.population.total_businesses)}{" "}
            businesses at the start of {headline.population.as_of_start_year}, up{" "}
            {fmtPercent(headline.population.yoy_pct)} ({fmtNumber(headline.population.yoy_abs)}{" "}
            more) on the year before.
          </li>
          <li>
            {fmtPct1(headline.population.sole_proprietorships_pct)} of UK businesses are sole
            proprietorships, {fmtPct1(headline.population.companies_pct)} are companies, and{" "}
            {fmtPct1(headline.population.partnerships_pct)} are ordinary partnerships.{" "}
            {fmtPct1(headline.population.no_employees_pct)} employ nobody but the owner.
          </li>
        </ul>
        <p className="text-xs text-slate-500">
          Sources: Companies House, The Insolvency Service, Office for National Statistics /
          Department for Business and Trade, all under the Open Government Licence v3.0. Free to
          cite with attribution to Holloway Davies.
        </p>
      </Section>

      <Section id="formations" title="Company formations vs dissolutions">
        <p>
          Each pair of bars shows new company incorporations against dissolutions for that calendar
          year, UK-wide. The gap between the two is the net growth in the company register.
        </p>
        <FigureCard tone="slate" source={SOURCE_COMPANIES_HOUSE}>
          <VerticalBarChart data={registerByYear} seriesLabels={["Incorporations", "Dissolutions"]} />
        </FigureCard>
        <p className="text-sm text-slate-600">
          Formations peak in {register.seasonality.slice().sort((a, b) => b.avg_incorporations - a.avg_incorporations)[0]?.calendar_quarter}{" "}
          on average, the busiest quarter for new company registrations across the period covered.
        </p>
      </Section>

      <Section id="insolvency" title="Company insolvencies, all sectors" tone="slate">
        <p>
          Total registered company insolvencies by year, England and Wales, all SIC sections
          combined (2026 year to date excluded as a partial year). See the{" "}
          <InlineLink href="/research/uk-sector-insolvency-league">
            UK Sector Insolvency League
          </InlineLink>{" "}
          for the sector-by-sector breakdown.
        </p>
        <FigureCard source={SOURCE_INSOLVENCY_SERVICE}>
          <VerticalBarChart data={annualInsolvency} />
        </FigureCard>
      </Section>

      <Section id="survival" title="How many new businesses survive?">
        <p>
          Survival rate of the {headline.survival.latest_5yr_cohort_year} birth-year cohort of UK
          enterprises, tracked for five years by ONS Business Demography. Attrition is steepest in
          year one; survivors of the first two years have a much better chance of lasting the full
          five.
        </p>
        <FigureCard tone="slate" source={SOURCE_ONS}>
          <VerticalBarChart data={survivalCurve} format="percent" />
        </FigureCard>
      </Section>

      <Section id="population" title="The UK business population, 2010 to present" tone="slate">
        <p>
          Total UK private sector business count at the start of each year, from ONS/DBT Business
          Population Estimates. The population dipped through the pandemic years before recovering
          to a new high.
        </p>
        <FigureCard source={SOURCE_ONS}>
          <VerticalBarChart data={populationSeries} />
        </FigureCard>
      </Section>

      <Section id="methodology" title="Methodology and sources">
        <p>
          <strong>Company formations and dissolutions.</strong> Companies House&apos;s quarterly
          official statistics release, &quot;Incorporated companies in the UK&quot;, UK-wide, all
          corporate body types classed &quot;All companies&quot;.
        </p>
        <p>
          <strong>Company insolvencies.</strong> The Insolvency Service&apos;s monthly Company
          Insolvency Statistics, all-sector totals and procedure mix (Tables A1a and 1b). Coverage
          is England and Wales only; Scotland and Northern Ireland insolvencies are published
          separately and are not included here.
        </p>
        <p>
          <strong>Survival.</strong> ONS Business Demography Table 4.2, the &quot;Total&quot; row
          (all industries), tracking each birth-year cohort of enterprises for up to five years.
        </p>
        <p>
          <strong>Population.</strong> ONS/DBT Business Population Estimates, the headline UK
          private sector business count, legal-status split, and employment size bands.
        </p>
        <p>
          <strong>Caveats.</strong> Insolvency counts are gross registered events, not rates against
          the number of active companies, so sector or year-on-year comparisons should account for
          the size of the underlying population. The 2026 calendar year is partial and excluded from
          annual bar charts. Company register figures are UK-wide; insolvency figures are England
          and Wales only, a difference in geographic coverage that this page states throughout.
        </p>
        <ul className="mt-2 space-y-1 text-sm">
          {meta.sources.map((s) => (
            <li key={s.name}>
              <a
                href={s.release_page}
                className="font-semibold text-primary-700 underline underline-offset-2 hover:text-primary-800"
                rel="nofollow"
              >
                {s.name}
              </a>{" "}
              <span className="text-slate-500">
                ({s.publisher}
                {s.coverage ? `, ${s.coverage}` : ""})
              </span>
            </li>
          ))}
        </ul>
        <p>
          <Link
            href={`${PAGE_PATH}/data`}
            data-cta="research_uk_small_business_barometer_csv"
            data-cta-placement="methodology"
            className={linkArrow}
          >
            Download the barometer data (CSV)
          </Link>
        </p>
        <p className="text-sm text-slate-500">
          Free to cite and republish with attribution to Holloway Davies, under the Open Government
          Licence v3.0 terms of the underlying releases. This page is a data summary and does not
          constitute financial, tax or business advice for any individual situation.
        </p>
      </Section>

      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          eyebrow="Free consultation"
          title="Running a small business in a tightening market?"
          description="Rising insolvencies and narrowing formation growth mean cash flow, tax planning and structure decisions matter more, not less. Holloway Davies works with UK limited companies, contractors, sole traders and partnerships on exactly these questions."
          proofPoints={LEAD_PROOF_POINTS}
          form={<LeadForm submitLabel="Speak to an accountant" redirectOnSuccess={false} />}
          backdrop={<GeneralistBackdrop tone="navy" />}
          footnote={
            <>
              Prefer to look around first? See{" "}
              <InlineLink href="/services" onDark>
                what we do
              </InlineLink>{" "}
              or start with a{" "}
              <InlineLink href="/free-health-check" onDark>
                free business health check
              </InlineLink>
              . If your position is already right, we will say so.
            </>
          }
        />
      </div>

      <FaqSection faqs={faqs} className="bg-white py-12 sm:py-16 lg:py-20" />
    </>
  );
}
