import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { LeadForm } from "@/components/forms/LeadForm";
import {
  btnPrimary,
  btnSecondary,
  focusRing,
  siteContainerLg,
} from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildFaqJsonLd } from "@/lib/schema";
import {
  ArrowRight,
  ShieldCheck,
  Quote,
  Calculator,
  FileCheck,
  Building2,
  Banknote,
  PiggyBank,
  Receipt,
} from "lucide-react";
import { contractorTypes } from "@/data/contractor-types";
import { ServiceTiers } from "@accounting-network/web-shared/components/ServiceTiers";
import { StatsBar } from "@accounting-network/web-shared/components/StatsBar";
import { serviceTiers, siteStats } from "@/config/service-tiers";

export const metadata: Metadata = {
  title: "Specialist Contractor Accountants | IR35 Advice UK",
  description:
    "Specialist accountants for UK contractors. IR35 status reviews, limited company tax, umbrella vs Ltd, expenses and pension planning. Fixed fees, plain English.",
  alternates: { canonical: siteConfig.url },
};

const keyStats = [
  { value: "£10k+", label: "Typical annual saving outside IR35 vs umbrella" },
  { value: "~2M", label: "UK contractors affected by IR35" },
  { value: "6 years", label: "HMRC can investigate past IR35 filings" },
  { value: "24h", label: "Our response guarantee" },
];

const testimonials = [
  {
    quote:
      "We reviewed the contract before renewal. Three working practice changes and the IR35 position shifted. Saved us over £14,000 that tax year.",
    attribution: "IT contractor, financial services sector (outside IR35 post-review)",
  },
  {
    quote:
      "I had been on umbrella for two years unnecessarily. Once we modelled it properly, moving to a PSC saved around £8,000 in year one.",
    attribution: "Engineering consultant, mid-contract switch to limited company",
  },
  {
    quote:
      "Pension contributions from the PSC. I had no idea how tax-efficient it was. Set up in month one, and it will save us tens of thousands over the next few years.",
    attribution: "IT contractor, first year as PSC director",
  },
];

const painPoints = [
  {
    title: "IR35 uncertainty",
    body: "Your end client issued an SDS that says inside IR35. Or your agency told you the contract is outside. Or you just do not know. Getting this wrong costs you thousands in extra tax and penalties. We review your contract and actual working practices, not just the paperwork.",
  },
  {
    title: "Limited company vs umbrella",
    body: "Umbrella is simpler. A PSC is usually more tax-efficient outside IR35. Inside IR35, the gap closes significantly. Most contractors who call us have never had anyone sit down and model both scenarios for their actual day rate and expenses. We do that.",
  },
  {
    title: "Director pay and dividends",
    body: "The optimal salary/dividend split changes every year as rates and allowances shift. Taking too high a salary wastes NI. Taking too low a salary costs you state pension entitlement. Getting it right is a planning exercise, not a guess.",
  },
  {
    title: "Expenses going unclaimed",
    body: "The 24-month rule on travel, home office costs, equipment, training and professional subscriptions. Most contractors we speak to are leaving something on the table, either through overcaution or because their accountant does not specialise in contracting.",
  },
];

const servicesOverview = [
  {
    title: "IR35 status review",
    body: "We review your contract and working practices against the three key tests: control, substitution and mutuality of obligation. We tell you where you stand and what, if anything, changes.",
    href: "/services",
    Icon: FileCheck,
  },
  {
    title: "Limited company tax",
    body: "Annual accounts, corporation tax, confirmation statement, Companies House filings, self assessment for you as a director. Clean, on time, no surprises.",
    href: "/services",
    Icon: Building2,
  },
  {
    title: "Salary and dividend planning",
    body: "We model the optimal director pay structure for your circumstances each tax year, accounting for your other income, pension contributions and the current rates.",
    href: "/services",
    Icon: Banknote,
  },
  {
    title: "Umbrella vs limited company",
    body: "An honest comparison based on your day rate, expenses and IR35 position. We show you the numbers for both, not a sales pitch for one.",
    href: "/services",
    Icon: Calculator,
  },
  {
    title: "Expenses and allowances",
    body: "Travel, home office, equipment, training, subscriptions. We make sure everything you are entitled to claim is claimed, and nothing that is not is included.",
    href: "/services",
    Icon: Receipt,
  },
  {
    title: "Contractor pension",
    body: "Employer contributions from your PSC are one of the most tax-efficient tools available to a contractor. We build this into your planning from day one.",
    href: "/services",
    Icon: PiggyBank,
  },
];

