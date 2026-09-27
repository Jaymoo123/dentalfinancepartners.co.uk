import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { buildOgImageUrl, buildFaqJsonLd, buildHowToJsonLd } from "@/lib/schema";
import {
  getAllPosts,
  getPostByCategoryAndSlug,
  getCategorySlug,
  calculateReadTime,
} from "@/lib/blog";
import { LeadForm } from "@/components/forms/LeadForm";
import { InlineMiniLeadForm } from "@/components/blog/InlineMiniLeadForm";

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

  const bodySplit = splitAtSecondH2(post.contentHtml);

  // FAQPage markup must match what the page shows (Google structured-data
  // policy). Posts that already cover a question inside the body HTML don't
  // need it repeated below; render only the FAQs not already answered there,
  // and emit FAQPage for exactly those rendered ones (mirrors charities'
  // blog/[category]/[slug] fix). Answers may contain <a> anchors: rendered as
  // HTML below, but JSON-LD `text` must be plain text, so tags are stripped
  // for the schema copy only.
  const bodyText = post.contentHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").toLowerCase();
  const renderedFaqs = (post.faqs ?? []).filter(
    (f) => !bodyText.includes(f.question.replace(/\s+/g, " ").toLowerCase()),
  );
  const faqSchema =
    renderedFaqs.length > 0
      ? buildFaqJsonLd(
          renderedFaqs.map((f) => ({
            question: f.question,
            answer: f.answer.replace(/<[^>]+>/g, "").trim(),
          })),
        )
      : null;

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      {post.schema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: post.schema }} />
      )}
      {post.howToSteps && post.howToSteps.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buildHowToJsonLd(post) }} />
      )}
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
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
      {renderedFaqs.length > 0 && (
        <section className="mt-12 border-t border-neutral-200 pt-8" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-2xl font-bold text-neutral-900">
            Frequently asked questions
          </h2>
          <div className="mt-6 space-y-3 sm:space-y-4">
            {renderedFaqs.map((faq) => (
              <details key={faq.question} className="group border border-neutral-200 bg-white">
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 font-semibold text-neutral-900 hover:text-[#7d6b9e] transition-colors list-none">
                  <span>{faq.question}</span>
                  <span className="flex-shrink-0 text-[#7d6b9e] transition-transform group-open:rotate-45" aria-hidden>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" /></svg>
                  </span>
                </summary>
                <div
                  className="px-6 pb-6 text-neutral-600 leading-relaxed border-t border-neutral-100 pt-4"
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              </details>
            ))}
          </div>
        </section>
      )}
      {/* LEADS_250 §13 S2: the static "Book a call" text block that lived here
          is replaced by the site's LeadForm (form_id lead_form); heading/body
          copy is unchanged, still the site's existing wording. */}
      <div className="mt-12 rounded-md border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold text-neutral-900">Need specialist care sector finance advice?</h2>
        <p className="mt-2 text-sm text-neutral-600">
          Tell us about your care service and we will come back within 24 hours.
        </p>
        <div className="mt-4">
          <LeadForm redirectOnSuccess={false} />
        </div>
      </div>
    </main>
  );
}
