import type { Metadata } from "next";
import Link from "next/link";
import { contentNarrow, focusRing, sectionY } from "@/components/ui/layout-utils";
import { getAllPosts, calculateReadTime } from "@/lib/blog";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "Complete Partnership & LLP Tax Guide for UK Law Firms | Accounts for Lawyers",
  description:
    "Comprehensive guide to partnership taxation, LLP conversion, profit allocation, and multi-partner firm accounting for UK solicitors and law firms.",
  alternates: { canonical: `${siteConfig.url}/blog/partnership-llp-accounting` },
  openGraph: {
    title: "Complete Partnership & LLP Tax Guide for UK Law Firms",
    description:
      "Comprehensive guide to partnership taxation, LLP conversion, profit allocation, and multi-partner firm accounting for UK solicitors.",
    url: `${siteConfig.url}/blog/partnership-llp-accounting`,
    type: "article",
  },
};

export default function PartnershipTaxPillarPage() {
  const allPosts = getAllPosts();
  const relatedPosts = allPosts.filter((p) => p.category === "Partnership & LLP Accounting");

  return (
    <article className={`${contentNarrow} ${sectionY}`}>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "Partnership & LLP Accounting" },
        ]}
      />

      <header className="border-l-4 border-[var(--primary)] bg-[var(--surface)] p-8">
        <h1 className="text-3xl font-bold leading-tight text-[var(--ink)] sm:text-4xl md:text-5xl">
          Complete Partnership & LLP Tax Guide for UK Law Firms
        </h1>
        <p className="mt-4 text-lg text-[var(--ink-soft)] leading-relaxed">
          Everything you need to know about partnership taxation, LLP structures, profit allocation, and multi-partner firm accounting for UK solicitors and law firms.
        </p>
      </header>

      <div className="mt-10 space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Partnership vs LLP: Tax Differences</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
            Traditional partnerships and Limited Liability Partnerships (LLPs) have different tax treatments and legal implications. While both are tax-transparent (partners pay tax individually rather than the entity paying corporation tax), LLPs offer limited liability protection similar to companies.
          </p>
          <p className="text-base leading-relaxed text-[var(--ink-soft)]">
            The choice between partnership and LLP affects National Insurance treatment, profit extraction flexibility, and succession planning options. Many law firms convert to LLP status to protect partners from unlimited liability while maintaining partnership tax treatment.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">LLP Conversion Considerations</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
            Converting from traditional partnership to LLP involves several tax and legal considerations:
          </p>
          <ul className="space-y-2 text-base text-[var(--ink-soft)] ml-6 list-disc">
            <li>Capital Gains Tax implications on asset transfer</li>
            <li>Stamp Duty Land Tax on property transfers</li>
            <li>Changes to National Insurance treatment for members</li>
            <li>Impact on existing partnership agreements and profit sharing</li>
            <li>SRA notification requirements and regulatory compliance</li>
          </ul>
          <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
            Recent changes to Employer National Insurance for LLP members (April 2026) make conversion timing particularly important. Specialist advice ensures you convert at the optimal time and structure the LLP correctly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Profit Allocation & Distribution</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
            Partnership profit allocation affects both tax efficiency and partner relationships. Key considerations include:
          </p>
          <ul className="space-y-2 text-base text-[var(--ink-soft)] ml-6 list-disc">
            <li>Fixed share vs performance-based allocation</li>
            <li>Salaried partners vs equity partners</li>
            <li>Tax implications of different profit share arrangements</li>
            <li>Timing of profit distributions and cash flow management</li>
            <li>Impact on individual partners' tax positions</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Partnership Tax Returns & Compliance</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
            Partnerships and LLPs must file annual partnership tax returns (SA800) showing total profits and each partner's share. Individual partners then report their share on personal tax returns (SA100). This dual reporting creates complexity, particularly when:
          </p>
          <ul className="space-y-2 text-base text-[var(--ink-soft)] ml-6 list-disc">
            <li>Partners join or leave during the tax year</li>
            <li>Profit shares change mid-year</li>
            <li>The partnership year end differs from the tax year</li>
            <li>Partners have other income sources or multiple partnerships</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Partner Retirement Planning</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)]">
            Partner retirement involves complex tax planning around capital extraction, goodwill payments, and succession arrangements. Early planning ensures tax-efficient exit while maintaining practice continuity. Consider pension contributions, capital gains treatment, and the impact of retirement on remaining partners.
          </p>
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
                          href={`/blog/partnership-llp-accounting/${p.slug}`}
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
            Need Partnership Tax Advice?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
            Our specialist solicitor accountants help law firm partnerships and LLPs optimise their tax position while ensuring compliance. Get expert guidance on profit allocation, LLP conversion, and partner tax planning.
          </p>
          <div className="mt-8">
            <LeadForm redirectOnSuccess={false} submitLabel="Request Partnership Tax Consultation" />
          </div>
        </div>
      </div>
    </article>
  );
}
