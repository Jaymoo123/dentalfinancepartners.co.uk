import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { buildOgImageUrl, buildHowToJsonLd, buildFaqJsonLd } from "@/lib/schema";
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

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      {post.schema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: post.schema }} />
      )}
      {!post.schema && post.faqs && post.faqs.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(post.faqs) }} />
      )}
      {post.howToSteps && post.howToSteps.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buildHowToJsonLd(post) }} />
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
      {post.faqs && post.faqs.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">Common questions</h2>
          <div className="mt-6 space-y-3">
            {post.faqs.map((faq) => (
              <details key={faq.question} className="group border border-neutral-200 bg-white">
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 font-semibold text-neutral-900 list-none">
                  <span>{faq.question}</span>
                  <span className="flex-shrink-0 text-neutral-900 transition-transform group-open:rotate-45" aria-hidden>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" /></svg>
                  </span>
                </summary>
                <div
                  className="border-t border-neutral-100 px-5 pb-5 pt-4 text-sm leading-relaxed text-neutral-600 [&_a]:underline"
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              </details>
            ))}
          </div>
        </section>
      )}
      <div className="mt-12 rounded-md border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold text-neutral-900">Need help with your crypto tax position?</h2>
        <p className="mt-2 text-sm text-neutral-600">
          Tell us about your situation and we will come back to you.
        </p>
        <Link href="/contact" className="mt-4 inline-block font-medium underline">
          Get in touch
        </Link>
      </div>
    </main>
  );
}
