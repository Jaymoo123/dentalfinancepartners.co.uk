import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3, Building2, Check, Home, Minus, Percent, PoundSterling, Scale, TrendingUp, UserX, X } from "lucide-react";
import { HeroBrickBackdrop } from "@/components/layout/HeroBrickBackdrop";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { RateWedge } from "@/components/property/RateWedge";
import { Section24Wedge } from "@/components/property/Section24Wedge";
import { DrawnTickList } from "@/components/property/DrawnTickList";
import { PromptMarquee, type Prompt } from "@/components/property/PromptMarquee";
import { CoverageCards, type CoverageItem } from "@/components/property/CoverageCards";
import { LeadCTAPanel } from "@/components/property/LeadCTAPanel";
import { StatsCounter } from "@/components/property/StatsCounter";
import { TestimonialsSection } from "@/components/property/TestimonialsSection";
import { siteStats } from "@/lib/site-stats";
import { CalculatorTabs } from "@/components/calculators/CalculatorTabs";
import { FaqSection } from "@/components/ui/FaqSection";
import { ExampleFigureNote } from "@/components/ui/ExampleFigureNote";
import { Eyebrow, InlineLink } from "@/components/ui/page-blocks";
import { btnOnCream, btnPrimary, heroCreamSurface, siteContainerLg } from "@/components/ui/layout-utils";
import { buildFaqPageJsonLd, type FaqEntry } from "@/lib/faq-page-schema";
import { siteConfig } from "@/config/site";

const PAGE_PATH = "/section-24";
const TITLE = "Section 24 Explained: Mortgage Interest Relief for Landlords";
const DESCRIPTION =
  "How Section 24 restricts landlord mortgage interest relief, the 20% tax reducer now and 22% from April 2027, who it hits, worked examples and the ways to cut the cost.";

/**
 * Ours, kept whole (carve-out 5). Their version swaps the colon for a pipe,
 * softens the description off the keyword, drops `og:type=article` and drops the
 * twitter card entirely. Our title was set against the collision pre-flight in
 * expansion_research/_prop_audit_2026_08_05/wave_brief_shared.md (commit
 * bbfe0437), which the designer never saw; re-running that matrix is a data task
 * rather than a judgement, so the retitle is recorded and not adopted.
 */
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${siteConfig.url}${PAGE_PATH}` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${siteConfig.url}${PAGE_PATH}`,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

/**
 * Self-identification prompts, the Section 24 set (theirs, adopted whole).
 *
 * First person on purpose, and deliberately UNATTRIBUTED: no names, initials,
 * avatars or portfolio details. These are self-identification cues, not
 * testimonials.
 *
 * Keep the count EVEN. The zigzag offset in `PromptMarquee` alternates on index,
 * so an odd set flips the pattern at the loop seam and it shows.
 */
const section24Prompts: Prompt[] = [
  {
    tag: "My tax bill makes no sense",
    text: "I take the same rent I did three years ago and I am paying thousands more tax on it.",
    icon: BarChart3,
  },
  {
    tag: "I am taxed on money the bank takes",
    text: "Most of the rent goes straight back out as mortgage interest, but I am taxed as though I kept it.",
    icon: PoundSterling,
  },
  {
    tag: "I have been pushed into a higher band",
    text: "On paper I am a higher-rate taxpayer now. What I actually live on has not changed.",
    icon: TrendingUp,
  },
  {
    tag: "Nobody has put a number on it",
    text: "I know Section 24 affects me. No one has ever told me what it costs me a year.",
    icon: Percent,
  },
  {
    tag: "Everyone says incorporate",
    text: "I keep being told to put it all in a company. Nobody will tell me whether that is right for mine.",
    icon: Building2,
  },
  {
    tag: "My accountant has never raised it",
    text: "My return gets filed every year and Section 24 has never once come up.",
    icon: UserX,
  },
];

/**
 * The mechanism in numbers, using the page's own worked-example figures
 * (£50,000 rent, £8,000 running costs, £18,000 interest). They are the same
 * numbers the section below runs the full tax on, deliberately: one set of
 * figures on the page, or none. Change them in both places or not at all.
 */
const mechanismRows: Array<[string, string]> = [
  ["Rent received", "£50,000"],
  ["Less running costs", "(£8,000)"],
  ["Less mortgage interest", "(£18,000)"],
];

/**
 * What the restriction bites on, and what it leaves alone. A lookup, so a
 * two-column list rather than prose: a reader here is checking whether one
 * particular cost of theirs is caught, not reading both sides.
 */
const financeCosts = [
  "Mortgage and loan interest",
  "Interest on borrowing for furnishings or improvements",
  "Overdraft interest on a property business facility",
  "Arrangement and broker fees for raising that finance",
];

const untouchedCosts = [
  "Repairs and maintenance",
  "Insurance and ground rent",
  "Letting agent fees and service charges",
  "Accountancy and replacement of domestic items relief",
];

/**
 * Four full-width grey bars became a 2-up card grid. Two columns rather than
 * three because these bodies run 50 to 70 words: at three they become ribbons.
 * The `outcome` lines are theirs and are new copy worth having.
 */
