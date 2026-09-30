import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, focusRing, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteConfig } from "@/config/site";
import ContractorsBackdrop from "@/components/layout/ContractorsBackdrop";

export const metadata: Metadata = {
  title: { absolute: "IR35 Contract Review & Status | Contractor Tax Accountants" },
  description:
    "Professional IR35 contract review for UK contractors. We assess your contract terms and working practices against all three tests. Plain English written opinion.",
  alternates: { canonical: `${siteConfig.url}/ir35-status` },
};

/* Hand-rolled eyebrows. `.section-label` and `.eyebrow` are `@layer components`
   rules in globals.css that pin their own colour; being layered, a `text-*`
   utility WOULD beat them. Hand-rolling is kept because it needs no override at
   all, and because neither class emits the recipe these pages want. */
const eyebrowDark =
  "font-mono text-xs font-medium uppercase tracking-[0.1em] text-primary-400";
const eyebrowLight =
  "font-mono text-xs font-medium uppercase tracking-[0.1em] text-primary-700";

const statusTests = [
  {
    title: "Control",
    body: "Does the end client control how, where and when you work? Or do you have genuine freedom to decide? The more control the client exercises, the more the engagement looks like employment.",
  },
  {
    title: "Substitution",
    body: "Could you send a suitably qualified substitute to do the work in your place, and would the client accept them? A genuine right of substitution points toward self-employment, but it must be real, not just a clause in a contract.",
  },
  {
    title: "Mutuality of obligation",
    body: "Is the client obliged to offer you work, and are you obliged to accept it? In a genuine contract-for-services arrangement, neither obligation exists. If both do, the engagement looks more like employment.",
  },
];

const reviewCovers = [
  {
    heading: "Contract terms",
    body: "We read the written contract for clauses that create employment-type obligations, including direction over how the work is done, restrictions on substitution, and expectations of continued engagement. We flag anything that creates risk and recommend specific wording changes where the position can be improved.",
  },
  {
    heading: "Actual working practices",
    body: "Contract wording is not enough on its own. HMRC looks at how the engagement works in practice. We discuss how you actually work with your client, including who directs your day-to-day work, whether substitution is genuinely possible, and whether there is an expectation of ongoing work on either side.",
  },
  {
    heading: "The three IR35 tests",
    body: "We assess control, substitution and mutuality of obligation for your specific engagement. Where the position is borderline, we tell you which test is the weak point and what would need to change in practice (not just on paper) to improve the position.",
  },
];

const timeline = [
  {
    date: "April 2017",
    event: "Off-payroll rules introduced for public sector engagements. End clients (not PSCs) became responsible for determining IR35 status.",
  },
  {
    date: "April 2021",
    event: "Rules extended to medium and large private sector businesses. Small companies remain exempt. The PSC still self-assesses.",
  },
  {
    date: "Now",
    event: "If your end client is a medium or large business, they issue a Status Determination Statement (SDS). You have a right to challenge it through a formal disagreement process.",
  },
];

