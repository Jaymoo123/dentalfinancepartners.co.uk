import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { getAllPosts, getAllCategories, slugifyCategory } from "@/lib/blog";
import { DentalCategoryHub } from "@/components/blog/DentalCategoryHub";

/**
 * Slugs that already have hand-built static hub pages under src/app/blog/.
 * These routes are excluded from generateStaticParams so the static pages
 * always win at routing and are never shadowed by this dynamic handler.
 *
 * The static hubs below exist as sibling directories of this [category] route:
 *   associate-tax, buying-a-practice, practice-accounting, practice-finance,
 *   vat-and-compliance.
 *
 * All remaining category slugs (goodwill-and-practice-sale, nhs-contracts,
 * nhs-pension, capital-allowances-and-equipment, general, locum-tax,
 * specialist-services) get a derived hub here automatically without any extra
 * file needed. All twelve now render the same component; the split is a routing
 * detail, not a design one.
 */
const STATIC_HUB_SLUGS = new Set([
  "associate-tax",
  "buying-a-practice",
  "practice-accounting",
  "practice-finance",
  "vat-and-compliance",
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
    description: `${match.name} articles for UK dental professionals, updated for current HMRC rules and NHS guidance.`,
    alternates: { canonical: url },
    openGraph: {
      title: `${match.name} articles | ${siteConfig.name}`,
      description: `${match.name} articles for UK dental professionals.`,
      url,
      type: "website",
    },
  };
}

export default async function BlogCategoryPage({ params }: Props) {
  const { category } = await params;

  // Guard: let the static page win if this slug has a hand-built hub.
  // Next.js routes static segments before dynamic ones so this is a safety net.
  if (STATIC_HUB_SLUGS.has(category)) {
    notFound();
  }

  const categories = getAllCategories();
  const matchedCategory = categories.find((c) => c.slug === category);
  if (!matchedCategory) notFound();

  const count = getAllPosts().filter((p) => slugifyCategory(p.category) === category).length;
  if (count === 0) notFound();

  // `sections` is deliberately empty: the seven briefings these hubs need are
  // WP5's package (PHASE3_BUILD_PLAN §3), and the kit hub renders no essentials
  // band at all when the array is empty, so the page is whole without them.
  return (
    <DentalCategoryHub
      categorySlug={category}
      categoryName={matchedCategory.name}
      description={`${count} ${matchedCategory.name.toLowerCase()} articles for UK dental professionals.`}
      intro={`${count} article${count !== 1 ? "s" : ""} on ${matchedCategory.name.toLowerCase()} for UK dental professionals.`}
    />
  );
}
