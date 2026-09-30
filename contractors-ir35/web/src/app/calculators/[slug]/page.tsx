import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalculatorClient } from "@/components/calculators/CalculatorClient";
import { CalcResultCta } from "@/components/calculators/CalcResultCta";
import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { siteContainerLg, btnPrimary } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildCalculatorJsonLd } from "@/lib/calculator-schema";
import { buildFaqJsonLd } from "@/lib/schema";
import { genericTools, getGenericTool } from "@/lib/calculators/registry";
import { CalculatorPageResources } from "@/components/resources/CalculatorPageResources";
import ContractorsBackdrop from "@/components/layout/ContractorsBackdrop";

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

/**
 * FAQs are rendered as plain h3 + p pairs on purpose. `FaqSection` is a Radix
 * accordion with no `forceMount`, so a closed answer leaves the server HTML
 * while `buildFaqJsonLd` still asserts it. Banned on this site by written
 * decision; the schema below and the visible copy read the same array.
 */
export default async function CalculatorToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getGenericTool(slug);
  if (!tool) notFound();

  const faqJsonLd = tool.faqs && tool.faqs.length > 0 ? buildFaqJsonLd(tool.faqs) : null;

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
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: faqJsonLd }}
        />
      )}

      {/* Hero. Mono eyebrow, not the `.eyebrow` class: that rule is
          `@layer components` in globals.css and pins `color: var(--accent)`
          #0e7490, which measures 3.35-3.69 on this site's dark grounds. Being
          layered, a `text-*` utility now DOES beat it; the hand-roll is kept
          because it needs no override at all. primary-400 #22d3ee on
          neutral-900 = 9.92. */}
      <section className="relative overflow-hidden bg-neutral-900 py-12 sm:py-16">
        <ContractorsBackdrop />
        <div className={`${siteContainerLg} relative z-10`}>
          <Breadcrumb
            siteUrl={siteConfig.url}
            onDark
            items={[
              { label: "Home", href: "/" },
              { label: "Calculators", href: "/calculators" },
              { label: tool.name },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-primary-400">
              Free calculator
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {tool.name}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-neutral-300">{tool.intro}</p>
            <Link
              href="#book"
              className={`${btnPrimary} mt-8 rounded-xl`}
              data-cta="hero_book"
              data-cta-placement="hero"
              data-cta-goal="form"
            >
              Book a free call
            </Link>
          </div>
        </div>
      </section>

      {/* The tool. §0.4: a section whose whole content is a tool already
          carries its visual. §6a: the container IS the measure, no clamp. */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <CalculatorClient
            slug={tool.slug}
            variant="page"
            resultCta={<CalcResultCta campaign={tool.slug} />}
          />
          <CalculatorPageResources slug={tool.slug} />
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-4xl">
            {tool.explainer.heading}
          </h2>
          <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-neutral-700">
            {tool.explainer.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {tool.related && tool.related.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-bold text-neutral-900">Related reading and tools</h3>
              {/* §0.4: "a calculator never gets a related-reading card", and
                  these entries point at sibling /calculators/<slug> routes.
                  Pre-port this was a <ul><li><a> bullet list; the list form is
                  restored and only the link colour is restyled to the ramp.
                  CalculatorTabs, the remedy §0.4 prescribes, does not exist on
                  this site (see calculator-crawl-path.test.ts). */}
              <ul className="mt-3 list-disc space-y-2 pl-5 text-base text-neutral-700">
                {tool.related.map((r) => (
                  <li key={r.href}>
                    <a
                      href={r.href}
                      className="font-semibold text-primary-600 underline underline-offset-2 hover:text-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                    >
                      {r.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tool.faqs && tool.faqs.length > 0 && (
            <div className="mt-14">
              <h2 className="text-2xl font-bold text-neutral-900 sm:text-4xl">
                Frequently asked questions
              </h2>
              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                {tool.faqs.map((f, i) => (
                  <div key={i} className="rounded-xl bg-white p-6 ring-1 ring-neutral-200/70">
                    <h3 className="text-lg font-bold text-neutral-900">{f.question}</h3>
                    <p className="mt-2 text-base leading-relaxed text-neutral-700">{f.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Closing ask, `contained` on a white ground so it alternates with the
          slate-50 section above and no dark band touches the dark footer.
          `proofPoints` intentionally EMPTY: Property's own call site passes a
          fixed-fee claim and a 24-hour response promise, both banned here. */}
      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          contained
          ground="white"
          eyebrow="Free call"
          title="Want to be sure of your position?"
          description="A calculator gives you the shape of the answer. We confirm your exact figure, your IR35 status and the reliefs that apply to you. Tell us about your situation for a no-obligation review."
          proofPoints={[]}
          formTitle="Book your free call"
          form={<LeadForm redirectOnSuccess={false} submitLabel="Request a review" />}
          footnote={
            <>
              No obligation. If you would rather write to us first, use the{" "}
              <Link
                href="/contact"
                className="font-semibold text-primary-600 underline hover:text-primary-700"
              >
                contact form
              </Link>
              .
            </>
          }
        />
      </div>
    </>
  );
}
