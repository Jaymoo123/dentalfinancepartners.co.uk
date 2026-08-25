import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HubArticleList, type HubArticle } from "./HubArticleList";
import { Breadcrumb } from "../primitives/Breadcrumb";
import { Eyebrow } from "../primitives/page-blocks";
import { LeadCTAPanel } from "../marketing/LeadCTAPanel";
import {
  btnOnCream,
  btnPrimary,
  focusRing,
  heroCreamSurface,
  siteContainerLg,
} from "../layout-utils";

export type HubSection = { heading: string; paragraphs: string[] };
export type HubCta = { heading: string; body: string; submitLabel: string };

/**
 * Shared template for the nine /blog/<category> hub pages, so they carry the
 * same posture as the services pages instead of nine hand-rolled layouts:
 * cream brick hero -> white "essentials" briefing -> slate article library ->
 * navy LeadCTAPanel -> slate other-topics band (the light section that keeps
 * the navy panel off the navy footer, per the adjacency rule).
 *
 * Pages own their SEO surface (metadata export, essay copy, CTA copy) and pass
 * it in as data; everything visual lives here. The essay subsections render as
 * one h2 section with h3 ruled rows - the old pages gave every subsection a
 * full-size h2, which flattened the hierarchy and shouted.
 */
export function BlogCategoryHub({
  categoryName,
  categorySlug,
  collectionName,
  description,
  intro,
  essentialsTitle = "The essentials",
  sections,
  cta,
  posts,
  categories,
  siteUrl,
  form,
  heroBackdrop,
  ctaBackdrop,
}: {
  categoryName: string;
  categorySlug: string;
  /**
   * `CollectionPage.name` in the JSON-LD. Defaults to `categoryName`, but seven
   * hubs set a fuller SEO name (e.g. "Capital Gains Tax for Property
   * Investors"); hardcoding the short name degraded those.
   */
  collectionName?: string;
  /** Feeds the CollectionPage JSON-LD; usually the metadata description. */
  description: string;
  /** Hero standfirst. */
  intro: string;
  essentialsTitle?: string;
  sections: HubSection[];
  cta: HubCta;
  /**
   * Per-site: this category's posts, already filtered and with `readTime`
   * precomputed. Replaces Property's `getAllPosts().filter(...)` +
   * `calculateReadTime()` call from Property's lib/blog module — a shared
   * component must not know how a site loads or measures its own content.
   */
  posts: HubArticle[];
  /**
   * Per-site: every blog category (not just this one). Replaces
   * `getAllCategories()` from Property's lib/blog module; the component
   * filters out the current category itself, same as the original
   * "other topics" band.
   */
  categories: Array<{ slug: string; name: string; count: number }>;
  /**
   * Per-site: absolute site origin (e.g. "https://example.co.uk"). Replaces
   * `siteConfig.url` from Property's config/site module; feeds both the
   * CollectionPage JSON-LD url and the shared `Breadcrumb`'s required
   * `siteUrl` prop.
   */
  siteUrl: string;
  /**
   * The lead-capture form, passed straight through to `LeadCTAPanel`'s
   * required `form` slot. Per-site; replaces Property's `submitLabel` /
   * `redirectOnSuccess` props (dropped — those are now the caller's own
   * `LeadForm` config, set when it builds this node).
   */
  form: ReactNode;
  /**
   * Per-site brick/texture motif slot for the cream hero. Optional; replaces
   * `<HeroBrickBackdrop tone="cream" />` from Property's layout components,
   * which is Property-only and cannot be imported here.
   */
  heroBackdrop?: ReactNode;
  /**
   * Per-site brick/texture motif slot forwarded to `LeadCTAPanel`'s own
   * `backdrop` prop. Optional. Property's local `LeadCTAPanel` always
   * rendered `<HeroBrickBackdrop />` internally with no way to opt out; the
   * shared `LeadCTAPanel` only reserves the position, so a caller wanting the
   * identical navy brick texture passes it here.
   */
  ctaBackdrop?: ReactNode;
}) {
  const otherTopics = categories.filter((c) => c.slug !== categorySlug);

  // No BreadcrumbList node here. The <Breadcrumb> rendered below emits its own from
  // buildBreadcrumbJsonLd (components/ui/Breadcrumb.tsx:30), and carrying one in this
  // @graph too made all ten hubs emit BreadcrumbList TWICE. Phase 0.10 hit the identical
  // defect on the five pillar pages and set the precedent: drop the page-level copy, keep
  // the shared component's, so the hubs stay on the same site-wide emitter as every other
  // route. The CollectionPage node is unaffected, so the hub loses no schema.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: collectionName ?? categoryName,
        description,
        url: `${siteUrl}/blog/${categorySlug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section
        className={`relative flex items-center overflow-hidden py-10 sm:py-12 lg:py-14 min-h-[350px] ${heroCreamSurface}`}
      >
        {heroBackdrop}
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Breadcrumb
              siteUrl={siteUrl}
              items={[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: categoryName },
              ]}
            />
            <h1 className="mt-6 text-4xl font-bold text-slate-900 sm:text-5xl lg:text-6xl">
              {categoryName}
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
              {intro}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href="#enquiry-form"
                data-cta={`blog_hub_${categorySlug}_book`}
                data-cta-placement="hero"
                data-cta-goal="form"
                className={btnPrimary}
              >
                Book free consultation
              </Link>
              <Link
                href="#articles"
                data-cta={`blog_hub_${categorySlug}_articles`}
                data-cta-placement="hero"
                className={btnOnCream}
              >
                Browse {posts.length} {posts.length === 1 ? "article" : "articles"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {sections.length > 0 ? (
        <section className="bg-white py-16 sm:py-20">
          <div className={siteContainerLg}>
            <Eyebrow>{categoryName}</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">{essentialsTitle}</h2>
            {/* Ruled statement rows, the /about "what makes us different"
                device: heading column left, prose right, one rule per row. */}
            <div className="mt-8 sm:mt-12">
              {sections.map((s) => (
                <div
                  key={s.heading}
                  className="grid gap-3 border-t border-slate-200 py-8 first:border-t-0 first:pt-0 last:pb-0 lg:grid-cols-[1fr_2fr] lg:gap-12"
                >
                  <h3 className="text-lg font-bold text-slate-900 sm:text-xl">{s.heading}</h3>
                  <div className="space-y-4">
                    {s.paragraphs.map((p, i) => (
                      <p key={i} className="text-base leading-7 text-slate-600">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section id="articles" className="scroll-mt-24 bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>The library</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl mb-2">
            Every {categoryName} article
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mb-8">
            {posts.length} {posts.length === 1 ? "guide" : "guides"}, written by specialist
            property accountants and kept current.
          </p>
          {posts.length > 0 ? (
            // Twelve per page, the same as /blog. This used to pass
            // `articleItems.length` to force a single page, because paging is
            // client state with no <a href> to pages 2..N and the hubs are the
            // only full HTML crawl path to the ~750-post corpus. HubArticleList
            // now keeps every card in the server HTML and hides the off-page
            // ones, so the crawl path survives and the reader stops scrolling
            // past 150 cards to reach the form. See its docstring before
            // changing either side of this.
            <HubArticleList posts={posts} categorySlug={categorySlug} />
          ) : (
            <p className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-600">
              No articles in this topic yet. Check back shortly.
            </p>
          )}
        </div>
      </section>

      <div id="enquiry-form" className="scroll-mt-24">
        <LeadCTAPanel
          title={cta.heading}
          description={cta.body}
          proofPoints={[
            { title: "Property tax only", detail: "Section 24, CGT and MTD every day" },
            { title: "Fixed fees, quoted upfront", detail: "In writing, before any work starts" },
            { title: "Same accountant every time", detail: "You are not passed around a team" },
          ]}
          form={form}
          backdrop={ctaBackdrop}
          footnote="No obligation and no hard sell. If your position is already right, we will say so."
        />
      </div>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Keep exploring</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl mb-8">
            Browse other topics
          </h2>
          <div className="flex flex-wrap gap-3">
            {otherTopics.map((topic) => (
              <Link
                key={topic.slug}
                href={`/blog/${topic.slug}`}
                data-cta={`blog_hub_topic_${topic.slug}`}
                data-cta-placement="other_topics"
                className={`inline-flex min-h-12 items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-900 shadow-sm transition-all hover:border-primary-600 hover:text-primary-700 hover:shadow-md sm:text-base ${focusRing}`}
              >
                {topic.name}
                {/* slate-500, not their slate-400: on white the count read at
                    2.63:1, below the 4.5:1 floor the rest of the site holds.
                    Same quiet treatment, one step darker. */}
                <span className="text-xs font-semibold text-slate-500">{topic.count}</span>
              </Link>
            ))}
          </div>
          <Link
            href="/blog"
            data-cta="blog_hub_all_articles"
            data-cta-placement="other_topics"
            className={`mt-8 inline-flex items-center gap-1.5 rounded py-1 text-sm font-bold text-primary-600 transition-colors hover:text-primary-700 sm:text-base ${focusRing}`}
          >
            All articles and guides
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
