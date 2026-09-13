import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteConfig } from "@/config/site";
import {
  ArrowRight,
  ShieldCheck,
  FileCheck,
  Heart,
  BookOpen,
  BadgePoundSterling,
  Calculator,
  Building2,
  ClipboardList,
} from "lucide-react";
import { buildFaqJsonLd } from "@/lib/schema";
import { allTools, toolPath } from "@/lib/calculators/registry";
/* Property-standard kit. The site-local src/components/ui/layout-utils.ts still
   paints the brand as a colour literal; the kit recipes read the primary-* ramp
   declared in globals.css @theme, which is what this rebuild is for. */
import {
  btnPrimary,
  btnSecondary,
  focusRing,
  sectionY,
  siteContainerLg,
} from "@accounting-network/web-shared/design/layout-utils";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { NoticeCard } from "@accounting-network/web-shared/design/primitives/NoticeCard";
import { DrawnTickList } from "@accounting-network/web-shared/design/marketing/DrawnTickList";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";

export function generateMetadata(): Metadata {
  return {
    title: `Specialist Charity Accountants UK`,
    description:
      `Specialist accountants for UK charities, CIOs, CICs and social enterprises. Independent examination, SORP-compliant accounts, Gift Aid, charity VAT and trustee compliance.`,
    alternates: { canonical: siteConfig.url },
  };
}

