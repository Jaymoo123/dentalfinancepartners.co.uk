import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/forms/LeadForm";
import { btnPrimary, btnSecondary, focusRing, sectionY, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Specialist Contractor Accountants | IR35 Advice UK",
  description:
    "Specialist accountants for UK contractors. IR35 status reviews, limited company tax, umbrella vs Ltd comparisons, expenses and pension planning. Fixed fees, plain English.",
  alternates: { canonical: siteConfig.url },
};

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
  },
  {
    title: "Limited company tax",
    body: "Annual accounts, corporation tax, confirmation statement, Companies House filings, self assessment for you as a director. Clean, on time, no surprises.",
    href: "/services",
  },
  {
    title: "Salary and dividend planning",
    body: "We model the optimal director pay structure for your circumstances each tax year, accounting for your other income, pension contributions and the current rates.",
    href: "/services",
  },
  {
    title: "Umbrella vs limited company",
    body: "An honest comparison based on your day rate, expenses and IR35 position. We show you the numbers for both, not a sales pitch for one.",
    href: "/services",
  },
  {
    title: "Expenses and allowances",
    body: "Travel, home office, equipment, training, subscriptions. We make sure everything you are entitled to claim is claimed, and nothing that is not is included.",
    href: "/services",
  },
  {
    title: "Contractor pension",
    body: "Employer contributions from your PSC are one of the most tax-efficient tools available to a contractor. We build this into your planning from day one.",
    href: "/services",
  },
];

const comparisonRows = [
  { area: "IR35 status review", detail: "Per contract, against actual working practices" },
  { area: "Off-payroll rules (April 2021)", detail: "Understood for private and public sector" },
  { area: "Corporation tax bands", detail: "19% / marginal / 25% — modelled for your PSC" },
  { area: "Salary and dividend split", detail: "Optimised each tax year" },
  { area: "Travel expenses (24-month rule)", detail: "Applied correctly, not guessed" },
  { area: "Pension via PSC", detail: "Employer contributions built into planning" },
  { area: "CEST and SDS advice", detail: "Explained plainly, not just the tool output" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-neutral-200 bg-neutral-900 text-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <p className="eyebrow text-teal-400">Specialist contractor accountants</p>
          <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
            IR35, limited company tax,
            <br className="hidden sm:block" /> and contractor finances.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300 sm:text-xl">
            We are specialist accountants for UK contractors and PSC directors. IR35 status reviews, salary and dividend planning, expenses, and pension strategy. We only work with contractors, so we understand the specifics that a generalist accountant will not.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/contact" className={btnPrimary}>
              Book a free call
            </Link>
            <Link
              href="/blog"
              className={`inline-flex min-h-12 items-center text-sm font-medium text-white/80 underline underline-offset-4 decoration-teal-400 hover:text-white transition-colors ${focusRing} rounded`}
            >
              Read our IR35 guides
            </Link>
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

      {/* Pain points */}
      <section className="border-b border-neutral-200 bg-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <p className="eyebrow">What contractors come to us with</p>
          <h2 className="mt-6 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
            The financial challenges that are specific to contracting.
          </h2>
          <div className="mt-14 grid gap-8 md:grid-cols-2 md:gap-10">
            {painPoints.map((item) => (
              <article key={item.title} className="border border-neutral-200 p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-neutral-900">{item.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-neutral-600">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="border-b border-neutral-200 bg-[#fafaf7]">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <p className="eyebrow">What we do</p>
          <h2 className="mt-6 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Specialist services for UK contractors.
          </h2>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 md:gap-10">
            {servicesOverview.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={`group block border border-neutral-200 bg-white p-6 transition-colors hover:border-teal-600 ${focusRing}`}
              >
                <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-teal-700">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.body}</p>
                <p className="mt-4 text-sm font-medium text-teal-600">Learn more &rarr;</p>
              </Link>
            ))}
          </div>
          <p className="mt-10">
            <Link
              href="/services"
              className={`inline-flex min-h-11 items-center text-sm font-medium text-neutral-900 underline decoration-teal-600 decoration-2 underline-offset-4 ${focusRing}`}
            >
              View all services
            </Link>
          </p>
        </div>
      </section>

      {/* Specialist comparison table */}
      <section className="border-b border-neutral-200 bg-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <p className="eyebrow">Why specialist matters</p>
          <h2 className="mt-6 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
            A generalist accountant handles your compliance.
            <span className="block text-teal-700">We handle contractor-specific tax.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            The rules around IR35, off-payroll working, PSC dividends and contractor expenses are specific enough that a generalist accountant, however competent, will miss things. We see these issues every week across a large contractor client base, so we know where the risks and opportunities are.
          </p>
          <div className="mt-12 overflow-x-auto border border-neutral-200">
            <table className="w-full min-w-[28rem] text-left text-sm sm:text-base">
              <caption className="sr-only">How {siteConfig.name} handles typical contractor accounting areas</caption>
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th scope="col" className="px-4 py-3 font-semibold text-neutral-900 sm:px-6 sm:py-4">
                    Area
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-neutral-900 sm:px-6 sm:py-4">
                    Our approach
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.area} className="border-b border-neutral-200 last:border-0">
                    <th scope="row" className="px-4 py-3.5 font-medium text-neutral-900 sm:px-6 sm:py-4">
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

      {/* Contact form section */}
      <section className="bg-[#fafaf7]">
        <div className={siteContainerLg}>
          <div className={`${sectionYLoose} grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16`}>
            <div className="min-w-0">
              <p className="eyebrow">Get started</p>
              <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
                Speak to a contractor accountant.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-neutral-600 sm:text-lg">
                Book a free call. We will talk through your IR35 position, your current structure and whether there are things worth changing. No hard sell, no obligation.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/contact" className={btnPrimary}>
                  Book a free call
                </Link>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className={btnSecondary}
                >
                  Email us
                </a>
              </div>
              <p className="mt-8 text-sm text-neutral-500">
                We respond within one working day. All conversations are confidential.
              </p>
            </div>
            <div className="border border-neutral-200 bg-white p-6 sm:p-8 lg:p-10">
              <LeadForm submitLabel="Send enquiry" />
            </div>
          </div>
        </div>
      </section>

      {/* Blog CTA */}
      <section className="border-t border-neutral-200 bg-white">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <p className="eyebrow">Contractor guides</p>
          <h2 className="mt-6 text-2xl font-semibold tracking-tight sm:text-3xl">
            Practical IR35 and contractor tax guides.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600">
            Plain English articles on IR35 status, off-payroll rules, limited company tax, expenses, dividends and pension planning. Written by specialist contractor accountants, not content agencies.
          </p>
          <p className="mt-8">
            <Link href="/blog" className={btnPrimary}>
              Browse all articles
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
