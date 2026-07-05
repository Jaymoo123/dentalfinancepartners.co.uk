import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/types/blog";
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

type BlogPostRendererProps = {
  post: BlogPost;
  categorySlug: string;
  related?: { slug: string; title: string; summary: string; category: string; categorySlug: string }[];
};

/**
 * Split HTML content at roughly the 60% scroll point (after the 3rd or 4th h2)
 * so InlineMiniLeadForm lands mid-article. Falls back to the full article with
 * no split when there are fewer than 4 headings (short posts).
 */
function splitContentAtMidScroll(html: string): { before: string; after: string | null } {
  const headings = [...html.matchAll(/<h2[^>]*>/g)];
  if (headings.length < 4) {
    return { before: html, after: null };
  }
  const targetIdx = Math.floor(headings.length * 0.6);
  const target = headings[targetIdx];
  if (target?.index === undefined) {
    return { before: html, after: null };
  }
  return { before: html.slice(0, target.index), after: html.slice(target.index) };
}

function formatUkDate(isoDate: string): string {
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

/**
 * Renders a blog post with a full-bleed hero (image with a navy-scrim, or a
 * navy gradient fallback when no image is set), a published/updated date line,
 * an optional "Key takeaways" block (falls back to the summary), the HTML body,
 * FAQs, author aside, lead CTA and related articles. Brand tokens only — no
 * hardcoded colours — so it stays on-brand with the rest of the site.
 */
export function BlogPostRenderer({ post, categorySlug, related = [] }: BlogPostRendererProps) {
  const headings = extractHeadings(post.contentHtml);
  const readTime = calculateReadTime(post.contentHtml);
  const jsonLd =
    post.schema?.trim() ||
    buildBlogPostingJsonLd(post, `/blog/${categorySlug}/${post.slug}`);

  const takeaways =
    post.keyTakeaways && post.keyTakeaways.length > 0 ? post.keyTakeaways : null;
  const showUpdated = post.updatedDate && post.updatedDate !== post.date;
  const verified = post.sourcesVerifiedAt ? formatUkDate(post.sourcesVerifiedAt) : "";

  const midSplit = splitContentAtMidScroll(post.contentHtml);

  return (
    <>
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <section className="relative h-[420px] sm:h-[480px] lg:h-[520px] overflow-hidden">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.altText || post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover scale-105 blur-[2px]"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--navy)] via-[var(--navy-soft)] to-[var(--navy-muted)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/95 via-[var(--navy)]/70 to-[var(--navy)]/40" />
        <div className={`${siteContainerLg} relative z-10 h-full flex items-end pb-10 sm:pb-14`}>
          <div className="max-w-4xl">
            <Breadcrumb
              variant="light"
              items={[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: post.category, href: `/blog/${categorySlug}` },
                { label: post.title },
              ]}
            />
            <p className="mt-2 text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
              {post.category}
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              {post.h1}
            </h1>
            <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/70">
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
          </div>
        </div>
        {post.imageCredit?.photographer ? (
          <p className="absolute bottom-2 right-3 z-10 text-[10px] text-white/50">
            Photo:{" "}
            {post.imageCredit.photographerUrl ? (
              <a
                href={post.imageCredit.photographerUrl}
                target="_blank"
                rel="noopener nofollow"
                className="underline hover:text-white/80"
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
                    className="underline hover:text-white/80"
                  >
                    {post.imageCredit.source}
                  </a>
                ) : (
                  post.imageCredit.source
                )}
              </>
            ) : null}
          </p>
        ) : null}
      </section>

      <article className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto lg:max-w-7xl lg:grid lg:grid-cols-[1fr_250px] lg:gap-12">
            <div className="max-w-4xl">
              <div className="mb-8 pb-8 border-b border-[var(--border)]">
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
                  className="not-prose rounded-lg border-l-4 border-[var(--primary)] bg-[var(--surface-elevated)] p-6"
                  aria-label="Key takeaways"
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent-strong)]">
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
                <p className="text-lg text-[var(--ink-soft)] leading-relaxed border-l-4 border-[var(--primary)] bg-[var(--surface-elevated)] p-6">
                  {post.summary}
                </p>
              ) : null}

              <div className="lg:hidden mt-8">
                <TableOfContents headings={headings} />
              </div>

              <div className="article-body prose-blog mt-10">
                <div dangerouslySetInnerHTML={{ __html: midSplit.before }} />
                {midSplit.after ? (
                  <>
                    {/* Mid-scroll injection: InlineMiniLeadForm before the second
                        half. Topic is the human display label from the post (used
                        as a readable tag in the lead message prefix). */}
                    <InlineMiniLeadForm topic={post.category} />
                    <div dangerouslySetInnerHTML={{ __html: midSplit.after }} />
                  </>
                ) : null}
              </div>

              {post.faqs && post.faqs.length > 0 ? (
                <section className="mt-16" aria-labelledby="faq-heading">
                  <h2 id="faq-heading" className="text-3xl font-bold text-[var(--ink)] mb-8">
                    Frequently asked questions
                  </h2>
                  <dl className="space-y-4">
                    {post.faqs.map((faq, i) => (
                      <div key={i} className="border-l-4 border-[var(--primary)] bg-[var(--surface)] p-6">
                        <dt className="text-lg font-bold text-[var(--ink)]">{faq.question}</dt>
                        <dd className="mt-3 text-base text-[var(--ink-soft)] leading-relaxed">{faq.answer}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              ) : null}

              <aside className="mt-16 flex gap-5 items-start bg-[var(--surface)] border border-[var(--border)] p-6 sm:p-8 rounded-lg">
                <div className="hidden sm:block shrink-0 w-14 h-14 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-[var(--primary)]">About the author</p>
                  <p className="mt-1 text-lg font-bold text-[var(--ink)]">{niche.display_name}</p>
                  <p className="mt-2 text-sm text-[var(--ink-soft)] leading-relaxed">{niche.description}</p>
                  <Link href="/about" className="mt-3 inline-block text-sm font-semibold text-[var(--primary)] hover:underline">
                    Learn more about our team →
                  </Link>
                </div>
              </aside>

              <NextStepOffer />

              <div className="mt-16 border-2 border-[var(--primary)]/20 bg-gradient-to-br from-[var(--primary)]/5 to-[var(--accent)]/5 p-8 sm:p-10 rounded-2xl">
                <h2 className="text-2xl font-bold text-[var(--primary)] sm:text-3xl">
                  {niche.blog.cta_heading}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
                  {niche.blog.cta_body}
                </p>
                <div className="mt-8">
                  <LeadForm redirectOnSuccess={false} submitLabel={niche.blog.cta_button} />
                </div>
              </div>

              {related.length > 0 ? (
                <section className="mt-16" aria-labelledby="related-heading">
                  <h2 id="related-heading" className="text-2xl font-bold text-[var(--ink)] mb-8">
                    Related articles
                  </h2>
                  <ul className="space-y-4">
                    {related.map((r) => (
                      <li key={r.slug}>
                        <Link
                          href={`/blog/${r.categorySlug}/${r.slug}`}
                          className="block border-l-4 border-[var(--border)] bg-[var(--surface)] p-6 transition-all hover:border-[var(--primary)] hover:bg-white hover:shadow-md"
                        >
                          <h3 className="text-lg font-bold text-[var(--ink)]">{r.title}</h3>
                          <p className="mt-2 text-sm text-[var(--muted)]">{r.summary}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <TableOfContents headings={headings} />
              </div>
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}
