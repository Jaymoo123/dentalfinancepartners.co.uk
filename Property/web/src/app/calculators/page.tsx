import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Section24Calculator } from "@/components/calculators/Section24Calculator";
import { IncorporationCostCalculator } from "@/components/calculators/IncorporationCostCalculator";
import { MTDCheckerCalculator } from "@/components/calculators/MTDCheckerCalculator";
import { PortfolioProfitabilityCalculator } from "@/components/calculators/PortfolioProfitabilityCalculator";
import { siteContainerLg, btnPrimary } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Free Property Tax Calculators | Section 24, Incorporation, MTD & Yield",
  description:
    "4 free calculators for UK landlords: Section 24 tax impact, incorporation cost & break-even, MTD checker, portfolio profitability. Current 2026/27 tax rates. Instant results.",
  alternates: { canonical: `${siteConfig.url}/calculators` },
  openGraph: {
    title: "Free Property Tax Calculators for UK Landlords",
    description: "Calculate Section 24 impact, incorporation costs, MTD compliance, and rental yield. 2026/27 rates.",
    url: `${siteConfig.url}/calculators`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Property Tax Calculators for UK Landlords",
    description: "Calculate Section 24 impact, incorporation costs, MTD compliance, and rental yield. 2026/27 rates.",
  },
};

export default function CalculatorsPage() {
  return (
    <>
      <section className="relative h-[300px] sm:h-[350px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1554995207-c18c203602cb?w=2000&q=85"
          alt="UK property"
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-slate-900/85" />
        <div className={`${siteContainerLg} relative z-10 h-full flex items-center`}>
          <div className="max-w-3xl">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Calculators" },
              ]}
            />
            <h1 className="mt-6 text-2xl font-bold leading-tight text-white sm:text-4xl lg:text-6xl">
              Property tax calculators for UK landlords
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-xl leading-relaxed text-white">
              Free calculators built by specialist property accountants. Work out your Section 24 tax impact,
              incorporation costs, MTD compliance requirements, and rental yield.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="space-y-12 sm:space-y-16">
            <div id="section24">
              <Section24Calculator />
            </div>

            <div id="incorporation">
              <IncorporationCostCalculator />
            </div>

            <div id="mtd">
              <MTDCheckerCalculator />
            </div>

            <div id="portfolio">
              <PortfolioProfitabilityCalculator />
            </div>
          </div>

          <div className="mt-12 sm:mt-16 bg-slate-900 p-6 sm:p-10 text-center text-white">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Need help interpreting your results?
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg leading-relaxed text-slate-200 max-w-3xl mx-auto">
              These calculators provide simplified estimates. For a full analysis of your specific situation —
              including incorporation feasibility, MTD preparation, or portfolio profitability reporting — speak to one
              of our property accountants.
            </p>
            <div className="mt-6 sm:mt-8">
              <Link href="/contact" className={`${btnPrimary} bg-emerald-600 border-emerald-800 text-base sm:text-lg px-6 py-3 sm:px-10 sm:py-4`}>
                Book free consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
