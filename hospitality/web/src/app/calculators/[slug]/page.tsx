import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalculatorClient } from "@/components/calculators/CalculatorClient";
import { CalcResultCta } from "@/components/calculators/CalcResultCta";
import { MiniCapture } from "@/components/calculators/MiniCapture";
import { buildCalculatorJsonLd, buildFaqPageJsonLd } from "@/lib/calculators/schema";
import { genericTools, getGenericTool } from "@/lib/calculators/registry";
import { site } from "@/lib/calculators/site";

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

      <main>
        <section className="bg-[var(--brand-primary)] py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-6">
            <nav className="text-sm text-white/70">
              <Link href="/" className="hover:text-white">
                Home
              </Link>{" "}
              /{" "}
              <Link href="/calculators" className="hover:text-white">
                Calculators
              </Link>{" "}
              / <span className="text-white">{tool.name}</span>
            </nav>
            <h1 className="mt-6 text-3xl font-bold text-white sm:text-4xl">{tool.name}</h1>
            <p className="mt-4 max-w-2xl text-lg text-white/85">{tool.intro}</p>
          </div>
        </section>

        <section className="bg-[var(--surface)] py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-6">
            <CalculatorClient slug={tool.slug} variant="page" resultCta={<CalcResultCta campaign={tool.slug} />} />
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

            {tool.faqs && tool.faqs.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-[var(--ink)] sm:text-3xl">Frequently asked questions</h2>
                <div className="mt-6 space-y-6">
                  {tool.faqs.map((f, i) => (
                    <div key={i}>
                      <h3 className="text-lg font-bold text-[var(--ink)]">{f.question}</h3>
                      <p className="mt-2 text-base leading-relaxed text-[var(--ink-soft)]">{f.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div id="get-expert-help" className="mt-12 scroll-mt-24">
              <MiniCapture
                formId="calc_page_footer"
                messagePrefix={`[Calculator page: ${tool.slug}]`}
                heading="Want to be sure of your position?"
                blurb="Tell us about your hospitality business and we will confirm your exact figures and the compliance steps that apply to you. No obligation."
                submitLabel="Request a review"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
