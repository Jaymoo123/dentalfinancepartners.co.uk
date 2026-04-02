import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostRenderer } from "@/components/blog/BlogPostRenderer";
import { siteConfig } from "@/config/site";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return {};
  }
  const canonical = post.canonical || `${siteConfig.url}/blog/${post.slug}`;
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
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const related = getRelatedPosts(post.slug, post.category, 3).map((r) => ({
    slug: r.slug,
    title: r.title,
    summary: r.summary,
  }));

  return <BlogPostRenderer post={post} related={related} />;
}
