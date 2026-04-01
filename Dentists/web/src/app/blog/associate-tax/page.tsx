import type { Metadata } from "next";
import Link from "next/link";
import { contentNarrow, focusRing, sectionY } from "@/components/ui/layout-utils";
import { getAllPosts, calculateReadTime } from "@/lib/blog";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "Complete Associate Dentist Tax Guide | Dental Finance Partners",
  description:
    "Comprehensive guide to associate dentist tax, self-assessment, expenses, National Insurance, and tax planning strategies for UK dental associates.",
  alternates: { canonical: `${siteConfig.url}/blog/associate-tax` },
  openGraph: {
    title: "Complete Associate Dentist Tax Guide",
    description:
      "Comprehensive guide to associate dentist tax, self-assessment, expenses, National Insurance, and tax planning strategies for UK dental associates.",
    url: `${siteConfig.url}/blog/associate-tax`,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Complete Associate Dentist Tax Guide",
    description:
      "Comprehensive guide to associate dentist tax, self-assessment, expenses, National Insurance, and tax planning strategies for UK dental associates.",
  },
};

export default function AssociateTaxPillarPage() {
  const allPosts = getAllPosts();
  const relatedPosts = allPosts.filter((p) => p.category === "Associate tax");

  return (
    <article className={`${contentNarrow} ${sectionY}`}>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "Associate Tax" },
        ]}
      />

      <header className="border-l-4 border-[var(--primary)] bg-[var(--surface)] p-8">
        <h1 className="text-3xl font-bold leading-tight text-[var(--ink)] sm:text-4xl md:text-5xl">
          Complete Associate Dentist Tax Guide
        </h1>
        <p className="mt-4 text-lg text-[var(--ink-soft)] leading-relaxed">
          Everything you need to know about associate dentist tax obligations, self-assessment, allowable expenses, National Insurance contributions, and tax planning strategies for UK dental associates.
        </p>
      </header>

      <div className="mt-10 space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Understanding Associate Tax Status</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
            Associate dentists typically operate as self-employed professionals, which means you're responsible for managing your own tax affairs. This status brings both flexibility and responsibility. Unlike employed dentists, you must register for self-assessment, track your income and expenses, and submit annual tax returns.
          </p>
          <p className="text-base leading-relaxed text-[var(--ink-soft)]">
            Your tax position depends on your working arrangements. Most associates work under self-employed contracts, but some arrangements may create employed status. Understanding your correct status is crucial for compliance and tax efficiency.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Self-Assessment and Tax Returns</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
            As a self-employed associate dentist, you must complete an annual self-assessment tax return. This return reports your dental income, allowable expenses, and calculates your tax liability. Key requirements include:
          </p>
          <ul className="space-y-2 text-base text-[var(--ink-soft)] ml-6 list-disc">
            <li>Registering for self-assessment with HMRC</li>
            <li>Keeping accurate records of all income and expenses</li>
            <li>Submitting your tax return by 31 January each year</li>
            <li>Making tax payments on account (advance payments)</li>
            <li>Understanding payment dates and avoiding penalties</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Allowable Expenses for Associates</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
            Associate dentists can claim various business expenses to reduce their tax bill. Common allowable expenses include:
          </p>
          <ul className="space-y-2 text-base text-[var(--ink-soft)] ml-6 list-disc">
            <li>Professional indemnity insurance and defence organisation fees</li>
            <li>GDC registration and professional subscriptions</li>
            <li>Continuing professional development (CPD) courses</li>
            <li>Professional journals and publications</li>
            <li>Accountancy and professional fees</li>
            <li>Travel between practices (not home to work)</li>
            <li>Equipment and instruments purchased for your work</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">National Insurance Contributions</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
            Self-employed associate dentists pay Class 2 and Class 4 National Insurance contributions. Class 2 NICs are a fixed weekly amount, while Class 4 NICs are calculated as a percentage of your profits. Understanding these contributions helps you plan your tax liability accurately.
          </p>
          <p className="text-base leading-relaxed text-[var(--ink-soft)]">
            Your National Insurance record affects your entitlement to state pension and certain benefits. Ensuring you pay the correct contributions protects your future entitlements while avoiding overpayment.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Tax Planning for Associates</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)]">
            Effective tax planning helps associate dentists minimise their tax liability legally. Strategies include timing income and expenses, maximising pension contributions, considering incorporation when appropriate, and understanding the impact of multiple income sources. A specialist dental accountant can help you structure your affairs efficiently while maintaining full compliance.
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
                          href={`/blog/associate-tax/${p.slug}`}
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
            Need Associate Tax Support?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
            Our specialist dental accountants help associate dentists optimise their tax position while ensuring full compliance. Get expert guidance tailored to your circumstances.
          </p>
          <div className="mt-8">
            <LeadForm redirectOnSuccess={false} submitLabel="Request Tax Planning Consultation" />
          </div>
        </div>
      </div>
    </article>
  );
}
