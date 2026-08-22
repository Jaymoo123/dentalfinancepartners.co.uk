import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeftRight,
  Building2,
  CalendarClock,
  Check,
  FileCheck,
  FileText,
  Home,
  Landmark,
  PlaneLanding,
  PlaneTakeoff,
  Scale,
  Timer,
  Undo2,
} from "lucide-react";
import { CoverageCards, type CoverageItem } from "@/components/property/CoverageCards";
import { DepartureWindow } from "@/components/property/DepartureWindow";
import { DisposalFigures } from "@/components/property/DisposalFigures";
import { FilingDates } from "@/components/property/FilingDates";
import { LeadCTAPanel } from "@/components/property/LeadCTAPanel";
import { ProcessTimeline } from "@/components/property/ProcessTimeline";
import { PromptMarquee, type Prompt } from "@/components/property/PromptMarquee";
import { SchemeFlow } from "@/components/property/SchemeFlow";
import { StatsCounter } from "@/components/property/StatsCounter";
import { TestimonialsSection } from "@/components/property/TestimonialsSection";
import { CalculatorTabs } from "@/components/calculators/CalculatorTabs";
import { HeroBrickBackdrop } from "@/components/layout/HeroBrickBackdrop";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ExampleFigureNote } from "@/components/ui/ExampleFigureNote";
import { FaqSection } from "@/components/ui/FaqSection";
import { Eyebrow, InlineLink, Prose } from "@/components/ui/page-blocks";
import { btnOnCream, btnPrimary, heroCreamSurface, siteContainerLg } from "@/components/ui/layout-utils";
import { buildFaqPageJsonLd, type FaqEntry } from "@/lib/faq-page-schema";
import { siteStats } from "@/lib/site-stats";
import { siteConfig } from "@/config/site";

const pageUrl = `${siteConfig.url}/services/non-resident-landlord`;
const NRL = "/blog/non-resident-landlord-tax";

/**
 * Ours, kept whole (carve-out 5). Theirs retitles to "Non-Resident Landlord
 * Accountant | NRL Scheme & UK Returns" and drops the twitter card.
 *
 * The retitle was checked against the collision pre-flight in
 * `expansion_research/_prop_audit_2026_08_05/wave_brief_shared.md` (bbfe0437)
 * and against T1-09 of `docs/_engines/PROPERTY_SEO_SURFACE_MAP_2026-08-05.md`,
 * and NOT adopted. Both titles carry this page's assigned primary phrasing, so
 * there is no collision either way and the whole question is the tail: theirs
 * wins on volume (the "NRL scheme" and "NRL returns/forms" sub-groups are
 * 880 + 30 a month against 110 for "overseas/abroad phrasing"), ours wins on
 * measured impressions (35 against 17), and every one of those sub-groups sits
 * at position 55 to 62, so neither tail is currently a ranking signal. On the
 * one route the head-asset map calls HAVE-WINNING (124,800 a month, GSC
 * position 7.2) an unforced title change is a live experiment with no control,
 * and this is the page the plan ships last and alone precisely so its effect is
 * separable. If the owner wants the swap it is a one-line, single-variable test
 * after this deploy has settled, not a change bundled into it.
 */
export const metadata: Metadata = {
  title: "Non-Resident Landlord Accountant | UK Tax for Overseas Landlords",
  description:
    "Specialist UK tax service for non-resident landlords: NRL scheme registration, receiving rent gross, Self Assessment from abroad, treaties and 60-day CGT reporting.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Non-Resident Landlord Accountant | UK Tax for Overseas Landlords",
    description:
      "NRL scheme registration, gross payment approval, Self Assessment from abroad, double tax treaties and non-resident CGT, handled by UK property tax specialists.",
    url: pageUrl,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Non-Resident Landlord Accountant | UK Tax for Overseas Landlords",
    description:
      "NRL scheme registration, gross payment approval, Self Assessment from abroad, treaties and non-resident CGT for overseas landlords.",
  },
};

