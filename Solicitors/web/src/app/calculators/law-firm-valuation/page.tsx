import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { LawFirmValuationCalculator } from "@/components/calculators/LawFirmValuationCalculator";
import { focusRing, sectionY, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildBreadcrumbJsonLd, buildFaqPage, buildService, JsonLd } from "@/lib/schema/index";

const TITLE = "Law Firm Valuation Calculator UK 2025/26 | Formula + Multiples";
const DESCRIPTION = "Free UK law firm valuation calculator. Profit × multiple by firm type and region, plus WIP and tangible assets. Indicative 2025/26 market ranges.";

const FAQS = [
  { question: "What's the UK law firm valuation formula?", answer: "Indicative formula: normalised annual profit × multiple + WIP + tangible assets = enterprise value. Multiples vary widely by firm type and region. High-street general practice: 0.8-1.2× profit. Mid-market partnership/LLP: 1.2-2×. Specialist firms (personal injury, niche commercial litigation, prestige private client): 2-3×+." },
  { question: "What's normalised profit?", answer: "Profit adjusted for items that won't carry to the buyer: equity partner drawings reset to market salary, personal expenses removed, one-off items called out, related-party transactions normalised. Normalisation typically swings profit by 10-20%, which moves valuation by far more than the multiple range." },
  { question: "How is WIP valued at sale?", answer: "WIP is recognised on an earnings basis (FRS 102 / FRS 105) at recoverable amount. Aged WIP (over 6 months) typically written down or excluded. Litigation WIP discounted more aggressively than conveyancing because conversion is slower." },
  { question: "Are conveyancing firms cheaper than commercial firms?", answer: "Currently yes, depressed by post-2022 market conditions. Conveyancing-heavy firms trade at lower multiples (0.8-1.5× typically) than specialist commercial or private-client firms. Pre-2022 conveyancing factories commanded premium multiples; current market significantly lower." },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${siteConfig.url}/calculators/law-firm-valuation`, languages: { "en-GB": `${siteConfig.url}/calculators/law-firm-valuation`, "x-default": `${siteConfig.url}/calculators/law-firm-valuation` } },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${siteConfig.url}/calculators/law-firm-valuation`, type: "website" },
};

export default function Page() {
  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Calculators", href: "/calculators" }, { label: "Law Firm Valuation" }];
  const serviceSchema = buildService({ name: "Law Firm Valuation Calculator", description: DESCRIPTION, path: "/calculators/law-firm-valuation", serviceType: "Law Firm Tax Calculator", category: "Law Firm Tools" });
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
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/90">Calculator · UK 2025/26</p>
            <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl">Law Firm Valuation Calculator</h1>
            <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">Normalised profit × multiple by firm type and region, plus WIP and tangible assets. UK 2025/26 indicative ranges. Conveyancing-heavy firms shown at current depressed market levels; specialist firms at premium.</p>
          </div>
        </div>
      </section>
      <section className="bg-[var(--surface)]"><div className={`${siteContainerLg} ${sectionY}`}><div className="mx-auto max-w-3xl"><LawFirmValuationCalculator /></div></div></section>
      <section className="bg-[var(--background)]"><div className={`${siteContainerLg} ${sectionY}`}><div className="mx-auto max-w-3xl"><h2 className="font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">Frequently asked</h2><dl className="mt-8 space-y-5">{FAQS.map((f) => (<div key={f.question} className="rounded-2xl border-l-4 border-[var(--primary)] bg-white p-6"><dt className="font-serif text-lg font-semibold text-[var(--ink)]">{f.question}</dt><dd className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">{f.answer}</dd></div>))}</dl></div></div></section>
      <section className="bg-[var(--primary)] text-white"><div className={`${siteContainerLg} ${sectionY}`}><div className="mx-auto max-w-4xl text-center"><h2 className="font-serif text-2xl font-semibold text-white sm:text-3xl">Pre-sale planning needs 18-24 months</h2><p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">EBITDA normalisation, BADR eligibility, Section 162 incorporation — none of this can be done in the last few weeks. BADR rate rises from 14% to 18% on 6 April 2026.</p><div className="mt-8 flex flex-wrap justify-center gap-4"><Link href="/solicitor-guides/post-merger-integration" className={`inline-flex min-h-12 items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--primary)] transition-colors hover:bg-white/90 ${focusRing}`}>Read the M&A guide</Link><Link href="/contact" className={`inline-flex min-h-12 items-center rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 ${focusRing}`}>Book a scoping call</Link></div></div></div></section>
    </>
  );
}
