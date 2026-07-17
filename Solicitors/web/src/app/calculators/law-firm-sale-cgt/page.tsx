import type { Metadata } from "next";
import Link from "next/link";
import { siteContainerLg, sectionY, sectionYLoose, focusRing } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { JsonLd, buildWebApplication, buildFaqPage } from "@/lib/schema";
import { CalculatorPageResources } from "@/components/resources/CalculatorPageResources";
import { LawFirmSaleCgtCalculator } from "@/components/tools/LawFirmSaleCgtCalculator";
import { lawFirmSaleCgtTool as tool } from "@/lib/tools/configs/law-firm-sale-cgt";

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

      <section className="bg-[var(--primary)] text-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <Breadcrumb
            variant="light"
            items={[
              { label: "Home", href: "/" },
              { label: "Calculators", href: "/calculators" },
              { label: tool.name },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/90">
              Free calculator · UK 2026/27
            </p>
            <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
              {tool.name}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">
              {tool.intro}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-4xl">
            <LawFirmSaleCgtCalculator />

            <div className="mt-12 rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8">
              <h2 className="font-serif text-xl font-semibold text-[var(--ink)]">
                {tool.explainer.heading}
              </h2>
              {tool.explainer.paragraphs.map((p, i) => (
                <p key={i} className="mt-3 text-base leading-relaxed text-[var(--ink-soft)]">
                  {p}
                </p>
              ))}
            </div>

            {/* SSR worked-example block (roster C2 citability requirement). */}
            <section className="mt-12">
              <h2 className="font-serif text-2xl font-semibold text-[var(--ink)]">
                Worked examples
              </h2>
              <div className="mt-6 space-y-6">
                {workedExamples.map((ex) => (
                  <article
                    key={ex.heading}
                    className="rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8"
                  >
                    <h3 className="font-serif text-lg font-semibold text-[var(--ink)]">
                      {ex.heading}
                    </h3>
                    {ex.body.map((p, i) => (
                      <p key={i} className="mt-3 text-base leading-relaxed text-[var(--ink-soft)]">
                        {p}
                      </p>
                    ))}
                  </article>
                ))}
              </div>
            </section>

            <CalculatorPageResources slug={tool.slug} pageTitle={tool.name} />

            {tool.faqs && tool.faqs.length > 0 && (
              <section className="mt-12">
                <h2 className="font-serif text-2xl font-semibold text-[var(--ink)]">
                  Frequently asked questions
                </h2>
                <dl className="mt-6 space-y-4">
                  {tool.faqs.map((f) => (
                    <div
                      key={f.question}
                      className="rounded-2xl border border-[var(--border)] bg-white p-6"
                    >
                      <dt className="font-serif text-lg font-semibold text-[var(--ink)]">
                        {f.question}
                      </dt>
                      <dd className="mt-3 text-base leading-relaxed text-[var(--ink-soft)]">
                        {f.answer}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            <div className="mt-12 rounded-2xl bg-[var(--primary)] p-8 text-white sm:p-10">
              <h2 className="font-serif text-2xl font-semibold text-white sm:text-3xl">
                Planning an exit or succession?
              </h2>
              <p className="mt-3 text-base leading-relaxed text-white/80 sm:text-lg">
                This calculator gives directional figures based on published 2026/27 rates. The real answer depends on BADR eligibility for each seller, the goodwill and WIP allocation in the sale agreement, your partnership or shareholders&apos; agreement, and timing. We model the full picture, including income tax on WIP, as part of our exit planning work.
              </p>
              <Link
                href="/contact"
                className={`mt-6 inline-flex min-h-11 items-center justify-center rounded-full border-2 border-white px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white hover:text-[var(--primary)] ${focusRing}`}
                data-cta="calculator-page-cta"
                data-cta-goal="form"
                data-cta-placement="calculator"
              >
                {tool.ctaLabel ?? "Book a free consultation"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
