import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { focusRing, sectionY, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildBreadcrumbJsonLd, buildFaqPage, JsonLd } from "@/lib/schema/index";

const TITLE = "Specialist vs Generalist Accountant for UK Solicitors and Law Firms";
const DESCRIPTION = "What a legal-sector-specialist accountant does that a generalist doesn't. SRA Accountant's Report, FA 2014 Salaried Member audit, LLP tax, post-merger, BADR.";

const COMPARISON = [
  {
    item: "SRA Accountant's Report delivery",
    specialist: "Delivered annually 4-6 weeks ahead of the 6-month SRA deadline. Clean working file. De minimis exemption (Rule 12.2) check applied automatically.",
    generalist: "Often delivered close to the deadline. Working file built fresh each year. De minimis exemption rarely flagged for eligible small firms (who continue paying for a report they don't need).",
  },
  {
    item: "FA 2014 Salaried Member audit",
    specialist: "Quarterly audit of each fixed-share / salaried LLP member against Conditions A + B + C. Drift caught early. Condition C capital fix recommended where the position is tight.",
    generalist: "Often missed entirely until HMRC challenges. Then the audit happens retrospectively, with PAYE backdating and interest.",
  },
  {
    item: "LLP profit allocation",
    specialist: "Allocation methodology reviewed annually against the LLP agreement. Member capital accounts reconciled. Qualifying loan interest relief (ITA 2007 s.398) documented for each member with a buy-in loan.",
    generalist: "SA800 filed; member-level relief claims often inconsistent. Capital account interest sometimes treated as profit allocation, sometimes as expense — depending on who's doing it that year.",
  },
  {
    item: "Pre-sale planning",
    specialist: "18-24 month engagement before exit. BADR eligibility audit (with the 6 April 2026 rate change modelled). Section 162 incorporation modelling. EBITDA normalisation in the accounts buyers will see.",
    generalist: "Sale planning typically starts when the broker is engaged — too late for the structural moves. BADR rate change often missed entirely.",
  },
  {
    item: "Post-merger integration",
    specialist: "Project-managed 90 days post-completion. Client matter ledger migration, WIP reconciliation, PII continuity confirmation, VAT position review, first reconciliation across combined ledgers.",
    generalist: "Year-end accounts produced for the merged entity; the integration mechanics handled (or not handled) by the firm itself.",
  },
  {
    item: "PII renewal",
    specialist: "Co-ordination with the specialist broker before October renewal. Premium tax-deductibility confirmed. Run-off cover modelled if firm cessation is on the horizon.",
    generalist: "PII premium treated as a line item; brokerage advice not provided.",
  },
  {
    item: "Conveyancing-specific compliance",
    specialist: "SDLT timing and submission. Client money on conveyancing matters audited at five-weekly cycles. Disbursement classification (agent vs principal) reviewed for VAT exposure.",
    generalist: "Generally aware of conveyancing but the depth and pattern recognition is missing.",
  },
  {
    item: "Fee structure",
    specialist: "Fixed monthly fee, scoped to firm size. Specialist work (sale, acquisition, ABS) priced separately as one-off engagement.",
    generalist: "Hourly billing common. Total annual cost often higher than specialist due to the inefficiency of learning legal-sector basics.",
  },
];

const FAQS = [
  {
    question: "Are specialist accountants more expensive?",
    answer: "Often no. Specialist fees are typically £180-£1,800/month depending on firm size; generalist fees vary widely and are often higher in total because of hourly billing on legal-sector items the generalist needs to learn. The fee gap to a specialist is usually smaller than the value of one missed planning point (BADR timing, Section 162 incorporation, FA 2014 capital structuring).",
  },
  {
    question: "How do I find a legal-sector-specialist accountant?",
    answer: "Word of mouth from other law firm partners is the most reliable channel. The Law Society maintains some directory listings of specialist accountants; ICAEW has a legal-sector member group. Most specialist firms are small (5-20 staff) and don't market heavily — they grow by referral. A scoping call with two or three to compare fee and approach is sensible.",
  },
  {
    question: "Can I switch mid-year?",
    answer: "Yes. The cleanest switch points are after the SRA Accountant's Report is filed and before the next year-end. The new accountant takes over from the start of the new accounting period. Mid-year switches are also possible but require a partial-year handover. We co-ordinate with the departing accountant for a clean transition.",
  },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${siteConfig.url}/specialist-vs-generalist-accountant` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${siteConfig.url}/specialist-vs-generalist-accountant`, type: "website" },
};

export default function Page() {
  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Specialist vs Generalist Accountant" }];
  const breadcrumbSchema = JSON.parse(buildBreadcrumbJsonLd(breadcrumbItems));
  const faqSchema = buildFaqPage(FAQS);
  const schemaPayload = faqSchema ? [breadcrumbSchema, faqSchema] : [breadcrumbSchema];

  return (
    <>
      <JsonLd data={schemaPayload} />

      <section className="bg-[var(--primary)] text-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <Breadcrumb items={breadcrumbItems} variant="light" />
          <div className="mt-8 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/90">Compare · 2025/26</p>
            <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
              Specialist vs Generalist Accountant for UK Law Firms
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">
              What a legal-sector-specialist accountant does that a generalist doesn&apos;t. Side-by-side comparison across SRA Accountant&apos;s Report, FA 2014 audit, LLP tax, post-merger integration, PII renewal, and conveyancing-specific compliance.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-5xl space-y-6">
            {COMPARISON.map((c) => (
              <div key={c.item} className="rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8">
                <h3 className="font-serif text-lg font-semibold text-[var(--ink)] sm:text-xl">{c.item}</h3>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div className="rounded-xl border-l-4 border-[var(--primary)] bg-[var(--surface)] p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--primary)]">Specialist</p>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">{c.specialist}</p>
                  </div>
                  <div className="rounded-xl border-l-4 border-[var(--muted)] bg-[var(--surface)] p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">Generalist</p>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">{c.generalist}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--background)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">Frequently asked</h2>
            <dl className="mt-10 space-y-5">
              {FAQS.map((f) => (
                <div key={f.question} className="rounded-2xl border-l-4 border-[var(--primary)] bg-white p-6 sm:p-7">
                  <dt className="font-serif text-lg font-semibold text-[var(--ink)]">{f.question}</dt>
                  <dd className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">{f.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-[var(--primary)] text-white">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-serif text-2xl font-semibold text-white sm:text-3xl">Time to switch?</h2>
            <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">30-minute scoping call. We tell you what would change if you moved, what the fee would be, and whether it&apos;s worth the disruption. No drip sequence, no chase.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/free-firm-health-check" className={`inline-flex min-h-12 items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--primary)] transition-colors hover:bg-white/90 ${focusRing}`}>Take the firm health check</Link>
              <Link href="/contact" className={`inline-flex min-h-12 items-center rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 ${focusRing}`}>Book a scoping call</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
