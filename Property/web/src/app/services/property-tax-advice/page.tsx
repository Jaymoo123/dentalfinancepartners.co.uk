import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeftRight,
  Building2,
  CalendarClock,
  Factory,
  FileWarning,
  Globe2,
  Home,
  Landmark,
  Percent,
  ShieldQuestion,
  UserX,
  Users,
} from "lucide-react";
import { HeroBrickBackdrop } from "@/components/layout/HeroBrickBackdrop";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProcessTimeline } from "@/components/property/ProcessTimeline";
import { StatsCounter } from "@/components/property/StatsCounter";
import { TestimonialsSection } from "@/components/property/TestimonialsSection";
import { siteStats } from "@/lib/site-stats";
import { ComparisonTable, type ComparisonRow } from "@/components/property/ComparisonTable";
import { DrawnTickList } from "@/components/property/DrawnTickList";
import { DecisionWindow } from "@/components/property/DecisionWindow";
import { CoverageCards, type CoverageItem } from "@/components/property/CoverageCards";
import { PromptMarquee, type Prompt } from "@/components/property/PromptMarquee";
import { LeadCTAPanel } from "@/components/property/LeadCTAPanel";
import { FaqSection } from "@/components/ui/FaqSection";
import { Eyebrow, InlineLink } from "@/components/ui/page-blocks";
import { btnOnCream, btnPrimary, heroCreamSurface, siteContainerLg } from "@/components/ui/layout-utils";
import { buildFaqPageJsonLd, type FaqEntry } from "@/lib/faq-page-schema";
import { siteConfig } from "@/config/site";
import { CalculatorTabs } from "@/components/calculators/CalculatorTabs";
import { CalculatorLinkCards } from "@/components/calculators/CalculatorLinkCards";

const PAGE_PATH = "/services/property-tax-advice";
const pageUrl = `${siteConfig.url}${PAGE_PATH}`;

/**
 * Ours, kept whole (carve-out 5). Their version is retitled to "Property Tax
 * Advice | One-Off Specialist Consultations" and carries neither hreflang nor a
 * twitter card. Our title was set against the collision pre-flight in
 * expansion_research/_prop_audit_2026_08_05/wave_brief_shared.md (commit
 * bbfe0437), which the designer never saw; re-running that matrix needs the
 * surface map rather than a judgement, so the retitle is recorded and not
 * adopted. Same brief mandates Service + FAQPage + BreadcrumbList and "link 4-8
 * relevant existing blog posts in-body": both are restored below.
 */
export const metadata: Metadata = {
  title: "Property Tax Advice from Specialist Advisors",
  description:
    "Specialist property tax advice for UK landlords and investors: one-off consultations on structuring, CGT timing, capital allowances and portfolio IHT. Written advice, no ongoing tie-in.",
  alternates: {
    canonical: pageUrl,
    languages: {
      "en-GB": pageUrl,
      "x-default": pageUrl,
    },
  },
  openGraph: {
    title: "Property Tax Advice from Specialist Advisors",
    description:
      "One-off property tax consultations for UK landlords and investors: structuring, CGT timing, capital allowances, portfolio IHT. Written advice you can act on.",
    url: pageUrl,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Property Tax Advice from Specialist Advisors",
    description:
      "One-off property tax consultations for UK landlords and investors: structuring, CGT timing, capital allowances, portfolio IHT.",
  },
};

/**
 * The six advice areas, with the designer's `outcome` lines added. Each names
 * the deliverable rather than the topic, and they are new copy worth having
 * (report 03 §7.2).
 */
