import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { niche } from "@/config/niche-loader";
import { buildOgImageUrl, buildBlogPostingJsonLd, buildHowToJsonLd } from "@/lib/schema";
import {
  getAllPosts,
  getPostByCategoryAndSlug,
  getCategorySlug,
  getRelatedPosts,
  calculateReadTime,
} from "@/lib/blog";
import { extractHeadings } from "@/lib/markdown-utils";
import { LeadForm } from "@/components/forms/LeadForm";
import { InlineMiniLeadForm } from "@/components/blog/InlineMiniLeadForm";
import HospitalityBackdrop from "@/components/layout/HospitalityBackdrop";
import { FaqSection } from "@accounting-network/web-shared/design/primitives/FaqSection";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { ReadingProgress } from "@accounting-network/web-shared/design/blog/ReadingProgress";
import { TableOfContents } from "@accounting-network/web-shared/design/blog/TableOfContents";
import { RelatedArticles } from "@accounting-network/web-shared/design/blog/RelatedArticles";
import { BlogSidebarCta } from "@accounting-network/web-shared/design/blog/BlogSidebarCta";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { siteContainerLg, focusRing } from "@/components/ui/layout-utils";

type Props = { params: Promise<{ category: string; slug: string }> };

/**
 * Focus ring for links inside AUTHORED HTML (the post body and three of the
 * FAQ answers). Those anchors come out of `dangerouslySetInnerHTML`, so no
 * className can reach them; the only handle is a descendant variant on the
 * wrapper. Same width, offset and `var(--focus-ring)` token as the shared
 * `focusRing`, one variant deeper, so the census grep
 * `outline-\[var\(--focus-ring\)\]` still finds every ring on the site.
 *
 * It lives HERE and not in src/components/ui/layout-utils.ts only because that
 * file is P1-B's and is off limits to this package. The sibling site keeps the
 * same string as `focusRingAuthoredLinks` in its own layout-utils
 * (ecommerce/web/src/components/ui/layout-utils.ts:129); hoisting this copy
 * there is a mop-up item.
 */
const focusRingAuthoredLinks =
  "[&_a]:focus-visible:outline [&_a]:focus-visible:outline-2 [&_a]:focus-visible:outline-offset-2 [&_a]:focus-visible:outline-[var(--focus-ring)]";

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

// LEADS_250 §13 S2: mount InlineMiniLeadForm after the SECOND h2 of the body.
// No existing helper in this repo splits at the second h2 specifically
// (packages/web-shared/content/blog-splits.ts targets the first h2 or a
// fraction of remaining headings), so this is the minimal regex needed;
// nothing else in the body HTML is touched.
function splitAtSecondH2(html: string): { before: string; after: string } {
  const matches = [...html.matchAll(/<h2[^>]*>/g)];
  if (matches.length < 2) return { before: html, after: "" };
  const cut = matches[1].index!;
  return { before: html.slice(0, cut), after: html.slice(cut) };
}

/*
 * KIT ADOPTION LEDGER FOR THIS ROUTE (playbook gate 9.1).
 *
 * ADOPTED: Breadcrumb, ReadingProgress, TableOfContents, RelatedArticles,
 * BlogSidebarCta, LeadCTAPanel, and FaqSection (already mounted in phase 0
 * with `html alwaysRenderAnswers`, kept exactly as it was).
 *
 * DECLINED: every kit prose component that takes `post.contentHtml` as a text
 * child. The body is authored HTML rendered with dangerouslySetInnerHTML
 * (memory `blog_page_rendering_html_in_frontmatter`, owner ruling 11). This is
 * not a kit gap and never will be. The four components that DO carry an `html`
 * prop are not applicable here: the body is one continuous document, not a
 * card stack, coverage grid, timeline or Q&A list.
 *
 * DECLINED: packages/web-shared/design/primitives/page-blocks.tsx `Eyebrow`.
 * Section-label component (page-blocks.tsx:40-55). The only label-shaped
 * strings on this route are the element headings "Key takeaways" and "Common
 * questions"; converting either to an Eyebrow `<p>` removes it from the
 * document outline and, in the first case, strips the `<aside>` of its only
 * heading. Owner ruling 4 routes any NEW label to
 * hospitality/niche.config.json, which the manager owns.
 */
