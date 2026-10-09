import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  CalendarClock,
  FileSpreadsheet,
  Network,
  Percent,
  Scale,
  type LucideIcon,
} from "lucide-react";
import { HeroBrickBackdrop } from "@/components/layout/HeroBrickBackdrop";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { LeadCTAPanel } from "@/components/property/LeadCTAPanel";
import { Section24Wedge } from "@/components/property/Section24Wedge";
import { PortfolioPooling } from "@/components/property/PortfolioPooling";
import { ProcessTimeline } from "@/components/property/ProcessTimeline";
import { LocationMap } from "@/components/property/LocationMap";
import { FaqSection } from "@/components/ui/FaqSection";
import { Eyebrow, InlineLink, Prose } from "@/components/ui/page-blocks";
import { CardCarousel } from "@/components/ui/CardCarousel";
import { CalculatorTabs } from "@/components/calculators/CalculatorTabs";
import { btnOnCream, btnPrimary, heroCreamSurface, siteContainerLg } from "@/components/ui/layout-utils";
import { buildFaqPageJsonLd, type FaqEntry } from "@/lib/faq-page-schema";
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
/*
 * 2026-10-09 (WP1-services, SERVICE_PAGES_BLUEPRINT_2026-10-09.md §3.3): the
 * title moves from "Landlord Accountant | Accountants for Landlords & Buy to Let"
 * to the blueprint's page part, which keeps "Landlord Accountant" first and the
 * buy-to-let family second, drops the second pipe (the layout template adds the
 * brand), and is 55 characters. "Accountants for landlords" now lives in an H2.
 * The decision above (theirs not adopted, hreflang and twitter card kept) stands.
 */
export const metadata: Metadata = {
  title: "Landlord Accountant for UK Rental Income and Buy to Let",
  description:
    "Landlord accountants for UK rental income: Self Assessment, Section 24, MTD quarterly filing, buy-to-let and portfolio accounts. Free first call.",
  alternates: {
    canonical: PAGE_URL,
    languages: {
      "en-GB": PAGE_URL,
      "x-default": PAGE_URL,
    },
  },
  openGraph: {
    title: "Landlord Accountant for UK Rental Income and Buy to Let",
    description:
      "Landlord accountants for UK rental income: tax returns, Section 24, MTD quarterly filing, buy-to-let company accounts. Free first call.",
    url: PAGE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Landlord Accountant for UK Rental Income and Buy to Let",
    description:
      "Landlord accountants for UK rental income: tax returns, Section 24, MTD quarterly filing, buy-to-let company accounts. Free first call.",
  },
};

/**
 * The "What we do" list. One definition sentence, then two or three short
 * labelled lines, which is the shape AI overviews lift. The same array renders
 * the H3s and builds `hasOfferCatalog`, so a copy edit cannot drift from the
 * schema (blueprint §3.1 item 5, harness check 5).
 */
type Offer = {
  icon: LucideIcon;
  title: string;
  definition: string;
  lines: Array<{ label: string; text: string }>;
  link?: { href: string; label: string };
};

