import Link from "next/link";
import { CalendarDays, Clock, History, UserRound } from "lucide-react";
import type { BlogPost } from "@/types/blog";
import { LeadForm } from "@/components/forms/LeadForm";
import { buildBlogPostingJsonLd } from "@/lib/schema";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { niche } from "@/config/niche-loader";
import { getActiveCta, isPackagesMode } from "@accounting-network/web-shared/lib/niche-config";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { TableOfContents } from "@accounting-network/web-shared/design/blog/TableOfContents";
import { ReadingProgress } from "@accounting-network/web-shared/design/blog/ReadingProgress";
import { BlogSidebarCta } from "@accounting-network/web-shared/design/blog/BlogSidebarCta";
import { RelatedArticles } from "@accounting-network/web-shared/design/blog/RelatedArticles";
import { SolicitorsBackdrop } from "@/components/layout/SolicitorsBackdrop";
import { BLOG_CATEGORY_COPY, type BlogCategoryCopy } from "@/lib/blog-category-copy";
import { extractHeadings } from "@/lib/markdown-utils";
import { calculateReadTime } from "@/lib/blog";
import { InlineMiniLeadForm } from "@/components/blog/InlineMiniLeadForm";
import { NextStepOffer } from "@/components/intent/NextStepOffer";
import { PremiumUpgrade } from "@/components/tools/premium/PremiumUpgrade";
import { topicForBlogSlug } from "@/lib/intent/taxonomy";
import { hasEnabledResource } from "@/lib/resources/registry";
import { ResourceGate } from "@/components/resources/ResourceGate";
import { hasPremiumTool } from "@/lib/tools/premium/registry";
import { resourceForTopic } from "@/lib/tools/premium/resources";
import { splitContentEarly, splitRemainderForGate, splitContentAtMidScroll } from "@accounting-network/web-shared/content/blog-splits";

type RelatedItem = {
  slug: string;
  title: string;
  summary: string;
  categorySlug: string;
  category?: string;
};

type BlogPostRendererProps = {
  post: BlogPost;
  categorySlug: string;
  related?: RelatedItem[];
};

/** The site's button ground is the live brand hex, not the primary-600 ramp
 *  step the kit card defaults to (DESIGN_DELTA owner decision 1). Without this
 *  the sidebar card would show a second, visibly different red. */
const SIDEBAR_BUTTON =
  "bg-[var(--btn-ground)] text-white hover:bg-[var(--btn-ground-hover)] active:bg-[var(--btn-ground-active)]";

const metaPill =
  "inline-flex min-h-7 items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200";

