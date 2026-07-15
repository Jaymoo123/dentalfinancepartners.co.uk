import type { Metadata } from "next";
import Link from "next/link";
import { niche } from "@/config/niche-loader";
import { btnPrimary, focusRing, siteContainerLg } from "@/components/ui/layout-utils";
import { LeadForm } from "@/components/forms/LeadForm";
import { ecommerceServices } from "@/data/services";
import { sellerHubs } from "@/data/for";

// ponytail: inline SVGs, no icon dep in this workspace
function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

export const metadata: Metadata = {
  title: { absolute: "Ecommerce and marketplace seller accountants UK" },
  description:
    "Specialist accountants for UK online sellers: Amazon FBA/FBM, Shopify, eBay, Etsy, Vinted, TikTok Shop and dropshippers. VAT threshold on gross sales, deemed-supplier rules, settlement reconciliation and HMRC platform-reporting letters.",
  alternates: { canonical: `https://${niche.domain}` },
};

const taxMoments = [
  {
    title: "VAT threshold on gross sales, not your payout",
    body: (
      <>
        The{" "}
        <a
          href="https://www.gov.uk/vat-registration"
          className="underline underline-offset-2 hover:text-[#c9861b]"
        >
          £90,000 VAT registration threshold is measured on gross taxable sales
        </a>
        , not the net payout Amazon or Etsy deposits after fees. Sellers who watch their bank
        balance against the threshold will breach it without realising. There is also a forward-look
        test: registration is required if turnover is expected to exceed £90,000 in the next 30 days
        alone. This is the most common late-registration trap for marketplace sellers.{" "}
        <Link href="/services/ecommerce-vat-compliance" className="font-semibold text-[#c9861b] hover:underline">
          VAT compliance service &rarr;
        </Link>
      </>
    ),
  },
  {
    title: "Deemed-supplier and establishment status",
    body: (
      <>
        Where a seller is not established in the UK,{" "}
        <a
          href="https://www.gov.uk/guidance/vat-and-overseas-goods-sold-to-customers-in-the-uk-using-online-marketplaces"
          className="underline underline-offset-2 hover:text-[#c9861b]"
        >
          the marketplace is the deemed supplier and accounts for UK VAT
        </a>{" "}
        on those sales. UK-established sellers are outside that mechanism and remain liable
        themselves. Establishment status is the single most consequential VAT fact for any
        marketplace seller. HMRC actively challenges weak establishment claims.{" "}
        <Link href="/vat/deemed-supplier-establishment" className="font-semibold text-[#c9861b] hover:underline">
          Deemed-supplier guide &rarr;
        </Link>
      </>
    ),
  },
  {
    title: "VAT on marketplace fees: the reverse charge",
    body: (
      <>
        Marketplace, advertising and software fees billed from abroad are reverse-charge services
        under{" "}
        <a
          href="https://www.gov.uk/guidance/vat-place-of-supply-of-services-notice-741a"
          className="underline underline-offset-2 hover:text-[#c9861b]"
        >
          Notice 741A
        </a>
        . You self-account for the VAT, and crucially that reverse-charge value counts toward the
        £90,000 registration threshold. A sub-threshold seller buying large volumes of overseas
        platform and ad fees can tip over the threshold faster than gross sales alone would suggest.{" "}
        <Link href="/vat/vat-on-marketplace-fees" className="font-semibold text-[#c9861b] hover:underline">
          Fees VAT guide &rarr;
        </Link>
      </>
    ),
  },
  {
    title: "HMRC platform-reporting letters",
    body: (
      <>
        From 1 January 2024,{" "}
        <a
          href="https://www.gov.uk/guidance/reporting-rules-for-digital-platforms"
          className="underline underline-offset-2 hover:text-[#c9861b]"
        >
          digital platforms must report seller income to HMRC under the OECD model rules
        </a>
        , with first reports due in January 2025. The platform-reporting exclusion (below 30 sales
        and approximately £1,700 in the period) determines whether the platform reports you. It is
        not a tax-free threshold. Tax follows trading status. Ignoring an HMRC nudge letter is not a
        strategy.{" "}
        <Link href="/services/hmrc-letter-online-sales" className="font-semibold text-[#c9861b] hover:underline">
          HMRC letter service &rarr;
        </Link>
      </>
    ),
  },
  {
    title: "Settlement and payout reconciliation",
    body: (
      <>
        An Amazon settlement report is not an accounting document. It mixes gross sales, FBA
        fulfilment fees, referral fees, advertising costs, reimbursements and loan repayments in a
        single net figure. Bookkeeping built from bank deposits misstates revenue, understates
        expenses and produces a VAT return that does not reconcile to actual sales. Shopify payouts
        add multiple gateways each settling on different cycles.{" "}
        <Link href="/services/settlement-payout-reconciliation" className="font-semibold text-[#c9861b] hover:underline">
          Reconciliation service &rarr;
        </Link>
      </>
    ),
  },
  {
    title: "Making Tax Digital for Income Tax (MTD ITSA)",
    body: (
      <>
        Sole-trader sellers with qualifying income above £50,000 must keep digital records and file
        quarterly updates from{" "}
        <a
          href="https://www.gov.uk/guidance/check-if-youre-eligible-for-making-tax-digital-for-income-tax"
          className="underline underline-offset-2 hover:text-[#c9861b]"
        >
          6 April 2026
        </a>
        . The threshold drops to £30,000 from 6 April 2027 and to £20,000 from 6 April 2028. The
        sole-trader seller cohort is hit first. For generic MTD mechanics and registration see{" "}
        <a
          href="https://hollowaydavies.co.uk"
          className="underline underline-offset-2 hover:text-[#c9861b]"
          rel="noopener"
        >
          hollowaydavies.co.uk
        </a>
        ; we handle the seller-specific picture.
      </>
    ),
  },
];

