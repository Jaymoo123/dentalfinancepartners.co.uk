import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { getAllPosts, getAllCategories, getCategorySlug } from "@/lib/blog";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { BlogListWithSearch } from "@/components/blog/BlogListWithSearch";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | Property Tax Insights for UK Landlords",
  description:
    "Property tax articles for UK landlords — Section 24, MTD, incorporation, portfolio management. Written by specialist property accountants.",
  alternates: { canonical: `${siteConfig.url}/blog` },
  openGraph: {
    title: "Blog | Property Tax Insights for UK Landlords",
    description:
      "Property tax articles for UK landlords — Section 24, MTD, incorporation, portfolio management. Written by specialist property accountants.",
    url: `${siteConfig.url}/blog`,
    type: "website",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  const postsWithCategorySlug = posts.map((post) => ({
    ...post,
    categorySlug: getCategorySlug(post),
  }));

  return (
    <>
      <section className="relative h-[350px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1200&q=85"
          alt="UK property"
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-slate-900/85" />
        <div className={`${siteContainerLg} relative z-10 h-full flex items-center`}>
          <div className="max-w-3xl">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Blog" },
              ]}
            />
            <h1 className="mt-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">Property tax insights</h1>
            <p className="mt-4 text-xl text-white">
              Practical notes on tax, accounts, and property economics — written for landlords, not generic SMEs.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">
              Comprehensive Guides by Topic
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/blog/${cat.slug}`}
                  className="group block bg-white rounded-lg border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-emerald-600 transition-all"
                >
                  <h3 className="text-xl font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    {cat.count} {cat.count === 1 ? "article" : "articles"}
                  </p>
                  <div className="mt-4 flex items-center text-emerald-600 font-medium text-sm">
                    Explore guides
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">All Articles</h2>
            <BlogListWithSearch posts={postsWithCategorySlug} />
          </div>
        </div>
      </section>
    </>
  );
}
