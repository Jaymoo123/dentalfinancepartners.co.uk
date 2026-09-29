import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { niche } from "@/config/niche-loader";
import {
  buildOgImageUrl,
  buildHowToJsonLd,
  buildFaqJsonLd,
} from "@/lib/schema";
import {
  getAllPosts,
  getPostByCategoryAndSlug,
  getCategorySlug,
  calculateReadTime,
  getRelatedPosts,
} from "@/lib/blog";
import { extractHeadings } from "@/lib/markdown-utils";
import type { BlogPost } from "@/types/blog";
import { LeadForm } from "@/components/forms/LeadForm";
import { InlineMiniLeadForm } from "@/components/blog/InlineMiniLeadForm";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { ReadingProgress } from "@accounting-network/web-shared/design/blog/ReadingProgress";
import { TableOfContents } from "@accounting-network/web-shared/design/blog/TableOfContents";
import { RelatedArticles } from "@accounting-network/web-shared/design/blog/RelatedArticles";
import { BlogSidebarCta } from "@accounting-network/web-shared/design/blog/BlogSidebarCta";
import { focusRing } from "@/components/ui/layout-utils";

type Props = { params: Promise<{ category: string; slug: string }> };

/**
 * Focus ring for links inside AUTHORED HTML (the post body and the FAQ
 * answers). Those anchors come out of `dangerouslySetInnerHTML`, so no
 * className can be put on them; the only reachable handle is a descendant
 * variant on the wrapper. Same width, same offset, same `var(--focus-ring)` as
 * the shared `focusRing`, one variant deeper, so the census grep
 * `outline-\[var\(--focus-ring\)\]` still finds every ring on the site.
 *
 * It lives HERE and not in `src/components/ui/layout-utils.ts` only because
 * that file is fenced for this wave (phase 1 owns it). The sibling site keeps
 * it in layout-utils as `focusRingAuthoredLinks`
 * (`ecommerce/web/src/components/ui/layout-utils.ts:129`) and this copy should
 * be hoisted there in the mop-up package.
 */
const focusRingAuthoredLinks =
  "[&_a]:focus-visible:outline [&_a]:focus-visible:outline-2 [&_a]:focus-visible:outline-offset-2 [&_a]:focus-visible:outline-[var(--focus-ring)]";

/**
 * Split body HTML after the second <h2> for the inline mini-form (LEADS_250
 * S2). Same matchAll-and-slice technique as contractors-ir35's
 * packages/web-shared/content/blog-splits.ts, indexed to the second heading
 * instead of a percentage of the remainder. Fewer than two h2s: no split,
 * form renders after the whole body.
 */
/**
 * R3-G1/G2 fix, built HERE rather than in the shared `buildArticleJsonLd`
 * (that file is fenced for this wave, another gap-fixer owns it): headline
 * matches the same field the visible <h1> renders (h1 field, else title, so
 * the two never disagree on the 19-of-32 posts that carry an h1 override);
 * datePublished/dateModified stop collapsing onto one field; author and
 * publisher point at the canonical Organization node instead of a bare name,
 * and no person author is invented.
 */
