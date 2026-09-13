import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getAllCategories, getCategorySlug, calculateReadTime } from "@/lib/blog";
import { siteConfig } from "@/config/site";
import { btnPrimary, btnSecondary } from "@/components/ui/layout-utils";
import { BLOG_CTA } from "@/components/blog/blog-cta";
import { BlogCategoryHub } from "@accounting-network/web-shared/design/blog/BlogCategoryHub";

type Props = { params: Promise<{ category: string }> };

// ISR-safe (Property's shipped fix): every category is statically generated,
// unknown params 404 at build time instead of triggering runtime fallbacks.
export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllCategories().map((c) => ({ category: c.slug }));
}

/** The published hub description, one definition for metadata and the hero standfirst. */
function hubDescription(name: string): string {
  return `Practical guides on ${name.toLowerCase()} for UK charities, CICs and social enterprises.`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = getAllCategories().find((c) => c.slug === category);
  if (!cat) return {};
  const title = `${cat.name} | Charity Accounting Guides`;
  const description = hubDescription(cat.name);
  const url = `${siteConfig.url}/blog/${category}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = getAllCategories().find((c) => c.slug === category);
  if (!cat) notFound();

  const posts = getAllPosts()
    .filter((p) => getCategorySlug(p) === category)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      summary: p.summary,
      date: p.date,
      readTime: calculateReadTime(p.contentHtml),
    }));

  return (
    <>
      <BlogCategoryHub
        categoryName={cat.name}
        // No `heading` prop: the h1 must stay the published category name, and
        // BlogCategoryHub.tsx:161 renders `heading ?? categoryName`. Passing
        // nothing is what keeps the h1 byte-identical to the pre-port page.
        categorySlug={category}
        collectionName={`${cat.name} | Charity Accounting Guides`}
        description={hubDescription(cat.name)}
        intro={hubDescription(cat.name)}
        // P3-4 authors the per-hub essentials blocks (src/data/blog-hub-copy.ts).
        // Empty until then, and BlogCategoryHub.tsx:189 drops the whole section
        // rather than rendering an empty heading.
        sections={[]}
        cta={{ heading: BLOG_CTA.heading, body: BLOG_CTA.body, submitLabel: BLOG_CTA.button }}
        posts={posts}
        categories={getAllCategories()}
        siteUrl={siteConfig.url}
        // Empty by instruction. The default is Property's three ("Property tax
        // only", a fee promise, a staffing promise), none of which is true here,
        // and this site has just had fabricated social proof removed. Never
        // substitute invented replacements.
        proofPoints={[]}
        libraryNote={`${posts.length} ${posts.length === 1 ? "article" : "articles"} on ${cat.name.toLowerCase()}.`}
        // NOT a lead form. The pre-port hubs carried no capture surface, and
        // adding one is an owner gate (PHASE_PLAN.md §7), so this slot holds the
        // same two published routes the rest of the site sends people to. Count
        // in equals count out across the cutover.
        form={
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/contact"
              data-cta={`blog_hub_${category}_contact`}
              data-cta-placement="hub_cta_panel"
              data-cta-goal="contact"
              className={btnPrimary}
            >
              {BLOG_CTA.button}
            </Link>
            <Link
              href="/book"
              data-cta={`blog_hub_${category}_book`}
              data-cta-placement="hub_cta_panel"
              className={btnSecondary}
            >
              Book a call
            </Link>
          </div>
        }
      />
    </>
  );
}
