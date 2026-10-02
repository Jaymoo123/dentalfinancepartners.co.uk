import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/forms/LeadForm";
import {
  btnPrimary,
  btnOnDark,
  focusRing,
  siteContainerLg,
} from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import {
  ArrowRight,
  ShieldCheck,
  UtensilsCrossed,
  Beer,
  ShoppingBag,
  Hotel,
  Coffee,
  Truck,
  BadgePoundSterling,
  FileText,
  Users,
  BarChart3,
  ClipboardList,
} from "lucide-react";
import { buildFaqJsonLd } from "@/lib/schema";
import { getAllPosts, getCategorySlug } from "@/lib/blog";
import HospitalityBackdrop from "@/components/layout/HospitalityBackdrop";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { FaqSection } from "@accounting-network/web-shared/design/primitives/FaqSection";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { TestimonialsSection } from "@accounting-network/web-shared/design/marketing/TestimonialsSection";
import { ScrollGlowGroup } from "@accounting-network/web-shared/design/marketing/ScrollGlowGroup";
import {
  StatsCounter,
  type StatItem,
} from "@accounting-network/web-shared/design/marketing/StatsCounter";

/* W5 (2026-09-29). Kit-adoption ledger for this file, playbook gate 9.1.
 * Every decline below names the kit FILE PATH and a reason a reviewer can test
 * against the kit at 70047cb6. No existing sentence on this page was rewritten:
 * every adopted component is fed the copy the page already published.
 *
 * ADOPTED, each at its call site below:
 *   design/marketing/StatsCounter.tsx      - band 2. `StatItem.value` (:15) and
 *     `href` (:24-26) both exist now, so "£90,000" keeps its thousands separator
 *     and all four gov.uk citations survive as links. `StatValue` seeds
 *     useState(target) (:47), so the server HTML carries the true figure.
 *   design/marketing/ScrollGlowGroup.tsx   - bands 5 and 6, as the direct parent
 *     of the cards (globals-standard.css:186 keys off `[data-glow="on"] > *`).
 *   design/primitives/FaqSection.tsx       - band 13, with `alwaysRenderAnswers`
 *     (:33-35). That force-mounts all eight answers into the server HTML, which
 *     is the only reason the hand-rolled <details> block existed, and the section
 *     reads the same `faqs` binding buildFaqJsonLd() does.
 *   design/marketing/TestimonialsSection.tsx - band 11, with `showRating={false}`
 *     (:70) and `footnote` (:74). No `initials`: deriving them from the existing
 *     attributions would invent an identity.
 *   design/marketing/LeadCTAPanel.tsx      - band 12, fed this page's own heading,
 *     standfirst, four proof pairs and form heading. Its default `eyebrow` is a
 *     fee claim this site does not publish, so the page's own "Get started" label
 *     is passed instead.
 *   design/primitives/page-blocks.tsx `Eyebrow` (:35) - all eight `.section-label`
 *     divs. Six are literal mounts here; two are fed to kit components as props
 *     (`TestimonialsSection eyebrow`, `LeadCTAPanel eyebrow`), which render the
 *     same `Eyebrow` internally.
 *
 * DECLINED:
 *   design/marketing/ProblemStatement.tsx  - :33-56 hardcodes Property's landlord
 *     copy and a "Book your free first call" button with no copy props, and its
 *     right column is a marquee this site publishes nothing for. Band 3 is one
 *     paragraph. Testable: `grep -n "eyebrow\|title\|body" ProblemStatement.tsx`
 *     returns no prop.
 *   design/marketing/CoverageCards.tsx     - RE-DERIVED at 1437cb9e (R2 G3).
 *     The `href` half of the old reason is STALE: `href?` exists at :31 and the
 *     card renders as an `<a>` at :103, so band 4 would keep its six links. What
 *     still blocks it is `body: string`, REQUIRED at :8, against six cells that
 *     publish a label and an href and no body; and the card shape, which is a
 *     padded subject card, not this band's compact chip row. The `html` half of
 *     the older estate-wide decline is also STALE (`html` exists at :35) and is
 *     not relied on here. Full working at the call site.
 *   design/marketing/DrawnTickList.tsx     - the only tick-shaped list on this
 *     page is `closingProofPoints`, which is four {title, detail} PAIRS and is
 *     already inside the adopted LeadCTAPanel, which renders its own tick
 *     treatment for them. DrawnTickList takes `items: string[]` (:36), so
 *     feeding it here would drop one string of every pair. Written because R2 N4
 *     found it in the ADOPT table with no decline anywhere on the site.
 *   design/marketing/ProcessTimeline.tsx   - band 7's four bodies are JSX
 *     elements carrying real <a> children, not HTML strings, so `html` (:27)
 *     cannot take them, and the four are parallel situations with no published
 *     ordinal. `NumberedReasons` takes `{title, body}` strings and would flatten
 *     the six anchors out of the band.
 *   design/marketing/ComparisonTable.tsx   - band 10's table has one side. The
 *     component requires a `general` string per row plus a "Most recommended"
 *     pill this page does not publish.
 *   design/marketing/ExampleFigureNote.tsx - band 8 is six statutory figures with
 *     gov.uk sources, not the firm's own worked example. The component's own
 *     docstring bans it on a sourced proof strip.
 *   design/primitives/SlimHero.tsx         - band 1 is a full-height hero with a
 *     status pill, two CTAs and a trust line. SlimHero (:36) is a fixed
 *     `bg-slate-900` strip and would discard all four.
 */

