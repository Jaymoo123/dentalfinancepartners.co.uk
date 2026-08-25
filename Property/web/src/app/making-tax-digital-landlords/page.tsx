import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  CalendarClock,
  Check,
  ClipboardCheck,
  FileCheck,
  FileSpreadsheet,
  HelpCircle,
  Laptop,
  PoundSterling,
  ShieldCheck,
  Tags,
  UserX,
  Users,
  X,
} from "lucide-react";
import { HeroBrickBackdrop } from "@/components/layout/HeroBrickBackdrop";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { FilingCadence } from "@/components/property/FilingCadence";
import { ProcessTimeline } from "@/components/property/ProcessTimeline";
import { CoverageCards, type CoverageItem } from "@/components/property/CoverageCards";
import { PromptMarquee, type Prompt } from "@/components/property/PromptMarquee";
import { LeadCTAPanel } from "@/components/property/LeadCTAPanel";
import { StatsCounter } from "@/components/property/StatsCounter";
import { TestimonialsSection } from "@/components/property/TestimonialsSection";
import { siteStats } from "@/lib/site-stats";
import { CalculatorTabs } from "@/components/calculators/CalculatorTabs";
import { FaqSection } from "@/components/ui/FaqSection";
import { ExampleFigureNote } from "@/components/ui/ExampleFigureNote";
import { Eyebrow, InlineLink, Prose } from "@/components/ui/page-blocks";
import { btnOnCream, btnPrimary, heroCreamSurface, siteContainerLg } from "@/components/ui/layout-utils";
import { buildFaqPageJsonLd, type FaqEntry } from "@/lib/faq-page-schema";
import { siteConfig } from "@/config/site";

const PATH = "/making-tax-digital-landlords";
const URL = `${siteConfig.url}${PATH}`;
const BLOG = "/blog/making-tax-digital-mtd";

/**
 * Ours, kept whole (carve-out 5). Their version retitles to "Making Tax Digital
 * for Landlords | MTD for Income Tax 2026", softens the description off the
 * £50,000 / £30,000 figures and drops the twitter card entirely. Our title was
 * set against the collision pre-flight in
 * expansion_research/_prop_audit_2026_08_05/wave_brief_shared.md (commit
 * bbfe0437), which the designer never saw; re-running that matrix needs
 * docs/_engines/PROPERTY_SEO_SURFACE_MAP_2026-08-05.md rather than a judgement,
 * so the retitle is recorded and not adopted. Same finding as 6.1 to 6.5.
 */
export const metadata: Metadata = {
  title: "Making Tax Digital for Landlords: Rules and Deadlines",
  description:
    "MTD for Income Tax for UK landlords: the £50,000 threshold from April 2026, £30,000 from April 2027, quarterly updates, digital records, penalties and what to do now.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Making Tax Digital for Landlords: 2026 Rules and Deadlines",
    description:
      "Who is in scope, what qualifying income means, the quarterly filing calendar, digital record rules and the penalty regime for UK landlords.",
    url: URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Making Tax Digital for Landlords: 2026 Rules and Deadlines",
    description:
      "Who is in scope, what qualifying income means, the quarterly filing calendar, digital record rules and the penalty regime for UK landlords.",
  },
};

/**
 * Self-identification prompts, the Making Tax Digital set (theirs, adopted
 * whole).
 *
 * First person on purpose, and deliberately UNATTRIBUTED: no names, initials,
 * avatars or portfolio details. These are self-identification cues, not
 * testimonials, and an attribution turns them into invented client quotes.
 *
 * Keep the count EVEN. The zigzag offset in `PromptMarquee` alternates on
 * index, so an odd set flips the pattern at the loop seam and it shows.
 */
const mtdPrompts: Prompt[] = [
  {
    tag: "I do not know if this applies to me",
    text: "I have had a letter about Making Tax Digital and I still cannot tell whether I am in or not.",
    icon: HelpCircle,
  },
  {
    tag: "I thought the threshold was profit",
    text: "My profit is nowhere near £50,000. Someone told me it is measured on the rent instead.",
    icon: PoundSterling,
  },
  {
    tag: "My records are a spreadsheet",
    text: "Everything is in one spreadsheet and a shoebox. I have no idea if that is still allowed.",
    icon: FileSpreadsheet,
  },
  {
    tag: "I do not know which software to buy",
    text: "There are dozens of them, they all claim to be approved, and none of them mention landlords.",
    icon: Laptop,
  },
  {
    tag: "Four filings a year sounds like a lot",
    text: "I can just about manage one return in January. I do not know how I will do four.",
    icon: CalendarClock,
  },
  {
    tag: "My accountant has gone quiet on it",
    text: "I asked about Making Tax Digital months ago and I am still waiting to hear what happens next.",
    icon: UserX,
  },
];

/**
 * The three start dates, as calendar tiles (theirs).
 *
 * All three mandates begin on 6 April, so the tile shows a real date rather
 * than a decorative one.
 *
 * THE `live` FLAG IS DERIVED, NOT TYPED. Their file hand-set `live: true` on the
 * first row with a code comment saying "when the 2027 wave starts, move the flag
 * down a row. Nothing on this page derives it from the clock" - a staleness trap
 * with a hard expiry of 6 April 2027 (report 03 §9.6). It is now computed from
 * `start`: the live wave is the last one whose start date has passed. This is a
 * server component, so the comparison runs at build time and the page re-derives
 * on every deploy rather than on every request. That is the ceiling of this fix
 * and it is stated rather than hidden: a site left undeployed across 6 April
 * 2027 would still show the old wave as live.
 */
const thresholds = [
  {
    amount: "Above £50,000",
    start: "2026-04-06",
    taxYear: "2026/27",
    upcoming: "From 6 April 2026",
    month: "Apr",
    day: "6",
    year: "2026",
    body: "If your gross income from property and self-employment combined was above £50,000 in the 2024/25 tax year, you are in scope for 2026/27 and your first quarterly update covers 6 April to 5 July 2026.",
  },
  {
    amount: "Above £30,000",
    start: "2027-04-06",
    taxYear: "2027/28",
    upcoming: "From 6 April 2027",
    month: "Apr",
    day: "6",
    year: "2027",
    body: "The second wave. This catches a large slice of two-property and three-property landlords, and most jointly owned portfolios where each owner's share sat under £50,000 but above £30,000.",
  },
  {
    amount: "Above £20,000",
    start: "2028-04-06",
    taxYear: "2028/29",
    upcoming: "From 6 April 2028",
    month: "Apr",
    day: "6",
    year: "2028",
    body: "The final announced step. At £20,000 of gross rent, a single average-yield rental property can be enough to bring you inside the regime.",
  },
];

