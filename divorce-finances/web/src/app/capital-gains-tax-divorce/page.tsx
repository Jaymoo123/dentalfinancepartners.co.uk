import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, btnSecondary, focusRing, siteContainerLg } from "@/components/ui/layout-utils";
import { LeadForm } from "@/components/forms/LeadForm";
import { toolPath } from "@/lib/calculators/registry";
import { buildFaqPageJsonLd } from "@/lib/faq-page-schema";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Capital Gains Tax on Divorce: When It Applies and the Reliefs | ${siteConfig.name}`,
  description:
    "How capital gains tax works when separating couples transfer property, shares and other assets. The no gain no loss rule, the three-year window, the family home reliefs, and when a tax bill actually lands. Current 2026/27 figures, verified against gov.uk.",
  alternates: { canonical: `${siteConfig.url}/capital-gains-tax-divorce` },
};

const faqs = [
  {
    question: "Do you pay capital gains tax when transferring assets in a divorce?",
    answer:
      "Often not, but it depends on timing and what the asset is. Transfers between spouses or civil partners happen at no gain and no loss, which means no capital gains tax at the point of transfer. Since 6 April 2023 that treatment continues for up to three tax years after you stop living together, and with no time limit at all where the transfer is made under a formal divorce or separation agreement or a court order. Outside those windows, or where an asset is sold rather than transferred, a gain can become taxable.",
  },
  {
    question: "Is the family home subject to capital gains tax on divorce?",
    answer:
      "Usually not, because your only or main home normally qualifies for Private Residence Relief. Complications arise when one person has moved out well before the home is sold. HMRC lets the spouse who left choose to treat the period after they stopped living there as if it were still their main residence, where the sale happens under a formal divorce or separation agreement or court order. There is also relief where you transfer your share to your ex now but keep the right to a slice of the proceeds when the home is later sold.",
  },
  {
    question: "When does capital gains tax actually bite in a divorce?",
    answer:
      "The typical triggers are assets that are not the main home: a buy to let or second property, a shareholding or investment portfolio, a stake in a business, or crypto. Tax can also arise when a transfer falls outside the no gain no loss windows, for example a transfer made more than three tax years after separation without a formal agreement or court order in place, or when an asset is sold on the open market rather than moved between the two of you.",
  },
  {
    question: "What is the capital gains tax allowance for 2026/27?",
    answer:
      "The annual exempt amount is £3,000 per person for 2026/27, per gov.uk. Gains above that are taxed at 18% for the part that falls within your remaining basic-rate income band and 24% above it, and those rates apply to residential property and to other assets from 6 April 2026.",
  },
  {
    question: "How long do I have to transfer assets tax-free after separating?",
    answer:
      "Up to the end of the third tax year after the tax year in which you stopped living together, or the date the court grants the divorce or dissolution if that is earlier. Beyond that, no gain no loss treatment still applies with no time limit where the transfer is made under a formal divorce or separation agreement or a court order. Getting the paperwork done inside a window matters, and it is one of the main reasons to take specialist advice early.",
  },
  {
    question: "Do I have to report and pay the tax straight away?",
    answer:
      "For a taxable gain on UK residential property you generally have to report it and pay the tax within 60 days of completion, through HMRC's online service, separately from your normal Self Assessment return. Gains on other assets are usually reported through Self Assessment. Deadlines are strict and penalties apply, so this is worth checking before you complete a sale or transfer.",
  },
];

export default function CapitalGainsTaxDivorcePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqPageJsonLd(faqs)) }}
      />

      {/* Hero */}
      <section className="border-b border-neutral-200 bg-[#1e293b] py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="section-label mb-6">Capital gains tax on divorce</div>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Capital gains tax on divorce: when it applies, and the reliefs that stop it.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300">
            Dividing property, shares or a business when a marriage ends can create a tax bill that
            neither person saw coming, or none at all, depending entirely on how and when it is done.
            Here is how the rules work, in plain English, so you know the questions to ask before you
            sign anything.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className={btnPrimary}>
              Speak to a specialist about your situation
            </Link>
            <Link
              href={toolPath("settlement-range-estimator")}
              className={`inline-flex min-h-12 items-center justify-center border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-medium text-white hover:bg-white/20 transition-colors ${focusRing}`}
            >
              Estimate a settlement range
            </Link>
          </div>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-neutral-400">
            This page is general information, not tax advice. Every figure here is checked against
            gov.uk and HMRC guidance, with the sources listed at the foot of the page.
          </p>
        </div>
      </section>

      {/* The starting point */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={`${siteContainerLg} max-w-3xl`}>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            The starting point: spouses transfer at no gain, no loss
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
            While a married couple or civil partners are living together, assets can move between them
            at &ldquo;no gain, no loss&rdquo;. In plain terms, the transfer is treated as happening at
            a value that produces neither a taxable gain nor a loss for the person giving the asset
            up. The person receiving it simply inherits the original base cost, and any gain is only
            measured later, if and when they eventually dispose of it.
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
            That is why, in an intact marriage, shuffling assets between the two of you has no capital
            gains tax consequence. Divorce and separation matter because they change how long this
            protective treatment lasts. Get the timing right and most transfers pass without tax. Get
            it wrong and a transfer can be treated as a disposal at open market value, with tax due on
            a gain you never turned into cash.
          </p>
        </div>
      </section>

      {/* What changes when you separate */}
      <section className="border-t border-neutral-200 bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={`${siteContainerLg} max-w-3xl`}>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            What changes when you separate
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
            The rules were made much more forgiving for anyone separating on or after 6 April 2023.
            Before that date, the no gain, no loss treatment effectively ran out at the end of the tax
            year in which you stopped living together, which could leave couples just weeks to
            restructure everything or face a tax charge. That cliff edge is gone. Two windows now
            apply:
          </p>
          <ul className="mt-5 space-y-3 text-base leading-relaxed text-neutral-600 sm:text-lg list-disc pl-6">
            <li>
              <strong className="text-neutral-900">A three-year window.</strong> You can transfer
              assets between you at no gain or loss at any time up to the earlier of the end of the
              third tax year after the one in which you stopped living together, or the date on which
              the court grants the divorce, annulment or dissolution. So a couple who separate in,
              say, August 2026 have until 5 April 2030 (or the date of the final order if sooner) to
              move assets across without triggering a charge.
            </li>
            <li>
              <strong className="text-neutral-900">Unlimited time under a formal agreement.</strong>{" "}
              Where transfers are made in accordance with a formal divorce or separation agreement or
              a court order, the no gain, no loss treatment applies with no time limit at all. In
              practice this usually means the transfers set out in a consent order or a financial
              remedy order approved by the court.
            </li>
          </ul>
          <p className="mt-6 text-base leading-relaxed text-neutral-600 sm:text-lg">
            The practical takeaway is simple: the sooner a settlement is documented, and the more it is
            wrapped into a formal order, the more room you have to divide assets without an avoidable
            tax bill. It is one reason financial settlements and tax planning are best handled
            together rather than in sequence.
          </p>
        </div>
      </section>

      {/* The family home */}
      <section className="border-t border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={`${siteContainerLg} max-w-3xl`}>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            The family home: usually protected, but watch the gaps
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
            For most couples the family home is the biggest asset, and the good news is that your only
            or main home normally qualifies for Private Residence Relief, which removes the gain from
            capital gains tax altogether. The awkward cases are where one person moves out long before
            the property is sold or transferred, because the months or years they were away could
            otherwise expose part of the gain. The rules deal with this in two ways:
          </p>
          <ul className="mt-5 space-y-3 text-base leading-relaxed text-neutral-600 sm:text-lg list-disc pl-6">
            <li>
              <strong className="text-neutral-900">If you moved out and keep an interest.</strong> The
              spouse or civil partner who has left can choose to treat the period after they stopped
              living in the home as if it had still been their only or main residence, where the sale
              is made under a formal divorce or separation agreement or a court order. That keeps
              Private Residence Relief running over the period of absence.
            </li>
            <li>
              <strong className="text-neutral-900">If you transfer your share now but wait for the
              money.</strong> Where you hand your interest in the former home to your ex now but keep
              the right to a share of the proceeds when it is eventually sold, that later receipt can
              still attract Private Residence Relief, in the same proportion that relief applied to
              the original transfer. This covers the common &ldquo;you stay in the house with the
              children, I take my share when it sells&rdquo; arrangement.
            </li>
          </ul>
          <p className="mt-6 text-base leading-relaxed text-neutral-600 sm:text-lg">
            These reliefs are valuable but not automatic in every case, and they hinge on the wording
            of your agreement and on choices that have to be made correctly. It is exactly the kind of
            detail where a short conversation with a specialist before signing pays for itself.
          </p>
        </div>
      </section>

      {/* When CGT actually bites */}
      <section className="border-t border-neutral-200 bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={`${siteContainerLg} max-w-3xl`}>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            When a tax bill actually lands
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
            If the main home is covered and transfers are done inside the windows above, many divorces
            settle with little or no capital gains tax. The charge tends to appear around the assets
            that sit outside main-home relief, or where timing has slipped:
          </p>
          <ul className="mt-5 space-y-3 text-base leading-relaxed text-neutral-600 sm:text-lg list-disc pl-6">
            <li><strong className="text-neutral-900">Buy to let and second properties.</strong> These do not get Private Residence Relief, so the built-up gain is in charge when they are sold or when a transfer falls outside no gain, no loss treatment.</li>
            <li><strong className="text-neutral-900">Shares, funds and investment portfolios.</strong> Splitting or selling holdings can crystallise gains, particularly where they have grown a lot since purchase.</li>
            <li><strong className="text-neutral-900">Business assets and company shares.</strong> A stake in a trading company or a share of a partnership can carry a significant gain, though reliefs such as Business Asset Disposal Relief may apply in the right circumstances.</li>
            <li><strong className="text-neutral-900">Cryptoassets and other chargeable assets.</strong> HMRC treats these like other investments for capital gains, and values can be volatile at exactly the wrong moment.</li>
            <li><strong className="text-neutral-900">Transfers made too late.</strong> A transfer more than three tax years after separation, with no formal agreement or court order behind it, can be treated as a disposal at market value with tax due even though no money changed hands.</li>
          </ul>
          <p className="mt-6 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Where a gain is taxable, the annual exempt amount for 2026/27 is £3,000 per person, per
            gov.uk. Above that, gains are taxed at 18% to the extent they fall within your remaining
            basic-rate income band and 24% above it, and from 6 April 2026 those same rates apply to
            residential property and to other assets alike. Two people dividing an asset each have
            their own £3,000 allowance, which is one reason how an asset is split, and who ends up
            selling it, can change the overall bill.
          </p>
        </div>
      </section>

      {/* Practical framing */}
      <section className="border-t border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={`${siteContainerLg} max-w-3xl`}>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            Getting it right: valuations, timing and reporting
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Three things make the difference between a clean settlement and an expensive surprise:
          </p>
          <ul className="mt-5 space-y-3 text-base leading-relaxed text-neutral-600 sm:text-lg list-disc pl-6">
            <li><strong className="text-neutral-900">Valuations.</strong> Gains are measured against a base cost and a value at transfer or sale. Sensible, defensible valuations, especially for property and private company shares, are the foundation of the whole calculation.</li>
            <li><strong className="text-neutral-900">Timing.</strong> When you separate, when you document the agreement, and when assets actually move all interact with the windows above. A transfer that would be tax-free in one month can be taxable in another.</li>
            <li><strong className="text-neutral-900">Reporting.</strong> A taxable gain on UK residential property generally has to be reported and paid within 60 days of completion through HMRC's dedicated service, separate from Self Assessment. Missing that deadline brings penalties even where the tax itself is modest.</li>
          </ul>
          <p className="mt-6 text-base leading-relaxed text-neutral-600 sm:text-lg">
            This page sets out the framework, but the numbers turn on your specific assets, base costs
            and dates, and small differences change the answer. If your split involves a rental
            property, investments or a business, it is worth having someone run your actual figures
            before you commit to who takes what. Our{" "}
            <Link href={toolPath("settlement-range-estimator")} className="font-medium text-orange-700 underline underline-offset-4 hover:text-orange-800">
              settlement range estimator
            </Link>{" "}
            and{" "}
            <Link href={toolPath("divorce-cost-calculator")} className="font-medium text-orange-700 underline underline-offset-4 hover:text-orange-800">
              divorce cost calculator
            </Link>{" "}
            help you frame the wider financial picture, and a specialist can pressure-test the tax
            before anything is signed.
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

      {/* Sources */}
      <section className="border-t border-neutral-200 bg-white py-10 sm:py-12">
        <div className={`${siteContainerLg} max-w-3xl`}>
          <h2 className="text-lg font-bold text-neutral-900">Sources</h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-500">
            Figures and rules on this page are taken from primary HMRC and gov.uk guidance, current at
            July 2026:
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-neutral-500 list-disc pl-5">
            <li>
              No gain no loss rule, the three-year window, formal-agreement transfers and the family-home
              reliefs:{" "}
              <a
                href="https://www.gov.uk/government/publications/husband-and-wife-civil-partners-divorce-dissolution-and-separation-hs281-self-assessment-helpsheet/hs281-capital-gains-tax-civil-partners-and-spouses-2026"
                className="underline underline-offset-2 hover:text-neutral-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                HMRC helpsheet HS281, Capital Gains Tax, civil partners and spouses (2026)
              </a>
              .
            </li>
            <li>
              Annual exempt amount of £3,000:{" "}
              <a
                href="https://www.gov.uk/capital-gains-tax/allowances"
                className="underline underline-offset-2 hover:text-neutral-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                gov.uk, Capital Gains Tax allowances
              </a>
              .
            </li>
            <li>
              18% and 24% rates from 6 April 2026:{" "}
              <a
                href="https://www.gov.uk/capital-gains-tax/rates"
                className="underline underline-offset-2 hover:text-neutral-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                gov.uk, Capital Gains Tax rates
              </a>
              .
            </li>
            <li>
              60-day reporting for UK residential property gains:{" "}
              <a
                href="https://www.gov.uk/capital-gains-tax/report-and-pay-capital-gains-tax"
                className="underline underline-offset-2 hover:text-neutral-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                gov.uk, report and pay Capital Gains Tax
              </a>
              .
            </li>
          </ul>
        </div>
      </section>

      {/* Closing CTA + lead form */}
      <section className="border-t border-neutral-200 bg-[#1e293b] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div className="section-label mb-6">Get started</div>
              <h2 className="text-2xl font-bold text-white sm:text-4xl">
                Check the tax before you agree who takes what.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-neutral-300">
                Capital gains tax on divorce turns on your exact assets, base costs and dates, so it is
                one part of a settlement that genuinely needs bespoke advice. Tell us about your
                situation and we will connect you with a vetted specialist who can run your real numbers
                and flag any charge before it is locked into an order.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href={toolPath("settlement-range-estimator")} className={btnPrimary}>
                  Estimate a settlement range
                </Link>
                <Link href={toolPath("divorce-cost-calculator")} className={btnSecondary}>
                  Estimate divorce costs
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
