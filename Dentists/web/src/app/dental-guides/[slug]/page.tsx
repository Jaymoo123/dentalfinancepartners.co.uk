import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogSidebarCta } from "@accounting-network/web-shared/design/blog/BlogSidebarCta";
import { TableOfContents } from "@accounting-network/web-shared/content/TableOfContents";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { LeadForm } from "@/components/forms/LeadForm";
import {
  focusRing,
  sectionY,
  sectionYLoose,
  siteContainerLg,
} from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { getAllGuides, getGuideBySlug, getGuideSlugs } from "@/lib/dental-guides";
import { extractHeadings } from "@/lib/markdown-utils";
import { buildFaqPage, JsonLd } from "@/lib/schema/index";

export function generateStaticParams() {
  return getGuideSlugs().map((slug) => ({ slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return { title: "Pillar Guide" };
  const url = `${siteConfig.url}/dental-guides/${slug}`;
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

export default async function GuidePage({ params }: { params: Params }) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Dental Guides", href: "/dental-guides" },
    { label: guide.title.split(":")[0] },
  ];
  // The <Breadcrumb> component below emits its OWN BreadcrumbList script from
  // the same `breadcrumbItems`, so emitting a second one here put two
  // BreadcrumbList documents on all six guides. One source, one document.
  const faqSchema = guide.faqs && guide.faqs.length > 0 ? buildFaqPage(guide.faqs) : null;

  const otherGuides = getAllGuides()
    .filter((g) => g.slug !== guide.slug)
    .slice(0, 3);

  // The guide loader already ran addHeadingIds over the body, so the ids the
  // contents list links to are the ids that are in the HTML. Extracted here
  // rather than in lib/dental-guides.ts: one call site, no loader change.
  const headings = extractHeadings(guide.contentHtml);

  // ONE copy binding. The sidebar card, the closing panel heading and body, and
  // the submit label all read the same three values, so the card can never
  // advertise something the form below it does not say.
  const ctaCopy = {
    heading: guide.ctaTitle ?? "Talk to a dentist-only specialist",
    body: guide.ctaBody ?? "",
    button: "Book a free call",
  };

  return (
    <>
      {faqSchema && <JsonLd data={[faqSchema]} />}

      <section className="bg-[var(--navy)] text-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <Breadcrumb items={breadcrumbItems} variant="light" />
          <div className="mt-8 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--gold)]">
              {guide.eyebrow}
            </p>
            <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
              {guide.title}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">
              {guide.hero || guide.summary}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.14em] text-white/60">
              <span>{Math.round(guide.wordCount / 200)} min read</span>
              <span>·</span>
              <span>{guide.wordCount.toLocaleString()} words</span>
              {guide.date && (
                <>
                  <span>·</span>
                  <span>Updated {new Date(guide.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
                </>
              )}
            </div>
            {/* Same-page jump, not a new surface. These are the longest pages on
                the site and the only enquiry form sits several thousand words
                below the fold with nothing pointing at it. */}
            <a
              href="#enquiry-form"
              data-cta="guide_skip_to_form"
              data-cta-placement="guide_header"
              data-cta-goal="form"
              className={`mt-7 inline-flex items-center gap-2 py-0.5 text-sm font-semibold text-[var(--gold)] underline underline-offset-4 hover:text-white ${focusRing}`}
            >
              Skip to enquiry form ↓
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
            <div className="min-w-0">
              <div className="lg:hidden">
                <TableOfContents headings={headings} />
              </div>
              {/* `article-body prose-blog` is the site's ONE body stylesheet
                  (globals.css). It replaces `prose-dental`, which nothing
                  defined, so these six guides rendered with no heading
                  hierarchy and no list markers. It also carries the 6rem
                  scroll-margin-top rule for :is(h2,h3)[id], which is what makes
                  the contents list above land below the sticky header. */}
              <article className="article-body prose-blog">
                <div dangerouslySetInnerHTML={{ __html: guide.contentHtml }} />
              </article>
            </div>

            <aside className="hidden lg:block">
              {/* One sticky container owns the clamp for card + contents, so the
                  TOC is told not to clamp itself a second time. */}
              <div className="sticky top-24 max-h-[calc(100vh-7rem)] space-y-5 overflow-y-auto">
                <BlogSidebarCta
                  copy={{ heading: ctaCopy.heading, body: ctaCopy.body }}
                  buttonLabel={ctaCopy.button}
                  ctaPlacement="guide_sidebar"
                  // Gold ground, navy label (6.23) on the card's slate-900
                  // ground. The kit default primary-600 is this site's navy and
                  // would read as a navy button on a near-navy card.
                  buttonClassName="bg-[var(--gold)] text-[var(--navy)] hover:bg-[var(--gold-strong)]"
                />
                <TableOfContents headings={headings} stickyDesktop={false} />
              </div>
            </aside>
          </div>
        </div>
      </section>

      {guide.faqs && guide.faqs.length > 0 && (
        <section className="bg-[var(--background)] border-t border-[var(--border)]">
          <div className={`${siteContainerLg} ${sectionY}`}>
            <div className="mx-auto max-w-3xl">
              <h2 className="font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
                Frequently asked
              </h2>
              <dl className="mt-10 space-y-5">
                {guide.faqs.map((f) => (
                  <div
                    key={f.question}
                    className="rounded-2xl border-l-4 border-[var(--gold)] bg-white p-6 sm:p-7"
                  >
                    <dt className="font-serif text-lg font-semibold text-[var(--ink)]">
                      {f.question}
                    </dt>
                    <dd className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">
                      {f.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      )}

      {otherGuides.length > 0 && (
        <section className="bg-white border-t border-[var(--border)]">
          <div className={`${siteContainerLg} ${sectionY}`}>
            <div className="mx-auto max-w-5xl">
              <h2 className="font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
                More pillar guides
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {otherGuides.map((g) => (
                  <Link
                    key={g.slug}
                    href={`/dental-guides/${g.slug}`}
                    className={`group block rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-shadow hover:shadow-md ${focusRing}`}
                  >
                    {/* Was --gold-strong: 3.76 on --surface, a live text fail.
                        Gold is a non-text accent on light grounds. */}
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-primary-700">
                      {g.eyebrow}
                    </p>
                    <h3 className="font-serif text-base font-semibold text-[var(--ink)] group-hover:text-primary-700">
                      {g.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[var(--ink-soft)]">
                      {g.summary}
                    </p>
                  </Link>
                ))}
              </div>
              <p className="mt-8 text-sm text-[var(--ink-soft)]">
                <Link href="/dental-guides" className={`font-semibold text-primary-700 underline underline-offset-4 hover:text-primary-800 ${focusRing}`}>
                  See every pillar guide
                </Link>
                <span aria-hidden> · </span>
                <Link href="/resources" className={`font-semibold text-primary-700 underline underline-offset-4 hover:text-primary-800 ${focusRing}`}>
                  Free spreadsheet models and research notes
                </Link>
                <span aria-hidden> · </span>
                <Link href="/blog" className={`font-semibold text-primary-700 underline underline-offset-4 hover:text-primary-800 ${focusRing}`}>
                  Read the blog
                </Link>
              </p>
            </div>
          </div>
        </section>
      )}

      <section
        id="enquiry-form"
        aria-labelledby="enquiry-form-heading"
        className="scroll-mt-24 bg-[var(--navy)] text-white"
      >
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:gap-16 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--gold)]">
                Free scoping call
              </p>
              <h2
                id="enquiry-form-heading"
                className="mt-3 font-serif text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-4xl"
              >
                {ctaCopy.heading}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">
                {ctaCopy.body}
              </p>
            </div>
            <div className="rounded-2xl border-t-4 border-[var(--gold)] bg-white p-6 shadow-xl sm:p-8 lg:p-10">
              <h3 className="font-serif text-xl font-semibold text-[var(--ink)]">Book your free call</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                A specialist dental accountant reads every enquiry that comes through this form.
              </p>
              <div className="mt-6">
                <LeadForm redirectOnSuccess={false} submitLabel={ctaCopy.button} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
