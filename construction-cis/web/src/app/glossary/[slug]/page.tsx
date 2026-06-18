import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { siteContainerLg, btnPrimary } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { GLOSSARY } from "./data";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildDefinedTerm } from "@/lib/schema";

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

  // Truncate title to <=62 chars: "<Term> | CIS Glossary | Trade Tax Specialists"
  const baseTitle = `${entry.term} | CIS Glossary | ${siteConfig.name}`;
  const title =
    baseTitle.length <= 62 ? baseTitle : `${entry.term} | CIS Glossary`;

  // Strip HTML for description
  const plainBody = entry.body.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const description = plainBody.slice(0, 158) + (plainBody.length > 158 ? "." : "");

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${entry.term} | CIS Glossary`,
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

  return (
    <>
      <JsonLd data={termSchema} />

      {/* Hero */}
      <section className="bg-neutral-900 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <Breadcrumb
            variant="light"
            items={[
              { label: "Home", href: "/" },
              { label: "CIS Glossary", href: "/glossary" },
              { label: entry.term },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-orange-500 px-3 py-1.5 text-xs font-bold text-white uppercase tracking-wider mb-4">
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
                Not sure how this applies to your CIS position?
              </h2>
              <p className="mt-3 text-base text-neutral-200">
                Book a free call with a specialist CIS accountant. We will
                review your deductions, check your returns and tell you exactly
                where you stand. Plain English, no obligation.
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
                        className="group block bg-stone-50 border border-neutral-200 p-4 hover:border-orange-500 hover:bg-white transition-all"
                      >
                        <p className="text-sm font-bold text-neutral-900 group-hover:text-orange-700 transition-colors">
                          {r.term}
                        </p>
                        <div className="mt-2 flex items-center text-orange-600 text-xs font-semibold">
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
