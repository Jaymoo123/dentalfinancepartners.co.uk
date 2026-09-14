import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { CalculatorClient } from "@/components/calculators/CalculatorClient";
import { CalcResultCta } from "@/components/calculators/CalcResultCta";
import { MiniCapture } from "@/components/calculators/MiniCapture";
import { buildCalculatorJsonLd, buildFaqPageJsonLd } from "@/lib/calculators/schema";
import { genericTools, getGenericTool } from "@/lib/calculators/registry";
import { site } from "@/lib/calculators/site";
import { sectionY, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";

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

      {/* Hero. The hand-rolled "Home / Calculators / name" text trail is now the
          kit Breadcrumb: a real nav landmark with an ordered list, a 24px hit
          area on the links, and the BreadcrumbList JSON-LD the text trail never
          emitted. The shell owns <main>, so this page opens on a section. */}
      <section className="border-b border-neutral-200 bg-[#0e1a3a]">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Calculators", href: "/calculators" },
              { label: tool.name },
            ]}
            siteUrl={site.url}
            onDark
          />
          <div className="max-w-3xl">
            <Eyebrow onDark>{tool.category}</Eyebrow>
            <h1 className="text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl">
              {tool.name}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">{tool.intro}</p>
          </div>
        </div>
      </section>

      {/* The tool. Full container, no inner clamp: a narrower box here would put
          the calculator's edges out of line with the explainer below it, and the
          result rows need the width. Everything inside this section is
          client-rendered and is NOT in the static HTML. */}
      <section className="bg-slate-50">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <CalculatorClient
            slug={tool.slug}
            variant="page"
            resultCta={<CalcResultCta campaign={tool.slug} />}
          />
        </div>
      </section>

      <section className="bg-white">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <h2 className="max-w-3xl text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {tool.explainer.heading}
          </h2>
          <div className="mt-8 max-w-3xl space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            {tool.explainer.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ. Native <details>/<summary>, the same treatment /services/[slug]
          carries, and deliberately NOT the kit's Radix accordion: that accordion
          has no `forceMount`, so a closed answer is absent from the server HTML
          while the FAQPage JSON-LD above still asserts it. <details> keeps every
          asserted answer in the served markup. */}
      {tool.faqs && tool.faqs.length > 0 && (
        <section className="bg-slate-50">
          <div className={`${siteContainerLg} ${sectionY}`}>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Frequently asked questions
            </h2>
            <div className="mt-10 space-y-4">
              {tool.faqs.map((f) => (
                <details key={f.question} className="group rounded-xl bg-white ring-1 ring-slate-200/70">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-base font-bold text-slate-900 transition-colors hover:text-primary-700">
                    <span>{f.question}</span>
                    <span
                      className="flex-shrink-0 text-primary-700 transition-transform group-open:rotate-45"
                      aria-hidden
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                      </svg>
                    </span>
                  </summary>
                  <div className="border-t border-slate-200 px-6 pb-6 pt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                    {f.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Closing ask. The second and last capture surface on this page; the
          first is the one CalcResultCta mounts under the result. Neither is new
          and neither interrupts: both are in flow. White ground so the navy
          footer does not follow a navy section. */}
      <section className="bg-white">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div id="get-expert-help" className="scroll-mt-24">
            <MiniCapture
              formId="calc_page_footer"
              messagePrefix={`[Calculator page: ${tool.slug}]`}
              heading="Want to be sure of your position?"
              blurb="Tell us about your crypto situation and we will confirm your exact figures and the compliance steps that apply to you. No obligation."
              submitLabel="Request a review"
            />
          </div>
        </div>
      </section>
    </>
  );
}
