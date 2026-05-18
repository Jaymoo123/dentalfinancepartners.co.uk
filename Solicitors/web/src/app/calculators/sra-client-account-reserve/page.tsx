import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SraReserveCalculator } from "@/components/calculators/SraReserveCalculator";
import { focusRing, sectionY, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildBreadcrumbJsonLd, buildFaqPage, buildService, JsonLd } from "@/lib/schema/index";

const TITLE = "SRA Client Account Reserve Calculator | UK Law Firms";
const DESCRIPTION = "Indicative client money exposure and prudent operational reserve sizing for SRA-regulated firms. Includes de minimis exemption check.";

const FAQS = [
  { question: "Is a client account reserve required by the SRA?", answer: "No specific reserve is mandated by the SRA Accounts Rules. The reserve here is a prudent operational buffer to cover shortfalls at reconciliation, residual balances awaiting client return, and contingency for client money interest. Conveyancing-heavy firms typically maintain larger reserves than commercial / private-client firms." },
  { question: "What's the de minimis exemption?", answer: "Rule 12.2: a firm exempted from the annual SRA Accountant's Report if it held no more than £10,000 client money at any time during the period AND average client money balance did not exceed £250. Both conditions must be met. Many small firms qualify but don't realise." },
  { question: "How does client money interest work?", answer: "SRA Accounts Rules require firms to pay client money interest when 'fair'. The test depends on amount held and length of time. Small amounts and short holding periods typically don't require interest. The firm must have a written policy, accessible to clients, and apply it consistently." },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${siteConfig.url}/calculators/sra-client-account-reserve` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${siteConfig.url}/calculators/sra-client-account-reserve`, type: "website" },
};

export default function Page() {
  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Calculators", href: "/calculators" }, { label: "Client Account Reserve" }];
  const serviceSchema = buildService({ name: "SRA Client Account Reserve Calculator", description: DESCRIPTION, path: "/calculators/sra-client-account-reserve", serviceType: "Law Firm Tax Calculator", category: "Law Firm Tools" });
  const breadcrumbSchema = JSON.parse(buildBreadcrumbJsonLd(breadcrumbItems));
  const faqSchema = buildFaqPage(FAQS);
  const schemaPayload = faqSchema ? [serviceSchema, breadcrumbSchema, faqSchema] : [serviceSchema, breadcrumbSchema];

  return (
    <>
      <JsonLd data={schemaPayload} />
      <section className="bg-[var(--primary)] text-white"><div className={`${siteContainerLg} ${sectionYLoose}`}><Breadcrumb items={breadcrumbItems} variant="light" /><div className="mt-8 max-w-3xl"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/90">Calculator · SRA compliance</p><h1 className="mt-3 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl">SRA Client Account Reserve</h1><p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">Indicative client money exposure and prudent operational reserve sizing. Includes Rule 12.2 de minimis exemption check.</p></div></div></section>
      <section className="bg-[var(--surface)]"><div className={`${siteContainerLg} ${sectionY}`}><div className="mx-auto max-w-3xl"><SraReserveCalculator /></div></div></section>
      <section className="bg-[var(--background)]"><div className={`${siteContainerLg} ${sectionY}`}><div className="mx-auto max-w-3xl"><h2 className="font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">Frequently asked</h2><dl className="mt-8 space-y-5">{FAQS.map((f) => (<div key={f.question} className="rounded-2xl border-l-4 border-[var(--primary)] bg-white p-6"><dt className="font-serif text-lg font-semibold text-[var(--ink)]">{f.question}</dt><dd className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">{f.answer}</dd></div>))}</dl></div></div></section>
      <section className="bg-[var(--primary)] text-white"><div className={`${siteContainerLg} ${sectionY}`}><div className="mx-auto max-w-4xl text-center"><h2 className="font-serif text-2xl font-semibold text-white sm:text-3xl">SRA compliance support</h2><div className="mt-8"><Link href="/services/sra-accounts-rules" className={`inline-flex min-h-12 items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--primary)] transition-colors hover:bg-white/90 ${focusRing}`}>SRA Accounts Rules service</Link></div></div></div></section>
    </>
  );
}
