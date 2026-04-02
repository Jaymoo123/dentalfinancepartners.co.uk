import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getCategorySlug } from "@/lib/blog";
import { ArrowRight } from "lucide-react";

const categoryName = "Property Accountant Services";
const categorySlug = "property-accountant-services";

export const metadata: Metadata = {
  title: `${categoryName} | Property Tax Partners`,
  description: `Find and compare specialist property accountants across the UK. Pricing guides, service comparisons, location-specific recommendations, and career insights.`,
  alternates: {
    canonical: `https://www.propertytaxpartners.co.uk/blog/${categorySlug}`,
  },
  openGraph: {
    title: `${categoryName} for UK Landlords`,
    description: `Find and compare specialist property accountants across the UK.`,
    url: `https://www.propertytaxpartners.co.uk/blog/${categorySlug}`,
    siteName: "Property Tax Partners",
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
            Find the right property accountant for your portfolio. Location guides, pricing breakdowns, 
            service comparisons, and expert advice on choosing a specialist landlord accountant.
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
