import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getCategorySlug, calculateReadTime } from "@/lib/blog";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteConfig } from "@/config/site";

const categoryName = "Property Types & Specialist Tax";
const categorySlug = "property-types-and-specialist-tax";

export const metadata: Metadata = {
  title: `${categoryName} for UK Landlords | ${siteConfig.name}`,
  description: `Tax guidance for specialist property types: HMOs, commercial property, serviced accommodation, holiday lets, student housing, and property development. Rules, reliefs, and planning strategies.`,
  alternates: {
    canonical: `${siteConfig.url}/blog/${categorySlug}`,
  },
  openGraph: {
    title: `${categoryName} for UK Landlords`,
    description: `Tax guidance for specialist property types: HMOs, commercial, serviced accommodation, holiday lets, and development.`,
    url: `${siteConfig.url}/blog/${categorySlug}`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${categoryName} for UK Landlords`,
    description: `Tax guidance for specialist property types: HMOs, commercial, serviced accommodation, and development.`,
  },
};

export default function PropertyTypesPage() {
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
        name: `${categoryName} for UK Landlords`,
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
            Different property types face different tax rules. Expert guidance on HMOs, commercial property, serviced accommodation, holiday lets, student housing, and property development.
          </p>
        </header>

        <div className="mt-10 space-y-8 max-w-4xl">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">HMOs and Multi-Tenant Properties</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              Houses in multiple occupation carry unique tax considerations beyond standard buy-to-let. Licensing costs, communal area expenses, room-by-room income allocation, and higher maintenance requirements all affect the tax position. HMOs may also attract business rates rather than council tax depending on the property configuration and local authority rules.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              Section 24 mortgage interest restrictions hit HMO landlords particularly hard because higher gross rents often push total income into higher tax bands, while the restricted relief remains at the basic rate. Understanding how to structure HMO income and expenses correctly is essential for accurate tax returns and effective planning.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Commercial Property</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              Commercial property investment operates under a different tax framework from residential. Section 24 mortgage interest restrictions do not apply to commercial property held personally — full interest deductions remain available. Capital allowances on plant and machinery, structures and buildings allowance (SBA), and the treatment of business rates create additional planning opportunities that residential landlords do not have.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              VAT is a critical consideration for commercial property. Most commercial rents are exempt from VAT unless the landlord has opted to tax the property, which locks in for 20 years but allows recovery of input VAT on costs. The decision to opt to tax should be made carefully, considering the VAT status of tenants and the long-term implications.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Serviced Accommodation and Holiday Lets</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              The furnished holiday lettings (FHL) tax regime was abolished from April 2025, removing several significant tax advantages that short-term rental operators previously enjoyed. Former FHL properties no longer qualify for capital allowances on furniture, business asset disposal relief on sale, or the ability to make pension contributions based on rental profits.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              Post-abolition, serviced accommodation income is taxed as property income under the same rules as standard buy-to-let, including Section 24 mortgage interest restrictions. However, if the operation involves substantial services (cleaning, meals, concierge), it may be classified as a trading activity rather than property income, which changes the tax treatment significantly.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Property Development</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              Property development profits are typically treated as trading income rather than capital gains. This distinction is critical: trading profits are subject to income tax (or corporation tax for companies) at marginal rates, with no annual exempt amount and no access to CGT reliefs. HMRC applies the &ldquo;badges of trade&rdquo; tests to determine whether an activity constitutes development trading or property investment.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              Developers may need to register for the Construction Industry Scheme (CIS), account for VAT on new-build sales, and consider whether profits should flow through a company or personal structure. The correct classification of each project — investment, development, or mixed — determines which tax regime applies and which deductions are available.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Student Housing</h2>
            <p className="text-base leading-relaxed text-slate-600">
              Purpose-built student accommodation and converted houses let to students have specific tax and rates implications. Properties let entirely to students may be exempt from council tax, but this depends on all occupants being full-time students. Where a property is classified as an HMO, business rates may apply instead. Student lets often generate higher yields but come with shorter tenancy cycles and higher turnover costs — all of which affect the net tax position.
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
            Need Specialist Property Tax Advice?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            HMOs, commercial property, serviced accommodation, and development projects each carry unique tax challenges. Our specialist property tax accountants can assess your specific situation and ensure you are claiming every available relief.
          </p>
          <div className="mt-8">
            <LeadForm redirectOnSuccess={false} submitLabel="Request Specialist Consultation" />
          </div>
        </div>
      </div>
    </>
  );
}
