import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { Calculator as CalcIcon } from "lucide-react";
import { JsonLd, buildWebApplication, buildFaqPage } from "@/lib/schema";
import { CalculatorClient } from "@/components/tools/CalculatorClient";
import { getGenericTool, allTools } from "@/lib/tools/registry";
import { CalculatorPageResources } from "@/components/resources/CalculatorPageResources";
import { humaniseKey, formatValue } from "@/lib/worked-example-format";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { MedicalBackdrop } from "@/components/layout/MedicalBackdrop";
import { LeadForm } from "@/components/forms/LeadForm";
import Link from "next/link";

export const dynamicParams = false;

export function generateStaticParams() {
  return allTools()
    .filter((t) => t.kind === "generic")
    .map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getGenericTool(slug);
  if (!tool) return {};
  return {
    title: tool.metaTitle,
    description: tool.metaDescription,
    alternates: { canonical: `${siteConfig.url}/calculators/${slug}` },
    openGraph: {
      title: tool.metaTitle,
      description: tool.metaDescription,
      url: `${siteConfig.url}/calculators/${slug}`,
      type: "website",
      images: [{ url: `/api/og?title=${encodeURIComponent(tool.metaTitle)}`, width: 1200, height: 630, alt: tool.metaTitle }],
    },
  };
}

