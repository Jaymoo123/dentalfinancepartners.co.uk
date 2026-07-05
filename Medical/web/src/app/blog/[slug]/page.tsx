import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostRenderer } from "@/components/blog/BlogPostRenderer";
import { siteConfig } from "@/config/site";
import { buildOgImageUrl } from "@/lib/schema";
import { getAllPosts, getPostBySlug, getRelatedPosts, getCategorySlug } from "@/lib/blog";

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
  const ogImage = post.image || buildOgImageUrl(post.h1, post.category);

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: {
      canonical,
      languages: {
        "en-GB": canonical,
        "x-default": canonical,
      },
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: canonical,
      type: "article",
      siteName: siteConfig.name,
      publishedTime: post.date,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
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

  // Derive the category slug server-side so the renderer can resolve the intent
  // topic (FLAT-routing parity: topic cannot be derived from the URL path).
  const categorySlug = getCategorySlug(post);

  const related = getRelatedPosts(post.slug, post.category, 3).map((r) => ({
    slug: r.slug,
    title: r.title,
    summary: r.summary,
  }));

  return <BlogPostRenderer post={post} categorySlug={categorySlug} related={related} />;
}
