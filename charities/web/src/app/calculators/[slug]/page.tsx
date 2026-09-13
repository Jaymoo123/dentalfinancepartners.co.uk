import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { siteContainerLg, contentNarrow } from "@/components/ui/layout-utils";
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

      {/* No page-level <main>: the kit PageShell in layout.tsx provides the one
          main landmark. */}
      <section className="bg-slate-50 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            {/* Kit Breadcrumb: same two crumbs as before, now with the
                BreadcrumbList JSON-LD the hand-rolled nav never emitted. */}
            <Breadcrumb
              siteUrl={site.url}
              items={[
                { label: "Home", href: "/" },
                { label: "Calculators", href: "/calculators" },
                { label: tool.name },
              ]}
            />
            <Eyebrow>{tool.category}</Eyebrow>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              {tool.name}
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">{tool.intro}</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <CalculatorClient
            slug={tool.slug}
            variant="page"
            resultCta={<CalcResultCta campaign={tool.slug} />}
          />
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className={contentNarrow}>
          <Eyebrow>How it works</Eyebrow>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {tool.explainer.heading}
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
            {tool.explainer.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {tool.faqs && tool.faqs.length > 0 && (
            <div className="mt-14">
              <Eyebrow>Questions</Eyebrow>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Frequently asked questions
              </h2>
              {/* h3 questions kept, not a dl: the published heading outline is
                  h1 > h2 > h3 and a dt is not a heading. */}
              <div className="mt-6 space-y-6">
                {tool.faqs.map((f, i) => (
                  <div key={i} className="border-l-4 border-primary-600 pl-5">
                    <h3 className="text-base font-bold text-slate-900 sm:text-lg">{f.question}</h3>
                    <p className="mt-2 text-base leading-relaxed text-slate-700">{f.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Existing capture surface, unchanged: same formId, same wording, same
              position at the end of the page. */}
          <div id="get-expert-help" className="mt-14 scroll-mt-24">
            <MiniCapture
              formId="calc_page_footer"
              messagePrefix={`[Calculator page: ${tool.slug}]`}
              heading="Want to be sure of your position?"
              blurb="Tell us about your charity, CIC or social enterprise and we will confirm your exact figures and the filings that apply to you. No obligation."
              submitLabel="Request a review"
            />
          </div>
        </div>
      </section>
    </>
  );
}
