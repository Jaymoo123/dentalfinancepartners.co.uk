import type { Metadata } from "next";
import Link from "next/link";
import { siteContainerLg, btnPrimary } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { allTools } from "@/lib/calculators/registry";

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

export default function CalculatorsPage() {
  const tools = allTools();
  const categories = Array.from(new Set(tools.map((t) => t.category))).sort((a, b) => {
    const ia = CATEGORY_ORDER.indexOf(a);
    const ib = CATEGORY_ORDER.indexOf(b);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });

  return (
    <>
      <section className="border-b border-neutral-200 bg-neutral-900 py-14 sm:py-20">
        <div className={siteContainerLg}>
          <Breadcrumb
            variant="light"
            items={[
              { label: "Home", href: "/" },
              { label: "Calculators" },
            ]}
          />
          <h1 className="mt-6 max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Free IR35 and contractor tax calculators
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-neutral-300">
            Free tools for UK contractors and PSC directors, using the locked 2026/27 tax figures.
            Work out your take-home outside or inside IR35, compare umbrella against limited, and
            plan your salary, dividends and corporation tax.
          </p>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          {categories.length === 0 ? (
            <p className="text-neutral-600">Calculator tools coming soon.</p>
          ) : (
            categories.map((cat) => (
              <div key={cat} className="mb-12 last:mb-0">
                <h2 className="text-xl font-bold text-neutral-900 sm:text-2xl">{cat}</h2>
                <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {tools
                    .filter((t) => t.category === cat)
                    .map((t) => (
                      <Link
                        key={t.slug}
                        href={`/calculators/${t.slug}`}
                        className="group block rounded-2xl border-2 border-neutral-200 bg-white p-6 transition-colors hover:border-cyan-700"
                      >
                        <h3 className="text-lg font-bold text-neutral-900 group-hover:text-cyan-800">
                          {t.name}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-neutral-600">{t.oneLiner}</p>
                        <span className="mt-4 inline-block text-sm font-semibold text-cyan-700">
                          Open calculator &rarr;
                        </span>
                      </Link>
                    ))}
                </div>
              </div>
            ))
          )}

          <div className="mt-10 space-y-2 text-center">
            <p>
              <Link
                href="/embed"
                className="text-sm font-semibold text-neutral-500 hover:text-cyan-700"
              >
                Run a contractor, recruitment or freelancing site? Embed any of these calculators for free &rarr;
              </Link>
            </p>
          </div>

          <div className="mt-12 sm:mt-16 bg-neutral-900 p-6 sm:p-10 text-center text-white">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Need help interpreting your results?
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg leading-relaxed text-neutral-200 max-w-3xl mx-auto">
              These calculators provide simplified 2026/27 estimates. For a full review of your IR35
              status, the most tax-efficient salary, dividend and pension split, or your umbrella
              versus limited decision, speak to one of our contractor specialists.
            </p>
            <div className="mt-6 sm:mt-8">
              <Link
                href="/contact"
                className={`${btnPrimary} text-base sm:text-lg px-6 py-3 sm:px-10 sm:py-4`}
              >
                Book a free call
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
