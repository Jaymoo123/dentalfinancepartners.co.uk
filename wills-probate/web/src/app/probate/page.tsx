import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, btnSecondary, focusRing, siteContainerLg } from "@/components/ui/layout-utils";
import { LeadForm } from "@/components/forms/LeadForm";
import { toolPath } from "@/lib/calculators/registry";
import { buildFaqPageJsonLd } from "@/lib/faq-page-schema";

export const metadata: Metadata = {
  title: "Probate Explained: Costs, Timelines and Your Options | Probate Compass",
  description:
    "What probate is, when you need it, what a solicitor charges, and how to decide between DIY and professional help. Plain English, current 2026 figures.",
};

const faqs = [
  {
    question: "Do you legally need a solicitor for probate?",
    answer:
      "No. Anyone entitled to apply can do so themselves through GOV.UK. Professional help is optional and most valuable where there is inheritance tax, a business, foreign assets, no will, or family conflict.",
  },
  {
    question: "How much does a solicitor charge for probate?",
    answer:
      "Grant-only help typically costs £500 to £1,500 plus VAT. Full estate administration ranges from roughly £1,500 to £5,000 plus VAT for typical estates, and firms charging a percentage may take 1% to 5% of the estate value. Always get a written breakdown of how fees are calculated.",
  },
  {
    question: "How much is the probate application fee?",
    answer:
      "£526 for estates worth more than £5,000, in England and Wales (the fee rose from £300 on 13 July 2026). Estates of £5,000 or under pay nothing. Extra sealed copies of the grant are £2 each when ordered with the application.",
  },
  {
    question: "Do I need probate if there is a will?",
    answer:
      "Possibly. A will decides who inherits, but it does not remove the need for a grant. Whether you need probate depends on what the estate contains, mainly whether there is solely owned property or accounts above the banks' thresholds.",
  },
  {
    question: "Can I do probate myself and just pay for the tax forms?",
    answer:
      "Yes. Many specialists offer unbundled services, handling only the IHT400 or the grant application while you do the rest. It is often the best value option for confident executors of taxable estates.",
  },
  {
    question: "How long after death do you have to apply for probate?",
    answer:
      "There is no fixed deadline for the application itself, but if inheritance tax is due it must start being paid by the end of the sixth month after death, after which interest is charged. Practical pressures (a house to insure and sell, bills to pay) usually mean sooner is better.",
  },
];

