import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import { MiniCapture } from "@/components/calculators/MiniCapture";
import { site } from "@/lib/calculators/site";
import {
  fmtNumber,
  fmtGbp,
  type CauseIncomeSnapshot,
} from "@/lib/research/cause-income";
import { buildFaqJsonLd, buildBreadcrumbJsonLd } from "@/lib/schema";
import snapshot from "@/data/charity-cause-income.json";

const data = snapshot as unknown as CauseIncomeSnapshot;
const { meta, cause_income } = data;

const PAGE_PATH = "/research/uk-charity-cause-income";
const generatedDate = meta.generated_at.slice(0, 10);

// Rank views (highest income first, and most-stretched reserves first)
const byIncome = [...cause_income].sort((a, b) => b.median_income - a.median_income);
const byUnderReserved = [...cause_income].sort(
  (a, b) => (b.under_3_months_reserves_pct ?? 0) - (a.under_3_months_reserves_pct ?? 0),
);
const topIncome = byIncome[0];
const bottomIncome = byIncome[byIncome.length - 1];
const mostUnderReserved = byUnderReserved[0];
const maxIncome = topIncome.median_income;

export const metadata: Metadata = {
  title: `UK Charity Cause Income and Reserves Health Index | ${site.name}`,
  description: `Median income ranges from ${fmtGbp(bottomIncome.median_income)} (${bottomIncome.cause_label}) to ${fmtGbp(topIncome.median_income)} (${topIncome.cause_label}) across ${cause_income.length} cause groups. Reserves health by charitable cause, from the Charity Commission full-register extract.`,
  alternates: { canonical: `${site.url}${PAGE_PATH}` },
  openGraph: {
    title: "UK Charity Cause Income and Reserves Health Index",
    description: `Median income and free-reserves health for every charitable cause in England and Wales, compiled from Charity Commission open data.`,
    url: `${site.url}${PAGE_PATH}`,
    type: "article",
  },
};

const datasetSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "UK Charity Cause Income and Reserves Health Index: median income and reserves by charitable cause",
  description:
    "Median gross income and free-reserves health for England and Wales registered charities, broken down by charitable cause classification. Includes median months of free reserves and the share of charities with under three months of reserves per cause. Compiled from the Charity Commission full-register extract under OGL v3.0.",
  inLanguage: "en-GB",
  license: "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
  creator: { "@type": "Organization", "@id": `${site.url}#organization`, name: site.name },
  dateModified: meta.generated_at,
  isAccessibleForFree: true,
  distribution: [
    {
      "@type": "DataDownload",
      encodingFormat: "text/csv",
      contentUrl: `${site.url}${PAGE_PATH}/data`,
    },
  ],
  variableMeasured: [
    "Median gross income by charitable cause classification",
    "Registered charity count by cause classification",
    "Median months of free reserves by cause",
    "Share of charities with under three months of free reserves by cause",
  ],
};

const faqs = [
  {
    question: "Which charitable causes have the highest income?",
    answer: `Across the ${cause_income.length} cause classifications on the Charity Commission register, ${topIncome.cause_label} charities report the highest median gross income at ${fmtGbp(topIncome.median_income)}, followed by ${byIncome[1].cause_label} (${fmtGbp(byIncome[1].median_income)}) and ${byIncome[2].cause_label} (${fmtGbp(byIncome[2].median_income)}). At the other end, ${bottomIncome.cause_label} charities report the lowest median at ${fmtGbp(bottomIncome.median_income)}. These are medians, so half of the charities in each group report less than the figure shown. A single charity can be classified under more than one cause, so the counts reflect charities carrying that classification code rather than unique organisations.`,
  },
  {
    question: "What does median income by cause actually mean?",
    answer:
      "Each registered charity reports a latest gross income figure to the Charity Commission. For every cause classification we take the median of those figures across all charities carrying that code. The median (the midpoint value) is used rather than the mean (average) because charity income is heavily skewed: a small number of very large charities would otherwise pull the average far above what a typical charity in that cause group actually reports. The median is a much better description of the typical charity.",
  },
  {
    question: "How is reserves health measured here?",
    answer:
      "Reserves health is expressed as months of free reserves. We take each charity's free reserves from its most recent annual return (part B) and divide by its latest annual expenditure, then convert to months. A charity with free reserves equal to three months of expenditure could keep operating for roughly three months if all income stopped. We report the median months of reserves for each cause, plus the share of charities in that cause with under three months of reserves, which is a common informal marker for a thin reserves position.",
  },
  {
    question: "Which causes are most under-reserved?",
    answer: `${mostUnderReserved.cause_label} charities are the most stretched: ${mostUnderReserved.under_3_months_reserves_pct}% hold under three months of free reserves. That does not automatically mean those charities are in difficulty. Some organisations, particularly grant-funded and community-facing bodies, deliberately run low reserves because holding large unrestricted balances would be inconsistent with their funding model or their charitable purpose. What matters is that trustees have set a written reserves policy and can justify the level they hold. A low figure without a policy is the real warning sign.`,
  },
  {
    question: "Why can one charity appear under several causes?",
    answer:
      "The Charity Commission classifies charities by what they do (their activities), who they help (their beneficiaries), and how they operate. A single charity can legitimately carry several classification codes: for example, a charity supporting disabled children could appear under disability, children and young people, and general public. Because of this, the charity counts in this dataset add up to more than the total number of registered charities. Each row counts charities carrying that classification code, not unique organisations, so the medians describe the typical charity working in that cause area.",
  },
];

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-white p-5 shadow-sm">
      <div className="text-3xl font-bold text-[var(--brand-primary)] sm:text-4xl">{value}</div>
      <div className="mt-1 text-sm text-[var(--muted)]">{label}</div>
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section
      id={id}
      className="scroll-mt-24 border-t border-[var(--border)] py-10 first:border-t-0"
    >
      <h2 className="text-2xl font-bold text-[var(--ink)] sm:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-[var(--ink-soft)]">
        {children}
      </div>
    </section>
  );
}

