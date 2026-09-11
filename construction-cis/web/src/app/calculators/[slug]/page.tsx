import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalculatorClient } from "@/components/calculators/CalculatorClient";
import { CalcResultCta } from "@/components/calculators/CalcResultCta";
import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg, btnPrimary } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildCalculatorJsonLd } from "@/lib/calculator-schema";
import { buildFaqPageJsonLd } from "@/lib/faq-page-schema";
import { genericTools, getGenericTool } from "@/lib/calculators/registry";
import { CalculatorPageResources } from "@/components/resources/CalculatorPageResources";

type Props = { params: Promise<{ slug: string }> };

// Only the generic registry slugs exist here; bespoke tools have their own
// static routes which take precedence, and unknown slugs 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return genericTools().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getGenericTool(slug);
  if (!tool) return {};
  const canonical = `${siteConfig.url}/calculators/${tool.slug}`;
  return {
    title: tool.metaTitle,
    description: tool.metaDescription,
    alternates: { canonical },
    openGraph: { title: tool.metaTitle, description: tool.oneLiner, url: canonical, type: "website" },
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

      <section className="bg-slate-900 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Calculators", href: "/calculators" },
              { label: tool.name },
            ]}
          />
          <h1 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{tool.name}</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">{tool.intro}</p>
          {/* The page already carried a LeadForm at #get-expert-help that nothing pointed at.
              Same fix Phase 3 made on /for/[slug]: the hero primary reaches the on-page ask
              instead of leaving the page. In-page anchor, so it scores zero unique internal
              links against the T14 floor. goal="form" per the site taxonomy (on-page form
              anchor), matching for_hero_book and next_step's own /contact branch. */}
          <div className="mt-8">
            <Link
              href="#get-expert-help"
              data-cta="calc_hero_help"
              data-cta-placement="hero"
              data-cta-goal="form"
              className={`${btnPrimary} text-base px-8 py-3.5 text-center`}
            >
              Get expert help with your figures
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <CalculatorClient slug={tool.slug} variant="page" resultCta={<CalcResultCta campaign={tool.slug} />} />
          <CalculatorPageResources slug={tool.slug} />
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">{tool.explainer.heading}</h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
              {tool.explainer.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {tool.workedExamples && tool.workedExamples.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
                  Worked examples
                </h2>
                <div className="mt-6 space-y-8">
                  {tool.workedExamples.map((ex, i) => {
                    const heading = "title" in ex ? ex.title : "heading" in ex ? ex.heading : "";
                    const description = "description" in ex ? ex.description : undefined;
                    const steps = "steps" in ex ? ex.steps : undefined;
                    const result = "result" in ex ? ex.result : undefined;
                    return (
                      <div key={i}>
                        <h3 className="text-lg font-bold text-slate-900">{heading}</h3>
                        {description && (
                          <p className="mt-2 text-base leading-relaxed text-slate-700">{description}</p>
                        )}
                        {steps && steps.length > 0 && (
                          <ol className="mt-2 list-decimal list-inside space-y-1 text-base leading-relaxed text-slate-700">
                            {steps.map((s, j) => <li key={j}>{s}</li>)}
                          </ol>
                        )}
                        {result && (
                          <ul className="mt-2 list-disc list-inside space-y-1 text-base leading-relaxed text-slate-700">
                            {Object.entries(result).map(([k, val]) => (
                              <li key={k}><span className="font-medium">{k}:</span> {String(val)}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {tool.faqs && tool.faqs.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
                  Frequently asked questions
                </h2>
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

            <div
              id="get-expert-help"
              className="mt-12 scroll-mt-24 rounded-2xl border-2 border-[var(--accent-strong)] bg-[var(--accent-whisper)] p-8 sm:p-10"
            >
              <h2 className="text-2xl font-bold text-[var(--accent-strong)] sm:text-4xl">
                Want to be sure of your position?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-700">
                A calculator gives you the shape of the answer. We confirm your exact figure and the
                reliefs that apply to you. Tell us about your situation for a no-obligation review.
              </p>
              <div className="mt-8">
                <LeadForm redirectOnSuccess={false} submitLabel="Request a review" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
