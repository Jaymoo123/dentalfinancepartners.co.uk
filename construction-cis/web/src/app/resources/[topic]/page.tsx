/**
 * NOINDEX gated resource guide route.
 *
 * Serves the written guide for each enabled topic at /resources/<topic>.
 * Excluded from search-engine indexing (robots: noindex,follow).
 * Only pre-renders guides that are enabled AND have a Markdown file on disk.
 * dynamicParams=false: any non-pre-rendered slug returns 404 automatically.
 *
 * Design: single-column prose, slate header bar with orange accent, print-safe.
 * No personal nav link to this route from any public page (gate gated by ResourceGate).
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGuideByTopic, publishedGuideTopicsWithFile } from "@/lib/resources/content";
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
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: `${siteConfig.url}/resources/${topic}`,
    },
  };
}

export default async function ResourceGuidePage({ params }: Props) {
  const { topic } = await params;
  const guide = getGuideByTopic(topic);
  if (!guide) notFound();

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

      {/* Footer CTA */}
      <div className="mt-12 rounded-xl border border-orange-200 bg-orange-50 px-6 py-5">
        <p className="text-sm font-semibold" style={{ color: "#1e293b" }}>
          Need specialist advice on your specific position?
        </p>
        <p className="mt-1 text-sm text-gray-600">
          Use the contact form and a CIS specialist will get back to you within one working day. No automated responses.
        </p>
        <a
          href="/contact"
          className="mt-3 inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          style={{ background: "#1e293b" }}
        >
          Get in touch
        </a>
      </div>
    </main>
  );
}
