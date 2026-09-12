import Link from "next/link";
import { CalendarDays, Clock, History, UserRound } from "lucide-react";
import type { BlogPost } from "@/types/blog";
import { LeadForm } from "@/components/forms/LeadForm";
import { InlineMiniLeadForm } from "@/components/blog/InlineMiniLeadForm";
import { ToolIsland } from "@/components/blog/ToolIsland";
import { NextStepOffer } from "@/components/intent/NextStepOffer";
import { buildBlogPostingJsonLd, buildFaqJsonLd } from "@/lib/schema";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { siteConfig } from "@/config/site";
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

/**
 * Meta fact pill. One recipe, so the four facts in the header card match.
 * Icons sit on primary-700 (cyan-800, 7.27 on white); the ramp's 600 step is
 * the brand cyan-700 and is reserved for grounds and graphic marks.
 */
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
  // CARVE-OUT E2. `?.trim() ||` is LOAD-BEARING and is preserved verbatim.
  // 61 of 62 posts carry a `schema:` frontmatter key and EVERY ONE of those
  // values is the empty string (`grep -h "^schema:" content/blog/*.md | sort |
  // uniq -c` => `61 schema: ''`), so the fallback fires on all 62 posts and the
  // BlogPosting JSON-LD below, with its nested FAQPage, comes entirely from
  // buildBlogPostingJsonLd. Reading the PRESENCE of the key as proof the field
  // is populated, and "simplifying" this away, drops structured data from every
  // post at once. Check the VALUE, never the key.
  const jsonLd =
    post.schema?.trim() ||
    buildBlogPostingJsonLd(post, `/blog/${categorySlug}/${post.slug}`);
  const faqJsonLd =
    post.faqs && post.faqs.length > 0
      ? buildFaqJsonLd(post.faqs.map((f) => ({ question: f.question, answer: f.answer.replace(/<[^>]+>/g, "") })))
      : null;

  const takeaways =
    post.keyTakeaways && post.keyTakeaways.length > 0 ? post.keyTakeaways : null;
  // CARVE-OUT E6. Correct but INERT today: `updatedDate` equals `date` on all
  // 62 posts, so this is false everywhere. Kept because the frontmatter field
  // exists and the next re-verification wave populates it. Do not delete on the
  // grounds that it never renders.
  const showUpdated = Boolean(post.updatedDate && post.updatedDate !== post.date);
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

      <article className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto lg:max-w-7xl lg:grid lg:grid-cols-[1fr_250px] lg:gap-12">
            <div className="max-w-4xl">
              {/* Kit primitive, repointed in phase 1 (P1-6). `onDark` is dropped
                  because the ground moved from the navy photo hero to the light
                  header card; the component itself is unchanged. */}
              <Breadcrumb
                siteUrl={siteConfig.url}
                items={[
                  { label: "Home", href: "/" },
                  { label: "Blog", href: "/blog" },
                  { label: post.category, href: `/blog/${categorySlug}` },
                  { label: post.title },
                ]}
              />

              {/* Header card replaces a 420-520px blurred photo hero. That hero
                  pushed the h1, the summary and every in-page route below the
                  fold, made an off-domain decorative photo the LCP element via
                  next/image `priority`, and carried no route to the ask. The
                  photo is NOT dropped: it renders in-body below with its credit
                  (carve-out E4). Card ground is the opposite of the section's
                  (DESIGN_SYSTEM 0.1). */}
              <header className="mt-6 rounded-xl bg-neutral-50 p-6 sm:p-8 ring-1 ring-neutral-200/70">
                {/* Eyebrow keeps the site's mono face (DESIGN_DELTA N3) and
                    gains the standard's 24x2 primary rule. Static, not the kit
                    EyebrowRule: that ships an IntersectionObserver to drive
                    `.eyebrow-rule` keyframes this site's globals.css does not
                    define, so the animation could not run either way. */}
                <p className="flex items-center gap-2">
                  <span aria-hidden className="block h-0.5 w-6 flex-none rounded-full bg-primary-600" />
                  <span className="eyebrow">{post.category}</span>
                </p>
                <h1 className="mt-3 text-3xl font-bold leading-tight text-neutral-900 sm:text-4xl md:text-5xl">
                  {post.h1}
                </h1>
                {/* Meta as icon pills rather than a dot-separated run: each fact
                    reads at a glance, and "Updated" is tinted because recency is
                    what earns trust on tax content. */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {post.date ? (
                    <span className={metaPill}>
                      <CalendarDays aria-hidden className="h-3.5 w-3.5 text-primary-700" />
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
                    <span className="inline-flex min-h-7 items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700 ring-1 ring-primary-200">
                      <History aria-hidden className="h-3.5 w-3.5" />
                      Updated <time dateTime={post.updatedDate}>{formatUkDate(post.updatedDate!)}</time>
                    </span>
                  ) : null}
                  {post.author ? (
                    <span className={metaPill}>
                      <UserRound aria-hidden className="h-3.5 w-3.5 text-primary-700" />
                      {post.author}
                    </span>
                  ) : null}
                  {readTime > 0 ? (
                    <span className={metaPill}>
                      <Clock aria-hidden className="h-3.5 w-3.5 text-primary-700" />
                      {readTime} min read
                    </span>
                  ) : null}
                </div>
                {/* CARVE-OUT E8, and a non-obvious dependency: `.tldr` is a
                    `speakable` cssSelector in src/lib/schema.ts:310. Pre-port it
                    was carried by the takeaways callout OR, when a post had no
                    takeaways, by the summary paragraph. Takeaways are present on
                    62/62 today so the fallback is inert, but keeping it means a
                    future post without them still exposes a speakable region
                    instead of pointing the schema at nothing. */}
                {post.summary ? (
                  <p className={`mt-5 text-base leading-7 text-neutral-600${takeaways ? "" : " tldr"}`}>
                    {post.summary}
                  </p>
                ) : null}
                {/* DESIGN_SYSTEM 0.5: the reader meets a route to the ask before
                    scrolling. The target carries scroll-mt-24, so its heading is
                    not hidden under the sticky header on arrival. */}
                <div className="mt-6">
                  <a
                    href="#enquiry-form"
                    className="inline-flex items-center gap-2 py-0.5 text-sm font-semibold text-primary-700 underline underline-offset-4 hover:text-primary-800"
                  >
                    Skip to enquiry form
                    <span aria-hidden>&darr;</span>
                  </a>
                </div>
              </header>

              {/* CARVE-OUT E5: sources-verified trust line. Live on 62/62. */}
              {verified ? (
                <p className="mt-6 flex items-start gap-2 text-xs text-neutral-500">
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-primary-700"
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

              {/* CARVE-OUT E3: key takeaways callout. Live on 62/62, list
                  semantics kept. The `post.summary` fallback branch is gone
                  because the summary now renders in the header card above on
                  every post, so the old branch could only ever have duplicated
                  it. */}
              {takeaways ? (
                <section
                  className="tldr not-prose mt-8 rounded-xl border-l-4 border-primary-600 bg-primary-50 p-6"
                  aria-label="Key takeaways"
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-primary-700">
                    Key takeaways
                  </p>
                  <ul className="mt-3 space-y-2">
                    {takeaways.map((t, i) => (
                      <li key={i} className="flex items-start gap-2 text-neutral-700">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary-600 shrink-0" />
                        <span className="text-base leading-relaxed">{t}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {/* CARVE-OUT E13, mobile mount. Default stickyDesktop is
                  irrelevant here (the block it gates is `hidden lg:block`). */}
              <div className="lg:hidden mt-8">
                <TableOfContents headings={headings} />
              </div>

              {/* CARVE-OUT E4: the hero photo and its attribution, moved in-body.
                  Plain <img>, not next/image: the source is an off-domain
                  hotlink, so the optimiser buys nothing and `priority` was
                  making a decorative photo the LCP candidate. */}
              {post.image ? (
                <figure className="mt-10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.image}
                    alt={post.altText || post.title}
                    width={1200}
                    height={630}
                    className="w-full rounded-xl object-cover ring-1 ring-neutral-200/70"
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

              {/* CARVE-OUTS E9, E10, E12, E15. Slot order and slot count are
                  unchanged from the pre-port renderer: three InlineMiniLeadForm
                  positions, one ToolIsland, four PremiumUpgrade slots, body HTML
                  never escaped. */}
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

              {/* The closing ask, given an id, a scroll offset and an accessible
                  name. It had none of the three, so nothing on the page could
                  route to it. Navy panel per DESIGN_SYSTEM 4b; the FAQ and the
                  related list sit after it, so navy never touches the navy
                  footer (0.1). LeadForm's labels are ink, so it sits in a white
                  card rather than bare on navy. */}
              <section
                id="enquiry-form"
                className="mt-16 scroll-mt-24 rounded-xl bg-slate-900 p-8 sm:p-10 text-white"
                aria-labelledby="enquiry-form-heading"
              >
                <h2 id="enquiry-form-heading" className="text-2xl font-bold text-white sm:text-3xl">
                  {niche.blog.cta_heading}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-200">
                  {niche.blog.cta_body}
                </p>
                <div className="mt-8 rounded-xl bg-white p-6 sm:p-8">
                  <LeadForm redirectOnSuccess={false} submitLabel={niche.blog.cta_button} />
                </div>
              </section>

              {/* CARVE-OUT E1. A plain server-rendered <dl>, deliberately NOT an
                  accordion and NOT the kit FaqSection. The kit renders a Radix
                  accordion whose AccordionContent has no `forceMount`, so closed
                  answers are absent from the server HTML while the JSON-LD above
                  asserts them, and it escapes its answer strings. Adopting it
                  here would strip FAQ answer text from all 62 posts and print
                  raw markup as visible literal text on the 3 whose answers carry
                  HTML. The FAQ JSON-LD is built from this same post.faqs array,
                  so page and schema cannot drift. */}
              {post.faqs && post.faqs.length > 0 ? (
                <section className="mt-16" aria-labelledby="faq-heading">
                  <h2 id="faq-heading" className="text-3xl font-bold text-neutral-900 mb-8">
                    Frequently asked questions
                  </h2>
                  <dl className="space-y-4">
                    {post.faqs.map((faq, i) => (
                      <div key={i} className="rounded-xl border-l-4 border-primary-600 bg-neutral-50 p-6">
                        <dt className="text-lg font-bold text-neutral-900">{faq.question}</dt>
                        {/* dangerouslySetInnerHTML moved onto the <dd> itself:
                            3 posts carry block-level markup in an answer, and a
                            <p> nested in a <span> is invalid HTML the browser
                            reflows out of the span. */}
                        <dd
                          className="mt-3 text-base text-neutral-600 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: faq.answer }}
                        />
                      </div>
                    ))}
                  </dl>
                </section>
              ) : null}

              <aside className="mt-16 flex gap-5 items-start rounded-xl bg-neutral-50 p-6 sm:p-8 ring-1 ring-neutral-200/70">
                <div className="hidden sm:flex shrink-0 w-14 h-14 rounded-full bg-primary-50 text-primary-700 items-center justify-center">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-primary-700">About the author</p>
                  <p className="mt-1 text-lg font-bold text-neutral-900">{niche.display_name}</p>
                  <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{niche.description}</p>
                  <Link href="/about" className="mt-3 inline-block text-sm font-semibold text-primary-700 hover:text-primary-800 hover:underline">
                    Learn more about our team
                  </Link>
                </div>
              </aside>

              {/* CARVE-OUT E11. Kept: it emits the locked `next_step` data-cta
                  triple on every post. Retiring it splits live funnel history. */}
              <NextStepOffer />

              {related.length > 0 ? (
                <section className="mt-16" aria-labelledby="related-heading">
                  <h2 id="related-heading" className="text-2xl font-bold text-neutral-900 mb-8">
                    Related articles
                  </h2>
                  {/* Deliberately NOT the kit RelatedArticles. That component
                      carries `focus-visible:outline-none` on its title link and
                      hands the focus ring to a `.related-card:focus-within`
                      rule that lives in globals-standard.css, which this site's
                      globals.css does not import and does not otherwise define.
                      Adopting it here would leave the focus indicator invisible
                      on every related link on the site. Recipe matched by hand
                      instead, with a real focus-visible ring. Gated on the
                      missing CSS: see P2-1_RENDERER.md. */}
                  <ul className="grid gap-4 sm:gap-5 sm:grid-cols-2">
                    {related.map((r) => (
                      <li key={r.slug} className="flex">
                        <Link
                          href={`/blog/${r.categorySlug}/${r.slug}`}
                          className="flex h-full w-full flex-col rounded-xl bg-white p-5 sm:p-6 ring-1 ring-neutral-200/70 transition-colors hover:bg-neutral-50 hover:ring-primary-600/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                        >
                          <span className="mb-2.5 inline-flex w-fit items-center gap-1.5 rounded-full bg-neutral-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-600">
                            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-primary-600" />
                            Article
                          </span>
                          <span className="text-base font-bold leading-snug text-neutral-900 sm:text-lg">{r.title}</span>
                          <span className="mt-2.5 text-sm leading-6 text-neutral-600 line-clamp-3">{r.summary}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </div>

            {/* CARVE-OUT E13, desktop mount. The host owns the single viewport
                clamp and `stickyDesktop={false}` turns the component's own off:
                two clamps in one column gives a scroll box inside a shorter
                scroll box, and dropping the outer one instead makes the inner
                `sticky` inert. The host is the one that must own it, because
                P2-4 adds the sidebar CTA card into this same column. */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 max-h-[calc(100vh-7rem)] space-y-5 overflow-y-auto">
                <TableOfContents headings={headings} stickyDesktop={false} />
              </div>
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}
