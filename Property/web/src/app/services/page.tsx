import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BarChart3, Briefcase, Building2, CalendarClock, Check, FileText, Home, Landmark, Network } from "lucide-react";
import { HeroBrickBackdrop } from "@/components/layout/HeroBrickBackdrop";
import { ScrollGlowGroup } from "@/components/property/ScrollGlowGroup";
import { StatsCounter } from "@/components/property/StatsCounter";
import { siteStats } from "@/lib/site-stats";
import { TestimonialsSection } from "@/components/property/TestimonialsSection";
import { LeadCTAPanel } from "@/components/property/LeadCTAPanel";
import { btnPrimary, heroCreamSurface, siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { Eyebrow } from "@/components/ui/page-blocks";

// Ours (0107a8b8 brand-suffix dedupe + c218d7a6 descriptions). Their title
// duplicates the "property accountant" head term that /services/property-accountant
// owns; ours is the deduped one and it is what the monitored rows were baselined on.
export const metadata: Metadata = {
  title: "Property Accounting Services",
  description:
    "The services we offer: accounting and tax for landlords and property investors, incorporation analysis, non-resident landlord returns and free calculators.",
  alternates: {
    canonical: `${siteConfig.url}/services`,
    languages: {
      "en-GB": `${siteConfig.url}/services`,
      "x-default": `${siteConfig.url}/services`,
    },
  },
  openGraph: {
    title: "Property Accounting Services",
    description: "Everything we do, in one place: services for landlords and investors, incorporation analysis, non-resident returns and free calculators.",
    url: `${siteConfig.url}/services`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Property Accounting Services",
    description: "Everything we do, in one place: services for landlords and investors, incorporation analysis, non-resident returns and free calculators.",
  },
};

/**
 * Ours (bbfe0437). The "Where to start" hub, and it is not decoration: these six
 * links are the only sitewide entry point to the four /services/* pages and
 * /incorporation outside the nav dropdown, and four of them are monitored rows.
 * Carve-out 5. The designer never saw this section, so their file simply has no
 * equivalent; the cards below are restyled into their card idiom.
 */
const hub = [
  {
    href: "/services/property-accountant",
    title: "Property accountant",
    description: "Accounts, returns and year-round tax work for people whose income comes from property.",
  },
  {
    href: "/services/landlord-accountant",
    title: "Landlord accountant",
    description: "Rental accounts, Self Assessment and MTD for landlords holding property personally.",
  },
  {
    href: "/services/property-tax-advice",
    title: "Property tax advice",
    description: "One-off advice on a decision: a purchase, a disposal, a restructure or a Section 24 problem.",
  },
  {
    href: "/services/non-resident-landlord",
    title: "Non-resident landlord",
    description: "NRL scheme registration, UK returns and disposals for landlords living outside the UK.",
  },
  {
    href: "/incorporation",
    title: "Incorporation analysis",
    description: "Whether moving your portfolio into a company pays, with the CGT and SDLT costs modelled.",
  },
  {
    href: "/calculators",
    title: "Free calculators",
    description: "Run the numbers yourself first: Section 24, incorporation cost, MTD, yield and more.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ItemList",
      name: "Property accounting services",
      itemListElement: hub.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title,
        url: `${siteConfig.url}${item.href}`,
      })),
    },
  ],
};

const included = [
  {
    title: "24-hour response guarantee",
    body: "Email or call us with a question. We respond within 24 hours, usually same day.",
  },
  {
    title: "Fixed fees, no surprises",
    body: "You know exactly what you're paying upfront. No hourly billing, no hidden charges.",
  },
  {
    title: "Property-only specialists",
    body: "100% of our clients are landlords. We understand Section 24, MTD, and incorporation because we see them every day.",
  },
  {
    title: "Proactive support",
    body: "We flag opportunities before you miss them. If MTD is approaching or incorporation would save you money, we'll tell you.",
  },
];

const services = [
  {
    icon: BarChart3,
    title: "Section 24 Tax Planning",
    description: "Calculate your Section 24 impact and explore ways to reduce the tax hit.",
    features: ["Annual tax saving analysis", "Incorporation vs. personal comparison", "Expense optimisation"],
    calc: { slug: "section-24-calculator", label: "Estimate your Section 24 bill", key: "section24" },
  },
  {
    icon: CalendarClock,
    title: "MTD Compliance",
    description: "Get ready for Making Tax Digital quarterly reporting from April 2026.",
    features: ["MTD threshold check", "Software setup", "Quarterly submissions", "Penalty avoidance"],
    calc: { slug: "mtd-checker", label: "Check if MTD applies to you", key: "mtd" },
  },
  {
    icon: Building2,
    title: "Incorporation Analysis",
    description: "Find out if transferring to a limited company makes financial sense.",
    features: ["CGT and SDLT cost modelling", "Break-even timeline", "Clear recommendation"],
    calc: { slug: "incorporation-cost-calculator", label: "Cost out incorporation", key: "incorporation" },
  },
  {
    icon: Briefcase,
    title: "Portfolio Reporting",
    description: "Property-by-property profitability tracking and yield analysis.",
    features: ["Monthly/quarterly reports", "Property-level P&L", "Yield calculations", "Cash flow forecasts"],
    calc: { slug: "portfolio-profitability-calculator", label: "Test a property's profitability", key: "portfolio" },
  },
  {
    icon: FileText,
    title: "Self Assessment",
    description: "Tax returns for individual landlords with rental income.",
    features: ["Rental schedules", "Expense claims", "Section 24 application", "Payment on account"],
    calc: { slug: "rental-income-tax-calculator", label: "Work out the tax on your rent", key: "rental_income" },
  },
  {
    icon: Landmark,
    title: "Company Accounts",
    description: "Annual accounts and corporation tax for property limited companies.",
    features: ["Statutory accounts", "Corporation tax returns", "Profit extraction advice", "Director loans"],
    calc: { slug: "corporation-tax-calculator", label: "Estimate your Corporation Tax", key: "corp_tax" },
  },
];

