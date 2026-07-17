import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/types/blog";
import { LeadForm } from "@/components/forms/LeadForm";
import { InlineMiniLeadForm } from "@/components/blog/InlineMiniLeadForm";
import { ToolIsland } from "@/components/blog/ToolIsland";
import { NextStepOffer } from "@/components/intent/NextStepOffer";
import { buildBlogPostingJsonLd, buildFaqJsonLd } from "@/lib/schema";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { niche } from "@/config/niche-loader";
import { TableOfContents } from "@accounting-network/web-shared/content/TableOfContents";
import { ReadingProgress } from "@accounting-network/web-shared/content/ReadingProgress";
import { extractHeadings } from "@/lib/markdown-utils";
import { calculateReadTime } from "@/lib/blog";
import { topicForBlogSlug, earlyToolForBlogSlug } from "@/lib/intent/taxonomy";
import { getGenericTool } from "@/lib/calculators/registry";
import { PremiumUpgrade } from "@/components/calculators/premium/PremiumUpgrade";
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

function formatUkDate(isoDate: string): string {
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export function BlogPostRenderer({ post, categorySlug, related = [] }: BlogPostRendererProps) {
  const headings = extractHeadings(post.contentHtml);
  const readTime = calculateReadTime(post.contentHtml);

  // Resolve the topic using the SLUG (not the human label post.category).
  // Used for R2 premium island injection (PremiumUpgrade below).
  const premiumTopic = topicForBlogSlug(categorySlug);

  // 3-moment capture architecture:
  //   Moment 1: early tool island after the first h2 (earlyToolForBlogSlug -> ToolIsland)
  //   Moment 2: InlineMiniLeadForm (mid qualified form) + PremiumUpgrade at ~60%
  //   Moment 3: LeadForm at end of article (unchanged)
  // Unmapped categories fall back to the mid-scroll InlineMiniLeadForm only (moments 2+3).
  const earlyToolSlug = earlyToolForBlogSlug(categorySlug);
  const earlyTool = earlyToolSlug ? getGenericTool(earlyToolSlug) : undefined;
  const earlySplit = earlyTool ? splitContentEarly(post.contentHtml) : null;
  const gateSplit = earlySplit ? splitRemainderForGate(earlySplit.after) : null;
  // ponytail: fallback only computed when earlySplit is null (unmapped category)
  const fallbackSplit = earlySplit ? null : splitContentAtMidScroll(post.contentHtml);
  const jsonLd =
    post.schema?.trim() ||
    buildBlogPostingJsonLd(post, `/blog/${categorySlug}/${post.slug}`);
  const faqJsonLd =
    post.faqs && post.faqs.length > 0 ? buildFaqJsonLd(post.faqs) : null;

  const takeaways =
    post.keyTakeaways && post.keyTakeaways.length > 0 ? post.keyTakeaways : null;
  const showUpdated = post.updatedDate && post.updatedDate !== post.date;
  const verified = post.sourcesVerifiedAt ? formatUkDate(post.sourcesVerifiedAt) : "";

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
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900 via-cyan-800 to-cyan-700" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/95 via-cyan-900/70 to-cyan-900/40" />
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
            <p className="mt-2 text-xs font-bold uppercase tracking-wider text-cyan-300">
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
              <div className="mb-8 pb-8 border-b border-neutral-200">
                {post.author ? (
                  <p className="text-sm font-semibold text-neutral-900">{post.author}</p>
                ) : null}
                {verified ? (
                  <p className="mt-2 flex items-start gap-2 text-xs text-neutral-500">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-cyan-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>
                      Figures checked against primary sources (HMRC, legislation.gov.uk, HMRC IR35 guidance) in {verified}.
                    </span>
                  </p>
                ) : null}
              </div>

              {takeaways ? (
                <section
                  className="tldr not-prose rounded-lg border-l-4 border-cyan-700 bg-cyan-50 p-6"
                  aria-label="Key takeaways"
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-cyan-800">
                    Key takeaways
                  </p>
                  <ul className="mt-3 space-y-2">
                    {takeaways.map((t, i) => (
                      <li key={i} className="flex items-start gap-2 text-neutral-700">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-600 shrink-0" />
                        <span className="text-base leading-relaxed">{t}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : post.summary ? (
                <p className="tldr text-lg text-neutral-600 leading-relaxed border-l-4 border-cyan-700 bg-cyan-50 p-6">
                  {post.summary}
                </p>
              ) : null}

              <div className="lg:hidden mt-8">
                <TableOfContents headings={headings} />
              </div>

              <div className="article-body prose-blog mt-10">
                {earlyTool && earlySplit ? (
                  <>
                    {/* Moment 1: early tool island after the first h2. */}
                    <div dangerouslySetInnerHTML={{ __html: earlySplit.before }} />
                    <ToolIsland tool={earlyTool} />
                    {gateSplit?.after ? (
                      <>
                        {/* Moment 2: mid qualified form + PremiumUpgrade at ~60% of remainder. */}
                        <div dangerouslySetInnerHTML={{ __html: gateSplit.before }} />
                        <InlineMiniLeadForm topic={post.category} />
                        <PremiumUpgrade
                          topic={premiumTopic}
                          placement="blog"
                          category={categorySlug}
                        />
                        <div dangerouslySetInnerHTML={{ __html: gateSplit.after }} />
                      </>
                    ) : (
                      /* Short remainder: qualified form + PremiumUpgrade directly under tool. */
                      <>
                        <InlineMiniLeadForm topic={post.category} />
                        <PremiumUpgrade
                          topic={premiumTopic}
                          placement="blog"
                          category={categorySlug}
                        />
                        <div dangerouslySetInnerHTML={{ __html: earlySplit.after }} />
                      </>
                    )}
                  </>
                ) : (
                  /* Unmapped category fallback: mid-scroll InlineMiniLeadForm + PremiumUpgrade. */
                  <>
                    <div dangerouslySetInnerHTML={{ __html: fallbackSplit!.before }} />
                    {fallbackSplit!.after !== null ? (
                      <>
                        <InlineMiniLeadForm topic={post.category} />
                        <PremiumUpgrade
                          topic={premiumTopic}
                          placement="blog"
                          category={categorySlug}
                        />
                        <div dangerouslySetInnerHTML={{ __html: fallbackSplit!.after }} />
                      </>
                    ) : (
                      <PremiumUpgrade
                        topic={premiumTopic}
                        placement="blog"
                        category={categorySlug}
                      />
                    )}
                  </>
                )}
              </div>

              {post.faqs && post.faqs.length > 0 ? (
                <section className="mt-16" aria-labelledby="faq-heading">
                  <h2 id="faq-heading" className="text-3xl font-bold text-neutral-900 mb-8">
                    Frequently asked questions
                  </h2>
                  <dl className="space-y-4">
                    {post.faqs.map((faq, i) => (
                      <div key={i} className="border-l-4 border-cyan-700 bg-neutral-50 p-6">
                        <dt className="text-lg font-bold text-neutral-900">{faq.question}</dt>
                        <dd className="mt-3 text-base text-neutral-600 leading-relaxed">{faq.answer}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              ) : null}

              <aside className="mt-16 flex gap-5 items-start bg-neutral-50 border border-neutral-200 p-6 sm:p-8 rounded-lg">
                <div className="hidden sm:flex shrink-0 w-14 h-14 rounded-full bg-cyan-100 text-cyan-800 items-center justify-center">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-cyan-800">About the author</p>
                  <p className="mt-1 text-lg font-bold text-neutral-900">{niche.display_name}</p>
                  <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{niche.description}</p>
                  <Link href="/about" className="mt-3 inline-block text-sm font-semibold text-cyan-800 hover:underline">
                    Learn more about our team
                  </Link>
                </div>
              </aside>

              <NextStepOffer />

              <div className="mt-16 border-2 border-cyan-200 bg-gradient-to-br from-cyan-50 to-white p-8 sm:p-10 rounded-2xl">
                <h2 className="text-2xl font-bold text-cyan-900 sm:text-3xl">
                  {niche.blog.cta_heading}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-neutral-600">
                  {niche.blog.cta_body}
                </p>
                <div className="mt-8">
                  <LeadForm redirectOnSuccess={false} submitLabel={niche.blog.cta_button} />
                </div>
              </div>

              {related.length > 0 ? (
                <section className="mt-16" aria-labelledby="related-heading">
                  <h2 id="related-heading" className="text-2xl font-bold text-neutral-900 mb-8">
                    Related articles
                  </h2>
                  <ul className="space-y-4">
                    {related.map((r) => (
                      <li key={r.slug}>
                        <Link
                          href={`/blog/${r.categorySlug}/${r.slug}`}
                          className="block border-l-4 border-neutral-200 bg-neutral-50 p-6 transition-all hover:border-cyan-700 hover:bg-white hover:shadow-md"
                        >
                          <h3 className="text-lg font-bold text-neutral-900">{r.title}</h3>
                          <p className="mt-2 text-sm text-neutral-500">{r.summary}</p>
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
