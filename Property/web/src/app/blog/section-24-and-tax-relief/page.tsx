import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getCategorySlug, calculateReadTime } from "@/lib/blog";
import { LeadForm } from "@/components/forms/LeadForm";

const categoryName = "Section 24 & Tax Relief";
const categorySlug = "section-24-and-tax-relief";

export const metadata: Metadata = {
  title: `${categoryName} for Property Investors | Property Tax Partners`,
  description: `Expert guidance on ${categoryName.toLowerCase()} for UK property investors. Practical advice, tax planning strategies, and compliance insights.`,
  alternates: {
    canonical: `https://www.propertytaxpartners.co.uk/blog/${categorySlug}`,
  },
  openGraph: {
    title: `${categoryName} for Property Investors`,
    description: `Expert guidance on ${categoryName.toLowerCase()} for UK property investors.`,
    url: `https://www.propertytaxpartners.co.uk/blog/${categorySlug}`,
    siteName: "Property Tax Partners",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${categoryName} for Property Investors`,
    description: `Expert guidance on ${categoryName.toLowerCase()} for UK property investors.`,
  },
};

export default function Section24TaxReliefPage() {
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
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.propertytaxpartners.co.uk" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.propertytaxpartners.co.uk/blog" },
          { "@type": "ListItem", position: 3, name: categoryName },
        ],
      },
      {
        "@type": "CollectionPage",
        name: `${categoryName} for Property Investors`,
        description: metadata.description,
        url: `https://www.propertytaxpartners.co.uk/blog/${categorySlug}`,
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
            Navigate Section 24 mortgage interest restrictions with confidence. Comprehensive guides on tax relief changes, 
            calculators, planning strategies, furnished holiday lets, and self-assessment for landlords.
          </p>
        </header>

        <div className="mt-10 space-y-8 max-w-4xl">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Understanding Section 24 Mortgage Interest Restrictions</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              Section 24 of the Finance (No. 2) Act 2015 fundamentally changed how individual landlords claim tax relief on mortgage interest. Since April 2020, individual landlords can no longer deduct mortgage interest from rental income before calculating tax. Instead, they receive a basic-rate (20%) tax credit on the interest paid.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              This means the full rental income is taxed at your marginal rate, with only a 20% credit applied afterwards. For basic-rate taxpayers the effect is neutral, but higher-rate and additional-rate taxpayers face a significantly increased tax bill.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Impact on Higher-Rate Taxpayers</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              Higher-rate taxpayers at 40% only receive a 20% tax credit, effectively doubling the cost of mortgage interest. Additional-rate taxpayers at 45% fare even worse. Section 24 can also push basic-rate taxpayers into the higher-rate band because gross rental income — without the mortgage deduction — inflates total taxable income.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              This knock-on effect can reduce eligibility for child benefit, erode the personal savings allowance, and remove access to marriage allowance — making the real cost of Section 24 far greater than the headline figures suggest.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Calculating Your Section 24 Liability</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              To calculate your Section 24 position, start with gross rental income and deduct all allowable expenses except finance costs. Apply income tax at your marginal rate to the resulting profit. Then calculate 20% of your total finance costs and deduct this as a tax credit. The difference between these two figures represents your additional tax burden under Section 24.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              Landlords with multiple properties should aggregate all rental income and finance costs across their portfolio before performing this calculation, as HMRC treats UK property income as a single business.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Mitigation Strategies: Incorporation and Partnerships</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              The most common mitigation strategy is transferring properties to a limited company, which is not affected by Section 24. Companies deduct mortgage interest as a business expense before corporation tax at 25%. However, incorporation triggers capital gains tax and stamp duty land tax on the transfer, so the numbers must be modelled carefully.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              Partnership structures can also help where one spouse is a basic-rate taxpayer. By adjusting profit-sharing ratios, more income can be allocated to the lower-earning partner. Some landlords also consider reducing leverage or overpaying mortgages to shrink the finance cost caught by Section 24.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Furnished Holiday Let Exemptions</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              Furnished holiday lettings (FHLs) that meet HMRC qualifying criteria are treated as trading income rather than investment income. This means FHL landlords can still deduct mortgage interest in full against rental profits, bypassing Section 24 entirely. The property must be available for letting at least 210 days per year and actually let for at least 105 days.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              FHL status also provides access to capital allowances on furniture and equipment, capital gains tax business asset disposal relief, and pension contribution relief based on FHL profits. However, HMRC reviews FHL claims closely, so accurate records of letting days are essential.
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
            Need Section 24 Tax Advice?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Section 24 has significantly increased the tax burden for many landlords. Our specialist property tax accountants can model your exact position, compare mitigation strategies, and help you make informed decisions about your portfolio&apos;s future.
          </p>
          <div className="mt-8">
            <LeadForm redirectOnSuccess={false} submitLabel="Request a Free Consultation" />
          </div>
        </div>
      </div>
    </>
  );
}