const coverage: CoverageItem[] = [
  {
    title: "Structuring and ownership",
    outcome: "The ownership structure that fits your numbers, and what moving to it would cost.",
    icon: Building2,
    body: "Whether a property should sit personally, jointly, in a limited company, in a family investment company or under a declaration of trust. The answer moves with your marginal rate, your spouse's rate, your borrowing, and what you plan to do with the property in ten years. We model the options against your actual numbers rather than the general case.",
  },
  {
    title: "Capital gains tax timing and reliefs",
    outcome: "A disposal order and timetable built around the reliefs you can actually claim.",
    icon: CalendarClock,
    body: "When to sell, what order to sell in, how to use main residence relief and private residence elections properly, whether a loss can be crystallised in the same tax year, and how the 60-day reporting deadline changes your cash planning. Timing a disposal across two tax years is often worth more than any single relief.",
  },
  {
    title: "Section 24 mitigation",
    outcome: "The mitigations that are proportionate to your exposure, and the ones that are not.",
    icon: Percent,
    body: "The finance cost reducer is 20% now and rises to 22% from April 2027, in step with the new property income rates of 22%, 42% and 47%, so the wedge for a higher-rate landlord stays 20 points. Advice here covers what actually reduces your exposure: pension contributions, spouse allocation, deductible expense discipline, refinancing decisions, and whether incorporation is proportionate to the saving.",
  },
  {
    title: "Capital allowances on commercial and mixed property",
    outcome: "The allowances your purchase qualifies for, and the elections needed to claim them.",
    icon: Factory,
    body: "Embedded plant and machinery in commercial buildings, furnished holiday let history, and fixtures elections on purchase. Writing down allowances fall from 18% to 14%, a new 40% first year allowance applies, and the special rate pool stays at 6%. Most buyers of commercial property never claim what they are entitled to.",
  },
  {
    title: "Inheritance tax and portfolio succession",
    outcome: "A gifting and succession sequence, and a clear view of what your executors face.",
    icon: Users,
    body: "Rental property is investment property, so business relief rarely applies. Thresholds are frozen to 5 April 2031, and the combined 100% business and agricultural relief allowance is capped at £2.5m from April 2026. Advice covers gifting sequences, the seven year clock, freezer share structures and what your executors will face.",
  },
  {
    title: "Non-resident and cross-border positions",
    outcome: "The residence and reporting sequence for your position, in the order HMRC expects.",
    icon: Globe2,
    body: "Living abroad while letting UK property, the non-resident landlord scheme, non-resident CGT reporting, treaty relief, and how a return to the UK changes your position. Getting the residence and reporting sequence wrong keeps HMRC's discovery window open for years.",
  },
];

/**
 * Theirs, adopted: the six triggers said the way a reader would say them. A
 * described problem gets skimmed, a sentence you would actually say stops you.
 *
 * Keep this EVEN in length. The marquee zigzags on index and an odd set shows a
 * seam where the loop joins.
 */
const triggerPrompts: Prompt[] = [
  {
    tag: "I am about to buy or sell",
    text: "I exchange in a few weeks and nobody has checked how it should be structured.",
    icon: Home,
  },
  {
    tag: "My accountant only files",
    text: "My return goes in on time, but nobody has modelled my position in three years.",
    icon: UserX,
  },
  {
    tag: "HMRC has written to me",
    text: "There is a letter about undeclared rent and I do not know how to answer it.",
    icon: FileWarning,
  },
  {
    tag: "I am restructuring the portfolio",
    text: "Moving properties into a company, and everyone I ask quotes a different number.",
    icon: ArrowLeftRight,
  },
  {
    tag: "I have inherited a property",
    text: "I do not know whether to sell it, let it, or pass it on again.",
    icon: Landmark,
  },
  {
    tag: "I have been offered a scheme",
    text: "Someone has proposed a structure and I want it checked before I commit money.",
    icon: ShieldQuestion,
  },
];

/**
 * Ours, kept. Their re-layout replaced these six two-to-three-sentence
 * explanations with the six one-line prompts above, which report 03 §7.2 costs
 * at roughly 250 words of substance traded for 80 words of recognition cue. The
 * two do different jobs and PLAN 6.3 keeps both: the prompts are the hook, these
 * are the substance, and they sit in the same section so the reader who
 * recognises themselves in a card can read what it actually means underneath.
 */
