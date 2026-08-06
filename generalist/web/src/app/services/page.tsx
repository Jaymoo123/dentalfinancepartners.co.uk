import type { Metadata } from "next";
import Link from "next/link";
import { siteContainerLg, sectionY, btnPrimary, btnSecondary } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";
import { JsonLd, buildService, buildBreadcrumb } from "@/lib/schema";
import { ServiceTiers } from "@accounting-network/web-shared/components/ServiceTiers";
import { StatsBar } from "@accounting-network/web-shared/components/StatsBar";
import { serviceTiers, siteStats } from "@/config/service-tiers";

export const metadata: Metadata = {
  // Brand-less title: the layout template appends " | Holloway Davies" once.
  title: `Small Business Accounting Services`,
  description: `Accounting, tax and advisory for UK small businesses: corporation tax, VAT, payroll, self assessment, R&D credits and exit planning. Fixed fees, one named accountant.`,
  alternates: { canonical: `${siteConfig.url}/services` },
  openGraph: {
    title: `Small Business Accounting Services | ${siteConfig.name}`,
    description: "Accounting, tax and advisory for UK small businesses. Fixed fees, one named accountant.",
    url: `${siteConfig.url}/services`,
    type: "website",
  },
};

const services = [
  {
    n: "01",
    title: "Year-end accounts & corporation tax",
    body: "Statutory accounts to FRS 102 / FRS 105, CT600 filings, marginal relief modelling between £50,000 and £250,000, group relief where it applies. Filed accurately, filed on time.",
    bullets: [
      "Statutory annual accounts",
      "Corporation tax computation and CT600",
      "Marginal relief planning",
      "Companies House filings",
    ],
  },
  {
    n: "02",
    title: "Director pay and tax planning",
    body: "Optimal salary-and-dividend split for each director&rsquo;s personal tax position, modelled annually and recalibrated when thresholds move. Pension contributions, BIK strategy, P11D where relevant.",
    bullets: [
      "Salary vs dividend optimisation",
      "Director SIPP contributions",
      "Self assessment for directors",
      "Tax-efficient extraction planning",
    ],
  },
  {
    n: "03",
    title: "VAT and Making Tax Digital",
    body: "Registration timing against the £90,000 threshold, scheme selection (Standard, Flat Rate, Cash, Annual), partial-exemption handling, quarterly returns, MTD-compliant software setup.",
    bullets: [
      "VAT registration and scheme review",
      "Quarterly returns (MTD)",
      "Partial exemption and reverse-charge",
      "EORI and import VAT where relevant",
    ],
  },
  {
    n: "04",
    title: "Payroll, PAYE and pensions",
    body: "Monthly payroll runs, RTI submissions, Employment Allowance claims (up to £10,500), salary-sacrifice schemes, workplace pension administration and auto-enrolment.",
    bullets: [
      "Monthly payroll and payslips",
      "RTI and FPS submissions",
      "P60s and P11Ds",
      "Auto-enrolment compliance",
    ],
  },
  {
    n: "05",
    title: "R&D tax credits",
    body: "Merged-scheme claims under the post-April-2024 regime, qualifying-activity narrative written by qualified staff, costs eligibility review, ERIS where the loss-making intensive route applies.",
    bullets: [
      "Eligibility and scope assessment",
      "Technical narrative drafting",
      "Cost identification and apportionment",
      "Defence in the event of enquiry",
    ],
  },
  {
    n: "06",
    title: "Incorporation and structure",
    body: "When to move from sole trader to Ltd, the real cost of incorporation (SDLT, CGT where property is involved), holding-company design, alphabet shares, group restructures.",
    bullets: [
      "Sole-trader-to-Ltd modelling",
      "Holding-company design",
      "Share class engineering",
      "Group restructuring",
    ],
  },
  {
    n: "07",
    title: "Self assessment and partnership returns",
    body: "SA100 for sole traders, partners and Ltd directors. Partnership SA800 returns. Capital gains where they arise. Making Tax Digital for ITSA from April 2026 onwards.",
    bullets: [
      "SA100 self assessment",
      "SA800 partnership returns",
      "Capital gains reporting",
      "MTD ITSA readiness",
    ],
  },
  {
    n: "08",
    title: "Exit and capital gains planning",
    body: "Business Asset Disposal Relief (14% in 2025/26, 18% from 6 April 2026, £1M lifetime), holding-period management, share buy-back vs liquidation, earn-out structuring.",
    bullets: [
      "BADR eligibility and timing",
      "CGT modelling on disposal",
      "Share buy-backs and liquidation",
      "Earn-out structure review",
    ],
  },
];

const included = [
  {
    label: "Fixed fees",
    body: "Quoted in writing before engagement starts. No hourly billing on questions; no year-end surprises.",
  },
  {
    label: "Named accountant",
    body: "One accountant on the engagement, consistent throughout. No call-centre routing.",
  },
  {
    label: "Cloud-first",
    body: "Xero, FreeAgent or QuickBooks depending on what you use. We meet your stack, not the other way round.",
  },
  {
    label: "24-hour reply",
    body: "Questions answered within one working day, usually same day. Office hours, not a 9-to-5 portal.",
  },
];

