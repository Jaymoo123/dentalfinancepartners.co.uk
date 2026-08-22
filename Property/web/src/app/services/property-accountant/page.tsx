import type { Metadata } from "next";
import Link from "next/link";
import { ProcessTimeline } from "@/components/property/ProcessTimeline";
import { StatsCounter } from "@/components/property/StatsCounter";
import { TestimonialsSection } from "@/components/property/TestimonialsSection";
import { siteStats } from "@/lib/site-stats";
import { HeroBrickBackdrop } from "@/components/layout/HeroBrickBackdrop";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { LeadCTAPanel } from "@/components/property/LeadCTAPanel";
import { FaqSection } from "@/components/ui/FaqSection";
import { Eyebrow, InlineLink, Prose } from "@/components/ui/page-blocks";
import { btnOnCream, btnPrimary, heroCreamSurface, siteContainerLg } from "@/components/ui/layout-utils";
import { buildFaqPageJsonLd, type FaqEntry } from "@/lib/faq-page-schema";
import { siteConfig } from "@/config/site";
import { CalculatorTabs } from "@/components/calculators/CalculatorTabs";
import { CalculatorLinkCards } from "@/components/calculators/CalculatorLinkCards";
import { CoverageCards, type CoverageItem } from "@/components/property/CoverageCards";
import { PromptMarquee, type Prompt } from "@/components/property/PromptMarquee";
import { TaxYearGap } from "@/components/property/TaxYearGap";
import {
  BookOpen,
  Building2,
  CalendarClock,
  Compass,
  FileText,
  Hammer,
  Home,
  MonitorCheck,
  Network,
  Percent,
  Receipt,
  Users,
} from "lucide-react";

const PAGE_PATH = "/services/property-accountant";

/**
 * Ours, kept whole (carve-out 5). The designer retitled this page to
 * "Property Accountant | Landlords, Portfolios & SPVs" without sight of the
 * cannibalisation matrix in expansion_research/_prop_audit_2026_08_05/
 * wave_brief_shared.md (commit bbfe0437), whose collision pre-flight froze the
 * homepage at "Property Accountants UK | Specialist Landlord Tax Advice" and
 * assigned this page its own phrasing. Re-running that matrix needs the surface
 * map, not a judgement, so the retitle is recorded and not adopted.
 *
 * hreflang and the twitter card are ours too: their version has neither.
 */
export const metadata: Metadata = {
  title: "Property Accountant for UK Landlords and Investors",
  description:
    "A property accountant for UK landlords and investors: rental accounts, Self Assessment, SPV company accounts, MTD quarterly filing and year-round tax planning.",
  alternates: {
    canonical: `${siteConfig.url}${PAGE_PATH}`,
    languages: {
      "en-GB": `${siteConfig.url}${PAGE_PATH}`,
      "x-default": `${siteConfig.url}${PAGE_PATH}`,
    },
  },
  openGraph: {
    title: "Property Accountant for UK Landlords and Investors",
    description:
      "Rental accounts, Self Assessment, SPV company accounts, MTD filing and planning, handled by accountants who work on property every day.",
    url: `${siteConfig.url}${PAGE_PATH}`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Property Accountant for UK Landlords and Investors",
    description:
      "Rental accounts, Self Assessment, SPV company accounts, MTD filing and planning for UK property.",
  },
};

/**
 * The reader's own situation, in the first person. Same job as Triggers on the
 * advice page and Our clients on the non-resident page: a described client type
 * gets skimmed, a sentence you would say out loud stops you.
 *
 * Keep this EVEN in length — the marquee zigzags on index, and an odd set shows
 * a seam where the loop joins.
 */
const clientPrompts: Prompt[] = [
  {
    tag: "My accountant does everything",
    text: "He does my brother's restaurant too. I have never been asked about a Form 17.",
    icon: Users,
  },
  {
    tag: "I have just bought my third",
    text: "The return stopped being something I could do myself somewhere around the second one.",
    icon: Home,
  },
  {
    tag: "I refurbished a flat last year",
    text: "Nobody told me which of it was a repair and which was capital until the bill arrived.",
    icon: Hammer,
  },
  {
    tag: "Some are personal, some are in a company",
    text: "Two SPVs and four in my own name, and nobody is looking at the whole picture.",
    icon: Network,
  },
  {
    tag: "MTD is coming at me",
    text: "I keep hearing about quarterly filing and I do not know if it applies to me.",
    icon: MonitorCheck,
  },
  {
    tag: "I am thinking about selling one",
    text: "An offer is on the table and I have no idea what I actually keep after tax.",
    icon: Receipt,
  },
];

