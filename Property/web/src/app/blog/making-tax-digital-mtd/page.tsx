import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getCategorySlug } from "@/lib/blog";
import { ArrowRight } from "lucide-react";

const categoryName = "Making Tax Digital (MTD)";
const categorySlug = "making-tax-digital-mtd";

export const metadata: Metadata = {
  title: `${categoryName} for Property Investors | Accounts for Property`,
  description: `Expert guidance on ${categoryName.toLowerCase()} for UK property investors. Practical advice, tax planning strategies, and compliance insights.`,
  alternates: {
    canonical: `https://accountsforproperty.co.uk/blog/${categorySlug}`,
  },
  openGraph: {
    title: `${categoryName} for Property Investors`,
    description: `Expert guidance on ${categoryName.toLowerCase()} for UK property investors.`,
    url: `https://accountsforproperty.co.uk/blog/${categorySlug}`,
    siteName: "Accounts for Property",
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
          { "@type": "ListItem", position: 1, name: "Home", item: "https://accountsforproperty.co.uk" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "https://accountsforproperty.co.uk/blog" },
          { "@type": "ListItem", position: 3, name: categoryName },
        ],
      },
      {
        "@type": "CollectionPage",
        name: `${categoryName} for Property Investors`,
        description: metadata.description,
        url: `https://accountsforproperty.co.uk/blog/${categorySlug}`,
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

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categoryPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <Link
                href={`/blog/${categorySlug}/${post.slug}`}
                className="block p-6 h-full flex flex-col"
              >
                <h2 className="text-xl font-semibold text-slate-900 mb-3 hover:text-emerald-600 transition-colors">
                  {post.title}
                </h2>
                {post.summary && (
                  <p className="text-slate-600 mb-4 flex-grow line-clamp-3">
                    {post.summary}
                  </p>
                )}
                <div className="flex items-center text-emerald-600 font-medium text-sm mt-auto">
                  Read article
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </Link>
            </article>
          ))}
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
      </div>
    </>
  );
}
