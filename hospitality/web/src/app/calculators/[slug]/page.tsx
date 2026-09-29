import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalculatorClient } from "@/components/calculators/CalculatorClient";
import { buildOgImageUrl } from "@/lib/schema";
import { CalcResultCta } from "@/components/calculators/CalcResultCta";
import { buildCalculatorJsonLd, buildFaqPageJsonLd } from "@/lib/calculators/schema";
import { genericTools, getGenericTool } from "@/lib/calculators/registry";
import { site } from "@/lib/calculators/site";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { FaqSection } from "@accounting-network/web-shared/design/primitives/FaqSection";
import HospitalityBackdrop from "@/components/layout/HospitalityBackdrop";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

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
    openGraph: {
      title: tool.metaTitle,
      description: tool.oneLiner,
      url: canonical,
      type: "website",
      images: [{ url: buildOgImageUrl(tool.name), width: 1200, height: 630, alt: tool.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: tool.metaTitle,
      description: tool.oneLiner,
      images: [buildOgImageUrl(tool.name)],
    },
  };
}

export default async function CalculatorToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getGenericTool(slug);
  if (!tool) notFound();

  const faqSchema = tool.faqs ? buildFaqPageJsonLd(tool.faqs) : null;

  return (
    <>
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
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div>
        {/* kit Breadcrumb (adopted, tone="onBrand"): this hero is
            bg-[var(--brand-primary)], a mid-tone brand ground the "onDark"
            steps would under-contrast (see Breadcrumb.tsx:29-36). Replaces
            the hand-rolled trail; the page emitted no BreadcrumbList before
            this, so it is a pure gain. HospitalityBackdrop + .ground-dark
            mounted on the same section (host contract: relative
            overflow-hidden / relative z-10). */}
        <section className="ground-dark relative overflow-hidden bg-[var(--brand-primary)] py-12 sm:py-16">
          <HospitalityBackdrop patternId="hospitality-table-setting-calculator-hero" />
          <div className="relative z-10 mx-auto max-w-4xl px-6">
            <Breadcrumb
              items={[{ label: "Home", href: "/" }, { label: "Calculators", href: "/calculators" }, { label: tool.name }]}
              siteUrl={site.url}
              tone="onBrand"
            />
            {/* kit Eyebrow (adopted, onDark): fed the tool's own existing
                tool.category string, no new label authored.
                CONTRAST, recorded rather than left unmeasured (R2 G4): `onDark`
                hardcodes text-slate-300 at page-blocks.tsx:45, and slate-300
                rgb(202,213,226) on this brand ground #b0532f measures 3.43
                against a 4.5 floor (11-12px, not large text). The call site
                cannot reach that class: Eyebrow takes `children` and `onDark`
                only, no className and no tone. KIT ASK, one line, additive:
                give Eyebrow `className?: string` appended to its own class
                string, and this call site passes `text-white` (5.09 on #b0532f,
                measured) or `text-primary-50` #fff2eb (4.64). Until it lands
                the label stays as shipped; darkening the designer-set ground is
                banned and no site-side hook exists. */}
            <Eyebrow onDark className="text-white">{tool.category}</Eyebrow>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">{tool.name}</h1>
            <p className="mt-4 max-w-2xl text-lg text-white/85">{tool.intro}</p>
          </div>
        </section>

        <section className="bg-[var(--surface)] py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-6">
            {/* Kit Calculator now takes headingLevel (1437cb9e): its tool-name
                heading renders as h2 directly, so the sr-only h2 shim that
                used to bridge the hero h1 to the kit's old fixed h3 is gone. */}
            <CalculatorClient slug={tool.slug} variant="page" resultCta={<CalcResultCta campaign={tool.slug} />} headingLevel={2} />
            {/* kit ExampleFigureNote REMOVED (R3 GAP 4). Its default label,
                "Example figures displayed" (ExampleFigureNote.tsx:24), printed
                under a live result computed from the reader's OWN entered
                figures. That result is not an example, so the sentence was
                untrue, and it is a kit default nobody on this site authored.
                A true label would be new copy, which locked rule 4 forbids, so
                the mount goes rather than the wording. The "Source: ..." labels
                on the three research pages stay: those ARE the note doing its
                job over official statistics, and each attribution is the page's
                own methodology sentence.
                Do not mount a NoticeCard in its place either: none of the three
                tools' tool.intro / tool.explainer strings contain an
                "estimates / check your own figures" sentence to feed one
                (`grep -rn 'estimate\|check your own' src/lib/calculators/tools`
                = 0). */}
          </div>
        </section>

        <section className="bg-white py-12 sm:py-16">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-2xl font-bold text-[var(--ink)] sm:text-3xl">{tool.explainer.heading}</h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-[var(--ink-soft)]">
              {tool.explainer.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          {/* REMOVED 2026-09-28 parity phase 0 (Opus read): this route rendered
              TWO identical capture forms, this one and CalcResultCta under the
              result. Brief section 4 allows exactly one, directly under the
              result, so the footer duplicate goes and CalcResultCta stays.
              Confirmed still true here: no LeadCTAPanel or second form added
              to this template. */}
        </section>

        {/* kit FaqSection (adopted, alwaysRenderAnswers): replaces the flat
            h3/p block. Its own heading is an h2, so the per-question h3s
            that P0B finding 11 also flagged are gone. Same tool.faqs binding
            buildFaqPageJsonLd above is fed from (T17: one binding). Answers
            are plain text on all three tools (no markup in the source
            strings), so `html` is not passed. */}
        {tool.faqs && tool.faqs.length > 0 && (
          <FaqSection eyebrow="" title="Frequently asked questions" faqs={tool.faqs} alwaysRenderAnswers />
        )}
      </div>
    </>
  );
}
