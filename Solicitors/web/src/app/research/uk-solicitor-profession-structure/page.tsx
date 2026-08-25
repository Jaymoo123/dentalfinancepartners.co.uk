import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildFaqPage } from "@/lib/schema/faq-page";
import { serialize } from "@/lib/schema/serialize";
import {
  fmtNumber,
  monthLabel,
  type SraProfessionStructureSnapshot,
} from "@/lib/research/sra-profession-structure";
import snapshot from "@/data/sra-profession-structure.json";

const data = snapshot as unknown as SraProfessionStructureSnapshot;
const { meta, roll, firm_structure } = data;

const PAGE_PATH = "/research/uk-solicitor-profession-structure";

const INC_SHIFT =
  firm_structure.incorporated_pct_latest - firm_structure.incorporated_pct_2011;
const HEADLINE_SENTENCE = `${fmtNumber(roll.on_the_roll)} solicitors are on the roll in England and Wales, but only ${fmtNumber(roll.with_practising_certificate)} hold a practising certificate`;

export const metadata: Metadata = {
  title: "UK Solicitor Profession Structure | Roll, PCs & firm mix | Accounts for Lawyers",
  description: `${HEADLINE_SENTENCE}. A sourced read on the SRA-regulated profession: the roll, practising certificates and firm constitution mix. Updated ${monthLabel(meta.data_through)}.`,
  alternates: { canonical: `${siteConfig.url}${PAGE_PATH}` },
  openGraph: {
    title: "UK Solicitor Profession Structure | Accounts for Lawyers",
    description: `${fmtNumber(roll.on_the_roll)} solicitors on the roll, ${fmtNumber(roll.with_practising_certificate)} practising. Incorporated firms are now ${firm_structure.incorporated_pct_latest}% of the SRA-regulated base. Aggregate SRA and Law Society statistics.`,
    url: `${siteConfig.url}${PAGE_PATH}`,
    type: "article",
  },
};

const faqs = [
  {
    question: "How many solicitors are on the roll versus practising in England and Wales?",
    answer: `There are ${fmtNumber(roll.on_the_roll)} solicitors on the roll (the register of admitted solicitors), of whom ${fmtNumber(roll.with_practising_certificate)} hold a current practising certificate. That leaves around ${fmtNumber(roll.not_practising)} admitted solicitors who are not exercising a practising certificate, roughly ${roll.not_practising_pct}% of the roll. These figures are aggregate counts from the latest SRA and Law Society annual statistics.`,
  },
  {
    question: "What is the difference between the roll and a practising certificate?",
    answer:
      "The roll is the permanent register of everyone admitted as a solicitor. Being on the roll means you are a solicitor; it does not by itself entitle you to practise. To act as a solicitor and offer reserved legal activities you must hold a current practising certificate issued by the SRA, which requires an annual fee and ongoing regulatory obligations. Solicitors who move in-house without SRA registration, take a career break, retire, or work in non-legal roles typically remain on the roll but let their practising certificate lapse.",
  },
  {
    question: "Why do so many solicitors stay on the roll without practising?",
    answer:
      "The gap between the roll and practising-certificate holders reflects the breadth of careers open to qualified solicitors. Admitted solicitors work in-house, in academia, in policy and regulation, in business roles, overseas, or are on parental or career breaks. Some retain their name on the roll for professional identity even after leaving legal practice. Because admission is permanent unless a solicitor is struck off or voluntarily removed, the roll accumulates over decades while the practising population reflects only those currently in regulated practice.",
  },
  {
    question: "How has the structure of SRA-regulated law firms changed?",
    answer: `Incorporated companies have risen from about ${firm_structure.incorporated_pct_2011}% of SRA-regulated firms in ${firm_structure.baseline_year} to about ${firm_structure.incorporated_pct_latest}% by 2026. LLPs account for around ${firm_structure.llp_pct_latest}% of the firm base and traditional partnerships have fallen to around ${firm_structure.partnership_pct_latest}%. These are shares of the existing regulated firm base (the stock of firms), not a measure of how many new firms incorporate each year. The remaining share is sole practitioners and other body types, including Alternative Business Structures.`,
  },
  {
    question: "Is this the same as the Companies House incorporation figures?",
    answer:
      "No, and the distinction matters. This page describes the stock of SRA-regulated firms by constitution type: the mix of firms that exist and are regulated today. Companies House new-incorporation data is a separate flow measure of how many new legal-sector companies are registered each year. It would be wrong to say that 98% of law firms are limited companies: the roughly 98% figure relates to the share of new incorporations that take limited-company form, not to the stock of regulated firms. Incorporated companies are about 58.7% of the existing SRA-regulated firm base.",
  },
];

