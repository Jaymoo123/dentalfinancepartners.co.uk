import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { IndemnityPremiumCalculator } from "@/components/calculators/IndemnityPremiumCalculator";
import { focusRing, sectionY, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildBreadcrumbJsonLd, buildFaqPage, buildService, JsonLd } from "@/lib/schema/index";

const TITLE = "PII Premium Estimator for UK Law Firms | 2025/26";
const DESCRIPTION = "Indicative annual Professional Indemnity Insurance premium for UK law firms. By gross fees, practice area, claims history, and cover level.";

const FAQS = [
  { question: "Why are PII premiums so much higher for conveyancing firms?", answer: "Claims frequency. Residential conveyancing generates a high volume of claims per fee earner: fraud risk, fund misdirection, registration errors, freehold/leasehold confusion. Insurers price the claims expectation into the premium." },
  { question: "Are PII premiums tax-deductible?", answer: "Yes. PII premiums are an allowable trade expense for the firm. The cost reduces taxable profit. Excess and deductible amounts paid on claims are similarly deductible." },
  { question: "What's the SRA minimum cover?", answer: "£2m per claim for sole practitioners and partnerships (including LLPs); £3m for incorporated firms. Cover must be on the Minimum Terms and Conditions (MTC) from a qualifying insurer. Most firms carry materially more than the minimum." },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${siteConfig.url}/calculators/indemnity-premium-estimator` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${siteConfig.url}/calculators/indemnity-premium-estimator`, type: "website" },
};

export default function Page() {
  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Calculators", href: "/calculators" }, { label: "PII Premium Estimator" }];
  const serviceSchema = buildService({ name: "PII Premium Estimator", description: DESCRIPTION, path: "/calculators/indemnity-premium-estimator", serviceType: "Law Firm Tax Calculator", category: "Law Firm Tools" });
  const breadcrumbSchema = JSON.parse(buildBreadcrumbJsonLd(breadcrumbItems));
  const faqSchema = buildFaqPage(FAQS);
  const schemaPayload = faqSchema ? [serviceSchema, breadcrumbSchema, faqSchema] : [serviceSchema, breadcrumbSchema];

  return (
    <>
      <JsonLd data={schemaPayload} />
      <section className="bg-[var(--primary)] text-white"><div className={`${siteContainerLg} ${sectionYLoose}`}><Breadcrumb items={breadcrumbItems} variant="light" /><div className="mt-8 max-w-3xl"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/90">Calculator · UK 2025/26</p><h1 className="mt-3 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl">PII Premium Estimator</h1><p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">Indicative annual Professional Indemnity Insurance premium by gross fees, practice area, claims history, and cover level. UK 2025/26 market indication.</p></div></div></section>
      <section className="bg-[var(--surface)]"><div className={`${siteContainerLg} ${sectionY}`}><div className="mx-auto max-w-3xl"><IndemnityPremiumCalculator /></div></div></section>
      <section className="bg-[var(--background)]"><div className={`${siteContainerLg} ${sectionY}`}><div className="mx-auto max-w-3xl"><h2 className="font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">Frequently asked</h2><dl className="mt-8 space-y-5">{FAQS.map((f) => (<div key={f.question} className="rounded-2xl border-l-4 border-[var(--primary)] bg-white p-6"><dt className="font-serif text-lg font-semibold text-[var(--ink)]">{f.question}</dt><dd className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">{f.answer}</dd></div>))}</dl></div></div></section>
      <section className="bg-[var(--primary)] text-white"><div className={`${siteContainerLg} ${sectionY}`}><div className="mx-auto max-w-4xl text-center"><h2 className="font-serif text-2xl font-semibold text-white sm:text-3xl">Want the renewal handled properly?</h2><p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">We don&apos;t broker PII (that&apos;s your specialist broker&apos;s job) but we work alongside on the financial and tax side.</p><div className="mt-8"><Link href="/solicitor-guides/professional-indemnity-tax-treatment" className={`inline-flex min-h-12 items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--primary)] transition-colors hover:bg-white/90 ${focusRing}`}>Read the full PII guide</Link></div></div></div></section>
    </>
  );
}
