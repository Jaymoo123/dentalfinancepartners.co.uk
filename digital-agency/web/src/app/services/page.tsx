import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { ServiceTiers } from "@accounting-network/web-shared/components/ServiceTiers";
import { StatsBar } from "@accounting-network/web-shared/components/StatsBar";
import { serviceTiers, siteStats } from "@/config/service-tiers";

export const metadata: Metadata = {
  title: `Accounting Services for Agency Founders | ${siteConfig.name}`,
  description:
    "Specialist accounting and tax services for UK and UAE agency founders. Management accounts, tax planning, incorporation analysis, IR35 and R&D tax credits. Fixed fees, free consultation.",
  alternates: {
    canonical: `${siteConfig.url}/services`,
    languages: {
      "en-GB": `${siteConfig.url}/services`,
      "x-default": `${siteConfig.url}/services`,
    },
  },
  openGraph: {
    title: "Accounting Services for Agency Founders",
    description: "Specialist accounting for UK and UAE agency founders. Tax planning, management accounts, IR35 and R&D credits. Fixed fees.",
    url: `${siteConfig.url}/services`,
    type: "website",
  },
};

const services = [
  {
    icon: "📊",
    title: "Management Accounts",
    description: "Monthly or quarterly reports that show you what is actually happening in your agency, broken down by client, service line and team.",
    features: ["Gross margin by client or project", "Revenue per head tracking", "Cash flow forecast", "Pipeline and forward revenue view"],
  },
  {
    icon: "💷",
    title: "Tax Planning",
    description: "Proactive tax planning throughout the year, not just at year end. We model salary and dividend splits, pension contributions and timing decisions.",
    features: ["Optimal salary and dividend split", "Pension contribution modelling", "Year-end profit extraction", "R&D tax credit assessment"],
  },
  {
    icon: "🏢",
    title: "Incorporation & Structure",
    description: "Sole trader vs limited company, holding companies, alphabet shares and group restructuring modelled with real numbers, not generalisations.",
    features: ["Sole trader vs limited company modelling", "Holding company structures", "Alphabet share design", "Group restructuring"],
  },
  {
    icon: "⚖️",
    title: "IR35 & Contractors",
    description: "Status determination, contractor contracts and compliance review for agencies engaging freelancers and for founders contracting through their own company.",
    features: ["Employment status assessment", "Contract review and guidance", "SDS preparation support", "HMRC investigation defence"],
  },
  {
    icon: "📝",
    title: "Annual Accounts & CT Returns",
    description: "Statutory accounts and corporation tax returns for agency limited companies, filed accurately and on time by agency specialists.",
    features: ["Statutory accounts preparation", "Corporation tax returns", "Directors' personal tax returns", "Companies House filings"],
  },
  {
    icon: "🚀",
    title: "Growth & Exit Planning",
    description: "Financial preparation for acquisition, sale or MBO. We help you build a business that looks attractive to buyers and plan your exit to minimise tax.",
    features: ["EBITDA improvement strategy", "BADR and CGT planning", "Earn-out structure review", "Sale preparation support"],
  },
];

const included = [
  {
    title: "Specialist agency accountants",
    body: "Every client we work with is an agency founder. That exclusive focus means we see agency finance problems every week, not once every few years. The advice is faster, more relevant, and grounded in patterns across agencies like yours.",
  },
  {
    title: "24-hour response guarantee",
    body: "Email or call us with a question. We respond within 24 hours, usually same day. You are never waiting a week for an answer.",
  },
  {
    title: "Fixed fees, no surprises",
    body: "You know exactly what you are paying upfront. No hourly billing, no hidden charges. If your situation changes, we will tell you before any additional fees apply.",
  },
  {
    title: "Agency-only specialists",
    body: "Every client we work with is an agency founder. We understand retainer models, utilisation rates, IR35 and the specific tax decisions that agency founders face.",
  },
  {
    title: "Proactive advice, not just compliance",
    body: "We do not wait to be asked. If your salary and dividend split could be more efficient, we will flag it. If R&D credits apply to your work, we will identify them.",
  },
];

