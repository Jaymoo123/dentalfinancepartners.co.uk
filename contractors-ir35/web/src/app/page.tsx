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
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { serviceTiers, siteStats } from "@/config/service-tiers";

export const metadata: Metadata = {
  title: "Specialist Contractor Accountants | IR35 Advice UK",
  description:
    "Specialist accountants for UK contractors. IR35 status reviews, limited company tax, umbrella vs Ltd, expenses and pension planning. Plain English, no jargon.",
  alternates: { canonical: siteConfig.url },
};

const keyStats = [
  { value: "~£2k", label: "Modelled annual saving outside IR35 vs umbrella at £500 a day" },
  { value: "~2M", label: "UK contractors affected by IR35" },
  { value: "6 years", label: "HMRC can investigate past IR35 filings" },
  { value: "45 days", label: "Clients must answer an SDS disagreement" },
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
      "Outside IR35, almost always yes, though the gap is smaller than it is often described. Our own published model puts it at around £1,900 to £2,000 a year at £500 a day over 240 days (£6,000 of company expenses, a £1,200 umbrella margin), and at a few thousand pounds a year across most contractor day rates, before accountancy fees. Inside IR35, the gap narrows but there are still advantages: pension contributions via the PSC, the small salary band, and the option to work on other contracts outside IR35. We model both for every client.",
  },
  {
    question: "How do you work out what a contractor needs?",
    answer:
      "We start with a short discovery call. What you need depends on the complexity of your situation: whether you have other income, payroll, VAT, or international exposure. We set the scope of work out for you after that call, so you know what is covered before anything starts.",
  },
];

/* Eyebrows are hand-rolled from utilities, never `.section-label` or `.eyebrow`:
   both are UNLAYERED rules in globals.css that pin their own colour from
   `var(--accent)` and cannot be overridden by a utility. */
const eyebrowDark =
  "font-mono text-xs font-medium uppercase tracking-[0.1em] text-primary-400";
