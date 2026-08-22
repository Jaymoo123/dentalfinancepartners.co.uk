import type { Metadata } from "next";
import Link from "next/link";
import {
  Banknote,
  Building2,
  CalendarClock,
  Check,
  HelpCircle,
  Landmark,
  PoundSterling,
  Receipt,
  TrendingUp,
  UserX,
  X,
} from "lucide-react";
import { HeroBrickBackdrop } from "@/components/layout/HeroBrickBackdrop";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CalculatorTabs } from "@/components/calculators/CalculatorTabs";
import { CoverageCards, type CoverageItem } from "@/components/property/CoverageCards";
import { DisposalFigures } from "@/components/property/DisposalFigures";
import { PenaltyLadder } from "@/components/property/PenaltyLadder";
import { PromptMarquee, type Prompt } from "@/components/property/PromptMarquee";
import { RentalProfitStack } from "@/components/property/RentalProfitStack";
import { StatsCounter } from "@/components/property/StatsCounter";
import { TestimonialsSection } from "@/components/property/TestimonialsSection";
import { FaqSection } from "@/components/ui/FaqSection";
import { LeadCTAPanel } from "@/components/property/LeadCTAPanel";
import { ExampleFigureNote } from "@/components/ui/ExampleFigureNote";
import { Eyebrow, InlineLink, Prose } from "@/components/ui/page-blocks";
import { btnOnCream, btnPrimary, heroCreamSurface, siteContainerLg } from "@/components/ui/layout-utils";
import { siteStats } from "@/lib/site-stats";
import { buildFaqPageJsonLd, type FaqEntry } from "@/lib/faq-page-schema";
import { siteConfig } from "@/config/site";

/**
 * Ours, kept whole (carve-out 5). Theirs is retitled to "Landlord Tax Explained
 * 2026/27 | What UK Landlords Pay" and carries no twitter card. Our title was
 * set against the collision pre-flight in
 * expansion_research/_prop_audit_2026_08_05/wave_brief_shared.md (commit
 * bbfe0437), which names /landlord-tax against /property-tax-rates and
 * /research/landlord-tax-index specifically; the designer never saw it.
 * Re-running that matrix needs the surface map rather than a judgement, so the
 * retitle is recorded and not adopted.
 */
export const metadata: Metadata = {
  title: "Landlord Tax Explained: What UK Landlords Pay in 2026/27",
  description:
    "What tax you pay as a UK landlord in 2026/27: income tax on rental profit, the Section 24 restriction, allowable expenses, CGT, the SDLT surcharge and IHT, with worked examples.",
  alternates: { canonical: `${siteConfig.url}/landlord-tax` },
  openGraph: {
    title: "Landlord Tax Explained: What UK Landlords Pay in 2026/27",
    description:
      "Income tax on rental profit, Section 24, allowable expenses, CGT, stamp duty and inheritance tax, explained with 2026/27 figures and worked examples.",
    url: `${siteConfig.url}/landlord-tax`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Landlord Tax Explained: What UK Landlords Pay in 2026/27",
    description:
      "Income tax on rental profit, Section 24, allowable expenses, CGT, stamp duty and inheritance tax, explained with 2026/27 figures.",
  },
};

/**
 * Self-identification prompts, the whole-of-landlord-tax set.
 *
 * Same device as the homepage `ProblemStatement`, and deliberately NOT the same
 * prompts. The homepage set is written for a reader who has not yet said what
 * they own; this page is read by someone who already knows they are a landlord
 * and cannot work out what they owe, so every line here is about the size and
 * shape of the bill rather than about finding an accountant.
 *
 * First person on purpose, and deliberately UNATTRIBUTED. Keep the count EVEN:
 * the zigzag offset in `PromptMarquee` alternates on index, so an odd set flips
 * the pattern at the loop seam and it shows.
 */
const landlordTaxPrompts: Prompt[] = [
  {
    tag: "I do not know what my real rate is",
    text: "After the mortgage there is very little left, and the tax bill does not seem to reflect that at all.",
    icon: PoundSterling,
  },
  {
    tag: "I do not know which taxes I am in for",
    text: "Stamp duty, income tax, capital gains, inheritance tax. I have no idea which of them apply to me and when.",
    icon: HelpCircle,
  },
  {
    tag: "I am not sure what I can claim",
    text: "I keep every receipt and I still do not know which of them actually come off the rent.",
    icon: Receipt,
  },
  {
    tag: "I only find out after the event",
    text: "I hear about a deadline or a rule change once it has already cost me something.",
    icon: CalendarClock,
  },
  {
    tag: "Personally or in a company?",
    text: "I have read both answers a hundred times and neither of them was about a portfolio like mine.",
    icon: Building2,
  },
  {
    tag: "My return gets filed, nothing gets advised",
    text: "Someone submits it every January. Nobody has ever told me what I could be doing differently.",
    icon: UserX,
  },
];

/**
 * The six taxes, as a card grid rather than full-width bars.
 *
 * These were `label` + `body` strings that ran on grammatically ("Income tax
 * every year *on your rental profit*"), which reads fine in a sentence and not
 * at all when the label becomes a card heading. Each body is now a standalone
 * sentence, and the timing moves to `outcome`: a reader scanning the list is
 * asking "when does this one hit me", and that is the answer.
 */
const propertyTaxes: CoverageItem[] = [
  {
    title: "Stamp duty",
    body: "An additional-dwelling surcharge on top of the normal rate, on every residential property you buy that is not your only home.",
    outcome: "Paid within 14 days of completion",
    icon: Receipt,
  },
  {
    title: "Income tax",
    body: "Charged on your rental profit at 20%, 40% or 45%, with mortgage interest relieved separately at the basic rate only.",
    outcome: "Every year, through Self Assessment",
    icon: Banknote,
  },
  {
    title: "Capital gains tax",
    body: "Charged at 18% or 24% on residential property, on the gain rather than the sale price.",
    outcome: "Reported and paid within 60 days of completion",
    icon: TrendingUp,
  },
  {
    title: "Inheritance tax",
    body: "Charged at 40% on the net value of the portfolio in your estate, with no business relief because letting counts as investment.",
    outcome: "On death, unless the structure changes first",
    icon: Landmark,
  },
  {
    title: "Corporation tax and dividend tax",
    body: "Replaces income tax if you hold through a limited company: 19% to 25% on profits, then 10.75% to 39.35% on what you extract.",
    outcome: "Two charges instead of one, on company-held property",
    icon: Building2,
  },
  {
    title: "Annual tax on enveloped dwellings",
    body: "An annual charge on company-held residential property worth over £500,000. Letting to unconnected tenants relieves it in full, but only if you claim.",
    outcome: "A return every April, even when the relief reduces it to nil",
    icon: CalendarClock,
  },
];

