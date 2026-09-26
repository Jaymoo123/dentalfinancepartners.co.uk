import type { Metadata } from "next";
import Link from "next/link";
import { niche } from "@/config/niche-loader";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { StatsCounter } from "@accounting-network/web-shared/design/marketing/StatsCounter";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { NumberedReasons } from "@accounting-network/web-shared/design/marketing/NumberedReasons";
import EcommerceBackdrop from "@/components/layout/EcommerceBackdrop";
import { btnPrimary, focusRing, siteContainerLg, sectionY } from "@/components/ui/layout-utils";
import { LeadForm } from "@/components/forms/LeadForm";
import { ecommerceServices } from "@/data/services";
import { sellerHubs } from "@/data/for";
import { buildFaqJsonLd, buildWebsiteJsonLd } from "@/lib/schema";

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
    "Specialist accountants for UK online sellers on Amazon, Shopify, eBay, Etsy, Vinted and TikTok Shop. VAT on gross sales, deemed supplier rules and HMRC letters.",
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
          className="underline underline-offset-2 hover:text-[var(--brand-primary-text)]"
        >
          £90,000 VAT registration threshold is measured on gross taxable sales
        </a>
        , not the net payout Amazon or Etsy deposits after fees. Sellers who watch their bank
        balance against the threshold will breach it without realising. There is also a forward-look
        test: registration is required if turnover is expected to exceed £90,000 in the next 30 days
        alone. This is the most common late-registration trap for marketplace sellers.{" "}
        <Link href="/services/ecommerce-vat-compliance" className="font-semibold text-[var(--brand-primary-text)] hover:underline">
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
          className="underline underline-offset-2 hover:text-[var(--brand-primary-text)]"
        >
          the marketplace is the deemed supplier and accounts for UK VAT
        </a>{" "}
        on those sales. UK-established sellers are outside that mechanism and remain liable
        themselves. Establishment status is the single most consequential VAT fact for any
        marketplace seller. HMRC actively challenges weak establishment claims.{" "}
        <Link href="/vat/deemed-supplier-establishment" className="font-semibold text-[var(--brand-primary-text)] hover:underline">
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
          className="underline underline-offset-2 hover:text-[var(--brand-primary-text)]"
        >
          Notice 741A
        </a>
        . You self-account for the VAT, and crucially that reverse-charge value counts toward the
        £90,000 registration threshold. A sub-threshold seller buying large volumes of overseas
        platform and ad fees can tip over the threshold faster than gross sales alone would suggest.{" "}
        <Link href="/vat/vat-on-marketplace-fees" className="font-semibold text-[var(--brand-primary-text)] hover:underline">
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
          className="underline underline-offset-2 hover:text-[var(--brand-primary-text)]"
        >
          digital platforms must report seller income to HMRC under the OECD model rules
        </a>
        , and the first reports were due in January 2025. The platform-reporting exclusion (below 30 sales
        and approximately £1,700 in the period) determines whether the platform reports you. It is
        not a tax-free threshold. Tax follows trading status. Ignoring an HMRC nudge letter is not a
        strategy.{" "}
        <Link href="/services/hmrc-letter-online-sales" className="font-semibold text-[var(--brand-primary-text)] hover:underline">
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
        <Link href="/services/settlement-payout-reconciliation" className="font-semibold text-[var(--brand-primary-text)] hover:underline">
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
          className="underline underline-offset-2 hover:text-[var(--brand-primary-text)]"
        >
          6 April 2026
        </a>
        . The threshold drops to £30,000 from 6 April 2027 and to £20,000 from 6 April 2028. The
        sole-trader seller cohort is hit first. For generic MTD mechanics and registration see{" "}
        <a
          href="https://www.hollowaydavies.co.uk"
          className="underline underline-offset-2 hover:text-[var(--brand-primary-text)]"
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
    href: "/calculators/seller-take-home-calculator",
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

