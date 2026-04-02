import type { Metadata } from "next";
import Link from "next/link";
import { contentNarrow, focusRing, sectionY } from "@/components/ui/layout-utils";
import { getAllPosts, calculateReadTime } from "@/lib/blog";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "Complete Guide to Buying a Dental Practice | Dental Finance Partners",
  description:
    "Comprehensive guide to buying a dental practice, including valuations, due diligence, financing options, legal considerations, and post-acquisition integration for UK dentists.",
  alternates: { canonical: `${siteConfig.url}/blog/buying-a-practice` },
  openGraph: {
    title: "Complete Guide to Buying a Dental Practice",
    description:
      "Comprehensive guide to buying a dental practice, including valuations, due diligence, financing options, and legal considerations for UK dentists.",
    url: `${siteConfig.url}/blog/buying-a-practice`,
    type: "website",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Complete Guide to Buying a Dental Practice",
    description:
      "Comprehensive guide to buying a dental practice, including valuations, due diligence, financing options, and legal considerations for UK dentists.",
  },
};

export default function BuyingPracticePillarPage() {
  const allPosts = getAllPosts();
  const relatedPosts = allPosts.filter((p) => p.category === "Buying a practice");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` },
          { "@type": "ListItem", position: 3, name: "Buying a Practice" },
        ],
      },
      {
        "@type": "CollectionPage",
        name: metadata.title,
        description: metadata.description,
        url: `${siteConfig.url}/blog/buying-a-practice`,
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
          { label: "Buying a Practice" },
        ]}
      />

      <header className="border-l-4 border-[var(--primary)] bg-[var(--surface)] p-8">
        <h1 className="text-3xl font-bold leading-tight text-[var(--ink)] sm:text-4xl md:text-5xl">
          Complete Guide to Buying a Dental Practice
        </h1>
        <p className="mt-4 text-lg text-[var(--ink-soft)] leading-relaxed">
          Everything you need to know about buying a dental practice, including valuations, due diligence, financing options, legal considerations, and post-acquisition integration for UK dentists.
        </p>
      </header>

      <div className="mt-10 space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Practice Valuation Fundamentals</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
            Understanding dental practice valuations is essential before making an offer. Practices are typically valued based on multiples of adjusted earnings, with NHS and private practices valued differently. Key factors affecting valuation include patient list quality, location, equipment condition, lease terms, and growth potential.
          </p>
          <p className="text-base leading-relaxed text-[var(--ink-soft)]">
            Professional valuation helps ensure you pay a fair price and can secure appropriate financing. Independent valuations also provide reassurance to lenders and protect your investment.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Due Diligence Process</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
            Thorough due diligence protects you from unexpected problems after purchase. Your due diligence should cover:
          </p>
          <ul className="space-y-2 text-base text-[var(--ink-soft)] ml-6 list-disc">
            <li>Financial records review (at least 3 years of accounts)</li>
            <li>NHS contract analysis and UDA performance</li>
            <li>Patient list verification and retention rates</li>
            <li>Equipment condition and replacement requirements</li>
            <li>Lease terms and property condition</li>
            <li>Staff contracts and employment obligations</li>
            <li>CQC compliance and regulatory status</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Financing Your Purchase</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
            Most dental practice purchases require financing. Options include specialist dental practice loans, commercial mortgages, and vendor finance arrangements. Lenders typically require 20-30% deposit and assess your ability to service the debt from practice earnings.
          </p>
          <p className="text-base leading-relaxed text-[var(--ink-soft)]">
            Your accountant can help prepare financial projections for lenders and structure the purchase tax-efficiently. Consider both the acquisition structure and ongoing financing costs when evaluating affordability.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Legal and Structural Considerations</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
            The legal structure of your purchase affects tax, liability, and future flexibility. You can buy as a sole practitioner, partnership, or through a limited company. Each structure has different tax implications and regulatory requirements.
          </p>
          <p className="text-base leading-relaxed text-[var(--ink-soft)]">
            Asset purchases versus share purchases also have significant tax and legal differences. Your solicitor and accountant should work together to structure the transaction optimally.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Post-Acquisition Integration</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)]">
            Successfully integrating a newly purchased practice requires careful planning. Focus on maintaining patient relationships, retaining key staff, and implementing your vision gradually. Financial systems, banking arrangements, and accounting processes need updating. A specialist dental accountant can ensure smooth transition while maintaining compliance with NHS and CQC requirements.
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
                          href={`/blog/buying-a-practice/${p.slug}`}
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
            Planning to Buy a Practice?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
            Our specialist dental accountants help dentists navigate practice acquisitions from valuation through to integration. Get expert guidance tailored to your purchase.
          </p>
          <div className="mt-8">
            <LeadForm redirectOnSuccess={false} submitLabel="Request Practice Acquisition Consultation" />
          </div>
        </div>
      </div>
    </article>
    </>
  );
}