/** The last wave whose start date has passed, or -1 before the first one does. */
const liveIndex = thresholds.filter((t) => Date.now() >= Date.parse(t.start)).length - 1;

/**
 * The things MTD leaves alone, lifted out of the paragraph that used to list
 * them mid-sentence. Short, flat and reassuring, which is why they render as
 * chips: none of them needs explaining, they just need to be visible.
 */
const unchangedByMtd = [
  "Your tax rates",
  "Your allowable expenses",
  "The Section 24 restriction",
  "Capital allowances",
  "Payment dates",
  "Payments on account",
];

/**
 * An illustrative month of records, used to SHOW what the record-keeping section
 * otherwise only describes. The four categories are deliberately four different
 * ones from HMRC's property schema, so the table demonstrates the schema as well
 * as the format. Not tied to any worked example elsewhere on the page.
 */
const specimenRecord = [
  { date: "4 May 2026", desc: "Rent, 14 Alma Road", amount: "£1,250.00", category: "Rent received", income: true },
  { date: "9 May 2026", desc: "Boiler service", amount: "−£96.00", category: "Repairs and maintenance", income: false },
  { date: "12 May 2026", desc: "Mortgage interest, May", amount: "−£412.00", category: "Finance costs", income: false },
  { date: "20 May 2026", desc: "Letting agent commission", amount: "−£125.00", category: "Agent fees", income: false },
];

/**
 * The five property-specific problems from the specialist section, as a
 * comparison rather than a list inside one sentence (theirs, new copy, adopted).
 *
 * The left column is written as what a generalist reasonably does, not as a
 * mistake. The section's own opening line is that any competent accountant can
 * file a quarterly update, and a column implying otherwise would contradict the
 * copy directly above it and overclaim. The difference being sold here is
 * subject knowledge, and that is what each pair should show.
 */
const specialistComparison = [
  {
    situation: "A mixed portfolio near the threshold",
    general: "Tests the figure in front of them, usually the property income on last year's return.",
    specialist:
      "Adds gross rent to self-employment turnover for the year two back, before any costs, which is the test that actually decides your start date.",
  },
  {
    situation: "Jointly owned property",
    general: "Reports the property, then apportions at year-end.",
    specialist:
      "Sets each owner's share up in the records from the start, so both sets of quarterly updates come out of one bookkeeping job.",
  },
  {
    situation: "A property that stops being let mid-year",
    general: "Keeps filing the same categories until the year-end review.",
    specialist: "Knows when the letting ends, what happens to costs in the void, and which of them stay allowable.",
  },
  {
    situation: "Foreign rental income",
    general: "Handles it at year-end with the rest of the return.",
    specialist:
      "Keeps it as its own business in the records, because it reports separately and lands in the same quarterly cycle.",
  },
  {
    situation: "Year-end, where the reliefs interact",
    general: "Applies the reliefs the software prompts for.",
    specialist:
      "Works the finance cost restriction against capital allowances and the rest of your income, which is where the size of the bill is actually decided.",
  },
];

/**
 * The late-payment escalation. Bar widths are a reading aid for the shape of
 * the escalation, not a scale: the third row is an annual rate and the first
 * two are one-off charges, so they are not on the same axis and the bars must
 * not be read as if they were.
 *
 * These are the 2026/27 figures and the card says so. House positions §19.7,
 * 08-21 addition (b): the first two charges step to 4% for 2027/28, so the
 * 3%/3%/10% schedule must never be written open-ended "from 6 April 2026".
 * Both our version and the designer's did exactly that.
 */
const latePayment = [
  { when: "Day 15", charge: "3% of the unpaid tax", width: "24%" },
  { when: "Day 30", charge: "A further 3%", width: "48%" },
  { when: "Day 31 onwards", charge: "10% a year, accruing", width: "100%" },
];

/** The three near-misses, pulled out of two paragraphs of asides. */
const notARecord = [
  "A monthly total. The obligation is each individual item, not a summary of them.",
  "A bank statement PDF filed in a folder. It is a document about your records, not a record.",
  "Figures retyped between your records and the submission. That breaks the digital link even when the final numbers are right.",
];

/** The three figures on the £60,000 example, and which one the threshold tests. */
const grossVsProfit = [
  { label: "Gross rent", amount: "£60,000", verdict: "This is what is tested", tested: true },
  { label: "Costs", amount: "£45,000", verdict: "Not part of the test", tested: false },
  { label: "Profit", amount: "£15,000", verdict: "Not part of the test", tested: false },
];

/**
 * Who is in and who is out, as one list rather than four equivalent cards
 * (theirs).
 *
 * Three of these put a reader IN scope and the fourth takes them out, and the
 * old stack rendered all four identically, so the reader had to read each body
 * to work out which way it pointed. The scope flag is the whole value of the
 * section: it turns four paragraphs into a lookup.
 *
 * A divided list rather than another grid, deliberately: the section directly
 * above is a 3-up card grid of thresholds, and four more cards would read as
 * seven equivalent things rather than a set and its complement.
 */
const whoComplies: Array<{ title: string; body: string; scope: "in" | "out" }> = [
  {
    title: "You let property in your own name",
    body: "Individual landlords, sole traders and partners in a property partnership are the target of MTD for Income Tax. If you file a Self Assessment return with a property page and your qualifying income clears the threshold, you are in.",
    scope: "in",
  },
  {
    title: "Your income is gross, not profit",
    body: "The test is gross income before expenses and before any mortgage interest. A landlord with £60,000 of rent and £45,000 of costs has £15,000 of profit and is still in scope from April 2026, because the £60,000 is what counts.",
    scope: "in",
  },
  {
    title: "Property and trading income are added together",
    body: "Rent and self-employment turnover are combined for the threshold test. £35,000 of rent plus £20,000 of consultancy turnover is £55,000 of qualifying income, so both sources come into MTD together.",
    scope: "in",
  },
  {
    title: "You hold property through a limited company",
    body: "Companies are outside MTD for Income Tax. You keep filing a CT600 and company accounts. MTD for Corporation Tax has been deferred with no start date. If you hold some property personally and some through a company, only the personal side is affected.",
    scope: "out",
  },
];

