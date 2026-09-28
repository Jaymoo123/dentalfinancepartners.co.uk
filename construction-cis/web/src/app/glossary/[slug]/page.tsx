import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { siteContainerLg, btnPrimary } from "@/components/ui/layout-utils";
import { LeadCTAPanel } from "@/components/marketing/LeadCTAPanel";
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
            <div className="mb-4 inline-flex items-center gap-2 font-geist-mono text-xs font-medium uppercase tracking-[0.1em] text-orange-400">
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
      <article className="bg-white pt-12 sm:pt-16">
        <div className={siteContainerLg}>
          <div>
            <div
              className="article-body prose-blog"
              dangerouslySetInnerHTML={{ __html: entry.body }}
            />

            {/* Section D.3 mid-article ask. A light card inside a white
                article, not a navy block: DESIGN_SYSTEM section 9 keeps navy
                for full bands. Points at the panel at the foot of the page, so
                the reader does not leave the definition to convert. */}
            <div className="mt-12 rounded-xl bg-white p-6 ring-1 ring-slate-200">
              <h2 className="text-xl font-bold text-neutral-900 sm:text-2xl">
                Not sure how {entry.term} applies to your own CIS position?
              </h2>
              <p className="mt-3 text-base text-neutral-700">
                A definition tells you what the rule is. A specialist CIS
                accountant can tell you what it does to your figures. We will
                read your deductions and your returns and tell you where you
                stand, in plain English.
              </p>
              <Link
                href="#book"
                data-cta="glossary_entry_book"
                data-cta-placement="article"
                data-cta-goal="form"
                className={`${btnPrimary} mt-6`}
              >
                Check my CIS position
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
                        className="group block rounded-xl bg-slate-50 border border-slate-200 p-4 hover:border-orange-500 hover:bg-white transition-all"
                      >
                        <p className="text-sm font-bold text-neutral-900 group-hover:text-orange-700 transition-colors">
                          {r.term}
                        </p>
                        <div className="mt-2 flex items-center text-orange-700 text-xs font-semibold">
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

        {/* Section D.3 closing ask. Inside the <article> on purpose: the tail
            of <main> stays `</article>` and the last painted band is the
            panel's cream, never navy against the navy footer. Static band in
            the page body, nothing interruptive. */}
        <div id="book" className="mt-12 scroll-mt-24 sm:mt-16">
          <LeadCTAPanel
            contained
            title="Get this checked against your own numbers"
            description="Definitions are the easy part. Tell us where you are up to with CIS and we will tell you what it means for your money this year."
            proofPoints={[
              {
                title: "CIS specialists only",
                detail: "Construction tax is the whole of what we do, not a sideline.",
              },
              {
                title: "Fees agreed before any work starts",
                detail: "The specialist firm you speak to sets its own fee and agrees it with you up front.",
              },
              {
                title: "No hard sell, no obligation",
                detail: "If your position is already right, we will say so.",
              },
            ]}
          />
        </div>
      </article>
    </>
  );
}
