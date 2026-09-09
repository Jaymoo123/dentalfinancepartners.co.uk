import Link from "next/link";
import { CalendarDays, Clock, History, UserRound } from "lucide-react";
import type { BlogPost } from "@/types/blog";
import { buildArticleJsonLd, buildBlogPostingJsonLd } from "@/lib/schema";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { niche } from "@/config/niche-loader";
import { blogCtaCopy } from "@/lib/blog-cta-map";
import { getTeamMember } from "@/app/team/[slug]/data";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@accounting-network/web-shared/design/primitives/accordion";
import { TableOfContents } from "@accounting-network/web-shared/design/blog/TableOfContents";
import { ReadingProgress } from "@accounting-network/web-shared/design/blog/ReadingProgress";
import { BlogSidebarCta } from "@accounting-network/web-shared/design/blog/BlogSidebarCta";
import {
  RelatedArticles,
  type RelatedArticleItem,
} from "@accounting-network/web-shared/design/blog/RelatedArticles";
import { GeneralistBackdrop } from "@/components/layout/GeneralistBackdrop";
import { extractHeadings } from "@accounting-network/web-shared/content/markdown-utils";
import { calculateReadTime } from "@/lib/blog";
import { LeadForm } from "@/components/forms/LeadForm";
import { InlineMiniLeadForm } from "@/components/blog/InlineMiniLeadForm";
import { NextStepOffer } from "@/components/intent/NextStepOffer";
import { PremiumUpgrade } from "@/components/calculators/premium/PremiumUpgrade";
import { GateOrForm } from "@/components/resources/GateOrForm";
import { ToolIsland } from "@/components/blog/ToolIsland";
import { topicForBlogSlug, earlyToolForBlogSlug } from "@/lib/intent/taxonomy";
import { getGenericTool } from "@/lib/tools/registry";
import {
  splitContentEarly,
  splitRemainderForGate,
  splitContentAtMidScroll,
} from "@accounting-network/web-shared/content/blog-splits";

type BlogPostRendererProps = {
  post: BlogPost;
  /** Slugified category. Drives the tool/gate taxonomy and the post breadcrumb. */
  categorySlug: string;
  /** Already-resolved cards: the pages own href construction and excerpts. */
  related?: RelatedArticleItem[];
  /** "pillar" renders the same anatomy for /fundamentals/[slug]. */
  variant?: "post" | "pillar";
};

