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
import { Download } from "lucide-react";
import { siteContainerLg, btnSecondary } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { TableOfContents } from "@accounting-network/web-shared/design/blog/TableOfContents";
import { GeneralistBackdrop } from "@/components/layout/GeneralistBackdrop";
import { getGuideByTopic, publishedGuideTopicsWithFile } from "@/lib/resources/content";
import { resourceForTopic, isXlsxEnabled } from "@/lib/resources/registry";
import type { TopicKey } from "@/lib/intent/taxonomy";
import { GateOrForm } from "@/components/resources/GateOrForm";
import { siteConfig } from "@/config/site";

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
    <>
      {/* Breadcrumb carries the BreadcrumbList JSON-LD for this route. */}
      <section className="relative overflow-hidden bg-slate-900 py-8 sm:py-10 lg:py-12">
        <GeneralistBackdrop />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Breadcrumb
              siteUrl={siteConfig.url}
              onDark
              // No /resources index route exists, so the trail is Home > this
              // guide. A crumb pointing at /guides would be a hub that does not
              // list this page, and the BreadcrumbList JSON-LD would assert it.
              items={[{ label: "Home", href: "/" }, { label: guide.title }]}
            />
            <Eyebrow onDark>Free Holloway Davies research guide</Eyebrow>
            <h1 className="text-2xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {guide.title}
            </h1>
            {guide.summary && (
              <p className="mt-4 text-base leading-7 text-white/90 sm:mt-6 sm:text-lg">
                {guide.summary}
              </p>
            )}
            {(guide.frontmatter.version || guide.frontmatter.lastReviewed) && (
              <p className="mt-4 text-xs text-slate-400">
                {guide.frontmatter.version && <>Tax year: {guide.frontmatter.version}.</>}
                {guide.frontmatter.lastReviewed && (
                  <> Last reviewed: {guide.frontmatter.lastReviewed}.</>
                )}
              </p>
            )}
          </div>
        </div>
      </section>

      <article className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
            <div className="min-w-0">
              {xlsxReady && resource?.xlsx && (
                <a
                  href={resource.xlsx.file}
                  download
                  className={`${btnSecondary} mb-8 gap-2`}
                >
                  <Download className="h-4 w-4" />
                  {resource.xlsx.label}
                </a>
              )}

              <div
                className="article-body prose-blog"
                dangerouslySetInnerHTML={{ __html: guide.html }}
              />

              {/* Lead CTA: qualified review request. Email gate stays retired. */}
              <div className="mt-12">
                <GateOrForm topic={topicKey} />
              </div>
            </div>

            <aside>
              <div className="sticky top-24">
                <TableOfContents headings={guide.headings} />
              </div>
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}
