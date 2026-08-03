import type { Metadata } from "next";
import Link from "next/link";
import { btnOnTeal, btnPrimary, focusRing, siteContainerLg } from "@/components/ui/layout-utils";
import { LeadForm } from "@/components/forms/LeadForm";
import { toolPath } from "@/lib/calculators/registry";
import { buildFaqPageJsonLd } from "@/lib/faq-page-schema";

export const metadata: Metadata = {
  title: "Inheritance Tax Thresholds 2026/27: The Full Picture | Probate Compass",
  description:
    "UK inheritance tax explained: £325,000 nil-rate band, £175,000 residence band, the £1m couples figure, 40% and 36% rates, and the 2027 pension change.",
};

const faqs = [
  {
    question: "What is the inheritance tax threshold in the UK for 2026/27?",
    answer:
      "£325,000 per person, plus up to £175,000 of residence nil-rate band when a home passes to direct descendants. Unused allowances transfer between spouses and civil partners, giving many couples up to £1 million combined.",
  },
  {
    question: "What is the inheritance tax rate?",
    answer:
      "40% on the value above your available thresholds. It falls to 36% if at least 10% of the net estate is left to charity. Everything passing to a spouse or civil partner is exempt.",
  },
  {
    question: "Who pays inheritance tax, the estate or the beneficiaries?",
    answer:
      "The estate pays, handled by the executor or administrator, before the remainder is distributed. Beneficiaries do not pay UK inheritance tax on what they receive.",
  },
  {
    question: "When does inheritance tax have to be paid?",
    answer:
      "Payment must start by the end of the sixth month after the month of death, and interest runs after that. Tax on property can be spread over up to ten annual instalments.",
  },
  {
    question: "Are pensions subject to inheritance tax?",
    answer:
      "Mostly not under current rules, but from 6 April 2027 unused pension funds and most pension death benefits will count as part of the estate for IHT. Pensions passing to a spouse or civil partner remain exempt.",
  },
  {
    question: "How does the 7-year rule work on gifts?",
    answer:
      "Gifts you survive by seven years are free of IHT. If you die within seven years, the gift uses your nil-rate band first, and where tax is due on the gift itself, taper relief reduces it on a sliding scale from year three onwards.",
  },
];

