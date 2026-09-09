import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteContainerLg, focusRing, btnPrimary, btnOnDark } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { getAllPosts, calculateReadTime, slugifyCategory } from "@/lib/blog";
import { BlogListWithSearch } from "@accounting-network/web-shared/design/blog/BlogListWithSearch";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { GeneralistBackdrop } from "@/components/layout/GeneralistBackdrop";
import { LeadForm } from "@/components/forms/LeadForm";
import { BLOG_STAGES, BLOG_STAGE_LIST, postMatchesStage } from "@/lib/blog-stages";
import { LEAD_PROOF_POINTS } from "@/lib/blog-cta-map";
import { JsonLd, buildCollectionPage } from "@/lib/schema";

export async function generateStaticParams() {
  return Object.keys(BLOG_STAGES).map((stage) => ({ stage }));
}

type Props = { params: Promise<{ stage: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { stage } = await params;
  const s = BLOG_STAGES[stage];
  if (!s) return { title: "Stage not found" };
  const url = `${siteConfig.url}/blog/stage/${stage}`;
  return {
    title: `${s.name} | Insights`,
    description: `UK tax, structure and finance articles for ${s.name.toLowerCase()}. Written by our editorial team, reviewed by James Holloway.`,
    alternates: { canonical: url },
    robots: { index: false, follow: true },
    openGraph: {
      title: `${s.name} | Insights | ${siteConfig.name}`,
      description: s.intro,
      url,
      type: "website",
    },
  };
}

export default async function BlogStagePage({ params }: Props) {
  const { stage } = await params;
  const s = BLOG_STAGES[stage];
  if (!s) notFound();

  const allPosts = getAllPosts();
  const matched = allPosts.filter((p) => postMatchesStage(p, s));

  // Projection: contentHtml never crosses into the client payload.
  const items = matched.map((p) => ({
    slug: p.slug,
    title: p.title,
    summary: p.summary,
    category: p.category,
    categorySlug: slugifyCategory(p.category),
    date: p.date,
  }));

  const readTimes = new Map<string, number>();
  for (const p of matched) {
    readTimes.set(p.slug, calculateReadTime(p.contentHtml));
  }

  const categoryCounts = new Map<string, number>();
  for (const p of matched) {
    categoryCounts.set(p.category, (categoryCounts.get(p.category) || 0) + 1);
  }
  const categories = Array.from(categoryCounts.entries()).map(([name, count]) => ({
    name,
    slug: slugifyCategory(name),
    count,
  }));

  const collectionSchema = buildCollectionPage({
    name: `${s.name} articles`,
    description: s.longIntro,
    path: `/blog/stage/${stage}`,
  });

  const chip = `inline-flex min-h-12 items-center gap-2 rounded-xl border px-5 py-3 text-sm font-bold shadow-sm transition-all ${focusRing}`;

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
              items={[
                { label: "Home", href: "/" },
                { label: "Insights", href: "/blog" },
                { label: "By stage", href: "/blog/stage" },
                { label: s.name },
              ]}
            />
            <Eyebrow onDark>{s.intro}</Eyebrow>
            <h1 className="text-3xl font-bold leading-[1.15] text-white text-balance sm:text-5xl lg:text-6xl">
              {s.name}
            </h1>
            <p className="mt-4 text-base leading-7 text-white/90 sm:mt-6 sm:text-lg">{s.longIntro}</p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href="#enquiry-form"
                data-cta={`blog_stage_${s.slug}_book`}
                data-cta-placement="hero"
                data-cta-goal="form"
                className={btnPrimary}
              >
                {s.cta.button}
              </Link>
              <Link
                href="#articles"
                data-cta={`blog_stage_${s.slug}_articles`}
                data-cta-placement="hero"
                className={btnOnDark}
              >
                Browse {items.length} {items.length === 1 ? "article" : "articles"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-8 sm:py-10">
        <div className={siteContainerLg}>
          <Eyebrow>Other stages</Eyebrow>
          <nav aria-label="Browse by stage" className="flex flex-wrap gap-3">
            {BLOG_STAGE_LIST.map((stg) => (
              <Link
                key={stg.slug}
                href={`/blog/stage/${stg.slug}`}
                aria-current={stg.slug === s.slug ? "page" : undefined}
                data-cta={`blog_stage_switch_${stg.slug}`}
                data-cta-placement="stage_switcher"
                className={
                  stg.slug === s.slug
                    ? `${chip} border-primary-600 bg-primary-50 text-primary-800`
                    : `${chip} border-slate-200 bg-white text-slate-900 hover:border-primary-600 hover:text-primary-700 hover:shadow-md`
                }
              >
                {stg.name}
              </Link>
            ))}
            <Link
              href="/blog"
              data-cta="blog_stage_switch_all"
              data-cta-placement="stage_switcher"
              className={`${chip} border-slate-200 bg-white text-slate-900 hover:border-primary-600 hover:text-primary-700 hover:shadow-md`}
            >
              All articles
            </Link>
          </nav>
        </div>
      </section>

      <section id="articles" className="scroll-mt-24 bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>The library</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl mb-2">
            {items.length} article{items.length !== 1 ? "s" : ""} for {s.name.toLowerCase()}
          </h2>
          <div className="mt-8">
            <BlogListWithSearch posts={items} categories={categories} readTimes={readTimes} />
          </div>
        </div>
      </section>

      <div id="enquiry-form" className="scroll-mt-24">
        <LeadCTAPanel
          title={s.cta.heading}
          description={s.cta.body}
          proofPoints={LEAD_PROOF_POINTS}
          form={<LeadForm submitLabel={s.cta.button} redirectOnSuccess={false} />}
          backdrop={<GeneralistBackdrop />}
          footnote="No obligation and no hard sell. If your position is already right, we will say so."
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
                data-cta={`blog_stage_topic_${c.slug}`}
                data-cta-placement="topic_tail"
                className={`${chip} border-slate-200 bg-white text-slate-900 hover:border-primary-600 hover:text-primary-700 hover:shadow-md`}
              >
                {c.name}
                <span className="text-xs font-semibold text-slate-500">{c.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
