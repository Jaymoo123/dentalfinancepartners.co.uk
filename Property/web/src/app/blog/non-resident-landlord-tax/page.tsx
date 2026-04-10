import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getCategorySlug, calculateReadTime } from "@/lib/blog";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteConfig } from "@/config/site";

const categoryName = "Non-Resident Landlord Tax";
const categorySlug = "non-resident-landlord-tax";

export const metadata: Metadata = {
  title: `${categoryName} | ${siteConfig.name}`,
  description: `UK tax obligations for non-resident landlords and overseas property investors. NRL scheme, withholding tax, non-resident CGT, double taxation, ATED, and compliance requirements.`,
  alternates: {
    canonical: `${siteConfig.url}/blog/${categorySlug}`,
  },
  openGraph: {
    title: `${categoryName} | ${siteConfig.name}`,
    description: `UK tax obligations for non-resident landlords: NRL scheme, withholding tax, non-resident CGT, and compliance.`,
    url: `${siteConfig.url}/blog/${categorySlug}`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${categoryName}`,
    description: `UK tax obligations for non-resident landlords: NRL scheme, withholding tax, CGT, and compliance.`,
  },
};

export default function NonResidentLandlordTaxPage() {
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
            UK tax obligations for overseas landlords and non-resident property investors. From the NRL scheme and withholding tax to non-resident CGT and compliance requirements.
          </p>
        </header>

        <div className="mt-10 space-y-8 max-w-4xl">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">The Non-Resident Landlord Scheme</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              The Non-Resident Landlord (NRL) scheme requires UK letting agents and tenants to deduct basic rate tax (20%) from rental payments to landlords whose usual place of abode is outside the UK. The deduction is made at source and paid to HMRC quarterly, unless the landlord has applied to receive rent gross through HMRC&apos;s NRL1 approval process.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              Obtaining NRL approval to receive rent without deduction does not remove the tax liability — it simply shifts the payment obligation to self-assessment. Most non-resident landlords with good compliance history can obtain approval, which improves cash flow and simplifies rent collection. The landlord must still file a UK self-assessment return declaring the rental income and any allowable deductions.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Non-Resident Capital Gains Tax</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              Since April 2015, non-UK residents have been liable to CGT on disposals of UK residential property. From April 2019, this was extended to all UK property — including commercial property and indirect disposals through shares in property-rich companies. The gain is calculated from the date of acquisition or from 5 April 2015 (whichever is later), unless the taxpayer elects to use the original acquisition cost.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              Non-resident CGT must be reported within 60 days of completion using the same CGT on UK property service as UK residents. Non-residents can claim the annual exempt amount (£3,000 for 2026/27) and most of the same reliefs as UK residents, including principal private residence relief where the property was their main home during a period of UK residence.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Double Taxation and Treaty Relief</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              Non-resident landlords may face tax on the same rental income in both the UK and their country of residence. The UK has double taxation agreements with over 130 countries, most of which give the UK the primary right to tax income from UK property. The landlord&apos;s country of residence then provides relief — either by exempting the UK income or by giving a credit for UK tax paid.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              The mechanism varies by country. Some treaties use the exemption method (the income is simply excluded from the home country tax base), while others use the credit method (the income is included but a credit is given for UK tax already paid). Understanding which treaty applies and how relief is claimed in both jurisdictions is essential to avoid paying tax twice on the same income.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">ATED and the Overseas Entities Register</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              The Annual Tax on Enveloped Dwellings (ATED) applies to UK residential properties worth over £500,000 held by companies, partnerships with corporate members, or collective investment schemes. Non-resident companies owning UK residential property must file an ATED return annually and pay the charge (which ranges from approximately £4,400 to over £269,000 depending on property value), unless a relief applies.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              Since August 2022, overseas entities that own or wish to buy UK land must register with Companies House on the Register of Overseas Entities and provide information about their beneficial owners. Failure to register prevents the entity from buying, selling, transferring, or granting a lease over UK land, and the entity&apos;s existing registrable interests are noted on the Land Registry title.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Structuring Options for Non-Resident Investors</h2>
            <p className="text-base leading-relaxed text-slate-600">
              Non-resident landlords face a choice between holding UK property personally, through a UK company, or through an overseas company. Each structure has different tax implications: personal ownership subjects rental income to UK income tax with NRL withholding; a UK company pays corporation tax at 19-25% with full mortgage interest deductions but faces ATED and potential double taxation on profit extraction; an overseas company now pays UK corporation tax on UK property income (since April 2020) and faces the additional compliance burden of the overseas entities register.
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
            Non-Resident Landlord? Get Expert UK Tax Advice
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Navigating UK property tax as an overseas investor requires specialist knowledge of the NRL scheme, double taxation treaties, and cross-border structuring. Our property tax accountants work with non-resident landlords worldwide.
          </p>
          <div className="mt-8">
            <LeadForm redirectOnSuccess={false} submitLabel="Request Non-Resident Consultation" />
          </div>
        </div>
      </div>
    </>
  );
}