const comparisonRows = [
  { area: "IR35 status review", detail: "Per contract, against actual working practices" },
  { area: "Off-payroll rules (April 2021)", detail: "Understood for private and public sector" },
  { area: "Corporation tax bands", detail: "19% / marginal / 25% (modelled for your PSC)" },
  { area: "Salary and dividend split", detail: "Optimised each tax year" },
  { area: "Travel expenses (24-month rule)", detail: "Applied correctly, not guessed" },
  { area: "Pension via PSC", detail: "Employer contributions built into planning" },
  { area: "CEST and SDS advice", detail: "Explained plainly, not just the tool output" },
];

const faqs = [
  {
    question: "Do I need a specialist contractor accountant?",
    answer:
      "Not strictly. But a generalist accountant will rarely know the nuances of contracting: IR35 status testing, off-payroll working rules, PSC dividend planning, the 24-month travel rule, or how to use your limited company to make pension contributions. A specialist saves you money and helps you avoid the risks that a generalist misses.",
  },
  {
    question: "How do I know if I'm inside or outside IR35?",
    answer:
      "The three key tests are control (does the client direct how you do the work?), substitution (could you send someone else?), and mutuality of obligation (is there an expectation of continued work?). HMRC's CEST tool gives a result but is not definitive. We review your actual contract and working practices and give you a reasoned opinion.",
  },
  {
    question: "Is it still worth running through a limited company?",
    answer:
      "Outside IR35, almost always yes. The tax savings versus umbrella are significant, typically £5,000–£15,000 a year depending on day rate. Inside IR35, the gap narrows but there are still advantages: pension contributions via the PSC, the small salary band, and the option to work on other contracts outside IR35. We model both for every client.",
  },
  {
    question: "What are your fees?",
    answer:
      "We work on fixed monthly fees so you always know what you're paying. The exact figure depends on the complexity of your situation: whether you have other income, payroll, VAT, or international exposure. We quote after a short discovery call rather than publishing a price list that won't apply to most clients.",
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(faqs) }}
      />
      {/* Hero */}
      <section className="relative flex items-center min-h-[520px] sm:min-h-[640px] lg:min-h-[720px] overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/7433839/pexels-photo-7433839.jpeg?auto=compress&cs=tinysrgb&w=2000&q=85"
          alt="Financial documents and calculator on a professional's desk"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/97 via-neutral-950/90 to-neutral-900/60" />
        <div className={`${siteContainerLg} relative z-10 py-16 sm:py-20 w-full`}>
          <div className="max-w-3xl">
            <div className="hero-reveal">
              <div className="section-label mb-6">
                Specialist contractor accountants
              </div>
              <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                IR35, limited company tax,{" "}
                <span className="text-cyan-400">and contractor finances.</span>
              </h1>
            </div>
            <div className="hero-reveal-delay">
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300 sm:text-xl">
                We are specialist accountants for UK contractors and PSC directors. IR35 status reviews, salary and dividend planning, expenses, and pension strategy. We only work with contractors, so we understand the specifics that a generalist accountant will not.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <Link href="/contact" className={`${btnPrimary} text-base sm:text-lg px-6 py-3 sm:px-10 sm:py-4 text-center`}>
                  Book a free call
                </Link>
                <Link
                  href="/ir35-status"
                  className={`inline-flex min-h-12 items-center justify-center border border-white/30 bg-white/10 px-6 py-3 sm:px-10 sm:py-4 text-base sm:text-lg font-medium text-white hover:bg-white/20 transition-colors text-center ${focusRing}`}
                >
                  Understand IR35
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-2.5 text-sm text-neutral-400">
                <ShieldCheck className="h-4 w-4 text-cyan-400 flex-shrink-0" aria-hidden />
                <span className="font-medium">Fixed fees. Plain English. No hard sell.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats bar */}
      <section className="bg-cyan-800 py-8 sm:py-10">
        <div className={siteContainerLg}>
          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
            {keyStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-mono">{stat.value}</div>
                <div className="mt-1.5 text-xs sm:text-sm font-semibold text-cyan-100 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro strip */}
      <section className="border-b border-neutral-200 bg-[#fafaf7] py-10 sm:py-12">
        <div className={siteContainerLg}>
          <p className="max-w-3xl text-lg leading-relaxed text-neutral-700 sm:text-xl">
            IR35 is genuinely complex and the rules changed significantly in April 2021. We help contractors understand their position, structure their affairs correctly, and avoid the tax and penalty risks of getting it wrong.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-neutral-50 py-12 sm:py-16 lg:py-20" aria-labelledby="testimonials-heading">
        <div className={siteContainerLg}>
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="section-label mb-4">Real outcomes</div>
            <h2 id="testimonials-heading" className="text-2xl font-bold text-neutral-900 sm:text-3xl lg:text-4xl">
              What we have done for contractors
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-600">
              Composite snapshots based on patterns across our contractor clients. Names and figures anonymised. The tax mechanics are real.
            </p>
          </div>
          <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <figure
                key={i}
                className="relative bg-white border border-neutral-200 p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow"
              >
                <Quote className="absolute top-4 right-4 h-6 w-6 text-cyan-200" aria-hidden />
                <blockquote className="text-base sm:text-lg leading-relaxed text-neutral-800 font-medium pr-8">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 pt-4 border-t border-neutral-100 text-xs sm:text-sm font-semibold text-neutral-500">
                  {t.attribution}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section className="border-b border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="section-label mb-4">What contractors come to us with</div>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            The financial challenges that are specific to contracting.
          </h2>
          <div className="mt-10 sm:mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
            {painPoints.map((item) => (
              <article
                key={item.title}
                className="border border-neutral-200 border-l-4 border-l-cyan-700 bg-neutral-50 p-6 sm:p-8"
              >
                <h3 className="text-xl font-bold text-neutral-900">{item.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-neutral-600">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="border-b border-neutral-200 bg-[#fafaf7] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 sm:text-4xl lg:text-5xl">
              What we do for contractors
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-neutral-600">
              We focus exclusively on contractors and PSC directors. That means our advice is grounded in how contracting works, not how a generic small business does.
            </p>
          </div>
          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {servicesOverview.map((item) => {
              const Icon = item.Icon;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`group block border border-neutral-200 bg-white p-6 sm:p-8 transition-all hover:border-cyan-700 hover:shadow-md ${focusRing}`}
                >
                  <div className="flex h-14 w-14 items-center justify-center bg-cyan-700 mb-4 group-hover:bg-cyan-800 transition-colors">
                    <Icon className="h-7 w-7 text-white" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 group-hover:text-cyan-800 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.body}</p>
                  <div className="mt-4 flex items-center text-cyan-700 font-semibold text-sm">
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <Link href="/services" className={btnSecondary}>
              View all services
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-neutral-200 bg-[#fafaf7] py-8 sm:py-10">
        <div className={siteContainerLg}>
          <StatsBar stats={siteStats} />
        </div>
      </section>

      {/* Contractor types */}
      <section className="bg-neutral-900 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <div className="inline-block bg-cyan-700 px-3 py-1.5 text-xs font-bold text-white uppercase tracking-wider mb-4">
              Every contractor type
            </div>
            <h2 className="text-2xl font-bold text-white sm:text-4xl lg:text-5xl">
              We work with all types of UK contractors
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-neutral-300">
              IR35 works differently across sectors. We know the specific working patterns and risk factors in each.
            </p>
          </div>
          <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {contractorTypes.map((type) => (
              <Link
                key={type.slug}
                href={`/for/${type.slug}`}
                className="group block bg-white/5 border border-white/10 p-4 sm:p-5 transition-all hover:bg-cyan-700/20 hover:border-cyan-400/40"
              >
                <span className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                  {type.title}
                </span>
                <ArrowRight className="mt-2 h-4 w-4 text-neutral-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
          <div className="mt-5">
            <Link
              href="/for"
              className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              See all contractor types
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Specialist comparison table */}
      <section className="border-b border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="section-label mb-4">Why specialist matters</div>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            A generalist accountant handles your compliance.{" "}
            <span className="text-cyan-800">We handle contractor-specific tax.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            The rules around IR35, off-payroll working, PSC dividends and contractor expenses are specific enough that a generalist accountant, however competent, will miss things. We see these issues every week across a large contractor client base, so we know where the risks and opportunities are.
          </p>
          <div className="mt-12 overflow-x-auto border border-neutral-200">
            <table className="w-full min-w-[28rem] text-left text-sm sm:text-base">
              <caption className="sr-only">How {siteConfig.name} handles typical contractor accounting areas</caption>
              <thead>
                <tr className="bg-neutral-900 text-white">
                  <th scope="col" className="px-4 py-3 font-bold text-sm uppercase tracking-wider sm:px-6 sm:py-4">
                    Area
                  </th>
                  <th scope="col" className="px-4 py-3 font-bold text-sm uppercase tracking-wider sm:px-6 sm:py-4">
                    Our approach
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={row.area}
                    className={`border-b border-neutral-200 last:border-0 ${i % 2 === 1 ? "bg-neutral-50" : "bg-white"}`}
                  >
                    <th scope="row" className="px-4 py-3.5 font-semibold text-neutral-900 sm:px-6 sm:py-4">
                      {row.area}
                    </th>
                    <td className="px-4 py-3.5 text-neutral-600 sm:px-6 sm:py-4">{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Mid-page editorial break */}
      <section className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/7433853/pexels-photo-7433853.jpeg?auto=compress&cs=tinysrgb&w=2000&q=85"
          alt="Professional accountants in a client consultation"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-cyan-900/82" />
        <div className={`${siteContainerLg} relative z-10 h-full flex items-center`}>
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-white sm:text-4xl">
              Your accountant should understand how contracting works
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-cyan-100">
              IR35 rules, PSC dividends, the 24-month travel rule, off-payroll working. We see these issues every week, so we know where the risks and opportunities are.
            </p>
          </div>
        </div>
      </section>

      {/* Service tiers */}
      <section className="border-b border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <h2 className="mb-8 text-center text-2xl font-bold text-neutral-900 sm:text-3xl lg:text-4xl">
            How we can help
          </h2>
          <ServiceTiers tiers={serviceTiers} featuredBadge="Most common" />
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative overflow-hidden bg-neutral-900">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/30 via-neutral-900/0 to-neutral-900/0 pointer-events-none" />
        <div className={`${siteContainerLg} relative z-10 py-12 sm:py-20 lg:py-24`}>
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div className="section-label mb-6">Get started</div>
              <h2 className="text-2xl font-bold text-white sm:text-4xl lg:text-5xl">
                Get your contractor finances properly sorted
              </h2>
              <p className="mt-4 sm:mt-6 text-lg sm:text-xl leading-relaxed text-neutral-200">
                Book a free call. We will talk through your IR35 position, your current structure and whether there are things worth changing. No hard sell, no obligation.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { title: "Contractor specialists only", sub: "We do not work with generalist clients" },
                  { title: "24-hour response time", sub: "Usually the same day" },
                  { title: "Fixed fees, no surprises", sub: "Quoted before we start" },
                  { title: "All conversations are confidential", sub: "We never discuss one client's affairs with another" },
                ].map((item) => (
                  <div key={item.title} className="flex items-center gap-4 text-neutral-200">
                    <div className="h-12 w-12 flex items-center justify-center bg-cyan-700 text-white font-bold text-xl flex-shrink-0">
                      ✓
                    </div>
                    <div>
                      <div className="font-bold text-white">{item.title}</div>
                      <div className="text-sm text-neutral-400">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-6 sm:p-8 lg:p-10">
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-4 sm:mb-6">Book your free call</h3>
              <LeadForm submitLabel="Request a callback" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-neutral-900 text-center mb-8 sm:mb-12 sm:text-4xl">
              Common questions
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group border border-neutral-200 bg-white"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 font-semibold text-neutral-900 hover:text-cyan-800 transition-colors list-none">
                    <span>{faq.question}</span>
                    <span
                      className="flex-shrink-0 text-cyan-700 transition-transform group-open:rotate-45"
                      aria-hidden
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-neutral-600 leading-relaxed border-t border-neutral-100 pt-4">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog CTA */}
      <section className="border-t border-neutral-200 bg-[#fafaf7] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="text-center max-w-3xl mx-auto">
            <div className="section-label mb-4">Contractor guides</div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              Practical IR35 and contractor tax guides.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
              Plain English articles on IR35 status, off-payroll rules, limited company tax, expenses, dividends and pension planning. Written by specialist contractor accountants, not content agencies.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/blog" className={btnPrimary}>
                Browse all guides
              </Link>
              <Link
                href="/ir35-status"
                className="inline-flex items-center gap-2 text-cyan-800 hover:text-cyan-900 font-semibold text-sm sm:text-base transition-colors"
              >
                IR35 status explained
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
