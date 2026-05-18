import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { AssociateTakeHomeCalculator } from "@/components/calculators/AssociateTakeHomeCalculator";
import { focusRing, sectionY, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import {
  buildBreadcrumbJsonLd,
  buildFaqPage,
  buildService,
  JsonLd,
} from "@/lib/schema/index";

const TITLE = "Associate Dentist Take-Home Calculator UK 2025/26";
const DESCRIPTION =
  "Net annual take-home for UK associate dentists. Fee split, lab fees, NHS Pension contribution and deductible expenses modelled at 2025/26 rates.";

const FAQS = [
  { question: "What expenses can an associate dentist deduct?", answer: "For a sole-trader associate: GDC retention, indemnity premiums, CPD, professional subscriptions (BDA etc.), lab fees attributable to your work, motor expenses between practices (not home-to-first-practice), instruments and loupes, accountancy fees, and professional clothing (uniforms only). Personal/private elements need to be apportioned. Mobile phone, home office and training-course travel may be partially deductible if business-use is documented." },
  { question: "Is my NHS Pension contribution deductible?", answer: "Yes, for sole-trader associates contributing via the practitioner pensions arrangement, the contribution is deductible from taxable profit, reducing your income tax bill. It is taken from your NHS earnings at source via the GDS contract mechanism, so it appears in the year-end reconciliation rather than something you pay separately." },
  { question: "How does the calculator handle student loan repayments?", answer: "The model excludes student loans for clarity. If you're on Plan 2 or Plan 5, you'll repay 9% of earnings above the relevant threshold via your self-assessment. Plan 1 has different rates and thresholds. The repayment is automatic through the tax return calculation but reduces your net take-home from the figure shown here." },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${siteConfig.url}/calculators/associate-take-home`, languages: { "en-GB": `${siteConfig.url}/calculators/associate-take-home`, "x-default": `${siteConfig.url}/calculators/associate-take-home` } },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${siteConfig.url}/calculators/associate-take-home`, type: "website" },
};

export default function AssociateTakeHomePage() {
  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Calculators", href: "/calculators" }, { label: "Associate Take-Home" }];
  const serviceSchema = buildService({ name: "Associate Take-Home Calculator", description: DESCRIPTION, path: "/calculators/associate-take-home", serviceType: "Dental Tax Calculator", category: "Dental Practice Tools" });
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
            <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl">Associate Take-Home Calculator</h1>
            <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">Net annual take-home for a sole-trader associate dentist. Fee split, lab fees, deductible expenses, NHS Pension contribution.</p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface)]"><div className={`${siteContainerLg} ${sectionY}`}><div className="mx-auto max-w-3xl"><AssociateTakeHomeCalculator /></div></div></section>

      <section className="bg-[var(--background)]"><div className={`${siteContainerLg} ${sectionY}`}><div className="mx-auto max-w-3xl"><h2 className="font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">Frequently asked</h2><dl className="mt-8 space-y-5">{FAQS.map((f) => (<div key={f.question} className="rounded-2xl border-l-4 border-[var(--gold)] bg-white p-6"><dt className="font-serif text-lg font-semibold text-[var(--ink)]">{f.question}</dt><dd className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">{f.answer}</dd></div>))}</dl></div></div></section>

      <section className="bg-[var(--navy)] text-white"><div className={`${siteContainerLg} ${sectionY}`}><div className="mx-auto max-w-4xl text-center"><h2 className="font-serif text-2xl font-semibold text-white sm:text-3xl">Optimise your position</h2><p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">The calculator gives you the directional number. To check your expense claims, NHS Pension status and structure are all optimal, take the full practice health check.</p><div className="mt-8"><Link href="/free-practice-health-check" className={`inline-flex min-h-12 items-center rounded-full bg-[var(--gold)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--gold-strong)] ${focusRing}`}>Take the free practice health check</Link></div></div></div></section>
    </>
  );
}
