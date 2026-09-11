import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { getAllPosts, getAllCategories, calculateReadTime, slugifyCategory } from "@/lib/blog";
import { BlogCategoryHub } from "@accounting-network/web-shared/design/blog/BlogCategoryHub";
import { getActiveCta, isPackagesMode } from "@accounting-network/web-shared/lib/niche-config";
import { niche } from "@/config/niche-loader";
import { SolicitorsBackdrop } from "@/components/layout/SolicitorsBackdrop";
import { LeadForm } from "@/components/forms/LeadForm";
import { BLOG_CATEGORY_COPY, LEAD_PROOF_POINTS, type BlogCategoryCopy } from "@/lib/blog-category-copy";

/**
 * Slugs that already have hand-built static hub pages under src/app/blog/.
 * These routes are excluded from generateStaticParams so the static pages
 * always win at routing and are never shadowed by this dynamic handler.
 * Adding a new category automatically gets a derived hub without any extra
 * file needed.
 */
const STATIC_HUB_SLUGS = new Set([
  "partnership-llp-accounting",
  "practice-finance-cash-flow",
  "practice-succession-sale",
  "sole-practitioner-tax",
  "sra-compliance-trust-accounting",
  "structure-incorporation",
  "vat-compliance",
]);

type Props = { params: Promise<{ category: string }> };

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories
    .map((c) => ({ category: c.slug }))
    .filter((p) => !STATIC_HUB_SLUGS.has(p.category));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  if (STATIC_HUB_SLUGS.has(category)) {
    return {};
  }
  const categories = getAllCategories();
  const match = categories.find((c) => c.slug === category);
  if (!match) return { title: "Category not found" };
  const url = `${siteConfig.url}/blog/${category}`;
  return {
    title: `${match.name} articles`,
    description: `${match.name} articles for UK solicitors and law firms, updated for current HMRC rules and SRA requirements.`,
    alternates: { canonical: url },
    openGraph: {
      title: `${match.name} articles | ${siteConfig.name}`,
      description: `${match.name} articles for UK solicitors and law firms.`,
      url,
      type: "website",
    },
  };
}

export default async function BlogCategoryPage({ params }: Props) {
  const { category } = await params;

  // Guard: let the static page win if this slug has a hand-built hub.
  if (STATIC_HUB_SLUGS.has(category)) {
    notFound();
  }

  const categories = getAllCategories();
  const matchedCategory = categories.find((c) => c.slug === category);
  if (!matchedCategory) notFound();

  const allPosts = getAllPosts();
  // PROJECTION, load-bearing. The old `{...p, categorySlug}` spread serialised
  // every post's contentHtml into this route's client payload (the same defect
  // /blog carried, and the one that pushed Property's /blog past Vercel's
  // 19 MB limit). The list renders only these five fields, with the read time
  // precomputed here so contentHtml never crosses the client boundary.
  //
  // Slug equality, not raw-label equality: a frontmatter label differing by an
  // ampersand or a capital would drop the post out of its own hub silently.
  const posts = allPosts
    .filter((p) => slugifyCategory(p.category) === category)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      summary: p.summary,
      date: p.date,
      readTime: calculateReadTime(p.contentHtml),
    }));

  if (posts.length === 0) notFound();

  // Same per-category CTA map the article renderer keys on, so the hub and the
  // articles under it cannot drift (BlogPostRenderer.tsx:99-108).
  const activeCta = getActiveCta(niche);
  const variantCopy: BlogCategoryCopy = {
    heading: activeCta.blog.cta_heading,
    body: activeCta.blog.cta_body,
    button: activeCta.blog.cta_button,
  };
  const cta: BlogCategoryCopy = isPackagesMode(niche)
    ? variantCopy
    : (BLOG_CATEGORY_COPY[category] ?? variantCopy);

  // BreadcrumbList only. The kit's <Breadcrumb> emits its own BreadcrumbList
  // and BlogCategoryHub emits the CollectionPage with these same values, so
  // the page-level CollectionPage would be a second identical node. The
  // duplicate BreadcrumbList is deliberately left in place: structured data is
  // out of scope for this package, and removing it here would be an SEO change.
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` },
          { "@type": "ListItem", position: 3, name: matchedCategory.name },
        ],
      },
    ],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <BlogCategoryHub
        categoryName={matchedCategory.name}
        categorySlug={category}
        collectionName={`${matchedCategory.name} articles`}
        description={`${posts.length} ${matchedCategory.name.toLowerCase()} articles for UK solicitors and law firms.`}
        intro={`${posts.length} article${posts.length !== 1 ? "s" : ""} on ${matchedCategory.name.toLowerCase()} for UK solicitors and law firms.`}
        sections={[]}
        cta={{ heading: cta.heading, body: cta.body, submitLabel: cta.button }}
        posts={posts}
        // ALL 17, not the 10 derived. The old `filter((c) => !STATIC_HUB_SLUGS
        // .has(c.slug))` made every hand-built hub unreachable from every
        // derived hub, including the three largest categories. The kit filters
        // the current category out of the band itself.
        categories={categories}
        siteUrl={siteConfig.url}
        proofPoints={LEAD_PROOF_POINTS}
        libraryNote={`${posts.length} ${posts.length === 1 ? "guide" : "guides"} for UK solicitors and law firms.`}
        form={<LeadForm submitLabel={cta.button} redirectOnSuccess={false} />}
        heroBackdrop={<SolicitorsBackdrop tone="cream" />}
        ctaBackdrop={<SolicitorsBackdrop tone="navy" />}
      />
    </>
  );
}
