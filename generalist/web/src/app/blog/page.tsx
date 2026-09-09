import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  siteContainerLg,
  btnPrimary,
  btnOnDark,
  focusRing,
} from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { getAllPosts, calculateReadTime, slugifyCategory } from "@/lib/blog";
import { BlogListWithSearch } from "@accounting-network/web-shared/design/blog/BlogListWithSearch";
import { HubArticleList } from "@accounting-network/web-shared/design/blog/HubArticleList";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { GeneralistBackdrop } from "@/components/layout/GeneralistBackdrop";
import { LeadForm } from "@/components/forms/LeadForm";
import { niche } from "@/config/niche-loader";
import { BLOG_STAGE_LIST } from "@/lib/blog-stages";
import { LEAD_PROOF_POINTS } from "@/lib/blog-cta-map";
import { JsonLd, buildCollectionPage } from "@/lib/schema";

export const metadata: Metadata = {
  title: `Insights`,
  description:
    "Plain-English guidance on UK business tax, structure, payroll, VAT, R&D, MTD and exit planning. Written by our specialist accountants. Updated for 2026/27 rates.",
  alternates: { canonical: `${siteConfig.url}/blog` },
  openGraph: {
    title: `Insights | ${siteConfig.name}`,
    description:
      "Plain-English guidance on UK business tax, structure, payroll, VAT and exit planning.",
    url: `${siteConfig.url}/blog`,
    type: "website",
  },
};

/** One chip recipe for both filter rails, at the 48px touch floor. */
const chip = `inline-flex min-h-12 items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-900 shadow-sm transition-all hover:border-primary-600 hover:text-primary-700 hover:shadow-md ${focusRing}`;

