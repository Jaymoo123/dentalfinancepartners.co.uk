import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { LeadForm } from "@/components/forms/LeadForm";
import { siteConfig } from "@/config/site";
import { buildFaqJsonLd, buildArticleJsonLd } from "@/lib/schema";
import { BusinessTypeRatingChart } from "@/components/research/FsaHygieneCharts";
import {
  fmtNumber,
  fmtPct,
  type FsaHygieneIndexSnapshot,
} from "@/lib/research/hospitality-fsa-hygiene-index";
import snapshot from "@/data/hospitality-fsa-hygiene-index.json";

const data = snapshot as unknown as FsaHygieneIndexSnapshot;
const { meta, headline, business_types, local_authority_league_table } = data;

const PAGE_PATH = "/research/uk-hospitality-food-hygiene-map";

export const metadata: Metadata = {
  title: "UK Hospitality Food Hygiene Map | FHRS/FHIS ratings by region | Hospitality Tax",
  description: `${fmtNumber(headline.total_establishments)} UK hospitality establishments rated for food hygiene, ${fmtPct(headline.national_top_rating_5_share_pct)} at the top FHRS rating. A sourced, local-authority breakdown from the FSA ratings API. Aggregate data only.`,
  alternates: { canonical: `${siteConfig.url}${PAGE_PATH}` },
  openGraph: {
    title: "UK Hospitality Food Hygiene Map | Hospitality Tax",
    description: `Local-authority food hygiene ratings across UK restaurants, pubs, hotels and takeaways, from the FSA open ratings API.`,
    url: `${siteConfig.url}${PAGE_PATH}`,
    type: "article",
  },
};

const faqs = [
  {
    question: "What is the FHRS and FHIS food hygiene rating?",
    answer:
      "The Food Hygiene Rating Scheme (FHRS) is used in England, Wales and Northern Ireland, scoring food businesses from 0 (urgent improvement necessary) to 5 (very good) after an inspection by the local authority. Scotland runs a separate scheme, the Food Hygiene Information Scheme (FHIS), which uses a Pass or Improvement Required outcome instead of a numeric score. Both schemes are run by local authorities and published by the Food Standards Agency (FSA).",
  },
  {
    question: "What share of UK hospitality businesses have a top hygiene rating?",
    answer: `Across the FHRS-rated hospitality establishments covered here (England, Wales and Northern Ireland), ${fmtPct(headline.national_top_rating_5_share_pct)} hold the top rating of 5. In Scotland, under the separate FHIS scheme, ${fmtPct(headline.scotland_pass_rate_pct)} of rated hospitality establishments hold a Pass.`,
  },
  {
    question: "Does this page name any specific business or its rating?",
    answer:
      "No. This page and its underlying dataset report aggregate counts only, grouped by local authority and by business type (restaurants and cafes, pubs and bars, hotels, takeaways, mobile caterers, other catering premises). No individual establishment name, address or FSA establishment ID (FHRSID) appears anywhere in the dataset or on this page. This is a deliberate policy to avoid identifying any specific low-rated business.",
  },
  {
    question: "Why do some local authorities show much higher or lower top-rating shares?",
    answer:
      "Differences can reflect local authority inspection frequency and backlog, the age and condition of the local hospitality stock, local authority resourcing for environmental health teams, and genuine variation in food hygiene standards. Local authorities with under 150 rated hospitality establishments are excluded from the league tables here to avoid small-sample noise.",
  },
  {
    question: "Where does this data come from and how often is it updated?",
    answer:
      "Data comes from the FSA Ratings API (api.ratings.food.gov.uk), a free, keyless, publicly accessible API covering every FHRS and FHIS rated food business in the UK, refreshed as local authorities publish new inspections. This page reflects a point-in-time pull; ratings on the live FSA site may have changed since.",
  },
];

const articleJsonLd = buildArticleJsonLd({
  title: "UK Hospitality Food Hygiene Map",
  description: `${fmtNumber(headline.total_establishments)} UK hospitality establishments rated for food hygiene, aggregated by local authority and business type from the FSA ratings API.`,
  url: PAGE_PATH,
  datePublished: "2026-07-23",
  dateModified: meta.generated_at,
});

const datasetSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "UK Hospitality Food Hygiene Map: FHRS/FHIS ratings by local authority and business type",
  description:
    "Aggregate food hygiene rating counts for UK restaurants, cafes, pubs, bars, hotels, takeaways and mobile caterers, grouped by local authority and business type. No individual establishment is identified.",
  inLanguage: "en-GB",
  license: meta.open_data_page,
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
    "Hospitality establishment count by local authority",
    "Hospitality establishment count by business type",
    "Share of establishments rated top FHRS score (5) by business type",
    "Share of establishments rated top FHRS score (5) by local authority",
    "Scotland FHIS pass rate",
  ],
};

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-white/15 bg-white/10 p-5">
      <div className="text-3xl font-bold text-white sm:text-4xl">{value}</div>
      <div className="mt-1 text-sm text-white/80">{label}</div>
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-[var(--border)] py-10 first:border-t-0">
      <h2 className="text-2xl font-bold text-[var(--ink)] sm:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-[var(--ink-soft)]">{children}</div>
    </section>
  );
}

function LaTable({ rows, title }: { rows: typeof local_authority_league_table.top15_by_top_rating_share; title: string }) {
  return (
    <div className="not-prose mt-4 overflow-x-auto">
      <p className="mb-2 text-sm font-semibold text-[var(--ink)]">{title}</p>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b-2 border-[var(--border)] text-left">
            <th className="py-2 pr-4 font-bold text-[var(--ink)]">Local authority</th>
            <th className="py-2 pr-4 text-right font-bold text-[var(--ink)]">Hospitality establishments</th>
            <th className="py-2 text-right font-bold text-[var(--ink)]">Top rating (5) share</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.local_authority} className="border-b border-[var(--border)]">
              <td className="py-2 pr-4 text-[var(--ink-soft)]">{r.local_authority}</td>
              <td className="py-2 pr-4 text-right tabular-nums text-[var(--ink-soft)]">
                {fmtNumber(r.total_hospitality_establishments)}
              </td>
              <td className="py-2 text-right tabular-nums font-medium text-[var(--ink)]">
                {fmtPct(r.top_rating_5_share_pct)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function UKHospitalityFoodHygieneMapPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleJsonLd }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(faqs) }} />

      <main>
        <section className="bg-[var(--brand-primary)] py-14 sm:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-white/70">Research</p>
            <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
              UK Hospitality Food Hygiene Map
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/85">
              {fmtNumber(headline.total_establishments)} UK restaurants, cafes, pubs, bars, hotels,
              takeaways and mobile caterers rated for food hygiene, aggregated by local authority and
              business type from the FSA&apos;s live ratings API. Aggregate statistics only. Pulled{" "}
              {meta.pull_date}.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Stat
                value={fmtNumber(headline.total_establishments)}
                label="UK hospitality establishments rated"
              />
              <Stat
                value={fmtPct(headline.national_top_rating_5_share_pct)}
                label="hold the top FHRS rating (5), England/Wales/NI"
              />
              <Stat
                value={fmtPct(headline.scotland_pass_rate_pct)}
                label="hold a Pass under Scotland's FHIS scheme"
              />
              <Stat
                value={fmtNumber(headline.local_authorities_covered)}
                label="local authorities covered"
              />
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-6">
          <div className="mt-8 rounded-2xl border border-[var(--brand-primary)]/20 bg-[var(--brand-primary)]/[0.04] p-6 sm:p-8">
            <h2 className="text-lg font-bold text-[var(--brand-primary)]">Key findings</h2>
            <ul className="mt-4 space-y-2 text-base leading-relaxed text-[var(--ink)]">
              <li>
                {fmtNumber(headline.total_establishments)} hospitality establishments across the UK carry
                a current FHRS or FHIS food hygiene rating, spanning restaurants and cafes, pubs and
                bars, hotels and guest houses, takeaways, mobile caterers and other catering premises.
              </li>
              <li>
                {fmtPct(headline.national_top_rating_5_share_pct)} of rated establishments in England,
                Wales and Northern Ireland hold the top FHRS score of 5 (very good).
              </li>
              <li>
                Ratings vary noticeably by business type: {business_types[0]?.label.toLowerCase()} has a
                different top-rating share to {business_types[business_types.length - 1]?.label.toLowerCase()}
                , reflecting differences in kitchen complexity, footfall and inspection risk category.
              </li>
              <li>
                Local authority top-rating shares range widely even among comparably sized authorities,
                a genuine signal of both inspection intensity and underlying standards, not just of scale.
              </li>
            </ul>
            <p className="mt-4 text-xs text-[var(--muted)]">
              Source: Food Standards Agency Ratings API. Aggregate statistics only: no individual
              establishment is named. Figures may be cited with attribution to Hospitality Tax.
            </p>
          </div>

          <Section id="by-type" title="Hygiene ratings by business type">
            <p>
              Share of rated establishments holding the top FHRS score of 5, by hospitality business
              type (England, Wales and Northern Ireland only; Scotland uses the separate FHIS Pass /
              Improvement Required scale, shown below).
            </p>
            <div className="not-prose mt-6 rounded-2xl border border-[var(--border)] p-4 sm:p-6">
              <BusinessTypeRatingChart businessTypes={business_types} />
            </div>
            <div className="not-prose mt-6 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-[var(--border)] text-left">
                    <th className="py-2 pr-4 font-bold text-[var(--ink)]">Business type</th>
                    <th className="py-2 pr-4 text-right font-bold text-[var(--ink)]">Rated establishments</th>
                    <th className="py-2 text-right font-bold text-[var(--ink)]">Top rating (5) share</th>
                  </tr>
                </thead>
                <tbody>
                  {business_types.map((b) => (
                    <tr key={b.key} className="border-b border-[var(--border)]">
                      <td className="py-2 pr-4 text-[var(--ink-soft)]">{b.label}</td>
                      <td className="py-2 pr-4 text-right tabular-nums text-[var(--ink-soft)]">
                        {fmtNumber(b.total)}
                      </td>
                      <td className="py-2 text-right tabular-nums font-medium text-[var(--ink)]">
                        {fmtPct(b.fhrs_top_rating_share_pct)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section id="league-tables" title="Local authority league tables">
            <p>
              Local authorities with at least {meta.min_sample_for_league_table} rated hospitality
              establishments, ranked by the share holding a top FHRS rating of 5. No individual
              establishment is named; every row is a local-authority aggregate.
            </p>
            <LaTable
              rows={local_authority_league_table.top15_by_top_rating_share}
              title="Highest top-rating (5) share"
            />
            <LaTable
              rows={local_authority_league_table.bottom15_by_top_rating_share}
              title="Lowest top-rating (5) share"
            />
            <LaTable
              rows={local_authority_league_table.top15_by_density}
              title="Highest hospitality establishment count (density)"
            />
          </Section>

          <Section id="methodology" title="Methodology, licence and sources">
            <p>
              <strong>Data source.</strong> The Food Standards Agency Ratings API
              (api.ratings.food.gov.uk) provides free, keyless programmatic access to every FHRS
              (England, Wales, Northern Ireland) and FHIS (Scotland) rated food business in the UK. We
              query six hospitality-relevant business types: {Object.values(meta.business_types_included).join(", ")}.
              {" "}{meta.business_types_excluded_note}
            </p>
            <p>
              <strong>Aggregation rule.</strong> {meta.aggregation_rule}
            </p>
            <p>
              <strong>Licence.</strong> {meta.licence}. Free to cite with attribution to Hospitality Tax.
            </p>
            <p>
              <strong>Caveats.</strong> {meta.notes}
            </p>
            <p>
              <strong>Updated.</strong> Pulled {meta.pull_date}. The FSA API is refreshed daily as local
              authorities publish new inspections; this snapshot is a point-in-time extract.
            </p>
            <ul className="not-prose mt-2 space-y-1 text-sm">
              <li>
                <a
                  href={meta.open_data_page}
                  className="font-semibold text-[var(--brand-primary)] hover:underline"
                  rel="nofollow noopener noreferrer"
                >
                  FSA Food Hygiene Ratings open data
                </a>{" "}
                <span className="text-[var(--muted)]">(Food Standards Agency)</span>
              </li>
            </ul>
            <p className="text-sm">
              <Link
                href={`${PAGE_PATH}/data`}
                className="font-semibold text-[var(--brand-primary)] hover:underline"
              >
                Download the aggregate data (CSV)
              </Link>
            </p>
          </Section>

          <div className="mt-10 rounded-2xl border-2 border-[var(--brand-primary)]/20 bg-[var(--brand-primary)]/[0.04] p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-[var(--brand-primary)] sm:text-3xl">
              Keep your compliance as sharp as your hygiene rating.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
              Food hygiene inspections sit alongside VAT, payroll and business rates as part of running
              a compliant hospitality business. Our team works exclusively with UK hospitality operators
              on the tax and accounting side.
            </p>
            <div className="mt-8">
              <LeadForm redirectOnSuccess={false} submitLabel="Get a free hospitality tax review" />
            </div>
          </div>

          <div className="mt-12 pb-16">
            <h2 className="text-2xl font-bold text-[var(--ink)] sm:text-3xl">
              Frequently asked questions
            </h2>
            <div className="mt-6 space-y-6">
              {faqs.map((f, i) => (
                <div key={i}>
                  <h3 className="text-lg font-bold text-[var(--ink)]">{f.question}</h3>
                  <p className="mt-2 text-base leading-relaxed text-[var(--ink-soft)]">{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
