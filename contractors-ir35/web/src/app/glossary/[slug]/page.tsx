import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { siteContainerLg, btnPrimary } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { GLOSSARY } from "./data";
import { buildDefinedTerm, buildBreadcrumbJsonLd } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return Object.keys(GLOSSARY).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = GLOSSARY[slug];
  if (!entry) return { title: "Term not found" };

  const url = `${siteConfig.url}/glossary/${slug}`;

  // Title: "<Term> | Contractor Tax Accountants" via the `absolute` form so the
  // layout brand template is not appended a second time (the "IR35 Glossary"
  // middle segment is dropped as it duplicates the H1 and breadcrumb). If the
  // full term would push the title over 65 chars, drop a trailing parenthetical
  // from the term for the title only (the H1 keeps the full term).
  let titleTerm = entry.term;
  if (`${titleTerm} | ${siteConfig.name}`.length > 65) {
    titleTerm = titleTerm.replace(/\s*\([^)]*\)\s*$/, "").trim();
  }
  const title = `${titleTerm} | ${siteConfig.name}`;

  // Strip HTML for description
  const plainBody = entry.body.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const description = plainBody.slice(0, 158) + (plainBody.length > 158 ? "." : "");

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${entry.term} | IR35 Glossary`,
      description,
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

  const plainBody = entry.body.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const termSchema = buildDefinedTerm({
    slug,
    term: entry.term,
    definition: plainBody.slice(0, 250),
    inDefinedTermSet: entry.category,
  });
  const breadcrumbSchema = buildBreadcrumbJsonLd([
    { label: "Home", href: "/" },
    { label: "IR35 Glossary", href: "/glossary" },
    { label: entry.term },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(termSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
      />

      {/* Hero */}
      <section className="bg-neutral-900 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <Breadcrumb
            variant="light"
            items={[
              { label: "Home", href: "/" },
              { label: "IR35 Glossary", href: "/glossary" },
              { label: entry.term },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-cyan-600 px-3 py-1.5 text-xs font-bold text-white uppercase tracking-wider mb-4">
              <BookOpen className="h-3.5 w-3.5" />
              {entry.category}
            </div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              {entry.term}
            </h1>
          </div>
        </div>
      </section>

      {/* Definition body */}
      <article className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="max-w-3xl mx-auto">
            <div
              className="article-body prose-blog"
              dangerouslySetInnerHTML={{ __html: entry.body }}
            />

            {/* Lead CTA */}
            <div className="mt-12 bg-neutral-900 p-8 text-white">
              <h2 className="text-xl font-bold sm:text-2xl">
                Not sure how this applies to your IR35 position?
              </h2>
              <p className="mt-3 text-base text-neutral-200">
                Book a free call with a specialist contractor accountant. We will
                review your status, check your contracts and working practices,
                and tell you exactly where you stand. Plain English, no
                obligation.
              </p>
              <Link href="/contact" className={`${btnPrimary} mt-6`}>
                Book a free call
              </Link>
            </div>

            {/* Related terms */}
            {related.length > 0 && (
              <section className="mt-12 pt-12 border-t border-neutral-200">
                <h2 className="text-xl font-bold text-neutral-900 mb-6">
                  Related terms in {entry.category}
                </h2>
                <ul className="grid gap-3 sm:grid-cols-3">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`/glossary/${r.slug}`}
                        className="group block bg-stone-50 border border-neutral-200 p-4 hover:border-cyan-600 hover:bg-white transition-all"
                      >
                        <p className="text-sm font-bold text-neutral-900 group-hover:text-cyan-700 transition-colors">
                          {r.term}
                        </p>
                        <div className="mt-2 flex items-center text-cyan-700 text-xs font-semibold">
                          Read
                          <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </article>
    </>
  );
}
