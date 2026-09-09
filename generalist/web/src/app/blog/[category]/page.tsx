import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { getAllPosts, calculateReadTime, slugifyCategory } from "@/lib/blog";
import { BlogCategoryHub } from "@accounting-network/web-shared/design/blog/BlogCategoryHub";
import { GeneralistBackdrop } from "@/components/layout/GeneralistBackdrop";
import { LeadForm } from "@/components/forms/LeadForm";
import { niche } from "@/config/niche-loader";
import { blogHubBriefings } from "@/lib/blog-hub-briefings";
import { CTA_BY_CATEGORY, LEAD_PROOF_POINTS, blogCtaCopy } from "@/lib/blog-cta-map";

type Props = { params: Promise<{ category: string }> };

export async function generateStaticParams() {
  const categoryNames: string[] = (niche.content_strategy?.categories as string[]) || [];
  return categoryNames.map((name) => ({ category: slugifyCategory(name) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const categoryNames: string[] = (niche.content_strategy?.categories as string[]) || [];
  const match = categoryNames.find((n) => slugifyCategory(n) === category);
  if (!match) return { title: "Category not found" };
  const url = `${siteConfig.url}/blog/${category}`;
  return {
    // Brand-less: the root layout template appends " | Holloway Davies" once.
    title: `${match} articles`,
    description: `${match} articles for UK business owners, updated for 2026/27 UK tax rates.`,
    alternates: { canonical: url },
    openGraph: {
      title: `${match} articles | ${siteConfig.name}`,
      description: `${match} articles for UK business owners.`,
      url,
      type: "website",
    },
  };
}

export default async function BlogCategoryPage({ params }: Props) {
  const { category } = await params;
  const categoryNames: string[] = (niche.content_strategy?.categories as string[]) || [];
  const matchedName = categoryNames.find((n) => slugifyCategory(n) === category);
  if (!matchedName) notFound();

  const allPosts = getAllPosts();
  // Slug equality, not raw-label equality. A frontmatter label that differs by
  // an ampersand, a hyphen or a capital ("R&D Tax Credits" against "R&D tax
  // credits") used to drop the post out of its own hub silently.
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

  // Sibling categories for the other-topics tail, counted on slugs for the
  // same reason.
  const siblingCounts = new Map<string, number>();
  for (const p of allPosts) {
    const s = slugifyCategory(p.category);
    siblingCounts.set(s, (siblingCounts.get(s) || 0) + 1);
  }
  const categories = categoryNames
    .map((name) => ({ name, slug: slugifyCategory(name), count: siblingCounts.get(slugifyCategory(name)) || 0 }))
    .filter((c) => c.count > 0);

  const briefing = blogHubBriefings[category];
  const cta = CTA_BY_CATEGORY[category] ?? blogCtaCopy(matchedName);

  return (
    <BlogCategoryHub
      categoryName={matchedName}
      categorySlug={category}
      collectionName={`${matchedName} articles`}
      description={`${posts.length} ${matchedName.toLowerCase()} articles for UK limited company directors, contractors, sole traders and small businesses.`}
      intro={
        briefing?.intro ??
        `${posts.length} article${posts.length !== 1 ? "s" : ""} on ${matchedName.toLowerCase()} for UK limited company directors, contractors, sole traders and small businesses.`
      }
      sections={briefing?.sections ?? []}
      cta={{ heading: cta.heading, body: cta.body, submitLabel: cta.button }}
      posts={posts}
      categories={categories}
      siteUrl={siteConfig.url}
      proofPoints={LEAD_PROOF_POINTS}
      libraryNote={`${posts.length} ${posts.length === 1 ? "guide" : "guides"}, written or reviewed by a specialist accountant and kept current.`}
      form={<LeadForm submitLabel={cta.button} redirectOnSuccess={false} />}
      heroBackdrop={<GeneralistBackdrop tone="cream" />}
      ctaBackdrop={<GeneralistBackdrop />}
    />
  );
}
