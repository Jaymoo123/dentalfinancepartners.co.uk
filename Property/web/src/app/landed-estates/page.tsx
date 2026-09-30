import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ExampleFigureNote } from "@/components/ui/ExampleFigureNote";
import { FaqSection } from "@/components/ui/FaqSection";
import { LeadCTAPanel } from "@/components/property/LeadCTAPanel";
import { TopicHero, TopicSection } from "@/components/property/TopicSection";
import { CalculatorTabs } from "@/components/calculators/CalculatorTabs";
import { InlineLink } from "@/components/ui/page-blocks";
import {
  AllowanceClaims,
  AllowanceSplit,
  GiftTimeline,
  InvestmentLine,
  OutOfScope,
} from "@/components/property/estate-figures";
import { btnOnCream, btnPrimary } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildFaqPageJsonLd } from "@/lib/faq-page-schema";

const PAGE_PATH = "/landed-estates";
const TITLE = "Landed Estates: The £2.5m Farm Inheritance Tax Allowance";
const DESCRIPTION =
  "From 6 April 2026 the first £2.5 million of qualifying farmland and business value is free of inheritance tax, £5 million for a couple. What is in force.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${siteConfig.url}${PAGE_PATH}` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${siteConfig.url}${PAGE_PATH}`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

// Blog category prefixes resolved from each post's frontmatter `category:` via
// slugifyCategory() in src/lib/blog.ts. Do not guess these.
const LTE = "/blog/landlord-tax-essentials";
const PTST = "/blog/property-types-and-specialist-tax";
const ICS = "/blog/incorporation-and-company-structures";
const CALC = "/calculators/bpr-apr-allowance-calculator";

/**
 * The April 2026 BPR/APR allowance ledger. This is the maintained differentiator
 * on this page: a large share of farm inheritance tax content on the web still
 * teaches the announcement-stage £1m figure as live law.
 * Source of truth: docs/property/house_positions.md §15.4 (re-verified against
 * IHTA 1984 s.124D as inserted by FA 2026 Sch 12 para 4, F-102 correction).
 * Statute citations belong in these cells, not in the prose above them.
 */
const inForce = [
  {
    rule: "Combined £2.5m allowance for 100% relief (IHTA 1984 s.124D, inserted by FA 2026 Sch 12 para 4)",
    status: "In force from 6 April 2026",
    effect:
      "The first £2.5 million of qualifying farmland and qualifying business value is relieved at 100%. Above that, relief halves, so half of the excess stays in the estate and is taxed at the ordinary 40% rate. On £1.5 million of excess that is £300,000.",
  },
  {
    rule: "One allowance shared by agricultural and business property",
    status: "In force from 6 April 2026",
    effect:
      "Farmland and the trading business draw on the same £2.5 million. They do not get £2.5 million each, which is the point most mixed estates get wrong.",
  },
  {
    rule: "Transferable between spouses and civil partners (s.124E)",
    status: "In force from 6 April 2026",
    effect:
      "Whatever the first of you to die does not use passes to the survivor, in the same way as the nil-rate band, so it has to be claimed. A couple can shelter up to £5 million of qualifying value between them.",
  },
  {
    rule: "Rolling seven-year allowance period (s.124D(3))",
    status: "In force from 6 April 2026",
    effect:
      "The allowance available on death is reduced by qualifying transfers you made in the previous seven years. It refreshes as those gifts fall out of the window.",
  },
  {
    rule: "AIM shares and other 'not listed' quoted shares: 50% sub-tier",
    status: "In force from 6 April 2026",
    effect:
      "Relief on these shares drops from 100% to 50%, but that 50% sits outside the allowance and does not consume any of your £2.5 million.",
  },
  {
    rule: "Anti-forestalling on lifetime gifts",
    status: "In force from 6 April 2026",
    effect:
      "Gifts made on or after 30 October 2024 fall under the new rules if you die on or after 6 April 2026 and within seven years of the gift. Gifts made before 30 October 2024 are not caught at all.",
  },
  {
    rule: "One allowance across same-settlor trusts",
    status: "In force from 6 April 2026",
    effect:
      "Trusts settled before 30 October 2024 keep an allowance each. Trusts settled by the same person on or after that date share a single allowance between them, so adding trusts no longer multiplies the relief.",
  },
  {
    rule: "The £1 million figure",
    status: "Superseded, never enacted at that level",
    effect:
      "Some guides still show the earlier £1 million figure, and at least one long-standing adviser page still presents it as current law. It was the announcement-stage number. Plan on £2.5 million.",
  },
];

