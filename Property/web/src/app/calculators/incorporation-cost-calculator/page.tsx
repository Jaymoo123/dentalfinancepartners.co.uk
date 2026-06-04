import type { Metadata } from "next";
import { IncorporationCostCalculator } from "@/components/calculators/IncorporationCostCalculator";
import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildCalculatorJsonLd } from "@/lib/calculator-schema";

export const metadata: Metadata = {
  title: "Incorporation Cost Calculator | CGT, SDLT & Break-Even (Landlords)",
  description:
    "Free calculator for landlords weighing up a limited company. Estimate the upfront cost (Capital Gains Tax + Stamp Duty) of incorporating your property and the break-even timeline against the annual tax saving.",
  alternates: { canonical: `${siteConfig.url}/calculators/incorporation-cost-calculator` },
  openGraph: {
    title: "Property Incorporation Cost & Break-Even Calculator",
    description: "Estimate the CGT and SDLT cost of moving your rental into a limited company, and when it pays back.",
    url: `${siteConfig.url}/calculators/incorporation-cost-calculator`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Property Incorporation Cost & Break-Even Calculator",
    description: "Estimate the CGT and SDLT cost of moving your rental into a limited company, and when it pays back.",
  },
};

export default function IncorporationCostCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildCalculatorJsonLd({
            name: "Property Incorporation Cost Calculator",
            description:
              "Estimate the upfront Capital Gains Tax and Stamp Duty Land Tax of incorporating a rental property, the annual tax saving, and the break-even timeline.",
            path: "/calculators/incorporation-cost-calculator",
          }),
        }}
      />
      <section className="bg-slate-900 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Calculators", href: "/calculators" },
              { label: "Incorporation Cost Calculator" },
            ]}
          />
          <h1 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Incorporation Cost Calculator
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Estimate the upfront cost of moving a rental property into a limited company (Capital Gains Tax
            plus Stamp Duty) and how long it takes the annual tax saving to pay that back.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="max-w-5xl">
            <IncorporationCostCalculator variant="page" />
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              What incorporating a property actually costs
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
              <p>
                Moving a personally-held rental into a limited company is a sale to the company at market
                value. That triggers two upfront taxes: <strong>Capital Gains Tax</strong> on the gain (18%
                within the basic-rate band and 24% above, for residential property) and{" "}
                <strong>Stamp Duty Land Tax</strong>, because the company is acquiring an additional
                dwelling, so the 5% surcharge applies on top of the standard SDLT bands.
              </p>
              <p>
                Against those costs, a company deducts mortgage interest in full (Section 24 does not apply
                to companies) and pays Corporation Tax (19% on profits up to £50,000, rising toward 25%)
                rather than income tax. The annual tax saving versus personal ownership is what eventually
                repays the upfront cost. This calculator estimates that break-even point.
              </p>
              <p>
                Two reliefs can reduce the upfront cost for the right landlords:{" "}
                <strong>incorporation relief</strong> (TCGA 1992 s.162) can defer the CGT where a genuine
                property business is transferred as a going concern, and <strong>partnership SDLT relief</strong>{" "}
                (FA 2003 Sch 15) can reduce the SDLT where a genuine, pre-existing letting partnership
                incorporates. Both are tightly conditioned and HMRC scrutinises them closely.
              </p>
              <p>
                This is a directional estimate. The SDLT figure here uses the headline surcharge; your actual
                SDLT depends on the full banded rates, and reliefs such as s.162 and Sch 15 can change the
                picture entirely. We model your exact position before you commit.
              </p>
            </div>

            <div
              id="get-expert-help"
              className="mt-12 scroll-mt-24 border-2 border-emerald-600/20 bg-gradient-to-br from-emerald-50 to-teal-50 p-8 sm:p-10 rounded-2xl"
            >
              <h2 className="text-2xl font-bold text-emerald-700 sm:text-3xl">
                Thinking about a limited company?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Incorporation is rarely a yes/no answer. We run the full feasibility (CGT, SDLT, reliefs,
                ongoing tax and mortgage impact) so you know whether it pays for your portfolio. Tell us
                about your properties for a no-obligation review.
              </p>
              <div className="mt-8">
                <LeadForm redirectOnSuccess={false} submitLabel="Request an incorporation review" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
