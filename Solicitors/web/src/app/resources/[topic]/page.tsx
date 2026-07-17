/**
 * Open guide route for written resources.
 *
 * Guides are free and fully visible (email gate retired 2026-07-17). Pages are
 * indexable. A qualified lead-capture CTA sits at the foot of each guide.
 */
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getGuideByTopic, publishedGuideTopics } from "@/lib/resources/content";
import { resourceForTopic, isXlsxEnabled } from "@/lib/resources/registry";
import type { TopicKey } from "@/lib/intent/taxonomy";
import { ResourceGate } from "@/components/resources/ResourceGate";
import { siteContainerLg, sectionY } from "@/components/ui/layout-utils";
import Link from "next/link";

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedGuideTopics().map((topic) => ({ topic }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}): Promise<Metadata> {
  const { topic } = await params;
  const guide = getGuideByTopic(topic);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.summary || undefined,
    alternates: { canonical: `${siteConfig.url}/resources/${topic}` },
  };
}

export default async function ResourceGuidePage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const guide = getGuideByTopic(topic);
  if (!guide) notFound();

  const topicKey = topic as TopicKey;
  const resource = resourceForTopic(topicKey);
  const xlsxReady = isXlsxEnabled(resource);

  return (
    <>
      <section className="bg-[var(--primary)] text-white">
        <div className={`${siteContainerLg} py-12 sm:py-16`}>
          <Link
            href="/resources"
            className="inline-flex items-center gap-1 text-sm text-white/80 hover:text-white mb-6"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to resources
          </Link>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/80">
            Specialist guide · Accounts for Lawyers
          </p>
          <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl">
            {guide.title}
          </h1>
          {guide.summary && (
            <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg max-w-3xl">
              {guide.summary}
            </p>
          )}
          {xlsxReady && resource?.xlsx && (
            <a
              href={resource.xlsx.file}
              download
              className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-white bg-white px-5 py-2.5 text-sm font-semibold text-[var(--primary)] transition-all hover:bg-transparent hover:text-white"
            >
              <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {resource.xlsx.label}
            </a>
          )}
        </div>
      </section>

      <article className="bg-white">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-3xl">
            {guide.frontmatter.lastReviewed && (
              <p className="mb-8 text-xs text-[var(--muted)]">
                Last reviewed: {guide.frontmatter.lastReviewed}
                {guide.frontmatter.version ? ` · Version ${guide.frontmatter.version}` : ""}
              </p>
            )}
            <div
              className="article-body prose-blog"
              dangerouslySetInnerHTML={{ __html: guide.html }}
            />

            {/* Lead CTA: qualified free-review request (replaces plain /contact link) */}
            <div className="mt-16">
              <ResourceGate topic={topicKey} />
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
