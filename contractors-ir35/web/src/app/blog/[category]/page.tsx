import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { siteContainerLg, sectionYLoose } from "@/components/ui/layout-utils";
import {
  getAllPosts,
  getAllCategories,
  calculateReadTime,
  getCategorySlug,
  slugifyCategory,
} from "@/lib/blog";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { BlogListWithSearch } from "@/components/blog/BlogListWithSearch";
import { siteConfig } from "@/config/site";

type Props = { params: Promise<{ category: string }> };

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const categories = getAllCategories();
  const cat = categories.find((c) => c.slug === category);
  if (!cat) return {};

  const title = `${cat.name} | Contractor Tax Guides`;
  const description = `Practical guides on ${cat.name.toLowerCase()} for UK contractors. IR35, limited company tax and off-payroll rules explained by specialist accountants.`;
  const url = `${siteConfig.url}/blog/${category}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function BlogCategoryPage({ params }: Props) {
  const { category } = await params;
  const categories = getAllCategories();
  const cat = categories.find((c) => c.slug === category);
  if (!cat) notFound();

  const allPosts = getAllPosts();
  const categoryPosts = allPosts
    .filter((p) => slugifyCategory(p.category) === category)
    .map((p) => ({ ...p, categorySlug: getCategorySlug(p) }));

  const readTimes = new Map(
    categoryPosts.map((p) => [p.slug, calculateReadTime(p.contentHtml)])
  );

  return (
    <>
      <section className="border-b border-neutral-200 bg-neutral-900 py-14 sm:py-18">
        <div className={siteContainerLg}>
          <Breadcrumb
            variant="light"
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: cat.name },
            ]}
          />
          <p className="mt-6 text-xs font-bold uppercase tracking-wider text-teal-400">
            {cat.count} article{cat.count !== 1 ? "s" : ""}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {cat.name}
          </h1>
          <p className="mt-4 text-base text-neutral-300">
            Practical guides on {cat.name.toLowerCase()} for UK contractors and PSC directors.
          </p>
        </div>
      </section>

      <section className={`bg-white ${sectionYLoose}`}>
        <div className={siteContainerLg}>
          <BlogListWithSearch
            posts={categoryPosts}
            categories={categories}
            readTimes={readTimes}
            activeCategory={category}
          />

          <div className="mt-12 text-sm text-neutral-500">
            <Link href="/blog" className="text-teal-700 hover:underline">
              Back to all articles
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
