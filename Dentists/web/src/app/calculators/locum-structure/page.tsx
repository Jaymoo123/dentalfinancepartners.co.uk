import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { LocumStructureCalculator } from "@/components/calculators/LocumStructureCalculator";
import { focusRing, sectionY, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import {
  buildBreadcrumbJsonLd,
  buildFaqPage,
  buildService,
  JsonLd,
} from "@/lib/schema/index";

const TITLE = "Locum Dentist Structure Calculator: Ltd vs Umbrella vs Sole-Trader";
const DESCRIPTION = "Compare locum dentist structures on annual net take-home: sole-trader vs limited company vs umbrella, at your day rate. UK 2025/26 rates.";

const FAQS = [
  { question: "When does a limited company beat sole-trader for a locum?", answer: "Typically once sustainable locum income exceeds around £80,000-£100,000 and the engagements aren't all inside IR35. Below that, the £1,800-£2,500 of annual Ltd-co admin cost plus the more restrictive NHS Pension access often makes sole-trader the better answer. The calculator gives the directional number on your actual figures." },
  { question: "What does the calculator assume about IR35?", answer: "The Ltd-co model assumes engagements are outside IR35 (or fee-payer is small business exempt). If the engaging practice is medium/large and issues an inside-IR35 SDS, the practice operates PAYE-style deductions on your fees and the dividend extraction route disappears. Net take-home in that case is closer to umbrella than the calculator's Ltd-co figure." },
  { question: "Why is umbrella usually the worst option for sustained locuming?", answer: "Umbrellas charge a margin (5-7% typically), expenses are very restricted under IR35, and you're employed on PAYE so all income attracts employee + employer NI. Convenient and low-admin for short or low-volume locuming; rarely the most tax-efficient for sustained work above £40,000-£50,000." },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${siteConfig.url}/calculators/locum-structure`, languages: { "en-GB": `${siteConfig.url}/calculators/locum-structure`, "x-default": `${siteConfig.url}/calculators/locum-structure` } },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${siteConfig.url}/calculators/locum-structure`, type: "website" },
};

export default function LocumStructurePage() {
  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Calculators", href: "/calculators" }, { label: "Locum Structure" }];
  const serviceSchema = buildService({ name: "Locum Structure Comparison Calculator", description: DESCRIPTION, path: "/calculators/locum-structure", serviceType: "Dental Tax Calculator", category: "Dental Practice Tools" });
  const breadcrumbSchema = JSON.parse(buildBreadcrumbJsonLd(breadcrumbItems));
  const faqSchema = buildFaqPage(FAQS);
  const schemaPayload = faqSchema ? [serviceSchema, breadcrumbSchema, faqSchema] : [serviceSchema, breadcrumbSchema];

  return (
    <>
      <JsonLd data={schemaPayload} />
      <section className="bg-[var(--navy)] text-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <Breadcrumb items={breadcrumbItems} variant="light" />
          <div className="mt-8 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--gold)]">Calculator · UK 2025/26</p>
            <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl">Locum Structure Comparison</h1>
            <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">Sole trader vs limited company vs umbrella for a locum dentist. Annual net take-home with the winning structure highlighted.</p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface)]"><div className={`${siteContainerLg} ${sectionY}`}><div className="mx-auto max-w-3xl"><LocumStructureCalculator /></div></div></section>

      <section className="bg-[var(--background)]"><div className={`${siteContainerLg} ${sectionY}`}><div className="mx-auto max-w-3xl"><h2 className="font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">Frequently asked</h2><dl className="mt-8 space-y-5">{FAQS.map((f) => (<div key={f.question} className="rounded-2xl border-l-4 border-[var(--gold)] bg-white p-6"><dt className="font-serif text-lg font-semibold text-[var(--ink)]">{f.question}</dt><dd className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">{f.answer}</dd></div>))}</dl></div></div></section>

      <section className="bg-[var(--navy)] text-white"><div className={`${siteContainerLg} ${sectionY}`}><div className="mx-auto max-w-4xl text-center"><h2 className="font-serif text-2xl font-semibold text-white sm:text-3xl">Want the full structure review?</h2><p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">The calculator gives a directional answer. The right structure also depends on your NHS Pension goals, IR35 mix across engagements, and longer-term position.</p><div className="mt-8 flex flex-wrap justify-center gap-4"><Link href="/services/locum-dentist-tax" className={`inline-flex min-h-12 items-center rounded-full bg-[var(--gold)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--gold-strong)] ${focusRing}`}>Locum tax service</Link><Link href="/free-practice-health-check" className={`inline-flex min-h-12 items-center rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 ${focusRing}`}>Practice health check</Link></div></div></div></section>
    </>
  );
}
