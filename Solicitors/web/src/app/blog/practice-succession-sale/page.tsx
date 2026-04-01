import type { Metadata } from "next";
import Link from "next/link";
import { contentNarrow, focusRing, sectionY } from "@/components/ui/layout-utils";
import { getAllPosts, calculateReadTime } from "@/lib/blog";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "Complete Practice Succession Guide for UK Law Firms | Accounts for Lawyers",
  description:
    "Comprehensive guide to law firm succession planning, practice valuation, sale preparation, and exit strategies for UK solicitors planning retirement or exit.",
  alternates: { canonical: `${siteConfig.url}/blog/practice-succession-sale` },
  openGraph: {
    title: "Complete Practice Succession Guide for UK Law Firms",
    description:
      "Comprehensive guide to law firm succession planning, practice valuation, sale preparation, and exit strategies for UK solicitors.",
    url: `${siteConfig.url}/blog/practice-succession-sale`,
    type: "article",
  },
};

export default function PracticeSuccessionPillarPage() {
  const allPosts = getAllPosts();
  const relatedPosts = allPosts.filter((p) => p.category === "Practice Succession & Sale");

  return (
    <article className={`${contentNarrow} ${sectionY}`}>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "Practice Succession & Sale" },
        ]}
      />

      <header className="border-l-4 border-[var(--primary)] bg-[var(--surface)] p-8">
        <h1 className="text-3xl font-bold leading-tight text-[var(--ink)] sm:text-4xl md:text-5xl">
          Complete Practice Succession Guide for UK Law Firms
        </h1>
        <p className="mt-4 text-lg text-[var(--ink-soft)] leading-relaxed">
          Everything you need to know about law firm succession planning, practice valuation, sale preparation, and exit strategies for UK solicitors planning retirement or practice exit.
        </p>
      </header>

      <div className="mt-10 space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Why Succession Planning Matters</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
            Practice succession planning ensures continuity for clients, protects practice value, and provides financial security for retiring partners. Without proper planning, practices often sell for significantly less than their potential value, or fail to find buyers at all.
          </p>
          <p className="text-base leading-relaxed text-[var(--ink-soft)]">
            Successful succession typically requires 3-5 years of planning. This allows time to develop junior partners, improve practice systems, optimise profitability, and identify suitable buyers or successors. Early planning maximises value and reduces stress during transition.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Practice Valuation Methods</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
            Law firm valuation involves several approaches:
          </p>
          <ul className="space-y-2 text-base text-[var(--ink-soft)] ml-6 list-disc">
            <li>Multiple of recurring fees (typically 0.8-1.5x annual fees)</li>
            <li>Goodwill valuation based on client relationships and practice reputation</li>
            <li>Asset-based valuation for work in progress and physical assets</li>
            <li>Discounted cash flow analysis for larger practices</li>
            <li>Market comparison with recent similar practice sales</li>
          </ul>
          <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
            Practice area, client retention rates, fee earner stability, and systems quality all affect valuation. Specialist legal sector accountants understand these factors and can provide realistic valuations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Preparing Your Practice for Sale</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
            Maximising practice value requires preparation across several areas:
          </p>
          <ul className="space-y-2 text-base text-[var(--ink-soft)] ml-6 list-disc">
            <li>Clean financial records and systems documentation</li>
            <li>Reducing key person dependency and developing junior fee earners</li>
            <li>Improving profitability and reducing lock-up</li>
            <li>Ensuring SRA compliance and clean regulatory record</li>
            <li>Documenting client relationships and matter management systems</li>
            <li>Addressing any outstanding issues or liabilities</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Tax-Efficient Exit Strategies</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
            Practice sale proceeds may qualify for Business Asset Disposal Relief (formerly Entrepreneurs' Relief), reducing Capital Gains Tax to 10% on qualifying gains up to £1 million lifetime limit. Structuring the sale correctly ensures maximum tax efficiency.
          </p>
          <p className="text-base leading-relaxed text-[var(--ink-soft)]">
            Consider phased retirement, earn-out arrangements, and pension contributions as part of your exit strategy. Each approach has different tax implications and risk profiles. Specialist advice ensures you choose the optimal structure for your circumstances.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Internal Succession Options</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)]">
            Internal succession to junior partners or employees often provides better outcomes than external sale. It maintains client relationships, preserves practice culture, and can be structured flexibly over several years. However, it requires developing successors with both technical capability and commercial acumen, plus financing arrangements for the purchase.
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
                          href={`/blog/practice-succession-sale/${p.slug}`}
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
            Planning Your Practice Exit?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
            Our specialist solicitor accountants help law firm owners plan tax-efficient exits and maximise practice value. Get expert guidance on succession planning, valuation, and sale preparation.
          </p>
          <div className="mt-8">
            <LeadForm redirectOnSuccess={false} submitLabel="Request Succession Planning Consultation" />
          </div>
        </div>
      </div>
    </article>
  );
}
