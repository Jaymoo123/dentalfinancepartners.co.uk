/**
 * Open guide route -- /resources/[topic]
 *
 * Written guides for Contractor Tax Accountants premium categories. Free and
 * fully visible: the email gate was retired 2026-07-18 (estate-wide de-gate,
 * it was not converting). Pages are indexable, the model xlsx downloads direct
 * where one exists, and a qualified free-review lead form sits at the foot.
 *
 * generateStaticParams: driven by publishedGuideTopicsWithFile() so only guides
 * that are both enabled in the registry AND have a file on disk are pre-rendered;
 * any other slug returns 404.
 *
 * TOKEN HARDENING: no var(--gold), no var(--navy), no var(--dark), no var(--primary).
 * Uses cfp tokens: --accent, --accent-strong, --accent-whisper,
 * --border, --surface-elevated, --ink, --ink-soft, --muted.
 */
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { getGuideByTopic, publishedGuideTopicsWithFile } from "@/lib/resources/content";
import { resourceForTopic, isXlsxEnabled } from "@/lib/resources/registry";
import type { TopicKey } from "@/lib/intent/taxonomy";
import { ResourceGate } from "@/components/resources/ResourceGate";

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
    <article className="bg-white py-12 sm:py-16">
      <div className={siteContainerLg}>
        <div className="mx-auto max-w-3xl">
          {/* Guide header */}
          <div className="mb-8 border-b border-[var(--border)] pb-8">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
              Contractor Tax Accountants guide
            </p>
            <h1 className="mt-2 text-3xl font-bold text-[var(--ink)] sm:text-4xl">
              {guide.title}
            </h1>
            {guide.summary && (
              <p className="mt-3 text-lg text-[var(--ink-soft)] leading-relaxed">{guide.summary}</p>
            )}
            {(guide.frontmatter.version || guide.frontmatter.lastReviewed) && (
              <p className="mt-3 text-xs text-[var(--muted)]">
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
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-bold text-white hover:opacity-90"
              >
                <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
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
              className="mb-8 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] p-5"
            >
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
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
                      className="text-sm text-[var(--accent)] underline-offset-2 hover:underline"
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {/* Guide body: HTML rendered from the markdown source. */}
          <div
            className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-[var(--ink)] prose-a:text-[var(--accent)] prose-a:no-underline hover:prose-a:underline prose-strong:text-[var(--ink)]"
            dangerouslySetInnerHTML={{ __html: guide.html }}
          />

          {/* Foot CTA: qualified free-review lead form (replaces the plain /contact link). */}
          <div className="mt-12">
            <ResourceGate topic={topicKey} />
          </div>
        </div>
      </div>
    </article>
  );
}
