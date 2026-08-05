import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CTASection } from "@/components/ui/CTASection";
import { btnPrimary, btnSecondary, siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";

const PAGE_PATH = "/section-24";
const TITLE = "Section 24 Explained: Mortgage Interest Relief for Landlords | Property Tax Partners";
const DESCRIPTION =
  "How Section 24 restricts landlord mortgage interest relief, the 20% tax reducer now and 22% from April 2027, who it hits, worked examples and the ways to cut the cost.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${siteConfig.url}${PAGE_PATH}` },
  openGraph: {
    title: "Section 24 Explained: Mortgage Interest Relief for Landlords",
    description: DESCRIPTION,
    url: `${siteConfig.url}${PAGE_PATH}`,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Section 24 Explained: Mortgage Interest Relief for Landlords",
    description: DESCRIPTION,
  },
};

const whoItHits = [
  {
    title: "Higher and additional-rate taxpayers",
    body: "If your total income takes you past £50,270, you pay 40% or 45% on the top of your rental profit but only get relief on finance costs at 20%. That 20 to 25 point gap is the whole of Section 24. From April 2027 the gap narrows to 18 or 23 points as the reducer rises to 22%.",
  },
  {
    title: "Leveraged portfolios on interest-only debt",
    body: "The pain scales with the size of your mortgage interest bill, not with your profit. A landlord on 75% loan to value with interest-only borrowing can show a taxable profit far larger than the cash actually reaching the bank account.",
  },
  {
    title: "Landlords sitting just under a threshold",
    body: "Section 24 inflates the taxable profit HMRC sees, so it drags people over the £50,270 higher-rate threshold, over the £60,000 high income child benefit charge point, and into the £100,000 to £125,140 band where the personal allowance tapers away at an effective 60%.",
  },
  {
    title: "Furnished holiday let owners, since April 2025",
    body: "The furnished holiday lettings regime was abolished from 6 April 2025. Full interest deduction went with it, so holiday lets held personally now sit inside the same finance cost restriction as ordinary buy-to-lets.",
  },
];

const notAffected = [
  {
    title: "Limited companies",
    body: "A company letting residential property deducts mortgage interest in full as a business expense against corporation tax. This is the single biggest reason landlords look at incorporation.",
  },
  {
    title: "Commercial and mixed-use property",
    body: "The restriction applies to residential lettings. Interest on a loan funding commercial premises stays fully deductible, and a mixed-use building needs a fair apportionment between the two.",
  },
  {
    title: "Basic-rate taxpayers with headroom",
    body: "If every pound of your income stays inside the 20% band, relief at 20% matches the rate you pay and the restriction costs you nothing. The risk is that the restricted profit itself pushes you out of that band.",
  },
  {
    title: "Loans that are not finance costs",
    body: "Letting agent fees, repairs, insurance, ground rent, service charges and accountancy remain fully deductible in the normal way. Only interest, and incidental costs of raising finance such as arrangement fees, are restricted.",
  },
];

