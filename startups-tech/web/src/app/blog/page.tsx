import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getAllCategories, calculateReadTime, getCategorySlug } from "@/lib/blog";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { LeadForm } from "@/components/forms/LeadForm";
import { niche } from "@/config/niche-loader";
import { contentNarrow, focusRing } from "@/components/ui/layout-utils";

export const metadata: Metadata = {
  title: "Startup & Tech Tax Blog | UK Founder Guides",
  description: "Practical guides on R&D relief, SEIS and EIS, EMI and share schemes, founder tax and startup compliance for UK founders and tech companies.",
  alternates: { canonical: `${siteConfig.url}/blog` },
};

// KIT ADOPTION, decided not taken.
//
// `packages/web-shared/design/blog/BlogListWithSearch.tsx` is a client
// component that hardcodes `postsPerPage = 12` (there is no prop for it) and
// slices its list to `paginatedPosts` behind `useState(1)`. Next SSRs a client
// component with its INITIAL state, so with this site's 32 posts
// (totalPages = ceil(32/12) = 3) only the first 12 post links would ever reach
// the server HTML. This route's measured link floor is 37
// (`docs/startups-tech/_port/sweep_baseline.json`: 5 category links + 32 post
// links), and the sliced version serves roughly 12 + 5 = 17. Measured, not
// stylistic. The same cap is live on six sibling sites (memory
// `kit_blog_list_12_post_cap`). Declined.
//
// `packages/web-shared/design/primitives/NumberedPagination.tsx` is only
// reachable through that same slice, so declining the list declines this too.
//
// Kept the local list, restyled onto this site's phase-1 tokens (`primary-*`
// and `--focus-ring` via the local `focusRing`) rather than forking new ones.
export default function BlogIndexPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  return (
    <>
    <div className={`${contentNarrow} py-16`}>
      <Breadcrumb
        siteUrl={siteConfig.url}
        items={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Startup and tech tax, explained.</h1>
      {categories.length > 0 && (
        <div className="mt-8">
          <Eyebrow>Topics</Eyebrow>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/blog/${cat.slug}`}
                className={`inline-flex min-h-12 items-center gap-2 rounded-xl ring-1 ring-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-all hover:ring-primary-600 hover:text-primary-700 hover:shadow-md ${focusRing}`}
              >
                {cat.name}
                <span className="text-xs font-semibold text-slate-500">{cat.count}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
      <div className="mt-12">
        <Eyebrow>The library</Eyebrow>
        <ul className="space-y-8">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${getCategorySlug(post)}/${post.slug}`} className={`group block rounded-xl ${focusRing}`}>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary-700">{post.category} &middot; {calculateReadTime(post.contentHtml)} min read</p>
                <h2 className="mt-1 text-xl font-semibold text-slate-900 group-hover:underline">{post.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{post.metaDescription}</p>
              </Link>
            </li>
          ))}
          {posts.length === 0 && <li className="text-slate-400 text-sm">No posts yet.</li>}
        </ul>
      </div>
    </div>
    {/* A.4/A.7: LeadCTAPanel mount, absent on this route until now. Fed the
        one global blog CTA triple already published in niche.config.json
        (`blog.cta_heading` / `cta_body` / `cta_button`); no copy authored.
        R5-B2 fix: no `data-cta` on this wrapper. autoCapture resolves clicks
        via closest("[data-cta]"), so an id here would claim every field focus
        and link click inside LeadCTAPanel. Generalist's `blog_index_book` /
        `blog_index_articles` ids sit on anchor links in a hero block this site
        does not have (see comment above); the LeadForm inside submits with the
        site-wide constant form id (lead_form) plus source_url, so this panel is
        attributed by page, not by a per-panel id, like every LeadCTAPanel here. */}
    <div id="blog-lead-panel">
      <LeadCTAPanel
        title={niche.blog.cta_heading}
        description={niche.blog.cta_body}
        proofPoints={[]}
        form={<LeadForm submitLabel={niche.blog.cta_button} redirectOnSuccess={false} />}
      />
    </div>
    </>
  );
}
