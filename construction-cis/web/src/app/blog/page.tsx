import type { Metadata } from "next";
import Link from "next/link";
import { siteContainerLg, sectionYLoose, focusRing } from "@/components/ui/layout-utils";
import { getAllPosts, getAllCategories, calculateReadTime, getCategorySlug } from "@/lib/blog";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { BlogListWithSearch } from "@/components/blog/BlogListWithSearch";
import { JsonLd } from "@/components/ui/JsonLd";
import { TradeBackdrop } from "@/components/layout/TradeBackdrop";
import { LeadCTAPanel } from "@/components/marketing/LeadCTAPanel";
import { btnPrimary } from "@/components/ui/layout-utils";

export const metadata: Metadata = {
  title: "CIS and Construction Tax Blog | Guides and Articles",
  description:
    "Practical CIS and construction tax guides. CIS deductions, refunds, gross payment status, VAT reverse charge, expenses and limited company accounting. Written by specialist CIS accountants.",
  alternates: { canonical: `${siteConfig.url}/blog` },
  openGraph: {
    title: "CIS and Construction Tax Blog | Guides and Articles",
    description:
      "Practical CIS and construction tax guides. CIS deductions, refunds, gross payment status, VAT reverse charge, expenses and limited company accounting. Written by specialist CIS accountants.",
    url: `${siteConfig.url}/blog`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CIS and Construction Tax Blog | Guides and Articles",
    description:
      "Practical CIS and construction tax guides. CIS deductions, refunds, gross payment status, VAT reverse charge, expenses and limited company accounting. Written by specialist CIS accountants.",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  // Project to card metadata only. Spreading the whole post here serialized every
  // article's contentHtml into the client flight payload (2.3 MB on this route).
  // The list never reads contentHtml; read times are precomputed server-side below.
  const postsWithCategorySlug = posts.map((p) => ({
    title: p.title,
    summary: p.summary,
    category: p.category,
    slug: p.slug,
    date: p.date,
    categorySlug: getCategorySlug(p),
  }));
  const categories = getAllCategories();
  const readTimes = new Map(posts.map((p) => [p.slug, calculateReadTime(p.contentHtml)]));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "CIS and construction tax blog",
          url: `${siteConfig.url}/blog`,
          description:
            "Practical CIS and construction tax guides from specialist CIS accountants.",
          isPartOf: { "@type": "WebSite", url: siteConfig.url },
          hasPart: postsWithCategorySlug.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: `${siteConfig.url}/blog/${p.categorySlug}/${p.slug}`,
            datePublished: p.date,
          })),
        }}
      />

      <section className="relative overflow-hidden border-b border-neutral-200 bg-[var(--dark)] py-16 sm:py-20">
        <TradeBackdrop tone="navy" />
        <div className={`${siteContainerLg} relative z-10`}>
          <Breadcrumb
            variant="light"
            items={[
              { label: "Home", href: "/" },
              { label: "Blog" },
            ]}
          />
          <p className="mt-6 text-xs font-bold uppercase tracking-wider text-orange-400">
            CIS guides
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            CIS and construction tax, explained.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300">
            Practical guides on CIS deductions, refunds, gross payment status, VAT reverse charge, expenses and limited company accounting for construction. Written by specialist CIS accountants.
          </p>
          {/* Section 0.5: a page a reader can scroll to the bottom of without
              meeting an ask is not finished, and the hero primary scrolls to the
              on-page form rather than leaving for /contact. Hash links are not
              counted by the sweep's link metric, so this changes no link floor. */}
          <div className="mt-8">
            <a
              href="#enquiry-form"
              className={btnPrimary}
              data-cta="blog_index_primary"
              data-cta-placement="hero"
              data-cta-goal="lead"
            >
              Talk to a CIS accountant
            </a>
          </div>
        </div>
      </section>

      {categories.length > 0 && (
        <section className="border-b border-neutral-200 bg-[var(--hero-cream)] py-8 sm:py-10">
          <div className={siteContainerLg}>
            <p className="text-sm font-medium text-neutral-500 mb-4">Browse by topic</p>
            {/* 48px chips, not cards: the card grid was the only article-index
                surface on the site using a text-only card, and the chip band
                keeps all eight hub destinations one tap away above the list. */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/blog/${cat.slug}`}
                  className={`inline-flex min-h-12 items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 text-sm font-bold text-neutral-900 transition-colors hover:border-[var(--btn-ground)] hover:text-[var(--accent-strong)] ${focusRing}`}
                >
                  {cat.name}
                  <span className="text-xs font-medium text-neutral-500">{cat.count}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className={`bg-white ${sectionYLoose}`}>
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 mb-6 sm:text-3xl">
            All articles
          </h2>
          <BlogListWithSearch
            posts={postsWithCategorySlug}
            categories={categories}
            readTimes={readTimes}
          />
        </div>
      </section>

      {/* The closing ask (section D.3). /blog made no ask at all before this.
          `contained` on purpose: the footer is bg-slate-900, the navy variant
          would be the last band before it, and DESIGN_SYSTEM.md section 9 says
          navy must never touch navy. Tail is now white list, cream panel, navy
          footer. Static band in the page body: nothing interruptive. */}
      <div id="enquiry-form" className="scroll-mt-24">
        <LeadCTAPanel
          contained
          title="Not sure which of these applies to you?"
          description="Reading a guide is not the same as having someone check your figures. Tell us where you are up to and we will tell you what CIS means for your money this year."
          proofPoints={[
            {
              title: "CIS specialists only",
              detail: "Construction tax is the whole of what we do, not a sideline.",
            },
            {
              title: "Fees agreed before any work starts",
              detail: "The specialist firm you speak to sets its own fee and agrees it with you up front.",
            },
            {
              title: "No hard sell, no obligation",
              detail: "If your position is already right, we will say so.",
            },
          ]}
        />
      </div>
    </>
  );
}
