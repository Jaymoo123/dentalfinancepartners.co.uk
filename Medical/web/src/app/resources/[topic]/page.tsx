/**
 * Open research resource route -- /resources/[topic]
 *
 * Serves written research guides for Medical Accountants UK premium categories.
 * Fully public: no email gate, no NOINDEX. Guide content is repurposed as a
 * free, open research piece with a qualified lead CTA at the end.
 *
 * generateStaticParams: driven by publishedGuideTopicsWithFile() so only guides
 * that are both enabled in the registry AND have a file on disk are pre-rendered;
 * any other slug returns 404.
 *
 * TOKEN HARDENING: no var(--primary), no orange-*, no emerald-*.
 * Uses Medical CSS-variable tokens: --navy, --copper, --copper-soft, --border,
 * --surface-elevated, --ink, --ink-soft, --muted.
 *
 * FLAT routing: Medical uses flat /blog/[slug] routing. This route is for
 * /resources/[topic] (not blog posts), so there is no flat-routing concern here.
 * Do NOT use scripts/medical_flat_link_audit.py on this route.
 */
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { MedicalBackdrop } from "@/components/layout/MedicalBackdrop";
import { btnPrimary, siteContainerLg, sectionY } from "@/components/ui/layout-utils";
import { getGuideByTopic, publishedGuideTopicsWithFile } from "@/lib/resources/content";
import { resourceForTopic, isXlsxEnabled } from "@/lib/resources/registry";
import type { TopicKey } from "@/lib/intent/taxonomy";

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

  // ponytail: the page documents a workbook, so it offers it. Reuses the
  // existing registry rather than adding a second source of truth; the xlsx
  // is a static file under /public and needs no gate (RESOURCE_EMAIL_DELIVERY
  // is off, so ResourceGate serves it ungated too).
  const resource = resourceForTopic(topic as TopicKey);
  const xlsx = isXlsxEnabled(resource) ? resource.xlsx : null;

  return (
    <>
      {/* `relative overflow-hidden` on the section and `relative z-10` on the
          content are the MedicalBackdrop host contract. */}
      <section className="relative overflow-hidden bg-slate-900 py-10 sm:py-12 lg:py-14">
        <MedicalBackdrop tone="navy" />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Breadcrumb
              variant="light"
              items={[
                { label: "Home", href: "/" },
                { label: "Research", href: "/research" },
                { label: guide.title },
              ]}
            />
            <Eyebrow onDark>Free research resource</Eyebrow>
            <h1 className="text-3xl font-bold leading-[1.15] text-white sm:text-4xl lg:text-5xl">
              {guide.title}
            </h1>
            {guide.summary && (
              <p className="mt-4 text-base leading-7 text-slate-300 sm:mt-6 sm:text-lg">
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

      <article className={`bg-white ${sectionY}`}>
        <div className={siteContainerLg}>
          <div className="mx-auto max-w-3xl">
          {/* The workbook this page documents */}
          {xlsx && (
            <div className="mb-8 rounded-xl bg-slate-50 p-5 ring-1 ring-[var(--brand-primary)]/40">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-600">
                The file this page documents
              </p>
              <a
                href={xlsx.file}
                download
                data-cta="resources_workbook_download"
                data-cta-placement="resources_guide"
                className="mt-2 inline-block text-base font-bold text-slate-900 underline decoration-[var(--brand-primary)] decoration-2 underline-offset-4"
              >
                Download the {xlsx.label}
              </a>
              <p className="mt-2 text-sm text-slate-700">
                No email required. Open it alongside this page.
              </p>
            </div>
          )}

          {/* Table of contents */}
          {guide.headings.length > 0 && (
            <nav
              aria-label="Guide contents"
              className="mb-8 rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200/70"
            >
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-600">
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
                      className="text-sm text-slate-900 underline-offset-2 hover:underline"
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
            className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-slate-900 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-900"
            dangerouslySetInnerHTML={{ __html: guide.html }}
          />

          {/* CTA at the bottom of the guide */}
          <div className="mt-12 rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70 sm:p-8">
            <p className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Ready to apply this to your situation?
            </p>
            <p className="mt-2 text-base leading-relaxed text-slate-700">
              The guide gives you the framework. A specialist can confirm the numbers for your
              specific position, check any reliefs that apply, and advise on the best approach.
              The first call is free and with no obligation.
            </p>
            <a
              href="/contact"
              data-cta="resources_guide_cta"
              data-cta-placement="resources_guide"
              data-cta-goal="form"
              className={`${btnPrimary} mt-4`}
            >
              Book a free call
            </a>
          </div>
          </div>
        </div>
      </article>
    </>
  );
}
