/**
 * /resources/[topic] — open research resources for Dental Finance Partners.
 *
 * Previously NOINDEX gated guides. Redesigned 2026-07-17: email gate retired,
 * content fully visible, xlsx direct download, qualified lead CTA at end.
 * Pages are now indexable and included in the sitemap.
 *
 * TOKEN HARDENING: Dentists CSS-variable tokens only.
 */
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { getGuideByTopic, publishedGuideTopicsWithFile } from "@/lib/resources/content";
import { resourceForTopic, isXlsxEnabled } from "@/lib/resources/registry";
import type { TopicKey } from "@/lib/intent/taxonomy";
import { LeadForm } from "@/components/forms/LeadForm";

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
    // Indexable: open research resource.
    robots: { index: true, follow: true },
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

  const resource = resourceForTopic(topic as TopicKey);
  const xlsxReady = isXlsxEnabled(resource);

  return (
    <article className="bg-white py-12 sm:py-16">
      <div className={siteContainerLg}>
        <div className="mx-auto max-w-3xl">
          {/* Guide header */}
          <div className="mb-8 border-b border-[var(--border)] pb-8">
            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--gold)" }}>
              Dental Finance Partners free resource
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

            {/* Direct xlsx download — no gate */}
            {xlsxReady && resource?.xlsx && (
              <a
                href={resource.xlsx.file}
                download
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--navy)] px-5 py-2.5 text-sm font-bold text-white hover:opacity-90"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {resource.xlsx.label}
              </a>
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
                  <li key={h.id} className={h.level === 3 ? "pl-4" : ""}>
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

          {/* Guide body */}
          <div
            className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-[var(--navy)] prose-a:text-[var(--navy)] prose-a:no-underline hover:prose-a:underline prose-strong:text-[var(--navy)]"
            dangerouslySetInnerHTML={{ __html: guide.html }}
          />

          {/* Repeat xlsx download at foot for readers who scroll to end */}
          {xlsxReady && resource?.xlsx && (
            <div className="mt-10 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] p-5">
              <p className="text-sm font-semibold text-[var(--ink)]">Download the working model</p>
              <p className="mt-1 text-xs text-[var(--muted)]">
                Free to use. No sign-up required.
              </p>
              <a
                href={resource.xlsx.file}
                download
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-[var(--navy)] px-5 py-2.5 text-sm font-bold text-white hover:opacity-90"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {resource.xlsx.label}
              </a>
            </div>
          )}

          {/* Qualified lead CTA at end */}
          <div
            id="enquiry-form"
            className="mt-12 rounded-2xl border-l-4 p-8 sm:p-10 scroll-mt-24"
            style={{ borderColor: "var(--gold)", background: "var(--surface-elevated)" }}
          >
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--navy)]">
              Ready to apply this to your practice?
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[var(--navy)] sm:text-3xl">
              Get a free review of your situation
            </h2>
            <p className="mt-3 text-base text-[var(--ink-soft)] leading-relaxed">
              The guide gives you the framework. A specialist dental accountant can confirm the
              numbers for your specific practice, check any reliefs that apply, and advise on
              the best timing. The first call is free and with no obligation.
            </p>
            <div className="mt-8">
              <LeadForm redirectOnSuccess={false} submitLabel="Request my free review" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
