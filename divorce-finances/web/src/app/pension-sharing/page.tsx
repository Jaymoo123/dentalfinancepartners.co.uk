import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, btnSecondary, focusRing, siteContainerLg } from "@/components/ui/layout-utils";
import { LeadForm } from "@/components/forms/LeadForm";
import { toolPath } from "@/lib/calculators/registry";
import { buildFaqPageJsonLd } from "@/lib/faq-page-schema";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Pensions and Divorce: How Pension Sharing Works | ${siteConfig.name}`,
  description:
    "Pensions are often the biggest asset in a divorce. A plain-English orientation to the three ways they are dealt with: sharing, offsetting and attachment. Information only, current for 2026.",
  alternates: { canonical: `${siteConfig.url}/pension-sharing` },
};

const faqs = [
  {
    question: "Can you split a pension without going to court?",
    answer:
      "No. A pension can only be divided by a court order. Even where both people agree, the agreement has to be written into a consent order and approved by the court to take legal effect. A private promise to share a pension is not binding on the pension provider.",
  },
  {
    question: "What is a pension sharing order?",
    answer:
      "A pension sharing order transfers a set percentage of one person's pension to the other, creating a separate pension pot or credit in their own name. It gives a clean break on that asset, because once implemented the two pensions are legally independent.",
  },
  {
    question: "What is the difference between pension sharing and offsetting?",
    answer:
      "Pension sharing splits the pension itself. Offsetting keeps the pension whole with one person and gives the other more of a different asset, such as a larger share of the house, to balance things out. They are simply different mechanisms; which suits a particular case is a question for a specialist, not something that can be decided from a web page.",
  },
  {
    question: "Why might a CETV understate what a pension is really worth?",
    answer:
      "A cash equivalent transfer value (CETV) is the figure a scheme puts on a pension for transfer purposes. For a defined benefit or public sector pension, that figure can sit well below the true cost of buying the same guaranteed, inflation-linked income on the open market. Where these pensions are significant, an actuarial report (often called a PODE report) is commonly used to value them properly.",
  },
  {
    question: "How long does a pension sharing order take to put in place?",
    answer:
      "Once the order takes effect, the pension provider has a statutory implementation period of four months from the date it holds the order and all the information and charges it needs. Providers also apply their own implementation fees, which vary between schemes.",
  },
  {
    question: "Can the state pension be shared on divorce?",
    answer:
      "The basic amount of the new State Pension cannot be shared. For divorces starting on or after 6 April 2016, only the protected payment element (the amount paid on top of the standard rate) can be subject to a sharing order, and additional State Pension from the older system may be shareable in some cases. It is worth a specialist checking your own position.",
  },
];

export default function PensionSharingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqPageJsonLd(faqs)) }}
      />

      {/* Hero */}
      <section className="border-b border-neutral-200 bg-[#1e293b] py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="section-label mb-6">Pensions and divorce</div>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Pensions and divorce: how pension sharing works, and why it needs specialist input.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300">
            A pension is often the largest asset in a separation, and the one most easily overlooked.
            This page orients you to the three ways pensions can be dealt with, then points you to a
            specialist, because getting the value right genuinely matters.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="#speak-to-a-specialist" className={btnPrimary}>
              Speak to a specialist
            </Link>
            <Link
              href="/blog/pensions-and-divorce/pensions-and-divorce"
              className={`inline-flex min-h-12 items-center justify-center border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-medium text-white hover:bg-white/20 transition-colors ${focusRing}`}
            >
              Read the full pensions guide
            </Link>
          </div>
        </div>
      </section>

      {/* Why pensions matter */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={`${siteContainerLg} max-w-3xl`}>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            Why pensions are so easy to underestimate
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
            When a marriage or civil partnership ends, attention usually goes to the house and the savings,
            because they feel real and immediate. Pensions feel distant, so they are often the last thing
            anyone thinks about. Yet for many couples the combined pension pot is worth as much as the home,
            and sometimes more, especially where one person has a long career in a defined benefit or public
            sector scheme.
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Pension savings built up during the relationship are part of the matrimonial pot and are routinely
            taken into account in a financial settlement. Leaving them out, or agreeing a rough figure without
            a proper valuation, is one of the most expensive mistakes people make. This page is information
            only. It explains how the options work; it does not tell you which to pick, and it is not advice.
          </p>
        </div>
      </section>

      {/* The three approaches */}
      <section className="border-t border-neutral-200 bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={`${siteContainerLg} max-w-3xl`}>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            The three ways pensions are dealt with
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
            In England and Wales there are three legal mechanisms. They are simply different tools; none is
            &ldquo;better&rdquo; in the abstract, and which fits a given case depends on facts a specialist
            needs to weigh.
          </p>
          <div className="mt-8 space-y-6">
            <div className="border border-neutral-200 border-l-4 border-l-orange-500 bg-white p-6">
              <h3 className="text-lg font-bold text-neutral-900">1. Pension sharing</h3>
              <p className="mt-3 text-base leading-relaxed text-neutral-600">
                A pension sharing order splits the pension. It transfers a stated percentage of one person&apos;s
                pension to the other, who receives it as a pension credit, either as a pot in their own name or,
                in some schemes, as membership in their own right. The result is a clean break on that asset:
                once it is done, the two pensions are legally independent.
              </p>
            </div>
            <div className="border border-neutral-200 border-l-4 border-l-orange-500 bg-white p-6">
              <h3 className="text-lg font-bold text-neutral-900">2. Pension offsetting</h3>
              <p className="mt-3 text-base leading-relaxed text-neutral-600">
                Offsetting keeps the pension whole with one person, and gives the other more of a different
                asset to compensate, most often a larger share of the family home. Nothing is done to the
                pension itself. The obvious question, and the tricky one, is how much other value fairly matches
                the pension, because comparing a future pension income pound for pound with cash today is a
                known trap.
              </p>
            </div>
            <div className="border border-neutral-200 border-l-4 border-l-orange-500 bg-white p-6">
              <h3 className="text-lg font-bold text-neutral-900">3. Pension attachment (earmarking)</h3>
              <p className="mt-3 text-base leading-relaxed text-neutral-600">
                An attachment order (once called earmarking) redirects part of a pension to the other person
                when it eventually comes into payment. It does not divide the pension now, and it leaves the two
                people financially tied together for years, which is why it is used far less often than sharing
                or offsetting today.
              </p>
            </div>
          </div>
          <p className="mt-6 text-base leading-relaxed text-neutral-600 sm:text-lg">
            For a fuller walk through each mechanism, including worked examples and how they interact with the
            rest of a settlement, see the{" "}
            <Link
              href="/blog/pensions-and-divorce/pensions-and-divorce"
              className="font-medium text-orange-700 underline underline-offset-4 hover:text-orange-800"
            >
              full pensions and divorce guide
            </Link>
            .
          </p>
        </div>
      </section>

      {/* CETV and valuation */}
      <section className="border-t border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={`${siteContainerLg} max-w-3xl`}>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            Getting the value right: the CETV and why it can mislead
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Every one of these options rests on knowing what the pension is actually worth. The starting point
            is usually the cash equivalent transfer value (CETV), the figure the scheme itself puts on the
            pension. For a defined contribution pension (a pot of invested money) the CETV is a reasonable
            reflection of value. For a defined benefit or public sector pension, it often is not.
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
            A defined benefit scheme promises a guaranteed, inflation-linked income for life. The CETV a scheme
            quotes can sit well below what it would actually cost to buy that same secure income elsewhere. Two
            pensions with identical CETVs can therefore be worth very different amounts in real terms. Where
            these pensions are significant, the parties commonly instruct an actuary (a pensions on divorce
            expert, or PODE) to produce a report on the true value and how to split it fairly. This is a
            question of expert valuation, not something to eyeball from a statement.
          </p>
        </div>
      </section>

      {/* Court order and implementation */}
      <section className="border-t border-neutral-200 bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={`${siteContainerLg} max-w-3xl`}>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            Only a court can divide a pension
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
            A pension cannot be split by private agreement. Pension sharing and attachment happen as part of the
            financial settlement, and they take effect only through a court order. Where the two people agree
            terms, those terms are written into a consent order and submitted for a judge to approve. Where they
            cannot agree, the court decides. Either way, the pension provider will not act until it holds a valid
            order.
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Timing matters. A financial order, including a pension share, is normally made final only after the
            divorce itself is finalised. Once a sharing order takes effect, the provider has a statutory
            implementation period of four months (from the point it holds the order and all the information and
            charges it needs) to put the share in place. Schemes also charge their own implementation fees,
            which differ from one provider to another.
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
            The State Pension follows its own rules. The basic amount of the new State Pension cannot be shared.
            For divorces starting on or after 6 April 2016, only the protected payment element can be subject to
            a sharing order, though additional State Pension from the older system may still be shareable in some
            situations. It is a detail worth checking rather than assuming.
          </p>
        </div>
      </section>

      {/* When specialist help is essential */}
      <section className="border-t border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={`${siteContainerLg} max-w-3xl`}>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            When specialist help is essential
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Some parts of a divorce can reasonably be handled without professional input. Pensions are usually
            not one of them. The value is large, the valuations are technical, and mistakes are effectively
            permanent once the order is made. It is worth getting specialist help in particular where:
          </p>
          <ul className="mt-5 space-y-3 text-base leading-relaxed text-neutral-600 sm:text-lg list-disc pl-6">
            <li><strong className="text-neutral-900">There is a defined benefit or public sector pension.</strong> These are the hardest to value and the easiest to under-share.</li>
            <li><strong className="text-neutral-900">There are several pensions between you,</strong> or one person has significantly more than the other.</li>
            <li><strong className="text-neutral-900">The total pension value is high,</strong> or it is a large part of the overall pot.</li>
            <li><strong className="text-neutral-900">You are weighing sharing against offsetting</strong> and need the two put on a genuinely like-for-like footing.</li>
          </ul>
          <p className="mt-6 text-base leading-relaxed text-neutral-600 sm:text-lg">
            To see the broader picture first, our{" "}
            <Link href={toolPath("settlement-range-estimator")} className="font-medium text-orange-700 underline underline-offset-4 hover:text-orange-800">
              settlement range estimator
            </Link>{" "}
            gives a rough sense of where an overall financial settlement might land. It is a starting point for
            context on the whole settlement, not a pension valuation, and it does not replace a proper actuarial
            figure for the pensions themselves. When you are ready for tailored input, tell us a little about
            your situation and we will connect you with a specialist.
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
      <section id="speak-to-a-specialist" className="border-t border-neutral-200 bg-[#1e293b] py-12 sm:py-16 lg:py-20 scroll-mt-20">
        <div className={siteContainerLg}>
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div className="section-label mb-6">Get started</div>
              <h2 className="text-2xl font-bold text-white sm:text-4xl">
                Get the pensions valued properly before you settle.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-neutral-300">
                Pension division is the part of a settlement where expert input pays for itself. Tell us about
                your situation and we will connect you with a specialist who can value the pensions correctly
                and explain your options in full. For the overall settlement picture in the meantime, the range
                estimator is a useful starting point.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href={toolPath("settlement-range-estimator")} className={btnSecondary}>
                  Estimate the settlement range
                </Link>
                <Link
                  href="/blog/pensions-and-divorce/pensions-and-divorce"
                  className={btnSecondary}
                >
                  Read the full guide
                </Link>
              </div>
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
