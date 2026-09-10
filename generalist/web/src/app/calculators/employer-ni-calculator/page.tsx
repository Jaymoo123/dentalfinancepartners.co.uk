import type { Metadata } from "next";
import { siteContainerLg, btnOnDark } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow, Prose } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { FaqSection } from "@accounting-network/web-shared/design/primitives/FaqSection";
import { ExampleFigureNote } from "@accounting-network/web-shared/design/primitives/ExampleFigureNote";
import { RelatedArticles } from "@accounting-network/web-shared/design/blog/RelatedArticles";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { GeneralistBackdrop } from "@/components/layout/GeneralistBackdrop";
import { LeadForm } from "@/components/forms/LeadForm";
import { LEAD_PROOF_POINTS } from "@/lib/blog-cta-map";
import { siteConfig } from "@/config/site";
import { EmployerNICalculator } from "@/components/calculators/EmployerNICalculator";
import { JsonLd, buildWebApplication, buildFaqPage } from "@/lib/schema";
import { CalculatorPageResources } from "@/components/resources/CalculatorPageResources";

export const metadata: Metadata = {
  title: "Employer NI & Cost-to-Hire Calculator 2026/27 | UK Business",
  description:
    "Free calculator: total cost of an employee in 2026/27. Employer NI at 15%, Employment Allowance £10,500, minimum pension. For UK limited companies and small businesses.",
  alternates: { canonical: `${siteConfig.url}/calculators/employer-ni-calculator` },
  openGraph: {
    title: "Employer NI & Cost-to-Hire Calculator 2026/27",
    description: "Free calculator: total cost of an employee in 2026/27. For UK businesses.",
    url: `${siteConfig.url}/calculators/employer-ni-calculator`,
    type: "website",
  },
};

/** One array: the rendered accordion and the FAQPage schema both read it. */
const faqs = [
  {
    question: "How is employer National Insurance calculated for 2026/27?",
    answer:
      "Employer NI (Class 1 secondary) is 15% on earnings above the secondary threshold of £5,000 per year per employee for 2026/27 (the rate increased from 13.8% and the threshold reduced from £9,100 in the Autumn Budget 2024, and both figures are unchanged for 2026/27). So an employee on £40,000 generates (£40,000 - £5,000) × 15% = £5,250 of employer NI before any Employment Allowance is applied.",
  },
  {
    question: "What is the Employment Allowance and do I qualify?",
    answer:
      "Employment Allowance lets eligible UK employers reduce their employer NI bill by up to £10,500 per tax year in 2026/27 (unchanged from 2025/26; it rose from £5,000 in 2024/25). Most small businesses qualify, but there is one critical catch: a single-director-only company (no other employees on payroll above the secondary threshold) does NOT qualify. You need at least one other paid employee. The £100,000 previous-year NI bill cap was removed from 6 April 2025, so it now applies to most employers.",
  },
  {
    question: "What about pension auto-enrolment?",
    answer:
      "If an employee earns more than £10,000 and is aged 22 to state pension age, you must auto-enrol them and contribute at least 3% on qualifying earnings (the slice between £6,240 and £50,270). They contribute at least 5%. The calculator's pension line shows the minimum 3% employer cost only; many employers offer higher matches as part of a competitive package.",
  },
  {
    question: "What costs are not included?",
    answer:
      "The real all-in cost of a hire is typically 10-20% higher than the salary + NI + pension figure. Things to add: software per seat (Slack, Google Workspace, Xero seat), equipment refresh, training and conferences, recruitment fees if you use a recruiter, professional memberships, private health if offered, and any bonus or commission structure. The calculator gives you the statutory floor.",
  },
];

/**
 * Hand-authored related list (G4). The registry copy of this tool carries no
 * `related[]`, and every href below is a page that exists: the payroll hub and
 * three published Payroll and PAYE posts.
 */
const RELATED = [
  { href: "/blog/payroll-and-paye", title: "Payroll and PAYE guides" },
  {
    href: "/blog/payroll-and-paye/employer-nic-true-cost-of-employee-2026-27",
    title: "Employer NIC and the true cost of an employee in 2026/27",
  },
  {
    href: "/blog/payroll-and-paye/payroll-for-one-employee-uk-director-guide",
    title: "How do I run payroll for one employee in the UK?",
  },
  {
    href: "/blog/payroll-and-paye/how-to-register-for-paye-uk-employers",
    title: "How to register for PAYE as a UK employer",
  },
];

