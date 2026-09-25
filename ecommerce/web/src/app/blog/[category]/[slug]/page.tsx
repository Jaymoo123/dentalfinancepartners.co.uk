import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostByCategoryAndSlug, getCategorySlug, calculateReadTime, getRelatedPosts } from "@/lib/blog";
import { extractHeadings } from "@/lib/markdown-utils";
import { ReadingProgress } from "@accounting-network/web-shared/design/blog/ReadingProgress";
import { TableOfContents } from "@accounting-network/web-shared/design/blog/TableOfContents";
import { RelatedArticles } from "@accounting-network/web-shared/design/blog/RelatedArticles";
import { siteConfig } from "@/config/site";
import { btnPrimary } from "@/components/ui/layout-utils";
import { buildArticleJsonLd, buildHowToJsonLd } from "@/lib/schema";

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
  const headings = extractHeadings(post.contentHtml);
  const related = getRelatedPosts(post.slug, post.category, 3).map((p) => ({
    href: `/blog/${getCategorySlug(p)}/${p.slug}`,
    title: p.title,
    excerpt: p.summary || undefined,
  }));
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:grid lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-12 lg:items-start">
      <ReadingProgress />
      <div className="max-w-3xl lg:order-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buildArticleJsonLd({ title: post.title, description: post.metaDescription, url: `/blog/${category}/${slug}`, dateModified: post.updatedDate || post.date }) }} />
      {post.faqs && post.faqs.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer.replace(/<[^>]+>/g, "") },
        })),
      }) }} />}
      {post.howToSteps && post.howToSteps.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildHowToJsonLd(post)) }} />}
      <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
        <Link href="/blog" className="hover:underline">Blog</Link> / <Link href={`/blog/${category}`} className="hover:underline">{post.category}</Link>
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">{post.h1 || post.title}</h1>
      <p className="mt-3 text-sm text-neutral-500">{post.date} &middot; {readTime} min read{post.author ? ` &middot; ${post.author}` : ""}</p>
      {headings.length >= 3 && (
        <div className="mt-8 lg:hidden">
          <TableOfContents headings={headings} />
        </div>
      )}
      <div className="prose prose-neutral mt-10 max-w-none" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      {/* ADOPTION DECLINED: packages/web-shared/design/primitives/FaqSection.tsx.
          That component is a Radix accordion with no `forceMount`, so closed answers
          are absent from the server HTML. This page emits FAQPage JSON-LD above that
          asserts every answer, and P0B_RENDERED_SWEEP.md verified 179 of 179 answers
          present in the rendered HTML. Swapping in the accordion would make the
          schema assert text the page does not ship, which is the defect a sibling
          site had to unwind. Native <details> keeps every answer server-rendered and
          still collapses. Revisit only if the kit gains forceMount. */}
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
      {related.length > 0 && (
        <div className="mt-12 border-t border-neutral-200 pt-8">
          <h2 className="text-xl font-bold text-neutral-900">Related reading</h2>
          {/* Excerpt is the authored frontmatter summary. The kit prefers a
              firstSentence() excerpt, but this site has no such helper and adding
              one is a lib change outside this file's lease. */}
          <RelatedArticles items={related} className="mt-6" />
        </div>
      )}
      {/* DEFERRED, not declined: packages/web-shared/design/blog/BlogSidebarCta.tsx.
          It adds a new CTA placement and new authored copy, both owner-visible, and
          this site's data-cta series was created by phase 1 with no history. */}
      <div className="mt-12 border-t border-neutral-200 pt-8">
        <p className="font-semibold text-neutral-900">Need help with your online selling taxes?</p>
        <p className="mt-2 text-sm text-neutral-600">Tell us about your store or marketplace accounts and we will come back within 24 hours.</p>
        <Link href="/contact" className={`${btnPrimary} mt-4`}>Get in touch</Link>
      </div>
      </div>
      {headings.length >= 3 && (
        /* ONE scroll container, and it is this wrapper, not the component.
           packages/web-shared/design/blog/TableOfContents.tsx deliberately has NO
           `stickyDesktop` prop (that prop belongs to the OTHER copy,
           packages/web-shared/content/TableOfContents.tsx): this family expects the
           host to own `sticky` + the viewport clamp, so both live here and nowhere
           inside the component. Patching one copy means patching the other. */
        <aside className="hidden lg:block lg:order-2 lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
          <TableOfContents headings={headings} />
        </aside>
      )}
    </div>
  );
}