const faqs = [
  {
    question: "Will my family have to pay inheritance tax on the farm?",
    answer:
      "Only on the value above the allowance. From 6 April 2026 the first £2.5 million of your qualifying agricultural and business property is relieved in full, and if you are married or in a civil partnership the unused part passes to your survivor, so a couple can cover up to £5 million between them. If the qualifying value of your farm sits under that, the relief still does the same job it always did. If it sits above, the excess is relieved at 50% rather than 100%, and you should be working out the number now rather than after a death.",
  },
  {
    question: "How much tax do you actually pay above the allowance?",
    answer:
      "An effective 20%. Value above the allowance gets 50% relief instead of 100%, so half of it stays in the estate and is taxed at the ordinary 40% rate. Half of 40% is 20%. On £1.5 million of qualifying value above the allowance, £750,000 remains chargeable and the tax on it is £300,000, before the nil rate band and anything else in your estate is brought into the calculation.",
  },
  {
    question: "Can my husband or wife use my allowance as well as their own?",
    answer:
      "Yes. The allowance is transferable between spouses and civil partners, so anything the first of you to die does not use passes to the survivor. That is where the £5 million couples figure comes from. It is not automatic in the sense of needing no paperwork, and it is worth checking what the first estate actually used before assuming the whole allowance carried over.",
  },
  {
    question: "Do gifts I have already made count against the allowance?",
    answer:
      "Some of them. Gifts made on or after 30 October 2024 are caught by the new rules if you die on or after 6 April 2026 and within seven years of making them. Gifts made before 30 October 2024 are not caught, whenever you die. The allowance itself runs on a rolling seven-year basis, so qualifying transfers inside that window reduce what is left when the estate is valued.",
  },
  {
    question: "Does my buy-to-let portfolio qualify for this relief?",
    answer:
      "Almost certainly not. Business Property Relief is for trading, and letting property out is treated as holding an investment rather than running a trade, however many properties you own and however much work they take. That has not changed with the April 2026 reforms and the new allowance does not rescue it. If your estate is a rental portfolio with no trading business and no farmland, this page is not your planning problem and you should be looking at the ordinary inheritance tax route instead.",
  },
  {
    question: "Is the cap £1 million or £2.5 million?",
    answer:
      "£2.5 million. £1 million was the figure announced in October 2024, and a lot of coverage written in the following year froze at that number. The figure that came into force on 6 April 2026 is £2.5 million per person, transferable between spouses and civil partners. If a guide you are reading says £1 million and does not describe it as superseded history, it has not been updated and its arithmetic will be wrong by a wide margin.",
  },
];

