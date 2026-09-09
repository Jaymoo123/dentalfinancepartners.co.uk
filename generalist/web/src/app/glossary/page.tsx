import type { Metadata } from "next";
import Link from "next/link";
import { siteContainerLg, focusRing } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { GeneralistBackdrop } from "@/components/layout/GeneralistBackdrop";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteConfig } from "@/config/site";
import { LEAD_PROOF_POINTS } from "@/lib/blog-cta-map";
import { JsonLd, buildBreadcrumb, buildCollectionPage, buildDefinedTermSet } from "@/lib/schema";
import { GLOSSARY } from "./[slug]/data";

export const metadata: Metadata = {
  title: `Glossary`,
  description:
    "Plain-English definitions of UK tax, finance, and accounting terms for business owners. BADR, IR35, MTD, R&D credits, VAT schemes and more.",
  alternates: { canonical: `${siteConfig.url}/glossary` },
  openGraph: {
    title: "Glossary | UK Business Tax & Finance Terms Explained",
    description: "Plain-English definitions for UK business owners.",
    url: `${siteConfig.url}/glossary`,
    type: "website",
  },
};

function anchorId(category: string): string {
  return `cat-${category.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}`;
}

const chip = `inline-flex min-h-12 items-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-900 shadow-sm transition-all hover:border-primary-600 hover:text-primary-700 hover:shadow-md sm:text-base`;

export default function GlossaryIndexPage() {
  const entries = Object.values(GLOSSARY);
  const crumbs = [{ label: "Home", href: "/" }, { label: "Glossary" }];

  const byCategory: Record<string, typeof entries> = {};
  for (const e of entries) {
    (byCategory[e.category] ||= []).push(e);
  }
  const categories = Object.keys(byCategory).sort();

  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumb(crumbs),
          buildCollectionPage({
            name: "Glossary",
            description: `${entries.length} plain-English definitions of UK business tax, finance and accounting terms.`,
            path: "/glossary",
          }),
          buildDefinedTermSet(entries.map((e) => ({ slug: e.slug, term: e.term }))),
        ]}
      />

      <section className="relative flex min-h-[300px] items-center overflow-hidden bg-slate-900 py-10 sm:min-h-[350px] sm:py-12 lg:py-14">
        <GeneralistBackdrop />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Breadcrumb siteUrl={siteConfig.url} onDark items={crumbs} />
            <Eyebrow onDark>Plain English definitions</Eyebrow>
            <h1 className="text-3xl font-bold leading-[1.15] text-white text-balance sm:text-5xl lg:text-6xl">
              UK business tax and finance glossary
            </h1>
            <p className="mt-4 text-base leading-7 text-white/90 sm:mt-6 sm:text-lg">
              {entries.length} definitions of the terms UK business owners actually need to
              understand. Written by our specialist accountants, with every figure checked for
              2026/27.
            </p>
          </div>
        </div>
      </section>

      {/* Jump rail. At 550+ terms the page is a very long scroll and had no
          wayfinding above it at all. */}
      <section className="border-b border-slate-200 bg-white py-8 sm:py-10">
        <div className={siteContainerLg}>
          <Eyebrow>Jump to a topic</Eyebrow>
          <nav aria-label="Glossary categories" className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <a
                key={cat}
                href={`#${anchorId(cat)}`}
                data-cta={`glossary_jump_${anchorId(cat)}`}
                data-cta-placement="jump_rail"
                className={`${chip} gap-2 ${focusRing}`}
              >
                {cat}
                <span className="text-xs font-semibold text-slate-500">
                  {byCategory[cat].length}
                </span>
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          {categories.map((cat) => (
            <div key={cat} id={anchorId(cat)} className="mb-12 scroll-mt-24 last:mb-0">
              <h2 className="mb-6 border-b border-slate-200 pb-3 text-2xl font-bold text-slate-900 sm:text-3xl">
                {cat}
              </h2>
              <div className="flex flex-wrap gap-3">
                {byCategory[cat].map((e) => (
                  <Link
                    key={e.slug}
                    href={`/glossary/${e.slug}`}
                    data-cta="glossary_term"
                    data-cta-placement="term_grid"
                    className={`${chip} ${focusRing}`}
                  >
                    {e.term}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          title="Know the word, unsure what it means for you?"
          description="A free call with an accountant who applies it to your actual position, rather than another definition."
          proofPoints={LEAD_PROOF_POINTS}
          form={<LeadForm submitLabel="Request callback" redirectOnSuccess={false} />}
          contained
          footnote="No obligation and no hard sell. If your position is already right, we will say so."
        />
      </div>
    </>
  );
}
