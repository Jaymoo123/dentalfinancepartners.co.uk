import type { Metadata } from "next";
import Link from "next/link";
import { siteContainerLg, btnPrimary } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { allTools } from "@/lib/calculators/registry";

export const metadata: Metadata = {
  title: "Free CIS Tax Calculators | Construction Industry Scheme Tools",
  description:
    "Free CIS calculators for UK construction subcontractors and contractors. Estimate your CIS refund, take-home pay, gross payment status eligibility, and more.",
  alternates: { canonical: `${siteConfig.url}/calculators` },
  openGraph: {
    title: "Free CIS Tax Calculators | Construction Industry Scheme Tools",
    description:
      "Free CIS calculators for UK construction subcontractors and contractors. Estimate your CIS refund, take-home pay, gross payment status eligibility, and more.",
    url: `${siteConfig.url}/calculators`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free CIS Tax Calculators | Construction Industry Scheme Tools",
    description:
      "Free CIS calculators for UK construction subcontractors and contractors. Estimate your CIS refund, take-home pay, gross payment status eligibility, and more.",
  },
};

// Display order for the category sections (anything not listed falls to the end).
const CATEGORY_ORDER = [
  "CIS Refunds",
  "CIS Basics",
  "CIS Compliance",
  "CIS Advanced",
  "VAT and MTD",
  "Expenses",
  "Limited Company",
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
      <section className="bg-slate-900 py-14 sm:py-20">
        <div className={siteContainerLg}>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Calculators" },
            ]}
          />
          <h1 className="mt-6 max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Free CIS tax calculators
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
            Free tools for UK CIS subcontractors and contractors. Estimate your refund, check gross
            payment status eligibility, and work out your take-home pay.
          </p>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          {categories.length === 0 ? (
            <p className="text-slate-600">Calculator tools coming soon.</p>
          ) : (
            categories.map((cat) => (
              <div key={cat} className="mb-12 last:mb-0">
                <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">{cat}</h2>
                <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {tools
                    .filter((t) => t.category === cat)
                    .map((t) => (
                      <Link
                        key={t.slug}
                        href={`/calculators/${t.slug}`}
                        className="group block rounded-2xl border-2 border-slate-200 bg-white p-6 transition-colors hover:border-orange-500"
                      >
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-700">
                          {t.name}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">{t.oneLiner}</p>
                        <span className="mt-4 inline-block text-sm font-semibold text-orange-600">
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
                className="text-sm font-semibold text-slate-500 hover:text-orange-600"
              >
                Run a construction or trade site? Embed any of these calculators for free &rarr;
              </Link>
            </p>
          </div>

          <div className="mt-12 sm:mt-16 bg-slate-900 p-6 sm:p-10 text-center text-white">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Need help interpreting your results?
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg leading-relaxed text-slate-200 max-w-3xl mx-auto">
              These calculators provide simplified estimates. For a full review of your CIS
              position, refund entitlement, or gross payment status application, speak to one of
              our CIS specialists.
            </p>
            <div className="mt-6 sm:mt-8">
              <Link
                href="/contact"
                className={`${btnPrimary} text-base sm:text-lg px-6 py-3 sm:px-10 sm:py-4`}
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