// ponytail: stats driven from HP verified figures only; no fee figures.
const keyStats = [
  {
    value: "£25,000",
    label: "External scrutiny threshold (£40,000 for financial years ending on or after 30 Sep 2026)",
    href: "https://www.gov.uk/government/publications/independent-examination-of-charity-accounts-trustees-cc31",
  },
  {
    value: "£1m",
    label: "Audit threshold (£1.5m for financial years ending on or after 30 Sep 2026)",
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
    body: "For charities with income between the examination threshold (£25,000, or £40,000 for financial years ending on or after 30 September 2026) and the audit threshold. We prepare the accounts with the examination in mind and connect you with an independent examiner.",
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
    title: "Crossing the external scrutiny income threshold",
    body: (
      <>
        Once gross income passes{" "}
        <a
          href="https://www.gov.uk/government/publications/independent-examination-of-charity-accounts-trustees-cc31"
          className="underline underline-offset-2"
        >
          £25,000
        </a>{" "}
        (£40,000 for financial years ending on or after 30 September 2026), trustees must
        arrange external scrutiny for the first time. Many boards reach this point mid-year
        and are unsure whether they need an independent examination or an audit. We assess
        the right route and arrange the engagement from there.
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

const audienceTiles = [
  { label: "Registered charities", href: "/services/charity-accounts" },
  { label: "Charitable Incorporated Organisations (CIOs)", href: "/services/charity-accounts" },
  { label: "Community Interest Companies (CICs)", href: "/for/cics" },
  { label: "Social enterprises", href: "/for/social-enterprises" },
];

const guideLinks = [
  { title: "Audit vs independent examination", href: "/guides/audit-vs-independent-examination" },
  { title: "Charity SORP 2026", href: "/guides/charity-sorp-2026" },
  { title: "Gift Aid: the complete guide", href: "/guides/gift-aid-complete-guide" },
  { title: "CIC: the complete guide", href: "/guides/cic-complete-guide" },
  { title: "Charity VAT guide", href: "/guides/charity-vat-guide" },
  { title: "Set up a charity or CIO", href: "/guides/set-up-a-charity-cio" },
];

// Derived from the calculator registry, which is the source of truth for slugs:
// a hardcoded copy here shipped a 404 (calc-gift-aid-calculator).
const calculatorLinks = allTools().map((tool) => ({
  title: tool.name,
  href: toolPath(tool.slug),
}));

const specialistRows = [
  {
    area: "Independent examination",
    detail: "Accounts prepared with the CC31 examination requirements in mind, and an independent examiner connected to your charity",
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
];

/* The three closing promises the "Get started" block carried as icon rows.
   They stay on the page verbatim, as a drawn tick list, because
   LeadCTAPanel.proofPoints is deliberately empty on this site (see receipt):
   nothing is invented, and no fee or turnaround wording is introduced. */
const closingPromises = [
  "Charity and social-enterprise specialists only. Charities, CIOs, CICs and social enterprises.",
  "Book your free, no-obligation call today. Tell us about your organisation and we will arrange a short introductory call.",
  "England and Wales default. We flag Scotland and ask your jurisdiction upfront.",
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
      "For financial years ending before 30 September 2026, trustees must arrange an independent examination or a full audit once gross income exceeds £25,000; at or below £25,000 no external scrutiny is required by the Charities Act, though the governing document may still require one. Above £250,000 income the examiner must be a member of one of the professional bodies listed in the Act. For financial years ending on or after 30 September 2026 those gates rise to £40,000 and £500,000.",
  },
  {
    question: "When does a charity need a full audit?",
    answer:
      "For financial years ending before 30 September 2026, a statutory audit is mandatory where income exceeds £1m in the year, or where income exceeds £250,000 AND gross assets exceed £3.26m. For financial years ending on or after 30 September 2026 the gates rise to £1.5m income, or £500,000 income with gross assets over £5m. A funder or governing document can require an audit below these thresholds. Independent examination is not permitted once the statutory audit gates are crossed (save in Commission-approved exceptional cases).",
  },
  {
    question: "Do you work with CICs as well as charities?",
    answer:
      "Yes. We prepare accounts and file the CIC34 community interest report for community interest companies. CICs are regulated by the Office of the Regulator of Community Interest Companies, not the Charity Commission, and they cannot claim Gift Aid or charity rate relief. We make sure CIC boards understand what does and does not apply to their structure.",
  },
  {
    question: "Can you prepare SORP-compliant accounts?",
    answer:
      "Yes. We prepare accruals accounts to the Charities SORP (FRS 102). For accounting periods starting on or after 1 January 2026 we apply SORP 2026. Non-company charities with income at or below £250,000 (£500,000 for financial years ending on or after 30 September 2026) may use receipts and payments accounts; charitable companies must prepare accruals accounts regardless of size.",
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

/** Ruled row card used by the tools and guides bands. */
const rowLink =
  "group flex items-center justify-between gap-4 rounded-xl bg-white px-5 py-4 text-sm font-semibold text-slate-800 ring-1 ring-slate-200/70 transition-all hover:text-primary-700 hover:ring-primary-600";

export default function HomePage() {
  return (
    <>
      {/* Organization JSON-LD is emitted once, by the root layout. A second copy
          here published the entity twice on every homepage visit. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(faqs) }}
      />

      {/* ── 1. Hero ── */}
      <section className="relative flex min-h-[520px] items-center overflow-hidden bg-primary-900 sm:min-h-[640px] lg:min-h-[720px]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-600/90 to-primary-900" />
        <div className={`${siteContainerLg} relative z-10 w-full py-16 sm:py-20`}>
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white ring-1 ring-primary-500">
              <Heart className="h-3.5 w-3.5" aria-hidden />
              {siteConfig.name}
            </div>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Specialist accountants for UK charities and social enterprises.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200 sm:text-xl">
              Independent examination, SORP-compliant accounts, Gift Aid, charity VAT and
              trustee compliance. We work exclusively with charities, CIOs, CICs and social
              enterprises, so every engagement draws on focused sector knowledge.
            </p>
            <div className="mt-10 flex flex-col flex-wrap gap-3 sm:flex-row sm:gap-4">
              {/* Inverted hero button, written out rather than composed from btnPrimary.
                  btnPrimary hardcodes `text-white` and its own ground, and a composed
                  override ties on specificity and loses on source order, which rendered
                  this CTA white on white. Geometry below mirrors btnPrimary exactly. */}
              <Link
                href="/contact"
                className="inline-flex min-h-12 min-w-[10rem] touch-manipulation items-center justify-center rounded-xl bg-white px-8 py-3.5 text-base font-bold text-primary-700 transition-all duration-150 hover:bg-primary-50 hover:text-primary-800 active:bg-primary-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
              >
                Talk to a charity accountant
              </Link>
              <Link
                href="/services/independent-examination"
                className={`inline-flex min-h-12 min-w-[10rem] touch-manipulation items-center justify-center rounded-xl border-2 border-white/40 bg-white/5 px-8 py-3.5 text-base font-bold text-white backdrop-blur-sm transition-all duration-150 hover:border-white/60 hover:bg-white/10 ${focusRing}`}
              >
                Independent examination
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-2.5 text-sm text-primary-100">
              <ShieldCheck className="h-4 w-4 flex-shrink-0" aria-hidden />
              <span className="font-medium">Charities, CIOs, CICs and social enterprises only. England and Wales default.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Threshold stats strip ── */}
      <section className="border-b border-slate-200 bg-white py-8 sm:py-10" aria-label="Key charity compliance thresholds">
        <div className={siteContainerLg}>
          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
            {keyStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <a
                  href={stat.href}
                  className={`font-mono text-2xl font-bold text-slate-900 underline-offset-4 transition-colors hover:text-primary-700 hover:underline sm:text-3xl lg:text-4xl ${focusRing} rounded`}
                >
                  {stat.value}
                </a>
                <div className="mt-1.5 text-xs font-semibold text-slate-600 sm:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Lede ── */}
      <section className="bg-slate-50 py-10 sm:py-12">
        <div className={siteContainerLg}>
          <p className="max-w-3xl text-lg leading-relaxed text-slate-700 sm:text-xl">
            Most charity trustees are volunteers, not finance professionals. The Charity Commission&apos;s
            compliance framework is detailed, the Gift Aid rules have real teeth, and the SORP is
            genuinely technical. We exist to take that burden off the board so trustees can focus on
            the charitable objects.
          </p>
        </div>
      </section>

      {/* ── 4. Who we work with ── */}
      <section className={`bg-white ${sectionY}`}>
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <Eyebrow>Who we work with</Eyebrow>
            <h2 className="text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              Small and medium charities, CIOs, CICs and social enterprises.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700 sm:mt-6 sm:text-lg">
              We focus on organisations that sit below the statutory audit threshold: charities
              that need an independent examination rather than a full audit, smaller charitable
              companies preparing SORP-compliant accruals accounts, and CICs that need their
              CIC34 filed alongside their Companies House accounts.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {audienceTiles.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`group block rounded-xl bg-slate-50 p-4 text-sm font-semibold text-slate-800 ring-1 ring-slate-200/70 transition-all hover:bg-primary-50 hover:ring-primary-600 ${focusRing}`}
              >
                {item.label}
                <ArrowRight className="mt-2 h-4 w-4 text-slate-400 transition-all group-hover:translate-x-1 group-hover:text-primary-700" />
              </Link>
            ))}
          </div>
          <div className="mt-8 max-w-3xl">
            <NoticeCard tone="slate" ground="white">
              <p className="text-left text-sm leading-relaxed text-slate-700 sm:text-base">
                Scotland: our default jurisdiction is England and Wales; please see the{" "}
                <a
                  href="https://www.oscr.org.uk/"
                  className="font-semibold text-primary-700 underline underline-offset-2 hover:text-primary-800"
                >
                  OSCR website
                </a>{" "}
                for Scottish charity requirements.
              </p>
            </NoticeCard>
          </div>
        </div>
      </section>

      {/* ── 5. Services grid ──
          Not the kit CoverageCards: its cards render no link, and all six of
          these are internal links in the homepage link floor. */}
      <section className={`bg-slate-50 ${sectionY}`}>
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <Eyebrow>Our services</Eyebrow>
            <h2 className="text-2xl font-bold leading-tight text-slate-900 sm:text-4xl">
              What we do for charities
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-700 sm:mt-4 sm:text-lg">
              Every service is built around how the Charity Commission framework, HMRC and Companies House
              work in practice for the charity and social-enterprise sector.
            </p>
          </div>
          <div className="mt-8 grid gap-5 sm:mt-10 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {servicesOverview.map((item) => {
              const Icon = item.Icon;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`group flex flex-col rounded-xl bg-white p-6 ring-1 ring-slate-200/70 transition-all hover:ring-primary-600 hover:shadow-[0_18px_40px_-28px_rgba(15,23,42,0.4)] sm:p-8 ${focusRing}`}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 ring-1 ring-primary-100">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-slate-900 group-hover:text-primary-700 sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:mt-3 sm:text-base">{item.body}</p>
                  <span className="mt-auto flex items-center gap-2 pt-5 text-sm font-semibold text-primary-700">
                    Learn more
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </Link>
              );
            })}
          </div>
          <div className="mt-8 sm:mt-10">
            <Link href="/for/social-enterprises" className={btnSecondary}>
              Social enterprises
            </Link>
          </div>
        </div>
      </section>

      {/* ── 6. Compliance moments ── */}
      <section className={`bg-white ${sectionY}`}>
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <Eyebrow>The moments that bring trustees to us</Eyebrow>
            <h2 className="text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              The compliance points most charities hit at some stage.
            </h2>
          </div>
          <div className="mt-8 grid gap-5 sm:mt-10 sm:gap-6 md:grid-cols-2">
            {complianceMoments.map((item) => (
              <article
                key={item.title}
                className="rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70 sm:p-8"
              >
                <h3 className="text-base font-bold text-slate-900 sm:text-lg">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:mt-3 sm:text-base">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Scrutiny thresholds table (dark band) ── */}
      <section className={`bg-primary-900 ${sectionY}`} aria-label="Charity scrutiny thresholds">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <Eyebrow onDark>At a glance</Eyebrow>
            <h2 className="text-2xl font-bold leading-tight text-white sm:text-4xl">
              Charity scrutiny thresholds at a glance (England and Wales)
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-primary-100 sm:text-base">
              These figures apply to financial years ending before 30 September 2026. For years
              ending on or after that date the scrutiny gates rise: examination £40,000, qualified
              examiner and accruals £500,000, audit £1.5m income (or £500,000 income with assets
              over £5m). Scotland is regulated by OSCR with different requirements.{" "}
              <a href="https://www.oscr.org.uk/" className="font-semibold text-white underline underline-offset-2">
                See OSCR
              </a>
              .
            </p>
          </div>
          <div className="mt-8 overflow-x-auto rounded-xl ring-1 ring-primary-500/50 sm:mt-10">
            <table className="w-full min-w-[32rem] text-left text-sm sm:text-base">
              <caption className="sr-only">Charity scrutiny threshold summary for England and Wales</caption>
              <thead>
                <tr className="bg-primary-800 text-white">
                  <th scope="col" className="px-4 py-3 text-xs font-bold uppercase tracking-wide sm:px-6 sm:py-4">Threshold</th>
                  <th scope="col" className="px-4 py-3 text-xs font-bold uppercase tracking-wide sm:px-6 sm:py-4">Requirement</th>
                  <th scope="col" className="px-4 py-3 text-xs font-bold uppercase tracking-wide sm:px-6 sm:py-4">Source</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-primary-500/40">
                  <th scope="row" className="px-4 py-3.5 font-semibold text-white sm:px-6 sm:py-4">
                    Income over{" "}
                    <a
                      href="https://www.gov.uk/guidance/how-to-register-your-charity-cc21b"
                      className="underline underline-offset-2 text-primary-100 hover:text-white"
                    >
                      £5,000
                    </a>
                  </th>
                  <td className="px-4 py-3.5 text-primary-100 sm:px-6 sm:py-4">Must register with the Charity Commission (CIOs always register)</td>
                  <td className="px-4 py-3.5 sm:px-6 sm:py-4">
                    <a
                      href="https://www.gov.uk/guidance/how-to-register-your-charity-cc21b"
                      className="text-xs underline underline-offset-2 text-primary-100 hover:text-white"
                    >
                      CC21b
                    </a>
                  </td>
                </tr>
                <tr className="border-b border-primary-500/40 bg-primary-800/50">
                  <th scope="row" className="px-4 py-3.5 font-semibold text-white sm:px-6 sm:py-4">
                    Income over{" "}
                    <a
                      href="https://www.gov.uk/government/publications/independent-examination-of-charity-accounts-trustees-cc31"
                      className="underline underline-offset-2 text-primary-100 hover:text-white"
                    >
                      £25,000
                    </a>
                  </th>
                  <td className="px-4 py-3.5 text-primary-100 sm:px-6 sm:py-4">External scrutiny required: independent examination or audit (£40,000 for financial years ending on or after 30 Sep 2026)</td>
                  <td className="px-4 py-3.5 sm:px-6 sm:py-4">
                    <a
                      href="https://www.gov.uk/government/publications/independent-examination-of-charity-accounts-trustees-cc31"
                      className="text-xs underline underline-offset-2 text-primary-100 hover:text-white"
                    >
                      CC31
                    </a>
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="px-4 py-3.5 font-semibold text-white sm:px-6 sm:py-4">
                    Income over{" "}
                    <a
                      href="https://www.gov.uk/government/publications/charity-reporting-and-accounting-the-essentials-november-2016-cc15d"
                      className="underline underline-offset-2 text-primary-100 hover:text-white"
                    >
                      £1m
                    </a>
                  </th>
                  <td className="px-4 py-3.5 text-primary-100 sm:px-6 sm:py-4">Statutory audit mandatory (also triggered by income over £250,000 with gross assets over £3.26m; gates rise to £1.5m / £500,000 / £5m for financial years ending on or after 30 Sep 2026)</td>
                  <td className="px-4 py-3.5 sm:px-6 sm:py-4">
                    <a
                      href="https://www.gov.uk/government/publications/charity-reporting-and-accounting-the-essentials-november-2016-cc15d"
                      className="text-xs underline underline-offset-2 text-primary-100 hover:text-white"
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

      {/* ── 8. Free tools ── */}
      <section className={`bg-slate-50 ${sectionY}`}>
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <Eyebrow>Free tools</Eyebrow>
            <h2 className="text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              Calculators to help trustees understand their obligations.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700 sm:text-lg">
              Our free calculators give trustees a quick read on whether they need an
              independent examination or a full audit, how much Gift Aid their donors
              could unlock, and what the GASDS small donations scheme adds. No sign-up,
              no data stored.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-3">
            {calculatorLinks.map((calc) => (
              <Link key={calc.href} href={calc.href} className={`${rowLink} ${focusRing}`}>
                {calc.title}
                <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition-all group-hover:translate-x-1 group-hover:text-primary-700" aria-hidden />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. Guides and resources ── */}
      <section className={`bg-white ${sectionY}`}>
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <Eyebrow>Guides and resources</Eyebrow>
            <h2 className="text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              Plain English guides for trustees and finance leads.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700 sm:text-lg">
              In-depth guides covering the full compliance landscape: from choosing
              the right charity structure to understanding SORP 2026.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-2">
            {guideLinks.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className={`${rowLink} bg-slate-50 ${focusRing}`}
              >
                {guide.title}
                <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition-all group-hover:translate-x-1 group-hover:text-primary-700" aria-hidden />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. Why a specialist ── */}
      <section className={`bg-slate-50 ${sectionY}`}>
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <Eyebrow>Why specialist matters</Eyebrow>
            <h2 className="text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              A generalist handles your compliance.{" "}
              <span className="text-primary-700">We handle charity-specific accounting.</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700 sm:mt-6 sm:text-lg">
              Fund accounting, restricted income, the independent examination regime, Gift Aid
              declarations, the SORP, CIC34 reports: a generalist accountant encounters these
              occasionally. They are the whole of what we work on.
            </p>
          </div>
          <div className="mt-8 overflow-x-auto rounded-xl ring-1 ring-slate-200/70 sm:mt-10">
            <table className="w-full min-w-[28rem] text-left text-sm sm:text-base">
              <caption className="sr-only">How {siteConfig.name} handles typical charity accounting areas</caption>
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th scope="col" className="px-4 py-3 text-sm font-semibold sm:px-6 sm:py-4">Area</th>
                  <th scope="col" className="px-4 py-3 text-sm font-semibold sm:px-6 sm:py-4">Our approach</th>
                </tr>
              </thead>
              <tbody>
                {specialistRows.map((row, i) => (
                  <tr key={row.area} className={i % 2 === 1 ? "bg-slate-50" : "bg-white"}>
                    <th scope="row" className="px-4 py-3.5 font-semibold text-slate-900 sm:px-6 sm:py-4">
                      {row.area}
                    </th>
                    <td className="px-4 py-3.5 text-slate-700 sm:px-6 sm:py-4">{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 11. Closing promises, the three rows the old "Get started" block
              carried. Same ground and no bottom padding, so this reads as the
              head of the conversion panel below rather than its own band. ── */}
      <section className="bg-white pt-12 sm:pt-16 lg:pt-20">
        <div className={siteContainerLg}>
          <DrawnTickList
            items={closingPromises}
            tickClassName="text-primary-600"
            className="max-w-3xl space-y-3 text-sm leading-relaxed text-slate-700 sm:space-y-4 sm:text-base"
          />
        </div>
      </section>

      {/* ── 12. Conversion panel. `contained` on a white ground, because the
              navy variant would put a dark field directly above the dark
              footer. `proofPoints` is deliberately EMPTY: see the receipt. ── */}
      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          eyebrow="Get started"
          title="Talk to a charity accountant"
          description="Tell us about your charity, CIC or social enterprise. We will explain what your organisation needs, in plain English, with no obligation."
          proofPoints={[]}
          formTitle="Get in touch"
          form={<LeadForm submitLabel="Send enquiry" />}
          contained
          ground="white"
        />
      </div>

      {/* ── 13. FAQ. Native <details>, not the kit FaqSection: the accordion
              unmounts closed answers, and this page publishes those answers in
              FAQ JSON-LD, so they have to stay in the server HTML. ── */}
      <section className={`bg-white ${sectionY}`}>
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mb-8 text-2xl font-bold text-slate-900 sm:mb-12 sm:text-4xl">
              Common questions
            </h2>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl bg-slate-50 ring-1 ring-slate-200/70 transition-colors open:ring-primary-600 hover:ring-primary-600"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 text-sm font-bold text-slate-900 transition-colors hover:text-primary-700 sm:px-6 sm:py-5 sm:text-base">
                  <span>{faq.question}</span>
                  <span
                    className="flex-shrink-0 text-primary-600 transition-transform group-open:rotate-45"
                    aria-hidden
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                    </svg>
                  </span>
                </summary>
                <div className="border-t border-slate-200 bg-white px-4 py-4 text-sm leading-relaxed text-slate-700 sm:px-6 sm:py-5 sm:text-base">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 14. Closing guides band ── */}
      <section className={`border-t border-slate-200 bg-slate-50 ${sectionY}`}>
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <Eyebrow>Charity accounting guides</Eyebrow>
            <h2 className="text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              Plain English guidance for trustees and finance leads.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700 sm:text-lg">
              Articles and guides on independent examination, SORP accounts, Gift Aid,
              charity VAT, CIC filing and trustee compliance. Written for people running
              organisations, not for accountants.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4 sm:mt-10">
            <Link href="/blog" className={btnPrimary}>
              Browse all guides
            </Link>
            <Link
              href="/services/independent-examination"
              className={`inline-flex items-center gap-2 text-sm font-semibold text-primary-700 transition-colors hover:text-primary-800 sm:text-base ${focusRing} rounded`}
            >
              Independent examination service
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