const whoItHits: CoverageItem[] = [
  {
    title: "Higher and additional-rate taxpayers",
    body: "If your total income takes you past £50,270, you pay 40% or 45% on the top of your rental profit but only get relief on finance costs at 20%. That 20 to 25 point gap is the whole of Section 24. It does not narrow in April 2027: the reducer rises to 22%, but property income moves to its own 22%, 42% and 47% rates at the same time, so the gap stays 20 or 25 points.",
    outcome: "The 20 to 25 point gap, unchanged in April 2027",
    icon: Percent,
  },
  {
    title: "Leveraged portfolios on interest-only debt",
    body: "The pain scales with the size of your mortgage interest bill, not with your profit. A landlord on 75% loan to value with interest-only borrowing can show a taxable profit far larger than the cash actually reaching the bank account.",
    outcome: "Taxable profit larger than the cash you bank",
    icon: TrendingUp,
  },
  {
    title: "Landlords sitting just under a threshold",
    body: "Section 24 inflates the taxable profit HMRC sees, so it drags people over the £50,270 higher-rate threshold, over the £60,000 high income child benefit charge point, and into the £100,000 to £125,140 band where the personal allowance tapers away at an effective 60%.",
    outcome: "Dragged into the 60% band and the child benefit charge",
    icon: Scale,
  },
  {
    title: "Furnished holiday let owners, since April 2025",
    body: "The furnished holiday lettings regime was abolished from 6 April 2025. Full interest deduction went with it, so holiday lets held personally now sit inside the same finance cost restriction as ordinary buy-to-lets.",
    outcome: "Inside the restriction since the FHL regime ended",
    icon: Home,
  },
];

const whoIsNot = [
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
    title: "Costs that are not finance costs",
    body: "Letting agent fees, repairs, insurance, ground rent, service charges and accountancy remain fully deductible in the normal way. Only interest, and incidental costs of raising finance such as arrangement fees, are restricted.",
  },
];

/**
 * The three figures the reducer is capped on, lifted out of the sentence that
 * used to list them inline. A reader here is checking which of the three is
 * biting on their own return, which is a lookup and not a sentence.
 */
const reducerCap: Array<{ label: string; gloss: string }> = [
  {
    label: "Your finance costs for the year",
    gloss: "Interest, arrangement fees and the interest element of most finance.",
  },
  {
    label: "Your property profits for the year",
    gloss: "Profit after every other allowable cost, but before the finance costs are taken off.",
  },
  {
    label: "Your adjusted total income above the personal allowance",
    gloss: "Everything you are taxed on, property and otherwise, less the personal allowance.",
  },
];

const workedExample: Array<[string, string, string]> = [
  ["Total income (salary plus restricted profit)", "£82,000", "£82,000"],
  ["Income tax before the reducer", "£20,232", "£21,072"],
  ["Finance cost reducer", "£3,600", "£3,960"],
  ["Income tax payable", "£16,632", "£17,112"],
];

const reviewIncludes = [
  "The actual annual cost of the restriction to you, at 20% now and 22% from April 2027 against the new 22/42/47 property rates",
  "A check that finance costs were reported in the right box on previous returns, and any carried-forward pool you have not used",
  "Threshold modelling for the higher rate band, the personal allowance taper and the child benefit charge",
  "Ownership options costed properly: incorporation with capital gains tax and stamp duty included, spouse transfers, and doing nothing",
  "A written recommendation you can act on, or hand to a broker or solicitor",
];

