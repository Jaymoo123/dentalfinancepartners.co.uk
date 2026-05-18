import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { LeadForm } from "@/components/forms/LeadForm";
import {
  btnPrimary,
  focusRing,
  sectionY,
  sectionYLoose,
  siteContainerLg,
} from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
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

  return (
    <>
      <JsonLd data={schemaPayload} />

      <section className="bg-[var(--primary)] text-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <Breadcrumb items={breadcrumbItems} variant="light" />
          <div className="mt-8 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
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
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <article className="prose-solicitor mx-auto max-w-3xl text-base leading-relaxed text-[var(--ink-soft)] sm:text-lg">
            <div dangerouslySetInnerHTML={{ __html: guide.contentHtml }} />
          </article>
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
                    className="rounded-2xl border-l-4 border-[var(--accent)] bg-white p-6 sm:p-7"
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
                    href={`/solicitor-guides/${g.slug}`}
                    className={`group block rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-shadow hover:shadow-md ${focusRing}`}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--primary)] mb-2">
                      {g.eyebrow}
                    </p>
                    <h3 className="font-serif text-base font-semibold text-[var(--ink)] group-hover:text-[var(--primary)]">
                      {g.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[var(--ink-soft)]">
                      {g.summary}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="bg-[var(--primary)] text-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:gap-16 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                Free scoping call
              </p>
              <h2 className="mt-3 font-serif text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-4xl">
                {guide.ctaTitle}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">
                {guide.ctaBody}
              </p>
            </div>
            <div className="rounded-2xl border-t-4 border-[var(--accent)] bg-white p-6 shadow-xl sm:p-8 lg:p-10">
              <h3 className="font-serif text-xl font-semibold text-[var(--ink)]">Book your free call</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">We will be in touch within 24 hours.</p>
              <div className="mt-6">
                <LeadForm redirectOnSuccess={false} submitLabel="Book a free call" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
