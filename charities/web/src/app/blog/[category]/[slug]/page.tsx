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

// ISR-safe (Property's shipped fix, vercel_blog_fallback_size_limit):
// dynamicParams=false + full generateStaticParams means no ISR fallback shell
// is ever generated, keeping the deployment under Vercel's fallback size limit.
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

  const articleSchema = buildArticleJsonLd({
    title: post.h1,
    description: post.metaDescription,
    url: `/blog/${category}/${post.slug}`,
    datePublished: post.date,
    dateModified: post.updatedDate ?? post.date,
  });
  // FAQPage markup must match what the page shows (Google structured-data policy).
  // Some posts already carry their Q&A inside the body HTML; anything that does not
  // is rendered below, in the server HTML, so nothing is asserted to crawlers only.
  const bodyText = post.contentHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").toLowerCase();
  const unrenderedFaqs = (post.faqs ?? []).filter(
    (f) => !bodyText.includes(f.question.replace(/\s+/g, " ").toLowerCase()),
  );
  const faqSchema = post.faqs?.length ? buildFaqJsonLd(post.faqs) : null;
  const howToSchema = post.howToSteps?.length
    ? buildHowToJsonLd({ name: post.h1, description: post.metaDescription, steps: post.howToSteps })
    : null;

  // post.schema comes straight from frontmatter, where YAML parses a nested block
  // into an object rather than a string. Serialise whatever shape arrives so the
  // script tag never receives "[object Object]", and supply @context when the
  // frontmatter mapping omits it.
  const rawSchema: unknown = post.schema;
  const extraSchema =
    typeof rawSchema === "string"
      ? rawSchema
      : rawSchema && typeof rawSchema === "object"
        ? JSON.stringify({ "@context": "https://schema.org", ...(rawSchema as Record<string, unknown>) })
        : null;

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleSchema }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />}
      {howToSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: howToSchema }} />}
      {extraSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: extraSchema }} />
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
      {/* Blog bodies are raw HTML in frontmatter files (estate convention). */}
      <article
        className="prose prose-neutral mt-10 max-w-none"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
      {unrenderedFaqs.length > 0 && (
        <section className="mt-12 border-t border-neutral-200 pt-8">
          <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
            Frequently asked questions
          </h2>
          <dl className="mt-6 space-y-6">
            {unrenderedFaqs.map((faq) => (
              <div key={faq.question}>
                <dt className="text-base font-semibold text-neutral-900">{faq.question}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-neutral-700">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}
      <div className="mt-12 rounded-md border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold text-neutral-900">Need help with your charity&apos;s accounts?</h2>
        <p className="mt-2 text-sm text-neutral-600">
          Tell us about your charity, CIC or social enterprise and we will arrange a short introductory call.
        </p>
        <Link href="/contact" className="mt-4 inline-block font-medium underline">
          Get in touch
        </Link>
      </div>
    </main>
  );
}