function buildPostArticleJsonLd(post: BlogPost, category: string) {
  const headline = post.h1 || post.title;
  const orgRef = { "@type": "Organization", "@id": `${siteConfig.url}#organization` };
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description: post.metaDescription,
    url: `${siteConfig.url}/blog/${category}/${post.slug}`,
    datePublished: post.date,
    dateModified: post.updatedDate || post.date,
    author: orgRef,
    publisher: orgRef,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}/blog/${category}/${post.slug}` },
  });
}

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

  const canonical = post.canonical ?? `${siteConfig.url}/blog/${category}/${post.slug}`;
  const ogImage = post.image || buildOgImageUrl(post.h1, post.category);

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: {
      canonical,
      languages: { "en-GB": canonical, "x-default": canonical },
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: canonical,
      type: "article",
      siteName: siteConfig.name,
      publishedTime: post.date,
      modifiedTime: post.updatedDate || post.date,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { category, slug } = await params;
  const post = getPostByCategoryAndSlug(category, slug);
  if (!post) notFound();
  const bodySplit = splitAtSecondH2(post.contentHtml);
  const headings = extractHeadings(post.contentHtml);
  const related = getRelatedPosts(post.slug, post.category, 3).map((p) => ({
    href: `/blog/${getCategorySlug(p)}/${p.slug}`,
    title: p.title,
    excerpt: p.summary || undefined,
  }));

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:grid lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-12 lg:items-start">
      {/* R2 nit: the kit bar is `fixed top-0`, so its top ~4px sit under the
          73px header. Kit exposes no className/top prop to offset it; a 1px
          bar over the header's top edge is accepted as-is (kit-owned). */}
      <ReadingProgress />
      <div className="max-w-3xl lg:order-1">
        {post.schema && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: post.schema }} />
        )}
        {/* No post in `content/blog` carries a `schema:` frontmatter field
            (verified: `grep -c "^schema:" content/blog/*.md` is 0 on all 32),
            so the branch above has never emitted anything and every post
            shipped with no Article markup at all. The builder below covers
            that case and stands down if a post ever authors its own. */}
        {!post.schema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: buildPostArticleJsonLd(post, category),
            }}
          />
        )}
        {/* Answers are authored HTML. The tags are stripped for the JSON-LD so
            the schema asserts the same TEXT the <details> block below renders;
            asserting markup makes the two disagree on a string comparison. */}
        {post.faqs && post.faqs.length > 0 && !post.schema?.includes("FAQPage") && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: buildFaqJsonLd(
                post.faqs.map((faq) => ({
                  question: faq.question,
                  answer: faq.answer.replace(/<[^>]+>/g, ""),
                })),
              ),
            }}
          />
        )}
        {post.howToSteps && post.howToSteps.length > 0 && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buildHowToJsonLd(post) }} />
        )}
        <Breadcrumb
          siteUrl={siteConfig.url}
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.category, href: `/blog/${category}` },
            { label: post.title },
          ]}
        />
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          {post.h1}
        </h1>
        <p className="mt-3 text-sm text-slate-500">
          {new Date(post.updatedDate || post.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}{" "}
          · {calculateReadTime(post.contentHtml)} min read
        </p>
        {/* A.4/U3.2: skip-to-form anchor, absent until now. Label reuses
            `niche.blog.cta_button`, the exact string `LeadForm`'s
            `submitLabel` already renders on the end-of-article form below, so
            nothing is authored. Jumps to that form, given `id="enquiry-form"`
            below so this and `BlogSidebarCta`'s hardcoded `#enquiry-form` land
            on the same target. */}
        <a
          href="#enquiry-form"
          data-cta="blog_skip_to_form"
          data-cta-placement="article_header"
          data-cta-goal="form"
          className={`mt-4 inline-flex min-h-12 items-center text-sm font-semibold text-primary-700 hover:text-primary-800 ${focusRing}`}
        >
          {niche.blog.cta_button}
        </a>
        {post.keyTakeaways && post.keyTakeaways.length > 0 && (
          <aside className={`mt-8 rounded-xl border border-slate-200 bg-[var(--surface)] p-5 ${focusRingAuthoredLinks}`}>
            <h2 className="text-sm font-semibold text-slate-900">Key takeaways</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
              {post.keyTakeaways.map((kt) => (
                <li key={kt} dangerouslySetInnerHTML={{ __html: kt }} />
              ))}
            </ul>
          </aside>
        )}
        {headings.length >= 3 && (
          /* R2 GAP: kit's mobile branch (TableOfContents.tsx:46) hardcodes
             `sticky top-16`; its parent here is only as tall as itself so it
             never pins, and 64px is under this site's 73px header anyway.
             Forced static (important, since it's a same-specificity utility
             override) so it renders with no sticky behaviour to claim. */
          <div className="mt-8 lg:hidden [&_.sticky]:!static [&_.sticky]:!top-auto">
            <TableOfContents headings={headings} />
          </div>
        )}
        <article className={`prose prose-slate mt-10 max-w-none [&_h2]:scroll-mt-24 [&_h3]:scroll-mt-24 ${focusRingAuthoredLinks}`}>
          <div dangerouslySetInnerHTML={{ __html: bodySplit.before }} />
          <InlineMiniLeadForm topic={post.category} />
          {bodySplit.after !== null ? (
            <div dangerouslySetInnerHTML={{ __html: bodySplit.after }} />
          ) : null}
        </article>
        {/* ADOPTION DECLINED: packages/web-shared/design/primitives/FaqSection.tsx.
            It is a Radix accordion with no `forceMount` (:34-43), so a closed
            answer is absent from the server HTML while the FAQPage JSON-LD
            emitted above keeps asserting it. That is the asserted-but-absent
            defect a sibling site had to unwind, and it would be a crawlability
            regression here. Native <details> keeps every answer server-rendered
            and still collapses. Revisit only if the kit gains forceMount.

            The answers themselves are authored frontmatter (`faqs:` on all 32
            posts). Until this edit they were asserted in JSON-LD and rendered
            NOWHERE on the page: 32 pages of schema with no visible source. No
            copy is authored here beyond the section heading. */}
        {post.faqs && post.faqs.length > 0 && (
          <div className="mt-12 border-t border-slate-200 pt-8">
            <h2 className="text-xl font-semibold text-slate-900">Frequently asked questions</h2>
            <div className="mt-6 space-y-4">
              {post.faqs.map((faq) => (
                <details key={faq.question} className="group rounded-xl border border-slate-200">
                  <summary className={`flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-4 py-4 font-semibold text-slate-900 hover:text-primary-700 ${focusRing}`}>
                    <span>{faq.question}</span>
                    <span className="text-primary-600 transition-transform group-open:rotate-45" aria-hidden>
                      <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                      </svg>
                    </span>
                  </summary>
                  <div
                    className={`border-t border-slate-100 px-4 pb-4 pt-3 leading-relaxed text-slate-600 ${focusRingAuthoredLinks}`}
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                </details>
              ))}
            </div>
          </div>
        )}
        {/* Blog end-of-article capture, unchanged in position and in copy: it is
            one of exactly two capture surfaces on this page (the other is the
            InlineMiniLeadForm inside the article above). Owner ruling 5. */}
        <div id="enquiry-form" className="mt-12 scroll-mt-24 rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900">{niche.blog.cta_heading}</h2>
          <p className="mt-2 text-sm text-slate-600">{niche.blog.cta_body}</p>
          <div className="mt-4">
            <LeadForm redirectOnSuccess={false} submitLabel={niche.blog.cta_button} />
          </div>
        </div>
        {related.length > 0 && (
          <div className="mt-12 border-t border-slate-200 pt-8">
            <h2 className="text-xl font-semibold text-slate-900">Related reading</h2>
            {/* Excerpt is the authored frontmatter summary. The kit prefers a
                firstSentence() excerpt and this site has no such helper; adding
                one is a lib change with no consumer other than this line. */}
            <RelatedArticles items={related} className="mt-6" />
          </div>
        )}
      </div>
      {headings.length >= 3 && (
        /* ONE scroll container in this column, and it is this wrapper, not the
           component. packages/web-shared/design/blog/TableOfContents.tsx
           deliberately has NO `stickyDesktop` prop (that prop belongs to the
           OTHER copy, packages/web-shared/content/TableOfContents.tsx): this
           family expects the HOST to own `sticky` plus the viewport clamp, so
           both live here and nowhere inside the component (playbook T32).
           Patching one copy means patching the other. */
        <aside className="hidden lg:order-2 lg:block lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
          <TableOfContents headings={headings} />
          {/* A.4/U3.1: BlogSidebarCta, absent until now, under TableOfContents
              per spec. `copy` is the one global triple already published in
              niche.config.json, the same `heading`/`body` the end-of-article
              `LeadForm` block below already renders, so nothing is authored
              here. `buttonLabel` is `niche.blog.cta_button`, same string a
              third time. The component itself emits
              `data-cta="blog_sidebar_book"` / `data-cta-placement="sidebar"` /
              `data-cta-goal="form"` (`BlogSidebarCta.tsx:56-58`) and points
              its own hardcoded `#enquiry-form` at the id added on the end
              form above. */}
          <div className="mt-6">
            <BlogSidebarCta
              copy={{ heading: niche.blog.cta_heading, body: niche.blog.cta_body }}
              buttonLabel={niche.blog.cta_button}
            />
          </div>
        </aside>
      )}
    </div>
  );
}
