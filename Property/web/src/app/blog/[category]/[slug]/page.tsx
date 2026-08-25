import { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import {
  getAllPosts,
  getPostBySlug,
  getPostByCategoryAndSlug,
  getCategorySlug,
  getRelatedPosts,
  categoryDisplayName,
  firstSentence,
} from "@/lib/blog";
import { siteConfig } from "@/config/site";
import { buildOgImageUrl } from "@/lib/schema";
import { BlogPostRenderer } from "@/components/blog/BlogPostRenderer";

type Props = {
  params: Promise<{ category: string; slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    category: getCategorySlug(post),
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const post = getPostByCategoryAndSlug(category, slug);

  if (!post) {
    const bySlug = getPostBySlug(slug);
    if (bySlug) return {};
    return { title: "Article Not Found" };
  }

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: {
      canonical: post.canonical,
      languages: {
        "en-GB": post.canonical,
        "x-default": post.canonical,
      },
    },
    ...(post.noindex && { robots: { index: false, follow: true } }),
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: "article",
      url: post.canonical,
      siteName: siteConfig.name,
      publishedTime: post.date,
      modifiedTime: post.dateModified ?? post.date,
      images: [
        {
          url: post.image || buildOgImageUrl(post.h1, categoryDisplayName(getCategorySlug(post), post.category)),
          width: 1200,
          height: 630,
          alt: post.altText || post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images: [post.image || buildOgImageUrl(post.h1, categoryDisplayName(getCategorySlug(post), post.category))],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { category, slug } = await params;
  const post = getPostByCategoryAndSlug(category, slug);

  if (!post) {
    const bySlug = getPostBySlug(slug);
    if (bySlug) {
      permanentRedirect(`/blog/${getCategorySlug(bySlug)}/${slug}`);
    }
    notFound();
  }

  const categorySlug = getCategorySlug(post);
  const related = getRelatedPosts(post.slug, post.category, 3).map((r) => ({
    slug: r.slug,
    title: r.title,
    // The card shows the article's opening line, not the frontmatter summary,
    // which is written for search and runs to 1,000+ characters on some posts.
    summary: firstSentence(r.contentHtml, r.summary),
    categorySlug: getCategorySlug(r),
  }));

  return <BlogPostRenderer post={post} categorySlug={categorySlug} related={related} />;
}
