import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { niche } from "@/config/niche-loader";
import { buildOgImageUrl, buildHowToJsonLd, buildFaqJsonLd, buildBlogPostingJsonLd } from "@/lib/schema";
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
import { NextStepOffer } from "@/components/intent/NextStepOffer";
import { siteContainerLg, focusRing } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { ReadingProgress } from "@accounting-network/web-shared/design/blog/ReadingProgress";
import { TableOfContents } from "@accounting-network/web-shared/design/blog/TableOfContents";
import { RelatedArticles } from "@accounting-network/web-shared/design/blog/RelatedArticles";
import { BlogSidebarCta } from "@accounting-network/web-shared/design/blog/BlogSidebarCta";
import { FaqSection } from "@accounting-network/web-shared/design/primitives/FaqSection";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";

type Props = { params: Promise<{ category: string; slug: string }> };

/**
 * Focus ring for links inside AUTHORED HTML (the post body, the key-takeaway
 * list items and the FAQ answers). Those anchors come out of
 * `dangerouslySetInnerHTML`, so no className reaches them; the only handle is a
 * descendant variant on the wrapper. Same width, offset and
 * `var(--focus-ring)` token as `focusRing` in
 * `src/components/ui/layout-utils.ts`, one variant deeper, so the census grep
 * `outline-\[var\(--focus-ring\)\]` still finds every ring on the site.
 *
 * It lives here rather than in layout-utils because that file is phase 1's and
 * off limits to this package. Hoisting it belongs to the mop-up.
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
 * DECLINED, at this call site, naming the kit file:
 *
 * Any kit prose component that would take `post.contentHtml` as a text CHILD
 * (for example packages/web-shared/design/primitives/page-blocks.tsx `Prose`).
 * The body is raw authored HTML (memory `blog_page_rendering_html_in_frontmatter`),
 * so a text child renders escaped tags on all 22 posts. The body stays
 * `dangerouslySetInnerHTML` inside `<article className="prose">`. This is not a
 * kit gap and never will be.
 *
 * REPORTED, not fixed (kit-owned, brief rule: report a collision, do not edit
 * the kit): packages/web-shared/design/blog/ReadingProgress.tsx:36 is
 * `fixed top-0 ... z-50`, and the kit header is `sticky top-0 z-40`
 * (packages/web-shared/design/chrome/SiteHeader.tsx:449). The 4px bar therefore
 * paints over the header's top edge rather than under it. The component takes a
 * `className` appended last, but `z-50 ... z-30` in one class attribute is two
 * same-specificity utilities whose winner is stylesheet source order, not
 * attribute order, so the prop cannot reliably fix it. Mounted unmodified; the
 * same nit is accepted on startups-tech.
 */
