import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getAllCategories, calculateReadTime, getCategorySlug } from "@/lib/blog";
import { siteConfig } from "@/config/site";
import { niche } from "@/config/niche-loader";
import { siteContainerLg, sectionY, focusRing } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { ScrollGlowGroup } from "@accounting-network/web-shared/design/marketing/ScrollGlowGroup";
import { HubArticleList } from "@accounting-network/web-shared/design/blog/HubArticleList";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import PharmaciesBackdrop from "@/components/layout/PharmaciesBackdrop";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "Pharmacy Finance Blog | UK Pharmacy Accounting Guides",
  description: "Practical guides on pharmacy purchase and sale, NHS contract income, VAT retail schemes, payroll, and business structure for UK community pharmacy owners.",
  alternates: { canonical: `${siteConfig.url}/blog` },
};

/*
 * DECLINED: packages/web-shared/design/blog/BlogListWithSearch.tsx:43,91.
 * `postsPerPage = 12` at :43 is hardcoded with no prop, and :91 SLICES the
 * array before render, so posts 13..22 would leave the server HTML entirely.
 * This index publishes all 22 posts and its measured link floor is 37; a slice
 * drops 10 article links off the only full-HTML crawl path to them. Testable:
 * `curl -s :3111/blog | grep -oE 'href="/blog/[^"]+/[^"]+"' | sort -u | wc -l`
 * must stay 22.
 *
 * DECLINED: packages/web-shared/design/primitives/NumberedPagination.tsx.
 * Not imported here. It is NOT unreachable, though: HubArticleList mounts it
 * itself at HubArticleList.tsx:117-124 once `posts.length > postsPerPage`, and
 * that is correct, because that component hides off-page cards with the
 * `hidden` attribute instead of slicing (its docstring :42-55), so every
 * article link stays in the server HTML behind the pager. (Brief §W2 says this
 * component is "only reachable through that slice" - it is not; corrected.)
 *
 * DECLINED: packages/web-shared/design/blog/BlogCategoryHub.tsx:75-152. It
 * requires `sections: HubSection[]`, `intro`, `description`, `essentialsTitle`,
 * `cta: HubCta` and `libraryNote`. This site publishes none of those six copy
 * blocks on any blog route, so adopting it means authoring an intro, a
 * description, an essentials heading and a library note. Prose is frozen
 * (owner ruling 2026-09-28).
 *
 * ADOPTED (hero band only): packages/web-shared/design/primitives/page-blocks.tsx:43
 * `Eyebrow`. Its text is "Blog", the terminal crumb label this route already
 * renders in the Breadcrumb two lines below it, so no string is authored and
 * the label is not a duplicate of the h1 ("Pharmacy finance, explained.").
 * UA2 2026-10-07 REVISES that: the category band DOES publish a label of its
 * own, and this file missed it. The `<nav>` wrapping the chips carries
 * `aria-label="Browse by category"` (band 2 below) - a string this route
 * already prints in its served HTML and already exposes as that nav's
 * accessible name. `Eyebrow` is now mounted on that band fed exactly that
 * string, byte for byte, so nothing is authored. It is also the band Property
 * labels on the same template ("Browse by topic",
 * Property/web/src/app/blog/page.tsx:194), so this is the reference shape
 * rather than an invention. Accepted side effect, declared: a screen reader
 * meets the phrase twice, once as the eyebrow text and once as the nav's name.
 * The alternative is deleting the `aria-label`, which would remove an
 * accessible name to buy a cosmetic win; not taken.
 * STILL DECLINED on the article band (band 3, the library): it publishes no
 * heading, no label and no `aria-label` of its own - the only strings in it are
 * the per-card title and meta row inside HubArticleList - so an eyebrow there
 * is authored copy. Property's label for that band is "The archive"
 * (blog/page.tsx:231), a written string, which is the point. That band ships
 * with no eyebrow, deliberately. Eyebrow count on this route: 2.
 */
