import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getAllCategories, getCategorySlug, calculateReadTime } from "@/lib/blog";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { HubArticleList } from "@accounting-network/web-shared/design/blog/HubArticleList";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { LeadForm } from "@/components/forms/LeadForm";
import { niche } from "@/config/niche-loader";
import { siteContainerLg, focusRing } from "@/components/ui/layout-utils";

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
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [{ url: "/api/og", width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/api/og"] },
  };
}

// ADOPTION DECLINED: packages/web-shared/design/blog/BlogCategoryHub.tsx.
// That component owns the WHOLE hub page, including intro and bullet copy
// blocks (`heading`, `bullets`) this site does not author. Mounting it would
// mean writing new prose for five routes, which owner ruling 1 forbids. The
// piece of it that is genuinely reusable, the article grid, is
// `HubArticleList`, and that is adopted directly below.
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
    <>
    <div className={`${siteContainerLg} py-16`}>
      <Breadcrumb
        siteUrl={siteConfig.url}
        items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: cat.name }]}
      />
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{cat.name}</h1>

      <div className="mt-10">
        <Eyebrow>The library</Eyebrow>
        {/* postsPerPage is passed EXPLICITLY and is >= the largest category
            (Share Schemes and EMI, 12 posts), so no route paginates today.
            The kit component does not slice: off-page cards keep their <a href>
            in the server HTML and only carry `hidden`, so the measured link
            floors (13/8/7/5/4) hold either way. The explicit value is here so a
            future 13th post in one category is a visible decision rather than a
            silent page 2. */}
        <HubArticleList posts={posts} categorySlug={category} postsPerPage={12} />
      </div>

      {otherTopics.length > 0 ? (
        <div className="mt-16 border-t border-slate-200 pt-10">
          <Eyebrow>Keep exploring</Eyebrow>
          <div className="flex flex-wrap gap-3">
            {otherTopics.map((topic) => (
              <Link
                key={topic.slug}
                href={`/blog/${topic.slug}`}
                className={`inline-flex min-h-12 items-center gap-2 rounded-xl ring-1 ring-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-all hover:ring-primary-600 hover:text-primary-700 hover:shadow-md ${focusRing}`}
              >
                {topic.name}
                <span className="text-xs font-semibold text-slate-500">{topic.count}</span>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
    {/* A.4/A.7: LeadCTAPanel, absent on category routes until now. Same global
        config triple as /blog (no per-category copy exists, `niche.blog.*`
        is the only published set: E5). R5-B2 fix: no `data-cta` on this
        wrapper, same reasoning as /blog's fix. Generalist's `blog_index_book` /
        `blog_index_articles` ids sit on anchor links in a hero block this site
        does not have; the LeadForm inside submits with the site-wide constant
        form id (lead_form) plus source_url, so attribution is by page. */}
    <div>
      <LeadCTAPanel
        title={niche.blog.cta_heading}
        description={niche.blog.cta_body}
        proofPoints={[]}
        form={<LeadForm submitLabel={niche.blog.cta_button} redirectOnSuccess={false} />}
      />
    </div>
    </>
  );
}
