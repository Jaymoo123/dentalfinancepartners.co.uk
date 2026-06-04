import type { Metadata } from "next";
import { Section24Calculator } from "@/components/calculators/Section24Calculator";
import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildCalculatorJsonLd } from "@/lib/calculator-schema";

export const metadata: Metadata = {
  title: "Section 24 Tax Calculator | Mortgage Interest Relief Impact (UK)",
  description:
    "Free Section 24 calculator for UK landlords. See how much extra income tax the mortgage-interest relief restriction costs you, from your rent, mortgage interest and tax band. Instant result, 2026/27 rates.",
  alternates: { canonical: `${siteConfig.url}/calculators/section-24-calculator` },
  openGraph: {
    title: "Section 24 Tax Impact Calculator for UK Landlords",
    description: "Work out the extra income tax Section 24 costs you on your buy-to-let mortgage interest.",
    url: `${siteConfig.url}/calculators/section-24-calculator`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Section 24 Tax Impact Calculator",
    description: "Work out the extra income tax Section 24 costs you on your buy-to-let mortgage interest.",
  },
};

export default function Section24CalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildCalculatorJsonLd({
            name: "Section 24 Tax Impact Calculator",
            description:
              "Estimate the extra income tax a landlord pays under the Section 24 mortgage-interest relief restriction, based on rent, mortgage interest and tax band.",
            path: "/calculators/section-24-calculator",
          }),
        }}
      />
      <section className="bg-slate-900 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Calculators", href: "/calculators" },
              { label: "Section 24 Calculator" },
            ]}
          />
          <h1 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Section 24 Tax Calculator
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            See how much extra income tax the Section 24 mortgage-interest restriction costs you, based on
            your rental income, mortgage interest and tax band.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="max-w-5xl">
            <Section24Calculator variant="page" />
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">How Section 24 works</h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
              <p>
                Section 24 of the Finance (No. 2) Act 2015 removed higher-rate relief on residential
                mortgage interest for individual landlords. Since April 2020 you can no longer deduct
                mortgage interest as an expense. Instead, your full rental income is taxed at your marginal
                rate and you receive a <strong>basic-rate (20%) tax credit</strong> on the finance costs.
              </p>
              <p>
                For a <strong>basic-rate</strong> taxpayer the 20% credit matches the 20% rate, so there is
                little or no extra cost. For <strong>higher-rate (40%)</strong> and{" "}
                <strong>additional-rate (45%)</strong> landlords the credit stays at 20% while the income is
                taxed at 40% or 45%, leaving a wedge of 20 or 25 percentage points on the mortgage interest.
                That wedge is the extra tax this calculator estimates.
              </p>
              <p>
                Section 24 applies to individuals (including joint owners), not to companies. A limited
                company deducts mortgage interest in full against its profits, which is one of the main
                reasons landlords weigh up incorporation.
              </p>
              <p>
                From 2027/28, property income in England, Wales and Northern Ireland will be taxed at 22%,
                42% and 47%, and the Section 24 credit rises to the new 22% basic rate. Basic-rate landlords
                still see the credit match the rate (no new wedge); higher and additional-rate landlords get
                a small improvement (20% to 22%), but the finance-cost wedge remains. This calculator uses
                current 2026/27 rates.
              </p>
            </div>

            <div
              id="get-expert-help"
              className="mt-12 scroll-mt-24 border-2 border-emerald-600/20 bg-gradient-to-br from-emerald-50 to-teal-50 p-8 sm:p-10 rounded-2xl"
            >
              <h2 className="text-2xl font-bold text-emerald-700 sm:text-3xl">
                Paying more tax because of Section 24?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                There are legitimate ways to reduce the impact, from how the property is owned to whether
                incorporation makes sense for your portfolio. Tell us about your situation for a
                no-obligation review.
              </p>
              <div className="mt-8">
                <LeadForm redirectOnSuccess={false} submitLabel="Request a Section 24 review" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
