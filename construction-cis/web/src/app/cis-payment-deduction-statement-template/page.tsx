import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";
import { buildFaqJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Free CIS Payment & Deduction Statement Template (Excel + PDF)",
  description:
    "Download a free CIS payment and deduction statement template with every field HMRC requires under Regulation 4. Editable Excel version with built-in formulas, plus a printable PDF.",
};

const XLSX_HREF = "/downloads/cis-payment-deduction-statement-template.xlsx";
const PDF_HREF = "/downloads/cis-payment-deduction-statement-template.pdf";

const requiredFields = [
  {
    field: "Contractor name and employer's PAYE reference",
    note: "Identifies who made the deduction. The PAYE reference (format 123/AB45678) is what HMRC matches the deduction against.",
  },
  {
    field: "Tax month the statement covers",
    note: "CIS runs on tax months, from the 6th of one month to the 5th of the next. One statement per subcontractor per tax month in which a deduction was made.",
  },
  {
    field: "Subcontractor name and Unique Taxpayer Reference (UTR)",
    note: "The UTR is the 10-digit reference HMRC uses to credit the deduction to the right taxpayer.",
  },
  {
    field: "Verification number (30% deductions only)",
    note: "Only required where the deduction was made at the higher 30% rate because the subcontractor could not be verified.",
  },
  {
    field: "Gross amount paid, excluding VAT",
    note: "The total payment for the month before any deduction. VAT is never part of the deduction calculation.",
  },
  {
    field: "Cost of materials",
    note: "The direct cost of materials the subcontractor supplied. This amount is excluded from the deduction base, so getting it right directly changes the deduction.",
  },
  {
    field: "Amount deducted",
    note: "The deduction itself: 20% of the labour element for registered subcontractors, 30% where unverified.",
  },
];

const fillSteps = [
  {
    heading: "1. Enter the contractor and subcontractor details",
    body: "Add the contractor's name and employer's PAYE reference, then the subcontractor's name and 10-digit UTR. If the deduction was made at 30% because the subcontractor could not be verified, add the verification number HMRC issued (it starts with V). At 20%, the verification number is optional.",
  },
  {
    heading: "2. Set the tax month",
    body: "State the tax month the payment falls in, always ending on the 5th. A payment made on 20 July 2026 falls in the tax month ended 5 August 2026. This should match the month reported on the contractor's CIS300 monthly return.",
  },
  {
    heading: "3. Enter the gross payment and materials",
    body: "Enter the total paid for the month excluding VAT, then the direct cost of any materials the subcontractor supplied. In the Excel version, the amount liable to deduction calculates automatically as gross minus materials.",
  },
  {
    heading: "4. Apply the rate and record the deduction",
    body: "Multiply the amount liable to deduction by the rate that applied: 20% for a registered subcontractor, 30% where HMRC could not verify them. Enter that figure as the amount deducted. The Excel version then shows the net amount payable to the subcontractor.",
  },
  {
    heading: "5. Issue it within 14 days",
    body: "Give the statement to the subcontractor within 14 days of the end of the tax month, so by the 19th. Email or paper both count. Keep a copy: contractors must retain CIS records for at least three years.",
  },
];

const faqs = [
  {
    question: "Is there an official HMRC template for CIS payment and deduction statements?",
    answer:
      "No. HMRC does not prescribe a form. Regulation 4 of the CIS Regulations 2005 sets out what information the statement must contain, but the layout is up to the contractor. Any format that includes all the required fields is compliant, which is exactly what this template gives you.",
  },
  {
    question: "Do I have to issue a statement every month?",
    answer:
      "You must issue a statement for every tax month in which you made a deduction from a subcontractor's payments, within 14 days of the end of that tax month (by the 19th). If you paid a subcontractor gross under Gross Payment Status, no statement is required, though many contractors issue one anyway as good practice. There is no annual CIS statement requirement.",
  },
  {
    question: "Is this template free to use?",
    answer:
      "Yes. Both the Excel and PDF versions are free to download and use, with no sign-up required. The Excel version includes formulas that calculate the amount liable to deduction and the net amount payable automatically.",
  },
  {
    question: "Is a CIS deduction statement the same as a CIS certificate?",
    answer:
      "In practice, yes. People call the same document a CIS statement, CIS voucher, CIS certificate or deduction slip. The old CIS25 vouchers were abolished in 2007. Since then the payment and deduction statement under Regulation 4 is the only document, whatever name it goes by.",
  },
  {
    question: "What do I do with the statements I receive as a subcontractor?",
    answer:
      "Keep every one. They are your evidence of tax already paid. Sole traders enter the total deducted on their Self Assessment return to offset it against their tax bill, which is how most CIS refunds arise. Limited companies offset deductions monthly through the Employer Payment Summary (EPS).",
  },
  {
    question: "Can I edit the template?",
    answer:
      "Yes. The Excel version is fully editable: add your logo, extend it to cover multiple subcontractors, or adapt the layout. Just keep all the required fields in place, because a statement missing any of them does not meet the Regulation 4 requirement.",
  },
];