const services: Offer[] = [
  {
    icon: FileSpreadsheet,
    title: "Self Assessment for rental income",
    definition:
      "We prepare the property pages of your tax return from your rent, costs and mortgage statements, and file it.",
    lines: [
      { label: "Who it suits", text: "One property or twenty, owned alone or jointly." },
      { label: "What you see", text: "A figure for each property, not only the total." },
    ],
  },
  {
    icon: Percent,
    title: "Section 24 finance-cost workings",
    definition:
      "We work out what relief your mortgage interest really gives you, now that it comes as a tax credit, not a cost.",
    lines: [
      // house_positions.md §4: the credit is 20% of finance costs for 2026/27.
      { label: "The catch", text: "The credit is 20% of the interest, so a higher-rate landlord loses half the relief." },
      // house_positions.md §4 and §7: the credit is given at 22% from 2027/28.
      { label: "From April 2027", text: "The credit rises to 22%, alongside new rates on property income." },
    ],
  },
  {
    icon: CalendarClock,
    title: "Making Tax Digital quarterly updates",
    definition:
      "We keep your records in software HMRC accepts and send each quarterly update, then the year-end return.",
    lines: [
      // house_positions.md §3: £50,000 from 6 April 2026, £30,000 from 6 April 2027.
      { label: "Who is in", text: "Rent plus self-employed income over £50,000, then over £30,000 from April 2027." },
      // house_positions.md §3: limited companies are outside MTD for ITSA.
      { label: "Companies", text: "Outside the regime; they file annual accounts instead." },
    ],
  },
  {
    icon: Building2,
    title: "Buy-to-let company accounts and Corporation Tax",
    definition:
      "We prepare the accounts and Corporation Tax return for a company that owns rental property, and the director's return with them.",
    lines: [
      // house_positions.md §4: companies deduct finance costs in full.
      { label: "Interest", text: "A company takes mortgage interest off its profit in full." },
      { label: "Drawing money", text: "Salary, dividends or a director's loan, planned before the year ends." },
    ],
  },
  {
    icon: Network,
    title: "Portfolio accounts and pooling",
    definition:
      "We produce a profit and loss for every property you own, next to the single pooled figure your return declares.",
    lines: [
      { label: "Why it matters", text: "Pooling hides the property that loses money." },
      { label: "Refinancing", text: "We track where borrowed money went, since that decides what interest counts." },
    ],
  },
  {
    icon: Scale,
    title: "Undeclared rental income disclosures",
    definition:
      "We put earlier years right through HMRC's Let Property Campaign, working out the tax, interest and penalty and making the disclosure.",
    lines: [
      { label: "Why now", text: "Telling HMRC first costs far less than being found." },
      { label: "What we need", text: "Rent and costs for each year that was missed." },
    ],
    link: { href: "/for/rental-income-disclosure", label: "Putting undeclared rental income right" },
  },
];

const whoWeWorkWith = [
  {
    icon: "home" as const,
    title: "Your first rental property",
    body: "You have started letting, perhaps a home you moved out of, and you want the first return right.",
    href: "/for/first-time-and-accidental-landlords",
    linkLabel: "First-time and accidental landlords",
  },
  {
    icon: "building" as const,
    title: "Couples and joint owners",
    body: "You own with a spouse or partner, and the split of rent and costs has to match how the property is really held.",
    href: "/for/couples-splitting-rental-income",
    linkLabel: "Splitting rental income as a couple",
  },
  {
    icon: "growth" as const,
    title: "A growing portfolio",
    body: "You are buying and refinancing, and the question is whether the next purchase belongs in a company.",
    href: "/for/property-spv-set-up",
    linkLabel: "Setting up a property company",
  },
  {
    icon: "alert" as const,
    title: "Undeclared rental income",
    body: "Rent went undeclared, by oversight or because the returns stopped, and you want it put right before HMRC asks.",
    href: "/blog/landlord-tax-essentials/let-property-campaign-disclosure-mechanics-undeclared-rental-income-2026",
    linkLabel: "How a Let Property Campaign disclosure works",
  },
  {
    icon: "globe" as const,
    title: "Letting from abroad",
    body: "You live overseas and let property here; the rent is still taxed in the UK, and your agent or tenant may have to hold tax back before paying you.",
    href: "/for/non-resident-landlords",
    linkLabel: "Non-resident landlords",
  },
];

const onboarding = [
  {
    n: "01",
    title: "A free first call",
    body: "Describe what you own, whose name it is in and what is worrying you. We say what needs doing and, just as plainly, what does not.",
  },
  {
    n: "02",
    title: "A fixed fee, quoted upfront",
    body: "We set out the work and quote a fixed fee, and you approve the fee before work starts. If your situation changes mid-year, we will tell you before any additional fees apply.",
  },
  {
    n: "03",
    title: "Handover, then the year",
    body: "We ask your old accountant for clearance, get authorised with HMRC as your agent and set your records up for quarterly filing. Then we keep you ahead of each deadline.",
  },
];

