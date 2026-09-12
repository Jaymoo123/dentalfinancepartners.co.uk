import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllPosts,
  getAllCategories,
  calculateReadTime,
  getCategorySlug,
  slugifyCategory,
} from "@/lib/blog";
import { categoryHub, ctaCopyForCategory } from "@/lib/blog-categories";
import { BlogCategoryHub } from "@accounting-network/web-shared/design/blog/BlogCategoryHub";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteConfig } from "@/config/site";

type Props = { params: Promise<{ category: string }> };

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const categories = getAllCategories();
  const cat = categories.find((c) => c.slug === category);
  if (!cat) return {};

  const hub = categoryHub(category);
  const title = `${cat.name} | Contractor Tax Guides`;
  const description =
    hub?.description ??
    `Practical guides on ${cat.name.toLowerCase()} for UK contractors. IR35, limited company tax and off-payroll rules explained by specialist accountants.`;
  const url = `${siteConfig.url}/blog/${category}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function BlogCategoryPage({ params }: Props) {
  const { category } = await params;
  const categories = getAllCategories();
  const cat = categories.find((c) => c.slug === category);
  if (!cat) notFound();

  const allPosts = getAllPosts();
  const categoryPosts = allPosts
    .filter((p) => slugifyCategory(p.category) === category)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      summary: p.summary,
      date: p.date,
      categorySlug: getCategorySlug(p),
      readTime: calculateReadTime(p.contentHtml),
    }));

  const hub = categoryHub(category);
  const cta = ctaCopyForCategory(category);

  return (
    <BlogCategoryHub
      categoryName={cat.name}
      heading={hub?.heading}
      categorySlug={category}
      description={hub?.description ?? cat.name}
      intro={
        hub?.intro ??
        `Practical guides on ${cat.name.toLowerCase()} for UK contractors and PSC directors.`
      }
      sections={[]}
      cta={{ heading: cta.heading, body: cta.body, submitLabel: cta.button }}
      posts={categoryPosts}
      categories={categories}
      siteUrl={siteConfig.url}
      form={<LeadForm submitLabel={cta.button} />}
      proofPoints={[]}
      libraryNote={`${cat.count} ${cat.count === 1 ? "guide" : "guides"} on ${cat.name.toLowerCase()}.`}
    />
  );
}
