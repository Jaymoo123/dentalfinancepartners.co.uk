import type { Metadata } from "next";
import { HeroBrickBackdrop } from "@/components/layout/HeroBrickBackdrop";
import Link from "next/link";
import { siteContainerLg, btnPrimary } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { allTools } from "@/lib/calculators/registry";
import { Stamp, TrendingUp, Percent, Building2, Briefcase, CalendarClock, Calculator } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Eyebrow } from "@/components/ui/page-blocks";
import { CalculatorTabs } from "@/components/calculators/CalculatorTabs";
import type { TabKey } from "@/components/calculators/CalculatorTabs";

export const metadata: Metadata = {
  title: "Free Property Tax Calculators | SDLT, CGT, Section 24, Incorporation & MTD",
  description:
    "Free tools for UK landlords: stamp duty (incl. buy-to-let surcharge), capital gains tax, Section 24, incorporation cost, MTD checker and portfolio yield.",
  alternates: { canonical: `${siteConfig.url}/calculators` },
  openGraph: {
    title: "Free Property Tax Calculators for UK Landlords",
    description: "Calculate stamp duty, capital gains tax, Section 24 impact, incorporation costs, MTD and yield. 2026/27 rates.",
    url: `${siteConfig.url}/calculators`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Property Tax Calculators for UK Landlords",
    description: "Calculate stamp duty, capital gains tax, Section 24 impact, incorporation costs, MTD and yield. 2026/27 rates.",
  },
};

// Display order for the category sections (anything not listed falls to the end).
const CATEGORY_ORDER = [
  "Stamp duty",
  "Capital gains tax",
  "Income tax",
  "Incorporation",
  "Portfolio",
  "Compliance",
];

// Category icon map — matches the homepage calculator tab badges.
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "Stamp duty": Stamp,
  "Capital gains tax": TrendingUp,
  "Income tax": Percent,
  "Incorporation": Building2,
  "Portfolio": Briefcase,
  "Compliance": CalendarClock,
};

/**
 * The five bespoke calculators, in the order they run on this page. Ordered by
 * how far up the landlord's decision they sit: what a purchase costs, then what
 * letting it costs, then whether to incorporate, then compliance, then the
 * whole portfolio. Not the same order as CATEGORY_ORDER below, which is a
 * filing taxonomy rather than a journey.
 */
const HEADLINE_TABS: TabKey[] = ["stampduty", "section24", "incorporation", "mtd", "portfolio"];

export default function CalculatorsPage() {
  const tools = allTools();
  const categories = Array.from(new Set(tools.map((t) => t.category))).sort((a, b) => {
    const ia = CATEGORY_ORDER.indexOf(a);
    const ib = CATEGORY_ORDER.indexOf(b);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });

  return (
    <>
      <section className="relative flex items-center py-10 sm:py-12 lg:py-14 min-h-[300px] sm:min-h-[350px] overflow-hidden bg-slate-900">
        <HeroBrickBackdrop />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Breadcrumb
              onDark
              items={[
                { label: "Home", href: "/" },
                { label: "Calculators" },
              ]}
            />
            <h1 className="mt-6 text-2xl font-bold leading-tight text-white sm:text-4xl lg:text-6xl">
              Property tax calculators for UK landlords
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-xl leading-relaxed text-white">
              Free, always-current tools built by specialist property accountants. Work out stamp duty, capital
              gains tax, Section 24 impact, incorporation costs, MTD and rental yield in seconds.
            </p>
          </div>
        </div>
      </section>

      {/* Tier 1: the five bespoke calculators, running on this page.
          /calculators used to be a pure index — sixteen links out and nothing to
          do here — which is an odd shape for a page whose product is the tool
          itself. `CalculatorTabs` is the homepage's own block, reused rather
          than reimplemented, so the two cannot drift.

          It is passed all five bespoke tools; the homepage passes the default
          four (no stamp duty). Note every listed panel mounts and is downloaded,
          not just the selected one, so do not grow this list past the bespoke
          five without checking what it costs. */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl mb-8 sm:mb-12">
            <Eyebrow>Run one now</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
              Start with the five landlords use most
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600">
              Pick a calculator, enter your figures and see where you stand without leaving this page. Every
              one of them has a full page of its own below if you want the workings and the caveats.
            </p>
          </div>
          <CalculatorTabs tabs={HEADLINE_TABS} />
        </div>
      </section>

      {/* Tier 2: the full directory.
          These category headings used to be `h2` at `sm:text-4xl` each, which
          gave "Capital gains tax" and "Compliance" — one card apiece — the same
          weight as the page title. They are now `h3` subsections under a single
          section heading, with a count, so the page reads as one directory
          rather than six unrelated slabs. The bespoke five stay listed here as
          well as running above: the tabs are the fast path, this is the
          complete index, and each tool's own page is what the sitemap and the
          /embed route point at. */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl mb-8 sm:mb-12">
            <Eyebrow>The full set</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
              Every calculator, by category
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600">
              {tools.length} free tools, kept current for 2026/27. Each one opens on its
              own page with the assumptions written out underneath.
            </p>
          </div>

          {categories.map((cat) => {
            const inCategory = tools.filter((t) => t.category === cat);
            const CatIcon = CATEGORY_ICONS[cat] ?? Calculator;
            return (
              <div key={cat} className="mb-10 last:mb-0">
                <h3 className="flex items-center gap-2.5 text-lg font-bold text-slate-900 sm:text-xl">
                  <CatIcon aria-hidden className="h-5 w-5 text-emerald-600" strokeWidth={1.75} />
                  {cat}
                  <span className="text-sm font-semibold text-slate-500">{inCategory.length}</span>
                </h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {inCategory.map((t) => (
                    <Link
                      key={t.slug}
                      href={`/calculators/${t.slug}`}
                      className="group flex items-start gap-3 rounded-xl border-2 border-slate-200 bg-white p-3 sm:p-4 transition-all hover:border-emerald-400 hover:shadow-sm"
                    >
                      <span className="flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                        <CatIcon aria-hidden className="h-5 w-5" strokeWidth={1.75} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                          {t.name}
                        </span>
                        <span className="mt-0.5 block text-[0.7rem] sm:text-xs text-slate-500">{t.oneLiner}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

          <div className="mt-10 space-y-2">
            <p>
              <Link href="/property-tax-rates" className="inline-block py-0.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800">
                See all current UK property tax rates for 2026/27 →
              </Link>
            </p>
            <p>
              <Link href="/embed" className="inline-block py-0.5 text-sm font-semibold text-slate-500 hover:text-emerald-700">
                Run a property-related site? Embed any of these calculators for free →
              </Link>
            </p>
          </div>

          <div className="mt-12 sm:mt-16 rounded-xl bg-slate-900 p-6 sm:p-10 text-white">
            <Eyebrow onDark>Next step</Eyebrow>
            <h2 className="text-2xl font-bold text-white sm:text-4xl">Need help interpreting your results?</h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg leading-relaxed text-slate-200 max-w-3xl">
              These calculators provide simplified estimates. For a full analysis of your specific situation,
              including incorporation feasibility, capital gains planning, or portfolio profitability reporting,
              speak to one of our property accountants.
            </p>
            <div className="mt-6 sm:mt-8">
              <Link
                href="/contact"
                className={`${btnPrimary} bg-emerald-600 text-base sm:text-lg px-6 py-3 sm:px-10 sm:py-4`}
              >
                Book free consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
