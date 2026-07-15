import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/forms/LeadForm";
import {
  btnPrimary,
  btnOnTeal,
  btnSecondary,
  focusRing,
  siteContainerLg,
} from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import {
  ArrowRight,
  ShieldCheck,
  Quote,
  FileCheck,
  Heart,
  BookOpen,
  BadgePoundSterling,
  Calculator,
  Building2,
  ClipboardList,
} from "lucide-react";
import { buildFaqJsonLd, buildOrganizationJsonLd } from "@/lib/schema";

export function generateMetadata(): Metadata {
  return {
    title: `Specialist Charity Accountants UK | ${siteConfig.name}`,
    description:
      `Specialist accountants for UK charities, CIOs, CICs and social enterprises. Independent examination, SORP-compliant accounts, Gift Aid, charity VAT and trustee compliance.`,
    alternates: { canonical: siteConfig.url },
  };
}

// ponytail: stats driven from HP verified figures only; no fee figures.
const keyStats = [
  {
    value: "£25,000",
    label: "Income threshold triggering external scrutiny",
    href: "https://www.gov.uk/government/publications/independent-examination-of-charity-accounts-trustees-cc31",
  },
  {
    value: "£1m",
    label: "Income threshold where audit becomes mandatory",
    href: "https://www.gov.uk/government/publications/charity-reporting-and-accounting-the-essentials-november-2016-cc15d",
  },
  {
    value: "25p",
    label: "Gift Aid reclaimed per £1 donated",
    href: "https://www.gov.uk/claim-gift-aid",
  },
  {
    value: "10 months",
    label: "Window to file the annual return after year end",
    href: "https://www.gov.uk/guidance/prepare-a-charity-annual-return",
  },
];

const servicesOverview = [
  {
    title: "Independent examination",
    body: "For charities with income between £25,000 and the audit threshold. We conduct the examination, produce the examiner's report, and file with the Commission on time.",
    href: "/services/independent-examination",
    Icon: FileCheck,
  },
  {
    title: "Charity accounts (SORP)",
    body: "Accruals accounts and trustee annual reports prepared to the Charities SORP. For accounting periods starting on or after 1 January 2026 we apply SORP 2026.",
    href: "/services/charity-accounts",
    Icon: BookOpen,
  },
  {
    title: "Charity bookkeeping",
    body: "Fund-by-fund bookkeeping that keeps restricted and unrestricted income properly separated and makes year-end reporting straightforward.",
    href: "/services/charity-bookkeeping",
    Icon: ClipboardList,
  },
  {
    title: "Gift Aid",
    body: "Declaration management, claim preparation and submission to HMRC. We maximise the 25p-per-pound reclaim, check donor benefit limits, and handle GASDS for small cash donations.",
    href: "/services/gift-aid",
    Icon: BadgePoundSterling,
  },
  {
    title: "Charity VAT",
    body: "Business/non-business apportionment, partial exemption, fundraising event exemptions and eligibility declarations for zero-rating and reduced-rate reliefs.",
    href: "/services/charity-vat",
    Icon: Calculator,
  },
  {
    title: "CICs and social enterprises",
    body: "CIC34 community interest reports, Companies House accounts filings, asset-lock compliance and social-impact reporting for community interest companies.",
    href: "/for/cics",
    Icon: Building2,
  },
];

const complianceMoments = [
  {
    title: "Crossing the £25,000 income threshold",
    body: (
      <>
        Once gross income passes{" "}
        <a
          href="https://www.gov.uk/government/publications/independent-examination-of-charity-accounts-trustees-cc31"
          className="underline underline-offset-2"
        >
          £25,000
        </a>
        , trustees must arrange external scrutiny for the first time. Many boards reach this
        point mid-year and are unsure whether they need an independent examination or an
        audit. We assess the right route and handle the engagement from there.
      </>
    ),
  },
  {
    title: "SORP 2026 transition",
    body: (
      <>
        Accounting periods starting on or after 1 January 2026 fall under{" "}
        <a
          href="https://www.charitysorp.org/"
          className="underline underline-offset-2"
        >
          SORP 2026
        </a>
        . Trustees preparing accounts for those periods for the first time need help
        applying the updated standard correctly, particularly on fund accounting and
        the trustee annual report.
      </>
    ),
  },
  {
    title: "Gift Aid gone wrong",
    body: (
      <>
        Missing or incomplete declarations, benefits to donors that exceed the permitted{" "}
        <a
          href="https://www.gov.uk/guidance/gift-aid-what-donations-charities-and-cascs-can-claim-on"
          className="underline underline-offset-2"
        >
          value limits
        </a>
        , and claims submitted without HMRC recognition are common errors. We review
        existing processes, correct outstanding issues and set up compliant systems
        going forward.
      </>
    ),
  },
  {
    title: "CIC and social-enterprise filings",
    body: (
      <>
        Every CIC must file a{" "}
        <a
          href="https://www.gov.uk/government/publications/community-interest-companies-business-activities"
          className="underline underline-offset-2"
        >
          CIC34 community interest report
        </a>{" "}
        alongside its accounts at Companies House. CICs also pay corporation tax normally
        and cannot claim Gift Aid or charity rate relief. We handle both the accounts and
        the CIC34 filing.
      </>
    ),
  },
];