// ---------------------------------------------------------------------------
// JSON-LD
// ---------------------------------------------------------------------------
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "UK Solicitor Profession Structure",
  description: `${HEADLINE_SENTENCE}. A sourced read on the SRA-regulated profession structure and the solicitor roll.`,
  inLanguage: "en-GB",
  datePublished: "2026-07-20",
  dateModified: meta.generated_at,
  author: {
    "@type": "Organization",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
  },
  publisher: { "@id": `${siteConfig.url}#organization` },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${siteConfig.url}${PAGE_PATH}`,
  },
};

const datasetSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "UK Solicitor Profession Structure: the roll, practising certificates and SRA-regulated firm mix",
  description:
    "Aggregate statistics on the solicitor profession in England and Wales: solicitors on the roll versus those holding a practising certificate, and the constitution mix of SRA-regulated firms (incorporated, LLP, partnership). Compiled from SRA Regulated Community Statistics and Law Society Annual Statistics.",
  inLanguage: "en-GB",
  license: "https://www.sra.org.uk/",
  creator: {
    "@type": "Organization",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
  },
  dateModified: meta.generated_at,
  temporalCoverage: `${firm_structure.baseline_year}/2026`,
  isAccessibleForFree: true,
  distribution: [
    {
      "@type": "DataDownload",
      encodingFormat: "text/csv",
      contentUrl: `${siteConfig.url}${PAGE_PATH}/data`,
    },
  ],
  variableMeasured: [
    "Solicitors on the roll (England and Wales)",
    "Solicitors holding a practising certificate",
    "Admitted solicitors not currently practising",
    "SRA-regulated firms -- incorporated company share",
    "SRA-regulated firms -- LLP share",
    "SRA-regulated firms -- partnership share",
  ],
};

// ---------------------------------------------------------------------------

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl bg-white/5 p-5 ring-1 ring-white/10">
      <div className="text-3xl font-bold text-white sm:text-4xl">{value}</div>
      <div className="mt-1 text-sm text-neutral-300">{label}</div>
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-neutral-200 py-10 first:border-t-0">
      <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-neutral-700">{children}</div>
    </section>
  );
}

/** Horizontal CSS bar: label, value, share-of-max width. No JS, no deps. */
function Bar({ label, value, max, suffix }: { label: string; value: number; max: number; suffix?: string }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="not-prose">
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-medium text-neutral-800">{label}</span>
        <span className="font-semibold text-neutral-900">
          {fmtNumber(value)}
          {suffix}
        </span>
      </div>
      <div className="mt-1 h-3 w-full overflow-hidden rounded bg-neutral-100">
        <div className="h-full rounded bg-[var(--primary)]" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function UKSolicitorProfessionStructurePage() {
  const faqSchema = buildFaqPage(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serialize(faqSchema) }}
        />
      )}

      {/* Hero */}
      <section className="bg-neutral-900 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <Breadcrumb
            variant="light"
            items={[
              { label: "Home", href: "/" },
              { label: "Research", href: "/research" },
              { label: "UK Solicitor Profession Structure" },
            ]}
          />
          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-[var(--primary)]">
            UK Solicitor Profession Structure
          </p>
          <h1 className="mt-2 max-w-4xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {fmtNumber(roll.on_the_roll)} on the roll, {fmtNumber(roll.with_practising_certificate)} practising
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-neutral-300">
            A sourced, aggregate read on the SRA-regulated solicitor profession in England and
            Wales: the roll versus the practising population, and how the constitution mix of
            regulated firms has shifted. Compiled from SRA and Law Society annual statistics.
            Updated {monthLabel(meta.data_through)}.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat
              value={fmtNumber(roll.on_the_roll)}
              label="solicitors on the roll in England and Wales"
            />
            <Stat
              value={fmtNumber(roll.with_practising_certificate)}
              label="solicitors holding a current practising certificate"
            />
            <Stat
              value={fmtNumber(roll.not_practising)}
              label={`admitted solicitors not currently practising (${roll.not_practising_pct}% of the roll)`}
            />
            <Stat
              value={`${firm_structure.incorporated_pct_latest}%`}
              label="of SRA-regulated firms are incorporated companies (2026)"
            />
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-white py-10 sm:py-14">
        <div className={siteContainerLg}>
          <div className="max-w-4xl">

            {/* Key findings */}
            <div className="rounded-2xl border border-[var(--primary)]/20 bg-[var(--primary)]/5 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-[var(--primary)]">Key findings</h2>
              <ul className="mt-4 space-y-2 text-base leading-relaxed text-neutral-800">
                <li>
                  There are <strong>{fmtNumber(roll.on_the_roll)}</strong> solicitors on the roll in
                  England and Wales, but only <strong>{fmtNumber(roll.with_practising_certificate)}</strong>{" "}
                  hold a current practising certificate, a gap of roughly{" "}
                  {fmtNumber(roll.not_practising)} admitted solicitors ({roll.not_practising_pct}% of the roll).
                </li>
                <li>
                  Being on the roll makes you a solicitor; a practising certificate is what lets you
                  practise. The gap reflects solicitors working in-house, in business, overseas,
                  in academia, on career breaks, or retired.
                </li>
                <li>
                  Incorporated companies have risen from about {firm_structure.incorporated_pct_2011}%
                  of SRA-regulated firms in {firm_structure.baseline_year} to about{" "}
                  <strong>{firm_structure.incorporated_pct_latest}%</strong> by 2026, a rise of about{" "}
                  {INC_SHIFT.toFixed(1)} percentage points.
                </li>
                <li>
                  LLPs account for around {firm_structure.llp_pct_latest}% of the regulated firm
                  base and traditional partnerships have fallen to around{" "}
                  {firm_structure.partnership_pct_latest}%. Alternative Business Structures have
                  grown since 2012 and reinforce the incorporated share.
                </li>
                <li>
                  These firm-structure percentages describe the <strong>stock</strong> of regulated
                  firms by type. They are not the Companies House new-incorporation flow. The
                  roughly 98% limited-company figure elsewhere relates to new incorporations, not
                  to the mix of firms that exist today.
                </li>
              </ul>
              <p className="mt-4 text-xs text-neutral-500">
                Sources: Solicitors Regulation Authority Regulated Community Statistics and The Law
                Society of England and Wales Annual Statistics (aggregate data). SRA statistics used
                with attribution; not OGL. No named-firm data. Figures may be cited with attribution
                to Accounts for Lawyers.
              </p>
            </div>

            <Section id="roll" title="The roll versus the practising population">
              <p>
                The roll is the permanent register of everyone admitted as a solicitor in England
                and Wales. A practising certificate is the annual authorisation, issued by the SRA,
                that a solicitor must hold to practise and to carry out reserved legal activities.
                The two counts diverge because admission is permanent, while a practising
                certificate lapses whenever a solicitor stops practising.
              </p>
              <div className="not-prose mt-6 space-y-4 rounded-2xl border border-neutral-200 p-4 sm:p-6">
                <Bar label="On the roll" value={roll.on_the_roll} max={roll.on_the_roll} />
                <Bar
                  label="Holding a practising certificate"
                  value={roll.with_practising_certificate}
                  max={roll.on_the_roll}
                />
                <Bar
                  label="Admitted but not currently practising"
                  value={roll.not_practising}
                  max={roll.on_the_roll}
                />
              </div>
              <p className="text-sm text-neutral-500">
                Source: SRA Regulated Community Statistics and Law Society Annual Statistics
                (aggregate counts). Around {roll.not_practising_pct}% of admitted solicitors are not
                currently exercising a practising certificate.
              </p>
            </Section>

            <Section id="firm-structure" title="How SRA-regulated firms are structured">
              <p>
                The chart below shows the approximate share of the existing SRA-regulated firm base
                by constitution type. Incorporated companies have become the dominant form, LLPs
                have held broadly steady, and traditional partnerships have contracted. This is a
                stock measure: it describes the firms that are regulated today, not how many new
                firms register each year.
              </p>
              <div className="not-prose mt-6 space-y-4 rounded-2xl border border-neutral-200 p-4 sm:p-6">
                <Bar
                  label="Incorporated company (2026)"
                  value={firm_structure.incorporated_pct_latest}
                  max={100}
                  suffix="%"
                />
                <Bar label="LLP (2026)" value={firm_structure.llp_pct_latest} max={100} suffix="%" />
                <Bar
                  label="Traditional partnership (2026)"
                  value={firm_structure.partnership_pct_latest}
                  max={100}
                  suffix="%"
                />
                <Bar
                  label="Incorporated company (2011 baseline)"
                  value={firm_structure.incorporated_pct_2011}
                  max={100}
                  suffix="%"
                />
              </div>
              <p className="text-sm text-neutral-500">
                Source: Solicitors Regulation Authority, Regulated Community Statistics. Aggregate
                shares of the regulated firm base; percentages are approximate and subject to SRA
                revision. SRA statistics used with attribution; no named-firm data.
              </p>
            </Section>

            <Section id="data-table" title="Summary figures">
              <div className="not-prose mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-neutral-300 text-left">
                      <th className="py-2 pr-3 font-bold text-neutral-900">Measure</th>
                      <th className="py-2 text-right font-bold text-neutral-900">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-neutral-200">
                      <td className="py-2 pr-3 text-neutral-700">Solicitors on the roll</td>
                      <td className="py-2 text-right font-semibold text-neutral-900">
                        {fmtNumber(roll.on_the_roll)}
                      </td>
                    </tr>
                    <tr className="border-b border-neutral-200">
                      <td className="py-2 pr-3 text-neutral-700">With a practising certificate</td>
                      <td className="py-2 text-right font-semibold text-neutral-900">
                        {fmtNumber(roll.with_practising_certificate)}
                      </td>
                    </tr>
                    <tr className="border-b border-neutral-200">
                      <td className="py-2 pr-3 text-neutral-700">Not currently practising</td>
                      <td className="py-2 text-right font-semibold text-neutral-900">
                        {fmtNumber(roll.not_practising)} ({roll.not_practising_pct}%)
                      </td>
                    </tr>
                    <tr className="border-b border-neutral-200">
                      <td className="py-2 pr-3 text-neutral-700">
                        Incorporated firms, {firm_structure.baseline_year} to 2026
                      </td>
                      <td className="py-2 text-right font-semibold text-neutral-900">
                        {firm_structure.incorporated_pct_2011}% &rarr; {firm_structure.incorporated_pct_latest}%
                      </td>
                    </tr>
                    <tr className="border-b border-neutral-200">
                      <td className="py-2 pr-3 text-neutral-700">LLP share (2026)</td>
                      <td className="py-2 text-right font-semibold text-neutral-900">
                        {firm_structure.llp_pct_latest}%
                      </td>
                    </tr>
                    <tr className="border-b border-neutral-200">
                      <td className="py-2 pr-3 text-neutral-700">Partnership share (2026)</td>
                      <td className="py-2 text-right font-semibold text-neutral-900">
                        {firm_structure.partnership_pct_latest}%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-neutral-500">
                Source: SRA Regulated Community Statistics and Law Society Annual Statistics.
                Aggregate data, used with attribution under the SRA custom licence; not OGL.
              </p>
            </Section>

            <Section id="methodology" title="Methodology and sources">
              <p>
                <strong>Roll and practising certificates.</strong> The counts of solicitors on the
                roll and holding practising certificates are aggregate figures published in the
                latest SRA Regulated Community Statistics and the Law Society Annual Statistics
                Report for England and Wales. The roll is cumulative and permanent; the
                practising-certificate count reflects only solicitors currently authorised to
                practise. The difference is derived arithmetically.
              </p>
              <p>
                <strong>Firm structure.</strong> The constitution-type shares come from the SRA
                Regulated Community Statistics, which count all recognised bodies, recognised sole
                practices, and licensed bodies (Alternative Business Structures) by type. This page
                uses aggregate percentages and trends only. No individual firm details are
                presented, and no firm ranking is implied.
              </p>
              <p>
                <strong>Stock, not flow.</strong> Every figure on this page is a stock measure: it
                describes the profession and firm base as they exist today. None of these figures is
                a Companies House new-incorporation flow measure. In particular, the roughly 58.7%
                incorporated share is the share of the existing regulated firm base, not the share
                of new firms that incorporate, and it must not be conflated with new-incorporation
                statistics that report a much higher limited-company share of annual formations.
              </p>
              <ul className="not-prose mt-2 space-y-1 text-sm">
                {meta.sources.map((s, i) => (
                  <li key={i}>
                    <a
                      href={s.url}
                      className="font-semibold text-[var(--primary)] hover:opacity-80"
                      rel="nofollow"
                    >
                      {s.name}
                    </a>{" "}
                    <span className="text-neutral-500">({s.publisher})</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm">
                <Link
                  href={`${PAGE_PATH}/data`}
                  className="font-semibold text-[var(--primary)] hover:opacity-80"
                >
                  Download the summary data (CSV)
                </Link>
              </p>
              <p className="text-sm text-neutral-500">
                SRA statistics used with attribution; not OGL. Aggregate data only; no named-firm
                data. Free to cite with attribution to Accounts for Lawyers.
              </p>
            </Section>

            {/* CTA */}
            <div className="mt-10 rounded-2xl border-2 border-[var(--primary)]/20 bg-[var(--primary)]/5 p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-[var(--primary)] sm:text-3xl">
                Structuring or restructuring your practice?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                The shift towards incorporation is clear across the profession, but the right
                structure depends on your profit level, how you extract income, and your regulatory
                position with the SRA. Our team works exclusively with solicitors and law firms and
                can model the options for your specific situation.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                <Link href="/calculators" className="text-[var(--primary)] hover:opacity-80">
                  Tax calculators for solicitors &rarr;
                </Link>
                <Link href="/services" className="text-[var(--primary)] hover:opacity-80">
                  Our services for law firms &rarr;
                </Link>
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
                Frequently asked questions
              </h2>
              <div className="mt-6 space-y-6">
                {faqs.map((f, i) => (
                  <div key={i}>
                    <h3 className="text-lg font-bold text-neutral-900">{f.question}</h3>
                    <p className="mt-2 text-base leading-relaxed text-neutral-700">{f.answer}</p>
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
