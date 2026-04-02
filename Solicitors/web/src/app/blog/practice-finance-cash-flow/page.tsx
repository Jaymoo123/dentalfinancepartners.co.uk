import type { Metadata } from "next";
import Link from "next/link";
import { contentNarrow, focusRing, sectionY } from "@/components/ui/layout-utils";
import { getAllPosts, calculateReadTime } from "@/lib/blog";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "Complete Practice Finance Guide for UK Law Firms | Accounts for Lawyers",
  description:
    "Comprehensive guide to law firm cash flow management, lock-up reduction, working capital, and practice finance options for UK solicitors.",
  alternates: { canonical: `${siteConfig.url}/blog/practice-finance-cash-flow` },
  openGraph: {
    title: "Complete Practice Finance Guide for UK Law Firms",
    description:
      "Comprehensive guide to law firm cash flow management, lock-up reduction, working capital, and practice finance options for UK solicitors.",
    url: `${siteConfig.url}/blog/practice-finance-cash-flow`,
    type: "website",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Complete Practice Finance Guide for UK Law Firms",
    description:
      "Comprehensive guide to law firm cash flow management, lock-up reduction, working capital, and practice finance options for UK solicitors.",
  },
};

export default function PracticeFinancePillarPage() {
  const allPosts = getAllPosts();
  const relatedPosts = allPosts.filter((p) => p.category === "Practice Finance & Cash Flow");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` },
          { "@type": "ListItem", position: 3, name: "Practice Finance & Cash Flow" },
        ],
      },
      {
        "@type": "CollectionPage",
        name: metadata.title,
        description: metadata.description,
        url: `${siteConfig.url}/blog/practice-finance-cash-flow`,
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
          { label: "Practice Finance & Cash Flow" },
        ]}
      />

      <header className="border-l-4 border-[var(--primary)] bg-[var(--surface)] p-8">
        <h1 className="text-3xl font-bold leading-tight text-[var(--ink)] sm:text-4xl md:text-5xl">
          Complete Practice Finance Guide for UK Law Firms
        </h1>
        <p className="mt-4 text-lg text-[var(--ink-soft)] leading-relaxed">
          Everything you need to know about law firm cash flow management, lock-up reduction, working capital optimisation, and practice finance options for UK solicitors.
        </p>
      </header>

      <div className="mt-10 space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Understanding Law Firm Cash Flow</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
            Law firm cash flow differs fundamentally from other businesses due to the time lag between work completion and payment. You incur costs (salaries, overheads, disbursements) immediately but may wait months for payment, creating significant working capital requirements.
          </p>
          <p className="text-base leading-relaxed text-[var(--ink-soft)]">
            Effective cash flow management involves forecasting, monitoring work in progress, accelerating billing, and maintaining adequate reserves. Poor cash flow management causes practice failure more often than lack of profitability.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Reducing Lock-Up</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
            Lock-up (the time between work completion and cash collection) directly impacts practice cash flow and profitability. Typical law firm lock-up includes:
          </p>
          <ul className="space-y-2 text-base text-[var(--ink-soft)] ml-6 list-disc">
            <li>Work in progress (unbilled time and disbursements)</li>
            <li>Billed but unpaid fees (debtors)</li>
            <li>Time taken to convert enquiries to instructions</li>
          </ul>
          <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
            Reducing lock-up improves cash flow without increasing turnover. Strategies include regular billing, payment terms enforcement, interim billing on long matters, and efficient debt collection procedures.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Working Capital Management</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
            Working capital (current assets minus current liabilities) determines your practice's ability to meet short-term obligations and fund growth. Law firms typically need working capital equivalent to 2-4 months' operating costs, depending on practice area and billing cycles.
          </p>
          <p className="text-base leading-relaxed text-[var(--ink-soft)]">
            Improving working capital involves reducing lock-up, managing partner drawings, timing tax payments, and maintaining appropriate reserves. Strong working capital provides financial stability and enables practice development.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Practice Finance Options</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
            Law firms can access various finance options to support cash flow and growth:
          </p>
          <ul className="space-y-2 text-base text-[var(--ink-soft)] ml-6 list-disc">
            <li>Invoice discounting against unbilled work in progress</li>
            <li>Debtor finance for outstanding fees</li>
            <li>Business loans for equipment or expansion</li>
            <li>Overdraft facilities for short-term cash flow</li>
            <li>Partner capital contributions or loans</li>
          </ul>
          <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
            Each option has different costs, risks, and suitability depending on your practice circumstances. Specialist advice ensures you choose appropriate finance at competitive rates.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Cash Flow Forecasting</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)]">
            Regular cash flow forecasting (typically 12 weeks ahead) helps identify potential shortfalls and plan accordingly. Effective forecasting considers work in progress conversion, expected payments, known costs, and seasonal patterns. This forward visibility enables proactive management rather than reactive crisis response.
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
                          href={`/blog/practice-finance-cash-flow/${p.slug}`}
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
            Need Practice Finance Advice?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
            Our specialist solicitor accountants help law firms optimise cash flow, reduce lock-up, and secure appropriate finance. Get expert guidance on practice finance management.
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
