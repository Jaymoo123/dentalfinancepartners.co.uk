import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getCategorySlug, calculateReadTime } from "@/lib/blog";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteConfig } from "@/config/site";

const categoryName = "Incorporation & Company Structures";
const categorySlug = "incorporation-and-company-structures";

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

export default function IncorporationCompanyStructuresPage() {
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
            Master property incorporation and company structures. Comprehensive guides on limited company setup, 
            holdover relief, director loans, dividend strategies, and choosing the right structure for your portfolio.
          </p>
        </header>

        <div className="mt-10 space-y-8 max-w-4xl">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">When Incorporation Makes Sense for Landlords</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              Incorporating a property portfolio into a limited company is most beneficial for higher-rate taxpayers with significant mortgage debt. Since Section 24 removed individual landlords&apos; ability to deduct mortgage interest, companies — which still deduct finance costs before corporation tax at 25% — can offer substantial annual savings.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              Incorporation tends to work best for landlords who plan to retain profits within the company rather than extract them immediately. If you rely on rental income for day-to-day living expenses, the additional costs of extracting funds via salary or dividends may reduce the advantage. A detailed tax comparison modelling at least 10 years of projected income is essential before committing.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Limited Company vs SPV Structures</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              A special purpose vehicle (SPV) is a limited company set up solely to hold property. Most buy-to-let mortgage lenders prefer SPV structures with SIC code 68100 (buying and selling of own real estate) or 68209 (letting of own property). An SPV keeps property assets ring-fenced from other business activities, simplifying accounting and lending.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              A trading limited company can also hold property, but lenders may apply stricter criteria and higher interest rates. For new purchases, an SPV is almost always the preferred route. For existing portfolios being incorporated, the choice depends on whether you have other business activities that could benefit from being combined.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Holdover Relief and Stamp Duty on Transfer</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              Transferring properties from personal ownership to a company is a disposal for capital gains tax purposes, triggering CGT on any gains at 18% or 24%. However, HMRC incorporation relief under TCGA 1992 s162 may apply if the portfolio qualifies as a business — typically requiring active management of multiple properties rather than passive holding.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              Stamp duty land tax (SDLT) applies on the market value of the transferred properties, including the 3% additional dwelling supplement. For large portfolios this can represent a significant upfront cost. Some landlords phase incorporations or use partnership structures as an intermediate step to manage these costs.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Director Loan Accounts and Dividend Extraction</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              When you transfer properties to your company, the market value less any mortgages creates a director&apos;s loan account — money the company owes you. You can withdraw this balance tax-free over time, providing a useful source of income in the early years of incorporation without triggering additional tax.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              Once the loan account is exhausted, profits are typically extracted via a combination of salary (up to the NIC threshold) and dividends. For the 2026/27 tax year, the dividend allowance is £500 and rates are 8.75% (basic), 33.75% (higher), and 39.35% (additional). Planning the mix of salary and dividends each year is critical to minimising the overall tax burden.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Choosing the Right Structure for Your Portfolio</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              The right structure depends on your portfolio size, mortgage levels, income needs, and long-term plans. Landlords building a portfolio to pass to the next generation may benefit from a family investment company (FIC), which offers flexible share classes and inheritance tax planning. Those focused on short-term cash flow may prefer to remain as individuals and use other Section 24 mitigation strategies.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              There is no one-size-fits-all answer. A specialist property tax accountant can model the scenarios — personal ownership, SPV, trading company, partnership, or FIC — against your actual numbers and help you choose the structure that delivers the best outcome over the life of your portfolio.
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
            Considering Incorporation?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Deciding whether to incorporate your property portfolio is one of the biggest financial decisions a landlord can make. Our specialist accountants can model the tax savings, calculate transfer costs, and guide you through the entire process.
          </p>
          <div className="mt-8">
            <LeadForm redirectOnSuccess={false} submitLabel="Request Incorporation Consultation" />
          </div>
        </div>
      </div>
    </>
  );
}
