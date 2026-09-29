import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getAllCategories, getCategorySlug, calculateReadTime } from "@/lib/blog";
import { siteConfig } from "@/config/site";
import { niche } from "@/config/niche-loader";
import { buildOgImageUrl } from "@/lib/schema";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { HubArticleList } from "@accounting-network/web-shared/design/blog/HubArticleList";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteContainerLg } from "@/components/ui/layout-utils";

type Props = { params: Promise<{ category: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllCategories().map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = getAllCategories().find((c) => c.slug === category);
  if (!cat) return {};
  const title = `${cat.name} | Hospitality Accounting Guides`;
  const description = `Practical guides on ${cat.name.toLowerCase()} for UK hospitality operators.`;
  const url = `${siteConfig.url}/blog/${category}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [{ url: buildOgImageUrl(cat.name), width: 1200, height: 630, alt: cat.name }],
    },
  };
}

/*
 * KIT ADOPTION LEDGER FOR THIS ROUTE (playbook gate 9.1).
 *
 * ADOPTED: packages/web-shared/design/primitives/Breadcrumb.tsx (replaces the
 * hand-rolled "Blog / {name}" trail that stood at :46-48; tone omitted =
 * "default", this route's ground is white, and it brings a BreadcrumbList
 * this route did not emit before),
 * packages/web-shared/design/blog/HubArticleList.tsx for the grid, and
 * packages/web-shared/design/marketing/LeadCTAPanel.tsx at the foot.
 *
 * DECLINED: packages/web-shared/design/blog/BlogCategoryHub.tsx. It owns the
 * whole hub page including `heading` and `bullets` copy blocks this site does
 * not author, so mounting it would mean writing new prose on eight routes,
 * which owner ruling 4 forbids. The genuinely reusable part of it is the
 * article grid, and that is HubArticleList, adopted directly below.
 *
 * DECLINED: packages/web-shared/design/blog/BlogListWithSearch.tsx and
 * packages/web-shared/design/primitives/NumberedPagination.tsx, for the
 * measured slice reason written out in full at src/app/blog/page.tsx.
 *
 * ADOPTED (M1a item 3): packages/web-shared/design/primitives/page-blocks.tsx
 * `Eyebrow`, fed niche.blog.label_library ("The library"), the same section
 * label /blog uses over its own post list. This is generic section copy, not
 * cat.name, so it does not repeat the h1 above it.
 */
export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = getAllCategories().find((c) => c.slug === category);
  if (!cat) notFound();

  // Lightweight projection only: `contentHtml` never crosses into the client
  // payload of this client component (the /blog FALLBACK_BODY_TOO_LARGE
  // lesson, memory `vercel_blog_fallback_size_limit`). Read times are computed
  // here, server-side. `summary` is fed post.metaDescription, which is the
  // exact string this hub's cards already published; the frontmatter `summary`
  // field is NOT substituted, because that would change published copy.
  const posts = getAllPosts()
    .filter((p) => getCategorySlug(p) === category)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      summary: p.metaDescription,
      readTime: calculateReadTime(p.contentHtml),
      date: p.date,
    }));

  return (
    <>
      <div className={`${siteContainerLg} py-16`}>
        <Breadcrumb
          siteUrl={siteConfig.url}
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: cat.name },
          ]}
        />
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">{cat.name}</h1>
        <div className="mt-10">
          <Eyebrow>{niche.blog.label_library}</Eyebrow>
          {/* postsPerPage passed EXPLICITLY and above the largest category
              (Hospitality Accounts, 8 posts), so no route paginates today and
              NumberedPagination never mounts. The component does not slice
              either way: off-page cards keep their <a href> in the server HTML
              and only carry `hidden` (HubArticleList.tsx:45-55), so the
              measured link floors hold. The explicit value is here so a 13th
              post in one category is a visible decision, not a silent page 2. */}
          <HubArticleList posts={posts} categorySlug={category} postsPerPage={12} />
        </div>
      </div>
      {/* Owner ruling 6, and the same feeding, the same two empty labels and
          the same no-.ground-dark / no-wrapper-data-cta reasoning as the mount
          on /blog and on the post template. Copy is niche.blog.*, published. */}
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
