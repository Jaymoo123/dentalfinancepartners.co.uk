import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostByCategoryAndSlug, getCategorySlug, calculateReadTime, getRelatedPosts } from "@/lib/blog";
import { extractHeadings } from "@/lib/markdown-utils";
import { ReadingProgress } from "@accounting-network/web-shared/design/blog/ReadingProgress";
import { TableOfContents } from "@accounting-network/web-shared/design/blog/TableOfContents";
import { RelatedArticles } from "@accounting-network/web-shared/design/blog/RelatedArticles";
import { BlogSidebarCta } from "@accounting-network/web-shared/design/blog/BlogSidebarCta";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { siteConfig } from "@/config/site";
import { niche } from "@/config/niche-loader";
import { focusRing, focusRingAuthoredLinks } from "@/components/ui/layout-utils";
import { buildArticleJsonLd, buildHowToJsonLd } from "@/lib/schema";
import { LeadForm } from "@/components/forms/LeadForm";
import { InlineMiniLeadForm } from "@/components/blog/InlineMiniLeadForm";

type Props = { params: Promise<{ category: string; slug: string }> };

/**
 * Split body HTML after the second <h2> for the inline mini-form (LEADS_250
 * S2). Same matchAll-and-slice technique as contractors-ir35's
 * packages/web-shared/content/blog-splits.ts, indexed to the second heading
 * instead of a percentage of the remainder. Fewer than two h2s: no split,
 * form renders after the whole body.
 */
