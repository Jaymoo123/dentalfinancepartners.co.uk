import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  siteContainerLg,
  btnPrimary,
  btnOnCream,
  focusRing,
  heroCreamSurface,
} from "@/components/ui/layout-utils";
import { getAllPosts, getAllCategories, calculateReadTime, getCategorySlug } from "@/lib/blog";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { BlogListWithSearch } from "@accounting-network/web-shared/design/blog/BlogListWithSearch";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { SolicitorsBackdrop } from "@/components/layout/SolicitorsBackdrop";
import { LeadForm } from "@/components/forms/LeadForm";
import { genericTools, toolPath } from "@/lib/tools/registry";

export const metadata: Metadata = {
  title: "Legal Sector Accounting Insights & Guides | Accounts for Lawyers",
  description:
    "In-depth guides on SRA Accounts Rules, partnership and LLP tax, VAT, and practice succession for UK law firms. Written by legal-sector accounting specialists.",
  alternates: { canonical: `${siteConfig.url}/blog` },
  openGraph: {
    title: "Legal Sector Accounting Insights & Guides | Accounts for Lawyers",
    description:
      "Expert articles on SRA compliance, partnership tax, LLP conversion, and practice succession for UK solicitors and law firms.",
    url: `${siteConfig.url}/blog`,
    type: "website",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const readTimes = new Map(posts.map((p) => [p.slug, calculateReadTime(p.contentHtml)]));

  // PROJECTION, load-bearing. The old `{...p, categorySlug}` spread handed the
  // client list every field on every post, contentHtml included, which put the
  // full body of the whole corpus into the RSC flight payload of this route.
  // On Property the same defect pushed /blog past Vercel's 19 MB body limit
  // (FALLBACK_BODY_TOO_LARGE). The list renders only these six fields; read
  // times stay precomputed server-side and are passed separately.
  const postsForList = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    summary: p.summary,
    category: p.category,
    categorySlug: getCategorySlug(p),
    date: p.date,
  }));

  // ponytail: the first five in registry order, which is the gallery's own
  // display order, rather than a second hand-kept list that would drift.
  const bridgeTools = genericTools().slice(0, 5);

  return (
    <>
      <section
        className={`relative flex min-h-[350px] items-center overflow-hidden py-10 sm:py-12 lg:py-14 ${heroCreamSurface}`}
      >
        <SolicitorsBackdrop tone="cream" />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
            <h1 className="text-3xl font-bold leading-[1.15] text-slate-900 sm:text-5xl lg:text-6xl">
              Legal sector accounting insights
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-700 sm:mt-6 sm:text-lg">
              {posts.length} articles on the SRA Accounts Rules, client account handling, partnership
              and LLP tax, VAT on legal work, and practice succession. Written for solicitors and law
              firm managers, and kept current against HMRC rates and SRA requirements.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href="#book"
                data-cta="blog_hero_book"
                data-cta-placement="hero"
                data-cta-goal="form"
                className={btnPrimary}
              >
                Book a free consultation
              </Link>
              <Link
                href="/solicitor-guides"
                data-cta="blog_hero_guides"
                data-cta-placement="hero"
                className={btnOnCream}
              >
                Read the pillar guides
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Browse by topic</Eyebrow>
          <h2 className="mb-8 text-2xl font-bold text-slate-900 sm:text-4xl">
            Comprehensive guides by topic
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/blog/${cat.slug}`}
                className={`group block rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70 transition-all hover:shadow-md ${focusRing}`}
              >
                <h3 className="text-base font-bold text-slate-900 transition-colors group-hover:text-primary-700 sm:text-lg">
                  {cat.name}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {cat.count} {cat.count === 1 ? "article" : "articles"}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary-700">
                  Explore guides
                  <ArrowRight
                    aria-hidden
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="articles" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>The archive</Eyebrow>
          <h2 className="mb-8 text-2xl font-bold text-slate-900 sm:text-4xl">All articles</h2>
          <BlogListWithSearch posts={postsForList} categories={categories} readTimes={readTimes} />
        </div>
      </section>

      {/* The blog index is the top of the funnel and ended at the pagination
          with no ask at all (DS 0.5). In-flow closing panel, not an
          interruptive surface: the reader meets it only after scrolling past
          the archive. */}
      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          title="Rather have someone read your firm's numbers than read the archive?"
          description="A free consultation with an accountant who works with SRA regulated firms every day. Tell us how the practice is structured and what is on your mind, and we will come back with clear next steps."
          proofPoints={[
            {
              title: "SRA Accounts Rules 2019",
              detail:
                "Client account, five-weekly reconciliations under Rule 8.3, and the Rule 12 accountant's report",
            },
            {
              title: "Partnership, LLP and incorporated",
              detail:
                "Profit shares, the salaried member rules and the tax that follows each structure",
            },
            {
              title: "Positions traced to source",
              detail:
                "Every rule and figure we quote is cited to the SRA rules, HMRC published guidance, case law or the legislation itself",
            },
          ]}
          form={<LeadForm redirectOnSuccess={false} />}
          backdrop={<SolicitorsBackdrop tone="navy" />}
          footnote="No obligation and no hard sell. If your position is already right, we will say so."
        />
      </div>

      {/* Light band between the navy panel and the navy footer: navy never
          touches navy (DS 0.1). Doubles as the next step for readers not ready
          to enquire. */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Free tools</Eyebrow>
          <h2 className="mb-2 text-2xl font-bold text-slate-900 sm:text-4xl">
            Put numbers on what you just read
          </h2>
          <p className="mb-8 text-base text-slate-600 sm:text-lg">
            {genericTools().length} free calculators for UK law firms, on current rates. Start with
            the ones solicitors reach for most.
          </p>
          <div className="flex flex-wrap gap-3">
            {bridgeTools.map((tool) => (
              <Link
                key={tool.slug}
                href={toolPath(tool.slug)}
                className={`inline-flex min-h-12 items-center rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-900 shadow-sm ring-1 ring-slate-200/70 transition-all hover:text-primary-700 hover:shadow-md sm:text-base ${focusRing}`}
              >
                {tool.name}
              </Link>
            ))}
          </div>
          <Link
            href="/calculators"
            data-cta="blog_calculators_all"
            data-cta-placement="calculator_bridge"
            className={`mt-8 inline-flex items-center gap-1.5 rounded py-1 text-sm font-bold text-primary-700 transition-colors hover:text-primary-800 sm:text-base ${focusRing}`}
          >
            View all {genericTools().length} calculators
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
