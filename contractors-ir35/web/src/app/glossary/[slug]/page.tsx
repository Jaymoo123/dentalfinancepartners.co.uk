import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteContainerLg, btnPrimary } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { LeadForm } from "@/components/forms/LeadForm";
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

      {/* Hero. The category was a `bg-cyan-600` pill under a white label, which
          measures 3.68:1 and fails the 4.5 floor in the ground role; it is now
          the site's mono eyebrow in the on-dark accent (#22d3ee, 10.96). The
          `.eyebrow` class itself is unusable here: it is UNLAYERED in
          globals.css and pins `color: var(--accent)` (3.69 on this ground), so
          no Tailwind utility can override it. */}
      <section className="bg-neutral-900 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Breadcrumb
            siteUrl={siteConfig.url}
            onDark
            items={[
              { label: "Home", href: "/" },
              { label: "IR35 Glossary", href: "/glossary" },
              { label: entry.term },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-primary-400">
              {entry.category}
            </p>
            <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              {entry.term}
            </h1>
            <Link
              href="#book"
              className={`${btnPrimary} mt-8 rounded-xl`}
              data-cta="hero_book"
              data-cta-placement="hero"
              data-cta-goal="form"
            >
              Book a free call
            </Link>
          </div>
        </div>
      </section>

      {/* Definition body. No `max-w-3xl mx-auto` wrapper: `.prose-blog` already
          pins its own 65ch reading measure in globals.css, so the clamp only
          narrowed the page. The freed width becomes the second column (the
          two-column answer §0.1 asks for), which also promotes the related
          terms out of the tail. */}
      <article className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12">
            <div
              className="article-body prose-blog"
              dangerouslySetInnerHTML={{ __html: entry.body }}
            />

            {related.length > 0 && (
              <aside
                className="mt-12 lg:mt-0"
                aria-labelledby="related-terms-heading"
              >
                <div className="lg:sticky lg:top-24">
                  <h2
                    id="related-terms-heading"
                    className="mb-4 text-sm font-bold uppercase tracking-wide text-neutral-900"
                  >
                    More in {entry.category}
                  </h2>
                  <ul className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                    {related.map((r) => (
                      <li key={r.slug} className="flex">
                        <Link
                          href={`/glossary/${r.slug}`}
                          className="group flex h-full w-full flex-col rounded-xl bg-white p-4 ring-1 ring-neutral-200/70 transition-colors hover:bg-neutral-50 hover:ring-primary-600/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                        >
                          <span className="text-sm font-bold leading-snug text-neutral-900">
                            {r.term}
                          </span>
                          <span className="mt-2 inline-flex items-center text-xs font-semibold text-primary-600">
                            Read
                            <ArrowRight
                              aria-hidden
                              className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5"
                            />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            )}
          </div>
        </div>
      </article>

      {/* Closing ask. Was a square `bg-neutral-900 p-8` box whose only ask left
          the page for /contact; the panel puts the real form on the page and
          `contained` keeps a dark band off the dark footer. `proofPoints` stays
          EMPTY: no authored proof copy exists for this site and the kit's
          defaults are not ours to publish. */}
      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          contained
          ground="slate"
          eyebrow="Free call"
          title="Not sure how this applies to your IR35 position?"
          description="Book a free call with a specialist contractor accountant. We will review your status, check your contracts and working practices, and tell you exactly where you stand. Plain English, no obligation."
          proofPoints={[]}
          formTitle="Book your free call"
          form={<LeadForm submitLabel="Request a callback" />}
          footnote={
            <>
              If you would rather write to us first, use the{" "}
              <Link
                href="/contact"
                className="font-semibold text-primary-600 underline hover:text-primary-700"
              >
                contact form
              </Link>
              .
            </>
          }
        />
      </div>
    </>
  );
}