const bandRows: Array<[string, string, string]> = [
  ["Personal allowance", "Up to £12,570", "0%"],
  ["Basic rate", "£12,571 to £50,270", "20%"],
  ["Higher rate", "£50,271 to £125,140", "40%"],
  ["Additional rate", "Over £125,140", "45%"],
];

const exampleRows: Array<[string, string]> = [
  ["Rent received", "£24,000"],
  ["Less allowable expenses", "(£4,000)"],
  ["Taxable property profit (before finance costs)", "£20,000"],
  ["Total taxable income with salary", "£52,430"],
  ["Income tax before the reducer", "£13,432"],
  ["Section 24 reducer (20% of £9,000)", "(£1,800)"],
  ["Income tax due", "£11,632"],
  ["Tax attributable to the property", "£5,146"],
];

/**
 * The Section 24 shortfall, per band.
 *
 * This was the third paragraph of the Section 24 section: three bands, two tax
 * years and two rates each, argued in prose. Laying it out this way makes the
 * section's actual point visible without asserting it: the 2027 column moves
 * every number and the gap column does not move at all.
 */
const section24Rows: Array<[string, string, string, string]> = [
  ["Basic rate", "20%, then 22%", "20%, then 22%", "No gap"],
  ["Higher rate", "40%, then 42%", "20%, then 22%", "20 points"],
  ["Additional rate", "45%, then 47%", "20%, then 22%", "25 points"],
];

/**
 * Everything deductible, in one list. The two entries carrying rates and
 * conditions run to two lines where the rest run to one; kept last, and an even
 * count, so they pair off in the final row of the two-column grid.
 */
const allowableExpenses = [
  "Letting agent and management fees",
  "Landlord insurance",
  "Ground rent and service charges",
  "Gas safety and EICR certificates",
  "Accountancy fees",
  "Advertising for tenants",
  "Legal fees on short leases",
  "Council tax, utilities and cleaning during void periods",
  "Travel to the property, at 55p per mile for the first 10,000 business miles from 6 April 2026, then 25p",
  "Replacement of domestic items relief on like-for-like furniture, appliances and soft furnishings, but not the initial purchase",
];

/**
 * Repair against improvement, side by side. This is described on the page as
 * the dividing line that causes most enquiries, and it was a paragraph in which
 * both sides of the line, both outcomes and both examples were interleaved. Two
 * columns is what the content already was.
 */
const repairVsImprovement = [
  {
    heading: "Repair",
    rule: "Restoring something to the condition it was already in, like replacing a worn kitchen with a comparable one.",
    relief: "Deductible now, against this year's rental income",
  },
  {
    heading: "Improvement",
    rule: "Making something better than it was, like extending that kitchen.",
    relief: "Capital: added to the base cost and relieved against capital gains tax when you sell",
  },
];

/**
 * The purchase surcharge, by jurisdiction. The reader only needs the row for
 * where they are buying, so this is a lookup and the rate leads.
 *
 * Wales carries no single headline rate because it does not have one, it has a
 * separate higher-rates table. That reads as an odd tile next to two
 * percentages, and it stays that way: inventing a Welsh figure to make the row
 * symmetrical would be a factual claim the client has to stand behind.
 */
const purchaseSurcharge = [
  {
    place: "England and Northern Ireland",
    rate: "5%",
    detail: "Surcharge on the whole purchase price, on top of the standard SDLT bands",
  },
  {
    place: "Scotland",
    rate: "8%",
    detail: "Additional Dwelling Supplement, charged on top of LBTT",
  },
  {
    place: "Wales",
    rate: "Higher rates",
    detail: "A separate higher-rates LTT table rather than a flat surcharge",
  },
];

/** What the finance cost restriction bites on, and what it leaves alone. */
const section24Covered = [
  "Mortgage interest",
  "Interest on loans to buy furnishings",
  "Overdraft interest",
  "Arrangement and broker fees",
];

const section24Excluded = [
  "Limited companies",
  "Commercial property",
  "Furnished holiday lets, before the regime ended",
];

/**
 * Personal ownership against a company, as a table. Every figure here is
 * already in the prose around it, including the £5,146 from the worked example
 * further up the page.
 */
const structureRows: Array<[string, string, string]> = [
  ["Mortgage interest", "Basic-rate reducer only, under Section 24", "Deducted in full"],
  [
    "Tax on profit",
    "Income tax at 20%, 40% or 45%",
    "Corporation tax at 19% up to £50,000 of profit, 25% from £250,000",
  ],
  ["On the worked example above", "£5,146", "About £2,090"],
  [
    "Getting the cash out",
    "It is already yours",
    "Dividend tax at 10.75%, 35.75% or 39.35% from 6 April 2026, above a £500 allowance",
  ],
  [
    "Moving existing property in",
    "Nothing to do",
    "A disposal at market value: CGT on the gain and SDLT with the surcharge on the same day",
  ],
  ["Buy-to-let lending", "Standard rates", "Priced higher"],
];

/**
 * The late-filing ladder. The six and twelve month entries carry no figure
 * because the rules do not set one: they are a percentage of the tax
 * outstanding, and inventing a number to square off the row would be a claim
 * the client has to stand behind.
 */
const penaltySteps = [
  { when: "The day after 31 January", penalty: "£100", note: "Applies even if no tax is owed" },
  { when: "Three months late", penalty: "£10 a day", note: "For up to 90 days, on top of the £100" },
  { when: "Six months late", penalty: "A further penalty", note: "Based on the tax outstanding" },
  { when: "Twelve months late", penalty: "A further penalty", note: "Based on the tax outstanding" },
];

/**
 * The three inheritance tax points, as one list. The first two are reliefs a
 * landlord expects to catch this and neither does, so they carry the page's
 * negation glyph. The third is not a fourth relief and must not look like one:
 * it is the section's conclusion, and it gets the clock and the emerald the
 * page uses elsewhere for the thing to act on.
 */
const ihtPoints: Array<{ title: string; body: string; tone: "excluded" | "action"; inline?: boolean }> = [
  {
    title: "Do not count on business relief",
    body: "Letting residential property is treated as holding investments rather than trading, so the combined £2.5m 100% relief allowance introduced from April 2026 does nothing for a standard buy-to-let portfolio. Furnished holiday lets rarely qualify either without a genuinely exceptional level of service.",
    tone: "excluded",
  },
  {
    title: "The residence nil-rate band does not cover rental property",
    body: "It applies to a home you actually lived in that passes to direct descendants, and it tapers away once the estate exceeds £2m. A portfolio can therefore cost you relief on your own home as well as attracting tax in its own right.",
    tone: "excluded",
  },
  {
    title: "Planning here is slow-moving and structural,",
    body: "which is exactly why it needs to start early.",
    tone: "action",
    inline: true,
  },
];

