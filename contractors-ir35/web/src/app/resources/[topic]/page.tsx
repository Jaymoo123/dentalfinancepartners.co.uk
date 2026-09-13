/**
 * Open guide route -- /resources/[topic]
 *
 * Written guides for Contractor Tax Accountants premium categories. Free and
 * fully visible: the email gate was retired 2026-07-18 (estate-wide de-gate,
 * it was not converting). The model xlsx downloads direct where one exists, and
 * a qualified free-review lead form sits at the foot.
 *
 * INDEXING: these three URLs are `noindex, follow` and are OUT of the sitemap,
 * because their frontmatter asks for it (generateMetadata below honours the
 * flag; before F5 it was silently dropped). That is a completed fix, not a
 * defect: do not "tidy" it in either direction.
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
    ...(guide.frontmatter.noindex ? { robots: { index: false, follow: true } } : {}),
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
    <article>
      {/* Hero. Navy ground, so every colour below is hand-computed against
          neutral-900 #171717: white 17.93, neutral-300 #d4d4d4 11.55,
          cyan-300 #67e8f9 12.37. browser_check.mjs cannot resolve the var()
          chains on this route and falls back to white, so no instrument output
          is cited anywhere in this file. */}
      <section className="bg-neutral-900 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">
            Contractor Tax Accountants guide
          </p>
          <h1 className="mt-2 max-w-4xl text-3xl font-bold text-white sm:text-4xl">
            {guide.title}
          </h1>
          {guide.summary && (
            <p className="mt-3 max-w-3xl text-lg leading-relaxed text-neutral-300">{guide.summary}</p>
          )}
          {(guide.frontmatter.version || guide.frontmatter.lastReviewed) && (
            <p className="mt-3 text-xs text-neutral-300">
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
                className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-xl bg-[var(--accent)] px-8 py-3.5 text-base font-bold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
              >
                <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {resource.xlsx.label}
              </a>
            )}
        </div>
      </section>

      {/* Contents. slate-50 ground so it never touches the white body band.
          --muted resolves to --ink-soft #525252: 7.47 on slate-50 #f8fafc.
          --accent #0e7490: 5.12 on slate-50. Both hand-computed. */}
      {guide.headings.length > 0 && (
        <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
          <div className={siteContainerLg}>
            <nav
              aria-label="Guide contents"
              className="rounded-xl bg-[var(--surface-elevated)] p-5 ring-1 ring-slate-200/70"
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
          </div>
        </section>
      )}

      {/* Guide body: HTML rendered from the markdown source. White ground.
          --ink #0a0a0a = 19.80 on white, --accent #0e7490 = 5.36. */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div
            className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-[var(--ink)] prose-a:text-[var(--accent)] prose-a:no-underline hover:prose-a:underline prose-strong:text-[var(--ink)]"
            dangerouslySetInnerHTML={{ __html: guide.html }}
          />
        </div>
      </section>

      {/* Closing ask: qualified free-review lead form (replaces the plain /contact
          link). MiniCapture sits on the slate-50 band, a light ground. */}
      <section id="book" className="scroll-mt-24 bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <ResourceGate topic={topicKey} />
        </div>
      </section>
    </article>
  );
}
