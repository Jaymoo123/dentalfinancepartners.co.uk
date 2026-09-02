import type { Metadata } from "next";
import { ProcessTimeline } from "@/components/property/ProcessTimeline";
import {
  Banknote,
  Building2,
  ClipboardList,
  DoorOpen,
  FileCheck2,
  Landmark,
  MessagesSquare,
  Scale,
  ShoppingBag,
  Users,
  Wallet,
} from "lucide-react";
import { CoverageCards, type CoverageItem } from "@/components/property/CoverageCards";
import { PromptMarquee, type Prompt } from "@/components/property/PromptMarquee";
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
  title: "SPV Company for UK Property | Set Up, Run & Close",
  description:
    "Everything about SPV companies for UK property: setting one up, SIC codes, costs, mortgages, running it and closing it. Every guide, one place.",
  alternates: { canonical: `${siteConfig.url}/spv-company` },
  openGraph: {
    title: "SPV Company for UK Property | The Complete Hub",
    description:
      "Setting up an SPV, SIC codes, costs, mortgages, running the company and closing it down. Every guide, one place.",
    url: `${siteConfig.url}/spv-company`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SPV Company for UK Property | The Complete Hub",
    description:
      "Setting up an SPV, SIC codes, costs, mortgages, running the company and closing it down. Every guide, one place.",
  },
};

/* The SPV question as landlords actually type it. EVEN count: the marquee
   zigzags and an odd set shows a seam where the loop joins. */
const spvPrompts: Prompt[] = [
  {
    tag: "I keep hearing SPV",
    text: "Every broker and forum says buy through an SPV. Is that just a limited company?",
    icon: MessagesSquare,
  },
  {
    tag: "I am about to buy",
    text: "The mortgage broker wants the company set up before they will even quote.",
    icon: ShoppingBag,
  },
  {
    tag: "I already own property",
    text: "Mine are in my own name. Can I move them in, and what does that cost?",
    icon: Building2,
  },
  {
    tag: "I am not sure it is worth it",
    text: "Is an SPV actually worth it for a landlord with two properties?",
    icon: Scale,
  },
  {
    tag: "I am stuck on the admin",
    text: "SIC codes, confirmation statements, ID checks. What does the company actually have to file?",
    icon: ClipboardList,
  },
  {
    tag: "I am thinking ahead",
    text: "If I sell up in ten years, how do I get the money out of the company?",
    icon: Wallet,
  },
];

/* The lifecycle, one line per stage, each linking to the page that owns the
   depth. This page is a router: no stage carries its own detail here. */
const lifecycle: CoverageItem[] = [
  {
    title: "Decide if a company is right",
    icon: Scale,
    body: "Section 24 is the reason SPVs exist, but a company is not automatically better. Our incorporation page walks the should-I decision and models it against your own figures.",
  },
  {
    title: "Form the company",
    icon: FileCheck2,
    body: "Name, SIC codes, Companies House filing, identity verification and the bank account. Our step-by-step formation guide walks the whole process.",
  },
  {
    title: "Structure and tax",
    icon: Landmark,
    body: "What makes a company an SPV, share structure, Corporation Tax and how the company is taxed year to year. The SPV guide covers this ground in full.",
  },
  {
    title: "Get the mortgage",
    icon: Banknote,
    body: "SPV mortgages price and underwrite differently from personal buy-to-let. The mortgage cluster covers lenders, rates and newly formed companies.",
  },
  {
    title: "Run it",
    icon: ClipboardList,
    body: "Allowable expenses, accounts, filings and the annual running cost of keeping the company compliant.",
  },
  {
    title: "Extract the profit",
    icon: Wallet,
    body: "Salary, dividends and director loans, and the order to draw them in. The extraction guide sets out the working.",
  },
  {
    title: "Sell up or close down",
    icon: DoorOpen,
    body: "Selling the property, selling the company, or closing it: dormant, strike-off or a members' voluntary liquidation.",
  },
];

/* Hub navigation: one card per cluster in the SPV programme. */
const hubs: CoverageItem[] = [
  {
    title: "Formation mechanics",
    icon: FileCheck2,
    body: "How to set up the company step by step, and what the first year costs, from the Companies House fee to the professional fees around it.",
  },
  {
    title: "SIC codes and Companies House",
    icon: ClipboardList,
    body: "Which SIC code an SPV uses, what lenders look for on the register, and the filings the company owes each year.",
  },
  {
    title: "Moving property you already own",
    icon: Building2,
    body: "Transferring personally held property into a company: the SDLT and CGT cost, phased routes for portfolios, and the step-by-step for a full incorporation.",
  },
  {
    title: "Running the company",
    icon: Landmark,
    body: "What a property company can deduct, what it costs to run, and the accounts and returns it files.",
  },
  {
    title: "Selling and closing",
    icon: DoorOpen,
    body: "Closing a property company the cheap way or the clean way, and what happens to property still inside it.",
  },
  {
    title: "Ownership structures",
    icon: Users,
    body: "Spouses, children, holding companies and joint ventures: who should hold the shares and why it matters later.",
  },
];

