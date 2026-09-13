import type { Metadata } from "next";
import Link from "next/link";

import { MiniCapture } from "@/components/calculators/MiniCapture";
import { site } from "@/lib/calculators/site";
import {
  fmtGbp,
  fmtNumber,
  fmtPct,
  type FinanceIndexSnapshot,
} from "@/lib/research/finance-index";
import snapshot from "@/data/uk-small-charity-finance-index.json";
import { PageHero, ResearchSection as Section, Stat } from "@/components/hubs/HubParts";

const data = snapshot as unknown as FinanceIndexSnapshot;
const { meta, charities, cics } = data;

const PAGE_PATH = "/research/uk-small-charity-finance-index";
const generatedDate = meta.generated_at.slice(0, 10);

const HEADLINE = `${fmtPct(charities.headline_shares.ie_band_pct)} of England and Wales charities sit in the independent examination band`;

export const metadata: Metadata = {
  title: `UK Small Charity Finance Index`,
  description: `${HEADLINE}. Median charity income is ${fmtGbp(charities.income.median)}. A sourced index of charity finances compiled from the Charity Commission register, updated ${generatedDate}.`,
  alternates: { canonical: `${site.url}${PAGE_PATH}` },
  openGraph: {
    title: "UK Small Charity Finance Index",
    description: `${HEADLINE}, compiled from Charity Commission open data.`,
    url: `${site.url}${PAGE_PATH}`,
    type: "article",
  },
};

const datasetSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "UK Small Charity Finance Index: charity income by scrutiny band",
  description:
    "Registered England and Wales charities by income band relative to the Charities Act scrutiny thresholds (registration £5k, independent examination £25k, accruals £250k, audit £1m; the scrutiny gates rise to £40k, £500k and £1.5m for financial years ending on or after 30 September 2026), with registration/removal flows and a Community Interest Company layer from Companies House data.",
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
    "Registered charities by income band vs Charities Act scrutiny thresholds",
    "Median and quartile charity income",
    "Charity registrations and removals per year",
    "Community Interest Companies on the UK register",
  ],
};

