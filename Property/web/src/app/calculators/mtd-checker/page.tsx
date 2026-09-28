import type { Metadata } from "next";
import { MTDCheckerCalculator } from "@/components/calculators/MTDCheckerCalculator";
import { CalculatorPageResources } from "@/components/resources/CalculatorPageResources";
import { LeadCTAPanel } from "@/components/property/LeadCTAPanel";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildCalculatorJsonLd } from "@/lib/calculator-schema";

export const metadata: Metadata = {
  title: "Making Tax Digital (MTD) Checker | Do Landlords Need to Comply?",
  description:
    "Free MTD for Income Tax checker for UK landlords. Enter rental and self-employment income to see if you must comply with Making Tax Digital, and when.",
  alternates: { canonical: `${siteConfig.url}/calculators/mtd-checker` },
  openGraph: {
    title: "Making Tax Digital (MTD) Checker for Landlords",
    description: "Find out whether you must comply with MTD for Income Tax, and when.",
    url: `${siteConfig.url}/calculators/mtd-checker`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Making Tax Digital (MTD) Checker for Landlords",
    description: "Find out whether you must comply with MTD for Income Tax, and when.",
  },
};

export default function MTDCheckerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildCalculatorJsonLd({
            name: "Making Tax Digital (MTD) Checker",
            description:
              "Check whether a landlord must comply with Making Tax Digital for Income Tax, based on combined gross income from property and self-employment.",
            path: "/calculators/mtd-checker",
          }),
        }}
      />
      <section className="bg-slate-900 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <Breadcrumb
            onDark
            items={[
              { label: "Home", href: "/" },
              { label: "Calculators", href: "/calculators" },
              { label: "MTD Checker" },
            ]}
          />
          <h1 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Making Tax Digital (MTD) Checker
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-300">
            Check whether you must comply with Making Tax Digital for Income Tax, and from which April, based
            on your rental and self-employment income.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16">
        {/* No inner clamp: `max-w-5xl` left the calculator 64px narrower than
            every other section on the page, so its edges did not line up
            with the heading below it. */}
        <div className={siteContainerLg}>
          <MTDCheckerCalculator variant="page" />
          <CalculatorPageResources slug="mtd-checker" />
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
            Who has to comply with MTD, and when
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
            <p>
              Making Tax Digital for Income Tax (MTD for ITSA) changes how landlords report to HMRC. From{" "}
              <strong>6 April 2026</strong> it applies to individuals whose combined gross income from
              property and self-employment is over <strong>£50,000</strong>. The threshold drops to
              £30,000 from April 2027 and £20,000 from April 2028.
            </p>
            <p>
              The test is on <strong>gross income</strong> (your turnover, before expenses), not profit. A
              landlord with £40,000 of rent and £15,000 of self-employment income is over the £50,000 line
              even if the actual profit is modest, so it catches more people than many expect.
            </p>
            <p>
              If you are caught, you must keep digital records and send HMRC a quarterly update from
              MTD-compatible software, then a final declaration after the tax year. This checker totals
              your qualifying income and compares it to the current threshold.
            </p>
          </div>
        </div>
      </section>

      {/* Was a pale mint gradient card holding a bare LeadForm, boxed to
          `max-w-3xl` at the very foot of the page: the least assertive block on
          a page whose reader has just typed their own figures in. Now the same
          full-bleed navy brick panel every other page converts on.

          `redirectOnSuccess` stays false, as it was on the card: a reader who
          has just entered their figures should keep the result on screen rather
          than be thrown to /thank-you. Every other page on the site does
          redirect, because there the slot picker is worth more than the page
          behind it.

          `id` is kept: the calculators link to #get-expert-help from their
          result panels. */}
      <div id="get-expert-help" className="scroll-mt-24">
        <LeadCTAPanel
          eyebrow="Free review"
          title="Need to get ready for MTD?"
          description="We set landlords up with compliant digital record-keeping and handle the quarterly submissions, so MTD is one less thing to worry about. Tell us about your income for a no-obligation chat."
          proofPoints={[
            { title: "Property tax only", detail: "Section 24, CGT and MTD every day" },
            { title: "Fixed fees, quoted upfront", detail: "In writing, before any work starts" },
            { title: "24-hour response", detail: "Usually the same working day" },
          ]}
          submitLabel="Request MTD help"
          footnote="No obligation and no hard sell. If your position is already right, we will say so."
          redirectOnSuccess={false}
        />
      </div>

    </>
  );
}
