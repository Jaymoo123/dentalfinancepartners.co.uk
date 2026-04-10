import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getCategorySlug, calculateReadTime } from "@/lib/blog";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteConfig } from "@/config/site";

const categoryName = "Making Tax Digital (MTD)";
const categorySlug = "making-tax-digital-mtd";

export const metadata: Metadata = {
  title: `${categoryName} for Property Investors | ${siteConfig.name}`,
  description: `Expert guidance on ${categoryName.toLowerCase()} for UK property investors. Practical advice, tax planning strategies, and compliance insights.`,
  alternates: {
    canonical: `${siteConfig.url}/blog/${categorySlug}`,
  },
  openGraph: {
    title: `${categoryName} for Property Investors`,
    description: `Expert guidance on ${categoryName.toLowerCase()} for UK property investors.`,
    url: `${siteConfig.url}/blog/${categorySlug}`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${categoryName} for Property Investors`,
    description: `Expert guidance on ${categoryName.toLowerCase()} for UK property investors.`,
  },
};

export default function MakingTaxDigitalMTDPage() {
  const allPosts = getAllPosts();
  const categoryPosts = allPosts.filter(
    (post) => getCategorySlug(post) === categorySlug,
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` },
          { "@type": "ListItem", position: 3, name: categoryName },
        ],
      },
      {
        "@type": "CollectionPage",
        name: `${categoryName} for Property Investors`,
        description: metadata.description,
        url: `${siteConfig.url}/blog/${categorySlug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <nav className="mb-6 text-sm text-slate-600" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-emerald-600 transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/blog" className="hover:text-emerald-600 transition-colors">
                Blog
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-slate-900 font-medium" aria-current="page">
              {categoryName}
            </li>
          </ol>
        </nav>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {categoryName}
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl">
            Stay compliant with Making Tax Digital requirements. Practical guidance on MTD for Income Tax, 
            software integration, record-keeping obligations, and digital submission requirements for landlords.
          </p>
        </header>

        <div className="mt-10 space-y-8 max-w-4xl">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">MTD for Landlords: What You Need to Know</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              Making Tax Digital for Income Tax Self Assessment (MTD for ITSA) requires landlords and self-employed individuals with qualifying income over £50,000 to maintain digital records and submit quarterly updates to HMRC. This replaces the single annual self-assessment tax return with ongoing digital reporting throughout the tax year.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              For property landlords, qualifying income means gross rental income before expenses. If your combined property and self-employment income exceeds the threshold, you must comply. The threshold drops to £30,000 from April 2027, bringing significantly more landlords into scope.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Compliance Timeline and Key Deadlines</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              Landlords with qualifying income over £50,000 must comply from April 2026. Those with income between £30,000 and £50,000 join from April 2027. HMRC has indicated that the threshold may be lowered further in future, potentially capturing all landlords with property income above £20,000.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              Quarterly updates are due by the 7th of the month following the end of each quarter — so for a standard April-to-April tax year, deadlines fall on 7 August, 7 November, 7 February, and 7 May. A final end-of-period statement and crystallisation declaration replace the traditional self-assessment return.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Compatible Software for Property Landlords</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              HMRC maintains a list of MTD-compatible software that can connect to their systems via API. Options range from full accounting packages like Xero, QuickBooks, and FreeAgent to dedicated landlord tools like Hammock and GoSimpleTax. Spreadsheets alone are not sufficient — you need bridging software or a native MTD application.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              When choosing software, consider whether it handles multiple properties, tracks expenses by property, supports the quarterly submission format, and integrates with your accountant&apos;s systems. Many landlords find that starting with MTD-ready software well before the mandatory date reduces stress and errors during the transition.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Quarterly Reporting Requirements</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              Each quarterly update must include a summary of rental income received and allowable expenses paid during that period. HMRC does not require individual transaction-level data in the quarterly submission, but you must maintain the underlying digital records in case of enquiry.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              Allowable expenses include mortgage interest (as a tax reducer for individuals), letting agent fees, insurance, repairs, council tax (if paid by the landlord), and professional fees. Keeping these categorised correctly throughout the year, rather than at year-end, is the key operational change MTD introduces.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Penalties and Enforcement</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              HMRC&apos;s new points-based penalty regime applies to MTD submissions. Each late quarterly update earns a penalty point. Once you accumulate a threshold number of points (four for quarterly obligations), a £200 penalty is charged — and every subsequent late submission also triggers a £200 fine until the points are reset.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              Late payment penalties are separate: 2% of the tax owed at 15 days late, a further 2% at 30 days, and then 4% per annum on any balance outstanding after 30 days. Interest also accrues from the due date. These penalties make timely compliance significantly more important than under the old self-assessment regime.
            </p>
          </section>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {categoryPosts.map((post) => {
            const readTime = calculateReadTime(post.contentHtml);
            return (
              <article key={post.slug} className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <Link href={`/blog/${categorySlug}/${post.slug}`} className="block p-6 h-full flex flex-col">
                  <h2 className="text-xl font-semibold text-slate-900 mb-3 hover:text-emerald-600 transition-colors">
                    {post.title}
                  </h2>
                  {post.summary && (
                    <p className="text-slate-600 mb-4 flex-grow line-clamp-3">{post.summary}</p>
                  )}
                  <div className="flex items-center gap-3 text-sm text-slate-500 mt-auto">
                    {post.date && (
                      <time dateTime={post.date}>
                        {new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date(post.date))}
                      </time>
                    )}
                    <span>•</span>
                    <span>{readTime} min read</span>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>

        {categoryPosts.length === 0 && (
          <p className="text-slate-600 text-center py-12">
            No articles found in this category yet.
          </p>
        )}

        <div className="mt-12 pt-8 border-t border-slate-200">
          <Link
            href="/blog"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
          >
            ← Back to all articles
          </Link>
        </div>

        <div className="mt-12 border-2 border-emerald-600/20 bg-gradient-to-br from-emerald-50 to-teal-50 p-8 sm:p-10 rounded-2xl max-w-4xl">
          <h2 className="text-2xl font-bold text-emerald-700 sm:text-3xl">
            Need MTD Compliance Help?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Making Tax Digital represents the biggest change to tax reporting in a generation. Our specialist property accountants can help you choose the right software, set up compliant digital records, and ensure you meet every quarterly deadline.
          </p>
          <div className="mt-8">
            <LeadForm redirectOnSuccess={false} submitLabel="Request MTD Consultation" />
          </div>
        </div>
      </div>
    </>
  );
}
