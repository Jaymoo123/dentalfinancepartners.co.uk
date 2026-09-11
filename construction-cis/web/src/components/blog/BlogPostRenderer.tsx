import Link from "next/link";
import { CalendarDays, Clock, History, UserRound } from "lucide-react";
import type { BlogPost } from "@/types/blog";
import { LeadForm } from "@/components/forms/LeadForm";
import { buildBlogPostingJsonLd, buildFaqJsonLd } from "@/lib/schema";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { niche } from "@/config/niche-loader";
import { TableOfContents } from "@accounting-network/web-shared/design/blog/TableOfContents";
import { RelatedArticles } from "@accounting-network/web-shared/design/blog/RelatedArticles";
import { BlogSidebarCta } from "@accounting-network/web-shared/design/blog/BlogSidebarCta";
import { ReadingProgress } from "@accounting-network/web-shared/design/blog/ReadingProgress";
import { NextStepOffer } from "@/components/intent/NextStepOffer";
import { extractHeadings } from "@/lib/markdown-utils";
import { calculateReadTime } from "@/lib/blog";
import { ctaForCategory } from "@/lib/blog-cta-map";
import { InlineMiniLeadForm } from "@/components/blog/InlineMiniLeadForm";
import { ToolIsland } from "@/components/blog/ToolIsland";
import { topicForBlogSlug, earlyToolForBlogSlug } from "@/lib/intent/taxonomy";
import { PremiumUpgrade } from "@/components/calculators/premium/PremiumUpgrade";
import { getGenericTool } from "@/lib/calculators/registry";
import {
  splitContentEarly,
  splitRemainderForGate,
  splitContentAtMidScroll,
} from "@accounting-network/web-shared/content/blog-splits";

type BlogPostRendererProps = {
  post: BlogPost;
  categorySlug: string;
  related?: { slug: string; title: string; summary: string; category: string; categorySlug: string }[];
};

/** Meta fact pill. One recipe, so the four facts in the header card match. */
const metaPill =
  "inline-flex min-h-7 items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-neutral-700 ring-1 ring-neutral-200";

