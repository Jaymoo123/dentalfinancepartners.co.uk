import type { Metadata } from "next";
import Link from "next/link";
import { siteContainerLg, focusRing } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { JsonLd, buildWebApplication, buildFaqPage } from "@/lib/schema";
import { CalculatorPageResources } from "@/components/resources/CalculatorPageResources";
import { LawFirmSaleCgtCalculator } from "@/components/tools/LawFirmSaleCgtCalculator";
import { lawFirmSaleCgtTool as tool } from "@/lib/tools/configs/law-firm-sale-cgt";
import { LEAD_PROOF_POINTS } from "@/lib/blog-category-copy";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { ExampleFigureNote } from "@accounting-network/web-shared/design/primitives/ExampleFigureNote";
import { Eyebrow, Prose } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { SolicitorsBackdrop } from "@/components/layout/SolicitorsBackdrop";
import { LeadForm } from "@/components/forms/LeadForm";

/**
 * Bespoke page for the Practice Sale CGT calculator (law-firm-sale-cgt).
 *
 * Static sibling of /calculators/[slug]: it exists (rather than the generic
 * slug page) because this tool is PREMIUM (gated result detail via the
 * site-local gated renderer) and carries the roster-mandated SSR
 * worked-example block for citability. Copy, fields, compute and FAQs all
 * live in the single tool config. Static routes take precedence over the
 * [slug] dynamic route, so registry wiring (done later by the integrator)
 * will not double-render this page.
 */

// Figures below are hand-verified against calcPracticeSaleCgt
// (see docs: BADR 18% from 6 Apr 2026, AEA £3,000, CGT 18%/24%, band £37,700).
const workedExamples = [
  {
    heading: "Example 1: retiring partner sells a partnership interest",
    body: [
      "A partner retires from a trading LLP. The sale agreement allocates £850,000 to goodwill, £120,000 to WIP and £30,000 to tangible assets. Her base cost (capital contribution plus goodwill previously paid for) is £150,000. Her profit share this year is £85,000 and she has her full £1,000,000 BADR lifetime limit and £3,000 annual exempt amount available.",
      "The capital consideration is £880,000 (goodwill plus tangibles; the £120,000 WIP is an income receipt and stays outside CGT). Chargeable gain: £880,000 minus £150,000 = £730,000. Less the £3,000 annual exempt amount leaves a taxable gain of £727,000, all within the BADR limit, so CGT is £727,000 x 18% = £130,860.",
      "Net capital proceeds after CGT: £880,000 minus £130,860 = £749,140. The £120,000 for WIP is taxed separately as trading income at her income tax rates.",
    ],
  },
  {
    heading: "Example 2: share sale with part of the BADR limit already used",
    body: [
      "A sole shareholder sells his incorporated practice for £600,000 (reflecting £480,000 goodwill, £90,000 WIP and £30,000 tangibles). His base cost for the shares is £50,000. He claimed BADR on £600,000 of gains from an earlier disposal, leaving £400,000 of the lifetime limit. His other income this year is £45,000.",
      "Because this is a share sale, the whole £600,000 is capital, WIP included. Chargeable gain: £600,000 minus £50,000 = £550,000; less the £3,000 annual exempt amount = £547,000 taxable. The first £400,000 uses the remaining BADR allowance at 18% (£72,000). The BADR gain also uses up his remaining basic rate band, so the £147,000 balance is all taxed at the 24% higher CGT rate (£35,280).",
      "Total CGT: £72,000 plus £35,280 = £107,280. Net proceeds after CGT: £600,000 minus £107,280 = £492,720.",
    ],
  },
];

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: `${siteConfig.url}/calculators/${tool.slug}` },
  openGraph: {
    title: tool.metaTitle,
    description: tool.metaDescription,
    url: `${siteConfig.url}/calculators/${tool.slug}`,
    type: "website",
  },
};