/* Client tiers. The prose that used to sit here was a comma list, which reads as
   a sentence rather than as evidence. Naming each workstream on its own line is
   what signals depth: it shows we know the shape of the work at every portfolio
   size. All three tiers are styled identically on purpose: the brand serves
   every portfolio size equally, so singling one out would push the other two
   visitors toward reading themselves as the lesser fit. */
const clientTiers = [
  {
    icon: Home,
    title: "Individual Landlords",
    scale: "1-3 properties",
    summary: "One flat or a small let portfolio, run in your own name alongside a job.",
    handles: [
      "Self Assessment returns",
      "Section 24 planning",
      "MTD compliance",
      "Incorporation feasibility",
    ],
    calc: { slug: "rental-income-tax-calculator", label: "Work out the tax on your rent", key: "individual" },
  },
  {
    icon: Building2,
    title: "Portfolio Owners",
    scale: "4-10 properties",
    summary: "A portfolio big enough that property-by-property numbers start to matter.",
    handles: [
      "Management accounts",
      "Property-level reporting",
      "Limited company accounts",
      "Acquisition support",
    ],
    calc: { slug: "portfolio-profitability-calculator", label: "Test a property's profitability", key: "portfolio" },
  },
  {
    icon: Network,
    title: "Large Portfolios",
    scale: "10+ properties",
    summary: "Multi-company structures where the tax question is usually structural.",
    handles: [
      "Group accounting",
      "Corporation tax planning",
      "Disposal planning",
      "Portfolio restructuring",
    ],
    calc: { slug: "corporation-tax-calculator", label: "Estimate your Corporation Tax", key: "large" },
  },
];

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className={`relative flex items-center py-10 sm:py-12 lg:py-14 min-h-[300px] sm:min-h-[350px] overflow-hidden ${heroCreamSurface}`}>
        <HeroBrickBackdrop tone="cream" />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Services" },
              ]}
            />
            <h1 className="mt-4 sm:mt-6 text-2xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-6xl">
              Property accounting services for UK landlords
            </h1>
            {/* Mirrors the homepage hero subcopy: a "whether you need..." span of
                the three most-searched jobs, then a closer that bridges into the
                CTA. Kept to the services page's wider scope (compliance work as
                well as advisory). */}
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-slate-700">
              Whether you need your Self Assessment filed or your reporting set up for Making Tax Digital,
              a free consultation shows you where the money is leaking and what fixing it costs, all
              within 24 hours.
            </p>
            <Link
              href="#book"
              data-cta="services_hero_book"
              data-cta-placement="hero"
              data-cta-goal="form"
              className={`${btnPrimary} mt-6 w-full sm:mt-8 sm:w-auto`}
            >
              Book free consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Stats strip, same treatment as the homepage: white with a hairline, so it
          reads as a break from the navy hero rather than a section of its own. */}
      <section className="border-b border-slate-200 bg-white py-5 sm:py-7">
        <div className={siteContainerLg}>
          <StatsCounter stats={siteStats} />
        </div>
      </section>


      <section className="bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl mb-12">
            <Eyebrow>Our services</Eyebrow>
            {/* Ours (bbfe0437): "What the work covers", not "What we specialise
                in". Their h2 scale, our wording. */}
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">What the work covers</h2>
            <p className="mt-4 text-lg text-slate-600">
              Property-only focus means we understand Section 24, MTD, and incorporation inside out.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="flex flex-col rounded-xl bg-white p-5 sm:p-6 transition-colors border border-transparent hover:border-emerald-600"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100 mb-3">
                  <service.icon aria-hidden className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">{service.title}</h3>
                <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-600">{service.description}</p>
                <ul className="mt-4 space-y-2 pb-4">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <Check aria-hidden className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" strokeWidth={3} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                {/* One matched calculator per service: it answers the "would this
                    even be worth it for me?" objection at the moment it forms, and
                    the result sits behind ResultGate, so the link captures rather
                    than leaks. Secondary weight on purpose: the hero "Book free
                    consultation" stays the page's single primary CTA.
                    mt-auto pins the row to the card foot so the links line up
                    across a row despite uneven feature-list lengths. */}
                <Link
                  href={`/calculators/${service.calc.slug}`}
                  data-cta={`services_calc_${service.calc.key}`}
                  data-cta-placement="services_grid"
                  className="group mt-auto flex items-center gap-2 border-t border-slate-100 pt-4 text-xs sm:text-sm font-bold text-emerald-700 transition-colors hover:text-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                >
                  {service.calc.label}
                  <ArrowRight
                    aria-hidden
                    className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>What you get</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl mb-10">What&apos;s included</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {included.map((item) => (
                <div key={item.title} className="flex gap-6 rounded-xl bg-slate-50 p-6">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                    <Check aria-hidden className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm sm:text-base text-slate-700 leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>Our clients</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">Who we work with</h2>
            <p className="mt-4 max-w-3xl text-lg text-slate-600 mb-10">
              Every client is a landlord or property investor. The work changes shape as a portfolio
              grows, so here is what we handle at each stage.
            </p>
            <ScrollGlowGroup className="grid gap-6 md:grid-cols-3">
              {clientTiers.map((tier) => (
                <div
                  key={tier.title}
                  className="group flex flex-col rounded-xl border border-emerald-100 bg-white p-8 shadow-[0_6px_20px_-8px_rgba(5,150,105,0.28)] transition duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-[0_16px_32px_-12px_rgba(5,150,105,0.4)] motion-reduce:transform-none motion-reduce:transition-none"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                      <tier.icon aria-hidden className="h-6 w-6" strokeWidth={1.75} />
                    </span>
                    {/* Scale chip: the fastest self-identification cue on the card,
                        so it sits level with the badge rather than buried in prose. */}
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700 ring-1 ring-emerald-200">
                      {tier.scale}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base sm:text-lg font-bold text-slate-900">{tier.title}</h3>
                  <p className="mt-2 text-sm sm:text-base text-slate-700 leading-relaxed">{tier.summary}</p>
                  <ul className="mt-5 space-y-2 pb-6">
                    {tier.handles.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <Check aria-hidden className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" strokeWidth={3} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/calculators/${tier.calc.slug}`}
                    data-cta={`services_client_${tier.calc.key}`}
                    data-cta-placement="services_clients"
                    className="mt-auto flex items-center gap-2 border-t border-slate-100 pt-4 text-xs sm:text-sm font-bold text-emerald-700 transition-colors hover:text-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                  >
                    {tier.calc.label}
                    <ArrowRight
                      aria-hidden
                      className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                    />
                  </Link>
                </div>
              ))}
            </ScrollGlowGroup>
          </div>
        </div>
      </section>

      {/* Proof sits directly after the tier cards: the visitor has just placed
          themselves in a tier, so the quotes land while that self-identification
          is fresh, and the navy band breaks up a long run of light sections. */}
      <TestimonialsSection description="Anonymised feedback from landlords and investors across every portfolio size." />

      {/* Ours, carve-out 5, restyled into their system (Eyebrow, their h2 scale,
          rounded-xl cards, their hover treatment). White ground because the band
          above it is navy and the panel below is a contained card on slate-50, so
          this section is also what keeps two dark fields apart. Cards are slate-50
          so they contrast with the white ground (their rule: a card matching its
          ground vanishes). */}
      <section className="bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl mb-8 sm:mb-12">
            <Eyebrow>Choose a service</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">Where to start</h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600">
              Each page below explains what the work covers, who it suits and how an engagement runs. If you are not
              sure which fits, book a call and we will point you at the right one.
            </p>
          </div>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {hub.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col rounded-xl border border-transparent bg-slate-50 p-5 transition-colors hover:border-emerald-600 sm:p-6"
              >
                <h3 className="text-base font-bold text-slate-900 sm:text-lg">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:mt-3 sm:text-base">{item.description}</p>
                <span className="mt-auto flex items-center gap-2 pt-4 text-sm font-bold text-emerald-700">
                  Read more
                  <ArrowRight
                    aria-hidden
                    className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Page closer. The reader has just been through six services, three
          tiers, and the testimonials, so the job is not to explain again: it is
          to price the next step at zero and take the details there and then.
          The old block sent them to /contact to start over, and its secondary
          button pointed back at this same page. */}
      {/* Anchor for the hero CTA. `scroll-mt` clears the sticky header so the
          panel's heading is not hidden under it on arrival. */}
      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          contained
          title="Find out what your current setup is costing you"
          description="Tell us what you own and how it is held. We will come back within 24 hours with where the money is leaking and a fixed fee in writing if you want us to fix it."
          proofPoints={[
            { title: "Property-only specialists", detail: "We work with landlords and investors, nothing else" },
            { title: "Fixed fees, quoted upfront", detail: "No hourly billing, no surprise invoices" },
            { title: "24-hour response", detail: "Usually the same working day" },
          ]}
          footnote="No obligation and no hard sell. If you are better off staying where you are, we will say so."
        />
      </div>
    </>
  );
}