export default function FinanceIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />
      <PageHero
        tone="dark"
        eyebrow="Research"
        title="UK Small Charity Finance Index"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Research", href: "/research" },
          { label: "UK Small Charity Finance Index" },
        ]}
      >
        <p>
              What a normal charity actually looks like financially: every registered England and
              Wales charity, mapped against the scrutiny thresholds that decide whether it needs an
              independent examination or an audit. Compiled from Charity Commission open data,
              updated {generatedDate}.
        </p>
      </PageHero>

        <div className="mx-auto max-w-4xl px-6">
          <div className="-mt-8 grid gap-4 sm:grid-cols-3">
            <Stat value={fmtNumber(charities.registered_charities)} label="registered charities (E&W)" />
            <Stat value={fmtGbp(charities.income.median)} label="median latest reported income" />
            <Stat
              value={fmtPct(charities.headline_shares.ie_band_pct)}
              label="in the independent examination band (£25k to £1m)"
            />
          </div>

          <Section id="scrutiny-bands" title="Charities by scrutiny band">
            <p>
              The Charities Act sets the external scrutiny a charity needs by gross income. For
              financial years ending before 30 September 2026: registration at £5,000, independent
              examination above £25,000, accruals accounts and a qualified examiner above £250,000,
              and a statutory audit above £1m. For financial years ending on or after 30 September
              2026 the scrutiny gates rise to £40,000, £500,000 and £1.5m. This is where the
              register actually sits against the pre-change gates
              {" "}
              (of {fmtNumber(charities.with_reported_income)} charities with a reported income).
            </p>
            <div className="overflow-x-auto">
              <table className="mt-2 w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-slate-600">
                    <th className="py-2 pr-4 font-semibold">Income band</th>
                    <th className="py-2 pr-4 text-right font-semibold">Charities</th>
                    <th className="py-2 text-right font-semibold">Share</th>
                  </tr>
                </thead>
                <tbody>
                  {charities.scrutiny_bands.map((b) => (
                    <tr key={b.key} className="border-b border-slate-200/60">
                      <td className="py-2 pr-4">{b.label}</td>
                      <td className="py-2 pr-4 text-right tabular-nums">{fmtNumber(b.count)}</td>
                      <td className="py-2 text-right tabular-nums">{fmtPct(b.pct)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-600">
              The audit band is income-only: charities above £250,000 income also need an audit if
              gross assets exceed £3.26m (£500,000 and £5m for financial years ending on or after
              30 September 2026), so the true audit share is slightly higher. Not sure where
              your charity falls? Use our{" "}
              <Link
                href="/calculators/independent-examination-vs-audit-checker"
                className="font-semibold text-primary-700 underline"
              >
                independent examination vs audit checker
              </Link>
              .
            </p>
          </Section>

          <Section id="income" title="What a normal charity income looks like">
            <p>
              Half of all charities with a reported income run on {fmtGbp(charities.income.median)}{" "}
              a year or less. A quarter run on {fmtGbp(charities.income.p25)} or less, a quarter on
              more than {fmtGbp(charities.income.p75)}, and only the top tenth exceed{" "}
              {fmtGbp(charities.income.p90)}. The mean ({fmtGbp(charities.income.mean)}) is pulled
              far above the median by a small number of very large charities, which is why
              "average charity" statistics based on the mean are misleading.
            </p>
          </Section>

          <Section id="flows" title="Registrations and removals per year">
            <div className="overflow-x-auto">
              <table className="mt-2 w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-slate-600">
                    <th className="py-2 pr-4 font-semibold">Year</th>
                    <th className="py-2 pr-4 text-right font-semibold">Registrations</th>
                    <th className="py-2 pr-4 text-right font-semibold">Removals</th>
                    <th className="py-2 text-right font-semibold">Net change</th>
                  </tr>
                </thead>
                <tbody>
                  {charities.flows.map((f) => (
                    <tr key={f.year} className="border-b border-slate-200/60">
                      <td className="py-2 pr-4">{f.year}</td>
                      <td className="py-2 pr-4 text-right tabular-nums">{fmtNumber(f.registrations)}</td>
                      <td className="py-2 pr-4 text-right tabular-nums">{fmtNumber(f.removals)}</td>
                      <td className="py-2 text-right tabular-nums">
                        {f.net >= 0 ? "+" : ""}
                        {fmtNumber(f.net)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          {cics && (
            <Section id="cics" title="The CIC layer: Community Interest Companies">
              <p>
                Community Interest Companies are the fast-growing social enterprise structure that
                is often confused with charity status (a CIC is not a charity and gets no charity
                tax reliefs). The Companies House register currently shows{" "}
                <strong>{fmtNumber(cics.total_cics_on_register)}</strong> CICs, of which{" "}
                <strong>{fmtNumber(cics.active_cics)}</strong> are active.
              </p>
              <div className="overflow-x-auto">
                <table className="mt-2 w-full max-w-md text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-left text-slate-600">
                      <th className="py-2 pr-4 font-semibold">Year</th>
                      <th className="py-2 text-right font-semibold">CIC incorporations</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cics.incorporations_by_year.map((r) => (
                      <tr key={r.year} className="border-b border-slate-200/60">
                        <td className="py-2 pr-4">{r.year}</td>
                        <td className="py-2 text-right tabular-nums">{fmtNumber(r.count)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-slate-600">
                Incorporation years count companies still on the register (dissolved CICs drop out
                over time, so early years understate true formation volumes).
              </p>
            </Section>
          )}

          <Section id="methodology" title="Methodology and sources">
            <p>{meta.notes}</p>
            <ul className="list-disc space-y-1 pl-6 text-sm">
              {meta.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} rel="noopener" className="text-primary-700 underline">
                    {s.name}
                  </a>{" "}
                  ({s.publisher}, {s.licence})
                </li>
              ))}
            </ul>
            <p className="text-sm">
              <a
                href={`${PAGE_PATH}/data`}
                className="font-semibold text-primary-700 underline"
              >
                Download the scrutiny-band data as CSV
              </a>{" "}
              (free to reuse with attribution to {site.name}).
            </p>
          </Section>

          <div className="pb-16">
            <MiniCapture
              formId="research_index"
              messagePrefix="[Research: small charity finance index]"
              heading="Is your charity at one of these thresholds?"
              blurb="Crossing a scrutiny threshold (£25,000 or £250,000 now; £40,000 or £500,000 for financial years ending on or after 30 September 2026) changes what your trustees must file and who can examine your accounts. Tell us where you are and we will confirm exactly what applies."
              submitLabel="Ask about our charity accounts service"
            />
          </div>
        </div>
    </>
  );
}
