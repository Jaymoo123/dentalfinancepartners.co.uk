import type { Metadata } from "next";
import Link from "next/link";
import { Calculator } from "lucide-react";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { AgencyValuationCalculator } from "@/components/calculators/AgencyValuationCalculator";

export const metadata: Metadata = {
  title: "Agency Valuation Calculator | What is My Agency Worth?",
  description:
    "Free agency valuation calculator for UK founders. EBITDA × multiple model with retainer, concentration and key-person adjustments. Built by ICAEW accountants.",
  alternates: { canonical: `${siteConfig.url}/calculators/agency-valuation` },
};

export default function AgencyValuationPage() {
  return (
    <>
      <section className="bg-slate-900 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <Breadcrumb
            variant="light"
            items={[
              { label: "Home", href: "/" },
              { label: "Calculators", href: "/calculators" },
              { label: "Agency Valuation" },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white uppercase tracking-wider mb-4">
              <Calculator className="h-3.5 w-3.5" />
              Free calculator · UK market multiples
            </div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              What is your agency worth?
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              EBITDA × multiple model with adjustments for agency positioning, retainer revenue, client concentration and founder dependency. Directional only.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <AgencyValuationCalculator />

            <div className="mt-12 bg-slate-900 p-8 sm:p-10 text-white">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">Planning an actual exit?</h2>
              <p className="mt-3 text-base sm:text-lg text-slate-200">
                Sale-ready agencies are built years in advance. We help founders structure the business, model exit scenarios, and prepare for due diligence.
              </p>
              <Link href="/free-health-check" className="mt-6 inline-block bg-indigo-600 px-8 py-3 font-bold text-white border-b-4 border-indigo-800 hover:bg-indigo-700 transition-all">
                Book an exit-planning call
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