const tiers = [
  {
    name: "Essentials",
    tag: "Sole traders & early-stage agencies",
    features: ["Annual accounts & CT return", "Personal self assessment", "Quarterly check-in call", "Unlimited email support"],
  },
  {
    name: "Growth",
    tag: "Limited company agencies (most popular)",
    featured: true,
    features: ["Everything in Essentials", "Monthly management accounts", "Salary & dividend modelling", "MTD compliance", "R&D credit assessment"],
  },
  {
    name: "Advisory",
    tag: "Growth-stage and exit-focused agencies",
    features: ["Everything in Growth", "Cash flow forecasting", "Exit planning & preparation", "Holding company structuring", "Priority access"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="relative h-[300px] sm:h-[350px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=2000&q=85"
          alt="Agency team working"
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
              Accounting services built for agency founders
            </h1>
            <p className="mt-3 sm:mt-4 text-base sm:text-xl text-white">
              From management accounts to exit planning. Specialist agency support at every stage of your agency.
            </p>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-slate-200 py-8 sm:py-10">
        <div className={siteContainerLg}>
          <StatsBar stats={siteStats} />
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Choose your service tier</h2>
            <p className="mt-4 text-lg text-slate-600">
              Start with essentials, add management accounts as you grow, or get full advisory support as you scale towards exit.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`p-8 border-2 ${tier.featured ? "border-indigo-600 bg-indigo-50" : "border-slate-200 bg-white"}`}
              >
                <h3 className="text-xl font-bold text-slate-900">{tier.name}</h3>
                <p className={`mt-1 text-xs font-semibold uppercase tracking-wider ${tier.featured ? "text-indigo-700" : "text-slate-500"}`}>
                  {tier.tag}
                </p>
                <ul className="mt-6 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-slate-700">
                      <span className={`font-bold flex-shrink-0 text-lg ${tier.featured ? "text-indigo-600" : "text-slate-400"}`}>✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link
                    href="/contact"
                    className={`block text-center py-3 px-6 font-semibold text-sm transition-colors ${
                      tier.featured
                        ? "bg-indigo-600 text-white hover:bg-indigo-700"
                        : "border-2 border-indigo-600 text-indigo-700 hover:bg-indigo-50"
                    }`}
                  >
                    Get a quote
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">What we specialise in</h2>
            <p className="mt-4 text-lg text-slate-600">
              Agency-only focus means we understand salary structures, IR35 and exit multiples inside out.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white border-l-4 border-slate-300 p-8 transition-all hover:border-indigo-600 hover:shadow-md"
              >
                <div className="flex h-16 w-16 items-center justify-center bg-indigo-600 text-3xl mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600">{service.description}</p>
                <ul className="mt-6 space-y-2.5">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                      <span className="text-indigo-600 font-bold flex-shrink-0 text-lg">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service tier cards (shared component) */}
      <section className="bg-white py-12 sm:py-16 border-t border-slate-100">
        <div className={siteContainerLg}>
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              How we work together
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Start with free tools, add compliance as you grow, or get full advisory support as you scale.
            </p>
          </div>
          <ServiceTiers tiers={serviceTiers} />
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-10">What is included with every engagement</h2>
            <div className="space-y-6">
              {included.map((item) => (
                <div key={item.title} className="flex gap-6 border-l-4 border-indigo-600 bg-slate-50 p-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 flex items-center justify-center text-white font-bold text-2xl">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-base text-slate-700 leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20 border-t border-slate-200">
        <div className={siteContainerLg}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <div className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 text-xs font-bold uppercase tracking-wider mb-4">
                Essential reading
              </div>
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                Read the founder&apos;s guides before you decide
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                We have written long-form pillar guides on the topics that matter. Read them before your free call so the conversation moves faster.
              </p>
            </div>
            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { href: "/fundamentals/agency-finance-fundamentals", title: "Agency Finance Fundamentals", body: "Cash flow, P&L, margins, KPIs for agency founders." },
                { href: "/fundamentals/paying-yourself-agency-founder-pillar", title: "Salary, Dividends and Pension", body: "Optimal extraction for limited company directors." },
                { href: "/fundamentals/incorporating-your-agency-pillar", title: "Incorporating Your Agency", body: "Sole trader, limited, holding companies, alphabet shares." },
                { href: "/fundamentals/selling-your-agency-pillar", title: "Selling Your Agency", body: "BADR, MBOs, earn-outs, exit planning." },
              ].map((g) => (
                <Link
                  key={g.href}
                  href={g.href}
                  className="group block bg-slate-50 border border-slate-200 hover:bg-white hover:border-indigo-600 hover:shadow-md transition-all p-5"
                >
                  <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 mb-2">Pillar guide</p>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">{g.title}</h3>
                  <p className="mt-2 text-xs text-slate-600">{g.body}</p>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/fundamentals"
                className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold"
              >
                View all 9 pillar guides
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-indigo-700 to-indigo-900 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start max-w-6xl mx-auto">
            <div className="lg:pt-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-1.5 text-xs font-bold text-white uppercase tracking-wider mb-6">
                Free consultation
              </div>
              <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                Ready to get your agency finances sorted?
              </h2>
              <p className="mt-4 text-lg text-indigo-100 leading-relaxed">
                Book a free call. We will review your current situation and give you clear recommendations. No obligation, no hard sell.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-indigo-100">
                <li className="flex items-start gap-3">
                  <span className="text-white font-bold flex-shrink-0">✓</span>
                  <span>60-minute review with a specialist agency accountant</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white font-bold flex-shrink-0">✓</span>
                  <span>Written summary of recommendations after the call</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white font-bold flex-shrink-0">✓</span>
                  <span>Response within 24 hours, usually same day</span>
                </li>
              </ul>
            </div>

            <div className="bg-white shadow-xl p-6 sm:p-8 lg:p-10 border-t-4 border-indigo-600">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Book your free call</h3>
              <p className="text-sm text-slate-600 mb-6">We will be in touch within 24 hours.</p>
              <LeadForm redirectOnSuccess={false} submitLabel="Book a free call" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
