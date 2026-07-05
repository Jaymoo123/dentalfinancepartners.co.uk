import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteContainerLg, sectionY } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { getAllPosts, getAllCategories, calculateReadTime, slugifyCategory } from "@/lib/blog";
import { BlogListWithSearch } from "@/components/blog/BlogListWithSearch";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

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
  const enriched = allPosts
    .filter((p) => slugifyCategory(p.category) === category)
    .map((p) => ({ ...p, categorySlug: category }));

  if (enriched.length === 0) notFound();

  const readTimes = new Map<string, number>();
  for (const p of enriched) {
    readTimes.set(p.slug, calculateReadTime(p.contentHtml));
  }

  const siblings = categories.filter((c) => !STATIC_HUB_SLUGS.has(c.slug));

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
      {
        "@type": "CollectionPage",
        name: `${matchedCategory.name} articles`,
        description: `${enriched.length} ${matchedCategory.name.toLowerCase()} articles for UK solicitors and law firms.`,
        url: `${siteConfig.url}/blog/${category}`,
      },
    ],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <section className={`${sectionY} bg-[var(--surface)]`}>
        <div className={siteContainerLg}>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: matchedCategory.name },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--primary)]">
              {matchedCategory.name}
            </p>
            <h1 className="mt-4 font-serif text-4xl font-semibold text-[var(--ink)] sm:text-5xl">
              {matchedCategory.name}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[var(--muted)] max-w-2xl">
              {enriched.length} article{enriched.length !== 1 ? "s" : ""} on{" "}
              {matchedCategory.name.toLowerCase()} for UK solicitors and law firms.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-white">
        <div className={siteContainerLg}>
          <nav aria-label="Other categories" className="flex flex-wrap gap-2 py-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 border border-[var(--border)] bg-white px-3 py-1.5 text-sm font-medium text-[var(--ink-soft)] transition-colors hover:border-[var(--primary)] hover:bg-[var(--surface-elevated)] hover:text-[var(--primary)]"
            >
              All
            </Link>
            {siblings.map((c) => (
              <Link
                key={c.slug}
                href={`/blog/${c.slug}`}
                className={
                  c.slug === category
                    ? "inline-flex items-center gap-2 border border-[var(--primary)] bg-[var(--surface-elevated)] px-3 py-1.5 text-sm font-semibold text-[var(--primary)]"
                    : "inline-flex items-center gap-2 border border-[var(--border)] bg-white px-3 py-1.5 text-sm font-medium text-[var(--ink-soft)] transition-colors hover:border-[var(--primary)] hover:bg-[var(--surface-elevated)] hover:text-[var(--primary)]"
                }
              >
                {c.name}
                <span className="font-mono text-xs text-[var(--muted)]">{c.count}</span>
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className={`bg-[var(--surface)] ${sectionY}`}>
        <div className={siteContainerLg}>
          <BlogListWithSearch
            posts={enriched}
            categories={siblings}
            readTimes={readTimes}
            activeCategory={category}
          />
        </div>
      </section>
    </>
  );
}
