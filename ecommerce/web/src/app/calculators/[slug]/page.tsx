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
import { btnPrimary, siteContainerLg, sectionY, focusRing, focusRingAuthoredLinks } from "@/components/ui/layout-utils";
import EcommerceBackdrop from "@/components/layout/EcommerceBackdrop";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { LeadForm } from "@/components/forms/LeadForm";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

/**
 * FAQ answers are authored HTML (see src/lib/calculators/tools/*.ts), rendered
 * with dangerouslySetInnerHTML below. Nothing here is inside .prose-blog, so the
 * anchors need a colour: primary-700 is #8a5e1a, 5.68 on white. The brand hex
 * #c9861b is 3.04 on white and is never used as text.
 */
const linkOnLight = `[&_a]:text-primary-700 [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-primary-800 ${focusRingAuthoredLinks}`;

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
        RE-EXAMINED U2 2026-09-29 and the decline STANDS on two testable facts,
        neither of which `sectionClassName` (SlimHero.tsx:27,35-47) addresses.
        That prop does remove the ground half of the old objection: it replaces
        the single class `bg-slate-900` and nothing else, so the brand hero
        could keep its ground. What it cannot do:
        (a) SlimHero renders no breadcrumb slot at all (SlimHero.tsx:49-59 is
            section > container > Eyebrow + h1 + children, and `children` is the
            standfirst position under the h1). This hero's Breadcrumb emits the
            route's ONLY BreadcrumbList JSON-LD, so adopting would either delete
            that node or move the trail below the h1.
        (b) its eyebrow is hardcoded `Eyebrow onDark` (SlimHero.tsx:54) with no
            override, and on this site's #8a5e1a brand ground the kit's on-dark
            branch (text-slate-300, #cbd5e1) measures 3.83:1, under the 4.5
            floor for an 11-12px label. That is the same measurement that keeps
            `Eyebrow onDark` declined on every hero in this family.
        It also shortens the rhythm from py-16 sm:py-20 to py-8 sm:py-10 lg:py-12,
        which is a structural class the prop explicitly does not touch. So gate
        D4 is answered without SlimHero: the four hub section labels became
        config strings and the hand-rolled heroes stay.
        ADOPTION DECLINED here only: `Eyebrow onDark` from
        packages/web-shared/design/primitives/page-blocks.tsx, whose slate-300
        on-dark branch is 3.83:1 on #8a5e1a.

        `ground-dark` rebinds --focus-ring to white for the breadcrumb links.
        No light island sits inside this section. */}
    <section className="ground-dark relative overflow-hidden border-b border-slate-200 bg-primary-700 py-16 sm:py-20">
      {/* Decoration only, aria-hidden, pointer-events-none. The section
          carries `relative overflow-hidden` and the container below
          `relative z-10`: that is the backdrop host contract, and getting
          it wrong paints the texture over the copy. */}
      <EcommerceBackdrop />
      <div className={`relative z-10 ${siteContainerLg}`}>
        <Breadcrumb
          tone="onBrand"
          siteUrl={site.url}
          items={[{ label: "Home", href: "/" }, { label: "Calculators", href: "/calculators" }, { label: tool.name }]}
        />
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">{tool.name}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90">{tool.oneLiner}</p>
      </div>
    </section>
    {/* The tool itself renders from
        packages/web-shared/tools/components/Calculator.tsx via the site-local
        client wrapper (the tool carries a compute function, which cannot cross
        the RSC boundary). That component is a manager carve-out and is not
        edited here; its token use is reported to the manager instead. */}
    <section className={`border-b border-slate-200 bg-white ${sectionY}`}>
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
            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">Frequently asked questions</h2>
            <div className="mt-8 space-y-3 sm:space-y-4">
              {tool.faqs.map((f) => (
                <details key={f.question} className="group border border-slate-200 bg-white">
                  {/* Hover colour is text-primary-700 (#8a5e1a, 5.68 on white).
                      The brand hex #c9861b is 3.04 on white and stays on the
                      aria-hidden icon only, which is a graphic at 3:1. */}
                  <summary className={`flex cursor-pointer items-center justify-between gap-4 px-6 py-5 font-semibold text-slate-900 hover:text-primary-700 transition-colors list-none ${focusRing}`}>
                    <span>{f.question}</span>
                    <span className="flex-shrink-0 text-primary-400 transition-transform group-open:rotate-45" aria-hidden>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" /></svg>
                    </span>
                  </summary>
                  <div className={`border-t border-slate-100 px-6 pb-6 pt-4 text-base leading-relaxed text-slate-600 ${linkOnLight}`} dangerouslySetInnerHTML={{ __html: f.answer }} />
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    )}
    {/* ADOPTION DECLINED on this band, re-examined after the owner lifted the
        gate on LeadCTAPanel. It IS adopted on the three content slug templates
        (services, for, vat), and it is declined HERE for a different and
        specific reason: packages/web-shared/design/marketing/LeadCTAPanel.tsx
        requires a `title` and a `description`, and this band publishes neither.
        It is one link carrying the tool's own `ctaLabel` and nothing else.
        Handing the component a heading and a paragraph means writing marketing
        copy for seventeen routes, which this pass must not do, and replacing
        the link with an embedded form would also remove the route's ONLY
        /contact link (the hero here carries no CTA, unlike the three content
        templates), dropping a URL out of the page's internal link set.
        Owner item: authorise a CTA heading and line for the calculator
        family, or authorise reusing the sibling templates' pair, and this band
        becomes the same panel as the other three.
        Also still declined: packages/web-shared/design/marketing/StickyCTA.tsx
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
    {/* ADDED 2026-09-28 parity phase 0 (Opus read): brief section 4 requires
        exactly one form under the calculator result, with no gate. This band was
        a bare /contact link, so the route rendered zero forms. The earlier
        decline was that a heading and a line would have to be authored for the
        calculator family; they are authored here, once, off the tool's own name,
        and the tool's `ctaLabel` becomes the submit label so nothing it already
        published is dropped.
        2026-09-28 late (owner ruling, wording reversal): the mount stays, the
        agent-written eyebrow/title/description do not. The strings below are
        this site's own published panel copy, taken from /services/[slug]. */}
    <LeadCTAPanel
      eyebrow=""
      title="Speak to an ecommerce tax specialist."
      description="Tell us about your situation and we will reply within 24 hours."
      proofPoints={[]}
      formTitle={tool.ctaLabel}
      form={<LeadForm />}
    />
  </>);
}
