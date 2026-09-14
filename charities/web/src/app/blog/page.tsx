import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getAllCategories, calculateReadTime, getCategorySlug } from "@/lib/blog";
import { siteConfig } from "@/config/site";
import {
  siteContainerLg,
  btnPrimary,
  focusRing,
  heroCreamSurface,
} from "@/components/ui/layout-utils";
import { BLOG_CTA } from "@/components/blog/blog-cta";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { PageHero } from "@/components/hubs/HubParts";
import { BlogListWithSearch } from "@accounting-network/web-shared/design/blog/BlogListWithSearch";
import { HubArticleList } from "@accounting-network/web-shared/design/blog/HubArticleList";

const INTRO =
  "Practical guides on charity accounts, SORP, independent examination, Gift Aid, VAT and trustee compliance for UK charities, CICs and social enterprises.";

export const metadata: Metadata = {
  title: "Charity Accounting Blog | Guides and Articles",
  description: INTRO,
  alternates: { canonical: `${siteConfig.url}/blog` },
};

/** One chip recipe for the topic rails, at the 48px touch floor. */
const chip = `inline-flex min-h-12 items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-900 shadow-sm ring-1 ring-slate-200/70 transition-all hover:ring-primary-600 hover:text-primary-700 hover:shadow-md ${focusRing}`;

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  const readTimes = new Map(posts.map((p) => [p.slug, calculateReadTime(p.contentHtml)]));

  // PROJECTION, load-bearing. A `{...p}` spread would hand the client list every
  // field on every post, contentHtml included, putting all 24 bodies into this
  // route's RSC payload (the /blog FALLBACK_BODY_TOO_LARGE lesson). Six fields.
  const items = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    summary: p.summary,
    category: p.category,
    categorySlug: getCategorySlug(p),
    date: p.date,
  }));

  // BlogListWithSearch SLICES to 12 per page (BlogListWithSearch.tsx:91), so on
  // a 24-post corpus it alone would drop half the article links out of the
  // server HTML and halve this route's link floor. HubArticleList keeps every
  // card in the server HTML and merely `hidden`s the off-page ones
  // (HubArticleList.tsx:81), so all 24 <a href> survive. Both, as generalist
  // does (generalist/web/src/app/blog/page.tsx:181, :193). Do not drop either.
  const hubItems = items.map((p) => ({
    slug: p.slug,
    title: p.title,
    summary: p.summary,
    readTime: readTimes.get(p.slug) || 0,
    date: p.date,
    categorySlug: p.categorySlug,
  }));

  return (
    <>
      {/* Kit hero, cream tone: /blog is a hub, and /guides, /research, /services
          and /for already open on the cream PageHero. Its own Breadcrumb and h1
          were already here and carry over unchanged, strings included. */}
      <PageHero
        eyebrow="Blog"
        title="Charity accounting, explained."
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      >
        <p>{INTRO}</p>
      </PageHero>

      {/* The topic rail used to live inside the old hero section. PageHero's
          content column is capped at max-w-3xl and the rail is wider than that,
          so it becomes its own band on the SAME cream ground, with no top
          padding, and reads as a continuation of the hero rather than a new
          band. */}
      {categories.length > 0 && (
        <section className={`${heroCreamSurface} pb-10 sm:pb-12`}>
          <div className={siteContainerLg}>
            <Eyebrow>Browse by topic</Eyebrow>
            <nav aria-label="Browse by topic" className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/blog/${cat.slug}`}
                  data-cta={`blog_index_topic_${cat.slug}`}
                  data-cta-placement="filter_band"
                  className={chip}
                >
                  {cat.name}
                  <span className="text-xs font-semibold text-slate-500">{cat.count}</span>
                </Link>
              ))}
            </nav>
          </div>
        </section>
      )}

      <section id="articles" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Search</Eyebrow>
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Find an article
          </h2>
          <BlogListWithSearch posts={items} categories={categories} readTimes={readTimes} />
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>The library</Eyebrow>
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Every article
          </h2>
          <p className="mb-8 text-base text-slate-600 sm:text-lg">
            All {posts.length} of them, newest first. Twelve at a time.
          </p>
          <HubArticleList posts={hubItems} categorySlug="" />
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20" aria-labelledby="blog-index-cta">
        <div className={siteContainerLg}>
          <div className="rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70 sm:p-8">
            <h2 id="blog-index-cta" className="text-xl font-bold text-slate-900 sm:text-2xl">
              {BLOG_CTA.heading}
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
              {BLOG_CTA.body}
            </p>
            <Link
              href="/contact"
              data-cta="blog_index_contact"
              data-cta-placement="index_footer"
              data-cta-goal="contact"
              className={`mt-6 ${btnPrimary}`}
            >
              {BLOG_CTA.button}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