/* COLOUR LITERALS THAT SURVIVE IN THIS FILE, and why each one is not a ramp
 * utility. Everything else on this page is a `primary-*` / `slate-*` utility;
 * #b0532f -> primary-600 and #8f421f -> primary-700 are exact, same-hex swaps.
 *
 *   (The warm off-white band ground on five bands is NO LONGER a literal here:
 *    globals.css:213 declares `--surface-warm-alt` with exactly the value the
 *    literal carried, so `warmBand` below is now `bg-[var(--surface-warm-alt)]`
 *    and the paint is unchanged. slate-50 is #f8fafc, a COOL grey, and is still
 *    not the answer: the swap would be a visible colour change nobody asked
 *    for, which is the exception PHASE2-6_PACKAGES.md W5 names. R2 G7 / V1 V32.)
 *   #3a1a0d  the dark band ground (hero, band 8, the closing panel). The ramp's
 *            bottom step primary-950 is #341306: white-on-ground moves 15.78 ->
 *            17.01, so the swap moves a measured ratio and the literal stays.
 *   #2a1208  the hero gradient's terminal stop, darker than primary-950 and not
 *            a ramp step of its own. Snapping it to 950 would invert the
 *            gradient's direction of travel.
 *
 * Both dark literals re-measured against the ramp 2026-09-29, because a ramp
 * step within 2 of lightness would make the literal indefensible. CIE L*:
 * #3a1a0d = 13.63, #2a1208 = 8.50, primary-950 #341306 = 10.62. The deltas are
 * 3.01 and 2.12, BOTH outside the 2-point window, so neither is a ramp step in
 * disguise and neither is swapped. They are designer-set colours and stay
 * literals. If the manager declares `--ink-brand` / `--ink-brand-deep` in
 * globals.css (a file this package may not edit), these two become token
 * references in a one-line mop-up; nothing else about them changes.
 */
const warmBand = "bg-[var(--surface-warm-alt)]";
const darkBand = "bg-[#3a1a0d]";

export function generateMetadata(): Metadata {
  return {
    title: `Specialist Hospitality Accountants UK`,
    description:
      `Specialist accountants for UK restaurants, pubs, hotels, takeaways, cafes and caterers. Tronc and tips compliance, food VAT, hospitality payroll, TOMS and business rates advice.`,
    alternates: { canonical: siteConfig.url },
  };
}

// ponytail: HP-verified figures only; all linked to gov.uk source
/* W5: the same four published figures, re-expressed as the kit `StatItem` shape
 * (StatsCounter.tsx:5-26). The rendered text is character-for-character what
 * this band published before: "£90,000" and "£10,500" go through `value`
 * because `display.toFixed(0)` would print 90000 with no separator, while
 * "£12.71" and "15%" count up correctly from prefix/suffix/decimals. Labels and
 * gov.uk hrefs are untouched. */
const keyStats: StatItem[] = [
  {
    target: 90000,
    value: "£90,000",
    label: "VAT registration threshold (rolling 12 months)",
    href: "https://www.gov.uk/vat-registration/when-to-register",
  },
  {
    target: 12.71,
    decimals: 2,
    prefix: "£",
    label: "National Living Wage from 1 April 2026 (age 21+)",
    href: "https://www.gov.uk/national-minimum-wage-rates",
  },
  {
    target: 15,
    suffix: "%",
    label: "Employer NIC rate above the £5,000 secondary threshold",
    href: "https://www.gov.uk/government/publications/rates-and-allowances-national-insurance-contributions/rates-and-allowances-national-insurance-contributions",
  },
  {
    target: 10500,
    value: "£10,500",
    label: "Employment Allowance offsetting employer NIC",
    href: "https://www.gov.uk/claim-employment-allowance",
  },
];

const subTrades = [
  {
    title: "Restaurants",
    body: "Food VAT hot/cold split, tronc and tips compliance, kitchen capital allowances and corporation tax for independent and multi-site restaurant groups.",
    href: "/for/restaurants",
    Icon: UtensilsCrossed,
  },
  {
    title: "Pubs and bars",
    body: "AWRS due diligence, draught duty rates, licensed premises costs and the distinction between deductible renewal costs and non-deductible first-application licence fees.",
    href: "/for/pubs-and-bars",
    Icon: Beer,
  },
  {
    title: "Takeaways",
    body: "Hot food VAT, food safety registration (required 28 days before trading), NLW compliance for delivery workers and small business rate relief for smaller premises.",
    href: "/for/takeaways",
    Icon: ShoppingBag,
  },
  {
    title: "Hotels and guesthouses",
    body: "TOMS for packaged travel, accommodation FRS sector rate, capital allowances on fit-out, B&B rent-a-room rules and MTD for income tax obligations.",
    href: "/for/hotels-and-guesthouses",
    Icon: Hotel,
  },
  {
    title: "Cafes and coffee shops",
    body: "Eat-in vs takeaway VAT, FRS catering rate, food registration, zero-hours payroll and the cash basis default for sole-trader operators.",
    href: "/for/cafes-and-coffee-shops",
    Icon: Coffee,
  },
  {
    title: "Caterers and street food",
    body: "Mobile food stand VAT, event catering contracts, casual worker payroll, food business registration and AIA for specialist kitchen equipment.",
    href: "/for/caterers-and-street-food",
    Icon: Truck,
  },
];

const services = [
  {
    title: "Tronc scheme setup",
    body: "An independently run tronc removes employer NIC on qualifying tips. We set up the scheme, confirm troncmaster independence and keep the scheme aligned with the Employment (Allocation of Tips) Act 2023.",
    href: "/services/tronc-scheme-setup",
    Icon: Users,
  },
  {
    title: "Hospitality payroll",
    body: "Zero-hours and casual worker payroll, NLW compliance checks, holiday pay, Employment Allowance claims and monthly PAYE submissions for kitchens and front-of-house teams.",
    href: "/services/hospitality-payroll",
    Icon: ClipboardList,
  },
  {
    title: "Hospitality VAT",
    body: "Hot/cold food splits, eat-in vs takeaway VAT, Flat Rate Scheme sector-rate selection, TOMS margin scheme and VAT registration monitoring against the £90,000 rolling threshold.",
    href: "/services/hospitality-vat",
    Icon: BadgePoundSterling,
  },
  {
    title: "TOMS advice",
    body: "If your operation packages bought-in accommodation, transport or other travel elements, TOMS applies and you can only recover VAT on the margin. We structure the accounting correctly from the start.",
    href: "/services/toms-advice",
    Icon: FileText,
  },
  {
    title: "Business rates review",
    body: "RHL relief ended for new claims from 1 April 2026. We review your rateable value, check SBRR eligibility (100% relief up to £12,000 rateable value) and apply the revised 2026-27 multipliers.",
    href: "/services/business-rates-relief",
    Icon: BarChart3,
  },
];

