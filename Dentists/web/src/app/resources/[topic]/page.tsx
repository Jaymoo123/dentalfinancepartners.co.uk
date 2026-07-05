/**
 * NOINDEX guide route — /resources/[topic]
 *
 * Serves the gated written guides for Dental Finance Partners premium categories.
 * NOINDEX by design: the guide is the value behind the resource gate and must
 * not rank independently. The ResourceGate links here after a successful lead
 * capture (on-page reveal mode, or email delivery when the flag is enabled).
 *
 * generateStaticParams: driven by publishedGuideTopicsWithFile() so only guides
 * that are both enabled in the registry AND have a file on disk are pre-rendered;
 * any other slug returns 404.
 *
 * TOKEN HARDENING: no var(--gold), no orange-*, no emerald-*.
 * Uses Dentists CSS-variable tokens: --navy, --gold, --gold-soft, --border,
 * --surface-elevated, --ink, --ink-soft, --muted.
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
          <div className="mb-8 border-b border-[var(--border)] pb-8">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--gold)]"
               style={{ color: "var(--gold)" }}>
              Dental Finance Partners guide
            </p>
            <h1 className="mt-2 text-3xl font-bold text-[var(--navy)] sm:text-4xl">
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
                      className="text-sm text-[var(--navy)] underline-offset-2 hover:underline"
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
            className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-[var(--navy)] prose-a:text-[var(--navy)] prose-a:no-underline hover:prose-a:underline prose-strong:text-[var(--navy)]"
            dangerouslySetInnerHTML={{ __html: guide.html }}
          />

          {/* CTA at the bottom of the guide */}
          <div
            className="mt-12 rounded-lg border-l-4 p-6 sm:p-8"
            style={{ borderColor: "var(--gold)", background: "var(--surface-elevated)" }}
          >
            <p className="text-sm font-bold uppercase tracking-wider text-[var(--navy)]">
              Ready to apply this to your situation?
            </p>
            <p className="mt-2 text-base text-[var(--ink)] leading-relaxed">
              The guide gives you the framework. A specialist can confirm the numbers for your
              specific practice, check any reliefs that apply, and advise on the best timing.
              The first call is free and with no obligation.
            </p>
            <a
              href="/contact"
              className="mt-4 inline-block rounded-full bg-[var(--navy)] px-6 py-3 text-sm font-bold text-white hover:opacity-90"
            >
              Book a free call
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