const steps = [
  {
    n: "01",
    title: "Confirm whether you are in scope, and from which year",
    body: "Take your 2024/25 gross rent and add any self-employment turnover. That figure decides whether you are mandated from April 2026, April 2027 or April 2028. Get this wrong in either direction and you either miss deadlines or spend a year filing quarterly for no reason.",
  },
  {
    n: "02",
    title: "Get digital records running from 6 April, not retrospectively",
    body: "The obligation is to record each income and expense item digitally at source, with the amount, date and category. Rebuilding a year of bank statements in March does not meet the rule and makes the first final declaration painful.",
  },
  {
    n: "03",
    title: "Choose software and connect it to HMRC",
    body: "Your software has to be able to keep the records, file quarterly updates through HMRC's API and produce a submission trail. Connecting the software and authorising it takes minutes, but only once the account, the property categories and the bank feed are set up properly.",
  },
  {
    n: "04",
    title: "File the first quarterly update, due 7 August 2026",
    body: "Quarter one covers 6 April to 5 July 2026. The update is a categorised summary of income and expenses to date, not a set of accounts and not a tax calculation.",
  },
  {
    n: "05",
    title: "Keep the cycle running: 7 November, 7 February, 7 May",
    body: "Each later update is cumulative, so it restates the year to date rather than reporting the quarter in isolation. An error in quarter one is corrected simply by filing the corrected cumulative position in quarter two.",
  },
  {
    n: "06",
    title: "File the final declaration for 2026/27, due 31 January 2028",
    body: "This is where the year is actually taxed. Capital allowances, the Section 24 finance cost restriction, other income sources and reliefs are applied here. The 31 January payment date and the payments on account cycle are unchanged.",
  },
];

const softwareCriteria: CoverageItem[] = [
  {
    title: "It must be on HMRC's recognised list",
    body: "HMRC publishes the products recognised for MTD for Income Tax. Anything not on that list cannot file, however good the bookkeeping is. Check the list rather than a vendor's marketing claim.",
    icon: ShieldCheck,
  },
  {
    title: "Property categories, not generic trading categories",
    body: "Some general bookkeeping products treat rent as ordinary sales income. You want a product that maps to HMRC's property categories (rent received, finance costs, repairs and maintenance, insurance, professional and agent fees) so the quarterly submission does not need manual re-coding.",
    icon: Tags,
  },
  {
    title: "Per-property reporting if you hold more than one",
    body: "Portfolio landlords need income and costs split by property for their own decisions, even though the submission is at property-business level. Products that cannot separate properties push that work back onto you.",
    icon: Building2,
  },
  {
    title: "Spreadsheets are still allowed, with bridging software",
    body: "If your records genuinely live in a spreadsheet and the spreadsheet is the digital record, bridging software can file from it. The link between the spreadsheet and the filing has to be digital, so retyping figures into a filing screen breaks the rule.",
    icon: FileSpreadsheet,
  },
  {
    title: "Joint ownership handling",
    body: "Jointly owned property is reported by each owner on their own share. Software that cannot apportion cleanly means two sets of manual adjustments every quarter.",
    icon: Users,
  },
  {
    title: "Cost is not the deciding factor",
    body: "Prices run from free tiers on very small portfolios up to full-featured monthly subscriptions. The expensive mistake is not the subscription, it is a product that forces hours of manual correction before each filing.",
    icon: PoundSterling,
  },
];

const ourService: CoverageItem[] = [
  {
    title: "Scope and threshold review",
    body: "We confirm your qualifying income, the year you are mandated from, how jointly owned property splits, and whether any exemption realistically applies to you.",
    icon: ClipboardCheck,
  },
  {
    title: "Records and software set-up",
    body: "We set the digital record-keeping up so it produces a clean quarterly submission with minimal input from you: bank feeds, property categories, opening position, and the agent authorisation that lets us file on your behalf.",
    icon: Laptop,
  },
  {
    title: "Quarterly filing on your behalf",
    body: "We prepare and submit each quarterly update to deadline and flag anything in the numbers that looks wrong before it is filed, rather than discovering it at year-end.",
    icon: CalendarClock,
  },
  {
    title: "Final declaration and tax planning",
    body: "At year-end we apply capital allowances, the finance cost restriction and any reliefs, file the final declaration, and tell you what your tax position looks like well before the payment date.",
    icon: FileCheck,
  },
];

