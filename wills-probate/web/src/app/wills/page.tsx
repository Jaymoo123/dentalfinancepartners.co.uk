import type { Metadata } from "next";
import Link from "next/link";
import { btnOnTeal, btnPrimary, focusRing, siteContainerLg } from "@/components/ui/layout-utils";
import { LeadForm } from "@/components/forms/LeadForm";
import { toolPath } from "@/lib/calculators/registry";
import { buildFaqPageJsonLd } from "@/lib/faq-page-schema";

export const metadata: Metadata = {
  title: "Making a Will in the UK: Options, Costs and Pitfalls | Probate Compass",
  description:
    "Why a will matters, what happens without one, and an honest comparison of DIY, online and specialist will writing, with current 2026 rules and costs.",
};

const faqs = [
  {
    question: "Do I need a solicitor to make a will?",
    answer:
      "No. A will you write yourself is legal if properly signed and witnessed. Professional drafting is about reducing the risk of silent errors and handling complexity, not about legality.",
  },
  {
    question: "How much does it cost to make a will?",
    answer:
      "Roughly: DIY under £30, online services £30 to £150, professionally drafted wills £150 to £650 depending on complexity, at the time of writing. Trust based wills cost more.",
  },
  {
    question: "What happens to my estate if I die without a will?",
    answer:
      "The intestacy rules apply. A surviving spouse or civil partner takes personal possessions, the first £322,000 and half of the rest, with children taking the other half. Unmarried partners and stepchildren receive nothing automatically.",
  },
  {
    question: "Who can witness a will?",
    answer:
      "Any two independent adults with capacity who are physically present together when you sign. Beneficiaries and their spouses or civil partners must not witness, or they lose their inheritance under the will.",
  },
  {
    question: "Does marriage cancel my existing will?",
    answer:
      "Yes, in England and Wales marriage or civil partnership revokes an existing will unless it was expressly made in contemplation of that specific marriage. The rule is different in Scotland, where marriage does not revoke an existing will. Divorce in England and Wales does not revoke a will but treats the former spouse as having died before you for inheritance and executor purposes.",
  },
  {
    question: "Where should I keep my will?",
    answer:
      "Keep the signed original safe and findable: with the drafting firm, a will storage service, or HM Courts and Tribunals Service's storage facility. Tell your executors where it is. A will nobody can find is as bad as no will.",
  },
];