const testimonials = [
  {
    quote:
      "We crossed £25,000 income mid-year and had no idea we needed an examiner. They explained the process plainly, carried out the examination and filed everything with the Commission well inside the deadline.",
    attribution: "Trustee, small community charity, East Midlands",
  },
  {
    quote:
      "Our Gift Aid process was a mess. Declarations were missing donor addresses and we had been claiming on donations where benefits exceeded the limits. They restructured everything and we have claimed correctly ever since.",
    attribution: "Finance lead, grant-making trust, South East England",
  },
  {
    quote:
      "As a CIC we are not a charity, but the accounting requirements still catch people out. They know the CIC34, asset-lock rules and corporation tax position. We have never had a late filing.",
    attribution: "Director, community interest company, Yorkshire",
  },
];

const guideLinks = [
  { title: "Audit vs independent examination", href: "/guides/audit-vs-independent-examination" },
  { title: "Charity SORP 2026", href: "/guides/charity-sorp-2026" },
  { title: "Gift Aid: the complete guide", href: "/guides/gift-aid-complete-guide" },
  { title: "CIC: the complete guide", href: "/guides/cic-complete-guide" },
  { title: "Charity VAT guide", href: "/guides/charity-vat-guide" },
  { title: "Set up a charity or CIO", href: "/guides/set-up-a-charity-cio" },
];

const calculatorLinks = [
  { title: "Gift Aid calculator", href: "/calculators/calc-gift-aid-calculator" },
  { title: "IE vs audit threshold checker", href: "/calculators/independent-examination-vs-audit-checker" },
  { title: "GASDS calculator", href: "/calculators/gasds-small-donations-calculator" },
];

