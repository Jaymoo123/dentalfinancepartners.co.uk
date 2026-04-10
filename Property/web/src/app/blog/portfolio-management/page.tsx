import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getCategorySlug, calculateReadTime } from "@/lib/blog";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteConfig } from "@/config/site";

const categoryName = "Portfolio Management";
const categorySlug = "portfolio-management";

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

export default function PortfolioManagementPage() {
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
            Build and manage your property portfolio effectively. Expert insights on accounting services, 
            tax planning, compliance, financial management, and choosing the right accountant for your needs.
          </p>
        </header>

        <div className="mt-10 space-y-8 max-w-4xl">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Portfolio Growth Strategies</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              Growing a property portfolio in the UK requires a clear acquisition strategy that balances yield, capital appreciation, and risk. Many investors start with a single buy-to-let and scale into multi-unit freehold blocks or HMOs to improve returns per square foot. Each expansion decision carries tax consequences — from additional Stamp Duty Land Tax surcharges (currently 5% on second-plus properties) to the way finance costs are relieved under Section 24.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              A phased approach, targeting one or two acquisitions per year while reinvesting net rental income, lets you build equity steadily without over-leveraging. Working with a specialist property accountant at each stage ensures new purchases are structured in the most tax-efficient vehicle from day one.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Financing and Leverage</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              Mortgage finance is the primary lever for portfolio landlords, but lenders apply stricter stress tests once you hold four or more mortgaged properties. Portfolio underwriting typically requires a full schedule of assets and liabilities, projected rental income across every unit, and evidence that your interest cover ratio (ICR) meets minimum thresholds — usually 125% to 145% at a stressed rate.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              Limited company borrowing has become more attractive since Section 24 removed full mortgage interest relief for higher-rate individual landlords. Company structures retain full interest deductibility, though lender rates tend to be 0.5–1% higher. Bridging finance and commercial loans can unlock opportunities such as auction purchases or refurbishment projects, but the costs must be modelled carefully against projected returns.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Self-Management vs Letting Agent</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              Deciding whether to manage properties yourself or appoint a letting agent affects both your cash flow and your time. Self-managing saves the typical 8–12% management fee, but demands hands-on involvement in tenant sourcing, maintenance coordination, deposit protection, and compliance with regulations like the Homes (Fitness for Human Habitation) Act 2018.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              As a portfolio grows beyond five or six units, most landlords find the operational burden outweighs the fee saving. A hybrid approach — self-managing nearby properties while appointing agents for geographically distant ones — can strike an effective balance. Whichever route you choose, agent fees and associated management costs are fully deductible against rental income for tax purposes.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Portfolio Diversification</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              Concentration risk is one of the biggest threats to a rental portfolio. Holding every property in the same postcode, the same tenant type, or the same price band exposes you to localised market downturns, regulatory changes, or sector-specific voids. Diversifying across residential, student, and short-term holiday lets spreads both income and void risk.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              Geographic diversification — investing in areas with different economic drivers — smooths returns further. Each property type brings distinct tax treatment: furnished holiday lets (FHLs) qualify for capital allowances and Business Asset Disposal Relief, while standard buy-to-lets do not. Understanding these differences is essential when choosing where to allocate your next deposit.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Exit Strategies and Succession Planning</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              Every portfolio needs an exit plan, whether that means a phased sell-down in retirement, a transfer to the next generation, or a bulk disposal to an institutional buyer. Capital Gains Tax (CGT) applies on disposal, with residential property gains taxed at 18% (basic rate) or 24% (higher rate) after the annual exempt amount.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              Timing disposals across multiple tax years and using spousal transfers to utilise both partners&apos; CGT allowances can substantially reduce the overall tax bill. For longer-term succession, transferring properties into a family investment company or trust may be appropriate, though Inheritance Tax and ongoing compliance costs must be weighed up. Early planning — ideally five to ten years before the intended exit — gives maximum flexibility.
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
            Need Portfolio Management Advice?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Whether you&apos;re scaling from one property to ten or restructuring an established portfolio, our specialist property accountants can help you minimise tax, optimise financing, and plan for the future. Get in touch for tailored advice on your portfolio.
          </p>
          <div className="mt-8">
            <LeadForm redirectOnSuccess={false} submitLabel="Request Portfolio Consultation" />
          </div>
        </div>
      </div>
    </>
  );
}
