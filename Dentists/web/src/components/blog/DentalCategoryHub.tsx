import type { ReactNode } from "react";
import {
  BlogCategoryHub,
  type HubSection,
} from "@accounting-network/web-shared/design/blog/BlogCategoryHub";
import { getAllPosts, getAllCategories, calculateReadTime, slugifyCategory } from "@/lib/blog";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";
import { DentistsBackdrop } from "@/components/layout/DentistsBackdrop";
import { CTA_BY_CATEGORY, ctaCopyForCategory } from "@/lib/blog/cta-copy";

export type { HubSection };

/**
 * The ONE hub shape for all twelve /blog/<category> routes: the five
 * hand-written static pages and the seven the [category] route derives. Before
 * this, the five were 184-190 line hand-rolled essays and the seven were a
 * different layout entirely, so half the corpus sat under a look the other half
 * did not share.
 *
 * Everything visual lives in the kit's `BlogCategoryHub`. This wrapper exists
 * only to stop six call sites repeating the same eight per-site props (post
 * projection, category list, site origin, form, proof points, both backdrops),
 * and to bind the hub CTA to the SAME per-category map the article renderer
 * keys on (`lib/blog/cta-copy.ts`, WP1) so a hub can never advertise something
 * different from the article beneath it.
 *
 * Three things the kit defaults that MUST be passed here, because its defaults
 * are Property's:
 *   - `proofPoints`  defaults to "Property tax only / fixed fees quoted upfront"
 *   - `libraryNote`  defaults to "written by specialist property accountants"
 * Both would put another niche's copy, and a fee claim this site is barred from
 * making, on twelve dental pages. The kit is NOT edited to fix that: it is
 * Property's component and eighteen other sites read it.
 *
 * ponytail: a props wrapper, not a fork of the kit hub.
 */

/** Verbatim the three points `/blog` (WP2) already renders, so the index and
 *  the twelve hubs under it read the same three lines. Not lifted into a shared
 *  file: `app/blog/page.tsx` belongs to another work package this phase and
 *  moving its constant out would edit it. */
const LEAD_PROOF_POINTS = [
  { title: "Dental practices only", detail: "NHS pensions, UDAs and practice sales every day" },
  { title: "One accountant throughout", detail: "You speak to the person doing the work" },
  { title: "Answers in writing", detail: "The advice you get, and the reasoning behind it" },
];

export function DentalCategoryHub({
  categorySlug,
  categoryName,
  heading,
  collectionName,
  description,
  intro,
  sections = [],
}: {
  categorySlug: string;
  /** The frontmatter label, which drives the breadcrumb and the library heading. */
  categoryName: string;
  /** The visible h1 where it differs from the label, e.g. the five static hubs'
   *  published SEO titles. Retitling one would be an SEO change, so they keep
   *  the h1 they shipped with. */
  heading?: string;
  collectionName?: string;
  description: string;
  intro: string;
  sections?: HubSection[];
}): ReactNode {
  // PROJECTION, load-bearing. The `{ ...p, categorySlug }` spread both hub
  // routes used serialised all 223 `contentHtml` bodies into a "use client"
  // payload; Property hit Vercel's 19 MB ISR limit exactly this way. The card
  // reads five fields and the read time is computed here, server side.
  //
  // Slug equality, never raw-label equality: six of the twelve labels carry a
  // case or "&"/"and" split across the corpus and only merge because
  // `slugifyCategory` lowercases them. `dental-category-hub.test.ts` asserts
  // that rather than assuming it.
  const posts = getAllPosts()
    .filter((p) => slugifyCategory(p.category) === categorySlug)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      summary: p.summary,
      date: p.date,
      readTime: calculateReadTime(p.contentHtml),
    }));

  const cta = ctaCopyForCategory(categorySlug, CTA_BY_CATEGORY.general);

  // No JSON-LD emitted here. The kit hub emits the CollectionPage, and the
  // Breadcrumb inside it emits the BreadcrumbList. The page-level @graph both
  // hub routes carried was a SECOND BreadcrumbList on all twelve pages.
  return (
    <BlogCategoryHub
      categoryName={categoryName}
      heading={heading}
      categorySlug={categorySlug}
      collectionName={collectionName ?? `${categoryName} articles`}
      description={description}
      intro={intro}
      sections={sections}
      cta={{ heading: cta.heading, body: cta.body, submitLabel: cta.button }}
      posts={posts}
      // ALL twelve, not the seven derived. The old sibling strip filtered the
      // five static hubs out, so the seven derived hubs linked to each other and
      // never to the three largest categories on the site. The kit drops the
      // current category itself.
      categories={getAllCategories()}
      siteUrl={siteConfig.url}
      proofPoints={LEAD_PROOF_POINTS}
      libraryNote={`${posts.length} ${posts.length === 1 ? "guide" : "guides"} for UK dentists, associates and practice owners.`}
      form={<LeadForm redirectOnSuccess={false} submitLabel={cta.button} />}
      heroBackdrop={<DentistsBackdrop tone="light" />}
      ctaBackdrop={<DentistsBackdrop tone="navy" />}
    />
  );
}
