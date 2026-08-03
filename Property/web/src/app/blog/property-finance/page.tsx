import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getCategorySlug, calculateReadTime } from "@/lib/blog";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteConfig } from "@/config/site";

const categoryName = "Property Finance";
const categorySlug = "property-finance";

export const metadata: Metadata = {
  title: `${categoryName} for UK Landlords and Investors`,
  description:
    "How buy-to-let, limited company, commercial, bridging and development finance work for UK property, and the tax questions each one raises.",
  alternates: {
    canonical: `${siteConfig.url}/blog/${categorySlug}`,
  },
  openGraph: {
    title: `${categoryName} for UK Landlords and Investors`,
    description:
      "How buy-to-let, limited company, commercial, bridging and development finance work for UK property, and the tax questions each raises.",
    url: `${siteConfig.url}/blog/${categorySlug}`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${categoryName} for UK Landlords and Investors`,
    description:
      "How buy-to-let, limited company, commercial, bridging and development finance work, and the tax questions each raises.",
  },
};

export default function PropertyFinancePage() {
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
        name: `${categoryName} for UK Landlords and Investors`,
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
            How landlords, investors and developers fund property, from buy-to-let and limited company mortgages to commercial, bridging and development finance. Clear, factual guidance on how each product works, the lending criteria, and the tax angle that sits alongside the borrowing.
          </p>
        </header>

        <div className="mt-10 space-y-8 max-w-4xl">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Buy-to-Let and Limited Company Mortgages</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              Most landlord borrowing is a buy-to-let mortgage, priced and stress-tested very differently from a residential loan. Lenders assess the rent against an interest coverage ratio (ICR), typically 125% for a basic-rate or company borrower and 145% for a higher-rate individual, at a notional stress rate rather than the pay rate. Deposit requirements usually start at 20% to 25% of value, and rates are driven by loan-to-value, product type and whether the borrower is an individual or a limited company.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              Since Section 24 removed full interest relief for personally held lettings, many higher-rate landlords hold property through a special purpose vehicle (SPV) company, where interest is still deducted in full before corporation tax. That is a finance decision with a large tax overlay, and the two need to be read together rather than in isolation.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Commercial Mortgages</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              Commercial and semi-commercial mortgages fund shops, offices, industrial units and mixed-use property, whether owner-occupied by a trading business or held as an investment. Lending is assessed on the strength of the business or the tenant covenant rather than a simple rent multiple, terms are usually shorter than residential, and many facilities are on a variable or margin-over-base basis. These are business loans and are not regulated in the way a residential mortgage is.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              The tax treatment is distinct too: Section 24 does not apply to commercial property, so interest is fully relievable, and capital allowances, the structures and buildings allowance and VAT (including the option to tax) all shape the real cost of ownership.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Bridging Finance</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              Bridging finance is short-term, interest-first lending used to move quickly: buying at auction inside the 28-day completion window, funding a refurbishment before refinancing onto a term mortgage (a bridge-to-let), breaking a chain, or securing a below-market-value purchase. It is priced monthly, secured on the asset, and repaid from a defined exit such as a sale or a remortgage. Investment and business bridging is unregulated lending, distinct from a regulated bridge secured on someone&rsquo;s own home.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              The tax questions bridging raises are frequently overlooked, in particular whether the interest is an allowable finance cost and how it interacts with the eventual term financing. That is where the numbers are won or lost.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Development Finance</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              Development finance funds ground-up construction and heavy refurbishment, released in stages against build progress rather than as a single lump sum. Lenders size facilities against gross development value (GDV) and loan-to-cost (LTC), retain an interest roll-up, and look closely at the developer&rsquo;s experience and the exit. Development exit finance can then replace a development loan once a scheme is complete but not yet sold, easing cash flow and reducing the rate.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              Development profits are usually taxed as trading income, not capital gains, so the funding structure and the tax structure of a scheme should be planned together from the outset.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Portfolio Finance and Capital Raising</h2>
            <p className="text-base leading-relaxed text-slate-600">
              Portfolio landlords face their own lending rules, including aggregate stress testing across all mortgaged properties and lender caps on portfolio size. Remortgaging to release equity is the usual way to fund the next purchase, but capital raised for a genuine business purpose is treated very differently from borrowing drawn for personal use, both for lending and for the finance-cost relief calculation. Getting that distinction right protects both the deal and the tax position.
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
            Planning the Tax Side of a Property Finance Decision?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Every financing choice, from an SPV buy-to-let mortgage to bridging or a development facility, carries a tax question alongside it: interest relief, incorporation, capital allowances, and how the borrowing is structured. Our property tax specialists can help you read the finance and the tax together before you commit.
          </p>
          <div className="mt-8">
            <LeadForm redirectOnSuccess={false} submitLabel="Request a Property Tax Consultation" />
          </div>
        </div>
      </div>
    </>
  );
}
