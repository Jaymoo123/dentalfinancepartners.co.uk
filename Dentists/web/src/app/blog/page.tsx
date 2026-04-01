import type { Metadata } from "next";
import Link from "next/link";
import { contentNarrow, focusRing, sectionY } from "@/components/ui/layout-utils";
import { getAllPosts, getAllCategories, calculateReadTime, getCategorySlug } from "@/lib/blog";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { BlogListWithSearch } from "@/components/blog/BlogListWithSearch";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "UK dental accounting and tax articles for associates, practice owners, and managers — NHS/private mixes, compliance, and profit.",
  alternates: { canonical: `${siteConfig.url}/blog` },
  openGraph: {
    title: "Blog",
    description:
      "UK dental accounting and tax articles for associates, practice owners, and managers — NHS/private mixes, compliance, and profit.",
    url: `${siteConfig.url}/blog`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog",
    description:
      "UK dental accounting and tax articles for associates, practice owners, and managers — NHS/private mixes, compliance, and profit.",
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
    <div className={`${contentNarrow} ${sectionY}`}>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Blog" },
        ]}
      />
      <h1 className="font-serif text-3xl font-semibold text-[var(--ink)] sm:text-4xl">
        Insights for UK dental practices
      </h1>
      <p className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
        Practical notes on tax, accounts, and practice economics — written for dentists and owners, not generic SMEs.
      </p>

      {/* Featured Category Guides */}
      <section className="mt-8 sm:mt-12">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--ink)] mb-4 sm:mb-6">Comprehensive Guides by Topic</h2>
        <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/blog/${cat.slug}`}
              className={`block min-h-[120px] p-5 sm:p-6 rounded-xl border-2 border-[var(--border)] bg-[var(--surface)] transition-all hover:border-[var(--primary)] hover:shadow-lg active:scale-[0.98] ${focusRing}`}
            >
              <h3 className="text-base sm:text-lg font-bold text-[var(--ink)] mb-2">{cat.name}</h3>
              <p className="text-sm text-[var(--muted)] mb-3">
                {cat.count} article{cat.count !== 1 ? 's' : ''}
              </p>
              <span className="inline-flex items-center text-sm font-medium text-[var(--primary)]">
                View guide
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* All Articles */}
      <section className="mt-10 sm:mt-12">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--ink)] mb-4 sm:mb-6">All Articles</h2>
        <BlogListWithSearch posts={postsWithCategorySlug} categories={categories} readTimes={readTimes} />
      </section>
    </div>
  );
}
