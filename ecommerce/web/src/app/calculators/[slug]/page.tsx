import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { genericTools, getGenericTool } from "@/lib/calculators/registry";
import { site } from "@/lib/calculators/site";
import { CalculatorClient } from "@/components/calculators/CalculatorClient";
import { buildCalculatorJsonLd } from "@/lib/calculator-schema";
import { buildFaqJsonLd } from "@/lib/schema";
import { btnPrimary, siteContainerLg, sectionY, focusRing } from "@/components/ui/layout-utils";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

/**
 * Contrast wrapper for the adopted kit Breadcrumb on the brand hero. Same
 * string, same reason as the three hub families: the kit's onDark trail
 * (packages/web-shared/design/primitives/Breadcrumb.tsx) is slate-300 links and
 * slate-400 chevrons, 3.76:1 and about 2.0:1 on this #8a5e1a ground. The kit is
 * a manager carve-out, so the fix is applied here, at the call site.
 */
const crumbOnBrand = "[&_a]:text-white [&_a]:hover:text-white [&_svg]:text-white/80";

/**
 * FAQ answers are authored HTML (see src/lib/calculators/tools/*.ts), rendered
 * with dangerouslySetInnerHTML below. Nothing here is inside .prose-blog, so the
 * anchors need a colour: primary-700 is #8a5e1a, 5.68 on white. The brand hex
 * #c9861b is 3.04 on white and is never used as text.
 */
const linkOnLight = "[&_a]:text-primary-700 [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-primary-800";

export function generateStaticParams() {
  return genericTools().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getGenericTool(slug);
  if (!tool) return {};
  return {
    title: { absolute: tool.metaTitle },
    description: tool.metaDescription,
    alternates: { canonical: `${site.url}/calculators/${tool.slug}` },
  };
}

export default async function CalculatorPage({ params }: Props) {
  const { slug } = await params;
  const tool = getGenericTool(slug);
  if (!tool) notFound();
  return (<>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: buildCalculatorJsonLd({
          name: tool.name,
          description: tool.metaDescription,
          path: `/calculators/${tool.slug}`,
        }),
      }}
    />
    {tool.faqs && tool.faqs.length > 0 && (
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(tool.faqs) }} />
    )}
    {/* ADOPTED: packages/web-shared/design/primitives/Breadcrumb.tsx, matching
        the services, for and vat slug templates. This route had no h1 and no
        breadcrumb at all. The Home crumb is not a new internal link (the kit
        header wordmark and footer already emit href="/" on every page), so the
        route's unique internal link set only gains /calculators, which is the
        trail's own parent.

        ADOPTION DECLINED: packages/web-shared/design/primitives/SlimHero.tsx,
        the token-gated noindex hero, whose slate-900 ground would replace the
        locked brand hero.
        ADOPTION DECLINED here only: `Eyebrow onDark` from
        packages/web-shared/design/primitives/page-blocks.tsx, whose slate-300
        on-dark branch is 3.83:1 on #8a5e1a.

        `ground-dark` rebinds --focus-ring to white for the breadcrumb links.
        No light island sits inside this section. */}
    <section className="ground-dark border-b border-neutral-200 bg-primary-700 py-16 sm:py-20">
      <div className={siteContainerLg}>
        <div className={crumbOnBrand}>
          <Breadcrumb
            onDark
            siteUrl={site.url}
            items={[{ label: "Home", href: "/" }, { label: "Calculators", href: "/calculators" }, { label: tool.name }]}
          />
        </div>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">{tool.name}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{tool.oneLiner}</p>
      </div>
    </section>
    {/* The tool itself renders from
        packages/web-shared/tools/components/Calculator.tsx via the site-local
        client wrapper (the tool carries a compute function, which cannot cross
        the RSC boundary). That component is a manager carve-out and is not
        edited here; its token use is reported to the manager instead. */}
    <section className={`border-b border-neutral-200 bg-white ${sectionY}`}>
      <div className={siteContainerLg}>
        <CalculatorClient slug={tool.slug} variant="page" />
      </div>
    </section>
    {/* ADOPTION DECLINED: packages/web-shared/design/primitives/FaqSection.tsx.
        It is a Radix accordion with no forceMount, so a closed answer is absent
        from the server HTML while the FAQPage JSON-LD emitted above asserts
        every answer. Declined on the same grounds on the blog template (phase 2)
        and all three hub families (phase 3). Native <details> keeps every answer
        server-rendered and still collapses. Revisit only if the kit gains
        forceMount, which is a manager carve-out. */}
    {tool.faqs && tool.faqs.length > 0 && (
      <section className={`bg-[#fafaf7] ${sectionY}`}>
        <div className={siteContainerLg}>
          <div className="mx-auto max-w-3xl">
            <Eyebrow>Questions</Eyebrow>
            <h2 className="mt-2 text-2xl font-bold text-neutral-900 sm:text-3xl">Frequently asked questions</h2>
            <div className="mt-8 space-y-3 sm:space-y-4">
              {tool.faqs.map((f) => (
                <details key={f.question} className="group border border-neutral-200 bg-white">
                  {/* Hover colour is text-primary-700 (#8a5e1a, 5.68 on white).
                      The brand hex #c9861b is 3.04 on white and stays on the
                      aria-hidden icon only, which is a graphic at 3:1. */}
                  <summary className={`flex cursor-pointer items-center justify-between gap-4 px-6 py-5 font-semibold text-neutral-900 hover:text-primary-700 transition-colors list-none ${focusRing}`}>
                    <span>{f.question}</span>
                    <span className="flex-shrink-0 text-primary-400 transition-transform group-open:rotate-45" aria-hidden>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" /></svg>
                    </span>
                  </summary>
                  <div className={`border-t border-neutral-100 px-6 pb-6 pt-4 text-base leading-relaxed text-neutral-600 ${linkOnLight}`} dangerouslySetInnerHTML={{ __html: f.answer }} />
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    )}
    {/* ADOPTION DECLINED on this band:
        packages/web-shared/design/marketing/LeadCTAPanel.tsx (a lead-capture
        surface, owner-gated), packages/web-shared/design/marketing/StickyCTA.tsx
        (an interruption, banned estate-wide),
        packages/web-shared/design/marketing/TestimonialsSection.tsx (hardcodes
        another site's quotes; this site has no authored social proof),
        packages/web-shared/design/marketing/WhatToExpectCard.tsx (its default
        props publish a fee line nobody here authored) and
        packages/web-shared/design/marketing/StatsCounter.tsx (one number, no
        links, deletes citations).

        NO COPY IS AUTHORED HERE. The link label is the tool's own `ctaLabel`,
        already committed in src/lib/calculators/tools/*.ts and rendered nowhere
        on the site until now, and the destination is the existing /contact
        route. No CTA data attribute is added: this is a plain internal link,
        so the CTA snapshot is unchanged.
        `.ground-dark` rebinds --focus-ring for this band. Do not remove it. */}
    <section className={`ground-dark bg-neutral-900 ${sectionY}`}>
      <div className={siteContainerLg}>
        <Link href="/contact" className={btnPrimary}>{tool.ctaLabel}</Link>
      </div>
    </section>
  </>);
}
