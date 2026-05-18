import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SolicitorTakeHomeCalculator } from "@/components/calculators/SolicitorTakeHomeCalculator";
import { focusRing, sectionY, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildBreadcrumbJsonLd, buildFaqPage, buildService, JsonLd } from "@/lib/schema/index";

const TITLE = "Solicitor Take-Home Calculator: Sole Trader vs Partnership/LLP vs Ltd";
const DESCRIPTION = "Compare UK solicitor structures on annual net take-home: sole trader vs partnership/LLP vs limited company. UK 2025/26 rates.";

const FAQS = [
  { question: "Are partnership and LLP taxed the same?", answer: "Yes. Both are tax-transparent for income tax — each member or partner is taxed personally on their share of profit. The LLP's separate legal personality gives the limited liability but doesn't create a separate tax person. Mechanically identical for the take-home calculation." },
  { question: "When does limited company beat partnership/LLP on tax?", answer: "At 2025/26 rates the headline tax saving is smaller than commonly believed. The real reasons to incorporate are retained earnings for reinvestment, multiple shareholders, and a share-sale-friendly structure for future exit (BADR on shares). Headline tax saving alone is rarely the deciding factor." },
  { question: "What about ABS structures?", answer: "An ABS-licensed firm can be structured as Ltd, LLP, or partnership. The tax treatment follows the entity type, not the ABS regulatory licence. We can model any combination on your specific numbers." },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${siteConfig.url}/calculators/partnership-vs-llp-take-home` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${siteConfig.url}/calculators/partnership-vs-llp-take-home`, type: "website" },
};

export default function Page() {
  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Calculators", href: "/calculators" }, { label: "Take-home" }];
  const serviceSchema = buildService({ name: "Solicitor Take-Home Calculator", description: DESCRIPTION, path: "/calculators/partnership-vs-llp-take-home", serviceType: "Law Firm Tax Calculator", category: "Law Firm Tools" });
  const breadcrumbSchema = JSON.parse(buildBreadcrumbJsonLd(breadcrumbItems));
  const faqSchema = buildFaqPage(FAQS);
  const schemaPayload = faqSchema ? [serviceSchema, breadcrumbSchema, faqSchema] : [serviceSchema, breadcrumbSchema];

  return (
    <>
      <JsonLd data={schemaPayload} />
      <section className="bg-[var(--primary)] text-white"><div className={`${siteContainerLg} ${sectionYLoose}`}><Breadcrumb items={breadcrumbItems} variant="light" /><div className="mt-8 max-w-3xl"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/90">Calculator · UK 2025/26</p><h1 className="mt-3 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl">Solicitor Take-Home Calculator</h1><p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">Compare sole-trader / partnership / LLP / limited company on annual net take-home. Three structures modelled on 2025/26 rates.</p></div></div></section>
      <section className="bg-[var(--surface)]"><div className={`${siteContainerLg} ${sectionY}`}><div className="mx-auto max-w-3xl"><SolicitorTakeHomeCalculator /></div></div></section>
      <section className="bg-[var(--background)]"><div className={`${siteContainerLg} ${sectionY}`}><div className="mx-auto max-w-3xl"><h2 className="font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">Frequently asked</h2><dl className="mt-8 space-y-5">{FAQS.map((f) => (<div key={f.question} className="rounded-2xl border-l-4 border-[var(--primary)] bg-white p-6"><dt className="font-serif text-lg font-semibold text-[var(--ink)]">{f.question}</dt><dd className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">{f.answer}</dd></div>))}</dl></div></div></section>
      <section className="bg-[var(--primary)] text-white"><div className={`${siteContainerLg} ${sectionY}`}><div className="mx-auto max-w-4xl text-center"><h2 className="font-serif text-2xl font-semibold text-white sm:text-3xl">Want the full structure review?</h2><div className="mt-8 flex flex-wrap justify-center gap-4"><Link href="/solicitor-guides/partnership-vs-llp-for-solicitors" className={`inline-flex min-h-12 items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--primary)] transition-colors hover:bg-white/90 ${focusRing}`}>Read the partnership vs LLP guide</Link><Link href="/free-firm-health-check" className={`inline-flex min-h-12 items-center rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 ${focusRing}`}>Firm health check</Link></div></div></div></section>
    </>
  );
}
