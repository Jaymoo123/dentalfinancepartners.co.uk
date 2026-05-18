import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { FA2014SalariedMemberCalculator } from "@/components/calculators/FA2014SalariedMemberCalculator";
import { focusRing, sectionY, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildBreadcrumbJsonLd, buildFaqPage, buildService, JsonLd } from "@/lib/schema/index";

const TITLE = "FA 2014 Salaried Member Test for LLP Members | UK 2025/26";
const DESCRIPTION = "Finance Act 2014 Salaried Member three-condition test for UK LLP members. Confirms partner-for-tax vs deemed-employee with PAYE on drawings.";

const FAQS = [
  { question: "What is the FA 2014 Salaried Member test?", answer: "From 6 April 2014, a member of an LLP is deemed an employee for tax purposes if all three conditions are met. Condition A: 'disguised salary' is at least 80% of total reward. Condition B: limited rights to influence the LLP's affairs. Condition C: capital contribution less than 25% of disguised salary. If all three apply, PAYE applies to drawings as if salary." },
  { question: "Do all three conditions need to be met?", answer: "Yes. The deemed-employee treatment only applies if ALL THREE conditions are satisfied. Failing any single condition keeps the member as partner-for-tax. Condition C is typically the most flexible defensive lever — capital contribution structuring." },
  { question: "How do I fix Condition C?", answer: "Lift your capital contribution above 25% of your disguised salary. A member with £100,000 disguised salary needs £25,001+ of capital to break Condition C. Bank loans funding the capital attract qualifying loan interest relief under ITA 2007 s.398." },
  { question: "What's 'disguised salary'?", answer: "Total reward that is fixed or determined without reference to LLP profit. A pure profit-share member has 0% disguised salary (fails Condition A — passes test). A fixed-share member with £80,000 fixed plus £5,000 profit-linked has 94% disguised salary (passes Condition A — fails test on that condition)." },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${siteConfig.url}/calculators/fa-2014-salaried-member`, languages: { "en-GB": `${siteConfig.url}/calculators/fa-2014-salaried-member`, "x-default": `${siteConfig.url}/calculators/fa-2014-salaried-member` } },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${siteConfig.url}/calculators/fa-2014-salaried-member`, type: "website" },
};

export default function Page() {
  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Calculators", href: "/calculators" }, { label: "FA 2014 Salaried Member" }];
  const serviceSchema = buildService({ name: "FA 2014 Salaried Member Test", description: DESCRIPTION, path: "/calculators/fa-2014-salaried-member", serviceType: "Law Firm Tax Calculator", category: "Law Firm Tools" });
  const breadcrumbSchema = JSON.parse(buildBreadcrumbJsonLd(breadcrumbItems));
  const faqSchema = buildFaqPage(FAQS);
  const schemaPayload = faqSchema ? [serviceSchema, breadcrumbSchema, faqSchema] : [serviceSchema, breadcrumbSchema];

  return (
    <>
      <JsonLd data={schemaPayload} />
      <section className="bg-[var(--primary)] text-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <Breadcrumb items={breadcrumbItems} variant="light" />
          <div className="mt-8 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/90">Calculator · FA 2014</p>
            <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl">FA 2014 Salaried Member Test</h1>
            <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">The three-condition Finance Act 2014 test for LLP members. Confirms whether you&apos;re partner-for-tax or deemed employee with PAYE on drawings. Suggests the fix if Condition C is the trigger.</p>
          </div>
        </div>
      </section>
      <section className="bg-[var(--surface)]"><div className={`${siteContainerLg} ${sectionY}`}><div className="mx-auto max-w-3xl"><FA2014SalariedMemberCalculator /></div></div></section>
      <section className="bg-[var(--background)]"><div className={`${siteContainerLg} ${sectionY}`}><div className="mx-auto max-w-3xl"><h2 className="font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">Frequently asked</h2><dl className="mt-8 space-y-5">{FAQS.map((f) => (<div key={f.question} className="rounded-2xl border-l-4 border-[var(--primary)] bg-white p-6"><dt className="font-serif text-lg font-semibold text-[var(--ink)]">{f.question}</dt><dd className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">{f.answer}</dd></div>))}</dl></div></div></section>
      <section className="bg-[var(--primary)] text-white"><div className={`${siteContainerLg} ${sectionY}`}><div className="mx-auto max-w-4xl text-center"><h2 className="font-serif text-2xl font-semibold text-white sm:text-3xl">Need the quarterly audit done properly?</h2><p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">FA 2014 positions drift as roles change. Quarterly audit catches it before HMRC does.</p><div className="mt-8 flex flex-wrap justify-center gap-4"><Link href="/solicitor-guides/partnership-vs-llp-for-solicitors" className={`inline-flex min-h-12 items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--primary)] transition-colors hover:bg-white/90 ${focusRing}`}>Read the full guide</Link><Link href="/for-partners" className={`inline-flex min-h-12 items-center rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 ${focusRing}`}>Partner tax service</Link></div></div></div></section>
    </>
  );
}
