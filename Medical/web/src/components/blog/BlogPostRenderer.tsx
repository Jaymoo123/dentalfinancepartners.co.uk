import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/types/blog";
import { LeadForm } from "@/components/forms/LeadForm";
import { buildBlogPostingJsonLd } from "@/lib/schema";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { niche } from "@/config/niche-loader";
import { TableOfContents } from "./TableOfContents";
import { ReadingProgress } from "./ReadingProgress";
import { extractHeadings } from "@/lib/markdown-utils";
import { calculateReadTime } from "@/lib/blog";
import { InlineMiniLeadForm } from "@/components/blog/InlineMiniLeadForm";
import { NextStepOffer } from "@/components/intent/NextStepOffer";
import { topicFromCategory } from "@/lib/intent/deriveTopic";
import { TopicOverrideProvider } from "@/components/intent/IntentProvider";
import { topicForBlogSlug } from "@/lib/intent/taxonomy";
import { PremiumUpgrade } from "@/components/tools/premium/PremiumUpgrade";
import { MiniCapture } from "@/components/forms/MiniCapture";

type BlogPostRendererProps = {
  post: BlogPost;
  /** Category slug (slugifyCategory(post.category)) passed from the page. */
  categorySlug: string;
  related?: { slug: string; title: string; summary: string }[];
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
 * BlogPostRenderer for Medical Accountants UK (FLAT /blog/[slug] routing).
 *
 * FLAT-routing parity: the topic is resolved server-side from post.category
 * (via topicFromCategory) and injected into the intent context via
 * TopicOverrideProvider, so all intent surfaces (StickyCTA, ExitIntentModal,
 * DeepScrollModal, NextStepOffer, InlineMiniLeadForm) receive the correct topic
 * without relying on the URL.
 *
 * WS8 surface: keyTakeaways / updatedDate / sourcesVerifiedAt are rendered when
 * present and tolerate absence gracefully (0/73 posts have them currently).
 *
 * Hero: raw <img> replaced with next/image (boxed header design preserved;
 * remote hosts: images.unsplash.com + images.pexels.com in next.config.ts).
 */
export function BlogPostRenderer({ post, categorySlug, related = [] }: BlogPostRendererProps) {
  const headings = extractHeadings(post.contentHtml);
  const readTime = calculateReadTime(post.contentHtml);
  const jsonLd =
    post.schema?.trim() ||
    buildBlogPostingJsonLd(post, `/blog/${post.slug}`);

  // Resolve topic from category for intent personalisation surfaces.
  // topicFromCategory slugifies post.category and looks up the taxonomy.
  const topic = topicFromCategory(post.category);

  // Resolve the premium topic from the categorySlug prop (the slug-derived
  // contract: FLAT routing means the page passes categorySlug and the premium
  // island must use it, never window.location or URL parsing).
  const premiumTopic = topicForBlogSlug(categorySlug);

  const takeaways =
    post.keyTakeaways && post.keyTakeaways.length > 0 ? post.keyTakeaways : null;
  const showUpdated = post.updatedDate && post.updatedDate !== post.date;
  const verified = post.sourcesVerifiedAt ? formatUkDate(post.sourcesVerifiedAt) : "";

  const midSplit = splitContentAtMidScroll(post.contentHtml);

  return (
    // TopicOverrideProvider injects the category-resolved topic into IntentProvider.
    // This is the FLAT-routing parity mechanism: blog post pages cannot derive
    // their topic from the URL, so the server-resolved topic is passed as a prop
    // and distributed via context to all intent surfaces.
    <TopicOverrideProvider topic={topic}>
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
                  { label: post.title },
                ]}
              />
              <header className="border-l-4 border-[var(--copper)] bg-[var(--surface)] p-8 mt-6">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--copper)]">
                  {post.category}
                </p>
                <h1 className="mt-3 text-3xl font-bold leading-tight text-[var(--ink)] sm:text-4xl md:text-5xl">
                  {post.h1}
                </h1>
                <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[var(--muted)]">
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
                  {post.author && (
                    <>
                      <span aria-hidden>·</span>
                      <span>{post.author}</span>
                    </>
                  )}
                </div>
              </header>

              {verified ? (
                <p className="mt-4 flex items-start gap-2 text-xs text-[var(--muted)] border-l-4 border-[var(--copper)]/30 pl-4">
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-[var(--copper)]"
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

              {post.summary ? (
                <p className="mt-4 text-lg text-[var(--ink-soft)] leading-relaxed border-l-4 border-[var(--copper)] bg-[var(--surface)] p-4">
                  {post.summary}
                </p>
              ) : null}

              <div className="lg:hidden mt-8">
                <TableOfContents headings={headings} />
              </div>

              {post.image ? (
                <div className="mt-10 w-full border-2 border-[var(--border)] shadow-sm overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.altText || post.title}
                    width={1200}
                    height={630}
                    className="w-full object-cover"
                    priority
                  />
                </div>
              ) : null}

              {/* WS8: Key takeaways block -- rendered when present; absent for
                  0/73 posts currently (surface tolerates absence gracefully). */}
              {takeaways ? (
                <section
                  className="not-prose mt-8 rounded-lg border-l-4 border-[var(--copper)] bg-[var(--surface-elevated)] p-6"
                  aria-label="Key takeaways"
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--copper-strong)]">
                    Key takeaways
                  </p>
                  <ul className="mt-3 space-y-2">
                    {takeaways.map((t, i) => (
                      <li key={i} className="flex items-start gap-2 text-[var(--ink-soft)]">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--copper)] shrink-0" />
                        <span className="text-base leading-relaxed">{t}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              <div className="article-body prose-blog mt-10">
                <div dangerouslySetInnerHTML={{ __html: midSplit.before }} />
                {midSplit.after ? (
                  <>
                    {/* Mid-scroll injection: PremiumUpgrade (premium tool island)
                        placed before InlineMiniLeadForm. Resolves from the slug-
                        derived premiumTopic so the gate never touches the URL.
                        Renders nothing for topics with no premium tool (gp-practice
                        and null). */}
                    <PremiumUpgrade
                      topic={premiumTopic}
                      placement="blog"
                      category={categorySlug}
                    />
                    {/* Mid-article qualified lead capture (free review, medical voice). */}
                    <MiniCapture
                      formId="blog_mid_resource"
                      messagePrefix={`[Blog mid: ${categorySlug}] `}
                      heading="Get a free specialist review"
                      blurb="Tell us about your situation and a medical accountant will review your position and confirm the next sensible step, with no obligation."
                      submitLabel="Request my free review"
                      className="my-10 rounded-2xl border-l-4 border-[var(--copper)] bg-[var(--surface)] p-6 sm:p-8"
                    />
                    {/* InlineMiniLeadForm follows after the qualified capture. */}
                    <InlineMiniLeadForm topic={post.category} />
                    <div dangerouslySetInnerHTML={{ __html: midSplit.after }} />
                  </>
                ) : (
                  /* Short-post fallback: fewer than 4 h2s, no mid-split.
                     PremiumUpgrade and ResourceGate are placed after the article body
                     so mapped categories still get the tools on short posts. */
                  <>
                    <PremiumUpgrade
                      topic={premiumTopic}
                      placement="blog"
                      category={categorySlug}
                    />
                    <MiniCapture
                      formId="blog_short_resource"
                      messagePrefix={`[Blog short: ${categorySlug}] `}
                      heading="Get a free specialist review"
                      blurb="Tell us about your situation and a medical accountant will review your position and confirm the next sensible step, with no obligation."
                      submitLabel="Request my free review"
                      className="my-10 rounded-2xl border-l-4 border-[var(--copper)] bg-[var(--surface)] p-6 sm:p-8"
                    />
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
                      <div key={i} className="border-l-4 border-[var(--copper)] bg-[var(--surface)] p-6">
                        <dt className="text-lg font-bold text-[var(--ink)]">{faq.question}</dt>
                        <dd className="mt-3 text-base text-[var(--ink-soft)] leading-relaxed">{faq.answer}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              ) : null}

              <aside className="mt-16 flex gap-5 items-start bg-[var(--surface)] border border-[var(--border)] p-6 sm:p-8 rounded-lg">
                <div className="hidden sm:block shrink-0 w-14 h-14 rounded-full bg-[var(--copper)]/10 text-[var(--copper)] flex items-center justify-center">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-[var(--copper)]">About the author</p>
                  <p className="mt-1 text-lg font-bold text-[var(--ink)]">{niche.display_name}</p>
                  <p className="mt-2 text-sm text-[var(--ink-soft)] leading-relaxed">{niche.description}</p>
                  <Link href="/about" className="mt-3 inline-block text-sm font-semibold text-[var(--copper)] hover:underline">
                    Learn more about our team
                  </Link>
                </div>
              </aside>

              <NextStepOffer />

              <div className="mt-16 bg-[var(--navy)] p-8 sm:p-10 text-white rounded-2xl">
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  {niche.blog.cta_heading}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-white/90">
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
                          href={`/blog/${r.slug}`}
                          className="block border-l-4 border-[var(--border)] bg-[var(--surface)] p-6 transition-all hover:border-[var(--copper)] hover:bg-white hover:shadow-md"
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
    </TopicOverrideProvider>
  );
}
