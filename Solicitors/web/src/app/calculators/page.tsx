import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { focusRing, sectionY, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";
import { SolicitorsBackdrop } from "@/components/layout/SolicitorsBackdrop";
import { CalculatorTabs, INDEX_HEADLINE_TABS } from "@/components/tools/CalculatorTabs";
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

/**
 * The one card whose href is spelled out rather than built from the slug.
 * `CalculatorTabs` renders <button role="tab">, so this page owes one literal
 * in-body /calculators/<slug> link; the calculator-tabs-crawl-path guard is a
 * SOURCE scan, so it has to be able to read the string. Rendered output, card
 * order and copy are identical to the mapped branch.
 */
const CRAWL_PATH_SLUG = "sra-client-account-reserve";

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

  const cardClass = `group block rounded-xl border-2 border-slate-200 bg-white p-4 transition-all hover:border-primary-400 hover:shadow-sm sm:p-6 ${focusRing}`;
  const cardBody = (t: (typeof tools)[number]) => (
    <>
      <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-primary-700">
        {t.category}
      </p>
      <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary-700">{t.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{t.oneLiner}</p>
      <p className="mt-4 text-sm font-bold text-primary-700">Open calculator →</p>
    </>
  );

  return (
    <>
      <JsonLd data={[collectionSchema, breadcrumbSchema]} />
      <section className="relative overflow-hidden bg-slate-900">
        <div className={`${siteContainerLg} ${sectionYLoose} relative z-10`}>
          <Breadcrumb items={breadcrumbItems} variant="light" />
          <div className="mt-8 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/90">Free tools · UK 2025/26</p>
            <h1 className="mt-3 text-3xl font-bold leading-[1.15] text-white sm:text-4xl lg:text-5xl">Law firm tax calculators</h1>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              Six solicitor-specific calculators built on UK 2025/26 tax rates and SRA regulatory rules. All run in your browser; no data collected unless you choose to follow up with us.
            </p>
          </div>
        </div>
        <SolicitorsBackdrop tone="navy" />
      </section>

      {/* Tier 1: run one without leaving the page. No heading: every candidate
          heading is authored prose, which the 2026-09-11 hard rule forbids.
          Recorded as an owner item in the phase-4 plan (R8). */}
      <section className="bg-white">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <CalculatorTabs tabs={INDEX_HEADLINE_TABS} />
        </div>
      </section>

      {/* Tier 2: the full directory. All 13 cards survive; they are this
          route's entire link floor contribution (24 = 11 chrome + 13 cards). */}
      <section className="bg-slate-50">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((t) =>
              t.slug === CRAWL_PATH_SLUG ? (
                <Link key={t.slug} href="/calculators/sra-client-account-reserve" className={cardClass}>
                  {cardBody(t)}
                </Link>
              ) : (
                <Link key={t.slug} href={`/calculators/${t.slug}`} className={cardClass}>
                  {cardBody(t)}
                </Link>
              ),
            )}
          </div>
        </div>
      </section>
    </>
  );
}