/** Their `coverage`, which is our `included` array with an icon added to each. */
const coverage: CoverageItem[] = [
  {
    title: "NRL scheme registration and gross payment approval",
    icon: FileCheck,
    body: "We prepare and submit your application to receive rent without the 20% deduction: NRL1 if you own personally, NRL2 for a non-resident company, NRL3 for trustees. We deal with HMRC on the queries that follow, and we make sure your agent is told once approval lands so the deductions actually stop.",
  },
  {
    title: "UK Self Assessment while you live abroad",
    icon: FileText,
    body: "Your UK rental profit stays within UK tax whatever your residence status. We prepare the return, claim the tax already deducted at source, handle the residence pages, and check whether the disregarded income rules or your personal allowance entitlement leave you better off. Filing deadline is 31 January after the tax year ends, with payments on account by 31 January and 31 July where the previous year's liability was over £1,000.",
  },
  {
    title: "Recovering over-deducted tax",
    icon: Undo2,
    body: "Agents deduct 20% from rent after allowable expenses they know about, which usually ignores mortgage interest, insurance, letting fees you paid directly and repairs. Most non-resident landlords with a mortgage are owed money back. We reconcile the NRL6 certificates against the real accounts and reclaim the difference.",
  },
  {
    title: "Double tax treaty positions",
    icon: Scale,
    body: "The UK taxes UK rental profit first because the property sits here. Your country of residence usually taxes the same income again and gives credit for the UK tax. We work out the credit position, the timing mismatch between tax years, and whether a treaty article changes anything on interest, dividends or gains flowing between the two countries.",
  },
  {
    title: "Capital gains and 60-day reporting",
    icon: Timer,
    body: "Non-residents pay UK CGT on disposals of UK land, and on indirect disposals of shares in property-rich entities. A return is due within 60 days of completion on every disposal, including no-gain and loss disposals, and the payment is due on the same date. We handle the rebasing choice, the computation and the filing.",
  },
  {
    title: "Company and structure questions",
    icon: Building2,
    body: "Non-UK-resident companies holding UK property have paid corporation tax rather than income tax on their rental profit since April 2020, which brings the loan relationship and corporate interest restriction rules with it. If you hold through an offshore company, we cover the filings and tell you plainly whether the structure still earns its cost.",
  },
];

/**
 * The six situations, said in the first person for the marquee. Their copy,
 * adopted verbatim: same six people as our card stack, said the way they
 * actually turn up.
 *
 * Keep this EVEN in length — the marquee zigzags on index, and an odd set shows
 * a seam where the loop joins.
 */
const clientPrompts: Prompt[] = [
  {
    tag: "I have just moved abroad",
    text: "I kept the flat, and my agent has started taking 20% off the rent.",
    icon: PlaneTakeoff,
  },
  {
    tag: "I let directly to my tenants",
    text: "There is no UK agent involved, so is my tenant meant to be deducting the tax?",
    icon: Home,
  },
  {
    tag: "I am moving back to the UK",
    text: "I let the place out for years while I was away and never filed anything.",
    icon: PlaneLanding,
  },
  {
    tag: "I am selling from overseas",
    text: "We complete next month and somebody mentioned a 60-day deadline.",
    icon: Timer,
  },
  {
    tag: "I am about to leave the country",
    text: "I still own the whole portfolio and I go in the spring.",
    icon: CalendarClock,
  },
  {
    tag: "I hold through a company",
    text: "It is a non-resident company and I am not sure what it should be filing.",
    icon: Building2,
  },
];

/**
 * Ours, kept. Their re-layout replaced these six cards with the marquee above,
 * and the marquee is the better hook, but it is an 80-word recognition cue
 * against roughly 300 words of substance and dropping ours is a real content
 * reduction on the one page the head-asset map calls HAVE-WINNING. Both ship,
 * in the same section, on the reasoning Phase 6.3 recorded for exactly this
 * pair: the prompts say "this is you", the scenarios say what each of those
 * situations actually turns on, and splitting them across two sections needs a
 * second H2 saying the same thing as the first.
 */
const scenarios = [
  {
    title: "You have just moved abroad and kept the flat",
    body: "The most common trigger. Your usual place of abode moves outside the UK, your letting agent starts withholding 20%, and nobody tells you that gross approval exists. We register you, reset the agent, and pick up the Self Assessment.",
  },
  {
    title: "You live overseas and let directly to tenants",
    body: "With no UK letting agent, a tenant paying you more than £100 a week has the deduction obligation themselves. Most tenants have no idea. Gross approval removes the problem for both of you.",
  },
  {
    title: "You are a returning expat with years of unfiled returns",
    body: "Rental income received abroad and never declared is still UK taxable. We quantify the exposure, use the right disclosure route, and negotiate the penalty position rather than letting HMRC open it first.",
  },
  {
    title: "You are selling a UK property from overseas",
    body: "The 60-day clock starts at completion, not when your solicitor gets round to it, and the penalty for missing it applies even when no tax is due. We work the computation alongside the conveyance so the return goes in on time.",
  },
  {
    title: "You are planning the move and still own the portfolio",
    body: "The year you leave is the year most of the planning value sits. Split-year treatment, the timing of a disposal, mortgage restructuring and the agent arrangements all read differently before departure than after.",
  },
  {
    title: "You are a non-resident with a UK company or trust holding property",
    body: "Corporate and trustee landlords have their own forms, their own filing regime and, for higher-value residential holdings, an annual ATED return. We handle the full stack rather than the rental accounts alone.",
  },
];

