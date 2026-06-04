import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Calculator } from "@/components/calculators/Calculator";
import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
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
            items={[
              { label: "Home", href: "/" },
              { label: "Calculators", href: "/calculators" },
              { label: tool.name },
            ]}
          />
          <h1 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{tool.name}</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">{tool.intro}</p>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="max-w-5xl">
            <Calculator slug={tool.slug} variant="page" />
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{tool.explainer.heading}</h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
              {tool.explainer.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

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

            <div
              id="get-expert-help"
              className="mt-12 scroll-mt-24 border-2 border-emerald-600/20 bg-gradient-to-br from-emerald-50 to-teal-50 p-8 sm:p-10 rounded-2xl"
            >
              <h2 className="text-2xl font-bold text-emerald-700 sm:text-3xl">Want to be sure of your position?</h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                A calculator gives you the shape of the answer. We confirm your exact figure and the reliefs that
                apply to you. Tell us about your situation for a no-obligation review.
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
