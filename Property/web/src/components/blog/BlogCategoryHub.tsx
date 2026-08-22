import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HubArticleList } from "@/components/blog/HubArticleList";
import { getAllPosts, getAllCategories, getCategorySlug, calculateReadTime } from "@/lib/blog";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Eyebrow } from "@/components/ui/page-blocks";
import { HeroBrickBackdrop } from "@/components/layout/HeroBrickBackdrop";
import { LeadCTAPanel } from "@/components/property/LeadCTAPanel";
import {
  btnOnCream,
  btnPrimary,
  focusRing,
  heroCreamSurface,
  siteContainerLg,
} from "@/components/ui/layout-utils";

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
}) {
  const posts = getAllPosts().filter((post) => getCategorySlug(post) === categorySlug);
  const otherTopics = getAllCategories().filter((c) => c.slug !== categorySlug);

  // Metadata-only projection with precomputed read times; contentHtml must
  // never reach the client payload (see HubArticleList).
  const articleItems = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    summary: post.summary,
    readTime: calculateReadTime(post.contentHtml),
    date: post.date,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` },
          { "@type": "ListItem", position: 3, name: categoryName },
        ],
      },
      {
        "@type": "CollectionPage",
        name: collectionName ?? categoryName,
        description,
        url: `${siteConfig.url}/blog/${categorySlug}`,
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
        <HeroBrickBackdrop tone="cream" />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Breadcrumb
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
            // CARVE-OUT 5 (our SEO surface). The template's default is 12 per
            // page with state-driven page changes and no <a href> to pages
            // 2..N, which would cut the nine hubs from 749 server-rendered
            // article links to 108. The hubs are the only full HTML crawl path
            // to the corpus (/blog itself only exposes 24), so the grid renders
            // the whole category in one page. Design unchanged; the pagination
            // bar simply never has a second page to offer.
            <HubArticleList
              posts={articleItems}
              categorySlug={categorySlug}
              postsPerPage={articleItems.length}
            />
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
          submitLabel={cta.submitLabel}
          redirectOnSuccess={false}
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
                className={`inline-flex min-h-12 items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-900 shadow-sm transition-all hover:border-emerald-600 hover:text-emerald-700 hover:shadow-md sm:text-base ${focusRing}`}
              >
                {topic.name}
                <span className="text-xs font-semibold text-slate-400">{topic.count}</span>
              </Link>
            ))}
          </div>
          <Link
            href="/blog"
            data-cta="blog_hub_all_articles"
            data-cta-placement="other_topics"
            className={`mt-8 inline-flex items-center gap-1.5 rounded py-1 text-sm font-bold text-emerald-600 transition-colors hover:text-emerald-700 sm:text-base ${focusRing}`}
          >
            All articles and guides
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