/**
 * Twelve, each answer-first and 40 to 90 words. The same array feeds the
 * visible FaqSection and buildFaqPageJsonLd, so the strings cannot differ.
 */
const faqs: FaqEntry[] = [
  {
    question: "What does a landlord accountant do?",
    answer:
      "A landlord accountant prepares your rental accounts and tax return, applies the mortgage interest restriction correctly, and files quarterly Making Tax Digital updates where they apply. If you own through a company, that includes the company accounts and Corporation Tax return. The part that saves money is the advice: who should own what, when to sell, and whether a cost is a repair you can claim now. We do both, and we tell you the bill before it is due.",
  },
  {
    question: "Do I need an accountant for one rental property?",
    answer:
      "Not always. Plenty of landlords with one property, one mortgage and tidy records file their own return. The case for paying someone grows when the interest restriction tips you into a higher band, when you and a partner own on an unequal split, when you sell at a gain, or when Making Tax Digital brings you into quarterly updates. We will tell you on the first call whether you need us.",
  },
  {
    question: "How much does a landlord accountant cost?",
    answer:
      "The fee follows the work: the number of properties, whether they sit in your name, jointly or in a company, and how complete the records are. One flat on a personal return is a small job; a portfolio with a company and quarterly filing is a bigger one. We quote a fixed fee upfront after the first call, and you approve the fee before work starts, so there is no hourly meter running.",
  },
  {
    // house_positions.md §5: the 60-day report applies where CGT is due.
    question: "What is the difference between a landlord tax accountant and a general accountant?",
    answer:
      "A landlord tax accountant works on rental property every day; a general practice sees it a few times a year among many other kinds of work. The rules have changed almost every year since the interest restriction arrived: the stamp duty surcharge, the 60-day capital gains report, the end of furnished holiday lets, and now quarterly reporting. A generalist can be competent and still miss one, and the cost sits with you.",
  },
  {
    question: "Can you help if I have not declared rental income?",
    answer:
      "Yes. HMRC's Let Property Campaign lets you tell HMRC about undeclared rent yourself, and the penalties are much lower than if HMRC finds it first. We establish the years involved, compute what is owed with interest and the penalty, and submit the disclosure for you. The earlier you come forward, the better your position, so it is worth a call before HMRC writes to you.",
  },
  {
    // house_positions.md §4 (companies deduct interest in full) and §5
    // (incorporation relief must be claimed for transfers on or after 6 April 2026).
    question: "Should I own property personally or through a limited company?",
    answer:
      "Four things decide it: your tax band, the size of your mortgage interest, whether you live off the profit, and how long you will keep it all. A company deducts interest in full, but profit you take out is taxed again. Moving property you already own is treated as a sale, so capital gains tax and stamp duty both apply, and incorporation relief must now be claimed for transfers from 6 April 2026. We run both routes first.",
  },
  {
    // house_positions.md §3: £50,000 from 6 April 2026, £30,000 from 6 April 2027,
    // £20,000 from 6 April 2028; joint owners test their share; companies are outside.
    question: "Do I have to file quarterly under Making Tax Digital?",
    answer:
      "Yes, if your rental and self-employed income together is over £50,000 before expenses: quarterly updates started from 6 April 2026. The threshold drops to £30,000 from April 2027 and £20,000 from April 2028. It is measured on gross income, not profit, and joint owners count only their share. Property held in a limited company is outside the regime. Our MTD checker tells you which year applies to you.",
  },
  {
    question: "Is there a bad time of year to switch accountants?",
    answer:
      "Not really. The one awkward stretch is the run-up to the January deadline, when a handover and a return compete for the same weeks. At any other point it is straightforward: we ask your current accountant for clearance, take over the records and the last filed return, and get authorised with HMRC as your agent. Switching carries no HMRC penalty and starts nothing again.",
  },
  {
    question: "Do you act for letting agents and managing agents?",
    answer:
      "Yes. The core of agency work is keeping client money separate from the agency's own. We reconcile the client account, recognise commission and management fees when they are earned, deal with VAT on fees, and handle the non-resident landlord scheme where you collect rent for owners abroad. Payroll, the agency's annual accounts and its Corporation Tax return are part of the same job.",
  },
  {
    question: "What paperwork do I need to hand over?",
    answer:
      "Bring the rent statements or the agent's annual summary, the lender's interest statement, receipts for work on each property with repairs and improvements in separate piles, completion statements for anything bought or sold, and any HMRC letters. If you own through a company, add the last filed accounts. If quarterly reporting applies to you, bank feeds into accounting software will save you time all year.",
  },
  {
    question: "Which accounting services does a buy-to-let investor need for tax returns and compliance?",
    answer:
      "Most buy-to-let investors need three things from a specialist: a tax return that handles the rental income and the interest restriction correctly, quarterly Making Tax Digital updates once the threshold applies, and company accounts if any property sits in a limited company. Beyond that compliance, use an accountant who advises before you buy, refinance or sell, because that is when the tax is decided. We should be able to say on the first call which you need.",
  },
  {
    // house_positions.md §4 (20% credit for individuals, full deduction for
    // companies) and §7 (the credit is given at 22% from April 2027).
    question: "What tax deductions can UK landlords claim?",
    answer:
      "You can claim the running costs of letting: agent and management fees, insurance, repairs and maintenance, ground rent and service charges, accountancy fees, and replacing furnishings in a furnished let. Mortgage interest is different: individuals get a tax credit of 20% of the interest instead of a deduction, rising to 22% from April 2027, while companies deduct it in full. Improvements cannot be set against rent, but they reduce the gain when you sell.",
  },
];

