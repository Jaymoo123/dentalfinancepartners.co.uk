import type { Metadata } from "next";
import { MTDCheckerCalculator } from "@/components/calculators/MTDCheckerCalculator";
import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildCalculatorJsonLd } from "@/lib/calculator-schema";

export const metadata: Metadata = {
  title: "Making Tax Digital (MTD) Checker | Do Landlords Need to Comply?",
  description:
    "Free MTD for Income Tax checker for UK landlords. Enter your rental and self-employment income to see whether you must comply with Making Tax Digital and from which April. Current thresholds.",
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
            items={[
              { label: "Home", href: "/" },
              { label: "Calculators", href: "/calculators" },
              { label: "MTD Checker" },
            ]}
          />
          <h1 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Making Tax Digital (MTD) Checker
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Check whether you must comply with Making Tax Digital for Income Tax, and from which April, based
            on your rental and self-employment income.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="max-w-5xl">
            <MTDCheckerCalculator variant="page" />
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
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

            <div
              id="get-expert-help"
              className="mt-12 scroll-mt-24 border-2 border-emerald-600/20 bg-gradient-to-br from-emerald-50 to-teal-50 p-8 sm:p-10 rounded-2xl"
            >
              <h2 className="text-2xl font-bold text-emerald-700 sm:text-3xl">
                Need to get ready for MTD?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                We set landlords up with compliant digital record-keeping and handle the quarterly
                submissions, so MTD is one less thing to worry about. Tell us about your income for a
                no-obligation chat.
              </p>
              <div className="mt-8">
                <LeadForm redirectOnSuccess={false} submitLabel="Request MTD help" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