/** The structural decisions that repay a specialist, from the prose beside it. */
const structuralDecisions = [
  "Whether to incorporate",
  "How to split ownership between spouses",
  "When to sell, and across which tax years",
  "How to treat a refinance",
  "Whether a refurbishment is repair or capital",
  "How the portfolio is going to pass on",
];

const changeRows: Array<[string, string, string]> = [
  [
    "Rates on property income",
    "20% / 40% / 45%, taxed with other income",
    "Separate property rates of 22% / 42% / 47% from 6 April 2027 (England, Wales and NI; Scotland sets its own)",
  ],
  [
    "Section 24 finance cost reducer",
    "20% basic-rate credit",
    "22% from 6 April 2027, tracking the new property basic rate",
  ],
  [
    "Making Tax Digital for Income Tax",
    "Mandatory above £50,000 from April 2026",
    "Above £30,000 from April 2027, then above £20,000 from April 2028",
  ],
  [
    "Writing down allowance (main pool)",
    "14%, reduced from 18%",
    "14%, with a 40% first-year allowance on qualifying main-pool spend",
  ],
  ["Dividend tax rates", "10.75% / 35.75% / 39.35% from 6 April 2026", "Unchanged"],
  ["Mileage for property business travel", "55p per mile for the first 10,000 miles", "Unchanged"],
  ["Inheritance tax thresholds", "Frozen", "Frozen until 5 April 2031"],
];

const faqs: FaqEntry[] = [
  {
    question: "How much tax do I pay on rental income?",
    answer:
      "You pay income tax at your normal rate on your rental profit, which is rent received less allowable expenses. For 2026/27 rental profit is taxed alongside your other income at 20% within the basic-rate band, 40% between £50,270 and £125,140, and 45% above that, after your £12,570 personal allowance. From 6 April 2027 property income has its own rates of 22%, 42% and 47% (England, Wales and Northern Ireland; Scottish taxpayers pay Holyrood-set rates), and the Section 24 reducer rises from 20% to the new 22% property basic rate at the same time. Mortgage interest is not an expense: it is relieved separately as that tax credit, so your effective rate on cash profit can be far higher than your headline band.",
  },
  {
    question: "Do I have to declare rental income under £1,000?",
    answer:
      "No. The £1,000 property allowance covers gross rental income up to that amount, and if that is your only property income you do not need to report it. Above £1,000 you either deduct the allowance instead of your actual expenses or claim actual expenses, whichever gives the lower profit. You cannot do both.",
  },
  {
    question: "Is mortgage interest tax deductible for landlords?",
    answer:
      "Not as a deduction. Individual landlords cannot deduct mortgage interest from rental income. Instead you get a basic-rate tax reducer worth 20% of the finance costs for 2026/27, rising to 22% from 6 April 2027 because the reducer tracks the new property basic rate that applies once property income is taxed at 22%, 42% and 47%. The restriction, known as Section 24, applies to interest, arrangement fees and the interest element of most finance. Limited companies are outside it and deduct finance costs in full.",
  },
  {
    question: "How much landlord tax do I pay if I am a higher-rate taxpayer?",
    answer:
      "Your rental profit is taxed at 40%, and because mortgage interest only attracts a 20% credit for 2026/27 you effectively pay tax on income you never keep. A higher-rate landlord with £20,000 of profit before finance costs and £9,000 of mortgage interest keeps £11,000 in cash and pays about £5,146 in tax on it, an effective rate near 47%. It does not improve in 2027/28: the reducer rises to 22%, but property income is taxed at 42% in the higher band from 6 April 2027, so the same landlord pays about £5,366, closer to 49% of the cash.",
  },
  {
    question: "What expenses can landlords claim?",
    answer:
      "Costs incurred wholly and exclusively for the letting: letting agent and management fees, landlord insurance, ground rent and service charges, repairs and maintenance (not improvements), safety certificates, accountancy fees, advertising for tenants, council tax and utilities during void periods, and mileage at 55p per mile for the first 10,000 business miles from 6 April 2026. Replacement of domestic items relief covers like-for-like replacement of furniture and appliances in a let residential property.",
  },
  {
    question: "Do I pay capital gains tax when I sell a rental property?",
    answer:
      "Yes, on the gain rather than the sale price. For 2026/27 residential property gains are taxed at 18% within your unused basic-rate band and 24% above it, after the £3,000 annual exempt amount. Where capital gains tax is due, you must report the disposal and pay the tax within 60 days of completion, separately from your tax return. If the gain is fully covered by private residence relief, losses or the annual exempt amount, no 60-day return is needed, though the disposal may still go on your tax return.",
  },
  {
    question: "How much stamp duty do landlords pay?",
    answer:
      "In England and Northern Ireland a buy-to-let or additional dwelling pays the standard SDLT bands plus a 5% surcharge on the whole purchase price. Scotland charges LBTT with an 8% Additional Dwelling Supplement, and Wales applies a separate higher-rates LTT table. Companies pay the surcharge too, and residential purchases over £500,000 by a company can fall into the 17% flat charge unless a relief such as property rental business relief applies.",
  },
  {
    question: "Should I own rental property personally or through a limited company?",
    answer:
      "It depends on your marginal rate, how geared the portfolio is, and whether you need to draw the profit. Companies deduct mortgage interest in full and pay 19% corporation tax up to £50,000 of profit, which suits geared higher-rate landlords who reinvest. Extracting profit adds dividend tax at 10.75%, 35.75% or 39.35% from 6 April 2026, and moving existing property in triggers CGT and SDLT on the same day unless incorporation relief applies, which since FA 2026 has to be claimed rather than arriving automatically.",
  },
  {
    question: "When do landlords have to use Making Tax Digital?",
    answer:
      "From April 2026 if your combined self-employment and property income is above £50,000, from April 2027 if it is above £30,000, and from April 2028 if it is above £20,000. You then keep digital records and send quarterly updates plus a year-end final declaration, rather than one annual return.",
  },
  {
    question: "What happens to my rental portfolio when I die?",
    answer:
      "It forms part of your estate for inheritance tax at 40% above the available nil-rate bands, which are frozen until 5 April 2031. Residential letting is treated as an investment business, so business relief almost never applies, and the residence nil-rate band only covers a home you lived in. Mortgages reduce the taxable value, which is why gearing and ownership structure matter to the eventual bill.",
  },
  {
    question: "What are the penalties for filing a landlord tax return late?",
    answer:
      "An automatic £100 penalty applies the day after the 31 January deadline, even if no tax is due. After three months daily penalties of £10 accrue for up to 90 days, then further penalties at six and twelve months based on the tax outstanding, plus late-payment penalties and interest on the tax itself.",
  },
  {
    question: "Do I need an accountant as a landlord?",
    answer:
      "One property with a simple mortgage and a full-time job usually does not need one. The value appears when there is a structure question, a portfolio, a disposal, joint ownership, a company, non-resident status, or a Making Tax Digital obligation, because those are the situations where the difference between a competent return and an optimised one runs into thousands.",
  },
];