const scenarios = [
  {
    title: "You are about to buy or sell and want the decision checked first",
    body: "The cheapest advice is the advice you take before you exchange. Ownership name, funding structure, SDLT surcharges and multiple dwellings treatment are all fixed on completion day and expensive to unwind afterwards.",
  },
  {
    title: "Your accountant files your return but never advises",
    body: "Compliance and advice are different jobs. If nobody has modelled your position for three years, you are almost certainly paying tax you did not need to pay, or carrying a risk nobody has priced.",
  },
  {
    title: "You have an HMRC letter, an enquiry or an undisclosed period",
    body: "A nudge letter, a Let Property Campaign disclosure or a formal enquiry needs a considered position before you reply. What you say first shapes the whole enquiry.",
  },
  {
    title: "You are restructuring a portfolio",
    body: "Moving properties between spouses, into a company, into a trust or across a group has capital gains, stamp duty, mortgage and inheritance tax consequences that only make sense modelled together.",
  },
  {
    title: "You have inherited property and do not know what to do with it",
    body: "Probate value sets your base cost, the estate may still be settling, and the choice between selling, letting or transferring changes both your tax bill and the estate's.",
  },
  {
    title: "You want a second opinion on advice you have already been given",
    body: "A scheme, a structure or a plan someone else has proposed, reviewed independently before you commit money to it. We tell you where it holds and where it does not.",
  },
];

const engagement = [
  {
    n: "01",
    title: "Scoping call",
    body: "A short conversation about the decision you are facing, the properties involved and your wider tax position. We tell you whether the question needs a consultation at all, and if it does not, we say so.",
  },
  {
    n: "02",
    title: "Fixed scope and fee",
    body: "You get the question written down, the work required to answer it, the fee, and the turnaround before anything starts. No hourly billing and no open-ended engagement.",
  },
  {
    n: "03",
    title: "Analysis and modelling",
    body: "We work through your figures, model the realistic options, and stress test them against the rules as they stand and as they are legislated to change. Where the answer depends on an assumption, we show you the assumption.",
  },
  {
    n: "04",
    title: "Written advice and a follow-up call",
    body: "You receive a written note setting out the position, the options with numbers attached, the recommendation and the risks. A call follows so you can push back on it. The note is yours to share with your solicitor, broker or existing accountant.",
  },
  {
    n: "05",
    title: "Implementation, only if you want it",
    body: "Some clients take the advice and act on it themselves. Others ask us to run the elections, filings and coordination. Both are fine. The consultation does not commit you to anything ongoing.",
  },
];

const comparison: ComparisonRow[] = [
  {
    dimension: "Rental income",
    general: "Treats it as a schedule on a tax return",
    specialist:
      "Treats each property as a position with an acquisition history, a base cost, a relief profile and an exit plan",
  },
  {
    dimension: "Finance costs",
    general: "Applies the reducer and moves on",
    specialist:
      "Models whether the reducer, spouse allocation, pension relief or a change of structure produces the better outcome over the holding period",
  },
  {
    dimension: "Commercial purchases",
    general: "Records the purchase at the price paid",
    specialist:
      "Looks for embedded fixtures, checks the section 198 election on purchase and quantifies the allowances before the opportunity is lost",
  },
  {
    dimension: "Disposals",
    general: "Reports a disposal after it happens",
    specialist:
      "Plans the disposal year, the ownership split and the reporting deadline before contracts are exchanged",
  },
  {
    dimension: "Inheritance tax",
    general: "Notes that it may be an issue",
    specialist:
      "Values the portfolio against the frozen thresholds, tests the gifting sequence and shows what the estate pays under each option",
  },
];

/**
 * Verbatim identical between the two trees, and the cleanest fact surface of the
 * seven pillar pages (report 03 §7.3). One back-patch applied on the MTD row:
 * the £20,000 / 6 April 2028 step (house_positions.md §3, :172 and :817) was
 * missing on both sides.
 */
