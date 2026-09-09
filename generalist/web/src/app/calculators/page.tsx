import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, ArrowRight } from "lucide-react";
import { siteContainerLg, btnOnDark, linkArrow } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow, Prose } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { GeneralistBackdrop } from "@/components/layout/GeneralistBackdrop";
import { LeadForm } from "@/components/forms/LeadForm";
import { LEAD_PROOF_POINTS } from "@/lib/blog-cta-map";
import { CalculatorTabs, INDEX_HEADLINE_TABS } from "@/components/tools/CalculatorTabs";
import { JsonLd } from "@/lib/schema";
import { siteConfig } from "@/config/site";
import { allTools } from "@/lib/tools/registry";

export const metadata: Metadata = {
  title: `Free UK Tax Calculators for Business Owners`,
  description:
    "Free tax and finance calculators for UK limited companies, contractors, sole traders and small businesses. Salary vs dividend optimiser using 2026/27 rates. Built by specialist accountants.",
  alternates: { canonical: `${siteConfig.url}/calculators` },
  openGraph: {
    title: "Free UK Tax Calculators for Business Owners",
    description: "Free tax and finance calculators for UK businesses. Salary vs dividend, take-home and more.",
    url: `${siteConfig.url}/calculators`,
    type: "website",
  },
};

/**
 * Directory sections, in display order.
 *
 * The registry carries 15 raw category strings across 21 tools, with three
 * overlapping pairs (Capital Gains / Exit and Capital Gains, Employment /
 * Employment Taxes, Business Tax / Corporation Tax). Fifteen headings over
 * twenty-one cards is a list pretending to be a taxonomy, so they merge to
 * seven buckets here. The registry strings are untouched; this is a display
 * mapping only.
 */
const CATEGORY_ORDER = [
  "Business structure & incorporation",
  "Pay & dividends",
  "Employment & payroll",
  "VAT & MTD",
  "Corporation tax & reliefs",
  "Vehicles & expenses",
  "Exit, finance & valuation",
] as const;

type Bucket = (typeof CATEGORY_ORDER)[number];

/** Every raw registry category maps to exactly one bucket. */
const BUCKET_BY_CATEGORY: Record<string, Bucket> = {
  "Business Structure": "Business structure & incorporation",
  "Limited Company": "Pay & dividends",
  "Income Tax": "Pay & dividends",
  Payroll: "Employment & payroll",
  Employment: "Employment & payroll",
  "Employment Taxes": "Employment & payroll",
  "Self-Employed": "Employment & payroll",
  VAT: "VAT & MTD",
  "Self Assessment": "VAT & MTD",
  "Corporation Tax": "Corporation tax & reliefs",
  Expenses: "Vehicles & expenses",
  "Business Tax": "Vehicles & expenses",
  "Capital Gains": "Exit, finance & valuation",
  "Exit and Capital Gains": "Exit, finance & valuation",
  "Business Finance": "Exit, finance & valuation",
};

