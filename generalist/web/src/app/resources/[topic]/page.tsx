/**
 * Free resource guide route — /resources/[topic]
 *
 * Open (indexable) research guides. Email gate retired 2026-07-17: content is
 * fully visible, xlsx is a direct download, MiniCapture CTA at the end captures
 * qualified leads. generateStaticParams is driven by publishedGuideTopicsWithFile()
 * so only files that exist on disk are pre-rendered.
 *
 * Topic-key deduplication in the registry means sole-trader and limited-company
 * map to existing slugs (incorporation, director-pay respectively).
 */
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { getGuideByTopic, publishedGuideTopicsWithFile } from "@/lib/resources/content";
import { resourceForTopic, isXlsxEnabled } from "@/lib/resources/registry";
import type { TopicKey } from "@/lib/intent/taxonomy";
import { GateOrForm } from "@/components/resources/GateOrForm";

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedGuideTopicsWithFile().map((t) => ({ topic: t }));
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
    description: guide.summary,
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

  // topic slug == TopicKey (guide slugs are TopicKeys by registry design).
  const topicKey = topic as TopicKey;
  const resource = resourceForTopic(topicKey);
  const xlsxReady = isXlsxEnabled(resource);

  return (
    <article className="bg-white py-12 sm:py-16">
      <div className={siteContainerLg}>
        <div className="mx-auto max-w-3xl">
          {/* Guide header */}
          <div className="mb-8 border-b border-slate-200 pb-8">
            <p className="text-xs font-bold uppercase tracking-wider text-orange-600">
              Free Holloway Davies research guide
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
              {guide.title}
            </h1>
            {guide.summary && (
              <p className="mt-3 text-lg text-slate-600 leading-relaxed">{guide.summary}</p>
            )}
            {(guide.frontmatter.version || guide.frontmatter.lastReviewed) && (
              <p className="mt-3 text-xs text-slate-400">
                {guide.frontmatter.version && <>Tax year: {guide.frontmatter.version}.</>}
                {guide.frontmatter.lastReviewed && (
                  <> Last reviewed: {guide.frontmatter.lastReviewed}.</>
                )}
              </p>
            )}
            {xlsxReady && resource?.xlsx && (
              <a
                href={resource.xlsx.file}
                download
                className="mt-4 inline-flex items-center gap-2 rounded-lg border border-orange-300 bg-orange-50 px-4 py-2.5 text-sm font-semibold text-orange-700 transition-colors hover:bg-orange-100"
              >
                <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {resource.xlsx.label}
              </a>
            )}
          </div>

          {/* Table of contents */}
          {guide.headings.length > 0 && (
            <nav
              aria-label="Guide contents"
              className="mb-8 rounded-lg border border-slate-200 bg-slate-50 p-5"
            >
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                Contents
              </p>
              <ol className="space-y-1">
                {guide.headings.map((h) => (
                  <li
                    key={h.id}
                    className={h.level === 3 ? "pl-4" : ""}
                  >
                    <a
                      href={`#${h.id}`}
                      className="text-sm text-orange-700 hover:underline"
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {/* Guide body */}
          <div
            className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-orange-700 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-900"
            dangerouslySetInnerHTML={{ __html: guide.html }}
          />

          {/* Lead CTA: qualified review request */}
          <div className="mt-12">
            <GateOrForm topic={topicKey} />
          </div>
        </div>
      </div>
    </article>
  );
}
