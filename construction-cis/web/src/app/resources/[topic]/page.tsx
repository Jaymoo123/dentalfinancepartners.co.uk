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
 * Design: Property standard article anatomy. Navy hero band then a white article
 * band, so the last opaque band under the main landmark is light (DESIGN_SYSTEM section 9,
 * navy must never touch navy, and the footer is navy).
 *
 * Two things this template used to do that it must not do again:
 * 1. It rendered its own main element, inside the one PageShell.tsx:40 already renders,
 *    so all three routes shipped two main landmarks. It returns a fragment now, and the
 *    literal tag name is kept out of this comment so a source grep for it stays honest.
 * 2. It styled the guide body with the typography plugin's prose-* classes, with the link
 *    colour pinned to the orange-500 token. That plugin is NOT installed on this site (no @plugin in globals.css, no
 *    @tailwindcss/typography in package.json), so every one of those prose-* classes
 *    compiled to nothing: the guide bodies rendered with preflight defaults and the
 *    markdown links inherited body colour from the preflight `a { color: inherit }`.
 *    The body now uses the site's hand-rolled `.prose-blog`, which is what the 82 blog
 *    articles, 50 glossary entries and 25 city pages already use. That brings real
 *    heading scale, `--accent-strong` underlined links (5.18 on white) and
 *    `.prose-blog [id] { scroll-margin-top: 6rem }`, which is the TD-22 anchor offset
 *    for all 10 in-guide heading targets, with no new CSS.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGuideByTopic, publishedGuideTopicsWithFile } from "@/lib/resources/content";
import { resourceForTopic, isXlsxEnabled, topicForGuideSlug } from "@/lib/resources/registry";
import { ResourceGate } from "@/components/resources/ResourceGate";
import { btnPrimary, sectionY, siteContainerLg } from "@/components/ui/layout-utils";
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
  const sectionHeadings = guide.headings.filter((h) => h.level === 2);

  return (
    <>
      <section className="border-b border-neutral-200 bg-neutral-900 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <p className="eyebrow text-orange-400">Trade Tax Specialists guide</p>
          <h1 className="mt-6 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {guide.title}
          </h1>
          {guide.summary && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300">{guide.summary}</p>
          )}
          {xlsxReady && resource?.xlsx && (
            <a href={resource.xlsx.file} download className={`${btnPrimary} mt-8 gap-2`}>
              <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              {resource.xlsx.label}
            </a>
          )}
        </div>
      </section>

      <section className="bg-white">
        <div className={`${siteContainerLg} ${sectionY}`}>
          {sectionHeadings.length >= 3 && (
            <nav
              aria-label="In this guide"
              className="mb-10 max-w-3xl rounded-xl border border-slate-200 bg-slate-50 px-5 py-4"
            >
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-600">In this guide</p>
              <ol className="space-y-1">
                {sectionHeadings.map((h) => (
                  <li key={h.id}>
                    <a
                      href={`#${h.id}`}
                      className="text-sm font-medium text-[var(--accent-strong)] hover:underline"
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <article className="article-body prose-blog" dangerouslySetInnerHTML={{ __html: guide.html }} />

          {/* Foot CTA: qualified free-review MiniCapture (email gate retired) */}
          {topicKey && (
            <div className="mt-12 max-w-3xl">
              <ResourceGate topic={topicKey} />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
