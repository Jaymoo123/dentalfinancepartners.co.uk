import type { Metadata } from "next";
import { ProcessTimeline } from "@/components/property/ProcessTimeline";
import {
  AlertTriangle,
  Building2,
  Check,
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
      "Section 162 TCGA 1992 rolls your Capital Gains Tax charge into the base cost of the shares you receive, so no CGT is payable on the transfer itself. It applies automatically where you transfer a business as a going concern, with all of its assets other than cash, wholly or partly in exchange for shares. The difficulty for landlords is the word business. Simply owning let property is an investment, not a business, unless the activity is substantial enough to count.",
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
            <p>
              Stamp duty is the cost landlords underestimate most. When you move a property from your own name into
              your limited company, no money needs to change hands for SDLT to be due. You and the company are
              connected persons, so the transfer is deemed to take place at market value and SDLT is charged on that
              figure. A property you bought for £180,000 and now worth £310,000 is taxed on £310,000, whatever the
              paperwork says the consideration was.
            </p>
            <p>
              On top of that, a company buying a residential dwelling pays the 5% additional-dwelling surcharge, and
              for a company there is no first-property exemption from it. The surcharge rose from 3% to 5% on 31
              October 2024 and the residential nil-rate band returned to £125,000 on 1 April 2025, so the effective
              rate on a mid-sized portfolio transfer is a good deal higher than most landlords remember. Run the
              numbers on the{" "}
              <InlineLink href="/calculators/stamp-duty-calculator">stamp duty calculator</InlineLink> property by
              property, then use the{" "}
              <InlineLink href="/calculators/incorporation-cost-calculator">incorporation cost calculator</InlineLink>{" "}
              to set the total against the annual saving.
            </p>
            <p>
              Multiple Dwellings Relief used to soften portfolio transfers, but it was abolished for transactions
              completing on or after 1 June 2024, so it is no longer available to plan around. What survives is the
              six-dwellings rule: where six or more separate dwellings are acquired in a single transaction, or in
              linked transactions, the purchase can be treated as non-residential for SDLT, which brings in the
              non-residential rates and removes the surcharge. That is genuinely useful for a landlord moving a large
              portfolio in one go, and irrelevant to anyone transferring two or three properties.
            </p>
            <p>
              The other route out is partnership relief under Schedule 15 FA 2003, which can reduce the SDLT charge to
              nil where a genuine partnership incorporates. The relief depends on the partners in the old partnership
              and the shareholders in the new company being effectively the same people in the same proportions, and
              on there being a real partnership in the first place: a partnership agreement, a partnership tax return,
              joint working and shared control of the business, not simply a property held in joint names. HMRC looks
              closely at partnerships formed shortly before an incorporation, and anti-avoidance rules can claw the
              relief back if shares are shuffled afterwards.
            </p>
            <p>
              Scotland and Wales have their own regimes and their own arithmetic. Scotland charges LBTT plus the 8%
              Additional Dwelling Supplement, which is levied on the entire purchase price rather than a slice, so
              incorporating a Scottish portfolio is usually the most expensive version of this exercise. Wales charges
              Land Transaction Tax, and additional properties there sit on a separate higher-rates table running from
              5% up to 17% rather than main rates with a surcharge bolted on. The connected-party market-value rule
              applies across all three, so the transfer is valued the same way wherever the property sits.
            </p>
          </Prose>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>The relief</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">Connected-party and clearance points</h2>
          <Prose>
            <p>
              The Capital Gains Tax side turns on Section 162 TCGA 1992, incorporation relief. Where it applies, the
              gain on the properties is not taxed on transfer. Instead it is rolled into the base cost of the shares
              you receive, so the tax is deferred until you dispose of those shares. The relief is automatic, which
              means you do not claim it, but it also means you cannot rely on HMRC agreeing in advance that the
              conditions were met.
            </p>
            <p>
              Three conditions have to hold. You must transfer a business as a going concern. You must transfer all of
              the assets of that business other than cash. And the transfer must be wholly or partly in exchange for
              shares issued by the company, with only the share element qualifying for relief, so taking a director
              loan account out of the transfer reduces the relief proportionately.
            </p>
            <p>
              The first condition is where most landlord claims fail. Holding property and collecting rent is an
              investment activity, not a business, unless the scale and nature of what you do takes it further. The
              case advisers work from is Ramsay v HMRC, where roughly 20 hours a week of hands-on management across a
              property of 10 flats was accepted as a business. Repairs organised personally, tenant management,
              viewings, maintenance, accounts and dealing with the building day to day all counted. A portfolio run
              entirely through a letting agent, with a few hours a month of oversight, generally does not, however
              large it is. The evidence needs to exist before the transfer, not be reconstructed afterwards.
            </p>
            <p>
              Connected-party rules run alongside all of this. Because you control the company, market value is
              substituted for whatever price you set, for CGT as well as SDLT, so undervaluing the transfer achieves
              nothing except a valuation argument later. Get a defensible valuation at the point of transfer and keep
              it. The same connection is why the mortgage position matters: lenders will normally require the personal
              borrowing to be redeemed and replaced with company buy-to-let lending, which carries its own arrangement
              fees and early repayment charges.
            </p>
            <p>
              There is no statutory clearance for Section 162. You can ask HMRC for a non-statutory clearance on the
              facts, but it is not binding in the way a statutory clearance is, and HMRC will often decline to give a
              view on whether an activity amounts to a business. The practical answer is a documented analysis of your
              own facts prepared before you transfer anything. Where the CGT and SDLT at stake run into five or six
              figures, that analysis is worth paying for: our{" "}
              <InlineLink href="/services/property-tax-advice">property tax advice</InlineLink> work covers exactly
              this ground, and our{" "}
              <InlineLink href="/services/property-accountant">property accountant</InlineLink> service picks up the
              company filings afterwards. If you are still weighing whether the structure is right at all, the{" "}
              <InlineLink href="/landlord-tax">landlord tax</InlineLink> position in your own name is the right place
              to start.
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

      <section className="bg-slate-900 py-12 text-white sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow onDark>Deliverables</Eyebrow>
            <h2 className="mb-4 text-2xl font-bold text-white sm:mb-6 sm:text-4xl">What you get</h2>
            <ul className="grid gap-4 text-sm text-slate-200 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-5 sm:text-base">
              {deliverables.map((item) => (
                <li key={item} className="flex items-start gap-3 sm:gap-4">
                  <Check
                    aria-hidden
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400 sm:h-6 sm:w-6"
                    strokeWidth={3}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Ours (82b66a32), carve-out 5, in their FaqSection. White, so it is also
          the light section between the navy Deliverables band and the panel. */}
      <FaqSection
        eyebrow="Questions"
        title="Incorporation questions landlords ask"
        faqs={incorporationFaqs}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqPageJsonLd(incorporationFaqs)) }}
      />

      {/* `contained` because the run above it stays light down to the panel; the
          Deliverables band is navy and the FAQ section keeps the two apart. */}
      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          contained
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
    </>
  );
}
