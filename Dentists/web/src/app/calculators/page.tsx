import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { focusRing, sectionY, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import {
  buildBreadcrumbJsonLd,
  buildCollectionPage,
  JsonLd,
} from "@/lib/schema/index";
import { allTools } from "@/lib/tools/registry";

const TITLE = "Dental Tax Calculators (UK 2025/26)";
const DESCRIPTION =
  "Free UK dental calculators: UDA value, associate take-home, practice valuation, locum structure (Ltd vs umbrella vs sole-trader), and principal partnership vs Ltd-co extraction. All at 2025/26 rates.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: `${siteConfig.url}/calculators`,
    languages: {
      "en-GB": `${siteConfig.url}/calculators`,
      "x-default": `${siteConfig.url}/calculators`,
    },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${siteConfig.url}/calculators`,
    type: "website",
  },
};

export default function CalculatorsIndexPage() {
  const tools = allTools().filter((t) => t.kind === "generic");

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Calculators" },
  ];

  const collectionSchema = buildCollectionPage({
    name: TITLE,
    description: DESCRIPTION,
    path: "/calculators",
    numberOfItems: tools.length,
  });
  const breadcrumbSchema = JSON.parse(buildBreadcrumbJsonLd(breadcrumbItems));

  return (
    <>
      <JsonLd data={[collectionSchema, breadcrumbSchema]} />

      <section className="bg-[var(--navy)] text-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <Breadcrumb items={breadcrumbItems} variant="light" />
          <div className="mt-8 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--gold)]">
              Free tools · UK 2025/26 rates
            </p>
            <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
              Dental tax calculators
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">
              Five dental-specific calculators built on 2025/26 UK tax rates.
              All run in your browser; no data is collected unless you choose to follow up with us.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/calculators/${tool.slug}`}
                className={`group block rounded-2xl border border-[var(--border)] bg-white p-6 transition-all hover:border-[var(--gold)] hover:shadow-md ${focusRing}`}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--gold-strong)] mb-2">
                  {tool.category}
                </p>
                <h3 className="font-serif text-lg font-semibold text-[var(--ink)] group-hover:text-[var(--gold-strong)]">
                  {tool.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                  {tool.oneLiner}
                </p>
                <p className="mt-4 text-sm font-semibold text-[var(--gold-strong)]">
                  Open calculator →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
