import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CalendarDays, Clock, History } from "lucide-react";
import { siteConfig } from "@/config/site";
import { buildOgImageUrl, buildArticleJsonLd, buildFaqJsonLd, buildHowToJsonLd } from "@/lib/schema";
import { siteContainerLg, btnPrimary } from "@/components/ui/layout-utils";
import {
  getAllPosts,
  getPostByCategoryAndSlug,
  getCategorySlug,
  getRelatedPosts,
  calculateReadTime,
} from "@/lib/blog";
import { extractHeadings } from "@/lib/markdown-utils";
import { BLOG_CTA } from "@/components/blog/blog-cta";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { ReadingProgress } from "@accounting-network/web-shared/design/blog/ReadingProgress";
import { TableOfContents } from "@accounting-network/web-shared/design/blog/TableOfContents";
import { BlogSidebarCta } from "@accounting-network/web-shared/design/blog/BlogSidebarCta";
import { RelatedArticles } from "@accounting-network/web-shared/design/blog/RelatedArticles";

type Props = { params: Promise<{ category: string; slug: string }> };

// ISR-safe (Property's shipped fix, vercel_blog_fallback_size_limit):
// dynamicParams=false + full generateStaticParams means no ISR fallback shell
// is ever generated, keeping the deployment under Vercel's fallback size limit.
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

function formatUkDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogPostPage({ params }: Props) {
  const { category, slug } = await params;
  const post = getPostByCategoryAndSlug(category, slug);
  if (!post) notFound();

  const articleSchema = buildArticleJsonLd({
    title: post.h1,
    description: post.metaDescription,
    url: `/blog/${category}/${post.slug}`,
    datePublished: post.date,
    dateModified: post.updatedDate ?? post.date,
  });
  // FAQPage markup must match what the page shows (Google structured-data policy).
  // Some posts already carry their Q&A inside the body HTML; anything that does not
  // is rendered below, in the server HTML, so nothing is asserted to crawlers only.
  //
  // Deliberately a <dl>, NOT the kit FaqSection. That component is a Radix
  // accordion with no forceMount, so every closed answer is absent from the
  // server HTML while the FAQPage JSON-LD still asserts it: the exact
  // schema-vs-page mismatch this block exists to close. Do not convert it.
  const bodyText = post.contentHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").toLowerCase();
  const unrenderedFaqs = (post.faqs ?? []).filter(
    (f) => !bodyText.includes(f.question.replace(/\s+/g, " ").toLowerCase()),
  );
  const faqSchema = post.faqs?.length ? buildFaqJsonLd(post.faqs) : null;
  const howToSchema = post.howToSteps?.length
    ? buildHowToJsonLd({ name: post.h1, description: post.metaDescription, steps: post.howToSteps })
    : null;

  // post.schema comes straight from frontmatter, where YAML parses a nested block
  // into an object rather than a string. Serialise whatever shape arrives so the
  // script tag never receives "[object Object]", and supply @context when the
  // frontmatter mapping omits it.
  //
  // Three posts carry an `@type: Article` block in that frontmatter. The
  // template already emits an Article node (`articleSchema`, strictly richer:
  // it also carries dateModified, url, image and the publisher), so emitting
  // the frontmatter one as well published two Article nodes and, via its
  // `author: Organization`, a second Organization node. Drop any frontmatter
  // node whose @type the template already emits; anything else still ships.
  const rawSchema: unknown = post.schema;
  const schemaObj =
    rawSchema && typeof rawSchema === "object" ? (rawSchema as Record<string, unknown>) : null;
  const duplicatesTemplateNode =
    schemaObj?.["@type"] === "Article" ||
    (faqSchema && schemaObj?.["@type"] === "FAQPage") ||
    (howToSchema && schemaObj?.["@type"] === "HowTo");
  const extraSchema =
    typeof rawSchema === "string"
      ? rawSchema
      : schemaObj && !duplicatesTemplateNode
        ? JSON.stringify({ "@context": "https://schema.org", ...schemaObj })
        : null;

  const headings = extractHeadings(post.contentHtml);
  const readTime = calculateReadTime(post.contentHtml);
  const hasUpdate = !!(post.updatedDate && post.updatedDate !== post.date);
  const related = getRelatedPosts(post.slug, post.category, 3).map((r) => ({
    href: `/blog/${getCategorySlug(r)}/${r.slug}`,
    title: r.title,
    excerpt: r.summary || undefined,
  }));

  return (
    <div className="bg-white py-12 sm:py-16">
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleSchema }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />}
      {howToSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: howToSchema }} />}
      {extraSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: extraSchema }} />
      )}

      <div className={siteContainerLg}>
        <div className="mx-auto max-w-4xl lg:grid lg:max-w-7xl lg:grid-cols-[1fr_260px] lg:gap-12">
          <article className="min-w-0 max-w-4xl">
            <Breadcrumb
              siteUrl={siteConfig.url}
              items={[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: post.category, href: `/blog/${category}` },
                { label: post.title },
              ]}
            />

            <header className="mt-6 rounded-xl bg-slate-50 p-6 sm:p-8">
              <Eyebrow>{post.category}</Eyebrow>
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                {post.h1}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-2">
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
                {hasUpdate && (
                  <span className="inline-flex min-h-7 items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700 ring-1 ring-primary-100">
                    <History aria-hidden className="h-3.5 w-3.5" />
                    Updated{" "}
                    <time dateTime={post.updatedDate}>{formatUkDate(post.updatedDate!)}</time>
                  </span>
                )}
                <span className={metaPill}>
                  <Clock aria-hidden className="h-3.5 w-3.5 text-primary-600" />
                  {readTime} min read
                </span>
              </div>
              {post.summary && (
                <p className="mt-5 text-base leading-7 text-slate-600">{post.summary}</p>
              )}
            </header>

            {/* Mobile contents. The same component renders the desktop card in
                the sidebar; each half is hidden at the other's breakpoint. */}
            <div className="mt-8 lg:hidden">
              <TableOfContents headings={headings} />
            </div>

            {post.keyTakeaways && post.keyTakeaways.length > 0 && (
              <aside
                className="mt-8 rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70"
                aria-label="Key takeaways"
              >
                <Eyebrow>Key takeaways</Eyebrow>
                {/* List semantics kept: this is a <ul> of <li>, not styled divs. */}
                <ul className="space-y-2">
                  {post.keyTakeaways.map((kt) => (
                    <li key={kt} className="flex items-start gap-2">
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-600"
                      />
                      <span className="text-base leading-relaxed text-slate-800">{kt}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            )}

            {/* Blog bodies are raw HTML in the markdown body (estate convention),
                never escaped. .prose rules ship from
                packages/site-styles/prose-standard.css via globals.css:6 and are
                NOT duplicated here. */}
            <div
              className="prose prose-neutral mt-10 max-w-none"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />

            {unrenderedFaqs.length > 0 && (
              <section className="mt-12 border-t border-slate-200 pt-8" aria-labelledby="faq-heading">
                <h2
                  id="faq-heading"
                  className="text-2xl font-bold tracking-tight text-slate-900"
                >
                  Frequently asked questions
                </h2>
                <dl className="mt-6 space-y-6">
                  {unrenderedFaqs.map((faq) => (
                    <div key={faq.question} className="rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200/70">
                      <dt className="text-base font-bold text-slate-900">{faq.question}</dt>
                      <dd className="mt-2 text-sm leading-relaxed text-slate-700">{faq.answer}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            {/* The sidebar card's button targets this id. It is the SAME single
                ask this page has always carried, a link to /contact: the set of
                lead-capture surfaces on the blog is unchanged by the port
                (adding one is an owner gate, PHASE_PLAN.md §7). */}
            <section
              id="enquiry-form"
              className="mt-12 scroll-mt-24 rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70 sm:p-8"
              aria-labelledby="enquiry-form-heading"
            >
              {/* Light ground, not the sidebar card's slate-900: btnPrimary's
                  ground IS #1a5c4a, which on slate-900 reads as one dark shape
                  on another. On slate-50 the button separates from the panel. */}
              <h2 id="enquiry-form-heading" className="text-xl font-bold text-slate-900 sm:text-2xl">
                {BLOG_CTA.heading}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">{BLOG_CTA.body}</p>
              <Link
                href="/contact"
                data-cta="blog_article_contact"
                data-cta-placement="article_footer"
                data-cta-goal="contact"
                className={`mt-6 ${btnPrimary}`}
              >
                {BLOG_CTA.button}
              </Link>
            </section>

            {related.length > 0 && (
              <section className="mt-12" aria-labelledby="related-heading">
                <h2
                  id="related-heading"
                  className="mb-6 text-2xl font-bold tracking-tight text-slate-900"
                >
                  Related articles
                </h2>
                <RelatedArticles items={related} />
              </section>
            )}
          </article>

          {/* One sticky container owns the viewport clamp for the card and the
              contents list together. The kit TableOfContents deliberately holds
              no sticky/clamp of its own (design/blog/TableOfContents.tsx:85-87),
              so there is exactly one clamp in this column, not two. */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] space-y-5 overflow-y-auto">
              <BlogSidebarCta
                copy={{ heading: BLOG_CTA.heading, body: BLOG_CTA.body }}
                buttonLabel={BLOG_CTA.button}
                ctaPlacement="blog_sidebar"
              />
              <TableOfContents headings={headings} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
