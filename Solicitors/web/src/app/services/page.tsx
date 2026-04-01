import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CTASection } from "@/components/ui/CTASection";
import { btnPrimary, sectionY, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Services | ${siteConfig.name}`,
  description: "Comprehensive accounting services for UK solicitors and law firms. SRA compliance, trust accounting, partnership tax, LLP conversion, practice succession, and strategic tax planning.",
  alternates: { canonical: `${siteConfig.url}/services` },
  openGraph: {
    title: `Services | ${siteConfig.name}`,
    description: "Comprehensive accounting services for UK solicitors and law firms. SRA compliance, trust accounting, partnership tax, LLP conversion, practice succession, and strategic tax planning.",
    url: `${siteConfig.url}/services`,
    type: "website",
  },
};

const services = [
  {
    title: "SRA Compliance & Trust Accounting",
    description: "Expert client money management and regulatory compliance",
    items: [
      "Client account reconciliations (5-week cycles)",
      "Trust accounting and client money handling",
      "Annual SRA Accountant's Reports",
      "COFA support and compliance guidance",
      "Client ledger management",
      "Breach prevention and remediation",
    ],
    cta: "Learn about SRA compliance",
    href: "/sra-compliance",
  },
  {
    title: "Sole Practitioner Tax",
    description: "Complete tax services for sole practitioner solicitors",
    items: [
      "Self-assessment tax returns",
      "Allowable expense claims and optimization",
      "Making Tax Digital (MTD) preparation",
      "Quarterly submission support (from April 2026)",
      "Professional fees and subscriptions",
      "Tax planning and advisory",
    ],
    cta: "Read about sole practitioner tax",
    href: "/blog",
  },
  {
    title: "Partnership & LLP Accounting",
    description: "Specialist accounting for law firm partnerships and LLPs",
    items: [
      "Partnership tax returns and profit allocation",
      "LLP member taxation and compliance",
      "Partner drawings vs profit share guidance",
      "Basis Period Reform navigation",
      "LLP conversion tax analysis",
      "Structure optimization advice",
    ],
    cta: "Explore partnership accounting",
    href: "/blog",
  },
  {
    title: "VAT & Compliance",
    description: "Expert VAT guidance for legal services",
    items: [
      "VAT on legal services (20% standard rate)",
      "Disbursements vs expenses treatment",
      "Counsel fees VAT handling",
      "VAT registration and thresholds",
      "Quarterly VAT returns",
      "VAT compliance reviews",
    ],
    cta: "Learn about VAT for solicitors",
    href: "/blog",
  },
  {
    title: "Practice Finance & Cash Flow",
    description: "Working capital and cash flow management for law firms",
    items: [
      "Cash flow forecasting and management",
      "Lock-up reduction strategies (WIP + debtors)",
      "Working capital optimization",
      "Partner drawings planning",
      "Practice finance options",
      "Debt management and restructuring",
    ],
    cta: "Read about cash flow management",
    href: "/blog",
  },
  {
    title: "Practice Succession & Sale",
    description: "Expert guidance on practice transitions and valuations",
    items: [
      "Practice valuation and goodwill calculation",
      "Partner retirement planning",
      "Succession planning and structure",
      "Practice sale tax implications",
      "Exit strategy advice",
      "Business Asset Disposal Relief",
    ],
    cta: "Explore succession planning",
    href: "/blog",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className={sectionY}>
        <div className={siteContainerLg}>
          <Breadcrumb items={[{ label: "Services", href: "/services" }]} />

          <div className="mx-auto mt-8 max-w-3xl text-center">
            <h1 className="font-serif text-4xl font-bold leading-tight text-[var(--primary)] md:text-5xl">
              Specialist accounting services for solicitors and law firms
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[var(--ink-soft)]">
              From SRA Accounts Rules compliance to strategic tax planning, we provide comprehensive accounting services tailored exclusively to the legal sector. Whether you're a sole practitioner, law firm partner, or practice manager, we understand your unique challenges and regulatory environment.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <div key={i} className="card-premium flex flex-col">
                <h2 className="text-xl font-semibold text-[var(--primary)]">{service.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
                  {service.description}
                </p>
                <ul className="mt-6 space-y-2">
                  {service.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-[var(--ink-soft)]">
                      <span className="mt-1 text-[var(--accent)]">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-6">
                  <Link
                    href={service.href}
                    className="text-sm font-semibold text-[var(--primary)] hover:text-[var(--primary-soft)]"
                  >
                    {service.cta} →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-16 max-w-3xl text-center">
            <h2 className="font-serif text-2xl font-bold text-[var(--primary)] md:text-3xl">
              Need help with something specific?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
              Every legal practice has unique accounting needs. Whether you're dealing with SRA compliance issues, considering LLP conversion, planning partner retirement, or managing practice cash flow, we're here to provide specialist advice.
            </p>
            <div className="mt-8">
              <Link href="/contact" className={btnPrimary}>
                Book free consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection 
        title="Need specialist accounting advice?"
        description="Every legal practice has unique accounting needs. Book a free consultation to discuss your specific situation."
      />
    </>
  );
}
