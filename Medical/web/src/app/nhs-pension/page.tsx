import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { NHSPensionCalculator } from "@/components/calculators/NHSPensionCalculator";
import { CTASection } from "@/components/ui/CTASection";
import { btnPrimary, btnSecondary, siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "NHS Pension Annual Allowance Planning | Tapered Allowance Calculator",
  description:
    "NHS pension annual allowance planning for GPs and consultants. Calculate your tapered allowance, avoid unexpected tax charges, and optimize pension contributions. Expert medical accountants.",
  alternates: { canonical: `${siteConfig.url}/nhs-pension` },
  openGraph: {
    title: "NHS Pension Planning | Annual Allowance & Tax Charge Calculator",
    description: "Calculate tapered annual allowance and tax charges. Specialist NHS pension advice for UK doctors.",
    url: `${siteConfig.url}/nhs-pension`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NHS Pension Planning | Annual Allowance & Tax Charge Calculator",
    description: "Calculate tapered annual allowance and tax charges. Specialist NHS pension advice for UK doctors.",
  },
};

const whenYouNeedHelp = [
  {
    title: "You're a higher earner (£200k+ income)",
    body: "If your threshold income exceeds £200k and adjusted income exceeds £260k, your annual allowance tapers down from £60k to as low as £10k. This catches many consultants and GP partners by surprise, triggering unexpected tax charges.",
  },
  {
    title: "You have significant pension growth",
    body: "NHS pension growth can be substantial, especially for consultants with private practice or GP partners with high profit shares. Growth above your annual allowance is taxed at your marginal rate (40% or 45%).",
  },
  {
    title: "You're considering reducing NHS commitments",
    body: "Reducing NHS sessions or opting out of the pension scheme has complex implications for your annual allowance, carry forward, and long-term retirement income. These decisions need specialist modeling.",
  },
  {
    title: "You've received an annual allowance charge",
    body: "If you've already been hit with a charge, you need to understand why it happened and how to prevent it recurring. Scheme Pays elections and contribution planning require specialist knowledge.",
  },
];

const commonMistakes = [
  {
    title: "Ignoring pension growth until the statement arrives",
    body: "By the time you see your annual pension statement, it's too late to adjust. Proactive monitoring throughout the year allows you to manage your pensionable income and avoid charges.",
  },
  {
    title: "Not using carry forward allowance",
    body: "You can carry forward unused allowance from the previous 3 years. Many doctors miss this opportunity to offset current year excess growth, resulting in unnecessary tax charges.",
  },
  {
    title: "Misunderstanding threshold vs adjusted income",
    body: "The tapering calculation uses two different income measures. Getting this wrong means you can't accurately predict your allowance or plan contributions effectively.",
  },
  {
    title: "Failing to coordinate with private practice income",
    body: "Private practice income affects both your threshold income and your ability to make pension contributions. Without coordination, you can trigger tapering unexpectedly or waste contribution capacity.",
  },
];

const processSteps = [
  {
    n: "01",
    title: "Annual allowance review",
    body: "We review your current income, pension growth projections, and calculate your expected annual allowance for the tax year. This identifies potential issues before they become tax charges.",
  },
  {
    n: "02",
    title: "Contribution optimization",
    body: "We model different scenarios: reducing pensionable income, making additional voluntary contributions, or using carry forward. You get clear recommendations on the most tax-efficient approach for your situation.",
  },
  {
    n: "03",
    title: "Ongoing monitoring",
    body: "NHS pension rules change, and your income varies. We provide quarterly reviews to ensure you stay within your allowance and adjust strategy as needed throughout the year.",
  },
];

export default function NHSPensionPage() {
  return (
    <>
      <section className="relative h-[320px] sm:h-[380px] lg:h-[400px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=2000&q=85"
          alt="Medical professionals in NHS hospital"
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-[var(--navy)]/85" />
        <div className={`${siteContainerLg} relative z-10 h-full flex items-center`}>
          <div className="max-w-3xl">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "NHS Pension" },
              ]}
            />
            <h1 className="mt-4 sm:mt-6 text-2xl font-bold leading-tight text-white sm:text-4xl lg:text-6xl">
              NHS Pension Annual Allowance Planning
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl leading-relaxed text-white">
              Avoid unexpected tax charges on NHS pension growth. Expert planning for GPs and consultants navigating annual allowance and tapered allowance rules.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Link href="/contact" className={`${btnPrimary} bg-[var(--copper)] border-[var(--copper-strong)] text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-3.5 text-center`}>
                Book pension planning review
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
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">When you need specialist NHS pension advice</h2>
            <div className="mt-8 sm:mt-10 space-y-5 sm:space-y-6">
              {whenYouNeedHelp.map((item) => (
                <div key={item.title} className="border-l-4 border-[var(--navy)] bg-slate-50 p-6 sm:p-8">
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
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">Common NHS pension mistakes</h2>
            <div className="mt-8 sm:mt-10 space-y-5 sm:space-y-6">
              {commonMistakes.map((item) => (
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
            <div className="inline-block bg-[var(--navy)] px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-bold text-white uppercase tracking-wider mb-3 sm:mb-4">
              Free tool
            </div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
              Calculate your annual allowance
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600">
              Check if you're affected by tapered allowance and estimate potential tax charges.
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <NHSPensionCalculator />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl mb-8 sm:mb-10">Our NHS pension planning process</h2>
            <div className="space-y-6 sm:space-y-8">
              {processSteps.map((step) => (
                <div key={step.n} className="flex gap-4 sm:gap-6 bg-white border-l-4 border-[var(--navy)] p-6 sm:p-8">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 sm:h-16 sm:w-16 bg-[var(--navy)] flex items-center justify-center text-xl sm:text-2xl font-bold text-white font-mono">
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
            <div className="bg-[var(--navy)] p-6 sm:p-10 text-white">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">What you get</h2>
              <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base text-slate-200">
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="text-[var(--copper)] font-bold flex-shrink-0 text-xl sm:text-2xl">✓</span>
                  <span>Full annual allowance calculation including threshold income and adjusted income analysis</span>
                </li>
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="text-[var(--copper)] font-bold flex-shrink-0 text-xl sm:text-2xl">✓</span>
                  <span>Tapered allowance modeling for high earners with private practice income</span>
                </li>
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="text-[var(--copper)] font-bold flex-shrink-0 text-xl sm:text-2xl">✓</span>
                  <span>Carry forward analysis to utilize unused allowance from previous years</span>
                </li>
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="text-[var(--copper)] font-bold flex-shrink-0 text-xl sm:text-2xl">✓</span>
                  <span>Scheme Pays vs self-payment comparison if you have an annual allowance charge</span>
                </li>
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="text-[var(--copper)] font-bold flex-shrink-0 text-xl sm:text-2xl">✓</span>
                  <span>Written report with clear recommendations for managing your pension contributions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Get your NHS pension review"
        description="Book a free consultation. We'll review your pension position and give you clear guidance on managing annual allowance."
        primaryLabel="Book free consultation"
      />
    </>
  );
}
