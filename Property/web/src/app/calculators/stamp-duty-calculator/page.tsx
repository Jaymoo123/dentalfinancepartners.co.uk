import type { Metadata } from "next";
import { StampDutyCalculator } from "@/components/calculators/StampDutyCalculator";
import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildCalculatorJsonLd } from "@/lib/calculator-schema";

export const metadata: Metadata = {
  title: "Stamp Duty Calculator | SDLT incl. Buy-to-Let Surcharge (England & NI)",
  description:
    "Free SDLT stamp duty calculator for England & Northern Ireland. Includes the 5% additional-dwelling surcharge for buy-to-lets and second homes, first-time-buyer relief, and the 2% non-resident surcharge. Instant result.",
  alternates: { canonical: `${siteConfig.url}/calculators/stamp-duty-calculator` },
  openGraph: {
    title: "Stamp Duty (SDLT) Calculator for UK Property",
    description: "Work out your stamp duty, including the buy-to-let and second-home surcharge.",
    url: `${siteConfig.url}/calculators/stamp-duty-calculator`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stamp Duty (SDLT) Calculator",
    description: "Work out your stamp duty, including the buy-to-let and second-home surcharge.",
  },
};

export default function StampDutyCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildCalculatorJsonLd({
            name: "Stamp Duty (SDLT) Calculator",
            description:
              "Work out Stamp Duty Land Tax on a property purchase in England and Northern Ireland, including the 5% additional-dwelling surcharge, first-time-buyer relief and the 2% non-resident surcharge.",
            path: "/calculators/stamp-duty-calculator",
          }),
        }}
      />
      <section className="bg-slate-900 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Calculators", href: "/calculators" },
              { label: "Stamp Duty Calculator" },
            ]}
          />
          <h1 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Stamp Duty (SDLT) Calculator
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Work out the Stamp Duty Land Tax on a property purchase in England &amp; Northern Ireland,
            including the 5% surcharge on buy-to-lets and second homes.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="max-w-5xl">
            <StampDutyCalculator variant="page" />
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              How stamp duty works on a buy-to-let or second home
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
              <p>
                Stamp Duty Land Tax (SDLT) is charged on property purchases in England and Northern Ireland.
                The standard residential rates are 0% up to £125,000, 2% on the portion from £125,001 to £250,000,
                5% from £250,001 to £925,000, 10% from £925,001 to £1.5 million, and 12% above £1.5 million — each
                rate applies only to the slice of the price within that band.
              </p>
              <p>
                If you are buying an <strong>additional residential property</strong> — a buy-to-let or a second
                home — a <strong>5% surcharge</strong> applies on top of every band (raised from 3% on 31 October
                2024). On a £350,000 buy-to-let that surcharge alone adds £17,500.
              </p>
              <p>
                <strong>First-time buyers</strong> pay nothing on the first £300,000 and 5% on the portion from
                £300,000 to £500,000, with no relief once the price exceeds £500,000. <strong>Non-UK residents</strong>{" "}
                pay a further 2% surcharge.
              </p>
              <p>
                Scotland and Wales have their own taxes (LBTT and LTT) with different rates and thresholds, so this
                calculator covers England and Northern Ireland only. The figure is an estimate — reliefs and edge cases
                (mixed-use, six-or-more dwellings, uninhabitable property) can change it.
              </p>
            </div>

            <div
              id="get-expert-help"
              className="mt-12 scroll-mt-24 border-2 border-emerald-600/20 bg-gradient-to-br from-emerald-50 to-teal-50 p-8 sm:p-10 rounded-2xl"
            >
              <h2 className="text-2xl font-bold text-emerald-700 sm:text-3xl">
                Buying a property? Get the tax right from the start.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Stamp duty is only the first tax decision. We help landlords and investors structure purchases
                tax-efficiently — checking surcharge-refund routes, weighing incorporation, and planning the ongoing
                tax on the property. Tell us about your purchase for a no-obligation review.
              </p>
              <div className="mt-8">
                <LeadForm redirectOnSuccess={false} submitLabel="Request a property tax review" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
