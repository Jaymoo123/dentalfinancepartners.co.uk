/**
 * NOINDEX guide route -- /resources/[topic]
 *
 * Serves the gated written guides for Agency Founder Finance premium categories.
 * NOINDEX by design: the guide is the value behind the resource gate and must
 * not rank independently. The ResourceGate links here after a successful lead
 * capture (on-page reveal mode only; RESOURCE_EMAIL_DELIVERY_ENABLED=false).
 *
 * generateStaticParams: driven by publishedGuideTopicsWithFile() so only guides
 * that are both enabled in the registry AND have a file on disk are pre-rendered;
 * any other slug returns 404.
 *
 * TOKEN HARDENING: no var(--gold), no var(--navy), no var(--dark), no var(--primary).
 * Uses Agency Founder Finance tokens: var(--accent) #4f46e5, var(--ink) #0f172a.
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
            <p
              className="text-xs font-bold uppercase tracking-wider"
              style={{ color: "var(--accent)" }}
            >
              Agency Founder Finance guide
            </p>
            <h1
              className="mt-2 text-3xl font-bold sm:text-4xl"
              style={{ color: "var(--ink)" }}
            >
              {guide.title}
            </h1>
            {guide.summary && (
              <p className="mt-3 text-lg leading-relaxed text-slate-600">
                {guide.summary}
              </p>
            )}
            {(guide.frontmatter.version || guide.frontmatter.lastReviewed) && (
              <p className="mt-3 text-xs text-slate-500">
                {guide.frontmatter.version && (
                  <>Tax year: {guide.frontmatter.version}.</>
                )}
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
                  <li key={h.id} className={h.level === 3 ? "pl-4" : ""}>
                    <a
                      href={`#${h.id}`}
                      className="text-sm underline-offset-2 hover:underline"
                      style={{ color: "var(--accent)" }}
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
            className="prose prose-slate max-w-none prose-headings:font-bold prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: guide.html }}
          />

          {/* CTA at the bottom of the guide */}
          <div
            className="mt-12 rounded-lg border-l-4 p-6 sm:p-8"
            style={{ borderColor: "var(--accent)", background: "#f8f9ff" }}
          >
            <p
              className="text-sm font-bold uppercase tracking-wider"
              style={{ color: "var(--ink)" }}
            >
              Ready to apply this to your situation?
            </p>
            <p className="mt-2 text-base leading-relaxed text-slate-700">
              The guide gives you the framework. A specialist agency accountant can confirm the
              numbers for your specific business, check any reliefs that apply, and advise on the
              best approach for your structure and timeline. The first call is free and with no
              obligation.
            </p>
            <a
              href="/contact"
              className="mt-4 inline-block rounded-full px-6 py-3 text-sm font-bold text-white hover:opacity-90"
              style={{ background: "var(--accent)" }}
            >
              Book a free call
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