const faqs = [
  {
    question: "Do small charities need an accountant?",
    answer:
      "Not legally, but the Charity Commission's reporting requirements trip up many small charity boards. Even below the external-scrutiny threshold, receipts and payments accounts must be prepared, the annual return must be filed within 10 months, and Gift Aid claims require a compliant system. A specialist accountant prevents the small errors that accumulate and become compliance problems.",
  },
  {
    question: "What does a charity accountant do that a general accountant does not?",
    answer:
      "A charity specialist understands fund accounting (restricted vs unrestricted income), the Charities SORP, the independent examination regime, Gift Aid mechanics and HMRC recognition requirements. A general accountant may be excellent at small-business accounts but will not encounter these frameworks regularly enough to advise on the edge cases that catch trustees out.",
  },
  {
    question: "When does a charity need an independent examination?",
    answer:
      "Once gross income exceeds £25,000, trustees must arrange an independent examination or a full audit. At or below £25,000 no external scrutiny is required by the Charities Act, though the governing document may still require one. Above £250,000 income the examiner must be a member of one of the professional bodies listed in the Act.",
  },
  {
    question: "When does a charity need a full audit?",
    answer:
      "A statutory audit is mandatory where income exceeds £1m in the year, or where income exceeds £250,000 AND gross assets exceed £3.26m. A funder or governing document can require an audit below these thresholds. Independent examination is not permitted once the statutory audit gates are crossed (save in Commission-approved exceptional cases).",
  },
  {
    question: "Do you work with CICs as well as charities?",
    answer:
      "Yes. We prepare accounts and file the CIC34 community interest report for community interest companies. CICs are regulated by the Office of the Regulator of Community Interest Companies, not the Charity Commission, and they cannot claim Gift Aid or charity rate relief. We make sure CIC clients understand what does and does not apply to their structure.",
  },
  {
    question: "Can you prepare SORP-compliant accounts?",
    answer:
      "Yes. We prepare accruals accounts to the Charities SORP (FRS 102). For accounting periods starting on or after 1 January 2026 we apply SORP 2026. Non-company charities with income at or below £250,000 may use receipts and payments accounts; charitable companies must prepare accruals accounts regardless of size.",
  },
  {
    question: "Do you handle Gift Aid claims?",
    answer:
      "Yes. We manage the full Gift Aid process: checking HMRC recognition is in place, reviewing declaration templates for required content, preparing and submitting claims, monitoring donor benefit limits, and handling GASDS for small cash and contactless donations of £30 or less.",
  },
  {
    question: "Do you cover Scottish charities?",
    answer:
      "Our default jurisdiction is England and Wales (Charity Commission). Scottish charities are regulated by OSCR (the Office of the Scottish Charity Regulator), which operates a different scrutiny framework. We flag Scotland explicitly rather than applying England and Wales rules by default; please tell us your jurisdiction when you get in touch.",
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
        dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(faqs) }}
      />

      {/* ── Hero ── */}
      <section className="relative flex items-center min-h-[520px] sm:min-h-[640px] lg:min-h-[720px] overflow-hidden bg-[#0f2e24]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f2e24] via-[#1a5c4a]/90 to-[#0a1f19]" />
        <div className={`${siteContainerLg} relative z-10 py-16 sm:py-20 w-full`}>
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 bg-[#1a5c4a] border border-[#2d7a62] px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-200">
              <Heart className="h-3.5 w-3.5" aria-hidden />
              {siteConfig.name}
            </div>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Specialist accountants for UK charities and social enterprises.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-emerald-100 sm:text-xl">
              Independent examination, SORP-compliant accounts, Gift Aid, charity VAT and
              trustee compliance. We work exclusively with charities, CIOs, CICs and social
              enterprises, so every engagement draws on focused sector knowledge.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Link
                href="/contact"
                className={`${btnPrimary} text-base sm:text-lg px-6 py-3 sm:px-10 sm:py-4 text-center bg-white text-[#1a5c4a] hover:bg-emerald-50 active:bg-emerald-100`}
              >
                Talk to a charity accountant
              </Link>
              <Link
                href="/services/independent-examination"
                className={`inline-flex min-h-12 items-center justify-center border border-white/30 bg-white/10 px-6 py-3 sm:px-10 sm:py-4 text-base sm:text-lg font-medium text-white hover:bg-white/20 transition-colors text-center ${focusRing}`}
              >
                Independent examination
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-2.5 text-sm text-emerald-300">
              <ShieldCheck className="h-4 w-4 flex-shrink-0" aria-hidden />
              <span className="font-medium">Charities, CIOs, CICs and social enterprises only. England and Wales default.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Threshold stats bar ── */}
      <section className="bg-[#1a5c4a] py-8 sm:py-10" aria-label="Key charity compliance thresholds">
        <div className={siteContainerLg}>
          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
            {keyStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <a
                  href={stat.href}
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-mono hover:text-emerald-200 transition-colors"
                >
                  {stat.value}
                </a>
                <div className="mt-1.5 text-xs sm:text-sm font-semibold text-emerald-200 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Intro strip ── */}
      <section className="border-b border-neutral-200 bg-[#fafaf9] py-10 sm:py-12">
        <div className={siteContainerLg}>
          <p className="max-w-3xl text-lg leading-relaxed text-neutral-700 sm:text-xl">
            Most charity trustees are volunteers, not finance professionals. The Charity Commission's
            compliance framework is detailed, the Gift Aid rules have real teeth, and the SORP is
            genuinely technical. We exist to take that burden off the board so trustees can focus on
            the charitable objects.
          </p>
        </div>
      </section>

      {/* ── Who we help ── */}
      <section className="border-b border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="section-label mb-4">Who we work with</div>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Small and medium charities, CIOs, CICs and social enterprises.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            We focus on organisations that sit below the statutory audit threshold: charities
            that need an independent examination rather than a full audit, smaller charitable
            companies preparing SORP-compliant accruals accounts, and CICs that need their
            CIC34 filed alongside their Companies House accounts. Scotland: our default jurisdiction
            is England and Wales; please see the{" "}
            <a href="https://www.oscr.org.uk/" className="underline underline-offset-2 text-[#1a5c4a]">
              OSCR website
            </a>{" "}
            for Scottish charity requirements.
          </p>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Registered charities", href: "/services/charity-accounts" },
              { label: "Charitable Incorporated Organisations (CIOs)", href: "/services/charity-accounts" },
              { label: "Community Interest Companies (CICs)", href: "/for/cics" },
              { label: "Social enterprises", href: "/for/social-enterprises" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`group block border border-neutral-200 bg-neutral-50 p-4 text-sm font-semibold text-neutral-800 hover:border-[#1a5c4a] hover:bg-[#f0f7f4] transition-all ${focusRing}`}
              >
                {item.label}
                <ArrowRight className="mt-2 h-4 w-4 text-neutral-400 group-hover:text-[#1a5c4a] group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services grid ── */}
      <section className="border-b border-neutral-200 bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 sm:text-4xl lg:text-5xl">
              What we do for charities
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-neutral-600">
              Every service is built around how the Charity Commission framework, HMRC and Companies House
              work in practice for the charity and social-enterprise sector.
            </p>
          </div>
          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {servicesOverview.map((item) => {
              const Icon = item.Icon;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`group block border border-neutral-200 bg-white p-6 sm:p-8 transition-all hover:border-[#1a5c4a] hover:shadow-md ${focusRing}`}
                >
                  <div className="flex h-14 w-14 items-center justify-center bg-[#1a5c4a] mb-4 group-hover:bg-[#154a3b] transition-colors">
                    <Icon className="h-7 w-7 text-white" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 group-hover:text-[#1a5c4a] transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.body}</p>
                  <div className="mt-4 flex items-center text-[#1a5c4a] font-semibold text-sm">
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <Link href="/for/social-enterprises" className={btnSecondary}>
              Social enterprises
            </Link>
          </div>
        </div>
      </section>

      {/* ── Compliance moments ── */}
      <section className="border-b border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="section-label mb-4">The moments that bring trustees to us</div>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            The compliance points most charities hit at some stage.
          </h2>
          <div className="mt-10 sm:mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
            {complianceMoments.map((item) => (
              <article
                key={item.title}
                className="border border-neutral-200 border-l-4 border-l-[#1a5c4a] bg-neutral-50 p-6 sm:p-8"
              >
                <h3 className="text-xl font-bold text-neutral-900">{item.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-neutral-600">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Scrutiny threshold strip ── */}
      <section className="bg-[#1a5c4a] py-10 sm:py-12" aria-label="Charity scrutiny thresholds">
        <div className={siteContainerLg}>
          <div className="mb-6 text-center">
            <h2 className="text-lg font-bold text-white sm:text-2xl">
              Charity scrutiny thresholds at a glance (England and Wales)
            </h2>
            <p className="mt-2 text-sm text-emerald-200">
              Scotland is regulated by OSCR with different requirements.{" "}
              <a href="https://www.oscr.org.uk/" className="underline underline-offset-2 text-emerald-100 hover:text-white">
                See OSCR
              </a>
              .
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[32rem] text-left text-sm sm:text-base border border-[#2d7a62]">
              <caption className="sr-only">Charity scrutiny threshold summary for England and Wales</caption>
              <thead>
                <tr className="bg-[#154a3b] text-white">
                  <th scope="col" className="px-4 py-3 font-bold uppercase tracking-wider text-xs sm:px-6 sm:py-4">Threshold</th>
                  <th scope="col" className="px-4 py-3 font-bold uppercase tracking-wider text-xs sm:px-6 sm:py-4">Requirement</th>
                  <th scope="col" className="px-4 py-3 font-bold uppercase tracking-wider text-xs sm:px-6 sm:py-4">Source</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#2d7a62] bg-[#1a5c4a]/60">
                  <th scope="row" className="px-4 py-3.5 font-semibold text-white sm:px-6 sm:py-4">
                    Income over{" "}
                    <a
                      href="https://www.gov.uk/guidance/how-to-register-your-charity-cc21b"
                      className="underline underline-offset-2 text-emerald-200 hover:text-white"
                    >
                      £5,000
                    </a>
                  </th>
                  <td className="px-4 py-3.5 text-emerald-100 sm:px-6 sm:py-4">Must register with the Charity Commission (CIOs always register)</td>
                  <td className="px-4 py-3.5 sm:px-6 sm:py-4">
                    <a
                      href="https://www.gov.uk/guidance/how-to-register-your-charity-cc21b"
                      className="underline underline-offset-2 text-emerald-200 hover:text-white text-xs"
                    >
                      CC21b
                    </a>
                  </td>
                </tr>
                <tr className="border-b border-[#2d7a62] bg-[#154a3b]/60">
                  <th scope="row" className="px-4 py-3.5 font-semibold text-white sm:px-6 sm:py-4">
                    Income over{" "}
                    <a
                      href="https://www.gov.uk/government/publications/independent-examination-of-charity-accounts-trustees-cc31"
                      className="underline underline-offset-2 text-emerald-200 hover:text-white"
                    >
                      £25,000
                    </a>
                  </th>
                  <td className="px-4 py-3.5 text-emerald-100 sm:px-6 sm:py-4">External scrutiny required: independent examination or audit</td>
                  <td className="px-4 py-3.5 sm:px-6 sm:py-4">
                    <a
                      href="https://www.gov.uk/government/publications/independent-examination-of-charity-accounts-trustees-cc31"
                      className="underline underline-offset-2 text-emerald-200 hover:text-white text-xs"
                    >
                      CC31
                    </a>
                  </td>
                </tr>
                <tr className="bg-[#1a5c4a]/60">
                  <th scope="row" className="px-4 py-3.5 font-semibold text-white sm:px-6 sm:py-4">
                    Income over{" "}
                    <a
                      href="https://www.gov.uk/government/publications/charity-reporting-and-accounting-the-essentials-november-2016-cc15d"
                      className="underline underline-offset-2 text-emerald-200 hover:text-white"
                    >
                      £1m
                    </a>
                  </th>
                  <td className="px-4 py-3.5 text-emerald-100 sm:px-6 sm:py-4">Statutory audit mandatory (also triggered by income over £250,000 with gross assets over £3.26m)</td>
                  <td className="px-4 py-3.5 sm:px-6 sm:py-4">
                    <a
                      href="https://www.gov.uk/government/publications/charity-reporting-and-accounting-the-essentials-november-2016-cc15d"
                      className="underline underline-offset-2 text-emerald-200 hover:text-white text-xs"
                    >
                      CC15d / CC31
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Free tools teaser ── */}
      <section className="border-b border-neutral-200 bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
            <div>
              <div className="section-label mb-4">Free tools</div>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl lg:text-4xl">
                Calculators to help trustees understand their obligations.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
                Our free calculators give trustees a quick read on whether they need an
                independent examination or a full audit, how much Gift Aid their donors
                could unlock, and what the GASDS small donations scheme adds. No sign-up,
                no data stored.
              </p>
              <div className="mt-8 space-y-3">
                {calculatorLinks.map((calc) => (
                  <Link
                    key={calc.href}
                    href={calc.href}
                    className={`group flex items-center justify-between border border-neutral-200 bg-white px-5 py-4 text-sm font-semibold text-neutral-800 hover:border-[#1a5c4a] hover:text-[#1a5c4a] transition-all ${focusRing}`}
                  >
                    {calc.title}
                    <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-[#1a5c4a] group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <div className="section-label mb-4">Guides and resources</div>
              <h2 className="mt-2 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                Plain English guides for trustees and finance leads.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                In-depth guides covering the full compliance landscape: from choosing
                the right charity structure to understanding SORP 2026.
              </p>
              <div className="mt-6 space-y-3">
                {guideLinks.map((guide) => (
                  <Link
                    key={guide.href}
                    href={guide.href}
                    className={`group flex items-center justify-between border border-neutral-200 bg-white px-5 py-4 text-sm font-semibold text-neutral-800 hover:border-[#1a5c4a] hover:text-[#1a5c4a] transition-all ${focusRing}`}
                  >
                    {guide.title}
                    <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-[#1a5c4a] group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why a specialist ── */}
      <section className="border-b border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="section-label mb-4">Why specialist matters</div>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            A generalist handles your compliance.{" "}
            <span className="text-[#1a5c4a]">We handle charity-specific accounting.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            Fund accounting, restricted income, the independent examination regime, Gift Aid
            declarations, the SORP, CIC34 reports: a generalist accountant encounters these
            occasionally. We deal with them every week across our charity and social-enterprise
            client base.
          </p>
          <div className="mt-12 overflow-x-auto border border-neutral-200">
            <table className="w-full min-w-[28rem] text-left text-sm sm:text-base">
              <caption className="sr-only">How {siteConfig.name} handles typical charity accounting areas</caption>
              <thead>
                <tr className="bg-[#1a5c4a] text-white">
                  <th scope="col" className="px-4 py-3 font-bold text-sm uppercase tracking-wider sm:px-6 sm:py-4">Area</th>
                  <th scope="col" className="px-4 py-3 font-bold text-sm uppercase tracking-wider sm:px-6 sm:py-4">Our approach</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    area: "Independent examination",
                    detail: "Conducted to CC31 standards, examiner's report produced, filed with the Commission on schedule",
                  },
                  {
                    area: "SORP-compliant accounts",
                    detail: "Accruals accounts and trustee annual reports to the current SORP (FRS 102), updated for SORP 2026 where applicable",
                  },
                  {
                    area: "Fund accounting",
                    detail: "Restricted and unrestricted income tracked separately from the first transaction",
                  },
                  {
                    area: "Gift Aid",
                    detail: "Declaration review, HMRC claim preparation, donor benefit limit checks, GASDS for small donations",
                  },
                  {
                    area: "Charity VAT",
                    detail: "Business/non-business apportionment, partial exemption, fundraising event exemptions, eligibility declarations",
                  },
                  {
                    area: "CIC34 filing",
                    detail: "Community interest report prepared and filed at Companies House alongside the annual accounts",
                  },
                  {
                    area: "Annual return",
                    detail: "Filed within the 10-month deadline; content calibrated to the charity's income tier",
                  },
                ].map((row, i) => (
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

      {/* ── Anonymised social proof ── */}
      <section className="bg-neutral-50 py-12 sm:py-16 lg:py-20" aria-labelledby="testimonials-heading">
        <div className={siteContainerLg}>
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="section-label mb-4">Real outcomes</div>
            <h2 id="testimonials-heading" className="text-2xl font-bold text-neutral-900 sm:text-3xl lg:text-4xl">
              What trustees and finance leads say
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-600">
              Composite accounts based on patterns across our charity and CIC clients.
              Names and specific figures anonymised. The compliance situations described are real.
            </p>
          </div>
          <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <figure
                key={i}
                className="relative bg-white border border-neutral-200 p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow"
              >
                <Quote className="absolute top-4 right-4 h-6 w-6 text-emerald-200" aria-hidden />
                <blockquote className="text-base sm:text-lg leading-relaxed text-neutral-800 font-medium pr-8">
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

      {/* ── Contact CTA ── */}
      <section className="relative overflow-hidden bg-[#0f2e24]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a5c4a]/30 via-neutral-900/0 to-neutral-900/0 pointer-events-none" />
        <div className={`${siteContainerLg} relative z-10 py-12 sm:py-20 lg:py-24`}>
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div className="section-label mb-6">Get started</div>
              <h2 className="text-2xl font-bold text-white sm:text-4xl lg:text-5xl">
                Talk to a charity accountant
              </h2>
              <p className="mt-4 sm:mt-6 text-lg sm:text-xl leading-relaxed text-emerald-100">
                Tell us about your charity, CIC or social enterprise. We will explain what
                your organisation needs, in plain English, with no obligation.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { title: "Charity and social-enterprise specialists only", sub: "We do not take general commercial clients" },
                  { title: "24-hour response", sub: "Usually the same working day" },
                  { title: "All conversations are confidential", sub: "We never discuss one client's affairs with another" },
                  { title: "England and Wales default", sub: "We flag Scotland and ask your jurisdiction upfront" },
                ].map((item) => (
                  <div key={item.title} className="flex items-center gap-4 text-emerald-100">
                    <div className="h-12 w-12 flex items-center justify-center bg-[#1a5c4a] text-white font-bold text-xl flex-shrink-0">
                      ✓
                    </div>
                    <div>
                      <div className="font-bold text-white">{item.title}</div>
                      <div className="text-sm text-emerald-300">{item.sub}</div>
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

      {/* ── FAQ ── */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
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
                  <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 font-semibold text-neutral-900 hover:text-[#1a5c4a] transition-colors list-none">
                    <span>{faq.question}</span>
                    <span
                      className="flex-shrink-0 text-[#1a5c4a] transition-transform group-open:rotate-45"
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

      {/* ── Blog/guides footer strip ── */}
      <section className="border-t border-neutral-200 bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="text-center max-w-3xl mx-auto">
            <div className="section-label mb-4">Charity accounting guides</div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl lg:text-4xl">
              Plain English guidance for trustees and finance leads.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
              Articles and guides on independent examination, SORP accounts, Gift Aid,
              charity VAT, CIC filing and trustee compliance. Written for people running
              organisations, not for accountants.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/blog" className={btnPrimary}>
                Browse all guides
              </Link>
              <Link
                href="/services/independent-examination"
                className="inline-flex items-center gap-2 text-[#1a5c4a] hover:text-[#154a3b] font-semibold text-sm sm:text-base transition-colors"
              >
                Independent examination service
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
