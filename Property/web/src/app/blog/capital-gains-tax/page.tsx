import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getCategorySlug, calculateReadTime } from "@/lib/blog";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteConfig } from "@/config/site";

const categoryName = "Capital Gains Tax";
const categorySlug = "capital-gains-tax";

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

export default function CapitalGainsTaxPage() {
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
            Navigate capital gains tax with confidence. Expert guidance on CGT calculations, reliefs, 
            disposal strategies, and tax-efficient property investment planning.
          </p>
        </header>

        <div className="mt-10 space-y-8 max-w-4xl">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">CGT on Property Disposals</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              When you sell a residential property that is not your main home, capital gains tax applies to the profit — the difference between the sale price and your acquisition cost (including allowable purchase costs, improvement expenditure, and selling fees). For the 2026/27 tax year, residential property gains are taxed at 18% for basic-rate taxpayers and 24% for higher and additional-rate taxpayers.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              The rate that applies depends on your total taxable income in the year of disposal. If the gain, when added to your other income, falls within the basic-rate band, the portion within that band is taxed at 18% and the remainder at 24%. Timing a disposal to fall in a lower-income year can therefore reduce the effective CGT rate.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Principal Private Residence Relief</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              Principal private residence (PPR) relief exempts gains on the sale of your main home from CGT entirely. If you have lived in the property as your only or main residence for the entire period of ownership, the full gain is exempt. Where you lived in the property for part of the ownership period, the gain is apportioned — and the final nine months of ownership are always treated as deemed occupation, regardless of whether you lived there.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              Nominating which property is your main residence is critical for landlords who own multiple properties. HMRC allows a nomination within two years of acquiring a second property. Strategic nomination can maximise PPR relief on the property with the largest expected gain.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Lettings Relief</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              Lettings relief applies where a property that qualifies for PPR relief has also been let as residential accommodation. Since April 2020, lettings relief is only available if you shared occupation of the property with your tenant — simply letting out a former home no longer qualifies.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              Where it does apply, the relief is capped at the lower of: £40,000, the amount of PPR relief given, or the gain attributable to the letting period. In practice, this relief now benefits very few landlords, but it remains relevant for those who let rooms in their own home or live in part of a property they also let.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Annual Exempt Amount and Tax-Free Allowance</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              Every individual has an annual exempt amount (AEA) for capital gains — currently £3,000 for the 2026/27 tax year. Gains up to this threshold are tax-free. The AEA cannot be carried forward to future years, so if you do not use it, it is lost.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              For couples who jointly own investment properties, each person has their own £3,000 AEA, giving a combined £6,000 exemption. Transferring a share of a property to a spouse before sale (which is a no-gain, no-loss event) can therefore double the tax-free allowance available on the disposal.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">CGT Reporting and the 60-Day Rule</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              Since April 2020, UK residents who sell a residential property at a gain must report the disposal and make a payment on account of CGT within 60 days of completion. This applies to all residential property disposals where CGT is due — including buy-to-let sales, inherited properties, and second homes.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              The 60-day report is submitted through HMRC&apos;s online CGT on UK property service, separate from the self-assessment system. Failure to report within 60 days triggers late filing penalties under the same points-based regime used for other HMRC obligations. The disposal must still be included on your self-assessment return for the relevant tax year, with credit given for any payment on account already made.
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
            Need CGT Planning Advice?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Capital gains tax on property requires careful planning — from timing disposals to maximising reliefs. Our specialist property tax accountants can calculate your exact liability, identify available reliefs, and help you structure disposals tax-efficiently.
          </p>
          <div className="mt-8">
            <LeadForm redirectOnSuccess={false} submitLabel="Request CGT Consultation" />
          </div>
        </div>
      </div>
    </>
  );
}