const faqs: FaqEntry[] = [
  {
    question: "When does Making Tax Digital start for landlords?",
    answer:
      "MTD for Income Tax started on 6 April 2026 for landlords with qualifying income above £50,000. The threshold drops to £30,000 from 6 April 2027 and to £20,000 from 6 April 2028. Your entry date is set by your gross income in the tax year two years before, so the 2026/27 mandate is tested on 2024/25 figures.",
  },
  {
    question: "What counts as qualifying income for MTD?",
    answer:
      "Gross income from property and self-employment added together, before deducting any expenses and before mortgage interest. Rent is counted as the amount due to you, not the amount left after the agent's fee. Employment income, pensions, dividends and bank interest are not qualifying income and do not count towards the threshold.",
  },
  {
    question: "Do I have to file quarterly if my rental profit is small?",
    answer:
      "Yes, if your gross rent clears the threshold. The test ignores profit entirely. A highly geared landlord with £70,000 of rent, a large mortgage and almost no profit is inside MTD from April 2026, while a landlord with £40,000 of rent and no mortgage is not in until April 2027.",
  },
  {
    question: "What are the MTD quarterly deadlines?",
    answer:
      "Under the standard quarters, updates are due by 7 August, 7 November, 7 February and 7 May, each covering the quarter that ended in the previous month. For 2026/27 that means 7 August 2026, 7 November 2026, 7 February 2027 and 7 May 2027. You can elect in your software to align quarters to calendar months, which shifts the periods but not the pattern of the deadlines.",
  },
  {
    question: "What are the penalties for missing an MTD deadline?",
    answer:
      "Late submissions run on points. Each missed quarterly update earns one point, and a £200 penalty is charged when you reach four points on the quarterly cycle, with a further £200 for each later missed submission. Points clear after 24 months of compliant filing. Late payment of tax is a separate regime, and the percentages are set per tax year: for 2026/27 it is 3% of the outstanding tax at 15 days, a further 3% at 30 days, then 10% per annum from day 31, with HMRC interest on top. HMRC gives you 30 days from the payment due date before the first charge applies in your first year inside the new regime, and the two fixed charges step up to 4% each for 2027/28.",
  },
  {
    question: "What records do I have to keep digitally?",
    answer:
      "Each item of income and expense, with the date, the amount and the category, recorded in software or in a spreadsheet that feeds filing software. You do not have to store digital copies of every receipt, but the underlying record has to be digital and the flow from record to submission has to stay digital rather than being retyped.",
  },
  {
    question: "Can I still use a spreadsheet?",
    answer:
      "Yes, provided the spreadsheet is the digital record and it is connected to bridging software that files to HMRC. What is not allowed is keeping a spreadsheet, then manually typing the totals into a filing screen. Many landlords who start with bridging software move to full software once they have run a year, because the quarterly rhythm is easier when the records and the filing sit in one place.",
  },
  {
    question: "How does MTD work for jointly owned property?",
    answer:
      "The threshold is tested on each owner's share, and each owner files their own quarterly updates and final declaration. A property producing £80,000 of gross rent owned equally gives each owner £40,000, which is below the April 2026 threshold but inside the regime from April 2027. Both owners can work from the same set of records, but the filings are separate.",
  },
  {
    question: "Does MTD apply to limited company landlords?",
    answer:
      "No. MTD for Income Tax covers individuals and partnerships. Companies continue to file a CT600 with statutory accounts, and MTD for Corporation Tax has been deferred with no start date. If you hold property both personally and through a company, only the personally held property is drawn into quarterly filing.",
  },
  {
    question: "Can I get an exemption from MTD?",
    answer:
      "Some exemptions exist but they are narrow. Statutory exemptions cover certain trustees and personal representatives. Application-based exemptions cover religious belief, and cases where digital filing is not reasonably practicable because of age, disability, location or another genuine reason. HMRC does not grant these casually, and finding software difficult is not enough.",
  },
  {
    question: "What happens if my income falls below the threshold later?",
    answer:
      "You do not leave the regime the moment income dips. There is a three-year test: qualifying income has to stay below the threshold across three consecutive years before the obligation ends. Planning to drop out after one weak year is a common and expensive misreading.",
  },
  {
    question: "Do I still file a Self Assessment tax return?",
    answer:
      "The annual return is replaced by the final declaration, which does the same job through MTD-compatible software: it pulls all income together, applies adjustments and reliefs, and confirms the tax due. The payment dates do not change. You still pay by 31 January, with payments on account by 31 January and 31 July where they apply.",
  },
  {
    question: "Can my accountant file the quarterly updates for me?",
    answer:
      "Yes. Once you authorise an agent, we can file quarterly updates and the final declaration on your behalf. Most landlords who use an agent send bank data and paperwork once a quarter and never touch a filing screen. You stay responsible for the accuracy of what is submitted, which is why the records set-up matters as much as the filing.",
  },
  {
    question: "How much does MTD compliance cost a landlord?",
    answer:
      "It depends on the size of the portfolio, how many owners are involved, how the records currently look and whether you want quarterly filing handled for you or just the year-end. We quote after a short consultation rather than off a list, because a five-property portfolio with clean bank feeds and a five-property portfolio run from a shoebox are very different pieces of work.",
  },
];

/**
 * Ours, kept (carve-out 5). Their version emits FAQPage only, which would drop
 * an Article block, a Service block and, through the breadcrumb, a
 * BreadcrumbList. This route carries the richest schema of the seven pillar
 * pages on our side (report 03 §3.4).
 */
const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${URL}#article`,
  headline: "Making Tax Digital for Landlords: 2026 Rules and Deadlines",
  description:
    "MTD for Income Tax for UK landlords: the £50,000 threshold from April 2026, £30,000 from April 2027, quarterly updates, digital records, penalties and what to do now.",
  mainEntityOfPage: { "@type": "WebPage", "@id": URL },
  inLanguage: "en-GB",
  author: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  },
  publisher: {
    "@type": "Organization",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: { "@type": "ImageObject", url: `${siteConfig.url}${siteConfig.publisherLogoUrl}` },
    areaServed: { "@type": "Country", name: "United Kingdom" },
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Making Tax Digital compliance for landlords",
  serviceType: "MTD for Income Tax compliance and quarterly filing",
  description:
    "Threshold review, digital record set-up, quarterly update filing and final declaration for UK landlords inside MTD for Income Tax.",
  url: URL,
  areaServed: { "@type": "Country", name: "GB" },
  provider: {
    "@type": "Organization",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
  },
};

export default function MakingTaxDigitalLandlordsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
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
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Making Tax Digital for landlords" }]} />
            <h1 className="mt-4 sm:mt-6 text-2xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-6xl">
              Making Tax Digital for landlords
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-slate-700">
              If your gross rent and self-employment income topped £50,000, quarterly filing started on 6 April 2026.
              At £30,000 you are in from April 2027. Missing the rhythm costs points, then £200, then interest.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              {/* Both CTAs now stay on the page. The primary was /contact, a
                  generic form on another route. */}
              <Link
                href="#book"
                data-cta="hero_book"
                data-cta-placement="hero"
                data-cta-goal="form"
                className={`${btnPrimary} bg-emerald-600 text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-3.5 text-center`}
              >
                Talk to a property accountant
              </Link>
              <Link
                href="#free-tools"
                className={`${btnOnCream} text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-3.5 text-center`}
              >
                Check your start date
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

      {/* Self-identification, before the explanation. A reader arriving from
          search has one specific unanswered question, not a vocabulary. */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <Eyebrow>Sound familiar?</Eyebrow>
              <h2 className="text-2xl font-bold text-slate-900 text-balance sm:text-4xl">
                Nobody sent you a manual for this
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 sm:mt-6 sm:text-lg">
                Making Tax Digital changes how you keep records and how often you file, and most landlords found out
                about it from a letter rather than an explanation. The threshold is measured on gross rent, not
                profit, which is where the surprises start.
              </p>
              <p className="mt-6 text-base font-bold leading-relaxed text-slate-900 text-balance sm:text-lg">
                If one of these is your question, it has a short answer and you should have it.
              </p>
              <Link
                href="#book"
                data-cta="triggers_book"
                data-cta-placement="triggers"
                data-cta-goal="form"
                className={`${btnPrimary} mt-6 w-full sm:mt-8 sm:w-auto`}
              >
                Talk to a property accountant
              </Link>
            </div>
            <PromptMarquee prompts={mtdPrompts} />
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>The regime</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
              What is Making Tax Digital for Income Tax?
            </h2>
            <Prose>
              <p>
                Making Tax Digital for Income Tax replaces the single annual Self Assessment return with four
                quarterly updates plus a year-end final declaration, all filed from software that talks directly to
                HMRC. Your records have to be kept digitally, and the path from those records to the submission has to
                stay digital.
              </p>
            </Prose>

            {/* The figure carries what the second half of the opening paragraph
                used to assert. "One return becomes four updates plus a final
                declaration" is a count and a change of shape, and prose can only
                claim it. */}
            <FilingCadence />

            {/* The reassurance, pulled out of the middle of a seven-line
                paragraph where it was doing nothing. Carve-out 5: the two links
                this paragraph carried on our version, /landlord-tax and the
                Section 24 cluster hub, are both kept here. Their compression
                dropped the Section 24 one. */}
            <div className="mt-8 rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70 sm:p-8">
              <p className="text-base font-bold text-slate-900 sm:text-lg">None of this changes</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {unchangedByMtd.map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 sm:text-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                MTD changes when HMRC sees your numbers and how you submit them, not what you owe. Your rates, your
                allowable expenses and your capital allowances all work exactly as before, the{" "}
                <InlineLink href="/blog/section-24-and-tax-relief">Section 24 finance cost restriction</InlineLink>{" "}
                included, and the rates and reliefs are all covered in our{" "}
                <InlineLink href="/landlord-tax">landlord tax guide</InlineLink>.
              </p>
            </div>

            <Prose>
              <p>
                The practical shift is that bookkeeping stops being an annual January job. A landlord who reconciles
                once a quarter finds year-end quick and dull. A landlord who ignores it until the deadline is now
                doing that panic four times instead of once, with a penalty attached each time.
              </p>
              <p>
                For the full mechanics, our{" "}
                <InlineLink href={`${BLOG}/making-tax-digital-property-income-2026-complete-guide`}>
                  guide to MTD for property income
                </InlineLink>{" "}
                works through the regime end to end.
              </p>
            </Prose>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>Timing</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">When does MTD start for you?</h2>
            <Prose>
              <p>
                Three thresholds, three start dates. The year you are tested on is the tax year two years before the
                year you are mandated for, so the April 2026 mandate is decided by your 2024/25 income.
              </p>
              {/* Above the cards, per their file: a reader who already knows
                  their band skips straight to their own card, and one who does
                  not gets the tool before working through three they may not
                  need. */}
              <p>
                Not sure which band you fall into?{" "}
                <InlineLink href="/calculators/mtd-checker">Check your start date</InlineLink> by entering your rental
                and self-employment income, or read how the{" "}
                <InlineLink href={`${BLOG}/mtd-rental-income-threshold-exemptions`}>
                  threshold and the exemptions
                </InlineLink>{" "}
                are applied in practice.
              </p>
            </Prose>
            {/* Calendar tiles. These are three dates and they were three
                identical text cards, so the date was the one thing the card did
                not show. All three mandates start on 6 April, which is why the
                tile can carry a real day number rather than a decorative one.

                The live card gets a pulsing indicator. That is the one looping
                animation on the site: everything else draws once and stops, but
                a "live now" dot that stops pulsing stops meaning live. It is
                pure CSS behind prefers-reduced-motion, so reduced motion leaves
                a plain solid dot and nothing is lost. */}
            <div className="mt-8 grid gap-5 sm:gap-6 md:grid-cols-3">
              {thresholds.map((t, i) => {
                const live = i === liveIndex;
                return (
                  <div
                    key={t.amount}
                    className={`overflow-hidden rounded-xl bg-white ${
                      live
                        ? "ring-2 ring-emerald-600 shadow-[0_18px_40px_-28px_rgba(5,150,105,0.55)]"
                        : "ring-1 ring-slate-200"
                    }`}
                  >
                    {/* The calendar head. Two punch holes and the month, the way
                        a desk calendar page reads. */}
                    <div
                      className={`relative flex items-center justify-center py-2 ${
                        live ? "bg-emerald-600" : "bg-slate-900"
                      }`}
                    >
                      <span aria-hidden className="absolute left-5 h-1.5 w-1.5 rounded-full bg-white/45" />
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                        {t.month} {t.year}
                      </span>
                      <span aria-hidden className="absolute right-5 h-1.5 w-1.5 rounded-full bg-white/45" />
                    </div>

                    <div className="px-6 pb-6 pt-5 sm:px-7 sm:pb-7">
                      <p className="text-center text-4xl font-bold leading-none text-slate-900 sm:text-5xl">
                        {t.day}
                      </p>
                      {/* Rule Zero (c): slate-500, not their slate-400. 11px on
                          a white card, so the 4.5:1 AA floor applies and
                          slate-400 measures 2.63:1 against it. */}
                      <p className="mt-1 text-center text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                        Mandate begins
                      </p>

                      <div className="mt-5 border-t border-slate-200 pt-5">
                        {live ? (
                          <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-700">
                            <span aria-hidden className="relative flex h-2 w-2">
                              <span className="live-pulse-ring absolute inline-flex h-full w-full rounded-full bg-emerald-600" />
                              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
                            </span>
                            Live now, {t.taxYear}
                          </p>
                        ) : (
                          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">{t.upcoming}</p>
                        )}
                        <h3 className="mt-3 text-base font-bold text-slate-900 sm:text-lg">{t.amount}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-700">{t.body}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <ExampleFigureNote className="mt-4" />
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>Scope</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
              Who has to comply, and what income counts?
            </h2>
            <Prose>
              <p>
                The single most common misreading is treating the threshold as profit. It is not. It is gross income,
                and that catches heavily mortgaged landlords whose actual profit is modest.
              </p>
            </Prose>

            {/* The misreading, shown. Figures are the same £60,000 / £45,000 /
                £15,000 already used in the list below, so there is one example
                in this section. Change them in both places or not at all.

                Numeric only, no ticks or crosses: the badges belong to the
                in/out list underneath. */}
            <figure className="not-prose mt-8 rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70 sm:p-8">
              <figcaption className="text-sm font-bold text-slate-900">
                Which number is tested, on £60,000 of rent
              </figcaption>
              <div className="mt-5 grid gap-3 sm:grid-cols-3 sm:gap-4">
                {grossVsProfit.map((f) => (
                  <div
                    key={f.label}
                    className={`rounded-xl p-4 sm:p-5 ${
                      f.tested ? "bg-white ring-2 ring-emerald-600" : "bg-white/60 ring-1 ring-slate-200"
                    }`}
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{f.label}</p>
                    {/* Rule Zero (c) on the untested pair: slate-400 measures
                        2.51:1 on this near-white card, which fails even the 3:1
                        large-text floor these 24px+ figures sit under. */}
                    <p
                      className={`mt-1 text-2xl font-bold sm:text-3xl ${
                        f.tested ? "text-slate-900" : "text-slate-500"
                      }`}
                    >
                      {f.amount}
                    </p>
                    <p className={`mt-2 text-xs font-semibold ${f.tested ? "text-emerald-700" : "text-slate-500"}`}>
                      {f.verdict}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm leading-relaxed text-slate-700 sm:text-base">
                Profit of £15,000 looks comfortably under the £50,000 threshold. It is not the figure that decides it,
                so this landlord is mandated from April 2026.
              </p>
              {/* The £60,000 landlord is illustrative. The £50,000 threshold and
                  the April 2026 date are not, which is why the note sits on the
                  figure rather than on the threshold cards further up. */}
              <ExampleFigureNote className="mt-4" />
            </figure>

            {/* Four rows, each badged with which way it points. */}
            <ul className="mt-8 divide-y divide-slate-200 rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70 sm:mt-10 sm:p-8">
              {whoComplies.map((item) => {
                const inScope = item.scope === "in";
                const Icon = inScope ? Check : UserX;
                return (
                  <li key={item.title} className="flex gap-4 py-5 first:pt-0 last:pb-0">
                    <span
                      aria-hidden
                      className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                        inScope ? "bg-emerald-50" : "bg-rose-50"
                      }`}
                    >
                      <Icon
                        className={`h-4 w-4 ${inScope ? "text-emerald-600" : "text-rose-600"}`}
                        strokeWidth={2.5}
                      />
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="text-base font-bold text-slate-900 sm:text-lg">{item.title}</h3>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${
                            inScope ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"
                          }`}
                        >
                          {inScope ? "In scope" : "Out of scope"}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">{item.body}</p>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Carve-out 5. Both links their re-layout deleted with the closing
                paragraph of this section. */}
            <Prose>
              <p>
                Two areas trip landlords up more than any other. Gross versus net is unpicked in our guide to{" "}
                <InlineLink href={`${BLOG}/what-is-qualifying-income-for-mtd`}>
                  what counts as qualifying income
                </InlineLink>
                , and shared ownership is worked through in our note on{" "}
                <InlineLink href={`${BLOG}/mtd-itsa-jointly-owned-property-threshold-split`}>
                  how the threshold splits on jointly owned property
                </InlineLink>
                .
              </p>
            </Prose>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>The work</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl mb-2">
              What do you actually have to do this year?
            </h2>
            <p className="text-sm sm:text-base text-slate-700">
              In the order they bite for a landlord mandated from April 2026.
            </p>
            <ProcessTimeline steps={steps} />
            <Prose>
              <p>
                The full calendar, including the calendar-quarter election, sits in our{" "}
                <InlineLink href={`${BLOG}/mtd-quarterly-deadlines-2026-2027-landlords`}>
                  MTD quarterly deadlines guide
                </InlineLink>
                , and the sign-up mechanics are covered step by step in{" "}
                <InlineLink href={`${BLOG}/how-to-register-mtd-landlord-step-by-step-guide`}>
                  how to register for MTD as a landlord
                </InlineLink>
                .
              </p>
            </Prose>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>Record keeping</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">What counts as a digital record?</h2>
            <Prose>
              <p>
                A digital record is each individual item of income and expenditure captured in software or in a
                spreadsheet, with its date, its amount and its category. The categories follow HMRC&apos;s property
                schema, so rent received, finance costs, repairs and maintenance, insurance, professional fees and
                agent fees each sit in their own line.
              </p>
            </Prose>

            {/* The specimen, rather than a description of one. This section
                defined a digital record in prose and never showed one, and it is
                the only section on the page where the thing being described is
                small enough to simply print.

                Illustrative figures for one month on one property. They are not
                referenced anywhere else on the page. */}
            <figure className="not-prose mt-8 overflow-hidden rounded-xl bg-white ring-1 ring-slate-200 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.4)]">
              <figcaption className="border-b border-slate-200 px-5 py-4 sm:px-6">
                <p className="text-sm font-bold text-slate-900">A digital record looks like this</p>
                <p className="mt-0.5 text-xs text-slate-500">One month, one property. Every item on its own line.</p>
              </figcaption>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th
                        scope="col"
                        className="whitespace-nowrap px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-slate-500 sm:px-6"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-slate-500 sm:px-6"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-5 py-2.5 text-right text-xs font-bold uppercase tracking-wide text-slate-500 sm:px-6"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-slate-500 sm:px-6"
                      >
                        Category
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {specimenRecord.map((r) => (
                      <tr key={r.desc} className="border-b border-slate-100 last:border-0">
                        <td className="whitespace-nowrap px-5 py-3 text-slate-600 sm:px-6">{r.date}</td>
                        <td className="px-5 py-3 text-slate-800 sm:px-6">{r.desc}</td>
                        <td
                          className={`whitespace-nowrap px-5 py-3 text-right font-semibold sm:px-6 ${
                            r.income ? "text-emerald-700" : "text-slate-900"
                          }`}
                        >
                          {r.amount}
                        </td>
                        <td className="whitespace-nowrap px-5 py-3 sm:px-6">
                          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
                            {r.category}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="border-t border-slate-100 px-5 py-3 sm:px-6">
                <ExampleFigureNote />
              </div>
            </figure>

            {/* The three things readers most often believe are records and are
                not, including the broken digital link. Against the specimen
                above these read as "not that". */}
            <div className="mt-6 rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70 sm:p-8">
              <p className="text-base font-bold text-slate-900 sm:text-lg">What does not count</p>
              <ul className="mt-4 space-y-3">
                {notARecord.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-700 sm:text-base">
                    <X aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" strokeWidth={2.5} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <Prose>
              <p>
                You are not required to keep a digital image of every receipt, though scanning as you go is the
                easiest way to survive an enquiry. Bank feeds do most of the work here: a feed that pulls transactions
                in automatically, with rules that code recurring items, turns quarterly filing into a short review
                rather than a data-entry session. Our guide to{" "}
                <InlineLink href={`${BLOG}/mtd-itsa-digital-records-receipts-bank-feeds-what-counts-evidence`}>
                  receipts, bank feeds and what counts as evidence
                </InlineLink>{" "}
                sets out where the line falls.
              </p>
            </Prose>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>Software</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">How do you choose MTD software?</h2>
            <Prose>
              <p>
                We do not recommend one product for every landlord, because the right choice depends on how many
                properties you hold, whether ownership is shared and how your records look today. These are the
                criteria that matter.
              </p>
            </Prose>
            {/* Two columns, not three. The bodies run 40 to 55 words, which
                become ribbons at three across. No glow, deliberately, because
                the service section further down has it and a page that glows
                twice is not punctuating anything. */}
            <CoverageCards items={softwareCriteria} tone="white" columns={2} />

            <Prose>
              <p>
                If your bookkeeping already lives in Excel, the{" "}
                <InlineLink href={`${BLOG}/mtd-itsa-spreadsheets-with-bridging-software-allowed-mechanics`}>
                  bridging software route
                </InlineLink>{" "}
                explains exactly what has to stay digital for the spreadsheet to remain compliant.
              </p>
            </Prose>

            {/* Second ask on the page, and it goes here because this section
                deliberately ends without answering its own question: the copy
                above says we do not recommend one product for every landlord,
                which leaves "so which one for me" hanging. White card on this
                section's slate-50 ground, inverting the slate card the penalties
                ask uses further down. */}
            <div className="mt-8 rounded-xl bg-white p-6 ring-1 ring-slate-200 sm:mt-10 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-8">
              <div className="min-w-0">
                <p className="text-base font-bold text-slate-900 sm:text-lg">
                  Want to be told which one, and have it set up?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
                  We pick the product against your portfolio, set the categories and bank feeds up so the quarters
                  come out clean, and file for you once you authorise us as agent.
                </p>
              </div>
              <Link
                href="#book"
                data-cta="software_book"
                data-cta-placement="software"
                data-cta-goal="form"
                className={`${btnPrimary} mt-5 w-full sm:mt-0 sm:w-auto sm:shrink-0`}
              >
                Get a setup recommendation
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>Penalties</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">What happens if you miss a deadline?</h2>
            <Prose>
              <p>
                Two separate regimes run alongside each other, and they stack. One counts missed submissions, the
                other charges for tax paid late, and being caught by one says nothing about the other.
              </p>
            </Prose>

            {/* The two regimes, side by side, because the section's own first
                sentence is that they are separate and they stack. Read as prose
                they blur into one escalating thing; paired, the reader can see
                that one is a flat fee on a counter and the other is a percentage
                that keeps growing.

                Not the shared PenaltyLadder: their own file says so in as many
                words, because that is a full-width four-step rail and it is
                spent on /landlord-tax. These are half-width and the left-hand
                one is a counter, not a sequence. */}
            <div className="mt-8 grid gap-5 sm:gap-6 md:grid-cols-2">
              <div className="rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Late submission</p>
                <h3 className="mt-2 text-base font-bold text-slate-900 sm:text-lg">A points counter, then £200</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                  Each missed quarterly update earns one point.
                </p>
                <div aria-hidden className="mt-5 flex items-center gap-2">
                  {[1, 2, 3, 4].map((n) => (
                    <div key={n} className="flex flex-1 items-center gap-2">
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                          n === 4 ? "bg-rose-600 text-white" : "bg-white text-slate-500 ring-1 ring-slate-300"
                        }`}
                      >
                        {n}
                      </span>
                      {n < 4 && <span className="h-px flex-1 bg-slate-300" />}
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">£200</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-700">
                  Charged when you reach the fourth point, and again for every later missed submission while you sit
                  at the threshold. It does not scale with your tax bill. Points clear after 24 months of compliant
                  filing, measured from the most recent miss.
                </p>
                <ExampleFigureNote className="mt-3" />
              </div>

              <div className="rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Late payment, 2026/27</p>
                <h3 className="mt-2 text-base font-bold text-slate-900 sm:text-lg">A percentage that keeps going</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                  Charged on the tax itself, so it scales with what you owe.
                </p>
                <ul className="mt-5 space-y-3">
                  {latePayment.map((row) => (
                    <li key={row.when}>
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          {row.when}
                        </span>
                        <span className="text-sm font-bold text-slate-900">{row.charge}</span>
                      </div>
                      <div aria-hidden className="mt-1.5 h-2 rounded-full bg-white ring-1 ring-slate-200">
                        <div className="h-full rounded-full bg-orange-600" style={{ width: row.width }} />
                      </div>
                    </li>
                  ))}
                </ul>
                {/* House positions §19.7, 08-21 additions (a) and (b). The
                    percentages are set per tax year and the first two step to 4%
                    for 2027/28, so the schedule is never written open-ended, and
                    the first-year concession is stated because this page is
                    written for the April 2026 cohort. Both our version and the
                    designer's were unbounded and silent on the concession. */}
                <p className="mt-4 text-sm leading-relaxed text-slate-700">
                  In your first year inside the new regime, HMRC allows 30 days from the payment due date before the
                  first charge applies. The two fixed charges rise to 4% each for 2027/28. HMRC interest runs
                  separately, from the original due date, on top of all of it. On £10,000 of tax paid 180 days late at
                  the 2026/27 rates that is roughly{" "}
                  <strong className="font-bold text-slate-900">£1,011</strong> of penalty before interest.
                </p>
                <ExampleFigureNote className="mt-3" />
              </div>
            </div>

            <Prose>
              <p>
                The point worth internalising is that the £200 does not scale with your tax bill, but the late-payment
                percentages do. A small landlord who forgets a quarter faces a modest, fixable cost. A landlord with a
                real balancing payment who drifts past 31 January is in a different conversation entirely. The worked
                figures are in our page on{" "}
                <InlineLink href={`${BLOG}/mtd-itsa-late-submission-points-late-payment-15-30-31-worked`}>
                  MTD points and late-payment penalties
                </InlineLink>
                .
              </p>
            </Prose>

            {/* First ask on the page, placed here rather than earlier because
                this is where the cost stops being abstract. A link to #book
                rather than an inline capture, by explicit instruction: one form
                per page, and that form is the navy panel at the foot. */}
            <div className="mt-10 rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-8">
              <p className="text-base font-bold text-slate-900 sm:text-lg">
                Want the quarterly filing to just happen?
              </p>
              <Link
                href="#book"
                data-cta="penalties_book"
                data-cta-placement="penalties"
                data-cta-goal="form"
                className={`${btnPrimary} mt-4 w-full sm:mt-0 sm:w-auto sm:shrink-0`}
              >
                Talk to a property accountant
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>Our service</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">How we handle MTD for you</h2>
            <Prose>
              <p>
                Most landlords who come to us want the quarterly cycle to stop being their problem. Once you
                authorise us as your agent, we file for you and you send us data once a quarter.
              </p>
            </Prose>
            {/* Icon cards with the one-time staggered glow. This is the right
                section on the page to spend it: the only one describing what WE
                do rather than what the regime does. It is also the only glowing
                block on the page. */}
            <CoverageCards items={ourService} tone="white" columns={2} glow />
            <Prose>
              <p>
                What this costs turns on portfolio size, ownership structure and the state of your records, which is
                why the figure comes out of a conversation rather than a price list.
              </p>
            </Prose>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>Why a specialist</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
              What a property specialist catches that a general filer does not
            </h2>
            <Prose>
              <p>
                Any competent accountant can file a quarterly update. The value is in what surrounds it, and the five
                situations below are the ones that turn up on property returns and almost nowhere else.
              </p>
            </Prose>

            {/* Deliberately NOT a tick-and-cross table. The page already spends
                that device twice (scope, and what does not count as a record),
                and the honest claim here is about specialism, not competence:
                the left column is what a generalist reasonably does, not a
                failure. The copy above says as much and the table must not
                contradict it.

                Not a <table> either. The wide tables on this site rely on
                overflow-x-auto, which gives a mobile reader no signal there is
                more to the right. This stacks into labelled pairs below md, so
                nothing is hidden at 390. */}
            <div className="mt-8 overflow-hidden rounded-xl ring-1 ring-slate-200">
              <div className="hidden bg-slate-50 md:grid md:grid-cols-[1.1fr_1fr_1fr]">
                <p className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-500">The situation</p>
                <p className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-500">A general filer</p>
                <p className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-emerald-700">
                  A property specialist
                </p>
              </div>
              <div className="divide-y divide-slate-200">
                {specialistComparison.map((row) => (
                  <div
                    key={row.situation}
                    className="grid gap-4 bg-white px-6 py-5 md:grid-cols-[1.1fr_1fr_1fr] md:gap-6"
                  >
                    <p className="text-sm font-bold text-slate-900 sm:text-base">{row.situation}</p>
                    <div>
                      {/* Rule Zero (c): slate-500, not their slate-400. 11px on
                          white. */}
                      <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-slate-500 md:hidden">
                        A general filer
                      </p>
                      <p className="text-sm leading-relaxed text-slate-500">{row.general}</p>
                    </div>
                    <div className="border-l-2 border-emerald-600 pl-4 md:border-l-0 md:pl-0">
                      <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-emerald-700 md:hidden">
                        A property specialist
                      </p>
                      <p className="text-sm leading-relaxed text-slate-700">{row.specialist}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Prose>
              <p>
                They also compound. A landlord wrongly told they were outside the regime spends a year without digital
                records, then has to rebuild them. A landlord whose software codes rent as trading turnover files
                twelve months of miscategorised updates before anyone notices. Both are avoidable at set-up and
                expensive afterwards.
              </p>
              <p>
                Quarterly visibility is also the one genuine upside of MTD. If someone is looking at your numbers four
                times a year, a bad yield, a creeping cost base or an approaching tax bill surfaces while you can
                still do something about it.
              </p>
              {/* Carve-out 5: the cluster hub link our version carried under the
                  FAQs. `FaqSection` has no tail slot, so it sits at the foot of
                  the last content section instead, the same placement 6.2 used
                  for the Section 24 hub. */}
              <p>
                More detail on every part of the regime is in our{" "}
                <InlineLink href={BLOG}>Making Tax Digital articles for landlords</InlineLink>, including exemptions,
                letting agent arrangements, foreign property and what to do if an HMRC letter lands.
              </p>
            </Prose>
          </div>
        </div>
      </section>

      {/* Proof, then the tools, then the ask, then the FAQ. The testimonials sit
          ABOVE the free tools rather than beside `#book` because both are
          full-bleed navy: adjacent they read as one dark slab, and the light
          tools block between them is what keeps the band alternating. */}
      <TestimonialsSection
        eyebrow="Testimonials"
        title="Landlords already filing quarterly"
        description="Anonymised feedback from landlords and investors we have worked with on exactly these questions."
      />

      {/* Free tools, the hero's secondary CTA target. Carve-out 5: our version
          carried two in-body links to /calculators/mtd-checker and the tool
          takes ZERO in-body links from all 760 blog posts
          (STRUCTURE_VS_COMPETITORS_2026-08-17.md:142), so these two are its
          entire support. `CalculatorTabs` renders `<button role="tab">` and no
          `<a href>`, so the second link is written here rather than left to the
          block. */}
      <section id="free-tools" className="scroll-mt-24 bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div>
            <Eyebrow>Free tools</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">Put numbers on your own position</h2>
            <p className="mt-4 text-sm sm:text-base text-slate-700">
              Free, and the figures are yours to take to any adviser. If you only open one, open the{" "}
              <InlineLink href="/calculators/mtd-checker">MTD checker</InlineLink>: it turns your gross rent and
              self-employment income into the year you are mandated from.
            </p>
            <div className="mt-8 sm:mt-10">
              <CalculatorTabs />
            </div>
          </div>
        </div>
      </section>

      {/* The closing ask, and the target every `#book` link on this page points
          at. Was a contained CTASection sending readers to /contact. */}
      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          title="Get your MTD position sorted before the next deadline"
          description="Tell us what you own and what your records look like now. We will confirm which year you are mandated from, get the setup right, and file the quarterly updates for you."
          proofPoints={[
            { title: "Property tax only", detail: "Section 24, CGT and MTD every day" },
            { title: "Fixed fees, quoted upfront", detail: "In writing, before any work starts" },
            { title: "24-hour response", detail: "Usually the same working day" },
          ]}
          footnote="No obligation and no hard sell. If your position is already right, we will say so."
        />
      </div>

      <FaqSection title="Making Tax Digital questions" faqs={faqs} className="bg-white py-12 sm:py-16 lg:py-20" />
    </>
  );
}
