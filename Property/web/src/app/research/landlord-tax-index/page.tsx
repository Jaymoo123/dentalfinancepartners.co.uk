import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CalculatorTabs } from "@/components/calculators/CalculatorTabs";
import { FaqSection } from "@/components/ui/FaqSection";
import { HeroBrickBackdrop } from "@/components/layout/HeroBrickBackdrop";
import { LeadCTAPanel } from "@/components/property/LeadCTAPanel";
import { TopicSection } from "@/components/property/TopicSection";
import { Eyebrow, InlineLink } from "@/components/ui/page-blocks";
import { btnOnDark, btnPrimary, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildFaqPageJsonLd } from "@/lib/faq-page-schema";
import {
  AnnualIncorporationsChart,
  MonthlyIncorporationsChart,
  HousePriceChart,
} from "@/components/research/LandlordIndexCharts";
import { fmtGBP, fmtInt, monthLabel, type LandlordIndexSnapshot } from "@/lib/research/landlord-index";
import snapshot from "@/data/landlord-tax-index.json";

const data = snapshot as unknown as LandlordIndexSnapshot;
const { meta, headline, incorporations, house_prices } = data;
const decade = headline.decade;
const PRIMARY = headline.primary_sic;

const PAGE_PATH = "/research/landlord-tax-index";
const UK_PRICE = house_prices.latest["United Kingdom"]?.price ?? null;

// A one-line takeaway reused in the title, description and hero.
const HEADLINE_SENTENCE = decade
  ? `New UK landlord limited companies rose ${decade.multiple}x between ${decade.from_year} and ${decade.to_year}`
  : "New UK landlord limited companies keep rising";

export const metadata: Metadata = {
  title: "UK Landlord Tax Index | Limited-company incorporation trends",
  description: `${HEADLINE_SENTENCE}. Quarterly index of BTL incorporations vs UK house prices, from official open data.`,
  alternates: { canonical: `${siteConfig.url}${PAGE_PATH}` },
  openGraph: {
    title: "UK Landlord Tax Index",
    description: `${HEADLINE_SENTENCE}. Buy-to-let limited-company incorporations vs UK house prices, from official open data.`,
    url: `${siteConfig.url}${PAGE_PATH}`,
    type: "article",
  },
};

const faqs = [
  {
    question: "Why are so many landlords setting up limited companies?",
    answer:
      "Since the Section 24 restriction on mortgage interest relief was phased in from 2017, individual landlords have been taxed on rental income without being able to deduct finance costs in full, receiving only a basic-rate (20%) tax credit. Companies are not subject to Section 24 and deduct mortgage interest in full, so higher-rate and leveraged landlords increasingly hold property through a limited company. That tax difference is the main driver of the incorporation trend shown here.",
  },
  {
    question: "Where does this data come from?",
    answer:
      "Incorporation counts come from the Companies House Advanced Search API, counting companies newly incorporated each month under the four real-estate SIC codes (68100, 68201, 68209 and 68320). House prices come from the HM Land Registry UK House Price Index. Both are official, free, public sources. The figures are gross incorporations: dissolved companies remain on the register, so there is no survivorship bias.",
  },
  {
    question: "What does SIC code 68209 mean?",
    answer:
      "68209 is 'Other letting and operating of own or leased real estate', the SIC code most buy-to-let companies register under. It is the closest single proxy for a landlord limited company, which is why we treat it as the primary measure, alongside the deduplicated union of all four property SIC codes as a wider 'all property companies' figure.",
  },
  {
    question: "Should I move my rental properties into a limited company?",
    answer:
      "It depends on your marginal tax rate, mortgage levels, whether you reinvest or draw the income, and the stamp duty and capital gains tax cost of transferring existing properties. Incorporation suits some landlords and not others. Our incorporation and Section 24 calculators model your own numbers, and we can review your position directly.",
  },
];

