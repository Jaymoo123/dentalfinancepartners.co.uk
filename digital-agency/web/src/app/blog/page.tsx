import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { getAllPosts, getAllCategories, getCategorySlug, calculateReadTime } from "@/lib/blog";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { BlogListWithSearch } from "@/components/blog/BlogListWithSearch";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | Agency Finance Insights for Founders",
  description:
    "Finance and tax articles for UK and UAE agency founders covering salary, dividends, IR35, incorporation, exit planning and more. Written by specialist agency accountants.",
  alternates: { canonical: `${siteConfig.url}/blog` },
  openGraph: {
    title: "Blog | Agency Finance Insights for Founders",
    description:
      "Finance and tax articles for UK and UAE agency founders covering salary, dividends, IR35, incorporation, exit planning and more.",
    url: `${siteConfig.url}/blog`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Agency Finance Insights for Founders",
    description:
      "Finance and tax articles for UK and UAE agency founders covering salary, dividends, IR35, incorporation, exit planning and more.",
  },
};

const AGENCY_CATEGORIES = [
  { slug: "agency-finance-essentials", name: "Agency Finance Essentials", description: "Foundational finance and tax for founders at every stage" },
  { slug: "tax-and-compliance", name: "Tax and Compliance", description: "Corporation tax, self assessment and HMRC obligations" },
  { slug: "salary-and-dividends", name: "Salary and Dividends", description: "Optimal extraction strategies for limited company founders" },
  { slug: "incorporation-and-structure", name: "Incorporation and Structure", description: "Sole trader, limited company, holding structures and group design" },
  { slug: "growth-and-exit", name: "Growth and Exit", description: "Scaling profitably and planning a tax-efficient sale" },
  { slug: "contractors-and-ir35", name: "Contractors and IR35", description: "Off-payroll compliance and status determination for agencies" },
  { slug: "agency-accountant-services", name: "Agency Accountant Services", description: "What to expect from a specialist agency accountant" },
  { slug: "making-tax-digital", name: "Making Tax Digital", description: "MTD requirements, software and compliance for agencies" },
  { slug: "international-agencies", name: "International Agencies", description: "Cross-border structures, UAE entities and international tax" },
];

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const readTimes = new Map(posts.map((p) => [p.slug, calculateReadTime(p.contentHtml)]));

  const postsWithCategorySlug = posts.map((post) => ({
    ...post,
    categorySlug: getCategorySlug(post),
  }));

  const countBySlug = new Map(categories.map((c) => [c.slug, c.count]));
  const displayCategories = AGENCY_CATEGORIES.map((cat) => ({
    ...cat,
    count: countBySlug.get(cat.slug) ?? 0,
  }));

  return (
    <>
      <section className="relative h-[350px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=85"
          alt="Agency founders collaborating"
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-60"
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
            <h1 className="mt-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">Agency finance insights</h1>
            <p className="mt-4 text-xl text-slate-200">
              Practical guidance on tax, accounts and growing a profitable agency. Written for founders, not accountants.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">
              Browse by topic
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {displayCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/blog/${cat.slug}`}
                  className="group block bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-indigo-600 transition-all"
                >
                  <h3 className="text-xl font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">{cat.description}</p>
                  <p className="mt-2 text-xs font-medium text-slate-400">
                    {cat.count} {cat.count === 1 ? "article" : "articles"}
                  </p>
                  <div className="mt-4 flex items-center text-indigo-600 font-medium text-sm">
                    Explore guides
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {postsWithCategorySlug.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <div className={siteContainerLg}>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">All articles</h2>
              <BlogListWithSearch posts={postsWithCategorySlug} categories={categories} readTimes={readTimes} />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