const faqs: FaqEntry[] = [
  {
    question: "What is Section 24?",
    answer:
      "Section 24 of the Finance (No. 2) Act 2015 removed the ability of individual landlords to deduct residential mortgage interest and other finance costs from rental income. Instead you get a basic rate tax reducer worth 20% of the finance costs, cut from your final tax bill. It phased in between April 2017 and April 2020 and has applied in full since the 2020/21 tax year.",
  },
  {
    question: "What is the Section 24 tax reducer worth in 2026/27?",
    answer:
      "20% of your allowable finance costs, applied as a credit against your income tax liability. From April 2027 the reducer rises to 22% under Finance Act 2026, which was enacted on 18 March 2026, because it tracks the new 22% basic rate on property income (property income is taxed at 22%, 42% and 47% from 6 April 2027 in England, Wales and Northern Ireland). The reducer is capped at 20% of the lowest of your finance costs, your property profits, and your adjusted total income above the personal allowance, and at 22% of that lowest figure from 2027/28.",
  },
  {
    question: "Does Section 24 apply to limited companies?",
    answer:
      "No. Companies deduct mortgage interest in full against rental profits before corporation tax. This is why incorporation is the most common structural response to Section 24, although the transfer itself can trigger capital gains tax and stamp duty land tax. Section 162 incorporation relief can defer the capital gains charge where the letting activity amounts to a business, but for transfers on or after 6 April 2026 it has to be claimed rather than applying automatically, and the claim runs to the first anniversary of the 31 January following the tax year of the transfer.",
  },
  {
    question: "How does Section 24 affect basic-rate taxpayers?",
    answer:
      "If all your income stays within the basic rate band, relief at 20% equals the rate you pay and there is no extra cost. The trap is that adding back the interest inflates your taxable profit, so landlords who were comfortably basic rate on a real-world profit can be pushed into the higher rate band on a restricted one.",
  },
  {
    question: "Is Section 24 being repealed or reversed?",
    answer:
      "No repeal has been announced. Finance Act 2026 raises the reducer from 20% to 22% from April 2027, but only because property income moves to separate 22%, 42% and 47% rates on the same day, so a higher-rate landlord is worse off overall, not better. The mechanism is intact. Plan on the restriction staying, not on it being withdrawn.",
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

/**
 * Ours, kept (carve-out 5). Their version emits FAQPage only. Article is what
 * STRUCTURE_VS_COMPETITORS_2026-08-17.md records this route as shipping, and
 * BreadcrumbList comes from <Breadcrumb>.
 */
const articleJsonLd = {
  "@context": "https://schema.org",
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
};

export default function Section24Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqPageJsonLd(faqs)) }}
      />

      <section
        className={`relative flex items-center py-10 sm:py-12 lg:py-14 min-h-[360px] sm:min-h-[420px] lg:min-h-[440px] overflow-hidden ${heroCreamSurface}`}
      >
        <HeroBrickBackdrop tone="cream" />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Section 24" }]} />
            <h1 className="mt-4 sm:mt-6 text-2xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-6xl">
              Section 24 explained: mortgage interest relief for landlords
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-slate-700">
              You pay tax on rent you never keep. Section 24 taxes your rental income before your mortgage interest,
              then hands back relief at 20%, rising to 22% in April 2027 when property income gets its own 22%, 42%
              and 47% rates.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              {/* Both CTAs now stay on the page. The primary was /contact, a
                  generic form on another route; the secondary sent the reader to
                  a calculator before they had read a line of why it matters. */}
              <Link
                href="#book"
                data-cta="hero_book"
                data-cta-placement="hero"
                data-cta-goal="form"
                className={`${btnPrimary} bg-emerald-600 text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-3.5 text-center`}
              >
                Book a Section 24 review
              </Link>
              <Link
                href="#free-tools"
                className={`${btnOnCream} text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-3.5 text-center`}
              >
                Run your numbers for free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Proof before the argument, reusing the shared siteStats. Nothing new is
          claimed: the same figures carried on the homepage. */}
      <section className="border-b border-slate-200 bg-white py-5 sm:py-7">
        <div className={siteContainerLg}>
          <StatsCounter stats={siteStats} />
        </div>
      </section>

      {/* Self-identification, before the explanation. A reader arriving from
          search has a complaint, not a vocabulary. */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <Eyebrow>Sound familiar?</Eyebrow>
              <h2 className="text-2xl font-bold text-slate-900 text-balance sm:text-4xl">
                Taxed on rent that never reaches you
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 sm:mt-6 sm:text-lg">
                Section 24 taxes your rental income before your mortgage interest, then hands back relief at 20%.
                Most landlords felt the bill rise without ever being told why, or whether theirs was even calculated
                correctly.
              </p>
              <p className="mt-6 text-base font-bold leading-relaxed text-slate-900 text-balance sm:text-lg">
                If one of these is the sentence going round your head, it is worth putting a number on it.
              </p>
              <Link
                href="#book"
                data-cta="triggers_book"
                data-cta-placement="triggers"
                data-cta-goal="form"
                className={`${btnPrimary} mt-6 w-full sm:mt-8 sm:w-auto`}
              >
                Book a Section 24 review
              </Link>
            </div>
            <PromptMarquee prompts={section24Prompts} />
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>The mechanism</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">What is Section 24?</h2>
            {/* Restored detail 2026-08-23 (owner: retain enough substance to
                read as professional authority). The port had cut this lead from
                three paragraphs to one to make room for the figure below, which
                went too far the other way.

                What came back is only what the figure does NOT already say. The
                before-and-after arithmetic stays in the two columns, and the
                two cost lists stay in the lookup further down, so nothing here
                repeats them. Every added claim is checked against
                `docs/property/house_positions.md` section 4: the statutory hooks
                (ITTOIA 2005 ss.274AA to 274C, ITA 2007 s.399B, both named there),
                the scope line "applies to individuals, partnerships, and trusts,
                does NOT apply to limited companies", and the reducer-not-a-
                deduction distinction the same section leads with. The phase-in
                percentages were deliberately NOT added: house positions does not
                carry them, and an unsourced 75/50/25 on a tax page is exactly the
                kind of figure this site does not publish. */}
            <div className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-slate-700">
              <p>
                Section 24 of the Finance (No. 2) Act 2015 stopped individual landlords deducting residential
                mortgage interest from rental income. It phased in over four years from April 2017 and has applied in
                full since the 2020/21 tax year. The operative provisions sit in ITTOIA 2005 sections 274AA to 274C
                and ITA 2007 section 399B.
              </p>
              <p>
                The distinction that matters is between a deduction and a reducer. Finance costs no longer come off
                your rental profit at all. They are replaced by a basic rate tax reducer applied against your final
                income tax liability, which is a different thing arriving at a different point in the calculation. Your
                taxable profit is larger for every other purpose that reads it: the higher rate threshold, the high
                income child benefit charge, and the taper of the personal allowance above £100,000.
              </p>
              <p>
                It applies to individuals, partnerships and trusts holding residential property. It does not apply to
                limited companies, which still deduct interest in full before corporation tax, and that single
                difference is what drives most of the incorporation questions landlords bring us.
              </p>
            </div>

            {/* The section led with three paragraphs and no figure, on a page
                whose whole subject is one arithmetic change. "The interest is
                added back and you are taxed on the larger figure" is a sentence
                that can only assert the mechanism; two columns of the same sum
                show it.

                The figures are the page's own worked example, and this panel
                stops at the taxable profit on purpose. What the tax then comes to
                is the next section, which runs both tax years in full. */}
            <div className="mt-8 grid gap-5 sm:mt-10 sm:gap-6 md:grid-cols-2">
              <div className="rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Before April 2017</p>
                <h3 className="mt-2 text-base font-bold text-slate-600 sm:text-lg">Interest was an ordinary expense</h3>
                <dl className="mt-5 space-y-2.5">
                  {mechanismRows.map(([label, value]) => (
                    <div key={label} className="flex items-baseline justify-between gap-4 text-sm sm:text-base">
                      <dt className="text-slate-500">{label}</dt>
                      <dd className="font-semibold text-slate-600">{value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-slate-300 pt-4">
                  <span className="text-sm font-bold text-slate-600 sm:text-base">Taxed on</span>
                  <span className="text-xl font-bold text-slate-600 sm:text-2xl">£24,000</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-500">Rent in, costs out, tax on what was left.</p>
              </div>

              <div className="rounded-xl bg-slate-900 p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400">Now</p>
                <h3 className="mt-2 text-base font-bold text-white sm:text-lg">The interest is added back</h3>
                <dl className="mt-5 space-y-2.5">
                  {mechanismRows.map(([label, value], i) => {
                    // The interest row is struck through rather than removed: the
                    // reader has to see the deduction that is no longer there,
                    // and a column with one fewer row would just look like a
                    // different sum.
                    const restricted = i === mechanismRows.length - 1;
                    return (
                      <div key={label} className="flex items-baseline justify-between gap-4 text-sm sm:text-base">
                        <dt className={restricted ? "text-slate-500 line-through" : "text-slate-300"}>{label}</dt>
                        <dd
                          className={
                            restricted ? "font-semibold text-slate-500 line-through" : "font-semibold text-white"
                          }
                        >
                          {value}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
                <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-white/20 pt-4">
                  <span className="text-sm font-bold text-white sm:text-base">Taxed on</span>
                  <span className="text-xl font-bold text-emerald-400 sm:text-2xl">£42,000</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  Then a basic rate tax reducer worth 20% of the £18,000, or £3,600, comes off the final bill.
                </p>
              </div>
            </div>

            {/* Same illustrative landlord as the worked example below. */}
            <ExampleFigureNote className="mt-4" />

            {/* Moved above the lookup 2026-08-23 (owner). It used to close the
                section, where it read as an afterthought to a two-column table;
                as a lead-in it frames what the table is about to show. */}
            <div className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-slate-700">
              <p>
                Only the finance side moved. Section 24 is one part of a wider picture, and{" "}
                <InlineLink href="/landlord-tax">our landlord tax guide</InlineLink> covers every tax that touches a
                let property.
              </p>
            </div>

            {/* Which costs moved and which did not. A lookup, so a two-column
                list rather than the two paragraphs this replaced: a reader here
                is checking one cost of their own, not reading both sides. */}
            <div className="mt-6 grid gap-6 rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70 sm:mt-8 sm:grid-cols-2 sm:gap-8 sm:p-8">
              <div>
                <h3 className="text-base font-bold text-slate-900 sm:text-lg">Restricted</h3>
                <ul className="mt-4 space-y-3">
                  {financeCosts.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-700 sm:text-base">
                      <X aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" strokeWidth={2.5} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="sm:border-l sm:border-slate-200 sm:pl-8">
                <h3 className="text-base font-bold text-slate-900 sm:text-lg">Still fully deductible</h3>
                <ul className="mt-4 space-y-3">
                  {untouchedCosts.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-700 sm:text-base">
                      <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.5} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>What it costs</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
              How much is the tax reducer worth in 2026/27 and 2027/28?
            </h2>

            {/* The plain answer first, as a picture, before any of the rate
                mechanics below (owner, 2026-08-23: make this section simpler to
                understand). Two bars on one scale show the gap the whole section
                is about, the profit banked against the larger profit taxed, with
                the added-back interest as its own segment, and the £3,600 a year
                that gap costs.

                `Section24Wedge` is the designer's own component, written FOR
                this page: its docstring says "Figures match the worked example
                on /section-24 so the two pages cannot drift", and it uses the
                same £50,000 / £8,000 / £18,000 landlord as the table further
                down. It had been wired only to /services/landlord-accountant and
                never to the page it was built for. Nothing new was invented
                here; the figure was already in the tree. If the worked example
                below ever changes, change the constants in that component too. */}
            <div className="mt-6 sm:mt-8">
              <Section24Wedge />
            </div>
            {/* Restructured for legibility. This was two dense paragraphs: the
                first welded the rate change, the reason for it and a two-case
                win/lose lookup into seven lines, and the second stated a
                three-part cap as a sentence. Every fact below is the same, but
                the two things a reader actually looks UP here (which case am I
                in, and what caps it) are now scannable instead of buried. */}
            <div className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-slate-700">
              <p>
                For 2026/27 the reducer is 20% of your allowable finance costs. From April 2027 it rises to 22% under
                Finance Act 2026, enacted on 18 March 2026. Read that on its own and it looks like the first softening
                of the regime since it was introduced. It is not.
              </p>
              <p>
                The reducer rises only because property income itself moves to separate rates of 22%, 42% and 47% from
                6 April 2027 in England, Wales and Northern Ireland, and the reducer is fixed to the property basic
                rate. Which way that lands depends entirely on your own rate.
              </p>
            </div>

            {/* Which case am I in, as two cards rather than two paragraphs
                (owner, 2026-08-23). The section's April 2027 answer is entirely
                conditional on the reader's own rate, and a reader looking that up
                should not have to parse two sentences to find their own row.

                Deliberately NOT emerald against red. Basic rate is not a win, it
                is no change, so it takes the neutral slate and a `Minus` on the
                same reasoning `ComparisonTable` uses for the other side of its
                own comparison. Amber marks the case that costs money. Every
                verdict is in words as well as in colour. */}
            <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-5">
              <div className="rounded-xl bg-white p-6 ring-1 ring-slate-200/70">
                <p className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-700">
                  <Minus aria-hidden className="h-3.5 w-3.5" strokeWidth={3} />
                  No change
                </p>
                <h3 className="mt-4 text-base font-bold text-slate-900 sm:text-lg">
                  If you are a basic-rate taxpayer
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
                  You are neutral. 22% of relief against 22% of tax is the same trade you make today at 20% and 20%.
                </p>
              </div>
              <div className="rounded-xl bg-white p-6 ring-1 ring-amber-300">
                <p className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-800">
                  <TrendingUp aria-hidden className="h-3.5 w-3.5" strokeWidth={3} />
                  You pay more
                </p>
                <h3 className="mt-4 text-base font-bold text-slate-900 sm:text-lg">
                  If you are a higher-rate taxpayer
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
                  You gain 2% of your interest bill and lose 2% of your whole property profit, which is a net cost
                  wherever profit before finance costs exceeds the interest.
                </p>
              </div>
            </div>

            {/* The cap, as three tiles with the "lowest wins" rule stated once at
                the top rather than buried in the lead-in sentence. The three are
                genuinely parallel candidates, so they get equal weight and the
                same treatment; the old bordered list implied a sequence. */}
            <div className="mt-8 rounded-xl bg-white p-6 ring-1 ring-slate-200/70 sm:p-8">
              <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                The reducer is capped at whichever of these three is lowest
              </h3>
              <div className="mt-5 grid gap-4 sm:grid-cols-3 sm:gap-5">
                {reducerCap.map(({ label, gloss }) => (
                  <div key={label} className="rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200/70">
                    <p className="text-sm font-bold text-slate-900">{label}</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{gloss}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 flex items-start gap-2.5 border-t border-slate-200 pt-5 text-sm leading-relaxed text-slate-700 sm:text-base">
                <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.5} />
                <span>
                  Anything the cap blocks is not lost. It carries forward and is relieved in a later year when there is
                  enough profit to absorb it.
                </span>
              </p>
            </div>

            <div className="mt-10 rounded-xl bg-white p-6 sm:p-8">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Worked example: £50,000 rent, £18,000 interest, £40,000 salary
              </h3>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-700">
                Rent of £50,000, running costs of £8,000 and mortgage interest of £18,000. Real economic profit is
                £24,000. Taxable property profit under Section 24 is £42,000, because the interest is added back.
              </p>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-slate-300 text-left">
                      <th className="py-2 pr-4 font-bold text-slate-900">Step</th>
                      <th className="py-2 pr-4 font-bold text-slate-900">2026/27 (20%)</th>
                      <th className="py-2 font-bold text-slate-900">2027/28 (22/42/47, reducer 22%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workedExample.map(([step, a, b]) => (
                      <tr key={step} className="border-b border-slate-200">
                        <td className="py-2 pr-4 text-slate-700">{step}</td>
                        <td className="py-2 pr-4 font-semibold text-slate-900">{a}</td>
                        <td className="py-2 font-semibold text-slate-900">{b}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-slate-700">
                <p>
                  The 2027/28 column is higher because the £42,000 of restricted profit is taxed at the property rates:
                  £10,270 of it fills what is left of the basic band at 22% (£2,259) and £31,730 falls at 42%
                  (£13,327), while the salary is still taxed at 20%. The reducer rises by £360 and the tax on the
                  property rises by £840, so the bill goes up £480.
                </p>
                <p>
                  Under the old rules the same landlord would have declared £24,000 of profit and paid £13,032 in
                  2026/27, or £13,512 in 2027/28 at the property rates. Section 24 costs £3,600 a year in both, on
                  identical cash flows: the 20 point wedge between the 42% rate and the 22% reducer is exactly the
                  wedge between 40% and 20% today. The figures use England, Wales and Northern Ireland rates with the
                  standard personal allowance and no other reliefs. Scotland is outside the new property rates and
                  Scottish bands change the arithmetic.
                </p>
                {/* Carve-out 5. Their rewrite of this section kept only the
                    calculator link and dropped both blog deep links with the
                    paragraph that carried them. This page is the only authored
                    inbound path from a commercial hub into the Section 24
                    cluster, so the paragraph comes back. */}
                <p>
                  For the mechanics of the calculation itself, see our{" "}
                  <InlineLink href="/blog/section-24-and-tax-relief/how-to-calculate-section-24-tax-credit-step-by-step">
                    step-by-step guide to working out the tax credit
                  </InlineLink>{" "}
                  and a{" "}
                  <InlineLink href="/blog/section-24-and-tax-relief/section-24-worked-example-50k-rental-income-portfolio">
                    full worked example on a £50k rental portfolio
                  </InlineLink>
                  . To model your own portfolio in a minute, use the{" "}
                  <InlineLink href="/calculators/section-24-calculator">Section 24 calculator</InlineLink>.
                </p>
              </div>
              {/* The £50,000 / £18,000 / £40,000 landlord is illustrative. The
                  rates and the reducer percentages in the table are statutory and
                  are not covered by this note. */}
              <ExampleFigureNote className="mt-6" />
            </div>

            {/* First ask on the page, and the only place it belongs in the top
                half. The reader has just been shown £3,600 a year on identical
                cash flows. A link to #book rather than an inline capture: one
                form per page, and that form is the navy panel at the foot. */}
            <div className="mt-8 rounded-xl bg-white p-6 ring-1 ring-slate-200 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-8">
              <p className="text-base font-bold text-slate-900 sm:text-lg">Want this number for your own portfolio?</p>
              <Link
                href="#book"
                data-cta="worked_example_book"
                data-cta-placement="worked_example"
                data-cta-goal="form"
                className={`${btnPrimary} mt-4 w-full sm:mt-0 sm:w-auto sm:shrink-0`}
              >
                Book a Section 24 review
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>Who pays for it</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">Who does Section 24 hit hardest?</h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-700">
              The cost is not spread evenly. It concentrates on landlords whose marginal rate is above 20% and whose
              borrowing is large relative to rent.
            </p>
            {/* Carve-out 5: their CoverageCards rewrite dropped this paragraph
                and its two blog links with it. Moved above the cards 2026-08-23
                (owner); it was sitting under them, after the glow, where it read
                as a footnote to the grid rather than as part of the setup. */}
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-700">
              The threshold effects are where landlords get caught out, because the extra tax lands somewhere they were
              not looking. Our guides on{" "}
              <InlineLink href="/blog/section-24-and-tax-relief/can-section-24-push-higher-rate-tax">
                being pushed into higher-rate tax
              </InlineLink>{" "}
              and the{" "}
              <InlineLink href="/blog/section-24-and-tax-relief/section-24-child-benefit-high-income-charge-landlords">
                high income child benefit charge
              </InlineLink>{" "}
              cover the two most common versions.
            </p>
            {/* Glow on, by request: the one-time staggered wave the /services
                client tiles use. This is the only glowing block on the page,
                which is the whole point of it. */}
            <CoverageCards items={whoItHits} columns={2} tone="slate" glow />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>Out of scope</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">Who is not affected?</h2>
            {/* Deliberately NOT a second card grid. The section directly above is
                a 2-up CoverageCards grid, and four more cards would read as eight
                equivalent things rather than a set and its complement. */}
            <ul className="mt-8 divide-y divide-slate-200 rounded-xl bg-white p-6 ring-1 ring-slate-200/70 sm:mt-10 sm:p-8">
              {whoIsNot.map((item) => (
                <li key={item.title} className="flex gap-4 py-5 first:pt-0 last:pb-0">
                  <span
                    aria-hidden
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-rose-50"
                  >
                    <X className="h-4 w-4 text-rose-600" strokeWidth={2.5} />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 sm:text-lg">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
            {/* Carve-out 5: dropped by their version. */}
            <p className="mt-8 text-sm sm:text-base leading-relaxed text-slate-700">
              If you sit in the basic rate band today, the question is how much headroom you have before the restricted
              profit tips you over. Our note on{" "}
              <InlineLink href="/blog/section-24-and-tax-relief/section-24-basic-rate-taxpayers">
                Section 24 and basic-rate taxpayers
              </InlineLink>{" "}
              sets out where that line falls.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>Your options</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">How can you reduce the cost of Section 24?</h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-700">
              There is no way to opt out of the restriction while holding residential property personally. What you can
              change is the rate applied to the profit, who receives that profit, and the structure holding the asset.
              Four routes do most of the work. If you want the options modelled against your own figures rather than
              worked through here in general terms, our{" "}
              <InlineLink href="/services/property-tax-advice">property tax advice service</InlineLink> reviews and
              prices them.
            </p>

            {/*
             * CardCarousel is REJECTED on this block, and that is a recorded
             * decision rather than a preference (report 03 §1.7, PLAN 6.2,
             * phase_6_component_map.md §2). The designer put these four routes in
             * an autoplaying carousel; each of our four cards carries two or three
             * in-body blog links, ten between them, and a carousel hides three
             * quarters of those behind a rotation control. Carve-out 5 governs.
             * The component keeps its home on /services/landlord-accountant's
             * "Who we work with", where the cards carry no links.
             *
             * Numbered rather than iconed, which is the designer's own reasoning
             * for this block: the copy above introduces these as a count, and the
             * two sections above already spend the icon and the X.
             */}
            <ol className="mt-8 grid gap-5 sm:mt-10 sm:gap-6 md:grid-cols-2">
              <li className="rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70 sm:p-8">
                <span
                  aria-hidden
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-lg font-bold text-emerald-600 ring-1 ring-emerald-100"
                >
                  1
                </span>
                <h3 className="mt-4 text-base font-bold text-slate-900 sm:text-lg">Incorporation</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:mt-3 sm:text-base">
                  A company deducts interest in full, so incorporation removes the restriction outright. It is also the
                  most expensive route to get wrong: transferring property to your own company is a disposal at market
                  value for capital gains tax and normally triggers stamp duty land tax on the same day, with mortgage
                  redemption and refinancing costs on top. It works when the annual saving recovers those costs over a
                  realistic holding period, and it does not when you are close to selling. Our{" "}
                  <InlineLink href="/incorporation">incorporation feasibility analysis</InlineLink> models both sides,
                  and the{" "}
                  <InlineLink href="/blog/section-24-and-tax-relief/section-24-vs-incorporation-which-saves-more-tax">
                    comparison of staying personal against incorporating
                  </InlineLink>{" "}
                  shows how the break-even moves.
                </p>
              </li>

              <li className="rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70 sm:p-8">
                <span
                  aria-hidden
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-lg font-bold text-emerald-600 ring-1 ring-emerald-100"
                >
                  2
                </span>
                <h3 className="mt-4 text-base font-bold text-slate-900 sm:text-lg">
                  Spouse and civil partner transfers
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:mt-3 sm:text-base">
                  Moving beneficial ownership to a lower-earning spouse shifts rental profit into a lower band, and the
                  transfer itself is no gain, no loss for capital gains tax. Jointly held property is taxed 50/50 by
                  default, so an unequal split needs the beneficial interests documented and a Form 17 election filed
                  with HMRC within 60 days of the declaration. Get the paperwork order wrong and HMRC taxes the default
                  split regardless of intent. See our guide to{" "}
                  <InlineLink href="/blog/section-24-and-tax-relief/section-24-joint-property-ownership-tax-split">
                    joint ownership and the income split
                  </InlineLink>
                  .
                </p>
              </li>

              <li className="rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70 sm:p-8">
                <span
                  aria-hidden
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-lg font-bold text-emerald-600 ring-1 ring-emerald-100"
                >
                  3
                </span>
                <h3 className="mt-4 text-base font-bold text-slate-900 sm:text-lg">Rate-band and pension planning</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:mt-3 sm:text-base">
                  A personal pension contribution extends your basic rate band by the gross amount contributed, which
                  pulls restricted profit back down from 40% to 20%. The same lever protects the personal allowance in
                  the £100,000 to £125,140 range and the child benefit charge above £60,000. Timing capital
                  expenditure, deciding when to bring forward repairs, and controlling how much other income you draw
                  in a given year all work the same way. Details in our{" "}
                  <InlineLink href="/blog/section-24-and-tax-relief/section-24-pension-contributions-tax-planning">
                    pension contribution planning guide
                  </InlineLink>
                  .
                </p>
              </li>

              <li className="rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70 sm:p-8">
                <span
                  aria-hidden
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-lg font-bold text-emerald-600 ring-1 ring-emerald-100"
                >
                  4
                </span>
                <h3 className="mt-4 text-base font-bold text-slate-900 sm:text-lg">Debt and portfolio structure</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:mt-3 sm:text-base">
                  Where borrowing sits matters. Interest on lending secured against commercial or mixed-use property is
                  not restricted, capital repayment reduces the interest bill directly, and new acquisitions can be
                  bought through a company from the outset without the capital gains tax and stamp duty cost of a
                  transfer. Also check whether you have carried-forward unrelieved finance costs from earlier years
                  sitting unused. Our guides on{" "}
                  <InlineLink href="/blog/section-24-and-tax-relief/section-24-remortgaging-btl-property-tax-implications">
                    remortgaging a buy-to-let
                  </InlineLink>{" "}
                  and{" "}
                  <InlineLink href="/blog/section-24-and-tax-relief/section-24-interest-only-mortgage-tax-planning">
                    interest-only mortgage planning
                  </InlineLink>{" "}
                  cover the trade-offs.
                </p>
              </li>
            </ol>

            {/* Second ask on the page. Between the worked-example CTA and the
                panel at the foot there were four consecutive sections with
                nothing to act on, which is the longest stretch on the page. This
                is also the only moment where the reader's question changes from
                "what is this" to "which of these is mine". */}
            <div className="mt-8 rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200 sm:mt-10 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-8">
              <div className="min-w-0">
                <p className="text-base font-bold text-slate-900 sm:text-lg">
                  Not sure which of the four applies to you?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
                  Most landlords need two of them, not one, and the wrong order costs money. We model the options
                  against your own figures and tell you which is worth doing.
                </p>
              </div>
              <Link
                href="#book"
                data-cta="routes_book"
                data-cta-placement="routes"
                data-cta-goal="form"
                className={`${btnPrimary} mt-5 w-full sm:mt-0 sm:w-auto sm:shrink-0`}
              >
                Get my options modelled
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>April 2027</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
              What changes in April 2027, and should you wait for it?
            </h2>
            <div className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-slate-700">
              <p>
                Finance Act 2026 gives property income its own rates of 22%, 42% and 47% from 6 April 2027 in England,
                Wales and Northern Ireland, and lifts the reducer to the new 22% basic rate at the same time. Scotland
                is carved out for 2027/28 and Scottish taxpayers keep Holyrood-set rates. Nothing else about the
                mechanism changes: the interest is still added back, the cap still applies, and the carry-forward still
                works the same way. On a £20,000 annual interest bill the higher reducer is worth £400, but a
                higher-rate landlord also pays 2% more on every pound of restricted property profit, so unless your
                profit before finance costs is smaller than your interest bill you end up paying more.
              </p>
            </div>

            <RateWedge />

            <div className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-slate-700">
              <p>
                So there is nothing to wait for. If incorporation stacked up at a 20% reducer it stacks up slightly
                harder from April 2027, because the wedge is unchanged at 20 points while the rate on retained property
                profit rises. The larger variables are your marginal rate, your loan to value, how long you intend to
                hold, and the capital gains and stamp duty cost of moving. Our{" "}
                <InlineLink href="/blog/section-24-and-tax-relief/section-24-2027-tax-year-planning-landlords">
                  2027 tax year planning guide
                </InlineLink>{" "}
                works through what to bring forward and what to leave.
              </p>
              <p>
                Two other 2026 changes land on the same landlords.{" "}
                <InlineLink href="/making-tax-digital-landlords">Making Tax Digital for income tax</InlineLink> applies
                to landlords with qualifying income over £50,000 from April 2026, over £30,000 from April 2027 and over
                £20,000 from April 2028, which means quarterly updates rather than one annual return. The writing down
                allowance on plant and machinery falls from 18% to 14%, with a new 40% first year allowance for main
                pool expenditure and the special rate unchanged at 6%. If you are rebuilding your record keeping for
                Making Tax Digital anyway, that is the moment to fix how finance costs are captured.
              </p>
              <p>
                For the underlying rates in one place, see our{" "}
                <InlineLink href="/property-tax-rates">UK property tax rates reference</InlineLink>, and for the full
                library on this topic, our{" "}
                <InlineLink href="/blog/section-24-and-tax-relief">Section 24 and tax relief guides</InlineLink> run to
                more than forty pieces covering individual scenarios.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>The engagement</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
              What does a Section 24 review actually involve?
            </h2>
            {/* Merged 2026-08-23 (owner): "The engagement" and "Deliverables"
                were one section carrying two eyebrows and two headings, the
                second nested inside the first in its own navy card. Same
                subject, told twice: what the review involves, then what the
                review gives you. Now one section, one eyebrow, one h2, with the
                list kept as a distinct block under an h3 so the scan structure
                survives the merge.

                The card is slate-50 rather than the navy it used to be, because
                the merged section is white and the testimonials band directly
                below it is full-bleed navy: a navy card here would have run into
                it. Ticks take `text-emerald-600` for the same reason, since the
                default emerald-400 is tuned for navy and washes out on a light
                ground. */}
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-700">
              We start with your last filed return and your current lending, work out what the restriction is costing
              you this year and next, then price the realistic alternatives against that number. You get a written
              recommendation, not a brochure. Fees depend on portfolio size and complexity, so the honest answer is that
              we quote after a short consultation.
            </p>

            <div className="mt-8 rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70 sm:p-8">
              <h3 className="text-base font-bold text-slate-900 sm:text-lg">What the review gives you</h3>
              {/* The ticks write themselves in the first time the block scrolls
                  into view. Same shared DrawnTickList as the navy deliverables
                  bands on /services/property-tax-advice and /incorporation. */}
              <DrawnTickList
                items={reviewIncludes}
                tickClassName="text-emerald-600"
                className="mt-5 grid gap-4 text-sm text-slate-700 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-5 sm:text-base"
              />
            </div>

            <p className="mt-8 text-sm sm:text-base leading-relaxed text-slate-700">
              A generalist accountant will file your return correctly. The difference here is that we look at the
              structure behind the return, which is where the money on a leveraged portfolio actually is. Most
              portfolios we review have at least one of these open: interest in the wrong box, an unequal ownership
              split never documented, or an incorporation decision made on rules of thumb rather than numbers.
            </p>
          </div>
        </div>
      </section>

      {/* Proof, then the tools, then the ask, then the FAQ. The testimonials sit
          ABOVE the free tools rather than beside `#book` because both are
          full-bleed navy: adjacent they read as one dark slab, and the light
          tools block between them is what keeps the band alternating. */}
      <TestimonialsSection
        eyebrow="Testimonials"
        title="Landlords who have had this modelled"
        description="Anonymised feedback from landlords and investors we have worked with on exactly these questions."
      />

      <section id="free-tools" className="scroll-mt-24 bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>Free tools</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">Put numbers on your own position</h2>
            <p className="mt-4 text-sm sm:text-base text-slate-700">
              Free, and the figures are yours to take to any adviser.
            </p>
            <div className="mt-8 sm:mt-10">
              <CalculatorTabs />
            </div>
            {/* OWNER DECISION 2026-08-23: the tabs are the only calculator
                surface this page carries. The 2x2 CalculatorLinkCards module and
                its "Or open any of them on its own page" lead-in are both gone,
                the same call already applied to /services/property-accountant
                and /services/property-tax-advice.

                Know what that costs before restoring anything here.
                `CalculatorTabs` renders <button role="tab">, not anchors, so
                this page now emits ZERO in-body links to any /calculators/<slug>
                page. That is the page-authored topical equity carve-out 5
                protects and `calculator-tabs-crawl-path.test.ts` guards; this
                route is listed in that test's OWNER_REMOVED_INBODY_LINKS with
                the same reasoning. Reachability is unaffected (SiteFooter ships
                per-tool links site-wide), so nothing is orphaned. */}
          </div>
        </div>
      </section>

      {/* The closing ask, and the target every `#book` link on this page points
          at. Was a contained CTASection sending readers to /contact: the least
          assertive block on a page whose job is to hand off to a service. */}
      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          title="Find out what Section 24 is costing you"
          description="Tell us what you own, how it is geared and whose name it is in. We will quantify the restriction on your portfolio and price the alternatives against it."
          proofPoints={[
            { title: "Property tax only", detail: "Section 24, CGT and MTD every day" },
            { title: "Fixed fees, quoted upfront", detail: "In writing, before any work starts" },
            { title: "24-hour response", detail: "Usually the same working day" },
          ]}
          footnote="No obligation and no hard sell. If your position is already right, we will say so."
        />
      </div>

      <FaqSection title="Section 24 questions" faqs={faqs} className="bg-white py-12 sm:py-16 lg:py-20" />
    </>
  );
}