// ponytail: CSS-width bars, no chart lib for a 24-row ranked list.
function IncomeChart() {
  return (
    <div className="mt-2 space-y-2" aria-hidden="true">
      {byIncome.map((row) => (
        <div key={row.cause_code} className="flex items-center gap-3 text-sm">
          <div className="w-56 shrink-0 truncate text-[var(--ink-soft)]" title={row.cause_label}>
            {row.cause_label}
          </div>
          <div className="flex-1">
            <div
              className="h-4 rounded-sm bg-[var(--brand-primary)]"
              style={{ width: `${Math.max(4, (row.median_income / maxIncome) * 100)}%` }}
            />
          </div>
          <div className="w-20 shrink-0 text-right tabular-nums text-[var(--ink)]">
            {fmtGbp(row.median_income)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CharityCauseIncomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildBreadcrumbJsonLd([
            { label: "Home", href: "/" },
            { label: "Research", href: "/research" },
            { label: "UK Charity Cause Income and Reserves Health Index" },
          ]),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(faqs) }}
      />

      <main>
        <section className="bg-[var(--brand-primary)] py-14 sm:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-white/70">Research</p>
            <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
              UK Charity Cause Income and Reserves Health Index
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/85">
              Which charitable causes bring in the most income, and which run closest to the wire on
              reserves? Median income and free-reserves health for every cause classification on the
              England and Wales register, compiled from the Charity Commission full-register extract.
              Updated {generatedDate}.
            </p>
            <nav className="mt-6 flex flex-wrap gap-x-6 gap-y-1 text-sm text-white/70">
              <a href="#income-by-cause" className="hover:text-white">Income by cause</a>
              <a href="#reserves-by-cause" className="hover:text-white">Reserves health</a>
              <a href="#faq" className="hover:text-white">FAQ</a>
              <a href="#methodology" className="hover:text-white">Methodology</a>
            </nav>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-6">
          <div className="-mt-8 grid gap-4 sm:grid-cols-3">
            <Stat
              value={fmtGbp(topIncome.median_income)}
              label={`highest median income (${topIncome.cause_label})`}
            />
            <Stat
              value={fmtGbp(bottomIncome.median_income)}
              label={`lowest median income (${bottomIncome.cause_label})`}
            />
            <Stat
              value={`${mostUnderReserved.under_3_months_reserves_pct}%`}
              label={`most under-reserved: ${mostUnderReserved.cause_label} under 3 months`}
            />
          </div>

          <Section id="income-by-cause" title="Median income by charitable cause">
            <p>
              For each of the {cause_income.length} cause classifications on the Charity Commission
              register, the chart and table below show the median gross income of charities carrying
              that classification code, alongside how many charities carry it. Income is heavily
              skewed by a small number of very large charities, so the median (the typical charity)
              is a far more useful figure than the average.
            </p>
            <p>
              The spread is wide: from {fmtGbp(topIncome.median_income)} for{" "}
              {topIncome.cause_label} charities down to {fmtGbp(bottomIncome.median_income)} for{" "}
              {bottomIncome.cause_label} charities. A charity can carry more than one classification,
              so the counts describe charities with that code rather than unique organisations.
            </p>

            <IncomeChart />

            <div className="overflow-x-auto">
              <table className="mt-6 w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] text-left text-[var(--muted)]">
                    <th className="py-2 pr-4 font-semibold">Charitable cause</th>
                    <th className="py-2 pr-4 text-right font-semibold">Charities</th>
                    <th className="py-2 pr-4 text-right font-semibold">Median income</th>
                    <th className="py-2 pr-4 text-right font-semibold">Median reserves</th>
                    <th className="py-2 text-right font-semibold">Under 3 months</th>
                  </tr>
                </thead>
                <tbody>
                  {byIncome.map((row) => (
                    <tr key={row.cause_code} className="border-b border-[var(--border)]/60">
                      <td className="py-2 pr-4 font-medium">{row.cause_label}</td>
                      <td className="py-2 pr-4 text-right tabular-nums">
                        {fmtNumber(row.charity_count)}
                      </td>
                      <td className="py-2 pr-4 text-right tabular-nums font-semibold text-[var(--brand-primary)]">
                        {fmtGbp(row.median_income)}
                      </td>
                      <td className="py-2 pr-4 text-right tabular-nums">
                        {row.median_reserves_months != null
                          ? `${row.median_reserves_months} mo`
                          : "n/a"}
                      </td>
                      <td className="py-2 text-right tabular-nums">
                        {row.under_3_months_reserves_pct != null
                          ? `${row.under_3_months_reserves_pct}%`
                          : "n/a"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-[var(--muted)]">
              Source: Charity Commission full-register extract (OGL v3.0), {generatedDate}. Median
              income is each charity&apos;s latest reported gross income. Registered, main charities
              only.
            </p>
          </Section>

          <Section id="reserves-by-cause" title="Reserves health by charitable cause">
            <p>
              Reserves health is shown as median months of free reserves (free reserves divided by
              annual expenditure) and the share of charities in each cause holding under three months
              of reserves. A low figure is not automatically a problem: many grant-funded and
              community charities deliberately run lean. What matters is a written reserves policy
              that justifies the level held.
            </p>
            <div className="overflow-x-auto">
              <table className="mt-2 w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] text-left text-[var(--muted)]">
                    <th className="py-2 pr-4 font-semibold">Charitable cause</th>
                    <th className="py-2 pr-4 text-right font-semibold">Median reserves (months)</th>
                    <th className="py-2 text-right font-semibold">Under 3 months of reserves</th>
                  </tr>
                </thead>
                <tbody>
                  {byUnderReserved.map((row) => (
                    <tr key={row.cause_code} className="border-b border-[var(--border)]/60">
                      <td className="py-2 pr-4 font-medium">{row.cause_label}</td>
                      <td className="py-2 pr-4 text-right tabular-nums">
                        {row.median_reserves_months != null
                          ? `${row.median_reserves_months} mo`
                          : "n/a"}
                      </td>
                      <td className="py-2 text-right tabular-nums font-semibold text-[var(--brand-primary)]">
                        {row.under_3_months_reserves_pct != null
                          ? `${row.under_3_months_reserves_pct}%`
                          : "n/a"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-[var(--muted)]">
              Source: Charity Commission full-register extract (OGL v3.0), {generatedDate}. Free
              reserves are taken from the most recent annual return (part B) and divided by latest
              expenditure. &quot;Under 3 months&quot; is the share of charities in that cause with
              fewer than three months of free reserves.
            </p>
          </Section>

          <Section id="faq" title="Frequently asked questions">
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i}>
                  <h3 className="font-semibold text-[var(--ink)]">{faq.question}</h3>
                  <p className="mt-2">{faq.answer}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="methodology" title="Methodology and sources">
            <p>{meta.notes}</p>
            <ul className="list-disc space-y-1 pl-6 text-sm">
              {meta.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} rel="noopener" className="text-[var(--brand-primary)] underline">
                    {s.name}
                  </a>{" "}
                  ({s.publisher}, {s.licence})
                </li>
              ))}
            </ul>
            <p className="text-sm">
              <a
                href={`${PAGE_PATH}/data`}
                className="font-semibold text-[var(--brand-primary)] underline"
              >
                Download the cause income and reserves data as CSV
              </a>{" "}
              (free to reuse with attribution to {site.name}).
            </p>
            <p className="text-sm text-[var(--muted)]">
              Related:{" "}
              <Link href="/research/uk-small-charity-finance-index" className="text-[var(--brand-primary)] underline">
                UK Small Charity Finance Index
              </Link>{" "}
              |{" "}
              <Link href="/research/uk-charity-survival-index" className="text-[var(--brand-primary)] underline">
                UK Charity Survival and Longevity Index
              </Link>{" "}
              |{" "}
              <Link href="/research/uk-charity-scrutiny-cliff" className="text-[var(--brand-primary)] underline">
                Scrutiny Cliff-Edge Monitor
              </Link>
            </p>
          </Section>

          <div className="pb-16">
            <MiniCapture
              formId="cause_income_index"
              messagePrefix="[Research: charity cause income and reserves]"
              heading="Setting your charity&apos;s reserves policy?"
              blurb="Whether you are benchmarking your income against your cause area or building a reserves policy the Charity Commission will accept, we can help you set a level you can justify and report it properly in your accounts."
              submitLabel="Ask about our charity accounts service"
            />
          </div>
        </div>
      </main>
    </>
  );
}
