/**
 * NOINDEX guide route — /resources/[topic]
 *
 * Serves the gated written guides (one per premium category). These pages are
 * NOINDEX by design: they are the value behind the resource gate and should not
 * rank independently. The ResourceGate links to them after a successful email
 * capture. generateStaticParams is driven by publishedGuideTopicsWithFile() so
 * only files that exist on disk are pre-rendered.
 *
 * Topic-key deduplication in the registry means sole-trader and limited-company
 * map to existing slugs (incorporation, director-pay respectively) — those pages
 * are rendered via those canonical slugs, not as separate routes.
 */
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { getGuideByTopic, publishedGuideTopicsWithFile } from "@/lib/resources/content";

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
    // NOINDEX: this page is the value behind the gate, not a ranking page.
    robots: { index: false, follow: false },
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

  return (
    <article className="bg-white py-12 sm:py-16">
      <div className={siteContainerLg}>
        <div className="mx-auto max-w-3xl">
          {/* Guide header */}
          <div className="mb-8 border-b border-slate-200 pb-8">
            <p className="text-xs font-bold uppercase tracking-wider text-orange-600">
              Holloway Davies guide
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

          {/* CTA at the bottom of the guide */}
          <div className="mt-12 border-l-4 border-orange-600 bg-slate-50 p-6 sm:p-8">
            <p className="text-sm font-bold uppercase tracking-wider text-orange-700">
              Ready to apply this to your situation?
            </p>
            <p className="mt-2 text-base text-slate-700 leading-relaxed">
              The guide gives you the framework. A specialist can confirm the numbers for your
              specific business, check any reliefs that might apply, and advise on the best
              timing. The first call is free and with no obligation.
            </p>
            <a
              href="/contact"
              className="mt-4 inline-block bg-orange-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-orange-700"
            >
              Book a free call
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