const vatCluster = [
  { href: "/vat/deemed-supplier-establishment", label: "Deemed-supplier and establishment" },
  { href: "/vat/vat-on-marketplace-fees", label: "VAT on marketplace fees" },
  { href: "/vat/135-import-rule", label: "The £135 import rule" },
  { href: "/vat/ioss-vs-oss", label: "IOSS vs OSS for EU sales" },
  { href: "/vat/postponed-vat-margin-scheme", label: "Postponed VAT and margin scheme" },
];

const calculatorLinks = [
  {
    title: "Seller take-home calculator",
    body: "Model your true take-home after platform fees, VAT and tax.",
    href: "/calculators/seller-take-home",
  },
  {
    title: "VAT threshold tracker",
    body: "Check your rolling 12-month gross taxable sales against the £90,000 threshold.",
    href: "/calculators/vat-threshold-tracker",
  },
  {
    title: "Sole trader vs Ltd for sellers",
    body: "Compare tax and NI outcomes for your selling income level.",
    href: "/calculators/sole-trader-vs-ltd-sellers",
  },
];

const faqs = [
  {
    q: "Do ecommerce sellers need a specialist accountant?",
    a: "Not legally, but the seller-specific tax layer is routinely missed by generalist firms. VAT registration on gross sales (not payout), deemed-supplier and establishment status, reverse-charge fees, settlement reconciliation and cross-border obligations are all specialist territory. A generalist prepares standard accounts and returns; they do not, by default, handle these.",
  },
  {
    q: "Is my VAT threshold based on gross sales or my marketplace payout?",
    a: "Gross sales. The £90,000 VAT registration threshold is measured on taxable turnover, which for marketplace sellers is the gross selling price before the platform deducts fees and pays out. Monitoring your bank balance or settlement payouts against the threshold understates your taxable turnover and causes late registration.",
  },
  {
    q: "Does the marketplace or the seller account for VAT on my sales?",
    a: "It depends on establishment status. Where you are not established in the UK and sell through an online marketplace to UK customers, the marketplace is the deemed supplier and accounts for UK VAT. UK-established sellers remain liable themselves and are outside the deemed-supply mechanism. Establishment status is the key fact.",
  },
  {
    q: "Can HMRC see my Amazon, eBay, Etsy and Vinted sales?",
    a: "Yes. Digital platform reporting rules took effect on 1 January 2024 and platforms report seller income to HMRC annually from January 2025. The exclusion for sellers below 30 transactions and approximately £1,700 is a reporting exclusion, not a tax threshold. Tax liability follows trading status regardless of whether the platform reports you.",
  },
  {
    q: "Do I pay VAT on Amazon and eBay fees?",
    a: "Marketplace and advertising fees billed from abroad are reverse-charge services under Notice 741A. You self-account for the VAT on your VAT return. The reverse-charge value counts toward your £90,000 VAT registration threshold, which is the classic surprise trigger for sub-threshold sellers with high ad spend.",
  },
  {
    q: "Do you work across multiple platforms and marketplaces?",
    a: "Yes. Most of our seller clients sell across two or more platforms. The challenge is that each platform settles differently, applies fees differently and may have different VAT implications. We work across Amazon FBA and FBM, Shopify, eBay, Etsy, TikTok Shop, Vinted and dropship models.",
  },
  {
    q: "Should I trade as a sole trader or a limited company as a seller?",
    a: "It depends on your income level and extraction plans. Incorporation can be tax-efficient above certain profit levels when salary and dividends are structured correctly, but adds compliance cost and complexity. Use our sole-trader-vs-Ltd calculator for a numbers comparison, and see hollowaydavies.co.uk for the generic incorporation picture. We advise on the seller-specific structuring.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex items-center min-h-[440px] sm:min-h-[560px] overflow-hidden bg-[#1a2942]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a2942] via-[#243550]/80 to-[#0f1c30]" />
        <div className={`${siteContainerLg} relative z-10 py-16 sm:py-20 w-full`}>
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white/80">
              {niche.display_name}
            </div>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Accountants for UK ecommerce and marketplace sellers.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
              {niche.tagline}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Link
                href="/contact"
                className={`inline-flex min-h-12 items-center justify-center bg-[#c9861b] px-6 py-3 sm:px-10 sm:py-4 text-base sm:text-lg font-semibold text-white hover:bg-[#b5761a] transition-colors text-center ${focusRing}`}
              >
                Speak to a seller tax specialist
              </Link>
              <Link
                href="/services"
                className={`inline-flex min-h-12 items-center justify-center border border-white/30 bg-white/10 px-6 py-3 sm:px-10 sm:py-4 text-base sm:text-lg font-medium text-white hover:bg-white/20 transition-colors text-center ${focusRing}`}
              >
                Our services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Differentiation strip */}
      <section className="border-b border-neutral-200 bg-[#fafaf9] py-10 sm:py-12">
        <div className={siteContainerLg}>
          <p className="max-w-3xl text-lg leading-relaxed text-neutral-700 sm:text-xl">
            A marketplace seller accountant owns the tax layer that SaaS tools and generalist firms
            cannot credibly cover: the{" "}
            <a
              href="https://www.gov.uk/vat-registration"
              className="underline underline-offset-2 hover:text-[#c9861b]"
            >
              gross-sales VAT threshold
            </a>{" "}
            the platform payout hides, deemed-supplier and establishment status, VAT on overseas
            marketplace fees, cross-border IOSS and OSS obligations, and settlement reconciliation
            that turns platform reports into accurate accounts. For general ecommerce accounting see{" "}
            <a
              href="https://hollowaydavies.co.uk"
              className="underline underline-offset-2 hover:text-[#c9861b]"
              rel="noopener"
            >
              hollowaydavies.co.uk
            </a>
            ; we handle the multi-platform seller layer.
          </p>
        </div>
      </section>

      {/* Who we help (hubs) */}
      <section className="border-b border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Who we work with.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600">
            Amazon FBA and FBM sellers, Shopify DTC store owners, eBay, Etsy, TikTok Shop and
            Vinted marketplace sellers, and dropshippers. Many clients sell across three or more
            platforms simultaneously. Select your model for the detail that applies.
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sellerHubs.map((hub) => (
              <Link
                key={hub.slug}
                href={`/for/${hub.slug}`}
                className={`group block border border-neutral-200 bg-neutral-50 p-5 sm:p-6 transition-all hover:border-[#c9861b] hover:shadow-md ${focusRing}`}
              >
                <span className="text-base font-bold text-neutral-900 group-hover:text-[#c9861b] transition-colors">
                  {hub.title}
                </span>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500 line-clamp-2">
                  {hub.headline}
                </p>
                <ArrowRight className="mt-3 h-4 w-4 text-neutral-400 group-hover:text-[#c9861b] group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="border-b border-neutral-200 bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <h2 className="max-w-3xl text-2xl font-bold text-neutral-900 sm:text-4xl">
            Specialist services for online sellers.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
            {ecommerceServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className={`group block border border-neutral-200 bg-white p-6 sm:p-7 transition-all hover:border-[#c9861b] hover:shadow-md ${focusRing}`}
              >
                <h3 className="text-base font-bold text-neutral-900 group-hover:text-[#c9861b] transition-colors">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500 line-clamp-2">
                  {service.headline}
                </p>
                <div className="mt-4 flex items-center text-[#c9861b] font-semibold text-sm">
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tax moments strip */}
      <section className="border-b border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <h2 className="max-w-3xl text-2xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            The seller tax moments that bring owners here.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600">
            Most sellers reach out at one of these six points. Each involves money that a generalist
            accountant will not handle correctly without seller-specific knowledge.
          </p>

          {/* Key dates table */}
          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-sm border border-neutral-200">
              <thead>
                <tr className="bg-neutral-100 text-left">
                  <th className="px-4 py-3 font-semibold text-neutral-800 border-b border-neutral-200">
                    Seller tax event
                  </th>
                  <th className="px-4 py-3 font-semibold text-neutral-800 border-b border-neutral-200">
                    Key figure or date
                  </th>
                  <th className="px-4 py-3 font-semibold text-neutral-800 border-b border-neutral-200">
                    Common mistake
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-neutral-100">
                  <td className="px-4 py-3 font-medium text-neutral-900">VAT registration</td>
                  <td className="px-4 py-3 text-neutral-600">
                    <a
                      href="https://www.gov.uk/vat-registration"
                      className="underline underline-offset-2 hover:text-[#c9861b]"
                    >
                      £90,000 gross sales (rolling 12 months)
                    </a>
                  </td>
                  <td className="px-4 py-3 text-neutral-600">Measuring against net payout, not gross sales</td>
                </tr>
                <tr className="border-b border-neutral-100 bg-neutral-50">
                  <td className="px-4 py-3 font-medium text-neutral-900">Platform reporting</td>
                  <td className="px-4 py-3 text-neutral-600">
                    <a
                      href="https://www.gov.uk/guidance/reporting-rules-for-digital-platforms"
                      className="underline underline-offset-2 hover:text-[#c9861b]"
                    >
                      From 1 January 2024, first reports January 2025
                    </a>
                  </td>
                  <td className="px-4 py-3 text-neutral-600">
                    Treating the 30-sale/£1,700 reporting exclusion as a tax threshold
                  </td>
                </tr>
                <tr className="border-b border-neutral-100">
                  <td className="px-4 py-3 font-medium text-neutral-900">MTD ITSA (sole traders)</td>
                  <td className="px-4 py-3 text-neutral-600">
                    <a
                      href="https://www.gov.uk/guidance/check-if-youre-eligible-for-making-tax-digital-for-income-tax"
                      className="underline underline-offset-2 hover:text-[#c9861b]"
                    >
                      £50,000 from 6 April 2026
                    </a>
                    ; £30,000 from 6 April 2027
                  </td>
                  <td className="px-4 py-3 text-neutral-600">Assuming it applies only to landlords or larger businesses</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {taxMoments.map((moment, i) => (
              <div key={i} className="border border-neutral-200 bg-neutral-50 p-6">
                <h3 className="text-base font-bold text-neutral-900">{moment.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{moment.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-border VAT cluster teaser */}
      <section className="border-b border-neutral-200 bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
                Cross-border and VAT depth guides.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-neutral-600">
                The UK rules on selling goods to overseas buyers changed fundamentally after 2021.
                The{" "}
                <a
                  href="https://www.gov.uk/guidance/vat-and-overseas-goods-sold-to-customers-in-the-uk-using-online-marketplaces"
                  className="underline underline-offset-2 hover:text-[#c9861b]"
                >
                  deemed-supplier mechanism
                </a>
                , the{" "}
                <a
                  href="https://www.gov.uk/guidance/vat-and-overseas-goods-sold-directly-to-customers-in-the-uk"
                  className="underline underline-offset-2 hover:text-[#c9861b]"
                >
                  £135 import rule for direct-to-consumer dropship
                </a>
                , IOSS for EU sales and postponed VAT accounting for importers are all live seller
                obligations that most content treats at surface level. Our VAT cluster covers each in
                the depth a working seller actually needs.
              </p>
              <p className="mt-4 text-sm text-neutral-500">
                Note: IOSS and OSS cross-border figures are EU law; our guides cite the correct
                sources at each decision point rather than asserting figures from the wrong
                jurisdiction.
              </p>
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900 mb-4">VAT and cross-border guides</h3>
              <div className="space-y-3">
                {vatCluster.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group flex items-center justify-between border border-neutral-200 bg-white px-5 py-4 text-sm font-medium text-neutral-800 hover:border-[#c9861b] hover:text-[#c9861b] transition-all ${focusRing}`}
                  >
                    {item.label}
                    <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-[#c9861b] group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
                <Link
                  href="/services/selling-into-the-eu"
                  className={`group flex items-center justify-between border border-neutral-200 bg-white px-5 py-4 text-sm font-medium text-neutral-800 hover:border-[#c9861b] hover:text-[#c9861b] transition-all ${focusRing}`}
                >
                  Selling into the EU: full service
                  <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-[#c9861b] group-hover:translate-x-1 transition-all" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free tools + Online Seller Index */}
      <section className="border-b border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
                Free seller tools.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-neutral-600">
                Scenario and compliance tools built for UK online sellers. No sign-up, no data
                stored. Model your take-home after platform fees and tax, track your rolling gross
                sales against the VAT threshold, or compare sole trader and limited company
                outcomes at your income level.
              </p>
              <div className="mt-8 space-y-3">
                {calculatorLinks.map((calc) => (
                  <Link
                    key={calc.href}
                    href={calc.href}
                    className={`group flex items-start justify-between gap-4 border border-neutral-200 bg-white px-5 py-4 transition-all hover:border-[#c9861b] ${focusRing}`}
                  >
                    <div>
                      <div className="text-sm font-bold text-neutral-900 group-hover:text-[#c9861b] transition-colors">
                        {calc.title}
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-neutral-500">{calc.body}</p>
                    </div>
                    <ArrowRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-neutral-400 group-hover:text-[#c9861b] group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                Online Seller Index.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                Data for UK marketplace sellers: platform-registered seller counts, VAT registration
                rates by category, platform-reporting volumes and the tax metrics that seller
                businesses use to benchmark their position. An evidence base for the seller community,
                not a marketing piece.
              </p>
              <div className="mt-6">
                <Link
                  href="/research/online-seller-index"
                  className={`group flex items-center justify-between border border-neutral-200 bg-white px-5 py-4 text-sm font-semibold text-neutral-800 hover:border-[#c9861b] hover:text-[#c9861b] transition-all ${focusRing}`}
                >
                  View the Online Seller Index
                  <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-[#c9861b] group-hover:translate-x-1 transition-all" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why a specialist */}
      <section className="border-b border-neutral-200 bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
                Why a marketplace specialist, not a generalist accountant?
              </h2>
              <div className="mt-6 space-y-5 text-base leading-relaxed text-neutral-600">
                <p>
                  A generalist firm prepares your accounts and files your returns. They will not, by
                  default, know that your VAT registration threshold is on gross sales before the
                  platform takes its fees, or that marketplace fees billed from abroad count toward
                  that threshold under the reverse charge, or that your settlement report is not an
                  accounting document.
                </p>
                <p>
                  SaaS tools (A2X, Link My Books and similar) automate settlement reconciliation
                  well. They sell software, not tax positions. They cannot assess your establishment
                  status, advise on the deemed-supplier mechanism, or tell you whether your
                  cross-border fulfilment creates a VAT registration obligation in another
                  jurisdiction.
                </p>
                <p>
                  Seller-specialist accounting means the VAT registration decision, the scheme
                  choice, the cross-border structure and the annual accounts are all built around how
                  platforms and fulfilment models actually work, not a standard compliance template
                  with an ecommerce label.
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-neutral-900">
                The situations that typically bring sellers to a specialist
              </h3>
              <div className="mt-5 space-y-4">
                {[
                  {
                    title: "An HMRC letter about online sales",
                    body: "Platform reporting data goes to HMRC from January 2025. Sellers whose returns do not match the platform data receive nudge letters. Ignoring them escalates to formal checks with higher penalties.",
                  },
                  {
                    title: "Approaching or over the VAT threshold",
                    body: "The threshold is on gross sales. Sellers who discover they have been above it for months, measured correctly, need registration, a VAT scheme decision and potentially a back-dated return before HMRC finds the gap first.",
                  },
                  {
                    title: "Expanding to EU customers or FBA distribution",
                    body: "Cross-border fulfilment adds establishment-status questions, potential country-level registration obligations and the IOSS intermediary requirement for GB sellers. The consequences of getting it wrong land on the seller.",
                  },
                ].map((item, i) => (
                  <div key={i} className="border-l-2 border-[#c9861b] pl-5 py-1">
                    <p className="text-sm font-semibold text-neutral-800">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-600">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="border-b border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            Common questions from online sellers.
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-neutral-200 bg-neutral-50 p-6">
                <h3 className="text-sm font-bold text-neutral-900">{faq.q}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA with LeadForm */}
      <section className="relative overflow-hidden bg-[#1a2942]">
        <div className={`${siteContainerLg} relative z-10 py-12 sm:py-20 lg:py-24`}>
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-4xl lg:text-5xl">
                Talk to a seller tax specialist
              </h2>
              <p className="mt-4 sm:mt-6 text-lg sm:text-xl leading-relaxed text-white/80">
                Tell us the platforms you sell on, your monthly revenue band, VAT status and
                fulfilment model. We will come back within one working day with no obligation.
              </p>
            </div>
            <div className="bg-white p-6 sm:p-8 lg:p-10">
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-4 sm:mb-6">
                Get in touch
              </h3>
              <LeadForm submitLabel="Send enquiry" />
            </div>
          </div>
        </div>
      </section>

      {/* Blog footer strip */}
      <section className="border-t border-neutral-200 bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl lg:text-4xl">
              Plain English guides for UK online sellers.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
              VAT threshold on gross sales vs payout, the flat-rate scheme trap for goods sellers,
              platform reporting and trading-allowance rules, HMRC badge-of-trade analysis,
              cash vs accruals for stock businesses, and sole trader vs limited company maths for
              sellers at different income levels.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/blog" className={btnPrimary}>
                Browse all guides
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