const changes: Array<[string, string, string]> = [
  [
    "Rates on property income",
    "Separate rates of 22%, 42% and 47% replace 20%, 40% and 45% in England, Wales and Northern Ireland. Scotland is not affected for 2027/28",
    "6 April 2027",
  ],
  [
    "Section 24 finance cost reducer",
    "Rises from 20% to 22%, tracking the new property basic rate, so the higher-rate wedge stays 20 points",
    "April 2027",
  ],
  [
    "Making Tax Digital for landlords",
    "Qualifying income over £50,000 from April 2026, over £30,000 from April 2027, over £20,000 from April 2028",
    "April 2026",
  ],
  [
    "Writing down allowances",
    "Main pool falls from 18% to 14%, a new 40% first year allowance applies, special rate pool stays at 6%",
    "2026/27",
  ],
  ["Dividend rates", "10.75%, 35.75% and 39.35%", "6 April 2026"],
  ["Business asset disposal relief", "Rate of 18%", "6 April 2026"],
  [
    "Inheritance tax thresholds",
    "Frozen, with the combined business and agricultural relief allowance capped at £2.5m",
    "To 5 April 2031",
  ],
  [
    "Employer national insurance",
    "15% with a £5,000 secondary threshold, relevant to company structures with staff",
    "Current",
  ],
];

const deliverables = [
  "A written note setting out your position and the options, with numbers attached to each",
  "A clear recommendation, including a recommendation to do nothing where that is the right answer",
  "The assumptions and the risks stated openly, so you can see what the answer depends on",
  "Deadlines and elections identified, with the dates you have to hit",
  "A follow-up call to challenge the advice before you act on it",
  "A document you can hand to your solicitor, broker or existing accountant to implement",
];

/**
 * Ours, restored. Their re-layout deleted the "Background reading before you
 * book" box outright, taking all eight blog deep links with it, on the page that
 * is one of only two authored inbound paths from a commercial hub into five
 * different blog clusters. Carve-out 5.
 */
const backgroundReading = [
  {
    href: "/blog/incorporation-and-company-structures/how-to-choose-right-property-company-structure-uk-landlords-2026",
    label: "Choosing the right company structure for a property portfolio",
  },
  {
    href: "/blog/section-24-and-tax-relief/2027-property-tax-rates-section-24-relief-uk-landlords",
    label: "What the 2027 rate changes do to Section 24 relief",
  },
  {
    href: "/blog/capital-gains-tax/cgt-deferral-strategies-property-investors-uk",
    label: "Capital gains tax deferral strategies for property investors",
  },
  {
    href: "/blog/capital-gains-tax/cgt-property-transfer-limited-company-calculate",
    label: "Calculating the capital gains charge on transferring property to a company",
  },
  {
    href: "/blog/property-types-and-specialist-tax/capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework",
    label: "Capital allowances for property investors: the full decision framework",
  },
  {
    href: "/blog/landlord-tax-essentials/iht-april-2026-bpr-apr-cap-property-impact",
    label: "The business and agricultural relief cap and what it means for property",
  },
  {
    href: "/blog/landlord-tax-essentials/fic-estate-planning-landlord-portfolio-value-freezing-iht-mechanics",
    label: "Family investment companies and freezing portfolio value for inheritance tax",
  },
  {
    href: "/blog/making-tax-digital-mtd/best-mtd-software-landlords-2026",
    label: "Making Tax Digital software for landlords",
  },
];

/**
 * The four crawlable calculator links that sit alongside the tabs.
 *
 * Phase 4 identified this page as one of two where the designer's version drops
 * four crawlable /calculators/* links, because `CalculatorTabs` renders
 * <button role="tab"> and there is no <a href> in the block. This is the
 * designer's own remedy, `CalculatorLinkCards`, on the same four tools the tabs
 * offer here. Carve-out 5, and asserted by
 * src/tests/calculator-tabs-crawl-path.test.ts.
 */