/**
 * Strip under the hero, fed to packages/web-shared/design/marketing/StatsCounter.tsx.
 *
 * Every TAX figure on this page (the VAT registration threshold, the
 * platform-reporting exclusion pair, the three MTD thresholds and the April
 * commencement dates) carries a gov.uk anchor on the figure itself, and
 * StatsCounter renders one bare number with no markup: feeding it any of them
 * would delete the citation. It also formats with `toFixed`, which strips the
 * thousands separator, so a money figure would stop being byte-identical.
 * Those figures are therefore left exactly where they are. No literal figure
 * is repeated in this note, so the digit-extraction diff stays clean.
 *
 * What this strip counts instead is this site's own inventory, read from the
 * arrays that render the bands below, so the numbers cannot drift from the
 * page. No citation to lose, no claim asserted: each one is verifiable by
 * scrolling. Labels are structural, reusing the words the bands already use.
 */
const homeStats = [
  { target: ecommerceServices.length, label: "Specialist services" },
  { target: sellerHubs.length, label: "Seller audiences" },
  { target: vatCluster.length, label: "VAT depth guides" },
  { target: calculatorLinks.length, label: "Free seller tools" },
];

/**
 * Was the inline array in the right-hand column of the "why a specialist"
 * band. Lifted to module scope unchanged so
 * packages/web-shared/design/marketing/NumberedReasons.tsx can take it: same
 * `{ title, body }` shape, same strings, three items against its three-up grid.
 */
const specialistSituations = [
  {
    title: "An HMRC letter about online sales",
    body: "Platform reporting data has gone to HMRC since January 2025. Sellers whose returns do not match the platform data receive nudge letters. Ignoring them escalates to formal checks with higher penalties.",
  },
  {
    title: "Approaching or over the VAT threshold",
    body: "The threshold is on gross sales. Sellers who discover they have been above it for months, measured correctly, need registration, a VAT scheme decision and potentially a back-dated return before HMRC finds the gap first.",
  },
  {
    title: "Expanding to EU customers or FBA distribution",
    body: "Cross-border fulfilment adds establishment-status questions, potential country-level registration obligations and the IOSS intermediary requirement for GB sellers. The consequences of getting it wrong land on the seller.",
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
    // "Most of our seller clients sell across two or more platforms" removed:
    // an aggregate claim about a client base on a site that publishes no client
    // information anywhere, which is on the site's standing no-claims list. The
    // phase-0 claims ledger missed it because its grep was `our client` and the
    // string was `our seller clients`. Nothing else in the answer changed, and
    // it still answers the question it is under.
    a: "Yes. Each platform settles differently, applies fees differently and may have different VAT implications. We work across Amazon FBA and FBM, Shopify, eBay, Etsy, TikTok Shop, Vinted and dropship models.",
  },
  {
    q: "Should I trade as a sole trader or a limited company as a seller?",
    a: "It depends on your income level and extraction plans. Incorporation can be tax-efficient above certain profit levels when salary and dividends are structured correctly, but adds compliance cost and complexity. Use our sole-trader-vs-Ltd calculator for a numbers comparison, and see hollowaydavies.co.uk for the generic incorporation picture. We advise on the seller-specific structuring.",
  },
];

