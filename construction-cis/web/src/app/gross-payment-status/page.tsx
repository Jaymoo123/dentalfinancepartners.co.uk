import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/forms/LeadForm";
import { btnPrimary, focusRing, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";
import { buildHowToJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "CIS Gross Payment Status | Application & Maintenance Service",
  description:
    "CIS Gross Payment Status application and maintenance service. GPS eliminates the 20% deduction entirely. We manage the application, the three qualifying tests and ongoing April 2026 compliance.",
};

const qualifyingTests = [
  {
    number: "01",
    title: "Business test",
    body: "You carry out construction work (or provide labour for construction work) in the UK, and you run the business through a bank account. This test is straightforward for most active subcontractors.",
  },
  {
    number: "02",
    title: "Turnover test",
    body: "Your net annual CIS turnover must reach the relevant threshold for your entity type. Net means excluding VAT and excluding the cost of materials you purchase for jobs. The measurement period is the last 12 months of CIS-relevant construction work.",
  },
  {
    number: "03",
    title: "Compliance test",
    body: "All your tax obligations must have been met on time for the past 12 months: no late Self Assessment returns, no overdue tax bills, no PAYE defaults. A clean 12-month record is required before applying.",
  },
];

const turnoverThresholds = [
  { entity: "Sole trader", threshold: "£30,000" },
  { entity: "Partnership", threshold: "£30,000 per partner OR £100,000 total" },
  { entity: "Limited company", threshold: "£30,000 per director OR £100,000 total" },
  { entity: "Closely controlled company (5 or fewer controllers)", threshold: "£30,000 per controller" },
];

const aprilChanges = [
  {
    title: "Immediate revocation on fraud connections",
    body: "From 6 April 2026, HMRC can remove GPS without advance notice where a contractor knew or should have known about fraudulent connections in the supply chain. The 'should have known' standard is key: failure to carry out due diligence is sufficient for revocation. HMRC does not have to prove you intended any wrongdoing.",
  },
  {
    title: "Five-year reapplication ban",
    body: "GPS removed on fraud grounds now triggers a 5-year ban on reapplication (previously 1 year). The cash-flow cost is severe: roughly £100,000 a year for a contractor earning £500,000, because 20% is deducted at source on every payment instead of 0% with GPS.",
  },
  {
    title: "Director liability up to 30%",
    body: "Finance Bill 2026 ss.62A/62B allow individual directors to face penalties of up to 30% of the tax HMRC considers lost due to fraudulent transactions. The liability reaches the individual, not just the company.",
  },
  {
    title: "Due diligence is now essential",
    body: "To meet the 'should have known' standard, a contractor must before each payment: re-verify the CIS status of each subcontractor with HMRC, run a Companies House legitimacy check on the subcontractor's company, and carry out bank account name verification to confirm the payment recipient is genuine.",
  },
];

export default function GrossPaymentStatusPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildHowToJsonLd({
            name: "How to qualify for CIS Gross Payment Status",
            description:
              "HMRC requires all three tests to be passed before granting Gross Payment Status, which eliminates the 20% CIS deduction at source.",
            steps: [
              {
                name: "Business test",
                text: "You must carry out construction work (or supply labour for construction) in the UK, and run your business through a UK bank account.",
              },
              {
                name: "Turnover test",
                text: "Your net annual CIS turnover must meet the threshold for your business type. Sole trader: £30,000. Partnership: £30,000 per partner or £100,000 total. Limited company: £30,000 per director or £100,000 total. Net means after deducting VAT and materials.",
              },
              {
                name: "Compliance test",
                text: "All tax obligations must have been met on time for the past 12 months. This includes Self Assessment returns, PAYE, VAT, and CIS300 filings. Any defaults disqualify the application.",
              },
            ],
          }),
        }}
      />
      {/* Hero */}
      <section className="border-b border-neutral-200 bg-[#1e293b] py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="section-label mb-6">Gross payment status</div>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Get CIS gross payment status, and keep it.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300">
            GPS means no CIS deduction at all. You receive every payment in full. The April 2026 anti-fraud changes make applying for GPS straightforward but keeping it requires active due diligence. We manage both.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href="/contact" className={btnPrimary}>
              Apply for GPS
            </Link>
          </div>
        </div>
      </section>

      {/* What GPS means */}
      <section className="border-b border-neutral-200 bg-[#fafaf9]">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <div className="section-label mb-4">The value of GPS</div>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            What GPS is worth to your business.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            Without GPS, 20% of your labour income is taken every month before you see it. With GPS, every payment arrives in full. The cash flow difference compounds across a full year&apos;s work.
          </p>
          <div className="mt-10 overflow-x-auto border border-neutral-200 bg-white">
            <table className="w-full min-w-[28rem] text-left text-sm sm:text-base">
              <thead>
                <tr className="bg-[#1e293b] text-white">
                  <th scope="col" className="px-5 py-4 font-bold text-sm uppercase tracking-wider sm:px-6">Annual CIS turnover (labour)</th>
                  <th scope="col" className="px-5 py-4 font-bold text-sm uppercase tracking-wider text-orange-300 sm:px-6">With GPS (0%)</th>
                  <th scope="col" className="px-5 py-4 font-bold text-sm uppercase tracking-wider sm:px-6">Without GPS (20%)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["£40,000", "£40,000 received gross", "£32,000 received (£8,000 held by HMRC)"],
                  ["£80,000", "£80,000 received gross", "£64,000 received (£16,000 held)"],
                  ["£150,000", "£150,000 received gross", "£120,000 received (£30,000 held)"],
                  ["£500,000", "£500,000 received gross", "£400,000 received (£100,000 held)"],
                ].map(([turnover, gps, noGps], i) => (
                  <tr key={turnover} className={`border-b border-neutral-200 last:border-0 ${i % 2 === 1 ? "bg-neutral-50" : "bg-white"}`}>
                    <th scope="row" className="px-5 py-4 font-semibold text-neutral-900 sm:px-6">{turnover}</th>
                    <td className="px-5 py-4 font-semibold text-orange-600 sm:px-6">{gps}</td>
                    <td className="px-5 py-4 text-neutral-600 sm:px-6">{noGps}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-sm text-neutral-500 max-w-2xl">
            Figures illustrative. CIS deductions count as advance payments against your eventual tax bill, so they are refundable, but only after the tax year ends. GPS eliminates the cash flow cost entirely.
          </p>
        </div>
      </section>

      {/* Qualifying tests */}
      <section className="border-b border-neutral-200 bg-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <div className="section-label mb-4">Qualifying for GPS</div>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            The three tests, all of which must be passed.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            GPS is not automatic. You must pass all three tests before applying, and maintain compliance to keep the status active.
          </p>
          <div className="mt-14 grid gap-6 md:grid-cols-3 md:gap-8">
            {qualifyingTests.map((test) => (
              <div key={test.number} className="border-l-2 border-orange-500 pl-6">
                <span className="font-mono text-sm font-medium text-orange-500 uppercase tracking-widest">{test.number}</span>
                <h3 className="mt-1 text-xl font-semibold text-neutral-900">{test.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-neutral-600">{test.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 overflow-x-auto border border-neutral-200 bg-white">
            <div className="px-5 py-3 bg-neutral-50 border-b border-neutral-200">
              <h3 className="text-base font-bold text-neutral-900">Turnover thresholds by entity type (net of VAT and materials)</h3>
            </div>
            <table className="w-full min-w-[28rem] text-left text-sm sm:text-base">
              <thead>
                <tr className="bg-[#1e293b] text-white">
                  <th scope="col" className="px-5 py-4 font-bold text-sm uppercase tracking-wider sm:px-6">Entity type</th>
                  <th scope="col" className="px-5 py-4 font-bold text-sm uppercase tracking-wider sm:px-6">Net annual CIS turnover required</th>
                </tr>
              </thead>
              <tbody>
                {turnoverThresholds.map((row, i) => (
                  <tr key={row.entity} className={`border-b border-neutral-200 last:border-0 ${i % 2 === 1 ? "bg-neutral-50" : "bg-white"}`}>
                    <th scope="row" className="px-5 py-4 font-semibold text-neutral-900 sm:px-6">{row.entity}</th>
                    <td className="px-5 py-4 text-neutral-600 sm:px-6">{row.threshold}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-sm text-neutral-500 max-w-2xl">
            Net turnover excludes VAT and the cost of materials purchased for jobs. The measurement period is the last 12 months of CIS-relevant construction work.
          </p>
        </div>
      </section>

      {/* April 2026 changes */}
      <section className="border-b border-neutral-200 bg-[#fafaf9]">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <div className="section-label mb-4">April 2026 changes</div>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            The April 2026 GPS anti-fraud rules: why maintenance now matters.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            Finance Bill 2026 introduced a tougher GPS regime in force from 6 April 2026. Qualifying is no longer the end of the story. Keeping GPS now requires active ongoing due diligence.
          </p>
          <div className="mt-10 sm:mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
            {aprilChanges.map((item) => (
              <article
                key={item.title}
                className="border border-neutral-200 border-l-4 border-l-orange-500 bg-white p-6 sm:p-8"
              >
                <h3 className="text-xl font-bold text-neutral-900">{item.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-neutral-600">{item.body}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 bg-white border border-neutral-200 p-6 sm:p-8">
            <h3 className="text-base font-bold text-neutral-900">Managed GPS service: what we do for you</h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600 sm:text-base">
              We assess whether you meet all three qualifying tests before applying. We handle the application with HMRC. We maintain the compliance record and advise you on the three due-diligence steps required to protect the status under the April 2026 rules: subcontractor re-verification, Companies House legitimacy checks and bank account name verification. When GPS is granted, we monitor the ongoing compliance position so you are not caught by an unexpected revocation.
            </p>
          </div>
          <div className="mt-8">
            <Link href="/contact" className={btnPrimary}>
              Apply for GPS
            </Link>
          </div>
        </div>
      </section>

      {/* CTA with form */}
      <section className="bg-[#1e293b] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 items-start">
            <div>
              <div className="section-label mb-6">Get started</div>
              <h2 className="text-2xl font-bold text-white sm:text-4xl">
                Apply for gross payment status
              </h2>
              <p className="mt-4 sm:mt-6 text-lg leading-relaxed text-neutral-200">
                Book a free call. We will assess whether you meet the three qualifying tests and explain the process. No hard sell, no obligation.
              </p>
              <div className="mt-8 space-y-3">
                {[
                  "CIS specialists, not a general practice",
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
                Also interested in a CIS refund?{" "}
                <Link href="/cis-refund" className={`font-medium text-orange-400 underline underline-offset-4 hover:text-orange-300 transition-colors ${focusRing}`}>
                  See our refund service
                </Link>
                .
              </p>
              <p className="mt-3 text-sm text-neutral-400">
                We help all construction trades.{" "}
                <Link href="/for" className={`font-medium text-orange-400 underline underline-offset-4 hover:text-orange-300 transition-colors ${focusRing}`}>
                  See who we work with
                </Link>
                .
              </p>
            </div>
            <div className="bg-white p-6 sm:p-8">
              <h3 className="text-xl font-bold text-neutral-900 mb-4 sm:mb-6">Apply for GPS</h3>
              <LeadForm submitLabel="Request a callback" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