/**
 * Their three treaty cards. Written out of the prose that used to sit here: the
 * section is three separate mechanisms, and as paragraphs the second and third
 * read as footnotes to the first rather than as points in their own right.
 *
 * The four blog links that prose carried do NOT come with them, so they are
 * kept as a paragraph below the cards. Carve-out 5, and the same shape Phase
 * 6.4 used for the Let Property Campaign link: the cards absorb the facts, the
 * prose keeps the links.
 */
const treatyPoints: CoverageItem[] = [
  {
    title: "The UK taxes the rent first",
    icon: Landmark,
    body: "Nearly every UK double tax treaty gives the country where the land sits the first right to tax income from that land. The treaty then obliges your country of residence to relieve the double charge, normally by crediting the UK tax against its own.",
  },
  {
    title: "The credit is capped at the local tax",
    icon: Scale,
    body: "Charge less than the UK and the credit is wasted, so the UK rate is what you effectively pay; charge more and you top up locally. Timing is the other friction, because the UK tax year ends on 5 April and almost nowhere else does.",
  },
  {
    title: "A tie-breaker for the year you move",
    icon: ArrowLeftRight,
    body: "Treaties also carry a residence tie-breaker for years when you are arguably resident in both countries, which is the usual battleground in the year you move.",
  },
];

const howItRuns = [
  {
    n: "01",
    title: "Position review",
    body: "A short call covering where you live, what you own, who collects the rent, what has been filed and what has not. You leave that call knowing whether you are non-resident for these purposes and what is actually outstanding.",
  },
  {
    n: "02",
    title: "Registration and clean-up",
    body: "Gross payment application, Self Assessment registration, agent instructions, and any back years brought up to date. Where tax has been over-deducted, we reclaim it in the same pass.",
  },
  {
    n: "03",
    title: "Annual cycle",
    body: "Rental accounts, the return, the treaty credit position for your home country, quarterly updates once Making Tax Digital applies to you, and a reminder well before each deadline rather than the week of it.",
  },
  {
    n: "04",
    title: "Event work when it happens",
    body: "Selling, refinancing, moving country again, buying another property, or inheriting one. These are the moments where the decision is worth more than the compliance, and they are covered by the same relationship.",
  },
];

/** Theirs: our four points, tightened. Every figure re-checked against house positions. */
const generalPracticeGaps = [
  "Most high street accountants see one or two non-resident landlords a year. The gross approval process, the NRL6 reconciliation and the disregarded income calculation are what they get wrong.",
  "The 60-day disposal return sits outside the normal Self Assessment cycle, which makes it the most missed deadline for overseas owners.",
  "Treaty credit only works if both filings are prepared with knowledge of the other. We work with your overseas adviser, not around them.",
  "Section 24 restricts mortgage interest relief to a basic rate reduction, 20% now and 22% from April 2027, when property income moves to rates of 22%, 42% and 47%. With no personal allowance, that interaction pushes effective rates higher than most people expect.",
];