const coverage: CoverageItem[] = [
  {
    title: "Rental accounts and bookkeeping",
    icon: BookOpen,
    body: "Property-by-property income and expense records, so you can see which flat actually makes money rather than one blended figure for the portfolio. Bank feeds, agent statements and service charge accounts reconciled, with the capital and revenue split done properly at the point of entry rather than guessed at in January.",
  },
  {
    title: "Self Assessment for rental income",
    icon: FileText,
    body: "The property pages of your tax return, prepared with the finance cost restriction applied correctly, allowable expenses claimed in full, and jointly held property split the way your ownership and any Form 17 election actually require. Payments on account checked so you are not overpaying HMRC a year in advance.",
  },
  {
    title: "Company accounts for property SPVs",
    icon: Building2,
    body: "Statutory accounts and CT600 corporation tax returns for buy-to-let limited companies, including directors' loan account tracking, intercompany balances in group structures, and the profit extraction mix that leaves you with the most after tax.",
  },
  {
    title: "Making Tax Digital",
    icon: MonitorCheck,
    body: "Quarterly updates under MTD for Income Tax, which applies to qualifying property and self-employment income over £50,000 from April 2026, over £30,000 from April 2027 and over £20,000 from April 2028. Software chosen and set up around how you already record rents, not the other way round.",
  },
  {
    title: "Capital gains and disposals",
    icon: Receipt,
    body: "The 60-day CGT return after a residential disposal, base cost reconstructed from purchase and improvement records, private residence and lettings relief where they apply, and disposal timing modelled before you accept an offer rather than after completion.",
  },
  {
    title: "Structure and planning",
    icon: Compass,
    body: "Whether to hold personally or in a company, whether incorporation relief is realistically available and claimed in time, how capital allowances land now that the writing down allowance is 14% with a 40% first year allowance on main pool spend, and what your portfolio does at the point it passes to the next generation.",
  },
];

const audiences = [
  {
    scale: "1 to 3 properties",
    title: "You bought a flat and the return stopped being simple",
    body: "The first return you did yourself. Then a remortgage arrangement fee, a boiler replacement that might be capital, a void period and a tenant deposit dispute all landed in the same year, and the finance cost restriction turned a modest profit into a tax bill you did not expect. This is the point where the fee usually pays for itself in claimed expenses alone.",
  },
  {
    scale: "4 to 15 properties",
    title: "You run a portfolio and need numbers you can act on",
    body: "You want to know yield and net profit per property, which mortgage to fix next, and whether the next purchase should sit personally or in a company. You also want the compliance to be a non-event: quarterly MTD updates filed, the return in well before the deadline, no January panic.",
  },
  {
    scale: "Limited company and SPV",
    title: "You hold property through a company",
    body: "Statutory accounts, corporation tax, Companies House filing, directors' loan account discipline and a profit extraction plan. Dividend rates rose to 10.75%, 35.75% and 39.35% from 6 April 2026, which changes the salary and dividend mix that used to be automatic.",
  },
  {
    scale: "Investor, mixed holdings",
    title: "Property is one part of a wider position",
    body: "Residential, commercial units, a development project, maybe shares and a pension alongside. You need someone who can see the whole tax position, including how a disposal in one part of the portfolio interacts with the annual exempt amount, business asset disposal relief at 18% from 6 April 2026, and the inheritance tax thresholds now frozen to 5 April 2031.",
  },
];