export default function BlogIndexPage() {
  const posts = getAllPosts();

  // PROJECTION, load-bearing. The old `{...p}` spread handed the client
  // component every field on every post, contentHtml included, which put the
  // full body of ~700 articles into the RSC payload of the site's highest
  // traffic non-home page. Only these six fields are ever rendered.
  const items = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    summary: p.summary,
    category: p.category,
    categorySlug: slugifyCategory(p.category),
    date: p.date,
  }));

  const readTimes = new Map<string, number>();
  for (const p of posts) {
    readTimes.set(p.slug, calculateReadTime(p.contentHtml));
  }

  // Every post as a hub card too: HubArticleList keeps all of them in the
  // server HTML (hiding the off-page ones), which is what makes /blog a real
  // crawl path to the corpus rather than a 12-link window.
  const hubItems = items.map((p) => ({
    slug: p.slug,
    title: p.title,
    summary: p.summary,
    readTime: readTimes.get(p.slug) || 0,
    date: p.date,
    categorySlug: p.categorySlug,
  }));

  // Categories with post counts, ordered per niche config (matches nav).
  const categoryNames: string[] = (niche.content_strategy?.categories as string[]) || [];
  const categoryCounts = new Map<string, number>();
  for (const p of posts) {
    categoryCounts.set(p.category, (categoryCounts.get(p.category) || 0) + 1);
  }
  const categories = categoryNames
    .map((name) => ({ name, slug: slugifyCategory(name), count: categoryCounts.get(name) || 0 }))
    .filter((c) => c.count > 0);

  const collectionSchema = buildCollectionPage({
    name: "Insights",
    description: `${posts.length} articles on UK business tax, structure, VAT, payroll and exit planning.`,
    path: "/blog",
  });

  return (
    <>
      <JsonLd data={[collectionSchema]} />

      <section className="relative flex min-h-[300px] items-center overflow-hidden bg-slate-900 py-10 sm:min-h-[350px] sm:py-12 lg:py-14">
        <GeneralistBackdrop />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Breadcrumb
              siteUrl={siteConfig.url}
              onDark
              items={[{ label: "Home", href: "/" }, { label: "Insights" }]}
            />
            <h1 className="text-3xl font-bold leading-[1.15] text-white text-balance sm:text-5xl lg:text-6xl">
              UK business tax, plainly explained.
            </h1>
            <p className="mt-4 text-base leading-7 text-white/90 sm:mt-6 sm:text-lg">
              {posts.length} articles on limited company tax, sole trader self assessment, VAT and
              MTD, payroll, R&amp;D credits, incorporation, director pay and exit planning. Written
              or reviewed by a specialist accountant on our team, and kept current against HMRC
              rates.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href="#book"
                data-cta="blog_index_book"
                data-cta-placement="hero"
                data-cta-goal="form"
                className={btnPrimary}
              >
                Book a free call
              </Link>
              <Link
                href="#articles"
                data-cta="blog_index_articles"
                data-cta-placement="hero"
                className={btnOnDark}
              >
                Browse the library
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ONE merged filter band. Two separate bordered bands read as two
          unrelated controls stacked on top of each other. */}
      <section className="border-b border-slate-200 bg-white py-8 sm:py-10">
        <div className={siteContainerLg}>
          <Eyebrow>Browse by stage</Eyebrow>
          <nav aria-label="Browse by stage" className="flex flex-wrap gap-3">
            {BLOG_STAGE_LIST.map((s) => (
              <Link
                key={s.slug}
                href={`/blog/stage/${s.slug}`}
                data-cta={`blog_index_stage_${s.slug}`}
                data-cta-placement="filter_band"
                className={chip}
              >
                {s.name}
              </Link>
            ))}
          </nav>

          {categories.length > 0 ? (
            <div className="mt-8">
              <Eyebrow>Browse by topic</Eyebrow>
              <nav aria-label="Browse by topic" className="flex flex-wrap gap-3">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/blog/${c.slug}`}
                    data-cta={`blog_index_topic_${c.slug}`}
                    data-cta-placement="filter_band"
                    className={chip}
                  >
                    {c.name}
                    <span className="text-xs font-semibold text-slate-500">{c.count}</span>
                  </Link>
                ))}
              </nav>
            </div>
          ) : null}
        </div>
      </section>

      <section id="articles" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Search</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">Find an article</h2>
          <div className="mt-8">
            <BlogListWithSearch posts={items} categories={categories} readTimes={readTimes} />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>The library</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl mb-2">Every article</h2>
          <p className="mb-8 text-base text-slate-600 sm:text-lg">
            All {posts.length} of them, newest first. Twelve at a time.
          </p>
          <HubArticleList posts={hubItems} categorySlug="" />
        </div>
      </section>

      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          title="Rather have someone read your position than read the archive?"
          description="A free call with an accountant who has already looked at where you are. No obligation and no hard sell."
          proofPoints={LEAD_PROOF_POINTS}
          form={<LeadForm submitLabel="Request callback" redirectOnSuccess={false} />}
          backdrop={<GeneralistBackdrop />}
          footnote="If your position is already right, we will tell you that instead."
        />
      </div>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Keep exploring</Eyebrow>
          <h2 className="mb-8 text-2xl font-bold text-slate-900 sm:text-4xl">Browse by topic</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/blog/${c.slug}`}
                data-cta={`blog_index_tail_${c.slug}`}
                data-cta-placement="topic_tail"
                className={chip}
              >
                {c.name}
                <span className="text-xs font-semibold text-slate-500">{c.count}</span>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-base leading-7 text-slate-600">
            Prefer to run your own numbers? Start with the{" "}
            <Link
              href="/calculators/salary-dividend-optimiser"
              data-cta="blog_calculators_bridge"
              data-cta-placement="topic_tail"
              className={`font-bold text-primary-700 underline underline-offset-4 hover:text-primary-800 ${focusRing} rounded`}
            >
              salary and dividend optimiser
            </Link>
            .
          </p>
          <Link
            href="/calculators"
            data-cta="blog_calculators_all"
            data-cta-placement="topic_tail"
            className={`mt-4 inline-flex items-center gap-1.5 rounded py-1 text-sm font-bold text-primary-600 transition-colors hover:text-primary-700 sm:text-base ${focusRing}`}
          >
            Try the free calculators
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
