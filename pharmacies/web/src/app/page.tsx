import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  btnPrimary,
  btnOnDark,
  focusRing,
  siteContainerLg,
} from "@/components/ui/layout-utils";
import { pharmacyHubs } from "@/data/pharmacies-hubs";
import { buildFaqJsonLd, buildWebsiteJsonLd } from "@/lib/schema";
import { LeadForm } from "@/components/forms/LeadForm";
import { getAllPosts, getCategorySlug } from "@/lib/blog";
import PharmaciesBackdrop from "@/components/layout/PharmaciesBackdrop";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { FaqSection } from "@accounting-network/web-shared/design/primitives/FaqSection";
import { StatsCounter } from "@accounting-network/web-shared/design/marketing/StatsCounter";
import { ScrollGlowGroup } from "@accounting-network/web-shared/design/marketing/ScrollGlowGroup";
import { CoverageCards } from "@accounting-network/web-shared/design/marketing/CoverageCards";
import { NumberedReasons } from "@accounting-network/web-shared/design/marketing/NumberedReasons";
import { TestimonialsSection } from "@accounting-network/web-shared/design/marketing/TestimonialsSection";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { ArrowRight, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name} | Specialist Accountants for UK Pharmacy Owners` },
  description:
    "Specialist accountants for UK community pharmacy owners: NHS contract income, VAT retail schemes, buying and selling a pharmacy, and pharmacy group tax. Speak to a specialist.",
  alternates: { canonical: siteConfig.url },
};

// ponytail: HP-verified figures only; all linked to gov.uk / NHS source
//
// W5 (2026-10-07): `target: 0` on every row and `value` carrying the literal.
// None of these four figures is a number a counter can reach ("Zero-rated",
// "~2 months", "18%", "0.5% vs 5%"), and StatsCounter.tsx:63 returns the
// `value` span verbatim whenever `value` is defined, so `target` is never
// read. Nothing counts up on this band and that is correct: forcing a numeric
// target here would publish a figure the page does not claim.
const keyStats = [
  {
    target: 0,
    value: "Zero-rated",
    label: "NHS-dispensed prescription drugs (VAT treatment)",
    href: "https://www.gov.uk/guidance/health-professionals-pharmaceutical-products-and-vat-notice-70157",
  },
  {
    target: 0,
    value: "~2 months",
    label: "FP34 cash-flow lag from submission to NHSBSA payment",
    href: "https://www.nhsbsa.nhs.uk/pharmacies-gp-practices-and-appliance-contractors/submitting-prescriptions",
  },
  {
    target: 0,
    value: "18%",
    label: "BADR CGT rate for 2026/27 on qualifying pharmacy disposals up to £1m lifetime limit",
    href: "https://www.gov.uk/business-asset-disposal-relief",
  },
  {
    target: 0,
    value: "0.5% vs 5%",
    label: "Stamp duty on shares vs SDLT on property in asset deals",
    href: "https://www.gov.uk/tax-buy-shares",
  },
];

const whatWeActuallyFix = [
  {
    title: "Wrong VAT retail scheme overpaying VAT",
    body: (
      <>
        <a
          href="https://www.gov.uk/hmrc-internal-manuals/vat-retail-schemes"
          className="underline underline-offset-2"
        >
          Retail schemes are the practical mechanic for splitting zero-rated and standard-rated
          takings
        </a>{" "}
        in a pharmacy that cannot itemise every sale. The wrong scheme systematically overpays
        VAT, often for years before anyone notices. Because NHS-dispensed prescription drugs are{" "}
        <a
          href="https://www.gov.uk/guidance/health-professionals-pharmaceutical-products-and-vat-notice-70157"
          className="underline underline-offset-2"
        >
          zero-rated
        </a>{" "}
        and most OTC retail is standard-rated, a pharmacy almost always reclaims more input VAT
        than a pure retailer expects. The scheme selection matters.
      </>
    ),
  },
  {
    title: "FP34 working-capital surprises",
    body: (
      <>
        Pharmacy income is{" "}
        <a
          href="https://www.england.nhs.uk/community-pharmacy-contractual-framework/"
          className="underline underline-offset-2"
        >
          reimbursement and remuneration under the Community Pharmacy Contractual Framework
        </a>
        , not shop takings. The{" "}
        <a
          href="https://www.nhsbsa.nhs.uk/pharmacies-gp-practices-and-appliance-contractors/submitting-prescriptions"
          className="underline underline-offset-2"
        >
          FP34 submission cycle
        </a>{" "}
        creates a roughly two-month lag between prescription dispensed and cash received. New
        owners and buyers frequently undermodel this working-capital requirement and arrive at
        completion underfunded.
      </>
    ),
  },
  {
    title: "Category M margin variance no one is analysing",
    body: (
      <>
        <a
          href="https://www.nhsbsa.nhs.uk/pharmacies-gp-practices-and-appliance-contractors/drug-tariff"
          className="underline underline-offset-2"
        >
          Drug Tariff prices and Category M clawbacks
        </a>{" "}
        set gross margin centrally and adjust it retrospectively. That makes margin variance
        analysis, not just bookkeeping, the core monthly job for a pharmacy. Most generalist
        accountants treat dispensing income as a single line; we reconcile reimbursement to the
        payment schedule and flag variance.
      </>
    ),
  },
  {
    title: "Associated-company CT rate loss for group owners",
    body: (
      <>
        The{" "}
        <a
          href="https://www.gov.uk/corporation-tax-rates"
          className="underline underline-offset-2"
        >
          corporation tax small profits rate (19%) threshold of £50,000
        </a>{" "}
        is divided by the number of associated companies. A four-pharmacy group with separate
        companies has a threshold of £12,500 per entity before the main 25% rate begins to
        phase in. Owners expanding without restructuring advice can pay materially more
        corporation tax than they need to.
      </>
    ),
  },
];

const calculatorLinks = [
  {
    title: "Pharmacy purchase affordability calculator",
    body: "Model the purchase price you can service at different NHS contract income levels, deposit sizes and finance rates. A scenario tool that ends at 'speak to us before exchanging contracts'.",
    href: "/calculators/pharmacy-purchase-affordability",
    cta: "home_tool_affordability",
  },
  {
    title: "FP34 cash-flow estimator",
    body: "Estimate the working-capital requirement created by the FP34 submission-to-payment lag. Helps buyers and new owners model the cash cycle before it becomes a problem.",
    href: "/calculators/pharmacy-fp34-cash-flow-estimator",
    cta: "home_tool_fp34",
  },
  {
    title: "Locum take-home comparator",
    body: "Compare estimated net income as a self-employed sole trader versus through a limited company for locum pharmacists. States its simplifications and routes complex IR35 situations to specialist advice.",
    href: "/calculators/locum-take-home-comparator",
    cta: "home_tool_locum",
  },
];

const whySpecialist = [
  {
    area: "NHS contract income and FP34",
    detail:
      "We account for NHS reimbursement and remuneration as separate income streams, reconcile FP34 submissions to NHSBSA payments, and model the working-capital lag. A generalist treats dispensing income as a single bank receipt.",
  },
  {
    area: "VAT retail scheme selection",
    detail:
      "NHS-dispensed prescription drugs are zero-rated; most OTC retail is standard-rated. We select and apply the correct retail scheme for your sales mix so you reclaim the input VAT you are entitled to, rather than the lower figure a wrong-scheme calculation produces.",
  },
  {
    area: "Drug Tariff and Category M margin",
    detail:
      "Gross margin is set centrally by the Drug Tariff and adjusted retrospectively by Category M clawbacks. We run monthly margin variance analysis, not just end-of-year bookkeeping.",
  },
  {
    area: "Buying and selling: share vs asset structure",
    detail:
      "An asset purchase attracts SDLT on property at non-residential rates (up to 5%); a share purchase attracts 0.5% stamp duty on shares but inherits the company's history. We model both structures before heads of terms are signed.",
  },
  {
    area: "Business Asset Disposal Relief",
    detail:
      "BADR charges CGT at 18% for 2026/27 on qualifying disposals up to the £1m lifetime limit (per person). The qualifying conditions must be verified before exchange; timing a pharmacy sale around BADR rate changes is real money.",
  },
  {
    area: "Multi-store group CT and VAT",
    detail:
      "The corporation tax small profits rate threshold (£50,000) is divided by associated companies. A pharmacy group without a reviewed structure pays more tax than it needs to and creates intercompany complexity that a generalist rarely untangles.",
  },
];

const testimonials = [
  {
    quote:
      "Our previous accountant filed the VAT returns using the standard retail scheme. When the position was reviewed we discovered the wrong scheme had been applied for three years. The corrected position recovered a meaningful sum in input VAT we had overpaid. The scheme selection was the issue, not the bookkeeping.",
    attribution:
      "Single-store pharmacy owner, South East England, VAT retail scheme review",
  },
  {
    quote:
      "I was buying my first pharmacy and underestimated how much working capital I needed to cover the period between dispensing and the NHSBSA paying the FP34. The cash-flow model built as part of the purchase review identified the gap before completion. I would have arrived at the till underfunded.",
    attribution:
      "First-time pharmacy buyer, Midlands, purchase accounting and FP34 cash-flow review",
  },
  {
    quote:
      "We had three pharmacies in separate companies and assumed we were getting the 19% small profits rate. The associated-company rules meant the threshold was divided three ways and we had been paying more corporation tax than we needed to. Restructuring the group sorted it.",
    attribution:
      "Pharmacy group owner, North West England, group structure and corporation tax review",
  },
];

/**
 * The composite disclaimer, byte-identical to the string this page published
 * before the port (pre-port page.tsx:740-743, owner-ruled LEFT AS IS on
 * 2026-09-29). It is passed as TestimonialsSection's `description` rather than
 * its `footnote`, deliberately and against the letter of the W5 brief
 * (PHASE2-6_PACKAGES.md A4 band 11), for two measured reasons:
 *   1. `description` is where this sentence sits TODAY - directly under the h2,
 *      above the quotes. `footnote` renders it below the grid, which moves
 *      published copy the owner ruled on.
 *   2. `description` has a DEFAULT (TestimonialsSection.tsx:51) reading
 *      "Anonymised feedback from landlords and investors we have worked with."
 *      - Property's landlord copy. Passing the disclaimer as `footnote` and
 *      omitting `description` would publish that sentence on a pharmacy site.
 *      Passing `description=""` would leave an empty paragraph with its own
 *      margin. Neither is acceptable; this is the only mount that is both
 *      default-free and position-preserving.
 */
const TESTIMONIAL_DISCLAIMER =
  "Composite accounts based on patterns across our client base. Names, amounts and specific details anonymised. The situations described are real.";

const faqs: { question: string; answer: string }[] = [
  {
    question: "Do pharmacies pay VAT?",
    answer:
      "It depends on the supply. NHS-dispensed prescription drugs are zero-rated for VAT. Most over-the-counter retail sales are standard-rated. Private pharmacist services may be exempt or standard-rated depending on the service line. A community pharmacy is a VAT-mixed business, and retail schemes are the practical mechanic for splitting zero-rated and standard-rated takings. The result is that most pharmacies reclaim more input VAT than a pure retailer expects.",
  },
  {
    question: "Why does my pharmacy reclaim more VAT than my old accountant expected?",
    answer:
      "Because NHS-dispensed prescription drugs are zero-rated, the input VAT on goods and costs attributable to dispensing is recoverable even though there is no output VAT charged on those sales. If the retail scheme apportions too much turnover to standard-rated sales, the reclaimable input VAT is understated. The right scheme, applied to your actual sales mix, recovers what you are entitled to.",
  },
  {
    question: "How does the FP34 payment cycle affect my cash flow?",
    answer:
      "Prescriptions are submitted monthly via the FP34 bundle. The NHSBSA processes the submission and pays roughly two months later, with an advance on account. The gap between dispensing and cash receipt creates a working-capital requirement that new owners frequently underestimate, particularly when volumes are growing or the pharmacy is newly acquired. We model the FP34 lag explicitly as part of purchase reviews and ongoing cashflow planning.",
  },
  {
    question: "Is the pharmacy or the NHS contract the thing I am actually buying?",
    answer:
      "The NHS contract is the asset. Market entry for community pharmacies in England is regulated under the NHS (Pharmaceutical and Local Pharmaceutical Services) Regulations 2013. Without the NHS contract, the premises are just a retail unit. Due diligence on a pharmacy acquisition must verify the contract, prescription volumes, and NHS payment history before exchange.",
  },
  {
    question: "Do I need a specialist accountant to buy a pharmacy?",
    answer:
      "Yes. A pharmacy acquisition involves NHS contract due diligence, purchase price allocation between goodwill and assets, VAT treatment on the transaction, stamp duty or SDLT depending on structure, and post-acquisition accounting setup. The financial due diligence a generalist runs for a generic business acquisition misses pharmacy-specific items. See the buying a pharmacy hub for more detail.",
  },
  {
    question: "How much does a pharmacy accountant cost?",
    answer:
      "Fees depend on the size and complexity of the pharmacy, the services required, and whether a transaction is involved. We do not publish standard prices because the right scope varies too much between a single-store owner, a first-time buyer, and a multi-pharmacy group. Contact us with a summary of your situation and we will explain what a typical engagement looks like.",
  },
];

/** Band 13's proof rows, one-for-one from the pre-port tick list (page.tsx:814-830). */
const ctaProofPoints = [
  {
    title: "Pharmacy clients only",
    detail: "We do not take general commercial, property, or unrelated clients",
  },
  {
    title: "24-hour response",
    detail: "Usually the same working day",
  },
  {
    title: "All conversations are confidential",
    detail: "We never discuss one client's position with another",
  },
  {
    title: "England (NHS contract) plus UK-wide (HMRC tax law)",
    detail:
      "Scotland, Wales and Northern Ireland NHS contract variants are flagged where they change the outcome",
  },
];

export default function HomePage() {
  /**
   * Band 14's three-post rail. `getAllPosts` already returns newest-first
   * (lib/blog.ts:51) and W2 owns that file; this page only reads the frozen
   * exported shape. `getCategorySlug` is the same helper /blog uses, so the
   * three hrefs resolve to real routes rather than a guessed slug.
   */
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildWebsiteJsonLd() }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(faqs) }}
      />

      {/* Band 1. HERO. Markers 1 (animate-ping), 3 (PharmaciesBackdrop) and 4
          (rounded-full) all land here. `.ground-dark` rebinds --focus-ring to
          white for everything inside: measured white on primary-950, the brand hex, =
          12.18, and the ring lands on the band ground two pixels outside each
          control (outline-offset-2), so it is that pair that matters. There is
          no light-ground card inside this section, which is the condition
          globals.css attaches to the class. */}
      <section className="ground-dark relative flex items-center min-h-[520px] sm:min-h-[640px] lg:min-h-[720px] overflow-hidden bg-primary-950">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-primary-800/70 to-slate-950/80" />
        <PharmaciesBackdrop patternId="pharmacies-shelving-hero" />
        <div className={`${siteContainerLg} relative z-10 py-16 sm:py-20 w-full`}>
          <div className="max-w-3xl">
            {/* Shape only: the chip text is still `siteConfig.name`, unchanged.
                A square chip became the rounded-full pill with a live dot that
                the generalist and Property heroes carry. */}
            <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-teal-200 shadow-lg backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary-400" />
              </span>
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
              {siteConfig.name}
            </div>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white text-balance sm:text-5xl lg:text-7xl">
              Specialist accountants for UK pharmacy owners.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-teal-100 sm:text-xl">
              NHS contract income, VAT retail schemes, FP34 cash-flow planning, and the buying and
              selling moment. We work exclusively with pharmacy owners, buyers, sellers, and
              multi-store groups. Generalist firms handle your bookkeeping; we handle the parts of
              pharmacy finance that need specialist knowledge.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              {/* DECLINED for this one control: `btnPrimary` from
                  src/components/ui/layout-utils.ts:57 (the kit recipe at
                  packages/web-shared/design/layout-utils.ts:69). Its ground is
                  `--btn-ground`, the brand hex, which is this band's own ground:
                  contrast 1.00, an invisible button. The W5 brief's "buttons to
                  btnPrimary / btnOnDark" row is a false premise on a site whose
                  brand hex is the hero ground (locked rule 22). The white-on-
                  brand recipe below is the page's own shipped treatment, with
                  the kit's geometry (min-h-12, rounded-xl, px-8 py-3.5) adopted
                  so the two hero buttons match. White on primary-950 = 12.18;
                  primary-950 label on white = 12.18. */}
              <Link
                href="/contact"
                data-cta="home_hero_primary"
                data-cta-placement="hero"
                data-cta-goal="form"
                className={`inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-6 py-3.5 text-base font-bold text-primary-950 transition-colors hover:bg-primary-50 active:bg-primary-100 sm:px-10 sm:py-4 sm:text-lg ${focusRing}`}
              >
                Speak to a pharmacy accountant
              </Link>
              <Link
                href="/for/buying-a-pharmacy"
                data-cta="home_hero_secondary"
                data-cta-placement="hero"
                data-cta-goal="hub"
                className={`${btnOnDark} px-6 py-3.5 text-base sm:px-10 sm:py-4 sm:text-lg`}
              >
                Buying a pharmacy
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-2.5 text-sm text-teal-300">
              <ShieldCheck className="h-4 w-4 flex-shrink-0" aria-hidden />
              <span className="font-medium">
                Community pharmacy owners, buyers, sellers, groups, and locum pharmacists. England
                and Wales (NHS contract) + UK-wide (HMRC tax law).
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Band 2. KEY FIGURES. Marker 2 (StatsCounter). Ground moves from the
          literal 1a5c6e to `primary-800` 185d76, the nearest declared ramp
          step (no hex outside globals.css, locked rule 5). Measured on that
          ground: the white figure 7.33 (PASS), the slate-300 label `tone="dark"`
          renders 4.93 (PASS). `.ground-dark` for the four figure links' ring. */}
      <section
        className="ground-dark bg-primary-800 py-8 sm:py-10"
        aria-label="Key pharmacy finance figures"
      >
        <div className={siteContainerLg}>
          <StatsCounter stats={keyStats} tone="dark" columns={4} />
        </div>
      </section>

      {/* Band 3. INTRO STRIP. The paragraph is verbatim.
          DECLINED: packages/web-shared/design/marketing/ProblemStatement.tsx:33-56.
          It hardcodes Property's landlord copy ("Your rent went up. Your profit
          didn't.", the Section 24 paragraph) and a "Book free consultation"
          button, and exposes no copy props at all. Mounting it would publish
          four sentences about mortgage interest relief on a pharmacy homepage.
          Kit gap K6 in the plan; no gap is being requested, this is a decline. */}
      <section className="border-b border-slate-200 bg-slate-50 py-10 sm:py-12">
        <div className={siteContainerLg}>
          <p className="max-w-3xl text-lg leading-relaxed text-slate-700 sm:text-xl">
            A community pharmacy is not a standard retail business. Income is reimbursement and
            remuneration under the NHS contract, not till takings. VAT applies differently to
            dispensing and OTC sales. The purchase price is dominated by goodwill attached to the
            NHS contract. None of this is exotic, but all of it is specific, and a generalist
            accountant who encounters it once a year handles it differently from one who works with
            it every week.
          </p>
        </div>
      </section>

      {/* Band 4. WHO WE WORK WITH. `CoverageCards` ADOPTED: the hospitality-era
          decline is stale on both halves (CoverageCards.tsx:31 `href`, :65
          `html`). Re-derived on source today: every `hub.intro` in
          src/data/pharmacies-hubs.ts is a plain string, so `html` is not needed
          and is left off; `href` makes each card an <a>, which is what holds
          this band's five links in the floor.
          `glow` is left OFF deliberately: the glow surface at
          CoverageCards.tsx:88 hardcodes rgba(5,150,105,...) - Property's
          emerald - in its box-shadow, which no prop can override. Bands 5 and 7
          get their sequence from `ScrollGlowGroup` instead, whose keyframes read
          this site's own --brand-glow* channels. Reported to M1. */}
      <section className="border-b border-slate-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Who we work with</Eyebrow>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Five pharmacy audiences, each with a different tax and finance picture.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            The questions facing a single-store owner running an NHS contract differ from those
            facing a first-time buyer, a seller planning an exit, a group operator managing
            associated-company rules, or a locum pharmacist sorting Self Assessment. Choose your
            situation for audience-specific guidance.
          </p>
          <CoverageCards
            columns={3}
            tone="slate"
            items={pharmacyHubs.map((hub) => ({
              title: hub.title,
              body: hub.intro,
              href: `/for/${hub.slug}`,
            }))}
          />
        </div>
      </section>

      {/* Band 5. NHS CONTRACT ECONOMICS. Dark, so `.ground-dark` and
          `<Eyebrow onDark>` (slate-300 on primary-950 = 8.20, PASS; the rule
          mark lifts to primary-400). The four cards go through
          `ScrollGlowGroup`: the card-glow keyframe animates border-color, and
          these cards already carry `border border-white/20`, so the sequence
          has a border to resolve to. */}
      <section className="ground-dark border-b border-slate-200 bg-primary-950 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
            <div>
              <Eyebrow onDark>NHS contract economics</Eyebrow>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-white text-balance sm:text-3xl lg:text-4xl">
                Income is contract-driven, not till-driven.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-teal-100 sm:text-lg">
                Pharmacy revenue is{" "}
                <a
                  href="https://www.england.nhs.uk/community-pharmacy-contractual-framework/"
                  className="underline underline-offset-2 text-teal-200 hover:text-white"
                >
                  reimbursement and remuneration under the Community Pharmacy Contractual Framework
                </a>
                . Drug Tariff prices and service fees, not shop takings, determine what you are
                paid. No generalist accountant models this.
              </p>
              <p className="mt-4 text-base leading-relaxed text-teal-100">
                The{" "}
                <a
                  href="https://www.nhsbsa.nhs.uk/pharmacies-gp-practices-and-appliance-contractors/submitting-prescriptions"
                  className="underline underline-offset-2 text-teal-200 hover:text-white"
                >
                  FP34 submission cycle
                </a>{" "}
                means cash arrives roughly two months after prescriptions are dispensed, with an
                advance on account. That lag is a structural working-capital requirement, not a
                one-off timing difference. At the same time,{" "}
                <a
                  href="https://www.nhsbsa.nhs.uk/pharmacies-gp-practices-and-appliance-contractors/drug-tariff"
                  className="underline underline-offset-2 text-teal-200 hover:text-white"
                >
                  Drug Tariff and Category M clawbacks
                </a>{" "}
                adjust gross margin retrospectively, which means margin variance analysis (not just
                bookkeeping) is the core monthly job.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/services/nhs-payment-reconciliation-fp34"
                  className={`inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-primary-950 transition-colors hover:bg-primary-50 ${focusRing}`}
                >
                  FP34 reconciliation service
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/services/pharmacy-benchmarking-margin"
                  className={`inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/20 ${focusRing}`}
                >
                  Margin benchmarking
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <ScrollGlowGroup className="space-y-4" delay={0.2}>
              {[
                {
                  label: "You are new to NHS contract income",
                  body: "We set up the accounting structure from scratch, separating reimbursement from remuneration and flagging the FP34 lag before it becomes a cash-flow problem.",
                },
                {
                  label: "Your margin has moved without explanation",
                  body: "Category M price changes and Drug Tariff clawbacks adjust gross margin retrospectively. We reconcile the NHSBSA payment schedule to your dispensing records and identify where margin has leaked.",
                },
                {
                  label: "You are planning a buying or selling decision",
                  body: "NHS contract income is the primary driver of pharmacy valuation. We model reimbursement trends, FP34 history, and Category M exposure before you sign heads of terms.",
                },
                {
                  label: "You want to understand Pharmacy First income",
                  body: "Service income under Pharmacy First and similar schemes is a separately accounted revenue line with its own fee structure. We account for it correctly alongside core dispensing income.",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-white/20 bg-white/5 p-5 sm:p-6"
                >
                  <div className="font-bold text-white">{item.label}</div>
                  <p className="mt-2 text-sm leading-relaxed text-teal-200">{item.body}</p>
                </div>
              ))}
            </ScrollGlowGroup>
          </div>
        </div>
      </section>

      {/* Band 6. VAT ON MIXED SUPPLIES.
          DECLINED: packages/web-shared/design/marketing/DrawnTickList.tsx:33.
          It takes `items: string[]`, one short claim per tick. This band
          publishes two paragraphs and a two-column table (supply type / VAT
          treatment). The only list here is that table, and a single-string tick
          row cannot carry a pair: flattening "NHS-dispensed prescription drugs"
          and "Zero-rated" into one tick would author the joining words, and
          dropping either column would delete published copy. Measured, not
          stylistic: 5 rows, 2 columns, 0 single-string claims on this band. */}
      <section className="border-b border-slate-200 bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
            <div>
              <Eyebrow>VAT on mixed supplies</Eyebrow>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 text-balance sm:text-3xl lg:text-4xl">
                The VAT picture most generalists miss.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
                <a
                  href="https://www.gov.uk/guidance/health-professionals-pharmaceutical-products-and-vat-notice-70157"
                  className="underline underline-offset-2"
                >
                  NHS-dispensed prescription drugs are zero-rated
                </a>{" "}
                for VAT. Most OTC retail sales are standard-rated. Private pharmacist services may
                be exempt or standard-rated depending on the service line. That mix means a
                pharmacy almost always reclaims more input VAT than a generalist expects.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                <a
                  href="https://www.gov.uk/hmrc-internal-manuals/vat-retail-schemes"
                  className="underline underline-offset-2"
                >
                  Retail schemes split the takings
                </a>{" "}
                where a pharmacy cannot itemise every sale. Choosing the wrong scheme
                systematically overpays VAT. We map your sales mix, select the correct scheme,
                and review whether the scheme in use has been right for your business.
              </p>
              <div className="mt-8">
                <Link href="/services/pharmacy-vat-retail-schemes" className={btnPrimary}>
                  VAT retail scheme service
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
              <table className="w-full min-w-[24rem] text-left text-sm">
                <caption className="sr-only">VAT treatment of common pharmacy supplies</caption>
                <thead>
                  <tr className="bg-primary-950 text-white">
                    <th scope="col" className="px-4 py-3 font-bold text-xs uppercase tracking-wider sm:px-5 sm:py-4">
                      Supply type
                    </th>
                    <th scope="col" className="px-4 py-3 font-bold text-xs uppercase tracking-wider sm:px-5 sm:py-4">
                      VAT treatment
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { supply: "NHS-dispensed prescription drugs", treatment: "Zero-rated" },
                    { supply: "OTC retail medicines and health products", treatment: "Standard-rated" },
                    { supply: "Private pharmacist services", treatment: "Exempt or standard-rated: map by service line" },
                    { supply: "Input VAT on dispensing costs", treatment: "Reclaimable against zero-rated outputs" },
                    { supply: "Retail scheme apportionment", treatment: "Splits zero-rated and standard-rated takings" },
                  ].map((row, i) => (
                    <tr key={row.supply} className={`border-b border-slate-200 last:border-0 ${i % 2 === 1 ? "bg-slate-50" : "bg-white"}`}>
                      <th scope="row" className="px-4 py-3.5 font-semibold text-slate-900 sm:px-5 sm:py-4">
                        {row.supply}
                      </th>
                      <td className="px-4 py-3.5 text-slate-600 sm:px-5 sm:py-4">{row.treatment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Band 7. BUYING AND SELLING. `ScrollGlowGroup` over the existing cards.
          DECLINED here: packages/web-shared/design/marketing/CoverageCards.tsx:31.
          `href` makes the WHOLE card one link, and each of these three cards
          publishes TWO destinations (the hub and a service or calculator), six
          links in this band. Adopting CoverageCards would drop the band from 6
          links to 3 and the route floor with it (locked rule 20). Measured, not
          stylistic. */}
      <section className="border-b border-slate-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Buying and selling a pharmacy</Eyebrow>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-slate-900 text-balance sm:text-4xl">
            The highest-value moment in a pharmacy owner&apos;s career.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Market entry for community pharmacies in England is regulated under the{" "}
            <a
              href="https://www.legislation.gov.uk/uksi/2013/349/contents"
              className="underline underline-offset-2"
            >
              NHS (Pharmaceutical and Local Pharmaceutical Services) Regulations 2013
            </a>
            . The NHS contract, not the shop, is the asset. Share versus asset purchase structure,
            goodwill treatment,{" "}
            <a
              href="https://www.gov.uk/business-asset-disposal-relief"
              className="underline underline-offset-2"
            >
              Business Asset Disposal Relief
            </a>{" "}
            at 18% for 2026/27, and stamp duty versus SDLT: these are decisions that cannot be
            undone after contracts are signed.
          </p>
          <ScrollGlowGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Buying a pharmacy",
                body: "Purchase price allocation, goodwill and NHS contract due diligence, share vs asset structure, SDLT, and post-acquisition accounting setup.",
                href: "/for/buying-a-pharmacy",
                service: "/services/pharmacy-purchase-accounting",
                serviceLabel: "Purchase accounting service",
              },
              {
                title: "Selling a pharmacy",
                body: "BADR eligibility review, CGT computation, asset vs share sale modelling, and pre-sale restructuring where the company structure needs work before exit.",
                href: "/for/selling-a-pharmacy",
                service: "/services/pharmacy-sale-cgt-badr",
                serviceLabel: "Sale and BADR service",
              },
              {
                title: "Valuation and goodwill",
                body: "Goodwill dominates pharmacy pricing. Corporation tax relief on goodwill is restricted on a company purchase. We advise on valuation methodology and purchase price allocation.",
                href: "/services/pharmacy-valuation-goodwill",
                service: "/calculators/pharmacy-purchase-affordability",
                serviceLabel: "Purchase affordability calculator",
              },
            ].map((item) => (
              <div
                key={item.href}
                className="flex flex-col rounded-xl border border-slate-200 bg-slate-50 p-6 transition-shadow sm:p-7"
              >
                <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500 flex-1">{item.body}</p>
                <div className="mt-5 flex flex-col gap-2">
                  <Link
                    href={item.href}
                    className={`group flex items-center justify-between rounded-lg border border-primary-950 bg-white px-4 py-2.5 text-xs font-semibold text-primary-950 transition-colors hover:bg-primary-950 hover:text-white ${focusRing}`}
                  >
                    View the hub
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <Link
                    href={item.service}
                    className={`group flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-medium text-slate-600 transition-colors hover:border-primary-950 hover:text-primary-950 ${focusRing}`}
                  >
                    {item.serviceLabel}
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </ScrollGlowGroup>
        </div>
      </section>

      {/* Band 8. THE MOMENTS THAT BRING PEOPLE TO US.
          DECLINED: packages/web-shared/design/marketing/ProcessTimeline.tsx:29.
          It takes `steps: {n, title, body}[]` and renders a progress rail. These
          four are not a sequence - they are four independent problems - and the
          `n` field is required, so mounting it would mean authoring "01".."04"
          labels that assert an order the copy does not publish. (`html` at :33
          exists, so the escaped-markup half of the older decline IS stale; this
          decline is the `n` field, not the markup.)
          DECLINED: packages/web-shared/design/primitives/page-blocks.tsx:104
          `CardStack`, and CoverageCards.tsx:65, both via their `html` prop:
          `body` must be a STRING. Every `whatWeActuallyFix` body above is a JSX
          fragment with four real <a> children. Hand-serialising published prose
          into an HTML string to satisfy the prop risks entity drift on copy the
          owner froze. `ScrollGlowGroup` gives this band its depth instead. */}
      <section className="border-b border-slate-200 bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>The moments that bring people to us</Eyebrow>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-slate-900 text-balance sm:text-4xl">
            Four pharmacy-specific problems a generalist misses.
          </h2>
          <ScrollGlowGroup className="mt-10 sm:mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
            {whatWeActuallyFix.map((item) => (
              <article
                key={item.title}
                className="rounded-xl border border-slate-200 border-l-4 border-l-primary-950 bg-white p-6 shadow-sm sm:p-8"
              >
                <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-slate-600">{item.body}</p>
              </article>
            ))}
          </ScrollGlowGroup>
        </div>
      </section>

      {/* Band 9. FREE TOOLS + DATA ASSET. Two Eyebrows, and `data-cta` on each
          of the four links. Every id here is NEW live segmentation (the baseline
          census is three triples, all chrome): home_tool_*, home_research_*.
          Each sits on the <a>/<Link> control, never on a wrapper div. */}
      <section className="border-b border-slate-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
            <div>
              <Eyebrow>Free tools</Eyebrow>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 text-balance sm:text-3xl lg:text-4xl">
                Three calculators for the questions pharmacy owners ask most.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
                All three calculators are scenario and estimate tools. They state their
                simplifications openly and end at &ldquo;your situation has specific complexity,
                speak to us&rdquo;. They never produce a filing-ready figure and never require
                sign-up or store data.
              </p>
              <div className="mt-8 space-y-3">
                {calculatorLinks.map((calc) => (
                  <Link
                    key={calc.href}
                    href={calc.href}
                    data-cta={calc.cta}
                    data-cta-placement="home_tools"
                    data-cta-goal="tool"
                    className={`group flex items-start justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 transition-all hover:border-primary-950 hover:shadow-sm ${focusRing}`}
                  >
                    <div>
                      <div className="text-sm font-bold text-slate-900 group-hover:text-primary-950 transition-colors">
                        {calc.title}
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500">{calc.body}</p>
                    </div>
                    <ArrowRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400 group-hover:text-primary-950 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <Eyebrow>Data asset</Eyebrow>
              <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-900 text-balance sm:text-2xl">
                UK Community Pharmacy Openings and Closures Index.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                A regularly updated index tracking community pharmacy openings and closures across
                England, drawing on NHS Business Services Authority openings and closures data and
                Companies House register records.
                The index carries its methodology and limitations prominently. It is a
                market-awareness resource for pharmacy buyers, sellers, and operators, not a
                regulatory filing or investment advice.
              </p>
              <div className="mt-6 space-y-3">
                <Link
                  href="/research/pharmacy-openings-closures-index"
                  data-cta="home_research_openings"
                  data-cta-placement="home_research"
                  data-cta-goal="research"
                  className={`group flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-800 transition-all hover:border-primary-950 hover:text-primary-950 ${focusRing}`}
                >
                  View the UK Community Pharmacy Openings and Closures Index
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-primary-950 group-hover:translate-x-1 transition-all" />
                </Link>
                <Link
                  href="/research/pharmacy-density-and-workload-index"
                  data-cta="home_research_density"
                  data-cta-placement="home_research"
                  data-cta-goal="research"
                  className={`group flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-800 transition-all hover:border-primary-950 hover:text-primary-950 ${focusRing}`}
                >
                  View the Pharmacy Density and Dispensing Workload Index
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-primary-950 group-hover:translate-x-1 transition-all" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Band 10. WHY SPECIALIST MATTERS. `NumberedReasons` ADOPTED over the
          six-row `whySpecialist` array: `{area, detail}` maps one-for-one onto
          its `{title, body}` string shape (NumberedReasons.tsx:27) and no
          sentence changes.
          What the swap RETIRES is the table chrome around that array: the
          sr-only caption and the two column headers "Area" and "Our approach".
          Those three strings exist only to name columns that no longer exist;
          every published SENTENCE survives verbatim. Flagged in W5_RECEIPT.md
          as the one wording deletion in this package.
          DECLINED: packages/web-shared/design/marketing/ComparisonTable.tsx:32-47.
          Its `ComparisonRow` is `{dimension?, general, specialist}` and
          `generalLabel` / `generalCaption` / `ourCaption` are all required.
          `whySpecialist` is a SINGLE column: there is no "general practice"
          text in the data, so every row's `general` cell and all three captions
          would have to be written. */}
      <section className="border-b border-slate-200 bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Why specialist matters</Eyebrow>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-slate-900 text-balance sm:text-4xl">
            A generalist handles your bookkeeping.{" "}
            <span className="text-primary-950">
              We handle the parts of pharmacy finance that need NHS-contract literacy.
            </span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            FP34 reconciliation, VAT retail scheme selection, Drug Tariff margin variance, share
            versus asset deal modelling, and the BADR eligibility check before exchange: a
            generalist encounters these infrequently. We work with them every week.
          </p>
          {/* M1a: the band's two retired table column headers, restored as
              VISIBLE lead-in text (not sr-only), so no published wording is
              lost. The band was kept as a NumberedReasons list rather than
              reverted to the table: each item IS an area (the heading) over our
              approach to it (the body), so the two words still describe what
              the reader sees, and reverting would undo the restyle the owner
              has not yet walked plus re-introduce the `neutral-*` classes and
              the `#0f3a4a` literal the hex gate bans. Both strings are
              verbatim; nothing was authored.
              M1b/S1: the table's sr-only caption carried a third sentence
              ("How {siteConfig.name} handles common pharmacy finance areas")
              that M1a left out — under the 2026-09-28 ruling that is a
              published-wording deletion, not a kit-default drop. Restored
              verbatim as a visually-hidden paragraph (smaller than wiring an
              aria-describedby onto NumberedReasons, which the kit does not
              expose a prop for). */}
          <p className="sr-only">
            How {siteConfig.name} handles common pharmacy finance areas
          </p>
          <p className="mt-10 text-xs font-bold uppercase tracking-wider text-primary-800">
            Area / Our approach
          </p>
          <NumberedReasons
            items={whySpecialist.map((row) => ({ title: row.area, body: row.detail }))}
          />
        </div>
      </section>

      {/* Band 11. TESTIMONIALS. Kit `TestimonialsSection`, owner-ruled to stay
          as it is (29 Sep): three quotes verbatim, the disclaimer verbatim,
          `showRating={false}` because the five-star row is a CLAIM and this
          site publishes no rating, and NO `initials` because deriving them from
          "Single-store pharmacy owner, South East England" would invent an
          identity. `headingId` keeps the existing `testimonials-heading` id on
          the h2. `attribution` maps to `who`; `detail` is left unset rather than
          split out of the attribution string, which would re-cut published copy.
          See TESTIMONIAL_DISCLAIMER above for why the disclaimer is the
          `description` and not the `footnote`. */}
      <TestimonialsSection
        eyebrow="Real outcomes"
        title="What clients say"
        description={TESTIMONIAL_DISCLAIMER}
        headingId="testimonials-heading"
        showRating={false}
        backdrop={<PharmaciesBackdrop patternId="pharmacies-shelving-testimonials" />}
        items={testimonials.map((t) => ({ quote: t.quote, who: t.attribution }))}
      />

      {/* Band 12. FAQ. Kit `FaqSection` on the SAME `faqs` binding that feeds
          `buildFaqJsonLd` above: one binding, two consumers, so the schema can
          never assert an answer the markup does not carry.
          `alwaysRenderAnswers` keeps every answer in the server HTML.
          No `html`: re-derived on source today, all six answers are plain
          strings with zero tags, so `html` would be a no-op.
          `eyebrow=""` because this band publishes no label today, and the kit
          default is the authored string "FAQ". `tone="white"` puts white cards
          on the slate-50 section. */}
      <FaqSection
        eyebrow=""
        title="Common questions"
        faqs={faqs}
        alwaysRenderAnswers
        tone="white"
        className="border-t border-slate-200 bg-slate-50 py-12 sm:py-16 lg:py-20"
      />

      {/* Band 13. CLOSING CTA. Kit `LeadCTAPanel`, fed this band's own strings
          byte-identical. `eyebrow="Get started"` is this band's OWN published
          label, carried through locked rule 9's own exception ("unless the page
          already publishes that exact heading") - which is why it is passed
          rather than blanked: the kit default "Free consultation" is a claim
          this site does not publish, and blanking would have deleted the tenth
          of the page's ten section labels. `formTitle` is the existing <h3> string
          "Get in touch", not the kit default "Book your free consultation".
          Ground note: the kit's non-contained variant hardcodes `bg-slate-900`
          and exposes no ground prop, so this band moves from the brand ground to
          slate-900 - the same ground Property and generalist use. It cannot
          carry `.ground-dark` (no className prop) and MUST not: the panel
          contains a white form card with focusable inputs, and globals.css
          forbids wrapping a light-ground card in that class. The ring inside the
          form therefore stays the light-ground brand ring, which is correct.
          Band 14 (slate-50) sits between this panel and the slate-900 footer, so
          no new dark-on-dark adjacency is introduced.
          This is the page's ONLY closing panel. Do not add a second. */}
      <LeadCTAPanel
        eyebrow="Get started"
        title="Talk to a pharmacy accountant"
        description="Tell us about your pharmacy, your buying or selling plans, or the question on your mind. We will explain what you need and what the position looks like, in plain English, with no obligation."
        proofPoints={ctaProofPoints}
        formTitle="Get in touch"
        form={<LeadForm submitLabel="Send enquiry" />}
        backdrop={<PharmaciesBackdrop patternId="pharmacies-shelving-cta" />}
      />

      {/* Band 14. GUIDES AND RESOURCES. The four existing strings are verbatim;
          what is new is the three-post rail, which is published post titles and
          categories, not authored prose. Raises this route's link floor by 3.
          DECLINED: packages/web-shared/design/marketing/PromptMarquee.tsx:23.
          Its `Prompt` type is `{tag, text, icon, detail?}` and `tag` is
          REQUIRED. Reusing the six FAQ questions as `text` would be legitimate
          (they are already first-person questions and six is an even set, which
          the component's docstring requires), but every one of them would still
          need a `tag` I would have to write, and six new labels is six new
          sentences. Measured on the component's own type, not a preference. */}
      <section className="border-t border-slate-200 bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center">
              <Eyebrow>Guides and resources</Eyebrow>
            </div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 text-balance sm:text-3xl lg:text-4xl">
              Plain English pharmacy finance guidance for owners and buyers.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Guides on NHS contract income and FP34 cash flow, VAT on dispensing and OTC sales,
              buying and selling a pharmacy, goodwill and BADR, business structure, and locum
              pharmacist tax. Written for pharmacy owners and buyers, not for accountants.
            </p>
          </div>
          {recentPosts.length > 0 ? (
            <div className="mx-auto mt-10 max-w-3xl divide-y divide-slate-200 border-y border-slate-200 text-left">
              {recentPosts.map((post) => (
                <article key={post.slug} className="group">
                  <Link
                    href={`/blog/${getCategorySlug(post)}/${post.slug}`}
                    data-cta="home_blog_post"
                    data-cta-placement="home_guides"
                    data-cta-goal="read"
                    className={`flex items-center gap-4 py-4 sm:gap-6 sm:py-5 ${focusRing}`}
                  >
                    <span className="min-w-0 flex-1">
                      <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-primary-950">
                        {post.category}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 transition-colors group-hover:text-primary-950 sm:text-lg">
                        {post.title}
                      </h3>
                    </span>
                    <ArrowRight
                      aria-hidden
                      className="h-5 w-5 shrink-0 text-slate-400 transition-all group-hover:translate-x-1 group-hover:text-primary-950"
                    />
                  </Link>
                </article>
              ))}
            </div>
          ) : null}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/blog" className={btnPrimary}>
              Browse all guides
            </Link>
            <Link
              href="/for/buying-a-pharmacy"
              className={`inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-semibold text-primary-950 transition-opacity hover:opacity-70 sm:text-base ${focusRing}`}
            >
              Buying a pharmacy
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
