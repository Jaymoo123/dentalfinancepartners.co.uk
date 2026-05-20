import type { Metadata } from "next";
import Link from "next/link";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { EmployerNICalculator } from "@/components/calculators/EmployerNICalculator";
import { Calculator } from "lucide-react";
import { JsonLd, buildWebApplication, buildFaqPage } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Employer NI & Cost-to-Hire Calculator 2025/26 | UK Agency",
  description:
    "Free calculator: total cost of an employee in 2025/26. Employer NI at 13.8%, Employment Allowance, minimum pension. Built for UK agency founders.",
  alternates: { canonical: `${siteConfig.url}/calculators/employer-ni-calculator` },
  openGraph: {
    title: "Employer NI & Cost-to-Hire Calculator 2025/26",
    description: "Free calculator: total cost of an employee in 2025/26. Built for UK agency founders.",
    url: `${siteConfig.url}/calculators/employer-ni-calculator`,
    type: "website",
  },
};

const faqs = [
  {
    q: "How is employer National Insurance calculated for 2025/26?",
    a: "Employer NI (Class 1 secondary) is 13.8% on earnings above the secondary threshold of £9,100 per year per employee. So an employee on £40,000 generates roughly (£40,000 - £9,100) × 13.8% = £4,264 of employer NI before any Employment Allowance is applied.",
  },
  {
    q: "What is the Employment Allowance and do I qualify?",
    a: "Employment Allowance lets eligible UK employers reduce their employer NI bill by up to £5,000 per tax year. Most agencies qualify, but there are two important catches. First, a single-director-only company (no other employees on payroll) does NOT qualify. You need at least one other employee earning above the secondary threshold. Second, you can't claim if your previous-year employer NI bill was over £100,000.",
  },
  {
    q: "What about pension auto-enrolment?",
    a: "If an employee earns more than £10,000 and is aged 22 to state pension age, you must auto-enrol them and contribute at least 3% on qualifying earnings (the slice between £6,240 and £50,270). They contribute at least 5%. The calculator's pension line shows the minimum 3% employer cost only, many agencies offer higher matches as part of a competitive package.",
  },
  {
    q: "What costs are not included?",
    a: "The real all-in cost of an agency hire is typically 10-20% higher than the salary + NI + pension figure. Things to add: software per seat (Slack, Google Workspace, design tools), equipment refresh, training and conferences, recruitment fees if you use an agency, professional memberships, private health if offered, and any bonus or commission structure. The calculator gives you the statutory floor.",
  },
];

export default function EmployerNICalculatorPage() {
  const webApp = buildWebApplication({
    name: "Employer NI & Cost-to-Hire Calculator 2025/26",
    description: "Free UK calculator: total cost of an employee in 2025/26 including employer NI, Employment Allowance and minimum auto-enrolment pension.",
    path: "/calculators/employer-ni-calculator",
    applicationCategory: "FinanceApplication",
  });
  const faqPage = buildFaqPage(faqs.map((f) => ({ question: f.q, answer: f.a })));

  return (
    <>
      <JsonLd data={faqPage ? [webApp, faqPage] : [webApp]} />

      <section className="bg-slate-900 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <Breadcrumb
            variant="light"
            items={[
              { label: "Home", href: "/" },
              { label: "Calculators", href: "/calculators" },
              { label: "Employer NI Calculator" },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white uppercase tracking-wider mb-4">
              <Calculator className="h-3.5 w-3.5" />
              Free calculator · 2025/26 rates
            </div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Employer NI &amp; cost-to-hire calculator
            </h1>
            <p className="mt-4 text-lg text-slate-300 leading-relaxed">
              Work out the true cost of your agency team. Employer National Insurance at 13.8%, Employment Allowance, and minimum auto-enrolment pension, all in one model.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <EmployerNICalculator />

            <div className="mt-12 border-l-4 border-indigo-600 bg-slate-50 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-slate-900">How this works</h2>
              <p className="mt-3 text-base text-slate-700 leading-relaxed">
                Add each role on your payroll with its gross salary. The calculator works out employer NI per employee at 13.8% above the £9,100 secondary threshold, applies the £5,000 Employment Allowance once across the team if you qualify, and optionally adds the minimum 3% employer pension contribution on qualifying earnings. The total annual employment cost is shown at the top.
              </p>
              <p className="mt-3 text-base text-slate-700 leading-relaxed">
                The figures are statutory floors. Real all-in cost per hire is typically 10-20% higher once you factor in software, equipment, training, recruitment and any bonus or commission structure.
              </p>
            </div>

            <section className="mt-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently asked questions</h2>
              <dl className="space-y-4">
                {faqs.map((f) => (
                  <div key={f.q} className="border-l-4 border-slate-300 bg-slate-50 p-6">
                    <dt className="text-lg font-bold text-slate-900">{f.q}</dt>
                    <dd className="mt-3 text-base text-slate-700 leading-relaxed">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <div className="mt-12 bg-slate-900 p-8 sm:p-10 text-white">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Modelling your next hires?
              </h2>
              <p className="mt-3 text-base sm:text-lg text-slate-200 leading-relaxed">
                We work with agency founders to model team cost against utilisation, billing rates and target margin. Book a free call to talk through your next 12 months of hiring.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-block bg-indigo-600 px-8 py-3 text-base font-bold text-white border-b-4 border-indigo-800 hover:bg-indigo-700 hover:border-indigo-900 transition-all"
              >
                Book a free call
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
