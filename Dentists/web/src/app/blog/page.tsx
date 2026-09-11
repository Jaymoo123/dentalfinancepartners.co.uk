import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { btnGold, btnOnDark, focusRing, siteContainerLg } from "@/components/ui/layout-utils";
import { getAllPosts, getAllCategories, calculateReadTime, getCategorySlug } from "@/lib/blog";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { DentistsBackdrop } from "@/components/layout/DentistsBackdrop";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteConfig } from "@/config/site";
import { BlogListWithSearch } from "@/components/blog/BlogListWithSearch";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "UK dental accounting and tax articles for associates, practice owners, and managers. NHS/private mixes, compliance, and profit.",
  alternates: { canonical: `${siteConfig.url}/blog` },
  openGraph: {
    title: "Blog",
    description:
      "UK dental accounting and tax articles for associates, practice owners, and managers. NHS/private mixes, compliance, and profit.",
    url: `${siteConfig.url}/blog`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog",
    description:
      "UK dental accounting and tax articles for associates, practice owners, and managers. NHS/private mixes, compliance, and profit.",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const readTimes = new Map(posts.map((p) => [p.slug, calculateReadTime(p.contentHtml)]));

  // Project to the fields the list actually reads. The old `{...p}` spread
  // serialised all 223 `contentHtml` bodies (plus every post's `faqs` and
  // verbatim `schema`) into a "use client" payload; Property hit Vercel's 19 MB
  // ISR body limit the same way. `contentHtml` is kept as an empty string only
  // because the list component's prop type is `BlogPost & { categorySlug }` and
  // that file belongs to another work package this phase.
  // ponytail: a projection, not a new list component, and no cast.
  const postsForList = posts.map((post) => ({
    title: post.title,
    slug: post.slug,
    summary: post.summary,
    category: post.category,
    categorySlug: getCategorySlug(post),
    date: post.date,
    author: post.author,
    metaTitle: post.metaTitle,
    metaDescription: post.metaDescription,
    h1: post.h1,
    contentHtml: "",
  }));

  // CollectionPage only. The `Breadcrumb` component already emits its own
  // BreadcrumbList JSON-LD (`components/ui/Breadcrumb.tsx` -> `buildBreadcrumbJsonLd`),
  // so adding a second one here would double-emit it.
  const collectionJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Insights for UK dental practices",
    description:
      "Articles on tax, accounts and practice economics for UK associates, principals and practice managers.",
    url: `${siteConfig.url}/blog`,
    isPartOf: { "@type": "WebSite", url: siteConfig.url, name: siteConfig.name },
    hasPart: categories.map((cat) => ({
      "@type": "CollectionPage",
      name: cat.name,
      url: `${siteConfig.url}/blog/${cat.slug}`,
    })),
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: collectionJsonLd }} />

      {/* Navy motif hero. Buttons are measured against THIS ground, not white:
          `btnPrimary` is navy on navy (1.00) and is the phase 1 invisible-CTA
          defect, so the dark-ground recipe is `btnGold` (navy label on gold,
          6.23) with the ghost outline beside it. */}
      <section className="relative flex items-center overflow-hidden py-10 sm:py-12 lg:py-14">
        <DentistsBackdrop tone="navy" />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Breadcrumb
              variant="light"
              items={[
                { label: "Home", href: "/" },
                { label: "Blog" },
              ]}
            />
            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Insights for UK dental practices
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-200 sm:text-xl">
              Practical notes on tax, accounts and practice economics, written for associates,
              principals and practice managers, not generic SMEs.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href="#book"
                data-cta="blog_index_book"
                data-cta-placement="hero"
                data-cta-goal="form"
                className={btnGold}
              >
                Talk to a dental accountant
              </Link>
              <Link
                href="#topics"
                data-cta="blog_index_topics"
                data-cta-placement="hero"
                className={btnOnDark}
              >
                Browse by topic
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="topics" className="scroll-mt-24 bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <Eyebrow>Browse by topic</Eyebrow>
          <h2 className="mb-6 text-2xl font-bold text-slate-900 sm:text-3xl">
            Comprehensive guides by topic
          </h2>
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/blog/${cat.slug}`}
                className={`group block rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-primary-700 hover:shadow-md ${focusRing}`}
              >
                <h3 className="text-base font-bold text-slate-900 transition-colors group-hover:text-primary-700 sm:text-lg">
                  {cat.name}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {cat.count} {cat.count === 1 ? "article" : "articles"}
                </p>
                <span className="mt-4 inline-flex items-center text-sm font-bold text-primary-700">
                  Explore guides
                  {/* Inline chevron, not a lucide icon: `lucide-react` is not a
                      declared dependency of this site and adding one for a
                      caret would fail the dependency-closure check (T24). */}
                  <svg
                    aria-hidden
                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <Eyebrow>The archive</Eyebrow>
          <h2 className="mb-6 text-2xl font-bold text-slate-900 sm:text-3xl">All articles</h2>
          <BlogListWithSearch posts={postsForList} categories={categories} readTimes={readTimes} />
        </div>
      </section>

      {/* This route had no capture surface at all, on the site's second busiest
          page family. In-flow closing panel, at the end of the page, no gate and
          nothing interruptive. `contained` because the footer is navy and a
          full-bleed navy panel directly above it reads as one slab. */}
      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          contained
          ground="white"
          title="Get a dental specialist on your numbers"
          description="Reading up is the right first step. The next one is someone looking at your actual position: your NHS and private mix, how you are set up, and what you are planning next. Tell us where you are and we will come back with a clear view of your options. No obligation and no hard sell. If your current arrangement is already right for you, we will say so."
          proofPoints={[
            { title: "Dental practices only", detail: "NHS pensions, UDAs and practice sales every day" },
            { title: "One accountant throughout", detail: "You speak to the person doing the work" },
            { title: "Answers in writing", detail: "What we advise, and the reasoning behind it" },
          ]}
          form={<LeadForm redirectOnSuccess={false} submitLabel="Request a call back" />}
        />
      </div>
    </>
  );
}