const whySpecialist: CoverageItem[] = [
  {
    title: "The finance cost restriction is a rate change, not a footnote",
    icon: Percent,
    body: "Mortgage interest on residential lettings held personally is relieved as a basic rate tax reducer, currently 20%, rising to 22% from April 2027 alongside the new separate property income rates of 22%, 42% and 47%, which leaves higher-rate landlords no better off. A generalist who deducts interest as an ordinary expense produces a return that is wrong on its face. Getting the calculation right also means spotting the years where the reducer is capped by the profit or income limits and carried forward.",
  },
  {
    title: "Capital versus revenue is where the money sits",
    icon: Hammer,
    body: "A new kitchen of a similar standard is usually a repair. An extension is not. Replacing single glazing with double glazing follows the current standard rule. Deciding these correctly, and documenting why, is the difference between a deduction now, a deduction on sale, and an enquiry you cannot support.",
  },
  {
    title: "Property has its own deadlines",
    icon: CalendarClock,
    body: "A 60-day CGT return after a residential disposal. ATED returns each April for company-held residential property above the threshold. The non-resident landlord scheme. Quarterly MTD updates from April 2026. These sit outside the ordinary Self Assessment calendar and are easy to miss if property is not what you look at all day.",
  },
  {
    title: "Structure decisions compound",
    icon: Network,
    body: "Incorporating, adding a spouse to the title, moving to a group, taking money out as a directors' loan repayment rather than a dividend: each one is cheap to plan and expensive to unwind. A specialist tells you the cost of the option you are about to take before you take it.",
  },
];

const feeDrivers = [
  {
    title: "How many properties you hold",
    body: "The count, and how much movement there is across them in a year.",
  },
  {
    title: "Personally, in a company, or both",
    body: "A mixed structure means two sets of filings and the interaction between them.",
  },
  {
    title: "Bookkeeping through the year, or a year end return",
    body: "Whether we keep the records as you go or pick them up once a year.",
  },
  {
    title: "Whether MTD quarterly filing applies",
    body: "Four submissions a year plus the year end, once you are inside the thresholds.",
  },
];

const onboarding = [
  {
    n: "01",
    title: "Free consultation",
    body: "Tell us what you own, how it is held, and what you want to do next. We say plainly whether you need what we do. If your position is a single property and a simple return you can file yourself, we will tell you that.",
  },
  {
    n: "02",
    title: "A fixed quote and a scope you can read",
    body: "You get a written engagement letter setting out exactly what is included, what is not, and what it costs for the year. No hourly billing, no surprise invoices for a phone call.",
  },
  {
    n: "03",
    title: "Onboarding and clearance",
    body: "Identity checks, HMRC authorisation, and professional clearance from your existing accountant if you have one. We collect prior year returns, computations and capital allowance records so nothing carried forward is lost in the handover.",
  },
  {
    n: "04",
    // Ours, kept: "inside 24 hours". The designer changed this to "inside one
    // working day" without comment, which is a different service promise, and
    // their own LeadCTAPanel on this page still proves "24-hour response", as
    // does siteStats. Raised as an owner question rather than changed here.
    title: "The year runs",
    body: "Records kept current, quarterly filings where MTD applies, questions answered inside 24 hours, and a planning conversation before your year end rather than after it, while the decisions can still change the outcome.",
  },
];

/**
 * The four free calculators, as real crawlable links alongside the tabs.
 *
 * CalculatorTabs renders <button role="tab">, so their version of this page
 * traded four in-body links to the tools for zero (report 03 §4.2). This is the
 * designer's own fix for that, CalculatorLinkCards, which they wrote and
 * documented and then never wired to a page. Carve-out 5.
 */
const calculatorLinks = [
  {
    href: "/calculators/section-24-calculator",
    title: "Section 24 calculator",
    body: "What the finance cost restriction costs you this year, and what it costs from April 2027 when the reducer moves to 22% and property income moves to 22%, 42% and 47%.",
  },
  {
    href: "/calculators/mtd-checker",
    title: "MTD checker",
    body: "Whether quarterly filing catches you from April 2026, April 2027, April 2028, or not yet.",
  },
  {
    href: "/calculators/incorporation-cost-calculator",
    title: "Incorporation cost calculator",
    body: "Upfront CGT and stamp duty against annual savings, with a break-even year.",
  },
  {
    href: "/calculators/portfolio-profitability-calculator",
    title: "Portfolio profitability calculator",
    body: "Net yield and profit per property, so you can see which holdings are actually carrying the portfolio.",
  },
];

/**
 * Ours, restored whole. Their layout deletes this section, and with it eight
 * curated deep links spanning four blog clusters. These seven pages are the only
 * authored equity flowing outward into the clusters
 * (docs/Property/STRUCTURE_VS_COMPETITORS_2026-08-17.md:128-142), and the wave
 * brief that built this page required "4-8 relevant existing blog posts in-body".
 */
