import type { Metadata } from "next";
import { PortfolioProfitabilityCalculator } from "@/components/calculators/PortfolioProfitabilityCalculator";
import { CalculatorPageResources } from "@/components/resources/CalculatorPageResources";
import { LeadCTAPanel } from "@/components/property/LeadCTAPanel";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildCalculatorJsonLd } from "@/lib/calculator-schema";

export const metadata: Metadata = {
  title: "Portfolio Profitability Calculator | Rental Yield & Net Profit (UK)",
  description:
    "Free rental portfolio calculator for UK landlords. Work out net profit, gross yield and net yield across every property. Add as many as you like.",
  alternates: { canonical: `${siteConfig.url}/calculators/portfolio-profitability-calculator` },
  openGraph: {
    title: "Rental Portfolio Profitability & Yield Calculator",
    description: "Net profit and yield across your whole property portfolio, property by property.",
    url: `${siteConfig.url}/calculators/portfolio-profitability-calculator`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rental Portfolio Profitability & Yield Calculator",
    description: "Net profit and yield across your whole property portfolio, property by property.",
  },
};

export default function PortfolioProfitabilityCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildCalculatorJsonLd({
            name: "Portfolio Profitability Calculator",
            description:
              "Work out net profit, gross yield and net yield for each property in a UK rental portfolio.",
            path: "/calculators/portfolio-profitability-calculator",
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
              { label: "Portfolio Profitability Calculator" },
            ]}
          />
          <h1 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Portfolio Profitability Calculator
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-300">
            Work out net profit and yield for every property in your portfolio, then see the totals across
            the whole portfolio.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16">
        {/* No inner clamp: `max-w-5xl` left the calculator 64px narrower than
            every other section on the page, so its edges did not line up
            with the heading below it. */}
        <div className={siteContainerLg}>
          <PortfolioProfitabilityCalculator variant="page" />
          <CalculatorPageResources slug="portfolio-profitability-calculator" />
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
            Reading your portfolio numbers
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
            <p>
              This tool models the profitability of each property: net profit (rent less mortgage interest
              and other expenses) and gross and net yield. Yields here use a £250,000 value per property as
              a baseline; your real yield uses each property&apos;s actual value or purchase price.
            </p>
            <p>
              Net profit before tax is only half the picture. Because of Section 24, most individual
              landlords are taxed on rent before deducting mortgage interest, so your after-tax return can
              be materially lower than the net profit shown here, especially for higher-rate taxpayers with
              large mortgages. Use the Section 24 calculator alongside this to see the tax impact.
            </p>
            <p>
              A portfolio view also surfaces the weaker properties (low or negative net yield) that are
              worth reviewing, whether for refinancing, restructuring, or sale.
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
          title="Want a proper look at your portfolio?"
          description="We produce full portfolio profitability reporting, factoring in tax, ownership structure and financing, so you can see the true return on each property. Tell us about your portfolio for a no-obligation review."
          proofPoints={[
            { title: "Property tax only", detail: "Section 24, CGT and MTD every day" },
            { title: "Fixed fees, quoted upfront", detail: "In writing, before any work starts" },
            { title: "24-hour response", detail: "Usually the same working day" },
          ]}
          submitLabel="Request a portfolio review"
          footnote="No obligation and no hard sell. If your position is already right, we will say so."
          redirectOnSuccess={false}
        />
      </div>

    </>
  );
}
