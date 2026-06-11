import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { focusRing, sectionY, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildBreadcrumbJsonLd, buildCollectionPage, JsonLd } from "@/lib/schema/index";
import { allTools } from "@/lib/tools/registry";

const TITLE = "Law Firm Tax Calculators (UK 2025/26)";
const DESCRIPTION =
  "Free UK law firm calculators: law firm valuation, LLP profit share, partner take-home (partnership vs LLP vs Ltd), SRA client account reserve, PII premium estimator, FA 2014 Salaried Member test.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: `${siteConfig.url}/calculators`,
    languages: { "en-GB": `${siteConfig.url}/calculators`, "x-default": `${siteConfig.url}/calculators` },
  },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${siteConfig.url}/calculators`, type: "website" },
};

export default function CalculatorsIndexPage() {
  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Calculators" }];
  const tools = allTools().filter((t) => t.kind === "generic");
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
      <section className="bg-[var(--primary)] text-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <Breadcrumb items={breadcrumbItems} variant="light" />
          <div className="mt-8 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/90">Free tools · UK 2025/26</p>
            <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">Law firm tax calculators</h1>
            <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">
              Six solicitor-specific calculators built on UK 2025/26 tax rates and SRA regulatory rules. All run in your browser; no data collected unless you choose to follow up with us.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((t) => (
              <Link
                key={t.slug}
                href={`/calculators/${t.slug}`}
                className={`group block rounded-2xl border border-[var(--border)] bg-white p-6 transition-all hover:border-[var(--primary)] hover:shadow-md ${focusRing}`}
              >
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--primary)]">
                  {t.category}
                </p>
                <h3 className="font-serif text-lg font-semibold text-[var(--ink)] group-hover:text-[var(--primary)]">
                  {t.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{t.oneLiner}</p>
                <p className="mt-4 text-sm font-semibold text-[var(--primary)]">Open calculator →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