export default function BlogIndexPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const cards = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    summary: post.summary || undefined,
    readTime: calculateReadTime(post.contentHtml),
    date: post.date,
    categorySlug: getCategorySlug(post),
  }));

  return (
    <>
      {/* UA band 1, HERO. This route was one flat `<div className=container
          py-16>` with a 30px h1, no ground, no backdrop above the fold and no
          band structure; /services and /for already open on this shape, so the
          hub family now reads the same way.

          GROUND: bg-primary-950 `hex 0f3a4a` is a NEW ground FOR THIS ROUTE and
          carries the row already measured for the identical hero at
          src/app/services/page.tsx:44-49 and src/app/for/page.tsx:29-32 - same
          ground, same backdrop, same alpha, so the measurement is reused rather
          than re-invented (binding rule 7). Bare: white 12.18, `text-slate-300`
          (the Eyebrow onDark step) 9.09. Composited with the motif's 0.10 of
          `hex 45cdff`: white 9.78, slate-300 7.36, white/80 trail links 7.08,
          and the eyebrow rule's `primary-400` mark 5.37 against the 3.0 graphic
          floor. All PASS. `ground-dark` with it, because the trail links are the
          focusable elements on this ground and the ring would otherwise paint
          primary-950 on primary-950.

          The h1 takes the hub type step (`sm:text-5xl lg:text-6xl` +
          `leading-[1.15]` + `text-balance`). Its words are untouched. */}
      <section className="ground-dark relative overflow-hidden border-b border-slate-200 bg-primary-950 py-16 sm:py-20">
        <PharmaciesBackdrop patternId="blog-index-hero" />
        <div className={`${siteContainerLg} relative z-10`}>
          <Breadcrumb
            siteUrl={siteConfig.url}
            items={[{ label: "Home", href: "/" }, { label: "Blog" }]}
            tone="onBrand"
          />
          <Eyebrow onDark>Blog</Eyebrow>
          <h1 className="text-3xl font-semibold tracking-tight leading-[1.15] text-balance text-white sm:text-5xl lg:text-6xl">
            Pharmacy finance, explained.
          </h1>
        </div>
      </section>

      {/* UA band 2, the category row, on white. Browsing by category and
          reading the library are two different jobs, so they are two bands on
          alternating grounds instead of one column. Every chip href, label and
          count is byte-identical; `data-cta` / `data-cta-placement` are added ON
          THE EXISTING ANCHORS (section 0.5: attributes on links that already
          exist, no new link and no new sentence), named for generalist's
          `blog_index_topic_<slug>` / `filter_band` series so
          `vw_cta_performance` reads across sites. No `data-cta-goal`: a topic
          chip is navigation, not a funnel control, and generalist omits goal on
          the same series.
          DECLINED: `blog_index_book` and `blog_index_articles` (brief item 8).
          Both are hero buttons on generalist (blog/page.tsx:111-129) and this
          route publishes neither link nor either label; tagging them would mean
          authoring "Book a free call" and "Browse the library" first, and the
          wording is frozen. Listed for the manager instead.
          UA2 2026-10-07: `Eyebrow`
          (packages/web-shared/design/primitives/page-blocks.tsx:43) mounted
          here, fed the nav's own `aria-label` string verbatim (see the file
          head comment for why that is a reuse and not an authored label).
          Light ground, so no `onDark`: the component's light branch is
          slate-600 `hex 475569` at 7.58 on white and the `EyebrowRule` mark is
          primary-600 `hex 1c8fb6` at 3.71, past the 3.0 graphic floor
          (globals.css:159 records the same 3.71). No link, no heading and no
          chip is added, moved or renamed, so the floor of 37 is untouched. */}
      {categories.length > 0 && (
        <section className={`bg-white ${sectionY}`}>
          <div className={siteContainerLg}>
            <Eyebrow>Browse by category</Eyebrow>
            <nav aria-label="Browse by category" className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/blog/${cat.slug}`}
                  data-cta={`blog_index_topic_${cat.slug}`}
                  data-cta-placement="filter_band"
                  className={`rounded-xl border border-slate-200 px-3 py-1.5 text-sm text-slate-700 transition-colors hover:border-slate-400 ${focusRing}`}
                >
                  {cat.name} ({cat.count})
                </Link>
              ))}
            </nav>
          </div>
        </section>
      )}

      {/* UA band 3, the library, on slate-50 so the ground alternates.
          ADOPTED: packages/web-shared/design/marketing/ScrollGlowGroup.tsx, a
          wrapper that changes no markup, no copy and no href inside it, so the
          22 article links and the floor of 37 are untouched. It wraps
          `HubArticleList`, which renders its own grid (HubArticleList.tsx:76),
          so this group has ONE direct child and the `:nth-child` stagger has
          nothing to stagger; `delay={0.1}` is the prop the component ships for
          exactly that case (ScrollGlowGroup.tsx:28-34), so the glow reads as the
          next beat rather than a flash the instant the band appears. Wrapping
          each card instead is not reachable from here: the cards are inside the
          kit component. No colour enters - the `card-glow` keyframe reads this
          site's declared `--brand-glow-deep`. */}
      <section className={`bg-slate-50 ${sectionY}`}>
        <div className={siteContainerLg}>
          {/* `categorySlug` is required by the component for single-category
              hubs; every card here carries its own, so this fallback is never
              the value used on this route. */}
          <ScrollGlowGroup delay={0.1}>
            <HubArticleList posts={cards} categorySlug="" />
          </ScrollGlowGroup>
          {posts.length === 0 && <p className="mt-10 text-sm text-slate-400">No posts yet.</p>}
        </div>
      </section>
      {/* Copy: niche.config.json `blog.cta_heading` / `cta_body`, the exact two
          sentences this site already publishes at the end of every post. The
          LeadForm keeps its own default submit label ("Send enquiry"), the
          string it already renders everywhere on this site. */}
      {/* UA 2026-10-07, R2 / V1 darkOnDark fix on the blog family. This panel
          was the kit's own navy `bg-slate-900` variant (LeadCTAPanel.tsx:103)
          and it was the LAST band on the route, so it ran straight into the
          slate-900 footer - the navy-on-navy ending R2 found on six blog URLs
          and V1 counted as darkOnDark 8. It moves to the kit's `contained`
          light variant, the same fix G3 already applied on /services and /for
          (LeadCTAPanel.tsx:83). `ground="white"` so the ground alternates out of
          the slate-50 library band above it (LeadCTAPanel.tsx:68-71), and the route now ends
          on a light ground before the dark footer.
          Same copy, same `<LeadForm>`, same single mount: nothing added,
          nothing removed. `.ground-dark` is not applied and the note it
          replaced is moot - the contained variant is a light card holding the
          form's focusable controls, exactly the shape globals.css:222-225 says
          that class must never wrap. `backdrop` is DROPPED because the kit
          renders it on the navy variant only (LeadCTAPanel.tsx:72-77), so
          passing it here would be a dead prop; the motif still carries the
          route, mounted in the hero band above. */}
      <LeadCTAPanel
        eyebrow=""
        formTitle=""
        proofPoints={[]}
        title={niche.blog.cta_heading}
        description={niche.blog.cta_body}
        form={<LeadForm redirectOnSuccess={false} />}
        contained
        ground="white"
      />
    </>
  );
}
