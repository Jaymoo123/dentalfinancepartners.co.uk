import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import { MiniCapture } from "@/components/calculators/MiniCapture";
import { site } from "@/lib/calculators/site";
import {
  fmtNumber,
  fmtPct,
  type SurvivalIndexSnapshot,
} from "@/lib/research/survival-index";
import { buildFaqJsonLd, buildBreadcrumbJsonLd } from "@/lib/schema";
import snapshot from "@/data/charity-survival-index.json";

const data = snapshot as unknown as SurvivalIndexSnapshot;
const { meta, headline, cohort_survival, income_band_survival } = data;

const PAGE_PATH = "/research/uk-charity-survival-index";
const generatedDate = meta.generated_at.slice(0, 10);

export const metadata: Metadata = {
  title: `UK Charity Survival and Longevity Index | ${site.name}`,
  description: `Only around one third of charities registered before 1990 are still active. The median age at which a charity is removed from the register is ${headline.median_age_at_removal_years} years. Cohort survival analysis of ${fmtNumber(headline.total_removed)} removed England and Wales charities, from the Charity Commission register.`,
  alternates: { canonical: `${site.url}${PAGE_PATH}` },
  openGraph: {
    title: "UK Charity Survival and Longevity Index",
    description: `Survival curves for every England and Wales charity cohort from 1980, compiled from Charity Commission open data.`,
    url: `${site.url}${PAGE_PATH}`,
    type: "article",
  },
};

const datasetSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "UK Charity Survival and Longevity Index: cohort survival rates and age at removal",
  description:
    "Registration-cohort survival analysis of England and Wales charities from 1980 to 2016, showing the proportion still active vs removed and the median age at removal. Compiled from the Charity Commission full-register extract under OGL v3.0.",
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
    "Charity registration cohort survival rate by year",
    "Median age at removal by registration cohort",
    "Removed charity count by income band",
    "Median age at removal by income band",
  ],
};

