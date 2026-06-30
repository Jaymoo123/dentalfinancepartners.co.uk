import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, btnSecondary, siteContainerLg, sectionY } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import {
  JsonLd,
  buildOrganization,
  buildWebSite,
  buildFaqPage,
  buildAccountingService,
  buildService,
  buildBreadcrumb,
  type SchemaThing,
} from "@/lib/schema";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { SignupForm } from "@/components/newsletter/SignupForm";
import { ArrowRight } from "lucide-react";

const META_TITLE = "Small Business Accountants UK | Holloway Davies";
const META_DESC =
  "Fixed-fee accountants for UK small businesses: limited companies, sole traders and contractors. Corporation tax, VAT, payroll, self assessment and MTD.";

export const metadata: Metadata = {
  // `absolute` opts out of the layout title template so the brand is not doubled.
  title: { absolute: META_TITLE },
  description: META_DESC,
  alternates: { canonical: siteConfig.url },
  openGraph: {
    title: META_TITLE,
    description: META_DESC,
    url: siteConfig.url,
    type: "website",
    images: [{ url: siteConfig.publisherLogoUrl, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: META_TITLE,
    description: META_DESC,
  },
};

// Who we help — mapped to the lead-form segments, each linking to its pillar.
const segments = [
  {
    title: "Limited companies",
    body: "Statutory accounts, the CT600 corporation tax return, and the salary-versus-dividend split modelled to each director's personal position.",
    href: "/fundamentals/definitive-guide-limited-company-accountant",
    linkLabel: "Limited company accounting",
  },
  {
    title: "Sole traders",
    body: "Self assessment done properly, every expense you are entitled to claim, and a clear view of when incorporating starts to pay.",
    href: "/fundamentals/definitive-guide-sole-trader-accountant",
    linkLabel: "Sole trader accounting",
  },
  {
    title: "Contractors and freelancers",
    body: "IR35 status reviewed, the most efficient way to draw income, and the admin kept light so you can get on with billing.",
    href: "/fundamentals/definitive-guide-choosing-contractor-accountant-uk",
    linkLabel: "Contractor accounting",
  },
  {
    title: "Partnerships and LLPs",
    body: "Partnership returns, profit-share allocation, and each partner's self assessment, all handled together so the figures reconcile.",
    href: "/fundamentals/small-business-accountant-guide",
    linkLabel: "Small business guide",
  },
  {
    title: "Just starting out",
    body: "Sole trader or limited company, when to register for VAT, and the first-year decisions that are expensive to undo later.",
    href: "/fundamentals/limited-company-vs-sole-trader",
    linkLabel: "Sole trader vs limited company",
  },
];

// What we handle — entity coverage with an internal pillar link and an
// external HMRC / Companies House authority link per line.
const coverage = [
  {
    title: "Corporation tax and year-end accounts",
    body: "Statutory accounts and CT600 filing, with marginal relief modelled across the £50,000 to £250,000 band and the 19% small profits rate applied where it fits.",
    pillar: { href: "/fundamentals/how-does-corporation-tax-work", label: "How corporation tax works" },
    authority: {
      href: "https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual",
      label: "HMRC Company Taxation Manual",
    },
  },
  {
    title: "VAT and Making Tax Digital",
    body: "Registration timing against the £90,000 threshold, scheme selection (Standard, Flat Rate, Cash, Annual) and the quarterly Making Tax Digital discipline.",
    pillar: { href: "/fundamentals/vat-accountant", label: "When to register for VAT" },
    authority: { href: "https://www.gov.uk/vat-registration", label: "gov.uk VAT registration" },
  },
  {
    title: "Payroll, PAYE and pensions",
    body: "Monthly payroll, RTI submissions, employer National Insurance, salary-sacrifice schemes and workplace pension auto-enrolment.",
    pillar: { href: "/services", label: "Payroll services" },
    authority: { href: "https://www.gov.uk/paye-for-employers", label: "HMRC PAYE for employers" },
  },
  {
    title: "Self assessment and MTD for Income Tax",
    body: "Self assessment for sole traders, partners and directors, with Making Tax Digital for Income Tax phasing in from April 2026 for the self-employed and landlords over the income threshold.",
    pillar: { href: "/fundamentals/making-tax-digital-for-income-tax-guide", label: "MTD for Income Tax guide" },
    authority: {
      href: "https://www.gov.uk/guidance/check-when-to-sign-up-for-making-tax-digital-for-income-tax",
      label: "gov.uk MTD sign-up checker",
    },
  },
  {
    title: "R&D tax credits",
    body: "Merged-scheme R&D claims with the qualifying-activity narrative written in-house, costs eligibility reviewed, and enhanced support applied where the loss-making intensive route qualifies.",
    pillar: { href: "/fundamentals/r-and-d-tax-credits-explained", label: "R&D tax credits explained" },
    authority: {
      href: "https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual",
      label: "HMRC R&D (CIRD) manual",
    },
  },
  {
    title: "Companies House and exit planning",
    body: "Confirmation statements and annual accounts filed on time, plus Business Asset Disposal Relief planning (18% from April 2026, £1M lifetime limit) when it is time to sell or wind down.",
    pillar: { href: "/services", label: "All services" },
    authority: { href: "https://www.gov.uk/file-your-company-annual-accounts", label: "Companies House filing" },
  },
];

// Sole trader vs limited company at a glance (the decision element competitors carry).
const decisionRows = [
  {
    label: "Setting up",
    soleTrader: "Register for self assessment with HMRC. Minimal admin.",
    limited: "Incorporate at Companies House, then register for corporation tax.",
  },
  {
    label: "How profit is taxed",
    soleTrader: "Income tax plus Class 4 National Insurance on all profit.",
    limited: "Corporation tax (19% to 25%), then tax on the salary and dividends you draw.",
  },
  {
    label: "Public filing",
    soleTrader: "Your accounts stay private.",
    limited: "Accounts and directors sit on the public Companies House register.",
  },
  {
    label: "Best when",
    soleTrader: "Profits are modest and you want simplicity.",
    limited: "Profits are rising, you reinvest, or you want limited liability.",
  },
];

const faqs = [
  {
    question: "How much does a small business accountant cost?",
    answer:
      "Fees depend on complexity: turnover, payroll size, VAT scheme, number of directors, R&D activity, and whether you need management accounts as well as year-end. We quote a fixed fee in writing after a short discovery call, and nothing is added without your sign-off. As a rule of thumb a straightforward limited company costs less than a VAT-registered company running monthly payroll, and a sole trader return costs less again.",
  },
  {
    question: "Do I need an accountant for a limited company?",
    answer:
      "There is no legal requirement to use one, but a limited company carries obligations a sole trader does not: statutory accounts, a CT600 corporation tax return, a confirmation statement, and director self assessment, all to deadlines that carry automatic penalties. Most directors find a fixed-fee accountant costs less than the tax and penalties a good one saves, and frees the time to run the business.",
  },
  {
    question: "Can I switch my accountant part-way through the year?",
    answer:
      "Yes, and you do not need to wait for your year-end. We write to your current accountant for professional clearance and the handover information, move your records across, and pick up wherever things stand. Most switches are done within a couple of weeks with nothing for you to chase.",
  },
  {
    question: "Online accountant or local accountant: which is better?",
    answer:
      "For most UK small businesses the location of the office matters far less than the quality of the advice and how quickly you get a reply. We work cloud-first through Xero, FreeAgent or QuickBooks, with one named accountant on your file, so you get a national specialist who answers within a working day rather than whoever happens to be down the road.",
  },
  {
    question: "What does a fixed-fee accountant include?",
    answer:
      "Your fee is agreed up front and covers the scope you sign off: usually year-end accounts and tax filings, plus payroll, VAT or self assessment where relevant, and questions through the year. Ad-hoc advice is not billed by the hour. One-off projects outside the scope, such as an R&D claim, an incorporation or a disposal, are quoted separately before any work starts.",
  },
  {
    question: "Do you work with sole traders and partnerships, or only limited companies?",
    answer:
      "All four UK trading structures. Sole traders, partnerships, LLPs and limited companies are all on the engagement roster. The work that applies depends on the structure: self assessment for sole traders and partners, partnership returns where relevant, and corporation tax with director pay planning for limited companies.",
  },
  {
    question: "Should I be a sole trader or a limited company?",
    answer:
      "It depends mostly on profit. Below roughly the level where you draw all the profit to live on, a sole trader is simpler and the tax difference is small. Once profits rise and you can leave money in the business, a limited company usually wins on tax and gives you limited liability, at the cost of public filing and more admin. We model both on your real numbers before you decide.",
  },
  {
    question: "When does my business need to register for VAT?",
    answer:
      "You must register once your VAT-taxable turnover passes £90,000 in any rolling twelve-month period, or if you expect to pass it in the next thirty days alone. You can also register voluntarily below that, which sometimes pays. We watch the threshold for you and handle registration and scheme choice when the time comes.",
  },
  {
    question: "Who writes and reviews the content on this site?",
    answer:
      "Articles are written and reviewed by James Holloway, a senior accountant with the firm. Every figure is traceable to a primary source: HMRC guidance, Companies House, or the relevant statute. The content explains the mechanics; it is editorial, not tailored advice. For advice specific to your business, book a short call. No pitch, no obligation.",
  },
  {
    question: "How does the relationship work, week to week?",
    answer:
      "Cloud-first through Xero, FreeAgent or QuickBooks, depending on what you already use, with one named accountant on the engagement. Email and scheduled calls, with ad-hoc questions answered within one working day. The annual cycle runs from bookkeeping handover through VAT quarters where relevant, monthly payroll, year-end accounts, and a planning conversation before the next year starts.",
  },
];

// Composite snapshots based on patterns across our client base.
// Anonymised by structure: business type, scale, location, outcome.
// No specific clients named.
const testimonials = [
  {
    quote:
      "They flagged a marginal-relief miscalculation in our first review that had been missed for three years. Refund and reset, plus quarterly visibility we never had.",
    attribution: "Limited company, 12 staff, professional services, Bristol",
  },
  {
    quote:
      "Switching mid-year from sole trader to Ltd was the right call once they modelled it properly. About £11,000 saved in year one against a five-figure setup.",
    attribution: "Independent consultant, newly incorporated, Leeds",
  },
  {
    quote:
      "We were on Standard VAT when Flat Rate was clearly the better fit for our cost mix. Scheme review paid for itself inside a quarter.",
    attribution: "Two-director Ltd, e-commerce, Manchester",
  },
];

// --- Schema graph (one #organization @id graph) -----------------------------
const siteUrl = siteConfig.url;

const localBusinessSchema = buildAccountingService({
  name: siteConfig.name,
  description:
    "Fixed-fee accountants for UK small businesses: limited companies, sole traders, contractors and partnerships. Corporation tax, VAT, payroll, self assessment, MTD and R&D credits, with national coverage.",
  url: siteUrl,
  city: "Bradford",
  address: {
    streetAddress: "20 Ashfield Avenue, Shipley",
    addressLocality: "Bradford",
    postalCode: "BD18 3AL",
    addressCountry: "GB",
  },
});
// The builder hardcodes areaServed to City and omits priceRange / parentOrganization /
// structured opening hours; override for a national instance, mirroring the locations page.
Object.assign(localBusinessSchema as Record<string, unknown>, {
  areaServed: { "@type": "Country", name: "United Kingdom" },
  priceRange: "££",
  parentOrganization: { "@type": "Organization", "@id": `${siteUrl}#organization` },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "17:00",
  },
});

const serviceSchema = buildService({
  name: "Small business accounting and tax services",
  description:
    "Year-round accounting and tax for UK limited companies, sole traders, contractors and partnerships: corporation tax, VAT, payroll, self assessment, Making Tax Digital and R&D tax credits, on a fixed fee.",
  url: siteUrl,
  serviceType: "Small business accounting and tax advice",
  areaServed: "United Kingdom",
  hasOfferCatalog: {
    name: "Small business accounting services",
    items: [
      "Corporation tax and year-end accounts",
      "VAT and Making Tax Digital",
      "Payroll, PAYE and pensions",
      "Self assessment and partnership returns",
      "R&D tax credits",
      "Company formation and incorporation",
      "Director pay and tax planning",
      "Exit and capital gains planning",
    ],
  },
});

const webPageSchema: SchemaThing = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${siteUrl}#webpage`,
  url: siteUrl,
  name: META_TITLE,
  description: META_DESC,
  isPartOf: { "@id": `${siteUrl}#website` },
  about: { "@id": `${siteUrl}#organization` },
  inLanguage: "en-GB",
};

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          buildOrganization(),
          buildWebSite(),
          webPageSchema,
          localBusinessSchema,
          serviceSchema,
          buildBreadcrumb([{ label: "Home" }]),
          buildFaqPage(faqs),
        ].filter((s): s is NonNullable<typeof s> => s !== null)}
      />

      {/* 1. HERO — typographic, off-white, no photo */}
      <section className="bg-[#fafaf7] pt-20 pb-24 sm:pt-28 sm:pb-32 lg:pt-32 lg:pb-40">
        <div className={siteContainerLg}>
          <div className="max-w-4xl">
            <p className="font-mono text-xs uppercase tracking-widest text-orange-500">
              UK small business accountants
            </p>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-neutral-900 leading-[1.05] sm:text-5xl lg:text-6xl text-balance">
              Small business accountants{" "}
              <span className="text-orange-500">
                for UK limited companies, sole traders and contractors.
              </span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-600 sm:text-xl">
              UK business accounting, done with conviction. Year-round compliance and
              the advisory you actually want: one named accountant, cloud-first
              delivery, and fixed fees agreed up front.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className={btnPrimary}>
                Book a free call
              </Link>
              <Link href="/services" className={btnSecondary}>
                What we cover
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROOF BAND — hairlines, Geist Mono numbers */}
      <section className="border-y border-neutral-200 bg-[#fafaf7]">
        <div className={siteContainerLg}>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-neutral-200">
            {[
              { value: "Named", label: "Accountant on your file" },
              { value: "100+", label: "UK businesses served" },
              { value: "24h", label: "Response window" },
              { value: "Fixed", label: "Fee, never hourly" },
            ].map((stat, i) => (
              <div
                key={i}
                className={`py-10 sm:py-12 px-6 ${i === 0 ? "pl-0" : ""} ${i === 3 ? "pr-0" : ""}`}
              >
                <div className="font-mono text-3xl sm:text-4xl font-medium tracking-tight text-neutral-900">
                  {stat.value}
                </div>
                <div className="mt-3 text-xs font-medium uppercase tracking-wider text-neutral-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHO WE HELP — segment cards mapped to the lead-form structures */}
      <section className={`${sectionY} bg-[#fafaf7]`}>
        <div className={siteContainerLg}>
          <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-orange-500">
                Who we help
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
                A small business accountant for every UK structure.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-neutral-600">
                A good small business accountant does more than file your accounts. We
                handle the full year for UK limited companies, sole traders, contractors
                and partnerships: the compliance that has to be right, and the planning
                that decides how much tax you actually pay.
              </p>
            </div>
            <div>
              <ul className="grid sm:grid-cols-2 sm:gap-x-12">
                {segments.map((seg) => (
                  <li key={seg.title} className="border-t border-neutral-200 py-7">
                    <h3 className="text-lg font-semibold tracking-tight text-neutral-900">
                      {seg.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                      {seg.body}
                    </p>
                    <Link
                      href={seg.href}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-orange-600 hover:text-orange-700"
                    >
                      {seg.linkLabel}
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHAT WE HANDLE — entity coverage with pillar + authority links */}
      <section className={`${sectionY} bg-[#fafaf7] border-t border-neutral-200`}>
        <div className={siteContainerLg}>
          <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-orange-500">
                Practice
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
                What we handle across the year.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-neutral-600">
                Compliance is the floor, not the service. The work that pays for itself
                is the advice that sits on top: the right VAT scheme, a sensible pay
                structure, an R&amp;D claim that holds up, a disposal timed for relief.
              </p>
            </div>
            <div>
              <ul className="divide-y divide-neutral-200 border-t border-neutral-200">
                {coverage.map((c) => (
                  <li key={c.title} className="py-8">
                    <h3 className="text-xl font-semibold tracking-tight text-neutral-900">
                      {c.title}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-neutral-600 max-w-xl">
                      {c.body}
                    </p>
                    <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                      <Link
                        href={c.pillar.href}
                        className="font-medium text-neutral-900 underline underline-offset-4 decoration-neutral-300 hover:decoration-orange-500"
                      >
                        {c.pillar.label}
                      </Link>
                      <span className="text-neutral-300" aria-hidden>
                        ·
                      </span>
                      <a
                        href={c.authority.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-500 underline underline-offset-4 decoration-neutral-200 hover:text-neutral-700"
                      >
                        {c.authority.label}
                      </a>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DECISION TABLE — sole trader vs limited company */}
      <section className={`${sectionY} bg-[#fafaf7] border-t border-neutral-200`}>
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-widest text-orange-500">
              Decide
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
              Sole trader or limited company?
            </h2>
            <p className="mt-6 text-base leading-relaxed text-neutral-600">
              The structure you trade under changes how much tax you pay, what you file
              publicly, and how protected you are personally. The short version:
            </p>
          </div>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-y border-neutral-300">
                  <th className="py-4 pr-6 font-mono text-xs uppercase tracking-wider text-neutral-500" />
                  <th className="py-4 pr-6 font-semibold text-neutral-900">Sole trader</th>
                  <th className="py-4 font-semibold text-neutral-900">Limited company</th>
                </tr>
              </thead>
              <tbody>
                {decisionRows.map((row) => (
                  <tr key={row.label} className="border-b border-neutral-200 align-top">
                    <td className="py-4 pr-6 font-medium text-neutral-900">{row.label}</td>
                    <td className="py-4 pr-6 text-neutral-600">{row.soleTrader}</td>
                    <td className="py-4 text-neutral-600">{row.limited}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link
            href="/fundamentals/limited-company-vs-sole-trader"
            className="mt-8 inline-flex items-center gap-1 text-sm font-medium text-orange-600 hover:text-orange-700"
          >
            Read the full comparison
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      </section>

      {/* 6. WHO WE WORK WITH — single typographic statement, no tiles */}
      <section className={`${sectionY} bg-neutral-900 text-white`}>
        <div className={siteContainerLg}>
          <p className="font-mono text-xs uppercase tracking-widest text-orange-400">
            Coverage
          </p>
          <div className="mt-8 text-4xl font-semibold tracking-tight leading-[1.05] sm:text-6xl lg:text-7xl max-w-5xl">
            <span>Limited companies.</span>
            <span className="text-orange-400 mx-3">·</span>
            <span>Sole traders.</span>
            <span className="text-orange-400 mx-3">·</span>
            <span>Contractors.</span>
            <span className="text-orange-400 mx-3">·</span>
            <span>Partnerships.</span>
          </div>
          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-neutral-400">
            From a first incorporation decision through to a nine-figure exit.
            Cloud-first, nationally available, experienced accountants, fixed-fee.
          </p>
          <p className="mt-8 text-base text-neutral-400">
            Accountants across the UK.{" "}
            <Link
              href="/locations"
              className="text-orange-400 underline underline-offset-4 hover:text-orange-300"
            >
              Find your area
            </Link>{" "}
            or{" "}
            <Link
              href="/accountant-near-me"
              className="text-orange-400 underline underline-offset-4 hover:text-orange-300"
            >
              search accountants near you
            </Link>
            .
          </p>
        </div>
      </section>

      {/* 7. HOW FIXED FEES WORK */}
      <section className={`${sectionY} bg-[#fafaf7] border-t border-neutral-200`}>
        <div className={siteContainerLg}>
          <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-orange-500">
                Pricing
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
                How fixed fees work.
              </h2>
            </div>
            <div className="max-w-2xl text-base leading-relaxed text-neutral-600 space-y-5">
              <p>
                We quote a fixed fee in writing after a short discovery call, based on
                what the work actually involves: turnover, payroll size, VAT scheme,
                number of directors, and whether you need management accounts as well as
                year-end. Nothing is added without your sign-off.
              </p>
              <p>
                You can ask questions through the year without watching a clock, because
                we do not bill by the hour. The engagement letter is plain English, and
                you can leave with reasonable notice. One-off projects outside the agreed
                scope are always quoted before any work starts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. EDITORIAL PULL-QUOTES — stacked, large italic, mono attribution */}
      <section className={`${sectionY} bg-[#fafaf7] border-t border-neutral-200`}>
        <div className={siteContainerLg}>
          <div className="max-w-4xl">
            <p className="font-mono text-xs uppercase tracking-widest text-orange-500 mb-4">
              In practice
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
              What the work has produced.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-600 max-w-2xl">
              Composite snapshots based on patterns across our client base. Names
              and figures anonymised. The mechanics are real.
            </p>
          </div>
          <div className="mt-16 divide-y divide-neutral-200 border-t border-neutral-200">
            {testimonials.map((t, i) => (
              <figure key={i} className="py-12 grid grid-cols-1 lg:grid-cols-[3rem_1fr] gap-6 lg:gap-10">
                <div className="font-mono text-orange-500 text-5xl leading-none -mt-2" aria-hidden>
                  &ldquo;
                </div>
                <div>
                  <blockquote className="text-2xl sm:text-3xl font-medium italic leading-[1.3] tracking-tight text-neutral-900 max-w-3xl">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-6 font-mono text-xs uppercase tracking-widest text-neutral-500">
                    {t.attribution}
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 9. MANIFESTO BLOCK — short typographic statement */}
      <section className={`${sectionY} bg-[#fafaf7] border-t border-neutral-200`}>
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-widest text-orange-500">
              Position
            </p>
            <p className="mt-6 text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight leading-[1.25] text-neutral-900">
              Most UK firms compete on{" "}
              <span className="text-orange-500">price</span>. The ones worth hiring
              compete on the cost of the advice you did <em>not</em> get. We work to
              the second standard.
            </p>
          </div>
        </div>
      </section>

      {/* 10. NEWSLETTER — small card, single field, orange button */}
      <section className={`${sectionY} bg-white border-t border-neutral-200`}>
        <div className={siteContainerLg}>
          <div className="max-w-2xl">
            <SignupForm
              source="homepage-mid"
              variant="card"
              heading="The Director's Brief"
              body="One short note a week for UK business owners. Tax, structure, payroll, cash. Plain text, one CTA, unsubscribe in one click."
              ctaLabel="Subscribe"
            />
          </div>
        </div>
      </section>

      {/* 11. CTA — light, big H2, single primary button to /contact */}
      <section className={`${sectionY} bg-[#fafaf7] border-t border-neutral-200`}>
        <div className={siteContainerLg}>
          <div className="grid lg:grid-cols-[2fr_1fr] gap-12 items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-orange-500">
                Get started
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl text-balance">
                Talk to an accountant. Free, no obligation.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-600">
                Tell us briefly where the business sits today. We&apos;ll come back
                with a short note on what the engagement would look like and what it
                would cost. No pitch deck, no follow-up sequence.
              </p>
            </div>
            <div className="flex lg:justify-end">
              <Link href="/contact" className={btnPrimary}>
                Book a free call
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 12. FAQ — restyled Accordion */}
      <section className={`${sectionY} bg-[#fafaf7] border-t border-neutral-200`}>
        <div className={siteContainerLg}>
          <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-orange-500">
                Common questions
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
                The honest answers.
              </h2>
            </div>
            <div>
              <Accordion type="single" collapsible className="border-t border-neutral-200">
                {faqs.map((item, i) => (
                  <AccordionItem key={item.question} value={`faq-${i}`}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>
                      <p>{item.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