export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getGenericTool(slug);
  if (!tool) notFound();

  const webApp = buildWebApplication({
    name: tool.metaTitle,
    description: tool.metaDescription,
    path: `/calculators/${slug}`,
    applicationCategory: "FinanceApplication",
  });
  const faqSchema =
    tool.faqs && tool.faqs.length > 0
      ? buildFaqPage(tool.faqs.map((f) => ({ question: f.question, answer: f.answer })))
      : null;

  return (
    <>
      <JsonLd data={faqSchema ? [webApp, faqSchema] : [webApp]} />

      <section className="relative overflow-hidden bg-[var(--navy)] py-12 sm:py-16">
        <MedicalBackdrop />
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
            {/* --btn-ground, not raw copper: white on #b87333 measures 3.79 against a
                4.5 floor and this chip carries 12px bold text, not a graphic. */}
            <div className="inline-flex items-center gap-2 bg-[var(--btn-ground)] px-3 py-1.5 text-xs font-bold text-white uppercase tracking-wider mb-4">
              <CalcIcon className="h-3.5 w-3.5" />
              Free calculator
            </div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{tool.name}</h1>
            <p className="mt-4 text-lg text-white/80 leading-relaxed">{tool.intro}</p>
            <a
              href="#get-expert-help"
              className="mt-6 inline-block border-b-4 border-[var(--copper-deep)] bg-[var(--btn-ground)] px-8 py-3 text-base font-bold text-white transition-all hover:bg-[var(--btn-ground-hover)]"
              data-cta="calc_hero_help"
              data-cta-goal="form"
              data-cta-placement="calculator_hero"
            >
              Ask a medical accountant about your figure
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            {/* slug only — the function-bearing tool config resolves client-side (RSC lesson) */}
            <CalculatorClient slug={slug} variant="page" />

            {/* ResourceGate island: "Go deeper" section below the calculator.
                Renders only when a resource is enabled for the calculator's topic.
                captureMode "email_only" and extras {resource_gate:true} are set inside
                CalculatorPageResources -> ResourceGate. No-op for unmatched slugs. */}
            <CalculatorPageResources slug={slug} pageTitle={tool.metaTitle} />

            {tool.explainer && (
              <div className="mt-12 border-l-4 border-[var(--copper)] bg-slate-50 p-6 sm:p-8">
                <h2 className="text-xl font-bold text-slate-900">{tool.explainer.heading}</h2>
                {tool.explainer.paragraphs.map((p, i) => (
                  <p key={i} className="mt-3 text-base text-slate-700 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            )}

            {tool.workedExamples && tool.workedExamples.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl font-bold text-slate-900">Worked examples</h2>
                <div className="mt-6 space-y-8">
                  {tool.workedExamples.map((ex, i) => {
                    const heading = "title" in ex ? ex.title : ex.heading;
                    const description = "description" in ex ? ex.description : undefined;
                    const steps = "steps" in ex ? ex.steps : undefined;
                    const result = "result" in ex ? ex.result : undefined;
                    return (
                      <div key={i}>
                        <h3 className="text-lg font-bold text-slate-900">{heading}</h3>
                        {description && (
                          <p className="mt-2 text-base text-slate-700 leading-relaxed">{description}</p>
                        )}
                        {steps && steps.length > 0 && (
                          <ol className="mt-2 list-decimal list-inside space-y-1 text-base text-slate-700 leading-relaxed">
                            {steps.map((s, j) => (
                              <li key={j}>{s}</li>
                            ))}
                          </ol>
                        )}
                        {result && (
                          <ul className="mt-2 list-disc list-inside space-y-1 text-base text-slate-700 leading-relaxed">
                            {Object.entries(result).map(([k, val]) => (
                              <li key={k}>
                                <span className="font-medium">{humaniseKey(k)}:</span>{" "}
                                {formatValue(k, val)}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {tool.faqs && tool.faqs.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently asked questions</h2>
                <dl className="space-y-4">
                  {tool.faqs.map((f) => (
                    <div key={f.question} className="border-l-4 border-slate-300 bg-slate-50 p-6">
                      <dt>
                        <h3 className="text-lg font-bold text-slate-900">{f.question}</h3>
                      </dt>
                      <dd className="mt-3 text-base text-slate-700 leading-relaxed">{f.answer}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

          </div>
        </div>
      </section>

      {/* NET-NEW: `tool.related` shipped as dead data until now. Six of the ten
          configs carry it; the four without render nothing. Plain links, not
          cards: 12 of the 15 entries point at another calculator, and a
          calculator is never a card (rollout §0.4). Hrefs are authored flat
          (`/blog/<slug>`), which is this site's blog URL shape. */}
      {tool.related && tool.related.length > 0 && (
        <section className="bg-slate-50 py-12 sm:py-16">
          <div className={siteContainerLg}>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Related tools and reading</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {tool.related.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    className="block rounded-xl bg-white px-5 py-4 text-base font-semibold text-slate-900 ring-1 ring-slate-200 transition-all hover:text-[var(--copper-strong)] hover:ring-[var(--copper)]"
                    data-cta={`calculator-related-${slug}`}
                    data-cta-placement="calculator_related"
                  >
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Per-route cta id, never a shared one: vw_cta_performance groups
          without page_path, so a reused id silently merges all ten
          calculators into one uninterpretable row (rollout doc trap 6).
          Same pattern as calculators/page.tsx (calculator-gallery-<slug>).
          Split from the shared "calculator-page-cta" on 2026-08-26. The id and
          both data-cta-* values are carried verbatim off the retired navy box;
          autoCapture resolves them with closest("[data-cta]"), so the wrapper
          tags every click inside the panel, submit included.
          `contained` because nothing follows this panel but the navy footer. */}
      <div
        id="get-expert-help"
        className="scroll-mt-24"
        data-cta={`calculator-page-cta-${slug}`}
        data-cta-goal="form"
        data-cta-placement="calculator"
      >
        <LeadCTAPanel
          contained
          ground={tool.related && tool.related.length > 0 ? "white" : "slate"}
          title="Need help interpreting your result?"
          description="These calculators give a simplified estimate on standard rates. Your actual position depends on your NHS pension record, carry-forward entitlement, IR35 status and income from all sources. Send your position and we will match you with a firm that reads the full picture."
          proofPoints={MEDICAL_PROOF_POINTS}
          formTitle={tool.ctaLabel ?? "Book a free consultation"}
          footnote="No obligation and no hard sell. If the specialist firm thinks your position is already right, they will tell you so."
          form={<LeadForm redirectOnSuccess={false} submitLabel="Ask a medical accountant" />}
        />
      </div>
    </>
  );
}

/** Closing-panel proof points. Mechanisms only: no fee, no turnaround, no
 *  client count, and nothing that implies an in-house team does the work. */
const MEDICAL_PROOF_POINTS = [
  { title: "Medical work only", detail: "NHS pension, practice accounts and private practice" },
  { title: "Matched to a specialist firm", detail: "Your enquiry goes to accountants who work with doctors" },
  { title: "One position, not three", detail: "Practice, pension and personal return read together" },
];