const faqs = [
  {
    question: "How long does the average charity last?",
    answer: `The median age at which a charity is removed from the Charity Commission register is ${headline.median_age_at_removal_years} years. That is the midpoint across all ${fmtNumber(headline.total_removed)} charities removed from the England and Wales register. The figure varies by income size: smaller charities (under £25,000 income) are removed at a median age of 20 years, while larger charities (over £1m income) are also removed at a median age of around 20 years, though for different reasons (mergers, restructuring, and constitutional changes are more common among larger organisations than straightforward closure).`,
  },
  {
    question: "What does charity survival rate mean here?",
    answer:
      "The survival rate for a registration cohort is the proportion of charities registered in that year that are still on the active register today. A cohort registered in 1980 with a 35% survival rate means roughly two thirds of those charities have since been removed (through voluntary deregistration, merger, dissolution, or regulatory removal). Survival rates naturally look higher for more recent cohorts because those charities have had less time to be removed, so we only include cohorts that are at least 10 years old.",
  },
  {
    question: "Why are survival rates rising for more recent cohorts?",
    answer:
      "Two effects contribute. First, newer charities have simply had less time to be removed, so their apparent survival rates are higher at any snapshot date. Second, registration policy changed significantly in the mid-1990s when a large backlog of previously excepted charities was brought onto the register, creating inflated cohort sizes for 1993 and 1994 that include many long-established organisations. The Commission has also tightened compliance monitoring over time, which both catches non-compliant charities earlier and may reduce the number registered that were unlikely to succeed.",
  },
  {
    question: "Are charities that are 'removed' always closed?",
    answer:
      "Not always. Removal from the Charity Commission register can mean the charity dissolved or wound up, but it can also mean a merger with another charity, a conversion to a different legal structure (such as a Charitable Incorporated Organisation), or a regulatory removal for failure to file returns. A charity merged into another continues operating; it is only the original registration that ends. The register does not distinguish these reasons in the publicly available extract.",
  },
  {
    question: "Does charity size affect survival?",
    answer:
      "The data shows that very small charities (under £25,000 income) and very large charities (over £1m) have similar median ages at removal of around 20 years. Mid-sized charities (£25,000 to £1m income) are removed somewhat earlier, at a median of 17 years. This partly reflects that mid-sized charities are more likely to merge or restructure once they have grown, while very small charities may persist for longer before eventually deregistering. Very large charities are removed primarily through mergers, restructurings, or constitutional changes rather than financial failure.",
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

export default function CharitySurvivalIndexPage() {
  // Oldest cohort with complete data for the headline survival rate sentence
  const oldest = cohort_survival[0];
  const newestFullCohort = cohort_survival.at(-1);

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
            { label: "UK Charity Survival and Longevity Index" },
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
              UK Charity Survival and Longevity Index
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/85">
              How long do charities actually last? Cohort survival analysis of every England and
              Wales charity registered since 1980, drawn from the Charity Commission full-register
              extract. Updated {generatedDate}.
            </p>
            <nav className="mt-6 flex flex-wrap gap-x-6 gap-y-1 text-sm text-white/70">
              <a href="#survival-by-cohort" className="hover:text-white">Survival by cohort</a>
              <a href="#survival-by-income" className="hover:text-white">Survival by income band</a>
              <a href="#faq" className="hover:text-white">FAQ</a>
              <a href="#methodology" className="hover:text-white">Methodology</a>
            </nav>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-6">
          <div className="-mt-8 grid gap-4 sm:grid-cols-3">
            <Stat
              value={fmtNumber(headline.total_removed)}
              label="charities removed from the E&W register (all time)"
            />
            <Stat
              value={`${headline.median_age_at_removal_years} years`}
              label="median age at removal"
            />
            <Stat
              value={oldest ? fmtPct(oldest.survival_rate_pct ?? 0) : "n/a"}
              label={`of ${oldest?.cohort_year ?? ""} charities still active today`}
            />
          </div>

          <Section id="survival-by-cohort" title="Survival rate by registration cohort">
            <p>
              For each year from 1980 to{" "}
              {newestFullCohort?.cohort_year ?? "2016"}, the table shows how many
              charities were registered, how many have since been removed, and the proportion still
              on the active register today. Only cohorts at least 10 years old are shown; more
              recent cohorts are excluded because their apparent survival rates are artificially high
              (the charities have simply had less time to be removed).
            </p>
            <p>
              The 1993 and 1994 cohorts show unusually large registration numbers because the
              Commission brought a large backlog of previously excepted charities onto the formal
              register in those years, inflating those cohort sizes.
            </p>
            <div className="overflow-x-auto">
              <table className="mt-2 w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] text-left text-[var(--muted)]">
                    <th className="py-2 pr-4 font-semibold">Cohort year</th>
                    <th className="py-2 pr-4 text-right font-semibold">Registered</th>
                    <th className="py-2 pr-4 text-right font-semibold">Removed</th>
                    <th className="py-2 pr-4 text-right font-semibold">Still active</th>
                    <th className="py-2 pr-4 text-right font-semibold">Survival rate</th>
                    <th className="py-2 text-right font-semibold">Median age at removal</th>
                  </tr>
                </thead>
                <tbody>
                  {cohort_survival.map((row) => (
                    <tr key={row.cohort_year} className="border-b border-[var(--border)]/60">
                      <td className="py-2 pr-4 font-medium tabular-nums">{row.cohort_year}</td>
                      <td className="py-2 pr-4 text-right tabular-nums">
                        {fmtNumber(row.registered)}
                      </td>
                      <td className="py-2 pr-4 text-right tabular-nums">
                        {fmtNumber(row.removed)}
                      </td>
                      <td className="py-2 pr-4 text-right tabular-nums">
                        {fmtNumber(row.active)}
                      </td>
                      <td className="py-2 pr-4 text-right tabular-nums">
                        {row.survival_rate_pct != null ? fmtPct(row.survival_rate_pct) : "n/a"}
                      </td>
                      <td className="py-2 text-right tabular-nums">
                        {row.median_age_at_removal_years != null
                          ? `${row.median_age_at_removal_years} yrs`
                          : "n/a"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-[var(--muted)]">
              Source: Charity Commission full-register extract (OGL v3.0), {generatedDate}.
              Survival rate = active / (active + removed) within each cohort.
            </p>
          </Section>

          <Section id="survival-by-income" title="How long removed charities lasted, by income band">
            <p>
              Among the {fmtNumber(headline.total_removed)} charities removed from the register,
              those with lower reported income were removed at a similar or older age than larger
              charities. Larger charities are more likely to be removed via merger or restructuring
              rather than simple closure, which explains why they do not necessarily survive longer.
            </p>
            <div className="overflow-x-auto">
              <table className="mt-2 w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] text-left text-[var(--muted)]">
                    <th className="py-2 pr-4 font-semibold">Income band at removal</th>
                    <th className="py-2 pr-4 text-right font-semibold">Charities removed</th>
                    <th className="py-2 text-right font-semibold">Median age at removal</th>
                  </tr>
                </thead>
                <tbody>
                  {income_band_survival.map((row) => (
                    <tr key={row.key} className="border-b border-[var(--border)]/60">
                      <td className="py-2 pr-4">{row.label}</td>
                      <td className="py-2 pr-4 text-right tabular-nums">
                        {fmtNumber(row.removed_count)}
                      </td>
                      <td className="py-2 text-right tabular-nums">
                        {row.median_age_at_removal_years != null
                          ? `${row.median_age_at_removal_years} yrs`
                          : "n/a"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-[var(--muted)]">
              Income is each charity&apos;s last reported latest_income before removal (this is not
              necessarily income in the final year; it is the most recent figure available in the
              register). A further {fmtNumber(
                headline.total_removed -
                  income_band_survival.reduce((s, r) => s + r.removed_count, 0),
              )} removed charities had no reported income and are excluded from this table.
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
                Download the cohort survival data as CSV
              </a>{" "}
              (free to reuse with attribution to {site.name}).
            </p>
            <p className="text-sm text-[var(--muted)]">
              Related:{" "}
              <Link href="/research/uk-small-charity-finance-index" className="text-[var(--brand-primary)] underline">
                UK Small Charity Finance Index
              </Link>{" "}
              |{" "}
              <Link href="/research/uk-charity-scrutiny-cliff" className="text-[var(--brand-primary)] underline">
                Scrutiny Cliff-Edge Monitor
              </Link>
            </p>
          </Section>

          <div className="pb-16">
            <MiniCapture
              formId="survival_index"
              messagePrefix="[Research: charity survival index]"
              heading="Planning your charity&apos;s future?"
              blurb="Whether you are setting up a new charity, approaching a compliance threshold, or thinking about merger or dissolution, we can help you understand your options and obligations."
              submitLabel="Ask about our charity accounts service"
            />
          </div>
        </div>
      </main>
    </>
  );
}
