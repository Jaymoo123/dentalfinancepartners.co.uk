import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getAllCategories, calculateReadTime, getCategorySlug } from "@/lib/blog";
import { siteConfig } from "@/config/site";
import { niche } from "@/config/niche-loader";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { LeadForm } from "@/components/forms/LeadForm";
import { contentNarrow, focusRing } from "@/components/ui/layout-utils";

export const metadata: Metadata = {
  title: "Hospitality Accounting Blog | Guides and Articles",
  description:
    "Practical guides on tronc, tips, food VAT, payroll, business rates and hospitality finance for UK pub, restaurant, hotel, cafe and takeaway operators.",
  alternates: { canonical: `${siteConfig.url}/blog` },
};

/*
 * KIT ADOPTION LEDGER FOR THIS ROUTE (playbook gate 9.1).
 *
 * ADOPTED: packages/web-shared/design/primitives/Breadcrumb.tsx (tone omitted =
 * "default", this route's ground is white), and
 * packages/web-shared/design/marketing/LeadCTAPanel.tsx at the foot.
 *
 * DECLINED: packages/web-shared/design/blog/BlogListWithSearch.tsx. It
 * hardcodes `postsPerPage = 12` at :43 with no prop for it and SLICES to
 * `paginatedPosts` at :91 behind `useState(1)`, so Next SSRs only the first
 * page: 12 of this site's 23 post links would reach the server HTML. This
 * route's measured floor is 37 (docs/hospitality/_port/sweep_baseline.json).
 * Measured, not stylistic. Same cap is live on six sibling sites (memory
 * `kit_blog_list_12_post_cap`).
 *
 * DECLINED: packages/web-shared/design/primitives/NumberedPagination.tsx. Only
 * reachable through that slice; declining the list declines this.
 *
 * DECLINED: packages/web-shared/design/blog/HubArticleList.tsx. Its card type
 * (HubArticleList.tsx:9-27) carries slug/title/summary/readTime/date and has NO
 * field for a per-card category label; its card markup (:88-119) renders none.
 * This route is the only one on the site that mixes all eight categories, and
 * every card here publishes `{post.category} · {n} min read` today. Adopting it
 * would DELETE that published label on all 23 cards, which owner ruling 4
 * forbids. It IS adopted on /blog/[category], where every card is the one
 * category named in the h1 and nothing is lost. Testable: grep the rendered
 * /blog HTML for a category name and it is still there.
 *
 * ADOPTED (M1a item 3): packages/web-shared/design/primitives/page-blocks.tsx
 * `Eyebrow`, fed from niche.blog.label_topics / label_library, published in
 * hospitality/niche.config.json by the manager per owner ruling 4. Previously
 * declined here because those two labels did not exist as config strings.
 *
 * The local list is kept and re-grounded on the phase-1 tokens (slate ramp,
 * primary ramp, `--focus-ring` via the local `focusRing`). No sentence, label
 * or kicker on this page changed.
 */
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
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          Hospitality finance, explained.
        </h1>

        {categories.length > 0 && (
          <div className="mt-8">
          <Eyebrow>{niche.blog.label_topics}</Eyebrow>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/blog/${cat.slug}`}
                className={`inline-flex min-h-12 items-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-slate-200 transition-all hover:text-primary-700 hover:shadow-md hover:ring-primary-600 ${focusRing}`}
              >
                {cat.name} ({cat.count})
              </Link>
            ))}
          </div>
          </div>
        )}

        <div className="mt-12">
        <Eyebrow>{niche.blog.label_library}</Eyebrow>
        <ul className="mt-4 space-y-8">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${getCategorySlug(post)}/${post.slug}`}
                className={`group block rounded-xl ${focusRing}`}
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-primary-700">
                  {post.category} · {calculateReadTime(post.contentHtml)} min read
                </p>
                <h2 className="mt-1 text-xl font-semibold text-slate-900 group-hover:underline">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm text-slate-600">{post.metaDescription}</p>
              </Link>
            </li>
          ))}
        </ul>
        </div>
      </div>
      {/* Owner ruling 6: an enquiry form on every money page, non-interruptive.
          This route rendered zero forms. Fed the one blog CTA triple already
          published in hospitality/niche.config.json (`blog.cta_heading` /
          `cta_body` / `cta_button`) - the same three strings the end of every
          blog post already renders - so nothing is authored here.
          `eyebrow=""` and `formTitle=""`: the kit defaults are a FEE CLAIM
          ("Free first call, then a fixed fee in writing", LeadCTAPanel.tsx:18)
          and "Book your free first call" (:26), neither of which this site
          publishes (owner ruling 16, R3-G6 on startups-tech).
          NO `.ground-dark` on this mount and no wrapper `data-cta`: see the
          note on the same mount in blog/[category]/[slug]/page.tsx. */}
      <LeadCTAPanel
        eyebrow=""
        title={niche.blog.cta_heading}
        description={niche.blog.cta_body}
        proofPoints={[]}
        formTitle=""
        form={<LeadForm submitLabel={niche.blog.cta_button} redirectOnSuccess={false} />}
      />
    </>
  );
}
