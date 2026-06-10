import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, focusRing, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "IR35 Status Review | Inside vs Outside IR35 Explained",
  description:
    "Understand your IR35 status. We review your contract and working practices against the three key tests. Plain English advice for UK contractors.",
};

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
      <section className="border-b border-neutral-200 bg-neutral-900 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="section-label mb-6">IR35 status</div>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Inside or outside IR35?
            <span className="block text-teal-400">Understand your position.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300">
            IR35 is assessed contract by contract. A single status for all your engagements does not exist. We review your specific contract and how you actually work.
          </p>
          <div className="mt-10">
            <Link href="/contact" className={btnPrimary}>
              Book a free IR35 review
            </Link>
          </div>
        </div>
      </section>

      {/* Three tests */}
      <section className="border-b border-neutral-200 bg-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <div className="section-label mb-4">The three tests</div>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            How IR35 status is determined.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            HMRC and the courts use three primary tests to determine whether a contractor is genuinely self-employed or a disguised employee. Your contract wording matters, but actual working practices matter more.
          </p>
          <div className="mt-14 grid gap-6 md:grid-cols-3 md:gap-8">
            {statusTests.map((test) => (
              <div key={test.title} className="border-l-2 border-teal-600 pl-6">
                <h3 className="text-xl font-semibold text-neutral-900">{test.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-neutral-600">{test.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inside vs outside comparison */}
      <section className="border-b border-neutral-200 bg-[#fafaf7]">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <div className="section-label mb-4">What it means in practice</div>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            Inside vs outside IR35: the tax difference.
          </h2>
          <div className="mt-12 overflow-x-auto border border-neutral-200 bg-white">
            <table className="w-full min-w-[32rem] text-left text-sm sm:text-base">
              <thead>
                <tr className="bg-neutral-900 text-white">
                  <th scope="col" className="px-5 py-4 font-bold text-sm uppercase tracking-wider sm:px-6">Area</th>
                  <th scope="col" className="px-5 py-4 font-bold text-sm uppercase tracking-wider text-teal-300 sm:px-6">Outside IR35</th>
                  <th scope="col" className="px-5 py-4 font-bold text-sm uppercase tracking-wider sm:px-6">Inside IR35</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Who pays tax and NI", "PSC pays CT; director pays income tax on salary + dividend tax", "Fee-payer deducts income tax + employee NI before paying PSC"],
                  ["How you receive payment", "Gross fee into PSC, then salary + dividends", "Net of income tax and employee NI deductions"],
                  ["Corporation tax", "Applies to PSC profit in the normal way", "No CT on the deemed payment income"],
                  ["Dividend tax", "Taxed at 8.75% / 33.75% / 39.35% (2024/25)", "Not applicable (income treated as employment income)"],
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

      {/* Timeline */}
      <section className="border-b border-neutral-200 bg-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <div className="section-label mb-4">Off-payroll timeline</div>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            When the rules changed, and who they affect.
          </h2>
          <ol className="mt-12 space-y-10">
            {timeline.map((item) => (
              <li key={item.date} className="flex gap-6 sm:gap-8">
                <div className="shrink-0">
                  <span className="font-mono text-sm font-medium text-teal-600 uppercase tracking-widest">
                    {item.date}
                  </span>
                </div>
                <p className="text-base leading-relaxed text-neutral-600 sm:text-lg">{item.event}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 text-sm leading-relaxed text-neutral-500 max-w-2xl">
            Small company exemption: if your end client meets two of the following criteria (turnover below £10.2m, balance sheet below £5.1m, fewer than 50 employees), the old rules still apply and your PSC self-assesses its own IR35 status.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#fafaf7] py-16 sm:py-20">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Not sure where your contract sits?
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600">
            We review your contract wording and your actual working practices. We give you a clear view of your position and what, if anything, you should change.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className={btnPrimary}>
              Book a free IR35 review
            </Link>
            <Link
              href="/blog"
              className={`inline-flex min-h-12 items-center text-sm font-medium text-neutral-700 underline decoration-teal-600 underline-offset-4 hover:text-neutral-900 ${focusRing}`}
            >
              Read our IR35 guides
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
