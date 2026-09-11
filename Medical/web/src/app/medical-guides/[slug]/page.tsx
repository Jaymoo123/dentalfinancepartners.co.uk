import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, Users, BookOpen } from "lucide-react";
import { DrawnTickList } from "@accounting-network/web-shared/design/marketing/DrawnTickList";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { RelatedArticles } from "@accounting-network/web-shared/design/blog/RelatedArticles";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { siteContainerLg, focusRing } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { MedicalBackdrop } from "@/components/layout/MedicalBackdrop";
import { LeadForm } from "@/components/forms/LeadForm";
import { JsonLd } from "@/lib/schema";
import { siteConfig } from "@/config/site";
import { MEDICAL_GUIDES, getGuideBySlug, getAllGuideSlugs } from "@/lib/medical-guides-data";
import { splitLabelledLine } from "@/lib/markdown-utils";

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
      images: [{ url: `/api/og?title=${encodeURIComponent(guide.metaTitle)}`, width: 1200, height: 630, alt: guide.metaTitle }],
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
          {lines.map((line, j) => {
            const { label, rest } = splitLabelledLine(line);
            return (
              <li key={j} className="flex gap-3 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">
                <span className="mt-0.5 text-[var(--copper)] shrink-0">›</span>
                <span>
                  {label && <strong>{label}</strong>}
                  {label ? `: ${rest}` : rest}
                </span>
              </li>
            );
          })}
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

/**
 * The calculator that belongs beside each guide. LITERAL hrefs, one per guide,
 * and every slug resolves against the tool registry. No tabs block renders on
 * this route (DISPOSITION_SLICE2 B.4 excludes it), so these are plain links
 * doing plain link work: one more crawlable body anchor per guide page.
 */
const GUIDE_CALCULATOR: Record<string, { href: string; label: string }> = {
  "nhs-pension-annual-allowance": {
    href: "/calculators/nhs-pension-scheme-pays",
    label: "NHS Pension Scheme Pays Calculator",
  },
  "consultant-private-practice-tax": {
    href: "/calculators/consultant-private-vs-nhs",
    label: "Consultant Private versus NHS Income Calculator",
  },
  "gp-partnership-accounts": {
    href: "/calculators/gp-partner-drawings-planner",
    label: "GP Partner Drawings Planner",
  },
  "locum-limited-company-vs-umbrella": {
    href: "/calculators/locum-tax-calculator",
    label: "Locum Doctor Tax Calculator",
  },
  "medical-expenses-tax-treatment": {
    href: "/calculators/doctor-expenses-tax-relief",
    label: "Doctor Expenses Tax Relief Calculator",
  },
  "ir35-for-locums": {
    href: "/calculators/locum-tax-calculator",
    label: "Locum Doctor Tax Calculator",
  },
};

/** Closing-panel proof points. Mechanisms only: no fee, no turnaround, no
 *  client count, and nothing that implies an in-house team does the work. */
const MEDICAL_PROOF_POINTS = [
  { title: "Medical work only", detail: "NHS pension, practice accounts and private practice" },
  { title: "Matched to a specialist firm", detail: "Your enquiry goes to accountants who work with doctors" },
  { title: "One position, not three", detail: "Practice, pension and personal return read together" },
];

