import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostByCategoryAndSlug, getCategorySlug, calculateReadTime } from "@/lib/blog";
import { siteConfig } from "@/config/site";
import { buildArticleJsonLd, buildFaqJsonLd, buildHowToJsonLd } from "@/lib/schema";

type Props = { params: Promise<{ category: string; slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ category: getCategorySlug(p), slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const post = getPostByCategoryAndSlug(category, slug);
  if (!post) return {};
  return {
    title: { absolute: post.metaTitle },
    description: post.metaDescription,
    alternates: { canonical: post.canonical || `${siteConfig.url}/blog/${category}/${slug}` },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { category, slug } = await params;
  const post = getPostByCategoryAndSlug(category, slug);
  if (!post) notFound();
  const readTime = calculateReadTime(post.contentHtml);
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buildArticleJsonLd({ title: post.title, description: post.metaDescription, url: `/blog/${category}/${slug}`, dateModified: post.updatedDate || post.date }) }} />
      {post.faqs && post.faqs.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(post.faqs) }} />}
      {post.howToSteps && post.howToSteps.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildHowToJsonLd(post)) }} />}
      <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
        <Link href="/blog" className="hover:underline">Blog</Link> / <Link href={`/blog/${category}`} className="hover:underline">{post.category}</Link>
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">{post.h1 || post.title}</h1>
      <p className="mt-3 text-sm text-neutral-500">{post.date} &middot; {readTime} min read{post.author ? ` &middot; ${post.author}` : ""}</p>
      <div className="prose prose-neutral mt-10 max-w-none" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      {post.faqs && post.faqs.length > 0 && (
        <div className="mt-12 border-t border-neutral-200 pt-8">
          <h2 className="text-xl font-bold text-neutral-900">Frequently asked questions</h2>
          <div className="mt-6 space-y-4">
            {post.faqs.map((faq) => (
              <details key={faq.question} className="group border border-neutral-200">
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-4 py-4 font-semibold text-neutral-900 hover:text-[#c9861b] list-none">
                  <span>{faq.question}</span>
                  <span className="text-[#c9861b] transition-transform group-open:rotate-45" aria-hidden>
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" /></svg>
                  </span>
                </summary>
                <div className="px-4 pb-4 text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3" dangerouslySetInnerHTML={{ __html: faq.answer }} />
              </details>
            ))}
          </div>
        </div>
      )}
      <div className="mt-12 border-t border-neutral-200 pt-8">
        <p className="font-semibold text-neutral-900">Need help with your online selling taxes?</p>
        <p className="mt-2 text-sm text-neutral-600">Tell us about your store or marketplace accounts and we will come back within 24 hours.</p>
        <Link href="/contact" className="mt-4 inline-flex min-h-10 items-center justify-center bg-[#c9861b] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#b5761a] transition-colors">Get in touch</Link>
      </div>
    </main>
  );
}