// ---------------------------------------------------------------------------
// JSON-LD
// ---------------------------------------------------------------------------

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "UK Landlord Tax Index",
  description: `${HEADLINE_SENTENCE}, tracked from Companies House and Land Registry open data.`,
  inLanguage: "en-GB",
  datePublished: "2026-06-09",
  dateModified: meta.generated_at,
  author: { "@type": "Organization", "@id": `${siteConfig.url}#organization`, name: siteConfig.name },
  publisher: { "@id": `${siteConfig.url}#organization` },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}${PAGE_PATH}` },
};

const datasetSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "UK Landlord Tax Index: buy-to-let limited-company incorporations",
  description:
    "Monthly counts of newly incorporated UK property companies by real-estate SIC code (Companies House), set against UK House Price Index average prices (HM Land Registry).",
  inLanguage: "en-GB",
  license: "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
  creator: { "@type": "Organization", "@id": `${siteConfig.url}#organization`, name: siteConfig.name },
  dateModified: meta.generated_at,
  temporalCoverage: `${incorporations.monthly[0]?.month ?? ""}/${meta.incorporations_settled_through ?? meta.incorporations_through}`,
  isAccessibleForFree: true,
  distribution: [
    {
      "@type": "DataDownload",
      encodingFormat: "text/csv",
      contentUrl: `${siteConfig.url}${PAGE_PATH}/data`,
    },
  ],
  variableMeasured: [
    "Monthly company incorporations by real-estate SIC code",
    "UK House Price Index average price by nation",
  ],
};

// ---------------------------------------------------------------------------
// Presentational helpers
// ---------------------------------------------------------------------------

/**
 * A headline number, on the light ground.
 *
 * These four tiles were `bg-white/5` cards in the navy hero. Owner, 2026-08-23:
 * they belong in the body section that explains them, not above it. The light
 * variant is the site's own figure-card recipe (slate card, emerald figure), so
 * the page stops carrying a treatment that exists nowhere else.
 */
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200/70 sm:p-6">
      <div className="text-3xl font-bold tabular-nums text-emerald-800 sm:text-4xl">{value}</div>
      <div className="mt-1.5 text-sm leading-relaxed text-slate-700">{label}</div>
    </div>
  );
}

/**
 * A chart or a table, in the site's figure card.
 *
 * Was `rounded-2xl border border-slate-200`, a radius and a border that appear
 * on no other page. `rounded-xl` and the hairline ring are the shipped recipe.
 * `tone` follows the alternation rule: the card takes the opposite ground to the
 * section it sits in, or it has no edge (DESIGN_SYSTEM.md section 4a).
 */
function FigureCard({
  children,
  tone = "slate",
}: {
  children: React.ReactNode;
  tone?: "slate" | "white";
}) {
  return (
    <div
      className={`mt-8 rounded-xl p-4 ring-1 ring-slate-200/70 sm:mt-10 sm:p-6 ${
        tone === "white" ? "bg-white" : "bg-slate-50"
      }`}
    >
      {children}
    </div>
  );
}

