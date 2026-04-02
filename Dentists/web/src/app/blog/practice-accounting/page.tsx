import type { Metadata } from "next";
import Link from "next/link";
import { contentNarrow, focusRing, sectionY } from "@/components/ui/layout-utils";
import { getAllPosts, calculateReadTime } from "@/lib/blog";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "Complete Dental Practice Accounting Guide | Dental Finance Partners",
  description:
    "Comprehensive guide to dental practice accounting, including bookkeeping, financial reporting, NHS contract accounting, Making Tax Digital, and accounting software for UK dental practices.",
  alternates: { canonical: `${siteConfig.url}/blog/practice-accounting` },
  openGraph: {
    title: "Complete Dental Practice Accounting Guide",
    description:
      "Comprehensive guide to dental practice accounting, including bookkeeping, financial reporting, NHS contract accounting, and Making Tax Digital for UK practices.",
    url: `${siteConfig.url}/blog/practice-accounting`,
    type: "website",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Complete Dental Practice Accounting Guide",
    description:
      "Comprehensive guide to dental practice accounting, including bookkeeping, financial reporting, NHS contract accounting, and Making Tax Digital for UK practices.",
  },
};

export default function PracticeAccountingPillarPage() {
  const allPosts = getAllPosts();
  const relatedPosts = allPosts.filter((p) => p.category === "Practice accounting");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` },
          { "@type": "ListItem", position: 3, name: "Practice Accounting" },
        ],
      },
      {
        "@type": "CollectionPage",
        name: metadata.title,
        description: metadata.description,
        url: `${siteConfig.url}/blog/practice-accounting`,
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
          { label: "Practice Accounting" },
        ]}
      />

      <header className="border-l-4 border-[var(--primary)] bg-[var(--surface)] p-8">
        <h1 className="text-3xl font-bold leading-tight text-[var(--ink)] sm:text-4xl md:text-5xl">
          Complete Dental Practice Accounting Guide
        </h1>
        <p className="mt-4 text-lg text-[var(--ink-soft)] leading-relaxed">
          Everything you need to know about dental practice accounting, including bookkeeping, financial reporting, NHS contract accounting, Making Tax Digital compliance, and accounting software for UK dental practices.
        </p>
      </header>

      <div className="mt-10 space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Bookkeeping Fundamentals</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
            Accurate bookkeeping forms the foundation of practice financial management. Dental practices must record all income from NHS, private, and plan patients, along with all practice expenses. Proper bookkeeping enables you to monitor profitability, manage cash flow, and meet tax obligations.
          </p>
          <p className="text-base leading-relaxed text-[var(--ink-soft)]">
            Modern cloud accounting software designed for dental practices can automate much of the bookkeeping process. Integration with practice management systems reduces manual data entry and improves accuracy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">NHS Contract Accounting</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
            NHS contract accounting requires specific knowledge of UDA tracking, contract value recognition, and clawback provisions. Key considerations include:
          </p>
          <ul className="space-y-2 text-base text-[var(--ink-soft)] ml-6 list-disc">
            <li>Monthly UDA performance monitoring against contract</li>
            <li>Income recognition timing (delivered vs contracted)</li>
            <li>Clawback risk assessment and provisioning</li>
            <li>Contract variations and mid-year adjustments</li>
            <li>Multiple contract management and reporting</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Financial Reporting and Analysis</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
            Regular financial reporting helps practice owners make informed decisions. Monthly management accounts should show income by source, expense categories, profitability, and cash position. Understanding your key performance indicators enables proactive management.
          </p>
          <p className="text-base leading-relaxed text-[var(--ink-soft)]">
            Year-end accounts must comply with accounting standards and tax requirements. Specialist dental accountants can provide both compliance and advisory support, helping you understand what your numbers mean for your practice.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Making Tax Digital Compliance</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
            Making Tax Digital (MTD) requires dental practices to keep digital records and submit VAT returns through compatible software. Practices above the VAT threshold must comply with MTD for VAT, and MTD for Income Tax affects self-employed dentists and partnerships.
          </p>
          <p className="text-base leading-relaxed text-[var(--ink-soft)]">
            Choosing MTD-compatible accounting software and establishing digital record-keeping processes ensures compliance while improving efficiency. Your accountant can help implement MTD requirements smoothly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Accounting Software Selection</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)]">
            Selecting the right accounting software for your dental practice depends on your size, structure, and requirements. Cloud-based solutions offer accessibility and automatic backups. Integration with practice management systems eliminates duplicate data entry. A specialist dental accountant can recommend software suited to your practice and provide training and ongoing support.
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
                          href={`/blog/practice-accounting/${p.slug}`}
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
            Need Practice Accounting Support?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
            Our specialist dental accountants provide comprehensive accounting services for dental practices, from bookkeeping to strategic financial advice. Get expert support tailored to your practice.
          </p>
          <div className="mt-8">
            <LeadForm redirectOnSuccess={false} submitLabel="Request Accounting Consultation" />
          </div>
        </div>
      </div>
    </article>
    </>
  );
}