const complianceMoments = [
  {
    title: "The 2026 tips and tronc rules",
    body: (
      <>
        The{" "}
        <a
          href="https://www.legislation.gov.uk/ukpga/2023/13/contents"
          className="underline underline-offset-2"
        >
          Employment (Allocation of Tips) Act 2023
        </a>
        , in force since 1 October 2024, requires 100% of qualifying tips to reach
        workers without deductions. Operators also need a written tips policy and
        allocation records. Tips paid through a genuine independent tronc are{" "}
        <a
          href="https://www.gov.uk/hmrc-internal-manuals/national-insurance-manual/nim02922"
          className="underline underline-offset-2"
        >
          free of employer and employee NIC
        </a>{" "}
        (PAYE income tax still applies), but any employer involvement in allocation
        destroys the exemption.
      </>
    ),
  },
  {
    title: "Food and drink VAT traps",
    body: (
      <>
        Hot food is{" "}
        <a
          href="https://www.gov.uk/guidance/catering-takeaway-food-and-vat-notice-7091"
          className="underline underline-offset-2"
        >
          standard-rated (20%)
        </a>{" "}
        if it meets any one of five tests (heated to order, kept hot, heat-retentive
        packaging and so on). Cold food eaten on the premises is also standard-rated,
        regardless of temperature. Applying the wrong rate is the most common VAT
        error in the sector and can trigger substantial assessments.
      </>
    ),
  },
  {
    title: "Licensed-trade duties and costs",
    body: (
      <>
        Pubs and bars buying alcohol from UK wholesalers must verify AWRS approval
        before each purchase. First-application{" "}
        <a
          href="https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim61405"
          className="underline underline-offset-2"
        >
          premises licence costs are not tax-deductible
        </a>{" "}
        (capital expenditure, per BIM61405); only renewal costs are deductible.
        This distinction catches many operators when they open a new site.
      </>
    ),
  },
  {
    title: "Business rates cliff (from 1 April 2026)",
    body: (
      <>
        Retail, Hospitality and Leisure relief{" "}
        <a
          href="https://www.gov.uk/business-rates-relief/retail-discount"
          className="underline underline-offset-2"
        >
          ended for new claims from 1 April 2026
        </a>
        . From that date, hospitality properties use revised multipliers (38.2p for
        rateable values below £51,000; 43p for £51,000 to £499,999). Operators who
        still qualify for Small Business Rate Relief (100% at or below £12,000
        rateable value) should ensure they are claiming it.
      </>
    ),
  },
];

const testimonials = [
  {
    quote:
      "We had been running our tronc without formal troncmaster independence. Once that was pointed out, we restructured the scheme properly and our employer NIC on tips dropped to zero.",
    attribution: "Owner, independent restaurant group, three sites, Midlands",
  },
  {
    quote:
      "Our previous accountant applied one VAT rate to everything. When a specialist reviewed our takeaway menu, we found we had been overclaiming on cold items and underclaiming on dine-in sales. We corrected the position voluntarily and avoided penalties.",
    attribution: "Director, fast-casual takeaway, South East England",
  },
  {
    quote:
      "The tips legislation change caught us completely off guard. Within a week of contacting the team we had a written tips policy, a compliant allocation record and an updated payroll process. We have not had to think about it since.",
    attribution: "Operations manager, pub and bar group, four sites, Yorkshire",
  },
];

/* W5: the four tick rows the hand-rolled closing band published at :758-762,
 * already `{title, sub}` pairs, renamed onto the panel's `{title, detail}`
 * ProofPoint shape (LeadCTAPanel.tsx:6). No string changed. */
const closingProofPoints = [
  { title: "Hospitality specialists only", detail: "We do not take general commercial clients" },
  { title: "24-hour response", detail: "Usually the same working day" },
  {
    title: "All conversations are confidential",
    detail: "We never discuss one client's affairs with another",
  },
  {
    title: "England default",
    detail: "We flag Scotland and Wales and ask your jurisdiction upfront",
  },
];

const calculatorLinks = [
  { title: "Tronc and tips PAYE and NIC calculator", href: "/calculators/tronc-tips-paye-nic-calculator" },
  { title: "Food and drink VAT checker", href: "/calculators/food-drink-vat-rate-checker" },
  { title: "Staff cost and rota margin calculator", href: "/calculators/staff-cost-rota-margin-calculator" },
];