const faqs = [
  {
    question: "What is Section 24?",
    answer:
      "Section 24 of the Finance (No. 2) Act 2015 removed the ability of individual landlords to deduct residential mortgage interest and other finance costs from rental income. Instead you get a basic rate tax reducer worth 20% of the finance costs, cut from your final tax bill. It phased in between April 2017 and April 2020 and has applied in full since the 2020/21 tax year.",
  },
  {
    question: "What is the Section 24 tax reducer worth in 2026/27?",
    answer:
      "20% of your allowable finance costs, applied as a credit against your income tax liability. From April 2027 the reducer rises to 22% under Finance Act 2026, which was enacted on 18 March 2026. The reducer is capped at 20% of the lowest of your finance costs, your property profits, and your adjusted total income above the personal allowance.",
  },
  {
    question: "Does Section 24 apply to limited companies?",
    answer:
      "No. Companies deduct mortgage interest in full against rental profits before corporation tax. This is why incorporation is the most common structural response to Section 24, although the transfer itself can trigger capital gains tax and stamp duty land tax.",
  },
  {
    question: "How does Section 24 affect basic-rate taxpayers?",
    answer:
      "If all your income stays within the basic rate band, relief at 20% equals the rate you pay and there is no extra cost. The trap is that adding back the interest inflates your taxable profit, so landlords who were comfortably basic rate on a real-world profit can be pushed into the higher rate band on a restricted one.",
  },
  {
    question: "Is Section 24 being repealed or reversed?",
    answer:
      "No repeal has been announced. Finance Act 2026 raises the reducer from 20% to 22% from April 2027, which softens the effect for higher-rate taxpayers but keeps the mechanism intact. Plan on the restriction staying, not on it being withdrawn.",
  },
  {
    question: "What happens if my finance costs are more than my rental profit?",
    answer:
      "The reducer is capped, so relief for the excess is not lost but carried forward to future tax years and used when there is enough profit to absorb it. Landlords with loss-making years often accumulate a carried-forward pool of unrelieved finance costs, which is worth tracking, since it can be worth real money once profits recover.",
  },
  {
    question: "Can I transfer property to my spouse to reduce Section 24 tax?",
    answer:
      "Often, yes. Transfers between spouses and civil partners are treated as no gain, no loss for capital gains tax, so moving income to a lower-earning partner can shift rental profit out of the higher rate band. Jointly held property is taxed 50/50 by default, and a different split needs both beneficial ownership evidence and a Form 17 election filed with HMRC within 60 days.",
  },
  {
    question: "Do pension contributions help with Section 24?",
    answer:
      "They can. A personal pension contribution extends your basic rate band by the gross amount, so profit that would have been taxed at 40% can fall back into the 20% band. It does not change the finance cost restriction itself, it changes the rate applied to the profit sitting above the threshold.",
  },
  {
    question: "Does Section 24 apply to holiday lets?",
    answer:
      "Yes, for periods from 6 April 2025. The furnished holiday lettings regime was abolished, and with it the full interest deduction that holiday let owners previously enjoyed. Holiday lets held in your own name now fall inside the same restriction as standard residential lettings.",
  },
  {
    question: "How do I report the Section 24 reducer on my tax return?",
    answer:
      "Residential finance costs go in the dedicated box on the UK property pages of your Self Assessment return, not in the allowable expenses boxes. HMRC then calculates the reducer automatically. Putting the interest in the wrong box overstates your expenses and understates your profit, which is a common source of amendments and enquiries.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${siteConfig.url}${PAGE_PATH}#article`,
      headline: "Section 24 explained: mortgage interest relief for landlords",
      description: DESCRIPTION,
      mainEntityOfPage: `${siteConfig.url}${PAGE_PATH}`,
      inLanguage: "en-GB",
      about: { "@type": "Thing", name: "Section 24 finance cost restriction" },
      publisher: {
        "@type": "Organization",
        "@id": `${siteConfig.url}#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        areaServed: { "@type": "Country", name: "United Kingdom" },
      },
      author: {
        "@type": "Organization",
        "@id": `${siteConfig.url}#organization`,
        name: siteConfig.name,
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteConfig.url}${PAGE_PATH}#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ],
};

export default function Section24Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative h-[320px] sm:h-[380px] lg:h-[400px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=2000&q=85"
          alt="UK residential rental property"
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-slate-900/85" />
        <div className={`${siteContainerLg} relative z-10 h-full flex items-center`}>
          <div className="max-w-3xl">
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Section 24" }]} />
            <h1 className="mt-4 sm:mt-6 text-2xl font-bold leading-tight text-white sm:text-4xl lg:text-6xl">
              Section 24 explained: mortgage interest relief for landlords
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl leading-relaxed text-white">
              You pay tax on rent you never keep. Section 24 taxes your rental income before your mortgage interest,
              then hands back relief at 20%, rising to 22% in April 2027.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Link
                href="/contact"
                className={`${btnPrimary} bg-emerald-600 border-emerald-800 text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-3.5 text-center`}
              >
                Book a consultation
              </Link>
              <Link
                href="/calculators/section-24-calculator"
                className={`${btnSecondary} bg-white/10 border-white text-white hover:bg-white/20 text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-3.5 text-center`}
              >
                Run your numbers
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto space-y-10 sm:space-y-14">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">What is Section 24?</h2>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700">
                Section 24 of the Finance (No. 2) Act 2015 stopped individual landlords deducting residential
                mortgage interest from rental income. Before it, interest was an ordinary expense: rent in, costs
                out, tax on what was left. Now the interest is added back, you are taxed on the larger figure, and
                you receive a <strong>basic rate tax reducer worth 20% of the finance costs</strong> as a credit
                against the final bill.
              </p>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700">
                The restriction phased in over four years from April 2017 and has applied in full since the 2020/21
                tax year. It bites on anything that counts as a finance cost, which means mortgage and loan interest,
                interest on borrowing used to buy furnishings or fund improvements, overdraft interest on a lending
                facility used for the property business, and the incidental costs of raising that finance such as
                arrangement and broker fees.
              </p>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700">
                Repairs, insurance, letting agent fees, ground rent, service charges, accountancy and the replacement
                of domestic items relief are untouched. They still come off rental income in the ordinary way. Only
                the finance side moved.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
                How much is the tax reducer worth in 2026/27 and 2027/28?
              </h2>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700">
                For 2026/27 the reducer is <strong>20%</strong> of your allowable finance costs. From April 2027 it
                rises to <strong>22%</strong> under Finance Act 2026, enacted on 18 March 2026. That is the first
                real softening of the regime since it was introduced, and it is worth 2% of your annual interest bill
                every year.
              </p>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700">
                The reducer is capped. It is calculated on the lowest of three figures: your finance costs for the
                year, your property profits for the year, and your adjusted total income above the personal
                allowance. Anything the cap blocks is not lost, it carries forward and is relieved in a later year
                when there is enough profit to absorb it.
              </p>
              <div className="mt-6 border-l-4 border-emerald-600 bg-slate-50 p-6 sm:p-8">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  Worked example: £50,000 rent, £18,000 interest, £40,000 salary
                </h3>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-700">
                  Rent of £50,000, running costs of £8,000 and mortgage interest of £18,000. Real economic profit is
                  £24,000. Taxable property profit under Section 24 is <strong>£42,000</strong>, because the interest
                  is added back.
                </p>
                <div className="mt-5 overflow-x-auto">
                  <table className="w-full text-sm text-left text-slate-700">
                    <thead className="text-xs uppercase tracking-wider text-slate-500">
                      <tr>
                        <th className="py-2 pr-4">Step</th>
                        <th className="py-2 pr-4">2026/27 (20%)</th>
                        <th className="py-2">2027/28 (22%)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr>
                        <td className="py-2 pr-4">Total income (salary plus restricted profit)</td>
                        <td className="py-2 pr-4">£82,000</td>
                        <td className="py-2">£82,000</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4">Income tax before the reducer</td>
                        <td className="py-2 pr-4">£20,232</td>
                        <td className="py-2">£20,232</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4">Finance cost reducer</td>
                        <td className="py-2 pr-4">£3,600</td>
                        <td className="py-2">£3,960</td>
                      </tr>
                      <tr className="font-bold text-slate-900">
                        <td className="py-2 pr-4">Income tax payable</td>
                        <td className="py-2 pr-4">£16,632</td>
                        <td className="py-2">£16,272</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-700">
                  Under the old rules the same landlord would have declared £24,000 of profit, total income of
                  £64,000 and a tax bill of £13,032. Section 24 costs £3,600 a year in 2026/27 and £3,240 in
                  2027/28, on identical cash flows. The figures use England and Northern Ireland rates with the
                  standard personal allowance and no other reliefs, and Scottish rate bands change the arithmetic.
                </p>
              </div>
              <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-700">
                For the mechanics of the calculation itself, see our{" "}
                <Link
                  href="/blog/section-24-and-tax-relief/how-to-calculate-section-24-tax-credit-step-by-step"
                  className="text-emerald-700 font-semibold underline"
                >
                  step-by-step guide to working out the tax credit
                </Link>{" "}
                and a{" "}
                <Link
                  href="/blog/section-24-and-tax-relief/section-24-worked-example-50k-rental-income-portfolio"
                  className="text-emerald-700 font-semibold underline"
                >
                  full worked example on a £50k rental portfolio
                </Link>
                . To model your own portfolio in a minute, use the{" "}
                <Link href="/calculators/section-24-calculator" className="text-emerald-700 font-semibold underline">
                  Section 24 calculator
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">Who does Section 24 hit hardest?</h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700">
              The cost is not spread evenly. It concentrates on landlords whose marginal rate is above 20% and whose
              borrowing is large relative to rent.
            </p>
            <div className="mt-8 sm:mt-10 space-y-5 sm:space-y-6">
              {whoItHits.map((item) => (
                <div key={item.title} className="border-l-4 border-emerald-600 bg-white p-6 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed text-slate-700">{item.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-base sm:text-lg leading-relaxed text-slate-700">
              The threshold effects are where landlords get caught out, because the extra tax lands somewhere they
              were not looking. Our guides on{" "}
              <Link
                href="/blog/section-24-and-tax-relief/can-section-24-push-higher-rate-tax"
                className="text-emerald-700 font-semibold underline"
              >
                being pushed into higher-rate tax
              </Link>{" "}
              and the{" "}
              <Link
                href="/blog/section-24-and-tax-relief/section-24-child-benefit-high-income-charge-landlords"
                className="text-emerald-700 font-semibold underline"
              >
                high income child benefit charge
              </Link>{" "}
              cover the two most common versions.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">Who is not affected?</h2>
            <div className="mt-8 sm:mt-10 space-y-5 sm:space-y-6">
              {notAffected.map((item) => (
                <div key={item.title} className="border-l-4 border-slate-300 bg-slate-50 p-6 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed text-slate-700">{item.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-base sm:text-lg leading-relaxed text-slate-700">
              If you sit in the basic rate band today, the question is how much headroom you have before the
              restricted profit tips you over. Our note on{" "}
              <Link
                href="/blog/section-24-and-tax-relief/section-24-basic-rate-taxpayers"
                className="text-emerald-700 font-semibold underline"
              >
                Section 24 and basic-rate taxpayers
              </Link>{" "}
              sets out where that line falls.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
              How can you reduce the cost of Section 24?
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700">
              There is no way to opt out of the restriction while holding residential property personally. What you
              can change is the rate applied to the profit, who receives that profit, and the structure holding the
              asset. Four routes do most of the work.
            </p>

            <div className="mt-8 space-y-8">
              <div className="bg-white border-l-4 border-emerald-600 p-6 sm:p-8">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">Incorporation</h3>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-700">
                  A company deducts interest in full, so incorporation removes the restriction outright. It is also
                  the most expensive route to get wrong: transferring property to your own company is a disposal at
                  market value for capital gains tax and normally triggers stamp duty land tax on the same day, with
                  mortgage redemption and refinancing costs on top. It works when the annual saving recovers those
                  costs over a realistic holding period, and it does not when you are close to selling. Our{" "}
                  <Link href="/incorporation" className="text-emerald-700 font-semibold underline">
                    incorporation feasibility analysis
                  </Link>{" "}
                  models both sides, and the{" "}
                  <Link
                    href="/blog/section-24-and-tax-relief/section-24-vs-incorporation-which-saves-more-tax"
                    className="text-emerald-700 font-semibold underline"
                  >
                    comparison of staying personal against incorporating
                  </Link>{" "}
                  shows how the break-even moves.
                </p>
              </div>

              <div className="bg-white border-l-4 border-emerald-600 p-6 sm:p-8">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">Spouse and civil partner transfers</h3>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-700">
                  Moving beneficial ownership to a lower-earning spouse shifts rental profit into a lower band, and
                  the transfer itself is no gain, no loss for capital gains tax. Jointly held property is taxed 50/50
                  by default, so an unequal split needs the beneficial interests documented and a Form 17 election
                  filed with HMRC within 60 days of the declaration. Get the paperwork order wrong and HMRC taxes the
                  default split regardless of intent. See our guide to{" "}
                  <Link
                    href="/blog/section-24-and-tax-relief/section-24-joint-property-ownership-tax-split"
                    className="text-emerald-700 font-semibold underline"
                  >
                    joint ownership and the income split
                  </Link>
                  .
                </p>
              </div>

              <div className="bg-white border-l-4 border-emerald-600 p-6 sm:p-8">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">Rate-band and pension planning</h3>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-700">
                  A personal pension contribution extends your basic rate band by the gross amount contributed, which
                  pulls restricted profit back down from 40% to 20%. The same lever protects the personal allowance
                  in the £100,000 to £125,140 range and the child benefit charge above £60,000. Timing capital
                  expenditure, deciding when to bring forward repairs, and controlling how much other income you draw
                  in a given year all work the same way. Details in our{" "}
                  <Link
                    href="/blog/section-24-and-tax-relief/section-24-pension-contributions-tax-planning"
                    className="text-emerald-700 font-semibold underline"
                  >
                    pension contribution planning guide
                  </Link>
                  .
                </p>
              </div>

              <div className="bg-white border-l-4 border-emerald-600 p-6 sm:p-8">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">Debt and portfolio structure</h3>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-700">
                  Where borrowing sits matters. Interest on lending secured against commercial or mixed-use property
                  is not restricted, capital repayment reduces the interest bill directly, and new acquisitions can
                  be bought through a company from the outset without the capital gains tax and stamp duty cost of a
                  transfer. Also check whether you have carried-forward unrelieved finance costs from earlier years
                  sitting unused. Our guides on{" "}
                  <Link
                    href="/blog/section-24-and-tax-relief/section-24-remortgaging-btl-property-tax-implications"
                    className="text-emerald-700 font-semibold underline"
                  >
                    remortgaging a buy-to-let
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/blog/section-24-and-tax-relief/section-24-interest-only-mortgage-tax-planning"
                    className="text-emerald-700 font-semibold underline"
                  >
                    interest-only mortgage planning
                  </Link>{" "}
                  cover the trade-offs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
              What changes in April 2027, and should you wait for it?
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700">
              Finance Act 2026 lifts the reducer from 20% to 22% for tax years from April 2027. Nothing else about
              the mechanism changes: the interest is still added back, the cap still applies, and the carry-forward
              still works the same way. On a £20,000 annual interest bill the change is worth £400 a year.
            </p>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700">
              That is real money and it is not a reason to defer a structural decision. If incorporation stacked up
              at a 20% reducer, a 22% reducer moves the break-even by a matter of months, not years. The larger
              variables are your marginal rate, your loan to value, how long you intend to hold, and the capital
              gains and stamp duty cost of moving. Our{" "}
              <Link
                href="/blog/section-24-and-tax-relief/section-24-2027-tax-year-planning-landlords"
                className="text-emerald-700 font-semibold underline"
              >
                2027 tax year planning guide
              </Link>{" "}
              works through what to bring forward and what to leave.
            </p>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700">
              Two other 2026 changes land on the same landlords. Making Tax Digital for income tax applies to
              landlords with qualifying income over £50,000 from April 2026 and over £30,000 from April 2027, which
              means quarterly updates rather than one annual return. The writing down allowance on plant and
              machinery falls from 18% to 14%, with a new 40% first year allowance for main pool expenditure and the
              special rate unchanged at 6%. If you are rebuilding your record keeping for Making Tax Digital anyway,
              that is the moment to fix how finance costs are captured.
            </p>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700">
              For the underlying rates in one place, see our{" "}
              <Link href="/property-tax-rates" className="text-emerald-700 font-semibold underline">
                UK property tax rates reference
              </Link>
              , and for the full library on this topic, our{" "}
              <Link href="/blog/section-24-and-tax-relief" className="text-emerald-700 font-semibold underline">
                Section 24 and tax relief guides
              </Link>{" "}
              run to more than forty pieces covering individual scenarios.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
              What does a Section 24 review actually involve?
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-200">
              We start with your last filed return and your current lending, work out what the restriction is costing
              you this year and next, then price the realistic alternatives against that number. You get a written
              recommendation, not a brochure. Fees depend on portfolio size and complexity, so the honest answer is
              that we quote after a short consultation.
            </p>
            <ul className="mt-8 space-y-3 sm:space-y-4 text-sm sm:text-base text-slate-200">
              <li className="flex items-start gap-3 sm:gap-4">
                <span className="text-emerald-400 font-bold flex-shrink-0 text-xl sm:text-2xl">✓</span>
                <span>The actual annual cost of the restriction to you, at 20% now and 22% from April 2027</span>
              </li>
              <li className="flex items-start gap-3 sm:gap-4">
                <span className="text-emerald-400 font-bold flex-shrink-0 text-xl sm:text-2xl">✓</span>
                <span>A check that finance costs were reported in the right box on previous returns, and any carried-forward pool you have not used</span>
              </li>
              <li className="flex items-start gap-3 sm:gap-4">
                <span className="text-emerald-400 font-bold flex-shrink-0 text-xl sm:text-2xl">✓</span>
                <span>Threshold modelling for the higher rate band, the personal allowance taper and the child benefit charge</span>
              </li>
              <li className="flex items-start gap-3 sm:gap-4">
                <span className="text-emerald-400 font-bold flex-shrink-0 text-xl sm:text-2xl">✓</span>
                <span>Ownership options costed properly: incorporation with capital gains tax and stamp duty included, spouse transfers, and doing nothing</span>
              </li>
              <li className="flex items-start gap-3 sm:gap-4">
                <span className="text-emerald-400 font-bold flex-shrink-0 text-xl sm:text-2xl">✓</span>
                <span>A written recommendation you can act on, or hand to a broker or solicitor</span>
              </li>
            </ul>
            <p className="mt-8 text-base sm:text-lg leading-relaxed text-slate-200">
              A generalist accountant will file your return correctly. The difference here is that we look at the
              structure behind the return, which is where the money on a leveraged portfolio actually is. Most
              portfolios we review have at least one of these open: interest in the wrong box, an unequal ownership
              split never documented, or an incorporation decision made on rules of thumb rather than numbers.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">Section 24 questions</h2>
            <dl className="mt-8 sm:mt-10 space-y-6">
              {faqs.map((faq) => (
                <div key={faq.question} className="border-l-4 border-slate-300 bg-slate-50 p-6 sm:p-8">
                  <dt className="text-lg sm:text-xl font-bold text-slate-900">{faq.question}</dt>
                  <dd className="mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed text-slate-700">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <CTASection
        title="Find out what Section 24 is costing you"
        description="Book a consultation. We will quantify the restriction on your portfolio and price the alternatives against it."
        primaryLabel="Book a consultation"
        secondaryHref="/calculators/section-24-calculator"
        secondaryLabel="Run the numbers first"
      />
    </>
  );
}
