import type { Metadata } from "next";
import Link from "next/link";
import { siteContainerLg, btnPrimary } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { LeadForm } from "@/components/forms/LeadForm";
import { allTools } from "@/lib/calculators/registry";
import ContractorsBackdrop from "@/components/layout/ContractorsBackdrop";

export const metadata: Metadata = {
  title: "Free IR35 and Contractor Tax Calculators 2026/27",
  description:
    "Free calculators for UK contractors. Work out your IR35 take-home, umbrella vs limited, dividend tax, corporation tax and the best director salary for 2026/27.",
  alternates: { canonical: `${siteConfig.url}/calculators` },
  openGraph: {
    title: "Free IR35 and Contractor Tax Calculators 2026/27",
    description:
      "Free calculators for UK contractors. Work out your IR35 take-home, umbrella vs limited, dividend tax, corporation tax and the best director salary for 2026/27.",
    url: `${siteConfig.url}/calculators`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free IR35 and Contractor Tax Calculators 2026/27",
    description:
      "Free calculators for UK contractors. IR35 take-home, umbrella vs limited, dividend tax, corporation tax and the best director salary for 2026/27.",
  },
};

// Display order for the category sections (anything not listed falls to the end).
const CATEGORY_ORDER = [
  "IR35 and take-home",
  "Dividends and salary",
  "Limited company tax",
];

/**
 * PREMIUM TOOLS ARE DELIBERATELY ABSENT from this index. `lib/calculators/
 * premium/registry` holds four configs with NO routes of their own: they are
 * client islands mounted inside blog posts by `PremiumUpgrade`. Listing them
 * here would emit four dead links, and `src/tests/calculator-crawl-path.test.ts`
 * asserts exactly that. Do not "complete" the index with them.
 *
 * This page is rendered with `renderToStaticMarkup` by that same guard, so it
 * stays a synchronous server component.
 */
export default function CalculatorsPage() {
  const tools = allTools();
  const categories = Array.from(new Set(tools.map((t) => t.category))).sort((a, b) => {
    const ia = CATEGORY_ORDER.indexOf(a);
    const ib = CATEGORY_ORDER.indexOf(b);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });

  return (
    <>
      {/* Hero. Mono eyebrow rather than the `.eyebrow` class: that rule is
          `@layer components` in globals.css and pins `color: var(--accent)`
          #0e7490, which measures 3.35-3.69 on this site's dark grounds. Being
          layered, a `text-*` utility now DOES beat it; the hand-roll is kept
          because it needs no override at all. primary-400 #22d3ee on
          neutral-900 = 9.92. */}
      <section className="relative overflow-hidden bg-neutral-900 py-12 sm:py-16 lg:py-20">
        <ContractorsBackdrop />
        <div className={`${siteContainerLg} relative z-10`}>
          <Breadcrumb
            siteUrl={siteConfig.url}
            onDark
            items={[
              { label: "Home", href: "/" },
              { label: "Calculators" },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-primary-400">
              Free tools
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Free IR35 and contractor tax calculators
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-neutral-300">
              Free tools for UK contractors and PSC directors, using the locked 2026/27 tax figures.
              Work out your take-home outside or inside IR35, compare umbrella against limited, and
              plan your salary, dividends and corporation tax.
            </p>
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

      {/* Tool listing. §0.1: the cards are bg-white, so the section ground has
          to be the opposite one or the cards have no edge. slate-50 here, which
          also matches how the already-ported /calculators/<slug> does it. */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          {categories.length === 0 ? (
            <div className="rounded-xl bg-white p-10 text-center ring-1 ring-neutral-200/70">
              <p className="text-neutral-600">Calculator tools coming soon.</p>
            </div>
          ) : (
            categories.map((cat) => (
              <div key={cat} className="mb-14 last:mb-0">
                <h2 className="mb-6 border-b border-neutral-200 pb-3 text-2xl font-bold text-neutral-900">
                  {cat}
                </h2>
                <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {tools
                    .filter((t) => t.category === cat)
                    .map((t) => (
                      <Link
                        key={t.slug}
                        href={`/calculators/${t.slug}`}
                        className="group flex flex-col rounded-xl bg-white p-5 ring-1 ring-neutral-200/70 transition-colors hover:ring-primary-600/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] sm:p-6"
                      >
                        <h3 className="text-lg font-bold text-neutral-900">{t.name}</h3>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">
                          {t.oneLiner}
                        </p>
                        <span className="mt-4 inline-block text-sm font-semibold text-primary-600">
                          Open calculator &rarr;
                        </span>
                      </Link>
                    ))}
                </div>
              </div>
            ))
          )}

          <p className="mt-12 text-sm leading-relaxed text-neutral-600">
            Run a contractor, recruitment or freelancing site?{" "}
            <Link
              href="/embed"
              className="font-semibold text-primary-600 underline hover:text-primary-700"
            >
              Embed any of these calculators for free
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Closing ask, `contained` so no dark band touches the dark footer.
          `proofPoints` intentionally EMPTY: Property's own call site passes a
          fixed-fee claim and a 24-hour response promise, both banned here. */}
      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          contained
          ground="white"
          eyebrow="Free call"
          title="Need help interpreting your results?"
          description="These calculators give 2026/27 estimates. For a full review of your IR35 status, the most tax-efficient salary, dividend and pension split, or your umbrella versus limited decision, talk to one of our contractor specialists. We do the work and tell you what is worth changing."
          proofPoints={[]}
          formTitle="Book your free call"
          form={<LeadForm submitLabel="Request a callback" />}
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
