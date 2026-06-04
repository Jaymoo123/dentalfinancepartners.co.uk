import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteContainerLg, btnPrimary } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { allTools } from "@/lib/calculators/registry";

export const metadata: Metadata = {
  title: "Free Property Tax Calculators | SDLT, CGT, Section 24, Incorporation & MTD",
  description:
    "Free calculators and tools for UK landlords: stamp duty (incl. buy-to-let surcharge), capital gains tax, Section 24 impact, incorporation cost & break-even, MTD checker, portfolio profitability. Current 2026/27 rates.",
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

export default function CalculatorsPage() {
  const tools = allTools();
  const categories = Array.from(new Set(tools.map((t) => t.category))).sort((a, b) => {
    const ia = CATEGORY_ORDER.indexOf(a);
    const ib = CATEGORY_ORDER.indexOf(b);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });

  return (
    <>
      <section className="relative h-[300px] sm:h-[350px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1554995207-c18c203602cb?w=2000&q=85"
          alt="UK property"
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-slate-900/85" />
        <div className={`${siteContainerLg} relative z-10 h-full flex items-center`}>
          <div className="max-w-3xl">
            <Breadcrumb
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

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          {categories.map((cat) => (
            <div key={cat} className="mb-12 last:mb-0">
              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">{cat}</h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {tools
                  .filter((t) => t.category === cat)
                  .map((t) => (
                    <Link
                      key={t.slug}
                      href={`/calculators/${t.slug}`}
                      className="group block rounded-2xl border-2 border-slate-200 bg-white p-6 transition-colors hover:border-emerald-500"
                    >
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700">{t.name}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{t.oneLiner}</p>
                      <span className="mt-4 inline-block text-sm font-semibold text-emerald-700">
                        Open calculator →
                      </span>
                    </Link>
                  ))}
              </div>
            </div>
          ))}

          <div className="mt-10 text-center">
            <Link href="/embed" className="text-sm font-semibold text-slate-500 hover:text-emerald-700">
              Run a property-related site? Embed any of these calculators for free →
            </Link>
          </div>

          <div className="mt-12 sm:mt-16 bg-slate-900 p-6 sm:p-10 text-center text-white">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Need help interpreting your results?</h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg leading-relaxed text-slate-200 max-w-3xl mx-auto">
              These calculators provide simplified estimates. For a full analysis of your specific situation,
              including incorporation feasibility, capital gains planning, or portfolio profitability reporting,
              speak to one of our property accountants.
            </p>
            <div className="mt-6 sm:mt-8">
              <Link
                href="/contact"
                className={`${btnPrimary} bg-emerald-600 border-emerald-800 text-base sm:text-lg px-6 py-3 sm:px-10 sm:py-4`}
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
