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
import { siteContainerLg, sectionY, focusRing } from "@/components/ui/layout-utils";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { SolicitorsBackdrop } from "@/components/layout/SolicitorsBackdrop";
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
      <section className="relative overflow-hidden bg-slate-900 py-12 sm:py-16">
        <SolicitorsBackdrop tone="navy" />
        <div className={`${siteContainerLg} relative z-10`}>
          {/* Kept as the hand-rolled back-link, NOT swapped for the kit
              Breadcrumb: a breadcrumb would add "Home" plus a hub label as
              net-new visible copy and emit a new BreadcrumbList JSON-LD block
              on 8 indexed routes. Both are outside the 2026-09-11 hard rule.
              The /resources href stays a 404 until the owner decides. */}
          <Link
            href="/resources"
            className={`inline-flex items-center gap-1 text-sm text-white/80 transition-colors hover:text-white mb-6 ${focusRing} rounded`}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to resources
          </Link>
          <div className="max-w-3xl">
            <Eyebrow onDark>Specialist guide · Accounts for Lawyers</Eyebrow>
            <h1 className="text-3xl font-bold leading-[1.15] text-white sm:text-4xl lg:text-5xl">
              {guide.title}
            </h1>
            {guide.summary && (
              <p className="mt-4 text-base leading-relaxed text-slate-200 sm:text-lg">
                {guide.summary}
              </p>
            )}
          </div>
          {xlsxReady && resource?.xlsx && (
            <a
              href={resource.xlsx.file}
              download
              className={`mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100 ${focusRing}`}
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
          {/* F.3 article measure: the standard's own exception to "no body
              clamps", same as /solicitor-guides/[slug]. */}
          <div className="max-w-4xl">
            {guide.frontmatter.lastReviewed && (
              <p className="mb-8 text-xs text-slate-500">
                Last reviewed: {guide.frontmatter.lastReviewed}
                {guide.frontmatter.version ? ` · Version ${guide.frontmatter.version}` : ""}
              </p>
            )}
            <div
              className="article-body prose-blog"
              dangerouslySetInnerHTML={{ __html: guide.html }}
            />

            {/* Lead CTA: qualified free-review request (replaces plain /contact link).
                Restyle is the wrapper class only; trigger, cadence and audience
                are the component's and are untouched. */}
            <div className="mt-16 scroll-mt-24">
              <ResourceGate topic={topicKey} />
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
