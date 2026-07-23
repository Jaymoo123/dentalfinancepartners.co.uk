import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  btnPrimary,
  focusRing,
  siteContainerLg,
} from "@/components/ui/layout-utils";
import { pharmacyHubs } from "@/data/pharmacies-hubs";
import { buildFaqJsonLd, buildOrganizationJsonLd, buildWebsiteJsonLd } from "@/lib/schema";
import { LeadForm } from "@/components/forms/LeadForm";
import { ArrowRight, ShieldCheck, Quote } from "lucide-react";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name} | Specialist Accountants for UK Pharmacy Owners` },
  description:
    "Specialist accountants for UK community pharmacy owners: NHS contract income, VAT retail schemes, buying and selling a pharmacy, and pharmacy group tax. Speak to a specialist.",
  alternates: { canonical: siteConfig.url },
};

// ponytail: HP-verified figures only; all linked to gov.uk / NHS source
const keyStats = [
  {
    value: "Zero-rated",
    label: "NHS-dispensed prescription drugs (VAT treatment, HP 1)",
    href: "https://www.gov.uk/guidance/health-professionals-pharmaceutical-products-and-vat-notice-70157",
  },
  {
    value: "~2 months",
    label: "FP34 cash-flow lag from submission to NHSBSA payment (HP 7)",
    href: "https://www.nhsbsa.nhs.uk/pharmacies-gp-practices-and-appliance-contractors/submitting-prescriptions",
  },
  {
    value: "18%",
    label: "BADR CGT rate for 2026/27 on qualifying pharmacy disposals up to £1m lifetime limit (HP 14)",
    href: "https://www.gov.uk/business-asset-disposal-relief",
  },
  {
    value: "0.5% vs 5%",
    label: "Stamp duty on shares vs SDLT on property in asset deals (HP 12)",
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
  },
  {
    title: "FP34 cash-flow estimator",
    body: "Estimate the working-capital requirement created by the FP34 submission-to-payment lag. Helps buyers and new owners model the cash cycle before it becomes a problem.",
    href: "/calculators/pharmacy-fp34-cash-flow-estimator",
  },
  {
    title: "Locum take-home comparator",
    body: "Compare estimated net income as a self-employed sole trader versus through a limited company for locum pharmacists. States its simplifications and routes complex IR35 situations to specialist advice.",
    href: "/calculators/locum-take-home-comparator",
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

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildOrganizationJsonLd() }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildWebsiteJsonLd() }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(faqs) }}
      />

      {/* Hero */}
      <section className="relative flex items-center min-h-[520px] sm:min-h-[640px] lg:min-h-[720px] overflow-hidden bg-[#0f3a4a]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f3a4a] via-[#1a5c6e]/70 to-[#071f28]" />
        <div className={`${siteContainerLg} relative z-10 py-16 sm:py-20 w-full`}>
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 text-xs font-bold uppercase tracking-widest text-teal-200">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
              {siteConfig.name}
            </div>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Specialist accountants for UK pharmacy owners.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-teal-100 sm:text-xl">
              NHS contract income, VAT retail schemes, FP34 cash-flow planning, and the buying and
              selling moment. We work exclusively with pharmacy owners, buyers, sellers, and
              multi-store groups. Generalist firms handle your bookkeeping; we handle the parts of
              pharmacy finance that need specialist knowledge.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Link
                href="/contact"
                className={`inline-flex min-h-12 items-center justify-center bg-white px-6 py-3 sm:px-10 sm:py-4 text-base sm:text-lg font-semibold text-[#0f3a4a] hover:bg-teal-50 active:bg-teal-100 transition-colors text-center ${focusRing}`}
              >
                Speak to a pharmacy accountant
              </Link>
              <Link
                href="/for/buying-a-pharmacy"
                className={`inline-flex min-h-12 items-center justify-center border border-white/30 bg-white/10 px-6 py-3 sm:px-10 sm:py-4 text-base sm:text-lg font-medium text-white hover:bg-white/20 transition-colors text-center ${focusRing}`}
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

      {/* Key figures bar */}
      <section className="bg-[#1a5c6e] py-8 sm:py-10" aria-label="Key pharmacy finance figures">
        <div className={siteContainerLg}>
          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
            {keyStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <a
                  href={stat.href}
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-mono hover:text-teal-200 transition-colors"
                >
                  {stat.value}
                </a>
                <div className="mt-1.5 text-xs sm:text-sm font-semibold text-teal-200 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro strip */}
      <section className="border-b border-neutral-200 bg-[#fafaf9] py-10 sm:py-12">
        <div className={siteContainerLg}>
          <p className="max-w-3xl text-lg leading-relaxed text-neutral-700 sm:text-xl">
            A community pharmacy is not a standard retail business. Income is reimbursement and
            remuneration under the NHS contract, not till takings. VAT applies differently to
            dispensing and OTC sales. The purchase price is dominated by goodwill attached to the
            NHS contract. None of this is exotic, but all of it is specific, and a generalist
            accountant who encounters it once a year handles it differently from one who works with
            it every week.
          </p>
        </div>
      </section>

      {/* Who we help: routing sentence + segment hub grid */}
      <section className="border-b border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="section-label mb-4">Who we work with</div>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Five pharmacy audiences, each with a different tax and finance picture.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            The questions facing a single-store owner running an NHS contract differ from those
            facing a first-time buyer, a seller planning an exit, a group operator managing
            associated-company rules, or a locum pharmacist sorting Self Assessment. Choose your
            situation for audience-specific guidance.
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pharmacyHubs.map((hub) => (
              <Link
                key={hub.slug}
                href={`/for/${hub.slug}`}
                className={`group block border border-neutral-200 bg-neutral-50 p-5 sm:p-6 transition-all hover:border-[#0f3a4a] hover:shadow-md ${focusRing}`}
              >
                <span className="text-base font-bold text-neutral-900 group-hover:text-[#0f3a4a] transition-colors">
                  {hub.title}
                </span>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">{hub.intro}</p>
                <ArrowRight className="mt-3 h-4 w-4 text-neutral-400 group-hover:text-[#0f3a4a] group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NHS economics lane */}
      <section className="border-b border-neutral-200 bg-[#0f3a4a] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
            <div>
              <div className="mb-4 inline-block bg-white/10 border border-white/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-teal-200">
                NHS contract economics
              </div>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
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
                  className={`inline-flex items-center gap-2 bg-white px-6 py-3 text-sm font-semibold text-[#0f3a4a] hover:bg-teal-50 transition-colors ${focusRing}`}
                >
                  FP34 reconciliation service
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/services/pharmacy-benchmarking-margin"
                  className={`inline-flex items-center gap-2 border border-white/30 bg-white/10 px-6 py-3 text-sm font-medium text-white hover:bg-white/20 transition-colors ${focusRing}`}
                >
                  Margin benchmarking
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="space-y-4">
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
                <div key={item.label} className="border border-white/20 bg-white/5 p-5 sm:p-6">
                  <div className="font-bold text-white">{item.label}</div>
                  <p className="mt-2 text-sm leading-relaxed text-teal-200">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VAT lane */}
      <section className="border-b border-neutral-200 bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
            <div>
              <div className="section-label mb-4">VAT on mixed supplies</div>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl lg:text-4xl">
                The VAT picture most generalists miss.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
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
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
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
                <Link
                  href="/services/pharmacy-vat-retail-schemes"
                  className={`inline-flex items-center gap-2 bg-[#0f3a4a] text-white px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity ${focusRing}`}
                >
                  VAT retail scheme service
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="overflow-x-auto border border-neutral-200">
              <table className="w-full min-w-[24rem] text-left text-sm">
                <caption className="sr-only">VAT treatment of common pharmacy supplies</caption>
                <thead>
                  <tr className="bg-[#0f3a4a] text-white">
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
                    { supply: "NHS-dispensed prescription drugs", treatment: "Zero-rated (HP 1)" },
                    { supply: "OTC retail medicines and health products", treatment: "Standard-rated (HP 1)" },
                    { supply: "Private pharmacist services", treatment: "Exempt or standard-rated: map by service line (HP 2)" },
                    { supply: "Input VAT on dispensing costs", treatment: "Reclaimable against zero-rated outputs (HP 1)" },
                    { supply: "Retail scheme apportionment", treatment: "Splits zero-rated and standard-rated takings (HP 4)" },
                  ].map((row, i) => (
                    <tr key={row.supply} className={`border-b border-neutral-200 last:border-0 ${i % 2 === 1 ? "bg-neutral-50" : "bg-white"}`}>
                      <th scope="row" className="px-4 py-3.5 font-semibold text-neutral-900 sm:px-5 sm:py-4">
                        {row.supply}
                      </th>
                      <td className="px-4 py-3.5 text-neutral-600 sm:px-5 sm:py-4">{row.treatment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Buying/selling high-value lane */}
      <section className="border-b border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="section-label mb-4">Buying and selling a pharmacy</div>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            The highest-value moment in a pharmacy owner&apos;s career.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
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
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
              <div key={item.href} className="border border-neutral-200 bg-neutral-50 p-6 sm:p-7 flex flex-col">
                <h3 className="text-base font-bold text-neutral-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500 flex-1">{item.body}</p>
                <div className="mt-5 flex flex-col gap-2">
                  <Link
                    href={item.href}
                    className={`group flex items-center justify-between border border-[#0f3a4a] bg-white px-4 py-2.5 text-xs font-semibold text-[#0f3a4a] hover:bg-[#0f3a4a] hover:text-white transition-colors ${focusRing}`}
                  >
                    View the hub
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <Link
                    href={item.service}
                    className={`group flex items-center justify-between border border-neutral-200 bg-white px-4 py-2.5 text-xs font-medium text-neutral-600 hover:border-[#0f3a4a] hover:text-[#0f3a4a] transition-colors ${focusRing}`}
                  >
                    {item.serviceLabel}
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we actually fix */}
      <section className="border-b border-neutral-200 bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="section-label mb-4">The moments that bring people to us</div>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Four pharmacy-specific problems a generalist misses.
          </h2>
          <div className="mt-10 sm:mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
            {whatWeActuallyFix.map((item) => (
              <article
                key={item.title}
                className="border border-neutral-200 border-l-4 border-l-[#0f3a4a] bg-white p-6 sm:p-8"
              >
                <h3 className="text-xl font-bold text-neutral-900">{item.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-neutral-600">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Free tools + data asset */}
      <section className="border-b border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
            <div>
              <div className="section-label mb-4">Free tools</div>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl lg:text-4xl">
                Three calculators for the questions pharmacy owners ask most.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
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
                    className={`group flex items-start justify-between gap-4 border border-neutral-200 bg-neutral-50 px-5 py-4 transition-all hover:border-[#0f3a4a] ${focusRing}`}
                  >
                    <div>
                      <div className="text-sm font-bold text-neutral-900 group-hover:text-[#0f3a4a] transition-colors">
                        {calc.title}
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-neutral-500">{calc.body}</p>
                    </div>
                    <ArrowRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-neutral-400 group-hover:text-[#0f3a4a] group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <div className="section-label mb-4">Data asset</div>
              <h2 className="mt-2 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                UK Community Pharmacy Openings and Closures Index.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                A regularly updated index tracking community pharmacy openings and closures across
                England, drawing on NHS Business Services Authority data and NHS Digital records.
                The index carries its methodology and limitations prominently. It is a
                market-awareness resource for pharmacy buyers, sellers, and operators, not a
                regulatory filing or investment advice.
              </p>
              <div className="mt-6 space-y-3">
                <Link
                  href="/research/pharmacy-openings-closures-index"
                  className={`group flex items-center justify-between border border-neutral-200 bg-neutral-50 px-5 py-4 text-sm font-semibold text-neutral-800 hover:border-[#0f3a4a] hover:text-[#0f3a4a] transition-all ${focusRing}`}
                >
                  View the UK Community Pharmacy Openings and Closures Index
                  <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-[#0f3a4a] group-hover:translate-x-1 transition-all" />
                </Link>
                <Link
                  href="/research/pharmacy-density-and-workload-index"
                  className={`group flex items-center justify-between border border-neutral-200 bg-neutral-50 px-5 py-4 text-sm font-semibold text-neutral-800 hover:border-[#0f3a4a] hover:text-[#0f3a4a] transition-all ${focusRing}`}
                >
                  View the Pharmacy Density and Dispensing Workload Index
                  <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-[#0f3a4a] group-hover:translate-x-1 transition-all" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why a specialist, not a generalist */}
      <section className="border-b border-neutral-200 bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="section-label mb-4">Why specialist matters</div>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            A generalist handles your bookkeeping.{" "}
            <span className="text-[#0f3a4a]">
              We handle the parts of pharmacy finance that need NHS-contract literacy.
            </span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            FP34 reconciliation, VAT retail scheme selection, Drug Tariff margin variance, share
            versus asset deal modelling, and the BADR eligibility check before exchange: a
            generalist encounters these infrequently. We work with them every week.
          </p>
          <div className="mt-12 overflow-x-auto border border-neutral-200">
            <table className="w-full min-w-[28rem] text-left text-sm sm:text-base">
              <caption className="sr-only">
                How {siteConfig.name} handles common pharmacy finance areas
              </caption>
              <thead>
                <tr className="bg-[#0f3a4a] text-white">
                  <th scope="col" className="px-4 py-3 font-bold text-sm uppercase tracking-wider sm:px-6 sm:py-4">
                    Area
                  </th>
                  <th scope="col" className="px-4 py-3 font-bold text-sm uppercase tracking-wider sm:px-6 sm:py-4">
                    Our approach
                  </th>
                </tr>
              </thead>
              <tbody>
                {whySpecialist.map((row, i) => (
                  <tr
                    key={row.area}
                    className={`border-b border-neutral-200 last:border-0 ${i % 2 === 1 ? "bg-neutral-50" : "bg-white"}`}
                  >
                    <th scope="row" className="px-4 py-3.5 font-semibold text-neutral-900 sm:px-6 sm:py-4">
                      {row.area}
                    </th>
                    <td className="px-4 py-3.5 text-neutral-600 sm:px-6 sm:py-4">{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Anonymised social proof */}
      <section className="bg-white py-12 sm:py-16 lg:py-20" aria-labelledby="testimonials-heading">
        <div className={siteContainerLg}>
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="section-label mb-4">Real outcomes</div>
            <h2 id="testimonials-heading" className="text-2xl font-bold text-neutral-900 sm:text-3xl lg:text-4xl">
              What clients say
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-600">
              Composite accounts based on patterns across our client base. Names, amounts and
              specific details anonymised. The situations described are real.
            </p>
          </div>
          <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <figure
                key={i}
                className="relative bg-[#fafaf9] border border-neutral-200 p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow"
              >
                <Quote className="absolute top-4 right-4 h-6 w-6 text-teal-100" aria-hidden />
                <blockquote className="text-base leading-relaxed text-neutral-800 font-medium pr-8">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 pt-4 border-t border-neutral-100 text-xs sm:text-sm font-semibold text-neutral-500">
                  {t.attribution}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-neutral-200 bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-neutral-900 text-center mb-8 sm:mb-12 sm:text-4xl">
              Common questions
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group border border-neutral-200 bg-white"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 font-semibold text-neutral-900 hover:text-[#0f3a4a] transition-colors list-none">
                    <span>{faq.question}</span>
                    <span
                      className="flex-shrink-0 text-[#0f3a4a] transition-transform group-open:rotate-45"
                      aria-hidden
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-neutral-600 leading-relaxed border-t border-neutral-100 pt-4">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA with LeadForm */}
      <section className="relative overflow-hidden bg-[#0f3a4a]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a5c6e]/20 via-neutral-900/0 to-neutral-900/0 pointer-events-none" />
        <div className={`${siteContainerLg} relative z-10 py-12 sm:py-20 lg:py-24`}>
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div className="section-label mb-6">Get started</div>
              <h2 className="text-2xl font-bold text-white sm:text-4xl lg:text-5xl">
                Talk to a pharmacy accountant
              </h2>
              <p className="mt-4 sm:mt-6 text-lg sm:text-xl leading-relaxed text-teal-100">
                Tell us about your pharmacy, your buying or selling plans, or the question on your
                mind. We will explain what you need and what the position looks like, in plain
                English, with no obligation.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  {
                    title: "Pharmacy clients only",
                    sub: "We do not take general commercial, property, or unrelated clients",
                  },
                  {
                    title: "24-hour response",
                    sub: "Usually the same working day",
                  },
                  {
                    title: "All conversations are confidential",
                    sub: "We never discuss one client's position with another",
                  },
                  {
                    title: "England (NHS contract) plus UK-wide (HMRC tax law)",
                    sub: "Scotland, Wales and Northern Ireland NHS contract variants are flagged where they change the outcome",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-center gap-4 text-teal-100">
                    <div className="h-12 w-12 flex items-center justify-center bg-[#1a5c6e] text-white font-bold text-xl flex-shrink-0">
                      &#10003;
                    </div>
                    <div>
                      <div className="font-bold text-white">{item.title}</div>
                      <div className="text-sm text-teal-300">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-6 sm:p-8 lg:p-10">
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-4 sm:mb-6">
                Get in touch
              </h3>
              <LeadForm submitLabel="Send enquiry" />
            </div>
          </div>
        </div>
      </section>

      {/* Blog footer strip */}
      <section className="border-t border-neutral-200 bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="text-center max-w-3xl mx-auto">
            <div className="section-label mb-4">Guides and resources</div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl lg:text-4xl">
              Plain English pharmacy finance guidance for owners and buyers.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
              Guides on NHS contract income and FP34 cash flow, VAT on dispensing and OTC sales,
              buying and selling a pharmacy, goodwill and BADR, business structure, and locum
              pharmacist tax. Written for pharmacy owners and buyers, not for accountants.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/blog" className={btnPrimary}>
                Browse all guides
              </Link>
              <Link
                href="/for/buying-a-pharmacy"
                className="inline-flex items-center gap-2 text-[#0f3a4a] hover:opacity-70 font-semibold text-sm sm:text-base transition-opacity"
              >
                Buying a pharmacy
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
