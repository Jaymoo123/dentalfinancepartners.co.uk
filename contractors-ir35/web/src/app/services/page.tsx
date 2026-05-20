import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, focusRing, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contractor Accountant Services | IR35, Ltd Company Tax, Expenses",
  description:
    "Specialist accounting services for UK contractors. IR35 status reviews, limited company accounts, corporation tax, salary and dividend planning, expenses and pension.",
};

const services = [
  {
    id: "ir35-status-review",
    title: "IR35 status review",
    eyebrow: "IR35 Status",
    body: [
      "We review your contract wording and actual working practices against the three key IR35 tests: control (how and when you work), substitution (can someone else do the work) and mutuality of obligation (are you obliged to accept work, is the client obliged to offer it).",
      "We give you a written opinion on your status and, if the position is borderline, we tell you what would need to change. We do not just run your contract through the CEST tool and send you the result.",
      "For medium and large end clients, we also help you understand your rights around the Status Determination Statement (SDS) and the client-led disagreement process if you believe the status is wrong.",
    ],
  },
  {
    id: "limited-company-tax",
    title: "Limited company accounts and tax",
    eyebrow: "Limited Company Tax",
    body: [
      "Annual statutory accounts, corporation tax return (CT600), and Companies House filings. All prepared accurately, filed on time, and reviewed with you properly before submission.",
      "We also handle the confirmation statement, maintain your company records, and keep on top of any changes to your filing obligations.",
      "Corporation tax for a typical contractor PSC is not complicated in isolation, but it connects to your personal tax position, your pension contributions, and your salary/dividend split in ways that matter. We plan for all of it together.",
    ],
  },
  {
    id: "salary-dividend-planning",
    title: "Salary and dividend planning",
    eyebrow: "Director Pay",
    body: [
      "The most tax-efficient split between director salary and dividends changes each year as income tax bands, NIC rates, the dividend allowance and the dividend tax rates shift.",
      "We model the optimal structure for your circumstances each tax year, taking into account your other income sources, your pension contributions, and whether you have a spouse or partner who is also a shareholder.",
      "For 2024/25 the dividend allowance is £500. Dividend tax rates are 8.75% (basic), 33.75% (higher) and 39.35% (additional). Corporation tax at the small profits rate (19%) applies to profits up to £50,000.",
    ],
  },
  {
    id: "expenses",
    title: "Contractor expenses",
    eyebrow: "Expenses and Deductions",
    body: [
      "The allowable expenses for contractors operating through a limited company include travel and subsistence (subject to the 24-month rule for any single workplace), home office costs, equipment, professional subscriptions, training directly relevant to your work, and professional indemnity insurance.",
      "The 24-month rule means that once you have worked at a single site for more than 24 months, or from the start it was expected you would, that site becomes a permanent workplace and ordinary commuting costs are no longer allowable.",
      "We review your expense claims and make sure everything you are entitled to is included and properly documented.",
    ],
  },
  {
    id: "pension",
    title: "Contractor pension planning",
    eyebrow: "Pension and Dividends",
    body: [
      "Employer pension contributions from your PSC are one of the most tax-efficient tools available to a contractor. They are an allowable business expense (reducing your corporation tax bill) and are exempt from income tax for you as the recipient, up to the annual allowance (£60,000 in 2024/25, or 100% of your relevant UK earnings if lower).",
      "Unlike salary sacrifice in an employment context, contributions from a PSC are made as employer contributions directly. We build this into your annual planning so contributions are sized to make best use of the allowance and your carry-forward entitlement.",
    ],
  },
  {
    id: "self-assessment",
    title: "Self assessment",
    eyebrow: "Compliance",
    body: [
      "As a limited company director you will typically need to complete a self assessment tax return each year, covering your director salary, any dividends taken, and any other income sources.",
      "We prepare and file your self assessment return, manage your payment on account position so you are not caught short in January and July, and advise on any reliefs or claims that should be included.",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-neutral-200 bg-neutral-900 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <p className="eyebrow text-teal-400">What we do</p>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Specialist services for UK contractors.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300">
            Every service we offer is designed specifically for contractors and PSC directors. We do not offer general accountancy services to non-contractors.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <div className="space-y-20 sm:space-y-28">
            {services.map((service) => (
              <article key={service.id} id={service.id} className="scroll-mt-24">
                <p className="eyebrow">{service.eyebrow}</p>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                  {service.title}
                </h2>
                <div className="mt-6 max-w-3xl space-y-4">
                  {service.body.map((para, i) => (
                    <p key={i} className="text-base leading-relaxed text-neutral-600 sm:text-lg">
                      {para}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-[#fafaf7] py-16 sm:py-20">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Ready to talk through your situation?
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600">
            Book a free introductory call. We will review your position and tell you plainly what we would do differently.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className={btnPrimary}>
              Book a free call
            </Link>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className={`inline-flex min-h-12 items-center text-sm font-medium text-neutral-700 underline decoration-teal-600 underline-offset-4 hover:text-neutral-900 transition-colors ${focusRing}`}
            >
              Email us directly
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
