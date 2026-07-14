import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getAllCategories, calculateReadTime, getCategorySlug } from "@/lib/blog";
import { siteConfig } from "@/config/site";
export const metadata: Metadata = {
  title: "Crypto Tax Blog | UK Cryptoasset Guides",
  description: "Practical guides on crypto CGT, staking and mining income, DeFi, HMRC disclosure and Self Assessment for UK cryptoasset holders.",
  alternates: { canonical: `${siteConfig.url}/blog` },
};
export default function BlogIndexPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">Crypto tax, explained.</h1>
      {categories.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/blog/${cat.slug}`} className="rounded-md border border-neutral-200 px-3 py-1.5 text-sm text-neutral-700 hover:border-neutral-400">{cat.name} ({cat.count})</Link>
          ))}
        </div>
      )}
      <ul className="mt-10 space-y-8">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${getCategorySlug(post)}/${post.slug}`} className="group block">
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">{post.category} &middot; {calculateReadTime(post.contentHtml)} min read</p>
              <h2 className="mt-1 text-xl font-semibold text-neutral-900 group-hover:underline">{post.title}</h2>
              <p className="mt-2 text-sm text-neutral-600">{post.metaDescription}</p>
            </Link>
          </li>
        ))}
        {posts.length === 0 && <li className="text-neutral-400 text-sm">No posts yet.</li>}
      </ul>
    </main>
  );
}