const faqs = [
  {
    question: "Do I need a specialist hospitality accountant?",
    answer:
      "Not every operator does, but the sector has a concentration of compliance traps that a general accountant encounters rarely: food and drink VAT splits, tronc and tips rules, AWRS due diligence, TOMS for hotel packages and MTD for income tax. If your business involves any of these, a specialist will identify risks and savings that a generalist is unlikely to catch.",
  },
  {
    question: "What does a hospitality accountant do that a general accountant does not?",
    answer:
      "A hospitality specialist understands the five-test hot-food VAT rule, the NIC treatment of independently run troncs, AWRS buyer obligations, the TOMS margin scheme, draught duty rates and the capital allowances sequencing for kitchen fit-outs. A general accountant handles these infrequently enough that the sector-specific edge cases may not be on their radar.",
  },
  {
    question: "Can you handle a tronc and the 2026 tips rules?",
    answer:
      "Yes. The Employment (Allocation of Tips) Act 2023 has been in force since 1 October 2024. We set up independently run troncs, confirm genuine troncmaster independence (which is required for the NIC exemption to apply), draft written tips policies and ensure allocation records meet the statutory Code of Practice. Tips can never count toward National Minimum Wage or National Living Wage.",
  },
  {
    question: "Do you work with multi-site operators?",
    answer:
      "Yes. Multi-site groups face additional complexity: associated-company rules reduce the corporation tax thresholds, Employment Allowance is available only once across the group, and tronc arrangements must be site-specific to preserve NIC exemptions. We handle consolidated accounts and per-site compliance for groups operating across England.",
  },
  {
    question: "Which hospitality trades do you cover?",
    answer:
      "Restaurants, pubs and bars, takeaways, hotels and guesthouses, cafes and coffee shops, and caterers and street food. Each sub-trade has its own pages with sector-specific detail. We cover all six across England as our default jurisdiction; Scotland and Wales have different licensing and business rates regimes, which we flag explicitly.",
  },
  {
    question: "Can you help with food and drink VAT?",
    answer:
      "Yes. We review menus and sales categories against the five-test hot-food rule, the eat-in vs takeaway split and the four zero-rating carve-outs (confectionery, crisps and snacks, soft drinks and alcohol). We also advise on the VAT Flat Rate Scheme sector rates and whether the limited-cost-trader override at 16.5% applies to your operation.",
  },
  {
    question: "Do you cover Scotland and Wales?",
    answer:
      "Our default jurisdiction is England. Scotland and Wales operate different licensing regimes and business rates frameworks; these are flagged explicitly when they arise. Please tell us which nation your premises are in when you get in touch so we can advise accordingly.",
  },
  {
    question: "How much does a hospitality accountant cost?",
    answer:
      "Fees vary by the size and complexity of the operation. We do not publish standard prices because the right scope depends on the number of sites, whether payroll and tronc are included, and the complexity of your VAT position. Contact us for a no-obligation conversation and we will explain what a typical engagement looks like for an operator of your size.",
  },
];