const feedingPosts = [
  {
    href: "/blog/property-accountant-services/how-to-choose-a-property-accountant",
    label: "How to choose a property accountant",
  },
  {
    href: "/blog/property-accountant-services/how-much-does-a-property-accountant-cost",
    label: "What a property accountant costs",
  },
  {
    href: "/blog/property-accountant-services/change-landlord-accountants",
    label: "Changing accountants without losing anything",
  },
  {
    href: "/blog/section-24-and-tax-relief/finance-costs-section-24-complete-guide",
    label: "Finance costs and the interest restriction",
  },
  {
    href: "/blog/making-tax-digital-mtd/making-tax-digital-landlords-april-2026-deadline",
    label: "MTD for landlords from April 2026",
  },
  {
    href: "/blog/making-tax-digital-mtd/best-mtd-software-landlords-2026",
    label: "MTD software compared",
  },
  {
    href: "/blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk",
    label: "Buy-to-let limited companies in full",
  },
  {
    href: "/blog/landlord-tax-essentials/how-to-complete-landlord-self-assessment-filing-step-by-step-guide",
    label: "Filing a landlord Self Assessment return",
  },
];

const faqs: FaqEntry[] = [
  {
    question: "What does a property accountant do?",
    answer:
      "A property accountant handles the accounting and tax for people who own rental or investment property: rental accounts, the property pages of your Self Assessment return, company accounts and corporation tax for buy-to-let SPVs, quarterly MTD filing, the 60-day capital gains return on residential disposals, and planning around structure, purchases and sales. The core difference from a general accountant is that the property rules are the whole job rather than one client type among fifty.",
  },
  {
    question: "Do I need a property accountant for one buy-to-let?",
    answer:
      "Not necessarily. If you have one property, no mortgage complications and straightforward expenses, the return is manageable on your own. The point at which help usually pays for itself is a residential mortgage in your own name at higher rate tax, a refurbishment where the capital and revenue split is unclear, joint ownership, a sale, or the arrival of MTD quarterly filing. Our free consultation is a fair way to find out which side of that line you are on.",
  },
  {
    question: "What is the difference between a property accountant and a regular accountant?",
    answer:
      "Scope and depth. A regular accountant can prepare a compliant tax return. A property accountant works with the finance cost restriction, private residence and lettings relief, incorporation relief under section 162, capital allowances on commercial and communal areas, ATED, the non-resident landlord scheme, and stamp duty surcharges every week rather than occasionally. Section 162 is a good example of why that matters: for transfers on or after 6 April 2026 the relief is no longer automatic and has to be claimed, by the first anniversary of the 31 January following the tax year of the transfer, and the old election to disapply it has been repealed. Property-specific reliefs are usually missed by volume rather than incompetence: nobody claims what they have not seen before.",
  },
  {
    question: "How much does a property accountant cost?",
    answer:
      "It depends on how many properties you hold, whether they sit personally or in a company, whether you need bookkeeping or only a year end return, and whether MTD quarterly filing applies. We quote a fixed annual fee after the consultation so you know the figure before you commit to anything. Our guide to property accountant fees sets out the ranges you should expect across the market.",
  },
  {
    question: "Do I need a property accountant near me?",
    answer:
      "Location matters much less than it used to. Records arrive digitally, HMRC filing is online, and meetings work as well by video as across a desk. What matters is whether the firm actually works on property. We act for landlords across the UK, from single flats to portfolios of forty, and the tax rules are the same in Leeds as they are in London. If you want a face-to-face meeting, we can arrange one.",
  },
  {
    question: "Can you take over from my current accountant mid-year?",
    answer:
      "Yes. We write for professional clearance, collect your prior year accounts, computations and any carried forward losses or capital allowance pools, and pick up from where they stopped. There is no need to wait for a year end, and switching does not restart anything with HMRC. Most handovers complete inside two weeks.",
  },
  {
    question: "Do you handle both personally held property and limited companies?",
    answer:
      "Yes, and the two together is common. A typical portfolio has older properties held personally and newer purchases in an SPV. We prepare the Self Assessment side and the company accounts and corporation tax side, and treat them as one position when planning, because the decision about where the next purchase goes depends on both.",
  },
  {
    question: "Will you tell me whether to incorporate?",
    answer:
      "We will model it and give you a straight answer. Incorporation triggers capital gains tax and stamp duty on the same day, and those upfront costs need recovering out of annual savings. For a higher rate taxpayer with heavy mortgage interest and a long holding horizon it often works. For a basic rate taxpayer, a low-geared portfolio, or a sale within five years, it usually does not. You can model your own position with our incorporation cost calculator first.",
  },
  {
    question: "How does Making Tax Digital change what you do for me?",
    answer:
      "From April 2026, qualifying property and self-employment income over £50,000 moves to quarterly digital updates, with the threshold dropping to £30,000 from April 2027 and £20,000 from April 2028. In practice that means records have to be kept current through the year rather than reconstructed in December, and four submissions plus a final declaration replace one return. We set the software up, keep the records live, and file the quarters.",
  },
  {
    question: "What records do you need from me?",
    answer:
      "Rent received, agent statements, mortgage interest certificates, insurance, repairs and maintenance invoices, service charge and ground rent demands, professional fees, and completion statements for any purchase or sale. For companies, add the bank statements and anything paid personally on the company's behalf. If your records are currently a folder of photographs, that is workable, and getting them into a usable system is part of onboarding.",
  },
  {
    question: "Do you work with non-resident landlords?",
    answer:
      "Yes. Non-resident landlords have their own scheme for tax deducted at source, their own approval process for receiving rent gross, and a capital gains position that catches disposals of UK property regardless of where you live. It is a distinct piece of work, and our non-resident landlord service covers it in detail.",
  },
  {
    question: "What happens if HMRC opens an enquiry?",
    answer:
      "We handle the correspondence, assemble the supporting records, and deal with HMRC directly on your behalf. Most property enquiries turn on the capital and revenue split, the ownership share used on jointly held property, or undeclared rent from earlier years. Where earlier years are the issue, a disclosure through the Let Property Campaign usually produces a far better penalty outcome than waiting to be found.",
  },
];

