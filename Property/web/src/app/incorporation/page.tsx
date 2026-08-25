import type { Metadata } from "next";
import { ProcessTimeline } from "@/components/property/ProcessTimeline";
import {
  AlertTriangle,
  Building2,
  Gauge,
  Hourglass,
  Landmark,
  MessagesSquare,
  Percent,
  PiggyBank,
  ShoppingBag,
  Timer,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { CoverageCards, type CoverageItem } from "@/components/property/CoverageCards";
import { SdltMarketValue } from "@/components/property/SdltMarketValue";
import { IncorporationReliefGates } from "@/components/property/IncorporationReliefGates";
import { DrawnTickList } from "@/components/property/DrawnTickList";
import { PromptMarquee, type Prompt } from "@/components/property/PromptMarquee";
import { TestimonialsSection } from "@/components/property/TestimonialsSection";
import { StatsCounter } from "@/components/property/StatsCounter";
import { siteStats } from "@/lib/site-stats";
import { HeroBrickBackdrop } from "@/components/layout/HeroBrickBackdrop";
import Link from "next/link";
import { IncorporationCostCalculator } from "@/components/calculators/IncorporationCostCalculator";
import { LeadCTAPanel } from "@/components/property/LeadCTAPanel";
import { btnOnCream, btnPrimary, heroCreamSurface, siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { Eyebrow, InlineLink, Prose } from "@/components/ui/page-blocks";
import { FaqSection } from "@/components/ui/FaqSection";
import { buildFaqPageJsonLd, type FaqEntry } from "@/lib/faq-page-schema";

export const metadata: Metadata = {
  title: "Should I Incorporate My Buy-to-Let? | CGT & SDLT Cost Analysis",
  // Ours (c218d7a6): shortened to fit the SERP snippet.
  description:
    "Incorporation feasibility for UK landlords: CGT + SDLT upfront costs vs annual tax savings. When it makes sense, when it does not.",
  alternates: { canonical: `${siteConfig.url}/incorporation` },
  openGraph: {
    title: "Buy-to-Let Incorporation Planning | Cost vs. Savings Analysis",
    description: "Full feasibility modelling: CGT, SDLT costs vs. long-term tax savings. For UK landlords only.",
    url: `${siteConfig.url}/incorporation`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy-to-Let Incorporation Planning | Cost vs. Savings Analysis",
    description: "Full feasibility modelling: CGT, SDLT costs vs. long-term tax savings. For UK landlords only.",
  },
};

/**
 * The incorporation question as people actually ask it. First person on
 * purpose: a reader skims a described scenario but stops on a sentence they
 * would say out loud.
 *
 * Keep this EVEN in length — the marquee zigzags on index, and an odd set shows
 * a seam where the loop joins.
 */
const incorporationPrompts: Prompt[] = [
  {
    tag: "I am a higher-rate taxpayer",
    text: "My rental profit tips me into 40% and the interest relief barely touches it.",
    icon: TrendingUp,
  },
  {
    tag: "Everyone tells me to incorporate",
    text: "Half the property meetup swears by it. Nobody has shown me the numbers.",
    icon: MessagesSquare,
  },
  {
    tag: "I am worried about the upfront hit",
    text: "Do I really get a capital gains and stamp duty bill on day one?",
    icon: AlertTriangle,
  },
  {
    tag: "I am still buying",
    text: "Three more purchases are coming. Should those go into a company instead?",
    icon: ShoppingBag,
  },
  {
    tag: "My lender has views",
    text: "The broker says company products price higher. Does that wipe out the saving?",
    icon: Landmark,
  },
  {
    tag: "I am thinking about the family",
    text: "I want this portfolio to reach my children without a tax bill attached.",
    icon: Users,
  },
];

const whenItMakesSense: CoverageItem[] = [
  {
    title: "You're a higher-rate taxpayer",
    icon: TrendingUp,
    body: "Section 24 hits hardest at 40% and 45%. If your rental profit (after expenses but before mortgage interest) pushes you into higher-rate territory, incorporation can reduce your effective tax rate significantly.",
  },
  {
    title: "You have significant mortgage interest",
    icon: Percent,
    body: "The more mortgage interest you pay, the bigger the Section 24 impact. If mortgage interest represents 40%+ of your rental income, incorporation may be worth the upfront cost.",
  },
  {
    title: "You're holding long-term",
    icon: Hourglass,
    body: "Incorporation has high upfront costs (CGT + SDLT). If you plan to hold the properties for 10+ years, you have time to recover those costs through annual tax savings. Short-term holds rarely justify incorporation.",
  },
  {
    title: "You're building a portfolio",
    icon: Building2,
    body: "If you're acquiring new properties, buying them in a limited company from the start avoids the CGT/SDLT hit on transfer. Existing properties can stay personal, new ones go into the company.",
  },
];

const whenItDoesNot: CoverageItem[] = [
  {
    title: "Low mortgage levels",
    icon: PiggyBank,
    body: "If you own properties outright or have small mortgages, Section 24 doesn't hurt much. The upfront cost of incorporation (CGT + SDLT) may never be recovered.",
  },
  {
    title: "Planning to sell soon",
    icon: Timer,
    body: "If you're selling within 5 years, the upfront incorporation costs likely exceed any tax savings. Better to stay personal and pay the Section 24 tax.",
  },
  {
    title: "You're a basic-rate taxpayer",
    icon: Gauge,
    body: "Section 24 has minimal impact at 20%. Corporation tax (19%) + dividend tax may not save you much, and the upfront costs are the same regardless of tax bracket.",
  },
  {
    title: "You need to extract all profit",
    icon: Wallet,
    body: "If you rely on rental income to live, extracting profit as dividends triggers personal tax. The company structure only saves tax if you can leave profit in the company.",
  },
];

/**
 * The three SDLT escape routes and regional regimes, lifted out of the "Stamp
 * duty when you incorporate" prose (owner, 2026-08-23: card some of the copy).
 *
 * This is a RE-PRESENTATION, not a rewrite. Each body is the paragraph that used
 * to sit in that `<Prose>` block, word for word, and the two paragraphs that
 * carry the framing and the calculator links stay in prose above rather than
 * being flattened into a card body, which is a plain string and cannot hold an
 * `InlineLink`. Nothing is condensed: the section is five paragraphs of
 * keyword-bearing SDLT copy and it still is. What the change adds is three h3s
 * naming the reliefs a reader searches for, which the wall of text did not have.
 */
const sdltRoutes: CoverageItem[] = [
  {
    title: "Multiple Dwellings Relief and the six-dwellings rule",
    icon: Building2,
    body: "Multiple Dwellings Relief was abolished for transactions completing on or after 1 June 2024, so there is nothing left to plan around there. What survives is the six-dwellings rule: acquire six or more separate dwellings in one transaction, or in linked transactions, and the purchase can be treated as non-residential for SDLT, which brings in the non-residential rates and removes the surcharge. Useful for moving a large portfolio in one go, irrelevant for two or three.",
  },
  {
    title: "Partnership relief under Schedule 15 FA 2003",
    icon: Users,
    body: "Partnership relief under Schedule 15 FA 2003 can cut the SDLT charge to nil where a genuine partnership incorporates. It needs the old partners and the new shareholders to be the same people in the same proportions, and a real partnership behind it: a partnership agreement, a partnership tax return, joint working and shared control, not a property held in joint names. HMRC looks closely at partnerships formed shortly before an incorporation, and anti-avoidance rules can claw the relief back if shares are shuffled afterwards.",
  },
  {
    title: "Scotland (LBTT) and Wales (LTT)",
    icon: Landmark,
    body: "Scotland charges LBTT plus the 8% Additional Dwelling Supplement, levied on the entire purchase price rather than a slice, which makes a Scottish portfolio the most expensive version of this exercise. Wales charges Land Transaction Tax, with additional properties on a separate higher-rates table running from 5% up to 17% rather than main rates plus a surcharge. The connected-party market-value rule applies across all three.",
  },
];

const deliverables = [
  "Full CGT and SDLT cost calculation based on your actual property values and purchase prices",
  "Annual tax saving comparison: personal vs. company structure",
  "Break-even timeline showing when you recover the upfront costs",
  "Clear recommendation: incorporate now, wait, or don't incorporate at all",
  "Written report you can share with your solicitor or mortgage broker",
];

/**
 * Ours (82b66a32). Five Q&As on the questions this page is actually searched
 * for. Carve-out 5: their file has no FAQ block and no FAQPage schema, so taking
 * theirs wholesale would have dropped both. Rendered through their FaqSection
 * below, with buildFaqPageJsonLd() emitting the schema from the same array so
 * markup and schema cannot drift.
 */
const incorporationFaqs: FaqEntry[] = [
  {
    question: "Do you pay stamp duty when transferring property to your own limited company?",
    answer:
      "Yes, in almost every case. The transfer is treated as taking place at market value even if no money changes hands, because you and the company are connected. SDLT is charged on that market value, and because a company is buying a residential dwelling the 5% additional-dwelling surcharge applies from the first pound. The only common escape is partnership relief, which requires a genuine partnership rather than a jointly owned portfolio.",
  },
  {
    question: "What is Section 162 incorporation relief and do I qualify?",
    answer:
      "Section 162 TCGA 1992 rolls your Capital Gains Tax charge into the base cost of the shares you receive, so no CGT is payable on the transfer itself. It applies where you transfer a business as a going concern, with all of its assets other than cash, wholly or partly in exchange for shares. For transfers on or after 6 April 2026 the relief must be claimed: Finance Act 2026 ended the automatic treatment, and the claim is due by the first anniversary of the 31 January following the tax year of the transfer. The difficulty for landlords is the word business. Simply owning let property is an investment, not a business, unless the activity is substantial enough to count.",
  },
  {
    question: "How many hours a week do I need to spend for my portfolio to count as a business?",
    answer:
      "There is no statutory hours test. The benchmark most advisers work to comes from Ramsay v HMRC, where around 20 hours a week of genuine active management across a 10-flat property was enough to make it a business. Fewer hours, or a portfolio run entirely by a letting agent, makes the case much weaker. What matters is the degree and quality of the activity, evidenced contemporaneously, not a number on its own.",
  },
  {
    question: "Can I get advance clearance from HMRC that Section 162 applies?",
    answer:
      "No. There is no statutory clearance procedure for Section 162 incorporation relief. You can apply for a non-statutory clearance setting out the facts and asking HMRC for its view, but that is not binding in the way a statutory clearance would be, and HMRC often declines to comment on whether an activity amounts to a business. In practice you rely on a documented analysis of your own facts, which is why the evidence you keep before the transfer matters.",
  },
  {
    question: "Does incorporation stamp duty work differently in Scotland and Wales?",
    answer:
      "Yes. Scotland charges LBTT plus the 8% Additional Dwelling Supplement, which applies to the whole price rather than a slice, so the cost of transferring a Scottish portfolio into a company is usually higher than the English equivalent. Wales charges Land Transaction Tax under a separate higher-rates table for additional properties, running from 5% up to 17%, rather than main rates plus a surcharge. The market-value and connected-party rules apply in all three regimes.",
  },
];

const processSteps = [
  {
    n: "01",
    title: "Initial feasibility call",
    body: "We discuss your portfolio, income, tax position, and plans. This is a short conversation to understand whether incorporation is even worth modelling.",
  },
  {
    n: "02",
    title: "Full financial modelling",
    body: "We calculate upfront costs (CGT + SDLT), annual tax savings, break-even timeline, and cash flow impact. You get a written report with clear recommendations.",
  },
  {
    n: "03",
    title: "Decision and implementation",
    body: "If you decide to proceed, we coordinate with your solicitor, set up the company, handle the property transfer, and ensure all filings are correct. If you decide not to proceed, that's fine, and you have the analysis for future reference.",
  },
];

export default function IncorporationPage() {
  return (
    <>
      <section className={`relative flex items-center py-10 sm:py-12 lg:py-14 min-h-[320px] sm:min-h-[380px] lg:min-h-[400px] overflow-hidden ${heroCreamSurface}`}>
        <HeroBrickBackdrop tone="cream" />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: "Incorporation" },
              ]}
            />
            <h1 className="mt-4 sm:mt-6 text-2xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-6xl">
              Should you incorporate your buy-to-let portfolio?
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-slate-700">
              Whether you are buying your next property or moving a portfolio you already own, a free consultation
              models the Capital Gains Tax and Stamp Duty against your own figures, and says so when it is
              not worth doing.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
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
                href="#calculator"
                data-cta="hero_calculator"
                data-cta-placement="hero"
                className={`${btnOnCream} text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-3.5 text-center`}
              >
                Try the free calculator
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip, same treatment as the homepage: white with a hairline, so it
          reads as a break from the navy hero rather than a section of its own. */}
      <section className="border-b border-slate-200 bg-white py-5 sm:py-7">
        <div className={siteContainerLg}>
          <StatsCounter stats={siteStats} />
        </div>
      </section>

      {/* slate-50 so the marquee's white cards read, and so the run below it
          (white / slate-50 / white / slate-50 / navy) is left untouched. */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <Eyebrow>The question</Eyebrow>
              <h2 className="text-2xl font-bold text-slate-900 text-balance sm:text-4xl">
                Nobody incorporates for the paperwork
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 sm:mt-6 sm:text-lg">
                They do it because Section 24 has made a geared portfolio expensive to hold personally. Whether a
                company actually fixes that depends on your numbers, and for plenty of landlords the honest answer
                is no.
              </p>
              <p className="mt-6 text-base font-bold leading-relaxed text-slate-900 text-balance sm:text-lg">
                If one of these is the sentence going round your head, the modelling is worth doing properly.
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
            <PromptMarquee prompts={incorporationPrompts} />
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>The case for</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">When incorporation makes sense</h2>
            <CoverageCards items={whenItMakesSense} />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>The case against</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">When it doesn&apos;t make sense</h2>
            <CoverageCards items={whenItDoesNot} tone="white" />

            <div className="mt-10 rounded-xl bg-white p-6 ring-1 ring-slate-200 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-8">
              <p className="text-base font-bold text-slate-900 sm:text-lg">
                Recognise yourself on either list? The answer is in the numbers, not the list.
              </p>
              <Link
                href="#book"
                data-cta="case_book"
                data-cta-placement="case_against"
                data-cta-goal="form"
                className={`${btnPrimary} mt-4 w-full sm:mt-0 sm:w-auto sm:shrink-0`}
              >
                Book a consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Proof lands here, between weighing the decision and running the numbers.
          Two sections clear of the navy Deliverables band further down. */}
      <TestimonialsSection description="Anonymised feedback from landlords and investors we have worked with, including on this decision." />

      <section id="calculator" className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl mb-8 sm:mb-12">
            <Eyebrow>Free calculator</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
              Calculate your incorporation costs
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600">
              Get a quick estimate of upfront costs (CGT + SDLT) and break-even timeline.
            </p>
          </div>
          <div>
            <IncorporationCostCalculator />
          </div>
        </div>
      </section>

      {/* Deliverables in the /services/property-tax-advice treatment (owner,
          2026-08-23): the navy band, `DrawnTickList` rather than a static Check
          stack, and the booking CTA at the foot of the list.

          Its POSITION comes from that page too, and the move is what makes the
          rest of the tail work. That page's own note says the band belongs in
          the middle, so "what do I actually get" lands before the detailed
          argument rather than after it. Here that is doubly true: the panel now
          sits above the FAQ in the navy brick treatment, so a navy Deliverables
          band left at the foot would have run straight into it, two dark fields
          reading as one slab. In the middle it alternates cleanly (white
          calculator, navy here, slate-50 SDLT) and the tail alternates too
          (slate-50 process, navy panel, white FAQ, navy footer). */}
      <section className="bg-slate-900 py-12 text-white sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow onDark>Deliverables</Eyebrow>
            <h2 className="mb-4 text-2xl font-bold text-white sm:mb-6 sm:text-4xl">What you get</h2>
            <DrawnTickList
              items={deliverables}
              className="grid gap-4 text-sm text-slate-200 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-5 sm:text-base"
            />
            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-6">
              <Link
                href="#book"
                data-cta="deliverables_book"
                data-cta-placement="deliverables"
                data-cta-goal="form"
                className={`${btnPrimary} w-full sm:w-auto sm:shrink-0`}
              >
                Get your feasibility analysis
              </Link>
              <p className="text-sm text-slate-400">No charge for the initial conversation, and no obligation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ours (82b66a32), carve-out 5. Two prose sections the designer never saw:
          they carry five of this page's internal links and the SDLT / s.162
          substance that the page ranks on. Restyled into their system: Eyebrow,
          their h2 scale, <Prose> and <InlineLink> instead of our hand-written
          stack, and the max-w-4xl mid-page clamp dropped, because body copy runs
          the full container. Grounds keep their alternation: white calculator
          above, slate-50 here, white below, slate-50 process after. */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>The upfront cost</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">Stamp duty when you incorporate</h2>
          <Prose>
            {/* Tightened (owner, 2026-08-23). The connected-persons rule, the
                market-value substitution and the worked £180,000 / £310,000
                example all moved into the figure below when it was built, so
                stating them here first was saying the same thing twice before
                the reader reached the picture of it. What is left is the framing
                sentence and the two dates, which the figure does not carry.
                No term dropped: connected persons, market value,
                additional-dwelling surcharge and the first-property point are
                all still in rendered text, in `SdltMarketValue`. */}
            <p>
              Stamp duty is the cost landlords underestimate most, because no money has to change hands for it to be
              due.
            </p>
            <p>
              The surcharge rose from 3% to 5% on 31 October 2024, and the residential nil-rate band returned to
              £125,000 on 1 April 2025, so a mid-sized portfolio transfer costs a good deal more than most landlords
              remember. Run the{" "}
              <InlineLink href="/calculators/stamp-duty-calculator">stamp duty calculator</InlineLink> property by
              property, then set the total against the annual saving in the{" "}
              <InlineLink href="/calculators/incorporation-cost-calculator">incorporation cost calculator</InlineLink>.
            </p>
          </Prose>
          {/* The market-value substitution as money, before the three ways out
              of it. Every figure in here is derived from `lib/sdlt.ts`, the same
              engine behind the two calculators the paragraph above links to. */}
          <SdltMarketValue />
          {/* Cards on a slate-50 section must be white, or they vanish into the
              ground. Three routes, so three columns. */}
          <CoverageCards items={sdltRoutes} tone="white" columns={3} />
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>The relief</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">Connected-party and clearance points</h2>
          <Prose>
            {/* The outcome sentence that used to close this paragraph ("rolled
                into the base cost of the shares... deferred until you dispose of
                those shares") now sits in the figure below, at the end of the
                gate chain where it is the payoff. Kept here it read twice within
                one screen.

                FACTUAL CORRECTION 2026-08-23. This paragraph, and the "What is
                incorporation relief" FAQ above, both said the relief "is
                automatic, which means you do not claim it". That has been wrong
                since 6 April 2026. `docs/property/house_positions.md` section 5
                (locked 2026-06-01, source-verified at legislation.gov.uk) is
                explicit: "NO LONGER AUTOMATIC: since FA 2026 it must be CLAIMED
                for transfers on/after 6 April 2026 (new TCGA 1992 s.162(1)(b);
                claim by the first anniversary of the 31 January following the tax
                year of the transfer)", and FA 2026 s.39 repealed the old s.162A
                election, so the position is claim-or-no-relief. The old wording
                was not merely stale: a reader who believed it would not file the
                claim and would lose the relief outright. Do not reinstate it. */}
            <p>
              The Capital Gains Tax side turns on Section 162 TCGA 1992, incorporation relief. For transfers on or
              after 6 April 2026 it is no longer automatic. Finance Act 2026 made it a relief you have to claim, by
              the first anniversary of the 31 January following the tax year of the transfer, and there is no longer
              an election to disapply it. Miss the claim and the relief is simply not given, however comfortably you
              met the conditions.
            </p>
          </Prose>
          {/* Gates in series, not cards in a grid: the three Section 162
              conditions are cumulative, and a grid reads as three independent
              facts about the relief rather than one route with three ways to
              fall off it. Carries the same copy the cards did. */}
          <IncorporationReliefGates />
          <Prose>
            <p>
              There is no statutory clearance for Section 162. A non-statutory clearance does not bind HMRC the way a
              statutory one would, and they will often decline to say whether an activity amounts to a business. The
              practical answer is a documented analysis of your own facts, prepared before you transfer anything.
              Where the CGT and SDLT at stake run to five or six figures, that is worth paying for: our{" "}
              <InlineLink href="/services/property-tax-advice">property tax advice</InlineLink> work covers this
              ground, and our{" "}
              <InlineLink href="/services/property-accountant">property accountant</InlineLink> service picks up the
              company filings afterwards. Still weighing whether the structure is right at all? Start with the{" "}
              <InlineLink href="/landlord-tax">landlord tax</InlineLink> position in your own name.
            </p>
          </Prose>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>How it works</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">Our incorporation process</h2>
            <ProcessTimeline steps={processSteps} />
          </div>
        </div>
      </section>

      {/* Form ABOVE the FAQ, in the homepage's full-bleed navy brick treatment
          (owner, 2026-08-23). `contained` is gone, which is what swaps the light
          inset card for the navy band with HeroBrickBackdrop; every word of the
          incorporation-specific copy below is unchanged.

          Read the Deliverables comment above before moving this again. Dropping
          `contained` is only safe while the section directly above the panel is
          light: LeadCTAPanel's adjacency rule is that navy must not land on
          navy, and the site footer is slate-900 carrying the same brick
          backdrop, which is why the white FAQ has to stay between this panel and
          the foot of the page. Panel, FAQ, footer, the same tail order as
          /landlord-tax and /calculators/[slug]. */}
      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          title="Get your incorporation feasibility analysis"
          description="Tell us what you hold and where you are heading. We will model the numbers and give you a clear recommendation, including when that recommendation is to leave things alone."
          proofPoints={[
            { title: "The full cost, modelled", detail: "CGT and SDLT on your actual values, not a rule of thumb" },
            { title: "Fixed fees, quoted upfront", detail: "You approve the fee before any work starts" },
            { title: "24-hour response", detail: "Usually the same working day" },
          ]}
          footnote="No obligation and no hard sell. If incorporation is not worth it for you, we will say so."
        />
      </div>

      {/* Ours (82b66a32), carve-out 5, in their FaqSection. White, and now the
          light band between the navy panel above and the navy footer below. */}
      <FaqSection
        eyebrow="FAQs"
        title="Incorporation questions landlords ask"
        faqs={incorporationFaqs}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqPageJsonLd(incorporationFaqs)) }}
      />
    </>
  );
}
