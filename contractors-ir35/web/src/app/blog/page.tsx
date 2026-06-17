import type { Metadata } from "next";
import Link from "next/link";
import { siteContainerLg, sectionYLoose } from "@/components/ui/layout-utils";
import { getAllPosts, getAllCategories, calculateReadTime, getCategorySlug } from "@/lib/blog";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { BlogListWithSearch } from "@/components/blog/BlogListWithSearch";

export const metadata: Metadata = {
  title: "IR35 and Contractor Tax Blog | Guides and Articles",
  description:
    "Practical IR35 and contractor tax guides: off-payroll rules, limited company tax, expenses, dividends and pension planning, from specialist contractor accountants.",
  alternates: { canonical: `${siteConfig.url}/blog` },
  openGraph: {
    title: "IR35 and Contractor Tax Blog | Guides and Articles",
    description:
      "Practical IR35 and contractor tax guides: off-payroll rules, limited company tax, expenses, dividends and pension planning, from specialist contractor accountants.",
    url: `${siteConfig.url}/blog`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IR35 and Contractor Tax Blog | Guides and Articles",
    description:
      "Practical IR35 and contractor tax guides: off-payroll rules, limited company tax, expenses, dividends and pension planning, from specialist contractor accountants.",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const postsWithCategorySlug = posts.map((p) => ({
    ...p,
    categorySlug: getCategorySlug(p),
  }));
  const categories = getAllCategories();
  const readTimes = new Map(posts.map((p) => [p.slug, calculateReadTime(p.contentHtml)]));

  return (
    <>
      <section className="border-b border-neutral-200 bg-neutral-900 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Breadcrumb
            variant="light"
            items={[
              { label: "Home", href: "/" },
              { label: "Blog" },
            ]}
          />
          <p className="mt-6 text-xs font-bold uppercase tracking-wider text-cyan-400">
            Contractor guides
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            IR35 and contractor tax, explained.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300">
            Practical guides on IR35 status, off-payroll rules, limited company tax, expenses, dividends and pension planning. Written by specialist contractor accountants.
          </p>
        </div>
      </section>

      {categories.length > 0 && (
        <section className="border-b border-neutral-200 bg-[#fafaf7] py-10 sm:py-12">
          <div className={siteContainerLg}>
            <p className="text-sm font-medium text-neutral-500 mb-4">Browse by topic</p>
            <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/blog/${cat.slug}`}
                  className="block min-h-[100px] p-5 border border-neutral-200 bg-white transition-all hover:border-cyan-700 hover:shadow-md"
                >
                  <h3 className="text-base font-bold text-neutral-900">{cat.name}</h3>
                  <p className="mt-1 text-sm text-neutral-500">
                    {cat.count} article{cat.count !== 1 ? "s" : ""}
                  </p>
                  <span className="mt-2 inline-flex items-center text-sm font-medium text-cyan-800">
                    View articles
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className={`bg-white ${sectionYLoose}`}>
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 mb-6 sm:text-3xl">
            All articles
          </h2>
          <BlogListWithSearch
            posts={postsWithCategorySlug}
            categories={categories}
            readTimes={readTimes}
          />
        </div>
      </section>
    </>
  );
}
