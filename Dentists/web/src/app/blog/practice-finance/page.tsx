import type { Metadata } from "next";
import Link from "next/link";
import { contentNarrow, focusRing, sectionY } from "@/components/ui/layout-utils";
import { getAllPosts, calculateReadTime } from "@/lib/blog";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "Complete Dental Practice Finance Guide | Dental Finance Partners",
  description:
    "Comprehensive guide to dental practice finance, including cash flow management, profitability analysis, practice loans, equipment finance, and financial planning for UK dental practices.",
  alternates: { canonical: `${siteConfig.url}/blog/practice-finance` },
  openGraph: {
    title: "Complete Dental Practice Finance Guide",
    description:
      "Comprehensive guide to dental practice finance, including cash flow management, profitability analysis, practice loans, and financial planning for UK practices.",
    url: `${siteConfig.url}/blog/practice-finance`,
    type: "website",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Complete Dental Practice Finance Guide",
    description:
      "Comprehensive guide to dental practice finance, including cash flow management, profitability analysis, practice loans, and financial planning for UK practices.",
  },
};

export default function PracticeFinancePillarPage() {
  const allPosts = getAllPosts();
  const relatedPosts = allPosts.filter((p) => p.category === "Practice finance");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` },
          { "@type": "ListItem", position: 3, name: "Practice Finance" },
        ],
      },
      {
        "@type": "CollectionPage",
        name: metadata.title,
        description: metadata.description,
        url: `${siteConfig.url}/blog/practice-finance`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className={`${contentNarrow} ${sectionY}`}>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "Practice Finance" },
        ]}
      />

      <header className="border-l-4 border-[var(--primary)] bg-[var(--surface)] p-8">
        <h1 className="text-3xl font-bold leading-tight text-[var(--ink)] sm:text-4xl md:text-5xl">
          Complete Dental Practice Finance Guide
        </h1>
        <p className="mt-4 text-lg text-[var(--ink-soft)] leading-relaxed">
          Everything you need to know about dental practice finance, including cash flow management, profitability analysis, practice loans, equipment finance, and financial planning for UK dental practices.
        </p>
      </header>

      <div className="mt-10 space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Cash Flow Management</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
            Effective cash flow management ensures your practice can meet its obligations while investing in growth. Dental practices face unique cash flow challenges from NHS payment timing, private patient payment terms, and laboratory costs. Understanding your cash cycle helps you plan for lean periods and capitalise on opportunities.
          </p>
          <p className="text-base leading-relaxed text-[var(--ink-soft)]">
            Regular cash flow forecasting identifies potential shortfalls before they become problems. Your accountant can help you implement systems to monitor cash flow and make informed decisions about expenditure timing.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Profitability Analysis</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
            Understanding practice profitability requires looking beyond the bottom line. Key metrics for dental practices include:
          </p>
          <ul className="space-y-2 text-base text-[var(--ink-soft)] ml-6 list-disc">
            <li>Gross profit margin by income stream (NHS, private, plans)</li>
            <li>Associate performance and contribution margins</li>
            <li>Treatment profitability analysis</li>
            <li>Overhead ratio and expense control</li>
            <li>Principal take-home after all costs</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Practice Loans and Financing</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
            Dental practices often require financing for acquisitions, expansions, refurbishments, or equipment purchases. Specialist dental practice loans offer competitive rates and terms designed for the profession. Lenders assess practice performance, contract security, and personal guarantees.
          </p>
          <p className="text-base leading-relaxed text-[var(--ink-soft)]">
            Your accountant can help prepare financial information for lenders and model the impact of borrowing on practice cash flow. Proper financial planning ensures borrowing supports growth without creating unmanageable debt.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Equipment Finance Options</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
            Dental equipment represents significant investment. Finance options include outright purchase, hire purchase, leasing, and rental agreements. Each option has different tax implications and cash flow impacts.
          </p>
          <p className="text-base leading-relaxed text-[var(--ink-soft)]">
            Leasing can preserve cash for working capital, while purchase enables capital allowances claims. Your accountant can model different scenarios to identify the most tax-efficient approach for your circumstances.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Financial Planning and Strategy</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)]">
            Strategic financial planning helps practice owners achieve their personal and professional goals. This includes retirement planning, practice exit strategies, expansion funding, and wealth accumulation. A specialist dental accountant provides both technical expertise and strategic guidance, helping you build a financially successful practice that supports your lifestyle objectives.
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
                          href={`/blog/practice-finance/${p.slug}`}
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
            Need Practice Finance Support?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
            Our specialist dental accountants help practice owners optimise financial performance and plan for growth. Get expert guidance tailored to your practice.
          </p>
          <div className="mt-8">
            <LeadForm redirectOnSuccess={false} submitLabel="Request Finance Consultation" />
          </div>
        </div>
      </div>
    </article>
    </>
  );
}
