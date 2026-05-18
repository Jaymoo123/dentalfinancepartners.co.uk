import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PracticeValuationCalculator } from "@/components/calculators/PracticeValuationCalculator";
import { focusRing, sectionY, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import {
  buildBreadcrumbJsonLd,
  buildFaqPage,
  buildService,
  JsonLd,
} from "@/lib/schema/index";

const TITLE = "Dental Practice Valuation Calculator UK 2025/26";
const DESCRIPTION = "Indicative dental practice valuation calculator. EBITDA × multiple by region and practice mix plus tangible assets, calibrated to 2025/26 UK market ranges.";

const FAQS = [
  { question: "What is a typical EBITDA multiple for UK dental practices in 2025/26?", answer: "Multiples vary substantially: NHS-heavy single-handed practices in lower-demand regions sit at roughly 0.6-0.9× normalised EBITDA. Mixed NHS/private multi-surgery practices in normal-demand regions: 0.9-1.2×. Private-focused practices in high-demand regions: 1.1-1.4× and sometimes above for prime locations. Corporate acquirer premium can stretch above 1.4× for strategic fit." },
  { question: "What's normalised EBITDA?", answer: "EBITDA adjusted for one-off items, principal compensation back to market rate (so the post-sale buyer can replace the principal at market cost), personal expenses removed from the P&L, and abnormal-year corrections. Normalisation typically swings EBITDA by 10-20% in either direction, which moves valuation by far more than the multiple range does." },
  { question: "How much of a practice price is goodwill versus tangible assets?", answer: "Typically 60-80% goodwill, 20-40% tangible assets. The exact split is negotiated and matters for both sides: goodwill gives the buyer 6.5% per year tax relief over 15 years (post-April-2019), while tangible assets often qualify for 100% Annual Investment Allowance. Sellers care about CGT on goodwill vs balancing charges on equipment." },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${siteConfig.url}/calculators/practice-valuation`, languages: { "en-GB": `${siteConfig.url}/calculators/practice-valuation`, "x-default": `${siteConfig.url}/calculators/practice-valuation` } },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${siteConfig.url}/calculators/practice-valuation`, type: "website" },
};

export default function PracticeValuationPage() {
  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Calculators", href: "/calculators" }, { label: "Practice Valuation" }];
  const serviceSchema = buildService({ name: "Practice Valuation Calculator", description: DESCRIPTION, path: "/calculators/practice-valuation", serviceType: "Dental Tax Calculator", category: "Dental Practice Tools" });
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
            <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl">Practice Valuation Calculator</h1>
            <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">EBITDA × multiple by region and practice mix, plus tangible assets. UK 2025/26 indicative ranges; corporate acquirer premium not modelled.</p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface)]"><div className={`${siteContainerLg} ${sectionY}`}><div className="mx-auto max-w-3xl"><PracticeValuationCalculator /></div></div></section>

      <section className="bg-[var(--background)]"><div className={`${siteContainerLg} ${sectionY}`}><div className="mx-auto max-w-3xl"><h2 className="font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">Frequently asked</h2><dl className="mt-8 space-y-5">{FAQS.map((f) => (<div key={f.question} className="rounded-2xl border-l-4 border-[var(--gold)] bg-white p-6"><dt className="font-serif text-lg font-semibold text-[var(--ink)]">{f.question}</dt><dd className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">{f.answer}</dd></div>))}</dl></div></div></section>

      <section className="bg-[var(--navy)] text-white"><div className={`${siteContainerLg} ${sectionY}`}><div className="mx-auto max-w-4xl text-center"><h2 className="font-serif text-2xl font-semibold text-white sm:text-3xl">Pre-sale planning needs to start 24 months out</h2><p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">EBITDA normalisation, BADR eligibility, Section 162 incorporation — none of this can be done in the last few weeks. The earliest decisions move the price the most.</p><div className="mt-8 flex flex-wrap justify-center gap-4"><Link href="/dental-guides/goodwill-valuation-and-sale-playbook" className={`inline-flex min-h-12 items-center rounded-full bg-[var(--gold)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--gold-strong)] ${focusRing}`}>Read the sale playbook</Link><Link href="/contact" className={`inline-flex min-h-12 items-center rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 ${focusRing}`}>Book a scoping call</Link></div></div></div></section>
    </>
  );
}
