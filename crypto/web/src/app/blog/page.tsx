import type { Metadata } from "next";
import Link from "next/link";
import { HubArticleList } from "@accounting-network/web-shared/design/blog/HubArticleList";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { getAllPosts, getAllCategories, calculateReadTime, getCategorySlug } from "@/lib/blog";
import { siteConfig } from "@/config/site";
import { focusRing, siteContainerLg } from "@/components/ui/layout-utils";

export const metadata: Metadata = {
  title: "Crypto Tax Blog | UK Cryptoasset Guides",
  description: "Practical guides on crypto CGT, staking and mining income, DeFi, HMRC disclosure and Self Assessment for UK cryptoasset holders.",
  alternates: { canonical: `${siteConfig.url}/blog` },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    // No <main> here: the layout shell owns the single <main id="main">, and a
    // second one nested inside it is a duplicate landmark.
    <div className="py-16 sm:py-20">
      <div className={siteContainerLg}>
        <Breadcrumb siteUrl={siteConfig.url} items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Crypto tax, explained.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
          Practical guides on crypto CGT, staking and mining income, DeFi, HMRC disclosure and Self
          Assessment for UK cryptoasset holders.
        </p>

        {categories.length > 0 && (
          <nav aria-label="Blog categories" className="mt-8 flex flex-wrap gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/blog/${cat.slug}`}
                // Kit card recipe: ring-1, not border.
                className={`rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-200/70 transition-colors hover:text-primary-700 hover:ring-primary-600 ${focusRing}`}
              >
                {cat.name} ({cat.count})
              </Link>
            ))}
          </nav>
        )}

        <div className="mt-10">
          {posts.length > 0 ? (
            // Every card stays in the server HTML; the off-page ones carry the
            // `hidden` attribute rather than being sliced away, so all 19
            // article links are crawlable on first render.
            <HubArticleList
              categorySlug=""
              posts={posts.map((post) => ({
                slug: post.slug,
                title: post.title,
                summary: post.summary || post.metaDescription,
                readTime: calculateReadTime(post.contentHtml),
                date: post.date,
                categorySlug: getCategorySlug(post),
              }))}
            />
          ) : (
            <p className="text-sm text-slate-600">No posts yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
