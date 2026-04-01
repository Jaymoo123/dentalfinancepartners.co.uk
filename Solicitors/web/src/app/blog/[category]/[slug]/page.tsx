import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostRenderer } from "@/components/blog/BlogPostRenderer";
import { siteConfig } from "@/config/site";
import { getAllPosts, getPostByCategoryAndSlug, getRelatedPosts, getCategorySlug } from "@/lib/blog";

type Props = { params: Promise<{ category: string; slug: string }> };

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({
    category: getCategorySlug(p),
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const post = getPostByCategoryAndSlug(category, slug);
  if (!post) {
    return {};
  }
  const canonical = post.canonical ?? `${siteConfig.url}/blog/${category}/${post.slug}`;
  const ogImage = post.image || siteConfig.publisherLogoUrl;
  
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: canonical,
      type: "article",
      publishedTime: post.date,
      images: [{ url: ogImage, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images: [ogImage],
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { category, slug } = await params;
  const post = getPostByCategoryAndSlug(category, slug);
  if (!post) {
    notFound();
  }

  const categorySlug = getCategorySlug(post);
  const related = getRelatedPosts(post.slug, post.category, 3).map((r) => ({
    slug: r.slug,
    title: r.title,
    summary: r.summary,
    category: r.category,
    categorySlug: getCategorySlug(r),
  }));

  return <BlogPostRenderer post={post} related={related} categorySlug={categorySlug} />;
}
