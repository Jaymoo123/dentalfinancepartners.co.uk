import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  siteContainerLg,
  contentNarrow,
  focusRing,
  btnPrimary,
  btnOnDark,
} from "@/components/ui/layout-utils";
import { getAllPosts, getAllCategories, calculateReadTime, getCategorySlug } from "@/lib/blog";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { BlogListWithSearch } from "@/components/blog/BlogListWithSearch";
import { MedicalBackdrop } from "@/components/layout/MedicalBackdrop";
import { LeadForm } from "@/components/forms/LeadForm";
import { genericTools, toolPath } from "@/lib/tools/registry";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";

export const metadata: Metadata = {
  title: "Medical Accounting Blog | GP Tax & NHS Pension Advice",
  description:
    "Expert articles on GP tax planning, NHS pension annual allowance, locum tax returns, and private practice accounting. Written by medical accounting specialists for UK doctors.",
  alternates: { canonical: `${siteConfig.url}/blog` },
  openGraph: {
    title: "Medical Accounting Blog | GP Tax & NHS Pension Advice",
    description:
      "Expert articles on GP tax planning, NHS pension annual allowance, locum tax returns, and private practice accounting for UK doctors.",
    url: `${siteConfig.url}/blog`,
    type: "website",
    images: [{ url: `/api/og?title=${encodeURIComponent("Medical Accounting Blog | GP Tax & NHS Pension Advice")}`, width: 1200, height: 630, alt: "Medical Accounting Blog | GP Tax & NHS Pension Advice" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Medical Accounting Blog | GP Tax & NHS Pension Advice",
    description: "Expert articles on GP tax planning, NHS pension annual allowance, locum tax returns, and private practice accounting for UK doctors.",
  },
};

/* Proof points describe the MATCH, never work done in house. This site takes an
   enquiry and passes it to a specialist firm from the partner network, which is
   what the privacy policy discloses, so copy that implies our own accountants do
   the work contradicts our own disclosure (owner decision 5). */
const LEAD_PROOF_POINTS = [
  {
    title: "Matched to a specialist firm",
    detail:
      "Your enquiry goes to accountants who work with GP partnerships, salaried and locum doctors, and consultants with private practice income, not to a generalist who has to translate your pay statements first.",
  },
  {
    title: "NHS pension taken seriously",
    detail:
      "Annual allowance, tapering, scheme pays and the tiered contribution bands, worked against your own figures rather than a rule of thumb.",
  },
  {
    title: "A straight answer on structure",
    detail:
      "Sole trader, partnership or limited company, with the arithmetic behind the answer shown to you, including when the answer is to change nothing.",
  },
];

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  // PROJECTION, load-bearing. `BlogPost` carries `contentHtml` (src/lib/blog.ts),
  // so handing `posts` straight to the client list serialised the full HTML body
  // of all 88 articles into this route's RSC flight payload: /blog served
  // 2,650,184 bytes. The list renders only these seven fields, and read time is
  // computed here, server-side, from the body that never crosses the boundary.
  const postsForList = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    summary: p.summary,
    category: p.category,
    categorySlug: getCategorySlug(p),
    date: p.date,
    readTime: calculateReadTime(p.contentHtml),
  }));

  // ponytail: first five in registry order, which is the gallery's own display
  // order, rather than a second hand-kept list that would drift.
  const bridgeTools = genericTools().slice(0, 5);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` },
        ],
      },
      {
        "@type": "CollectionPage",
        name: "Medical accounting insights for UK doctors",
        description: metadata.description,
        url: `${siteConfig.url}/blog`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative flex min-h-[300px] items-center overflow-hidden bg-slate-900 py-10 sm:min-h-[350px] sm:py-12 lg:py-14">
        <MedicalBackdrop tone="navy" />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className={contentNarrow}>
            <Breadcrumb
              suppressJsonLd
              variant="light"
              items={[{ label: "Home", href: "/" }, { label: "Blog" }]}
            />
            <Eyebrow onDark>The archive</Eyebrow>
            <h1 className="text-3xl font-bold leading-[1.15] text-white sm:text-5xl lg:text-6xl">
              Medical accounting insights for UK doctors
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-300 sm:mt-6 sm:text-lg">
              {posts.length} articles on GP tax planning, the NHS pension annual allowance, locum
              tax returns and private practice structures. Written for doctors and practice
              managers, and kept current against HMRC rates and NHS scheme rules.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href="#book"
                data-cta="blog_index_hero_book"
                data-cta-placement="blog_hero"
                data-cta-goal="form"
                className={btnPrimary}
              >
                Send us your position
              </Link>
              <Link
                href="#articles"
                data-cta="blog_index_hero_articles"
                data-cta-placement="blog_hero"
                className={btnOnDark}
              >
                Browse the articles
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* One merged filter band. The 120px "Comprehensive Guides by Topic" card
          grid and the list's own category array were two competing lists of the
          same eight hubs; these chips are the single one. Derived from
          getAllCategories(), never from niche.config.json, which carries a
          ninth configured category with zero posts and no hub route. */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Browse by topic</Eyebrow>
          <h2 className="mb-8 text-2xl font-bold text-slate-900 sm:text-4xl">
            Guides by topic
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/blog/${cat.slug}`}
                className={`inline-flex min-h-12 items-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-900 transition-colors hover:border-primary-600 hover:text-primary-700 sm:text-base ${focusRing}`}
              >
                {cat.name}
                <span className="text-xs font-medium text-slate-500">{cat.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="articles" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Every article</Eyebrow>
          <h2 className="mb-8 text-2xl font-bold text-slate-900 sm:text-4xl">All articles</h2>
          <BlogListWithSearch posts={postsForList} />
        </div>
      </section>

      {/* The index is the top of the funnel and had no ask anywhere on it.
          In-flow closing panel, met only after the archive. */}
      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          title="Would you rather we read your figures than have you read the archive?"
          description="Tell us how you are paid and what is on your mind, and we will match your enquiry to a regulated firm that works with doctors every day. Scope and fees are agreed with that firm, and sending the enquiry commits you to nothing."
          proofPoints={LEAD_PROOF_POINTS}
          form={<LeadForm redirectOnSuccess={false} />}
          backdrop={<MedicalBackdrop tone="navy" />}
          footnote="No obligation and no hard sell. If the specialist firm thinks your position is already right, they will tell you so."
        />
      </div>

      {/* Light band between the navy panel and the navy footer: navy never
          touches navy. Doubles as the next step for readers not ready to ask. */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Free tools</Eyebrow>
          <h2 className="mb-2 text-2xl font-bold text-slate-900 sm:text-4xl">
            Put numbers on what you just read
          </h2>
          <p className="mb-8 text-base text-slate-600 sm:text-lg">
            {genericTools().length} free calculators for UK doctors, on current rates. Start with
            the ones doctors reach for most.
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
            data-cta="blog_index_calculators_all"
            data-cta-placement="blog_calculator_bridge"
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
