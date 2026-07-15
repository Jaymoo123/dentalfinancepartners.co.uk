import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { buildOgImageUrl, buildArticleJsonLd, buildFaqJsonLd, buildHowToJsonLd } from "@/lib/schema";
import {
  getAllPosts,
  getPostByCategoryAndSlug,
  getCategorySlug,
  calculateReadTime,
} from "@/lib/blog";

type Props = { params: Promise<{ category: string; slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ category: getCategorySlug(p), slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const post = getPostByCategoryAndSlug(category, slug);
  if (!post) return {};

  const canonical = post.canonical ?? `${siteConfig.url}/blog/${category}/${post.slug}`;
  const ogImage = post.image || buildOgImageUrl(post.h1, post.category);

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: {
      canonical,
      languages: { "en-GB": canonical, "x-default": canonical },
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: canonical,
      type: "article",
      siteName: siteConfig.name,
      publishedTime: post.date,
      modifiedTime: post.updatedDate || post.date,
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

export default async function BlogPostPage({ params }: Props) {
  const { category, slug } = await params;
  const post = getPostByCategoryAndSlug(category, slug);
  if (!post) notFound();

  const postUrl = `/blog/${category}/${post.slug}`;

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildArticleJsonLd({
            title: post.metaTitle,
            description: post.metaDescription,
            url: postUrl,
            datePublished: post.date,
            dateModified: post.updatedDate ?? post.date,
          }),
        }}
      />
      {post.faqs && post.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(post.faqs) }}
        />
      )}
      {post.howToSteps && post.howToSteps.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: buildHowToJsonLd(post) }}
        />
      )}
      {post.schema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: post.schema }} />
      )}
      <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
        <Link href="/blog" className="hover:underline">Blog</Link>{" "}
        / <Link href={`/blog/${category}`} className="hover:underline">{post.category}</Link>
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
        {post.h1}
      </h1>
      <p className="mt-3 text-sm text-neutral-500">
        {new Date(post.updatedDate || post.date).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}{" "}
        · {calculateReadTime(post.contentHtml)} min read
      </p>
      {post.keyTakeaways && post.keyTakeaways.length > 0 && (
        <aside className="mt-8 rounded-md border border-neutral-200 bg-neutral-50 p-5">
          <h2 className="text-sm font-semibold text-neutral-900">Key takeaways</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-700">
            {post.keyTakeaways.map((kt) => (
              <li key={kt}>{kt}</li>
            ))}
          </ul>
        </aside>
      )}
      <article
        className="prose prose-neutral mt-10 max-w-none"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
      <div className="mt-12 rounded-md border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold text-neutral-900">Need help with your hospitality business accounts?</h2>
        <p className="mt-2 text-sm text-neutral-600">
          Tell us about your venue and we will come back within 24 hours.
        </p>
        <Link href="/contact" className="mt-4 inline-block font-medium underline">
          Get in touch
        </Link>
      </div>
    </main>
  );
}
