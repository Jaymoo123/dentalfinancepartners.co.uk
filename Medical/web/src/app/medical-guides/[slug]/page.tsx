import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Clock, Users, BookOpen } from "lucide-react";
import { siteContainerLg, sectionY, btnPrimary, focusRing } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { MEDICAL_GUIDES, getGuideBySlug, getAllGuideSlugs } from "@/lib/medical-guides-data";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: {
      canonical: `${siteConfig.url}/medical-guides/${slug}`,
      languages: {
        "en-GB": `${siteConfig.url}/medical-guides/${slug}`,
        "x-default": `${siteConfig.url}/medical-guides/${slug}`,
      },
    },
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      url: `${siteConfig.url}/medical-guides/${slug}`,
      type: "article",
    },
  };
}

function renderBody(text: string) {
  const paras = text.split("\n\n");
  return paras.map((para, i) => {
    if (para.startsWith("1995 section:") || para.startsWith("1. ") || para.startsWith("Sole trader")) {
      const lines = para.split("\n").filter(Boolean);
      return (
        <ul key={i} className="mt-4 space-y-3 pl-0 list-none">
          {lines.map((line, j) => (
            <li key={j} className="flex gap-3 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">
              <span className="mt-0.5 text-[var(--copper)] shrink-0">›</span>
              <span>{line.replace(/^\d+\.\s/, "").replace(/^[A-Z0-9/]+ (section|trader|company|employees?):\s/, (m) => `<strong>${m.replace(/:$/, "")}</strong>: `)}</span>
            </li>
          ))}
        </ul>
      );
    }
    return (
      <p key={i} className="mt-4 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">
        {para}
      </p>
    );
  });
}

export default async function MedicalGuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const relatedGuidesData = guide.relatedGuides
    .map((s) => MEDICAL_GUIDES.find((g) => g.slug === s))
    .filter(Boolean) as typeof MEDICAL_GUIDES;

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Medical guides", href: "/medical-guides" },
    { label: guide.title },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.metaDescription,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/medical-guides/${slug}`,
    },
    inLanguage: "en-GB",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Hero */}
      <section className="bg-[var(--navy)] text-white">
        <div className={`${siteContainerLg} py-14 sm:py-18`}>
          <Breadcrumb items={breadcrumbItems} />
          <div className="mt-6 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[var(--copper)]/20 border border-[var(--copper)]/40 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--copper-light)]">
                {guide.eyebrow}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-white/60">
                <Clock className="h-3.5 w-3.5" />
                {guide.readTime} read
              </span>
            </div>
            <h1 className="mt-5 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl">
              {guide.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">
              {guide.summary}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1 text-xs text-white/60">
                <Users className="h-3.5 w-3.5" />
                For:
              </span>
              {guide.audience.map((a) => (
                <span key={a} className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-white/80">
                  {a}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Guide content */}
      <div className="bg-white">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-3xl">

            {/* Sections */}
            <div className="space-y-10">
              {guide.sections.map((section, i) => (
                <div key={i} id={`section-${i}`} className="scroll-mt-24">
                  <h2 className="font-serif text-xl font-semibold text-[var(--ink)] sm:text-2xl border-l-4 border-[var(--copper)] pl-4">
                    {section.heading}
                  </h2>
                  <div className="mt-1">
                    {renderBody(section.body)}
                  </div>
                </div>
              ))}
            </div>

            {/* Key points */}
            <div className="mt-12 rounded-3xl bg-[var(--navy)] p-6 sm:p-8">
              <h2 className="font-serif text-xl font-semibold text-white sm:text-2xl">
                Key points for UK doctors
              </h2>
              <ul className="mt-6 space-y-4">
                {guide.keyPoints.map((point, i) => (
                  <li key={i} className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-[var(--copper-light)] mt-0.5" />
                    <span className="text-sm leading-relaxed text-white/85 sm:text-base">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Related blog posts */}
            {guide.relatedPosts && guide.relatedPosts.length > 0 && (
              <div className="mt-10">
                <h2 className="font-serif text-xl font-semibold text-[var(--ink)] sm:text-2xl">
                  Related articles
                </h2>
                <ul className="mt-5 space-y-3">
                  {guide.relatedPosts.map((post) => (
                    <li key={post.href}>
                      <Link
                        href={post.href}
                        className={`inline-flex items-center gap-2 text-sm font-medium text-[var(--navy)] underline decoration-[var(--copper)] decoration-2 underline-offset-4 hover:text-[var(--copper-strong)] ${focusRing} rounded`}
                      >
                        <BookOpen className="h-4 w-4 shrink-0 text-[var(--copper)]" />
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA */}
            <div className="mt-12 rounded-3xl border border-[var(--copper)]/25 bg-[var(--background)] p-6 sm:p-8">
              <h2 className="font-serif text-xl font-semibold text-[var(--ink)] sm:text-2xl">
                Need personalised advice?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                These guides give you the framework; your specific numbers and circumstances are what matter. Our GP accountants and medical accounting specialists work exclusively with UK doctors.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link href="/contact" className={btnPrimary}>
                  Book a free consultation
                </Link>
                <Link href="/free-practice-health-check" className={`inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--navy)]/25 px-6 py-3 text-sm font-semibold text-[var(--navy)] transition-all hover:border-[var(--navy)] hover:bg-[var(--navy)]/5 ${focusRing}`}>
                  Free practice health check
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related guides */}
      {relatedGuidesData.length > 0 && (
        <section className="bg-[var(--background)] border-t border-[var(--border)]">
          <div className={`${siteContainerLg} py-12 sm:py-16`}>
            <h2 className="font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
              More medical guides
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedGuidesData.map((g) => (
                <Link
                  key={g.slug}
                  href={`/medical-guides/${g.slug}`}
                  className={`group rounded-2xl border border-[var(--border)] bg-white p-5 transition-all hover:border-[var(--copper)] hover:shadow-md ${focusRing}`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--copper)]">
                    {g.eyebrow}
                  </span>
                  <h3 className="mt-2 font-serif text-base font-semibold text-[var(--ink)] leading-snug group-hover:text-[var(--navy)] sm:text-lg">
                    {g.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--muted)] line-clamp-2">{g.summary}</p>
                  <span className="mt-3 inline-block text-sm font-semibold text-[var(--copper)]">Read guide →</span>
                </Link>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/medical-guides" className={`inline-flex items-center gap-2 text-sm font-semibold text-[var(--navy)] underline decoration-[var(--copper)] decoration-2 underline-offset-4 ${focusRing} rounded`}>
                <BookOpen className="h-4 w-4" />
                Browse all medical guides
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