function formatUkDate(isoDate: string): string {
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

/**
 * Every `<aside>` in the body gets an anchor to the one enquiry form. The
 * asides are where the article says "this is the bit that costs people money",
 * which is the moment the ask is worth making.
 */
function decorateAsides(html: string): string {
  return html.replace(
    /<aside>([\s\S]*?)<\/aside>/g,
    (_m, inner) =>
      `<aside>${inner}<p class="aside-cta-row"><a class="aside-cta" href="#enquiry-form">Talk to a specialist →</a></p></aside>`,
  );
}

const metaPill =
  "inline-flex min-h-7 items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200";

export function BlogPostRenderer({
  post,
  categorySlug,
  related = [],
  variant = "post",
}: BlogPostRendererProps) {
  const isPillar = variant === "pillar";
  const headings = extractHeadings(post.contentHtml);
  const readTime = calculateReadTime(post.contentHtml);
  const path = isPillar
    ? `/fundamentals/${post.slug}`
    : `/blog/${categorySlug}/${post.slug}`;
  const jsonLd =
    post.schema?.trim() ||
    (isPillar ? buildArticleJsonLd(post, path) : buildBlogPostingJsonLd(post, path));

  const decoratedHtml = decorateAsides(post.contentHtml);

  // Byline: the editorial lead is the default so the Person schema always has a
  // real /team/[slug] URL. Reviewer is the standing technical reviewer.
  const author = getTeamMember(post.authorSlug || "emma-carter");
  const authorName = author?.name ?? post.author ?? "Editorial Team";
  const reviewer = getTeamMember("james-holloway");
  const hasReviewer = !!reviewer && reviewer.slug !== author?.slug;

  const takeaways =
    post.keyTakeaways && post.keyTakeaways.length > 0 ? post.keyTakeaways : null;

  const ctaCopy = blogCtaCopy(post.category);

  // 3-moment architecture, logic unchanged:
  //  moment 1: early free-tool island after the first h2 (EARLY_TOOL_BY_CATEGORY)
  //  moment 2: PremiumUpgrade + GateOrForm at a later heading
  //  moment 3: the #enquiry-form panel at the end
  // Unmapped categories fall back to the mid-scroll InlineMiniLeadForm.
  const topic = topicForBlogSlug(categorySlug);
  const earlyToolSlug = earlyToolForBlogSlug(categorySlug);
  const earlyTool = earlyToolSlug ? getGenericTool(earlyToolSlug) : undefined;
  const earlySplit = earlyTool ? splitContentEarly(decoratedHtml) : null;
  const gateSplit = earlySplit ? splitRemainderForGate(earlySplit.after) : null;
  const fallbackSplit = earlySplit ? null : splitContentAtMidScroll(decoratedHtml);

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
                siteUrl={siteConfig.url}
                items={
                  isPillar
                    ? [
                        { label: "Home", href: "/" },
                        { label: "Guides", href: "/fundamentals" },
                        { label: post.title },
                      ]
                    : [
                        { label: "Home", href: "/" },
                        { label: "Blog", href: "/blog" },
                        { label: post.category, href: `/blog/${categorySlug}` },
                        { label: post.title },
                      ]
                }
              />

              <header className="rounded-xl bg-slate-50 p-8 mt-6">
                <Eyebrow>{isPillar ? `Pillar guide · ${post.category}` : post.category}</Eyebrow>
                <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
                  {post.h1}
                </h1>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {post.date ? (
                    <span className={metaPill}>
                      <CalendarDays aria-hidden className="h-3.5 w-3.5 text-primary-600" />
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
                    <span className="inline-flex min-h-7 items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700 ring-1 ring-primary-100">
                      <History aria-hidden className="h-3.5 w-3.5" />
                      Updated{" "}
                      <time dateTime={post.updatedDate}>{formatUkDate(post.updatedDate!)}</time>
                    </span>
                  ) : null}
                  <span className={metaPill}>
                    <UserRound aria-hidden className="h-3.5 w-3.5 text-primary-600" />
                    {author ? (
                      <Link href={`/team/${author.slug}`} rel="author" className="hover:text-primary-700">
                        {authorName}
                      </Link>
                    ) : (
                      authorName
                    )}
                  </span>
                  {readTime > 0 ? (
                    <span className={metaPill}>
                      <Clock aria-hidden className="h-3.5 w-3.5 text-primary-600" />
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
                    className="inline-flex items-center gap-2 py-0.5 text-sm font-semibold text-primary-700 hover:text-primary-800 underline underline-offset-4"
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
                  id="answer-box"
                  className="tldr not-prose mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6"
                  aria-label="Key takeaways"
                >
                  <Eyebrow>Key takeaways</Eyebrow>
                  <ul className="space-y-2">
                    {takeaways.map((t, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-800">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary-600 shrink-0" />
                        <span className="text-base leading-relaxed">{t}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : post.summary ? (
                <section
                  id="answer-box"
                  className="tldr not-prose mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6"
                  aria-label="Summary"
                >
                  <Eyebrow>TL;DR</Eyebrow>
                  <p className="text-base leading-relaxed text-slate-800">{post.summary}</p>
                </section>
              ) : null}

              {post.image ? (
                <img
                  src={post.image}
                  alt={post.altText || post.title}
                  className="mt-10 w-full rounded-xl border border-slate-200 object-cover"
                  width={1200}
                  height={630}
                />
              ) : null}

              <div className="article-body prose-blog mt-10">
                {earlyTool && earlySplit ? (
                  <>
                    {/* Moment 1: early tool island after the first h2. */}
                    <div dangerouslySetInnerHTML={{ __html: earlySplit.before }} />
                    <ToolIsland tool={earlyTool} />
                    {gateSplit?.after ? (
                      <>
                        {/* Moment 2: premium tool + resource gate at a later heading. */}
                        <div dangerouslySetInnerHTML={{ __html: gateSplit.before }} />
                        <PremiumUpgrade topic={topic} placement="blog" category={categorySlug} />
                        {topic && (
                          <GateOrForm topic={topic} placement="blog" category={categorySlug} />
                        )}
                        <div dangerouslySetInnerHTML={{ __html: gateSplit.after }} />
                      </>
                    ) : (
                      /* Short remainder (<2 h2s): gate sits directly under the tool. */
                      <>
                        <PremiumUpgrade topic={topic} placement="blog" category={categorySlug} />
                        {topic && (
                          <GateOrForm topic={topic} placement="blog" category={categorySlug} />
                        )}
                        <div dangerouslySetInnerHTML={{ __html: earlySplit.after }} />
                      </>
                    )}
                  </>
                ) : (
                  /* Unmapped category fallback: mid-scroll behaviour. */
                  <>
                    <div dangerouslySetInnerHTML={{ __html: fallbackSplit!.before }} />
                    {fallbackSplit!.after ? (
                      <>
                        <InlineMiniLeadForm topic={post.category} />
                        <PremiumUpgrade topic={topic} placement="blog" category={categorySlug} />
                        {topic && (
                          <GateOrForm topic={topic} placement="blog" category={categorySlug} />
                        )}
                        <div dangerouslySetInnerHTML={{ __html: fallbackSplit!.after }} />
                      </>
                    ) : (
                      <>
                        <PremiumUpgrade topic={topic} placement="blog" category={categorySlug} />
                        {topic && (
                          <GateOrForm topic={topic} placement="blog" category={categorySlug} />
                        )}
                      </>
                    )}
                  </>
                )}
              </div>

              <section
                id="enquiry-form"
                className="relative mt-16 overflow-hidden rounded-xl bg-slate-900 p-8 sm:p-10 text-white scroll-mt-24"
                aria-labelledby="enquiry-form-heading"
              >
                <GeneralistBackdrop />
                <div className="relative z-10">
                  <h2 id="enquiry-form-heading" className="text-2xl font-bold text-white sm:text-3xl">
                    {ctaCopy.heading}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-slate-200">{ctaCopy.body}</p>
                  {/* LeadForm labels and consent copy are slate-900 by design, so
                      the form itself sits on a white card, not on the navy. */}
                  <div className="mt-8 rounded-xl bg-white p-6 sm:p-8">
                    <LeadForm redirectOnSuccess={false} submitLabel={ctaCopy.button} />
                  </div>
                </div>
              </section>

              {post.faqs && post.faqs.length > 0 ? (
                <section className="mt-16" aria-labelledby="faq-heading">
                  <h2 id="faq-heading" className="text-2xl font-bold text-slate-900 sm:text-4xl mb-8">
                    Frequently asked questions
                  </h2>
                  {/* Same single-open accordion as the kit FaqSection. Answers are
                      rendered as HTML because several carry in-body links, which
                      the kit's plain-text branch would print as escaped markup. */}
                  <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
                    {post.faqs.map((faq, i) => (
                      <AccordionItem key={i} value={`faq-${i}`} className="bg-slate-50">
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>
                          <span dangerouslySetInnerHTML={{ __html: faq.answer }} />
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </section>
              ) : null}

              <aside className="mt-16 rounded-xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
                <Eyebrow>{isPillar ? "About this guide" : "About the author"}</Eyebrow>
                <p className="text-lg font-bold text-slate-900">
                  {author ? (
                    <Link href={`/team/${author.slug}`} rel="author" className="hover:text-primary-700">
                      {authorName}
                    </Link>
                  ) : (
                    authorName
                  )}
                  {author?.qualifications ? (
                    <span className="font-normal text-slate-500">, {author.qualifications}</span>
                  ) : null}
                </p>
                <p className="mt-1 text-sm text-slate-600">{author?.role ?? "Editorial"}</p>
                {hasReviewer ? (
                  <div className="mt-5 border-t border-slate-200 pt-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Reviewed by
                    </p>
                    <p className="mt-1 text-base font-bold text-slate-900">
                      <Link href={`/team/${reviewer!.slug}`} className="hover:text-primary-700">
                        {reviewer!.name}
                      </Link>
                      {reviewer!.qualifications ? (
                        <span className="font-normal text-slate-500">
                          , {reviewer!.qualifications}
                        </span>
                      ) : null}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      Technical accuracy review. Every figure, rate and procedural statement
                      verified against current HMRC source.
                    </p>
                  </div>
                ) : null}
                <p className="mt-5 text-sm leading-relaxed text-slate-600">
                  {niche.description} For decisions specific to your business,{" "}
                  <Link href="/contact" className="font-semibold text-primary-700 hover:text-primary-800">
                    book a call
                  </Link>
                  .
                </p>
                <Link
                  href="/about"
                  className="mt-3 inline-block py-0.5 text-sm font-semibold text-primary-700 hover:text-primary-800"
                >
                  Learn more about our team →
                </Link>
              </aside>

              {related.length > 0 ? (
                <section className="mt-16" aria-labelledby="related-heading">
                  <h2 id="related-heading" className="text-2xl font-bold text-slate-900 mb-8">
                    {isPillar ? "Other pillar guides" : "Related articles"}
                  </h2>
                  <RelatedArticles items={related} />
                </section>
              ) : null}

              {/* Personalised, and null for most readers. It sits AFTER the
                  related grid so it can never stand between the article and the
                  enquiry form. */}
              <NextStepOffer />
            </div>

            <aside className="hidden lg:block">
              {/* One sticky container owns the viewport clamp for card + TOC and
                  scrolls internally when the pair is taller than the screen. */}
              <div className="sticky top-24 max-h-[calc(100vh-7rem)] space-y-5 overflow-y-auto">
                <BlogSidebarCta copy={ctaCopy} />
                <TableOfContents headings={headings} />
              </div>
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}
