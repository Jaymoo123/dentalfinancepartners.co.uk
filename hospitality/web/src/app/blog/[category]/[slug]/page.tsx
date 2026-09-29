import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { buildOgImageUrl, buildBlogPostingJsonLd, buildPageBreadcrumbJsonLd, buildHowToJsonLd } from "@/lib/schema";
import {
  getAllPosts,
  getPostByCategoryAndSlug,
  getCategorySlug,
  calculateReadTime,
} from "@/lib/blog";
import { LeadForm } from "@/components/forms/LeadForm";
import { InlineMiniLeadForm } from "@/components/blog/InlineMiniLeadForm";
import { FaqSection } from "@accounting-network/web-shared/design/primitives/FaqSection";

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

// LEADS_250 §13 S2: mount InlineMiniLeadForm after the SECOND h2 of the body.
// No existing helper in this repo splits at the second h2 specifically
// (packages/web-shared/content/blog-splits.ts targets the first h2 or a
// fraction of remaining headings), so this is the minimal regex needed;
// nothing else in the body HTML is touched.
function splitAtSecondH2(html: string): { before: string; after: string } {
  const matches = [...html.matchAll(/<h2[^>]*>/g)];
  if (matches.length < 2) return { before: html, after: "" };
  const cut = matches[1].index!;
  return { before: html.slice(0, cut), after: html.slice(cut) };
}

export default async function BlogPostPage({ params }: Props) {
  const { category, slug } = await params;
  const post = getPostByCategoryAndSlug(category, slug);
  if (!post) notFound();

  const postUrl = `/blog/${category}/${post.slug}`;
  const bodySplit = splitAtSecondH2(post.contentHtml);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildBlogPostingJsonLd(
            {
              h1: post.h1,
              metaDescription: post.metaDescription,
              image: post.image,
              date: post.date,
              updatedDate: post.updatedDate,
              category: post.category,
            },
            postUrl,
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildPageBreadcrumbJsonLd([
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.category, href: `/blog/${category}` },
            { label: post.h1 },
          ]),
        }}
      />
      {post.faqs && post.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: post.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer.replace(/<[^>]+>/g, "") },
            })),
          }) }}
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
      <article className="prose prose-neutral mt-10 max-w-none">
        <div dangerouslySetInnerHTML={{ __html: bodySplit.before }} />
        {bodySplit.after ? (
          <>
            <InlineMiniLeadForm topic={post.category} />
            <div dangerouslySetInnerHTML={{ __html: bodySplit.after }} />
          </>
        ) : null}
      </article>
      {/* F2 fix 4: post.faqs was asserted in FAQPage JSON-LD above but never
          rendered, so the schema claimed 210 of 214 answers that were
          invisible on the page. Same questions/answers, same data, rendered
          with the kit accordion so the server HTML carries what the schema
          asserts. alwaysRenderAnswers keeps every answer in the server HTML
          (not just the open one) so the two never disagree. Heading matches
          the "Common questions" convention used on /services/[slug]. */}
      {post.faqs && post.faqs.length > 0 && (
        <div className="mt-12 border-t border-neutral-200 pt-8">
          <FaqSection
            eyebrow=""
            title="Common questions"
            faqs={post.faqs}
            html
            alwaysRenderAnswers
            className="pt-8"
          />
        </div>
      )}
      {/* LEADS_250 §13 S2: the static "Book a call" text block that lived here
          is replaced by the site's LeadForm (form_id lead_form); heading/body
          copy is unchanged, still the site's existing wording. */}
      <div className="mt-12 rounded-md border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold text-neutral-900">Need help with your hospitality business accounts?</h2>
        <p className="mt-2 text-sm text-neutral-600">
          Tell us about your venue and we will come back within 24 hours.
        </p>
        <div className="mt-4">
          <LeadForm redirectOnSuccess={false} />
        </div>
      </div>
    </div>
  );
}