export default function IR35StatusPage() {
  return (
    <>
      {/* HOOK. */}
      <section className="relative overflow-hidden bg-neutral-900 py-16 sm:py-20">
        <ContractorsBackdrop />
        <div className={`${siteContainerLg} relative z-10`}>
          {/* Narrow measure on hero copy only. */}
          <div className="max-w-3xl">
            <p className={`${eyebrowDark} mb-6`}>IR35 status</p>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Inside or outside IR35?
              <span className="block text-primary-400">Understand your position.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300">
              IR35 is assessed contract by contract. A single status for all your engagements does not exist. We review your specific contract and how you actually work.
            </p>
            {/* Primary CTA stays on the page. Only the header CTA and the
                sticky banner leave for /contact. */}
            <Link
              href="#book"
              className={`${btnPrimary} mt-10 rounded-xl`}
              data-cta="hero_book"
              data-cta-placement="hero"
              data-cta-goal="form"
            >
              Book your IR35 contract review
            </Link>
          </div>
        </div>
      </section>

      {/* PROBLEM: what the status actually turns on. */}
      <section className="bg-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <div className="max-w-3xl">
            <p className={`${eyebrowLight} mb-4`}>The three tests</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              How IR35 status is determined.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-neutral-600 sm:text-lg">
              HMRC and the courts use three primary tests to determine whether a contractor is genuinely self-employed or a disguised employee. Your contract wording matters, but actual working practices matter more.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3 md:gap-8">
            {statusTests.map((test) => (
              <div
                key={test.title}
                className="rounded-xl bg-neutral-50 p-6 ring-1 ring-neutral-200/70 sm:p-8"
              >
                <h3 className="text-xl font-semibold text-neutral-900">{test.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-neutral-600">{test.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROOF, part one: what the status is worth in tax. */}
      <section className="bg-[#fafaf7]">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <div className="max-w-3xl">
            <p className={`${eyebrowLight} mb-4`}>What it means in practice</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Inside vs outside IR35: the tax difference.
            </h2>
          </div>
          <div className="mt-12 overflow-x-auto rounded-xl bg-white ring-1 ring-neutral-200/70">
            <table className="w-full min-w-[32rem] text-left text-sm sm:text-base">
              <caption className="sr-only">
                How the tax treatment of a contract differs inside and outside IR35
              </caption>
              <thead>
                <tr className="bg-neutral-900 text-white">
                  <th scope="col" className="px-5 py-4 font-bold text-sm uppercase tracking-wider sm:px-6">Area</th>
                  <th scope="col" className="px-5 py-4 font-bold text-sm uppercase tracking-wider text-primary-300 sm:px-6">Outside IR35</th>
                  <th scope="col" className="px-5 py-4 font-bold text-sm uppercase tracking-wider sm:px-6">Inside IR35</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Who pays tax and NI", "PSC pays CT; director pays income tax on salary + dividend tax", "Fee-payer deducts income tax + employee NI before paying PSC"],
                  ["How you receive payment", "Gross fee into PSC, then salary + dividends", "Net of income tax and employee NI deductions"],
                  ["Corporation tax", "Applies to PSC profit in the normal way", "No CT on the deemed payment income"],
                  ["Dividend tax", "Taxed at 10.75% / 35.75% / 39.35% (2026/27)", "Not applicable (income treated as employment income)"],
                  ["Allowable expenses", "Company expenses deductible in the usual way", "Very limited (travel and subsistence restricted)"],
                  ["Pension contributions", "PSC employer contributions are highly tax-efficient", "Possible but more complex via PAYE arrangements"],
                ].map(([area, outside, inside], i) => (
                  <tr key={area} className={`border-b border-neutral-200 last:border-0 ${i % 2 === 1 ? "bg-neutral-50" : "bg-white"}`}>
                    <th scope="row" className="px-5 py-4 font-semibold text-neutral-900 sm:px-6">{area}</th>
                    <td className="px-5 py-4 text-neutral-600 sm:px-6">{outside}</td>
                    <td className="px-5 py-4 text-neutral-600 sm:px-6">{inside}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* PROOF, part two: when the rules changed and who they bite. */}
      <section className="bg-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <div className="max-w-3xl">
            <p className={`${eyebrowLight} mb-4`}>Off-payroll timeline</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              When the rules changed, and who they affect.
            </h2>
          </div>
          <ol className="mt-12 space-y-10">
            {timeline.map((item) => (
              <li key={item.date} className="flex gap-6 sm:gap-8">
                <div className="shrink-0">
                  <span className="font-mono text-sm font-medium text-primary-700 uppercase tracking-widest">
                    {item.date}
                  </span>
                </div>
                <p className="text-base leading-relaxed text-neutral-600 sm:text-lg">{item.event}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-neutral-600">
            Small company exemption: if your end client meets two of the following criteria (turnover not more than £15m, balance sheet not more than £7.5m, not more than 50 employees, met for two consecutive financial years beginning on or after 6 April 2025), the old rules apply and your PSC self-assesses its own IR35 status. Note the timing lag: a previously medium client cannot fall out of scope before 6 April 2027.
          </p>
        </div>
      </section>

      {/* SCOPE: what the review itself covers. */}
      <section className="bg-[#fafaf7]">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <div className="max-w-3xl">
            <p className={`${eyebrowLight} mb-4`}>The service</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              IR35 contract review: what it covers.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-neutral-600 sm:text-lg">
              Our IR35 contract review goes beyond running your paperwork through the CEST tool. We look at three things together.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3 md:gap-8">
            {reviewCovers.map((item) => (
              <div key={item.heading} className="rounded-xl bg-white p-6 ring-1 ring-neutral-200/70 sm:p-8">
                <h3 className="text-lg font-bold text-neutral-900">{item.heading}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-xl bg-white p-6 ring-1 ring-neutral-200/70 sm:p-8">
            <h3 className="text-base font-bold text-neutral-900">What you get back</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 sm:text-base">
              A written opinion on your status covering the three tests, a summary of the risk factors identified in your contract and working practices, and specific recommendations on what (if anything) needs to change. For medium and large end clients, we also explain your rights around the Status Determination Statement and the formal disagreement process.
            </p>
          </div>
          <p className="mt-10 text-sm text-neutral-600">
            We cover all contractor sectors.{" "}
            <Link
              href="/for"
              className={`font-medium text-primary-700 underline underline-offset-4 hover:text-primary-800 transition-colors ${focusRing}`}
            >
              See who we help
            </Link>
            , or{" "}
            <Link
              href="/blog"
              className={`font-medium text-primary-700 underline underline-offset-4 hover:text-primary-800 transition-colors ${focusRing}`}
            >
              read our IR35 guides
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ASK. `contained` keeps a dark band off the dark footer; `ground="white"`
          alternates against the warm section above. `proofPoints` intentionally
          EMPTY: Property's call site passes a fee claim and a turnaround
          promise, both banned on this site. */}
      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          contained
          ground="white"
          eyebrow="Free call"
          title="Not sure where your contract sits?"
          description="Book an IR35 contract review. We look at your contract wording and your actual working practices, apply the three tests, and give you a clear written opinion on your position."
          proofPoints={[]}
          formTitle="Book your free call"
          form={<LeadForm submitLabel="Request a callback" />}
          footnote={
            /* KNOWN CONTRACT: PanelBody renders `footnote` inside a <p>, so a
               <div> here would be a block in a paragraph and a hydration
               mismatch. Span only. */
            <span>
              No obligation. If you would rather write to us first, use the{" "}
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
