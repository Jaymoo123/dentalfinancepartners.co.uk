import type { Metadata } from "next";
import { Section24Calculator } from "@/components/calculators/Section24Calculator";
import { CalculatorPageResources } from "@/components/resources/CalculatorPageResources";
import { LeadCTAPanel } from "@/components/property/LeadCTAPanel";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildCalculatorJsonLd } from "@/lib/calculator-schema";

export const metadata: Metadata = {
  title: "Section 24 Tax Calculator | Mortgage Interest Relief Impact (UK)",
  description:
    "Free Section 24 calculator for UK landlords. See the extra income tax the mortgage-interest relief restriction costs, from rent, interest and band.",
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
            onDark
            items={[
              { label: "Home", href: "/" },
              { label: "Calculators", href: "/calculators" },
              { label: "Section 24 Calculator" },
            ]}
          />
          <h1 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Section 24 Tax Calculator
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-300">
            See how much extra income tax the Section 24 mortgage-interest restriction costs you, based on
            your rental income, mortgage interest and tax band.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16">
        {/* No inner clamp: `max-w-5xl` left the calculator 64px narrower than
            every other section on the page, so its edges did not line up
            with the heading below it. */}
        <div className={siteContainerLg}>
          <Section24Calculator variant="page" />
          <CalculatorPageResources slug="section-24-calculator" />
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">How Section 24 works</h2>
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
          title="Paying more tax because of Section 24?"
          description="There are legitimate ways to reduce the impact, from how the property is owned to whether incorporation makes sense for your portfolio. Tell us about your situation for a no-obligation review."
          proofPoints={[
            { title: "Property tax only", detail: "Section 24, CGT and MTD every day" },
            { title: "Fixed fees, quoted upfront", detail: "In writing, before any work starts" },
            { title: "24-hour response", detail: "Usually the same working day" },
          ]}
          submitLabel="Request a Section 24 review"
          footnote="No obligation and no hard sell. If your position is already right, we will say so."
          redirectOnSuccess={false}
        />
      </div>

    </>
  );
}
