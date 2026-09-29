import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { CalculatorClient } from "@/components/calculators/CalculatorClient";
import { CalcResultCta } from "@/components/calculators/CalcResultCta";
import { MiniCapture } from "@/components/calculators/MiniCapture";
import { buildCalculatorJsonLd, buildFaqPageJsonLd } from "@/lib/calculators/schema";
import { genericTools, getGenericTool } from "@/lib/calculators/registry";
import { site } from "@/lib/calculators/site";
import { siteContainerLg, contentNarrow, sectionY } from "@/components/ui/layout-utils";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

/**
 * Contrast wrapper for the adopted kit Breadcrumb on the brand hero. Same
 * string and same reason as the hub next door: the kit's onDark trail
 * (packages/web-shared/design/primitives/Breadcrumb.tsx) is slate-300 links and
 * slate-400 chevrons, 4.23:1 and 2.45:1 on this #4f46e5 ground, under the 4.5
 * text and 3.0 graphic floors. The kit is a manager carve-out, so the fix is
 * applied at the call site. White is 6.29:1 here, white/80 is 4.63:1.
 */
const crumbOnBrand = "[&_a]:text-white [&_a]:hover:text-white [&_svg]:text-white/80";

export function generateStaticParams() {
  return genericTools().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getGenericTool(slug);
  if (!tool) return {};
  const canonical = `${site.url}/calculators/${tool.slug}`;
  return {
    title: tool.metaTitle,
    description: tool.metaDescription,
    alternates: { canonical },
    openGraph: { title: tool.metaTitle, description: tool.oneLiner, url: canonical, type: "website", images: [`${site.url}/api/og?title=${encodeURIComponent(tool.metaTitle)}`] },
    twitter: { card: "summary_large_image", title: tool.metaTitle, description: tool.oneLiner },
  };
}

export default async function CalculatorToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getGenericTool(slug);
  if (!tool) notFound();

  const faqSchema = tool.faqs ? buildFaqPageJsonLd(tool.faqs) : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buildCalculatorJsonLd({ name: tool.name, description: tool.metaDescription, path: `/calculators/${tool.slug}` }) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      {/* ADOPTED: packages/web-shared/design/primitives/Breadcrumb.tsx, replacing
          the hand-rolled text trail this template carried (a bare <nav> of two
          <Link>s and a <span>, with no aria-label, no <ol> and no
          BreadcrumbList JSON-LD). Same crumb labels, same two destinations, so
          the route's unique internal link set is unchanged: the kit header and
          footer already emit href="/" on every page and /calculators was
          already linked here.

          ADOPTION DECLINED: packages/web-shared/design/primitives/SlimHero.tsx,
          the token-gated noindex hero, whose hardcoded slate-900 ground would
          replace this template's brand hero.
          ADOPTION DECLINED here: `Eyebrow onDark` from
          packages/web-shared/design/primitives/page-blocks.tsx, whose slate-300
          on-dark branch is 4.23:1 on #4f46e5. Eyebrow IS adopted inside the
          tool, on white, via src/components/calculators/CalculatorClient.tsx.

          `ground-dark` rebinds --focus-ring to white for the breadcrumb links,
          which are the first focusable things on the page. No light island sits
          inside this section. */}
      <section className="ground-dark bg-primary-600 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className={crumbOnBrand}>
            <Breadcrumb
              onDark
              siteUrl={site.url}
              items={[{ label: "Home", href: "/" }, { label: "Calculators", href: "/calculators" }, { label: tool.name }]}
            />
          </div>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">{tool.name}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">{tool.intro}</p>
        </div>
      </section>
      {/* The tool itself renders from
          packages/web-shared/tools/components/Calculator.tsx through the
          site-local client wrapper (the tool carries a compute function, which
          cannot cross the RSC boundary). That component is a manager carve-out
          and is not edited here; its token use is reported to the manager
          instead.

          The ONE capture surface that sits directly under the result is
          CalcResultCta, passed as the kit's `resultCta` seam. It is
          pre-existing, it is not a gate, and it is not touched: the kit renders
          the result unconditionally either side of it. */}
      <section className={`bg-slate-50 ${sectionY}`}>
        <div className={siteContainerLg}>
          <CalculatorClient slug={tool.slug} variant="page" resultCta={<CalcResultCta campaign={tool.slug} />} />
        </div>
      </section>
      <section className={`bg-white ${sectionY}`}>
        <div className={contentNarrow}>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{tool.explainer.heading}</h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
            {tool.explainer.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          {/* ADOPTION DECLINED: packages/web-shared/design/primitives/FaqSection.tsx.
              It is a Radix accordion with no forceMount, so a closed answer is
              absent from the server HTML while the FAQPage JSON-LD emitted above
              asserts every answer. This template's FAQ is plain <h3> + <p>, is
              already fully in the server HTML, and the JSON-LD is what crawlers
              consume (playbook T8). Revisit only if the kit gains forceMount,
              which is a manager carve-out. The markup below is unchanged apart
              from its colour classes.
              ADOPTION DECLINED: packages/web-shared/design/primitives/accordion.tsx,
              same mechanism, same defect. */}
          {tool.faqs && tool.faqs.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Frequently asked questions</h2>
              <div className="mt-6 space-y-6">
                {tool.faqs.map((f, i) => (
                  <div key={i}>
                    <h3 className="text-lg font-bold text-slate-900">{f.question}</h3>
                    <p className="mt-2 text-base leading-relaxed text-slate-700">{f.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* PRE-EXISTING capture surface, kept exactly: the id, the
              scroll-mt-24 (this is the site's only anchor target), the position
              at the end of the explainer, the formId and every string. Removing
              it, moving it or adding a second one is a capture-surface change
              and an owner gate.
              ADOPTION DECLINED: packages/web-shared/design/marketing/StickyCTA.tsx
              (an interruption, banned estate-wide) and
              packages/web-shared/design/marketing/LeadCTAPanel.tsx (it would
              replace this mount with a differently-shaped form and require an
              authored title and description). */}
          <div id="get-expert-help" className="mt-12 scroll-mt-24">
            <MiniCapture formId="calc_page_footer" messagePrefix={`[Calculator page: ${tool.slug}]`} heading="Want to be sure of your position?" blurb="Tell us about your startup situation and we will confirm your exact figures and the compliance steps that apply to you. No obligation." submitLabel="Request a review" />
          </div>
        </div>
      </section>
    </>
  );
}
