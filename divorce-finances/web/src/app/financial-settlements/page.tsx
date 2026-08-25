import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, btnSecondary, focusRing, siteContainerLg } from "@/components/ui/layout-utils";
import { LeadForm } from "@/components/forms/LeadForm";
import { toolPath } from "@/lib/calculators/registry";
import { buildFaqPageJsonLd } from "@/lib/faq-page-schema";
import { siteConfig } from "@/config/site";

const GUIDE_HREF = "/blog/financial-settlements/divorce-financial-settlement-guide";

export const metadata: Metadata = {
  title: `Divorce Financial Settlement: Help and How It Works | ${siteConfig.name}`,
  description:
    "What a financial settlement on divorce actually is, why it is separate from the divorce, how courts decide a fair split, and when to get a specialist. Free UK calculators plus a route to a vetted family law firm.",
  alternates: { canonical: `${siteConfig.url}/financial-settlements` },
};

const faqs = [
  {
    question: "Is a financial settlement the same as getting divorced?",
    answer:
      "No. They are two separate legal processes. The divorce ends the marriage; the financial settlement divides money, property, pensions and debts. You can be fully divorced and still have every financial claim open between you, which is why the settlement needs its own court order to close it.",
  },
  {
    question: "Is a divorce settlement always split 50/50?",
    answer:
      "No. Equal sharing of matrimonial assets is the starting point, especially after a longer marriage, but it is only the starting point. The court's first job is to meet both parties' needs and, above all, any children's needs. Marriage length, earning capacity, health and non-matrimonial assets can all move the outcome away from a straight half.",
  },
  {
    question: "Do we have to go to court to agree a settlement?",
    answer:
      "Usually not in person. Most couples agree terms through mediation or solicitor negotiation and then ask a judge to approve them as a consent order on paper, with no hearing. Contested court proceedings are the exception, used when you genuinely cannot agree.",
  },
  {
    question: "We already agree on the money. Why do we still need a consent order?",
    answer:
      "Because an informal agreement is not binding. Without a court-approved order, either of you can still make a financial claim later, including against assets built up after the divorce. A consent order, usually with clean break terms, is what actually ends those claims in both directions.",
  },
  {
    question: "Do I need a solicitor, or can we sort it ourselves?",
    answer:
      "There is no legal requirement to use a solicitor, and simple, low-asset cases with full agreement can be handled with minimal help. Professional input earns its fee where there are pensions to share, a business to value, property, higher-value assets or any disagreement, because these are where costly mistakes are hardest to undo.",
  },
  {
    question: "Is there a time limit for claiming a financial settlement after divorce?",
    answer:
      "There is no fixed statutory deadline for a first claim between ex-spouses, and claims have succeeded many years after separation. The main trap is remarriage: remarry before applying and you generally lose the right to most claims from the earlier marriage. A clean break order is the reliable way to close the door.",
  },
];