function formatUkDate(isoDate: string): string {
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export function BlogPostRenderer({ post, categorySlug, related = [] }: BlogPostRendererProps) {
  const headings = extractHeadings(post.contentHtml);
  const readTime = calculateReadTime(post.contentHtml);
  const jsonLd =
    post.schema?.trim() ||
    buildBlogPostingJsonLd(post, `/blog/${categorySlug}/${post.slug}`);
  const faqJsonLd =
    post.faqs && post.faqs.length > 0 ? buildFaqJsonLd(post.faqs) : null;

  const takeaways =
    post.keyTakeaways && post.keyTakeaways.length > 0 ? post.keyTakeaways : null;
  const showUpdated = Boolean(post.updatedDate && post.updatedDate !== post.date);
  const verified = post.sourcesVerifiedAt ? formatUkDate(post.sourcesVerifiedAt) : "";

  // Per-category ask. The same entry feeds #enquiry-form and the sidebar card
  // that jumps to it, so the two cannot say different things.
  const ctaCopy = ctaForCategory(categorySlug);

  // 3-moment capture architecture:
  //   Moment 1 (early): free tool island after the first h2 (EARLY_TOOL_BY_CATEGORY)
  //   Moment 2 (mid):   InlineMiniLeadForm (qualified free-review form) + PremiumUpgrade
  //                     at a later heading (~50% of remaining content)
  //   Moment 3 (fallback): InlineMiniLeadForm at mid-scroll for unmapped categories
  const premiumTopic = topicForBlogSlug(categorySlug);
  const earlyToolSlug = earlyToolForBlogSlug(categorySlug);
  const earlyTool = earlyToolSlug ? getGenericTool(earlyToolSlug) : undefined;
  const earlySplit = earlyTool ? splitContentEarly(post.contentHtml) : null;
  const gateSplit = earlySplit ? splitRemainderForGate(earlySplit.after) : null;
  // ponytail: fallbackSplit only computed when there is no early tool — avoids
  // scanning the HTML twice on mapped categories.
  const fallbackSplit = earlySplit ? null : splitContentAtMidScroll(post.contentHtml);

  return (
    <>
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: faqJsonLd }}
        />
      ) : null}

      <article className="bg-white py-12 sm:py-16">
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

              {/* §F.3 header card. Replaces a 420-520px blurred photo hero that
                  pushed the h1, the summary and every route out of the first
                  viewport and carried no route to the form. post.image now
                  renders in-body, below. */}
              <header className="mt-6 rounded-xl bg-neutral-50 p-6 sm:p-8">
                <p className="eyebrow">{post.category}</p>
                <h1 className="mt-3 text-3xl font-bold leading-tight text-neutral-900 sm:text-4xl md:text-5xl">
                  {post.h1}
                </h1>
                {/* Meta as icon pills rather than a dot-separated run: each fact
                    reads at a glance, and "Updated" is tinted because recency is
                    the one that earns trust on tax content. Icons sit on
                    --accent-strong (5.18), never --accent (2.80). */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {post.date ? (
                    <span className={metaPill}>
                      <CalendarDays aria-hidden className="h-3.5 w-3.5 text-[var(--accent-strong)]" />
                      {showUpdated ? (
                        <>
                          Published <time dateTime={post.date}>{formatUkDate(post.date)}</time>
                        </>
                      ) : (
                        <time dateTime={post.date}>{formatUkDate(post.date)}</time>
                      )}
                    </span>
                  ) : null}
                  {showUpdated ? (
                    <span className="inline-flex min-h-7 items-center gap-1.5 rounded-full bg-[var(--accent-whisper)] px-3 py-1 text-xs font-semibold text-[var(--accent-strong)] ring-1 ring-orange-100">
                      <History aria-hidden className="h-3.5 w-3.5" />
                      Updated <time dateTime={post.updatedDate}>{formatUkDate(post.updatedDate!)}</time>
                    </span>
                  ) : null}
                  {post.author ? (
                    <span className={metaPill}>
                      <UserRound aria-hidden className="h-3.5 w-3.5 text-[var(--accent-strong)]" />
                      {post.author}
                    </span>
                  ) : null}
                  {readTime > 0 ? (
                    <span className={metaPill}>
                      <Clock aria-hidden className="h-3.5 w-3.5 text-[var(--accent-strong)]" />
                      {readTime} min read
                    </span>
                  ) : null}
                </div>
                {post.summary ? (
                  <p className="mt-5 text-base leading-7 text-neutral-600">{post.summary}</p>
                ) : null}
                {/* §D.3: the only in-page route to the ask above the fold. The
                    target carries scroll-mt-24, so the heading is not hidden
                    under the sticky header on arrival. */}
                <div className="mt-6">
                  <a
                    href="#enquiry-form"
                    className="inline-flex items-center gap-2 py-0.5 text-sm font-semibold text-[var(--accent-strong)] underline underline-offset-4 hover:text-[var(--btn-ground-hover)]"
                  >
                    Skip to enquiry form ↓
                  </a>
                </div>
              </header>

              {verified ? (
                <p className="mt-6 flex items-start gap-2 text-xs text-neutral-500">
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-strong)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>
                    Figures checked against primary sources (HMRC, legislation.gov.uk, HMRC CIS guidance) in {verified}.
                  </span>
                </p>
              ) : null}

              {takeaways ? (
                <section
                  className="not-prose mt-8 rounded-xl border-l-4 border-[var(--accent)] bg-[var(--accent-whisper)] p-6"
                  aria-label="Key takeaways"
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent-strong)]">
                    Key takeaways
                  </p>
                  <ul className="mt-3 space-y-2">
                    {takeaways.map((t, i) => (
                      <li key={i} className="flex items-start gap-2 text-neutral-700">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                        <span className="text-base leading-relaxed">{t}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {/* The kit TOC paints its ACTIVE link `text-[var(--primary)]`, and
                  this site maps --primary to --accent (#f97316): 2.68 on the card
                  ground, a DESIGN_DELTA §1 violation (--accent never carries
                  meaning-bearing text) on all 82 articles. The kit is shared by 4
                  sites so it is not edited; --primary is a CSS custom property, so
                  redefining it on the wrapper fixes it for this consumer only.
                  --accent-strong is 4.96 there. Inactive links read --muted
                  (--ink-soft #525252) and already pass. */}
              <div className="lg:hidden mt-8" style={{ "--primary": "var(--accent-strong)" } as Record<string, string>}>
                <TableOfContents headings={headings} />
              </div>

              {post.image ? (
                <figure className="mt-10">
                  {/* Plain <img>: the source is an off-domain hotlink, so
                      next/image buys nothing here and the old hero's `priority`
                      was making a decorative photo the LCP candidate. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.image}
                    alt={post.altText || post.title}
                    className="w-full rounded-xl border border-neutral-200 object-cover shadow-sm"
                    width={1200}
                    height={630}
                  />
                  {post.imageCredit?.photographer ? (
                    <figcaption className="mt-2 text-[11px] text-neutral-500">
                      Photo:{" "}
                      {post.imageCredit.photographerUrl ? (
                        <a
                          href={post.imageCredit.photographerUrl}
                          target="_blank"
                          rel="noopener nofollow"
                          className="underline hover:text-neutral-700"
                        >
                          {post.imageCredit.photographer}
                        </a>
                      ) : (
                        post.imageCredit.photographer
                      )}
                      {post.imageCredit.source ? (
                        <>
                          {" / "}
                          {post.imageCredit.sourceUrl ? (
                            <a
                              href={post.imageCredit.sourceUrl}
                              target="_blank"
                              rel="noopener nofollow"
                              className="underline hover:text-neutral-700"
                            >
                              {post.imageCredit.source}
                            </a>
                          ) : (
                            post.imageCredit.source
                          )}
                        </>
                      ) : null}
                    </figcaption>
                  ) : null}
                </figure>
              ) : null}

              <div className="article-body prose-blog mt-10">
                {earlyTool && earlySplit ? (
                  <>
                    {/* Moment 1: content before the first h2, then the free tool island.
                        splitContentEarly guarantees a usable break for every post. */}
                    <div dangerouslySetInnerHTML={{ __html: earlySplit.before }} />
                    <ToolIsland tool={earlyTool} />
                    {gateSplit?.after ? (
                      <>
                        {/* Moment 2: more content, then the qualified free-review form + premium upgrade. */}
                        <div dangerouslySetInnerHTML={{ __html: gateSplit.before }} />
                        <InlineMiniLeadForm topic={post.category} />
                        <PremiumUpgrade topic={premiumTopic} placement="blog" category={categorySlug} />
                        <div dangerouslySetInnerHTML={{ __html: gateSplit.after }} />
                      </>
                    ) : (
                      /* Short remainder (fewer than 2 h2s after the island): form sits directly under the tool. */
                      <>
                        <InlineMiniLeadForm topic={post.category} />
                        <PremiumUpgrade topic={premiumTopic} placement="blog" category={categorySlug} />
                        <div dangerouslySetInnerHTML={{ __html: earlySplit.after }} />
                      </>
                    )}
                  </>
                ) : (
                  /* Moment 3 fallback: unmapped category or no tool found.
                     InlineMiniLeadForm at mid-scroll (60% of h2s), or appended on short posts. */
                  <>
                    <div dangerouslySetInnerHTML={{ __html: fallbackSplit?.before ?? post.contentHtml }} />
                    {fallbackSplit?.after ? (
                      <>
                        <InlineMiniLeadForm topic={post.category} />
                        <PremiumUpgrade topic={premiumTopic} placement="blog" category={categorySlug} />
                        <div dangerouslySetInnerHTML={{ __html: fallbackSplit.after }} />
                      </>
                    ) : (
                      <>
                        <InlineMiniLeadForm topic={post.category} />
                        <PremiumUpgrade topic={premiumTopic} placement="blog" category={categorySlug} />
                      </>
                    )}
                  </>
                )}
              </div>

              {/* §D.3 / §F.3: the ask gets an id, a scroll offset and an
                  accessible name. It had none of the three, which is the
                  42-form-views / 1-start mechanism: nothing on the page could
                  link to it. */}
              <section
                id="enquiry-form"
                className="relative mt-16 overflow-hidden rounded-xl bg-slate-900 p-8 sm:p-10 text-white scroll-mt-24"
                aria-labelledby="enquiry-form-heading"
              >
                <h2 id="enquiry-form-heading" className="text-2xl font-bold text-white sm:text-3xl">
                  {ctaCopy.heading}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-200">
                  {ctaCopy.body}
                </p>
                {/* White card: LeadForm's labels are ink, and bare on navy they
                    rendered ink-on-navy. Same posture as LeadCTAPanel. */}
                <div className="mt-8 rounded-xl bg-white p-6 sm:p-8">
                  <LeadForm redirectOnSuccess={false} submitLabel={ctaCopy.button} />
                </div>
              </section>

              {post.faqs && post.faqs.length > 0 ? (
                <section className="mt-16" aria-labelledby="faq-heading">
                  <h2 id="faq-heading" className="text-3xl font-bold text-neutral-900 mb-8">
                    Frequently asked questions
                  </h2>
                  {/* Plain <dl>, deliberately NOT an accordion and NOT the kit
                      FaqSection. Both leave closed answers out of the server
                      HTML, and this site renders 677 answers across 82 posts on
                      its highest-traffic route family. The kit component also
                      escapes HTML, and one post carries real markup in an
                      answer. The FAQPage JSON-LD above is built from this same
                      post.faqs array, so the two cannot drift. */}
                  <dl className="space-y-4">
                    {post.faqs.map((faq, i) => (
                      <div key={i} className="rounded-xl border-l-4 border-[var(--accent)] bg-neutral-50 p-6">
                        <dt className="text-lg font-bold text-neutral-900">{faq.question}</dt>
                        <dd
                          className="mt-3 text-base text-neutral-600 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: faq.answer }}
                        />
                      </div>
                    ))}
                  </dl>
                </section>
              ) : null}

              <aside className="mt-16 flex gap-5 items-start bg-neutral-50 border border-neutral-200 p-6 sm:p-8 rounded-xl">
                <div className="hidden sm:flex shrink-0 w-14 h-14 rounded-full bg-[var(--accent-whisper)] text-[var(--accent-strong)] items-center justify-center">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-[var(--accent-strong)]">About the author</p>
                  <p className="mt-1 text-lg font-bold text-neutral-900">{niche.display_name}</p>
                  <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{niche.description}</p>
                  <Link href="/about" className="mt-3 inline-block text-sm font-semibold text-[var(--accent-strong)] hover:text-[var(--btn-ground-hover)]">
                    Learn more about our team
                  </Link>
                </div>
              </aside>

              {/* Kept deliberately (TRAP 22): this renders next_step|null|null on
                  109 routes and next_step|null|form on 18, two of the five
                  locked CTA triples. Retiring it would split live funnel
                  history. Owner gate 1. */}
              <NextStepOffer />

              {related.length > 0 ? (
                <section className="mt-16" aria-labelledby="related-heading">
                  <h2 id="related-heading" className="text-2xl font-bold text-neutral-900 mb-8">
                    Related articles
                  </h2>
                  {/* The site's one article-card grid. The 3 items are the same
                      three [slug]/page.tsx already resolves: on a 20-link-floor
                      article they are 3 of only 5 non-chrome destinations, so
                      this count is load-bearing and must not drop. */}
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
              {/* One sticky container for card + TOC. It owns the viewport clamp
                  and scrolls internally when the pair is taller than the screen;
                  the kit TableOfContents carries no sticky of its own. */}
              <div className="sticky top-24 max-h-[calc(100vh-7rem)] space-y-5 overflow-y-auto">
                {/* buttonClassName is passed because the kit default is the
                    primary-600 ramp step: a white label on it measures 3.60,
                    below the 4.5 text floor. --btn-ground is 5.18 and is what
                    every other button on this site renders. */}
                <BlogSidebarCta
                  copy={{ heading: ctaCopy.heading, body: ctaCopy.body }}
                  buttonClassName="bg-[var(--btn-ground)] text-white hover:bg-[var(--btn-ground-hover)] active:bg-[var(--btn-ground-active)]"
                />
                {/* --primary override: see the mobile TOC above. Scoped to the TOC
                    only, so the CTA card's own ground is untouched. */}
                <div style={{ "--primary": "var(--accent-strong)" } as Record<string, string>}>
                  <TableOfContents headings={headings} />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}
