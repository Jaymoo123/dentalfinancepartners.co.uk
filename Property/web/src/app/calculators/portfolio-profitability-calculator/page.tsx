import type { Metadata } from "next";
import { PortfolioProfitabilityCalculator } from "@/components/calculators/PortfolioProfitabilityCalculator";
import { CalculatorPageResources } from "@/components/resources/CalculatorPageResources";
import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildCalculatorJsonLd } from "@/lib/calculator-schema";

export const metadata: Metadata = {
  title: "Portfolio Profitability Calculator | Rental Yield & Net Profit (UK)",
  description:
    "Free rental portfolio calculator for UK landlords. Work out net profit, gross yield and net yield across every property in your portfolio. Add as many properties as you like.",
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
            items={[
              { label: "Home", href: "/" },
              { label: "Calculators", href: "/calculators" },
              { label: "Portfolio Profitability Calculator" },
            ]}
          />
          <h1 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Portfolio Profitability Calculator
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Work out net profit and yield for every property in your portfolio, then see the totals across
            the whole portfolio.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="max-w-5xl">
            <PortfolioProfitabilityCalculator variant="page" />
            <CalculatorPageResources slug="portfolio-profitability-calculator" pageTitle="Portfolio Profitability Calculator" />
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
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

            <div
              id="get-expert-help"
              className="mt-12 scroll-mt-24 border-2 border-emerald-600/20 bg-gradient-to-br from-emerald-50 to-teal-50 p-8 sm:p-10 rounded-2xl"
            >
              <h2 className="text-2xl font-bold text-emerald-700 sm:text-3xl">
                Want a proper look at your portfolio?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                We produce full portfolio profitability reporting, factoring in tax, ownership structure and
                financing, so you can see the true return on each property. Tell us about your portfolio for a
                no-obligation review.
              </p>
              <div className="mt-8">
                <LeadForm redirectOnSuccess={false} submitLabel="Request a portfolio review" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