export default function ProbatePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqPageJsonLd(faqs)) }}
      />

      {/* Hero */}
      <section className="border-b border-neutral-200 bg-[#1e293b] py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="section-label mb-6">Probate</div>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Probate, explained properly: what it is, what it costs and whether you need help.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300">
            Not sure whether the estate you are dealing with even needs probate? Answer a few quick questions
            and find out in under two minutes.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={toolPath("do-i-need-probate-checker")} className={btnPrimary}>
              Check if you need probate
            </Link>
            <Link
              href="/contact"
              className={`inline-flex min-h-12 items-center justify-center border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-medium text-white hover:bg-white/20 transition-colors ${focusRing}`}
            >
              Request a call from a vetted probate specialist
            </Link>
          </div>
        </div>
      </section>

      {/* What probate actually is */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={`${siteContainerLg} max-w-3xl`}>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            What probate actually is
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Probate is the legal process that gives someone the authority to deal with a person&apos;s money,
            property and possessions after they die. In England and Wales, that authority usually comes as a
            document called a grant of probate (where there is a will) or letters of administration (where
            there is not). Banks, HM Land Registry and other institutions will often refuse to release or
            transfer significant assets until they have seen it.
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
            If you have been named as an executor, or you are the closest relative of someone who died
            without a will, probate is likely to be your job. That can feel daunting in the middle of a
            bereavement. The good news is that the process itself is well defined, and for many estates it is
            genuinely manageable without paying anyone.
          </p>
        </div>
      </section>

      {/* When probate is needed */}
      <section className="border-t border-neutral-200 bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={`${siteContainerLg} max-w-3xl`}>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            When probate is needed (and when it is not)
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Probate is not always required. Broadly, you will usually need it when the person who died owned:
          </p>
          <ul className="mt-5 space-y-3 text-base leading-relaxed text-neutral-600 sm:text-lg list-disc pl-6">
            <li><strong className="text-neutral-900">Property or land in their sole name.</strong> A house cannot be sold or transferred without the grant.</li>
            <li><strong className="text-neutral-900">Bank or savings accounts above the provider&apos;s threshold.</strong> Each bank sets its own limit, typically somewhere between £5,000 and £50,000. Below that, many will release funds against a death certificate and a simple declaration.</li>
            <li><strong className="text-neutral-900">Shares, investments or Premium Bonds above similar thresholds.</strong></li>
          </ul>
          <p className="mt-6 text-base leading-relaxed text-neutral-600 sm:text-lg">
            You often will not need probate when everything was owned jointly with a surviving spouse or
            partner (joint assets usually pass automatically by survivorship), the estate is small and
            consists only of cash and personal possessions, or life insurance and pension death benefits are
            paid directly to a named beneficiary outside the estate.
          </p>
          <p className="mt-6 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Because every estate is a mix of these, the honest answer is &ldquo;it depends on what they owned
            and how they owned it&rdquo;. Our{" "}
            <Link href={toolPath("do-i-need-probate-checker")} className="font-medium text-orange-700 underline underline-offset-4 hover:text-orange-800">
              do I need probate checker
            </Link>{" "}
            walks through the asset by asset logic and gives you a clear steer before you spend anything.
          </p>
        </div>
      </section>

      {/* Do you need a solicitor */}
      <section className="border-t border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={`${siteContainerLg} max-w-3xl`}>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            Do you need a solicitor for probate?
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
            No. There is no legal requirement to use a solicitor for probate in England and Wales. Thousands
            of people complete the process themselves every year using the government&apos;s online service.
            The real question is not &ldquo;am I allowed to do this myself?&rdquo; but &ldquo;is this
            particular estate one I should do myself?&rdquo;
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="border border-neutral-200 border-l-4 border-l-orange-500 bg-neutral-50 p-6">
              <h3 className="text-lg font-bold text-neutral-900">When DIY probate is a sensible choice</h3>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-neutral-600 list-disc pl-5">
                <li>The estate is straightforward: a house, some bank accounts, no inheritance tax to pay.</li>
                <li>There is a clear, valid will and the executors agree with each other.</li>
                <li>All beneficiaries are adults, easy to find and on good terms.</li>
                <li>You have the time. Even a simple estate involves paperwork, valuations and chasing institutions.</li>
              </ul>
            </div>
            <div className="border border-neutral-200 border-l-4 border-l-orange-500 bg-neutral-50 p-6">
              <h3 className="text-lg font-bold text-neutral-900">When professional help earns its fee</h3>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-neutral-600 list-disc pl-5">
                <li><strong>Inheritance tax is due</strong>, or the estate is near the threshold. Executors are personally liable for mistakes on the IHT forms.</li>
                <li>The estate includes a business, farm or foreign assets.</li>
                <li>There is no will, and the intestacy rules produce a complicated or contentious result.</li>
                <li>Someone may challenge the will, or family relationships are strained.</li>
                <li>The estate is insolvent (debts exceed assets), where creditor order matters legally.</li>
                <li>Trusts are involved, either in the will or already existing.</li>
              </ul>
            </div>
          </div>
          <p className="mt-6 text-base leading-relaxed text-neutral-600 sm:text-lg">
            A useful middle path exists too: handling most of the legwork yourself and paying for help only
            with the technical parts, such as the inheritance tax account. Our{" "}
            <Link href={toolPath("probate-diy-vs-solicitor")} className="font-medium text-orange-700 underline underline-offset-4 hover:text-orange-800">
              DIY vs solicitor comparison tool
            </Link>{" "}
            scores your situation against these risk factors and shows what each route would typically cost
            for an estate like yours.
          </p>
        </div>
      </section>

      {/* What a specialist does */}
      <section className="border-t border-neutral-200 bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={`${siteContainerLg} max-w-3xl`}>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            What does a probate specialist actually do?
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
            If you do instruct a professional, here is what you are paying for:
          </p>
          <ul className="mt-5 space-y-2 text-base leading-relaxed text-neutral-600 sm:text-lg list-disc pl-6">
            <li>Identifying and valuing every asset and debt in the estate</li>
            <li>Preparing and submitting the inheritance tax account (IHT400 or the excepted estates route) to HMRC</li>
            <li>Applying for the grant of probate or letters of administration</li>
            <li>Collecting in the assets: closing accounts, selling or transferring property, cashing in investments</li>
            <li>Paying debts, funeral costs, taxes and expenses in the correct legal order</li>
            <li>Preparing estate accounts and distributing what remains to the beneficiaries</li>
            <li>Protecting the executor: placing statutory notices for unknown creditors, advising on personal liability, handling disputes</li>
          </ul>
          <p className="mt-6 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Some firms offer &ldquo;grant only&rdquo; services that cover just the application, leaving the
            administration to you. This is usually much cheaper and suits people who are comfortable with
            admin but want the legal filing done correctly.
          </p>
        </div>
      </section>

      {/* Costs */}
      <section className="border-t border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={`${siteContainerLg} max-w-3xl`}>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            What probate costs in 2026
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
            There are two layers of cost: the fixed fees everyone pays, and professional fees if you use
            help.
          </p>
          <h3 className="mt-8 text-lg font-bold text-neutral-900">Fixed costs</h3>
          <ul className="mt-4 space-y-2 text-base leading-relaxed text-neutral-600 sm:text-lg list-disc pl-6">
            <li><strong className="text-neutral-900">Probate application fee: £526</strong> for estates over £5,000 (up from £300 on 13 July 2026). Estates of £5,000 or less pay no application fee.</li>
            <li>Extra copies of the grant cost £2 each when ordered with the application (order several; every institution wants one). Copies ordered later cost more.</li>
            <li>Optional but sensible: statutory notices in The Gazette and a local paper, typically £100 to £200 combined, which protect executors from unknown creditor claims.</li>
          </ul>
          <h3 className="mt-8 text-lg font-bold text-neutral-900">Professional fees</h3>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Pricing models vary widely, which is exactly why it pays to compare:
          </p>
          <ul className="mt-4 space-y-2 text-base leading-relaxed text-neutral-600 sm:text-lg list-disc pl-6">
            <li><strong className="text-neutral-900">Fixed fee:</strong> common for grant only work, often £500 to £1,500 plus VAT. Full administration on a fixed fee might run from around £1,500 for a simple estate to £5,000 or more for a complex one.</li>
            <li><strong className="text-neutral-900">Hourly rate:</strong> typically £150 to £350 plus VAT per hour depending on seniority and location.</li>
            <li><strong className="text-neutral-900">Percentage of the estate:</strong> some firms charge 1% to 5% of the estate value, sometimes on top of hourly rates. On a £400,000 estate, 2% is £8,000. Always ask exactly how the fee is calculated and get it in writing.</li>
          </ul>
          <p className="mt-6 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Banks and some large providers also offer probate services; their percentage based pricing has
            historically been among the most expensive, so compare carefully before defaulting to a familiar
            brand.
          </p>
          <p className="mt-6 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Our{" "}
            <Link href={toolPath("probate-cost-calculator")} className="font-medium text-orange-700 underline underline-offset-4 hover:text-orange-800">
              probate cost calculator
            </Link>{" "}
            estimates the likely total for your estate across all three pricing models, so you can walk into
            any quote conversation knowing what &ldquo;reasonable&rdquo; looks like.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-t border-neutral-200 bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={`${siteContainerLg} max-w-3xl`}>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            How long probate takes
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Set expectations early, because this is the part that surprises most families:
          </p>
          <ul className="mt-5 space-y-3 text-base leading-relaxed text-neutral-600 sm:text-lg list-disc pl-6">
            <li><strong className="text-neutral-900">Before applying:</strong> gathering valuations and completing tax forms typically takes 4 to 12 weeks, longer if there is property or foreign assets to value.</li>
            <li><strong className="text-neutral-900">The grant itself:</strong> in the latest published HMCTS figures (January to March 2026), grants of probate took a mean of around 5 weeks from submission, with a median of just 1 week. What decides your wait is whether the application gets &ldquo;stopped&rdquo; for queries: those that were not stopped took about 2 weeks, while stopped ones took 14 weeks on average. Letters of administration run longer, around 11 weeks, or around 20 weeks with a will annexed. Waits vary quarter to quarter.</li>
            <li><strong className="text-neutral-900">Full administration:</strong> collecting assets, selling property and distributing the estate commonly takes 6 to 12 months in total. Estates with a property sale, an IHT bill or a dispute can run well beyond a year.</li>
          </ul>
          <p className="mt-6 text-base leading-relaxed text-neutral-600 sm:text-lg">
            A common rule of thumb is that executors should not distribute the estate within six months of
            the grant, because that is the window in which certain claims against the estate can be made.
            The{" "}
            <Link href={toolPath("probate-timeline-estimator")} className="font-medium text-orange-700 underline underline-offset-4 hover:text-orange-800">
              probate timeline estimator
            </Link>{" "}
            builds a realistic month by month picture from the specifics of your estate.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
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
                Get your numbers before you get quotes.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-neutral-300">
                Run the probate cost calculator and the timeline estimator to see what this estate should
                realistically cost and how long it should take. Then, if you decide you want help with some
                or all of it, tell us about the estate and we will connect you with a vetted probate
                specialist who quotes transparently.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href={toolPath("probate-cost-calculator")} className={btnPrimary}>
                  Estimate my probate costs
                </Link>
                <Link href={toolPath("probate-timeline-estimator")} className={btnSecondary}>
                  Estimate the timeline
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