export default function LandlordTaxPage() {
  /**
   * Ours (carve-out 5). Their layout emits FAQPage only, and
   * STRUCTURE_VS_COMPETITORS_2026-08-17.md records this route as one of the two
   * cited as evidence our schema beats the ranking competitor's.
   * BreadcrumbList arrives from `ui/Breadcrumb`.
   */
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Landlord tax explained: what UK landlords pay in 2026/27",
    description:
      "How UK landlords are taxed in 2026/27: income tax on rental profit, the Section 24 finance cost restriction, allowable expenses, capital gains tax, the stamp duty surcharge and inheritance tax.",
    inLanguage: "en-GB",
    datePublished: "2026-08-05",
    dateModified: "2026-08-05",
    author: { "@type": "Organization", "@id": `${siteConfig.url}#organization`, name: siteConfig.name },
    publisher: { "@id": `${siteConfig.url}#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}/landlord-tax` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqPageJsonLd(faqs)) }}
      />

      <section
        className={`relative flex items-center py-10 sm:py-12 lg:py-14 min-h-[380px] sm:min-h-[440px] lg:min-h-[460px] overflow-hidden ${heroCreamSurface}`}
      >
        <HeroBrickBackdrop tone="cream" />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Landlord tax" }]} />
            <h1 className="mt-4 sm:mt-6 text-2xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-6xl">
              Landlord tax explained: what you pay on UK rental property in 2026/27
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-slate-700">
              Rental profit is taxed at your normal income tax rate, but mortgage interest is not deductible, so a
              geared higher-rate landlord can pay close to half of the cash they keep. Here is every tax that
              touches a let property, what changes next April, and where the money actually goes.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Link
                href="#book"
                data-cta="hero_book"
                data-cta-placement="hero"
                data-cta-goal="form"
                className={`${btnPrimary} bg-emerald-600 text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-3.5 text-center`}
              >
                Book a landlord tax review
              </Link>
              <Link
                href="#free-tools"
                data-cta="hero_calculators"
                data-cta-placement="hero"
                className={`${btnOnCream} text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-3.5 text-center`}
              >
                Work out your rental tax
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip, same treatment as the service pages: white with a hairline,
          so it reads as a break from the hero rather than a section of its own.
          Shared `siteStats`, so nothing new is claimed here. */}
      <section className="border-b border-slate-200 bg-white py-5 sm:py-7">
        <div className={siteContainerLg}>
          <StatsCounter stats={siteStats} />
        </div>
      </section>

      {/* Self-identification, before the explanation. This page is long and it
          teaches from the first line; a reader arriving from search has a
          complaint rather than a vocabulary, and needs somewhere to recognise
          themselves before any of it lands. */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <Eyebrow>Sound familiar?</Eyebrow>
              <h2 className="text-2xl font-bold text-slate-900 text-balance sm:text-4xl">
                There is no single landlord tax rate to look up
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 sm:mt-6 sm:text-lg">
                What you pay depends on your other income, how geared the property is, whose name it is in and how
                long you hold it. Six different taxes touch a let property, and they arrive at different points in
                the life of the investment.
              </p>
              <p className="mt-6 text-base font-bold leading-relaxed text-slate-900 text-balance sm:text-lg">
                If one of these is the sentence going round your head, the answer is a number, and you can have it.
              </p>
              <Link
                href="#book"
                data-cta="triggers_book"
                data-cta-placement="triggers"
                data-cta-goal="form"
                className={`${btnPrimary} mt-6 w-full sm:mt-8 sm:w-auto`}
              >
                Book a landlord tax review
              </Link>
            </div>
            <PromptMarquee prompts={landlordTaxPrompts} />
          </div>
        </div>
      </section>

      <section id="what-tax" className="scroll-mt-24 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>The full picture</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">What tax do UK landlords pay?</h2>
          <Prose>
            <p>
              Six taxes touch a let residential property, and they arrive at different points in the life of the
              investment.
            </p>
            <p>
              There is no single landlord tax rate to look up. What you pay is driven by your other income, how
              geared the property is, whose name it is in, and how long you hold it.
            </p>
            <p>
              For the current bands and thresholds in table form, see our{" "}
              <InlineLink href="/property-tax-rates">UK property tax rates reference</InlineLink>.
            </p>
          </Prose>
          <CoverageCards items={propertyTaxes} columns={3} tone="slate" />
        </div>
      </section>

      <section id="rental-income" className="scroll-mt-24 bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Income tax</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">How is rental income taxed?</h2>
          <Prose>
            <p>
              You are taxed on <strong>profit, not rent</strong>. Add up the rent received across all your UK
              properties, deduct allowable expenses, and the balance is added to your other income and taxed at
              your marginal rate. All your UK residential lettings are pooled into one property business, so a loss
              on one flat reduces the profit on another.
            </p>
            <p>For 2026/27 the rates that apply to that profit are:</p>
          </Prose>

          <div className="mt-6 overflow-x-auto rounded-xl bg-white p-5 sm:p-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-slate-300 text-left">
                  <th className="py-2 pr-4 font-bold text-slate-900">Band</th>
                  <th className="py-2 pr-4 font-bold text-slate-900">Taxable income</th>
                  <th className="py-2 font-bold text-slate-900">Rate on rental profit</th>
                </tr>
              </thead>
              <tbody>
                {bandRows.map(([band, income, rate]) => (
                  <tr key={band} className="border-b border-slate-200">
                    <td className="py-2 pr-4 text-slate-700">{band}</td>
                    <td className="py-2 pr-4 text-slate-700">{income}</td>
                    <td className="py-2 font-semibold text-slate-900">{rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ExampleFigureNote className="mt-3" />
          </div>

          {/* The tail of this section was three paragraphs, each holding two or
              three unrelated answers. Split one idea per paragraph, with a run-in
              bold lead so the section can be scanned rather than read. */}
          <Prose>
            <p>
              <strong>It stacks on top of your other income.</strong> Rental profit is taxed at the highest rate
              you reach, not at a rate of its own. A salary of £45,000 leaves £5,270 of basic-rate band spare, so
              the first £5,270 of rental profit is taxed at 20% and everything above it at 40%.
            </p>
          </Prose>

          <RentalProfitStack />

          <Prose>
            <p>
              <strong>It counts towards the £100,000 taper.</strong> Above £100,000 the personal allowance is
              withdrawn at £1 for every £2 of income, an effective 60% band that catches more landlords than
              expected.
            </p>
            <p>
              <strong>National Insurance does not apply.</strong> Letting property is investment income rather than
              trading. That changes if the level of service you provide takes the activity into a trade, which is a
              live question for serviced accommodation.
            </p>
            <p>
              <strong>Under £1,000, there is nothing to report.</strong> The property allowance covers gross rental
              income up to that amount. Above it you choose between the £1,000 allowance and your actual expenses,
              and you cannot claim both.
            </p>
            <p>
              Put your own numbers through the{" "}
              <InlineLink href="/calculators/rental-income-tax-calculator">
                rental income tax calculator
              </InlineLink>
              , and if you are filing for the first time, our guide to{" "}
              <InlineLink href="/blog/landlord-tax-essentials/landlord-tax-return-complete-guide-2026">
                filing a landlord tax return
              </InlineLink>{" "}
              walks through the return itself.
            </p>
          </Prose>
        </div>
      </section>

      <section id="section-24" className="scroll-mt-24 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Section 24</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
            What is Section 24 and how much mortgage interest relief do you get?
          </h2>
          <Prose>
            <p>
              Section 24 removed mortgage interest from the list of deductible expenses for individual landlords.
              You now declare the profit before finance costs, then receive a tax reducer worth 20% of the interest
              for 2026/27, rising to 22% from 6 April 2027. The reducer is capped at the lower of your finance
              costs, your property profits, and your total income above the personal allowance.
            </p>
            <p>
              How much mortgage interest relief you actually get depends on your band. The second figure in each
              cell is the 2027/28 rate, once property income moves to its own 22%, 42% and 47%.
            </p>
          </Prose>

          <div className="mt-6 overflow-x-auto rounded-xl bg-slate-50 p-5 sm:p-6">
            <table className="w-full border-collapse text-sm">
              <caption className="sr-only">
                Section 24 mortgage interest relief against tax on property income, by band, for 2026/27 and
                2027/28
              </caption>
              <thead>
                <tr className="border-b-2 border-slate-300 text-left">
                  <th className="py-2 pr-4 font-bold text-slate-900">Your band</th>
                  <th className="py-2 pr-4 font-bold text-slate-900">Tax on property income</th>
                  <th className="py-2 pr-4 font-bold text-slate-900">Section 24 relief</th>
                  <th className="py-2 font-bold text-slate-900">The gap</th>
                </tr>
              </thead>
              <tbody>
                {section24Rows.map(([band, tax, relief, gap]) => (
                  <tr key={band} className="border-b border-slate-200 align-top">
                    <td className="py-2 pr-4 font-semibold text-slate-900">{band}</td>
                    <td className="py-2 pr-4 text-slate-700">{tax}</td>
                    <td className="py-2 pr-4 text-slate-700">{relief}</td>
                    {/* The gap is the column the reader came for, so it is the
                        only one carrying weight. Emerald where there is nothing
                        to pay for, slate-900 bold where there is: the figure is
                        direct-labelled either way, so nothing rests on colour. */}
                    <td className={`py-2 font-bold ${gap === "No gap" ? "text-emerald-700" : "text-slate-900"}`}>
                      {gap}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ExampleFigureNote className="mt-3" />
          </div>

          <Prose>
            <p>
              The 2027 rise to 22% is the first movement in the reducer since the phase-in completed, and it
              changes nothing: it happens because property income moves on the same day, so a higher-rate landlord
              keeps a 20 point shortfall and an additional-rate landlord keeps 25.
            </p>
            <p>
              A basic-rate taxpayer looks safe in that table and often is not. The declared profit is higher than
              the cash you receive, so it can push you into the higher-rate band, trigger the High Income Child
              Benefit Charge from £60,000, or start the personal allowance taper.
            </p>
          </Prose>

          {/* Two lists rather than one sentence of "covers X, does not apply to
              Y". The reader is checking whether they are in scope, which is a
              lookup, and a sentence makes them parse a negation to do it. */}
          <div className="mt-8 grid gap-5 sm:gap-6 md:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70 sm:p-8">
              <h3 className="text-base font-bold text-slate-900 sm:text-lg">The restriction covers</h3>
              <ul className="mt-4 space-y-3">
                {section24Covered.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-700 sm:text-base">
                    <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.5} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70 sm:p-8">
              <h3 className="text-base font-bold text-slate-900 sm:text-lg">It does not apply to</h3>
              <ul className="mt-4 space-y-3">
                {section24Excluded.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-700 sm:text-base">
                    <X aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" strokeWidth={2.5} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Prose>
            <p>
              <InlineLink href="/section-24">Full Section 24 guide</InlineLink> ·{" "}
              <InlineLink href="/calculators/section-24-calculator">Section 24 calculator</InlineLink> ·{" "}
              <InlineLink href="/blog/landlord-tax-essentials/landlord-tax-changes-2026-complete-guide">
                Landlord tax changes for 2026
              </InlineLink>
            </p>
          </Prose>
        </div>
      </section>

      <section id="worked-example" className="scroll-mt-24 bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Worked example</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">How much landlord tax do I pay?</h2>
          <Prose>
            <p>
              Take a landlord with a £45,000 salary and one let flat in 2026/27. Rent is £24,000, running costs are
              £4,000 and mortgage interest is £9,000.
            </p>
          </Prose>

          <div className="mt-6 overflow-x-auto rounded-xl bg-white p-5 sm:p-6">
            <table className="w-full border-collapse text-sm">
              <tbody>
                {exampleRows.map(([label, value], i) => (
                  <tr
                    key={label}
                    className={`border-b border-slate-200 ${i === exampleRows.length - 1 ? "font-bold" : ""}`}
                  >
                    <td className="py-2 pr-4 text-slate-700">{label}</td>
                    <td className="py-2 text-right font-semibold text-slate-900">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Illustrative salary and portfolio, running through statutory rates
                and bands. Both carry the note: the owner ruled that it goes on
                statutory figures too, not only illustrative ones. */}
            <ExampleFigureNote className="mt-3" />
          </div>

          <Prose>
            <p>
              The cash left after the mortgage is £11,000, so £5,146 of tax is an effective rate of about{" "}
              <strong>47% on money actually received</strong>, against a headline higher rate of 40%. That gap is
              Section 24 in one number.
            </p>
            <p>
              Run the same figures under the 2027/28 rules and the answer moves the wrong way. The £20,000 of
              property profit is taxed at the separate property rates: £5,270 of it falls in the basic band at 22%
              (£1,159) and the remaining £14,730 at 42% (£6,187), so £7,346 before relief. The reducer rises to 22%
              of £9,000, or £1,980, leaving £5,366 attributable to the property against £5,146 for 2026/27. On the
              same £11,000 of cash that is an effective rate near 49%. The extra 2% of relief is worth £180; the
              extra 2% on the property income costs £400.
            </p>
            <p>
              Push the mortgage interest to £15,000 and the picture turns: profit before finance costs is still
              £20,000, cash retained falls to £5,000, and the tax bill barely moves. That is the point at which
              gearing, ownership structure and pension contributions stop being optional considerations.
            </p>
          </Prose>

          {/* A link to #book rather than an inline capture, by explicit
              instruction: one form per page, and that form is the navy panel at
              the foot. An inline MiniCapture was tried here and removed. */}
          <div className="mt-10 rounded-xl bg-white p-6 ring-1 ring-slate-200 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-8">
            <p className="text-base font-bold text-slate-900 sm:text-lg">Want to know your own effective rate?</p>
            <Link
              href="#book"
              data-cta="worked_example_book"
              data-cta-placement="worked_example"
              data-cta-goal="form"
              className={`${btnPrimary} mt-4 w-full sm:mt-0 sm:w-auto sm:shrink-0`}
            >
              Book a landlord tax review
            </Link>
          </div>
        </div>
      </section>

      <section id="expenses" className="scroll-mt-24 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Deductions</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">Which expenses can landlords deduct?</h2>
          <Prose>
            <p>Anything incurred wholly and exclusively for the letting business is deductible. The usual claims:</p>
          </Prose>

          <ul className="mt-6 grid gap-x-8 gap-y-4 md:grid-cols-2">
            {allowableExpenses.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-700 sm:text-base">
                <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.5} />
                {item}
              </li>
            ))}
          </ul>

          <Prose>
            <p>
              The safety and licensing side has its own cycle, cost and capital versus revenue split, set out in
              our <InlineLink href="/landlord-compliance">landlord compliance guide</InlineLink>, and the{" "}
              <InlineLink href="/blog/section-24-and-tax-relief/landlord-tax-deductions-uk-2026-complete-list">
                full list of landlord tax deductions
              </InlineLink>{" "}
              goes further than the summary above.
            </p>
            <p>
              The dividing line that causes most enquiries is <strong>repair versus improvement</strong>. Both are
              money spent on the property. Only one of them comes off this year&apos;s rent.
            </p>
          </Prose>

          {/* Emerald on the deductible side and slate on the capital side, but
              the relief line spells out the outcome in both cards, so the
              distinction never rests on colour. */}
          <div className="mt-6 grid gap-5 sm:gap-6 md:grid-cols-2">
            {repairVsImprovement.map((side, i) => {
              const isRepair = i === 0;
              return (
                <div
                  key={side.heading}
                  className={`flex flex-col rounded-xl p-6 ring-1 sm:p-8 ${
                    isRepair ? "bg-emerald-50/60 ring-emerald-200" : "bg-slate-50 ring-slate-200/70"
                  }`}
                >
                  <h3 className="text-base font-bold text-slate-900 sm:text-lg">{side.heading}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">{side.rule}</p>
                  <p
                    className={`mt-auto pt-5 text-sm font-bold leading-relaxed ${
                      isRepair ? "text-emerald-700" : "text-slate-900"
                    }`}
                  >
                    {side.relief}
                  </p>
                </div>
              );
            })}
          </div>

          <Prose>
            <p>
              Losses in a property business cannot be set against your salary. They carry forward against future
              profits of the same business indefinitely, which is worth tracking properly, because forgotten losses
              are the most common piece of free relief left unclaimed.
            </p>
          </Prose>
        </div>
      </section>

      <section id="buying" className="scroll-mt-24 bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Buying</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
            What tax do you pay when you buy a rental property?
          </h2>
          <Prose>
            <p>
              Stamp duty, and more of it than an owner-occupier pays. What an additional dwelling costs depends on
              where you are buying.
            </p>
          </Prose>

          {/* Rate-forward tiles rather than the body-text cards used earlier on
              this page. The job here is a single figure per jurisdiction, so the
              figure leads and everything else supports it. */}
          <div className="mt-6 grid gap-5 sm:gap-6 md:grid-cols-3">
            {purchaseSurcharge.map((item) => (
              <div key={item.place} className="rounded-xl bg-white p-6 ring-1 ring-slate-200 sm:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 sm:text-xs">
                  {item.place}
                </p>
                <p className="mt-2 text-3xl font-bold leading-none text-slate-900 sm:text-4xl">{item.rate}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.detail}</p>
              </div>
            ))}
          </div>

          <Prose>
            <p>
              <strong>It is payable within 14 days of completion</strong> in England and Northern Ireland, and it
              is charged on the whole price, not just the slice above a threshold.
            </p>
            <p>
              <strong>Companies pay it from the first pound,</strong> with no zero band. A company buying a single
              residential dwelling for more than £500,000 can also fall into the 17% flat charge unless a relief
              applies, and property rental business relief usually does apply to a genuine letting business. The
              relief is claimed, not automatic, and it can be withdrawn if the property is later occupied by a
              connected person.
            </p>
            <p>
              <strong>Mixed-use and multiple dwellings are worth checking before exchange,</strong> not after. A
              purchase that includes commercial elements is taxed under the non-residential table, which is
              frequently cheaper, and it is far easier to get right at the outset than to reclaim later.
            </p>
            <p>
              <InlineLink href="/calculators/stamp-duty-calculator">Stamp duty calculator</InlineLink>
            </p>
          </Prose>
        </div>
      </section>

      <section id="selling" className="scroll-mt-24 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Selling</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">What tax do you pay when you sell?</h2>
          <Prose>
            <p>
              Capital gains tax on the increase in value, not the sale price. Deduct the original purchase price,
              stamp duty and legal fees on acquisition, capital improvements, and selling costs. The remaining gain
              is reduced by the £3,000 annual exempt amount and taxed at 18% within your unused basic-rate band and
              24% above it for residential property.
            </p>
          </Prose>

          {/* Reused from /services/non-resident-landlord without the rebasing
              card, which is a non-resident concept. The same flag switches the
              60-day wording to the UK-resident rule; see the component. */}
          <div className="mt-6">
            <DisposalFigures showRebasing={false} />
          </div>

          <Prose>
            <p>
              <strong>It is reported separately, and quickly.</strong> Where capital gains tax is due, a UK
              residential disposal goes through a CGT on UK property account within 60 days of completion, with the
              gain also going on your tax return afterwards. Late filing attracts penalties even where the tax has
              been paid.
            </p>
            <p>
              <strong>If it was ever your main home,</strong> private residence relief covers the period of
              occupation plus the final nine months of ownership, and lettings relief may apply where you shared
              occupancy with a tenant.
            </p>
            <p>
              <strong>Transfers between spouses and civil partners happen at no gain no loss.</strong> That is the
              simplest way to use two annual exempt amounts and two basic-rate bands on a sale, provided the
              transfer is made and documented before contracts are exchanged.
            </p>
          </Prose>
        </div>
      </section>

      <section id="inheritance-tax" className="scroll-mt-24 bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Inheritance tax</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
            What happens to your portfolio for inheritance tax?
          </h2>
          <Prose>
            <p>
              Rental property counts in full in your estate at market value less the outstanding mortgage, and
              anything above the available nil-rate bands is taxed at 40%. The nil-rate band, residence nil-rate
              band and the £2m taper threshold are all <strong>frozen until 5 April 2031</strong>, so rising
              property values push more estates over the line every year.
            </p>
          </Prose>

          {/* Three run-in bold paragraphs stated all of this and buried it: the
              reader skims, sees "business relief" and "residence nil-rate band",
              and takes away the opposite of what the sentence says. */}
          <ul className="mt-8 divide-y divide-slate-200 rounded-xl bg-white p-6 ring-1 ring-slate-200/70 sm:p-8">
            {ihtPoints.map(({ title, body, tone, inline }) => {
              const excluded = tone === "excluded";
              const Icon = excluded ? X : CalendarClock;
              return (
                <li key={title} className="flex gap-4 py-5 first:pt-0 last:pb-0">
                  <span
                    aria-hidden
                    className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                      excluded ? "bg-rose-50" : "bg-emerald-50"
                    }`}
                  >
                    {/* Rose on the two excluded rows, the same treatment as the
                        rose X on /section-24's "Who is not affected?", so the
                        page has one negation colour rather than two. The action
                        row keeps its emerald clock: it is the thing to do, not a
                        third relief that fails. */}
                    <Icon
                      className={`h-4 w-4 ${excluded ? "text-rose-600" : "text-emerald-600"}`}
                      strokeWidth={2.5}
                    />
                  </span>
                  {inline ? (
                    <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
                      <strong className="font-bold text-slate-900">{title}</strong> {body}
                    </p>
                  ) : (
                    <div>
                      <h3 className="text-base font-bold text-slate-900 sm:text-lg">{title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">{body}</p>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* The one dark band on the page. Twelve body sections alternating white
          and slate-50 read as one undifferentiated run at scroll speed, and this
          is the section with the most urgency in it: everything here is dated and
          most of it is coming. The table keeps its card and turns white, the same
          treatment ComparisonTable got on /services/landlord-accountant, so no
          dark variant of the table markup is needed. */}
      <section id="changes" className="scroll-mt-24 relative overflow-hidden bg-slate-900 py-12 sm:py-16 lg:py-20">
        <HeroBrickBackdrop />
        <div className={`${siteContainerLg} relative z-10`}>
          <Eyebrow onDark>What&apos;s changing</Eyebrow>
          <h2 className="text-2xl font-bold text-white sm:text-4xl">
            What changes for landlords in 2026/27 and 2027/28?
          </h2>
          <Prose onDark>
            <p>
              Two changes matter more than the rest: Making Tax Digital arriving for landlords, and property income
              getting its own tax rates from 6 April 2027, which is also why the Section 24 reducer moves for the
              first time in years.
            </p>
          </Prose>

          <div className="mt-6 overflow-x-auto rounded-xl bg-white p-5 sm:p-6 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.7)]">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-slate-300 text-left">
                  <th className="py-2 pr-4 font-bold text-slate-900">Item</th>
                  <th className="py-2 pr-4 font-bold text-slate-900">2026/27</th>
                  <th className="py-2 font-bold text-slate-900">From 2027/28</th>
                </tr>
              </thead>
              <tbody>
                {changeRows.map(([item, a, b]) => (
                  <tr key={item} className="border-b border-slate-200 align-top">
                    <td className="py-2 pr-4 font-semibold text-slate-900">{item}</td>
                    <td className="py-2 pr-4 text-slate-700">{a}</td>
                    <td className="py-2 text-slate-700">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ExampleFigureNote className="mt-3" />
          </div>

          <Prose onDark>
            <p>
              Making Tax Digital for Income Tax applies from April 2026 where combined self-employment and property
              income exceeds £50,000, from April 2027 above £30,000, and from April 2028 above £20,000. The
              threshold looks at gross income, not profit, so a portfolio with thin margins can be caught while
              producing very little taxable income. Quarterly updates and digital records replace the single annual
              return, and spreadsheets only work if bridged by compatible software. Our{" "}
              <InlineLink href="/making-tax-digital-landlords" onDark>
                Making Tax Digital for landlords guide
              </InlineLink>{" "}
              sets out who is in scope and when, and the{" "}
              <InlineLink href="/calculators/mtd-checker" onDark>
                MTD checker
              </InlineLink>{" "}
              tells you which April catches you.
            </p>
            <p>
              Capital allowances also moved: the main-pool writing down allowance fell from 18% to 14%, the special
              rate pool stays at 6%, and a new 40% first-year allowance applies to qualifying main-pool
              expenditure. These matter for commercial property and communal plant rather than for the fabric of a
              standard residential let.
            </p>
          </Prose>
        </div>
      </section>

      <section id="structure" className="scroll-mt-24 bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Structure</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
            Should you hold rental property personally or in a company?
          </h2>
          <Prose>
            <p>
              The tax on the profit is what drives most incorporation enquiries. It is not the whole picture, and
              the rest of the table is why.
            </p>
          </Prose>

          <div className="mt-6 overflow-x-auto rounded-xl bg-white p-5 sm:p-6">
            <table className="w-full border-collapse text-sm">
              <caption className="sr-only">
                Holding rental property personally against holding it in a limited company
              </caption>
              <thead>
                <tr className="border-b-2 border-slate-300 text-left">
                  <th className="py-2 pr-4 font-bold text-slate-900" />
                  <th className="py-2 pr-4 font-bold text-slate-900">Personally</th>
                  <th className="py-2 font-bold text-slate-900">In a company</th>
                </tr>
              </thead>
              <tbody>
                {structureRows.map(([item, personal, company]) => (
                  <tr key={item} className="border-b border-slate-200 align-top">
                    <td className="py-2 pr-4 font-semibold text-slate-900">{item}</td>
                    <td className="py-2 pr-4 text-slate-700">{personal}</td>
                    <td className="py-2 text-slate-700">{company}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ExampleFigureNote className="mt-3" />
          </div>

          <Prose>
            <p>
              Marginal relief applies between the two corporation tax rates, and moving property in can avoid the
              CGT charge where section 162 incorporation relief or partnership treatment applies. Neither is
              automatic, and section 162 relief in particular is no longer given by default: for transfers on or
              after 6 April 2026 it has to be claimed, by the first anniversary of the 31 January following the tax
              year of the transfer, and the old election to disapply it has been repealed. Stamp duty is charged
              either way.
            </p>
            <p>
              <strong>The rough rule.</strong> Companies suit geared higher-rate landlords who are building a
              portfolio and can leave profit in the business. Personal ownership suits lower gearing, basic-rate
              taxpayers, and anyone who needs the income now or expects to sell within a few years. For how
              incorporation activity has actually moved since Section 24, see our{" "}
              <InlineLink href="/research/landlord-tax-index">landlord tax index research</InlineLink>, and if this
              is your first year of letting, the{" "}
              <InlineLink href="/blog/landlord-tax-essentials/first-time-landlord-tax-guide-everything-you-need-to-know">
                first-time landlord tax guide
              </InlineLink>{" "}
              starts further back.
            </p>
            <p>
              <InlineLink href="/incorporation">Incorporation feasibility analysis</InlineLink>
            </p>
          </Prose>
        </div>
      </section>

      <section id="deadlines" className="scroll-mt-24 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Compliance</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">What are the deadlines and penalties?</h2>
          <Prose>
            <p>
              Register for Self Assessment by 5 October following the tax year in which you first had rental
              income. The online return and any balancing payment are due by 31 January, with payments on account
              on 31 January and 31 July where the previous bill exceeded £1,000. A property sale has its own 60-day
              clock that runs regardless of where you are in the tax year.
            </p>
          </Prose>

          <PenaltyLadder steps={penaltySteps} />

          <Prose>
            <p>
              Late-payment penalties and interest run alongside all of this. If you have unreported rental income
              from earlier years, the Let Property Campaign remains the cheapest route to put it right, with
              materially lower penalties than waiting for an enquiry.
            </p>
            <p>
              Dates for the year are in our{" "}
              <InlineLink href="/blog/landlord-tax-essentials/landlord-tax-calendar-2026-27-key-dates">
                landlord tax calendar for 2026/27
              </InlineLink>
              , and the escalation above is set out in full in{" "}
              <InlineLink href="/blog/landlord-tax-essentials/hmrc-penalties-late-landlord-tax-returns-2026">
                HMRC penalties for late returns
              </InlineLink>
              .
            </p>
          </Prose>
        </div>
      </section>

      <section id="specialist" className="scroll-mt-24 bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Getting help</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">When is a property specialist worth it?</h2>
          <Prose>
            <p>
              A single flat, one mortgage, a PAYE job and nothing unusual is a return you can file yourself. The
              decisions that repay a specialist several times over are the structural ones:
            </p>
          </Prose>

          <ul className="mt-6 grid gap-x-8 gap-y-4 md:grid-cols-2">
            {structuralDecisions.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-700 sm:text-base">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" />
                {item}
              </li>
            ))}
          </ul>

          <Prose>
            <p>
              A generalist accountant files what you give them accurately. The property-specific work is knowing
              that a declaration of trust needed a Form 17 to follow it, that a mixed-use purchase was taxed on the
              wrong table, that a loss from three years ago is still available, or that a disposal should have
              straddled two tax years. Those points are worth more than the compliance fee, and they are only
              visible to someone who looks at rental portfolios every week.
            </p>
            <p>
              What that costs depends on the size of the portfolio and how much of it is structuring rather than
              filing. It is a conversation, not a price list, and the first one is free. Our{" "}
              <InlineLink href="/services/landlord-accountant">landlord accounting service</InlineLink> covers the
              ongoing compliance side of that.
            </p>
          </Prose>
        </div>
      </section>

      {/* Proof, then the tools, then the ask, then the FAQ. The testimonials sit
          ABOVE the free tools rather than beside `#book` because both are
          full-bleed navy: adjacent they read as one dark slab, and the light
          tools block between them is what keeps the band alternating. */}
      <TestimonialsSection
        eyebrow="Testimonials"
        title="Landlords who have had this reviewed"
        description="Anonymised feedback from landlords and investors we have worked with on exactly these questions."
      />

      {/* Free tools, the hero's secondary CTA target. White, because "Getting
          help" directly above is slate-50. */}
      <section id="free-tools" className="scroll-mt-24 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Free tools</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">Put numbers on your own position</h2>
          <p className="mt-4 text-sm sm:text-base text-slate-700">
            Free, and the figures are yours to take to any adviser.
          </p>
          <div className="mt-8 sm:mt-10">
            <CalculatorTabs />
          </div>
        </div>
      </section>

      {/* The closing ask, and the target every `#book` link on this page points
          at. Was a contained mint CTASection that sent the reader to /contact and
          /services: the least assertive block on a page whose job is to hand off
          to a service. */}
      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          title="Get your landlord tax position reviewed"
          description="Tell us what you own, how it is geared and whose name it is in. We will tell you what your effective rate actually is and what, if anything, is worth changing."
          proofPoints={[
            { title: "Property tax only", detail: "Section 24, CGT and MTD every day" },
            { title: "Fixed fees, quoted upfront", detail: "In writing, before any work starts" },
            { title: "24-hour response", detail: "Usually the same working day" },
          ]}
          footnote="No obligation and no hard sell. If your position is already right, we will say so."
        />
      </div>

      <div id="faqs" className="scroll-mt-24">
        <FaqSection title="Landlord tax questions" faqs={faqs} className="bg-white py-12 sm:py-16 lg:py-20" />
      </div>
    </>
  );
}
