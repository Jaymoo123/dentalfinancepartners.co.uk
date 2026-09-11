import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/types/blog";
import { BlogSidebarCta } from "@accounting-network/web-shared/design/blog/BlogSidebarCta";
import { RelatedArticles } from "@accounting-network/web-shared/design/blog/RelatedArticles";
import { ctaCopyForCategory } from "@/lib/blog/cta-copy";
import { LeadForm } from "@/components/forms/LeadForm";
import { buildBlogPostingJsonLd } from "@/lib/schema";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { niche } from "@/config/niche-loader";
import { TableOfContents } from "@accounting-network/web-shared/content/TableOfContents";
import { ReadingProgress } from "@accounting-network/web-shared/content/ReadingProgress";
import { extractHeadings } from "@/lib/markdown-utils";
import { calculateReadTime } from "@/lib/blog";
import { InlineMiniLeadForm } from "@/components/blog/InlineMiniLeadForm";
import { NextStepOffer } from "@/components/intent/NextStepOffer";
import { topicForBlogSlug } from "@/lib/intent/taxonomy";
import { PremiumUpgrade } from "@/components/tools/premium/PremiumUpgrade";
import { GateOrForm } from "@/components/resources/GateOrForm";
import { hasEnabledResource } from "@/lib/resources/registry";
import { resourceForTopic } from "@/lib/tools/premium/resources";
import { AssociateIncorporationWorkedExamples } from "@/components/tools/premium/AssociateIncorporationWorkedExamples";
import {
  splitContentEarly,
  splitRemainderForGate,
  splitContentAtMidScroll,
} from "@accounting-network/web-shared/content/blog-splits";
import { getActiveCta } from "@accounting-network/web-shared/lib/niche-config";

const activeCta = getActiveCta(niche);

type BlogPostRendererProps = {
  post: BlogPost;
  categorySlug: string;
  related?: { slug: string; title: string; summary: string; category: string; categorySlug: string }[];
};

