import type { Metadata } from "next";
import Link from "next/link";
import { LeadCTAPanel } from "@/components/marketing/LeadCTAPanel";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
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
    title: "Knowledge-based penalties and officer liability",
    body: "Finance Act 2026 inserts FA 2004 ss.62A and 62B. A person who makes a payment under a construction contract knowing, or having reason to know, that a connected party has deliberately failed to comply with CIS faces a penalty of 20% of that payment (s.62A). Where a return is made in that same knowledge, the liability is an amount equal to the whole sum the return treats as paid (s.62B). Where a company is penalised, HMRC can pursue an officer personally under the officer-liability rules, including a decision notice under FA 2004 s.72B requiring an officer to pay up to 100% of the company's s.72A penalty.",
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
      {/* Hero. Cream, not navy: section 4a puts the pillar heroes on --hero-cream.
          Copy unchanged. */}
      <section className="bg-[var(--hero-cream)] py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Gross payment status" }]}
          />
          <div className="section-label mb-6">Gross payment status</div>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
            Get CIS gross payment status, and keep it.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600">
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
      <section className="bg-[var(--surface-elevated)]">
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
                <tr className="bg-slate-900 text-white">
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
                    <td className="px-5 py-4 font-semibold text-[var(--accent-strong)] sm:px-6">{gps}</td>
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
      <section className="bg-[var(--surface)]">
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
              <div key={test.number} className="border-l-2 border-[var(--btn-ground)] pl-6">
                <span className="font-mono text-sm font-medium uppercase tracking-widest text-[var(--accent-strong)]">{test.number}</span>
                <h3 className="mt-1 text-xl font-semibold text-neutral-900">{test.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-neutral-600">{test.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 overflow-x-auto border border-neutral-200 bg-white">
            <div className="border-b border-neutral-200 bg-[var(--surface)] px-5 py-3">
              <h3 className="text-base font-bold text-neutral-900">Turnover thresholds by entity type (net of VAT and materials)</h3>
            </div>
            <table className="w-full min-w-[28rem] text-left text-sm sm:text-base">
              <thead>
                <tr className="bg-slate-900 text-white">
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
      <section className="bg-[var(--surface-elevated)]">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <div className="section-label mb-4">April 2026 changes</div>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            The April 2026 GPS anti-fraud rules: why maintenance now matters.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            Finance Act 2026 introduced a tougher GPS regime in force from 6 April 2026. Qualifying is no longer the end of the story. Keeping GPS now requires active ongoing due diligence.
          </p>
          <div className="mt-10 sm:mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
            {aprilChanges.map((item) => (
              <article
                key={item.title}
                className="border border-neutral-200 border-l-4 border-l-[var(--warn-3)] bg-white p-6 sm:p-8"
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

      {/* Section D.3 closing ask. This was a full-bleed slate-800 navy band and so
          the last opaque band under <main>, running into the slate-900 footer:
          DESIGN_SYSTEM section 9 forbids navy touching navy, and this route was
          1 of the 29 in the DESIGN_DELTA 3a.1 breach. `contained` renders the
          panel on --hero-cream, so the tail is white (April 2026 section),
          cream (panel), navy (footer). Same LeadForm, so no capture is lost, and
          every visible string is passed explicitly from this route's own
          published copy rather than left to the component defaults. No data-cta
          id, so trap 22's locked triples do not move. Static band in the page
          body: nothing interruptive. */}
      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          contained
          eyebrow="Get started"
          title="Apply for gross payment status"
          description="Book a free call. We will assess whether you meet the three qualifying tests and explain the process. No hard sell, no obligation."
          formTitle="Apply for GPS"
          submitLabel="Request a callback"
          proofPoints={[
            {
              title: "CIS specialists, not a general practice",
              detail: "Construction tax is the whole of what we do, not a sideline.",
            },
            {
              title: "A specialist CIS accountant will be in touch",
              detail: "You speak to someone who works on CIS returns every week.",
            },
            {
              title: "Fixed fees, quoted before we start",
              detail: "No work begins until you have agreed the scope.",
            },
          ]}
          footnote={
            <>
              Also interested in a CIS refund?{" "}
              <Link
                href="/cis-refund"
                className={`font-medium text-[var(--accent-strong)] underline underline-offset-4 ${focusRing}`}
              >
                See our refund service
              </Link>
              . We help all construction trades.{" "}
              <Link
                href="/for"
                className={`font-medium text-[var(--accent-strong)] underline underline-offset-4 ${focusRing}`}
              >
                See who we work with
              </Link>
              .
            </>
          }
        />
      </div>
    </>
  );
}
