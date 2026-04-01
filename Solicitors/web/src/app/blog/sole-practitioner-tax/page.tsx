import type { Metadata } from "next";
import Link from "next/link";
import { contentNarrow, focusRing, sectionY } from "@/components/ui/layout-utils";
import { getAllPosts, calculateReadTime } from "@/lib/blog";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "Complete Sole Practitioner Tax Guide for UK Solicitors | Accounts for Lawyers",
  description:
    "Comprehensive guide to sole practitioner tax, self-assessment, Making Tax Digital, allowable expenses, and tax planning for UK solicitors.",
  alternates: { canonical: `${siteConfig.url}/blog/sole-practitioner-tax` },
  openGraph: {
    title: "Complete Sole Practitioner Tax Guide for UK Solicitors",
    description:
      "Comprehensive guide to sole practitioner tax, self-assessment, Making Tax Digital, allowable expenses, and tax planning for UK solicitors.",
    url: `${siteConfig.url}/blog/sole-practitioner-tax`,
    type: "article",
  },
};

export default function SolePractitionerTaxPillarPage() {
  const allPosts = getAllPosts();
  const relatedPosts = allPosts.filter((p) => p.category === "Sole Practitioner Tax");

  return (
    <article className={`${contentNarrow} ${sectionY}`}>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "Sole Practitioner Tax" },
        ]}
      />

      <header className="border-l-4 border-[var(--primary)] bg-[var(--surface)] p-8">
        <h1 className="text-3xl font-bold leading-tight text-[var(--ink)] sm:text-4xl md:text-5xl">
          Complete Sole Practitioner Tax Guide for UK Solicitors
        </h1>
        <p className="mt-4 text-lg text-[var(--ink-soft)] leading-relaxed">
          Everything you need to know about sole practitioner tax, self-assessment, Making Tax Digital compliance, allowable expenses, and tax planning for UK solicitors.
        </p>
      </header>

      <div className="mt-10 space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Understanding Sole Practitioner Taxation</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
            Sole practitioner solicitors operate as self-employed individuals, paying Income Tax and National Insurance on their practice profits. Unlike partnerships or companies, you're personally responsible for all tax obligations and benefit directly from all profits after tax.
          </p>
          <p className="text-base leading-relaxed text-[var(--ink-soft)]">
            Your tax position depends on practice profits, allowable expenses, pension contributions, and other income sources. Effective tax planning can significantly reduce your tax burden while maintaining full compliance with HMRC requirements.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Self-Assessment Requirements</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
            Sole practitioners must complete annual self-assessment tax returns (SA100) showing practice income, allowable expenses, and tax calculations. Key requirements include:
          </p>
          <ul className="space-y-2 text-base text-[var(--ink-soft)] ml-6 list-disc">
            <li>Maintaining accurate records of all income and expenses</li>
            <li>Filing returns by 31 January following the tax year end</li>
            <li>Making payments on account for the following year</li>
            <li>Understanding basis period rules and overlap relief</li>
            <li>Claiming all available tax reliefs and allowances</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Making Tax Digital Compliance</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
            From April 2026, sole practitioners with income over £50,000 must use Making Tax Digital compatible software and submit quarterly updates to HMRC. This represents a significant change to how you manage practice finances and report tax information.
          </p>
          <p className="text-base leading-relaxed text-[var(--ink-soft)]">
            MTD compliance requires digital record-keeping, compatible accounting software, and quarterly submissions showing income and expenses. Early preparation ensures smooth transition and avoids penalties for non-compliance.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Allowable Expenses & Tax Deductions</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
            Sole practitioners can claim tax relief on business expenses incurred wholly and exclusively for practice purposes. Common allowable expenses include:
          </p>
          <ul className="space-y-2 text-base text-[var(--ink-soft)] ml-6 list-disc">
            <li>Professional indemnity insurance and regulatory fees</li>
            <li>Office rent, utilities, and equipment</li>
            <li>Professional subscriptions and continuing education</li>
            <li>Marketing, website, and practice development costs</li>
            <li>Accountancy and legal fees</li>
            <li>Proportion of home office costs (if working from home)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Tax Planning Strategies</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
            Effective tax planning for sole practitioners involves:
          </p>
          <ul className="space-y-2 text-base text-[var(--ink-soft)] ml-6 list-disc">
            <li>Maximising pension contributions for tax relief</li>
            <li>Timing income and expenses to optimise tax position</li>
            <li>Claiming all available capital allowances</li>
            <li>Using spouse or civil partner for tax-efficient income splitting</li>
            <li>Considering incorporation when appropriate</li>
          </ul>
        </section>

        {relatedPosts.length > 0 && (
          <section className="mt-12 pt-8 border-t border-[var(--border)]">
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-6">In-Depth Articles</h2>
            <ul className="space-y-4">
              {relatedPosts.map((p) => {
                const readTime = calculateReadTime(p.contentHtml);
                return (
                  <li key={p.slug}>
                    <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6">
                      <h3 className="font-serif text-lg font-semibold text-[var(--ink)] sm:text-xl">
                        <Link
                          href={`/blog/sole-practitioner-tax/${p.slug}`}
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
            Need Sole Practitioner Tax Advice?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
            Our specialist solicitor accountants help sole practitioners optimise their tax position while ensuring compliance with HMRC and SRA requirements. Get expert guidance tailored to your practice.
          </p>
          <div className="mt-8">
            <LeadForm redirectOnSuccess={false} submitLabel="Request Tax Planning Consultation" />
          </div>
        </div>
      </div>
    </article>
  );
}