export default async function BlogPostPage({ params }: Props) {
  const { category, slug } = await params;
  const post = getPostByCategoryAndSlug(category, slug);
  if (!post) notFound();

  const bodySplit = splitAtSecondH2(post.contentHtml);
  // `lib/blog.ts` runs `addHeadingIds` over every body at parse time, so every
  // h2/h3 carries an id by the time this runs: measured 98 headings across the
  // 22 posts, every id unique within its document, zero headings without one.
  const headings = extractHeadings(post.contentHtml);
  const related = getRelatedPosts(post.slug, post.category, 3).map((p) => ({
    href: `/blog/${getCategorySlug(p)}/${p.slug}`,
    title: p.title,
    excerpt: p.summary || undefined,
  }));

  return (
    <>
      <ReadingProgress />
      <div
        className={`${siteContainerLg} py-16 lg:grid lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-start lg:gap-12`}
      >
        {/* SIDEBAR ARRANGEMENT (T32). THREE ARRANGEMENTS WERE POSSIBLE; THIS IS
            THE THIRD, AND THE REASON IS:
              (a) clamp on BOTH the aside and TableOfContents = a scroll box
                  inside a shorter scroll box;
              (b) clamp on NEITHER = an element that sticks for ~200px;
              (c) BUILT: exactly one clamp, here on the aside, which is the
                  direct child of the tall grid column. TableOfContents carries
                  none of its own (verified: its desktop branch,
                  TableOfContents.tsx:97-120, has no sticky, no max-h and no
                  overflow, and its own docstring :94-96 says the host owns
                  them). Its mobile branch has an inner
                  `max-h-[60vh] overflow-y-auto` on the `<details>` list at
                  :74, but that branch is `lg:hidden` and the clamp here is
                  `lg:`-prefixed, so at no width do two scroll containers exist
                  in this column.
            The aside is FIRST in the DOM and reordered with `lg:order-2`, so
            TableOfContents' own responsive branches do the work: the mobile
            collapsible strip renders above the article where a reader expects
            it, and the desktop card renders in the sticky right column. One
            mount, therefore ONE `<nav aria-label="Table of contents">` per page
            (startups-tech mounts it twice and ships two). */}
        <aside className="mb-8 lg:order-2 lg:mb-0 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
          {/* `stickyMobile={false}`: the kit's mobile strip pins at `top-16`
              (TableOfContents.tsx:55) and this site's header is sticky at
              `top-0` with a `min-h-[3.25rem]`/`sm:min-h-16` body
              (SiteHeader.tsx:449,455), so the two fight. Supported prop, not an
              override. */}
          <TableOfContents headings={headings} stickyMobile={false} />
          {/* Desktop only: on mobile the aside sits ABOVE the article, and a
              navy conversion card before the first paragraph is not where this
              card belongs. `copy` is the one triple niche.config.json `blog`
              already publishes, byte-identical to the two sentences the closing
              panel below renders, so nothing is authored. `buttonLabel` is
              `blog.cta_button`, the same string a third time. The component
              emits its own `data-cta="blog_sidebar_book"` /
              `data-cta-placement="sidebar"` / `data-cta-goal="form"`
              (BlogSidebarCta.tsx:66-68) and points its hardcoded
              `#enquiry-form` at the id on the closing panel.
              Its `note` default ("Free, no obligation. The form is just
              below.") is adopted as-is: this site already publishes "no
              obligation" in MiniCapture and on /book, so it asserts nothing new
              (brief K5). */}
          <div className="mt-6 hidden lg:block">
            <BlogSidebarCta
              copy={{ heading: niche.blog.cta_heading, body: niche.blog.cta_body }}
              buttonLabel={niche.blog.cta_button}
              buttonClassName="bg-[var(--btn-ground)] text-white hover:bg-[var(--btn-ground-hover)] active:bg-[var(--btn-ground-active)]"
            />
          </div>
        </aside>
        <div className="min-w-0 max-w-3xl lg:order-1">
          {/* Zero of the 22 posts carry a `schema:` frontmatter field
              (`grep -c "^schema:" content/blog/*.md` = 0 on all 22), so this
              branch has never emitted anything. Kept as the documented opt-out
              for a post that authors its own graph. */}
          {post.schema && (
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: post.schema }} />
          )}
          {/* M1a: exactly ONE BlogPosting per post, and only when the post does
              not author its own graph above, so the two can never both emit.
              `updatedDate` is the real optional field on this site's BlogPost
              (lib/blog.ts:22); it falls back to `date` rather than emitting an
              empty dateModified. No Article block is built on this route. */}
          {!post.schema && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: buildBlogPostingJsonLd({
                  headline: post.h1,
                  description: post.metaDescription,
                  url: `${siteConfig.url}/blog/${category}/${post.slug}`,
                  datePublished: post.date,
                  dateModified: post.updatedDate || post.date,
                }),
              }}
            />
          )}
          {post.howToSteps && post.howToSteps.length > 0 && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: buildHowToJsonLd({
                  name: post.h1,
                  description: post.metaDescription,
                  steps: post.howToSteps,
                }),
              }}
            />
          )}
          {/* T17: ONE binding, two consumers. `post.faqs` feeds both this
              FAQPage block and the FaqSection below, so the counts cannot
              diverge. Tags are stripped HERE only, so `acceptedAnswer.text`
              asserts the same TEXT the section renders as markup. */}
          {post.faqs && post.faqs.length > 0 && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(post.faqs.map((f) => ({ question: f.question, answer: f.answer.replace(/<[^>]+>/g, "") }))) }}
            />
          )}
          {/* The kit Breadcrumb also emits BreadcrumbList JSON-LD. Blog routes
              emitted none before this, so it is a pure gain and there is
              exactly one per URL (no other file on these three routes builds
              one). `tone="default"` - this trail sits on the light page ground,
              not on a brand hero.
              M1b/S2: the kit crumb item has no title/aria-label prop (checked
              packages/web-shared/design/primitives/Breadcrumb.tsx - label is
              the only text it renders, into both the visible `<li>` and the
              JSON-LD `name`), so the full post title cannot be kept out of
              sight in an attribute without editing the kit. Property and
              generalist/web render no breadcrumb at all on an individual post,
              so there is no literal convention to copy; this truncates to the
              first clause so the visible crumb and the JSON-LD name (built
              from the same items array) stay under the brief's bar together. */}
          <Breadcrumb
            siteUrl={siteConfig.url}
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: post.category, href: `/blog/${category}` },
              { label: post.title.split(/[:,?]/)[0].trim().slice(0, 60) },
            ]}
            tone="default"
          />
          {/* UB: this template carried zero eyebrows (0.2). `post.category` is
              already a published label in this band — the Breadcrumb three
              lines above renders it as the second-to-last crumb — so no
              string is minted; rule 1's "reuse a string the route already
              publishes as a heading or a label in that band" is satisfied the
              same way the service/hub hero Eyebrow reuses a title that is also
              its own breadcrumb crumb. No `onDark`: this is the light page
              ground, not a brand hero. */}
          <Eyebrow>{post.category}</Eyebrow>
          {/* UB, H1 rhythm: this template and `/calculators/[slug]` were the
              two stuck at 36px (0.3); same `lg:text-5xl leading-[1.15]` step.
              Class string only, `post.h1` unchanged. */}
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl leading-[1.15]">
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
              `niche.blog.cta_button` ("Get in touch"), a string this site
              already publishes on all 55 routes (the header CTA and the sticky
              bar both render it), so nothing is authored. The closing form
              keeps its own published "Send enquiry" label, unchanged. NEW
              surface, so `data-cta-goal` is declared here; the three existing
              site-wide ids are untouched. */}
          <a
            href="#enquiry-form"
            data-cta="blog_skip_to_form"
            data-cta-placement="article_header"
            data-cta-goal="form"
            className={`mt-4 inline-flex min-h-12 items-center text-sm font-semibold text-primary-700 hover:text-primary-800 ${focusRing}`}
          >
            {niche.blog.cta_button}
          </a>
          {/* W7C ground alternation (V2 adjacentSame, both sampled posts,
                template-wide): this box was `bg-slate-50`, and the next
                full-width band in the column is MiniCapture's
                `bg-[var(--surface)]` (= slate-50,
                src/components/calculators/MiniCapture.tsx:68), so two adjacent
                bands shared a ground at 390 and 768. White here, keeping
                `border-slate-200` for the edge, so the sequence alternates
                white -> slate-50 -> primary-50 -> slate-50 (the last band stays
                light before the navy footer). Measured on white:
                `text-slate-900` 17.74, `text-slate-700` 9.70, both PASS.
                No wording change, no link change. */}
          {post.keyTakeaways && post.keyTakeaways.length > 0 && (
            <aside className={`mt-8 rounded-xl border border-slate-200 bg-white p-5 ${focusRingAuthoredLinks}`}>
              <h2 className="text-sm font-semibold text-slate-900">Key takeaways</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                {post.keyTakeaways.map((kt) => (
                  <li key={kt}>{kt}</li>
                ))}
              </ul>
            </aside>
          )}
          {/* The dead Tailwind-typography colour-modifier class that sat
              beside `prose` here is DELETED: P0-A rule H, it is defined nowhere
              in the built CSS. `prose` stays, it is real (35 selectors in the
              built stylesheet). */}
          <article className={`prose mt-10 max-w-none ${focusRingAuthoredLinks}`}>
            <div dangerouslySetInnerHTML={{ __html: bodySplit.before }} />
            {bodySplit.after ? (
              <>
                <InlineMiniLeadForm topic={post.category} />
                <div dangerouslySetInnerHTML={{ __html: bodySplit.after }} />
              </>
            ) : null}
          </article>
          {/* ADOPTED: packages/web-shared/design/primitives/FaqSection.tsx.
              `alwaysRenderAnswers` because this page also emits FAQPage JSON-LD
              above, so every answer must be in the server HTML (it passes Radix
              `forceMount` through accordion.tsx). `html` because the answers are
              authored markup - the JSON-LD block above has to strip tags from
              the same strings, which proves it.
              NEW VISIBLE HEADING on 22 posts: these posts published their FAQs
              only as JSON-LD, never as markup, so the section's heading and its
              question text are new on the page. The heading is the component's
              own default label, a generic section label rather than authored
              prose; the questions and answers are the frontmatter's own words,
              unchanged. `eyebrow=""` because no blog route publishes an eyebrow.
              Flagged for the owner in the receipt. */}
          {post.faqs && post.faqs.length > 0 && (
            <div className={`mt-12 border-t border-slate-200 pt-8 ${focusRingAuthoredLinks}`}>
              <FaqSection
                eyebrow=""
                title="Frequently asked questions"
                faqs={post.faqs}
                html
                alwaysRenderAnswers
                className="pt-4"
              />
            </div>
          )}
          {related.length > 0 && (
            <div className="mt-12 border-t border-slate-200 pt-8">
              <h2 className="text-xl font-semibold text-slate-900">Related reading</h2>
              {/* `excerpt` is the authored frontmatter `summary`. The kit
                  prefers a `firstSentence()` excerpt and this site has no such
                  helper; adding one would be a lib export with one consumer.
                  `kind` is left to the component's own `kindFromHref`
                  (RelatedArticles.tsx:51), so the pill can never disagree with
                  where the link goes.
                  UB, `ScrollGlowGroup` DECLINED on this grid, re-checked at
                  `globals-standard.css:186` and `:213-227`: `[data-glow="on"]
                  > *` fires the stagger on the wrapper's DIRECT children, but
                  `RelatedArticles` renders its own `<ul>`/`<li>` grid
                  internally, so wrapping the component (rather than its
                  cards) would animate the single `<ul>` as one block, not a
                  per-card wave. `.related-card` already carries its OWN,
                  deliberately different, glow (`globals-standard.css:213-226`:
                  a hover/focus state, "the same green glow... held as a hover
                  STATE rather than played as a one-shot animation"). Adding
                  the scroll stagger on top would be the "second unrelated
                  effect" that comment is written to prevent. */}
              <RelatedArticles items={related} className="mt-6" />
            </div>
          )}
          {/* ponytail: content is raw HTML (dangerouslySetInnerHTML), so anchor
              targets (headings, footnote #ref-N list items) can't take a
              Tailwind class directly; this scoped rule gives every in-article
              jump target the same scroll-mt-24 offset. It is what makes the
              TableOfContents links above land correctly. */}
          {/* M1a: W7's NextStepOffer, one mount, below the post content and
              above the closing LeadCTAPanel. It sits INSIDE the content column
              rather than at W7's re-derived :326 (which is outside the grid
              container, where the card would run full-bleed). Client component,
              no props; it renders null unless the kit SupportProvider has a
              behaviour-matched offer, so the kit suppression rules still own
              whether it paints. It carries its own data-cta="next_step". */}
          <NextStepOffer />
          <style>{`.prose [id] { scroll-margin-top: 6rem; }`}</style>
        </div>
      </div>
      {/* The bordered "Need help with your pharmacy finances?" box that closed
          this template is now the kit closing panel, fed the SAME two sentences
          it published (they are byte-identical to niche.config.json
          `blog.cta_heading` / `cta_body`) and the same LeadForm with
          `redirectOnSuccess={false}`. `eyebrow=""` and `formTitle=""` because
          the kit defaults ("Free consultation" / "Book your free consultation")
          are claims this site does not publish. `proofPoints={[]}`: this block
          never carried tick rows.
          `id`/`scroll-mt-24` on the wrapper is the single target for both the
          skip-to-form anchor above and BlogSidebarCta's hardcoded
          `#enquiry-form`.

          UB, G3 fix (R2 finding): this panel was the navy, non-contained
          variant with its own `backdrop`, which put a dark band directly
          against the dark `slate-900` footer on every one of the 22 post
          routes (navy-on-navy, the same defect G3 already fixed on
          `services/[slug]` and `for/[slug]`) and measured a 1.46 ring on that
          dark band. Moved to the SAME fix those two templates already carry:
          the `contained` light variant, `ground="slate"`. The band directly
          above is the light content column (no FAQ section exists when
          `related.length === 0`, but the content column itself is never dark),
          so the sequence is now light -> light contained panel -> dark
          footer, zero dark-on-dark anywhere on the route. `backdrop` is
          DROPPED with it: the kit only renders `backdrop` on the navy variant
          (`LeadCTAPanel.tsx:73-77`), so passing `PharmaciesBackdrop` to the
          contained branch was already a no-op prop, not a rendered graphic.
          `.ground-dark` stays absent, same reasoning as before: the panel's
          only focusable descendants are the LeadForm controls on the white
          form card, and the contained card is a light surface, so no
          `--focus-ring` rebind is needed. The focus-ring token fix for
          remaining dark grounds elsewhere on the site is being made in
          `globals.css` by another package; no wrapper added here for it. */}
      <div id="enquiry-form" className="scroll-mt-24">
        <LeadCTAPanel
          eyebrow=""
          formTitle=""
          proofPoints={[]}
          title={niche.blog.cta_heading}
          description={niche.blog.cta_body}
          form={<LeadForm redirectOnSuccess={false} />}
          contained
          ground="slate"
        />
      </div>
    </>
  );
}
