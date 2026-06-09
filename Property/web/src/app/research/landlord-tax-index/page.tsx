import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
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
  description: `${HEADLINE_SENTENCE}. A quarterly, sourced index of buy-to-let limited-company incorporations (Companies House) set against UK house prices (Land Registry). Free data, updated ${monthLabel(meta.incorporations_settled_through ?? meta.incorporations_through)}.`,
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
// Small presentational helpers
// ---------------------------------------------------------------------------

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl bg-white/5 p-5 ring-1 ring-white/10">
      <div className="text-3xl font-bold text-white sm:text-4xl">{value}</div>
      <div className="mt-1 text-sm text-slate-300">{label}</div>
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-slate-200 py-10 first:border-t-0">
      <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-slate-700">{children}</div>
    </section>
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

      {/* Hero */}
      <section className="bg-slate-900 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Research", href: "/research" },
              { label: "UK Landlord Tax Index" },
            ]}
          />
          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-emerald-400">
            UK Landlord Tax Index
          </p>
          <h1 className="mt-2 max-w-4xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {HEADLINE_SENTENCE}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-300">
            A quarterly, sourced read on how the tax system is reshaping UK buy-to-let: the number of
            landlords incorporating, set against the house prices that drive their stamp duty and capital
            gains exposure. Built entirely from official open data. Updated {monthLabel(settledThrough)}.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat value={fmtInt(headline.all_property_cos_ttm)} label="property companies incorporated in the last 12 months" />
            <Stat value={fmtInt(headline.landlord_cos_ttm)} label={`buy-to-let companies (SIC ${PRIMARY}) in the last 12 months`} />
            <Stat
              value={decade?.multiple ? `${decade.multiple}x` : "Up"}
              label={decade ? `more than in ${decade.from_year}` : "on a decade ago"}
            />
            <Stat value={UK_PRICE ? fmtGBP(UK_PRICE) : "n/a"} label="average UK house price" />
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-white py-10 sm:py-14">
        <div className={siteContainerLg}>
          <div className="max-w-4xl">
            {/* Key facts: LLM-extractable, plain sentences */}
            <div className="rounded-2xl border border-emerald-600/20 bg-emerald-50/60 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-emerald-800">Key facts</h2>
              <ul className="mt-4 space-y-2 text-base leading-relaxed text-slate-800">
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
              <p className="mt-4 text-xs text-slate-500">
                Source: Companies House and HM Land Registry, official open data. Figures may be cited with
                attribution to Property Tax Partners. The most recent {meta.provisional_months.length} months
                of incorporation data are provisional (Companies House indexing lag) and are excluded from the
                figures above.
              </p>
            </div>

            <Section id="incorporations" title="Landlord incorporations are climbing year on year">
              <p>
                Each bar is the number of new companies incorporated that year under SIC code {PRIMARY},
                {" "}
                {meta.sic_labels[PRIMARY]?.toLowerCase()}, the code most buy-to-let companies register under.
                Only complete calendar years are shown.
              </p>
              <div className="not-prose mt-6 rounded-2xl border border-slate-200 p-4 sm:p-6">
                <AnnualIncorporationsChart annual={incorporations.annual} sic={PRIMARY} />
              </div>
            </Section>

            <Section id="monthly" title="The monthly trend">
              <p>
                The same measure month by month, which shows both the long climb and the usual seasonal dip
                around the turn of each year. The dashed tail marks the most recent {meta.provisional_months.length}{" "}
                months, which are provisional because Companies House indexes very recent incorporations with a
                short lag.
              </p>
              <div className="not-prose mt-6 rounded-2xl border border-slate-200 p-4 sm:p-6">
                <MonthlyIncorporationsChart
                  monthly={incorporations.monthly}
                  sic={PRIMARY}
                  provisionalMonths={meta.provisional_months}
                />
              </div>
            </Section>

            <Section id="breakdown" title="By type of property company">
              <p>
                The four real-estate SIC codes capture different kinds of property business. The figures below
                are for {lastSettled ? monthLabel(lastSettled) : "the latest settled month"}.
              </p>
              <div className="not-prose mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-slate-300 text-left">
                      <th className="py-2 pr-4 font-bold text-slate-900">SIC code</th>
                      <th className="py-2 pr-4 font-bold text-slate-900">What it covers</th>
                      <th className="py-2 font-bold text-slate-900">New companies</th>
                    </tr>
                  </thead>
                  <tbody>
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
                  </tbody>
                </table>
              </div>
            </Section>

            <Section id="house-prices" title="The house-price backdrop">
              <p>
                Incorporation is partly a response to rising values: a bigger portfolio means a bigger capital
                gains and stamp duty exposure, which changes the maths on holding property personally versus
                through a company. Average prices by nation, from the UK House Price Index:
              </p>
              <div className="not-prose mt-6 rounded-2xl border border-slate-200 p-4 sm:p-6">
                <HousePriceChart monthly={house_prices.monthly} />
              </div>
              <div className="not-prose mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-slate-300 text-left">
                      <th className="py-2 pr-4 font-bold text-slate-900">Nation / region</th>
                      <th className="py-2 pr-4 font-bold text-slate-900">Average price</th>
                      <th className="py-2 font-bold text-slate-900">Annual change</th>
                    </tr>
                  </thead>
                  <tbody>
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
                  </tbody>
                </table>
              </div>
            </Section>

            <Section id="methodology" title="Methodology and sources">
              <p>
                <strong>Incorporations.</strong> For each month we query the Companies House Advanced Search API
                for companies incorporated in that month under each real-estate SIC code (68100, 68201, 68209,
                68320), plus the deduplicated union across all four. Counts are gross: a company that has since
                been dissolved still remains on the register, so the series is not affected by survivorship.
                The most recent {meta.provisional_months.length} months are provisional and excluded from
                headline figures.
              </p>
              <p>
                <strong>House prices.</strong> Average prices come from the HM Land Registry UK House Price
                Index, the official measure for the UK and its nations.
              </p>
              <p>
                <strong>Updated.</strong> Incorporations to {monthLabel(settledThrough)}; house prices to{" "}
                {monthLabel(meta.house_prices_through)}. Data generated {monthLabel(meta.generated_at.slice(0, 7))}.
              </p>
              <ul className="not-prose mt-2 space-y-1 text-sm">
                {meta.sources.map((s) => (
                  <li key={s.name}>
                    <a href={s.url} className="font-semibold text-emerald-700 hover:text-emerald-800" rel="nofollow">
                      {s.name}
                    </a>{" "}
                    <span className="text-slate-500">({s.publisher})</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm">
                <Link href={`${PAGE_PATH}/data`} className="font-semibold text-emerald-700 hover:text-emerald-800">
                  Download the incorporation data (CSV)
                </Link>
              </p>
              <p className="text-sm text-slate-500">
                Free to cite with attribution to Property Tax Partners. This page is a data summary and not tax
                advice on any individual situation.
              </p>
            </Section>

            {/* Conversion */}
            <div className="mt-10 rounded-2xl border-2 border-emerald-600/20 bg-gradient-to-br from-emerald-50 to-teal-50 p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-emerald-700 sm:text-3xl">
                Wondering if incorporation is right for your portfolio?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                The trend is real, but the answer is individual. It turns on your tax rate, mortgage levels, and
                the stamp duty and capital gains cost of transferring existing properties. Model your own numbers
                with our calculators, or tell us about your portfolio for a no-obligation review.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                <Link href="/calculators/incorporation-cost-calculator" className="text-emerald-700 hover:text-emerald-800">
                  Incorporation cost calculator →
                </Link>
                <Link href="/calculators/section-24-calculator" className="text-emerald-700 hover:text-emerald-800">
                  Section 24 calculator →
                </Link>
                <Link
                  href="/blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk"
                  className="text-slate-500 hover:text-emerald-700"
                >
                  Full incorporation guide →
                </Link>
              </div>
              <div className="mt-8">
                <LeadForm redirectOnSuccess={false} submitLabel="Request a portfolio review" />
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Frequently asked questions</h2>
              <div className="mt-6 space-y-6">
                {faqs.map((f, i) => (
                  <div key={i}>
                    <h3 className="text-lg font-bold text-slate-900">{f.question}</h3>
                    <p className="mt-2 text-base leading-relaxed text-slate-700">{f.answer}</p>
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
