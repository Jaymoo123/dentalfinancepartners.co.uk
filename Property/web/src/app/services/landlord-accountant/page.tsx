import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  CalendarClock,
  FileSpreadsheet,
  Landmark,
  Network,
  Percent,
  PoundSterling,
  Scale,
  Wrench,
} from "lucide-react";
import { HeroBrickBackdrop } from "@/components/layout/HeroBrickBackdrop";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { StatsCounter } from "@/components/property/StatsCounter";
import { TestimonialsSection } from "@/components/property/TestimonialsSection";
import { siteStats } from "@/lib/site-stats";
import { LeadCTAPanel } from "@/components/property/LeadCTAPanel";
import { Section24Wedge } from "@/components/property/Section24Wedge";
import { PortfolioPooling } from "@/components/property/PortfolioPooling";
import { AgencyBooks } from "@/components/property/AgencyBooks";
import { ComparisonTable, type ComparisonRow } from "@/components/property/ComparisonTable";
import { ProcessTimeline } from "@/components/property/ProcessTimeline";
import { LocationMap } from "@/components/property/LocationMap";
import { CoverageCards, type CoverageItem } from "@/components/property/CoverageCards";
import { FaqSection } from "@/components/ui/FaqSection";
import { Eyebrow, InlineLink, Prose } from "@/components/ui/page-blocks";
import { CardCarousel } from "@/components/ui/CardCarousel";
import { CalculatorTabs } from "@/components/calculators/CalculatorTabs";
import { btnOnCream, btnPrimary, heroCreamSurface, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";

const PAGE_PATH = "/services/landlord-accountant";
const PAGE_URL = `${siteConfig.url}${PAGE_PATH}`;

/**
 * Ours, kept whole (carve-out 5). Theirs is retitled to "Landlord Accountant |
 * Rental Income, Section 24 & MTD" and carries neither hreflang nor a twitter
 * card. Ours carries "Accountants for Landlords" and "Buy to Let" as separate
 * head-term variants, and it was set against the collision pre-flight in
 * expansion_research/_prop_audit_2026_08_05/wave_brief_shared.md (commit
 * bbfe0437), which the designer never saw. Re-running that matrix needs the
 * surface map rather than a judgement, so the retitle is recorded and not
 * adopted. The same brief mandates Service + FAQPage + BreadcrumbList and "link
 * 4-8 relevant existing blog posts in-body": all restored below.
 */
export const metadata: Metadata = {
  title: "Landlord Accountant | Accountants for Landlords & Buy to Let",
  description:
    "Landlord accountant for UK rental income: Section 24, MTD quarterly filing, rental portfolios, property investors and letting agents. Book a consultation.",
  alternates: {
    canonical: PAGE_URL,
    languages: {
      "en-GB": PAGE_URL,
      "x-default": PAGE_URL,
    },
  },
  openGraph: {
    title: "Landlord Accountant | Accountants for Landlords & Buy to Let",
    description:
      "Specialist accountants for landlords: rental accounts, Section 24, MTD, portfolios, investors and letting agents.",
    url: PAGE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Landlord Accountant | Accountants for Landlords & Buy to Let",
    description:
      "Specialist accountants for landlords: rental accounts, Section 24, MTD, portfolios, investors and letting agents.",
  },
};

const coverage: CoverageItem[] = [
  {
    icon: FileSpreadsheet,
    title: "Rental accounts and Self Assessment",
    body: "Property-by-property income and expense schedules, the property pages of your tax return, and the finance cost restriction applied correctly rather than deducted as if it were still 2016.",
  },
  {
    icon: Percent,
    title: "Section 24 planning",
    body: "The basic rate reducer is 20% of finance costs now and rises to 22% from April 2027, when property income also moves to its own rates of 22%, 42% and 47%, so higher-rate landlords pay more overall rather than less. Where that pushes you into a higher band, we model the alternatives before you commit to any of them.",
  },
  {
    icon: CalendarClock,
    title: "Making Tax Digital",
    body: "Quarterly updates start from April 2026 if your combined self-employment and property income is over £50,000, from April 2027 over £30,000, and from April 2028 over £20,000. We check which year catches you, get the software feeding cleanly, and file the quarterly updates.",
  },
  {
    icon: Wrench,
    title: "Capital allowances and repairs",
    body: "Splitting capital from revenue on refurbishments, claiming plant and machinery where it genuinely qualifies, and using the writing down allowance at 14% and the 40% first year allowance where they apply. Residential lets are restricted, so the answer is often the repairs deduction, not an allowance.",
  },
  {
    icon: Building2,
    title: "Company accounts and corporation tax",
    body: "Statutory accounts, corporation tax returns, director loan accounts and profit extraction for property companies, including how salary and dividends interact now dividend rates are 10.75%, 35.75% and 39.35%.",
  },
  {
    icon: Landmark,
    title: "Disposals and inheritance planning",
    body: "Capital gains calculations and the 60 day reporting deadline on residential disposals, plus how a portfolio sits inside an estate while the inheritance tax thresholds stay frozen to 5 April 2031.",
  },
];

const whoWeWorkWith = [
  {
    icon: "home" as const,
    title: "One flat, first tax return",
    body: "You let out a property you used to live in, income is modest, and you want the return filed correctly with the reliefs you are entitled to. This is a small job and it should be priced like one.",
  },
  {
    icon: "building" as const,
    title: "Four to ten properties, mixed ownership",
    body: "Some held personally, some jointly with a spouse, one in a company. The work is keeping the ownership splits, the finance costs and the company filings straight so nothing gets taxed twice or missed.",
  },
  {
    icon: "growth" as const,
    title: "Rapid acquisition phase",
    body: "You are buying two or three a year, refinancing, and the structure decision matters more than the return itself. Advice comes before the purchase, not after completion.",
  },
  {
    icon: "alert" as const,
    title: "Undeclared rental income",
    body: "You did not realise the income was reportable, or you stopped filing. The Let Property Campaign is a route back with far lower penalties than waiting for HMRC to open an enquiry.",
  },
  {
    icon: "globe" as const,
    title: "Living abroad, letting in the UK",
    body: "Rent from a UK property stays UK taxable wherever you live. The non-resident landlord scheme decides whether your agent or tenant deducts tax at source before you see it.",
  },
];

const onboarding = [
  {
    n: "01",
    title: "Consultation",
    body: "A conversation about what you own, how it is held, where the income sits and what you are planning. No charge, and no obligation to go further.",
  },
  {
    n: "02",
    title: "Scope and fixed quote",
    body: "You get a written scope with a fixed annual fee covering the compliance work and any one off advisory piece separately. What the work costs depends on the number of properties, how they are held and how tidy the records are, which is why we quote after the consultation rather than before it.",
  },
  {
    n: "03",
    title: "Handover and setup",
    body: "We handle the professional clearance letter to your current accountant, HMRC agent authorisation, and getting your bookkeeping into a form that survives quarterly reporting.",
  },
  {
    n: "04",
    title: "The year, not just the deadline",
    body: "Quarterly updates where MTD applies, a tax position you can see before January rather than after it, and a real answer when you ring about a property you are about to buy.",
  },
];

/**
 * The investor section argues four distinct jobs in dense prose. The cards pull
 * them out so a skimming reader gets the shape before deciding to read it.
 */
const investorFocus = [
  {
    icon: Scale,
    title: "Trading or investment",
    body: "The distinction that sets the rate, the reliefs, and whether a property is stock or a capital asset.",
  },
  {
    icon: Network,
    title: "Structure and joint ventures",
    body: "Multiple vehicles, profit shares and group companies where separate projects need ring fencing.",
  },
  {
    icon: PoundSterling,
    title: "Allowances and stamp duty",
    body: "Commercial holdings at the 14% writing down allowance, plus the 40% first year allowance and SDLT on acquisition.",
  },
  {
    icon: CalendarClock,
    title: "Planned disposals",
    body: "Timing across tax years against the annual exempt amount and the 60 day residential deadline.",
  },
];

const practiceComparison: ComparisonRow[] = [
  {
    dimension: "How often they see rental cases",
    general: "A few times a year, alongside every other sector",
    specialist: "Every day. It is the entire practice",
  },
  {
    dimension: "When advice arrives",
    general: "After completion, when the return is prepared",
    specialist: "Before the transaction, while the structure can still be changed",
  },
  {
    dimension: "How expenditure is classified",
    general: "Reconstructed later from a bank statement",
    specialist: "Classified when the invoice comes in",
  },
  {
    dimension: "The limited company question",
    general: "A rule of thumb about higher rate taxpayers",
    specialist: "A model with your own figures, including the cost of the exit",
  },
  {
    dimension: "Section 24, 60 day CGT, MTD",
    general: "Tracked among the changes for every other sector",
    specialist: "Core competence, not a sideline",
  },
];

const faqs = [
  {
    question: "What does a landlord accountant do?",
    answer:
      "A landlord accountant prepares your rental accounts, files the property pages of your Self Assessment or your company's accounts and corporation tax return, applies the finance cost restriction and the reliefs you qualify for, and advises on the structure you hold property in. The compliance side is the visible part. The part that changes your tax bill is usually the advice about ownership, timing and expenditure.",
  },
  {
    question: "Do I need an accountant for one rental property?",
    answer:
      "Not necessarily. If you own one property, have a mortgage and simple expenses, the return is manageable on your own. It becomes worth paying for when the finance cost restriction starts moving you between tax bands, when you own jointly and the split is not the default, when you sell, or when quarterly reporting under Making Tax Digital applies to you.",
  },
  {
    question: "How much does a landlord accountant cost?",
    answer:
      "It depends on how many properties you own, whether they are held personally, jointly or through a company, and the state of the records. A single property personal return is a different job from a ten property portfolio with a company and quarterly filing. We quote a fixed annual fee in writing after the consultation so you are not agreeing to an open ended hourly rate.",
  },
  {
    question: "What is the difference between a landlord tax accountant and a general accountant?",
    answer:
      "A general practice handles rental income as one line among many. A landlord tax accountant deals with the property specific rules daily: Section 24, the repairs and capital divide on refurbishments, replacement of domestic items, stamp duty surcharges on incorporation, the 60 day capital gains reporting deadline, the non-resident landlord scheme and business property relief on a let portfolio. The risk with a generalist is not incompetence, it is that property rules change constantly and the exposure sits with you.",
  },
  {
    question: "Can you help if I have not declared rental income?",
    answer:
      "Yes. The Let Property Campaign lets you disclose undeclared rental income voluntarily, and the penalty position is significantly better than being found. We work out how many years are in scope, calculate the tax and interest, and make the disclosure. Approaching HMRC before HMRC approaches you is the whole point of the route.",
  },
  {
    question: "Should I own property personally or through a limited company?",
    answer:
      "It depends on your income level, how much mortgage interest you pay, whether you need to draw the profits out, and how long you plan to hold. A company avoids the finance cost restriction but transferring existing property triggers capital gains tax and stamp duty on the same day, and extracting profits is taxed again. Incorporation relief can defer the capital gains charge, but for transfers on or after 6 April 2026 it has to be claimed rather than applying automatically, and the claim is due by the first anniversary of the 31 January following the tax year of the transfer. New purchases are a different question from existing ones. We model both before you decide.",
  },
  {
    question: "Do I have to file quarterly under Making Tax Digital?",
    answer:
      "If your combined self-employment and property income is over £50,000, quarterly updates begin from April 2026. Over £30,000, from April 2027, and over £20,000 from April 2028. The threshold looks at gross income before expenses, not profit, so plenty of landlords who make very little are caught by it. Jointly owned property is split by your share.",
  },
  {
    question: "Do you work with landlords outside your local area?",
    answer:
      "Yes, throughout the UK, including landlords living abroad who let property here. Records, questions and signatures move electronically and calls are booked when they suit you, so nothing about the work depends on where either of us sits.",
  },
  {
    question: "Is there a bad time of year to switch accountants?",
    answer:
      "Only the fortnight before a filing deadline, when a handover competes with the filing itself. Otherwise any point in the year works. Clearance, records, the last filed return and the HMRC authorisation all move across without waiting for a year end, and nothing about changing firm triggers a penalty or restarts anything with HMRC.",
  },
  {
    question: "Do you act for letting agents and managing agents?",
    answer:
      "Yes. Agency work is a different job from landlord work: client money handling and the reconciliations your accounts rules require, commission recognised in the right period, VAT on fees, and the deductions and reporting the non-resident landlord scheme puts on you as the agent. We also cover the agency's own accounts, payroll and corporation tax.",
  },
  {
    question: "What paperwork do I need to hand over?",
    answer:
      "Rental statements or your agent's year end summary, mortgage interest certificates, invoices for repairs and improvements kept separately, purchase and sale completion statements, and any correspondence from HMRC. If you are heading into quarterly reporting, digital records with bank feeds save a great deal of time later.",
  },
  {
    question: "Do you advise on inheritance tax for a portfolio?",
    answer:
      "Yes. A straightforward let portfolio is usually an investment rather than a trading business, so business property relief generally does not apply to it. With the nil rate bands frozen to 5 April 2031 and property values where they are, planning tends to focus on ownership structure, lifetime transfers and how any relief that does apply interacts with the combined £2.5m allowance for the reliefs that survive.",
  },
];

/**
 * Ours (carve-out 5). Their layout emits FAQPage only; this route ships Service
 * + FAQPage in the page and BreadcrumbList from `ui/Breadcrumb`, which is the
 * set the wave brief specified.
 */
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Landlord accountant",
    serviceType: "Accountancy and tax services for landlords",
    description:
      "Accountancy and tax services for UK landlords: rental accounts, Self Assessment, Section 24 planning, Making Tax Digital quarterly filing, property company accounts, and support for property investors, letting agents and managing agents.",
    url: PAGE_URL,
    provider: {
      "@type": "Organization",
      "@id": `${siteConfig.url}#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: { "@type": "Country", name: "GB" },
    audience: { "@type": "Audience", audienceType: "UK landlords and property investors" },
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
];

export default function LandlordAccountantPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
                { label: "Landlord accountant" },
              ]}
            />
            <h1 className="mt-4 sm:mt-6 text-2xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-6xl">
              Landlord accountant for UK rental income
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-slate-700">
              Whether you own one flat or a portfolio split across your own name and a company, a free
              consultation shows you what Section 24 and quarterly reporting are costing you, and quotes a fixed
              annual fee in writing.
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

      {/* Stats strip, same treatment as the other service pages: white with a
          hairline, so it reads as a break from the hero rather than a section of
          its own. */}
      <section className="border-b border-slate-200 bg-white py-5 sm:py-7">
        <div className={siteContainerLg}>
          <StatsCounter stats={siteStats} />
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>The service</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">What a landlord accountant covers</h2>
          <Prose>
            <p>
              Rental income is taxed under rules that have moved almost every year since 2015, and most of the
              money is won or lost before the return is filed. The mortgage interest you pay is no longer a
              deduction, the refurbishment you treated as a repair may not be one, and the quarterly filing regime
              lands on a gross income threshold rather than profit. Every item below is part of the standard
              service, not an extra.
            </p>
            <p>
              For the mechanics behind the finance cost restriction, see our{" "}
              <InlineLink href="/section-24">guide to Section 24</InlineLink> and the longer write-up on{" "}
              <InlineLink href="/blog/section-24-and-tax-relief/finance-costs-section-24-complete-guide">
                finance costs and Section 24
              </InlineLink>
              , and the{" "}
              <InlineLink href="/calculators/section-24-calculator">Section 24 calculator</InlineLink> if you want
              a figure before you speak to anyone. Broader reading sits on our{" "}
              <InlineLink href="/landlord-tax">landlord tax guide</InlineLink>.
            </p>
          </Prose>
          <CoverageCards items={coverage} tone="slate" columns={2} />
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Our clients</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">Who we work with</h2>
          <CardCarousel items={whoWeWorkWith} tone="white" label="Who we work with" autoplay />
          {/* Kept out of the carousel deliberately: the five cards carry no links,
              which is the whole reason a carousel is acceptable here, and a link
              inside it would be hidden behind the autoplay control. */}
          <Prose>
            <p>
              If undeclared income is the issue, read how{" "}
              <InlineLink href="/blog/landlord-tax-essentials/let-property-campaign-disclosure-mechanics-undeclared-rental-income-2026">
                a Let Property Campaign disclosure works
              </InlineLink>{" "}
              before you contact HMRC directly.
            </p>
          </Prose>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Buy to let</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">Buy to let landlords</h2>
          <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
            <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-700">
              <p>
                On a geared buy to let you can hand over more tax than you kept in rent. The mortgage interest
                leaves your account, the tax return adds it straight back on, and you are taxed on a profit you
                never saw. The credit comes back at 20%; if you pay 40% on that slice, half the relief never
                arrives. April 2027 changes nothing, because the credit and the rates rise together.
              </p>
              <p>
                The inflated profit is also the figure every threshold test reads, so it can push you past the
                higher rate band, the child benefit charge or the personal allowance taper while your bank balance
                sits exactly where it was.
              </p>
              <p>
                Beyond the return, we check whether your income is taxed at a rate you could legitimately avoid by
                holding the property differently, document the ownership split between spouses before the income
                arises rather than after, and keep repairs apart from improvements, where the wrong call either
                loses a deduction now or inflates a gain later. Where a company looks attractive, the arithmetic
                has to include the exit: transferring property is a disposal for capital gains tax and a purchase
                for stamp duty on the same day. Our{" "}
                <InlineLink href="/blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk">
                  buy to let limited company guide
                </InlineLink>{" "}
                covers the structure, and the{" "}
                <InlineLink href="/incorporation">incorporation analysis</InlineLink> puts numbers against your own
                portfolio.
              </p>
            </div>
            <Section24Wedge />
          </div>

          {/* First CTA on the page. The Section 24 argument is the highest intent
              point in the top half: the reader has just been shown that relief
              they think they get is half missing. Card is slate-50 against this
              section's white ground. */}
          <div className="mt-10 rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-8">
            <p className="text-base font-bold text-slate-900 sm:text-lg">
              Want to know what Section 24 is costing you?
            </p>
            <Link
              href="#book"
              data-cta="section24_book"
              data-cta-placement="buy_to_let"
              data-cta-goal="form"
              className={`${btnPrimary} mt-4 w-full sm:mt-0 sm:w-auto sm:shrink-0`}
            >
              Book a consultation
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Portfolios</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
            Rental portfolios and multiple properties
          </h2>
          {/* Figure first, prose second, the mirror of the Buy to let section
              directly above, which is prose-left and figure-right. Two identical
              splits back to back read as a template rather than a rhythm.
              `order` rather than DOM order, so the reading order on mobile, where
              the grid collapses to one column, still leads with the prose. */}
          <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_1.35fr] lg:gap-12">
            <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-700 lg:order-2">
              <p>
                Past a handful of properties the hard problem stops being the tax return and becomes the record. UK
                residential lets pool into a single property business, so profits and losses net off before tax.
                Helpful for the bill, quietly dangerous for the portfolio: one figure goes on the return, and a
                property that lost money all year leaves no mark on it.
              </p>
              <p>
                Without property level figures nothing tells you which properties are earning and which are being
                funded by the others, so the answer arrives years late, usually when you sell. Furnished holiday
                lets no longer sit in their own regime, and overseas property is a separate business again, which
                matters for losses and for quarterly reporting.
              </p>
              <p>
                We produce property by property profit and loss alongside the tax figures, track refinancing and
                the interest that follows the money rather than the security, and flag the year a disposal should
                happen rather than the year it happened to. It is also what makes quarterly filing survivable: four
                submissions against a live ledger beats four against a shoebox of receipts. The{" "}
                <InlineLink href="/calculators/portfolio-profitability-calculator">
                  portfolio profitability calculator
                </InlineLink>{" "}
                gives you a per property view in a few minutes.
              </p>
              <p>
                Useful background:{" "}
                <InlineLink href="/blog/landlord-tax-essentials/capital-vs-revenue-expenditure-landlord-uk">
                  capital versus revenue expenditure
                </InlineLink>
                ,{" "}
                <InlineLink href="/blog/landlord-tax-essentials/jointly-owned-property">
                  jointly owned property
                </InlineLink>{" "}
                and{" "}
                <InlineLink href="/blog/property-finance/portfolio-landlord-mortgages-guide">
                  portfolio landlord mortgages
                </InlineLink>
                .
              </p>
            </div>
            <div className="lg:order-1">
              <PortfolioPooling />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Investors</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">Property investors</h2>
          <Prose>
            <p>
              Investing is a different job from letting. If you are buying to add value and sell, refurbishing and
              refinancing, or mixing residential with commercial, the first question is whether HMRC would treat
              your activity as trading rather than investment. That single distinction changes the rate, the
              reliefs and whether the property is stock or a capital asset. Buying with the intention to sell at a
              profit looks like a trade regardless of what you call it.
            </p>
            <p>
              As an accountant for property investors, four things carry most of the risk. Stamp duty analysis on
              acquisition is where the largest single number usually sits, including the mixed use and multiple
              dwellings positions, which are far easier to get right at the outset than to reclaim afterwards. See
              our walkthrough on{" "}
              <InlineLink href="/blog/capital-gains-tax/cgt-calculation-selling-buy-to-let-property-step-by-step">
                calculating capital gains tax on a sale
              </InlineLink>{" "}
              and, for anything strategic, our{" "}
              <InlineLink href="/services/property-tax-advice">property tax advice service</InlineLink>.
            </p>
          </Prose>
          <div className="mt-8 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {investorFocus.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-transparent bg-slate-50 p-5 transition-colors hover:border-emerald-600 sm:p-6"
              >
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                  <item.icon aria-hidden className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="text-sm font-bold text-slate-900 sm:text-base">{item.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:text-sm">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Agents</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">Letting agents and managing agents</h2>
          <Prose>
            <p>
              An agency has two sets of books: its own, and other people&apos;s money. Client money handling
              carries reconciliation and reporting obligations that do not apply to an ordinary trading company,
              and nearly everything an agent gets wrong sits on one side of that line or the other.
            </p>
            <p>
              Accounting for property management covers the client account alongside the agency accounts,
              commission and management fees recognised in the period they are earned rather than when the rent
              clears, VAT on fees including where a fee is disbursed on behalf of a landlord, payroll for
              negotiators and property managers including commission and the employer National Insurance position
              at 15% above the £5,000 secondary threshold, and the non-resident landlord scheme where you hold the
              obligation to deduct and report on overseas landlords you act for.
            </p>
            <p>
              Quarterly reporting also raises a question agents get asked constantly, which is who files what when
              a portfolio is managed. Our{" "}
              <InlineLink href="/making-tax-digital-landlords">Making Tax Digital guide</InlineLink> sets out the
              regime, our guide on{" "}
              <InlineLink href="/blog/making-tax-digital-mtd/mtd-itsa-letting-agent-managed-portfolio-who-files-quarterly">
                agent managed portfolios and quarterly filing
              </InlineLink>{" "}
              sets out the split of responsibility, and{" "}
              <InlineLink href="/blog/making-tax-digital-mtd/how-to-register-mtd-landlord-step-by-step-guide">
                registering for MTD
              </InlineLink>{" "}
              covers the sign up itself. The{" "}
              <InlineLink href="/calculators/mtd-checker">MTD checker</InlineLink> tells a landlord which year
              catches them.
            </p>
          </Prose>
          <AgencyBooks />

          <div className="mt-10 rounded-xl bg-white p-6 ring-1 ring-slate-200 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-8">
            <p className="text-base font-bold text-slate-900 sm:text-lg">
              Recognise your own situation in any of the above?
            </p>
            <Link
              href="#book"
              data-cta="agents_book"
              data-cta-placement="letting_agents"
              data-cta-goal="form"
              className={`${btnPrimary} mt-4 w-full sm:mt-0 sm:w-auto sm:shrink-0`}
            >
              Book a consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Full-width navy band. This is the page's differentiation argument and it
          sits at the midpoint of seven consecutive off-white sections, the same
          move NRL and /incorporation use to put weight on their central claim and
          give the scroll a tonal event. The ComparisonTable needs no dark
          variant: it is a self-contained white card with its own ring and shadow,
          and it reads harder floating on navy than it did on white. */}
      <section className="relative overflow-hidden bg-slate-900 py-12 sm:py-16 lg:py-20">
        <HeroBrickBackdrop />
        <div className={`${siteContainerLg} relative z-10`}>
          <Eyebrow onDark>The difference</Eyebrow>
          <h2 className="text-2xl font-bold text-white sm:text-4xl">
            Why a landlord tax accountant rather than a general practice
          </h2>
          <Prose onDark>
            <p>
              Most high street firms are perfectly competent and see rental income a few times a year. The problem
              is volume of change. Since 2015 the sector has absorbed the finance cost restriction phasing in and
              now increasing, the additional dwellings surcharge, now 5%, the replacement of domestic items relief,
              the 60 day capital gains reporting window, the end of the furnished holiday lettings regime, and
              quarterly reporting arriving in two waves. Each one has a trap in it, and the exposure sits with you
              rather than with whoever filed the return.
            </p>
            <p>
              We act for landlords only. That is the entire practice, which means the questions you would have to
              explain elsewhere are the ones we answer daily. If you are weighing up a move, our note on{" "}
              <InlineLink href="/blog/property-accountant-services/change-landlord-accountants" onDark>
                changing landlord accountants
              </InlineLink>{" "}
              covers the process, and{" "}
              <InlineLink href="/blog/property-accountant-services/buy-to-let-accountants-near-me-guide" onDark>
                choosing a buy to let accountant
              </InlineLink>{" "}
              covers what to ask before you sign anything.
            </p>
          </Prose>
          <ComparisonTable
            rows={practiceComparison}
            generalLabel="A general practice"
            generalCaption="Most high street firms"
            ourCaption="A landlord-only practice like us"
            cta={{
              href: "#book",
              label: "Book a consultation",
              note: "No charge, and no obligation to go further.",
            }}
          />
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Getting started</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">From first call to first filing</h2>
          <ProcessTimeline steps={onboarding} />
        </div>
      </section>

      {/* Proof sits after the process rather than before it: the reader has just
          been shown what happens if they call, and the testimonials answer "did
          that work out for anyone else". It also keeps the two navy bands apart. */}
      <TestimonialsSection description="Anonymised feedback from landlords and portfolio investors we act for." />

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Location</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
            Looking for a landlord accountant near you
          </h2>
          <div className="mt-8 grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-700">
              <p>
                Property tax is national. The rules that decide your bill are the same in Manchester as in London,
                and nothing about a rental return needs a meeting in a room. Searching locally usually surfaces
                whoever is closest rather than whoever knows the sector, which is a poor trade when the specialism
                is what saves the money. Scotland and Wales differ on the transaction tax on purchase, and we
                handle those where they apply.
              </p>
              <p>
                We act for landlords throughout the UK, and for landlords living abroad who let property here.
                Records come in electronically, questions get answered on a call booked when it suits you, and you
                deal with people who have seen your situation before. See our{" "}
                <InlineLink href="/locations">locations</InlineLink> for where our clients are.
              </p>
            </div>
            <LocationMap />
          </div>
        </div>
      </section>

      {/* Free tools, the hero's secondary CTA target. slate-50 keeps the
          alternation intact: Getting started (slate) / Location (white) / here
          (slate) / navy panel. */}
      <section id="free-tools" className="scroll-mt-24 bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Free tools</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">Put numbers on it before you call</h2>
          <p className="mt-4 text-sm sm:text-base text-slate-700">
            Free, and the figures are yours to take to any adviser.
          </p>
          <div className="mt-8 sm:mt-10">
            <CalculatorTabs />
          </div>
        </div>
      </section>

      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          title="Speak to an accountant who only works with landlords"
          description="Tell us what you own and how it is held. We will look at what it is costing you, then quote a fixed fee in writing."
          proofPoints={[
            { title: "Landlord specialists only", detail: "Rental income, Section 24 and MTD every day" },
            { title: "Fixed fees, quoted upfront", detail: "No hourly billing, no surprise invoices" },
            { title: "24-hour response", detail: "Usually the same working day" },
          ]}
          footnote="No obligation and no hard sell. If you are better off where you are, we will say so."
        />
      </div>

      <div id="faqs" className="scroll-mt-24">
        <FaqSection
          title="Landlord accountant questions"
          faqs={faqs}
          className="bg-white py-12 sm:py-16 lg:py-20"
        />
      </div>
    </>
  );
}
