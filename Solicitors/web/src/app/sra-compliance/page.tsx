import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CTASection } from "@/components/ui/CTASection";
import { btnPrimary, sectionY, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `SRA Compliance & Trust Accounting | ${siteConfig.name}`,
  description: "Expert SRA Accounts Rules compliance for solicitors. Client money handling, trust accounting, 5-week reconciliations, and annual Accountant's Reports. COFA support and breach prevention.",
  alternates: { canonical: `${siteConfig.url}/sra-compliance` },
  openGraph: {
    title: `SRA Compliance & Trust Accounting | ${siteConfig.name}`,
    description: "Expert SRA Accounts Rules compliance for solicitors. Client money handling, trust accounting, 5-week reconciliations, and annual Accountant's Reports.",
    url: `${siteConfig.url}/sra-compliance`,
    type: "website",
  },
};

const complianceAreas = [
  {
    title: "Client account reconciliations",
    description: "5-week reconciliation cycles ensuring client money is properly accounted for and SRA rules are met. We identify discrepancies early and ensure your client accounts are audit-ready.",
  },
  {
    title: "Trust accounting",
    description: "Proper handling of client money, trust funds, and stakeholder balances. We ensure your trust accounting meets SRA requirements and provides clear audit trails.",
  },
  {
    title: "SRA Accountant's Reports",
    description: "Annual Accountant's Reports prepared by qualified reporting accountants. We review your client money handling, identify any issues, and provide the required report to the SRA.",
  },
  {
    title: "COFA support",
    description: "Ongoing support for Compliance Officers for Finance and Administration. We help you understand your responsibilities, maintain proper records, and respond to SRA queries.",
  },
  {
    title: "Breach prevention",
    description: "Proactive monitoring and guidance to prevent SRA Accounts Rules breaches. We help you implement proper controls and procedures to protect your practicing certificate.",
  },
  {
    title: "Client ledger management",
    description: "Accurate maintenance of client ledgers, matter accounting, and proper allocation of receipts and payments. We ensure your records meet SRA standards.",
  },
];

const commonIssues = [
  {
    title: "Late or incomplete reconciliations",
    impact: "SRA breach risk",
    solution: "We implement 5-week reconciliation schedules with automated checks and early warning systems.",
  },
  {
    title: "Mixed client and office money",
    impact: "Accounts Rules breach",
    solution: "Clear segregation procedures, proper allocation protocols, and regular reviews to prevent mixing.",
  },
  {
    title: "Inadequate record-keeping",
    impact: "Failed Accountant's Report",
    solution: "Structured record-keeping systems, client ledger reviews, and proper documentation protocols.",
  },
  {
    title: "Unclear COFA responsibilities",
    impact: "Personal liability exposure",
    solution: "COFA training, responsibility mapping, and ongoing compliance support to protect you personally.",
  },
];

export default function SRACompliancePage() {
  return (
    <>
      <section
        className={sectionY}
        style={{
          background: "linear-gradient(135deg, rgba(196, 30, 58, 0.75) 0%, rgba(160, 24, 41, 0.80) 100%), url('https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=2070') center/cover",
          color: "white",
        }}
      >
        <div className={siteContainerLg}>
          <Breadcrumb
            items={[{ label: "SRA Compliance", href: "/sra-compliance" }]}
          />

          <div className="mx-auto mt-8 max-w-3xl text-center">
            <h1 className="font-serif text-4xl font-bold leading-tight md:text-5xl">
              SRA Accounts Rules compliance and trust accounting
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/90">
              Expert client money management, trust accounting, and SRA compliance for solicitors and law firms. We ensure your client accounts meet regulatory standards and protect your practicing certificate.
            </p>
            <div className="mt-10">
              <Link href="/contact" className={btnPrimary} style={{ background: "white", borderColor: "white", color: "var(--primary)" }}>
                Book free compliance review
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={sectionY}>
        <div className={siteContainerLg}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">
              The challenge
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-[var(--primary)] md:text-4xl">
              SRA compliance is getting harder
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
              26.2% of SRA firm closures in 2024-25 were due to accounting breaches—up from 18.6% the previous year. With heightened regulatory scrutiny and increasingly complex Accounts Rules, you need specialist accountants who understand SRA compliance as well as you do.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-3">
            {complianceAreas.map((area, i) => (
              <div key={i} className="card-premium">
                <h3 className="text-lg font-semibold text-[var(--primary)]">{area.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionY} style={{ background: "var(--surface-elevated)" }}>
        <div className={siteContainerLg}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">
              Common issues
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-[var(--primary)] md:text-4xl">
              What we help you avoid
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
              These are the most common SRA compliance issues we see when solicitors come to us from generalist accountants:
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl space-y-6">
            {commonIssues.map((issue, i) => (
              <div key={i} className="card-premium">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[var(--primary)]">{issue.title}</h3>
                    <p className="mt-2 text-sm font-medium text-red-600">
                      Impact: {issue.impact}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
                      <strong className="text-[var(--primary)]">Our solution:</strong> {issue.solution}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionY}>
        <div className={siteContainerLg}>
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">
                Get started
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-[var(--primary)] md:text-4xl">
                Book your free compliance review
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
                Whether you're concerned about SRA compliance, need help with client account reconciliations, or want to ensure your trust accounting is correct, we're here to help. Fill in the form below and we'll arrange a short introductory call.
              </p>
            </div>

            <div className="mx-auto mt-10 max-w-2xl rounded-xl border border-[var(--border)] bg-white p-8 shadow-sm">
              <h3 className="text-center text-xl font-semibold text-[var(--primary)]">
                Free SRA compliance review
              </h3>
              <p className="mt-2 text-center text-sm text-[var(--ink-soft)]">
                We'll review your current client money procedures and identify any compliance gaps—no obligation, no charge.
              </p>
              <div className="mt-6">
                <Link href="/contact" className={btnPrimary + " w-full"}>
                  Request compliance review
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection 
        title="Ensure your SRA compliance is watertight"
        description="Book a free compliance review to identify any gaps in your client money procedures."
      />
    </>
  );
}
