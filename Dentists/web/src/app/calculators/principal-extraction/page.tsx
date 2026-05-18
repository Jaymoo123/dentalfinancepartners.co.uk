import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PrincipalExtractionCalculator } from "@/components/calculators/PrincipalExtractionCalculator";
import { focusRing, sectionY, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import {
  buildBreadcrumbJsonLd,
  buildFaqPage,
  buildService,
  JsonLd,
} from "@/lib/schema/index";

const TITLE = "Dental Principal Extraction Calculator: Partnership vs Ltd UK 2025/26";
const DESCRIPTION = "Compare partnership/sole-trader vs limited company extraction for a UK dental principal at 2025/26 rates. Flags the NHS Pension accrual loss under Ltd-co structure.";

const FAQS = [
  { question: "Why does the calculator show partnership often winning despite the headline 'Ltd saves tax' narrative?", answer: "Because the gap at 2025/26 rates is much smaller than is often claimed. Corporation tax + dividend tax stacked together approaches personal income tax + NI on equivalent profit. The real reasons to incorporate (retained earnings for practice investment, multiple shareholders, future sale planning) usually outweigh the headline tax saving, which is itself modest." },
  { question: "How big is the NHS Pension impact?", answer: "Materially negative for incorporated principals. NHS Pension contributions accrue only on PAYE salary, not dividend income. A principal switching from sole-trader (£150,000 all-pensionable) to Ltd-co (£30,000 salary + £100,000 dividend) loses £100,000/year of pensionable earnings. Over 10-15 years, this is tens of thousands of pounds less in eventual pension. The calculator flags this but does not quantify it because it requires actuarial modelling." },
  { question: "What's the optimal salary level in a Ltd-co dental practice?", answer: "Most efficient is typically the personal allowance (£12,570 in 2025/26), avoiding NI on the salary portion. For an NHS-active principal who wants higher pensionable earnings, a higher salary up to around £30,000-£40,000 can be tax-efficient when the NHS Pension accrual on it is factored in. Above that, additional salary is less efficient than dividend." },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${siteConfig.url}/calculators/principal-extraction`, languages: { "en-GB": `${siteConfig.url}/calculators/principal-extraction`, "x-default": `${siteConfig.url}/calculators/principal-extraction` } },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${siteConfig.url}/calculators/principal-extraction`, type: "website" },
};

export default function PrincipalExtractionPage() {
  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Calculators", href: "/calculators" }, { label: "Principal Extraction" }];
  const serviceSchema = buildService({ name: "Principal Extraction Calculator", description: DESCRIPTION, path: "/calculators/principal-extraction", serviceType: "Dental Tax Calculator", category: "Dental Practice Tools" });
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
            <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl">Principal Extraction: Partnership vs Limited Company</h1>
            <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">Compare partnership / sole-trader vs limited company on principal profit. Pension contribution and NHS Pension impact factored in.</p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface)]"><div className={`${siteContainerLg} ${sectionY}`}><div className="mx-auto max-w-3xl"><PrincipalExtractionCalculator /></div></div></section>

      <section className="bg-[var(--background)]"><div className={`${siteContainerLg} ${sectionY}`}><div className="mx-auto max-w-3xl"><h2 className="font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">Frequently asked</h2><dl className="mt-8 space-y-5">{FAQS.map((f) => (<div key={f.question} className="rounded-2xl border-l-4 border-[var(--gold)] bg-white p-6"><dt className="font-serif text-lg font-semibold text-[var(--ink)]">{f.question}</dt><dd className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">{f.answer}</dd></div>))}</dl></div></div></section>

      <section className="bg-[var(--navy)] text-white"><div className={`${siteContainerLg} ${sectionY}`}><div className="mx-auto max-w-4xl text-center"><h2 className="font-serif text-2xl font-semibold text-white sm:text-3xl">The full structure question</h2><p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">Tax is one variable. Sale plans, future partner additions, family employment, and NHS Pension goals all interact with the structure decision.</p><div className="mt-8 flex flex-wrap justify-center gap-4"><Link href="/dental-guides/practice-profit-extraction-partnership-vs-ltd" className={`inline-flex min-h-12 items-center rounded-full bg-[var(--gold)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--gold-strong)] ${focusRing}`}>Read the full guide</Link><Link href="/contact" className={`inline-flex min-h-12 items-center rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 ${focusRing}`}>Book a scoping call</Link></div></div></div></section>
    </>
  );
}