const calculatorLinks = [
  {
    href: "/calculators/section-24-calculator",
    title: "Section 24 calculator",
    body: "See what the finance cost restriction costs you each year, now and from April 2027.",
  },
  {
    href: "/calculators/incorporation-cost-calculator",
    title: "Incorporation cost calculator",
    body: "Upfront capital gains and stamp duty exposure against the annual saving, with a break-even year.",
  },
  {
    href: "/calculators/mtd-checker",
    title: "Making Tax Digital checker",
    body: "Find out which April your quarterly reporting starts, or whether it catches you at all.",
  },
  {
    href: "/calculators/stamp-duty-calculator",
    title: "Stamp duty calculator",
    body: "Including the additional dwellings surcharge on a purchase.",
  },
];

const faqs: FaqEntry[] = [
  {
    question: "What is the difference between property tax advice and property accountancy?",
    answer:
      "Accountancy is the recurring work: bookkeeping, rental schedules, Self Assessment, company accounts, quarterly MTD submissions. Advice is a decision-shaped engagement with a defined question, a piece of analysis and a written answer. You can buy advice from us without moving your compliance work, and many people do exactly that. If you want the ongoing service, that sits on our property accountant page.",
  },
  {
    question: "Do I have to switch accountants to get advice from you?",
    answer:
      "No. A consultation is a standalone engagement. Plenty of clients keep their existing accountant for the annual return and come to us for the decisions that fall outside their accountant's experience. We write the advice so it can be handed straight to them for implementation.",
  },
  {
    question: "What does a property tax consultation cost?",
    answer:
      "It depends entirely on the question. A single disposal timing question is a much smaller piece of work than modelling a twelve property restructure across two spouses and a company. You get a fixed fee for a defined scope before any work begins, so you always know the cost in advance. Book a consultation and we will scope it on the call.",
  },
  {
    question: "What should I bring to the first call?",
    answer:
      "A list of the properties with rough values and outstanding mortgages, how each is owned, your and your spouse's approximate income, and the decision you are trying to make. Purchase dates and prices help if you have them. If you do not have all of it, come anyway; we will tell you what else we need.",
  },
  {
    question: "Can you advise on a property I have already bought or sold?",
    answer:
      "Yes, though the options narrow after completion. Before exchange we can influence ownership, funding and structure. After completion we work with reliefs, elections, allocation and disclosure. If a disposal has already happened and capital gains tax is due, the 60-day reporting deadline usually makes it urgent.",
  },
  {
    question: "Do you give advice on incorporation?",
    answer:
      "Yes, and it is one of the most common questions we are asked. Incorporation is a decision with real upfront cost, so we model the capital gains and stamp duty exposure against the annual saving and the break-even point. Section 162 incorporation relief can defer the capital gains charge where the letting activity amounts to a business, but for transfers on or after 6 April 2026 it must be claimed rather than applying automatically, and the claim runs to the first anniversary of the 31 January following the tax year of the transfer. Our buy-to-let incorporation analysis covers how that assessment works and includes a calculator you can run yourself first.",
  },
  {
    question: "Is a property tax specialist worth it for a small portfolio?",
    answer:
      "Sometimes not, and we will tell you when the answer is no. With one or two low-geared properties and a basic-rate income, there is often nothing meaningful to plan. The value appears when you are a higher-rate taxpayer, when borrowing is significant, when a disposal or purchase is coming, or when a portfolio is heading for an inheritance tax charge.",
  },
  {
    question: "Do you advise on commercial property as well as residential?",
    answer:
      "Yes. Commercial and mixed use property brings its own questions: capital allowances on embedded fixtures, the option to tax for VAT, different capital gains treatment, and stamp duty at non-residential rates. These are areas where a generalist adviser most often leaves money on the table.",
  },
  {
    question: "Can you help with an HMRC enquiry or an undisclosed rental period?",
    answer:
      "Yes. Unreported rental income is usually handled through the Let Property Campaign, where a considered voluntary disclosure produces a materially better outcome than waiting to be found. If you have already had a letter, get advice before you reply to it.",
  },
  {
    question: "Do you work with landlords outside London?",
    answer:
      "We advise landlords and investors across the UK. The work is done by video call, phone and email, with documents exchanged securely, so where you live makes no difference to the service. Property tax rules are UK-wide, with the devolved differences in Scottish and Welsh land transaction tax handled where they apply.",
  },
  {
    question: "How quickly can I get advice?",
    answer:
      "Scoping calls are usually available within a few days. Turnaround on the written advice depends on the complexity and how quickly we get the figures from you. If there is a hard deadline, a completion date, a 60-day capital gains report or an HMRC response date, tell us on the first call and we will work to it.",
  },
  {
    question: "Will you tell me if I should do nothing?",
    answer:
      "Yes. A recommendation to leave things as they are is a legitimate outcome, and a common one. Advice that only ever concludes with an expensive restructure is not advice.",
  },
];

