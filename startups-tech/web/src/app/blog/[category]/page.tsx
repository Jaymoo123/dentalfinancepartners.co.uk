import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getAllCategories, getCategorySlug } from "@/lib/blog";
import { siteConfig } from "@/config/site";

type Props = { params: Promise<{ category: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllCategories().map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = getAllCategories().find((c) => c.slug === category);
  if (!cat) return {};
  const title = `${cat.name} | Startup & Tech Tax Guides`;
  const description = `Practical guides on ${cat.name.toLowerCase()} for UK founders, startups and tech companies.`;
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
    <main className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
        <Link href="/blog" className="hover:underline">Blog</Link> / {cat.name}
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900">{cat.name}</h1>
      <ul className="mt-10 space-y-8">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${category}/${post.slug}`} className="group block">
              <h2 className="text-xl font-semibold text-neutral-900 group-hover:underline">
                {post.title}
              </h2>
              <p className="mt-2 text-sm text-neutral-600">{post.metaDescription}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