function formatUkDate(isoDate: string): string {
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

/**
 * Renders a blog post with a full-bleed hero, 3-moment capture architecture:
 *   1. EARLY: PremiumUpgrade island after first h2 (~20-25% in)
 *   2. GATE: ResourceGate at a second, lower break (~50% in)
 *   3. FALLBACK: InlineMiniLeadForm at mid-scroll for unmapped/compliance topics
 *
 * For topic "associate-incorporation-premium" the SSR AssociateIncorporationWorkedExamples
 * block is rendered immediately after the PremiumUpgrade island.
 *
 * Routing: renderer only. No route changes. FLAT routing untouched.
 */
export function BlogPostRenderer({ post, categorySlug, related = [] }: BlogPostRendererProps) {
  const headings = extractHeadings(post.contentHtml);
  const readTime = calculateReadTime(post.contentHtml);
  const jsonLd =
    post.schema?.trim() ||
    buildBlogPostingJsonLd(post, `/blog/${categorySlug}/${post.slug}`);

  // ONE copy binding for the closing panel, its submit label and the sidebar
  // card, so the card cannot advertise a different ask from the form it jumps
  // to. Falls back to the site-wide niche string for an unmapped slug.
  const ctaCopy = ctaCopyForCategory(categorySlug, {
    heading: activeCta.blog.cta_heading,
    body: activeCta.blog.cta_body,
    button: activeCta.blog.cta_button,
  });

  const takeaways =
    post.keyTakeaways && post.keyTakeaways.length > 0 ? post.keyTakeaways : null;
  const showUpdated = post.updatedDate && post.updatedDate !== post.date;
  const verified = post.sourcesVerifiedAt ? formatUkDate(post.sourcesVerifiedAt) : "";

  // Resolve the premium topic from the category slug (slug-derived, never the
  // human post.category label).
  const premiumTopic = topicForBlogSlug(categorySlug);
  const hasGate = hasEnabledResource(premiumTopic);

  // Which toolId does this topic resolve to? Used to conditionally mount the
  // AssociateIncorporationWorkedExamples SSR block.
  const topicResource = resourceForTopic(premiumTopic);
  const showWorkedExamples = topicResource?.toolId === "associate-incorporation-premium";

  // 3-moment split. When a topic has a premium tool/gate, inject early (after
  // first h2) then gate at the lower break. Otherwise, fall back to the
  // mid-scroll InlineMiniLeadForm (unchanged behaviour for compliance/unmapped).
  const showPremiumIslands = !!premiumTopic;
  const earlySplit = showPremiumIslands ? splitContentEarly(post.contentHtml) : null;
  const gateSplit =
    earlySplit && hasGate ? splitRemainderForGate(earlySplit.after) : null;
  const fallbackSplit = showPremiumIslands ? null : splitContentAtMidScroll(post.contentHtml);

  return (
    <>
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <article className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto lg:max-w-7xl lg:grid lg:grid-cols-[1fr_250px] lg:gap-12">
            <div className="max-w-4xl">
              {/* Header card, replacing the 520px blurred photo hero. The photo
                  moves into the body as a figure below, which is where its
                  Pexels credit goes with it. */}
              <header className="rounded-xl bg-slate-50 p-6 sm:p-8">
                <Breadcrumb
                  items={[
                    { label: "Home", href: "/" },
                    { label: "Blog", href: "/blog" },
                    { label: post.category, href: `/blog/${categorySlug}` },
                    { label: post.title },
                  ]}
                />
                <p className="mt-2 text-xs font-bold uppercase tracking-wider text-primary-700">
                  {post.category}
                </p>
                <h1 className="mt-3 text-3xl font-bold leading-tight text-[var(--ink)] sm:text-4xl">
                  {post.h1}
                </h1>
                <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[var(--ink-soft)]">
                  {readTime > 0 && <span>{readTime} min read</span>}
                  {post.date && (
                    <>
                      {readTime > 0 ? <span aria-hidden>·</span> : null}
                      <time dateTime={post.date}>Published {formatUkDate(post.date)}</time>
                    </>
                  )}
                  {showUpdated && (
                    <>
                      <span aria-hidden>·</span>
                      <time dateTime={post.updatedDate}>Updated {formatUkDate(post.updatedDate!)}</time>
                    </>
                  )}
                </p>
                {/* Same-page jump, not a new surface: 83% of sessions land on an
                    article and the only form that converts is 2,000 words below. */}
                <a
                  href="#enquiry-form"
                  data-cta="blog_skip_to_form"
                  data-cta-placement="article_header"
                  data-cta-goal="form"
                  className="mt-6 inline-flex items-center gap-2 py-0.5 text-sm font-semibold text-primary-700 underline underline-offset-4 hover:text-primary-800"
                >
                  Skip to enquiry form ↓
                </a>
              </header>

              {post.image ? (
                <figure className="mt-10">
                  <Image
                    src={post.image}
                    alt={post.altText || post.title}
                    width={1200}
                    height={630}
                    priority
                    sizes="(min-width: 1024px) 60rem, 100vw"
                    className="w-full rounded-xl border border-[var(--border)] object-cover"
                  />
                  {post.imageCredit?.photographer ? (
                    <figcaption className="mt-2 text-xs text-[var(--muted)]">
                      Photo:{" "}
                      {post.imageCredit.photographerUrl ? (
                        <a
                          href={post.imageCredit.photographerUrl}
                          target="_blank"
                          rel="noopener nofollow"
                          className="underline hover:text-[var(--ink)]"
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
                              className="underline hover:text-[var(--ink)]"
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

              <div className="mt-10 mb-8 pb-8 border-b border-[var(--border)]">
                {post.author ? (
                  <p className="text-sm font-semibold text-[var(--ink)]">{post.author}</p>
                ) : null}
                {verified ? (
                  <p className="mt-2 flex items-start gap-2 text-xs text-[var(--muted)]">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>
                      Figures checked against primary sources (HMRC, legislation.gov.uk, NHS BSA) in {verified}.
                    </span>
                  </p>
                ) : null}
              </div>

              {takeaways ? (
                <section
                  className="not-prose rounded-lg border-l-4 border-[var(--gold)] bg-[var(--surface-elevated)] p-6"
                  aria-label="Key takeaways"
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-primary-700">
                    Key takeaways
                  </p>
                  <ul className="mt-3 space-y-2">
                    {takeaways.map((t, i) => (
                      <li key={i} className="flex items-start gap-2 text-[var(--ink-soft)]">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                        <span className="text-base leading-relaxed">{t}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : post.summary ? (
                <p className="text-lg text-[var(--ink-soft)] leading-relaxed border-l-4 border-[var(--gold)] bg-[var(--surface-elevated)] p-6">
                  {post.summary}
                </p>
              ) : null}

              <div className="lg:hidden mt-8">
                <TableOfContents headings={headings} />
              </div>

              <div className="article-body prose-blog mt-10">
                {showPremiumIslands && earlySplit ? (
                  <>
                    {/* Moment 1: content before the first h2 (~20-25% in). */}
                    <div dangerouslySetInnerHTML={{ __html: earlySplit.before }} />

                    {/* Moment 1: premium tool island (early, lifts dwell). */}
                    <PremiumUpgrade
                      topic={premiumTopic}
                      placement="blog"
                      category={categorySlug}
                    />

                    {/* SSR worked-examples for the associate-incorporation tool,
                        mounted immediately after the interactive island. */}
                    {showWorkedExamples ? <AssociateIncorporationWorkedExamples /> : null}

                    {gateSplit && gateSplit.after ? (
                      <>
                        {/* Content between the tool island and the gate. */}
                        <div dangerouslySetInnerHTML={{ __html: gateSplit.before }} />

                        {/* Moment 2: qualified lead-capture form (lower break, ~50% in). */}
                        <GateOrForm
                          topic={premiumTopic!}
                          placement="blog"
                          category={categorySlug}
                        />

                        {/* Rest of article after the gate. */}
                        <div dangerouslySetInnerHTML={{ __html: gateSplit.after }} />
                      </>
                    ) : (
                      <>
                        {/* No lower break: qualified form goes directly under the tool. */}
                        {hasGate ? (
                          <GateOrForm
                            topic={premiumTopic!}
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
                    {/* No enabled tool/gate for this topic (compliance/unmapped):
                        original behaviour — InlineMiniLeadForm at mid-scroll. */}
                    <div dangerouslySetInnerHTML={{ __html: fallbackSplit?.before ?? post.contentHtml }} />
                    {fallbackSplit?.after ? (
                      <>
                        {/* Moment 3: fallback inline mini form for unmapped categories. */}
                        <InlineMiniLeadForm topic={post.category} />
                        <div dangerouslySetInnerHTML={{ __html: fallbackSplit.after }} />
                      </>
                    ) : null}
                  </>
                )}
              </div>

              {post.faqs && post.faqs.length > 0 ? (
                <section className="mt-16" aria-labelledby="faq-heading">
                  <h2 id="faq-heading" className="text-3xl font-bold text-[var(--ink)] mb-8">
                    Frequently asked questions
                  </h2>
                  <dl className="space-y-4">
                    {post.faqs.map((faq, i) => (
                      <div key={i} className="border-l-4 border-[var(--gold)] bg-[var(--surface)] p-6">
                        <dt className="text-lg font-bold text-[var(--ink)]">{faq.question}</dt>
                        <dd className="mt-3 text-base text-[var(--ink-soft)] leading-relaxed"><span dangerouslySetInnerHTML={{ __html: faq.answer }} /></dd>
                      </div>
                    ))}
                  </dl>
                </section>
              ) : null}

              <aside className="mt-16 flex gap-5 items-start bg-[var(--surface)] border border-[var(--border)] p-6 sm:p-8 rounded-lg">
                {/* `hidden sm:flex`, not `sm:block`: block beat the flex in the
                    old stack and the icon was never centred. */}
                <div className="hidden sm:flex shrink-0 w-14 h-14 rounded-full bg-[var(--gold)]/10 text-[var(--gold)] items-center justify-center">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-primary-700">About the author</p>
                  <p className="mt-1 text-lg font-bold text-[var(--ink)]">{niche.display_name}</p>
                  <p className="mt-2 text-sm text-[var(--ink-soft)] leading-relaxed">{niche.description}</p>
                  <Link href="/about" className="mt-3 inline-block text-sm font-semibold text-primary-700 hover:underline">
                    Learn more about our team →
                  </Link>
                </div>
              </aside>

              <NextStepOffer />

              <section
                id="enquiry-form"
                aria-labelledby="enquiry-form-heading"
                className="mt-16 scroll-mt-24 border-2 border-[var(--gold)]/20 bg-gradient-to-br from-[var(--gold)]/5 to-[var(--accent)]/5 p-8 sm:p-10 rounded-2xl"
              >
                <h2 id="enquiry-form-heading" className="text-2xl font-bold text-primary-700 sm:text-3xl">
                  {ctaCopy.heading}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
                  {ctaCopy.body}
                </p>
                <div className="mt-8">
                  <LeadForm redirectOnSuccess={false} submitLabel={ctaCopy.button} />
                </div>
              </section>

              {related.length > 0 ? (
                <section className="mt-16" aria-labelledby="related-heading">
                  <h2 id="related-heading" className="text-2xl font-bold text-[var(--ink)] mb-8">
                    Related articles
                  </h2>
                  {/* Kit grid. One link per card either way, so the internal
                      link count on every article route is unchanged. */}
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
              {/* One sticky container owning the clamp for card + TOC. The TOC
                  component carries its own sticky/clamp too; harmless, and its
                  file is not this package's. */}
              <div className="sticky top-24 max-h-[calc(100vh-7rem)] space-y-5 overflow-y-auto">
                <BlogSidebarCta
                  copy={{ heading: ctaCopy.heading, body: ctaCopy.body }}
                  buttonLabel={ctaCopy.button}
                  // Gold ground, navy label (6.23) on the card's slate-900
                  // ground. The kit default primary-600 is this site's navy and
                  // would read as a navy button on a near-navy card.
                  buttonClassName="bg-[var(--gold)] text-[var(--navy)] hover:bg-[var(--gold-strong)]"
                />
                <TableOfContents headings={headings} />
              </div>
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}
