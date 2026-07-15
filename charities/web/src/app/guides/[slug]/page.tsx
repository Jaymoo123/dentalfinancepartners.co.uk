import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getGuideBySlug, getAllGuideSlugs } from "@/lib/guides/content";
import { siteConfig } from "@/config/site";
import { buildBreadcrumbJsonLd, buildArticleJsonLd, buildHowToJsonLd } from "@/lib/schema";

// Guides are prose-only today. Add buildFaqJsonLd + a faqs frontmatter field when
// a guide needs an accordion FAQ block (buildFaqJsonLd already exists in lib/schema).

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

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Guides", href: "/guides" },
    { label: guide.title },
  ];

  const howToSchema = guide.howToSteps?.length
    ? buildHowToJsonLd({ name: guide.title, description: guide.summary, steps: guide.howToSteps })
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buildBreadcrumbJsonLd(breadcrumbItems) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buildArticleJsonLd({ title: guide.title, description: guide.summary, url: `/guides/${slug}`, datePublished: guide.lastReviewed, dateModified: guide.lastReviewed }) }} />
      {howToSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: howToSchema }} />}

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-neutral-500">
          <Link href="/" className="hover:text-[#1a5c4a] transition-colors">Home</Link>
          <span aria-hidden>/</span>
          <Link href="/guides" className="hover:text-[#1a5c4a] transition-colors">Guides</Link>
          <span aria-hidden>/</span>
          <span className="text-neutral-700 font-medium">{guide.title}</span>
        </nav>

        <div className="mb-8 rounded-xl px-6 py-5" style={{ background: "#1a5c4a" }}>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-white/60">{siteConfig.name} guide</p>
          <h1 className="text-xl font-bold leading-snug text-white sm:text-2xl">{guide.title}</h1>
          {guide.summary && <p className="mt-2 text-sm text-white/80">{guide.summary}</p>}
          {guide.lastReviewed && <p className="mt-3 text-xs text-white/50">Last reviewed: {guide.lastReviewed}</p>}
        </div>

        {guide.headings.length >= 3 && (
          <nav aria-label="In this guide" className="mb-8 rounded-lg border border-gray-200 bg-gray-50 px-5 py-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">In this guide</p>
            <ol className="space-y-1">
              {guide.headings.filter((h) => h.level === 2).map((h) => (
                <li key={h.id}>
                  <a href={`#${h.id}`} className="text-sm font-medium text-[#1a5c4a] hover:underline">{h.text}</a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <article
          className="prose prose-gray max-w-none prose-headings:text-neutral-900 prose-headings:font-bold prose-a:text-[#1a5c4a] prose-a:no-underline hover:prose-a:underline prose-strong:text-neutral-900"
          dangerouslySetInnerHTML={{ __html: guide.html }}
        />

        <div className="mt-12 rounded-xl border border-[#1a5c4a]/20 bg-[#1a5c4a]/5 px-6 py-5">
          <p className="text-sm font-semibold text-neutral-900">Need advice on your specific situation?</p>
          <p className="mt-1 text-sm text-neutral-600">Contact us and a charity accounts specialist will reply within 24 hours.</p>
          <Link href="/contact" className="mt-3 inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity" style={{ background: "#1a5c4a" }}>
            Get in touch
          </Link>
        </div>
      </main>
    </>
  );
}
