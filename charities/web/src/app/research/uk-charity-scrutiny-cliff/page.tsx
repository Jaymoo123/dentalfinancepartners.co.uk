import type { Metadata } from "next";
import Link from "next/link";

import { MiniCapture } from "@/components/calculators/MiniCapture";
import { site } from "@/lib/calculators/site";
import {
  fmtNumber,
  fmtGbp,
  type ScrutinyCliffSnapshot,
} from "@/lib/research/scrutiny-cliff";
import { buildFaqJsonLd } from "@/lib/schema";
import snapshot from "@/data/charity-scrutiny-cliff.json";
import { PageHero, ResearchSection as Section, Stat } from "@/components/hubs/HubParts";

const data = snapshot as unknown as ScrutinyCliffSnapshot;
const { meta, cliff_edges } = data;

const PAGE_PATH = "/research/uk-charity-scrutiny-cliff";
const generatedDate = meta.generated_at.slice(0, 10);

const ie_edge = cliff_edges.find((e) => e.key === "ie_gate")!;
const accruals_edge = cliff_edges.find((e) => e.key === "accruals_gate")!;
const audit_edge = cliff_edges.find((e) => e.key === "audit_gate")!;

export const metadata: Metadata = {
  title: `UK Charity Scrutiny Cliff-Edge Monitor`,
  description: `${fmtNumber(ie_edge.charities_in_cliff)} charities sit within 10% below the £25,000 independent examination threshold; ${fmtNumber(accruals_edge.charities_in_cliff)} are within 10% of the £250,000 accruals gate. Live counts, plus the higher gates that apply to financial years ending on or after 30 September 2026.`,
  alternates: { canonical: `${site.url}${PAGE_PATH}` },
  openGraph: {
    title: "UK Charity Scrutiny Cliff-Edge Monitor",
    description: `How many charities are within striking distance of each statutory compliance threshold? Live counts from the Charity Commission full-register extract.`,
    url: `${site.url}${PAGE_PATH}`,
    type: "article",
  },
};

const datasetSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "UK Charity Scrutiny Cliff-Edge Monitor: charities within 10% of each statutory threshold",
  description:
    "Count of active England and Wales charities with latest reported income within 10% below and within 10% above each of the three main Charities Act scrutiny thresholds: independent examination (£25,000), accruals/qualified examiner (£250,000), and audit (£1,000,000). These thresholds apply to financial years ending before 30 September 2026; for years ending on or after that date they rise to £40,000, £500,000 and £1,500,000. Compiled from the Charity Commission full-register extract under OGL v3.0.",
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
    "Charities within 10% below the independent examination threshold (£25,000)",
    "Charities within 10% below the accruals / qualified examiner threshold (£250,000)",
    "Charities within 10% below the audit threshold (£1,000,000)",
    "Charities within 10% above each threshold",
  ],
};

const faqs = [
  {
    question: "What is the scrutiny cliff edge?",
    answer:
      "The Charities Act 2011 sets income thresholds at which a charity's external scrutiny obligation changes. For financial years ending before 30 September 2026: below £25,000 gross income, a charity needs no external scrutiny. Above £25,000 it needs an independent examination. Above £250,000 it needs an independent examination by a qualified examiner and must prepare accruals accounts rather than receipts and payments accounts. Above £1,000,000 (or if gross assets exceed £3.26m alongside income over £250,000) it needs a statutory audit. For financial years ending on or after 30 September 2026 these gates rise to £40,000, £500,000 and £1.5m (asset trigger £5m). Each of these thresholds is a cliff edge: crossing one triggers a materially more demanding (and more expensive) compliance regime. Many charities sit just below these gates without realising how close they are.",
  },
  {
    question: "How is the cliff-edge count calculated?",
    answer: `We take each active charity's latest reported gross income from the Charity Commission register and count those with income between ${fmtGbp(ie_edge.cliff_floor)} and ${fmtGbp(ie_edge.threshold)} (the 10% window below the independent examination gate), between ${fmtGbp(accruals_edge.cliff_floor)} and ${fmtGbp(accruals_edge.threshold)} (below the accruals gate), and between ${fmtGbp(audit_edge.cliff_floor)} and ${fmtGbp(audit_edge.threshold)} (below the audit gate). We also count charities just above each threshold (within 10%) who have recently crossed and may still be planning their first examination or audit. The income figure used is latest_income from the charity table in the Charity Commission full-register extract.`,
  },
  {
    question: "What happens when a charity crosses £25,000?",
    answer:
      "Once a charity's gross income exceeds £25,000 in a financial year ending before 30 September 2026 (£40,000 for years ending on or after that date), it must have its accounts independently examined before they are filed with the Charity Commission. An independent examiner does not need to be a qualified accountant (unless the charity also exceeds the qualified-examiner threshold), but must be independent of the charity and its trustees, and must have the skills to carry out the examination. The examiner checks whether the accounts are consistent with the charity's records; this is not an audit. Charities often underestimate how much preparation this requires the first time, particularly if they have been operating on receipts and payments accounts.",
  },
  {
    question: "What changes at £250,000?",
    answer:
      "At £250,000 gross income (£500,000 for financial years ending on or after 30 September 2026), two obligations change at once. First, the charity must prepare accruals accounts (a full income and expenditure account and balance sheet), rather than the simpler receipts and payments account. This typically requires more sophisticated bookkeeping and usually professional help. Second, the independent examiner must be a qualified accountant, defined by the Charity Commission as a member of one of the recognised accountancy bodies. Together these changes often represent a significant cost step for growing charities.",
  },
  {
    question: "When is a full audit required?",
    answer:
      "For financial years ending before 30 September 2026, a statutory audit is required when a charity's gross income exceeds £1,000,000, or when gross income exceeds £250,000 and gross assets exceed £3,260,000. For financial years ending on or after 30 September 2026 the audit gates rise to £1,500,000 income, or £500,000 income with gross assets over £5,000,000. This page counts charities approaching the income threshold only; the asset test requires data not available in the public register extract, so the true number approaching audit is somewhat higher than shown. An audit must be carried out by a registered auditor (a firm or individual registered with a recognised supervisory body under the Companies Act 2006).",
  },
  {
    question: "How are the scrutiny thresholds changing on 30 September 2026?",
    answer:
      "Following a DCMS consultation, the thresholds rise for financial years ending on or after 30 September 2026: independent examination is required above £40,000 gross income (previously £25,000), accruals accounts and a qualified examiner above £500,000 (previously £250,000), and a statutory audit above £1.5m income or £500,000 income with gross assets over £5m (previously £1m and £3.26m). Financial years ending before 30 September 2026 keep the old thresholds. The counts on this page track the pre-change gates, which remain the ones charities filing 2025/26 accounts must meet.",
  },
];