export default function InheritanceTaxPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqPageJsonLd(faqs)) }}
      />

      {/* Hero */}
      <section className="border-b border-neutral-200 bg-[#1e293b] py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="section-label mb-6">Inheritance tax</div>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Inheritance tax in 2026/27: thresholds, rates, and the pension change everyone needs to know
            about.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300">
            Would your estate actually pay inheritance tax? Most estates do not, but the ones that do are
            often surprised. Get your number in two minutes.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={toolPath("iht-threshold-calculator")} className={btnPrimary}>
              Use the IHT threshold calculator
            </Link>
            <Link
              href="/contact"
              className={`inline-flex min-h-12 items-center justify-center border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-medium text-white hover:bg-white/20 transition-colors ${focusRing}`}
            >
              Talk to a vetted estate planning specialist
            </Link>
          </div>
        </div>
      </section>

      {/* Thresholds */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={`${siteContainerLg} max-w-3xl`}>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            The thresholds, in plain English
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Inheritance tax (IHT) is charged on the value of what you leave behind, but only above certain
            tax-free allowances. For the 2026/27 tax year:
          </p>
          <ul className="mt-5 space-y-3 text-base leading-relaxed text-neutral-600 sm:text-lg list-disc pl-6">
            <li><strong className="text-neutral-900">Nil-rate band: £325,000.</strong> Every estate gets this. Nothing below it is taxed.</li>
            <li><strong className="text-neutral-900">Residence nil-rate band (RNRB): up to £175,000 extra</strong>, available when you leave a home (or the proceeds of one you downsized from) to your children, grandchildren or other direct descendants.</li>
            <li><strong className="text-neutral-900">Anything unused transfers to a surviving spouse or civil partner.</strong> This is what produces the widely quoted figure: a married couple leaving the family home to their children can pass on up to £1 million tax free (£325,000 + £175,000, doubled).</li>
          </ul>
          <p className="mt-6 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Both bands have been frozen for years and remain frozen, which is why rising house prices keep
            pulling ordinary family estates into scope. The freeze, which also covers the £2 million taper
            threshold, is currently legislated to run to the end of the 2030/31 tax year, so 5 April 2031.
          </p>
          <h3 className="mt-8 text-lg font-bold text-neutral-900">The £2 million taper</h3>
          <p className="mt-3 text-base leading-relaxed text-neutral-600 sm:text-lg">
            The residence nil-rate band shrinks for larger estates. For every £2 that your estate exceeds £2
            million, the RNRB reduces by £1. At £2.35 million it is gone entirely for a single person (£2.7
            million for a couple&apos;s combined bands). The taper is measured against your estate before
            most reliefs, which becomes especially important from 2027 (see below).
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
            The RNRB also only works if the home passes to direct descendants: children, stepchildren,
            adopted or foster children, and their children. Leaving everything to nieces and nephews, or to a
            friend, means the estate falls back on the £325,000 band alone.
          </p>
        </div>
      </section>

      {/* Rates */}
      <section className="border-t border-neutral-200 bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={`${siteContainerLg} max-w-3xl`}>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            The rates: 40% and 36%
          </h2>
          <ul className="mt-5 space-y-3 text-base leading-relaxed text-neutral-600 sm:text-lg list-disc pl-6">
            <li>The standard rate is <strong className="text-neutral-900">40%</strong> on the value above your available thresholds.</li>
            <li>A reduced rate of <strong className="text-neutral-900">36%</strong> applies to estates that leave at least 10% of their net estate to charity. On some estates this drops the tax bill by enough that the charity&apos;s gift costs the family relatively little. Gifts to charity are also entirely free of IHT themselves.</li>
            <li>Anything left to a <strong className="text-neutral-900">spouse or civil partner</strong> is exempt entirely, at any value.</li>
          </ul>
          <p className="mt-6 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Worked example: a single person leaves a £600,000 estate, including a £300,000 house, to their
            two children. Thresholds: £325,000 + £175,000 (capped at the £175,000 maximum since the house
            exceeds it) = £500,000. Taxable: £100,000. Tax at 40%: <strong className="text-neutral-900">£40,000</strong>.
          </p>
        </div>
      </section>

      {/* Who pays and when */}
      <section className="border-t border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={`${siteContainerLg} max-w-3xl`}>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            Who actually pays, and when
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
            IHT is paid by the estate, not by individual beneficiaries, and it is usually the executor&apos;s
            job to calculate and pay it. Two deadlines matter:
          </p>
          <ul className="mt-5 space-y-3 text-base leading-relaxed text-neutral-600 sm:text-lg list-disc pl-6">
            <li>Payment must <strong className="text-neutral-900">start by the end of the sixth month</strong> after the month of death. After that, HMRC charges interest.</li>
            <li>The tax on property and certain other assets can be paid in <strong className="text-neutral-900">annual instalments over up to ten years</strong>, useful when the estate is a house with little cash, though interest applies.</li>
          </ul>
          <p className="mt-6 text-base leading-relaxed text-neutral-600 sm:text-lg">
            A practical wrinkle: tax is generally due before the grant of probate is issued, which is exactly
            when the estate&apos;s money is hardest to reach. The Direct Payment Scheme lets banks pay HMRC
            straight from the deceased&apos;s accounts, and executors sometimes bridge the gap by other
            means. This chicken and egg problem is one of the most common reasons executors of taxable
            estates seek help; our{" "}
            <Link href="/probate" className="font-medium text-orange-700 underline underline-offset-4 hover:text-orange-800">
              probate guide
            </Link>{" "}
            covers the mechanics.
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Beneficiaries may separately face other taxes later (for example capital gains tax if an
            inherited asset grows in value before they sell it), but there is no UK &ldquo;inheritance
            tax&rdquo; charged on recipients personally.
          </p>
        </div>
      </section>

      {/* Pension change */}
      <section className="border-t border-neutral-200 bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={`${siteContainerLg} max-w-3xl`}>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            Pensions join the estate from 6 April 2027
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
            This is the biggest change to inheritance tax in a generation, and it deserves its own section.
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Under current rules, most unused pension pots and many pension death benefits sit outside your
            estate for IHT. That has made pensions a standard way to pass wealth on tax free, and many people
            have deliberately spent other savings first to preserve their pension for their children.
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
            <strong className="text-neutral-900">From 6 April 2027, unused pension funds and most pension death benefits will be included in the estate for inheritance tax.</strong> In practice this means:
          </p>
          <ul className="mt-5 space-y-3 text-base leading-relaxed text-neutral-600 sm:text-lg list-disc pl-6">
            <li>Estates that are comfortably below the threshold today may be pushed <strong className="text-neutral-900">over</strong> it once a pension pot is added in.</li>
            <li>The <strong className="text-neutral-900">£2 million RNRB taper</strong> will bite harder: adding a pension to the estate can shrink or wipe out the residence band, a double hit families do not see coming.</li>
            <li><strong className="text-neutral-900">Beneficiaries can still be taxed twice</strong> in some cases: IHT on the pot, then income tax on withdrawals where the member died at 75 or over.</li>
            <li><strong className="text-neutral-900">Personal representatives will be liable for reporting and paying the IHT</strong> on unused pension funds, not the pension schemes, and estates with pensions will take longer to administer.</li>
            <li>Death in service benefits paid from registered pension schemes are <strong className="text-neutral-900">excluded</strong> from the new rules.</li>
          </ul>
          <p className="mt-6 text-base leading-relaxed text-neutral-600 sm:text-lg">
            HMRC&apos;s own estimate (July 2025) is that around 10,500 estates a year will become liable for
            inheritance tax for the first time because of this change, and a further 38,500 estates that
            would already pay some IHT will pay more, on average around £34,000 more.
          </p>
          <p className="mt-6 text-base leading-relaxed text-neutral-600 sm:text-lg">
            The spouse exemption still applies, so pensions passing to a surviving spouse or civil partner
            remain tax free; the impact lands mainly when wealth passes to children.
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
            If you have meaningful pension savings, the planning assumptions you (or your adviser) made
            before this change may now be exactly backwards. Our{" "}
            <Link href={toolPath("pensions-iht-2027-estimator")} className="font-medium text-orange-700 underline underline-offset-4 hover:text-orange-800">
              pensions IHT 2027 estimator
            </Link>{" "}
            shows what your combined estate looks like under the new rules, side by side with today&apos;s.
          </p>
        </div>
      </section>

      {/* Planning basics */}
      <section className="border-t border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={`${siteContainerLg} max-w-3xl`}>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            Planning basics that do not require buying anything
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
            None of the following is advice for your specific situation, but these are the standard,
            long-established building blocks of reducing an IHT bill:
          </p>
          <ul className="mt-5 space-y-3 text-base leading-relaxed text-neutral-600 sm:text-lg list-disc pl-6">
            <li><strong className="text-neutral-900">Annual exemption: £3,000 per year</strong> in gifts, carried forward one year if unused. A couple who both use it and the carry-forward can move £12,000 in one year.</li>
            <li><strong className="text-neutral-900">Small gifts:</strong> up to £250 per person per year, to any number of people (not combinable with the £3,000 for the same recipient).</li>
            <li><strong className="text-neutral-900">Wedding gifts:</strong> £5,000 to a child, £2,500 to a grandchild, £1,000 to anyone else.</li>
            <li><strong className="text-neutral-900">Regular gifts out of surplus income</strong> are exempt without limit, provided they are genuinely regular and do not reduce your standard of living. Keep records.</li>
            <li><strong className="text-neutral-900">The seven-year rule:</strong> larger gifts fall out of your estate entirely if you survive seven years. Between years three and seven, taper relief reduces the tax on the gift (not on the rest of the estate). Gifts within seven years also use up your nil-rate band first.</li>
            <li><strong className="text-neutral-900">Charitable gifts</strong> are exempt, and 10% of the net estate triggers the 36% rate.</li>
            <li>
              <strong className="text-neutral-900">A well-structured will</strong> matters: the RNRB, the spouse exemption and the transferable bands all depend on where assets actually go. See our{" "}
              <Link href="/wills" className="font-medium text-orange-700 underline underline-offset-4 hover:text-orange-800">
                wills guide
              </Link>
              .
            </li>
          </ul>
          <p className="mt-6 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Beyond these basics sit trusts, business and agricultural reliefs and life insurance written in
            trust, which are situation specific and worth discussing with a specialist rather than reading
            about in the abstract.
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
                Stop guessing about a five-figure tax bill.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-neutral-300">
                Run the IHT threshold calculator to see your estate against the 2026/27 allowances, then the
                pensions IHT 2027 estimator to see how the April 2027 change moves your number. If the result
                worries you, we will connect you with a vetted estate planning specialist who can look at the
                whole picture.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href={toolPath("iht-threshold-calculator")} className={btnPrimary}>
                  Calculate my IHT position
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
