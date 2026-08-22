import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalculatorClient } from "@/components/calculators/CalculatorClient";
import { CalculatorPageResources } from "@/components/resources/CalculatorPageResources";
import { LeadCTAPanel } from "@/components/property/LeadCTAPanel";
import { FaqSection } from "@/components/ui/FaqSection";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Eyebrow, Prose } from "@/components/ui/page-blocks";
import { siteConfig } from "@/config/site";
import { buildCalculatorJsonLd } from "@/lib/calculator-schema";
import { buildFaqPageJsonLd } from "@/lib/faq-page-schema";
import { genericTools, getGenericTool } from "@/lib/calculators/registry";

type Props = { params: Promise<{ slug: string }> };

// Only the generic registry slugs exist here; the original five have their own
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
            onDark
            items={[
              { label: "Home", href: "/" },
              { label: "Calculators", href: "/calculators" },
              { label: tool.name },
            ]}
          />
          <h1 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{tool.name}</h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-300">{tool.intro}</p>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16">
        {/* No inner clamp: `max-w-5xl` left the calculator 64px narrower than
            every other section on the page, so its left and right edges did not
            line up with the heading above it or the FAQ below. */}
        <div className={siteContainerLg}>
          <CalculatorClient slug={tool.slug} variant="page" />
          <CalculatorPageResources slug={tool.slug} />
        </div>
      </section>

      {/* Body copy runs the full container width, like every other body section
          on the site. It used to sit in a `max-w-3xl` box, which is the measure
          the resources pages reserve for HERO paragraphs only.

          CARVE-OUT 5: the worked examples below are OURS. The designer's version
          of this page has no `workedExamples` block at all, because it predates
          Waves 11 and 12. Seven tools populate it today, so taking their page
          whole would silently delete authored content from seven pages. */}
      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">{tool.explainer.heading}</h2>
          <Prose>
            {tool.explainer.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Prose>

          {tool.workedExamples && tool.workedExamples.length > 0 && (
            <div className="mt-12">
              <Eyebrow>Worked examples</Eyebrow>
              <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
                How the numbers come out
              </h2>
              <div className="mt-6 space-y-8">
                {tool.workedExamples.map((ex, i) => {
                  const heading = "title" in ex ? ex.title : ex.heading;
                  const description = "description" in ex ? ex.description : undefined;
                  const inputs = "inputs" in ex ? ex.inputs : undefined;
                  const steps = "steps" in ex ? ex.steps : undefined;
                  const result = "result" in ex ? ex.result : undefined;
                  return (
                    <div key={i}>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">{heading}</h3>
                      {description && (
                        <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-700">
                          {description}
                        </p>
                      )}
                      {typeof inputs === "string" && (
                        <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-700">{inputs}</p>
                      )}
                      {steps && steps.length > 0 && (
                        <ol className="mt-2 list-decimal space-y-1 pl-6 text-sm sm:text-base leading-relaxed text-slate-700">
                          {steps.map((s, j) => (
                            <li key={j}>{s}</li>
                          ))}
                        </ol>
                      )}
                      {result && (
                        <ul className="mt-2 list-disc space-y-1 pl-6 text-sm sm:text-base leading-relaxed text-slate-700">
                          {Object.entries(result).map(([k, val]) => (
                            <li key={k}>
                              <span className="font-medium">{k}:</span> {String(val)}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CARVE-OUT 5, the binding half. `tool.related` is a set of crawlable
          internal links into the blog clusters, shipped by Waves 11 and 12 and
          absent from the designer's page. The link floor is the one thing in
          this migration that is genuinely hard to rebuild, so this block is
          restored rather than styled away. */}
      {tool.related && tool.related.length > 0 && (
        <section className="bg-slate-50 py-12 sm:py-16">
          <div className={siteContainerLg}>
            <Eyebrow>Related reading</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">Read further on this</h2>
            <ul className="mt-6 space-y-2 text-sm sm:text-base leading-relaxed">
              {tool.related.map((r) => (
                <li key={r.href}>
                  <a
                    href={r.href}
                    className="inline-block py-0.5 font-semibold text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
                  >
                    {r.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Was a pale mint gradient card holding a bare LeadForm, boxed to
          `max-w-3xl` at the very foot of the page: the least assertive block on
          a page whose reader has just typed their own figures in. Now the same
          full-bleed navy brick panel every other page converts on.

          It sits ABOVE the FAQ deliberately. LeadCTAPanel's adjacency rule is
          that navy must not land on navy, and the footer is slate-900 carrying
          the same brick backdrop, so a panel placed last would merge into it.
          The white FAQ below is what separates them. This is the same tail order
          as /landlord-tax and /property-tax-rates: panel, FAQ, footer. If the FAQ
          is ever made conditional here, re-check this. Every generic tool in the
          registry currently defines `faqs`, which is why the section below is
          unconditional.

          `id` is kept: StampDutyCalculator links to #get-expert-help. */}
      <div id="get-expert-help" className="scroll-mt-24">
        <LeadCTAPanel
          eyebrow="Free review"
          title="Want to be sure of your position?"
          description="A calculator gives you the shape of the answer. We confirm your exact figure and the reliefs that apply to you. Tell us about your situation for a no-obligation review."
          proofPoints={[
            { title: "Property tax only", detail: "Section 24, CGT and MTD every day" },
            { title: "Fixed fees, quoted upfront", detail: "In writing, before any work starts" },
            { title: "24-hour response", detail: "Usually the same working day" },
          ]}
          submitLabel="Request a review"
          footnote="No obligation and no hard sell. If your position is already right, we will say so."
          redirectOnSuccess={false}
        />
      </div>

      <FaqSection faqs={tool.faqs ?? []} title="Frequently asked questions" />
    </>
  );
}