/**
 * KIT ADOPTION RECORD FOR THIS ROUTE (section 9.1 row 2b is measured over this
 * file plus components/marketing/*.tsx, so every decline is written out).
 *
 * ADOPTED: packages/web-shared/design/primitives/page-blocks.tsx `Eyebrow`, on
 * every left-aligned content band, matching app/services/[slug], app/vat/[slug]
 * and app/calculators/[slug]. Measured on this page's two light grounds:
 * slate-600 label 7.58 on #ffffff and 7.26 on #fafaf9; its primary-600 rule
 * 4.81 and 4.61. The labels are structural section markers, not claims.
 * ADOPTED (design uplift, 2026-09-26, after the owner read the port as "plain
 * jane"): packages/web-shared/design/marketing/StatsCounter.tsx as the strip
 * under the hero, packages/web-shared/design/marketing/LeadCTAPanel.tsx as the
 * closing band, packages/web-shared/design/marketing/NumberedReasons.tsx for
 * the three situations, and a local
 * src/components/layout/EcommerceBackdrop.tsx on both dark bands. Each one
 * was declined during the port; the reasons those declines gave are answered
 * beside each adoption or below. This is the a3/a5/a7/a8 set in
 * docs/_engines/DESIGN_GAP_DIAGNOSIS_2026-09-14.md.
 * ADOPTED: `sectionY` from packages/web-shared/design/layout-utils.ts (via the
 * site re-export), replacing eight local `py-12 sm:py-16 lg:py-20` strings. The
 * only delta is the 20-step moving from lg to md, which is the Property
 * standard rhythm the port exists to adopt.
 *
 * DECLINED, whole route:
 * - packages/web-shared/design/primitives/Breadcrumb.tsx. This is the root
 *   document. There is no parent to link to, and the only trail it could draw
 *   is a self-referential "Home" crumb, which is worse than none: it would add
 *   a same-page link and a BreadcrumbList JSON-LD asserting a one-item trail.
 * - packages/web-shared/design/primitives/page-blocks.tsx `CardStack`. Two
 *   blockers, either fatal. Its `items` is typed `{ title: string; body: string }`
 *   and every `taxMoments[].body` here is a ReactNode carrying real anchors, so
 *   it does not typecheck; and line 105 renders the body as a TEXT child, the
 *   exact defect phase 3 had to reverse on this site's three data files and
 *   phase 4 on the kit Calculator. Its slate/rounded-xl card surface would also
 *   repaint every card on the page.
 * - packages/web-shared/design/marketing/CoverageCards.tsx and
 *   packages/web-shared/design/marketing/ComparisonTable.tsx. The dependency
 *   half of the original decline is GONE: lucide-react is declared in
 *   ecommerce/web/package.json now, and LeadCTAPanel and NumberedReasons come
 *   in through it. What still stands is content. CoverageCards needs a per-item
 *   icon nobody has chosen, and ComparisonTable needs an authored
 *   them-against-us row set that does not exist here: the nearest material is
 *   the three "why a specialist" paragraphs, which are argument, not rows, and
 *   splitting them into a comparison grid would be a new comparative claim.
 *   Owner item, not a build item.
 * - packages/web-shared/design/marketing/WhatToExpectCard.tsx. The owner lifted
 *   the ban on condition that explicit props are passed, and the condition is
 *   the problem on THIS route rather than the component: its `items` are
 *   one-line strings, and the only sequence-of-what-happens-next copy published
 *   on this page is the two sentences in the closing panel's description, which
 *   are already rendering there. Splitting those in half to fill a four-tick
 *   card would leave the card thin and the panel thinner. Its real homes are
 *   /contact and /thank-you, which are other builders' routes. Reported as an
 *   owner item: three or four short "what happens next" lines, authored once,
 *   and the card goes in.
 * - packages/web-shared/design/marketing/WhyUsList.tsx and
 *   packages/web-shared/design/marketing/DrawnTickList.tsx. Both are client
 *   islands that flatten their content to a single line per item; the "why a
 *   specialist" material here is paragraph-length argument, and reshaping it
 *   into list lines would drop the qualifiers, which is authored copy this
 *   route may not rewrite. WhyUsList also animates the `num-glow` keyframe from
 *   packages/web-shared/design/globals-standard.css, which this site does not
 *   import.
 * - packages/web-shared/design/marketing/ProcessTimeline.tsx. It renders an
 *   ordered onboarding sequence; no such steps are authored anywhere on this
 *   site, so adopting it means writing new marketing copy.
 * - packages/web-shared/design/marketing/ProblemStatement.tsx. It hardcodes
 *   Property's landlord copy verbatim ("Your rent went up. Your profit
 *   didn't.") and emits a CTA attribute triple of its own (problem_book /
 *   problem_statement / form) pointing at "#book", an anchor that does not
 *   exist on this site. Either one alone is disqualifying. The literal
 *   attribute name is left unwritten here on purpose: the CTA snapshot gate
 *   counts occurrences in source, and a comment must not move that count.
 * - packages/web-shared/design/marketing/TopicSection.tsx. It wraps its
 *   children in a bg-white / bg-slate-50 band with its own container and
 *   `Prose` stack. The bands here are heterogeneous (a data table, four grids,
 *   two two-column splits) and the page's light/dark rhythm alternates
 *   #ffffff with #fafaf9, so it would repaint the whole page to import a
 *   heading recipe this file already matches.
 * - packages/web-shared/design/primitives/NoticeCard.tsx. It is the outcome
 *   card for the token-gated /book and /complete flows ("link expired", "you
 *   are all set"). There is no outcome state on the homepage to carry.
 * - packages/web-shared/design/marketing/StickyCTA.tsx (an interruption, banned
 *   estate-wide) and
 *   packages/web-shared/design/marketing/TestimonialsSection.tsx (hardcodes
 *   another site's quotes and this site has no authored social proof, so
 *   adopting it would be inventing it).
 */
