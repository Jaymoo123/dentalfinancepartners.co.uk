import Link from "next/link";
import Image from "next/image";
import { CalendarDays, Clock, History, UserRound } from "lucide-react";
import type { BlogPost } from "@/types/blog";
import { LeadForm } from "@/components/forms/LeadForm";
import { buildBlogPostingJsonLd } from "@/lib/schema";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { niche } from "@/config/niche-loader";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { BlogSidebarCta } from "@accounting-network/web-shared/design/blog/BlogSidebarCta";
import { RelatedArticles } from "@accounting-network/web-shared/design/blog/RelatedArticles";
import { MedicalBackdrop } from "@/components/layout/MedicalBackdrop";
import { blogCtaFor } from "@/lib/blog-cta";
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

/**
 * The site's button ground is the Phase 1 copper step, not the kit card's
 * default `primary-600`. Without this the sidebar card shows a second, visibly
 * different brand colour from every other button on the page.
 */
const SIDEBAR_BUTTON =
  "bg-[var(--btn-ground)] text-white hover:bg-[var(--btn-ground-hover)] active:bg-[var(--btn-ground-active)]";

const metaPill =
  "inline-flex min-h-7 items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200";

const cardShell = "rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70";

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
 * TopicOverrideProvider, so all intent surfaces (StickyCTA, DeepScrollModal,
 * NextStepOffer, InlineMiniLeadForm) receive the correct topic without relying
 * on the URL.
 *
 * WS8 surface: keyTakeaways / updatedDate / sourcesVerifiedAt are rendered when
 * present and tolerate absence gracefully. All 88 posts carry keyTakeaways and
 * faqs today; the null branches stay because nothing enforces that.
 *
 * Hero: there is none. post.image renders in-body as a bounded next/image with
 * no `priority`, because it sits below the fold on every one of the 88 posts.
 */
