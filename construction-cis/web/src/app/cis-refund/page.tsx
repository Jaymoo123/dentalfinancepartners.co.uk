import type { Metadata } from "next";
import Link from "next/link";
import { LeadCTAPanel } from "@/components/marketing/LeadCTAPanel";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { btnPrimary, focusRing, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";
import { buildHowToJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "CIS Tax Refund Service | Claim Back Your CIS Deductions",
  description:
    "CIS tax refund service for UK construction subcontractors. Third-party reported averages put the annual refund for a registered CIS subcontractor at around £2,000 (illustrative, not guaranteed). We calculate, claim and handle every step.",
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
    body: "There is no published HMRC turnaround for a sole-trader Self Assessment repayment. HMRC asks you to use its 'Check when you can expect a reply' tool, which it updates weekly, and it warns that a claim selected for its anti-fraud security checks can take up to a further 12 weeks on top of that date. Limited companies do not wait at all on the EPS route: CIS suffered is offset against the monthly PAYE liability as you go. A year-end limited-company repayment claim is different, and HMRC says it will usually respond to one within 8 weeks.",
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
                text: "HMRC publishes no fixed Self Assessment repayment turnaround and directs claimants to its weekly-updated 'Check when you can expect a reply' tool. Repayments selected for security checks can take up to a further 12 weeks. HMRC says it will usually respond to a limited company CIS repayment claim within 8 weeks; the in-year EPS route offsets CIS suffered monthly with no claim to process.",
              },
            ],
          }),
        }}
      />
      {/* Hero. Cream, not navy: section 4a puts the pillar heroes on --hero-cream
          so the page opens light and the dark grounds are spent on the table
          headers and the chrome. Copy unchanged. */}
      <section className="bg-[var(--hero-cream)] py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "CIS tax refund" }]}
          />
          <div className="section-label mb-6">CIS tax refund</div>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
            Claim back the CIS deductions you have overpaid.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600">
            CIS deductions are taken before any expenses or allowances are applied. Most registered subcontractors overpay across the year, and third-party reported averages put the annual refund at around £2,000 (illustrative, not guaranteed). We calculate the full refund, handle the claim and deal with HMRC on your behalf.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href="/contact" className={btnPrimary}>
              Check your CIS refund
            </Link>
            {/* ADDITIVE id. The #book LeadCTAPanel at the foot of this page had
                nothing on the route pointing at it: 0 href="#book" in the
                served HTML. Same defect phase 3 closed on the 45 /for routes.
                `cis_refund_hero_book` is NEW, matching for_hero_book,
                calc_hero_help, home_hero_book and services_hero_book, because
                repointing or re-goaling the existing /contact primary would
                split its history at the cutover (trap 22). Goal is `form`, this
                site's taxonomy for an on-page form anchor. */}
            <Link
              href="#book"
              className={`inline-flex min-h-12 items-center justify-center border border-neutral-300 bg-white px-6 py-3 text-base font-medium text-neutral-900 transition-colors hover:bg-neutral-50 ${focusRing}`}
              data-cta="cis_refund_hero_book"
              data-cta-placement="hero"
              data-cta-goal="form"
            >
              Book a free call
            </Link>
          </div>
        </div>
      </section>

      {/* How the refund works */}
      <section className="bg-[var(--surface-elevated)]">
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
              <div key={item.heading} className="border border-neutral-200 border-t-4 border-t-[var(--btn-ground)] bg-white p-6 sm:p-8">
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
      <section className="bg-[var(--surface)]">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <div className="section-label mb-4">Why you overpay</div>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            Why most CIS subcontractors are owed money back.
          </h2>
          <div className="mt-10 sm:mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
            {whyOverpay.map((item) => (
              <article
                key={item.title}
                className="border border-neutral-200 border-l-4 border-l-[var(--btn-ground)] bg-white p-6 sm:p-8"
              >
                <h3 className="text-xl font-bold text-neutral-900">{item.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-neutral-600">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* What we need from you */}
      <section className="bg-[var(--surface-elevated)]">
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
                <div className="h-8 w-8 flex flex-shrink-0 items-center justify-center bg-[var(--btn-ground)] text-sm font-bold text-white">
                  {i + 1}
                </div>
                <span className="text-base leading-relaxed text-neutral-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CIS deduction rates table.
          Ground is stone-100, NOT --surface. --surface (#fafaf9) and the
          --hero-cream (#fafaf7) of the closing panel below differ by 2/255 on
          one channel (delta-L 0.0012), and phase 5 deleted the dividers, so
          those two bands read as one continuous slab. This route is the only
          one where a --surface band sits directly above the contained
          LeadCTAPanel: every other consumer closes white-then-cream. stone-100
          is the warm-neutral ramp --surface itself belongs to, so the brand
          contract is unchanged, and it separates from the cream by delta-L
          0.042. Fixed here at the call site rather than in LeadCTAPanel, which
          eight routes share. */}
      <section className="bg-stone-100">
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
                <tr className="bg-slate-900 text-white">
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
                    <td className="px-5 py-4 font-bold text-[var(--accent-strong)] sm:px-6">{rate}</td>
                    <td className="px-5 py-4 text-neutral-600 sm:px-6">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* neutral-600, not neutral-500: 14px caption, and the stone-100
              ground above drops neutral-500 to 4.23. neutral-600 reads 7.06. */}
          <p className="mt-6 text-sm text-neutral-600 max-w-2xl">
            For information on applying for Gross Payment Status, see our{" "}
            <Link href="/gross-payment-status" className="font-medium text-orange-700 underline underline-offset-4 hover:text-orange-800 transition-colors">
              GPS service page
            </Link>
            . All three rates are unchanged for 2026/27.
          </p>
        </div>
      </section>

      {/* Section D.3 closing ask. This was a full-bleed slate-800 navy band and so
          the last opaque band under <main>, running straight into the slate-900
          footer: DESIGN_SYSTEM section 9 forbids navy touching navy, and this
          route was 1 of the 29 in the DESIGN_DELTA 3a.1 breach. `contained`
          renders the panel on --hero-cream, so the tail is stone-100 (rates
          table section), cream (panel), navy (footer). The same LeadForm is
          inside the panel, so no capture is lost, and every visible string is
          passed explicitly from this route's own published copy rather than
          taken from the component defaults. Static band in the page body:
          nothing interruptive.

          The wrapper carries NO data-cta: autoCapture resolves clicks through
          closest("[data-cta]"), so an id here would swallow every form control
          and link in the band. LeadForm emits its own lifecycle events. */}
      <div
        id="book"
        className="scroll-mt-24"
      >
        <LeadCTAPanel
          contained
          eyebrow="Get started"
          title="Find out what you are owed"
          description="Book a free call. We will review your CIS deduction history and tell you exactly what refund to expect. No hard sell, no obligation."
          formTitle="Start your refund claim"
          submitLabel="Request a callback"
          proofPoints={[
            {
              title: "CIS specialists, not a general accounting practice",
              detail: "Construction tax is the whole of what we do, not a sideline.",
            },
            {
              title: "A specialist CIS accountant will be in touch",
              detail: "Not a sales team, not a call centre.",
            },
            {
              title: "Fixed fees, quoted before we start",
              detail: "No work begins until you have agreed the scope.",
            },
          ]}
          footnote={
            <>
              We help subcontractors across all construction trades.{" "}
              <Link
                href="/for"
                className={`font-medium text-[var(--accent-strong)] underline underline-offset-4 ${focusRing}`}
              >
                See the trades we cover
              </Link>
              .
            </>
          }
        />
      </div>
    </>
  );
}