/* FAQ: the head-family questions only, answered briefly, depth linked out.
   No answer duplicates a page that owns the topic. */
const spvFaqs: FaqEntry[] = [
  {
    question: "What is an SPV company?",
    answer:
      "An SPV (special purpose vehicle) is an ordinary limited company set up to do one thing, usually holding rental property, with SIC codes and articles that say so. Lenders like them because the company's only business is the property. Our SPV guide explains what makes a company an SPV and how it is taxed year to year.",
  },
  {
    question: "How do I set up an SPV company for property?",
    answer:
      "You register a limited company at Companies House with property SIC codes, verify the directors' identities, then open a business bank account and register for Corporation Tax. The full walkthrough, including what lenders want to see on day one, is in our step-by-step formation guide.",
  },
  {
    question: "How much does an SPV company cost to set up?",
    answer:
      "The Companies House fee is £100 online (£124 by paper), and most landlords spend more than that on the pieces around it: an agent or accountant to form it, a registered office and the first year's compliance. Our formation cost guide breaks down the realistic year-one total.",
  },
  {
    question: "Is an SPV worth it for a landlord?",
    answer:
      "It depends on your tax band, your mortgage interest and how long you plan to hold: a company deducts interest in full where Section 24 restricts it personally, but it costs money to set up and run. Higher-rate, geared, long-term landlords benefit most. Our incorporation page models the decision against your own figures.",
  },
  {
    question: "Can I move properties I already own into an SPV?",
    answer:
      "Yes, but the transfer is treated as a market-value sale to the company, so stamp duty and capital gains tax can both arise. That cost is the biggest single factor in the decision. Start with our guide to transferring property into a limited company for how it works and what it costs.",
  },
  {
    question: "What is the difference between an SPV and a holding company?",
    answer:
      "An SPV holds the asset and does one job; a holding company owns other companies. Some portfolio landlords use both, with a holding company above one or more property SPVs. Our structure-planning guide covers when the extra layer earns its keep.",
  },
  {
    question: "Do SPV companies get normal buy-to-let mortgages?",
    answer:
      "They get limited-company buy-to-let products, which are underwritten differently and usually price a little higher, with personal guarantees from the directors. A newly formed SPV with no income can still borrow. Our SPV mortgage guide covers lenders, rates and criteria.",
  },
  {
    question: "What SIC code does a property SPV use?",
    answer:
      "There is a small standard set of property SIC codes, and lenders check them, so it is worth getting right at formation. Our SIC code guide lists the codes and which one fits which activity.",
  },
];

const lifecycleTimeline = [
  {
    n: "01",
    title: "Decide",
    body: "Model incorporate-versus-personal on your own figures. If the numbers say stay personal, stop here.",
  },
  {
    n: "02",
    title: "Form and open",
    body: "Register the company, verify identity, open the bank account and activate Corporation Tax.",
  },
  {
    n: "03",
    title: "Buy or transfer in",
    body: "Purchase through the company, or move existing property in with the SDLT and CGT cost modelled first.",
  },
  {
    n: "04",
    title: "Run and file",
    body: "Accounts, confirmation statement, Corporation Tax return and the annual running costs, every year.",
  },
  {
    n: "05",
    title: "Extract, then exit",
    body: "Draw profit tax-efficiently as you go, and when the time comes, sell or close the company deliberately rather than by default.",
  },
];