const faqs: FaqEntry[] = [
  {
    question: "What is the non-resident landlord scheme?",
    answer:
      "It is HMRC's system for collecting tax at source on rent from UK property paid to a landlord whose usual place of abode is outside the UK. Your UK letting agent, or the tenant where there is no agent, deducts basic rate tax at 20% from the rent after certain expenses and pays it to HMRC each quarter. It is not a separate tax. The 20% is credited against the tax you actually owe when your Self Assessment return is worked out, so it can leave you overpaid.",
  },
  {
    question: "Am I a non-resident landlord if I am only abroad for a year?",
    answer:
      "Possibly. The scheme uses a usual place of abode test, not the statutory residence test, and HMRC treats an absence of six months or more as putting your usual place of abode outside the UK. That means you can be UK resident for income tax and still fall inside the scheme. If you are going abroad for a defined posting, tell your agent and get the position confirmed before the deductions start.",
  },
  {
    question: "How do I stop the 20% being deducted from my rent?",
    answer:
      "Apply to HMRC for approval to receive rent gross. Individuals use form NRL1, non-resident companies use NRL2, and trustees use NRL3. Approval is given where your UK tax affairs are up to date, or where you have never had a UK tax obligation, and it takes effect from the start of the quarter in which HMRC accepts it. Approval changes the timing of the tax, not the amount: you still report the income and pay through Self Assessment.",
  },
  {
    question: "Do I still have to file a UK tax return if my agent deducts the tax?",
    answer:
      "In almost all cases yes. The deduction is a payment on account, not a settlement. Because agents deduct before mortgage interest and most direct costs, landlords with borrowing are frequently owed a refund that only comes back through the return. Even where the numbers happen to net out, HMRC can still require the return, and the failure-to-notify position is worse than filing.",
  },
  {
    question: "Do non-resident landlords get the UK personal allowance?",
    answer:
      "Some do. UK and Irish nationals, nationals of EEA states, and residents of countries whose double tax treaty with the UK grants it are generally entitled. Others are not, and for them the whole rental profit is taxed from the first pound. This single point often decides whether it is worth claiming the allowance or relying on the disregarded income rules instead, and the answer depends on the mix of your UK income.",
  },
  {
    question: "Will I be taxed twice on my UK rental income?",
    answer:
      "Usually not, but you will often be reported twice. The UK taxes rent from UK property as the source country. Your country of residence typically taxes your worldwide income and gives credit for the UK tax paid. The problems are practical rather than legal: mismatched tax years, differing rules on what counts as a deductible expense, and credit that is capped at the local tax on the same income. Get both filings prepared with each other in mind.",
  },
  {
    question: "What tax do I pay when I sell UK property as a non-resident?",
    answer:
      "Non-residents pay UK capital gains tax on disposals of UK residential and commercial land, and on indirect disposals of shares in entities that derive at least 75% of their value from UK land where you hold a 25% interest. Residential gains are charged at 18% and 24% depending on where the gain sits against the basic rate band, with the annual exempt amount at £3,000. There are rebasing options for property held before the regime applied to your type of disposal, and the choice between them can move the result materially.",
  },
  {
    question: "What is the 60-day rule for non-resident CGT?",
    answer:
      "You must file a UK property disposal return within 60 days of completion and pay the tax due by the same date. For non-residents the return is required on every disposal of UK land, including disposals at a loss and disposals covered by private residence relief, which is stricter than the rule for UK residents, who file only where capital gains tax is due. Missing it triggers penalties even where the tax is nil.",
  },
  {
    question: "Does Making Tax Digital apply to landlords living abroad?",
    answer:
      "Yes, on the same thresholds. Landlords with qualifying income over £50,000 come in from April 2026, over £30,000 from April 2027 and over £20,000 from April 2028, with quarterly updates through compatible software as well as the year-end return. Being overseas does not exempt you, and using a letting agent does not shift the obligation onto them. Our MTD checker gives you the date that applies to you.",
  },
  {
    question: "I have not declared UK rental income for several years. What now?",
    answer:
      "Come forward before HMRC does. It has automatic access to overseas account and residency information through international exchange agreements, and to Land Registry and letting agent data domestically, so undeclared rent surfaces eventually. Voluntary disclosure carries substantially lower penalties than a discovery assessment, and the number of years HMRC can go back depends on whether the failure is treated as careless or deliberate. We work out the exposure first, then choose the route.",
  },
  {
    question: "Should I hold UK property through an offshore company instead?",
    answer:
      "Rarely, on tax grounds alone, and less often than the marketing suggests. Non-resident companies pay corporation tax on UK rental profit, higher-value residential holdings face an annual ATED charge unless a relief is claimed on the return, mortgage options narrow, and the UK inheritance tax exposure that companies were once used to avoid was closed for residential property. It can still be right where there are multiple owners or genuine commercial reasons. It should be a modelled decision, not a default.",
  },
  {
    question: "What does this cost?",
    answer:
      "It depends on how many properties you hold, how many back years need clearing, whether a company or trust is involved, and whether a disposal is in progress. We quote a fixed annual fee for the recurring work and a separate fixed fee for anything one-off, both agreed before we start. Book a consultation and you will get the number with the scope attached.",
  },
];