export default function WillsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqPageJsonLd(faqs)) }}
      />

      {/* Hero */}
      <section className="border-b border-neutral-200 bg-[#1e293b] py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="section-label mb-6">Wills</div>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Making a will: your options, what they cost, and when cheap becomes expensive.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300">
            Work out what your will needs to cover before anyone tries to sell you one. Our free checklist
            walks through every decision, from executors to guardians, in plain English.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={toolPath("making-a-will-checklist")} className={btnPrimary}>
              Start the making a will checklist
            </Link>
            <Link
              href="/contact"
              className={`inline-flex min-h-12 items-center justify-center border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-medium text-white hover:bg-white/20 transition-colors ${focusRing}`}
            >
              Get matched with a vetted will specialist
            </Link>
          </div>
        </div>
      </section>

      {/* Why a will matters */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={`${siteContainerLg} max-w-3xl`}>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            Why a will matters more than most people think
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Around half of UK adults do not have a will. Most of them assume one of two things: that
            everything will automatically go to their partner, or that their family will &ldquo;sort it
            out&rdquo;. Both assumptions fail more often than people expect, and the failures land on the
            people you most want to protect, at the worst possible time.
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
            A will is not really a document about money. It is the only legal mechanism you have to decide
            who inherits what, who manages the process, who looks after your children, and what happens to
            things the law would otherwise distribute by formula.
          </p>
        </div>
      </section>

      {/* Without a will */}
      <section className="border-t border-neutral-200 bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={`${siteContainerLg} max-w-3xl`}>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            What happens if you die without a will
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Die without a valid will and the intestacy rules decide everything. They are rigid, and they
            regularly produce results people would never have chosen:
          </p>
          <ul className="mt-5 space-y-3 text-base leading-relaxed text-neutral-600 sm:text-lg list-disc pl-6">
            <li><strong className="text-neutral-900">Married with children?</strong> Your spouse or civil partner receives your personal possessions, the first £322,000 of your estate (the statutory legacy), and half of anything above that. The other half goes to your children, even if your spouse needs it to stay in the family home.</li>
            <li><strong className="text-neutral-900">Unmarried partner?</strong> They receive nothing automatically, however long you have been together. &ldquo;Common law marriage&rdquo; has no legal status in England and Wales. An unmarried partner&apos;s only route is a court claim against the estate, which is slow, expensive and uncertain.</li>
            <li><strong className="text-neutral-900">No spouse, no children?</strong> The estate passes down a fixed list of relatives: parents, then siblings, and so on. Stepchildren you never adopted inherit nothing. If no qualifying relative exists, the estate passes to the Crown.</li>
            <li><strong className="text-neutral-900">Children under 18?</strong> A will is where you name guardians. Without one, the decision can end up with the family court.</li>
          </ul>
          <p className="mt-6 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Intestacy also decides who administers the estate, which can hand control to a relative you would
            never have picked.
          </p>
        </div>
      </section>

      {/* Three ways */}
      <section className="border-t border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={`${siteContainerLg} max-w-3xl`}>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            Your three ways to make a will, honestly compared
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
            There is no single right answer here. The right route depends on how complicated your life is,
            not on how much anyone wants to charge you.
          </p>
          <div className="mt-8 space-y-6">
            <div className="border border-neutral-200 border-l-4 border-l-orange-500 bg-neutral-50 p-6 sm:p-8">
              <h3 className="text-lg font-bold text-neutral-900">1. DIY will (free to around £30)</h3>
              <p className="mt-3 text-base leading-relaxed text-neutral-600">
                A stationery shop template or a handwritten will can be perfectly legal if it is properly
                signed and witnessed. For a single person with a simple estate leaving everything to one or
                two people, it can genuinely be enough.
              </p>
              <p className="mt-3 text-base leading-relaxed text-neutral-600">
                The catch is that DIY wills fail silently. Nobody checks your work, and the errors (a missing
                signature, a beneficiary acting as witness, an ambiguous phrase, a forgotten asset) only
                surface after you die, when they cannot be fixed. Contested or invalid DIY wills routinely
                cost estates thousands of pounds to untangle, dwarfing the saving.
              </p>
            </div>
            <div className="border border-neutral-200 border-l-4 border-l-orange-500 bg-neutral-50 p-6 sm:p-8">
              <h3 className="text-lg font-bold text-neutral-900">2. Online will services (roughly £30 to £150 for a single will)</h3>
              <p className="mt-3 text-base leading-relaxed text-neutral-600">
                Online services guide you through structured questions and generate a will from tested
                wording, which removes most drafting errors. Many include a review by a professional and
                optional annual updates. For couples with straightforward finances, mirror wills online are
                often good value.
              </p>
              <p className="mt-3 text-base leading-relaxed text-neutral-600">
                Check three things before you pay: whether a qualified person actually reviews your answers,
                what happens to your data and documents if the company disappears, and whether the service
                will simply tell you when your situation is too complex for its templates. The better ones
                do.
              </p>
            </div>
            <div className="border border-neutral-200 border-l-4 border-l-orange-500 bg-neutral-50 p-6 sm:p-8">
              <h3 className="text-lg font-bold text-neutral-900">3. Specialist drafted will (roughly £150 to £650 or more)</h3>
              <p className="mt-3 text-base leading-relaxed text-neutral-600">
                A professionally drafted will costs more because you are paying for judgement, not typing. A
                specialist will spot the issues you did not know you had, draft around them, and carry
                insurance if something is still wrong. Typical prices at the time of writing run from around
                £150 to £300 for a simple single will, £250 to £650 for mirror wills or moderately complex
                estates, and more where trusts are involved.
              </p>
              <p className="mt-3 text-base leading-relaxed text-neutral-600">
                Some charities also offer free will drafting schemes through participating firms, usually in
                the hope (not the requirement) of a legacy gift.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* When DIY is a false economy */}
      <section className="border-t border-neutral-200 bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={`${siteContainerLg} max-w-3xl`}>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            When DIY is a false economy
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Move straight to specialist help if any of these apply. These are the situations where cheap
            wills most often go wrong:
          </p>
          <ul className="mt-5 space-y-3 text-base leading-relaxed text-neutral-600 sm:text-lg list-disc pl-6">
            <li><strong className="text-neutral-900">Blended families.</strong> You want to provide for a current partner and children from a previous relationship. Getting this wrong disinherits someone; getting it right usually needs a trust structure, not a template.</li>
            <li><strong className="text-neutral-900">You own a business or farmland.</strong> Reliefs and succession need deliberate drafting.</li>
            <li><strong className="text-neutral-900">Assets abroad.</strong> Foreign property may be governed by foreign succession law, and some countries have forced heirship rules. You may need coordinated wills in more than one country.</li>
            <li><strong className="text-neutral-900">A beneficiary is vulnerable</strong> or receives means tested benefits. A direct gift can do more harm than good.</li>
            <li><strong className="text-neutral-900">You want to exclude someone</strong> who might expect to inherit. Certain people can claim against your estate, and exclusions need to be handled carefully to survive challenge.</li>
            <li>
              <strong className="text-neutral-900">Your estate may face inheritance tax.</strong> The will is one of the main levers for structuring what your family keeps. See our{" "}
              <Link href="/inheritance-tax" className="font-medium text-orange-700 underline underline-offset-4 hover:text-orange-800">
                inheritance tax guide
              </Link>{" "}
              for the thresholds.
            </li>
            <li><strong className="text-neutral-900">You have remarried.</strong> In England and Wales, marriage automatically revokes a previous will unless it was made in contemplation of that marriage (Scotland is different: marriage there does not revoke a will). Many people do not know this, and it silently reinstates intestacy.</li>
          </ul>
        </div>
      </section>

      {/* Validity */}
      <section className="border-t border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={`${siteContainerLg} max-w-3xl`}>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            What makes a will legally valid
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Whatever route you choose, the formalities are non-negotiable. In England and Wales a will is
            valid only if:
          </p>
          <ul className="mt-5 space-y-2 text-base leading-relaxed text-neutral-600 sm:text-lg list-disc pl-6">
            <li>It is in writing</li>
            <li>You are 18 or over and have mental capacity, making it freely</li>
            <li>You sign it (or someone signs at your direction, in your presence)</li>
            <li>Your signature is made or acknowledged in the presence of two witnesses, both present at the same time</li>
            <li>Both witnesses then sign in your presence</li>
          </ul>
          <p className="mt-6 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Two rules trip people up constantly. First, a beneficiary (or the spouse or civil partner of a
            beneficiary) must not act as a witness; the will stays valid, but that person&apos;s gift fails.
            Second, the will everyone relies on is the signed original, so store it somewhere findable, tell
            your executors where it is, and consider registering its location with the National Will
            Register.
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Scotland has its own rules on signing, witnessing and family &ldquo;legal rights&rdquo;, so take
            Scotland specific guidance if you live there.
          </p>
          <h3 className="mt-8 text-lg font-bold text-neutral-900">Keeping it alive</h3>
          <p className="mt-3 text-base leading-relaxed text-neutral-600 sm:text-lg">
            A will is not a one off. Review it after every major life event: marriage or civil partnership
            (which revokes it), divorce (which cancels gifts to the ex-spouse but does not revoke the will),
            a new child, a house move across borders, a significant inheritance, or the death of an executor
            or beneficiary. A quick review every three to five years catches the rest.
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
                Start with clarity, not a sales pitch.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-neutral-300">
                Work through the making a will checklist to map out exactly what your will needs to do. If
                your situation turns out to be simple, you will know a low cost route is safe. If it is not,
                we will connect you with a vetted will specialist who deals with situations like yours every
                week.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href={toolPath("making-a-will-checklist")} className={btnPrimary}>
                  Run the checklist
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
