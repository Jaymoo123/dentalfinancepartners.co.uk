import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CTASection } from "@/components/ui/CTASection";
import { btnPrimary, btnSecondary, siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";

const PATH = "/making-tax-digital-landlords";
const URL = `${siteConfig.url}${PATH}`;
const BLOG = "/blog/making-tax-digital-mtd";

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

const phaseIn = [
  {
    from: "6 April 2026",
    threshold: "Qualifying income above £50,000",
    body: "Live now. If your gross income from property and self-employment combined was above £50,000 in the 2024/25 tax year, you are in scope for 2026/27 and your first quarterly update covers 6 April to 5 July 2026.",
  },
  {
    from: "6 April 2027",
    threshold: "Qualifying income above £30,000",
    body: "The second wave. This catches a large slice of two-property and three-property landlords, and most jointly owned portfolios where each owner's share sat under £50,000 but above £30,000.",
  },
  {
    from: "6 April 2028",
    threshold: "Qualifying income above £20,000",
    body: "The final announced step. At £20,000 of gross rent, a single average-yield rental property can be enough to bring you inside the regime.",
  },
];

const inScope = [
  {
    title: "You let property in your own name",
    body: "Individual landlords, sole traders and partners in a property partnership are the target of MTD for Income Tax. If you file a Self Assessment return with a property page and your qualifying income clears the threshold, you are in.",
  },
  {
    title: "Your income is gross, not profit",
    body: "The test is gross income before expenses and before any mortgage interest. A landlord with £60,000 of rent and £45,000 of costs has £15,000 of profit and is still in scope from April 2026, because the £60,000 is what counts.",
  },
  {
    title: "Property and trading income are added together",
    body: "Rent and self-employment turnover are combined for the threshold test. £35,000 of rent plus £20,000 of consultancy turnover is £55,000 of qualifying income, so both sources come into MTD together.",
  },
  {
    title: "You hold property through a limited company",
    body: "Companies are outside MTD for Income Tax. You keep filing a CT600 and company accounts. MTD for Corporation Tax has been deferred with no start date. If you hold some property personally and some through a company, only the personal side is affected.",
  },
];

const monthByMonth = [
  {
    when: "Now",
    title: "Confirm whether you are in scope, and from which year",
    body: "Take your 2024/25 gross rent and add any self-employment turnover. That figure decides whether you are mandated from April 2026, April 2027 or April 2028. Get this wrong in either direction and you either miss deadlines or spend a year filing quarterly for no reason.",
  },
  {
    when: "Before your first quarter ends",
    title: "Get digital records running from 6 April, not retrospectively",
    body: "The obligation is to record each income and expense item digitally at source, with the amount, date and category. Rebuilding a year of bank statements in March does not meet the rule and makes the first final declaration painful.",
  },
  {
    when: "Same window",
    title: "Choose software and connect it to HMRC",
    body: "Your software has to be able to keep the records, file quarterly updates through HMRC's API and produce a submission trail. Connecting the software and authorising it takes minutes, but only once the account, the property categories and the bank feed are set up properly.",
  },
  {
    when: "By 7 August 2026",
    title: "File the first quarterly update",
    body: "Quarter one covers 6 April to 5 July 2026. The update is a categorised summary of income and expenses to date, not a set of accounts and not a tax calculation.",
  },
  {
    when: "7 November, 7 February, 7 May",
    title: "Keep the cycle running",
    body: "Each later update is cumulative, so it restates the year to date rather than reporting the quarter in isolation. An error in quarter one is corrected simply by filing the corrected cumulative position in quarter two.",
  },
  {
    when: "By 31 January 2028",
    title: "File the final declaration for 2026/27",
    body: "This is where the year is actually taxed. Capital allowances, the Section 24 finance cost restriction, other income sources and reliefs are applied here. The 31 January payment date and the payments on account cycle are unchanged.",
  },
];

const softwareCriteria = [
  {
    title: "It must be on HMRC's recognised list",
    body: "HMRC publishes the products recognised for MTD for Income Tax. Anything not on that list cannot file, however good the bookkeeping is. Check the list rather than a vendor's marketing claim.",
  },
  {
    title: "Property categories, not generic trading categories",
    body: "Some general bookkeeping products treat rent as ordinary sales income. You want a product that maps to HMRC's property categories (rent received, finance costs, repairs and maintenance, insurance, professional and agent fees) so the quarterly submission does not need manual re-coding.",
  },
  {
    title: "Per-property reporting if you hold more than one",
    body: "Portfolio landlords need income and costs split by property for their own decisions, even though the submission is at property-business level. Products that cannot separate properties push that work back onto you.",
  },
  {
    title: "Spreadsheets are still allowed, with bridging software",
    body: "If your records genuinely live in a spreadsheet and the spreadsheet is the digital record, bridging software can file from it. The link between the spreadsheet and the filing has to be digital, so retyping figures into a filing screen breaks the rule.",
  },
  {
    title: "Joint ownership handling",
    body: "Jointly owned property is reported by each owner on their own share. Software that cannot apportion cleanly means two sets of manual adjustments every quarter.",
  },
  {
    title: "Cost is not the deciding factor",
    body: "Prices run from free tiers on very small portfolios up to full-featured monthly subscriptions. The expensive mistake is not the subscription, it is a product that forces hours of manual correction before each filing.",
  },
];

const serviceSteps = [
  {
    n: "01",
    title: "Scope and threshold review",
    body: "We confirm your qualifying income, the year you are mandated from, how jointly owned property splits, and whether any exemption realistically applies to you.",
  },
  {
    n: "02",
    title: "Records and software set-up",
    body: "We set the digital record-keeping up so it produces a clean quarterly submission with minimal input from you: bank feeds, property categories, opening position, and the agent authorisation that lets us file on your behalf.",
  },
  {
    n: "03",
    title: "Quarterly filing on your behalf",
    body: "We prepare and submit each quarterly update to deadline and flag anything in the numbers that looks wrong before it is filed, rather than discovering it at year-end.",
  },
  {
    n: "04",
    title: "Final declaration and tax planning",
    body: "At year-end we apply capital allowances, the finance cost restriction and any reliefs, file the final declaration, and tell you what your tax position looks like well before the payment date.",
  },
];

const faqs = [
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
      "Late submissions run on points. Each missed quarterly update earns one point, and a £200 penalty is charged when you reach four points on the quarterly cycle, with a further £200 for each later missed submission. Points clear after 24 months of compliant filing. Late payment of tax is a separate regime: 3% of the outstanding tax at 15 days, a further 3% at 30 days, then 10% per annum from day 31, with HMRC interest on top.",
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

const jsonLd = JSON.stringify([
  {
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
  },
  {
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
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  },
]);

export default function MakingTaxDigitalLandlordsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      <section className="relative h-[320px] sm:h-[380px] lg:h-[400px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=2000&q=85"
          alt="UK residential property"
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-slate-900/85" />
        <div className={`${siteContainerLg} relative z-10 h-full flex items-center`}>
          <div className="max-w-3xl">
            <Breadcrumb
              onDark
              items={[
                { label: "Home", href: "/" },
                { label: "Making Tax Digital for landlords" },
              ]}
            />
            <h1 className="mt-4 sm:mt-6 text-2xl font-bold leading-tight text-white sm:text-4xl lg:text-6xl">
              Making Tax Digital for landlords
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl leading-relaxed text-white">
              If your gross rent and self-employment income topped £50,000, quarterly filing started on 6 April 2026.
              At £30,000 you are in from April 2027. Missing the rhythm costs points, then £200, then interest.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Link
                href="/contact"
                className={`${btnPrimary} bg-emerald-600 text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-3.5 text-center`}
              >
                Talk to a property accountant
              </Link>
              <Link
                href="/calculators/mtd-checker"
                className={`${btnSecondary} bg-white/10 border-white text-white hover:bg-white/20 text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-3.5 text-center`}
              >
                Check your start date
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
              What is Making Tax Digital for Income Tax?
            </h2>
            <div className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-slate-700">
              <p>
                Making Tax Digital for Income Tax replaces the single annual Self Assessment return with four quarterly
                updates plus a year-end final declaration, all filed from software that talks directly to HMRC. Your
                records have to be kept digitally, and the path from those records to the submission has to stay
                digital.
              </p>
              <p>
                What it does not do is change the tax. Your rates, your allowable expenses, the{" "}
                <Link href="/blog/section-24-and-tax-relief" className="text-emerald-700 font-semibold underline">
                  Section 24 finance cost restriction
                </Link>{" "}
                and your capital allowances all work exactly as before, all covered in our{" "}
                <Link href="/landlord-tax" className="text-emerald-700 font-semibold underline">
                  landlord tax guide
                </Link>
                . MTD changes when HMRC sees your numbers and how you submit them. The quarterly updates are
                categorised summaries of income and expenses, not tax calculations, so nothing becomes payable four
                times a year. Payment dates are untouched.
              </p>
              <p>
                The practical shift is that bookkeeping stops being an annual January job. A landlord who reconciles
                once a quarter finds year-end quick and dull. A landlord who ignores it until the deadline is now doing
                that panic four times instead of once, with a penalty attached each time.
              </p>
              <p>
                For the full mechanics, our{" "}
                <Link
                  href={`${BLOG}/making-tax-digital-property-income-2026-complete-guide`}
                  className="text-emerald-700 font-semibold underline"
                >
                  guide to MTD for property income
                </Link>{" "}
                works through the regime end to end.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">When does MTD start for you?</h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-700">
              Three thresholds, three start dates. The year you are tested on is the tax year two years before the year
              you are mandated for, so the April 2026 mandate is decided by your 2024/25 income.
            </p>
            <div className="mt-8 sm:mt-10 space-y-5 sm:space-y-6">
              {phaseIn.map((item) => (
                <div key={item.from} className="border-l-4 border-emerald-600 bg-white p-6 sm:p-8">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">{item.from}</div>
                  <h3 className="mt-2 text-lg sm:text-xl font-bold text-slate-900">{item.threshold}</h3>
                  <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed text-slate-700">{item.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm sm:text-base leading-relaxed text-slate-700">
              Not sure which band you fall into?{" "}
              <Link href="/calculators/mtd-checker" className="text-emerald-700 font-semibold underline">
                Check your start date
              </Link>{" "}
              by entering your rental and self-employment income, or read how the{" "}
              <Link href={`${BLOG}/mtd-rental-income-threshold-exemptions`} className="text-emerald-700 font-semibold underline">
                threshold and the exemptions
              </Link>{" "}
              are applied in practice.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
              Who has to comply, and what income counts?
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-700">
              The single most common misreading is treating the threshold as profit. It is not. It is gross income, and
              that catches heavily mortgaged landlords whose actual profit is modest.
            </p>
            <div className="mt-8 sm:mt-10 space-y-5 sm:space-y-6">
              {inScope.map((item) => (
                <div key={item.title} className="border-l-4 border-emerald-600 bg-slate-50 p-6 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed text-slate-700">{item.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm sm:text-base leading-relaxed text-slate-700">
              Two areas trip landlords up more than any other. Gross versus net is unpicked in our guide to{" "}
              <Link href={`${BLOG}/what-is-qualifying-income-for-mtd`} className="text-emerald-700 font-semibold underline">
                what counts as qualifying income
              </Link>
              , and shared ownership is worked through in our note on{" "}
              <Link
                href={`${BLOG}/mtd-itsa-jointly-owned-property-threshold-split`}
                className="text-emerald-700 font-semibold underline"
              >
                how the threshold splits on jointly owned property
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
              What do you actually have to do this year?
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-700">
              In the order they bite for a landlord mandated from April 2026.
            </p>
            <div className="mt-8 sm:mt-10 space-y-5 sm:space-y-6">
              {monthByMonth.map((step) => (
                <div key={step.title} className="border-l-4 border-slate-900 bg-white p-6 sm:p-8">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">{step.when}</div>
                  <h3 className="mt-2 text-lg sm:text-xl font-bold text-slate-900">{step.title}</h3>
                  <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed text-slate-700">{step.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm sm:text-base leading-relaxed text-slate-700">
              The full calendar, including the calendar-quarter election, sits in our{" "}
              <Link
                href={`${BLOG}/mtd-quarterly-deadlines-2026-2027-landlords`}
                className="text-emerald-700 font-semibold underline"
              >
                MTD quarterly deadlines guide
              </Link>
              , and the sign-up mechanics are covered step by step in{" "}
              <Link
                href={`${BLOG}/how-to-register-mtd-landlord-step-by-step-guide`}
                className="text-emerald-700 font-semibold underline"
              >
                how to register for MTD as a landlord
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
              What counts as a digital record?
            </h2>
            <div className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-slate-700">
              <p>
                A digital record is each individual item of income and expenditure captured in software or in a
                spreadsheet, with its date, its amount and its category. Not a monthly total. Not a bank statement PDF
                filed in a folder. The categories follow HMRC&apos;s property schema, so rent received, finance costs,
                repairs and maintenance, insurance, professional fees and agent fees each sit in their own line.
              </p>
              <p>
                You are not required to keep a digital image of every receipt, though scanning as you go is the easiest
                way to survive an enquiry. What you cannot do is break the digital link. If figures are retyped between
                the record and the submission, the chain is broken even if the final numbers are right.
              </p>
              <p>
                Bank feeds do most of the work here. A feed that pulls transactions in automatically, with rules that
                code recurring items, turns quarterly filing into a short review rather than a data-entry session. Our
                guide to{" "}
                <Link
                  href={`${BLOG}/mtd-itsa-digital-records-receipts-bank-feeds-what-counts-evidence`}
                  className="text-emerald-700 font-semibold underline"
                >
                  receipts, bank feeds and what counts as evidence
                </Link>{" "}
                sets out where the line falls.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
              How do you choose MTD software?
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-700">
              We do not recommend one product for every landlord, because the right choice depends on how many
              properties you hold, whether ownership is shared and how your records look today. These are the criteria
              that matter.
            </p>
            <div className="mt-8 sm:mt-10 space-y-5 sm:space-y-6">
              {softwareCriteria.map((item) => (
                <div key={item.title} className="border-l-4 border-emerald-600 bg-white p-6 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed text-slate-700">{item.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm sm:text-base leading-relaxed text-slate-700">
              If your bookkeeping already lives in Excel, the{" "}
              <Link
                href={`${BLOG}/mtd-itsa-spreadsheets-with-bridging-software-allowed-mechanics`}
                className="text-emerald-700 font-semibold underline"
              >
                bridging software route
              </Link>{" "}
              explains exactly what has to stay digital for the spreadsheet to remain compliant.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
              What happens if you miss a deadline?
            </h2>
            <div className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-slate-700">
              <p>
                Two separate regimes run alongside each other, and they stack. Late submissions attract points. Each
                missed quarterly update earns one point, and at <strong>four points</strong> a <strong>£200</strong>{" "}
                penalty is charged, with a further £200 for every later missed submission while you sit at the
                threshold. Points clear after 24 months of compliant filing, measured from the most recent miss.
              </p>
              <p>
                Late payment is charged differently. <strong>3%</strong> of the unpaid tax at 15 days, a further{" "}
                <strong>3%</strong> at 30 days, then <strong>10% per annum</strong> accruing from day 31, with HMRC
                interest running separately from the original due date on top. On £10,000 of tax paid 180 days late,
                that is roughly £1,011 of penalty before interest.
              </p>
              <p>
                The point worth internalising is that the £200 does not scale with your tax bill, but the late-payment
                percentages do. A small landlord who forgets a quarter faces a modest, fixable cost. A landlord with a
                real balancing payment who drifts past 31 January is in a different conversation entirely. The worked
                figures are in our page on{" "}
                <Link
                  href={`${BLOG}/mtd-itsa-late-submission-points-late-payment-15-30-31-worked`}
                  className="text-emerald-700 font-semibold underline"
                >
                  MTD points and late-payment penalties
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
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
              How we handle MTD for you
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-700">
              Most landlords who come to us want the quarterly cycle to stop being their problem. Once you authorise us
              as your agent, we file for you and you send us data once a quarter.
            </p>
            <div className="mt-8 sm:mt-10 space-y-6 sm:space-y-8">
              {serviceSteps.map((step) => (
                <div key={step.n} className="flex gap-4 sm:gap-6 bg-white border-l-4 border-emerald-600 p-6 sm:p-8">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 sm:h-16 sm:w-16 bg-slate-900 flex items-center justify-center text-xl sm:text-2xl font-bold text-white font-mono">
                      {step.n}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-xl font-bold text-slate-900">{step.title}</h3>
                    <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed text-slate-700">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm sm:text-base leading-relaxed text-slate-700">
              What this costs turns on portfolio size, ownership structure and the state of your records, which is why
              the figure comes out of a conversation rather than a price list.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
              What a property specialist catches that a general filer does not
            </h2>
            <div className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-slate-700">
              <p>
                Any competent accountant can file a quarterly update. The value is in what surrounds it. The threshold
                test on a mixed portfolio, the split on jointly owned property, the treatment of a property that stops
                being let mid-year, foreign rental income landing in the same cycle, and the year-end interaction
                between the finance cost restriction and capital allowances are all property-specific problems.
              </p>
              <p>
                They also compound. A landlord wrongly told they were outside the regime spends a year without digital
                records, then has to rebuild them. A landlord whose software codes rent as trading turnover files
                twelve months of miscategorised updates before anyone notices. Both are avoidable at set-up and
                expensive afterwards.
              </p>
              <p>
                Quarterly visibility is also the one genuine upside of MTD. If someone is looking at your numbers four
                times a year, a bad yield, a creeping cost base or an approaching tax bill surfaces while you can still
                do something about it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">Making Tax Digital questions</h2>
            <div className="mt-8 sm:mt-10 space-y-5 sm:space-y-6">
              {faqs.map((faq) => (
                <div key={faq.question} className="bg-white border-l-4 border-emerald-600 p-6 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">{faq.question}</h3>
                  <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed text-slate-700">{faq.answer}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm sm:text-base leading-relaxed text-slate-700">
              More detail on every part of the regime is in our{" "}
              <Link href={BLOG} className="text-emerald-700 font-semibold underline">
                Making Tax Digital articles for landlords
              </Link>
              , including exemptions, letting agent arrangements, foreign property and what to do if an HMRC letter
              lands.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        title="Get your MTD position sorted before the next deadline"
        description="Book a consultation. We will confirm which year you are mandated from, get your records set up properly, and file the quarterly updates for you."
        primaryLabel="Book a consultation"
        secondaryHref="/calculators/mtd-checker"
        secondaryLabel="Check your start date"
      />
    </>
  );
}