export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildFaqJsonLd(faqs.map((f) => ({ question: f.q, answer: f.a }))),
        }}
      />
      {/* buildWebsiteJsonLd had no call site, so no route carried a WebSite
          node. Property (app/page.tsx:200) and generalist (app/layout.tsx:104)
          both emit one, so the estate answer is to wire it rather than delete
          it. Homepage only, and nothing else on this route emits a WebSite.
          It asserts no claim: name, url and description are the same strings
          the root layout already publishes as the og card. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildWebsiteJsonLd() }}
      />
      {/* Hero */}
      <section className="ground-dark relative flex items-center min-h-[440px] sm:min-h-[560px] overflow-hidden bg-[#1a2942]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a2942] via-[#243550]/80 to-[#0f1c30]" />
        <EcommerceBackdrop patternId="ecommerce-settlement-run-hero" />
        <div className={`${siteContainerLg} relative z-10 py-16 sm:py-20 w-full`}>
          <div className="max-w-3xl">
            {/* Status pill, the anatomy generalist/web/src/app/page.tsx:257 runs
                and this site shipped as a square brand chip. The words are the
                key-dates table's own row, not new copy, and it is a genuine
                "this is live now" line, which is what the animated dot is for.

                CONTRAST, measured at each gradient stop composited, per section
                9.1 row 7. Stops #1a2942, #22334d (the via #243550 at 80% over
                the base) and #0f1c30. The pill face is primary-400 at 10% over
                each: #2c323e / #333b48 / #22272e. White label on that face is
                12.86 / 11.29 / 15.02. The dot is the brand hex #c9861b, a
                GRAPHIC here, and it measures 4.23 / 3.71 / 4.94 on the face,
                past the 3.0 floor at the worst stop.

                The ring is white/50, NOT generalist's white/25. This is the
                same correction the secondary button below carries: white/25
                composites to 2.19 against the via-stop ground, under the 3.0
                graphic floor. white/50 is 4.22 / 3.93 / 4.55 against the pill
                face and 4.78 / 4.43 / 5.17 against the section ground. */}
            <div className="mb-6 inline-flex items-center gap-2.5 rounded-full bg-primary-400/10 px-4 py-2 text-xs font-bold tracking-wide text-white ring-1 ring-white/50 backdrop-blur-lg sm:text-sm">
              <span className="relative flex h-2.5 w-2.5" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary-400" />
              </span>
              From 1 January 2024, first reports January 2025
            </div>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Accountants for UK ecommerce and marketplace sellers.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
              {niche.tagline}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Link href="/contact" className={btnPrimary}>
                Speak to a seller tax specialist
              </Link>
              {/* CONTRAST FIX, measured at each gradient stop composited, per
                  section 9.1 row 7, because the ground here is a gradient and
                  not the declared #1a2942 base. Stops: #1a2942, #22334d (the
                  via #243550 at 80% over the base) and #0f1c30. This control's
                  own face is bg-white/10 over each of those, and the border was
                  white/30, which measured 1.94 / 1.87 / 2.01 against that face
                  and 2.63 / 2.54 / 2.69 against the section ground: below the
                  3.0 non-text floor at every stop, worst at the via stop.
                  white/50 measures 3.53 / 3.27 / 3.86 against the face and
                  4.78 / 4.43 / 5.17 against the ground, so it clears 3.0 at the
                  worst stop on both readings. The label itself was never in
                  question: white on the button face is 10.76 / 9.40 / 12.76. */}
              <Link
                href="/services"
                className={`inline-flex min-h-12 items-center justify-center rounded-xl border border-white/50 bg-white/10 px-6 py-3 sm:px-10 sm:py-4 text-base sm:text-lg font-medium text-white hover:bg-white/20 transition-colors text-center ${focusRing}`}
              >
                Our services
              </Link>
            </div>
            {/* Hub row, generalist's trust-badge row at page.tsx:300 with this
                site's own hub titles in place of claims. Every string is the
                `title` the band below renders, so nothing is authored here and
                nothing can drift. white/90 on the darkest stop is 12.5+. */}
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-xs text-white/90 sm:gap-x-6 sm:text-sm">
              {sellerHubs.map((hub) => (
                <div key={hub.slug} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary-400" aria-hidden />
                  <span className="font-semibold">{hub.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Inventory strip. generalist page.tsx:311 runs the same band in the
          same position. See the `homeStats` note for why it counts sections
          rather than tax figures. */}
      <section className="border-b border-neutral-200 bg-white py-6 sm:py-8">
        <div className={siteContainerLg}>
          <StatsCounter stats={homeStats} />
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
              className="underline underline-offset-2 hover:text-[var(--brand-primary-text)]"
            >
              gross-sales VAT threshold
            </a>{" "}
            the platform payout hides, deemed-supplier and establishment status, VAT on overseas
            marketplace fees, cross-border IOSS and OSS obligations, and settlement reconciliation
            that turns platform reports into accurate accounts. For general ecommerce accounting see{" "}
            <a
              href="https://www.hollowaydavies.co.uk"
              className="underline underline-offset-2 hover:text-[var(--brand-primary-text)]"
              rel="noopener"
            >
              hollowaydavies.co.uk
            </a>
            ; we handle the multi-platform seller layer.
          </p>
        </div>
      </section>

      {/* Who we help (hubs) */}
      <section className={`border-b border-neutral-200 bg-white ${sectionY}`}>
        <div className={siteContainerLg}>
          <Eyebrow>Audiences</Eyebrow>
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
                className={`group block rounded-xl border border-neutral-200 bg-neutral-50 p-5 sm:p-6 transition-all hover:border-primary-400 hover:shadow-md ${focusRing}`}
              >
                <span className="text-base font-bold text-neutral-900 group-hover:text-[var(--brand-primary-text)] transition-colors">
                  {hub.title}
                </span>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500 line-clamp-2">
                  {hub.headline}
                </p>
                <ArrowRight className="mt-3 h-4 w-4 text-neutral-400 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className={`border-b border-neutral-200 bg-[#fafaf9] ${sectionY}`}>
        <div className={siteContainerLg}>
          <Eyebrow>The work</Eyebrow>
          <h2 className="max-w-3xl text-2xl font-bold text-neutral-900 sm:text-4xl">
            Specialist services for online sellers.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
            {ecommerceServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className={`group block rounded-xl border border-neutral-200 bg-white p-6 sm:p-7 transition-all hover:border-primary-400 hover:shadow-md ${focusRing}`}
              >
                <h3 className="text-base font-bold text-neutral-900 group-hover:text-[var(--brand-primary-text)] transition-colors">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500 line-clamp-2">
                  {service.headline}
                </p>
                <div className="mt-4 flex items-center text-[var(--brand-primary-text)] font-semibold text-sm">
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tax moments strip */}
      <section className={`border-b border-neutral-200 bg-white ${sectionY}`}>
        <div className={siteContainerLg}>
          <Eyebrow>The problem</Eyebrow>
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
                      className="underline underline-offset-2 hover:text-[var(--brand-primary-text)]"
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
                      className="underline underline-offset-2 hover:text-[var(--brand-primary-text)]"
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
                      className="underline underline-offset-2 hover:text-[var(--brand-primary-text)]"
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
              <div key={i} className="rounded-xl border border-neutral-200 bg-neutral-50 p-6">
                <h3 className="text-base font-bold text-neutral-900">{moment.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{moment.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-border VAT cluster teaser */}
      <section className={`border-b border-neutral-200 bg-[#fafaf9] ${sectionY}`}>
        <div className={siteContainerLg}>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
            <div>
              <Eyebrow>Depth guides</Eyebrow>
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
                Cross-border and VAT depth guides.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-neutral-600">
                The UK rules on selling goods to overseas buyers changed fundamentally after 2021.
                The{" "}
                <a
                  href="https://www.gov.uk/guidance/vat-and-overseas-goods-sold-to-customers-in-the-uk-using-online-marketplaces"
                  className="underline underline-offset-2 hover:text-[var(--brand-primary-text)]"
                >
                  deemed-supplier mechanism
                </a>
                , the{" "}
                <a
                  href="https://www.gov.uk/guidance/vat-and-overseas-goods-sold-directly-to-customers-in-the-uk"
                  className="underline underline-offset-2 hover:text-[var(--brand-primary-text)]"
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
                    className={`group flex items-center justify-between rounded-xl border border-neutral-200 bg-white px-5 py-4 text-sm font-medium text-neutral-800 hover:border-primary-400 hover:text-[var(--brand-primary-text)] transition-all ${focusRing}`}
                  >
                    {item.label}
                    <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
                <Link
                  href="/services/selling-into-the-eu"
                  className={`group flex items-center justify-between rounded-xl border border-neutral-200 bg-white px-5 py-4 text-sm font-medium text-neutral-800 hover:border-primary-400 hover:text-[var(--brand-primary-text)] transition-all ${focusRing}`}
                >
                  Selling into the EU: full service
                  <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free tools + Online Seller Index */}
      <section className={`border-b border-neutral-200 bg-white ${sectionY}`}>
        <div className={siteContainerLg}>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
            <div>
              <Eyebrow>Tools</Eyebrow>
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
                    className={`group flex items-start justify-between gap-4 rounded-xl border border-neutral-200 bg-white px-5 py-4 transition-all hover:border-primary-400 ${focusRing}`}
                  >
                    <div>
                      <div className="text-sm font-bold text-neutral-900 group-hover:text-[var(--brand-primary-text)] transition-colors">
                        {calc.title}
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-neutral-500">{calc.body}</p>
                    </div>
                    <ArrowRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-neutral-400 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                Online Seller Index.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                Data for UK marketplace sellers: how many SIC 47910 online retail companies sit on
                the Companies House register, how many have dissolved, quarterly formation and
                dissolution churn, survival by formation-year cohort, and the ONS internet share of
                retail sales as a demand-side anchor. It measures the incorporated layer only, since
                marketplace-only sole traders never reach the register. An evidence base for the
                seller community, not a marketing piece.
              </p>
              <div className="mt-6">
                <Link
                  href="/research/online-seller-index"
                  className={`group flex items-center justify-between rounded-xl border border-neutral-200 bg-white px-5 py-4 text-sm font-semibold text-neutral-800 hover:border-primary-400 hover:text-[var(--brand-primary-text)] transition-all ${focusRing}`}
                >
                  View the Online Seller Index
                  <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why a specialist */}
      <section className={`border-b border-neutral-200 bg-[#fafaf9] ${sectionY}`}>
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <div>
              <Eyebrow>The difference</Eyebrow>
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
          </div>
          {/* Was a border-l list in a second column. Same three strings, same
              order, now the kit's numbered-reasons figure: the numerals draw in
              on first scroll and settle lit. The port declined this component
              because `.story-numeral` / `.story-numeral-rule` existed only in
              Property's globals.css; they are defined in this site's
              globals.css now, recoloured onto this ramp, so the decline is
              spent. On the #fafaf9 ground the numeral (primary-700 #8a5e1a) is
              5.44, its rule (primary-600 #9e6615) is 4.61 against a 3.0 graphic
              floor, and the component's own slate-900 heading and slate-600
              body are 17.07 and 7.26. The pre-draw numeral is neutral-300 at
              1.42, which is deliberate in that file: it is the unlit state of a
              mark that is about to light, it carries no information the lit
              state does not, and reduced-motion lands every numeral already
              lit. */}
          <h3 className="mt-12 text-lg font-bold text-neutral-900">
            The situations that typically bring sellers to a specialist
          </h3>
          <NumberedReasons items={specialistSituations} />
        </div>
      </section>

      {/* FAQs */}
      <section className={`border-b border-neutral-200 bg-white ${sectionY}`}>
        <div className={siteContainerLg}>
          <Eyebrow>Questions</Eyebrow>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            Common questions from online sellers.
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-xl border border-neutral-200 bg-neutral-50 p-6">
                <h3 className="text-sm font-bold text-neutral-900">{faq.q}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA with LeadForm, now the kit panel.
          packages/web-shared/design/marketing/LeadCTAPanel.tsx is the single
          component generalist leans on hardest (24 call sites). The port's
          decline said it "adds a second lead-capture surface": it does not
          here, because it REPLACES the hand-rolled band rather than joining it.
          One form on the route, still <LeadForm submitLabel="Send enquiry" />,
          still the only lead surface on the homepage.

          Strings are the band's own, moved into slots: the h2 into `title`, the
          paragraph into `description` (including the one-working-day line,
          which is an open estate-wide owner item and is carried across
          untouched), the card's h3 into `formTitle`. `eyebrow` is a structural
          label; it must be passed, because the default is "Free consultation"
          and this site publishes no such offer. `proofPoints` is empty on
          purpose: the component renders nothing for an empty array, and the
          three tick-lines it wants are not published anywhere on this site.
          That is an owner item, not something to write here.

          It emits none of the three CTA tracking attributes of its own (the
          literal names are left unwritten here on purpose, exactly as the
          ProblemStatement note above does it: the CTA snapshot gate counts
          occurrences in source and a comment must not move that count), so the
          snapshot is untouched and nothing can collide with the header triple.

          GROUND: the panel hardcodes bg-slate-900 (#0f172b). This site's dark
          is #1a2942 and the hero above it is that hex, so the backdrop slot
          paints the site ground over it before the texture. The slot renders
          behind `relative z-10` content, which is exactly the host contract the
          texture needs, so one node does both jobs and the kit file stays
          untouched (trap 12).

          No `.ground-dark`, matching what this band already did and what
          globals.css records: the white LeadForm card is a child, custom
          properties inherit, and the ring would go white on white. The dark
          half holds no focusable element. On #1a2942 the panel's own colours
          measure white title 14.59, slate-200 description 11.83, slate-300
          eyebrow 9.81, and its primary-400 eyebrow rule 4.80 as a graphic. */}
      <LeadCTAPanel
        eyebrow="Talk to us"
        title="Talk to a seller tax specialist"
        description="Tell us the platforms you sell on, your monthly revenue band, VAT status and fulfilment model. We will come back within one working day with no obligation."
        proofPoints={[]}
        formTitle="Get in touch"
        form={<LeadForm submitLabel="Send enquiry" />}
        backdrop={
          <>
            <div className="absolute inset-0 bg-[#1a2942]" />
            <EcommerceBackdrop patternId="ecommerce-settlement-run-cta" />
          </>
        }
      />

      {/* Blog footer strip */}
      <section className={`border-t border-neutral-200 bg-[#fafaf9] ${sectionY}`}>
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
