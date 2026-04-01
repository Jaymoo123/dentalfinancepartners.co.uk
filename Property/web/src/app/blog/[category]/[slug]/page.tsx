import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllPosts,
  getPostByCategoryAndSlug,
  getCategorySlug,
  getRelatedPosts,
} from "@/lib/blog";
import BlogPostRenderer from "@/components/blog/BlogPostRenderer";

type Props = {
  params: Promise<{ category: string; slug: string }>;
};

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
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: {
      canonical: post.canonical,
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: "article",
      url: post.canonical,
      siteName: "Accounts for Property",
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
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
    categorySlug: getCategorySlug(r),
  }));

  return <BlogPostRenderer post={post} categorySlug={categorySlug} related={related} />;
}
