import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/forms/LeadForm";
import { btnPrimary, focusRing, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";
import { buildHowToJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "CIS Tax Refund Service | Claim Back Your CIS Deductions",
  description:
    "CIS tax refund service for UK construction subcontractors. The average CIS subcontractor is owed around £2,000 back. We calculate, claim and handle every step.",
};

const howItWorks = [
  {
    heading: "Sole trader: Self Assessment",
    body: "Sole-trader subcontractors recover CIS deductions through the annual Self Assessment return, filed after the tax year ends on 5 April. The return sets the true tax liability against all income and allowable expenses. Where deductions have been higher than the liability, HMRC refunds the difference. We calculate, prepare and file the return on your behalf.",
  },
  {
    heading: "Limited company: EPS real-time reclaim",
    body: "Limited company subcontractors do not have to wait until the year end. They can offset CIS deductions suffered against PAYE and CIS liabilities in real time each month via the Employer Payment Summary (EPS). This is significantly better for cash flow than the sole-trader route: no 18-month wait, no large lump-sum refund. We manage the monthly EPS submissions.",
  },
  {
    heading: "How long does it take?",
    body: "For a correctly filed sole-trader Self Assessment return, HMRC typically processes and issues the refund within 8 to 12 weeks. Complex cases or amended returns can take longer. For limited companies using the EPS route, deductions are offset month by month with no waiting period. We follow up with HMRC if delays occur.",
  },
];

const whyOverpay = [
  {
    title: "Deductions taken before expenses",
    body: "The 20% CIS rate is applied to your labour payments at source, before any business expenses are considered. Mileage at 55p per mile (from 6 April 2026), tools, PPE, van costs, professional subscriptions: none of these are factored in when the deduction is taken. The Self Assessment return is where they are applied, which is why a refund usually results.",
  },
  {
    title: "Incorrect deduction base",
    body: "CIS deductions apply to the labour element only. Materials you supply for a job are excluded from the deduction base. Many main contractors apply the 20% to the full invoice value rather than splitting out materials. When that happens, you overpay on every single job. We review your deduction slips and recover any overpayment.",
  },
  {
    title: "Personal allowance not used",
    body: "The personal allowance (£12,570 in 2026/27) means the first slice of your income is tax-free. CIS deductions ignore this: 20% is taken from day one regardless of your total income for the year. If your earnings are below the basic rate threshold after expenses, the effective refund rate is higher.",
  },
  {
    title: "Registration status errors",
    body: "Unregistered subcontractors suffer 30% deductions instead of 20%. If your CIS registration has lapsed or your contractor cannot verify you, you may be on the higher rate unnecessarily. We check your registration status and resolve any verification issues with HMRC.",
  },
];

const whatWeNeed = [
  "Your CIS deduction statements (the monthly slips your contractor provides)",
  "A record of your income and expenses for the year (we can work with bank statements)",
  "Mileage records for business travel (55p per mile from April 2026)",
  "Receipts or records for tools, PPE, van costs and other allowable expenses",
  "Your Unique Taxpayer Reference (UTR) and National Insurance number",
  "Details of any other income for the tax year",
];

export default function CisRefundPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildHowToJsonLd({
            name: "How to claim your CIS tax refund",
            description:
              "The CIS refund process for UK construction subcontractors, covering the sole trader Self Assessment route and the limited company EPS reclaim route.",
            steps: [
              {
                name: "Sole trader: Self Assessment",
                text: "Sole traders claim CIS deductions back through Self Assessment after the tax year ends on 5 April. File your return online by 31 January. CIS deducted at source offsets your income tax and Class 4 NI liability.",
              },
              {
                name: "Limited company: EPS real-time reclaim",
                text: "CIS-registered limited companies offset CIS deductions suffered against their monthly PAYE liability via the Employer Payment Summary (EPS). This recovers the money in real time rather than waiting up to 18 months.",
              },
              {
                name: "How long it takes",
                text: "HMRC typically processes Self Assessment repayments within 5 to 10 working days of filing. Limited company EPS reclaims are usually settled within 25 working days of the EPS submission.",
              },
            ],
          }),
        }}
      />
      {/* Hero */}
      <section className="border-b border-neutral-200 bg-[#1e293b] py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="section-label mb-6">CIS tax refund</div>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            The average CIS subcontractor is owed around £2,000 back.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300">
            CIS deductions are taken before any expenses or allowances are applied. Most registered subcontractors overpay across the year. We calculate the full refund, handle the claim and deal with HMRC on your behalf.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href="/contact" className={btnPrimary}>
              Check your CIS refund
            </Link>
          </div>
        </div>
      </section>

      {/* How the refund works */}
      <section className="border-b border-neutral-200 bg-[#fafaf9]">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <div className="section-label mb-4">The service</div>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            How the CIS refund works.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            The route to your refund depends on your trading structure. Both routes recover every pound of overpayment.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3 md:gap-8">
            {howItWorks.map((item) => (
              <div key={item.heading} className="bg-white border border-neutral-200 p-6 sm:p-8 border-t-4 border-t-orange-500">
                <h3 className="text-lg font-bold text-neutral-900">{item.heading}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/contact" className={btnPrimary}>
              Start your refund claim
            </Link>
          </div>
        </div>
      </section>

      {/* Why subcontractors overpay */}
      <section className="border-b border-neutral-200 bg-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <div className="section-label mb-4">Why you overpay</div>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            Why most CIS subcontractors are owed money back.
          </h2>
          <div className="mt-10 sm:mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
            {whyOverpay.map((item) => (
              <article
                key={item.title}
                className="border border-neutral-200 border-l-4 border-l-orange-500 bg-neutral-50 p-6 sm:p-8"
              >
                <h3 className="text-xl font-bold text-neutral-900">{item.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-neutral-600">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* What we need from you */}
      <section className="border-b border-neutral-200 bg-[#fafaf9]">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <div className="section-label mb-4">What we need from you</div>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            What to have ready.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            We keep the process as simple as possible. You do not need everything perfect before you contact us.
          </p>
          <ul className="mt-10 space-y-3">
            {whatWeNeed.map((item, i) => (
              <li key={i} className="flex items-start gap-4 bg-white border border-neutral-200 p-5">
                <div className="h-8 w-8 flex items-center justify-center bg-orange-500 text-white font-bold text-sm flex-shrink-0">
                  {i + 1}
                </div>
                <span className="text-base leading-relaxed text-neutral-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CIS deduction rates table */}
      <section className="border-b border-neutral-200 bg-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <div className="section-label mb-4">Deduction rates</div>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            CIS deduction rates for 2026/27.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            The rate that applies to you depends on your registration status. All three rates apply to the <strong>labour element only</strong>. Materials are excluded from the deduction base.
          </p>
          <div className="mt-10 overflow-x-auto border border-neutral-200 bg-white">
            <table className="w-full min-w-[28rem] text-left text-sm sm:text-base">
              <thead>
                <tr className="bg-[#1e293b] text-white">
                  <th scope="col" className="px-5 py-4 font-bold text-sm uppercase tracking-wider sm:px-6">Status</th>
                  <th scope="col" className="px-5 py-4 font-bold text-sm uppercase tracking-wider sm:px-6">Deduction rate</th>
                  <th scope="col" className="px-5 py-4 font-bold text-sm uppercase tracking-wider sm:px-6">How to get there</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Gross Payment Status", "0%", "Apply via HMRC. Pass business, turnover and compliance tests."],
                  ["Registered subcontractor", "20%", "Register for CIS with HMRC. Contractors verify status before paying."],
                  ["Unregistered subcontractor", "30%", "Higher rate applies when HMRC cannot verify registration."],
                ].map(([status, rate, note], i) => (
                  <tr key={status} className={`border-b border-neutral-200 last:border-0 ${i % 2 === 1 ? "bg-neutral-50" : "bg-white"}`}>
                    <th scope="row" className="px-5 py-4 font-semibold text-neutral-900 sm:px-6">{status}</th>
                    <td className="px-5 py-4 font-bold text-orange-600 sm:px-6">{rate}</td>
                    <td className="px-5 py-4 text-neutral-600 sm:px-6">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-sm text-neutral-500 max-w-2xl">
            For information on applying for Gross Payment Status, see our{" "}
            <Link href="/gross-payment-status" className="font-medium text-orange-700 underline underline-offset-4 hover:text-orange-800 transition-colors">
              GPS service page
            </Link>
            . All three rates are unchanged for 2026/27.
          </p>
        </div>
      </section>

      {/* CTA with form */}
      <section className="bg-[#1e293b] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 items-start">
            <div>
              <div className="section-label mb-6">Get started</div>
              <h2 className="text-2xl font-bold text-white sm:text-4xl">
                Find out what you are owed
              </h2>
              <p className="mt-4 sm:mt-6 text-lg leading-relaxed text-neutral-200">
                Book a free call. We will review your CIS deduction history and tell you exactly what refund to expect. No hard sell, no obligation.
              </p>
              <div className="mt-8 space-y-3">
                {[
                  "CIS specialists, not a general accounting practice",
                  "24-hour response guarantee",
                  "Fixed fees, quoted before we start",
                ].map((point) => (
                  <div key={point} className="flex items-center gap-3 text-neutral-300">
                    <div className="h-5 w-5 flex items-center justify-center bg-orange-500 text-white text-xs font-bold flex-shrink-0">✓</div>
                    <span className="text-sm sm:text-base">{point}</span>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-sm text-neutral-400">
                We help subcontractors across all construction trades.{" "}
                <Link href="/for" className={`font-medium text-orange-400 underline underline-offset-4 hover:text-orange-300 transition-colors ${focusRing}`}>
                  See the trades we cover
                </Link>
                .
              </p>
            </div>
            <div className="bg-white p-6 sm:p-8">
              <h3 className="text-xl font-bold text-neutral-900 mb-4 sm:mb-6">Start your refund claim</h3>
              <LeadForm submitLabel="Request a callback" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
