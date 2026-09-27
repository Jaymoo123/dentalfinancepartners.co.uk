import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarDays, Clock } from "lucide-react";
import { HubArticleList } from "@accounting-network/web-shared/design/blog/HubArticleList";
import { TableOfContents } from "@accounting-network/web-shared/design/blog/TableOfContents";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { siteConfig } from "@/config/site";
import { niche } from "@/config/niche-loader";
import { buildOgImageUrl, buildHowToJsonLd, buildFaqJsonLd } from "@/lib/schema";
import { extractHeadings } from "@/lib/markdown-utils";
import { wrapWideTables } from "@/components/blog/wrapWideTables";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { LeadForm } from "@/components/forms/LeadForm";
import { InlineMiniLeadForm } from "@/components/blog/InlineMiniLeadForm";
import {
  getAllPosts,
  getPostByCategoryAndSlug,
  getRelatedPosts,
  getCategorySlug,
  calculateReadTime,
} from "@/lib/blog";

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

const metaPill =
  "inline-flex min-h-7 items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200/70";

export default async function BlogPostPage({ params }: Props) {
  const { category, slug } = await params;
  const post = getPostByCategoryAndSlug(category, slug);
  if (!post) notFound();

  const headings = extractHeadings(post.contentHtml);
  const readTime = calculateReadTime(post.contentHtml);
  const related = getRelatedPosts(post.slug, post.category, 3);
  const bodySplit = splitAtSecondH2(wrapWideTables(post.contentHtml));

  return (
    // No <main> here: the layout shell owns the single <main id="main">.
    <article className="py-12 sm:py-16">
      {post.schema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: post.schema }} />
      )}
      {!post.schema && post.faqs && post.faqs.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(post.faqs) }} />
      )}
      {post.howToSteps && post.howToSteps.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buildHowToJsonLd(post) }} />
      )}

      <div className={siteContainerLg}>
        <div className="mx-auto max-w-3xl lg:max-w-none lg:grid lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12">
          {/* min-w-0 so a wide table's scroll container is bounded by the grid
              track rather than stretching it, which is what puts the page back
              into horizontal scroll. */}
          <div className="min-w-0">
            <Breadcrumb
              siteUrl={siteConfig.url}
              items={[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: post.category, href: `/blog/${category}` },
                { label: post.title },
              ]}
            />

            <header className="rounded-xl bg-slate-50 p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary-700">
                {post.category}
              </p>
              <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                {post.h1}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className={metaPill}>
                  <CalendarDays aria-hidden className="h-3.5 w-3.5 text-primary-600" />
                  <time dateTime={post.updatedDate || post.date}>
                    {new Date(post.updatedDate || post.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                </span>
                <span className={metaPill}>
                  <Clock aria-hidden className="h-3.5 w-3.5 text-primary-600" />
                  {readTime} min read
                </span>
              </div>
              {post.summary ? (
                <p className="mt-5 text-base leading-7 text-slate-600">{post.summary}</p>
              ) : null}
            </header>

            {/* Mobile contents bar. The desktop card is the same component
                mounted in the sidebar below; each renders only the branch for
                its own breakpoint. */}
            <div className="mt-8 lg:hidden">
              <TableOfContents headings={headings} />
            </div>

            {post.keyTakeaways && post.keyTakeaways.length > 0 && (
              <aside className="mt-8 rounded-xl bg-white p-6 ring-1 ring-slate-200/70">
                <h2 className="text-sm font-semibold text-slate-900">Key takeaways</h2>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-6 text-slate-700">
                  {post.keyTakeaways.map((kt) => (
                    <li key={kt}>{kt}</li>
                  ))}
                </ul>
              </aside>
            )}

            {/* scroll-mt-24 = 96px, so a contents link does not park its
                heading under the sticky header the shell now renders. */}
            <div className="prose mt-10 max-w-none [&_h2]:scroll-mt-24 [&_h3]:scroll-mt-24">
              <div dangerouslySetInnerHTML={{ __html: bodySplit.before }} />
              <InlineMiniLeadForm topic={post.category} />
              {bodySplit.after !== null ? (
                <div dangerouslySetInnerHTML={{ __html: bodySplit.after }} />
              ) : null}
            </div>

            {/* Phase-0 FAQ block. Native <details>, deliberately NOT a Radix
                accordion: every answer asserted in the FAQPage JSON-LD above
                must exist in the server HTML, and a closed Radix panel is
                absent from it. Do not swap this for the kit's FaqSection. */}
            {post.faqs && post.faqs.length > 0 && (
              <section className="mt-12" aria-labelledby="faq-heading">
                <h2 id="faq-heading" className="text-2xl font-semibold tracking-tight text-slate-900">
                  Common questions
                </h2>
                <div className="mt-6 space-y-3">
                  {post.faqs.map((faq) => (
                    <details key={faq.question} className="group rounded-xl bg-white ring-1 ring-slate-200/70">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-slate-900">
                        <span>{faq.question}</span>
                        <span className="flex-shrink-0 text-primary-700 transition-transform group-open:rotate-45" aria-hidden>
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" /></svg>
                        </span>
                      </summary>
                      <div
                        className="border-t border-slate-100 px-5 pb-5 pt-4 text-sm leading-relaxed text-slate-600 [&_a]:underline"
                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                      />
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* Blog end-of-article capture (LEADS_250 S2), form_id = lead_form.
                Replaces the text-only CTA that used to sit here. */}
            <section id="enquiry-form" className="mt-12 rounded-xl bg-[#0e1a3a] p-8 text-white">
              <h2 className="text-xl font-semibold">{niche.blog.cta_heading}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-200">{niche.blog.cta_body}</p>
              <div className="mt-6 rounded-xl bg-white p-6 sm:p-8">
                <LeadForm redirectOnSuccess={false} submitLabel={niche.blog.cta_button} />
              </div>
            </section>

            {related.length > 0 && (
              <section className="mt-16" aria-labelledby="related-heading">
                <h2 id="related-heading" className="text-2xl font-semibold tracking-tight text-slate-900">
                  Related articles
                </h2>
                <div className="mt-6">
                  {/* Same card as the index and the hubs. The kit's
                      RelatedArticles is NOT used: its focus indicator lives in
                      globals-standard.css, which this site does not import, so
                      its cards would have invisible keyboard focus here. */}
                  <HubArticleList
                    categorySlug={category}
                    postsPerPage={related.length}
                    posts={related.map((r) => ({
                      slug: r.slug,
                      title: r.title,
                      summary: r.summary || r.metaDescription,
                      readTime: calculateReadTime(r.contentHtml),
                      date: r.date,
                      categorySlug: getCategorySlug(r),
                    }))}
                  />
                </div>
              </section>
            )}
          </div>

          <aside className="hidden lg:block">
            {/* ONE clamp, on the direct child of the tall column. The kit's
                design/blog TableOfContents carries no sticky or max-height of
                its own, so this is the column's only scroll container: nesting
                a second one gives a scroll box inside a shorter scroll box and
                a sticky that sticks to the wrapper instead of the viewport. */}
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
              <TableOfContents headings={headings} />
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
