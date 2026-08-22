import type { Metadata } from "next";
import { HeroBrickBackdrop } from "@/components/layout/HeroBrickBackdrop";
import Link from "next/link";
import { btnOnCream, btnPrimary, focusRing, heroCreamSurface, siteContainerLg } from "@/components/ui/layout-utils";
import {
  getAllPosts,
  getAllCategories,
  getCategorySlug,
  categoryDisplayName,
  calculateReadTime,
} from "@/lib/blog";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { BlogListWithSearch } from "@/components/blog/BlogListWithSearch";
import { essentialGuides, guideGroups } from "@/lib/essential-guides";
import { LeadCTAPanel } from "@/components/property/LeadCTAPanel";
import { TOOLS } from "@/lib/calculators/registry";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Briefcase,
  Building2,
  CalendarClock,
  Globe,
  Home,
  Landmark,
  Percent,
  TrendingUp,
  Warehouse,
  type LucideIcon,
} from "lucide-react";
import { Eyebrow } from "@/components/ui/page-blocks";

// Icon per category hub, keyed by slug. The "Browse by topic" cards were the
// only text-only cards left on the site; these tie them into the icon-badge
// language everything else uses. BookOpen is the fallback for any category
// added to the content without a mapping here.
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "capital-gains-tax": TrendingUp,
  "incorporation-and-company-structures": Building2,
  "landlord-tax-essentials": Home,
  "making-tax-digital-mtd": CalendarClock,
  "non-resident-landlord-tax": Globe,
  "portfolio-management": BarChart3,
  "property-accountant-services": Briefcase,
  "property-finance": Landmark,
  "property-types-and-specialist-tax": Warehouse,
  "section-24-and-tax-relief": Percent,
};

// The five calculators the /calculators gallery leads with, in the same
// landlord decision-journey order. Resolved against the registry so a renamed
// or removed tool breaks the build here rather than drifting.
const BRIDGE_CALCULATOR_SLUGS = [
  "stamp-duty-calculator",
  "section-24-calculator",
  "incorporation-cost-calculator",
  "mtd-checker",
  "portfolio-profitability-calculator",
];