export function BlogPostRenderer({ post, categorySlug, related = [] }: BlogPostRendererProps) {
  const headings = extractHeadings(post.contentHtml);
  const readTime = calculateReadTime(post.contentHtml);
  // The `post.schema` bypass: no post ships a non-empty schema today, and
  // src/tests/blog-cta.test.ts fails if one ever ships one alongside faqs,
  // which would render the <dl> while emitting a different FAQPage.
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

  // One entry feeds the #enquiry-form panel and the sidebar card, so the two
  // cannot drift. Falls back to the active cta variant for an unmapped slug.
  const ctaCopy = blogCtaFor(categorySlug);

  const takeaways =
    post.keyTakeaways && post.keyTakeaways.length > 0 ? post.keyTakeaways : null;
  const showUpdated = !!(post.updatedDate && post.updatedDate !== post.date);
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
            <div>
              {/* The local Breadcrumb, not the kit one: this component emits the
                  page's only BreadcrumbList and the kit one would emit a second.
                  The category crumb is the flat-routing adaptation, and it is
                  the one unique internal link every post gains. */}
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
                {/* Meta as pills rather than a dot-separated run: each fact reads
                    at a glance, and "Updated" takes the brand tint because
                    recency is the one that earns trust on tax content. */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {post.date ? (
                    <span className={metaPill}>
                      <CalendarDays aria-hidden className="h-3.5 w-3.5 text-[var(--copper-strong)]" />
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
                    <span className="inline-flex min-h-7 items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-[var(--copper-strong)] ring-1 ring-amber-100">
                      <History aria-hidden className="h-3.5 w-3.5" />
                      Updated{" "}
                      <time dateTime={post.updatedDate}>{formatUkDate(post.updatedDate!)}</time>
                    </span>
                  ) : null}
                  {post.author ? (
                    <span className={metaPill}>
                      <UserRound aria-hidden className="h-3.5 w-3.5 text-[var(--copper-strong)]" />
                      {post.author}
                    </span>
                  ) : null}
                  {readTime > 0 ? (
                    <span className={metaPill}>
                      <Clock aria-hidden className="h-3.5 w-3.5 text-[var(--copper-strong)]" />
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
                    data-cta-placement="blog_header"
                    data-cta-goal="form"
                    className="inline-flex items-center gap-2 py-0.5 text-sm font-semibold text-[var(--copper-strong)] underline underline-offset-4 hover:text-[var(--btn-ground-hover)]"
                  >
                    Skip to enquiry form ↓
                  </a>
                </div>
              </header>

              {/* A verification mark, not a warning: slate notice, slate tick.
                  Owner decision 1 moved warning semantics off copper entirely. */}
              {verified ? (
                <p className="mt-4 flex items-start gap-2 rounded-xl bg-slate-50 p-4 text-xs leading-relaxed text-slate-600 ring-1 ring-slate-200/70">
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-slate-500"
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

              <div className="lg:hidden mt-8">
                <TableOfContents headings={headings} />
              </div>

              {post.image ? (
                <div className="mt-10 w-full overflow-hidden rounded-xl ring-1 ring-slate-200/70">
                  <Image
                    src={post.image}
                    alt={post.altText || post.title}
                    width={1200}
                    height={630}
                    className="w-full object-cover"
                  />
                </div>
              ) : null}

              {/* WS8 key takeaways, also the GEO answer surface (#answer-box).
                  All 88 posts carry them; the null branch stays because the
                  frontmatter does not enforce it. */}
              {takeaways ? (
                <section
                  id="answer-box"
                  className={`not-prose mt-8 ${cardShell}`}
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
                    {/* Mid-article qualified lead capture (specialist-firm review, medical voice). */}
                    <MiniCapture
                      formId="blog_mid_resource"
                      messagePrefix={`[Blog mid: ${categorySlug}] `}
                      heading="Get this read by a specialist firm"
                      blurb="Tell us about your situation and we will match it to a regulated firm that works with doctors. A medical accountant there reviews your position and confirms the next sensible step. Enquiring commits you to nothing."
                      submitLabel="Request a specialist review"
                      className={`my-10 ${cardShell} sm:p-8`}
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
                      heading="Get this read by a specialist firm"
                      blurb="Tell us about your situation and we will match it to a regulated firm that works with doctors. A medical accountant there reviews your position and confirms the next sensible step. Enquiring commits you to nothing."
                      submitLabel="Request a specialist review"
                      className={`my-10 ${cardShell} sm:p-8`}
                    />
                  </>
                )}
              </div>

              {/* Personalised and null for most readers. It sits ABOVE the FAQ
                  so it can never stand immediately in front of the enquiry
                  form. Its `next_step` id, placement and thresholds are
                  untouched. */}
              <NextStepOffer />

              {post.faqs && post.faqs.length > 0 ? (
                <section className="mt-16" aria-labelledby="faq-heading">
                  <h2 id="faq-heading" className="text-2xl font-bold text-slate-900 sm:text-4xl mb-8">
                    Frequently asked questions
                  </h2>
                  {/* Deliberately a plain <dl>, not the kit FaqSection: that is a
                      Radix accordion whose closed answers are absent from the
                      pre-hydration HTML, and all 88 posts server-render every
                      answer today. One array feeds this and the FAQPage JSON-LD. */}
                  <dl className="space-y-4">
                    {post.faqs.map((faq, i) => (
                      <div key={i} className={cardShell}>
                        <dt className="text-base font-bold text-slate-900 sm:text-lg">{faq.question}</dt>
                        <dd className="mt-3 text-base leading-relaxed text-slate-700">{faq.answer}</dd>
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
                <MedicalBackdrop tone="navy" />
                <div className="relative z-10">
                  <h2 id="enquiry-form-heading" className="text-2xl font-bold text-white sm:text-3xl">
                    {ctaCopy.heading}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-slate-200">{ctaCopy.body}</p>
                  {/* LeadForm's labels and consent copy are ink (navy) by design,
                      so the form sits on a white card, never on the navy ground.
                      This is the structural fix; the `onDark` colour override
                      Phase 1 added here is gone with it, so there is one fix and
                      not two stacked. */}
                  <div className="mt-8 rounded-xl bg-white p-6 sm:p-8">
                    <LeadForm redirectOnSuccess={false} submitLabel={ctaCopy.button} />
                  </div>
                </div>
              </section>

              <aside className="mt-16 flex items-start gap-5 rounded-xl bg-[var(--surface)] p-6 ring-1 ring-slate-200/70 sm:p-8">
                {/* `hidden sm:flex`, not `hidden sm:block ... flex`: the old stack
                    set display:block and then display:flex on one element, so the
                    icon was never centred at any width. */}
                <div className="hidden sm:flex shrink-0 w-14 h-14 rounded-full bg-[var(--copper)]/10 text-[var(--copper-strong)] items-center justify-center">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <Eyebrow>About the author</Eyebrow>
                  <p className="text-lg font-bold text-slate-900">{niche.display_name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{niche.description}</p>
                  <Link
                    href="/about"
                    className="mt-3 inline-block py-0.5 text-sm font-semibold text-[var(--copper-strong)] hover:text-[var(--btn-ground-hover)]"
                  >
                    More about how we work →
                  </Link>
                </div>
              </aside>

              {related.length > 0 ? (
                <section className="mt-16" aria-labelledby="related-heading">
                  <h2 id="related-heading" className="text-2xl font-bold text-slate-900 mb-8">
                    Related articles
                  </h2>
                  {/* FLAT-PATH ADAPTATION: hrefs are built here as /blog/<slug>,
                      and `kind` is passed explicitly because the kit derives its
                      pill from the path shape and reads a one-segment /blog/x as
                      a category hub ("Guide"). Here it is a post. */}
                  <RelatedArticles
                    items={related.map((r) => ({
                      href: `/blog/${r.slug}`,
                      title: r.title,
                      excerpt: r.summary,
                      kind: "article" as const,
                    }))}
                  />
                </section>
              ) : null}
            </div>

            <aside className="hidden lg:block">
              {/* ONE clamp for the whole column, and it lives here.
                  The sticky element has to be a direct child of the tall aside,
                  or its containing block is a short static div and it sticks for
                  a couple of hundred pixels then scrolls away. TableOfContents
                  therefore ships with `stickyDesktop={false}`: two clamps in one
                  column give either nested scrollbars or, if the outer one is
                  removed, a contents list running below the fold with nothing
                  able to scroll to it. Both were measured on a 24,594px article
                  at 1440x900 before this settled. */}
              <div className="sticky top-24 max-h-[calc(100vh-7rem)] space-y-5 overflow-y-auto">
                <BlogSidebarCta
                  copy={ctaCopy}
                  buttonClassName={SIDEBAR_BUTTON}
                  // spec C.1 binds this placement; the kit default is "sidebar"
                  ctaPlacement="blog_sidebar"
                  buttonLabel={ctaCopy.button}
                />
                <TableOfContents headings={headings} stickyDesktop={false} />
              </div>
            </aside>
          </div>
        </div>
      </article>
    </TopicOverrideProvider>
  );
}
