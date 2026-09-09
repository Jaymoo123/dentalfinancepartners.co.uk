import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { RelatedArticles } from "@accounting-network/web-shared/design/blog/RelatedArticles";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteConfig } from "@/config/site";
import { GLOSSARY } from "./data";
import { JsonLd, buildDefinedTerm } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return Object.keys(GLOSSARY).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = GLOSSARY[slug];
  if (!entry) return { title: "Term not found" };

  const url = `${siteConfig.url}/glossary/${slug}`;
  return {
    title: `${entry.term}, Definition for UK Business Owners`,
    description: `Plain-English definition of ${entry.term} for UK business owners. Includes current 2026/27 figures and what it means for your business.`,
    alternates: { canonical: url },
    openGraph: {
      title: `${entry.term}, UK Business Tax Glossary`,
      description: `Plain-English definition of ${entry.term} for UK business owners.`,
      url,
      type: "article",
    },
  };
}

export default async function GlossaryEntryPage({ params }: Props) {
  const { slug } = await params;
  const entry = GLOSSARY[slug];
  if (!entry) notFound();

  const related = Object.values(GLOSSARY)
    .filter((e) => e.category === entry.category && e.slug !== entry.slug)
    .slice(0, 3);

  const term = buildDefinedTerm({
    slug,
    term: entry.term,
    definition: entry.body.replace(/<[^>]+>/g, "").slice(0, 250),
    // The set is the glossary itself, as a URL. The bare category string sent
    // schema consumers looking for a DefinedTermSet that does not exist.
    inDefinedTermSet: `${siteConfig.url}/glossary#termset`,
  });

  return (
    <>
      <JsonLd data={term} />

      <article className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <Breadcrumb
              siteUrl={siteConfig.url}
              items={[
                { label: "Home", href: "/" },
                { label: "Glossary", href: "/glossary" },
                { label: entry.term },
              ]}
            />
            <header className="rounded-xl bg-slate-50 p-8 mt-6">
              <Eyebrow>{entry.category}</Eyebrow>
              <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
                {entry.term}
              </h1>
            </header>
          </div>

          {/* No wrapper clamp: `.prose-blog` already sets its own 65ch measure,
              and the max-w-3xl above it clamped the body a second time. */}
          <div
            className="article-body prose-blog mt-10"
            dangerouslySetInnerHTML={{ __html: entry.body }}
          />

          {related.length > 0 && (
            <section className="mt-16" aria-labelledby="related-terms-heading">
              <h2 id="related-terms-heading" className="text-2xl font-bold text-slate-900 mb-8">
                Related terms in {entry.category}
              </h2>
              <RelatedArticles
                columns={3}
                items={related.map((r) => ({
                  href: `/glossary/${r.slug}`,
                  title: r.term,
                  kind: "guide" as const,
                }))}
              />
            </section>
          )}
        </div>
      </article>

      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          contained
          title="Want this applied to your business?"
          description="Book a free call with an accountant. We read your actual position and tell you what to do about it."
          proofPoints={[
            {
              title: "24-hour response, usually same day",
              detail: "A real accountant reads your enquiry, not an inbox rota.",
            },
            {
              title: "Fixed fees, agreed before any work",
              detail: "You know the cost before anything starts.",
            },
            {
              title: "One named accountant",
              detail: "The same person handles your business each year.",
            },
          ]}
          form={<LeadForm redirectOnSuccess={false} submitLabel="Book a free call" />}
          footnote={
            <>
              Prefer to talk it through first?{" "}
              <Link href="/contact" className="font-semibold text-primary-700 hover:text-primary-800">
                Contact us
              </Link>
              .
            </>
          }
        />
      </div>
    </>
  );
}
