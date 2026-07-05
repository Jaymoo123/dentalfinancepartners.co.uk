/**
 * Noindex guide route for gated written resources.
 *
 * Each guide is behind the ResourceGate email capture and is intentionally
 * kept out of the search index so it never competes with the ranking blog pages.
 * Served at /resources/<topic> after the visitor unlocks the download.
 */
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getGuideByTopic, publishedGuideTopics } from "@/lib/resources/content";
import { siteContainerLg, sectionY } from "@/components/ui/layout-utils";
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
    // Noindex: the guide is the value behind the gate; we do not want it ranking.
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
    <>
      {/* Noindex meta tag as belt-and-braces (Metadata robots above handles the header) */}
      <meta name="robots" content="noindex,nofollow" />

      <section className="bg-[var(--primary)] text-white">
        <div className={`${siteContainerLg} py-12 sm:py-16`}>
          <Link
            href="/calculators"
            className="inline-flex items-center gap-1 text-sm text-white/80 hover:text-white mb-6"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to tools
          </Link>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/80">
            Specialist guide · Accounts for Lawyers
          </p>
          <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl">
            {guide.title}
          </h1>
          {guide.summary && (
            <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg max-w-3xl">
              {guide.summary}
            </p>
          )}
        </div>
      </section>

      <article className="bg-white">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-3xl">
            {guide.frontmatter.lastReviewed && (
              <p className="mb-8 text-xs text-[var(--muted)]">
                Last reviewed: {guide.frontmatter.lastReviewed}
                {guide.frontmatter.version ? ` · Version ${guide.frontmatter.version}` : ""}
              </p>
            )}
            <div
              className="article-body prose-blog"
              dangerouslySetInnerHTML={{ __html: guide.html }}
            />

            <aside className="mt-16 rounded-2xl bg-[var(--primary)] p-8 text-white sm:p-10">
              <h2 className="font-serif text-2xl font-semibold text-white">
                Get a specialist view for your firm
              </h2>
              <p className="mt-3 text-base leading-relaxed text-white/80">
                This guide gives you the framework. Your firm's position depends on its structure,
                the client money it holds, its fee profile and your specific circumstances.
                A free first call with a specialist will point you in the right direction.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full border-2 border-white px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white hover:text-[var(--primary)]"
              >
                Book a free call
              </Link>
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}
