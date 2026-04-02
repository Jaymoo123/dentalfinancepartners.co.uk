import type { Metadata } from "next";
import Link from "next/link";
import { contentNarrow, focusRing, sectionY } from "@/components/ui/layout-utils";
import { getAllPosts, calculateReadTime } from "@/lib/blog";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "Complete VAT & Compliance Guide for Dental Practices | Dental Finance Partners",
  description:
    "Comprehensive guide to VAT registration, compliance, exemptions, and Making Tax Digital for UK dental practices. Understand when to register, what to charge, and how to comply.",
  alternates: { canonical: `${siteConfig.url}/blog/vat-and-compliance` },
  openGraph: {
    title: "Complete VAT & Compliance Guide for Dental Practices",
    description:
      "Comprehensive guide to VAT registration, compliance, exemptions, and Making Tax Digital for UK dental practices.",
    url: `${siteConfig.url}/blog/vat-and-compliance`,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Complete VAT & Compliance Guide for Dental Practices",
    description:
      "Comprehensive guide to VAT registration, compliance, exemptions, and Making Tax Digital for UK dental practices.",
  },
};

export default function VATCompliancePillarPage() {
  const allPosts = getAllPosts();
  const relatedPosts = allPosts.filter((p) => p.category === "VAT & compliance");

  return (
    <article className={`${contentNarrow} ${sectionY}`}>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "VAT & Compliance" },
        ]}
      />

      <header className="border-l-4 border-[var(--primary)] bg-[var(--surface)] p-8">
        <h1 className="text-3xl font-bold leading-tight text-[var(--ink)] sm:text-4xl md:text-5xl">
          Complete VAT & Compliance Guide for Dental Practices
        </h1>
        <p className="mt-4 text-lg text-[var(--ink-soft)] leading-relaxed">
          Everything you need to know about VAT registration, compliance, exemptions, and Making Tax Digital for UK dental practices. Understand when to register, what to charge, and how to comply.
        </p>
      </header>

      <div className="mt-10 space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">VAT Registration for Dental Practices</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
            Dental practices must register for VAT when their taxable turnover exceeds the registration threshold (currently £90,000). Most dental treatment is VAT-exempt, but certain services and sales are taxable. Understanding what counts towards the threshold prevents late registration penalties.
          </p>
          <p className="text-base leading-relaxed text-[var(--ink-soft)]">
            Voluntary VAT registration may benefit practices with significant taxable income or high input VAT costs. However, registration brings compliance obligations and administrative burden. Specialist advice helps you determine the right approach.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Exempt vs Taxable Dental Services</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
            Understanding which dental services are VAT-exempt and which are taxable is crucial for compliance. Key principles include:
          </p>
          <ul className="space-y-2 text-base text-[var(--ink-soft)] ml-6 list-disc">
            <li>NHS dental treatment is always VAT-exempt</li>
            <li>Private dental treatment for oral health is VAT-exempt</li>
            <li>Cosmetic dentistry (teeth whitening, veneers) is usually taxable</li>
            <li>Dental product sales (toothbrushes, whitening kits) are taxable</li>
            <li>Orthodontics can be exempt or taxable depending on purpose</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">VAT Compliance Requirements</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
            VAT-registered dental practices must maintain detailed records, submit quarterly VAT returns, and charge VAT correctly on taxable supplies. Compliance requirements include:
          </p>
          <ul className="space-y-2 text-base text-[var(--ink-soft)] ml-6 list-disc">
            <li>Issuing VAT invoices for taxable supplies</li>
            <li>Recording all income and expenses with VAT analysis</li>
            <li>Submitting VAT returns through MTD-compatible software</li>
            <li>Making VAT payments on time</li>
            <li>Maintaining VAT records for at least 6 years</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Partial Exemption and Input VAT</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
            Dental practices with both exempt and taxable income face partial exemption rules. These rules limit the input VAT you can recover on overhead costs. Calculating your recoverable input VAT requires careful analysis of your income mix and expense allocation.
          </p>
          <p className="text-base leading-relaxed text-[var(--ink-soft)]">
            Partial exemption calculations can be complex, especially for multi-surgery practices with varying income streams. Specialist dental accountants ensure you claim the maximum allowable input VAT while maintaining compliance.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Making Tax Digital for VAT</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)]">
            Making Tax Digital (MTD) requires VAT-registered dental practices to keep digital records and submit returns through compatible software. Compliance involves choosing appropriate software, establishing digital record-keeping processes, and submitting returns electronically. A specialist dental accountant can help implement MTD requirements efficiently while ensuring your systems support both compliance and practice management needs.
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
                          href={`/blog/vat-and-compliance/${p.slug}`}
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
            Need VAT & Compliance Support?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
            Our specialist dental accountants help practices navigate VAT registration, compliance, and planning. Get expert guidance tailored to your practice.
          </p>
          <div className="mt-8">
            <LeadForm redirectOnSuccess={false} submitLabel="Request VAT Consultation" />
          </div>
        </div>
      </div>
    </article>
  );
}
