import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  btnPrimary,
  focusRing,
  siteContainerLg,
} from "@/components/ui/layout-utils";
import { buildFaqJsonLd, buildOrganizationJsonLd, buildWebsiteJsonLd } from "@/lib/schema";
import { LeadForm } from "@/components/forms/LeadForm";
import { ArrowRight, ShieldCheck, Quote } from "lucide-react";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name} | Accountants for Funded and Scaling UK Startups` },
  description:
    "Specialist accountants for funded and scaling UK startups: R&D merged scheme, SEIS/EIS advance assurance, EMI and share schemes, fractional CFO and core compliance.",
  alternates: { canonical: siteConfig.url },
};

// ponytail: figures verified against house_positions.md; all linked to gov.uk source
const keyStats = [
  {
    value: "20%",
    label: "Merged R&D scheme above-the-line credit (from April 2024)",
    href: "https://www.gov.uk/guidance/corporation-tax-research-and-development-tax-relief-for-large-companies",
  },
  {
    value: "£250k",
    label: "Maximum SEIS raise per company (gross assets under £350k, fewer than 25 FTE, within 3 years of trade)",
    href: "https://www.gov.uk/guidance/venture-capital-schemes-apply-to-use-the-seed-enterprise-investment-scheme",
  },
  {
    value: "£250k",
    label: "EMI option value per employee (£3m total company limit; gross assets under £30m, fewer than 250 FTE)",
    href: "https://www.gov.uk/tax-employee-share-schemes/enterprise-management-incentives-emis",
  },
  {
    value: "18%",
    label: "BADR rate on qualifying gains from 6 April 2026 (£1m lifetime limit; EMI shares qualify on 2-year rule)",
    href: "https://www.gov.uk/business-asset-disposal-relief",
  },
];

const audienceCards = [
  {
    title: "Pre-seed founders",
    body: "SEIS eligibility, pre-trading expenditure within the 7-year window, founder salary structure and early compliance before the first raise.",
    href: "/for/pre-seed-founders",
  },
  {
    title: "Funded startups",
    body: "EIS compliance statements, R&D claims with AIF submission, EMI option pools and investor-ready accounts after investment lands.",
    href: "/for/funded-startups",
  },
  {
    title: "SaaS companies",
    body: "R&D on qualifying software development, VAT place-of-supply for overseas B2B revenue, and recurring revenue timing in accounts.",
    href: "/for/saas-companies",
  },
  {
    title: "Software development companies",
    body: "Project-level R&D qualification, IR35 boundary awareness, EMI for tech talent and Corporation Tax planning at profitability.",
    href: "/for/software-development-companies",
  },
  {
    title: "Fintech startups",
    body: "SEIS and EIS eligibility around financial services exclusions, R&D on financial technology projects and exit structure analysis.",
    href: "/for/fintech-startups",
  },
];

const serviceCards = [
  {
    title: "R&D tax claims",
    body: "Merged scheme and ERIS claims from the technical narrative through AIF submission and CT600. We state what qualifies and why; we do not overclaim.",
    href: "/services/rd-tax-claims",
  },
  {
    title: "SEIS and EIS advance assurance",
    body: "HMRC pre-clearance before a round opens, compliance statement preparation, and EIS3 certificate issue to investors.",
    href: "/services/seis-eis-advance-assurance",
  },
  {
    title: "EMI scheme setup",
    body: "Option pool design, HMRC valuation, grant documentation, and grant notification plus annual ERS returns by 6 July each year.",
    href: "/services/emi-scheme-setup",
  },
  {
    title: "Share schemes",
    body: "Growth shares, unapproved options, section 431 elections on restricted securities and CSOP as the fallback once EMI limits are breached.",
    href: "/services/share-schemes",
  },
  {
    title: "Fractional CFO",
    body: "Board-ready management accounts, investor reporting, cash and runway modelling, and finance-function ownership for companies not yet at full CFO headcount.",
    href: "/services/fractional-cfo",
  },
  {
    title: "Core compliance",
    body: "Annual accounts, Corporation Tax returns, payroll, VAT registration and ongoing compliance for funded and scaling companies.",
    href: "/services/core-compliance",
  },
];

const founderMoments = [
  {
    title: "Filing an R&D claim",
    body: (
      <>
        The{" "}
        <a
          href="https://www.gov.uk/guidance/corporation-tax-research-and-development-tax-relief-for-large-companies"
          className="underline underline-offset-2"
        >
          merged scheme gives a 20% above-the-line credit
        </a>{" "}
        for accounting periods from April 2024. First-time claimants must{" "}
        <a
          href="https://www.gov.uk/guidance/tell-hmrc-that-youre-planning-to-claim-research-and-development-rd-tax-relief"
          className="underline underline-offset-2"
        >
          notify HMRC within 6 months of the period end
        </a>
        . A valid{" "}
        <a
          href="https://www.gov.uk/guidance/submit-detailed-information-before-you-claim-research-and-development-rd-tax-relief"
          className="underline underline-offset-2"
        >
          Additional Information Form
        </a>{" "}
        must reach HMRC before the CT600 claim or the claim is removed.
      </>
    ),
    href: "/services/rd-tax-claims",
  },
  {
    title: "Raising a round on SEIS or EIS",
    body: (
      <>
        <a
          href="https://www.gov.uk/guidance/venture-capital-schemes-apply-for-advance-assurance"
          className="underline underline-offset-2"
        >
          Advance assurance
        </a>{" "}
        is HMRC pre-clearance that a proposed share issue is likely to qualify. For SEIS, the company can raise{" "}
        <a
          href="https://www.gov.uk/guidance/venture-capital-schemes-apply-to-use-the-seed-enterprise-investment-scheme"
          className="underline underline-offset-2"
        >
          up to £250,000 (gross assets under £350,000, fewer than 25 FTE, within 3 years of trade)
        </a>
        . For EIS, up to{" "}
        <a
          href="https://www.gov.uk/guidance/venture-capital-schemes-apply-for-the-enterprise-investment-scheme"
          className="underline underline-offset-2"
        >
          £5m per year and £12m lifetime
        </a>
        .
      </>
    ),
    href: "/services/seis-eis-advance-assurance",
  },
  {
    title: "Setting up an EMI option pool",
    body: (
      <>
        <a
          href="https://www.gov.uk/tax-employee-share-schemes/enterprise-management-incentives-emis"
          className="underline underline-offset-2"
        >
          EMI allows up to £250,000 of unexercised option value per employee and £3m per company
        </a>{" "}
        (gross assets under £30m, fewer than 250 FTE). Grants must be notified to HMRC by 6 July following the tax year of grant.{" "}
        <a
          href="https://www.gov.uk/guidance/submit-your-employment-related-securities-ers-return"
          className="underline underline-offset-2"
        >
          Annual ERS returns are due by 6 July
        </a>{" "}
        each year, including nil returns.
      </>
    ),
    href: "/services/emi-scheme-setup",
  },
  {
    title: "Founder share hygiene at formation",
    body: (
      <>
        Where founders or employees acquire restricted securities at a funding round, a{" "}
        <a
          href="https://www.gov.uk/hmrc-internal-manuals/employment-related-securities/ersm30450"
          className="underline underline-offset-2"
        >
          section 431 joint election must be made within 14 days
        </a>{" "}
        of acquisition. Missing it is a common funded-startup trap. A{" "}
        <a
          href="https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg52521"
          className="underline underline-offset-2"
        >
          section 135 TCGA share-for-share exchange
        </a>{" "}
        is not a disposal, subject to the section 137 anti-avoidance test.
      </>
    ),
    href: "/services/share-schemes",
  },
  {
    title: "VAT and payroll as you scale",
    body: (
      <>
        VAT registration is mandatory once rolling 12-month taxable turnover reaches{" "}
        <a
          href="https://www.gov.uk/register-for-vat"
          className="underline underline-offset-2"
        >
          £90,000
        </a>
        . For SaaS, B2B place-of-supply rules may keep overseas revenue outside the threshold.{" "}
        <a
          href="https://www.gov.uk/national-insurance-rates-letters"
          className="underline underline-offset-2"
        >
          Employer NIC is 15% above a £5,000 secondary threshold
        </a>
        ; a solo-director company is excluded from the Employment Allowance.
      </>
    ),
    href: "/services/core-compliance",
  },
];

const calculatorLinks = [
  {
    title: "R&D relief estimator",
    body: "Estimate the merged scheme credit or ERIS payable credit on a set of qualifying costs. States which scheme applies based on your inputs.",
    href: "/calculators/rd-relief-estimator",
  },
  {
    title: "SEIS and EIS relief calculator",
    body: "Model the income tax and CGT relief available to investors under SEIS or EIS for a proposed raise.",
    href: "/calculators/seis-eis-relief-calculator",
  },
  {
    title: "EMI vs unapproved options calculator",
    body: "Compare the tax outcome of EMI versus unapproved options for a given grant value, exercise price and exit scenario.",
    href: "/calculators/emi-vs-unapproved-calculator",
  },
  {
    title: "Founder dividend vs salary calculator",
    body: "Model the optimal salary and dividend split for a founder-director, accounting for Corporation Tax, income tax bands and the Employment Allowance exclusion.",
    href: "/calculators/founder-dividend-vs-salary-calculator",
  },
];

const whySpecialist = [
  {
    area: "R&D: not every line of code qualifies",
    detail: (
      <>
        <a
          href="https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird100000"
          className="underline underline-offset-2"
        >
          Qualifying R&D must seek an advance in science or technology
        </a>
        , so a claim that stretches routine software work invites a HMRC compliance check, and an overclaim can be clawed back with interest and penalties long after the credit was banked. We assess each project on its technical facts and build claims that survive scrutiny.
      </>
    ),
  },
  {
    area: "SEIS and EIS: eligibility is easy to lose",
    detail:
      "A single borderline contract or an overlooked asset or headcount test can disqualify a round after investors have committed, and the fix is rarely available once shares are issued. We pressure-test eligibility before investor conversations begin, not after investment lands.",
  },
  {
    area: "EMI: a missed deadline is expensive to unwind",
    detail:
      "Miss the notification or ERS-return window and the affected options can lose their qualifying status, converting a tax-advantaged grant into an income-tax and NIC charge for the employee at exit. Restructuring after the fact is possible but costly. We run the filing calendar so it does not happen.",
  },
  {
    area: "Section 431 elections: the consequence outlives the window",
    detail:
      "Skip the joint election on restricted securities and the holder can face an income-tax charge on later share growth instead of a capital gain, a difference that only surfaces at exit when it can no longer be corrected. We flag and file it at the point of acquisition.",
  },
  {
    area: "IR35 and contractor work: we state the boundary only",
    detail: (
      <>
        This site covers funded and scaling product companies. IR35 and{" "}
        <a
          href="https://www.gov.uk/guidance/understanding-off-payroll-working-ir35"
          className="underline underline-offset-2"
        >
          off-payroll working depth
        </a>{" "}
        sits with the sibling Contractor Tax Accountants site.
      </>
    ),
  },
  {
    area: "Loss-making and pre-profit companies: still worth engaging early",
    detail: (
      <>
        <a
          href="https://www.gov.uk/guidance/corporation-tax-calculating-and-claiming-a-loss"
          className="underline underline-offset-2"
        >
          Trading losses carry forward against future profits
        </a>
        , so banking them in annual returns has real value. Pre-trading expenditure is claimable if incurred within{" "}
        <a
          href="https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim46351"
          className="underline underline-offset-2"
        >
          7 years before trade starts
        </a>
        .
      </>
    ),
  },
];

const testimonials = [
  {
    quote:
      "We had submitted our first R&D claim ourselves, including a project that was a rebuild of an existing internal tool rather than genuinely novel work. When we engaged a specialist ahead of year two, they reviewed the prior claim, identified the overclaim, and we corrected it voluntarily. The revised claim was smaller but defensible. We have not had a compliance check since.",
    attribution: "SaaS founder, Series A, London, R&D merged scheme",
  },
  {
    quote:
      "We were about to run our SEIS round without advance assurance, on the assumption that we clearly qualified. Our accountant found that a prior consultancy contract we had run through the company was borderline under the qualifying trade test. We got advance assurance before approaching investors. The process took eight weeks and meant every investor conversation started with confirmation rather than a risk.",
    attribution: "Pre-seed founder, fintech, South East, SEIS advance assurance",
  },
  {
    quote:
      "We set up our EMI scheme two years into the company. At the point we started the process, we had missed the window to notify three early option grants. Those options lost their EMI qualifying status. We have since restructured the affected grants and now have a process that files the ERS return and grant notifications on the same calendar as our board meetings.",
    attribution: "CTO, software development company, Midlands, EMI scheme and ERS returns",
  },
];

const faqs: { question: string; answer: string }[] = [
  {
    question: "Do funded startups need a specialist accountant?",
    answer:
      "A generalist firm can file accounts and a Corporation Tax return. The compliance obligations that become material after investment (R&D claims, EIS compliance statements, EMI grant notifications, annual ERS returns, AIF submissions before CT600 claims) are encountered infrequently by a generalist and handled routinely by a specialist. The risk of getting one of them wrong, and the cost of correcting it, are both higher than the incremental cost of engaging a specialist from the outset.",
  },
  {
    question: "What makes you different from a generalist or a cheap online filing service?",
    answer:
      "Generalist firms and filing services cover annual accounts and standard CT returns well. We cover those too, but our focus is the specialist layer: R&D claims under the merged scheme and ERIS, SEIS and EIS advance assurance and compliance, EMI option scheme setup and ongoing compliance, share scheme hygiene, and the founder capital tax position at exit. These are not occasional services for us; they are the main work.",
  },
  {
    question: "Can you handle our R&D claim and our EMI scheme?",
    answer:
      "Yes. R&D and EMI are the two services we handle most often for funded and scaling companies. For R&D, we prepare the technical narrative, identify qualifying costs, and submit the Additional Information Form before the CT600. For EMI, we structure the option pool, coordinate the HMRC valuation process, prepare grant documentation, file the annual ERS return, and notify HMRC of grants by the 6 July deadline.",
  },
  {
    question: "Do you help with SEIS or EIS advance assurance before a round?",
    answer:
      "Yes. Advance assurance is HMRC pre-clearance that a proposed share issue is likely to qualify for SEIS or EIS. We prepare the application, submit it to HMRC, and manage the process through to clearance. We also prepare the EIS1 compliance statement and EIS3 certificates to investors after the round closes.",
  },
  {
    question: "We are pre-revenue and loss-making. Is it worth engaging you yet?",
    answer:
      "Yes, for two reasons. First, pre-trading expenditure is claimable against future profits if it falls within seven years before trade starts. Second, trading losses carry forward and set against future profits, so banking them in annual returns now has real value. The R&D claim notification deadline (6 months after the period end for first-time claimants) also applies from the earliest accounting period in which qualifying activity occurred.",
  },
  {
    question: "Do you work with SaaS and software-development companies specifically?",
    answer:
      "Yes. Both have a specific compliance profile: SaaS companies need VAT place-of-supply analysis for overseas B2B revenue and recurring revenue accounting; software development companies face project-level R&D qualification questions and IR35 boundary considerations. We have dedicated service and audience pages for both.",
  },
  {
    question: "Do you cover IR35 or contractor work?",
    answer:
      "We state the IR35 and off-payroll boundary where it is relevant to a funded company's working arrangements. Contractor-side IR35 depth (personal service companies, inside-IR35 deductions, umbrella payroll) sits with our sibling Contractor Tax Accountants site and is out of scope for this firm.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Fees depend on the scope of engagement: company stage, whether R&D, SEIS/EIS or EMI work is involved, transaction volume, and how much of the finance function we are covering. We do not publish standard prices because the right scope varies significantly. Contact us with a summary of your situation and we will explain what a typical engagement looks like.",
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
      <section className="relative flex items-center min-h-[520px] sm:min-h-[640px] lg:min-h-[720px] overflow-hidden bg-[#1e1b4b]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e1b4b] via-[#312e81]/70 to-[#0f0e2a]" />
        <div className={`${siteContainerLg} relative z-10 py-16 sm:py-20 w-full`}>
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 text-xs font-bold uppercase tracking-widest text-indigo-200">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
              {siteConfig.name}
            </div>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Accountants for funded and scaling UK startups.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-indigo-100 sm:text-xl">
              R&amp;D merged scheme claims, SEIS and EIS advance assurance, EMI and share schemes, fractional CFO
              and core compliance. For post-formation, funded and scaling UK tech, SaaS and software companies.
              Not the commodity cheap-filing market.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Link
                href="/contact"
                className={`inline-flex min-h-12 items-center justify-center bg-white px-6 py-3 sm:px-10 sm:py-4 text-base sm:text-lg font-semibold text-[#1e1b4b] hover:bg-indigo-50 active:bg-indigo-100 transition-colors text-center ${focusRing}`}
              >
                Speak to a startup specialist
              </Link>
              <Link
                href="/services/rd-tax-claims"
                className={`inline-flex min-h-12 items-center justify-center border border-white/30 bg-white/10 px-6 py-3 sm:px-10 sm:py-4 text-base sm:text-lg font-medium text-white hover:bg-white/20 transition-colors text-center ${focusRing}`}
              >
                R&amp;D tax claims
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-2.5 text-sm text-indigo-300">
              <ShieldCheck className="h-4 w-4 flex-shrink-0" aria-hidden />
              <span className="font-medium">
                Tech, SaaS, software and fintech companies. UK-wide (HMRC).
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Key figures bar */}
      <section className="bg-[#312e81] py-8 sm:py-10" aria-label="Key startup tax figures 2026/27">
        <div className={siteContainerLg}>
          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
            {keyStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <a
                  href={stat.href}
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-mono hover:text-indigo-200 transition-colors"
                >
                  {stat.value}
                </a>
                <div className="mt-1.5 text-xs sm:text-sm font-semibold text-indigo-200 uppercase tracking-wider">
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
            The compliance obligations that matter most to a funded startup (R&amp;D claims, EIS compliance,
            EMI option scheme management, share scheme hygiene at formation and round) are encountered
            infrequently by a generalist firm. They are the main work here. Commodity annual accounts
            and CT returns are part of the engagement, not the reason for it.
          </p>
        </div>
      </section>

      {/* Who the site helps */}
      <section className="border-b border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="section-label mb-4">Who we work with</div>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Funded and scaling product companies. Not contractors, not agencies.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            Solo contractors and personal service companies belong at the sibling Contractor Tax Accountants
            site. Creative and marketing agencies are out of scope. This site works with tech, SaaS, software
            and fintech companies that have passed formation and are growing.
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {audienceCards.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group block border border-neutral-200 bg-neutral-50 p-5 sm:p-6 transition-all hover:border-[#4f46e5] hover:shadow-md ${focusRing}`}
              >
                <span className="text-base font-bold text-neutral-900 group-hover:text-[#4f46e5] transition-colors">
                  {item.title}
                </span>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">{item.body}</p>
                <ArrowRight className="mt-3 h-4 w-4 text-neutral-400 group-hover:text-[#4f46e5] group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Specialist services */}
      <section className="border-b border-neutral-200 bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <div className="section-label mb-4">Specialist services</div>
            <h2 className="text-2xl font-bold text-neutral-900 sm:text-4xl">
              Six service areas covering the funded startup compliance picture.
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-neutral-600">
              From first R&amp;D claim through EMI pool and share scheme hygiene to fractional CFO.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCards.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className={`group block border border-neutral-200 bg-white p-6 sm:p-7 transition-all hover:border-[#4f46e5] hover:shadow-md ${focusRing}`}
              >
                <h3 className="text-base font-bold text-neutral-900 group-hover:text-[#4f46e5] transition-colors">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">{service.body}</p>
                <div className="mt-4 flex items-center text-[#4f46e5] font-semibold text-sm">
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Founder moments */}
      <section className="border-b border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="section-label mb-4">The moments that bring founders here</div>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Five situations where specialist knowledge changes the outcome.
          </h2>
          <div className="mt-10 sm:mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
            {founderMoments.map((item) => (
              <article
                key={item.title}
                className="border border-neutral-200 border-l-4 border-l-[#4f46e5] bg-neutral-50 p-6 sm:p-8"
              >
                <h3 className="text-xl font-bold text-neutral-900">{item.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-neutral-600">{item.body}</p>
                <Link
                  href={item.href}
                  className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#4f46e5] hover:opacity-70 transition-opacity ${focusRing}`}
                >
                  Service detail <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Free tools + research asset */}
      <section className="border-b border-neutral-200 bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
            <div>
              <div className="section-label mb-4">Free tools</div>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl lg:text-4xl">
                Four calculators covering the questions founders ask most.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
                All four tools are scenario and estimate calculators. They state their assumptions openly
                and end at a prompt to speak to us for the real numbers. No sign-up, no data stored.
              </p>
              <div className="mt-8 space-y-3">
                {calculatorLinks.map((calc) => (
                  <Link
                    key={calc.href}
                    href={calc.href}
                    className={`group flex items-start justify-between gap-4 border border-neutral-200 bg-white px-5 py-4 transition-all hover:border-[#4f46e5] ${focusRing}`}
                  >
                    <div>
                      <div className="text-sm font-bold text-neutral-900 group-hover:text-[#4f46e5] transition-colors">
                        {calc.title}
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-neutral-500">{calc.body}</p>
                    </div>
                    <ArrowRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-neutral-400 group-hover:text-[#4f46e5] group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <div className="section-label mb-4">Research asset</div>
              <h2 className="mt-2 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                Startup Formation and Survival Index.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                A data-led analysis of UK technology company formation and early-stage survival rates,
                built from{" "}
                <a
                  href="https://download.companieshouse.gov.uk/en_output.html"
                  className="underline underline-offset-2 text-neutral-800 hover:text-[#4f46e5]"
                >
                  Companies House bulk data
                </a>
                . The methodology and limitations are stated prominently. It is a compliance-awareness
                resource for founders, not a regulatory filing or investment advice.
              </p>
              <div className="mt-6">
                <Link
                  href="/research/startup-formation-survival-index"
                  className={`group flex items-center justify-between border border-neutral-200 bg-white px-5 py-4 text-sm font-semibold text-neutral-800 hover:border-[#4f46e5] hover:text-[#4f46e5] transition-all ${focusRing}`}
                >
                  View the Startup Formation and Survival Index
                  <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-[#4f46e5] group-hover:translate-x-1 transition-all" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why a specialist */}
      <section className="border-b border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="section-label mb-4">Why specialist matters</div>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            A generalist handles the accounts. We handle the parts where getting it wrong is expensive.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            R&amp;D claims that survive a HMRC compliance check, SEIS eligibility checked before investors
            are approached, EMI options that retain their qualifying status, section 431 elections filed
            in the 14-day window: a generalist encounters these infrequently. They are the routine work here.
          </p>
          <div className="mt-12 overflow-x-auto border border-neutral-200">
            <table className="w-full min-w-[28rem] text-left text-sm sm:text-base">
              <caption className="sr-only">
                How {siteConfig.name} handles specialist startup tax areas
              </caption>
              <thead>
                <tr className="bg-[#1e1b4b] text-white">
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
                    <th scope="row" className="px-4 py-3.5 font-semibold text-neutral-900 sm:px-6 sm:py-4 align-top">
                      {row.area}
                    </th>
                    <td className="px-4 py-3.5 text-neutral-600 sm:px-6 sm:py-4 align-top leading-relaxed">{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Anonymised social proof */}
      <section className="bg-[#fafaf9] py-12 sm:py-16 lg:py-20" aria-labelledby="testimonials-heading">
        <div className={siteContainerLg}>
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="section-label mb-4">Real outcomes</div>
            <h2 id="testimonials-heading" className="text-2xl font-bold text-neutral-900 sm:text-3xl lg:text-4xl">
              What founders say
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-600">
              Composite accounts based on patterns across our client base. Names, amounts and
              specific details anonymised. The compliance situations described are real.
            </p>
          </div>
          <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <figure
                key={i}
                className="relative bg-white border border-neutral-200 p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow"
              >
                <Quote className="absolute top-4 right-4 h-6 w-6 text-indigo-100" aria-hidden />
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
      <section className="border-t border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
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
                  <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 font-semibold text-neutral-900 hover:text-[#4f46e5] transition-colors list-none">
                    <span>{faq.question}</span>
                    <span
                      className="flex-shrink-0 text-[#4f46e5] transition-transform group-open:rotate-45"
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
      <section className="relative overflow-hidden bg-[#1e1b4b]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#312e81]/20 via-neutral-900/0 to-neutral-900/0 pointer-events-none" />
        <div className={`${siteContainerLg} relative z-10 py-12 sm:py-20 lg:py-24`}>
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div className="section-label mb-6">Get started</div>
              <h2 className="text-2xl font-bold text-white sm:text-4xl lg:text-5xl">
                Talk to a startup specialist
              </h2>
              <p className="mt-4 sm:mt-6 text-lg sm:text-xl leading-relaxed text-indigo-100">
                Tell us about your company. We will explain what you need and what the position
                looks like, in plain English, with no obligation.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { title: "Funded and scaling companies only", sub: "We do not take sole traders or personal service companies" },
                  { title: "24-hour response", sub: "Usually the same working day" },
                  { title: "All conversations are confidential", sub: "We never discuss one client's position with another" },
                  { title: "UK-wide (HMRC)", sub: "Scottish income tax has its own bands; we flag where they change the outcome" },
                ].map((item) => (
                  <div key={item.title} className="flex items-center gap-4 text-indigo-100">
                    <div className="h-12 w-12 flex items-center justify-center bg-[#312e81] text-white font-bold text-xl flex-shrink-0">
                      &#10003;
                    </div>
                    <div>
                      <div className="font-bold text-white">{item.title}</div>
                      <div className="text-sm text-indigo-300">{item.sub}</div>
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
            <div className="section-label mb-4">Guides and analysis</div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl lg:text-4xl">
              Plain English guidance for UK founders.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
              Articles and guides on R&amp;D relief, SEIS and EIS, EMI and share schemes, founder tax
              and extraction, SaaS finance, and startup compliance. Written for founders and finance leads,
              not for accountants.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/blog" className={btnPrimary}>
                Browse all guides
              </Link>
              <Link
                href="/services/seis-eis-advance-assurance"
                className="inline-flex items-center gap-2 text-[#4f46e5] hover:opacity-70 font-semibold text-sm sm:text-base transition-opacity"
              >
                SEIS and EIS advance assurance
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
