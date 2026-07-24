/**
 * Open resource guide route.
 *
 * Serves the written guide for each enabled topic at /resources/<topic>.
 * Guides are free and fully visible (email gate retired 2026-07-18, estate-wide);
 * pages are indexable and listed in the sitemap. Where a model xlsx exists for the
 * topic it is a direct download; a qualified free-review MiniCapture sits at the foot.
 * Only pre-renders guides that are enabled AND have a Markdown file on disk.
 * dynamicParams=false: any non-pre-rendered slug returns 404 automatically.
 *
 * Design: single-column prose, slate header bar with orange accent, print-safe.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGuideByTopic, publishedGuideTopicsWithFile } from "@/lib/resources/content";
import { resourceForTopic, isXlsxEnabled, topicForGuideSlug } from "@/lib/resources/registry";
import { ResourceGate } from "@/components/resources/ResourceGate";
import { siteConfig } from "@/config/site";

type Props = { params: Promise<{ topic: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return publishedGuideTopicsWithFile().map((t) => ({ topic: t }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic } = await params;
  const guide = getGuideByTopic(topic);
  if (!guide) return {};
  return {
    title: `${guide.title} | Trade Tax Specialists`,
    description: guide.summary || guide.title,
    alternates: {
      canonical: `${siteConfig.url}/resources/${topic}`,
    },
  };
}

export default async function ResourceGuidePage({ params }: Props) {
  const { topic } = await params;
  const guide = getGuideByTopic(topic);
  if (!guide) notFound();

  const topicKey = topicForGuideSlug(topic);
  const resource = resourceForTopic(topicKey);
  const xlsxReady = isXlsxEnabled(resource);

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      {/* Header bar */}
      <div
        className="mb-8 rounded-xl px-6 py-5"
        style={{ background: "#1e293b" }}
      >
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide" style={{ color: "#f97316" }}>
          Trade Tax Specialists guide
        </p>
        <h1 className="text-xl font-bold leading-snug text-white sm:text-2xl">
          {guide.title}
        </h1>
        {guide.summary && (
          <p className="mt-2 text-sm text-white/80">{guide.summary}</p>
        )}
        {xlsxReady && resource?.xlsx && (
          <a
            href={resource.xlsx.file}
            download
            className="mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
            style={{ background: "#f97316" }}
          >
            <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {resource.xlsx.label}
          </a>
        )}
      </div>

      {/* Table of contents (when 3+ headings) */}
      {guide.headings.length >= 3 && (
        <nav aria-label="In this guide" className="mb-8 rounded-lg border border-gray-200 bg-gray-50 px-5 py-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">In this guide</p>
          <ol className="space-y-1">
            {guide.headings
              .filter((h) => h.level === 2)
              .map((h) => (
                <li key={h.id}>
                  <a
                    href={`#${h.id}`}
                    className="text-sm font-medium text-gray-700 hover:underline"
                    style={{ color: "#1e293b" }}
                  >
                    {h.text}
                  </a>
                </li>
              ))}
          </ol>
        </nav>
      )}

      {/* Prose body */}
      <article
        className="prose prose-gray max-w-none
          prose-headings:text-[#1e293b] prose-headings:font-bold
          prose-a:text-[#f97316] prose-a:no-underline hover:prose-a:underline
          prose-strong:text-[#1e293b]"
        dangerouslySetInnerHTML={{ __html: guide.html }}
      />

      {/* Foot CTA: qualified free-review MiniCapture (email gate retired) */}
      {topicKey && (
        <div className="mt-12">
          <ResourceGate topic={topicKey} />
        </div>
      )}
    </main>
  );
}
