import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getCategorySlug, calculateReadTime } from "@/lib/blog";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";

const categoryName = "Agency Finance Essentials";
const categorySlug = "agency-finance-essentials";

export const metadata: Metadata = {
  title: `${categoryName} for Agency Founders | ${siteConfig.name}`,
  description: `Practical financial guidance for agency founders covering profit margins, cash flow, management accounts, bookkeeping and accounting software. Written by agency specialist accountants.`,
  alternates: { canonical: `${siteConfig.url}/blog/${categorySlug}` },
  openGraph: {
    title: `${categoryName} for Agency Founders`,
    description: `Practical financial guidance for agency founders covering profit margins, cash flow, management accounts and bookkeeping.`,
    url: `${siteConfig.url}/blog/${categorySlug}`,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function AgencyFinanceEssentialsPage() {
  const allPosts = getAllPosts();
  const categoryPosts = allPosts.filter((post) => getCategorySlug(post) === categorySlug);

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
        name: `${categoryName} for Agency Founders`,
        description: metadata.description as string,
        url: `${siteConfig.url}/blog/${categorySlug}`,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className={`${siteContainerLg} py-12`}>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: categoryName },
          ]}
        />

        <header className="mt-6 mb-10 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">{categoryName}</h1>
          <p className="text-xl text-slate-600">
            The financial foundations every agency founder needs to understand. From reading your P&L to setting up management accounts, choosing accounting software and understanding what your numbers really mean for the health and growth of your business.
          </p>
        </header>

        <div className="mt-8 space-y-6 max-w-4xl">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Understanding Your Agency's Financial Health</h2>
            <p className="text-base leading-relaxed text-slate-600">
              Many agency founders are excellent at winning clients and delivering work but less confident reading their own financial statements. The profit and loss account, balance sheet and cash flow statement each tell a different part of the story. Understanding how to read all three, and what the numbers mean for your agency specifically, is the foundation of good financial decision-making.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Why Cash Flow Matters More Than Profit</h2>
            <p className="text-base leading-relaxed text-slate-600">
              Profitable agencies can still run out of money. This is one of the most common and preventable problems in agency finance. Late-paying clients, project upfront costs, staff wages and quarterly tax payments all create timing mismatches between when money comes in and when it goes out. A rolling cash flow forecast, even a simple one, gives you early warning of problems and confidence to make investment decisions.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">What Profit Margins Look Like in Agencies</h2>
            <p className="text-base leading-relaxed text-slate-600">
              Agency profit margins vary widely by type and model. Marketing and creative agencies typically run net profit margins of 15–25%. Staffing-heavy agencies or those with significant media buying may run lower gross margins but higher net margins. Understanding where your margins sit relative to industry benchmarks, and what drives them up or down, is essential for pricing, hiring and growth decisions.
            </p>
          </section>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {categoryPosts.map((post) => {
            const readTime = calculateReadTime(post.contentHtml);
            return (
              <article key={post.slug} className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <Link href={`/blog/${categorySlug}/${post.slug}`} className="block p-6 h-full flex flex-col">
                  <h2 className="text-xl font-semibold text-slate-900 mb-3 hover:text-indigo-600 transition-colors">{post.title}</h2>
                  {post.summary && <p className="text-slate-600 mb-4 flex-grow line-clamp-3 text-sm">{post.summary}</p>}
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
          <p className="text-slate-600 text-center py-12">Articles coming soon.</p>
        )}

        <div className="mt-10">
          <Link href="/blog" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium">
            ← Back to all articles
          </Link>
        </div>

        <div className="mt-12 border-2 border-indigo-600/20 bg-indigo-50 p-8 sm:p-10 max-w-4xl">
          <h2 className="text-2xl font-bold text-indigo-900 sm:text-3xl">
            Want specialist accounting for your agency?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Book a free call with an agency specialist accountant. We will talk through your numbers and give you practical recommendations, no jargon, no obligation.
          </p>
          <div className="mt-8">
            <LeadForm redirectOnSuccess={false} submitLabel="Book a free call" />
          </div>
        </div>
      </div>
    </>
  );
}
