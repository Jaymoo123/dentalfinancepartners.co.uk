import type { Metadata } from "next";
import { IncorporationCostCalculator } from "@/components/calculators/IncorporationCostCalculator";
import { CalculatorPageResources } from "@/components/resources/CalculatorPageResources";
import { LeadCTAPanel } from "@/components/property/LeadCTAPanel";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildCalculatorJsonLd } from "@/lib/calculator-schema";

export const metadata: Metadata = {
  title: "Incorporation Cost Calculator | CGT, SDLT & Break-Even (Landlords)",
  description:
    "Free calculator for landlords weighing up a limited company: the upfront cost (CGT + Stamp Duty) of incorporating and the break-even vs annual tax saving.",
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
            onDark
            items={[
              { label: "Home", href: "/" },
              { label: "Calculators", href: "/calculators" },
              { label: "Incorporation Cost Calculator" },
            ]}
          />
          <h1 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Incorporation Cost Calculator
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-300">
            Estimate the upfront cost of moving a rental property into a limited company (Capital Gains Tax
            plus Stamp Duty) and how long it takes the annual tax saving to pay that back.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16">
        {/* No inner clamp: `max-w-5xl` left the calculator 64px narrower than
            every other section on the page, so its edges did not line up
            with the heading below it. */}
        <div className={siteContainerLg}>
          <IncorporationCostCalculator variant="page" />
          <CalculatorPageResources slug="incorporation-cost-calculator" />
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
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
          title="Thinking about a limited company?"
          description="Incorporation is rarely a yes/no answer. We run the full feasibility (CGT, SDLT, reliefs, ongoing tax and mortgage impact) so you know whether it pays for your portfolio. Tell us about your properties for a no-obligation review."
          proofPoints={[
            { title: "Property tax only", detail: "Section 24, CGT and MTD every day" },
            { title: "Fixed fees, quoted upfront", detail: "In writing, before any work starts" },
            { title: "24-hour response", detail: "Usually the same working day" },
          ]}
          submitLabel="Request an incorporation review"
          footnote="No obligation and no hard sell. If your position is already right, we will say so."
          redirectOnSuccess={false}
        />
      </div>

    </>
  );
}
