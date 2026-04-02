import type { Metadata } from "next";
import Link from "next/link";
import { contentNarrow, focusRing, sectionY } from "@/components/ui/layout-utils";
import { getAllPosts, calculateReadTime } from "@/lib/blog";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "Complete VAT Guide for UK Law Firms | Accounts for Lawyers",
  description:
    "Comprehensive guide to VAT compliance for UK solicitors. Registration, rates, disbursements, counsel fees, and compliance requirements for legal services.",
  alternates: { canonical: `${siteConfig.url}/blog/vat-compliance` },
  openGraph: {
    title: "Complete VAT Guide for UK Law Firms",
    description:
      "Comprehensive guide to VAT compliance for UK solicitors. Registration, rates, disbursements, counsel fees, and compliance requirements.",
    url: `${siteConfig.url}/blog/vat-compliance`,
    type: "website",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Complete VAT Guide for UK Law Firms",
    description:
      "Comprehensive guide to VAT compliance for UK solicitors. Registration, rates, disbursements, counsel fees, and compliance requirements.",
  },
};

export default function VATCompliancePillarPage() {
  const allPosts = getAllPosts();
  const relatedPosts = allPosts.filter((p) => p.category === "VAT & Compliance");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` },
          { "@type": "ListItem", position: 3, name: "VAT & Compliance" },
        ],
      },
      {
        "@type": "CollectionPage",
        name: metadata.title,
        description: metadata.description,
        url: `${siteConfig.url}/blog/vat-compliance`,
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
          { label: "VAT & Compliance" },
        ]}
      />

      <header className="border-l-4 border-[var(--primary)] bg-[var(--surface)] p-8">
        <h1 className="text-3xl font-bold leading-tight text-[var(--ink)] sm:text-4xl md:text-5xl">
          Complete VAT Guide for UK Law Firms
        </h1>
        <p className="mt-4 text-lg text-[var(--ink-soft)] leading-relaxed">
          Everything you need to know about VAT compliance for UK solicitors, including registration requirements, rates, disbursements, counsel fees, and compliance obligations for legal services.
        </p>
      </header>

      <div className="mt-10 space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">VAT Registration for Law Firms</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
            Law firms must register for VAT when taxable turnover exceeds £90,000 (2026/27 threshold). Registration can be voluntary below this threshold, which may benefit practices that incur significant VAT on expenses.
          </p>
          <p className="text-base leading-relaxed text-[var(--ink-soft)]">
            Once registered, you charge VAT on legal services (typically 20% standard rate), reclaim VAT on business expenses, and submit regular VAT returns to HMRC. Registration timing affects cash flow and pricing, so plan carefully before crossing the threshold.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">VAT on Legal Services</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
            Most legal services are standard-rated for VAT (20%), but some services are exempt or zero-rated:
          </p>
          <ul className="space-y-2 text-base text-[var(--ink-soft)] ml-6 list-disc">
            <li>Standard-rated (20%): Most legal advice and services</li>
            <li>Exempt: Some financial services and insurance-related work</li>
            <li>Zero-rated: Certain international services under place of supply rules</li>
          </ul>
          <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
            Understanding which rate applies to each service ensures correct VAT treatment and avoids costly errors or HMRC challenges.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Disbursements & VAT Treatment</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
            Disbursements (payments made on behalf of clients) have special VAT treatment. True disbursements aren't subject to VAT if they meet specific conditions:
          </p>
          <ul className="space-y-2 text-base text-[var(--ink-soft)] ml-6 list-disc">
            <li>Made on behalf of the client (not for your own benefit)</li>
            <li>Client is responsible for payment</li>
            <li>Client authorises the payment</li>
            <li>Recorded separately in your accounts</li>
            <li>Recharged at exact cost without markup</li>
          </ul>
          <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
            Common disbursements include court fees, Land Registry fees, search fees, and expert witness fees. Counsel fees have specific VAT treatment rules that differ from other disbursements.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Counsel Fees VAT Rules</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
            Counsel fees involve complex VAT treatment. When you instruct counsel on behalf of a client, the VAT treatment depends on whether counsel invoices you or the client directly, and whether you're acting as principal or agent.
          </p>
          <p className="text-base leading-relaxed text-[var(--ink-soft)]">
            Most firms treat counsel fees as disbursements, but HMRC has specific requirements about when this treatment is valid. Incorrect treatment can result in VAT assessments and penalties.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">VAT Returns & Compliance</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)]">
            VAT-registered law firms must submit quarterly VAT returns (or monthly if you reclaim more than you charge). Making Tax Digital for VAT requires compatible software and digital record-keeping. Accurate VAT accounting requires proper systems, regular reconciliation, and understanding of legal sector specific rules.
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
                          href={`/blog/vat-compliance/${p.slug}`}
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
            Need VAT Compliance Support?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
            Our specialist solicitor accountants help law firms navigate VAT requirements and ensure compliance. Get expert guidance on registration, disbursements, and VAT accounting.
          </p>
          <div className="mt-8">
            <LeadForm redirectOnSuccess={false} submitLabel="Request VAT Consultation" />
          </div>
        </div>
      </div>
    </article>
    </>
  );
}
