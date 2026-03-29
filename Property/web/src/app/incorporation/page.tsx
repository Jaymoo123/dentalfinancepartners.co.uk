import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { IncorporationCostCalculator } from "@/components/calculators/IncorporationCostCalculator";
import { CTASection } from "@/components/ui/CTASection";
import { btnPrimary, btnSecondary, siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Should I Incorporate My Buy-to-Let? | CGT & SDLT Cost Analysis",
  description:
    "Incorporation feasibility for UK landlords: Calculate CGT + SDLT upfront costs vs. annual tax savings. Break-even modeling. When it makes sense, when it doesn't.",
  alternates: { canonical: `${siteConfig.url}/incorporation` },
  openGraph: {
    title: "Buy-to-Let Incorporation Planning | Cost vs. Savings Analysis",
    description: "Full feasibility modeling: CGT, SDLT costs vs. long-term tax savings. For UK landlords only.",
    url: `${siteConfig.url}/incorporation`,
    type: "website",
  },
};

const whenItMakesSense = [
  {
    title: "You're a higher-rate taxpayer",
    body: "Section 24 hits hardest at 40% and 45%. If your rental profit (after expenses but before mortgage interest) pushes you into higher-rate territory, incorporation can reduce your effective tax rate significantly.",
  },
  {
    title: "You have significant mortgage interest",
    body: "The more mortgage interest you pay, the bigger the Section 24 impact. If mortgage interest represents 40%+ of your rental income, incorporation may be worth the upfront cost.",
  },
  {
    title: "You're holding long-term",
    body: "Incorporation has high upfront costs (CGT + SDLT). If you plan to hold the properties for 10+ years, you have time to recover those costs through annual tax savings. Short-term holds rarely justify incorporation.",
  },
  {
    title: "You're building a portfolio",
    body: "If you're acquiring new properties, buying them in a limited company from the start avoids the CGT/SDLT hit on transfer. Existing properties can stay personal, new ones go into the company.",
  },
];

const whenItDoesNot = [
  {
    title: "Low mortgage levels",
    body: "If you own properties outright or have small mortgages, Section 24 doesn't hurt much. The upfront cost of incorporation (CGT + SDLT) may never be recovered.",
  },
  {
    title: "Planning to sell soon",
    body: "If you're selling within 5 years, the upfront incorporation costs likely exceed any tax savings. Better to stay personal and pay the Section 24 tax.",
  },
  {
    title: "You're a basic-rate taxpayer",
    body: "Section 24 has minimal impact at 20%. Corporation tax (19%) + dividend tax may not save you much, and the upfront costs are the same regardless of tax bracket.",
  },
  {
    title: "You need to extract all profit",
    body: "If you rely on rental income to live, extracting profit as dividends triggers personal tax. The company structure only saves tax if you can leave profit in the company.",
  },
];

const processSteps = [
  {
    n: "01",
    title: "Initial feasibility call",
    body: "We discuss your portfolio, income, tax position, and plans. This is a short conversation to understand whether incorporation is even worth modeling.",
  },
  {
    n: "02",
    title: "Full financial modeling",
    body: "We calculate upfront costs (CGT + SDLT), annual tax savings, break-even timeline, and cash flow impact. You get a written report with clear recommendations.",
  },
  {
    n: "03",
    title: "Decision and implementation",
    body: "If you decide to proceed, we coordinate with your solicitor, set up the company, handle the property transfer, and ensure all filings are correct. If you decide not to proceed, that's fine — you have the analysis for future reference.",
  },
];

export default function IncorporationPage() {
  return (
    <>
      <section className="relative h-[320px] sm:h-[380px] lg:h-[400px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=2000&q=85"
          alt="UK residential property"
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-slate-900/85" />
        <div className={`${siteContainerLg} relative z-10 h-full flex items-center`}>
          <div className="max-w-3xl">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Incorporation" },
              ]}
            />
            <h1 className="mt-4 sm:mt-6 text-2xl font-bold leading-tight text-white sm:text-4xl lg:text-6xl">
              Should you incorporate your buy-to-let portfolio?
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl leading-relaxed text-white">
              Transferring rental property into a limited company can save significant tax — but it triggers Capital
              Gains Tax and Stamp Duty on the same day.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Link href="/contact" className={`${btnPrimary} bg-emerald-600 border-emerald-800 text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-3.5 text-center`}>
                Book incorporation analysis
              </Link>
              <Link href="#calculator" className={`${btnSecondary} bg-white/10 border-white text-white hover:bg-white/20 text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-3.5 text-center`}>
                Try calculator
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">When incorporation makes sense</h2>
            <div className="mt-8 sm:mt-10 space-y-5 sm:space-y-6">
              {whenItMakesSense.map((item, idx) => (
                <div key={item.title} className="border-l-4 border-emerald-600 bg-slate-50 p-6 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed text-slate-700">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">When it doesn't make sense</h2>
            <div className="mt-8 sm:mt-10 space-y-5 sm:space-y-6">
              {whenItDoesNot.map((item, idx) => (
                <div key={item.title} className="border-l-4 border-slate-300 bg-white p-6 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed text-slate-700">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="calculator" className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <div className="inline-block bg-emerald-600 px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-bold text-white uppercase tracking-wider mb-3 sm:mb-4">
              Free tool
            </div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
              Calculate your incorporation costs
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600">
              Get a quick estimate of upfront costs (CGT + SDLT) and break-even timeline.
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <IncorporationCostCalculator />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl mb-8 sm:mb-10">Our incorporation process</h2>
            <div className="space-y-6 sm:space-y-8">
              {processSteps.map((step) => (
                <div key={step.n} className="flex gap-4 sm:gap-6 bg-white border-l-4 border-emerald-600 p-6 sm:p-8">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 sm:h-16 sm:w-16 bg-slate-900 flex items-center justify-center text-xl sm:text-2xl font-bold text-white font-mono">
                      {step.n}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-xl font-bold text-slate-900">{step.title}</h3>
                    <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed text-slate-700">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-900 p-6 sm:p-10 text-white">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">What you get</h2>
              <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base text-slate-200">
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="text-emerald-400 font-bold flex-shrink-0 text-xl sm:text-2xl">✓</span>
                  <span>Full CGT and SDLT cost calculation based on your actual property values and purchase prices</span>
                </li>
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="text-emerald-400 font-bold flex-shrink-0 text-xl sm:text-2xl">✓</span>
                  <span>Annual tax saving comparison: personal vs. company structure</span>
                </li>
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="text-emerald-400 font-bold flex-shrink-0 text-xl sm:text-2xl">✓</span>
                  <span>Break-even timeline showing when you recover the upfront costs</span>
                </li>
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="text-emerald-400 font-bold flex-shrink-0 text-xl sm:text-2xl">✓</span>
                  <span>Clear recommendation: incorporate now, wait, or don't incorporate at all</span>
                </li>
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="text-emerald-400 font-bold flex-shrink-0 text-xl sm:text-2xl">✓</span>
                  <span>Written report you can share with your solicitor or mortgage broker</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Get your incorporation feasibility analysis"
        description="Book a free consultation. We'll discuss your portfolio and give you a clear recommendation."
        primaryLabel="Book free consultation"
      />
    </>
  );
}
