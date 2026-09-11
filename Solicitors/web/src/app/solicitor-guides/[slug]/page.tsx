import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, FileText, History } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { TableOfContents } from "@accounting-network/web-shared/design/blog/TableOfContents";
import { ReadingProgress } from "@accounting-network/web-shared/design/blog/ReadingProgress";
import { SolicitorsBackdrop } from "@/components/layout/SolicitorsBackdrop";
import { siteConfig } from "@/config/site";
import { extractHeadings } from "@/lib/markdown-utils";
import { getAllGuides, getGuideBySlug, getGuideSlugs } from "@/lib/solicitor-guides";
import {
  buildBreadcrumbJsonLd,
  buildFaqPage,
  JsonLd,
} from "@/lib/schema/index";

export function generateStaticParams() {
  return getGuideSlugs().map((slug) => ({ slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return { title: `Pillar Guide | ${siteConfig.name}` };
  const url = `${siteConfig.url}/solicitor-guides/${slug}`;
  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: { canonical: url, languages: { "en-GB": url, "x-default": url } },
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      url,
      type: "article",
    },
  };
}

/** Same pill recipe as the phase-2 article renderer (BlogPostRenderer.tsx:50-51),
 *  so a guide and an article read as one template. */
const metaPill =
  "inline-flex min-h-7 items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200";

export default async function GuidePage({ params }: { params: Params }) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Solicitor Guides", href: "/solicitor-guides" },
    { label: guide.title.split(":")[0] },
  ];
  const breadcrumbSchema = JSON.parse(buildBreadcrumbJsonLd(breadcrumbItems));
  const faqSchema = guide.faqs && guide.faqs.length > 0 ? buildFaqPage(guide.faqs) : null;
  const schemaPayload = faqSchema ? [breadcrumbSchema, faqSchema] : [breadcrumbSchema];

  const otherGuides = getAllGuides()
    .filter((g) => g.slug !== guide.slug)
    .slice(0, 3);

  // Heading ids are injected by the guide loader (addHeadingIds). Verified
  // non-empty on real guide HTML before this TOC was wired: 30 headings on
  // sra-accounts-rules-essentials, 9 on law-firm-profitability-guide.
  const headings = extractHeadings(guide.contentHtml);

  return (
    <>
      <JsonLd data={schemaPayload} />
      <ReadingProgress />

      <article className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          {/* F.3 article measure: the standard's own exception to "no body
              clamps", copied from BlogPostRenderer.tsx:123. */}
          <div className="max-w-4xl mx-auto lg:max-w-7xl lg:grid lg:grid-cols-[1fr_250px] lg:gap-12">
            <div className="max-w-4xl">
              <Breadcrumb items={breadcrumbItems} />

              <header className="rounded-xl bg-slate-50 p-8 mt-6">
                <Eyebrow>{guide.eyebrow}</Eyebrow>
                <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
                  {guide.title}
                </h1>
                <p className="mt-5 text-base leading-7 text-slate-600">
                  {guide.hero || guide.summary}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <span className={metaPill}>
                    <Clock aria-hidden className="h-3.5 w-3.5 text-rose-700" />
                    {Math.round(guide.wordCount / 200)} min read
                  </span>
                  <span className={metaPill}>
                    <FileText aria-hidden className="h-3.5 w-3.5 text-rose-700" />
                    {guide.wordCount.toLocaleString()} words
                  </span>
                  {guide.date && (
                    <span className="inline-flex min-h-7 items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 ring-1 ring-rose-100">
                      <History aria-hidden className="h-3.5 w-3.5" />
                      Updated {new Date(guide.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                    </span>
                  )}
                </div>
                <div className="mt-6">
                  <a
                    href="#enquiry-form"
                    data-cta="guide_skip_to_form"
                    data-cta-placement="guide_header"
                    data-cta-goal="form"
                    className="inline-flex items-center gap-2 py-0.5 text-sm font-semibold text-rose-700 hover:text-rose-800 underline underline-offset-4"
                  >
                    Skip to enquiry form ↓
                  </a>
                </div>
              </header>

              <div className="lg:hidden mt-8">
                <TableOfContents headings={headings} />
              </div>

              {/* Body passed through untouched. `article-body` is what gives
                  every heading id its scroll-margin-top in globals.css. */}
              <div
                className="article-body prose-blog mt-10"
                dangerouslySetInnerHTML={{ __html: guide.contentHtml }}
              />

              {guide.faqs && guide.faqs.length > 0 && (
                <section className="mt-16" aria-labelledby="faq-heading">
                  <h2 id="faq-heading" className="text-3xl font-bold text-slate-900 mb-8">
                    Frequently asked
                  </h2>
                  {/* Deliberately a plain <dl>, not the kit accordion primitive:
                      that component escapes HTML in answers and keeps closed
                      answers out of the server HTML. One array feeds this and
                      the FAQPage JSON-LD. */}
                  <dl className="space-y-4">
                    {guide.faqs.map((f) => (
                      <div key={f.question} className="rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70">
                        <dt className="text-lg font-bold text-slate-900">{f.question}</dt>
                        <dd className="mt-3 text-base leading-relaxed text-slate-700">
                          {f.answer}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}

              {otherGuides.length > 0 && (
                <section className="mt-16" aria-labelledby="more-guides-heading">
                  <h2 id="more-guides-heading" className="text-2xl font-bold text-slate-900 mb-8">
                    More pillar guides
                  </h2>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {otherGuides.map((g) => (
                      <Link
                        key={g.slug}
                        href={`/solicitor-guides/${g.slug}`}
                        className="group block rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70 transition-shadow hover:shadow-md"
                      >
                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-rose-700 mb-2">
                          {g.eyebrow}
                        </p>
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-rose-700">
                          {g.title}
                        </h3>
                        <p className="mt-2 text-xs leading-relaxed text-slate-600">
                          {g.summary}
                        </p>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* In-flow navy panel inside the article column, not a full-bleed
                  band: the article's white ground is the last section before
                  the slate-900 footer, so navy never touches navy. */}
              <section
                id="enquiry-form"
                className="relative mt-16 overflow-hidden rounded-xl bg-slate-900 p-8 sm:p-10 text-white scroll-mt-24"
                aria-labelledby="enquiry-form-heading"
              >
                <SolicitorsBackdrop tone="navy" />
                <div className="relative z-10">
                  <Eyebrow onDark>Free scoping call</Eyebrow>
                  <h2 id="enquiry-form-heading" className="text-2xl font-bold text-white sm:text-3xl">
                    {guide.ctaTitle}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-slate-200">{guide.ctaBody}</p>
                  {/* LeadForm labels and consent copy are slate-900 by design,
                      so the form sits on a white card, not on the navy. */}
                  <div className="mt-8 rounded-xl bg-white p-6 sm:p-8">
                    <h3 className="text-xl font-bold text-slate-900">Book your free call</h3>
                    <p className="mt-2 text-sm text-slate-600">We will be in touch.</p>
                    <div className="mt-6">
                      <LeadForm redirectOnSuccess={false} submitLabel="Book a free call" />
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
                <TableOfContents headings={headings} />
              </div>
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}