export default function EmployerNICalculatorPage() {
  const webApp = buildWebApplication({
    name: "Employer NI & Cost-to-Hire Calculator 2026/27",
    description:
      "Free UK calculator: total cost of an employee in 2026/27 including employer NI, Employment Allowance and minimum auto-enrolment pension.",
    path: "/calculators/employer-ni-calculator",
    applicationCategory: "FinanceApplication",
  });
  const faqPage = buildFaqPage(faqs);

  return (
    <>
      {/* BreadcrumbList is emitted by the kit <Breadcrumb> below. */}
      <JsonLd data={faqPage ? [webApp, faqPage] : [webApp]} />

      <section className="relative overflow-hidden bg-slate-900 py-12 sm:py-16">
        <GeneralistBackdrop />
        <div className={`${siteContainerLg} relative z-10`}>
          <Breadcrumb
            siteUrl={siteConfig.url}
            onDark
            items={[
              { label: "Home", href: "/" },
              { label: "Calculators", href: "/calculators" },
              { label: "Employer NI Calculator" },
            ]}
          />
          <div className="max-w-3xl">
            <Eyebrow onDark>Free calculator · 2026/27 rates</Eyebrow>
            <h1 className="text-3xl font-bold leading-[1.15] text-white text-balance sm:text-4xl lg:text-5xl">
              Employer NI &amp; cost-to-hire calculator
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
              Hiring is rarely as cheap as the offer letter implies. Add a salary in, get the full
              employer NI at 15%, the Employment Allowance offset of up to £10,500, and the 3%
              auto-enrolment pension contribution stacked on top, so you can see what an extra head
              actually costs each month.
            </p>
            <a
              href="#get-expert-help"
              data-cta="calc_hero_help"
              data-cta-placement="hero"
              data-cta-goal="form"
              className={`${btnOnDark} mt-6`}
            >
              Ask an accountant about your figure
            </a>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <EmployerNICalculator gateCampaign="employer-ni-calculator" />

          {/* Premium island for the payroll topic. */}
          <CalculatorPageResources slug="employer-ni-calculator" />
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">How this works</h2>
          <Prose>
            <p>
              Add each role on your payroll with its gross salary. The calculator works out employer
              NI per employee at 15% above the £5,000 secondary threshold, applies the £10,500
              Employment Allowance once across the team if you qualify, and optionally adds the
              minimum 3% employer pension contribution on qualifying earnings. The total annual
              employment cost is shown at the top.
            </p>
            <p>
              The figures are statutory floors. Real all-in cost per hire is typically 10-20% higher
              once you factor in software, equipment, training, recruitment and any bonus or
              commission structure.
            </p>
            <p>
              Worked example: an employee on a £40,000 salary generates employer NI of £5,250 (15%
              on the £35,000 above the £5,000 secondary threshold) plus minimum auto-enrolment
              pension of £1,013 (3% on qualifying earnings between £6,240 and £40,000). The total
              annual employment cost is £46,263, or £3,855 per month. If the employer has at least
              one other employee and qualifies for the Employment Allowance, up to £10,500 of that
              £5,250 NI bill can be offset, reducing the NI cost to nil and the monthly employment
              cost to £3,418.
            </p>
          </Prose>
          <ExampleFigureNote className="mt-4" />
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <Eyebrow>Related reading</Eyebrow>
          <h2 className="mb-8 text-2xl font-bold text-slate-900 sm:text-4xl">Read this next</h2>
          <RelatedArticles items={RELATED} />
        </div>
      </section>

      <div id="get-expert-help" className="scroll-mt-24">
        <LeadCTAPanel
          title="Budgeting a hiring round?"
          description="The calculator gives you a per-role number. The harder question is sequencing: who first, how the cash flow handles it, when the Employment Allowance gets used up, and what the all-in cost looks like layered over a 12-month plan."
          proofPoints={LEAD_PROOF_POINTS}
          form={<LeadForm submitLabel="Book a free call" redirectOnSuccess={false} />}
          backdrop={<GeneralistBackdrop />}
        />
      </div>

      <FaqSection faqs={faqs} className="bg-white py-12 sm:py-16 lg:py-20" />
    </>
  );
}