export default function ServicesPage() {
  const serviceSchema = buildService({
    name: "Accounting and tax services for UK small businesses",
    description:
      "Year-end accounts and corporation tax, VAT and Making Tax Digital, payroll, director pay planning, R&D tax credits, incorporation, self assessment and exit planning for UK small businesses.",
    url: "/services",
    serviceType: "Small business accounting and tax advice",
    areaServed: "United Kingdom",
    hasOfferCatalog: {
      name: "Service lines",
      items: services.map((s) => s.title),
    },
  });
  const breadcrumbSchema = buildBreadcrumb([
    { label: "Home", href: "/" },
    { label: "Services" },
  ]);
  return (
    <>
      <JsonLd data={[serviceSchema, breadcrumbSchema]} />
      {/* Hero */}
      <section className={`${sectionY} bg-[#fafaf7]`}>
        <div className={siteContainerLg}>
          <div className="max-w-4xl">
            <p className="font-mono text-xs uppercase tracking-widest text-orange-500">
              Services
            </p>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-neutral-900 leading-[1.05] sm:text-6xl lg:text-7xl text-balance">
              The full <span className="text-orange-500">annual cycle.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-600 sm:text-xl">
              Eight service lines covering everything a UK business needs across a
              trading year, from incorporation through annual filings to exit. One
              named accountant, fixed fee, plain English.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className={btnPrimary}>
                Book a free call
              </Link>
              <Link href="/calculators" className={btnSecondary}>
                Try the calculators
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Service tiers */}
      <section className={`${sectionY} bg-[#fafaf7] border-t border-neutral-200`}>
        <div className={siteContainerLg}>
          <p className="font-mono text-xs uppercase tracking-widest text-orange-500 mb-2">
            How we can help
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 mb-8">
            From self-serve tools to a full annual engagement.
          </h2>
          <ServiceTiers tiers={serviceTiers} featuredBadge="Most Popular" />
        </div>
      </section>

      {/* Service lines */}
      <section className={`${sectionY} bg-[#fafaf7] border-t border-neutral-200`}>
        <div className={siteContainerLg}>
          <ul className="grid gap-12 md:grid-cols-2 lg:gap-x-16">
            {services.map((s) => (
              <li key={s.n} className="border-t border-neutral-200 pt-8">
                <div className="grid grid-cols-[3rem_1fr] gap-4">
                  <div className="font-mono text-sm font-medium text-orange-500 pt-1">
                    {s.n}
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                      {s.title}
                    </h2>
                    <p
                      className="mt-3 text-base leading-relaxed text-neutral-600 max-w-prose"
                      dangerouslySetInnerHTML={{ __html: s.body }}
                    />
                    <ul className="mt-5 space-y-2">
                      {s.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-3 text-sm text-neutral-700"
                        >
                          <span className="text-orange-500 font-mono pt-0.5">·</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#fafaf7] border-t border-neutral-200 py-8">
        <div className={siteContainerLg}>
          <StatsBar stats={siteStats} />
        </div>
      </section>

      {/* What's included */}
      <section className={`${sectionY} bg-neutral-900 text-white`}>
        <div className={siteContainerLg}>
          <p className="font-mono text-xs uppercase tracking-widest text-orange-400">
            What&rsquo;s in every engagement
          </p>
          <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {included.map((item) => (
              <div key={item.label}>
                <h3 className="text-lg font-semibold tracking-tight text-white">
                  {item.label}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-300">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + lead form */}
      <section className={`${sectionY} bg-[#fafaf7] border-t border-neutral-200`}>
        <div className={siteContainerLg}>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-orange-500">
                Next step
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl text-balance">
                A short call. A clear quote. No follow-up sequence.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-600">
                Tell us where the business sits today and which service lines you need.
                We come back with a fixed-fee quote and a short note on what the
                engagement would look like. No pitch deck, no obligation.
              </p>
              <p className="mt-8 text-sm text-neutral-500">
                Prefer to browse first?{" "}
                <Link
                  href="/calculators"
                  className="font-medium text-orange-600 underline underline-offset-4 hover:text-orange-700"
                >
                  Try the calculators
                </Link>{" "}
                or{" "}
                <Link
                  href="/contact"
                  className="font-medium text-orange-600 underline underline-offset-4 hover:text-orange-700"
                >
                  see other ways to reach us
                </Link>
                .
              </p>
            </div>
            <div className="bg-white border border-neutral-200 p-6 sm:p-8">
              <h3 className="text-xl font-semibold tracking-tight text-neutral-900">
                Request a fixed-fee quote
              </h3>
              <p className="mt-2 text-sm text-neutral-600">
                One named accountant will reply within one working day.
              </p>
              <div className="mt-6">
                <LeadForm redirectOnSuccess={false} submitLabel="Request a quote" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
