import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { estateSites, estateTotals, snapshot } from "@/lib/estate/snapshot";
import type { EstateSite } from "@/lib/estate/snapshot";

export const metadata: Metadata = {
  title: "The brands | Ashfield Trading",
  description:
    "Directory of the 15 UK accounting brand sites operated by Ashfield Trading Ltd, grouped by sector, with the proprietary research assets behind each one.",
  alternates: { canonical: `${siteConfig.url}/brands` },
};

// ponytail: sector grouping is editorial, not in the snapshot; keyed by site id.
const SECTOR_GROUPS: { sector: string; ids: string[] }[] = [
  { sector: "Health and care", ids: ["dentists", "medical", "pharmacies", "care"] },
  { sector: "Professional services", ids: ["solicitors", "charities"] },
  { sector: "Property and construction", ids: ["property", "construction-cis"] },
  {
    sector: "Technology and digital",
    ids: ["contractors-ir35", "startups-tech", "agency-founder-finance", "ecommerce", "crypto"],
  },
  { sector: "Consumer and general practice", ids: ["hospitality", "generalist"] },
];

// ponytail: site.research_assets ids diverge from assets[] ids in the snapshot;
// resolve by asset.brand instead so names come straight from the asset records.
function siteAssets(siteId: string) {
  return snapshot.assets.filter((a) => a.brand === siteId);
}

function BrandRow({ site, index }: { site: EstateSite; index: number }) {
  return (
    <li
      className="hairline-t grid gap-x-8 gap-y-3 py-8 lg:grid-cols-12"
      data-reveal
      style={{ "--i": Math.min(index, 5) } as React.CSSProperties}
    >
      <div className="lg:col-span-4">
        <h3 className="type-h3">{site.name}</h3>
        <a
          href={`https://${site.domain}`}
          rel="noopener"
          className="type-caption nums-lining mt-1 inline-block !text-ink-70 underline decoration-hairline-strong underline-offset-4 hover:decoration-navy"
        >
          {site.domain}
        </a>
      </div>
      <p className="type-body text-ink-70 lg:col-span-5">
        {site.sector}
      </p>
      <div className="lg:col-span-3">
        <p className="type-eyebrow !text-ink-45">Research assets</p>
        <ul className="mt-2 space-y-1">
          {siteAssets(site.id).map((asset) => (
            <li key={asset.id} className="type-caption !text-ink-70">
              {asset.name}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export default function BrandsPage() {
  const sites = estateSites();
  const totals = estateTotals();
  const byId = new Map(sites.map((s) => [s.id, s]));
  const groups = SECTOR_GROUPS.map((g) => ({
    sector: g.sector,
    sites: g.ids.map((id) => byId.get(id)).filter((s): s is EstateSite => Boolean(s)),
  })).filter((g) => g.sites.length > 0);

  return (
    <>
      {/* Intro: trading-names structure */}
      <section className="bg-paper-3 grain">
        <div className="mx-auto max-w-[1200px] px-(--gutter) pb-16 pt-24 lg:pb-24 lg:pt-32">
          <div className="grid gap-x-10 lg:grid-cols-12">
            <div className="lg:col-span-8" data-reveal>
              <SectionHeading eyebrow="The estate" as="h1">
                {totals.sites} brands, one company
              </SectionHeading>
              <p className="type-lead measure mt-6">
                Every brand below is a trading name of Ashfield Trading Ltd,
                registered in England and Wales, company number 16358723. Each
                site serves one sector of the UK accounting market and publishes
                its own proprietary research, built from official data.
              </p>
              <p className="type-body measure mt-4 text-ink-70">
                Across the estate: {totals.sites} live sites and{" "}
                {totals.research_assets} research assets drawing on official
                sources including ONS and Companies House, with OGL v3.0
                attribution where used. All
                commercial enquiries route through a single point,{" "}
                <a href="/contact" className="underline decoration-hairline-strong underline-offset-4 hover:decoration-navy">
                  the Ashfield contact page
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Directory: ruled editorial list, no cards */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[1200px] px-(--gutter) py-16 lg:py-24">
          {groups.map((group) => (
            <div key={group.sector} className="mb-16 last:mb-0">
              <div className="grid gap-x-8 lg:grid-cols-12">
                <p className="type-eyebrow lg:col-span-4">{group.sector}</p>
              </div>
              <ol className="mt-4 list-none">
                {group.sites.map((site, i) => (
                  <BrandRow key={site.id} site={site} index={i} />
                ))}
              </ol>
            </div>
          ))}
          <div className="rule-strong" />
          <p className="type-caption mt-4 !text-ink-70">
            All {totals.sites} brands are trading names of Ashfield Trading Ltd,
            company number 16358723, 20 Ashfield Avenue, Shipley, Bradford BD18
            3AL.
          </p>
        </div>
      </section>
    </>
  );
}
