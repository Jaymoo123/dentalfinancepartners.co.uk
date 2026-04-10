import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getCategorySlug, calculateReadTime } from "@/lib/blog";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteConfig } from "@/config/site";

const categoryName = "Property Accountant Services";
const categorySlug = "property-accountant-services";

export const metadata: Metadata = {
  title: `${categoryName} | ${siteConfig.name}`,
  description: `Find and compare specialist property accountants across the UK. Pricing guides, service comparisons, location-specific recommendations, and career insights.`,
  alternates: {
    canonical: `${siteConfig.url}/blog/${categorySlug}`,
  },
  openGraph: {
    title: `${categoryName} for UK Landlords`,
    description: `Find and compare specialist property accountants across the UK.`,
    url: `${siteConfig.url}/blog/${categorySlug}`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${categoryName} for UK Landlords`,
    description: `Find and compare specialist property accountants across the UK.`,
  },
};

export default function PropertyAccountantServicesPage() {
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
        name: categoryName,
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
            Find the right property accountant for your portfolio. Location guides, pricing breakdowns, 
            service comparisons, and expert advice on choosing a specialist landlord accountant.
          </p>
        </header>

        <div className="mt-10 space-y-8 max-w-4xl">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Why Use a Specialist Property Accountant?</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              Property taxation in the UK is significantly more complex than standard self-assessment. Between Section 24 finance cost restrictions, Capital Gains Tax reliefs, Stamp Duty surcharges, and the distinct rules for furnished holiday lets, a general high-street accountant can easily miss savings or, worse, file incorrectly. A specialist property accountant works with landlord clients day in, day out and understands the nuances that directly affect your bottom line.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              Specialist firms also stay ahead of regulatory changes — such as Making Tax Digital for Income Tax, which will require quarterly digital reporting from landlords with qualifying income above £50,000 from April 2026. Proactive advice on structuring purchases, timing disposals, and choosing the right ownership vehicle can save thousands over a portfolio&apos;s lifetime.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Services a Property Accountant Provides</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              A dedicated property accountant typically handles annual self-assessment tax returns, rental income schedules, and year-end accounts for landlords operating through limited companies. Beyond compliance, they advise on tax planning — including incorporation analysis, capital allowances claims, and loss relief strategies across your portfolio.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              Many firms also offer bookkeeping support, VAT registration and returns for commercial landlords, mortgage and refinancing projections, and CGT computations on disposals. If you hold property jointly or through a trust, your accountant should prepare the partnership or trust returns and advise on profit-sharing ratios that reflect each party&apos;s actual economic interest.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Choosing the Right Accountant</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              Look for a firm with demonstrable property sector experience — not just a handful of landlord clients but a genuine specialism. Check whether they are ACCA, ICAEW, or CIOT qualified and hold professional indemnity insurance. Client testimonials and case studies specific to property investors are more meaningful than generic reviews.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              Communication matters as much as technical skill. Your accountant should be accessible when you need them — especially around the 31 January self-assessment deadline or when you&apos;re mid-way through a purchase. Ask about their technology stack: cloud accounting (Xero, FreeAgent, QuickBooks) and digital record-keeping are essential for MTD compliance and real-time visibility of your portfolio finances.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Cost and Fee Structures</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              Property accountancy fees vary widely based on portfolio size, company structure, and the scope of work. A straightforward personal tax return with a single buy-to-let might cost £250–£400, while a limited company with ten-plus properties, VAT registration, and quarterly management accounts could run to £2,000–£4,000 per year. Most specialist firms offer fixed-fee packages so you know exactly what you&apos;ll pay.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              When comparing quotes, look beyond the headline fee. Some firms charge separately for ad hoc tax advice, HMRC correspondence, or CGT computations, while others bundle everything into an annual retainer. A slightly higher fixed fee that includes unlimited queries often delivers better value than a low base price with costly add-ons.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">When to Switch Accountants</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              If your current accountant is simply filing what you give them without offering proactive tax-saving advice, it may be time to move. Other red flags include missed deadlines, slow responses during critical periods, lack of familiarity with property-specific reliefs, or an inability to support limited company structures and MTD-compatible software.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              Switching is straightforward: your new accountant handles the professional clearance process and obtains your records from the outgoing firm. The best time to transition is after your annual accounts have been filed, giving the new firm a clean starting point. Most landlords who switch to a specialist report recouping the cost of fees through improved tax efficiency within the first year.
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
            Looking for a Property Accountant?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Our specialist property accountants work exclusively with UK landlords and property investors. From tax returns and company accounts to incorporation advice and CGT planning, we provide the expert support your portfolio needs. Get in touch to see how we can help.
          </p>
          <div className="mt-8">
            <LeadForm redirectOnSuccess={false} submitLabel="Request a Free Consultation" />
          </div>
        </div>
      </div>
    </>
  );
}
