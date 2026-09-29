import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getAllCategories, calculateReadTime, getCategorySlug } from "@/lib/blog";
import { siteConfig } from "@/config/site";
import { focusRing } from "@/components/ui/layout-utils";
import { niche } from "@/config/niche-loader";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "Ecommerce Tax Guides for Online Sellers",
  description: "Practical guides on VAT, platform reporting, Amazon and marketplace selling, bookkeeping, business structure and Making Tax Digital for UK online sellers.",
  alternates: { canonical: `${siteConfig.url}/blog` },
};

// KIT ADOPTION, decided not taken:
//
// `packages/web-shared/design/blog/BlogListWithSearch.tsx` is a client
// component that hardcodes `postsPerPage = 12` (no prop to change it) and
// slices its list to `paginatedPosts` behind `useState(1)`. Next SSRs a
// client component with its initial state, so with this site's 14 posts
// (totalPages = ceil(14/12) = 2) only the first 12 would ever land in the
// server HTML - the exact defect this package exists to avoid. Declined.
//
// `packages/web-shared/design/primitives/NumberedPagination.tsx` is only
// reachable through that same slice and the corpus (14 posts) does not
// warrant pagination of any kind. Declined for the same reason plus
// insufficient corpus.
//
// Kept the local list, restyled onto this site's own phase-1 tokens
// (`primary-600`, `--focus-ring`) instead of forking new ones.
export default function BlogIndexPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  return (
    <>
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Ecommerce tax, explained.</h1>
      {categories.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/blog/${cat.slug}`}
              className={`rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:border-primary-600 hover:text-primary-700 ${focusRing}`}
            >
              {cat.name} ({cat.count})
            </Link>
          ))}
        </div>
      )}
      <ul className="mt-10 space-y-8">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${getCategorySlug(post)}/${post.slug}`} className={`group block rounded-md ${focusRing}`}>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary-700">{post.category} &middot; {calculateReadTime(post.contentHtml)} min read</p>
              <h2 className="mt-1 text-xl font-semibold text-slate-900 group-hover:underline">{post.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{post.metaDescription}</p>
            </Link>
          </li>
        ))}
        {posts.length === 0 && <li className="text-slate-400 text-sm">No posts yet.</li>}
      </ul>
    </div>
    {/* Closing capture (U3, owner gate D3: "enquiry form on every money page").
        /blog had zero capture below the header. Copy is the site's own
        niche.config.json `blog` triple, already published on every post's
        end-of-article form (blog/[category]/[slug]/page.tsx) - nothing
        authored here. eyebrow/formTitle empty and proofPoints=[] match the
        established call-site pattern on this site (about, for, services, vat:
        no authored offer line, no authored proof-point set). LeadForm emits no
        data-cta of its own (documented site-wide, e.g. for/[slug]/page.tsx),
        so this panel is silent in vw_cta_performance until kit gap C1 lands -
        a manager carve-out, not a U3 file. */}
    <LeadCTAPanel
      eyebrow=""
      title={niche.blog.cta_heading}
      description={niche.blog.cta_body}
      proofPoints={[]}
      formTitle=""
      form={<LeadForm submitLabel={niche.blog.cta_button} />}
    />
    </>
  );
}