export default function LawFirmSaleCgtPage() {
  const webApp = buildWebApplication({
    name: tool.metaTitle,
    description: tool.metaDescription,
    path: `/calculators/${tool.slug}`,
    applicationCategory: "FinanceApplication",
  });
  const faqSchema =
    tool.faqs && tool.faqs.length > 0
      ? buildFaqPage(tool.faqs.map((f) => ({ question: f.question, answer: f.answer })))
      : null;

  return (
    <>
      <JsonLd data={faqSchema ? [webApp, faqSchema] : [webApp]} />

      <section className="relative overflow-hidden bg-slate-900 py-12 sm:py-16">
        <SolicitorsBackdrop tone="navy" />
        <div className={`${siteContainerLg} relative z-10`}>
          <Breadcrumb
            variant="light"
            items={[
              { label: "Home", href: "/" },
              { label: "Calculators", href: "/calculators" },
              { label: tool.name },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <Eyebrow onDark>Free calculator · UK 2026/27</Eyebrow>
            <h1 className="text-3xl font-bold leading-[1.15] text-white sm:text-5xl lg:text-6xl">
              {tool.name}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-200 sm:text-lg">
              {tool.intro}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <LawFirmSaleCgtCalculator />
          <CalculatorPageResources slug={tool.slug} pageTitle={tool.name} />
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
            {tool.explainer.heading}
          </h2>
          <Prose>
            {tool.explainer.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Prose>
        </div>
      </section>

      {/* SSR worked-example block (roster C2 citability requirement). */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
            Worked examples
          </h2>
          <div className="mt-8 space-y-6">
            {workedExamples.map((ex) => (
              <article
                key={ex.heading}
                className="rounded-xl bg-white p-6 ring-1 ring-slate-200/70 sm:p-8"
              >
                <h3 className="text-lg font-bold text-slate-900">{ex.heading}</h3>
                {ex.body.map((p, i) => (
                  <p key={i} className="mt-3 text-base leading-relaxed text-slate-700">
                    {p}
                  </p>
                ))}
                <ExampleFigureNote className="mt-4" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <div id="get-expert-help" className="scroll-mt-24">
        <LeadCTAPanel
          title="Planning an exit or succession?"
          description="This calculator gives directional figures based on published 2026/27 rates. The real answer depends on BADR eligibility for each seller, the goodwill and WIP allocation in the sale agreement, your partnership or shareholders' agreement, and timing. A firm from our partner network models the full picture, including income tax on WIP, as part of the exit planning work."
          proofPoints={LEAD_PROOF_POINTS}
          form={<LeadForm redirectOnSuccess={false} />}
          backdrop={<SolicitorsBackdrop tone="navy" />}
          footnote={
            /* The live `calculator-page-cta` element, kept verbatim: LeadForm
               carries no data-cta, so retiring this link would fork the
               vw_cta_performance series (plan T22/R4). */
            <Link
              href="/contact"
              className={`inline-flex min-h-11 items-center justify-center rounded-full border-2 border-white px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white hover:text-[var(--primary)] ${focusRing}`}
              data-cta="calculator-page-cta"
              data-cta-goal="form"
              data-cta-placement="calculator"
            >
              {tool.ctaLabel ?? "Book a free consultation"}
            </Link>
          }
        />
      </div>

      {tool.faqs && tool.faqs.length > 0 && (
        /* Light band between the navy panel and the navy footer (DS 0.1).
           Deliberately a plain <dl>, not the kit accordion: that component
           escapes HTML in answers and keeps closed answers out of the server
           HTML. One array feeds this and the FAQPage JSON-LD. */
        <section className="bg-white py-12 sm:py-16 lg:py-20">
          <div className={siteContainerLg}>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
              Frequently asked questions
            </h2>
            <dl className="mt-8 space-y-4">
              {tool.faqs.map((f) => (
                <div
                  key={f.question}
                  className="rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70"
                >
                  <dt className="text-lg font-bold text-slate-900">{f.question}</dt>
                  <dd className="mt-3 text-base leading-relaxed text-slate-700">{f.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}
    </>
  );
}