/**
 * Ours (carve-out 5). Their layout emits FAQPage only; this route ships Service
 * + FAQPage in the page and BreadcrumbList from `ui/Breadcrumb`, which is the
 * set the wave brief specified.
 */
/*
 * 2026-10-09 (blueprint §3.1 schema, §3.3): the Service node gains `@id`
 * (`<page-url>#service`), a provider that references the Organization node by
 * `@id` only, `areaServed` as the Country "United Kingdom" (was the code "GB"),
 * and `hasOfferCatalog` built from `services`, the array that renders the "What
 * we do" H3s. The provider `@id` is `${siteConfig.url}#organization` because that
 * is the `@id` the layout's Organization node actually emits (verified in the
 * 9 Oct snapshot); a "/#organization" form would point at a node that does not
 * exist. The FAQPage node now comes from buildFaqPageJsonLd, fed by `faqs`.
 */
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${PAGE_URL}#service`,
    name: "Landlord accountants for UK rental income",
    serviceType: "Landlord accountant",
    description:
      "Accountancy and tax for UK landlords: Self Assessment for rental income, Section 24 finance-cost workings, Making Tax Digital quarterly updates, buy-to-let company accounts and Corporation Tax, portfolio accounts, and undeclared rental income disclosures.",
    url: PAGE_URL,
    provider: { "@id": `${siteConfig.url}#organization` },
    areaServed: { "@type": "Country", name: "United Kingdom" },
    audience: { "@type": "Audience", audienceType: "UK landlords and property investors" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Landlord accountancy services",
      // Offer `name` rather than a nested `itemOffered` Service: a second
      // "@type": "Service" node per offer reads as six extra Service nodes
      // without @id, provider or areaServed (service_page_verify.py check 17).
      itemListElement: services.map((item) => ({
        "@type": "Offer",
        name: item.title,
      })),
    },
  },
  buildFaqPageJsonLd(faqs),
];