export default function LandedEstatesPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Landed estates and farm inheritance tax: the £2.5 million allowance from April 2026",
    description: DESCRIPTION,
    inLanguage: "en-GB",
    datePublished: "2026-08-21",
    dateModified: "2026-08-21",
    about: { "@type": "Thing", name: "Agricultural property relief and business property relief" },
    author: { "@type": "Organization", "@id": `${siteConfig.url}#organization`, name: siteConfig.name },
    publisher: { "@id": `${siteConfig.url}#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}${PAGE_PATH}` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqPageJsonLd(faqs)) }}
      />

      <TopicHero
        breadcrumb={<Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Landed estates" }]} />}
        title="Landed estates and farm inheritance tax: the £2.5 million allowance"
        standfirst={
          <>
            From 6 April 2026 the first £2.5 million of your qualifying farmland and trading business passes free of
            inheritance tax, and you pay an effective 20% on the value above it. A married couple can cover up to £5
            million between them. If a guide still tells you the figure is £1 million, it has not been updated.
          </>
        }
        primary={
          <Link
            href="#book"
            data-cta="estates_hero_book"
            data-cta-placement="hero"
            data-cta-goal="form"
            className={`${btnPrimary} bg-emerald-600 px-6 py-3 text-center text-sm sm:px-8 sm:py-3.5 sm:text-base`}
          >
            Talk to a property tax specialist
          </Link>
        }
        secondary={
          <Link
            href={CALC}
            data-cta="estates_hero_calculator"
            data-cta-placement="hero"
            className={`${btnOnCream} px-6 py-3 text-center text-sm sm:px-8 sm:py-3.5 sm:text-base`}
          >
            Work out your allowance
          </Link>
        }
      />

      <TopicSection
        id="will-we-pay"
        eyebrow="The number that decides it"
        title="Will your family pay inheritance tax on the farm?"
        links={[
          { href: `${PTST}/inheritance-tax-on-farms`, label: "Inheritance tax on farms, explained" },
          {
            href: `${PTST}/how-to-avoid-inheritance-tax-on-a-farm`,
            label: "Reducing inheritance tax on a farm, legitimately",
          },
        ]}
      >
        <p>
          Work out the qualifying value first, because that single number tells you whether you have a problem.
          Add up the agricultural value of the land and buildings and the value of any genuine trading business,
          then set the total against £2.5 million. Under it, the relief covers everything, as it did before. Over
          it, only the excess is exposed, and the exposure is smaller than most of the headlines suggested.
        </p>
        {/* The arithmetic this section used to spell out in two paragraphs,
            drawn. Every figure is derived from the same constants, so the bar,
            the three stats and the couple line cannot drift apart. */}
        <AllowanceSplit />
        {/* The calculator was a related CARD in this row. A card is the wrong
            affordance for a tool the reader can use here, so it is the tab
            treatment instead, exactly as /leasehold does with stamp duty. The
            `bprapr` tab is backed by the generic registry tool. */}
        <div className="mt-8 sm:mt-10">
          <h3 className="text-base font-bold text-slate-900 sm:text-lg">Put your own figure through it</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            Enter the agricultural value and any trading business value. The{" "}
            {/* Literal href, not the `CALC` constant, deliberately. This page
                renders `CalculatorTabs`, which emits <button role="tab"> and no
                crawlable link, so `calculator-tabs-crawl-path.test.ts` requires a
                real per-tool <a href> in this file's own markup. That guard is a
                source scan and cannot see through a constant, and it caught this
                the moment the tabs went in. Keep this one spelled out. */}
            <InlineLink href="/calculators/bpr-apr-allowance-calculator">
              combined allowance calculator
            </InlineLink>{" "}
            shows what is relieved, what is exposed, and the tax on the excess.
          </p>
          <div className="mt-5">
            <CalculatorTabs tabs={["bprapr"]} />
          </div>
        </div>
        <p>
          If you have made gifts since October 2024, some of that allowance may already be spoken for by the time
          the estate is valued.
        </p>
      </TopicSection>

      <TopicSection
        id="in-force"
        eyebrow="Law today"
        tone="slate"
        title="Which rules are actually in force from April 2026?"
        links={[
          {
            href: `${LTE}/iht-april-2026-bpr-apr-cap-property-impact`,
            label: "The cap, worked through in full",
          },
          {
            href: `${LTE}/maximising-business-relief-to-reduce-inheritance-tax`,
            label: "Business property relief: what qualifies",
          },
          {
            href: `${LTE}/agricultural-relief-for-inheritance-tax-key-benefits`,
            label: "Agricultural relief: the qualification gate",
          },
        ]}
      >
        <p>
          A great deal of the coverage written while this reform was going through never caught up with where it
          landed, so the single most useful thing on this page is a plain statement of the rules that are law
          today.
        </p>
        {/* Designer's figure-card treatment, the same one the statutory
            changes tables on /landlord-tax and /services/property-tax-advice
            carry: a white card on the slate ground, the table inside it, and
            the owner's rule-33 note beneath. */}
        <div className="overflow-x-auto rounded-xl bg-white p-5 sm:p-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-slate-300 text-left">
                <th className="py-2 pr-4 font-bold text-slate-900">Rule</th>
                <th className="py-2 pr-4 font-bold text-slate-900">Status</th>
                <th className="py-2 font-bold text-slate-900">What it means for you</th>
              </tr>
            </thead>
            <tbody>
              {inForce.map((row) => (
                <tr key={row.rule} className="border-b border-slate-200 align-top">
                  <td className="py-2 pr-4 font-semibold text-slate-900">{row.rule}</td>
                  <td className="py-2 pr-4 text-slate-900">{row.status}</td>
                  <td className="py-2 text-slate-700">{row.effect}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ExampleFigureNote className="mt-3" />
        </div>
      </TopicSection>

      <TopicSection
        id="landlords"
        eyebrow="The investment line"
        title="What if your estate is rental property rather than farmland?"
        links={[
          {
            href: `${LTE}/bpr-pure-btl-pawson-test-why-buy-to-let-fails-investment-line`,
            label: "Why buy-to-let fails the investment line",
          },
          {
            href: `${LTE}/business-property-relief-rental-property-iht`,
            label: "Business property relief and rental property",
          },
          {
            href: `${PTST}/serviced-accommodation-bpr-eligibility-pawson-test`,
            label: "Serviced accommodation: where the boundary sits",
          },
        ]}
      >
        <p>
          A straight buy-to-let portfolio does not get this relief, and the April 2026 allowance does not change
          that. The test is whether the business is mainly trading or mainly holding investments, and collecting
          rent from residential lettings falls on the investment side of that line no matter how many properties
          you hold or how much of your week they take up. If your estate is rentals and nothing else, the
          allowance on this page is probably not for you.
        </p>
        {/* A binary test drawn as two columns. A reader arrives asking "does
            mine count", which is a lookup, and it was three paragraphs of
            qualifications. Neutral dash on the right: nothing there is being
            done wrong, it simply is not trading. */}
        <InvestmentLine />
        <p>
          If you sit near the boundary, the linked page walks the line properly rather than giving you a yes or no
          you cannot rely on.
        </p>
        <p>
          Where this does bite for landlords is the mixed estate: a working farm or a trading company alongside a
          rental portfolio. The rentals get no relief and the trading side competes with the farmland for the same
          £2.5 million, so the allocation decision is real money.
        </p>
      </TopicSection>

      <TopicSection
        id="mixed-estates"
        eyebrow="Allocation"
        tone="slate"
        title="Mixed estates: one allowance, several claims on it"
        links={[
          {
            href: `${PTST}/agricultural-property-relief-mixed-estate-1m-cap`,
            label: "Allocating the allowance across a mixed estate",
          },
          {
            href: `${LTE}/iht-1m-bpr-apr-cap-mixed-trading-investing-landlord-allocation`,
            label: "Trading against investing: how the split works",
          },
          { href: `${PTST}/farm-tax-uk-guide`, label: "Farm tax: the property side, in one place" },
        ]}
      >
        <p>
          Most of the estates we see are not purely agricultural. There is land, a farmhouse, some let cottages,
          perhaps a diversified enterprise and often a share portfolio. Each of those is treated differently, and
          the allowance is claimed against the qualifying parts only, so the first job is deciding what actually
          counts before deciding how to spread the relief.
        </p>
        {/* What competes for the allowance and what sits outside it. The AIM
            sub-tier is the one thing on this page that works in the reader's
            favour and it was mid-paragraph. */}
        <AllowanceClaims />
        <p>
          It is one of the few places where the reform left something on the table, and it changes how you would
          sequence gifts of different asset types.
        </p>
      </TopicSection>

      <TopicSection
        id="gifts-and-trusts"
        eyebrow="The seven-year window"
        title="How do gifts and trusts change your allowance?"
        links={[
          { href: `${ICS}/fic-iht-treatment-bpr-myth`, label: "Family investment companies and the relief myth" },
          {
            href: `${LTE}/farmland-supply-value-drops-is-iht-reform-to-blame`,
            label: "What the reform did to farmland values",
          },
          {
            href: `${PTST}/serviced-accommodation-tax-fhl-abolition-april-2025`,
            label: "Holiday letting after the 2025 abolition",
          },
        ]}
      >
        <p>
          Giving land away in your lifetime still works, and the seven-year clock still runs. What changed is the
          date the rules attach to.
        </p>
        {/* One date, two sides, gifts and trusts on each. The section says this
            line "runs through the middle of a lot of half-finished planning",
            which is exactly the kind of claim a reader has to check against
            their own dates. */}
        <GiftTimeline />
      </TopicSection>

      <TopicSection
        id="not-covered"
        eyebrow="Scope"
        tone="slate"
        title="What we do not cover, and who does"
      >
        <p>
          This site handles the property tax half of a landed estate. Several things a farming family needs sit
          outside that, and we would rather say so than pretend otherwise.
        </p>
        {/* A referral map rather than a bulleted disclaimer list. Naming the
            adviser against each row makes the same content useful instead of
            defensive, which is what the closing sentence already claims. */}
        <OutOfScope />
        <p>
          We work alongside those advisers rather than replacing them. What we do is the inheritance tax and
          capital tax position on the land, the buildings and the structures that hold them.
        </p>
      </TopicSection>

      <TopicSection
        id="where-to-start"
        eyebrow="First moves"
        title="Where to start"
        links={[
          { href: "/services/property-tax-advice", label: "Property tax advice" },
          { href: "/blog/landlord-tax-essentials", label: "All landlord tax guides" },
        ]}
      >
        <p>
          Get a qualifying value on paper. Not a market value of the whole estate, but the part that actually
          qualifies: the agricultural value of the land and buildings, plus any real trading business, with the
          rentals and the surplus development value stripped out. That figure against £2.5 million, or £5 million
          if there are two of you, is the answer to the question you came here with.
        </p>
        <p>
          Then check the last two years of gifts, because the 30 October 2024 line runs through the middle of a
          lot of half-finished planning. If you made a gift or settled a trust after that date, the numbers you
          were given at the time were almost certainly based on the announcement figure.
        </p>
        {/* The bare button became the prompt-and-button block /incorporation and
            /landlord-compliance use: white card, hairline ring, statement left,
            CTA right, stacking on mobile. The paragraph that used to sit above
            the button is the statement, so nothing is lost; it just reads as one
            ask rather than as prose followed by an unexplained button. */}
        <div className="mt-10 rounded-xl bg-white p-6 ring-1 ring-slate-200 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-8">
          <p className="text-base font-bold text-slate-900 sm:text-lg">
            You bring the valuations and the gift history. We tell you what qualifies, what does not, how much
            headroom is left, and what the tax would be on a death today.
          </p>
          <Link
            href="#book"
            data-cta="estates_start_book"
            data-cta-placement="where_to_start"
            data-cta-goal="form"
            className={`${btnPrimary} mt-4 w-full sm:mt-0 sm:w-auto sm:shrink-0`}
          >
            Get a written allowance position
          </Link>
        </div>
      </TopicSection>

      {/* Anchor for the hero primary and the mid-page ask. The copy is the
          CTASection copy this replaces, unchanged; the proof points are the trio
          already claimed in niche.config.json, /about and the four service
          pages, so nothing here is a new factual claim (rule 30). */}
      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          title="Find out where your estate sits against the allowance"
          description="Book a free consultation. We will put a qualifying value on the estate, check what your gifts since October 2024 have used up, and tell you the tax on a death today."
          proofPoints={[
            { title: "Property tax only", detail: "Section 24, CGT and MTD every day" },
            { title: "Fixed fees, quoted upfront", detail: "In writing, before any work starts" },
            { title: "24-hour response", detail: "Usually the same working day" },
          ]}
          footnote="No obligation and no hard sell. If your position is already right, we will say so."
        />
      </div>

      {/* The light section that keeps the navy panel off the navy footer
          (adjacency rule, resolution 2), and the accordion every other FAQ on
          the site uses. The FAQPage JSON-LD is emitted separately above, so
          collapsing costs no schema. */}
      <FaqSection title="Farm inheritance tax questions" faqs={faqs} />
    </>
  );
}