function formatUkDate(isoDate: string): string {
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

/**
 * Every `<aside>` in the body gets an anchor to the one enquiry form. The
 * asides are where the article says "this is the bit that costs firms money",
 * which is the moment the ask is worth making.
 */
function decorateAsides(html: string): string {
  return html.replace(
    /<aside>([\s\S]*?)<\/aside>/g,
    (_m, inner) =>
      `<aside>${inner}<p class="aside-cta-row"><a class="aside-cta" href="#enquiry-form">Talk to a specialist →</a></p></aside>`,
  );
}

export function BlogPostRenderer({ post, categorySlug, related = [] }: BlogPostRendererProps) {
  const headings = extractHeadings(post.contentHtml);
  const readTime = calculateReadTime(post.contentHtml);
  const jsonLd =
    post.schema?.trim() ||
    buildBlogPostingJsonLd(post, `/blog/${categorySlug}/${post.slug}`);

  const decoratedHtml = decorateAsides(post.contentHtml);

  const takeaways =
    post.keyTakeaways && post.keyTakeaways.length > 0 ? post.keyTakeaways : null;
  const credit = post.imageCredit;

  // 3-moment capture architecture (mirrors Property/web BlogPostRenderer):
  //   Moment 1 (early): premium tool island after first h2 (~20-25% in)
  //   Moment 2 (mid):   qualified lead-capture form at a later heading split
  //   Moment 3 (fallback): InlineMiniLeadForm at mid-scroll when no tool/gate
  const blogTopic = topicForBlogSlug(categorySlug);
  const hasPremium = blogTopic ? hasPremiumTool(resourceForTopic(blogTopic)?.toolId ?? "") : false;
  const hasGate = hasEnabledResource(blogTopic);
  const showPremiumIslands = hasPremium || hasGate;

  const earlySplit = showPremiumIslands ? splitContentEarly(decoratedHtml) : null;
  const gateSplit =
    earlySplit && hasGate ? splitRemainderForGate(earlySplit.after) : null;
  const fallbackSplit = showPremiumIslands ? null : splitContentAtMidScroll(decoratedHtml);

  // Packages mode bypasses the per-category consultation copy for one
  // pricing-led CTA from the active variant. Leadgen (the live variant) keeps
  // the category map. Preserved exactly as Property has it; no config changes.
  const activeCta = getActiveCta(niche);
  const variantCopy: BlogCategoryCopy = {
    heading: activeCta.blog.cta_heading,
    body: activeCta.blog.cta_body,
    button: activeCta.blog.cta_button,
  };
  const ctaCopy: BlogCategoryCopy = isPackagesMode(niche)
    ? variantCopy
    : (BLOG_CATEGORY_COPY[categorySlug] ?? variantCopy);

  const hasUpdate = !!(post.updatedDate && post.updatedDate !== post.date);

  return (
    <>
      <ReadingProgress />
      <article className="bg-white py-12 sm:py-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />

        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto lg:max-w-7xl lg:grid lg:grid-cols-[1fr_250px] lg:gap-12">
            <div className="max-w-4xl">
              <Breadcrumb
                items={[
                  { label: "Home", href: "/" },
                  { label: "Blog", href: "/blog" },
                  { label: post.category, href: `/blog/${categorySlug}` },
                  { label: post.title },
                ]}
              />

              <header className="rounded-xl bg-slate-50 p-8 mt-6">
                <Eyebrow>{post.category}</Eyebrow>
                <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
                  {post.h1}
                </h1>
                {/* Meta as icon pills rather than a dot-separated run: each fact
                    reads at a glance, and "Updated" takes the brand tint because
                    recency is the one that earns trust on tax content. */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {post.date ? (
                    <span className={metaPill}>
                      <CalendarDays aria-hidden className="h-3.5 w-3.5 text-rose-700" />
                      {hasUpdate ? (
                        <>
                          Published <time dateTime={post.date}>{formatUkDate(post.date)}</time>
                        </>
                      ) : (
                        <time dateTime={post.date}>{formatUkDate(post.date)}</time>
                      )}
                    </span>
                  ) : null}
                  {hasUpdate ? (
                    <span className="inline-flex min-h-7 items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 ring-1 ring-rose-100">
                      <History aria-hidden className="h-3.5 w-3.5" />
                      Updated{" "}
                      <time dateTime={post.updatedDate}>{formatUkDate(post.updatedDate!)}</time>
                    </span>
                  ) : null}
                  {post.author ? (
                    <span className={metaPill}>
                      <UserRound aria-hidden className="h-3.5 w-3.5 text-rose-700" />
                      {post.author}
                    </span>
                  ) : null}
                  {readTime > 0 ? (
                    <span className={metaPill}>
                      <Clock aria-hidden className="h-3.5 w-3.5 text-rose-700" />
                      {readTime} min read
                    </span>
                  ) : null}
                </div>
                {post.summary ? (
                  <p className="mt-5 text-base leading-7 text-slate-600">{post.summary}</p>
                ) : null}
                <div className="mt-6">
                  <a
                    href="#enquiry-form"
                    data-cta="blog_skip_to_form"
                    data-cta-placement="article_header"
                    data-cta-goal="form"
                    className="inline-flex items-center gap-2 py-0.5 text-sm font-semibold text-rose-700 hover:text-rose-800 underline underline-offset-4"
                  >
                    Skip to enquiry form ↓
                  </a>
                </div>
              </header>

              <div className="lg:hidden mt-8">
                <TableOfContents headings={headings} />
              </div>

              {takeaways ? (
                <section
                  className="tldr not-prose mt-8 rounded-xl border-l-4 border-[var(--btn-ground)] bg-slate-50 p-6 ring-1 ring-slate-200/70"
                  aria-label="Key takeaways"
                >
                  <Eyebrow>Key takeaways</Eyebrow>
                  <ul className="space-y-2">
                    {takeaways.map((t, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-800">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--btn-ground)] shrink-0" />
                        <span className="text-base leading-relaxed">{t}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : post.summary ? (
                <section
                  className="tldr not-prose mt-8 rounded-xl border-l-4 border-[var(--btn-ground)] bg-slate-50 p-6 ring-1 ring-slate-200/70"
                  aria-label="Summary"
                >
                  <Eyebrow>TL;DR</Eyebrow>
                  <p className="text-base leading-relaxed text-slate-800">{post.summary}</p>
                </section>
              ) : null}

              {post.image ? (
                <figure className="mt-10">
                  <img
                    src={post.image}
                    alt={post.altText || post.title}
                    className="w-full rounded-xl object-cover ring-1 ring-slate-200/70"
                    width={1200}
                    height={630}
                  />
                  {/* The credit moves here with the image. These are followed
                      outbound links under the licence terms, so they cannot be
                      dropped, and the old slate-400/80 measured 2.56 on white. */}
                  {credit?.photographer ? (
                    <figcaption className="mt-2 text-xs text-slate-500">
                      Photo:{" "}
                      {credit.photographerUrl ? (
                        <a
                          href={credit.photographerUrl}
                          target="_blank"
                          rel="noopener nofollow"
                          className="underline hover:text-slate-700"
                        >
                          {credit.photographer}
                        </a>
                      ) : (
                        credit.photographer
                      )}
                      {credit.source ? (
                        <>
                          {" / "}
                          {credit.sourceUrl ? (
                            <a
                              href={credit.sourceUrl}
                              target="_blank"
                              rel="noopener nofollow"
                              className="underline hover:text-slate-700"
                            >
                              {credit.source}
                            </a>
                          ) : (
                            credit.source
                          )}
                        </>
                      ) : null}
                    </figcaption>
                  ) : null}
                </figure>
              ) : null}

              <div className="article-body prose-blog mt-10">
                {showPremiumIslands && earlySplit ? (
                  <>
                    {/* Moment 1: content up to first h2, then tool island. */}
                    <div dangerouslySetInnerHTML={{ __html: earlySplit.before }} />
                    {hasPremium ? (
                      <PremiumUpgrade topic={blogTopic} placement="blog" category={categorySlug} />
                    ) : null}
                    {gateSplit && gateSplit.after ? (
                      <>
                        {/* Moment 2: more content, then qualified capture form. */}
                        <div dangerouslySetInnerHTML={{ __html: gateSplit.before }} />
                        <ResourceGate
                          topic={blogTopic!}
                          placement="blog"
                          category={categorySlug}
                        />
                        <div dangerouslySetInnerHTML={{ __html: gateSplit.after }} />
                      </>
                    ) : (
                      <>
                        {/* No later break: capture form goes directly under the tool. */}
                        {hasGate && blogTopic ? (
                          <ResourceGate
                            topic={blogTopic}
                            placement="blog"
                            category={categorySlug}
                          />
                        ) : null}
                        <div dangerouslySetInnerHTML={{ __html: earlySplit.after }} />
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {/* Moment 3 fallback: InlineMiniLeadForm at mid-scroll. */}
                    <div dangerouslySetInnerHTML={{ __html: fallbackSplit?.before ?? decoratedHtml }} />
                    {fallbackSplit?.after ? (
                      <>
                        <InlineMiniLeadForm topic={post.category} />
                        <div dangerouslySetInnerHTML={{ __html: fallbackSplit.after }} />
                      </>
                    ) : null}
                  </>
                )}
              </div>

              {/* Personalised and null for most readers. It sits ABOVE the FAQ
                  so it can never stand immediately in front of the enquiry
                  form. Its `next_step` id, placement and goal are untouched. */}
              <NextStepOffer />

              {post.faqs && post.faqs.length > 0 ? (
                <section className="mt-16" aria-labelledby="faq-heading">
                  <h2 id="faq-heading" className="text-3xl font-bold text-slate-900 mb-8">
                    Frequently asked questions
                  </h2>
                  {/* Deliberately a plain <dl>, not the kit FaqSection: several
                      answers carry in-body HTML the kit escapes, and a collapsed
                      accordion keeps closed answers out of the server HTML. One
                      array feeds this and the FAQPage JSON-LD. */}
                  <dl className="space-y-4">
                    {post.faqs.map((faq, i) => (
                      <div key={i} className="rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70">
                        <dt className="text-lg font-bold text-slate-900">{faq.question}</dt>
                        <dd className="mt-3 text-base leading-relaxed text-slate-700">
                          <span dangerouslySetInnerHTML={{ __html: faq.answer }} />
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
              ) : null}

              <section
                id="enquiry-form"
                className="relative mt-16 overflow-hidden rounded-xl bg-slate-900 p-8 sm:p-10 text-white scroll-mt-24"
                aria-labelledby="enquiry-form-heading"
              >
                <SolicitorsBackdrop tone="navy" />
                <div className="relative z-10">
                  <h2 id="enquiry-form-heading" className="text-2xl font-bold text-white sm:text-3xl">
                    {ctaCopy.heading}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-slate-200">{ctaCopy.body}</p>
                  {/* LeadForm labels and consent copy are slate-900 by design,
                      so the form sits on a white card, not on the navy. */}
                  <div className="mt-8 rounded-xl bg-white p-6 sm:p-8">
                    <LeadForm redirectOnSuccess={false} submitLabel={ctaCopy.button} />
                  </div>
                </div>
              </section>

              <aside className="mt-16 rounded-xl bg-slate-50 p-6 sm:p-8 ring-1 ring-slate-200/70">
                <Eyebrow>About the author</Eyebrow>
                <p className="text-lg font-bold text-slate-900">{niche.display_name}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{niche.description}</p>
                <Link
                  href="/about"
                  className="mt-3 inline-block py-0.5 text-sm font-semibold text-rose-700 hover:text-rose-800"
                >
                  Learn more about our team →
                </Link>
              </aside>

              {related.length > 0 ? (
                <section className="mt-16" aria-labelledby="related-heading">
                  <h2 id="related-heading" className="text-2xl font-bold text-slate-900 mb-8">
                    Related articles
                  </h2>
                  <RelatedArticles
                    items={related.map((r) => ({
                      href: `/blog/${r.categorySlug}/${r.slug}`,
                      title: r.title,
                      excerpt: r.summary,
                    }))}
                  />
                </section>
              ) : null}
            </div>

            <aside className="hidden lg:block">
              {/* One sticky container owns the viewport clamp for card + TOC and
                  scrolls internally when the pair is taller than the screen. */}
              <div className="sticky top-24 max-h-[calc(100vh-7rem)] space-y-5 overflow-y-auto">
                <BlogSidebarCta copy={ctaCopy} buttonClassName={SIDEBAR_BUTTON} />
                <TableOfContents headings={headings} />
              </div>
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}