function splitAtSecondH2(html: string): { before: string; after: string | null } {
  const headings = [...html.matchAll(/<h2[^>]*>/g)];
  if (headings.length < 2) return { before: html, after: null };
  const cut = headings[1].index!;
  return { before: html.slice(0, cut), after: html.slice(cut) };
}

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
  const bodySplit = splitAtSecondH2(post.contentHtml);
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
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        <Link href="/blog" className="hover:underline">Blog</Link> / <Link href={`/blog/${category}`} className="hover:underline">{post.category}</Link>
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{post.h1 || post.title}</h1>
      <p className="mt-3 text-sm text-slate-500">{post.date} &middot; {readTime} min read{post.author ? ` &middot; ${post.author}` : ""}</p>
      {/* Skip-to-form anchor (U3, owner gate D2 instrumentation). Label reuses
          the existing end-of-article form heading (niche.config.json `blog`
          triple) - no copy authored here. */}
      <a
        href="#enquiry-form"
        data-cta="blog_skip_to_form"
        data-cta-placement="article_header"
        data-cta-goal="form"
        className={`mt-4 inline-flex min-h-11 items-center rounded-md text-sm font-semibold text-primary-700 underline underline-offset-2 hover:text-primary-800 ${focusRing}`}
      >
        {niche.blog.cta_heading}
      </a>
      {headings.length >= 3 && (
        <div className="mt-8 lg:hidden">
          <TableOfContents headings={headings} />
        </div>
      )}
      <div className={`prose prose-neutral mt-10 max-w-none ${focusRingAuthoredLinks}`}>
        <div dangerouslySetInnerHTML={{ __html: bodySplit.before }} />
        <InlineMiniLeadForm topic={post.category} />
        {bodySplit.after !== null ? (
          <div dangerouslySetInnerHTML={{ __html: bodySplit.after }} />
        ) : null}
      </div>
      {/* ADOPTION HELD, pending owner gate D1 (docs/ecommerce/_port/UPLIFT_PACKAGES.md
          section D). The reason this decline was originally written for -
          packages/web-shared/design/primitives/FaqSection.tsx being a Radix
          accordion with no `forceMount`, so closed answers were absent from
          the server HTML - is now STALE: `alwaysRenderAnswers` landed
          2026-09-29 (FaqSection.tsx:19,35,49) and keeps every answer in the
          server HTML whether open or closed. So the schema-mismatch reason no
          longer applies. Native <details> is kept here anyway, on the
          plan's own recommendation, because it works with no JavaScript and
          the kit accordion needs a setting to match that; the site's own
          FAQPage JSON-LD above still asserts every answer, and native
          <details> still keeps them all server-rendered. Revisit only if the
          owner answers D1 the other way. */}
      {post.faqs && post.faqs.length > 0 && (
        <div className="mt-12 border-t border-slate-200 pt-8">
          <h2 className="text-xl font-bold text-slate-900">Frequently asked questions</h2>
          <div className="mt-6 space-y-4">
            {post.faqs.map((faq) => (
              <details key={faq.question} className="group border border-slate-200">
                <summary className={`flex cursor-pointer items-center justify-between gap-4 px-4 py-4 font-semibold text-slate-900 hover:text-[var(--brand-primary-text)] list-none ${focusRing}`}>
                  <span>{faq.question}</span>
                  <span className="text-[var(--brand-primary)] transition-transform group-open:rotate-45" aria-hidden>
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" /></svg>
                  </span>
                </summary>
                <div className={`px-4 pb-4 text-slate-600 leading-relaxed border-t border-slate-100 pt-3 ${focusRingAuthoredLinks}`} dangerouslySetInnerHTML={{ __html: faq.answer }} />
              </details>
            ))}
          </div>
        </div>
      )}
      {/* Blog end-of-article capture (LEADS_250 S2), form_id = lead_form.
          Replaces the text-only CTA that used to sit here after Related
          reading; now sits before it per spec order. id + scroll-mt-24: the
          U3 skip-to-form anchor and BlogSidebarCta's button both jump here. */}
      <div id="enquiry-form" className="mt-12 border-t border-slate-200 pt-8 scroll-mt-24">
        <p className="font-semibold text-slate-900">{niche.blog.cta_heading}</p>
        <p className="mt-2 text-sm text-slate-600">{niche.blog.cta_body}</p>
        <div className="mt-6 rounded-md border border-slate-200 p-6">
          <LeadForm ctaId="blog_post_end_book" ctaPlacement="body" redirectOnSuccess={false} submitLabel={niche.blog.cta_button} />
        </div>
      </div>
      {related.length > 0 && (
        <div className="mt-12 border-t border-slate-200 pt-8">
          <h2 className="text-xl font-bold text-slate-900">Related reading</h2>
          {/* Excerpt is the authored frontmatter summary. The kit prefers a
              firstSentence() excerpt, but this site has no such helper and adding
              one is a lib change outside this file's lease. */}
          <RelatedArticles items={related} className="mt-6" />
        </div>
      )}
      {/* Closing capture (U3, owner gate D3). Same niche.config.json `blog`
          triple already published above and in the sidebar card - the same
          two facts, once more, at the point a reader who scrolled the whole
          article is most likely to convert. eyebrow/formTitle empty and
          proofPoints=[] match the established call-site pattern on this site
          (about, for, services, vat routes). */}
      <div className="mt-12 border-t border-slate-200 pt-8">
        <LeadCTAPanel
          eyebrow=""
          title={niche.blog.cta_heading}
          description={niche.blog.cta_body}
          proofPoints={[]}
          formTitle=""
          contained
          form={<LeadForm ctaId="blog_post_closing_book" submitLabel={niche.blog.cta_button} />}
        />
      </div>
      </div>
      {headings.length >= 3 && (
        /* ONE scroll container, and it is this wrapper, not the component.
           packages/web-shared/design/blog/TableOfContents.tsx deliberately has NO
           `stickyDesktop` prop (that prop belongs to the OTHER copy,
           packages/web-shared/content/TableOfContents.tsx): this family expects the
           host to own `sticky` + the viewport clamp, so both live here and nowhere
           inside the component. Patching one copy means patching the other. */
        /* R5 G7: the `max-h` + `overflow-y-auto` pair used to sit on the
           <aside> itself, so U3's BlogSidebarCta became a capture surface inside
           a nested scroll box and fell below the inner fold on a long article
           (the nested-scroll class from the startups-tech review). The clamp
           moves DOWN onto the table of contents, which is the only thing here
           that can outgrow the viewport; the CTA card now sits in the sticky
           column with no scroller around it. `sticky` + `top-24` stay on the
           aside, unchanged, so the column still follows the reader. */
        <aside className="hidden lg:block lg:order-2 lg:sticky lg:top-24">
          {/* .ground-dark rebinds --kit-focus-ring (and --focus-ring) to the
              on-brand white: BlogSidebarCta's own button reads --kit-focus-ring
              internally and cannot be overridden from the call site
              (globals.css:265-273, focus-ring.test.ts). Without this wrapper
              the button rings at the light-ground value on a bg-slate-900
              card. No light-ground focusable child sits inside this card, so
              the caution against nesting .ground-dark does not apply here. */}
          <div className="ground-dark mb-6">
            <BlogSidebarCta
              copy={{ heading: niche.blog.cta_heading, body: niche.blog.cta_body }}
              buttonLabel={niche.blog.cta_button}
            />
          </div>
          <div className="lg:max-h-[calc(100vh-14rem)] lg:overflow-y-auto">
            <TableOfContents headings={headings} />
          </div>
        </aside>
      )}
    </div>
  );
}
