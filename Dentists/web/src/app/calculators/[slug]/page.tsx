import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { btnGold, sectionY, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteConfig } from "@/config/site";
import { JsonLd, buildWebApplication, buildFaqPage } from "@/lib/schema/index";
import { CalculatorClient } from "@/components/tools/CalculatorClient";
import { CalculatorPageResources } from "@/components/resources/CalculatorPageResources";
import { getGenericTool, allTools } from "@/lib/tools/registry";

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
    alternates: {
      canonical: `${siteConfig.url}/calculators/${slug}`,
      languages: {
        "en-GB": `${siteConfig.url}/calculators/${slug}`,
        "x-default": `${siteConfig.url}/calculators/${slug}`,
      },
    },
    openGraph: {
      title: tool.metaTitle,
      description: tool.metaDescription,
      url: `${siteConfig.url}/calculators/${slug}`,
      type: "website",
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

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Calculators", href: "/calculators" },
    { label: tool.name },
  ];

  return (
    <>
      <JsonLd data={faqSchema ? [webApp, faqSchema] : [webApp]} />

      <section className="bg-[var(--navy)] text-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <Breadcrumb items={breadcrumbItems} variant="light" />
          <div className="mt-8 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--gold)]">
              Free calculator · UK 2026/27 rates
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-4xl">
              {tool.name}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">{tool.intro}</p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-3xl">
            {/* slug only — the function-bearing tool config resolves client-side */}
            <CalculatorClient slug={slug} variant="page" />
            {/* R3: additive resource gate; renders nothing when no asset is available for this topic */}
            <CalculatorPageResources slug={slug} pageTitle={tool.name} />
          </div>
        </div>
      </section>

      {tool.explainer && (
        <section className="bg-[var(--background)]">
          <div className={`${siteContainerLg} ${sectionY}`}>
            <div className="mx-auto max-w-3xl rounded-2xl border-l-4 border-[var(--gold)] bg-white p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-[var(--ink)]">
                {tool.explainer.heading}
              </h2>
              {tool.explainer.paragraphs.map((p, i) => (
                <p key={i} className="mt-3 text-base leading-relaxed text-[var(--ink-soft)]">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}

      {tool.faqs && tool.faqs.length > 0 && (
        <section className="bg-[var(--background)]">
          <div className={`${siteContainerLg} ${sectionY}`}>
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
                Frequently asked
              </h2>
              <dl className="mt-8 space-y-5">
                {tool.faqs.map((f) => (
                  <div
                    key={f.question}
                    className="rounded-2xl border-l-4 border-[var(--gold)] bg-white p-6"
                  >
                    <dt className="text-lg font-semibold text-[var(--ink)]">
                      {f.question}
                    </dt>
                    <dd className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">
                      {f.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      )}

      <section className="bg-[var(--navy)] text-white">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">
              Get the full picture
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">
              Every figure here is modelled on standard 2026/27 thresholds. Your actual position
              depends on your NHS Pension status, prior-year usage, other income, and how decisions
              interact. Take the free practice health check to get a personalised view.
            </p>
            <div className="mt-8">
              {/* btnGold: this section's ground is --navy. The navy-ground/white-label recipe
                  would put navy on navy here, 1.00 against the section behind it, which is the
                  defect phase 1 shipped on the hero. Gold ground with a navy label is 6.23 on
                  navy. Measure against the SECTION ground, not against the label. */}
              <Link
                href="/free-practice-health-check"
                className={btnGold}
                data-cta="calculator-page-cta"
                data-cta-placement="calculator_page"
                data-cta-goal="health_check"
              >
                Take the free practice health check
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Approved end-of-page enquiry panel. Last, after the navy band above it, and
          `contained` on a white ground: the footer is navy, so a full-bleed navy panel here
          would run straight into it and read as one slab. Not a gate and nothing
          interruptive: the reader has already seen their result and the existing in-flow
          capture before they reach this.
          Property's proofPoints ("Fixed fees, quoted upfront", "24-hour response") are NOT
          copied: pricing and turnaround claims are banned on this site. */}
      <div id="get-expert-help" className="scroll-mt-24">
        <LeadCTAPanel
          contained
          ground="white"
          eyebrow="Before you act on this"
          title="Check this against your real position"
          description="A calculator works from the figures you type into it. Your actual position also depends on your NHS Pension record, how the practice is set up, and what you are planning next. Tell us where you are and we will come back with a clear view of your options. No obligation, and if what you are doing already suits you we will say so."
          proofPoints={[
            {
              title: "Built around dental income",
              detail: "NHS pension, UDAs and the private mix read together",
            },
            {
              title: "Your figures, not a template",
              detail: "We work from your accounts and your pension record",
            },
            {
              title: "The reasoning, not just the number",
              detail: "You see how the answer was reached",
            },
          ]}
          formTitle="Tell us about your practice"
          form={<LeadForm redirectOnSuccess={false} submitLabel="Request a review" />}
        />
      </div>
    </>
  );
}