export default function ScrutinyCliffPage() {
  const totalInCliff = cliff_edges.reduce((s, e) => s + e.charities_in_cliff, 0);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(faqs) }}
      />

      <PageHero
        tone="dark"
        eyebrow="Research"
        title="UK Charity Scrutiny Cliff-Edge Monitor"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Research", href: "/research" },
          { label: "Charity Scrutiny Cliff-Edge Monitor" },
        ]}
      >
        <p>
              How many charities are close to crossing a threshold that changes what they must file?
              A live count of England and Wales charities within 10% of each statutory scrutiny
              gate, compiled from Charity Commission open data. Updated {generatedDate}. The gates
              tracked here apply to financial years ending before 30 September 2026; they rise to
              £40,000, £500,000 and £1.5m for years ending on or after that date.
        </p>
          <nav className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-300">
            <a href="#cliff-edges" className="rounded py-0.5 hover:text-white">Cliff-edge counts</a>
            <a href="#thresholds" className="rounded py-0.5 hover:text-white">What the thresholds mean</a>
            <a href="#faq" className="rounded py-0.5 hover:text-white">FAQ</a>
            <a href="#methodology" className="rounded py-0.5 hover:text-white">Methodology</a>
          </nav>
      </PageHero>

        <div className="mx-auto max-w-4xl px-6">
          <div className="-mt-8 grid gap-4 sm:grid-cols-3">
            <Stat
              value={fmtNumber(ie_edge.charities_in_cliff)}
              label={`charities within 10% of the £25,000 independent examination gate`}
            />
            <Stat
              value={fmtNumber(accruals_edge.charities_in_cliff)}
              label={`charities within 10% of the £250,000 accruals gate`}
            />
            <Stat
              value={fmtNumber(audit_edge.charities_in_cliff)}
              label={`charities within 10% of the £1m audit gate`}
            />
          </div>

          <Section id="cliff-edges" title="Charities approaching each threshold">
            <p>
              Across all three scrutiny thresholds, {fmtNumber(totalInCliff)} active charities have
              latest reported income within 10% below a gate that would trigger new compliance
              obligations. These are not theoretical future charities; they are organisations on the
              register today whose next financial year, or next grant, or next fundraising push,
              could take them across a threshold that changes what they must file and who can sign
              their accounts.
            </p>
            <div className="overflow-x-auto">
              <table className="mt-2 w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-slate-600">
                    <th className="py-2 pr-4 font-semibold">Threshold</th>
                    <th className="py-2 pr-4 text-right font-semibold">Cliff zone</th>
                    <th className="py-2 pr-4 text-right font-semibold">
                      Charities in cliff (below)
                    </th>
                    <th className="py-2 text-right font-semibold">
                      Just crossed (above, within 10%)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cliff_edges.map((e) => (
                    <tr key={e.key} className="border-b border-slate-200/60">
                      <td className="py-2 pr-4">{e.label}</td>
                      <td className="py-2 pr-4 text-right tabular-nums">
                        {fmtGbp(e.cliff_floor)} to {fmtGbp(e.threshold)}
                      </td>
                      <td className="py-2 pr-4 text-right tabular-nums font-semibold text-primary-700">
                        {fmtNumber(e.charities_in_cliff)}
                      </td>
                      <td className="py-2 text-right tabular-nums">
                        {fmtNumber(e.charities_just_crossed)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-600">
              Source: Charity Commission full-register extract (OGL v3.0), {generatedDate}. Active,
              main charities only. &quot;Just crossed&quot; = charities within 10% above the
              threshold who have recently become subject to the higher scrutiny requirement.
            </p>
          </Section>

          <Section id="thresholds" title="What each threshold triggers">
            <div className="space-y-6">
              <div className="rounded-lg border border-slate-200 p-4 sm:p-5">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-primary-600 px-3 py-1 text-xs font-bold text-white">
                    £25,000
                  </span>
                  <h3 className="font-semibold text-slate-900">Independent examination gate</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Above £25,000 gross income, a charity must have its accounts examined by an
                  independent examiner before filing with the Commission. The examiner does not need
                  to be a qualified accountant at this level, but must be independent. Currently{" "}
                  <strong className="text-slate-900">{fmtNumber(ie_edge.charities_in_cliff)}</strong>{" "}
                  charities sit in the {fmtGbp(ie_edge.cliff_floor)} to {fmtGbp(ie_edge.threshold)}{" "}
                  zone. For financial years ending on or after 30 September 2026 this gate rises to
                  £40,000.
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 p-4 sm:p-5">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-primary-600 px-3 py-1 text-xs font-bold text-white">
                    £250,000
                  </span>
                  <h3 className="font-semibold text-slate-900">
                    Accruals and qualified examiner gate
                  </h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Above £250,000 gross income, two things change at once: the charity must switch
                  from receipts and payments accounts to full accruals accounts, and the independent
                  examiner must be a qualified accountant. This is often the most disruptive
                  threshold for growing charities. Currently{" "}
                  <strong className="text-slate-900">{fmtNumber(accruals_edge.charities_in_cliff)}</strong>{" "}
                  charities sit in the {fmtGbp(accruals_edge.cliff_floor)} to{" "}
                  {fmtGbp(accruals_edge.threshold)} zone. For financial years ending on or after 30
                  September 2026 this gate rises to £500,000.
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 p-4 sm:p-5">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-primary-600 px-3 py-1 text-xs font-bold text-white">
                    £1,000,000
                  </span>
                  <h3 className="font-semibold text-slate-900">Statutory audit gate</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Above £1m gross income (or if gross assets exceed £3.26m alongside income over
                  £250,000), a charity needs a full statutory audit by a registered auditor. An
                  audit is substantially more demanding and expensive than an independent
                  examination. Currently{" "}
                  <strong className="text-slate-900">{fmtNumber(audit_edge.charities_in_cliff)}</strong>{" "}
                  charities sit in the {fmtGbp(audit_edge.cliff_floor)} to{" "}
                  {fmtGbp(audit_edge.threshold)} zone. The true number approaching audit is higher
                  because the asset test cannot be applied from the public register extract. For
                  financial years ending on or after 30 September 2026 the audit gate rises to
                  £1.5m income (asset trigger £5m alongside income over £500,000).
                </p>
              </div>
            </div>

            <p className="text-sm">
              Not sure which band your charity is in? Use our{" "}
              <Link
                href="/calculators/independent-examination-vs-audit-checker"
                className="font-semibold text-primary-700 underline"
              >
                independent examination vs audit checker
              </Link>
              .
            </p>
          </Section>

          <Section id="faq" title="Frequently asked questions">
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i}>
                  <h3 className="font-semibold text-slate-900">{faq.question}</h3>
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
                Download the cliff-edge data as CSV
              </a>{" "}
              (free to reuse with attribution to {site.name}).
            </p>
            <p className="text-sm text-slate-600">
              Related:{" "}
              <Link href="/research/uk-small-charity-finance-index" className="text-primary-700 underline">
                UK Small Charity Finance Index
              </Link>{" "}
              |{" "}
              <Link href="/research/uk-charity-survival-index" className="text-primary-700 underline">
                UK Charity Survival and Longevity Index
              </Link>
            </p>
          </Section>

          <div className="pb-16">
            <MiniCapture
              formId="scrutiny_cliff"
              messagePrefix="[Research: scrutiny cliff-edge]"
              heading="Is your charity approaching a threshold?"
              blurb={`${fmtNumber(totalInCliff)} charities are within 10% of a compliance gate that changes what they must file. If your income is approaching £25,000, £250,000, or £1m (£40,000, £500,000, or £1.5m for financial years ending on or after 30 September 2026), we can tell you what to prepare and when.`}
              submitLabel="Ask about your charity's obligations"
            />
          </div>
        </div>
    </>
  );
}