export default function FinancialSettlementsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqPageJsonLd(faqs)) }}
      />

      {/* Hero */}
      <section className="border-b border-neutral-200 bg-[#1e293b] py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="section-label mb-6">Financial settlements</div>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            The financial settlement on divorce: what it is, how it is decided and when to get help.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300">
            Dividing money, property and pensions is the part of a divorce that follows you for years.
            Get an indicative sense of the numbers in a couple of minutes, then decide how much help you
            actually need.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={toolPath("settlement-range-estimator")} className={btnPrimary}>
              Estimate my settlement range
            </Link>
            <Link
              href="/contact"
              className={`inline-flex min-h-12 items-center justify-center border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-medium text-white hover:bg-white/20 transition-colors ${focusRing}`}
            >
              Request a call from a vetted family law specialist
            </Link>
          </div>
        </div>
      </section>

      {/* What it is + separate from divorce */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={`${siteContainerLg} max-w-3xl`}>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            A settlement is separate from the divorce itself
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
            When a marriage ends in England and Wales, two things run alongside each other. The divorce
            dissolves the marriage. The financial settlement divides everything the two of you own and
            owe: the family home, savings, investments, pensions, businesses and debts. They are not the
            same legal process, and finishing one does not finish the other.
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
            This matters more than most people expect. Your final order of divorce does not end financial
            claims between you. Until a court approves a financial order, either of you can apply for a
            share of the other&apos;s money, income and assets, including things acquired after the
            divorce. Plenty of couples reach an amicable understanding, never write it down properly, and
            leave those claims open indefinitely. Closing them is the whole point of getting the money
            side right.
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
            This page is an orientation to the decisions in front of you. For the full detail on how the
            law works, read the{" "}
            <Link href={GUIDE_HREF} className="font-medium text-orange-700 underline underline-offset-4 hover:text-orange-800">
              complete guide to divorce financial settlements
            </Link>
            . This is information, not legal advice.
          </p>
        </div>
      </section>

      {/* No automatic 50/50 + section 25 */}
      <section className="border-t border-neutral-200 bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={`${siteContainerLg} max-w-3xl`}>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            There is no automatic 50/50
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
            The common belief that everything is simply halved is wrong. Equal sharing of matrimonial
            assets is where the court starts, particularly after a longer marriage, but it is a starting
            point, not a rule. From there the court adjusts to reach a result it considers fair, and the
            first priority is always that everyone&apos;s needs, above all any children&apos;s, are met.
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
            The factors a court weighs are set out in section 25 of the Matrimonial Causes Act 1973. In
            plain terms, they include:
          </p>
          <ul className="mt-5 space-y-3 text-base leading-relaxed text-neutral-600 sm:text-lg list-disc pl-6">
            <li>The income, assets and earning capacity of each of you, now and in the foreseeable future.</li>
            <li>Financial needs and responsibilities, with the welfare of any children under 18 given first consideration.</li>
            <li>The standard of living during the marriage, and the age of each party.</li>
            <li>The length of the marriage, and any physical or mental disability.</li>
            <li>Contributions each of you made, including looking after the home or caring for the family.</li>
          </ul>
          <p className="mt-6 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Because so much turns on the specifics, two families with the same total assets can fairly end
            up with very different splits. That is why a headline percentage tells you little on its own.
          </p>
        </div>
      </section>

      {/* Matrimonial vs non-matrimonial + calculator prompt */}
      <section className="border-t border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={`${siteContainerLg} max-w-3xl`}>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            What actually goes into the pot
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Before anything can be divided, you need a complete picture of what exists. Assets broadly
            fall into two groups, and the line between them shapes the outcome.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="border border-neutral-200 border-l-4 border-l-orange-500 bg-neutral-50 p-6">
              <h3 className="text-lg font-bold text-neutral-900">Matrimonial assets</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                Broadly, everything built up during the marriage, and the default subjects of sharing:
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-neutral-600 list-disc pl-5">
                <li>The family home, wherever the deeds sit.</li>
                <li>Joint and sole savings and investments.</li>
                <li>Pensions accrued during the marriage, often the largest asset after the house.</li>
                <li>Businesses and business interests built up while married.</li>
              </ul>
            </div>
            <div className="border border-neutral-200 border-l-4 border-l-orange-500 bg-neutral-50 p-6">
              <h3 className="text-lg font-bold text-neutral-900">Non-matrimonial assets</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                Typically kept out of sharing, though not always out of reach:
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-neutral-600 list-disc pl-5">
                <li>Assets owned before the marriage.</li>
                <li>Inheritances and gifts received from third parties.</li>
                <li>Property acquired well after separation.</li>
              </ul>
            </div>
          </div>
          <p className="mt-6 text-base leading-relaxed text-neutral-600 sm:text-lg">
            The important caveat is that non-matrimonial assets can still be drawn in where they are needed
            to meet the other party&apos;s or the children&apos;s needs, and they can lose their protected
            status if they have been mixed into the family finances over the years. Pensions in particular
            are routinely undervalued by people trying to sort things out themselves, because the transfer
            value on a statement is not the same as what a fair share is worth.
          </p>
          <div className="mt-8 border border-orange-200 bg-orange-50 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-neutral-900">See an indicative range for your situation</h3>
            <p className="mt-3 text-base leading-relaxed text-neutral-600">
              The{" "}
              <Link href={toolPath("settlement-range-estimator")} className="font-medium text-orange-700 underline underline-offset-4 hover:text-orange-800">
                settlement range estimator
              </Link>{" "}
              turns your assets and circumstances into an indicative range built on the factors courts
              actually use. It is a starting point for the conversation, not a prediction of any specific
              outcome.
            </p>
            <div className="mt-5">
              <Link href={toolPath("settlement-range-estimator")} className={btnPrimary}>
                Open the settlement range estimator
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Routes to agreement + consent order */}
      <section className="border-t border-neutral-200 bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={`${siteContainerLg} max-w-3xl`}>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            How people reach a settlement
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Most couples never see the inside of a courtroom. The common routes to agreement, from lightest
            touch to most formal, are:
          </p>
          <ul className="mt-5 space-y-3 text-base leading-relaxed text-neutral-600 sm:text-lg list-disc pl-6">
            <li><strong className="text-neutral-900">Mediation.</strong> A neutral, accredited mediator helps you both reach terms, usually the cheapest and quickest route where there is goodwill on both sides.</li>
            <li><strong className="text-neutral-900">Solicitor negotiation.</strong> Each of you takes advice and terms are negotiated between solicitors, useful where matters are more complex or communication has broken down.</li>
            <li><strong className="text-neutral-900">Court proceedings.</strong> A financial remedy application, used when agreement is genuinely out of reach. Even then, the large majority of cases settle before a final hearing.</li>
          </ul>
          <p className="mt-6 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Whichever route you take, the agreement is not binding until a judge approves it as a{" "}
            <strong className="text-neutral-900">consent order</strong>. This is the single most important
            document in the whole process. A consent order with{" "}
            <strong className="text-neutral-900">clean break</strong> terms severs financial ties so that
            neither of you can come back for more later. Skip it, and you have an agreement that a court can
            ignore and an ex-spouse who can still make a claim years down the line. The guide covers{" "}
            <Link href={GUIDE_HREF} className="font-medium text-orange-700 underline underline-offset-4 hover:text-orange-800">
              disclosure, consent orders and clean break terms in full
            </Link>
            .
          </p>
        </div>
      </section>

      {/* When to get specialist help */}
      <section className="border-t border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={`${siteContainerLg} max-w-3xl`}>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            When it is worth getting specialist help
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Not every separation needs a solicitor from day one. A short marriage with few assets, full
            agreement and no children can often be handled with light-touch help just to get the consent
            order drafted correctly. The picture changes when the stakes rise. It is usually worth speaking
            to a specialist when:
          </p>
          <ul className="mt-5 space-y-3 text-base leading-relaxed text-neutral-600 sm:text-lg list-disc pl-6">
            <li><strong className="text-neutral-900">Pensions are significant.</strong> Sharing and offsetting are technical, and getting the valuation wrong can quietly cost one party a large share of their retirement.</li>
            <li><strong className="text-neutral-900">There is a business.</strong> Valuing and dividing a company, or protecting one, needs proper advice.</li>
            <li><strong className="text-neutral-900">The estate is higher value or complex.</strong> Property, trusts, overseas assets or mixed matrimonial and non-matrimonial money all reward experience.</li>
            <li><strong className="text-neutral-900">You disagree,</strong> or you suspect your ex-partner is not being open about what they own.</li>
          </ul>
          <p className="mt-6 text-base leading-relaxed text-neutral-600 sm:text-lg">
            {siteConfig.name} is not a law firm and does not give legal or financial advice. What we do is
            connect people across England and Wales with experienced, vetted family law professionals and
            accredited mediators for a no-obligation conversation about the right route and realistic costs.
            Before you decide, it helps to know what the process itself is likely to cost. The{" "}
            <Link href={toolPath("divorce-cost-calculator")} className="font-medium text-orange-700 underline underline-offset-4 hover:text-orange-800">
              divorce cost calculator
            </Link>{" "}
            sets out the likely spend by route, so you can walk into any quote conversation already knowing
            what reasonable looks like.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-neutral-200 bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-neutral-900 text-center mb-8 sm:mb-12 sm:text-4xl">
              Common questions
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {faqs.map((faq) => (
                <details key={faq.question} className="group border border-neutral-200 bg-white">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 font-semibold text-neutral-900 hover:text-orange-700 transition-colors list-none">
                    <span>{faq.question}</span>
                    <span className="flex-shrink-0 text-orange-500 transition-transform group-open:rotate-45" aria-hidden>
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

      {/* Closing CTA + lead form */}
      <section className="border-t border-neutral-200 bg-[#1e293b] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div className="section-label mb-6">Get started</div>
              <h2 className="text-2xl font-bold text-white sm:text-4xl">
                Know your numbers before you commit to anything.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-neutral-300">
                Run the settlement range estimator and the divorce cost calculator to see what a fair split
                might look like and what the process should cost. Then, if you want help, tell us about your
                situation and we will connect you with a vetted family law specialist who quotes clearly.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href={toolPath("settlement-range-estimator")} className={btnPrimary}>
                  Estimate my settlement range
                </Link>
                <Link href={toolPath("divorce-cost-calculator")} className={btnSecondary}>
                  Estimate the cost
                </Link>
              </div>
              <p className="mt-6 text-sm leading-relaxed text-neutral-400">
                {siteConfig.name} is not a law firm and does not give legal advice. Your details are shared
                only with your consent. We may receive a fee from the firm we introduce you to, which never
                affects what you pay or the advice you receive.
              </p>
            </div>
            <div className="bg-white p-6 sm:p-8 lg:p-10">
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-4 sm:mb-6">
                Speak to a specialist
              </h3>
              <LeadForm submitLabel="Request a callback" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
