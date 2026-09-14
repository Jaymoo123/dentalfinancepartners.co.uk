import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HubArticleList } from "@accounting-network/web-shared/design/blog/HubArticleList";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { getAllPosts, getAllCategories, getCategorySlug, calculateReadTime } from "@/lib/blog";
import { siteConfig } from "@/config/site";
import { siteContainerLg } from "@/components/ui/layout-utils";

type Props = { params: Promise<{ category: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllCategories().map((c) => ({ category: c.slug }));
}

function hubDescription(name: string): string {
  return `Practical guides on ${name.toLowerCase()} for UK crypto investors, traders and businesses.`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = getAllCategories().find((c) => c.slug === category);
  if (!cat) return {};
  const title = `${cat.name} | Crypto Tax Guides`;
  const description = hubDescription(cat.name);
  const url = `${siteConfig.url}/blog/${category}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = getAllCategories().find((c) => c.slug === category);
  if (!cat) notFound();

  const posts = getAllPosts().filter((p) => getCategorySlug(p) === category);

  return (
    // The layout shell owns <main id="main">; this route must not nest a second one.
    <div className="py-16 sm:py-20">
      <div className={siteContainerLg}>
        <Breadcrumb
          siteUrl={siteConfig.url}
          items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: cat.name }]}
        />
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{cat.name}</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">{hubDescription(cat.name)}</p>

        {/* HubArticleList card titles are <h3>; this is the missing h2 that
            keeps the outline from skipping a level. See /blog. */}
        <h2 className="sr-only">{cat.name} articles</h2>
        <div className="mt-10">
          <HubArticleList
            categorySlug={category}
            posts={posts.map((post) => ({
              slug: post.slug,
              title: post.title,
              summary: post.summary || post.metaDescription,
              readTime: calculateReadTime(post.contentHtml),
              date: post.date,
            }))}
          />
        </div>
      </div>
    </div>
  );
}
