import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getAllCategories, getCategorySlug, calculateReadTime } from "@/lib/blog";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { HubArticleList } from "@accounting-network/web-shared/design/blog/HubArticleList";
import { siteContainerLg, focusRing } from "@accounting-network/web-shared/design/layout-utils";

type Props = { params: Promise<{ category: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllCategories().map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = getAllCategories().find((c) => c.slug === category);
  if (!cat) return {};
  const title = `${cat.name} | Ecommerce Tax Guides`;
  const description = `Practical guides on ${cat.name.toLowerCase()} for UK online sellers.`;
  const url = `${siteConfig.url}/blog/${category}`;
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url, type: "website" } };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = getAllCategories().find((c) => c.slug === category);
  if (!cat) notFound();
  const otherTopics = getAllCategories().filter((c) => c.slug !== category);
  const posts = getAllPosts()
    .filter((p) => getCategorySlug(p) === category)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      summary: p.metaDescription,
      readTime: calculateReadTime(p.contentHtml),
      date: p.date,
    }));

  return (
    <div className="bg-white py-16 sm:py-20">
      <div className={siteContainerLg}>
        <Breadcrumb
          siteUrl={siteConfig.url}
          items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: cat.name }]}
        />
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          {cat.name}
        </h1>

        <div className="mt-10">
          <Eyebrow>The library</Eyebrow>
          {posts.length > 0 ? (
            <HubArticleList posts={posts} categorySlug={category} />
          ) : (
            <p className="rounded-xl ring-1 ring-slate-200/70 bg-white p-8 text-center text-slate-600">
              No articles in this topic yet. Check back shortly.
            </p>
          )}
        </div>

        {otherTopics.length > 0 ? (
          <div className="mt-16 border-t border-slate-200 pt-10">
            <Eyebrow>Keep exploring</Eyebrow>
            <div className="flex flex-wrap gap-3">
              {otherTopics.map((topic) => (
                <Link
                  key={topic.slug}
                  href={`/blog/${topic.slug}`}
                  className={`inline-flex min-h-12 items-center gap-2 rounded-xl ring-1 ring-slate-200/70 bg-white px-5 py-3 text-sm font-bold text-slate-900 shadow-sm transition-all hover:ring-primary-600 hover:text-primary-700 hover:shadow-md sm:text-base ${focusRing}`}
                >
                  {topic.name}
                  <span className="text-xs font-semibold text-slate-500">{topic.count}</span>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
