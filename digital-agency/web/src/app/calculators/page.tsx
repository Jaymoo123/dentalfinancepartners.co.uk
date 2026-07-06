/**
 * Calculators gallery page.
 *
 * TL-01: derives entirely from allTools() — no hand-listed arrays.
 * SEO-01: adding a new tool to the registry automatically surfaces it here
 * and in the sitemap.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, ArrowRight } from "lucide-react";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { allTools } from "@/lib/tools/registry";

export const metadata: Metadata = {
  title: `Free Calculators for Agency Founders | ${siteConfig.name}`,
  description:
    "Free tax and finance calculators for UK agency founders. Salary vs dividend, R&D credits, agency valuation, BADR CGT and more. 2025/26 rates. No sign-up.",
  alternates: { canonical: `${siteConfig.url}/calculators` },
  openGraph: {
    title: "Free Calculators for Agency Founders",
    description: "Free tax and finance calculators for UK agency founders. Salary vs dividend, take-home and more.",
    url: `${siteConfig.url}/calculators`,
    type: "website",
  },
};

export default function CalculatorsIndexPage() {
  const tools = allTools();

  return (
    <>
      <section className="bg-slate-900 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Breadcrumb
            variant="light"
            items={[
              { label: "Home", href: "/" },
              { label: "Calculators" },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white uppercase tracking-wider mb-4">
              <Calculator className="h-3.5 w-3.5" />
              Free tools
            </div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Free calculators for agency founders
            </h1>
            <p className="mt-4 text-lg text-slate-300 leading-relaxed">
              Practical UK tax and finance calculators built for agency founders. Uses current UK rates and thresholds. No sign-up.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-6xl mx-auto grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((t) => (
              <Link
                key={t.slug}
                href={`/calculators/${t.slug}`}
                data-cta={`calculator-gallery-${t.slug}`}
                className="group block bg-slate-50 border border-slate-200 p-6 sm:p-8 hover:bg-white hover:border-indigo-600 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-center h-12 w-12 bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-sm">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
                <h2 className="mt-5 text-xl font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                  {t.name}
                </h2>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{t.oneLiner}</p>
                <div className="mt-5 flex items-center text-indigo-600 font-semibold text-sm">
                  Open calculator
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