/**
 * Ours, restored. Their version emits FAQPage only, which drops the richest
 * service markup on the site: hasOfferCatalog is the machine-readable list of
 * what the service includes, built from the six coverage items so a copy edit
 * cannot drift from the schema. BreadcrumbList comes from <Breadcrumb>.
 */
const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${siteConfig.url}${PAGE_PATH}#service`,
  name: "Property accountancy for UK landlords and investors",
  serviceType: "Property accountant",
  description:
    "Accounting and tax for UK landlords and property investors: rental accounts, Self Assessment, limited company and SPV accounts, Making Tax Digital filing, capital gains reporting and structure planning.",
  url: `${siteConfig.url}${PAGE_PATH}`,
  provider: {
    "@type": "Organization",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
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
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Property accountancy services",
    itemListElement: coverage.map((item) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: item.title },
    })),
  },
};

export default function PropertyAccountantPage() {
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

      <section className={`relative flex items-center py-10 sm:py-12 lg:py-14 min-h-[360px] sm:min-h-[420px] lg:min-h-[440px] overflow-hidden ${heroCreamSurface}`}>
        <HeroBrickBackdrop tone="cream" />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: "Property accountant" },
              ]}
            />
            <h1 className="mt-4 sm:mt-6 text-2xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-6xl">
              A property accountant for UK landlords and investors
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-slate-700">
              Whether it is a refurbishment to classify, a sale to time or a portfolio to restructure, a free
              consultation shows you what your current setup is costing you and quotes a fixed fee in
              writing to fix it.
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

      {/* Stats strip, same treatment as the homepage: white with a hairline, so it
          reads as a break from the navy hero rather than a section of its own. */}
      <section className="border-b border-slate-200 bg-white py-5 sm:py-7">
        <div className={siteContainerLg}>
          <StatsCounter stats={siteStats} />
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>The gap</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
              Your tax bill is decided before the return is filed
            </h2>
            <Prose>
              <p>
                Most landlord tax bills are decided long before the return is filed. They are decided by how a
                refurbishment was categorised, whose name the property sits in, whether the mortgage interest was
                put through as a deduction or a tax reducer, and whether anyone modelled the sale before contracts
                were exchanged. By the time a general practice accountant is typing figures into the property pages
                in January, most of those decisions have already been made for you.
              </p>
              <p>
                A specialist property accountant closes that gap. The compliance still has to be right, and it will
                be, but the value sits in the twelve months before it: knowing which costs are deductible when,
                which structure your next purchase belongs in, and what a disposal actually leaves you with after
                tax.
              </p>
            </Prose>
            <TaxYearGap />
          </div>
        </div>
      </section>

      {/* Self-identification before the service inventory: the reader confirms
          "this is me" before being asked to care what is included. slate-50 so
          the marquee's white cards read against it. */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <Eyebrow>Sound familiar</Eyebrow>
              <h2 className="text-2xl font-bold text-slate-900 text-balance sm:text-4xl">
                Most people arrive here saying one of these
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 sm:mt-6 sm:text-lg">
                None of them is unusual, and none of them is a problem a generalist sees often enough to have a
                routine for. All of them are ordinary weeks here.
              </p>
              <Link
                href="#book"
                data-cta="prompts_book"
                data-cta-placement="sound_familiar"
                data-cta-goal="form"
                className={`${btnPrimary} mt-6 w-full sm:mt-8 sm:w-auto`}
              >
                Book a consultation
              </Link>
            </div>
            <PromptMarquee prompts={clientPrompts} />
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>Fit</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">Who this is for</h2>
            <Prose>
              <p>
                If your situation is narrower than the general service, we have work built specifically around it:{" "}
                <InlineLink href="/services/landlord-accountant">accounts and returns for landlords</InlineLink>,
                standalone{" "}
                <InlineLink href="/services/property-tax-advice">property tax advice</InlineLink> where you only
                need a decision modelled, and the{" "}
                <InlineLink href="/services/non-resident-landlord">non-resident landlord service</InlineLink> if you
                live outside the UK.
              </p>
            </Prose>
            <div className="mt-8 sm:mt-10 grid gap-5 sm:gap-6 md:grid-cols-2">
              {audiences.map((a) => (
                <div key={a.scale} className="rounded-xl bg-slate-50 p-6 sm:p-8">
                  <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">{a.scale}</p>
                  <h3 className="mt-2 text-base sm:text-lg font-bold text-slate-900">{a.title}</h3>
                  <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed text-slate-700">{a.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="included" className="scroll-mt-24 bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>What is included</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">What a property accountant covers</h2>
            <p className="mt-4 text-sm sm:text-base text-slate-700">
              Six areas of work. Most clients take all of them, some take one.
            </p>
            <Prose>
              <p>
                Rates and thresholds change every year, and several change again in April 2026 and April 2027. The
                current position across income tax, stamp duty, capital gains and corporation tax is set out on our{" "}
                <InlineLink href="/property-tax-rates">property tax rates page</InlineLink>, and the mechanics of
                how the tax itself works are covered in our{" "}
                <InlineLink href="/landlord-tax">landlord tax guide</InlineLink>.
              </p>
            </Prose>
            <CoverageCards items={coverage} tone="white" />

            <div className="mt-10 rounded-xl bg-white p-6 ring-1 ring-slate-200 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-8">
              <p className="text-base font-bold text-slate-900 sm:text-lg">
                Not sure which of these you actually need? That is what the first call is for.
              </p>
              <Link
                href="#book"
                data-cta="included_book"
                data-cta-placement="what_is_included"
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
            <Eyebrow>The difference</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
              Why a specialist property accountant rather than a general one
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-700">
              Nothing here is exotic. It is simply what you see when property is the only thing on the desk.
            </p>
            <CoverageCards items={whySpecialist} />

            <div className="mt-10 rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-8">
              <p className="text-base font-bold text-slate-900 sm:text-lg">
                Every client here is a landlord, investor or developer. Nothing else.
              </p>
              <Link
                href="#book"
                data-cta="difference_book"
                data-cta-placement="the_difference"
                data-cta-goal="form"
                className={`${btnPrimary} mt-4 w-full sm:mt-0 sm:w-auto sm:shrink-0`}
              >
                Book a consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Proof after the difference argument, before the process. */}
      <TestimonialsSection description="Anonymised feedback from landlords and investors across every portfolio size." />

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>Getting started</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
              How working together starts
            </h2>
            <ProcessTimeline steps={onboarding} />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>Fees</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">What it costs</h2>
            <Prose>
              <p>
                Fees are fixed and quoted for the year, not billed by the hour, and the figure depends on the shape
                of the work rather than a tier you pick off a page. We quote after the consultation, in writing,
                before you commit to anything, and the quote holds for the year.
              </p>
              <p>
                For an honest picture of what firms across the market charge, and what should and should not be
                included at each level, read our guide to{" "}
                <InlineLink href="/blog/property-accountant-services/how-much-does-a-property-accountant-cost">
                  property accountant fees
                </InlineLink>
                .
              </p>
            </Prose>

            {/* DECISION I is open: the designer asked for a fee figure across six
                sessions and never received one, and their standing rule is never
                to invent a price. So the section names what moves the number and
                stops, with no placeholder and no stub. If a figure is supplied it
                belongs immediately below this grid, as a third card row or a
                single "typical range" line above the two ends. */}
            <div className="mt-8 grid gap-5 sm:mt-10 sm:gap-6 md:grid-cols-2">
              {feeDrivers.map((driver) => (
                <div key={driver.title} className="rounded-xl bg-white p-6 ring-1 ring-slate-200/70 sm:p-7">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">{driver.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{driver.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-5 sm:gap-6 md:grid-cols-2">
              <div className="rounded-xl border-l-2 border-emerald-500 bg-white p-6 ring-1 ring-slate-200/70 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">The simple end</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  One property, clean records, an annual return and nothing else moving.
                </p>
              </div>
              <div className="rounded-xl border-l-2 border-slate-300 bg-white p-6 ring-1 ring-slate-200/70 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">The other end</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Ten properties split across personal ownership and two SPVs, with quarterly filing and monthly
                  management reporting.
                </p>
              </div>
            </div>

            <div className="mt-10 rounded-xl bg-white p-6 ring-1 ring-slate-200 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-8">
              <p className="text-base font-bold text-slate-900 sm:text-lg">
                Want your number? Tell us the shape of the portfolio and we will quote it.
              </p>
              <Link
                href="#book"
                data-cta="fees_book"
                data-cta-placement="fees"
                data-cta-goal="form"
                className={`${btnPrimary} mt-4 w-full sm:mt-0 sm:w-auto sm:shrink-0`}
              >
                Book a consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="free-tools" className="scroll-mt-24 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>Free tools</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">Work out your own numbers first</h2>
            <p className="mt-4 text-sm sm:text-base text-slate-700">
              Free, and the figures are yours to take to any adviser.
            </p>
            <Prose>
              <p>
                If incorporation is the decision in front of you, our{" "}
                <InlineLink href="/incorporation">incorporation feasibility analysis</InlineLink> models it properly
                rather than in outline.
              </p>
            </Prose>
            <div className="mt-8 sm:mt-10">
              <CalculatorTabs />
            </div>
            <p className="mt-10 text-sm sm:text-base font-semibold text-slate-900">
              Or open any of them on its own page:
            </p>
            <CalculatorLinkCards items={calculatorLinks} />
          </div>
        </div>
      </section>

      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          title="Talk to a property accountant about your portfolio"
          description="A free consultation, a straight answer about whether you need us, and a fixed written quote if you do."
          proofPoints={[
            { title: "Property-only specialists", detail: "Landlords, investors and developers, nothing else" },
            { title: "Fixed fees, quoted upfront", detail: "No hourly billing, no surprise invoices" },
            { title: "24-hour response", detail: "Usually the same working day" },
          ]}
          footnote="No obligation and no hard sell. If you do not need us, we will tell you."
        />
      </div>

      <FaqSection
        title="What landlords ask before they engage us"
        faqs={faqs}
        className="bg-white py-12 sm:py-16 lg:py-20"
      />

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>Related reading</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">More on choosing and working with one</h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {feedingPosts.map((post) => (
                <li key={post.href}>
                  <Link
                    href={post.href}
                    className="block rounded-xl bg-white px-5 py-4 text-sm sm:text-base font-semibold text-slate-800 ring-1 ring-slate-200 transition-all hover:text-emerald-700 hover:ring-emerald-300"
                  >
                    {post.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
