import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getCategorySlug, calculateReadTime } from "@/lib/blog";
import { LeadForm } from "@/components/forms/LeadForm";

const categoryName = "Landlord Tax Essentials";
const categorySlug = "landlord-tax-essentials";

export const metadata: Metadata = {
  title: `${categoryName} | Property Tax Partners`,
  description: `Essential tax guidance for UK landlords. Self-assessment, rental income tax, VAT, stamp duty, financial planning, and allowable expenses explained.`,
  alternates: {
    canonical: `https://www.propertytaxpartners.co.uk/blog/${categorySlug}`,
  },
  openGraph: {
    title: `${categoryName} for UK Landlords`,
    description: `Essential tax guidance for UK landlords covering self-assessment, rental income, VAT, and more.`,
    url: `https://www.propertytaxpartners.co.uk/blog/${categorySlug}`,
    siteName: "Property Tax Partners",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${categoryName} for UK Landlords`,
    description: `Essential tax guidance for UK landlords covering self-assessment, rental income, VAT, and more.`,
  },
};

export default function LandlordTaxEssentialsPage() {
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
        name: categoryName,
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
            Core tax knowledge every UK landlord needs. From self-assessment filing and rental income tax 
            to VAT registration, stamp duty, and maximising your allowable expenses.
          </p>
        </header>

        <div className="mt-10 space-y-8 max-w-4xl">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Income Tax for Landlords</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              Rental income in the UK is taxed as part of your total income, meaning it&apos;s added to employment earnings, pensions, and other sources before tax bands are applied. Basic-rate taxpayers pay 20% on rental profits, higher-rate taxpayers pay 40%, and additional-rate taxpayers pay 45%. Understanding where your rental income pushes you within these bands is critical for planning — even a modest portfolio can tip you from basic to higher rate.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              Since April 2020, Section 24 has fully restricted mortgage interest relief for individual landlords to a basic-rate tax credit (20%), regardless of your actual tax band. This means higher and additional-rate landlords effectively lose part of their interest deduction, which can turn a cash-flow-positive property into a tax-loss scenario on paper. Incorporation into a limited company is one strategy some landlords use to restore full interest deductibility, though it involves SDLT costs and CGT on transfer.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Allowable Expenses and Deductions</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              HMRC allows landlords to deduct a wide range of expenses from rental income before calculating taxable profit. These include letting agent fees, insurance premiums, maintenance and repair costs, ground rent, service charges, accountancy fees, and the cost of advertising for tenants. For furnished properties, you can claim the replacement of domestic items relief — covering like-for-like replacement of furniture, appliances, and kitchenware.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              The distinction between repairs (deductible) and improvements (capital expenditure, not deductible against income) is one of the most common areas of dispute with HMRC. Replacing a broken boiler with a modern equivalent is a repair; upgrading from a standard boiler to a premium system with additional radiators is likely an improvement. Keeping detailed records and photographs of the condition before and after work is the best way to support your claim if HMRC enquires.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Self-Assessment Deadlines</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              If you earn rental income, you must register for self-assessment and file a tax return each year. The key deadlines for the 2025/26 tax year are: 5 October 2026 to register if you&apos;re a new landlord, 31 October 2026 for paper returns, and 31 January 2027 for online returns and payment of any tax owed. Late filing attracts an automatic £100 penalty, with additional daily penalties and interest on unpaid tax.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              From April 2026, landlords with qualifying income above £50,000 will also need to comply with Making Tax Digital for Income Tax, submitting quarterly digital updates to HMRC through compatible software. This represents a significant shift from annual filing and requires ongoing digital bookkeeping throughout the year. Those with income between £30,000 and £50,000 will follow from April 2027.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Record Keeping Requirements</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              HMRC requires landlords to keep records for at least five years after the 31 January submission deadline for the relevant tax year. This includes rental income received, all expense receipts and invoices, mortgage statements, letting agent statements, and records of any capital expenditure. For CGT purposes, you should also retain purchase costs, solicitor and surveyor fees, and improvement expenditure for the entire period you own each property.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              Digital record keeping using cloud accounting software makes MTD compliance far simpler and reduces the risk of lost paperwork. Many landlords use Xero, FreeAgent, or QuickBooks linked to their bank accounts, with rental income and expenses categorised automatically. A specialist property accountant can set up your chart of accounts correctly from the start, saving hours of re-categorisation at year end.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Joint Ownership and Tax Implications</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              When a property is jointly owned — most commonly by married couples or civil partners — HMRC&apos;s default position is to split rental income and expenses 50/50, regardless of the actual ownership split. However, couples can file a Form 17 declaration with HMRC to be taxed according to their actual beneficial ownership. This is a powerful planning tool: if one partner is a basic-rate taxpayer and the other is higher rate, shifting a greater share of income to the lower earner reduces the overall tax bill.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              Form 17 must be accompanied by evidence of unequal beneficial ownership, such as a deed of trust. The declaration remains in force until ownership proportions genuinely change. For unmarried joint owners, HMRC taxes each person on their actual share by default, so Form 17 is not required. Understanding these rules before purchase — and structuring ownership accordingly — can save significant tax over the life of the investment.
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
            Need Landlord Tax Support?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            From self-assessment filing and allowable expenses to Section 24 planning and joint ownership structures, our specialist property accountants help UK landlords keep more of their rental income. Get in touch for expert, personalised advice.
          </p>
          <div className="mt-8">
            <LeadForm redirectOnSuccess={false} submitLabel="Request Tax Consultation" />
          </div>
        </div>
      </div>
    </>
  );
}
