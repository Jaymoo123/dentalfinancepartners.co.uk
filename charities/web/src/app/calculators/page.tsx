import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { siteContainerLg, btnPrimary, linkArrow } from "@/components/ui/layout-utils";
import { CalculatorTabs } from "@/components/calculators/CalculatorTabs";
import { allTools, toolPath } from "@/lib/calculators/registry";
import { site } from "@/lib/calculators/site";

export const metadata: Metadata = {
  title: `Free Charity Finance Calculators`,
  description:
    "Free calculators for UK charities and CICs: Gift Aid, the Gift Aid Small Donations Scheme, and the independent examination vs audit thresholds. Built on current gov.uk rules.",
  alternates: { canonical: `${site.url}/calculators` },
};

export default function CalculatorsPage() {
  const tools = allTools();
  const tabs = tools.map((t) => ({ slug: t.slug, label: t.name, sub: t.category }));

  return (
    <>
      {/* No page-level <main>: the kit PageShell in layout.tsx provides the one
          main landmark. */}
      <section className="bg-slate-50 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <Breadcrumb
              siteUrl={site.url}
              items={[{ label: "Home", href: "/" }, { label: "Calculators" }]}
            />
            {/* Published h1, unchanged. */}
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Charity finance calculators
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
              Free tools built on the current Charity Commission and HMRC rules (England and Wales,
              2026/27). Every figure is sourced and kept up to date. Nothing you type leaves your
              browser, and there is no sign-up.
            </p>
          </div>
        </div>
      </section>

      {/* Tier 1: run one without leaving the page. */}
      <section id="run-one" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Run one now</Eyebrow>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Pick a tool and it loads in place
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            All {tools.length} calculators run here on the page. Open the full page for a tool when
            you want the worked explanation, the FAQs and the sources behind the figure.
          </p>
          <div className="mt-8 sm:mt-10">
            <CalculatorTabs tabs={tabs} />
          </div>
          {/* Tabs render buttons, not links. The card grid below is the crawl
              path to each tool page, and this anchor is the in-body one. */}
          {tools[0] && (
            <p className="mt-6 text-sm text-slate-600">
              Prefer the full page?{" "}
              <Link href={toolPath(tools[0].slug)} className={linkArrow}>
                Open the {tools[0].name.toLowerCase()}
              </Link>
            </p>
          )}
        </div>
      </section>

      {/* Tier 2: the fleet. */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>All calculators</Eyebrow>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Every calculator, with the rules behind it
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((t) => (
              <Link
                key={t.slug}
                href={toolPath(t.slug)}
                data-cta={`calc_index_tool_${t.slug}`}
                data-cta-placement="tool_grid"
                className="block border-2 border-slate-200 bg-white p-5 transition-colors hover:border-primary-600"
              >
                <span className="block text-xs font-semibold uppercase tracking-wide text-primary-700">
                  {t.category}
                </span>
                <span className="mt-2 block text-base font-bold text-slate-900 sm:text-lg">
                  {t.name}
                </span>
                <span className="mt-2 block text-sm leading-relaxed text-slate-600">
                  {t.oneLiner}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Closing in-flow panel. Deliberately a link, not a form: this page has no
          capture surface today and adding one is an owner gate (PHASE_PLAN P4-3). */}
      <section className="bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl border-l-4 border-primary-600 bg-slate-50 p-6 sm:p-8">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              A calculator gives you the shape of the answer
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              What it cannot see is your reserves policy, your restricted funds, or how this year&apos;s
              income changes which scrutiny threshold you fall under next year. If you want your own
              figures checked, tell us about your charity and we will come back to you.
            </p>
            <Link
              href="/contact"
              data-cta="calc_index_contact"
              data-cta-placement="page_footer"
              data-cta-goal="contact"
              className={`${btnPrimary} mt-6`}
            >
              Talk to a charity accountant
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
