import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { LlpProfitShareCalculator } from "@/components/calculators/LlpProfitShareCalculator";
import { focusRing, sectionY, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildBreadcrumbJsonLd, buildFaqPage, buildService, JsonLd } from "@/lib/schema/index";

const TITLE = "LLP Profit Share Allocation Calculator UK 2025/26";
const DESCRIPTION = "Allocate annual profit across senior, junior, and fixed-share partners under different methodologies. UK 2025/26 indicative model for LLPs and partnerships.";

const FAQS = [
  { question: "How is profit allocated in a UK LLP?", answer: "Governed by the LLP agreement. Common methodologies: equal share, points-based (senior partners on a higher multiplier), two-tier (senior + junior), or fixed-share + equity (fixed-share members get a flat amount; equity partners share the residual). Each method has its own administrative complexity." },
  { question: "Is profit allocation tax-relevant?", answer: "Yes. Each member is taxed personally on their allocated share at personal income tax + Class 4 NI rates. The allocation methodology drives each member's tax liability. The LLP files SA800; each member files personal SA showing their share." },
  { question: "Can profit be allocated unequally to manage tax?", answer: "Yes — within the bounds of the LLP agreement and commercial reality. HMRC may challenge allocations that don't reflect the genuine commercial arrangement (e.g., allocating a large share to a low-earning spouse who isn't actively contributing). Allocations should be defensible commercially." },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${siteConfig.url}/calculators/llp-profit-share-allocation` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${siteConfig.url}/calculators/llp-profit-share-allocation`, type: "website" },
};

export default function Page() {
  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Calculators", href: "/calculators" }, { label: "LLP Profit Share" }];
  const serviceSchema = buildService({ name: "LLP Profit Share Allocation Calculator", description: DESCRIPTION, path: "/calculators/llp-profit-share-allocation", serviceType: "Law Firm Tax Calculator", category: "Law Firm Tools" });
  const breadcrumbSchema = JSON.parse(buildBreadcrumbJsonLd(breadcrumbItems));
  const faqSchema = buildFaqPage(FAQS);
  const schemaPayload = faqSchema ? [serviceSchema, breadcrumbSchema, faqSchema] : [serviceSchema, breadcrumbSchema];

  return (
    <>
      <JsonLd data={schemaPayload} />
      <section className="bg-[var(--primary)] text-white"><div className={`${siteContainerLg} ${sectionYLoose}`}><Breadcrumb items={breadcrumbItems} variant="light" /><div className="mt-8 max-w-3xl"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/90">Calculator · UK 2025/26</p><h1 className="mt-3 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl">LLP Profit Share Allocation</h1><p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">Allocate annual profit across senior, junior, and fixed-share partners under different methodologies.</p></div></div></section>
      <section className="bg-[var(--surface)]"><div className={`${siteContainerLg} ${sectionY}`}><div className="mx-auto max-w-3xl"><LlpProfitShareCalculator /></div></div></section>
      <section className="bg-[var(--background)]"><div className={`${siteContainerLg} ${sectionY}`}><div className="mx-auto max-w-3xl"><h2 className="font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">Frequently asked</h2><dl className="mt-8 space-y-5">{FAQS.map((f) => (<div key={f.question} className="rounded-2xl border-l-4 border-[var(--primary)] bg-white p-6"><dt className="font-serif text-lg font-semibold text-[var(--ink)]">{f.question}</dt><dd className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">{f.answer}</dd></div>))}</dl></div></div></section>
      <section className="bg-[var(--primary)] text-white"><div className={`${siteContainerLg} ${sectionY}`}><div className="mx-auto max-w-4xl text-center"><h2 className="font-serif text-2xl font-semibold text-white sm:text-3xl">Need the allocation done properly?</h2><div className="mt-8"><Link href="/services/llp-accounts" className={`inline-flex min-h-12 items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--primary)] transition-colors hover:bg-white/90 ${focusRing}`}>LLP accounting service</Link></div></div></div></section>
    </>
  );
}