export default async function MedicalGuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const relatedGuidesData = guide.relatedGuides
    .map((s) => MEDICAL_GUIDES.find((g) => g.slug === s))
    .filter(Boolean) as typeof MEDICAL_GUIDES;

  const calculator = GUIDE_CALCULATOR[slug];

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Medical guides", href: "/medical-guides" },
    { label: guide.title },
  ];

  /**
   * Exactly one Article per page, and it is the only page-level node this route
   * adds: the visible Breadcrumb already emits the single BreadcrumbList.
   * No FAQPage is emitted here, and that is deliberate rather than an omission:
   * `MedicalGuide` carries no `faqs` array, so there is no rendered Q&A pair to
   * bind schema to, and a FAQPage built out of section headings would be
   * authored schema with nothing on the page answering to it.
   */
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.metaDescription,
    articleSection: guide.eyebrow,
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
      <JsonLd data={articleSchema} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--navy)] py-16 sm:py-20">
        <MedicalBackdrop />
        <div className={`${siteContainerLg} relative z-10`}>
          <Breadcrumb variant="light" items={breadcrumbItems} />
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-[var(--copper)]/40 bg-[var(--copper)]/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--copper-light)]">
                {guide.eyebrow}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-white/60">
                <Clock className="h-3.5 w-3.5" />
                {guide.readTime} read
              </span>
            </div>
            <h1 className="mt-5 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
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

      {/* Guide body. The max-w-3xl clamp that wrapped the whole guide is gone;
          the container is the clamp. */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="space-y-10">
            {guide.sections.map((section, i) => (
              <div key={i} id={`section-${i}`} className="scroll-mt-24">
                <h2 className="border-l-4 border-[var(--copper)] pl-4 text-xl font-bold text-[var(--ink)] sm:text-2xl">
                  {section.heading}
                </h2>
                <div className="mt-1 max-w-3xl">
                  {renderBody(section.body)}
                </div>
              </div>
            ))}
          </div>

          {/* Key points */}
          <div className="mt-12 rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200 sm:p-8">
            <h2 className="text-xl font-bold text-[var(--ink)] sm:text-2xl">
              Key points for UK doctors
            </h2>
            <DrawnTickList className="mt-6" items={guide.keyPoints} tickClassName="text-emerald-600" />
          </div>

          {/* Related blog posts. A link LIST, not cards: on the thinnest guide
              these are two of the route's five body links. */}
          {guide.relatedPosts && guide.relatedPosts.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl font-bold text-[var(--ink)] sm:text-2xl">
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

          {calculator ? (
            <p className="mt-10 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
              To put numbers on this, run the{" "}
              <Link
                href={calculator.href}
                className={`font-semibold text-[var(--copper-strong)] underline decoration-2 underline-offset-4 ${focusRing} rounded`}
              >
                {calculator.label}
              </Link>
              . It is free to use, and the figure appears on the page.
            </p>
          ) : null}
        </div>
      </section>

      {/* Related guides */}
      {relatedGuidesData.length > 0 && (
        <section className="bg-slate-50 py-12 sm:py-16">
          <div className={siteContainerLg}>
            <Eyebrow>More reading</Eyebrow>
            <h2 className="text-2xl font-bold text-[var(--ink)] sm:text-3xl">
              More medical guides
            </h2>
            <RelatedArticles
              className="mt-8"
              columns={3}
              items={relatedGuidesData.map((g) => ({
                href: `/medical-guides/${g.slug}`,
                title: g.title,
                excerpt: g.summary,
                kind: "guide" as const,
              }))}
            />
            <div className="mt-8">
              <Link href="/medical-guides" className={`inline-flex items-center gap-2 text-sm font-semibold text-[var(--navy)] underline decoration-[var(--copper)] decoration-2 underline-offset-4 ${focusRing} rounded`}>
                <BookOpen className="h-4 w-4" />
                Browse all medical guides
              </Link>
            </div>
          </div>
        </section>
      )}

      <div id="book" className="scroll-mt-24" data-cta="guide_book" data-cta-goal="form" data-cta-placement="medical_guide">
        <LeadCTAPanel
          contained
          ground="white"
          title="Need the answer for your own numbers?"
          description="This guide gives you the framework; your own figures and circumstances are what decide the answer. Send your position and we will match you with a firm that works with doctors every day."
          proofPoints={MEDICAL_PROOF_POINTS}
          footnote="No obligation. If the specialist firm thinks your position is already right, they will tell you so."
          form={<LeadForm redirectOnSuccess={false} submitLabel="Ask a medical accountant" />}
        />
      </div>
    </>
  );
}
