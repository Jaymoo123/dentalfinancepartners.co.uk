import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getAllCategories, getCategorySlug, calculateReadTime } from "@/lib/blog";
import { siteConfig } from "@/config/site";
import { niche } from "@/config/niche-loader";
import { siteContainerLg, sectionY } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { ScrollGlowGroup } from "@accounting-network/web-shared/design/marketing/ScrollGlowGroup";
import { HubArticleList } from "@accounting-network/web-shared/design/blog/HubArticleList";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import PharmaciesBackdrop from "@/components/layout/PharmaciesBackdrop";
import { LeadForm } from "@/components/forms/LeadForm";

type Props = { params: Promise<{ category: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllCategories().map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = getAllCategories().find((c) => c.slug === category);
  if (!cat) return {};
  const title = `${cat.name} | Pharmacy Finance Guides`;
  const description = `Practical guides on ${cat.name.toLowerCase()} for UK community pharmacy owners, buyers, and sellers.`;
  const url = `${siteConfig.url}/blog/${category}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
  };
}

/*
 * Same three declines as src/app/blog/page.tsx, for the same reasons, each
 * naming its kit file and line:
 *  - packages/web-shared/design/blog/BlogListWithSearch.tsx:43,91 (hardcoded
 *    `postsPerPage = 12` and a `slice`; the two largest hubs here carry 7 posts
 *    today but the slice is a structural floor risk as the corpus grows, and
 *    the index that shares this component publishes 22).
 *  - packages/web-shared/design/primitives/NumberedPagination.tsx (not imported
 *    directly; HubArticleList mounts it itself at :117-124 with every card still
 *    in the server HTML behind the `hidden` attribute).
 *  - packages/web-shared/design/blog/BlogCategoryHub.tsx:75-152 (requires
 *    `sections`, `intro`, `description`, `essentialsTitle`, `cta`, `libraryNote`
 *    - six copy blocks no blog route on this site publishes).
 * `Eyebrow` from packages/web-shared/design/primitives/page-blocks.tsx:43 is
 * now ADOPTED on the hero band, fed "Blog" - the parent crumb label the
 * Breadcrumb below it already renders on this route, and a different string
 * from the h1 (the category name), so nothing is authored and no label sits
 * immediately above an identical heading. DECLINED on the article band: it
 * publishes no heading or label of its own, only the per-card titles inside
 * HubArticleList, and minting one would author copy. That band ships with no
 * eyebrow, deliberately.
 *
 * Per-category blog CTA copy: NOT authored. All five live category slugs
 * (buying-a-pharmacy, nhs-contract-and-income, selling-a-pharmacy,
 * locum-pharmacists, vat-and-retail-schemes) take the one triple
 * niche.config.json `blog` already publishes, per the owner decision of
 * 2026-10-07. A five-key map whose five values are the same three strings is a
 * no-op, so there is no map: the config read below IS the map. If per-category
 * copy is wanted, the manager supplies `blog.cta_*` keys per category and this
 * becomes a lookup on `category`.
 *
 * UA2 2026-10-07. NO CHANGE on this route, stated rather than left silent.
 * Brief item 1 (card affordance): the article wall is already the kit
 * packages/web-shared/design/blog/HubArticleList.tsx - every card is a `<Link>`
 * with `hover:ring-primary-600 hover:shadow-md transition-all` on the article
 * wrapper (:82), the `focusRing` on the anchor (:86) and a brand clock mark in
 * the meta row, inside the ScrollGlowGroup below. No prose box remains.
 * Brief item 2 (eyebrows): 1, the hero's "Blog". The article band is the only
 * other band and the sole label it could take is `cat.name`, which is this
 * route's h1 verbatim, so an eyebrow there prints the heading above itself.
 * The sibling /blog route gained a second eyebrow from its nav `aria-label`;
 * this route publishes no equivalent string. Owner question, per R4 Part B
 * item 2.
 * Brief item 3 (two more kit components): none fits. ProcessTimeline,
 * DrawnTickList, PromptMarquee, ComparisonTable, TopicSection and StatsCounter
 * each need copy this route does not publish - the full source-level check is
 * written at src/app/services/page.tsx on the "All services" band and applies
 * unchanged here, where the only data is a post list.
 *
 * niche.config.json `content_strategy.categories` lists 7 names against the 5
 * live category slugs above. Config drift, not consumed by routing; logged, not
 * fixed (brief section F item 5).
 */
export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = getAllCategories().find((c) => c.slug === category);
  if (!cat) notFound();

  const posts = getAllPosts().filter((p) => getCategorySlug(p) === category);
  const cards = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    summary: post.summary || undefined,
    readTime: calculateReadTime(post.contentHtml),
    date: post.date,
  }));

  return (
    <>
      {/* UA band 1, HERO. Same change and same reasoning as the identical band
          on src/app/blog/page.tsx: this route was one flat container with a 30px
          h1, no ground and no band structure.
          GROUND: bg-primary-950 `hex 0f3a4a` is a NEW ground FOR THIS ROUTE,
          carrying the row measured for the identical hero at
          src/app/services/page.tsx:44-49 (binding rule 7, reuse a measured
          ground). Bare white 12.18 and slate-300 9.09; composited with the
          motif's 0.10 of `hex 45cdff`, white 9.78, slate-300 (Eyebrow onDark)
          7.36, white/80 trail 7.08, and the eyebrow rule's `primary-400` mark
          5.37 against the 3.0 graphic floor. All PASS. `ground-dark` with it:
          the trail links are the only focusable elements here.
          The h1 takes the hub type step; `{cat.name}` is untouched. */}
      <section className="ground-dark relative overflow-hidden border-b border-slate-200 bg-primary-950 py-16 sm:py-20">
        <PharmaciesBackdrop patternId={`blog-category-hero-${category}`} />
        <div className={`${siteContainerLg} relative z-10`}>
          <Breadcrumb
            siteUrl={siteConfig.url}
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: cat.name },
            ]}
            tone="onBrand"
          />
          <Eyebrow onDark>Blog</Eyebrow>
          <h1 className="text-3xl font-semibold tracking-tight leading-[1.15] text-balance text-white sm:text-5xl lg:text-6xl">
            {cat.name}
          </h1>
        </div>
      </section>

      {/* UA band 2, the category's articles, on white: the ground alternates
          into the dark LeadCTAPanel below it.
          ADOPTED: packages/web-shared/design/marketing/ScrollGlowGroup.tsx. A
          wrapper only: no markup, no copy and no href changes inside it, so
          every category floor (17 / 17 / 13 / 13 / 12) is held. One direct
          child, because HubArticleList renders its own grid
          (HubArticleList.tsx:76), so `delay={0.1}` carries the beat the
          `:nth-child` stagger cannot (ScrollGlowGroup.tsx:28-34).
          DECLINED: `blog_category_book` (brief item 8). This route publishes no
          hero CTA link and no button label; tagging one means authoring the
          sentence first, and the wording is frozen. Listed for the manager. */}
      <section className={`bg-white ${sectionY}`}>
        <div className={siteContainerLg}>
          <ScrollGlowGroup delay={0.1}>
            <HubArticleList posts={cards} categorySlug={category} />
          </ScrollGlowGroup>
        </div>
      </section>
      {/* UA 2026-10-07, R2 / V1 darkOnDark fix on the blog family. This panel
          was the kit's own navy `bg-slate-900` variant (LeadCTAPanel.tsx:103)
          and it was the LAST band on the route, so it ran straight into the
          slate-900 footer - the navy-on-navy ending R2 found on six blog URLs
          and V1 counted as darkOnDark 8. It moves to the kit's `contained`
          light variant, the same fix G3 already applied on /services and /for
          (LeadCTAPanel.tsx:83). `ground="slate"` so the ground alternates out of
          the white article band above it (LeadCTAPanel.tsx:68-71), and the route now ends
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
        ground="slate"
      />
    </>
  );
}