const h2Class = "scroll-mt-24 text-2xl font-bold text-slate-900 sm:text-4xl";

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
              Landlord accountants for UK rental income
            </h1>
            {/* The opening: answer first, no link, no deferred fact (blueprint
                §3.1 item 3). It is the paragraph an AI overview lifts whole. */}
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-slate-700">
              We are landlord accountants for anyone with rental income in the UK, from one flat to a
              portfolio, held personally or through a company. We prepare the accounts and tax return, work
              through the mortgage interest restriction, file quarterly Making Tax Digital updates and keep
              company accounts in order. We also tell you what the bill will be before it arrives. The first call
              is free, and the fee is fixed and agreed with you before any work begins.
            </p>
            {/* The coverage statement (blueprint §3.1 item 4, R5): serves every
                "near me" and "uk" row without the literal strings. "Email" in
                place of the pack's "the portal": entity.firm's `where` line says
                phone, video and email, and no portal is verified for this firm. */}
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600">
              Landlords across the UK use us without ever visiting an office: everything runs by video call,
              phone and email, and our city pages for Leeds, Manchester, Birmingham, London and Bristol explain how
              we work locally in each.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Link
                href="/contact"
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

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>What we do</Eyebrow>
          <h2 id="what-a-landlord-accountant-does-for-you" className={h2Class}>
            What a landlord accountant does for you
          </h2>
          <Prose>
            <p>
              A landlord accountant does the filing and the thinking: we keep the returns right and say, before the
              year ends, what would lower the bill.
            </p>
          </Prose>
          <div className="mt-8 grid gap-5 sm:mt-10 sm:gap-6 md:grid-cols-2">
            {services.map((item) => (
              <div key={item.title} className="flex flex-col rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70 sm:p-8">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                  <item.icon aria-hidden className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 text-base font-bold text-slate-900 sm:text-lg">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:mt-3 sm:text-base">{item.definition}</p>
                <ul className="mt-4 space-y-2 border-t border-slate-200 pt-4 text-sm leading-relaxed text-slate-700">
                  {item.lines.map((line) => (
                    <li key={line.label}>
                      <strong className="font-semibold text-slate-900">{line.label}:</strong> {line.text}
                    </li>
                  ))}
                </ul>
                {item.link && (
                  <p className="mt-4 text-sm">
                    <InlineLink href={item.link.href}>{item.link.label}</InlineLink>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Interest and MTD</Eyebrow>
          <h2 id="landlord-tax-accountant-the-section-24-and-mtd-side" className={h2Class}>
            Landlord tax accountant: the Section 24 and MTD side
          </h2>
          <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
            <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-700">
              <p>
                As landlord tax accountants, we spend most of our time on the two rules that move your bill
                furthest: the mortgage interest restriction and quarterly reporting under Making Tax Digital.
              </p>
              {/* house_positions.md §4 (basic-rate credit, higher-rate wedge,
                  allowance taper) and §7 (credit and rates both rise from
                  6 April 2027, so the wedge is unchanged). The figure beside this
                  is the /section-24 worked example and carries the numbers. */}
              <p>
                Mortgage interest no longer comes off the rent before tax. Individual landlords are taxed on the
                profit before interest and then given a credit at the basic rate, so a higher-rate taxpayer loses
                half the relief, and the larger profit can also cost child benefit or part of the personal
                allowance. The new property income rates from April 2027 raise the credit and the rate together,
                which leaves that gap exactly where it is.
              </p>
              <p>
                We run this working on your own figures every year, show you the result before January, and model
                the options if it is pushing you into a higher band. You can{" "}
                <InlineLink href="/calculators/section-24-calculator">put your own numbers through the calculator</InlineLink>{" "}
                first, and our guide explains{" "}
                <InlineLink href="/section-24">how the interest rule works</InlineLink>.
              </p>
              {/* house_positions.md §3: the threshold is tested on gross
                  qualifying income and falls each April to 2028. */}
              <p>
                Quarterly reporting is the newer job, and the income line that brings landlords into it falls each
                April until 2028. We work out your start year, set up software that fits how you keep records,
                and send each update. Our{" "}
                <InlineLink href="/making-tax-digital-landlords">Making Tax Digital guide</InlineLink> covers the
                rules, and the <InlineLink href="/calculators/mtd-checker">MTD checker</InlineLink> gives you your
                start date.
              </p>
            </div>
            <Section24Wedge />
          </div>

          {/* First CTA on the page. The interest restriction is the highest
              intent point in the top half: the reader has just been shown that
              relief they think they get is half missing. */}
          <div className="mt-10 rounded-xl bg-white p-6 ring-1 ring-slate-200 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-8">
            <p className="text-base font-bold text-slate-900 sm:text-lg">
              Want to know what the interest rule is costing you?
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

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>One property or many</Eyebrow>
          <h2 id="accountants-for-landlords-with-one-property-or-a-portfolio" className={h2Class}>
            Accountants for landlords with one property or a portfolio
          </h2>
          {/* Figure first, prose second, the mirror of the section above, which
              is prose-left and figure-right. `order` rather than DOM order, so
              the reading order on mobile still leads with the prose. */}
          <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_1.35fr] lg:gap-12">
            <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-700 lg:order-2">
              <p>
                We act as accountants for landlords with a single let and for landlords with twenty, and the work
                changes shape as you grow.
              </p>
              <p>
                With one property, the job is a correct return and every cost you are entitled to claim, and you
                may not need an accountant for landlords every year; the questions below say when it starts to pay.
              </p>
              <p>
                With a portfolio, the harder job is the record. All your UK lets count as one property business,
                so the return shows one profit and a flat that lost money all year simply disappears into it. Our
                landlord accounting runs one property at a time, which shows the ones that pay their way and the ones
                the rest are carrying. The{" "}
                <InlineLink href="/calculators/portfolio-profitability-calculator">
                  portfolio profitability calculator
                </InlineLink>{" "}
                gives you that view on your own numbers.
              </p>
            </div>
            <div className="lg:order-1">
              <PortfolioPooling />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Buy to let</Eyebrow>
          <h2 id="buy-to-let-accountant-personally-held-and-company-held" className={h2Class}>
            Buy to let accountant: personally held and company held
          </h2>
          <Prose>
            <p>
              Whichever way you hold a buy to let (BTL), in your own name, jointly or in a limited company, we do
              the accounts and returns that go with it, and the job is different for each.
            </p>
            <p>
              Held personally, the rent goes on your own return and the interest rule applies. We record the{" "}
              <InlineLink href="/blog/landlord-tax-essentials/jointly-owned-property">ownership split</InlineLink>{" "}
              before the income arises and{" "}
              <InlineLink href="/blog/landlord-tax-essentials/capital-vs-revenue-expenditure-landlord-uk">
                separate repairs from improvements
              </InlineLink>
              , because a repair filed as an improvement is a claim lost this year, and the reverse adds to the
              gain when you sell.
            </p>
            {/* house_positions.md §4: companies deduct finance costs in full. */}
            <p>
              Held in a company, BTL accounting means a separate set of books: mortgage interest comes off the
              profit in full before Corporation Tax, but money you take out is taxed again as salary or dividends. As accountants for buy-to-let landlords with a
              company, we prepare the accounts, the Corporation Tax return and your own return together, so what
              you draw is planned, not guessed.
            </p>
            <p>
              Moving properties you already own into a company counts as selling them for capital gains tax and
              buying them for stamp duty, both at once. We model the whole cost, the way out included, before you
              decide. Our{" "}
              <InlineLink href="/incorporation">incorporation guide</InlineLink> sets out the arithmetic, and{" "}
              <InlineLink href="/for/moving-property-into-a-limited-company">
                moving property into a limited company
              </InlineLink>{" "}
              covers the steps.
            </p>
            {/* house_positions.md §5: UK residents report and pay within 60 days
                of completion where CGT is due. */}
            <p>
              When you sell, a UK resident who owes capital gains tax has to report and pay it within 60 days of
              completion. We do the calculation and file the report, and our page on{" "}
              <InlineLink href="/for/selling-a-buy-to-let">selling a buy-to-let</InlineLink> walks through it.
            </p>
          </Prose>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Investors and agents</Eyebrow>
          <h2 id="rental-property-accountant-for-investors-and-agents" className={h2Class}>
            Rental property accountant for investors and agents
          </h2>
          <Prose>
            <p>
              We also act as rental property accountant for two groups whose work goes beyond one tax return:
              property investors, and the letting agents who manage homes for landlords.
            </p>
            <p>
              If you buy to refurbish and sell, mix residential with commercial property, or invest alongside
              partners, HMRC&apos;s first question is whether you are trading or investing, because the answer
              decides the tax and the reliefs. We answer it before you buy, check the stamp duty at the outset, and time
              sales across tax years.
            </p>
            <p>
              For letting and managing agents, we keep the agency&apos;s own books apart from client money,
              recognise commission when it is earned, deal with VAT on fees, and run the non-resident landlord
              scheme where you collect rent for owners abroad. Our page{" "}
              <InlineLink href="/for-letting-agents">for letting agents</InlineLink> shows how we work with an
              agency and its landlords.
            </p>
          </Prose>
          <div className="mt-10 rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-8">
            <p className="text-base font-bold text-slate-900 sm:text-lg">
              Investor or agent, and not sure which of this applies?
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

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Our clients</Eyebrow>
          <h2 id="who-we-work-with" className={h2Class}>
            Who we work with
          </h2>
          <Prose>
            <p>
              We work with landlords and property investors at every stage, and landlord and property tax is all
              we do, so you will not have to explain the interest rule to us.
            </p>
          </Prose>
          {/* The Let Property Campaign link now sits ON the card it belongs to
              (owner, 2026-08-23), rather than in a stray paragraph underneath.
              The note that used to live here said a link could not go in the
              carousel because it "would be hidden behind the autoplay control".
              That was already untrue of this component: `CardCarousel` renders an
              optional per-card `href`/`linkLabel` at the card foot, every slide
              is in the DOM (native scroll, nothing virtualised) so the link is
              crawlable, autoplay pauses on hover and on focus-capture, and
              clicking the link calls `takeOver()`, which stops the rotation for
              the rest of the visit. */}
          {/* 2026-10-09 (blueprint §3.1 item 6): every other card now carries a
              link to its matching /for/* page as well. The Let Property Campaign
              card keeps the href and label the note above governs. */}
          <CardCarousel items={whoWeWorkWith} tone="white" label="Who we work with" autoplay />
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Getting started</Eyebrow>
          <h2 id="how-it-works" className={h2Class}>
            How it works
          </h2>
          <Prose>
            <p>
              It works in three steps, the first of them a free call. If you are moving from another firm,
              our guide to{" "}
              <InlineLink href="/blog/property-accountant-services/change-landlord-accountants">
                changing landlord accountants
              </InlineLink>{" "}
              covers the handover.
            </p>
          </Prose>
          <ProcessTimeline steps={onboarding} />
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Fees</Eyebrow>
          <h2 id="how-our-fees-work" className={h2Class}>
            How our fees work
          </h2>
          <Prose>
            <p>
              Our fees are fixed and quoted upfront for the work you need, and you approve the fee before work
              starts.
            </p>
            <p>
              Landlord accountant fees depend on three things: how many properties you have, how they are held
              (personally, jointly or in a limited company), and how tidy your records are. Buy to let accountant
              fees for one flat with tidy records cover a small job. A buy to let limited company adds accounts
              and a Corporation Tax return, so the accountant cost is higher. Quarterly filing and one-off work,
              such as a disclosure or an incorporation plan, are quoted separately.
            </p>
            <p>
              So the cost of an accountant for rental property is set by the work, not by a rate card. You get the
              figure after the first call and before anything starts, and you are never signing up to an open
              hourly rate.
            </p>
          </Prose>
          <div className="mt-10 rounded-xl bg-white p-6 ring-1 ring-slate-200 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-8">
            <p className="text-base font-bold text-slate-900 sm:text-lg">Want a fixed quote for your own properties?</p>
            <Link
              href="#book"
              data-cta="comparison_book"
              data-cta-placement="fees"
              data-cta-goal="form"
              className={`${btnPrimary} mt-4 w-full sm:mt-0 sm:w-auto sm:shrink-0`}
            >
              Book a consultation
            </Link>
          </div>
        </div>
      </section>

      {/* `FaqSection` renders its own H2 and takes no id for it, so the
          anchor sits on the wrapper as before. */}
      <div id="faqs" className="scroll-mt-24">
        <FaqSection title="Questions landlords ask" faqs={faqs} className="bg-white py-12 sm:py-16 lg:py-20" />
      </div>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Read more</Eyebrow>
          <h2 id="related-guides-and-services" className={h2Class}>
            Related guides and services
          </h2>
          <Prose>
            <p>These are the guides we send landlords to most often.</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <InlineLink href="/landlord-tax">
                  Landlord tax explained: what you pay on UK rental property in 2026/27
                </InlineLink>
              </li>
              <li>
                <InlineLink href="/section-24">Section 24 explained: mortgage interest relief for landlords</InlineLink>
              </li>
              <li>
                <InlineLink href="/making-tax-digital-landlords">Making Tax Digital for landlords</InlineLink>
              </li>
              <li>
                <InlineLink href="/property-tax-rates">UK property tax rates 2026/27</InlineLink>
              </li>
              <li>
                <InlineLink href="/blog/property-accountant-services/how-much-does-a-property-accountant-cost">
                  How much does a property accountant cost?
                </InlineLink>
              </li>
              <li>
                <InlineLink href="/blog/property-accountant-services/what-does-a-property-accountant-do">
                  What does a property accountant do?
                </InlineLink>
              </li>
            </ul>
            <p>
              If your question is about the tax rather than the accounts, see our{" "}
              <InlineLink href="/services/property-tax-advice">property tax advice</InlineLink> service. If you
              want one firm for accounts and planning across residential and commercial property, see{" "}
              <InlineLink href="/services/property-accountant">
                property accountants for UK landlords and investors
              </InlineLink>
              .
            </p>
          </Prose>
        </div>
      </section>

      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          title="Speak to an accountant about your rental income"
          description="Tell us about your rental income: what you own and how it is held. We will look at what the current set-up is costing you, then quote a fixed fee."
          proofPoints={[
            { title: "Landlord and property tax only", detail: "Nothing else, so the rules are familiar ground" },
            { title: "Fixed fees, quoted upfront", detail: "You approve the fee before work starts" },
            { title: "A free first call", detail: "Nothing to sign and no pressure" },
          ]}
          footnote="If your position is already right, we will say so."
        />
      </div>

      {/* Free tools, the hero's secondary CTA target. 2026-10-09: it has no
          heading of its own (blueprint §3.3: kept blocks sit under one of the
          eleven H2s), so it sits straight after the lead panel, where the
          harness treats the tab labels as shared component text (check 11)
          rather than as this page's copy. The tabs render buttons, not links,
          so the per-tool links in the sections above keep this page's crawl
          path to the calculators (calculator-tabs-crawl-path.test.ts). */}
      <section id="free-tools" className="scroll-mt-24 bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <p className="text-sm sm:text-base text-slate-700">
            If you would like a number before you call, the calculators below are free to use.
          </p>
          <div className="mt-6 sm:mt-8">
            <CalculatorTabs />
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Location</Eyebrow>
          <h2 id="where-we-work" className={h2Class}>
            Where we work
          </h2>
          <div className="mt-8 grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-700">
              <p>
                We work with landlords in every part of the UK, and with UK landlords who now live abroad.
              </p>
              {/* house_positions.md §7: the 2027/28 property income rates apply
                  in England, Wales and Northern Ireland; Scotland is carved out. */}
              <p>
                Income tax on rent works the same way across England, Wales and Northern Ireland, while Scottish
                taxpayers pay Scottish rates. Scotland and Wales each have their own tax on buying property in
                place of stamp duty, and we handle both. If you live abroad and let here, our{" "}
                <InlineLink href="/services/non-resident-landlord">non-resident landlord service</InlineLink>{" "}
                covers the extra rules.
              </p>
            </div>
            <LocationMap />
          </div>
        </div>
      </section>
    </>
  );
}