export default function NonResidentLandlordPage() {
  /**
   * Carve-out 5. Theirs emits FAQPage only. Service with `audience` and
   * `areaServed` is ours and it stays, and BreadcrumbList arrives from
   * `ui/Breadcrumb`, so the rendered page carries three types and exactly one
   * of each. Article is deliberately NOT added: report 03 section 6.4 records
   * our live page as Service + FAQPage, Article belongs to the three topic
   * pillars rather than the four service pages, and minting schema this route
   * has never had would be an invention rather than a restoration.
   */
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Non-resident landlord tax service",
    serviceType: "UK tax compliance and advice for non-resident and overseas landlords",
    description:
      "UK tax service for non-resident landlords: non-resident landlord scheme registration, approval to receive rent gross, Self Assessment from abroad, double tax treaty relief and non-resident capital gains tax reporting.",
    url: pageUrl,
    areaServed: { "@type": "Country", name: "GB" },
    audience: { "@type": "Audience", audienceType: "Non-resident and overseas landlords of UK property" },
    provider: {
      "@type": "Organization",
      name: "Property Tax Partners",
      url: siteConfig.url,
    },
  };

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

      {/* Their cream hero. Ours was a 320-400px Unsplash <Image fill> under a
          sibling bg-slate-900/85 scrim, with an onDark breadcrumb sitting on the
          seam between the two: the last image-hero breadcrumb occlusion in the
          port. No image, no scrim, no seam. */}
      <section
        className={`relative flex items-center py-10 sm:py-12 lg:py-14 min-h-[380px] sm:min-h-[440px] lg:min-h-[460px] overflow-hidden ${heroCreamSurface}`}
      >
        <HeroBrickBackdrop tone="cream" />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: "Non-resident landlord" },
              ]}
            />
            <h1 className="mt-4 sm:mt-6 text-2xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-6xl">
              Non-resident landlord accountant
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-slate-700">
              Whether your agent is deducting 20% from your rent or you have UK returns outstanding, a free
              consultation shows you whether you can be paid gross and what it costs to put right, from wherever
              you are.
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
                href="#free-tools"
                data-cta="hero_calculators"
                data-cta-placement="hero"
                className={`${btnOnCream} text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-3.5 text-center`}
              >
                Try the free calculators
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Proof before the argument, reusing the shared siteStats. */}
      <section className="border-b border-slate-200 bg-white py-5 sm:py-7">
        <div className={siteContainerLg}>
          <StatsCounter stats={siteStats} />
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>The scheme</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
              How the non-resident landlord scheme catches you
            </h2>
            {/* Carve-out 5, and the binding instruction on this page: figure AND
                prose, never figure INSTEAD OF prose. Their version compressed
                these four paragraphs to two and took all four blog links with
                them. All four stay, each with the link it carried; SchemeFlow
                is added beneath as the scannable index of them. */}
            <Prose>
              <p>
                Moving abroad does not move your rental income out of UK tax. UK property income is taxed here
                whoever owns it and wherever they live. What changes when you leave is how the tax gets collected.
                Once your usual place of abode is outside the UK, the non-resident landlord scheme requires your UK
                letting agent to deduct basic rate tax at <strong>20%</strong> from your rent before paying you
                across, and to send that money to HMRC quarterly. Where there is no UK agent, the obligation lands on
                any tenant paying you more than <strong>£100 a week</strong>.
              </p>
              <p>
                <strong>The test is not the statutory residence test.</strong> It is a usual place of abode test, and
                HMRC treats an absence from the UK of six months or more as meeting it. You can be UK resident for
                income tax purposes and still be a non-resident landlord for this scheme, which is exactly the trap
                that catches people on fixed-term overseas postings.
              </p>
              <p>
                Deductions are not the end of it. The agent works out the 20% on rent less the expenses they happen
                to know about, which typically means their own fees and repairs they arranged. Mortgage interest,
                insurance, ground rent, accountancy and anything you paid directly do not feature. Landlords with
                borrowing therefore have far too much taken and only get it back through a UK return. For the
                mechanics of what the agent does and when, see our guides to{" "}
                <InlineLink href={`${NRL}/nrl-withholding-tax-20-percent-basic-rate-deduction`}>
                  the 20% withholding calculation
                </InlineLink>{" "}
                and{" "}
                <InlineLink href={`${NRL}/nrl-scheme-letting-agents-quarterly-returns-mechanics`}>
                  the agent quarterly return cycle
                </InlineLink>
                .
              </p>
              <p>
                The fix is approval to receive rent gross. It does not reduce the tax due. It stops the cash being
                taken a year early from a figure that was never right in the first place. Our{" "}
                <InlineLink href={`${NRL}/non-resident-landlord-scheme-uk-complete-guide`}>
                  full guide to the scheme
                </InlineLink>{" "}
                sets out the statutory framework, and the{" "}
                <InlineLink href={`${NRL}/nrl-approval-receive-rent-gross-hmrc-guide`}>
                  NRL1 application walkthrough
                </InlineLink>{" "}
                covers the form itself.
              </p>
            </Prose>
            <SchemeFlow />
            <ExampleFigureNote className="mt-4" />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <Eyebrow>Our clients</Eyebrow>
              <h2 className="text-2xl font-bold text-slate-900 text-balance sm:text-4xl">Who we work with</h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 sm:mt-6 sm:text-lg">
                Six situations account for most of the people who come to us. None of them is unusual, and every one
                of them is cheaper to sort out early than to unpick after the fact.
              </p>
              <p className="mt-6 text-base font-bold leading-relaxed text-slate-900 text-balance sm:text-lg">
                If one of these sounds like your own position, it is worth a conversation now rather than at the next
                deadline.
              </p>
              <Link
                href="#book"
                data-cta="clients_book"
                data-cta-placement="our_clients"
                data-cta-goal="form"
                className={`${btnPrimary} mt-6 w-full sm:mt-8 sm:w-auto`}
              >
                Book a consultation
              </Link>
            </div>
            <PromptMarquee prompts={clientPrompts} />
          </div>

          {/* Our six scenarios, kept. A divided list in one white card rather
              than a second card grid, because the section below is a
              CoverageCards grid and two grids in a row read as twelve
              equivalent things. Phase 6.3 settled this shape for exactly this
              prompts-plus-scenarios pair. */}
          <ul className="mt-10 divide-y divide-slate-200 rounded-xl bg-white p-6 ring-1 ring-slate-200/70 sm:mt-12 sm:p-8">
            {scenarios.map((item) => (
              <li key={item.title} className="py-5 first:pt-0 last:pb-0">
                <h3 className="text-base font-bold text-slate-900 sm:text-lg">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>The service</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">What the service covers</h2>
            <Prose>
              <p>
                If you are UK resident and letting UK property, the standard{" "}
                <InlineLink href="/services/landlord-accountant">landlord accounting service</InlineLink> is the
                right starting point instead, and our{" "}
                <InlineLink href="/landlord-tax">landlord tax overview</InlineLink> explains the rules that apply to
                everyone regardless of where they live.
              </p>
            </Prose>
            <CoverageCards items={coverage} />
          </div>
        </div>
      </section>

      {/* Placed well clear of the navy Common failure points band further down. */}
      <TestimonialsSection description="Anonymised feedback from landlords and investors, including those letting UK property from overseas." />

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>Filing</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">Self Assessment when you live overseas</h2>
            <Prose>
              <p>
                Your UK return still runs on UK dates. Online filing and payment are due by <strong>31 January</strong>{" "}
                following the end of the tax year, with payments on account on 31 January and 31 July where the
                previous year&apos;s liability was more than £1,000. Being nine time zones away does not extend
                anything, and HMRC will not accept a foreign filing season as a reasonable excuse.
              </p>
              <p>
                Two points decide most non-resident returns. The first is whether you get the UK personal allowance.
                UK and Irish nationals, nationals of EEA states and residents of certain treaty countries generally
                do. Everyone else is taxed from the first pound of profit. The second is the disregarded income
                election, which can let you exclude some UK investment income from the calculation at the cost of the
                allowance. Which is better depends on the mix of your UK income, and it is worth recomputing each
                year rather than assuming last year&apos;s answer holds. The{" "}
                <InlineLink href={`${NRL}/non-resident-landlord-self-assessment-filing-requirements`}>
                  filing requirements guide
                </InlineLink>{" "}
                works through both.
              </p>
              <p>
                Mortgage interest relief is the other item that bites. Since{" "}
                <InlineLink href="/section-24">Section 24</InlineLink> finished phasing in, interest is not
                deductible from rental profit at all. It gives a basic rate tax reduction instead, currently{" "}
                <strong>20%</strong> and rising to <strong>22% from April 2027</strong>, when property income itself
                is taxed at <strong>22%, 42% and 47%</strong>. Where you have no personal allowance and a geared
                portfolio, the effective rate on your UK rent can be higher than a landlord at home would pay on the
                same property. Our{" "}
                <InlineLink href="/calculators/section-24-calculator">Section 24 calculator</InlineLink> shows the
                size of the effect on your figures.
              </p>
              <p>
                <InlineLink href="/making-tax-digital-landlords">Making Tax Digital</InlineLink> arrives on the same
                timetable for you as for everyone else: qualifying income over £50,000 from April 2026, over £30,000
                from April 2027 and over £20,000 from April 2028, with quarterly updates in compatible software on
                top of the year-end return. Living abroad is not an exemption and neither is using an agent. Check
                your date with the <InlineLink href="/calculators/mtd-checker">MTD checker</InlineLink>.
              </p>
            </Prose>
            <FilingDates />
            <ExampleFigureNote className="mt-4" />

            {/* The section links to these four times; embedding one converts an
                exit into an on-page ResultGate capture. `scroll-mt` clears the
                header for the hero's secondary CTA, which lands here. Both
                in-body calculator links above survive the tabs block, so no
                CalculatorLinkCards is owed: the crawl path is page-authored and
                topical, which is what carve-out 5 protects. */}
            <div id="free-tools" className="mt-12 scroll-mt-24 sm:mt-16">
              {/* Plain label, not the shared `Eyebrow`: this sits inside a
                  section rather than heading one, and the emerald rule the
                  Eyebrow brings read as a second marker stacked above the
                  words. */}
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500 sm:text-xs">
                Free tools
              </p>
              <h3 className="text-lg font-bold text-slate-900 sm:text-xl">Size it yourself first</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
                If the numbers turn out to be small, you may not need us at all, and we would rather you found that
                out for free.
              </p>
              <div className="mt-6">
                <CalculatorTabs tabs={["section24", "mtd", "stampduty"]} />
              </div>

              {/* The intent peak in this half of the page: a reader who has just
                  run a calculator is holding their own number, which is exactly
                  the moment a consultation stops being abstract. */}
              <div className="mt-8 rounded-xl bg-white p-6 ring-1 ring-slate-200 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-8">
                <p className="text-base font-bold text-slate-900 sm:text-lg">Got a figure you were not expecting?</p>
                <Link
                  href="#book"
                  data-cta="calculators_book"
                  data-cta-placement="free_tools"
                  data-cta-goal="form"
                  className={`${btnPrimary} mt-4 w-full sm:mt-0 sm:w-auto sm:shrink-0`}
                >
                  Book a consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>Treaties</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
              Double tax treaties: what they do and what they do not
            </h2>
            <CoverageCards items={treatyPoints} columns={3} />
            {/* Carve-out 5. Their card rewrite absorbed the three mechanisms and
                deleted the four blog links that sat in the prose. The links come
                back here rather than in a tail rail, because the cards say what
                a treaty does and this says where to read more about it. */}
            <Prose>
              <p>
                Our introduction to{" "}
                <InlineLink href={`${NRL}/dont-pay-twice-an-introduction-to-tax-treaties`}>
                  how tax treaties work
                </InlineLink>{" "}
                covers the structure, and the{" "}
                <InlineLink href={`${NRL}/dta-tie-breaker-test-dual-residence-property-owners`}>
                  tie-breaker test guide
                </InlineLink>{" "}
                deals with dual residence. If you are heading somewhere specific, the country pathways for{" "}
                <InlineLink href={`${NRL}/moving-to-dubai-uk-rental-property-tax-pathway`}>Dubai</InlineLink> and{" "}
                <InlineLink href={`${NRL}/moving-to-australia-uk-rental-property-tax-pathway`}>Australia</InlineLink>{" "}
                show how differently the same UK position plays out.
              </p>
            </Prose>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>Disposals</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">Selling from abroad: the 60-day rule</h2>
            {/* Carve-out 5 and carve-out 1 together. Their version compressed
                these three paragraphs, deleted both blog links, and replaced the
                rebasing detail with "choosing the wrong basis is the expensive
                part". The 5 April 2015 and 5 April 2019 dates and the
                straight-line time-apportionment election are the operative facts
                in house positions section 5 and section 17.4, and this is the
                one place in all seven pillar pages where our copy is more
                complete than theirs. It stays, and it now names which date
                applies to which kind of disposal. */}
            <Prose>
              <p>
                Non-residents are within UK capital gains tax on disposals of UK residential and commercial land, and
                on indirect disposals of shares in entities deriving at least <strong>75%</strong> of their value from
                UK land where you hold at least a <strong>25%</strong> interest. Residential gains are charged at{" "}
                <strong>18%</strong> and <strong>24%</strong> depending on where the gain falls against the basic
                rate band, and the annual exempt amount is <strong>£3,000</strong>.
              </p>
              <p>
                The reporting rule is stricter for you than for a UK resident. A UK property disposal return is due
                within <strong>60 days of completion</strong> on every disposal of UK land, including ones producing
                a loss and ones fully covered by private residence relief, with the tax payable on the same date. A
                UK resident files only where capital gains tax is actually due. Late filing penalties apply to you
                even where no tax is due, and conveyancers routinely fail to mention it.
              </p>
              <p>
                The computation itself usually turns on rebasing, and choosing the wrong basis is the expensive part
                rather than missing a relief. The charge reached non-residents disposing of UK{" "}
                <strong>residential</strong> property on 6 April 2015, and extended to{" "}
                <strong>non-residential</strong> UK land and to indirect disposals on 6 April 2019. So depending on
                what you are selling you may be able to use the market value at{" "}
                <strong>5 April 2015</strong> or <strong>5 April 2019</strong> instead of original cost, or elect for
                straight-line time apportionment, and the difference between the options can be large. See our guides
                to{" "}
                <InlineLink href={`${NRL}/non-resident-cgt-uk-property-rates-reporting`}>
                  non-resident CGT rates and reporting
                </InlineLink>{" "}
                and{" "}
                <InlineLink href={`${NRL}/non-resident-cgt-selling-uk-property-overseas-guide`}>
                  selling UK property from overseas
                </InlineLink>
                .
              </p>
            </Prose>
            {/* `showRebasing` defaults to true, which is the non-resident
                variant: the 60-day copy stays the designer's original wording,
                correct for this audience, and the rebasing card renders. Phase
                6.5 switched the UK-resident wording on to the same flag, so
                /landlord-tax passes false and this page is unchanged. */}
            <div className="mt-8 sm:mt-10">
              <DisposalFigures />
            </div>
            <ExampleFigureNote className="mt-4" />

            <div className="mt-10 rounded-xl bg-white p-6 ring-1 ring-slate-200 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-8">
              <p className="text-base font-bold text-slate-900 sm:text-lg">
                Completing in the next few months? The 60-day clock starts at completion.
              </p>
              <Link
                href="#book"
                data-cta="disposals_book"
                data-cta-placement="disposals"
                data-cta-goal="form"
                className={`${btnPrimary} mt-4 w-full sm:mt-0 sm:w-auto sm:shrink-0`}
              >
                Book a consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>Before you go</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">Moving abroad with a UK portfolio</h2>
            {/* Carve-out 5. Theirs compressed three paragraphs to two and took
                all four links with them. DepartureWindow recovers the window
                itself and the pre-departure checklist; it recovers none of the
                links, and none of the inheritance tax paragraph. */}
            <Prose>
              <p>
                The twelve months either side of departure carry most of the planning value, and almost all of it
                expires once you have gone. Split-year treatment determines which side of the line your income and
                gains fall. The date you exchange on a sale can decide whether a disposal is taxed as a resident or a
                non-resident. Mortgage lenders treat expat borrowers differently, so refinancing before you go is
                often cheaper than refinancing after.
              </p>
              <p>
                Register for the scheme before the first rent payment goes through rather than after, notify HMRC
                that you are leaving, and get the agent instructions in writing. Our{" "}
                <InlineLink href={`${NRL}/leaving-uk-landlord-12-month-pre-departure-checklist`}>
                  pre-departure checklist
                </InlineLink>{" "}
                sequences the whole thing, and{" "}
                <InlineLink href="/blog/property-finance/expat-non-resident-landlord-mortgages">
                  expat landlord mortgages
                </InlineLink>{" "}
                covers the finance side.
              </p>
              <p>
                Inheritance tax deserves a look while you are at it. UK land is within the charge whoever owns it and
                wherever they live, and holding it through an offshore company no longer avoids that for residential
                property. Thresholds are frozen to 5 April 2031, so a portfolio that grows in value grows its
                exposure. Our note on{" "}
                <InlineLink href={`${NRL}/non-resident-landlords-uk-inheritance-tax-exposure`}>
                  non-resident inheritance tax exposure
                </InlineLink>{" "}
                sets out the position, and if you own through a company,{" "}
                <InlineLink href={`${NRL}/changes-nrl-companies`}>
                  the corporation tax changes for non-resident companies
                </InlineLink>{" "}
                explain what changed in April 2020.
              </p>
            </Prose>
            <DepartureWindow />

            <div className="mt-10 rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-8">
              <p className="text-base font-bold text-slate-900 sm:text-lg">
                Still here? Almost all of this stops being available the day you leave.
              </p>
              <Link
                href="#book"
                data-cta="predeparture_book"
                data-cta-placement="before_you_go"
                data-cta-goal="form"
                className={`${btnPrimary} mt-4 w-full sm:mt-0 sm:w-auto sm:shrink-0`}
              >
                Book a consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-12 text-white sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow onDark>Common failure points</Eyebrow>
            <h2 className="mb-4 text-2xl font-bold text-white sm:mb-6 sm:text-4xl">
              Where non-resident cases go wrong in general practice
            </h2>
            <ul className="grid gap-4 text-sm text-slate-200 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-5 sm:text-base">
              {generalPracticeGaps.map((item) => (
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

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>Getting started</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">How working with us runs</h2>
            <ProcessTimeline steps={howItRuns} />
            <Prose>
              <p>
                Everything runs remotely. Documents go through a secure portal, calls happen at a time that works in
                your zone, and you never need to be in the UK for any of it. Fees depend on the number of properties,
                the number of back years and whether a company, trust or disposal is involved, so we quote once we
                have seen the position, and the figure is fixed before any work starts.
              </p>
              {/* Carve-out 5. The cluster hub link and its sentence lived under
                  the FAQ list, and `FaqSection` has no tail slot, so it lands at
                  the foot of the last content section, the placement Phases 6.2
                  and 6.6 used for the Section 24 and MTD hubs. The head-asset
                  map calls this page "/services/non-resident-landlord + NRL blog
                  set": this is the link that makes it one asset. */}
              <p>
                Everything on this page is covered in more depth across our{" "}
                <InlineLink href={NRL}>non-resident landlord tax guides</InlineLink>.
              </p>
            </Prose>
          </div>
        </div>
      </section>

      {/* Anchor for every primary CTA on the page. `scroll-mt` clears the sticky
          header so the panel's heading is not hidden under it on arrival. */}
      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          title="Get your non-resident landlord position sorted"
          description="Tell us where you are based and what you let in the UK. We will tell you whether you can be paid gross, what is outstanding, and what it will cost to put right."
          proofPoints={[
            { title: "Non-resident specialists", detail: "NRL scheme, gross payment status and UK returns" },
            { title: "Fixed fees, quoted upfront", detail: "No hourly billing, no surprise invoices" },
            { title: "24-hour response", detail: "Wherever you are, whatever the time zone" },
          ]}
          footnote="No obligation and no hard sell. Late or missing returns are a normal starting point, not a problem."
        />
      </div>

      {/* Ours was `#faqs` and theirs keeps it. `scroll-mt-24` added per their own
          standing rule, which their file omits here. */}
      <div id="faqs" className="scroll-mt-24">
        <FaqSection
          title="Non-resident landlord questions we get asked"
          faqs={faqs}
          className="bg-white py-12 sm:py-16 lg:py-20"
        />
      </div>
    </>
  );
}
