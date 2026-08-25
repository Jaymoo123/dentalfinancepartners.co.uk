import type { Metadata } from "next";
import Link from "next/link";
import { btnOnTeal, btnPrimary, focusRing, siteContainerLg } from "@/components/ui/layout-utils";
import { LeadForm } from "@/components/forms/LeadForm";
import { buildFaqPageJsonLd } from "@/lib/faq-page-schema";

export const metadata: Metadata = {
  title: "Lasting Power of Attorney: Types, Costs and Registration | Probate Compass",
  description:
    "The two types of LPA explained, registration costs and process, LPA vs deputyship, and the truth about what happens to a power of attorney after death.",
};

const faqs = [
  {
    question: "What is the difference between the two types of LPA?",
    answer:
      "A property and financial affairs LPA covers money, property and bills, and can be used with your consent while you still have capacity. A health and welfare LPA covers care, medical treatment and living arrangements, and only operates once you cannot make the decision yourself.",
  },
  {
    question: "How much does a lasting power of attorney cost?",
    answer:
      "The OPG registration fee is £92 per LPA at the time of writing, with reductions or exemptions for lower incomes. Doing the forms yourself costs nothing beyond the fee; professional preparation typically adds £200 to £500.",
  },
  {
    question: "Does power of attorney continue after death?",
    answer:
      "No. Every power of attorney ends automatically the moment the donor dies. Authority passes to the executors or administrators of the estate, normally through probate. An attorney must stop using the donor's accounts immediately.",
  },
  {
    question: "Can I make an LPA for someone who has dementia?",
    answer:
      "Only if they still have capacity to understand what an LPA is and what it does at the time of signing, which is decision-specific and can exist in early-stage dementia. If capacity has already been lost, the route is a deputyship application to the Court of Protection.",
  },
  {
    question: "Who should I choose as my attorney?",
    answer:
      "Someone you trust completely who is willing, organised and likely to be around: commonly a spouse, adult children or a close friend, and you can appoint more than one plus replacements. You decide whether multiple attorneys must act together or can act independently.",
  },
  {
    question: "What is the difference between an LPA and a deputyship?",
    answer:
      "An LPA is made in advance by you, choosing your own decision-makers, for £92 per document. Deputyship is imposed by the Court of Protection after capacity is lost, costs £432 to apply plus ongoing annual fees and supervision, takes months, and the court picks the deputy.",
  },
];

export default function LastingPowerOfAttorneyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqPageJsonLd(faqs)) }}
      />

      {/* Hero */}
      <section className="border-b border-neutral-200 bg-[#1e293b] py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="section-label mb-6">Lasting power of attorney</div>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Lasting power of attorney: what it covers, what it costs, and the mistake almost everyone makes.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300">
            An LPA is the document your family needs before anything goes wrong, and cannot get afterwards.
            Find out which type you need and what it will cost.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className={btnPrimary}>
              Check what an LPA would cost you
            </Link>
            <Link
              href="/contact"
              className={`inline-flex min-h-12 items-center justify-center border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-medium text-white hover:bg-white/20 transition-colors ${focusRing}`}
            >
              Get matched with a vetted specialist
            </Link>
          </div>
        </div>
      </section>

      {/* What an LPA is */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={`${siteContainerLg} max-w-3xl`}>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            What a lasting power of attorney actually is
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
            A lasting power of attorney (LPA) is a legal document in which you (the &ldquo;donor&rdquo;)
            choose one or more trusted people (your &ldquo;attorneys&rdquo;) to make decisions for you if you
            lose the ability to make them yourself, through dementia, stroke, accident or serious illness.
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
            The crucial word is before. You can only make an LPA while you still have mental capacity. Once
            capacity is lost, the option disappears, and your family&apos;s only route is a court application
            for deputyship, which is slower, more expensive and more intrusive (more on that below).
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
            One in three people born in the UK today will develop dementia in their lifetime, according to
            the Alzheimer&apos;s Society, yet most UK adults have no LPA in place. It is the most commonly missing document in otherwise well-organised estate plans.
          </p>
        </div>
      </section>

      {/* The two types */}
      <section className="border-t border-neutral-200 bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={`${siteContainerLg} max-w-3xl`}>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            The two types, and why most people need both
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
            There are two separate LPAs in England and Wales, covering different territory. They are made
            independently, and you can have one without the other.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="border border-neutral-200 border-l-4 border-l-orange-500 bg-white p-6 sm:p-8">
              <h3 className="text-lg font-bold text-neutral-900">Property and financial affairs LPA</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                Your attorneys can manage money and property: operating bank accounts, paying bills,
                collecting income and benefits, managing investments, and buying or selling property on your
                behalf.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                You can allow it to be used as soon as it is registered, with your consent, even while you
                still have capacity. That is genuinely useful if you are physically unwell, in hospital or
                simply want help with admin.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                Without it, even a spouse cannot access your sole-name accounts, and joint accounts are often
                frozen by the bank once it learns one holder has lost capacity.
              </p>
            </div>
            <div className="border border-neutral-200 border-l-4 border-l-orange-500 bg-white p-6 sm:p-8">
              <h3 className="text-lg font-bold text-neutral-900">Health and welfare LPA</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                Your attorneys can make decisions about medical treatment, care arrangements, where you live,
                and day-to-day matters such as diet and routine. You choose separately whether they can make
                decisions about life-sustaining treatment.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                Unlike the financial LPA, this one can only be used once you have lost capacity to make the
                particular decision yourself. While you can decide, you decide.
              </p>
            </div>
          </div>
          <p className="mt-6 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Most people benefit from making both at the same time, because the situations that trigger one
            almost always involve the other, and doing them together is cheaper than doing them twice.
          </p>
        </div>
      </section>

      {/* Registering */}
      <section className="border-t border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={`${siteContainerLg} max-w-3xl`}>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            Registering an LPA: process and costs
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
            An LPA is not valid until it is registered with the Office of the Public Guardian (OPG).
            Registration takes several weeks at best, often longer, which is another reason to do this well
            before it is needed.
          </p>
          <h3 className="mt-8 text-lg font-bold text-neutral-900">The process</h3>
          <ol className="mt-4 space-y-2 text-base leading-relaxed text-neutral-600 sm:text-lg list-decimal pl-6">
            <li><strong className="text-neutral-900">Complete the forms</strong>, naming your attorneys, any replacement attorneys, and any instructions or preferences. This can be done online through GOV.UK or on paper.</li>
            <li><strong className="text-neutral-900">A certificate provider signs</strong> to confirm you understand what you are doing and are not under pressure. This can be someone who has known you well for two years, or a professional such as a doctor.</li>
            <li><strong className="text-neutral-900">Everyone signs in the correct order</strong>: you, then the certificate provider, then the attorneys. Getting the order wrong is a common reason forms bounce.</li>
            <li><strong className="text-neutral-900">Submit to the OPG for registration.</strong> The OPG runs a waiting period so objections can be raised, then registers the LPA.</li>
          </ol>
          <h3 className="mt-8 text-lg font-bold text-neutral-900">Costs</h3>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
            The OPG charges a registration fee of £92 per LPA at the time of writing, so registering both
            types costs £184 per person, or £368 for a couple doing all four. Fee remissions apply: a 50%
            reduction if your income is below a set threshold, and a full exemption if you receive certain
            means-tested benefits.
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
            You can complete the forms yourself for no cost beyond the fee, and many people with
            straightforward wishes do exactly that. Professional help (typically £200 to £500 plus the fees,
            more for couples or complex instructions) earns its keep when you want tailored instructions,
            have concerns about family dynamics or capacity being questioned later, or are appointing
            attorneys jointly with specific rules about how they must act.
          </p>
        </div>
      </section>

      {/* LPA vs deputyship */}
      <section className="border-t border-neutral-200 bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={`${siteContainerLg} max-w-3xl`}>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            LPA vs deputyship: the cost of leaving it too late
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
            If someone loses capacity without an LPA, their family cannot simply step in. Someone must apply
            to the Court of Protection to be appointed as a deputy. Compare the two routes:
          </p>
          <ul className="mt-5 space-y-3 text-base leading-relaxed text-neutral-600 sm:text-lg list-disc pl-6">
            <li><strong className="text-neutral-900">Cost:</strong> an LPA is £92 per document to register. A deputyship application costs £432 in court fees alone, typically plus professional costs, then an annual supervision fee of up to £320, plus a security bond premium for financial deputies, every year, for life.</li>
            <li><strong className="text-neutral-900">Time:</strong> an LPA is ready as soon as it is registered. A deputyship application commonly takes many months, during which bills may go unpaid and decisions sit in limbo.</li>
            <li><strong className="text-neutral-900">Control:</strong> with an LPA, you chose your attorneys and set the rules. With deputyship, the court decides who is appointed, and it may not be who you would have picked. Courts are also reluctant to grant personal welfare deputyships at all, so health decisions often stay with professionals rather than family.</li>
            <li><strong className="text-neutral-900">Ongoing burden:</strong> deputies file annual reports to the OPG and operate under continuing supervision. Attorneys have duties too, but the regime is far lighter.</li>
          </ul>
          <p className="mt-6 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Deputyship exists as a safety net and it works, but nobody who compares the two chooses it on
            purpose. It is what happens by default when an LPA was never made.
          </p>
        </div>
      </section>

      {/* Misconception */}
      <section className="border-t border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={`${siteContainerLg} max-w-3xl`}>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            The misconception that catches almost everyone: LPAs end at death
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
            This one matters enough to be blunt about. All powers of attorney end immediately at the moment
            of death. Lasting, enduring and ordinary powers alike.
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
            The instant the donor dies, the attorney&apos;s authority is extinguished. An attorney who keeps
            using the donor&apos;s bank card, even to pay for the funeral, even with the family&apos;s
            blessing, is acting without any legal authority. Banks freeze accounts once notified of the death
            for exactly this reason.
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
            From that point, the estate belongs to a different legal process entirely: the executors named in
            the will (or administrators under intestacy) take over, usually via probate. The registered LPA
            should be returned to the OPG, and the attorney&apos;s job is simply over, even if the attorney
            and the executor are the same person wearing a different hat.
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
            If you are dealing with this transition now, our{" "}
            <Link href="/probate" className="font-medium text-orange-700 underline underline-offset-4 hover:text-orange-800">
              probate guide
            </Link>{" "}
            explains what happens next.
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
            The flip side is also true and equally misunderstood: a will does nothing during your lifetime. A
            will covers after death; LPAs cover incapacity before it. A complete plan needs both, which is
            why specialists usually prepare them together. See our{" "}
            <Link href="/wills" className="font-medium text-orange-700 underline underline-offset-4 hover:text-orange-800">
              wills guide
            </Link>
            .
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
                The best time to sort an LPA was before you started wondering about it.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-neutral-300">
                The second-best time is this week. Work out which documents you need and what they will
                cost, then, if your situation needs tailored drafting, we will connect you with a vetted
                specialist who prepares LPAs alongside wills every day.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/contact" className={btnPrimary}>
                  See my LPA options and costs
                </Link>
                <Link href="/contact" className={btnOnTeal}>
                  Speak to a specialist
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
