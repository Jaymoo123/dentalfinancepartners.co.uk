import type { Metadata } from "next";
import Link from "next/link";
import { contentNarrow, focusRing, sectionY } from "@/components/ui/layout-utils";
import { getAllPosts, calculateReadTime } from "@/lib/blog";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "Law Firm Structure & Incorporation Guide | Accounts for Lawyers",
  description:
    "Expert guidance on law firm structures, LLP conversion, incorporation options, and partnership vs company tax planning for UK solicitors and legal practices.",
  alternates: { canonical: `${siteConfig.url}/blog/structure-incorporation` },
  openGraph: {
    title: "Law Firm Structure & Incorporation Guide",
    description:
      "Expert guidance on law firm structures, LLP conversion, incorporation options, and tax planning for UK solicitors.",
    url: `${siteConfig.url}/blog/structure-incorporation`,
    type: "website",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Law Firm Structure & Incorporation Guide",
    description:
      "Expert guidance on law firm structures, LLP conversion, incorporation options, and tax planning for UK solicitors.",
  },
};

export default function StructureIncorporationPillarPage() {
  const allPosts = getAllPosts();
  const relatedPosts = allPosts.filter((p) => p.category === "Structure & Incorporation");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` },
          { "@type": "ListItem", position: 3, name: "Structure & Incorporation" },
        ],
      },
      {
        "@type": "CollectionPage",
        name: metadata.title,
        description: metadata.description,
        url: `${siteConfig.url}/blog/structure-incorporation`,
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
          { label: "Structure & Incorporation" },
        ]}
      />

      <header className="border-l-4 border-[var(--primary)] bg-[var(--surface)] p-8">
        <h1 className="text-3xl font-bold leading-tight text-[var(--ink)] sm:text-4xl md:text-5xl">
          Law Firm Structure & Incorporation Guide
        </h1>
        <p className="mt-4 text-lg text-[var(--ink-soft)] leading-relaxed">
          Choosing the right business structure is one of the most important financial decisions for any law firm. Whether you're considering LLP conversion, incorporation, or restructuring your partnership, the tax and regulatory implications are significant.
        </p>
      </header>

      <div className="mt-10 space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Partnership vs LLP vs Limited Company</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
            UK law firms typically operate as traditional partnerships, LLPs, or limited companies. Each structure carries different implications for tax efficiency, partner liability, profit extraction, and regulatory compliance. The best choice depends on your firm's size, growth plans, and partners' personal tax positions.
          </p>
          <p className="text-base leading-relaxed text-[var(--ink-soft)]">
            Traditional partnerships offer simplicity but expose partners to unlimited liability. LLPs combine the tax transparency of partnerships with limited liability protection. Incorporation through a limited company opens up different profit extraction strategies but introduces corporation tax and dividend planning considerations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">LLP Conversion for Law Firms</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
            Converting from a traditional partnership to an LLP is one of the most common structural changes for growing law firms. Key considerations include:
          </p>
          <ul className="space-y-2 text-base text-[var(--ink-soft)] ml-6 list-disc">
            <li>Capital gains tax implications on asset transfers</li>
            <li>Stamp duty land tax on property held by the partnership</li>
            <li>Updating SRA registration and client notifications</li>
            <li>Revising partnership agreements and profit-sharing arrangements</li>
            <li>Impact on existing contracts and professional indemnity insurance</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Incorporation Planning</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
            Some law firms benefit from incorporating as a limited company, particularly where corporation tax rates create planning opportunities. However, solicitors must navigate SRA rules on alternative business structures (ABS licensing) and consider the impact on client money handling obligations.
          </p>
          <p className="text-base leading-relaxed text-[var(--ink-soft)]">
            Incorporation planning requires careful modelling of the tax position for both the company and individual directors/shareholders, factoring in salary, dividends, pension contributions, and employers' NI costs.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">Tax Implications of Restructuring</h2>
          <p className="text-base leading-relaxed text-[var(--ink-soft)]">
            Any change in legal structure triggers potential tax consequences. Capital gains on goodwill, basis period adjustments, and stamp duty obligations must all be modelled before proceeding. A specialist solicitor accountant can prepare detailed financial projections comparing your current structure with alternatives, ensuring the decision is based on solid numbers rather than assumptions.
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
                          href={`/blog/structure-incorporation/${p.slug}`}
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
            Considering a Change in Structure?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
            Our specialist solicitor accountants can model the tax implications of LLP conversion, incorporation, or any structural change for your practice. Get expert advice tailored to your firm.
          </p>
          <div className="mt-8">
            <LeadForm redirectOnSuccess={false} submitLabel="Request Structuring Consultation" />
          </div>
        </div>
      </div>
    </article>
    </>
  );
}