export default function HomePage() {
  /* Band 14's three most recent posts. `getAllPosts()` is the same server-side
     reader /blog uses (src/lib/blog.ts, W2's file, read-only here), so every
     string in the list is post frontmatter this site already publishes: no
     title, category or summary is authored on this page. */
  const recentPosts = getAllPosts()
    .slice(0, 3)
    .map((post) => ({ ...post, categorySlug: getCategorySlug(post) }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(faqs) }}
      />

      {/* Hero.
          `ground-dark` rebinds --focus-ring and --kit-focus-ring to white for this
          subtree (globals.css:214). Checked before applying, as that class comment
          requires: this section contains no light-ground card, only the two CTAs
          and the status pill, all on the composited brown ground, so nothing
          inherits a white ring onto a white ground.
          Measured on #3a1a0d: white 15.78 (text PASS), and the backdrop's
          strongest composite (0.10 of #e58764) lifts the ground to #4b2516,
          white 13.45, still PASS. */}
      <section
        className={`ground-dark relative flex items-center min-h-[520px] sm:min-h-[640px] lg:min-h-[720px] overflow-hidden ${darkBand}`}
      >
        {/* The gradient's terminal stop #2a1208 is darker than the ramp's bottom
            step and is not a ramp step of its own; the middle stop IS the brand
            hex and is now the ramp utility. */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#3a1a0d] via-primary-600/70 to-[#2a1208]" />
        {/* Per-site motif, mounted AFTER the gradient so it paints over it and
            under the z-10 copy column. The component's host contract (relative
            overflow-hidden on the section, relative z-10 on the content) is
            satisfied above and below. */}
        <HospitalityBackdrop patternId="hospitality-table-setting-hero" />
        <div className={`${siteContainerLg} relative z-10 py-16 sm:py-20 w-full`}>
          <div className="max-w-3xl">
            {/* Status pill. Shape only: rounded-full, a ring, and the live ping
                dot pair (generalist/web/src/app/page.tsx:263-268, then
                startups-tech post-uplift). The text is still {siteConfig.name}
                and the UtensilsCrossed mark is kept, because the dot replaces
                nothing either of them was saying. */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-600/30 border border-primary-600/60 px-4 py-2 text-xs font-bold uppercase tracking-widest text-orange-200 shadow-lg ring-1 ring-white/25 backdrop-blur-lg">
              <span className="relative flex h-2.5 w-2.5" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary-400" />
              </span>
              <UtensilsCrossed className="h-3.5 w-3.5" aria-hidden />
              {siteConfig.name}
            </div>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white text-balance sm:text-5xl lg:text-7xl">
              Specialist accountants for UK hospitality businesses.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-orange-100 sm:text-xl">
              Tronc and tips compliance, food and drink VAT, licensed-trade duties, TOMS,
              hospitality payroll and business rates. We work exclusively with operators in
              the sector, so every engagement draws on focused hospitality knowledge.
            </p>
            {/* Both CTAs move onto the shared recipes in
                @/components/ui/layout-utils, which already carry
                outline-[var(--focus-ring)], so `ground-dark` still governs the
                ring. The hand-rolled secondary was border-white/30, which
                measures 2.47 against this ground and is under the 3.0 graphic
                floor for a button's only visible boundary; `btnOnDark` is
                border-white/40 at 3.20. Labels unchanged. `data-cta` sits on the
                control, never on a wrapper, and the tuples match generalist's
                naming so vw_cta_performance reads across sites. Both carry the
                full triple (R2 G5): `hero_primary|hero|form` and
                `hero_secondary|hero|service`. The secondary's goal is `service`,
                not `form`, because it goes to /services/tronc-scheme-setup and
                not to a form; `service` is a NEW goal value, listed for the
                owner. */}
            <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Link
                href="/contact"
                data-cta="hero_primary"
                data-cta-placement="hero"
                data-cta-goal="form"
                className={`${btnPrimary} px-6 py-3 text-base sm:px-10 sm:py-4 sm:text-lg`}
              >
                Talk to a hospitality accountant
              </Link>
              <Link
                href="/services/tronc-scheme-setup"
                data-cta="hero_secondary"
                data-cta-placement="hero"
                data-cta-goal="service"
                className={`${btnOnDark} px-6 py-3 text-base sm:px-10 sm:py-4 sm:text-lg`}
              >
                Tronc scheme setup
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-2.5 text-sm text-orange-300">
              <ShieldCheck className="h-4 w-4 flex-shrink-0" aria-hidden />
              <span className="font-medium">
                Restaurants, pubs, hotels, takeaways, cafes and caterers.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Key figures bar. ADOPTED
          packages/web-shared/design/marketing/StatsCounter.tsx.
          The band moves from the #b0532f brand ground to bg-white, because the kit
          component paints text-slate-900 on the figure and text-slate-500 on the
          label: MEASURED on #b0532f those are 3.44 and 1.06, both below the 4.5
          text floor, and shipping an unmeasured pair is what this move avoids.
          On white they are 17.85 and 4.76. `ground-dark` therefore does not come
          near this band. The four gov.uk links ride the component's own `href`
          slot and the aria-label stays on the section, so the band keeps both its
          citations and its accessible name. */}
      <section
        className="border-b border-slate-200 bg-white py-8 sm:py-10"
        aria-label="Key hospitality compliance figures"
      >
        <div className={siteContainerLg}>
          <StatsCounter stats={keyStats} />
        </div>
      </section>

      {/* Intro strip. DECLINED ProblemStatement (see the ledger above): this band
          is one paragraph and the kit component is a two-column layout that needs
          a right-hand marquee this site publishes nothing for. */}
      <section className={`border-b border-slate-200 ${warmBand} py-10 sm:py-12`}>
        <div className={siteContainerLg}>
          <p className="max-w-3xl text-lg leading-relaxed text-slate-700 sm:text-xl">
            Most hospitality operators are experts in food, service and atmosphere, not in
            tronc legislation, food VAT hot/cold tests or the mechanics of the Tour Operators&apos;
            Margin Scheme. The compliance picture is genuinely complex, and the cost of getting
            it wrong lands on the employer. We handle the tax and accounting so operators
            can run their business.
          </p>
        </div>
      </section>

      {/* Who we help. DECLINED CoverageCards, on a RE-DERIVED reason (R2 G3).
          The old reason ("`CoverageItem` has no `href`") is STALE and is gone:
          `href?` exists at CoverageCards.tsx:31, the card becomes an `<a>` at
          :103 and picks up the kit focusRing at :110, so the link floor is no
          longer the objection and these six cells would stay six links.

          What still blocks it: `body: string` is REQUIRED (CoverageCards.tsx:8)
          and these six cells publish a LABEL and an href only, no body. Adopting
          would mean either authoring six new sentences, which this wave may not
          do, or passing `body=""` and shipping six empty `<p>` elements. The
          shape is also wrong for the copy: the kit renders `rounded-xl p-6 sm:p-8`
          subject cards from `md:grid-cols-2|3`, and this is a compact
          `grid-cols-2 sm:grid-cols-3` chip row whose only affordance is the
          arrow. Testable: `grep -n 'body' CoverageCards.tsx` shows no `?`. */}
      <section className="border-b border-slate-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Who we work with</Eyebrow>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Independent operators and multi-site groups across the UK hospitality sector.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Whether you run one site or twenty, the compliance obligations scale with you.
            Multi-site operators face additional complexity: associated-company rules, group
            Employment Allowance restrictions, and per-site tronc independence requirements.
            England is our default jurisdiction. Scotland and Wales have different licensing
            and rates regimes, which we flag explicitly.
          </p>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: "Single-site restaurants", href: "/for/restaurants" },
              { label: "Multi-site pub groups", href: "/for/pubs-and-bars" },
              { label: "Hotels and B&Bs", href: "/for/hotels-and-guesthouses" },
              { label: "Takeaways and delivery", href: "/for/takeaways" },
              { label: "Cafes and coffee shops", href: "/for/cafes-and-coffee-shops" },
              { label: "Caterers and street food", href: "/for/caterers-and-street-food" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`group block border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-800 hover:border-primary-600 hover:bg-orange-50 transition-all ${focusRing}`}
              >
                {item.label}
                <ArrowRight className="mt-2 h-4 w-4 text-slate-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sub-trade grid. ADOPTED
          packages/web-shared/design/marketing/ScrollGlowGroup.tsx as the DIRECT
          parent of the cards: globals-standard.css:186 keys the stagger off
          `[data-glow="on"] > *`, so an intermediate wrapper would silence it. It
          adds no copy and no markup of its own beyond the grid it replaces. */}
      <section className={`border-b border-slate-200 ${warmBand} py-12 sm:py-16 lg:py-20`}>
        <div className={siteContainerLg}>
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
              Sector pages by trade
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600">
              Each sub-trade has its own compliance picture. Choose your trade for
              sector-specific detail on VAT, payroll, duties and capital allowances.
            </p>
          </div>
          <ScrollGlowGroup className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {subTrades.map((item) => {
              const Icon = item.Icon;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`group block border border-slate-200 bg-white p-6 sm:p-8 transition-all hover:border-primary-600 hover:shadow-md ${focusRing}`}
                >
                  <div className="flex h-14 w-14 items-center justify-center bg-primary-600 mb-4 group-hover:bg-primary-700 transition-colors">
                    <Icon className="h-7 w-7 text-white" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.body}</p>
                  <div className="mt-4 flex items-center text-primary-600 font-semibold text-sm">
                    See {item.title.toLowerCase()} page
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </ScrollGlowGroup>
        </div>
      </section>

      {/* Services grid. ADOPTED ScrollGlowGroup, same direct-parent rule. */}
      <section className="border-b border-slate-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
              Services for hospitality operators
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600">
              Five specialist service areas, each built around the compliance obligations
              that operators in this sector actually face.
            </p>
          </div>
          <ScrollGlowGroup className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((item) => {
              const Icon = item.Icon;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`group block border border-slate-200 bg-slate-50 p-6 sm:p-8 transition-all hover:border-primary-600 hover:shadow-md ${focusRing}`}
                >
                  <div className="flex h-14 w-14 items-center justify-center bg-primary-600 mb-4 group-hover:bg-primary-700 transition-colors">
                    <Icon className="h-7 w-7 text-white" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.body}</p>
                  <div className="mt-4 flex items-center text-primary-600 font-semibold text-sm">
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </ScrollGlowGroup>
        </div>
      </section>

      {/* Compliance moments. DECLINED ProcessTimeline and NumberedReasons: these
          four bodies are JSX elements carrying six real <a> children, not HTML
          strings, and they are parallel situations with no published ordinal. */}
      <section className={`border-b border-slate-200 ${warmBand} py-12 sm:py-16 lg:py-20`}>
        <div className={siteContainerLg}>
          <Eyebrow>The moments that bring operators to us</Eyebrow>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            The compliance points most hospitality operators hit at some stage.
          </h2>
          <div className="mt-10 sm:mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
            {complianceMoments.map((item) => (
              <article
                key={item.title}
                className="border border-slate-200 border-l-4 border-l-primary-600 bg-white p-6 sm:p-8"
              >
                <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-slate-600">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Key figures strip. DECLINED ExampleFigureNote: six statutory figures with
          gov.uk sources, not the firm's own worked example.
          `ground-dark` applies: the band is dark and the only focusable things in
          it are the six source links, which sit directly on the dark ground, so a
          white ring lands on brown. No light-ground card inherits it.
          Measured on #3a1a0d: white 15.78, orange-100 #ffedd5 13.77,
          orange-300 #fdba74 9.36. All PASS. */}
      <section
        className={`ground-dark ${darkBand} py-10 sm:py-12`}
        aria-label="Hospitality tax figures at a glance"
      >
        <div className={siteContainerLg}>
          <div className="mb-6 text-center">
            <h2 className="text-lg font-bold text-white sm:text-2xl">
              Key figures for hospitality operators (England, 2026-27)
            </h2>
            <p className="mt-2 text-sm text-orange-300">
              Scotland and Wales: licensing and business rates differ. All figures link their
              official source.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[32rem] text-left text-sm sm:text-base border border-primary-600/40">
              <caption className="sr-only">Key hospitality tax and employment figures for 2026-27</caption>
              <thead>
                <tr className="bg-primary-600/40 text-white">
                  <th scope="col" className="px-4 py-3 font-bold uppercase tracking-wider text-xs sm:px-6 sm:py-4">Figure</th>
                  <th scope="col" className="px-4 py-3 font-bold uppercase tracking-wider text-xs sm:px-6 sm:py-4">Value</th>
                  <th scope="col" className="px-4 py-3 font-bold uppercase tracking-wider text-xs sm:px-6 sm:py-4">Source</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    figure: "VAT registration threshold",
                    value: "£90,000 (rolling 12 months)",
                    href: "https://www.gov.uk/vat-registration/when-to-register",
                    label: "GOV.UK",
                  },
                  {
                    figure: "National Living Wage (age 21+, from 1 Apr 2026)",
                    value: "£12.71 per hour",
                    href: "https://www.gov.uk/national-minimum-wage-rates",
                    label: "GOV.UK",
                  },
                  {
                    figure: "Employer NIC rate (above £5,000 secondary threshold)",
                    value: "15%",
                    href: "https://www.gov.uk/government/publications/rates-and-allowances-national-insurance-contributions/rates-and-allowances-national-insurance-contributions",
                    label: "GOV.UK",
                  },
                  {
                    figure: "Employment Allowance",
                    value: "£10,500 per tax year",
                    href: "https://www.gov.uk/claim-employment-allowance",
                    label: "GOV.UK",
                  },
                  {
                    figure: "Annual Investment Allowance (kitchen plant)",
                    value: "Up to £1,000,000",
                    href: "https://www.gov.uk/capital-allowances/annual-investment-allowance",
                    label: "GOV.UK",
                  },
                  {
                    figure: "SBRR (rateable value up to £12,000)",
                    value: "100% business rates relief",
                    href: "https://www.gov.uk/apply-for-business-rate-relief/small-business-rate-relief",
                    label: "GOV.UK",
                  },
                ].map((row, i) => (
                  <tr
                    key={row.figure}
                    className={`border-b border-primary-600/30 last:border-0 ${i % 2 === 1 ? "bg-primary-600/10" : "bg-primary-600/5"}`}
                  >
                    <th scope="row" className="px-4 py-3.5 font-semibold text-orange-100 sm:px-6 sm:py-4">
                      {row.figure}
                    </th>
                    <td className="px-4 py-3.5 text-white font-mono sm:px-6 sm:py-4">{row.value}</td>
                    <td className="px-4 py-3.5 sm:px-6 sm:py-4">
                      <a
                        href={row.href}
                        className={`underline underline-offset-2 text-orange-300 hover:text-white text-xs ${focusRing}`}
                      >
                        {row.label}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Free tools teaser. `data-cta` on each of the four links, on the control
          itself and never on a wrapper. The full triple on every one (R2 G5):
          `home_calculator|tools_band|tool` and `home_research|tools_band|research`.
          The `goal` half was missing, which would have landed three live series
          in vw_cta_performance with a null goal beside siblings that have one.
          `tool` and `research` are NEW values in the goal taxonomy (the site had
          only `form`), listed for the owner; nothing a visitor sees changes. */}
      <section className="border-b border-slate-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
            <div>
              <Eyebrow>Free tools</Eyebrow>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                Calculators built for hospitality operators.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
                Three free calculators covering the figures operators ask about most: the
                NIC saving from a compliant tronc, the VAT treatment of individual menu
                items, and the true labour cost of a rota including NLW, NIC and holiday.
                No sign-up, no data stored.
              </p>
              <div className="mt-8 space-y-3">
                {calculatorLinks.map((calc) => (
                  <Link
                    key={calc.href}
                    href={calc.href}
                    data-cta="home_calculator"
                    data-cta-placement="tools_band"
                    data-cta-goal="tool"
                    className={`group flex items-center justify-between border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-800 hover:border-primary-600 hover:text-primary-600 transition-all ${focusRing}`}
                  >
                    {calc.title}
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <Eyebrow>Data asset</Eyebrow>
              <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                UK hospitality openings and closures index.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                A regularly updated index of UK hospitality company registrations and
                dissolutions, drawn from Companies House SIC 55/56 data (accommodation
                and food service activities). SIC codes are self-reported at incorporation;
                the index carries this caveat prominently. Dissolutions are counted from the
                Companies House register, so they cover strike-off as well as insolvency.
              </p>
              <div className="mt-6">
                <Link
                  href="/research/hospitality-openings-closures-index"
                  data-cta="home_research"
                  data-cta-placement="tools_band"
                  data-cta-goal="research"
                  className={`group flex items-center justify-between border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-800 hover:border-primary-600 hover:text-primary-600 transition-all ${focusRing}`}
                >
                  View the hospitality openings and closures index
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why a specialist. DECLINED ComparisonTable: every row needs a `general`
          string plus a "Most recommended" pill, a `generalLabel` and two captions.
          This table has one side and publishes none of them. */}
      <section className={`border-b border-slate-200 ${warmBand} py-12 sm:py-16 lg:py-20`}>
        <div className={siteContainerLg}>
          <Eyebrow>Why specialist matters</Eyebrow>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            A generalist handles your bookkeeping.{" "}
            <span className="text-primary-600">We handle hospitality-specific accounting.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Tronc independence, food VAT five-test analysis, AWRS due diligence, TOMS margin
            accounting, draught duty rates, BIM61405 licensing costs: a generalist encounters
            these infrequently.
          </p>
          <div className="mt-12 overflow-x-auto border border-slate-200">
            <table className="w-full min-w-[28rem] text-left text-sm sm:text-base">
              <caption className="sr-only">
                How {siteConfig.name} handles typical hospitality accounting areas
              </caption>
              <thead>
                <tr className="bg-primary-600 text-white">
                  <th scope="col" className="px-4 py-3 font-bold text-sm uppercase tracking-wider sm:px-6 sm:py-4">Area</th>
                  <th scope="col" className="px-4 py-3 font-bold text-sm uppercase tracking-wider sm:px-6 sm:py-4">Our approach</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    area: "Tronc and tips",
                    detail: "Independent tronc setup, troncmaster independence confirmed, written tips policy, allocation records and payroll integration",
                  },
                  {
                    area: "Food and drink VAT",
                    detail: "Menu review against the five hot-food tests and eat-in/takeaway rule, FRS sector-rate selection, registration threshold monitoring",
                  },
                  {
                    area: "Hospitality payroll",
                    detail: "Zero-hours and casual worker payroll, NLW compliance checks, Employment Allowance claims and monthly PAYE submissions",
                  },
                  {
                    area: "Licensed trade",
                    detail: "AWRS due-diligence guidance, licensing cost treatment (first-application vs renewal), Machine Games Duty registration",
                  },
                  {
                    area: "Capital allowances",
                    detail: "AIA sequencing for kitchen fit-out, main-pool WDA at 14% (FA 2026), new 40% FYA on qualifying additions, special-rate plant",
                  },
                  {
                    area: "Business rates",
                    detail: "SBRR eligibility, 2026-27 revised multipliers for RHL properties (RHL relief ended for new claims from 1 April 2026)",
                  },
                  {
                    area: "TOMS",
                    detail: "Margin scheme structuring for operators packaging bought-in accommodation or transport; input VAT recovery position",
                  },
                ].map((row, i) => (
                  <tr
                    key={row.area}
                    className={`border-b border-slate-200 last:border-0 ${i % 2 === 1 ? "bg-slate-50" : "bg-white"}`}
                  >
                    <th scope="row" className="px-4 py-3.5 font-semibold text-slate-900 sm:px-6 sm:py-4">
                      {row.area}
                    </th>
                    <td className="px-4 py-3.5 text-slate-600 sm:px-6 sm:py-4">{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Anonymised social proof. ADOPTED
          packages/web-shared/design/marketing/TestimonialsSection.tsx.
          `showRating={false}`: this site publishes no rating and the five-star row
          is a claim, not decoration. No `initials`: deriving them from
          "Owner, independent restaurant group, three sites, Midlands" would invent
          an identity. The existing disclaimer goes in `footnote`, not
          `description`, because that is what it is, and the two both render, so
          only one carries it.
          The `ground-dark` class goes on a wrapper because the component renders
          its own bare <section> and takes no className. Custom properties inherit,
          so the rebind reaches the quotes; the band holds no light-ground card,
          only bg-white/5 tiles on slate-900.
          Backdrop measured on bg-slate-900 by the component's own contrast table
          (composited white 16.34, slate-300 11.00, both PASS). */}
      <div className="ground-dark">
        <TestimonialsSection
          eyebrow="Real outcomes"
          title="What operators say"
          description=""
          headingId="testimonials-heading"
          items={testimonials.map((t) => ({ quote: t.quote, who: t.attribution }))}
          showRating={false}
          footnote="Composite accounts based on patterns across our hospitality clients. Names and specific figures anonymised. The compliance situations described are real."
          backdrop={<HospitalityBackdrop patternId="hospitality-table-setting-proof" />}
        />
      </div>

      {/* Contact CTA. ADOPTED
          packages/web-shared/design/marketing/LeadCTAPanel.tsx. Every sentence the
          hand-rolled band published survives: the "Get started" label, the
          heading, the standfirst, the four tick pairs and the "Get in touch" form
          heading are all passed in, so none of the panel's own authored defaults
          appear. Its default `eyebrow` is a fee claim ("Free first call, then a
          fixed fee in writing", :18) and this site does not publish fees; passing
          the page's own label suppresses it without deleting published copy.

          RECORDED, because V1 flagged it: PHASE2-6_PACKAGES.md A7 row 12 and
          the literal text of locked rule 16 both say `eyebrow=""` on every
          LeadCTAPanel mount, and this one passes `eyebrow="Get started"`. That
          is deliberate. "Get started" is this page's OWN pre-existing
          `.section-label` string on band 12, not the kit default, so `eyebrow=""`
          here would DELETE published copy. Rule 16 exists to keep the kit's fee
          claim off the page, and passing the page's own label does that as
          completely as an empty string does. Prose-freeze wins; the other nine
          mounts, where no label existed to preserve, all pass `eyebrow=""`.
          The panel grounds on slate-900, so `backdrop` paints this page's own
          published #3a1a0d ground and gradient back over it: the colour does not
          move.
          NOT `ground-dark`: the panel holds a white form card with focusable
          inputs and custom properties inherit, so the rebind would put a white
          ring on a white ground. That is the case the class comment warns about. */}
      <LeadCTAPanel
        eyebrow="Get started"
        title="Talk to a hospitality accountant"
        description="Tell us about your operation. We will explain what your business needs, in plain English, with no obligation."
        proofPoints={closingProofPoints}
        formTitle="Get in touch"
        form={<LeadForm submitLabel="Send enquiry" />}
        backdrop={
          <>
            <div className={`absolute inset-0 ${darkBand}`} />
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 via-slate-900/0 to-slate-900/0 pointer-events-none" />
            {/* Second motif mount. A distinct `patternId` is required: two
                <pattern> elements sharing an id is invalid HTML and the second
                fill silently resolves to the first. */}
            <HospitalityBackdrop patternId="hospitality-table-setting-cta" />
          </>
        }
      />

      {/* FAQ. ADOPTED packages/web-shared/design/primitives/FaqSection.tsx with
          `alwaysRenderAnswers` (:33-35). That force-mounts all eight answers into
          the server HTML and hides them with data-[state=closed]:hidden, so the
          schema and the markup read the same `faqs` binding above and cannot
          drift. No `html` prop: these eight answers are plain strings with no
          authored markup.
          `eyebrow=""` rather than the kit default "FAQ": the default would author
          a label this page does not publish. The empty string takes the
          component's own `eyebrow ? ... : null` branch (:40).
          `tone` stays at "slate", NOT "white": the section ground is white and a
          white card carries border-transparent at rest (accordion.tsx:18), so a
          white card would be invisible until hovered. The slate-50 card is the
          separation the hand-rolled border used to give. */}
      <FaqSection
        eyebrow=""
        title="Common questions"
        faqs={faqs}
        alwaysRenderAnswers
        className="bg-white py-12 sm:py-16 lg:py-20"
      />

      {/* Blog footer strip. The band published a heading, a standfirst and two
          buttons and no posts at all; the three most recent posts below are the
          band generalist renders and this one did not. Every string in the list
          is frontmatter this site already publishes. */}
      <section className={`border-t border-slate-200 ${warmBand} py-12 sm:py-16 lg:py-20`}>
        <div className={siteContainerLg}>
          <div className="text-center max-w-3xl mx-auto">
            {/* The Eyebrow is a flex row, so it is centred by its wrapper rather
                than by a text-align it does not read. */}
            <div className="flex justify-center">
              <Eyebrow>Hospitality accounting guides</Eyebrow>
            </div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Plain English guidance for operators and finance leads.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Articles and guides on tronc and tips compliance, food VAT, licensed trade,
              payroll, capital allowances and business rates. Written for people running
              hospitality businesses, not for accountants.
            </p>
            <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200 text-left">
              {recentPosts.map((post) => (
                <article key={post.slug} className="group">
                  <Link
                    href={`/blog/${post.categorySlug}/${post.slug}`}
                    className={`flex items-center gap-4 py-4 sm:gap-6 sm:py-5 ${focusRing}`}
                  >
                    <span className="hidden w-40 shrink-0 text-xs font-bold uppercase tracking-wider text-primary-600 sm:block">
                      {post.category}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-primary-600 sm:hidden">
                        {post.category}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 transition-colors group-hover:text-primary-600 sm:text-lg">
                        {post.title}
                      </h3>
                      {post.summary ? (
                        <p className="mt-1 hidden text-sm text-slate-600 line-clamp-1 sm:block">
                          {post.summary}
                        </p>
                      ) : null}
                    </span>
                    <ArrowRight
                      aria-hidden
                      className="h-5 w-5 shrink-0 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-primary-600"
                    />
                  </Link>
                </article>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/blog" className={btnPrimary}>
                Browse all guides
              </Link>
              <Link
                href="/services/tronc-scheme-setup"
                className={`inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold text-sm sm:text-base transition-colors ${focusRing}`}
              >
                Tronc scheme setup
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
