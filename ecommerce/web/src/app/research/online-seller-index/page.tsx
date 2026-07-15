import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { siteContainerLg } from "@/components/ui/layout-utils";

export const metadata: Metadata = {
  title: "UK Online Seller Business Index | Companies House SIC 47910 Data",
  description:
    "Quarterly index of UK incorporated online-retail companies: births, deaths and net change derived from Companies House SIC 47910 and ONS internet-retail sales data. Reproducible methodology, open sources.",
  alternates: {
    canonical: `${siteConfig.url}/research/online-seller-index`,
  },
};

export default function OnlineSellerIndexPage() {
  return (
    <main>
      {/* Hero */}
      <section className="border-b border-neutral-200 bg-[#1a3a5c] py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Link
            href="/research"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 uppercase tracking-wider hover:text-white transition-colors mb-6"
          >
            Research
          </Link>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            UK Online Seller Business Index.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            A quarterly index of the UK incorporated online-retail economy, derived from{" "}
            <a
              href="https://download.companieshouse.gov.uk/en_output.html"
              className="underline hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Companies House bulk data
            </a>{" "}
            (SIC 47910) and the{" "}
            <a
              href="https://www.ons.gov.uk/businessindustryandtrade/retailindustry/timeseries/j4mc/drsi"
              className="underline hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              ONS internet-retail sales series
            </a>
            . Company births, deaths, cohort survival and regional distribution. No survey estimates:
            every number is computed from a named official source.
          </p>
          <p className="mt-3 text-sm text-white/50">
            Index status: first data run in progress. Published under{" "}
            <a
              href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/"
              className="underline hover:text-white/70"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Government Licence v3.0
            </a>
            .
          </p>
        </div>
      </section>

      {/* What this index measures */}
      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-6">
            What this index measures
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="border border-neutral-200 p-6">
              <div className="text-sm font-semibold text-[#c9861b] uppercase tracking-wider mb-3">
                Series 1
              </div>
              <div className="font-bold text-neutral-900 mb-2">
                Incorporations and dissolutions, by quarter
              </div>
              <p className="text-sm text-neutral-600">
                New SIC 47910 companies registered at Companies House each quarter versus companies
                dissolved in the same period. The net figure shows whether the incorporated
                online-retail sector is expanding or contracting. Derived from the{" "}
                <a
                  href="https://download.companieshouse.gov.uk/en_output.html"
                  className="text-[#1a3a5c] underline hover:opacity-75"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CH bulk snapshot
                </a>{" "}
                and the{" "}
                <a
                  href="https://find-and-update.company-information.service.gov.uk/advanced-search"
                  className="text-[#1a3a5c] underline hover:opacity-75"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Companies House Advanced Search API
                </a>
                .
              </p>
            </div>
            <div className="border border-neutral-200 p-6">
              <div className="text-sm font-semibold text-[#c9861b] uppercase tracking-wider mb-3">
                Series 2
              </div>
              <div className="font-bold text-neutral-900 mb-2">Cohort survival curves</div>
              <p className="text-sm text-neutral-600">
                Of the companies incorporated during the 2020-2021 lockdown boom, what share still
                exist? Cohort survival tracks companies by incorporation year and maps their ongoing
                presence against later dissolution records. This produces the index&apos;s
                primary data-PR headline.
              </p>
            </div>
            <div className="border border-neutral-200 p-6">
              <div className="text-sm font-semibold text-[#c9861b] uppercase tracking-wider mb-3">
                Series 3
              </div>
              <div className="font-bold text-neutral-900 mb-2">Regional distribution</div>
              <p className="text-sm text-neutral-600">
                Active SIC 47910 company counts by postcode district, mapped from the registered
                office address field in the bulk snapshot. Shows the geographic concentration of the
                UK incorporated online-retail economy, refreshed each quarter.
              </p>
            </div>
            <div className="border border-neutral-200 p-6">
              <div className="text-sm font-semibold text-[#c9861b] uppercase tracking-wider mb-3">
                Series 4
              </div>
              <div className="font-bold text-neutral-900 mb-2">ONS demand-side overlay</div>
              <p className="text-sm text-neutral-600">
                Internet retail as a proportion of all retail sales, from the ONS{" "}
                <a
                  href="https://www.ons.gov.uk/businessindustryandtrade/retailindustry/timeseries/j4mc/drsi"
                  className="text-[#1a3a5c] underline hover:opacity-75"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  J4MC/DRSI time series
                </a>
                . Plotted against company-birth rates as an external sanity anchor: demand and
                supply-side signals should move in a broadly similar direction over longer horizons.
              </p>
            </div>
            <div className="border border-neutral-200 p-6">
              <div className="text-sm font-semibold text-[#c9861b] uppercase tracking-wider mb-3">
                Series 5
              </div>
              <div className="font-bold text-neutral-900 mb-2">Insolvency overlay</div>
              <p className="text-sm text-neutral-600">
                Monthly insolvency statistics from the{" "}
                <a
                  href="https://www.gov.uk/government/collections/insolvency-service-official-statistics"
                  className="text-[#1a3a5c] underline hover:opacity-75"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Insolvency Service
                </a>{" "}
                provide a sanity band on the dissolution series. Not a headline figure: formal
                insolvency captures only a subset of dissolutions (solvent voluntary strikes-off are
                the more common exit route for small companies).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Data run pending callout */}
      <section className="bg-neutral-50 border-t border-b border-neutral-200 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-4">
            First data run in progress
          </h2>
          <p className="max-w-2xl text-neutral-600 mb-6">
            The index pipeline is being run against the current Companies House bulk snapshot and
            the ONS J4MC/DRSI CSV. Chart and table data will appear here once the pipeline
            produces verified, reproducible figures. The methodology below describes exactly how
            each number will be computed so you can reproduce the counts independently.
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="bg-white border border-neutral-200 p-6">
              <div className="font-semibold text-neutral-900 mb-2">
                While you wait: calculator tools
              </div>
              <p className="text-sm text-neutral-600 mb-4">
                The index will link dissolution trends to the margin and VAT realities that drive
                seller closures. Start with these tools now.
              </p>
              <div className="space-y-2">
                <Link
                  href="/calculators/seller-take-home"
                  className="block text-sm font-medium text-[#1a3a5c] hover:underline"
                >
                  Seller take-home calculator
                </Link>
                <Link
                  href="/calculators/vat-threshold-tracker"
                  className="block text-sm font-medium text-[#1a3a5c] hover:underline"
                >
                  VAT threshold tracker
                </Link>
                <Link
                  href="/calculators/sole-trader-vs-ltd-sellers"
                  className="block text-sm font-medium text-[#1a3a5c] hover:underline"
                >
                  Sole trader vs Ltd for online sellers
                </Link>
              </div>
            </div>
            <div className="bg-white border border-neutral-200 p-6">
              <div className="font-semibold text-neutral-900 mb-2">
                Platform reporting: the HMRC lens on seller data
              </div>
              <p className="text-sm text-neutral-600 mb-4">
                Since{" "}
                <a
                  href="https://www.gov.uk/guidance/digital-platform-reporting"
                  className="text-[#1a3a5c] underline hover:opacity-75"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  1 January 2024
                </a>
                , digital platforms (Amazon, eBay, Vinted, Etsy and others) have been required to
                report seller transaction data to HMRC under the UK&apos;s implementation of the OECD
                DAC7 rules. The incorporated-seller population tracked by this index is now
                systematically visible to HMRC in a way it was not before.
              </p>
              <Link
                href="/services/hmrc-letter-online-sales"
                className="block text-sm font-medium text-[#1a3a5c] hover:underline"
              >
                HMRC letters about online sales: what to do
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why incorporated sellers only */}
      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-4">
            Why this index covers incorporated companies only
          </h2>
          <p className="max-w-2xl text-neutral-700 mb-6">
            Companies House holds data on every UK limited company and LLP. It does not hold data on
            sole traders: the Vinted reseller, the eBay part-timer, the Etsy maker operating as an
            unincorporated individual never appears on the register. This is a feature of the index,
            not a gap.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 max-w-3xl">
            <div className="bg-neutral-50 border border-neutral-200 p-5">
              <div className="font-semibold text-neutral-900 mb-2">What the index captures</div>
              <ul className="text-sm text-neutral-600 space-y-1.5 list-disc list-inside">
                <li>Limited companies and LLPs with SIC code 47910 as primary or secondary</li>
                <li>
                  Corporate Amazon FBA sellers, Shopify merchants, and marketplace operators that
                  have incorporated
                </li>
                <li>The growth and contraction of that incorporated layer over time</li>
                <li>
                  Regional concentration by registered office (a proxy, not trading address)
                </li>
              </ul>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 p-5">
              <div className="font-semibold text-neutral-900 mb-2">What the index does not capture</div>
              <ul className="text-sm text-neutral-600 space-y-1.5 list-disc list-inside">
                <li>
                  Sole traders and individuals selling via marketplaces (the side-hustle layer)
                </li>
                <li>
                  Companies filing under product-specific retail SIC codes (e.g. 47410 computers,
                  47640 sports goods) rather than the generic 47910
                </li>
                <li>
                  Legacy catalogue/mail-order firms that happen to carry SIC 47910 but trade
                  primarily offline
                </li>
                <li>Dormant companies retained at Companies House but not trading</li>
              </ul>
            </div>
          </div>
          <p className="mt-6 max-w-2xl text-sm text-neutral-500">
            The methodology mitigates SIC noise by publishing the full code-set openly (below),
            using the ONS retail proportion series as an external cross-check, and emphasising
            flows (quarterly births and deaths) over absolute counts. Flows are robust to
            constant misclassification; absolute counts are not.
          </p>
        </div>
      </section>

      {/* On-funnel links */}
      <section className="bg-neutral-50 border-t border-b border-neutral-200 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-4">
            Tax and compliance context for online sellers
          </h2>
          <p className="mb-8 max-w-2xl text-neutral-600">
            Corporate churn in the online-retail sector tracks predictable tax and compliance
            pressure points: VAT registration thresholds reached on gross marketplace payout
            (not net settlement), platform reporting making HMRC visibility near-total, and the
            genuine cost difference between sole trader and limited company structures as margins
            compress.
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/for/amazon-sellers"
              className="group border border-neutral-200 bg-white p-5 hover:border-[#1a3a5c] transition-colors"
            >
              <div className="text-xs font-semibold text-[#c9861b] uppercase tracking-wider mb-2">
                Hub
              </div>
              <div className="font-bold text-neutral-900 group-hover:text-[#1a3a5c] transition-colors">
                Amazon sellers
              </div>
              <p className="mt-1.5 text-sm text-neutral-600">
                VAT on marketplace fees, deemed-supplier rules, and settlement reconciliation for
                FBA and FBM sellers.
              </p>
            </Link>
            <Link
              href="/for/shopify-sellers"
              className="group border border-neutral-200 bg-white p-5 hover:border-[#1a3a5c] transition-colors"
            >
              <div className="text-xs font-semibold text-[#c9861b] uppercase tracking-wider mb-2">
                Hub
              </div>
              <div className="font-bold text-neutral-900 group-hover:text-[#1a3a5c] transition-colors">
                Shopify sellers
              </div>
              <p className="mt-1.5 text-sm text-neutral-600">
                DTC merchant tax: VAT on UK and EU sales, bookkeeping for multi-currency payouts,
                and the sole-trader vs Ltd decision.
              </p>
            </Link>
            <Link
              href="/for/marketplace-sellers"
              className="group border border-neutral-200 bg-white p-5 hover:border-[#1a3a5c] transition-colors"
            >
              <div className="text-xs font-semibold text-[#c9861b] uppercase tracking-wider mb-2">
                Hub
              </div>
              <div className="font-bold text-neutral-900 group-hover:text-[#1a3a5c] transition-colors">
                Marketplace sellers
              </div>
              <p className="mt-1.5 text-sm text-neutral-600">
                eBay, Etsy, Vinted, TikTok Shop: platform reporting obligations, the trading
                allowance, and when you cross into formal self-assessment.
              </p>
            </Link>
            <Link
              href="/for/dropshippers"
              className="group border border-neutral-200 bg-white p-5 hover:border-[#1a3a5c] transition-colors"
            >
              <div className="text-xs font-semibold text-[#c9861b] uppercase tracking-wider mb-2">
                Hub
              </div>
              <div className="font-bold text-neutral-900 group-hover:text-[#1a3a5c] transition-colors">
                Dropshippers
              </div>
              <p className="mt-1.5 text-sm text-neutral-600">
                Customs, import VAT under the{" "}
                <a href="/vat/135-import-rule" className="underline">
                  £135 consignment rule
                </a>
                , COGS treatment, and the structural risks specific to high-volume low-margin models.
              </p>
            </Link>
            <Link
              href="/services/ecommerce-vat-compliance"
              className="group border border-neutral-200 bg-white p-5 hover:border-[#1a3a5c] transition-colors"
            >
              <div className="text-xs font-semibold text-[#c9861b] uppercase tracking-wider mb-2">
                Service
              </div>
              <div className="font-bold text-neutral-900 group-hover:text-[#1a3a5c] transition-colors">
                Ecommerce VAT compliance
              </div>
              <p className="mt-1.5 text-sm text-neutral-600">
                VAT registration on gross marketplace revenue, the{" "}
                <a href="/vat/deemed-supplier-establishment" className="underline">
                  deemed-supplier mechanism
                </a>
                , and quarterly returns for multi-platform sellers.
              </p>
            </Link>
            <Link
              href="/services/settlement-payout-reconciliation"
              className="group border border-neutral-200 bg-white p-5 hover:border-[#1a3a5c] transition-colors"
            >
              <div className="text-xs font-semibold text-[#c9861b] uppercase tracking-wider mb-2">
                Service
              </div>
              <div className="font-bold text-neutral-900 group-hover:text-[#1a3a5c] transition-colors">
                Settlement and payout reconciliation
              </div>
              <p className="mt-1.5 text-sm text-neutral-600">
                Matching platform payouts to gross sales, returns, fees, and reserve holds across
                Amazon, eBay and Shopify Payments.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* VAT threshold note */}
      <section className="bg-white py-10 sm:py-12">
        <div className={siteContainerLg}>
          <h2 className="text-lg font-bold text-neutral-900 mb-3">
            A recurring driver of seller closures: the VAT threshold on gross turnover
          </h2>
          <p className="max-w-2xl text-sm text-neutral-700 mb-3">
            The UK{" "}
            <a
              href="https://www.gov.uk/vat-registration/when-to-register"
              className="text-[#1a3a5c] underline hover:opacity-75"
              target="_blank"
              rel="noopener noreferrer"
            >
              VAT registration threshold
            </a>{" "}
            is measured against your gross taxable turnover, not the net payout you receive from a
            marketplace. For Amazon and eBay sellers in particular, gross sales include the
            platform&apos;s fees and fulfilment costs before any deduction: the settlement amount
            that hits your bank account is materially lower than the figure HMRC uses to determine
            whether you must register.
          </p>
          <p className="max-w-2xl text-sm text-neutral-600">
            This misunderstanding appears in the incorporated-seller dissolution data: companies
            whose founders did not realise they had crossed the VAT threshold face unexpected
            back-registration obligations, interest and penalties that compress margins to the
            point of closure. The cohort survival series (once the pipeline runs) will allow us to
            test whether dissolution rates spike in the quarters following the ONS internet-retail
            share surges that would have pushed many sellers over the threshold.
          </p>
          <div className="mt-5 flex flex-wrap gap-4">
            <Link
              href="/calculators/vat-threshold-tracker"
              className="text-sm font-semibold text-[#1a3a5c] hover:underline"
            >
              Use the VAT threshold tracker
            </Link>
            <Link
              href="/vat/deemed-supplier-establishment"
              className="text-sm font-semibold text-[#1a3a5c] hover:underline"
            >
              Deemed-supplier and establishment rules
            </Link>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="bg-neutral-50 border-t border-b border-neutral-200 py-10 sm:py-12">
        <div className={siteContainerLg}>
          <h2 className="text-lg font-bold text-neutral-900 mb-4">Methodology</h2>
          <div className="max-w-2xl space-y-4 text-sm text-neutral-600">
            <div>
              <strong className="text-neutral-900">Primary SIC code.</strong> SIC 47910 (retail
              sale via mail order houses or via internet), as defined in the{" "}
              <a
                href="https://resources.companieshouse.gov.uk/sic/"
                className="text-[#1a3a5c] underline hover:opacity-75"
                target="_blank"
                rel="noopener noreferrer"
              >
                Companies House SIC table
              </a>
              . Used as the headline series and the basis for births, deaths and regional counts.
            </div>
            <div>
              <strong className="text-neutral-900">Labelled secondary series.</strong> SIC 47990
              (other retail not in stores) and SIC 46900 (non-specialised wholesale, the common
              FBA-wholesaler filing code) are tracked separately and never blended silently into
              the SIC 47910 headline.
            </div>
            <div>
              <strong className="text-neutral-900">Births.</strong> Companies incorporated with
              SIC 47910 as their primary code in each calendar quarter, drawn from the{" "}
              <a
                href="https://download.companieshouse.gov.uk/en_output.html"
                className="text-[#1a3a5c] underline hover:opacity-75"
                target="_blank"
                rel="noopener noreferrer"
              >
                Companies House bulk snapshot
              </a>{" "}
              (incorporation date field).
            </div>
            <div>
              <strong className="text-neutral-900">Deaths.</strong> Companies with a dissolution
              date in each calendar quarter, drawn from the{" "}
              <a
                href="https://find-and-update.company-information.service.gov.uk/advanced-search"
                className="text-[#1a3a5c] underline hover:opacity-75"
                target="_blank"
                rel="noopener noreferrer"
              >
                Companies House Advanced Search API
              </a>{" "}
              filtered by{" "}
              <code className="bg-neutral-100 px-1 text-xs">sic_codes=47910</code> and{" "}
              <code className="bg-neutral-100 px-1 text-xs">dissolved_from</code> /{" "}
              <code className="bg-neutral-100 px-1 text-xs">dissolved_to</code>. The bulk snapshot
              alone does not carry deaths; the API is required for this series.
            </div>
            <div>
              <strong className="text-neutral-900">Cohort survival.</strong> Companies
              incorporated in a given year are tracked through subsequent quarterly snapshots.
              Survival rate at quarter Q = companies from that cohort still active in the snapshot
              at Q, divided by the original cohort size.
            </div>
            <div>
              <strong className="text-neutral-900">Regional counts.</strong> Registered office
              postcode from the bulk snapshot mapped to postcode district (first two to four
              characters). A proxy for registered address, not necessarily trading location.
            </div>
            <div>
              <strong className="text-neutral-900">ONS overlay.</strong> Series J4MC (internet
              retail as a proportion of all retail, seasonally adjusted) from the{" "}
              <a
                href="https://www.ons.gov.uk/businessindustryandtrade/retailindustry/timeseries/j4mc/drsi"
                className="text-[#1a3a5c] underline hover:opacity-75"
                target="_blank"
                rel="noopener noreferrer"
              >
                ONS Retail Sales Index
              </a>
              . Used as a demand-side external anchor against company-birth rates.
            </div>
            <div>
              <strong className="text-neutral-900">Dormant company filter.</strong> Companies
              with an accounts status flagged as dormant in the snapshot are excluded from the
              active count where the snapshot field allows. Dormant companies inflate live counts
              without representing active trading businesses.
            </div>
          </div>
          <div className="mt-6 max-w-2xl">
            <h3 className="text-sm font-semibold text-neutral-900 mb-2">Caveats</h3>
            <ul className="text-sm text-neutral-500 space-y-1.5 list-disc list-inside">
              <li>
                SIC 47910 captures some legacy catalogue and mail-order companies that pre-date
                internet retail. Flows are more reliable than absolute counts for this reason.
              </li>
              <li>
                Marketplace sole traders (the Vinted reseller, the eBay side-hustle) never appear
                in Companies House. This index measures the incorporated layer only.
              </li>
              <li>
                Formal dissolution typically lags actual trading closure by weeks to months for
                voluntary strikes-off, and longer for insolvent companies in administration.
              </li>
              <li>
                Registered office address is not a reliable proxy for operational trading location.
                Agent-address company formation services cluster counts artificially in some
                postcode districts.
              </li>
              <li>
                There is no regulator equivalent to CQC (care) or GPhC (pharmacies) for online
                retail. The ONS retail proportion series is the only external anchor for this index.
              </li>
            </ul>
          </div>
          <p className="mt-6 text-sm text-neutral-500 max-w-2xl">
            <strong>Data licences:</strong> Companies House data is published under the{" "}
            <a
              href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Government Licence v3.0
            </a>
            . ONS data is published under the same licence. Insolvency Service statistics are Crown
            copyright, OGL v3.0.
          </p>
          <p className="mt-3 text-sm text-neutral-500 max-w-2xl">
            Update cadence: quarterly, following each Companies House bulk snapshot release. The
            publication date and next scheduled refresh date will appear here once the first data
            run is complete.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-neutral-900 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Running an online retail business?
          </h2>
          <p className="mt-4 text-lg text-neutral-200 max-w-2xl">
            The incorporated-seller economy is more visible to HMRC than it has ever been.
            Platform reporting, gross-turnover VAT thresholds and the bookkeeping gap between
            settlement payout and taxable revenue are the three issues that drive the most
            avoidable costs for incorporated sellers.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center bg-[#c9861b] px-8 py-3.5 text-sm font-semibold text-white hover:bg-[#b5761a] transition-colors"
            >
              Speak to a specialist
            </Link>
            <Link
              href="/calculators/seller-take-home"
              className="inline-flex min-h-12 items-center justify-center border border-white/30 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Seller take-home calculator
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