/**
 * Ours, kept (carve-out 5). Their version emits FAQPage only. BreadcrumbList
 * comes from <Breadcrumb>.
 */
const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Property Tax Advice",
  serviceType: "Property tax advisory and consultation",
  description:
    "Specialist property tax advice for UK landlords and investors, delivered as one-off consultations covering ownership structuring, capital gains tax timing, Section 24 mitigation, capital allowances and portfolio inheritance tax planning.",
  url: pageUrl,
  provider: {
    "@type": "Organization",
    name: "Property Tax Partners",
    url: siteConfig.url,
  },
  areaServed: {
    "@type": "Country",
    name: "GB",
  },
  audience: {
    "@type": "Audience",
    audienceType: "UK landlords and property investors",
  },
};

export default function PropertyTaxAdvicePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
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
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: "Property tax advice" },
              ]}
            />
            <h1 className="mt-4 sm:mt-6 text-2xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-6xl">
              Property tax advice from specialist advisors
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-slate-700">
              Whether you are deciding how to own a property, when to sell it or whether to incorporate, a free
              consultation scopes the question, quotes a fixed fee, and tells you if you do not need us.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              {/* The secondary CTA pointed at the FAQ, which the designer's own
                  rule forbids: a hero secondary sends the reader to something
                  they can do, not to a list of questions. */}
              <Link
                href="#book"
                data-cta="hero_book"
                data-cta-placement="hero"
                data-cta-goal="form"
                className={`${btnPrimary} bg-emerald-600 text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-3.5 text-center`}
              >
                Book a consultation
              </Link>
              <Link
                href="#free-tools"
                className={`${btnOnCream} text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-3.5 text-center`}
              >
                Try the free calculators
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip, same treatment as the homepage: white with a hairline, so
          it reads as a break from the hero rather than a section of its own. */}
      <section className="border-b border-slate-200 bg-white py-5 sm:py-7">
        <div className={siteContainerLg}>
          <StatsCounter stats={siteStats} />
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>The premise</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">Advice, not another set of accounts</h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-700">
              Most property tax is lost at the point of a decision, not at the point of filing. By the time a return is
              prepared the choice is already made, and the return simply reports what it cost.
            </p>
            <DecisionWindow />
            <p className="mt-6 text-sm sm:text-base leading-relaxed text-slate-700">
              This is a consultation service for that earlier moment. You bring a specific decision, we model it against
              your real figures, and you get written advice with the options costed and a clear recommendation. It is a
              defined piece of work with a fixed fee, not a retainer.
            </p>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-700">
              If what you actually need is someone to run the annual return, the rental schedules, the company accounts
              and the quarterly Making Tax Digital submissions, that is a different service and it lives on our{" "}
              <InlineLink href="/services/property-accountant">property accountant page</InlineLink>. Plenty of people
              use both. Plenty use only one.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
              <div>
                <Eyebrow>Triggers</Eyebrow>
                <h2 className="text-2xl font-bold text-slate-900 text-balance sm:text-4xl">
                  When a consultation is worth booking
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-600 sm:mt-6 sm:text-lg">
                  Most consultations start from one of six situations. Each of them is a decision with a deadline
                  attached, and each is far cheaper to get right before it happens than to unpick afterwards.
                </p>
                <p className="mt-6 text-base font-bold leading-relaxed text-slate-900 text-balance sm:text-lg">
                  If one of these is sitting on your desk, that is the moment a consultation pays for itself.
                </p>
                <Link
                  href="#book"
                  data-cta="triggers_book"
                  data-cta-placement="triggers"
                  data-cta-goal="form"
                  className={`${btnPrimary} mt-6 w-full sm:mt-8 sm:w-auto`}
                >
                  Book a consultation
                </Link>
              </div>
              <PromptMarquee prompts={triggerPrompts} />
            </div>

            {/* The substance behind the six prompts, kept from our version and
                placed in the same section as the hook rather than in a competing
                one: the marquee is the recognition cue, this is what each of
                those situations actually turns on. A divided list rather than a
                second card grid, because the Scope section directly below is a
                CoverageCards grid and two grids in a row read as twelve
                equivalent things. */}
            <ul className="mt-10 divide-y divide-slate-200 rounded-xl bg-white p-6 ring-1 ring-slate-200/70 sm:mt-12 sm:p-8">
              {scenarios.map((item) => (
                <li key={item.title} className="py-5 first:pt-0 last:pb-0">
                  <h3 className="text-base font-bold text-slate-900 sm:text-lg">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>Scope</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">What the advice covers</h2>
            <p className="mt-4 text-sm sm:text-base text-slate-700">
              Six areas account for most of what landlords and investors ask us. A consultation can cover one of them or
              several, depending on the decision in front of you.
            </p>
            <CoverageCards items={coverage} />

            {/* Carve-out 5. Their re-layout deleted this box and all eight blog
                deep links with it. Kept where it was, because "before you book"
                is the whole framing, and restyled to the card anatomy. */}
            <div className="mt-8 rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70 sm:mt-10 sm:p-8">
              <h3 className="text-base font-bold text-slate-900 sm:text-lg">Background reading before you book</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:mt-3 sm:text-base">
                These go deeper on the questions that come up most often in consultations.
              </p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {backgroundReading.map((post) => (
                  <li key={post.href}>
                    <Link
                      href={post.href}
                      className="block rounded-xl bg-white px-5 py-4 text-sm font-semibold text-slate-800 ring-1 ring-slate-200 transition-all hover:text-emerald-700 hover:ring-emerald-300 sm:text-base"
                    >
                      {post.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>The engagement</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">How an engagement works</h2>
            <ProcessTimeline steps={engagement} />
          </div>
        </div>
      </section>

      {/* Their ordering, adopted: the deliverables band moves from second-to-last
          to the middle, so the "what do I actually get" answer arrives before the
          differentiation argument rather than after it (report 03 §7.2). */}
      <section className="bg-slate-900 py-12 text-white sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow onDark>Deliverables</Eyebrow>
            <h2 className="mb-4 text-2xl font-bold text-white sm:mb-6 sm:text-4xl">What you get from a consultation</h2>
            <DrawnTickList
              items={deliverables}
              className="grid gap-4 text-sm text-slate-200 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-5 sm:text-base"
            />

            {/* Placed at the foot of the deliverables rather than in a strip of
                its own: the reader has just finished the list of what they get,
                which is the point the price question turns into a booking. */}
            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-6">
              <Link
                href="#book"
                data-cta="deliverables_book"
                data-cta-placement="deliverables"
                data-cta-goal="form"
                className={`${btnPrimary} w-full sm:w-auto sm:shrink-0`}
              >
                Book a consultation
              </Link>
              <p className="text-sm text-slate-400">No charge, and no obligation to go further.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>The difference</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
              Why a property tax specialist rather than a general adviser
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-700">
              A good general practice adviser handles a wide range of clients competently. Property is where breadth
              stops paying. The reliefs are narrow, the elections have deadlines, and the rules have changed repeatedly
              since 2016. The difference shows up in what gets noticed.
            </p>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-700">
              Every client of this practice is a landlord, investor or property business. That is the whole reason the
              specialist side below is routine rather than exceptional.
            </p>

            <ComparisonTable
              rows={comparison}
              generalLabel="A general adviser"
              generalCaption="Competent across many sectors"
              ourCaption="A property tax specialist like us"
              cta={{
                href: "#book",
                label: "Book a consultation",
                note: "No charge, and no obligation to go further.",
              }}
            />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>Moving parts</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
              The rules your advice has to work around in 2026/27
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-700">
              Several changes legislated in Finance Act 2026 land within the next two years. Advice given against the
              old position is worse than no advice, because it is confidently wrong.
            </p>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-700">
              Our <InlineLink href="/property-tax-rates">property tax rates reference</InlineLink> carries the full set
              of thresholds if you want the detail before a call.
            </p>

            <div className="mt-8 overflow-x-auto rounded-xl bg-white p-5 sm:p-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-slate-300 text-left">
                    <th className="py-2 pr-4 font-bold text-slate-900">Change</th>
                    <th className="py-2 pr-4 font-bold text-slate-900">Position</th>
                    <th className="py-2 font-bold text-slate-900">From</th>
                  </tr>
                </thead>
                <tbody>
                  {changes.map(([change, position, from]) => (
                    <tr key={change} className="border-b border-slate-200 align-top">
                      <td className="py-3 pr-4 font-semibold text-slate-900">{change}</td>
                      <td className="py-3 pr-4 leading-relaxed text-slate-700">{position}</td>
                      <td className="py-3 whitespace-nowrap text-slate-700">{from}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Two sections clear of the navy Deliverables band, and before the
          free-tools off-ramp. */}
      <TestimonialsSection description="Anonymised feedback from landlords and investors we have advised." />

      <section id="free-tools" className="scroll-mt-24 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>Free tools</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">Run the numbers yourself first</h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-700">
              Several of the questions people book a consultation for can be sized in a few minutes. If a calculator
              shows the effect is small, you may not need advice at all, and we would rather you found that out for
              free.
            </p>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-700">
              For the incorporation decision specifically, our{" "}
              <InlineLink href="/incorporation">buy-to-let incorporation analysis</InlineLink> sets out the full
              feasibility assessment, and our <InlineLink href="/landlord-tax">landlord tax guide</InlineLink> covers
              the annual position most consultations start from.
            </p>
            <div className="mt-8">
              <CalculatorTabs tabs={["section24", "incorporation", "mtd", "stampduty"]} />
            </div>
            <p className="mt-10 text-sm sm:text-base font-semibold text-slate-900">
              Or open any of them on its own page:
            </p>
            <CalculatorLinkCards items={calculatorLinks} />
          </div>
        </div>
      </section>

      {/* Anchor for every primary CTA on the page. `scroll-mt` clears the sticky
          header so the panel's heading is not hidden under it on arrival. */}
      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          title="Get specialist property tax advice on the decision in front of you"
          description="Tell us the decision you are weighing up. We will scope the question, quote a fixed fee, and tell you up front if you do not need us."
          proofPoints={[
            { title: "One-off advice welcome", detail: "No need to move your accounts to us" },
            { title: "Fixed fees, quoted upfront", detail: "You approve the fee before any work starts" },
            { title: "24-hour response", detail: "Usually the same working day" },
          ]}
          footnote="No obligation and no hard sell. If the answer is simple, we will just tell you."
        />
      </div>

      {/* Both anchor forms, so neither 404s. Ours shipped `#faq` and was linked
          from our own hero; theirs renames it `#faqs`. Report 03 §7.2 found no
          internal or documented reference to either, but an off-site one cannot
          be ruled out and two ids cost one element. */}
      <div id="faqs" className="scroll-mt-24">
        <div id="faq" className="scroll-mt-24">
          <FaqSection title="Questions about a consultation" faqs={faqs} />
        </div>
      </div>
    </>
  );
}