function DataTable({
  head,
  children,
  caption,
}: {
  head: string[];
  children: React.ReactNode;
  caption?: string;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <thead>
          <tr className="border-b-2 border-slate-300 text-left">
            {head.map((h) => (
              <th key={h} className="py-2 pr-4 font-bold text-slate-900">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

// ---------------------------------------------------------------------------

export default function LandlordTaxIndexPage() {
  const settledThrough = meta.incorporations_settled_through ?? meta.incorporations_through;

  // Per-SIC latest-settled breakdown for the table.
  const lastSettled = headline.last_settled_month;
  const latestRow = incorporations.monthly.find((m) => m.month === lastSettled);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqPageJsonLd(faqs)) }} />

      {/* Hero. Navy with the brick backdrop, which is the site's treatment for
          every dark band; this page was the last one still shipping a flat
          `bg-slate-900`. The four stat tiles that used to sit here have moved
          into the Headline numbers section below (owner, 2026-08-23), and the
          primary CTA that replaced them is the page's first ask: this is a
          research surface and a reader could previously reach the foot of it
          without meeting one. */}
      <section className="relative overflow-hidden bg-slate-900 py-12 sm:py-16 lg:py-20">
        <HeroBrickBackdrop />
        <div className={`${siteContainerLg} relative z-10`}>
          <Breadcrumb
            onDark
            items={[
              { label: "Home", href: "/" },
              { label: "Research", href: "/research" },
              { label: "UK Landlord Tax Index" },
            ]}
          />
          <div className="mt-6">
            <Eyebrow onDark>UK Landlord Tax Index</Eyebrow>
          </div>
          <h1 className="max-w-4xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{HEADLINE_SENTENCE}</h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-200 sm:text-lg">
            A quarterly, sourced read on how the tax system is reshaping UK buy-to-let: the number of landlords
            incorporating, set against the house prices that drive their stamp duty and capital gains exposure.
            Built entirely from official open data. Updated {monthLabel(settledThrough)}.
          </p>

          <div className="mt-6 flex flex-col flex-wrap gap-3 sm:mt-8 sm:flex-row sm:gap-4">
            <Link
              href="#book"
              data-cta="index_hero_book"
              data-cta-placement="hero"
              data-cta-goal="form"
              className={`${btnPrimary} bg-emerald-600 px-6 py-3 text-center text-sm sm:px-8 sm:py-3.5 sm:text-base`}
            >
              Book a consultation
            </Link>
            <Link
              href="#calculators"
              data-cta="index_hero_calculators"
              data-cta-placement="hero"
              className={`${btnOnDark} px-6 py-3 text-center text-sm sm:px-8 sm:py-3.5 sm:text-base`}
            >
              Model your own numbers
            </Link>
          </div>
        </div>
      </section>

      <TopicSection
        id="headline"
        eyebrow="The numbers"
        title="The headline figures, and where they come from"
        figure={
          <div className="mt-8 sm:mt-10">
            {/* The four tiles from the old hero. They sit here because this is
                the section that explains them: the sentences beneath restate
                every one of them with its source and its caveat. */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
              <Stat
                value={fmtInt(headline.all_property_cos_ttm)}
                label="property companies incorporated in the last 12 months"
              />
              <Stat
                value={fmtInt(headline.landlord_cos_ttm)}
                label={`buy-to-let companies (SIC ${PRIMARY}) in the last 12 months`}
              />
              <Stat
                value={decade?.multiple ? `${decade.multiple}x` : "Up"}
                label={decade ? `more than in ${decade.from_year}` : "on a decade ago"}
              />
              <Stat value={UK_PRICE ? fmtGBP(UK_PRICE) : "n/a"} label="average UK house price" />
            </div>

            <div className="mt-4 rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70 sm:mt-5 sm:p-8">
              <h3 className="text-base font-bold text-slate-900 sm:text-lg">Key facts</h3>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-700 sm:text-base">
                {decade && (
                  <li>
                    New buy-to-let limited companies (SIC {PRIMARY}) rose from {fmtInt(decade.from_value)} in{" "}
                    {decade.from_year} to {fmtInt(decade.to_value)} in {decade.to_year}, a {decade.multiple}x
                    increase.
                  </li>
                )}
                <li>
                  In the 12 months to {monthLabel(settledThrough)}, {fmtInt(headline.all_property_cos_ttm)} UK
                  property companies were incorporated across the four real-estate SIC codes.
                </li>
                <li>
                  The trend tracks the phase-in of the Section 24 mortgage-interest restriction, which taxes
                  individual landlords on finance costs that companies still deduct in full.
                </li>
                {UK_PRICE && (
                  <li>
                    The average UK house price was {fmtGBP(UK_PRICE)} in {monthLabel(meta.house_prices_through)}{" "}
                    (HM Land Registry UK House Price Index).
                  </li>
                )}
              </ul>
              <p className="mt-4 text-xs leading-relaxed text-slate-500">
                Source: Companies House and HM Land Registry, official open data. Figures may be cited with
                attribution to Property Tax Partners. The most recent {meta.provisional_months.length} months of
                incorporation data are provisional (Companies House indexing lag) and are excluded from the
                figures above.
              </p>
            </div>
          </div>
        }
      >
        <p>
          Everything on this page is built from two official sources and nothing else. The four figures below are
          the ones worth quoting, and each is restated underneath with the caveat that belongs to it.
        </p>
      </TopicSection>

      <TopicSection
        id="incorporations"
        eyebrow="Year on year"
        tone="slate"
        title="Landlord incorporations are climbing year on year"
        figure={
          <FigureCard tone="white">
            <AnnualIncorporationsChart annual={incorporations.annual} sic={PRIMARY} />
          </FigureCard>
        }
      >
        <p>
          Each bar is the number of new companies incorporated that year under SIC code {PRIMARY},{" "}
          {meta.sic_labels[PRIMARY]?.toLowerCase()}, the code most buy-to-let companies register under. Only
          complete calendar years are shown.
        </p>
      </TopicSection>

      <TopicSection
        id="monthly"
        eyebrow="Month by month"
        title="The monthly trend"
        figure={
          <FigureCard>
            <MonthlyIncorporationsChart
              monthly={incorporations.monthly}
              sic={PRIMARY}
              provisionalMonths={meta.provisional_months}
            />
          </FigureCard>
        }
      >
        <p>
          The same measure month by month, which shows both the long climb and the usual seasonal dip around the
          turn of each year. The dashed tail marks the most recent {meta.provisional_months.length} months, which
          are provisional because Companies House indexes very recent incorporations with a short lag.
        </p>
      </TopicSection>

      <TopicSection
        id="breakdown"
        eyebrow="By SIC code"
        tone="slate"
        title="By type of property company"
        figure={
          <FigureCard tone="white">
            <DataTable
              head={["SIC code", "What it covers", "New companies"]}
              caption="New property company incorporations by real-estate SIC code, latest settled month"
            >
              {["68209", "68100", "68320", "68201"].map((code) => (
                <tr key={code} className="border-b border-slate-200">
                  <td className="py-2 pr-4 font-semibold text-slate-900">{code}</td>
                  <td className="py-2 pr-4 text-slate-700">{meta.sic_labels[code]}</td>
                  <td className="py-2 font-semibold text-slate-900">
                    {latestRow ? fmtInt(Number(latestRow[code])) : "n/a"}
                  </td>
                </tr>
              ))}
              <tr className="border-b border-slate-300">
                <td className="py-2 pr-4 font-semibold text-emerald-700">All (deduplicated)</td>
                <td className="py-2 pr-4 text-slate-700">Unique companies across the four codes</td>
                <td className="py-2 font-bold text-emerald-700">
                  {latestRow ? fmtInt(Number(latestRow["union"])) : "n/a"}
                </td>
              </tr>
            </DataTable>
          </FigureCard>
        }
      >
        <p>
          The four real-estate SIC codes capture different kinds of property business. The figures below are for{" "}
          {lastSettled ? monthLabel(lastSettled) : "the latest settled month"}.
        </p>
      </TopicSection>

      <TopicSection
        id="house-prices"
        eyebrow="The backdrop"
        title="The house-price backdrop"
        figure={
          <>
            <FigureCard>
              <HousePriceChart monthly={house_prices.monthly} />
            </FigureCard>
            <FigureCard>
              <DataTable
                head={["Nation / region", "Average price", "Annual change"]}
                caption="Average house price and annual change by nation and region"
              >
                {house_prices.regions.map((r) => {
                  const row = house_prices.latest[r];
                  if (!row) return null;
                  return (
                    <tr key={r} className="border-b border-slate-200">
                      <td className="py-2 pr-4 font-semibold text-slate-900">{r}</td>
                      <td className="py-2 pr-4 text-slate-900">{fmtGBP(row.price)}</td>
                      <td className="py-2 text-slate-700">
                        {row.annual_change_pct === undefined ? "n/a" : `${row.annual_change_pct}%`}
                      </td>
                    </tr>
                  );
                })}
              </DataTable>
            </FigureCard>
          </>
        }
      >
        <p>
          Incorporation is partly a response to rising values: a bigger portfolio means a bigger capital gains and
          stamp duty exposure, which changes the maths on holding property personally versus through a company.
          Average prices by nation, from the UK House Price Index:
        </p>
      </TopicSection>

      <TopicSection
        id="calculators"
        eyebrow="Your own figures"
        tone="slate"
        title="What the trend means for your own portfolio"
      >
        <p>
          The trend is real, and the answer is still individual. It turns on your tax rate, your mortgage levels,
          and the stamp duty and capital gains cost of transferring properties you already own. Both tools below
          run on your own numbers rather than on the averages above.
        </p>
        <p>
          {/* Literal href, not a constant. This section renders `CalculatorTabs`,
              which emits <button role="tab"> and no crawlable link, so
              `calculator-tabs-crawl-path.test.ts` requires a real per-tool <a href>
              in this file's own markup. That guard is a source scan and cannot see
              through a constant, so keep this spelled out. */}
          The{" "}
          <InlineLink href="/calculators/incorporation-cost-calculator">incorporation cost calculator</InlineLink>{" "}
          prices the move itself, and the Section 24 tab shows what the restriction costs you where you are now.
          The{" "}
          <InlineLink href="/blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk">
            full incorporation guide
          </InlineLink>{" "}
          takes the decision end to end.
        </p>
        {/* Was two related links reading "Incorporation cost calculator →" and
            "Section 24 calculator →". Standing rule (owner, 2026-08-23): a
            calculator never gets a card or a link where the tool itself can
            render, so both are tabs on the page. */}
        <div className="mt-8 sm:mt-10">
          <CalculatorTabs tabs={["incorporation", "section24"]} />
        </div>
      </TopicSection>

      <TopicSection
        id="methodology"
        eyebrow="How it is built"
        title="Methodology and sources"
        figure={
          <div className="mt-8 rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70 sm:mt-10 sm:p-8">
            <h3 className="text-base font-bold text-slate-900 sm:text-lg">Sources</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {meta.sources.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.url}
                    className="font-semibold text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
                    rel="nofollow"
                  >
                    {s.name}
                  </a>{" "}
                  <span className="text-slate-500">({s.publisher})</span>
                </li>
              ))}
              <li>
                <Link
                  href={`${PAGE_PATH}/data`}
                  className="font-semibold text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
                >
                  Download the incorporation data (CSV)
                </Link>
              </li>
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-slate-500">
              Free to cite with attribution to Property Tax Partners. This page is a data summary and not tax
              advice on any individual situation.
            </p>
          </div>
        }
      >
        <p>
          <strong>Incorporations.</strong> For each month we query the Companies House Advanced Search API for
          companies incorporated in that month under each real-estate SIC code (68100, 68201, 68209, 68320), plus
          the deduplicated union across all four. Counts are gross: a company that has since been dissolved still
          remains on the register, so the series is not affected by survivorship. The most recent{" "}
          {meta.provisional_months.length} months are provisional and excluded from headline figures.
        </p>
        <p>
          <strong>House prices.</strong> Average prices come from the HM Land Registry UK House Price Index, the
          official measure for the UK and its nations.
        </p>
        <p>
          <strong>Updated.</strong> Incorporations to {monthLabel(settledThrough)}; house prices to{" "}
          {monthLabel(meta.house_prices_through)}. Data generated{" "}
          {monthLabel(meta.generated_at.slice(0, 7))}.
        </p>
      </TopicSection>

      {/* The closing ask. Was a mint gradient card holding a bare `LeadForm`, a
          treatment that exists nowhere else on the site. This is the same
          full-bleed navy brick panel every other page closes on, and the target
          of the hero's primary CTA. `redirectOnSuccess` is false, as it was
          before: a reader who converts here should keep the data on screen. */}
      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          title="Wondering if incorporation is right for your portfolio?"
          description="The trend is real, but the answer is individual. It turns on your tax rate, your mortgage levels, and the stamp duty and capital gains cost of transferring existing properties. Tell us what you own and we will tell you whether the numbers work."
          proofPoints={[
            { title: "Property tax only", detail: "Section 24, CGT and MTD every day" },
            { title: "Fixed fees, quoted upfront", detail: "In writing, before any work starts" },
            { title: "24-hour response", detail: "Usually the same working day" },
          ]}
          submitLabel="Request a portfolio review"
          redirectOnSuccess={false}
          footnote="No obligation and no hard sell. If your position is already right, we will say so."
        />
      </div>

      {/* The shared accordion, replacing four hand-rolled h3 and paragraph
          pairs. Light band, which also keeps the navy panel above it off the
          navy footer (adjacency rule). */}
      <FaqSection faqs={faqs} />
    </>
  );
}
