import type { Metadata } from "next";
import Image from "next/image";
import { CTASection } from "@/components/ui/CTASection";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { ServiceTiers } from "@/components/property/ServiceTiers";

export const metadata: Metadata = {
  title: "Property Accountant Services UK | Specialist Tax Advice for Landlords",
  description:
    "Specialist property accountant for UK landlords and investors. Section 24 planning, MTD compliance, incorporation analysis, portfolio reporting. Fixed fees, free consultation.",
  alternates: {
    canonical: `${siteConfig.url}/services`,
    languages: {
      "en-GB": `${siteConfig.url}/services`,
      "x-default": `${siteConfig.url}/services`,
    },
  },
  openGraph: {
    title: "Property Accountant Services UK | Specialist Tax Advice for Landlords",
    description: "Specialist property accountant for UK landlords. Section 24, MTD, incorporation. Fixed fees, free consultation.",
    url: `${siteConfig.url}/services`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Property Accountant Services UK | Tax Advice for Landlords",
    description: "Specialist property accountant for UK landlords. Section 24, MTD, incorporation. Fixed fees, free consultation.",
  },
};

const services = [
  {
    icon: "📊",
    title: "Section 24 Tax Planning",
    description: "Calculate your Section 24 impact and explore ways to reduce the tax hit.",
    features: ["Annual tax saving analysis", "Incorporation vs. personal comparison", "Expense optimisation"],
  },
  {
    icon: "📅",
    title: "MTD Compliance",
    description: "Get ready for Making Tax Digital quarterly reporting from April 2026.",
    features: ["MTD threshold check", "Software setup", "Quarterly submissions", "Penalty avoidance"],
  },
  {
    icon: "🏢",
    title: "Incorporation Analysis",
    description: "Find out if transferring to a limited company makes financial sense.",
    features: ["CGT and SDLT cost modeling", "Break-even timeline", "Clear recommendation"],
  },
  {
    icon: "💼",
    title: "Portfolio Reporting",
    description: "Property-by-property profitability tracking and yield analysis.",
    features: ["Monthly/quarterly reports", "Property-level P&L", "Yield calculations", "Cash flow forecasts"],
  },
  {
    icon: "📝",
    title: "Self Assessment",
    description: "Tax returns for individual landlords with rental income.",
    features: ["Rental schedules", "Expense claims", "Section 24 application", "Payment on account"],
  },
  {
    icon: "🏛️",
    title: "Company Accounts",
    description: "Annual accounts and corporation tax for property limited companies.",
    features: ["Statutory accounts", "Corporation tax returns", "Profit extraction advice", "Director loans"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="relative h-[300px] sm:h-[350px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=2000&q=85"
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
                { label: "Services" },
              ]}
            />
            <h1 className="mt-4 sm:mt-6 text-2xl font-bold leading-tight text-white sm:text-4xl lg:text-6xl">
              Property accounting services for UK landlords
            </h1>
            <p className="mt-3 sm:mt-4 text-base sm:text-xl text-white">
              From free calculators to full-service accounting. Choose your level of support.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">Choose your service tier</h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600">
              Start with free tools, upgrade to expert review, or let us handle everything. No long-term contracts.
            </p>
          </div>
          <div className="mt-8 sm:mt-10">
            <ServiceTiers />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">What we specialise in</h2>
            <p className="mt-4 text-lg text-slate-600">
              Property-only focus means we understand Section 24, MTD, and incorporation inside out.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white border-l-4 border-slate-300 p-8 transition-all hover:border-emerald-600 hover:shadow-md"
              >
                <div className="flex h-16 w-16 items-center justify-center bg-emerald-600 text-3xl mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600">{service.description}</p>
                <ul className="mt-6 space-y-2.5">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                      <span className="text-emerald-600 font-bold flex-shrink-0 text-lg">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-10">What&apos;s included</h2>
            <div className="space-y-6">
              <div className="flex gap-6 border-l-4 border-emerald-600 bg-slate-50 p-6">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-600 flex items-center justify-center text-white font-bold text-2xl">
                  ✓
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">24-hour response guarantee</h3>
                  <p className="mt-2 text-base text-slate-700 leading-relaxed">
                    Email or call us with a question. We respond within 24 hours, usually same day.
                  </p>
                </div>
              </div>
              <div className="flex gap-6 border-l-4 border-emerald-600 bg-slate-50 p-6">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-600 flex items-center justify-center text-white font-bold text-2xl">
                  ✓
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Fixed fees, no surprises</h3>
                  <p className="mt-2 text-base text-slate-700 leading-relaxed">
                    You know exactly what you&apos;re paying upfront. No hourly billing, no hidden charges.
                  </p>
                </div>
              </div>
              <div className="flex gap-6 border-l-4 border-emerald-600 bg-slate-50 p-6">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-600 flex items-center justify-center text-white font-bold text-2xl">
                  ✓
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Property-only specialists</h3>
                  <p className="mt-2 text-base text-slate-700 leading-relaxed">
                    100% of our clients are landlords. We understand Section 24, MTD, and incorporation because we see
                    them every day.
                  </p>
                </div>
              </div>
              <div className="flex gap-6 border-l-4 border-emerald-600 bg-slate-50 p-6">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-600 flex items-center justify-center text-white font-bold text-2xl">
                  ✓
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Proactive support</h3>
                  <p className="mt-2 text-base text-slate-700 leading-relaxed">
                    We flag opportunities before you miss them. If MTD is approaching or incorporation would save you
                    money, we&apos;ll tell you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-10">Who we work with</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="bg-white border-2 border-slate-200 p-8">
                <h3 className="text-xl font-bold text-slate-900">Individual Landlords</h3>
                <p className="mt-2 text-sm font-bold text-emerald-700 uppercase tracking-wider">1-3 properties</p>
                <p className="mt-4 text-base text-slate-700 leading-relaxed">
                  Self Assessment, Section 24 planning, MTD compliance, and incorporation feasibility.
                </p>
              </div>
              <div className="bg-emerald-50 border-2 border-emerald-600 p-8">
                <h3 className="text-xl font-bold text-slate-900">Portfolio Owners</h3>
                <p className="mt-2 text-sm font-bold text-emerald-700 uppercase tracking-wider">4-10 properties</p>
                <p className="mt-4 text-base text-slate-700 leading-relaxed">
                  Management accounts, property-level reporting, limited company accounts, and acquisition support.
                </p>
              </div>
              <div className="bg-white border-2 border-slate-200 p-8">
                <h3 className="text-xl font-bold text-slate-900">Large Portfolios</h3>
                <p className="mt-2 text-sm font-bold text-emerald-700 uppercase tracking-wider">10+ properties</p>
                <p className="mt-4 text-base text-slate-700 leading-relaxed">
                  Group accounting, corporation tax planning, disposal planning, and portfolio restructuring.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Get your property tax sorted"
        description="Book a free consultation to discuss your situation. We'll give you clear recommendations, no hard sell."
      />
    </>
  );
}
