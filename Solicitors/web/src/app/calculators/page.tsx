import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { focusRing, sectionY, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildBreadcrumbJsonLd, buildCollectionPage, JsonLd } from "@/lib/schema/index";

const TITLE = "Law Firm Tax Calculators (UK 2025/26)";
const DESCRIPTION =
  "Free UK law firm calculators: law firm valuation, LLP profit share, partner take-home (partnership vs LLP vs Ltd), SRA client account reserve, PII premium estimator, FA 2014 Salaried Member test.";

const CALCULATORS = [
  { href: "/calculators/law-firm-valuation", title: "Law Firm Valuation", body: "Indicative law firm value: profit × multiple by firm type and region, plus WIP and tangible assets. UK 2025/26 ranges.", audience: "Partners · Buyers · Sellers" },
  { href: "/calculators/fa-2014-salaried-member", title: "FA 2014 Salaried Member Test", body: "Three-condition Finance Act 2014 test. Confirms whether an LLP member is partner-for-tax or deemed employee.", audience: "LLP fixed-share + salaried members" },
  { href: "/calculators/llp-profit-share-allocation", title: "LLP Profit Share Allocation", body: "Allocate annual profit across senior, junior, and fixed-share partners under different methodologies.", audience: "LLPs and partnerships" },
  { href: "/calculators/partnership-vs-llp-take-home", title: "Solicitor Take-Home Calculator", body: "Compare sole-trader / partnership / LLP / limited company on annual net take-home. UK 2025/26 rates.", audience: "All structural decisions" },
  { href: "/calculators/sra-client-account-reserve", title: "SRA Client Account Reserve", body: "Indicative client money exposure and prudent reserve sizing for SRA-regulated firms.", audience: "COFAs · Practice managers" },
  { href: "/calculators/indemnity-premium-estimator", title: "PII Premium Estimator", body: "Indicative annual PII premium by gross fees, practice area, claims history, and cover level.", audience: "Sole practitioners · Firms" },
];

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
  const collectionSchema = buildCollectionPage({
    name: TITLE,
    description: DESCRIPTION,
    path: "/calculators",
    numberOfItems: CALCULATORS.length,
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
            {CALCULATORS.map((c) => (
              <Link key={c.href} href={c.href} className={`group block rounded-2xl border border-[var(--border)] bg-white p-6 transition-all hover:border-[var(--primary)] hover:shadow-md ${focusRing}`}>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--primary)] mb-2">{c.audience}</p>
                <h3 className="font-serif text-lg font-semibold text-[var(--ink)] group-hover:text-[var(--primary)]">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{c.body}</p>
                <p className="mt-4 text-sm font-semibold text-[var(--primary)]">Open calculator →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
