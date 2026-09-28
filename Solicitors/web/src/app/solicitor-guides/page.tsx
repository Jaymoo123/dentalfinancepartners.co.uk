import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import {
  btnPrimary,
  focusRing,
  heroCreamSurface,
  siteContainerLg,
} from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { getAllGuides } from "@/lib/solicitor-guides";
import { LEAD_PROOF_POINTS } from "@/lib/blog-category-copy";
import { buildBreadcrumbJsonLd, buildCollectionPage, JsonLd } from "@/lib/schema/index";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { SolicitorsBackdrop } from "@/components/layout/SolicitorsBackdrop";
import { LeadForm } from "@/components/forms/LeadForm";
import { genericTools, toolPath } from "@/lib/tools/registry";

export const metadata: Metadata = {
  title: `Pillar Guides for UK Solicitors and Law Firms`,
  description:
    "Long-form pillar guides on the decisions UK solicitor firms actually face. SRA Accounts Rules, partnership vs LLP, post-merger integration, PII, COFA, fee-share vs equity partner.",
  alternates: {
    canonical: `${siteConfig.url}/solicitor-guides`,
    languages: {
      "en-GB": `${siteConfig.url}/solicitor-guides`,
      "x-default": `${siteConfig.url}/solicitor-guides`,
    },
  },
  openGraph: {
    title: "Pillar guides for UK solicitors and law firms",
    description:
      "Long-form pillar guides on the decisions UK solicitor firms actually face.",
    url: `${siteConfig.url}/solicitor-guides`,
    type: "website",
  },
};

export default function SolicitorGuidesIndex() {
  const guides = getAllGuides();
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Solicitor Guides" },
  ];
  const breadcrumbSchema = JSON.parse(buildBreadcrumbJsonLd(breadcrumbItems));
  const collectionSchema = buildCollectionPage({
    name: "Pillar Guides for UK Solicitors and Law Firms",
    description:
      "Long-form pillar guides on the decisions UK solicitor firms actually face.",
    path: "/solicitor-guides",
    numberOfItems: guides.length,
  });

  // ponytail: the first five in registry order, which is the gallery's own
  // display order, rather than a second hand-kept list that would drift.
  // Same projection /blog uses for its closing tools band.
  const bridgeTools = genericTools().slice(0, 5);

  return (
    <>
      <JsonLd data={[collectionSchema, breadcrumbSchema]} />

      <section
        className={`relative flex min-h-[350px] items-center overflow-hidden py-10 sm:py-12 lg:py-14 ${heroCreamSurface}`}
      >
        <SolicitorsBackdrop tone="cream" />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Breadcrumb items={breadcrumbItems} />
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
              Pillar guides
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-[1.15] text-slate-900 sm:text-5xl lg:text-6xl">
              Deep guides for UK solicitors and law firms
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-700 sm:mt-6 sm:text-lg">
              Long-form reference content on the decisions that actually move the
              numbers. Written for partners, COFAs, firm buyers and consultant solicitors. Every guide grounded in current 2025/26 UK tax and SRA regulatory rules.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href="#book"
                data-cta="guides_hero_book"
                data-cta-placement="hero"
                data-cta-goal="form"
                className={btnPrimary}
              >
                Book a free consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          {guides.length === 0 ? (
            <p className="text-center text-base text-slate-600">
              Pillar guides will appear here.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {guides.map((g) => (
                <Link
                  key={g.slug}
                  href={`/solicitor-guides/${g.slug}`}
                  className={`group flex flex-col rounded-xl bg-white p-7 shadow-sm ring-1 ring-slate-200/70 transition-all hover:shadow-md ${focusRing}`}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-700">
                    {g.eyebrow}
                  </p>
                  <h2 className="mt-2 text-xl font-bold leading-snug text-slate-900 group-hover:text-primary-700">
                    {g.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {g.summary}
                  </p>
                  <div className="mt-auto pt-6 flex items-center justify-between text-xs text-slate-500">
                    <span>
                      {Math.round(g.wordCount / 200)} min read · {g.wordCount.toLocaleString()} words
                    </span>
                    <span className="font-bold text-primary-700">
                      Read guide →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* The guides index had no ask at all (DS 0.5). In-flow closing panel,
          not an interruptive surface: the reader meets it only after scrolling
          past the card grid. Title, description, proof points and footnote are
          /blog's published panel verbatim (plan R4), so this package authors no
          new pitch copy. */}
      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          title="Rather have someone read your firm's numbers than read the archive?"
          description="A free consultation with an accountant who works with SRA regulated firms every day. Tell us how the practice is structured and what is on your mind, and we will come back with clear next steps."
          proofPoints={LEAD_PROOF_POINTS}
          form={<LeadForm redirectOnSuccess={false} />}
          backdrop={<SolicitorsBackdrop tone="navy" />}
          footnote="No obligation and no hard sell. If your position is already right, we will say so."
        />
      </div>

      {/* Light band between the navy panel and the navy footer: navy never
          touches navy (DS 0.1). Same tools bridge /blog closes on, strings
          verbatim. */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Free tools</Eyebrow>
          <h2 className="mb-2 text-2xl font-bold text-slate-900 sm:text-4xl">
            Put numbers on what you just read
          </h2>
          <p className="mb-8 text-base text-slate-600 sm:text-lg">
            {genericTools().length} free calculators for UK law firms, on current rates. Start with
            the ones solicitors reach for most.
          </p>
          <div className="flex flex-wrap gap-3">
            {bridgeTools.map((tool) => (
              <Link
                key={tool.slug}
                href={toolPath(tool.slug)}
                className={`inline-flex min-h-12 items-center rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-900 shadow-sm ring-1 ring-slate-200/70 transition-all hover:text-primary-700 hover:shadow-md sm:text-base ${focusRing}`}
              >
                {tool.name}
              </Link>
            ))}
          </div>
          <Link
            href="/calculators"
            data-cta="guides_calculators_all"
            data-cta-placement="calculator_bridge"
            className={`mt-8 inline-flex min-h-11 items-center gap-1.5 rounded py-1 text-sm font-bold text-primary-700 transition-colors hover:text-primary-800 sm:text-base ${focusRing}`}
          >
            View all {genericTools().length} calculators
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