export default function SpvCompanyPage() {
  return (
    <>
      <section
        className={`relative flex items-center py-10 sm:py-12 lg:py-14 min-h-[320px] sm:min-h-[380px] lg:min-h-[400px] overflow-hidden ${heroCreamSurface}`}
      >
        <HeroBrickBackdrop tone="cream" />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "SPV Company" },
              ]}
            />
            <h1 className="mt-4 sm:mt-6 text-2xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-6xl">
              SPV company: set up, run and close a UK property company
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-slate-700">
              Everything about property SPVs in one place: whether to set one up, how to form it, the SIC
              codes and filings, the mortgage, the running costs, and how you eventually get out. Each stage
              links to the guide that covers it in full.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Link
                href="#book"
                data-cta="hero_book"
                data-cta-placement="hero"
                data-cta-goal="form"
                className={`${btnPrimary} bg-emerald-600 text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-3.5 text-center`}
              >
                Talk to a property tax specialist
              </Link>
              <Link
                href="#calculator"
                data-cta="hero_calculator"
                data-cta-placement="hero"
                className={`${btnOnCream} text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-3.5 text-center`}
              >
                Try the free calculators
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-5 sm:py-7">
        <div className={siteContainerLg}>
          <StatsCounter stats={siteStats} />
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <Eyebrow>The starting point</Eyebrow>
              <h2 className="text-2xl font-bold text-slate-900 text-balance sm:text-4xl">
                An SPV is just a limited company with one job
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 sm:mt-6 sm:text-lg">
                The structure is simple. The decisions around it are not: whether it beats owning personally,
                how to move property in without an avoidable tax bill, and how to run and eventually unwind
                it. This page routes each of those questions to the guide that answers it properly.
              </p>
              <p className="mt-6 text-base font-bold leading-relaxed text-slate-900 text-balance sm:text-lg">
                If one of these sounds like you, you are in the right place.
              </p>
              <Link
                href="#book"
                data-cta="triggers_book"
                data-cta-placement="triggers"
                data-cta-goal="form"
                className={`${btnPrimary} mt-6 w-full sm:mt-8 sm:w-auto`}
              >
                Talk to a specialist
              </Link>
            </div>
            <PromptMarquee prompts={spvPrompts} />
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>The lifecycle</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
            An SPV company from first thought to final filing
          </h2>
          <CoverageCards items={lifecycle} columns={3} />
          <Prose>
            <p>
              The detail lives one click away: start with{" "}
              <InlineLink href="/incorporation">should you incorporate at all</InlineLink>, then{" "}
              <InlineLink href="/blog/incorporation-and-company-structures/how-to-set-up-property-investment-company-uk-guide">
                how to set up a property investment company
              </InlineLink>{" "}
              and{" "}
              <InlineLink href="/blog/incorporation-and-company-structures/spv-company-formation-cost-uk">
                what an SPV costs to form
              </InlineLink>
              . The{" "}
              <InlineLink href="/blog/incorporation-and-company-structures/spv-property-investment-special-purpose-vehicle-guide">
                SPV guide
              </InlineLink>{" "}
              carries the structure and tax detail,{" "}
              <InlineLink href="/blog/property-finance/spv-mortgages-explained">SPV mortgages explained</InlineLink>{" "}
              covers the lending side, and{" "}
              <InlineLink href="/blog/incorporation-and-company-structures/extracting-cash-from-property-spv-extraction-sequence-pillar-2026-27">
                the extraction pillar
              </InlineLink>{" "}
              covers getting money out.
            </p>
          </Prose>
        </div>
      </section>

      <section id="calculator" className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl mb-8 sm:mb-12">
            <Eyebrow>Free calculators</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">Put your own numbers through it</h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600">
              The incorporation calculator models the upfront cost and break-even of moving property into a
              company. For the stamp duty on a purchase or a transfer to your own company, including the
              market-value rule, use the{" "}
              <InlineLink href="/calculators/stamp-duty-calculator">stamp duty calculator</InlineLink>.
            </p>
          </div>
          <IncorporationCostCalculator />
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>The guides</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">Every SPV question, routed</h2>
          <CoverageCards items={hubs} columns={3} />
          <Prose>
            <p>
              Formation:{" "}
              <InlineLink href="/blog/incorporation-and-company-structures/how-to-set-up-property-investment-company-uk-guide">
                the step-by-step guide
              </InlineLink>
              ,{" "}
              <InlineLink href="/blog/incorporation-and-company-structures/spv-company-formation-cost-uk">
                formation costs
              </InlineLink>
              ,{" "}
              <InlineLink href="/blog/incorporation-and-company-structures/spv-company-bank-account">
                the bank account
              </InlineLink>{" "}
              and{" "}
              <InlineLink href="/blog/incorporation-and-company-structures/registered-office-address-property-spv">
                the registered office
              </InlineLink>
              . Companies House:{" "}
              <InlineLink href="/blog/property-finance/sic-code-for-an-spv-property-company">
                SIC codes for an SPV
              </InlineLink>
              ,{" "}
              <InlineLink href="/blog/incorporation-and-company-structures/change-sic-code-companies-house-property-company">
                changing a SIC code
              </InlineLink>
              ,{" "}
              <InlineLink href="/blog/incorporation-and-company-structures/spv-company-name-rules-uk">
                company name rules
              </InlineLink>{" "}
              and{" "}
              <InlineLink href="/blog/incorporation-and-company-structures/spv-first-year-accounts-and-filing-timeline">
                the first-year filing timeline
              </InlineLink>
              . Landlord registration for companies in Scotland and Wales:{" "}
              <InlineLink href="/blog/incorporation-and-company-structures/landlord-registration-limited-company-scotland-wales">
                the devolved registers
              </InlineLink>
              . Transfers:{" "}
              <InlineLink href="/blog/incorporation-and-company-structures/how-to-transfer-property-into-limited-company-uk">
                how to transfer property into a limited company
              </InlineLink>
              ,{" "}
              <InlineLink href="/blog/incorporation-and-company-structures/sdlt-transfer-property-company-cost">
                the SDLT cost of a transfer
              </InlineLink>
              ,{" "}
              <InlineLink href="/blog/incorporation-and-company-structures/incorporation-existing-portfolios-phased-approach">
                the phased route for portfolios
              </InlineLink>{" "}
              and{" "}
              <InlineLink href="/blog/incorporation-and-company-structures/incorporating-property-portfolio-uk-2026">
                the full step-by-step incorporation
              </InlineLink>
              . Running it:{" "}
              <InlineLink href="/blog/incorporation-and-company-structures/limited-company-buy-to-let-allowable-expenses">
                what the company can deduct
              </InlineLink>
              ,{" "}
              <InlineLink href="/blog/incorporation-and-company-structures/property-company-running-costs-annual-budget">
                what it costs to run each year
              </InlineLink>{" "}
              and{" "}
              <InlineLink href="/blog/incorporation-and-company-structures/director-living-in-property-owned-by-limited-company">
                living in a company-owned property
              </InlineLink>
              . Moving out or on:{" "}
              <InlineLink href="/blog/incorporation-and-company-structures/transfer-property-to-limited-company-conveyancing">
                the conveyancing process
              </InlineLink>
              ,{" "}
              <InlineLink href="/blog/incorporation-and-company-structures/transfer-property-out-of-limited-company-to-personal-name">
                transferring property back out
              </InlineLink>
              ,{" "}
              <InlineLink href="/blog/incorporation-and-company-structures/selling-a-property-spv-share-sale-vs-asset-sale">
                selling the SPV: shares or assets
              </InlineLink>{" "}
              and{" "}
              <InlineLink href="/blog/incorporation-and-company-structures/how-to-close-a-property-limited-company">
                how to close a property limited company
              </InlineLink>
              . Structures:{" "}
              <InlineLink href="/blog/incorporation-and-company-structures/property-investment-company-structure-planning">
                structure planning
              </InlineLink>{" "}
              and{" "}
              <InlineLink href="/blog/property-types-and-specialist-tax/property-joint-venture-spv-structure-uk">
                joint-venture SPVs
              </InlineLink>
              . Mortgages:{" "}
              <InlineLink href="/blog/property-finance/buy-to-let-mortgages-guide">the mortgage guide</InlineLink>{" "}
              and{" "}
              <InlineLink href="/blog/property-finance/buy-to-let-limited-company-mortgage-options">
                limited-company mortgage options
              </InlineLink>
              . Non-resident landlords:{" "}
              <InlineLink href="/blog/non-resident-landlord-tax/offshore-company-owning-uk-property">
                offshore companies owning UK property
              </InlineLink>{" "}
              and{" "}
              <InlineLink href="/blog/non-resident-landlord-tax">the non-resident tax hub</InlineLink>.
              Taking money out:{" "}
              <InlineLink href="/calculators/property-company-extraction-calculator">
                the extraction calculator
              </InlineLink>
              .
            </p>
          </Prose>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>The shape of it</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">The whole journey, in order</h2>
          <ProcessTimeline steps={lifecycleTimeline} />
        </div>
      </section>

      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          title="Get the SPV decision modelled properly"
          description="Whether you are forming your first SPV or moving a portfolio in, we model the numbers on your actual figures and tell you plainly when a company is not worth it."
          proofPoints={[
            { title: "Property tax only", detail: "SPVs, Section 24, CGT and SDLT every day" },
            { title: "Fixed fees, quoted upfront", detail: "In writing, before any work starts" },
            { title: "24-hour response", detail: "Usually the same working day" },
          ]}
          footnote="No obligation and no hard sell. If staying personal is right for you, we will say so."
        />
      </div>

      <FaqSection eyebrow="FAQs" title="SPV company questions landlords ask" faqs={spvFaqs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqPageJsonLd(spvFaqs)) }}
      />
    </>
  );
}