const eyebrowLight =
  "font-mono text-xs font-medium uppercase tracking-[0.1em] text-primary-700";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(faqs) }}
      />
      {/* HOOK. Hero over a photograph under a dark gradient. The automated
          contrast tool reports a false 1.00 here because it cannot resolve the
          image; measured against real pixels the body copy is 11.74 and the
          accent 7.30. Do not "fix" that false positive. */}
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
          {/* The only narrow measure on this page: hero copy. */}
          <div className="max-w-3xl">
            <div className="hero-reveal">
              <p className={`${eyebrowDark} mb-6`}>
                Specialist contractor accountants
              </p>
              <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                IR35, limited company tax,{" "}
                <span className="text-primary-400">and contractor finances.</span>
              </h1>
            </div>
            <div className="hero-reveal-delay">
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300 sm:text-xl">
                We are specialist accountants for UK contractors and PSC directors. IR35 status reviews, salary and dividend planning, expenses, and pension strategy. We only work with contractors, so we understand the specifics that a generalist accountant will not.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                {/* Primary CTA stays on the page. Only the header CTA and the
                    sticky banner leave for /contact. */}
                <Link
                  href="#book"
                  className={`${btnPrimary} rounded-xl text-base sm:text-lg px-6 py-3 sm:px-10 sm:py-4 text-center`}
                  data-cta="hero_book"
                  data-cta-placement="hero"
                  data-cta-goal="form"
                >
                  Book a free call
                </Link>
                <Link
                  href="/ir35-status"
                  className={`inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 bg-white/10 px-6 py-3 sm:px-10 sm:py-4 text-base sm:text-lg font-medium text-white hover:bg-white/20 transition-colors text-center ${focusRing}`}
                >
                  Understand IR35
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-2.5 text-sm text-neutral-300">
                <ShieldCheck className="h-4 w-4 text-primary-400 flex-shrink-0" aria-hidden />
                <span className="font-medium">Contractor specialists. Plain English. No hard sell.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key stats. primary-700 ground, white 7.27, cyan-100 labels 6.49. */}
      <section className="bg-primary-700 py-8 sm:py-10">
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
      <section className="bg-[#fafaf7] py-10 sm:py-12">
        <div className={siteContainerLg}>
          <p className="max-w-3xl text-lg leading-relaxed text-neutral-700 sm:text-xl">
            IR35 is genuinely complex and the rules changed significantly in April 2021. We help contractors understand their position, structure their affairs correctly, and avoid the tax and penalty risks of getting it wrong.
          </p>
        </div>
      </section>

      {/* PROBLEM. */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <p className={`${eyebrowLight} mb-4`}>What contractors come to us with</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              The financial challenges that are specific to contracting.
            </h2>
          </div>
          <div className="mt-10 sm:mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
            {painPoints.map((item) => (
              <article
                key={item.title}
                className="rounded-xl bg-neutral-50 p-6 ring-1 ring-neutral-200/70 sm:p-8"
              >
                <h3 className="text-xl font-bold text-neutral-900">{item.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-neutral-600">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROOF, part one: composite snapshots. The heading and the disclaimer
          were corrected on 2026-09-12 so neither asserts named real clients.
          Do not restore a "Real outcomes" style heading. */}
      <section className="bg-neutral-50 py-12 sm:py-16 lg:py-20" aria-labelledby="testimonials-heading">
        <div className={siteContainerLg}>
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <p className={`${eyebrowLight} mb-4`}>Composite snapshots</p>
            <h2 id="testimonials-heading" className="text-2xl font-bold text-neutral-900 sm:text-3xl lg:text-4xl">
              The situations contractors bring us
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-600">
              Composite snapshots based on patterns across our contractor clients. Names and figures anonymised. The tax mechanics are real.
            </p>
          </div>
          <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <figure
                key={i}
                className="relative rounded-xl bg-white p-6 ring-1 ring-neutral-200/70 sm:p-7"
              >
                <Quote className="absolute top-4 right-4 h-6 w-6 text-primary-200" aria-hidden />
                <blockquote className="text-base sm:text-lg leading-relaxed text-neutral-800 font-medium pr-8">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 pt-4 border-t border-neutral-200 text-xs sm:text-sm font-semibold text-neutral-600">
                  {t.attribution}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* PROOF, part two: what a specialist actually covers. */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <p className={`${eyebrowLight} mb-4`}>Why specialist matters</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              A generalist accountant handles your compliance.{" "}
              <span className="text-primary-700">We handle contractor-specific tax.</span>
            </h2>
          </div>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            The rules around IR35, off-payroll working, PSC dividends and contractor expenses are specific enough that a generalist accountant, however competent, will miss things. We see these issues every week across a large contractor client base, so we know where the risks and opportunities are.
          </p>
          <div className="mt-12 overflow-x-auto rounded-xl ring-1 ring-neutral-200/70">
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
        <div className="absolute inset-0 bg-primary-800/90" />
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

      {/* SCOPE, part one: the six services. */}
      <section className="bg-[#fafaf7] py-12 sm:py-16 lg:py-20">
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
                  className={`group block rounded-xl bg-white p-6 ring-1 ring-neutral-200/70 transition-colors hover:ring-primary-600/40 sm:p-8 ${focusRing}`}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-600 mb-4 group-hover:bg-primary-700 transition-colors">
                    <Icon className="h-7 w-7 text-white" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 group-hover:text-primary-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.body}</p>
                  <span className="mt-4 flex items-center text-primary-600 font-semibold text-sm">
                    Learn more
                    <ArrowRight aria-hidden className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <Link href="/services" className={`${btnSecondary} rounded-xl`}>
              View all services
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white py-8 sm:py-10">
        <div className={siteContainerLg}>
          <StatsBar stats={siteStats} />
        </div>
      </section>

      {/* SCOPE, part two: who we act for. Every persona keeps its crawlable
          link: this is the most linked page on the site and the link floor is
          binding. */}
      <section className="bg-neutral-900 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <p className={eyebrowDark}>Every contractor type</p>
            <h2 className="mt-3 text-2xl font-bold text-white sm:text-4xl lg:text-5xl">
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
                className={`group block rounded-xl bg-white/5 p-4 ring-1 ring-white/15 transition-colors hover:bg-white/10 hover:ring-primary-400/40 sm:p-5 ${focusRing}`}
              >
                <span className="text-sm font-semibold text-white group-hover:text-primary-400 transition-colors">
                  {type.title}
                </span>
                <ArrowRight aria-hidden className="mt-2 h-4 w-4 text-neutral-400 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
          <div className="mt-5">
            <Link
              href="/for"
              className={`inline-flex items-center gap-2 text-sm font-semibold text-primary-400 hover:text-primary-300 transition-colors ${focusRing}`}
            >
              See all contractor types
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SCOPE, part three: the tiers. */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <h2 className="mb-8 text-center text-2xl font-bold text-neutral-900 sm:text-3xl lg:text-4xl">
            How we can help
          </h2>
          <ServiceTiers tiers={serviceTiers} featuredBadge="Most common" />
        </div>
      </section>

      {/* FAQ. Native <details>, deliberately NOT the kit's FaqSection: that
          component keeps closed answers out of the server HTML while the
          JSON-LD below still asserts them. Banned here by written decision. */}
      <section className="bg-neutral-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 text-center mb-8 sm:mb-12 sm:text-4xl">
            Common questions
          </h2>
          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl bg-white ring-1 ring-neutral-200/70"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 font-semibold text-neutral-900 hover:text-primary-700 transition-colors list-none">
                  <span>{faq.question}</span>
                  <span
                    className="flex-shrink-0 text-primary-600 transition-transform group-open:rotate-45"
                    aria-hidden
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-neutral-600 leading-relaxed border-t border-neutral-200 pt-4">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Guides */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="text-center max-w-3xl mx-auto">
            <p className={`${eyebrowLight} mb-4`}>Contractor guides</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl lg:text-4xl">
              Practical IR35 and contractor tax guides.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
              Plain English articles on IR35 status, off-payroll rules, limited company tax, expenses, dividends and pension planning. Written by specialist contractor accountants, not content agencies.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/blog" className={`${btnPrimary} rounded-xl`}>
                Browse all guides
              </Link>
              <Link
                href="/calculators"
                className={`inline-flex items-center gap-2 text-primary-700 hover:text-primary-800 font-semibold text-sm sm:text-base transition-colors ${focusRing}`}
              >
                Free contractor calculators
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ASK. Closing panel, `contained` so no dark band touches the dark
          footer; `ground="slate"` alternates against the white section above.
          `proofPoints` intentionally EMPTY: Property's own call site passes a
          fee claim and a turnaround promise, both banned on this site. */}
      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          contained
          ground="slate"
          eyebrow="Free call"
          title="Get your contractor finances properly sorted"
          description="Book a free call. We will talk through your IR35 position, your current structure and whether there are things worth changing. No hard sell, no obligation."
          proofPoints={[]}
          formTitle="Book your free call"
          form={<LeadForm submitLabel="Request a callback" />}
          footnote={
            /* KNOWN CONTRACT: PanelBody renders `footnote` inside a <p>, so a
               <div> here is a block in a paragraph and a hydration mismatch.
               Span only. */
            <span>
              Contractor specialists only, so a specialist picks your enquiry up rather than a call-centre queue. Scope is agreed up front, and every conversation is confidential. If you would rather write to us first, use the{" "}
              <Link
                href="/contact"
                className="font-semibold text-primary-700 underline hover:text-primary-800"
              >
                contact form
              </Link>
              .
            </span>
          }
        />
      </div>
    </>
  );
}