export default async function BlogPostPage({ params }: Props) {
  const { category, slug } = await params;
  const post = getPostByCategoryAndSlug(category, slug);
  if (!post) notFound();

  const postUrl = `/blog/${category}/${post.slug}`;
  const bodySplit = splitAtSecondH2(post.contentHtml);
  // `addHeadingIds` already runs inside lib/blog.ts:28, so every h2/h3 in
  // contentHtml carries an id before it reaches here and extractHeadings can
  // read them back. The ids are the TOC's jump targets; the `scroll-mt-24`
  // that stops the sticky header covering them is on the <article> below, as
  // a descendant variant, because the headings themselves are authored HTML.
  const headings = extractHeadings(post.contentHtml);
  const related = getRelatedPosts(post.slug, post.category, 3).map((p) => ({
    href: `/blog/${getCategorySlug(p)}/${p.slug}`,
    title: p.title,
    excerpt: p.metaDescription,
  }));

  return (
    <>
      <div
        className={`${siteContainerLg} py-16 lg:grid lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-start lg:gap-12`}
      >
        {/* Kit ReadingProgress now takes `className`, appended last so it can
            move the bar off `top-0` (1437cb9e). SiteHeader's sticky bar is
            `sm:min-h-16` (chrome/SiteHeader.tsx:454), so `top-16` clears it at
            sm+; below that the header runs `min-h-[3.25rem]` (52px) and the
            bar sits slightly under the header's true edge rather than exactly
            flush, a few px, not a repeat of the old full overlap. */}
        <ReadingProgress className="top-16" />
        <div className="max-w-3xl lg:order-1">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: buildBlogPostingJsonLd(
                {
                  h1: post.h1,
                  metaDescription: post.metaDescription,
                  image: post.image,
                  date: post.date,
                  updatedDate: post.updatedDate,
                  category: post.category,
                },
                postUrl,
              ),
            }}
          />
          {/* The hand-rolled buildPageBreadcrumbJsonLd block that stood here is
              GONE, deliberately: the kit Breadcrumb below emits its own
              BreadcrumbList from the same crumb array, through the same
              packages/web-shared/schema/breadcrumb.ts builder that
              lib/schema.ts:157-159 was already delegating to. Keeping both
              would put TWO BreadcrumbList blocks on every post URL. The crumb
              labels are unchanged, `post.h1` included, so the emitted JSON is
              the same graph it was before. */}
          {post.faqs && post.faqs.length > 0 && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: post.faqs.map((faq) => ({
                  "@type": "Question",
                  name: faq.question,
                  acceptedAnswer: { "@type": "Answer", text: faq.answer.replace(/<[^>]+>/g, "") },
                })),
              }) }}
            />
          )}
          {post.howToSteps && post.howToSteps.length > 0 && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: buildHowToJsonLd(post) }}
            />
          )}
          {post.schema && (
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: post.schema }} />
          )}
          <Breadcrumb
            siteUrl={siteConfig.url}
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: post.category, href: `/blog/${category}` },
              { label: post.h1 },
            ]}
          />
          {/* R3-G1: the visible h1 and BlogPosting.headline read the SAME field,
              post.h1, and there is no second source for either. */}
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {post.h1}
          </h1>
          <p className="mt-3 text-sm text-slate-500">
            {new Date(post.updatedDate || post.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}{" "}
            · {calculateReadTime(post.contentHtml)} min read
          </p>
          {/* Skip-to-form anchor, absent until now. The label is
              `niche.blog.cta_button`, the exact string the closing panel's
              submit button already renders, so nothing is authored. data-cta
              is on the ANCHOR, the control itself, never a wrapper (R5 B2). */}
          <a
            href="#enquiry-form"
            data-cta="blog_skip_to_form"
            data-cta-placement="article_header"
            data-cta-goal="form"
            className={`mt-4 inline-flex min-h-12 items-center text-sm font-semibold text-primary-700 hover:text-primary-800 ${focusRing}`}
          >
            {niche.blog.cta_button}
          </a>
          {post.keyTakeaways && post.keyTakeaways.length > 0 && (
            <aside className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-sm font-semibold text-slate-900">Key takeaways</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                {post.keyTakeaways.map((kt) => (
                  <li key={kt}>{kt}</li>
                ))}
              </ul>
            </aside>
          )}
          {/* Mobile TOC. Kit now takes `stickyMobile` (1437cb9e); its parent
              here is only as tall as itself so the old hardcoded
              `sticky top-16` could never pin, so it is turned off at the
              prop rather than fought with a host override. */}
          <div className="mt-8 lg:hidden">
            <TableOfContents headings={headings} stickyMobile={false} />
          </div>
          <article
            className={`prose prose-slate mt-10 max-w-none [&_h2]:scroll-mt-24 [&_h3]:scroll-mt-24 ${focusRingAuthoredLinks}`}
          >
            <div dangerouslySetInnerHTML={{ __html: bodySplit.before }} />
            {bodySplit.after ? (
              <>
                <InlineMiniLeadForm topic={post.category} />
                <div dangerouslySetInnerHTML={{ __html: bodySplit.after }} />
              </>
            ) : null}
          </article>
          {/* F2 fix 4: post.faqs was asserted in FAQPage JSON-LD above but never
              rendered, so the schema claimed 210 of 214 answers that were
              invisible on the page. Same questions/answers, same data, rendered
              with the kit accordion so the server HTML carries what the schema
              asserts. alwaysRenderAnswers keeps every answer in the server HTML
              (not just the open one) so the two never disagree. Heading matches
              the "Common questions" convention used on /services/[slug].
              KEPT EXACTLY AS PHASE 0 SHIPPED IT; `html` and `alwaysRenderAnswers`
              both stay. The only addition is the authored-link ring wrapper,
              because three posts carry <a> inside an FAQ answer. */}
          {post.faqs && post.faqs.length > 0 && (
            <div className={`mt-12 border-t border-slate-200 pt-8 ${focusRingAuthoredLinks}`}>
              <FaqSection
                eyebrow=""
                title="Common questions"
                faqs={post.faqs}
                html
                alwaysRenderAnswers
                className="pt-8"
              />
            </div>
          )}
          {related.length > 0 && (
            /* Related rail. Kit RelatedArticles takes no heading prop
               (RelatedArticles.tsx:72-81: items/columns/className only), so
               the heading is the site's own <h2>, styled like the "Key
               takeaways" heading above, fed niche.blog.related_heading
               (M1a item 3). `excerpt` is post.metaDescription, the string the
               /blog index already publishes for the same post; the kit's
               preferred firstSentence() excerpt has no helper on this site and
               adding one would be a lib change with a single consumer. */
            <div className="mt-12 border-t border-slate-200 pt-8">
              <h2 className="text-sm font-semibold text-slate-900">{niche.blog.related_heading}</h2>
              <div className="mt-4">
                <RelatedArticles items={related} />
              </div>
            </div>
          )}
        </div>
        {/* T32, ONE clamp, and it is HERE, on the direct child of the tall
            column, not on the component. packages/web-shared/design/blog/
            TableOfContents.tsx:80-82 says so in its own docstring: this family
            expects the HOST to own `sticky` plus the viewport clamp, and it
            carries neither itself. Two clamps would give a scroll box inside a
            shorter scroll box; no clamp would give an element that sticks for
            one screen and then scrolls away. Arrangement built: HOST-CLAMPED. */}
        <aside className="hidden lg:order-2 lg:block lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
          <TableOfContents headings={headings} />
          {/* BlogSidebarCta, absent until now. `copy` is the one blog CTA triple
              already published in hospitality/niche.config.json, the same
              heading and body the closing panel below renders, so nothing is
              authored. Its own hardcoded `#enquiry-form` target is the id on
              that panel's wrapper. It emits its own data-cta on its anchor
              (BlogSidebarCta.tsx:56-58); nothing is added on this wrapper.

              `.ground-dark` IS on this wrapper: the card paints bg-slate-900
              (BlogSidebarCta.tsx:60) and its button is a focusable control ON
              that dark ground, so the ring rebinds to white
              (globals.css:202-215). Measured: white on slate-900 is 17.85,
              past the 3:1 graphic floor with room; the brand 600 ring it
              replaces measures 3.51 there.

              `buttonClassName` points the button at the same --btn-ground trio
              every other button on this site uses, rather than the kit default
              literal `bg-primary-600`. Identical paint today (the brand hex is the
              600 step, globals.css:78) and it cannot drift from the site's
              buttons later. White label on the brand 600 step is 5.09, text floor PASS.

              KIT GAP, LOGGED: BlogSidebarCta.tsx:66-68 hardcodes "Free, no
              obligation. The form is just below." with no prop to suppress it.
              Adopted as-is: this site already publishes "no obligation" on
              /book:36, in CalcResultCta.tsx:12 and in both existing
              LeadCTAPanel descriptions, so the sentence introduces no new
              claim here. */}
          <div className="ground-dark mt-6">
            <BlogSidebarCta
              copy={{ heading: niche.blog.cta_heading, body: niche.blog.cta_body }}
              buttonLabel={niche.blog.cta_button}
              buttonClassName="bg-[var(--btn-ground,var(--color-primary-600))] text-white hover:bg-[var(--btn-ground-hover,var(--color-primary-700))] active:bg-[var(--btn-ground-active,var(--color-primary-800))]"
            />
          </div>
        </aside>
      </div>
      {/* The closing capture surface. It was a hand-rolled bordered box with
          these same two sentences; they are now the panel's `title` and
          `description`, byte for byte, read from the config keys that already
          held them. The id and scroll-mt-24 are on this wrapper because
          LeadCTAPanel exposes no id prop, and both the skip-to-form anchor
          above and BlogSidebarCta's hardcoded `#enquiry-form` land on it.

          `eyebrow=""` and `formTitle=""`: the kit defaults are a FEE CLAIM
          ("Free first call, then a fixed fee in writing", LeadCTAPanel.tsx:18)
          and "Book your free first call" (:26). This site publishes neither
          (owner ruling 16; R3-G6 on startups-tech was this exact default
          reaching 14 pages).

          NO `.ground-dark` on this mount, and that is the measured answer, not
          an oversight. The navy variant paints bg-slate-900, but with
          `proofPoints={[]}` and no footnote there is NO focusable element on
          the dark ground at all: every control lives inside the white form
          card (LeadCTAPanel.tsx:184). Custom properties inherit, so wrapping
          this would rebind --focus-ring to white INSIDE that white card and
          erase the ring on every field of the lead form - the exact case
          globals.css:211-213 warns against.

          NO data-cta on this wrapper (R5 B2): autoCapture resolves clicks via
          closest("[data-cta]"), so an id here would claim every field focus
          and link click inside the panel. The LeadForm submits with the
          site-wide form id plus source_url, so this panel is attributed by
          page, like every other LeadCTAPanel on the site.

          `backdrop` is the site motif, mounted not edited, on bg-slate-900 -
          the ground its contrast row was already written for (it is what the
          kit footer paints it on today).

          The form takes NO `submitLabel`: this form existed before this package
          and its button published the LeadForm default, "Send enquiry".
          Passing niche.blog.cta_button here would REWRITE that live label on 23
          routes, and existing copy is never rewritten. The two NEW mounts on
          /blog and /blog/[category] do pass it, because no label existed there
          to preserve. */}
      <div id="enquiry-form" className="scroll-mt-24">
        <LeadCTAPanel
          eyebrow=""
          title={niche.blog.cta_heading}
          description={niche.blog.cta_body}
          proofPoints={[]}
          formTitle=""
          form={<LeadForm redirectOnSuccess={false} />}
          backdrop={<HospitalityBackdrop patternId="hospitality-table-setting-blog-cta" />}
        />
      </div>
    </>
  );
}