export default function CisStatementTemplatePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(faqs) }}
      />
      {/* Hero */}
      <section className="border-b border-neutral-200 bg-[#1e293b] py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="section-label mb-6">Free download</div>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Free CIS payment and deduction statement template.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300">
            An editable Excel template with built-in formulas, plus a printable PDF. Every field HMRC requires under Regulation 4, ready to fill in and issue. No sign-up, no watermark.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <a href={XLSX_HREF} download className={btnPrimary}>
              Download Excel template (.xlsx)
            </a>
            <a
              href={PDF_HREF}
              download
              className="inline-flex items-center justify-center border border-neutral-400 px-6 py-3 text-base font-semibold text-white hover:border-white transition-colors"
            >
              Download PDF version
            </a>
          </div>
          <p className="mt-6 text-sm text-neutral-400">
            New to deduction statements? Read our{" "}
            <Link href="/blog/cis-compliance/cis-payment-deduction-statements-guide" className="font-medium text-orange-400 underline underline-offset-4 hover:text-orange-300 transition-colors">
              full guide to CIS payment and deduction statements
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Required fields */}
      <section className="border-b border-neutral-200 bg-[#fafaf9]">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <div className="section-label mb-4">What it must contain</div>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            The seven fields every CIS statement needs.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            Regulation 4 of the Income Tax (Construction Industry Scheme) Regulations 2005 requires contractors to issue a statement to every subcontractor paid under deduction, within 14 days of the end of each tax month. The template includes all of the required information.
          </p>
          <div className="mt-10 overflow-x-auto border border-neutral-200 bg-white">
            <table className="w-full min-w-[28rem] text-left text-sm sm:text-base">
              <thead>
                <tr className="bg-[#1e293b] text-white">
                  <th scope="col" className="px-5 py-4 font-bold text-sm uppercase tracking-wider sm:px-6">Required field</th>
                  <th scope="col" className="px-5 py-4 font-bold text-sm uppercase tracking-wider sm:px-6">Why it matters</th>
                </tr>
              </thead>
              <tbody>
                {requiredFields.map((row, i) => (
                  <tr key={row.field} className={`border-b border-neutral-200 last:border-0 ${i % 2 === 1 ? "bg-neutral-50" : "bg-white"}`}>
                    <th scope="row" className="px-5 py-4 font-semibold text-neutral-900 sm:px-6 align-top">{row.field}</th>
                    <td className="px-5 py-4 text-neutral-600 sm:px-6">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* How to fill in */}
      <section className="border-b border-neutral-200 bg-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <div className="section-label mb-4">How to fill it in</div>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            Filling in the template, step by step.
          </h2>
          <div className="mt-10 space-y-6">
            {fillSteps.map((step) => (
              <article key={step.heading} className="border border-neutral-200 border-l-4 border-l-orange-500 bg-neutral-50 p-6 sm:p-8">
                <h3 className="text-xl font-bold text-neutral-900">{step.heading}</h3>
                <p className="mt-3 text-base leading-relaxed text-neutral-600">{step.body}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-neutral-600">
            Not sure the deduction figure is right? Check it with our{" "}
            <Link href="/calculators/cis-deduction-calculator" className="font-medium text-orange-700 underline underline-offset-4 hover:text-orange-800 transition-colors">
              CIS deduction calculator
            </Link>
            . The statement should always match the figures on your{" "}
            <Link href="/blog/cis-compliance/cis-monthly-return-guide" className="font-medium text-orange-700 underline underline-offset-4 hover:text-orange-800 transition-colors">
              CIS300 monthly return
            </Link>{" "}
            for the same tax month.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-neutral-200 bg-[#fafaf9]">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <div className="section-label mb-4">FAQ</div>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            CIS statement template questions.
          </h2>
          <div className="mt-10 space-y-6">
            {faqs.map((faq) => (
              <article key={faq.question} className="bg-white border border-neutral-200 p-6 sm:p-8">
                <h3 className="text-lg font-bold text-neutral-900">{faq.question}</h3>
                <p className="mt-3 text-base leading-relaxed text-neutral-600">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1e293b] py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="max-w-3xl text-2xl font-bold text-white sm:text-4xl">
            Get the template.
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-neutral-200">
            Both versions are free. The Excel file calculates the deduction figures for you; the PDF prints cleanly for paper records.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <a href={XLSX_HREF} download className={btnPrimary}>
              Download Excel template (.xlsx)
            </a>
            <a
              href={PDF_HREF}
              download
              className="inline-flex items-center justify-center border border-neutral-400 px-6 py-3 text-base font-semibold text-white hover:border-white transition-colors"
            >
              Download PDF version
            </a>
          </div>
          <p className="mt-8 text-sm text-neutral-400">
            Missing statements from a contractor, or sitting on a pile of them and wondering what you are owed? Our{" "}
            <Link href="/cis-refund" className="font-medium text-orange-400 underline underline-offset-4 hover:text-orange-300 transition-colors">
              CIS refund service
            </Link>{" "}
            turns deduction statements into money back.
          </p>
        </div>
      </section>
    </>
  );
}