export default function CalculatorsIndexPage() {
  const calculators = allTools();

  // Exhaustiveness: a new tool with an unmapped category fails the build here
  // rather than silently vanishing from the directory.
  const unmapped = [...new Set(calculators.map((c) => c.category))].filter(
    (c) => !BUCKET_BY_CATEGORY[c],
  );
  if (unmapped.length > 0) {
    throw new Error(
      `/calculators: registry categories with no CATEGORY_ORDER bucket: ${unmapped.join(", ")}`,
    );
  }

  const grouped = CATEGORY_ORDER.map((bucket) => ({
    bucket,
    tools: calculators.filter((c) => BUCKET_BY_CATEGORY[c.category] === bucket),
  })).filter((g) => g.tools.length > 0);

  return (
    <>
      {/* BreadcrumbList is emitted by the kit <Breadcrumb> below. */}
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Free UK tax calculators for business owners",
            description:
              "Free tax and finance calculators for UK limited companies, contractors, sole traders and small businesses, on 2026/27 rates.",
            url: `${siteConfig.url}/calculators`,
          },
        ]}
      />

      <section className="relative flex min-h-[300px] items-center overflow-hidden bg-slate-900 py-10 sm:min-h-[350px] sm:py-12 lg:py-14">
        <GeneralistBackdrop />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Breadcrumb
              siteUrl={siteConfig.url}
              onDark
              items={[{ label: "Home", href: "/" }, { label: "Calculators" }]}
            />
            <Eyebrow onDark>Free tools</Eyebrow>
            <h1 className="text-3xl font-bold leading-[1.15] text-white text-balance sm:text-4xl lg:text-5xl">
              Free UK tax calculators for business owners
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
              We built these to answer the questions UK business owners actually ask us: what is my
              real take-home pay, how much salary versus dividend, what does an extra hire cost, and
              how much CGT will I pay on the exit. All numbers reflect 2026/27 rates and thresholds,
              no sign-up, and you can always skip straight to the number.
            </p>
            <a
              href="#get-expert-help"
              data-cta="calc_index_help"
              data-cta-placement="hero"
              data-cta-goal="form"
              className={`${btnOnDark} mt-6`}
            >
              Ask an accountant about your figure
            </a>
          </div>
        </div>
      </section>

      {/* Tier 1: run one without leaving the page. */}
      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <Eyebrow>Run one now</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
            The five most business owners open first
          </h2>
          <Prose>
            <p>
              Pick a tab and the calculator loads in place. Every figure is 2026/27, and nothing you
              type leaves your browser.
            </p>
          </Prose>
          <div className="mt-8 sm:mt-10">
            <CalculatorTabs tabs={INDEX_HEADLINE_TABS} />
          </div>
          {/* Tabs render buttons, not links. This anchor is the crawl path to a
              specific tool page, and the calculator-tabs-crawl-path guard scans
              for it. */}
          <p className="mt-6 text-sm text-slate-600">
            Prefer the full page for one of these?{" "}
            <Link href="/calculators/salary-dividend-optimiser" className={linkArrow}>
              Open the salary and dividend optimiser
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </p>
        </div>
      </section>

      {/* Tier 2: the whole fleet, grouped. */}
      <section className="bg-slate-50 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <Eyebrow>All calculators</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
            {calculators.length} calculators, grouped by the decision they answer
          </h2>

          <div className="mt-8 space-y-10 sm:mt-12 sm:space-y-12">
            {grouped.map((group) => (
              <div key={group.bucket}>
                <h3 className="text-base font-bold text-slate-900 sm:text-lg">{group.bucket}</h3>
                <div className="mt-4 grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {group.tools.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/calculators/${c.slug}`}
                      className="group flex gap-3 rounded-xl border-2 border-slate-200 bg-white p-3 transition-all hover:border-primary-400 hover:shadow-sm sm:p-4"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700 ring-1 ring-primary-100 sm:h-11 sm:w-11">
                        <Calculator aria-hidden className="h-5 w-5" strokeWidth={1.75} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-bold text-slate-900 sm:text-base">
                          {c.name}
                        </span>
                        <span className="mt-1 block text-xs leading-relaxed text-slate-600 sm:text-sm">
                          {c.oneLiner}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 text-sm text-slate-600">
            Run a business site? Embed any of these calculators for free.{" "}
            <Link href="/embed" className={linkArrow}>
              See the embed gallery
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </p>
        </div>
      </section>

      <div id="get-expert-help" className="scroll-mt-24">
        <LeadCTAPanel
          title="A number is a starting point, not a decision"
          description="These tools model standard 2026/27 thresholds. What they cannot see is your prior-year usage, your other income, or how this year's decision changes next year's. A free call gets that read properly."
          proofPoints={LEAD_PROOF_POINTS}
          form={<LeadForm submitLabel="Book a free call" redirectOnSuccess={false} />}
          contained
          ground="white"
          footnote="No obligation and no hard sell. If your figures already look right, we will say so."
        />
      </div>
    </>
  );
}
