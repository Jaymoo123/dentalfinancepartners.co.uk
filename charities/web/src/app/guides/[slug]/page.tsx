import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { contentNarrow, focusRing } from "@accounting-network/web-shared/design/layout-utils";
import { getGuideBySlug, getAllGuideSlugs } from "@/lib/guides/content";
import { siteConfig } from "@/config/site";
import { buildArticleJsonLd, buildHowToJsonLd, buildFaqJsonLd } from "@/lib/schema";
import { extractFaqs } from "@/lib/markdown-utils";
import { CtaBand, PageHero } from "@/components/hubs/HubParts";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.summary || guide.title,
    alternates: { canonical: `${siteConfig.url}/guides/${slug}` },
    openGraph: {
      title: guide.title,
      description: guide.summary || guide.title,
      url: `${siteConfig.url}/guides/${slug}`,
      type: "article",
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const howToSchema = guide.howToSteps?.length
    ? buildHowToJsonLd({ name: guide.title, description: guide.summary, steps: guide.howToSteps })
    : null;

  const faqs = extractFaqs(guide.html);
  const faqSchema = faqs.length ? buildFaqJsonLd(faqs) : null;

  const sectionHeadings = guide.headings.filter((h) => h.level === 2);

  return (
    <>
      {/* No buildBreadcrumbJsonLd here: the kit <Breadcrumb> inside <PageHero>
          emits its own BreadcrumbList, and keeping the page-level copy as well
          made the route emit the node twice. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildArticleJsonLd({
            title: guide.title,
            description: guide.summary,
            url: `/guides/${slug}`,
            datePublished: guide.lastReviewed,
            dateModified: guide.lastReviewed,
          }),
        }}
      />
      {howToSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: howToSchema }} />
      )}
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      )}

      <PageHero
        tone="dark"
        eyebrow={`${siteConfig.name} guide`}
        title={guide.title}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
          { label: guide.title },
        ]}
      >
        {guide.summary && <p>{guide.summary}</p>}
        {guide.lastReviewed && (
          <p className="text-sm text-slate-400">Last reviewed: {guide.lastReviewed}</p>
        )}
      </PageHero>

      {/* The reading column. `<main>` is gone: the kit PageShell in layout.tsx
          already emits <main id="main">, and a second one is a duplicate
          landmark. The classes that element carried live on this <div>. */}
      <div className={`${contentNarrow} py-12`}>
        {sectionHeadings.length >= 3 && (
          <nav
            aria-label="In this guide"
            className="mb-8 rounded-xl bg-slate-50 px-5 py-4 ring-1 ring-slate-200/70"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
              In this guide
            </p>
            <ol className="space-y-1">
              {sectionHeadings.map((h) => (
                <li key={h.id}>
                  <a
                    href={`#${h.id}`}
                    className={`inline-block rounded py-0.5 text-sm font-semibold text-primary-700 hover:text-primary-800 hover:underline ${focusRing}`}
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Raw HTML body, never escaped. `.prose` resolves through the
            prose-standard stylesheet imported by globals.css. That stylesheet
            is a hand-rolled BARE `.prose`; `@tailwindcss/typography` is not
            installed, so `prose-slate` and every `prose-*:` modifier the
            pre-port template carried compiled to nothing. Dropped rather than
            left in place implying styling that does not exist. */}
        <article
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: guide.html }}
        />
      </div>

      <CtaBand title="Need advice on your specific situation?">
        <p>Contact us and a charity accounts specialist will get back to you.</p>
      </CtaBand>
    </>
  );
}