export const metadata: Metadata = {
  title: "Blog | Property Tax Insights for UK Landlords",
  description:
    "Property tax guides for UK landlords: Section 24, MTD, capital gains tax, incorporation, SDLT, inheritance tax and VAT. By specialist property accountants.",
  alternates: { canonical: `${siteConfig.url}/blog` },
  openGraph: {
    title: "Blog | Property Tax Insights for UK Landlords",
    description:
      "Property tax guides for UK landlords: Section 24, MTD, capital gains tax, incorporation, SDLT, inheritance tax, and VAT. Written by specialist property accountants.",
    url: `${siteConfig.url}/blog`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Property Tax Insights for UK Landlords",
    description:
      "Property tax guides for UK landlords: Section 24, MTD, capital gains tax, incorporation, SDLT, inheritance tax, and VAT. Written by specialist property accountants.",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const readTimes = new Map(posts.map((p) => [p.slug, calculateReadTime(p.contentHtml)]));

  // Project to metadata only. Spreading the full post here serializes every
  // article's contentHtml into the client payload, which pushed /blog past
  // Vercel's 19 MB body limit (FALLBACK_BODY_TOO_LARGE). The list never reads
  // contentHtml; read times are precomputed server-side and passed separately.
  const postsForList = posts.map((post) => {
    const categorySlug = getCategorySlug(post);
    return {
      title: post.title,
      summary: post.summary,
      // Canonical hub name, not the raw frontmatter: the corpus spells the
      // same category several ways and the card eyebrows showed the drift.
      category: categoryDisplayName(categorySlug, post.category),
      slug: post.slug,
      date: post.date,
      categorySlug,
    };
  });

  const bridgeCalculators = BRIDGE_CALCULATOR_SLUGS.map((slug) =>
    TOOLS.find((tool) => tool.slug === slug)
  ).filter((tool): tool is (typeof TOOLS)[number] => Boolean(tool));

  return (
    <>
      <section className={`relative flex items-center py-10 sm:py-12 lg:py-14 min-h-[350px] overflow-hidden ${heroCreamSurface}`}>
        <HeroBrickBackdrop tone="cream" />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Blog" },
              ]}
            />
            <h1 className="mt-6 text-4xl font-bold text-slate-900 sm:text-5xl lg:text-6xl">Property tax insights</h1>
            <p className="mt-4 text-xl text-slate-900">
              Practical notes on tax, accounts, and property economics, written for landlords, not generic SMEs.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href="#book"
                data-cta="blog_hero_book"
                data-cta-placement="hero"
                data-cta-goal="form"
                className={btnPrimary}
              >
                Book free consultation
              </Link>
              <Link href="#guides" data-cta="blog_hero_guides" data-cta-placement="hero" className={btnOnCream}>
                Start with the essential guides
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="guides" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-6xl">
            <Eyebrow>Essential guides</Eyebrow>
            {/* The eyebrow already says "essential guides"; repeating it in the
                heading said the same thing twice in two lines. */}
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl mb-2">
              Start here
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mb-8">
              The canonical guide for each major property tax topic. Start with these, then dig into the full library below.
            </p>
            <div className="space-y-10 sm:space-y-12">
              {guideGroups.map((g) => (
              <div key={g.key}>
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">{g.label}</h3>
                  <p className="mt-1 text-sm text-slate-500">{g.blurb}</p>
                </div>
                <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {essentialGuides.filter((guide) => guide.group === g.key).map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="group flex flex-col rounded-xl bg-slate-50 p-5 sm:p-6 shadow-sm border border-transparent transition-all hover:border-emerald-600 hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100 mb-3 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                    <guide.icon aria-hidden className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {guide.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{guide.blurb}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600">
                    Read the guide
                    <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
                </div>
              </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-6xl">
            <Eyebrow>Browse by topic</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl mb-8">
              Comprehensive guides by topic
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((cat) => {
                const Icon = CATEGORY_ICONS[cat.slug] ?? BookOpen;
                return (
                  <Link
                    key={cat.slug}
                    href={`/blog/${cat.slug}`}
                    className="group block bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-emerald-600 transition-all"
                  >
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                      <Icon aria-hidden className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">
                      {cat.count} {cat.count === 1 ? "article" : "articles"}
                    </p>
                    <div className="mt-4 flex items-center text-emerald-600 font-medium text-sm">
                      Explore guides
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-6xl">
            <Eyebrow>The archive</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl mb-8">All articles</h2>
            <BlogListWithSearch posts={postsForList} categories={categories} readTimes={readTimes} />
          </div>
        </div>
      </section>

      {/* The blog index is the top of the SEO funnel and previously ended at
          the pagination with no conversion surface at all: no form, no CTA, no
          route into the tools. Close with the same navy panel the rest of the
          site ends on, then the calculator bridge as the light section between
          the navy panel and the navy footer (the LeadCTAPanel adjacency rule),
          which doubles as the next step for readers not ready to book. */}
      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          title="Get your property tax sorted"
          description="Reading up is the right first step. The second is a specialist looking at your actual numbers. Tell us what you own, how it is held and what is on your mind, and we will come back within 24 hours with clear recommendations and a fixed fee in writing."
          proofPoints={[
            { title: "Property tax only", detail: "Section 24, CGT and MTD every day" },
            { title: "Fixed fees, quoted upfront", detail: "In writing, before any work starts" },
            { title: "Same accountant every time", detail: "You are not passed around a team" },
          ]}
          footnote="No obligation and no hard sell. If your position is already right, we will say so."
        />
      </div>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-6xl">
            <Eyebrow>Free tools</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl mb-2">
              Put numbers on what you just read
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mb-8">
              {TOOLS.length} free calculators, kept current for 2026/27. Start with the five landlords use most.
            </p>
            <div className="flex flex-wrap gap-3">
              {bridgeCalculators.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/calculators/${tool.slug}`}
                  data-cta={`blog_calc_${tool.slug}`}
                  data-cta-placement="calculator_bridge"
                  className={`inline-flex min-h-12 items-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-900 shadow-sm transition-all hover:border-emerald-600 hover:text-emerald-700 hover:shadow-md sm:text-base ${focusRing}`}
                >
                  {tool.name}
                </Link>
              ))}
            </div>
            <Link
              href="/calculators"
              data-cta="blog_calculators_all"
              data-cta-placement="calculator_bridge"
              className={`mt-8 inline-flex items-center gap-1.5 rounded py-1 text-sm font-bold text-emerald-600 transition-colors hover:text-emerald-700 sm:text-base ${focusRing}`}
            >
              View all {TOOLS.length} calculators
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
