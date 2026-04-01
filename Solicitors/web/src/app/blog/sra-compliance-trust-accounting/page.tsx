import type { Metadata } from "next";
import Link from "next/link";
import { contentNarrow, focusRing, sectionY } from "@/components/ui/layout-utils";
import { getAllPosts, calculateReadTime } from "@/lib/blog";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "Complete SRA Compliance Guide for UK Law Firms | Accounts for Lawyers",
  description:
    "Comprehensive guide to SRA Accounts Rules compliance, client money handling, trust accounting, and annual accountant reports for UK solicitors and law firms.",
  alternates: { canonical: `${siteConfig.url}/blog/sra-compliance-trust-accounting` },
  openGraph: {
    title: "Complete SRA Compliance Guide for UK Law Firms",
    description:
      "Comprehensive guide to SRA Accounts Rules compliance, client money handling, trust accounting, and annual accountant reports for UK solicitors.",
    url: `${siteConfig.url}/blog/sra-compliance-trust-accounting`,
    type: "article",
  },
};

export default function SRACompliancePillarPage() {
  const allPosts = getAllPosts();
  const relatedPosts = allPosts.filter((p) => p.category === "SRA Compliance & Trust Accounting");

  return (
    <article className={`${contentNarrow} ${sectionY}`}>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "SRA Compliance & Trust Accounting" },
        ]}
      />

      <header className="border-l-4 border-[var(--primary)] bg-[var(--surface)] p-8">
        <h1 className="text-3xl font-bold leading-tight text-[var(--ink)] sm:text-4xl md:text-5xl">
          Complete SRA Compliance Guide for UK Law Firms
        </h1>
        <p className="mt-4 text-lg text-[var(--ink-soft)] leading-relaxed">
          Everything you need to know about SRA Accounts Rules compliance, client money handling, trust accounting, and annual accountant reports for UK solicitors and law firms.
        </p>
      </header>

      <div className="mt-10 space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Understanding SRA Accounts Rules</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
            The SRA Accounts Rules govern how solicitors handle client money and maintain financial records. These rules exist to protect client funds and maintain public confidence in the legal profession. Every law firm holding client money must comply, regardless of size.
          </p>
          <p className="text-base leading-relaxed text-[var(--ink-soft)]">
            The rules cover client account operation, record-keeping requirements, reconciliation procedures, and the annual accountant's report. Understanding these requirements is essential for every COFA (Compliance Officer for Finance and Administration) and practice manager.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Client Money Handling</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
            Client money must be kept separate from practice funds at all times. This separation protects client funds and ensures compliance with SRA requirements. Proper client money handling involves:
          </p>
          <ul className="space-y-2 text-base text-[var(--ink-soft)] ml-6 list-disc">
            <li>Maintaining separate client and office bank accounts</li>
            <li>Recording all client money transactions promptly and accurately</li>
            <li>Performing regular reconciliations (at least monthly)</li>
            <li>Ensuring client accounts never go overdrawn</li>
            <li>Transferring money between accounts only when authorised</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Trust Accounting Requirements</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
            Trust accounting for solicitors involves maintaining detailed records of all client money movements. Your accounting system must provide a complete audit trail showing:
          </p>
          <ul className="space-y-2 text-base text-[var(--ink-soft)] ml-6 list-disc">
            <li>Individual client ledgers showing all transactions</li>
            <li>Matter-specific records for each case or transaction</li>
            <li>Bank account records reconciled to ledger balances</li>
            <li>Regular statements to clients holding money</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Annual Accountant's Report</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
            Law firms holding client money must obtain an annual accountant's report from a qualified accountant. This report confirms that your systems and records comply with SRA Accounts Rules. The accountant examines:
          </p>
          <ul className="space-y-2 text-base text-[var(--ink-soft)] ml-6 list-disc">
            <li>Client account procedures and controls</li>
            <li>Record-keeping systems and accuracy</li>
            <li>Reconciliation procedures and frequency</li>
            <li>Compliance with specific SRA requirements</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">COFA Responsibilities</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)]">
            The Compliance Officer for Finance and Administration (COFA) holds personal responsibility for ensuring the firm complies with SRA Accounts Rules. This role requires understanding both the technical requirements and the systems needed to maintain ongoing compliance. A specialist solicitor accountant can provide essential support to COFAs in meeting these obligations.
          </p>
        </section>

        {relatedPosts.length > 0 && (
          <section className="mt-12 pt-8 border-t border-[var(--border)]">
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-6">Related Articles</h2>
            <ul className="space-y-4">
              {relatedPosts.map((p) => {
                const readTime = calculateReadTime(p.contentHtml);
                return (
                  <li key={p.slug}>
                    <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6">
                      <h3 className="font-serif text-lg font-semibold text-[var(--ink)] sm:text-xl">
                        <Link
                          href={`/blog/sra-compliance-trust-accounting/${p.slug}`}
                          className={`hover:text-[var(--accent-strong)] transition-colors ${focusRing} rounded`}
                        >
                          {p.title}
                        </Link>
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--muted)] sm:text-base">{p.summary}</p>
                      <div className="mt-4 flex items-center gap-3 text-sm text-[var(--muted)]">
                        {p.date && (
                          <time dateTime={p.date}>
                            {new Intl.DateTimeFormat("en-GB", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }).format(new Date(p.date))}
                          </time>
                        )}
                        <span>•</span>
                        <span>{readTime} min read</span>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        <div className="mt-16 border-2 border-[var(--primary)]/20 bg-gradient-to-br from-[var(--primary)]/5 to-[var(--accent)]/5 p-8 sm:p-10 rounded-2xl">
          <h2 className="text-2xl font-bold text-[var(--primary)] sm:text-3xl">
            Need SRA Compliance Support?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
            Our specialist solicitor accountants help law firms maintain SRA compliance while optimising their financial performance. Get expert guidance tailored to your practice.
          </p>
          <div className="mt-8">
            <LeadForm redirectOnSuccess={false} submitLabel="Request SRA Compliance Consultation" />
          </div>
        </div>
      </div>
    </article>
  );
}
