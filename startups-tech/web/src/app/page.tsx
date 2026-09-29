import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  btnPrimary,
  btnOnDark,
  focusRing,
  siteContainerLg,
} from "@/components/ui/layout-utils";
import { buildFaqJsonLd, buildOrganizationJsonLd, buildWebsiteJsonLd } from "@/lib/schema";
import { LeadForm } from "@/components/forms/LeadForm";
import StartupsBackdrop from "@/components/layout/StartupsBackdrop";
import { getAllPosts, getCategorySlug } from "@/lib/blog";
import { ArrowRight, ShieldCheck, Quote } from "lucide-react";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import {
  StatsCounter,
  type StatItem,
} from "@accounting-network/web-shared/design/marketing/StatsCounter";
import { ScrollGlowGroup } from "@accounting-network/web-shared/design/marketing/ScrollGlowGroup";
import { FaqSection } from "@accounting-network/web-shared/design/primitives/FaqSection";

/* U1 (2026-09-29). Kit components re-decided on the props the manager added this
 * wave. Every entry below is the CURRENT verdict with the measurement behind it;
 * the seven pre-uplift entries this block replaced are superseded, not deleted.
 *
 * ADOPTED this wave, each at its call site further down:
 *   design/marketing/StatsCounter.tsx      - key-figures band. `href` now exists
 *     (:24-26), so the four gov.uk citations survive. `value`/`target`+`suffix`
 *     handle "20%" / "£250k" / "18%", and StatValue holds the TRUE target in the
 *     server HTML (:37-41), so the count-up no longer ships a wrong figure.
 *     Both halves of the old decline are dead.
 *   design/marketing/ScrollGlowGroup.tsx   - services grid wrapper.
 *   design/primitives/FaqSection.tsx       - with `alwaysRenderAnswers` (:33-35),
 *     which force-mounts every answer into the server HTML. That was the entire
 *     reason the hand-rolled <details> block existed, so the decline is dead and
 *     buildFaqJsonLd(faqs) still reads the same binding the section renders.
 *
 * STILL DECLINED, with the measurement:
 *   design/marketing/TestimonialsSection.tsx - DECLINED, and the reason CHANGED.
 *     The `items` prop the manager added (:57-62) does clear the old objection
 *     (Property's landlord quotes are no longer welded in). Two new ones replace
 *     it, both fatal under this wave's no-new-copy rule. (a) The figure renders
 *     an unconditional five-star row with aria-label "Rated 5 out of 5"
 *     (TestimonialsSection.tsx:72-77). This page publishes no rating, and the
 *     quotes it does publish are governed by a disclaimer stating they are
 *     composite accounts; asserting a five-star rating over composites is a new
 *     claim, not a restyle. (b) `items` is typed `typeof testimonials`, so each
 *     entry needs `highlight`, `who`, `detail` and `initials`
 *     (TestimonialsSection.tsx:8-28). This page publishes a quote and one
 *     attribution line; `initials` alone would author three new strings and
 *     `highlight` would require cutting a sentence out of each quote to bold it.
 *     Reversible by a kit edit that makes the star row opt-in and the caption
 *     fields optional; that is a manager carve-out, not this file's to make.
 *   design/marketing/NumberedReasons.tsx - DECLINED. `items` is
 *     `{title: string; body: string}[]` (:27). Four of the six `whySpecialist`
 *     rows below carry `detail` as JSX with gov.uk anchors, and the component has
 *     no `html` escape hatch, so adopting it would delete six source links and
 *     flatten the rest to plain text.
 *   design/marketing/DrawnTickList.tsx - DECLINED. `items` is `string[]` (:35).
 *     This page has no tick list: the nearest thing is LeadCTAPanel's proof-point
 *     row, which renders its own Check icon per item already.
 *   design/marketing/ProcessTimeline.tsx - DECLINED. `steps` are `{n,title,body}`;
 *     the "moments that bring founders here" band is five parallel situations, not
 *     numbered stages, and no `n` is published for them. The stale half of the old
 *     decline (escaped markup) is gone: `html` exists at :27. The copy half stands.
 *   design/marketing/CoverageCards.tsx - DECLINED. `CoverageItem` (:5-15) has no
 *     `href`. The five audience cards below ARE five of this page's internal
 *     links; adopting would drop them under the route's link floor.
 *   design/marketing/ProblemStatement.tsx - DECLINED. :33-40 hardcodes Property's
 *     landlord copy with no copy props, and its right column is a `marquee` this
 *     site publishes nothing for.
 *   design/marketing/ComparisonTable.tsx - DECLINED, unchanged. Every row needs a
 *     `general` string plus a "Most recommended" pill, a `generalLabel`, two
 *     captions and an "Us:" label. The table below has no second side.
 *   design/marketing/StickyCTA.tsx - NOT a decline: an open OWNER GATE (plan D1).
 *     Interruptive surface, not built until he answers. */

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name} | Accountants for Funded and Scaling UK Startups` },
  description:
    "Specialist accountants for funded and scaling UK startups: R&D merged scheme, SEIS/EIS advance assurance, EMI and share schemes, fractional CFO and core compliance.",
  alternates: { canonical: siteConfig.url },
};

// ponytail: figures verified against house_positions.md; all linked to gov.uk source
/* U1: the four published figures, unchanged, re-expressed as the kit `StatItem`
   shape (packages/web-shared/design/marketing/StatsCounter.tsx:5-26). The rendered
   text is character-for-character what this band published before the uplift:
   "20%" is target 20 + suffix "%", "£250k" is prefix "£" + target 250 + suffix "k",
   "18%" is target 18 + suffix "%". Labels and gov.uk hrefs are untouched. */
const keyStats: StatItem[] = [
  {
    target: 20,
    suffix: "%",
    label: "Merged R&D scheme above-the-line credit (from April 2024)",
    href: "https://www.gov.uk/guidance/corporation-tax-research-and-development-tax-relief-for-large-companies",
  },
  {
    target: 250,
    prefix: "£",
    suffix: "k",
    label: "Maximum SEIS raise per company (gross assets under £350k, fewer than 25 FTE, within 3 years of trade)",
    href: "https://www.gov.uk/guidance/venture-capital-schemes-apply-to-use-the-seed-enterprise-investment-scheme",
  },
  {
    target: 250,
    prefix: "£",
    suffix: "k",
    label: "EMI option value per employee (£3m total company limit; gross assets under £30m, fewer than 250 FTE)",
    href: "https://www.gov.uk/tax-employee-share-schemes/enterprise-management-incentives-emis",
  },
  {
    target: 18,
    suffix: "%",
    label: "BADR rate on qualifying gains from 6 April 2026 (£1m lifetime limit; EMI shares qualify on 2-year rule)",
    href: "https://www.gov.uk/business-asset-disposal-relief",
  },
];

const audienceCards = [
  {
    title: "Pre-seed founders",
    body: "SEIS eligibility, pre-trading expenditure within the 7-year window, founder salary structure and early compliance before the first raise.",
    href: "/for/pre-seed-founders",
  },
  {
    title: "Funded startups",
    body: "EIS compliance statements, R&D claims with AIF submission, EMI option pools and investor-ready accounts after investment lands.",
    href: "/for/funded-startups",
  },
  {
    title: "SaaS companies",
    body: "R&D on qualifying software development, VAT place-of-supply for overseas B2B revenue, and recurring revenue timing in accounts.",
    href: "/for/saas-companies",
  },
  {
    title: "Software development companies",
    body: "Project-level R&D qualification, IR35 boundary awareness, EMI for tech talent and Corporation Tax planning at profitability.",
    href: "/for/software-development-companies",
  },
  {
    title: "Fintech startups",
    body: "SEIS and EIS eligibility around financial services exclusions, R&D on financial technology projects and exit structure analysis.",
    href: "/for/fintech-startups",
  },
];

const serviceCards = [
  {
    title: "R&D tax claims",
    body: "Merged scheme and ERIS claims from the technical narrative through AIF submission and CT600. We state what qualifies and why; we do not overclaim.",
    href: "/services/rd-tax-claims",
  },
  {
    title: "SEIS and EIS advance assurance",
    body: "HMRC pre-clearance before a round opens, compliance statement preparation, and EIS3 certificate issue to investors.",
    href: "/services/seis-eis-advance-assurance",
  },
  {
    title: "EMI scheme setup",
    body: "Option pool design, HMRC valuation, grant documentation, and grant notification plus annual ERS returns by 6 July each year.",
    href: "/services/emi-scheme-setup",
  },
  {
    title: "Share schemes",
    body: "Growth shares, unapproved options, section 431 elections on restricted securities and CSOP as the fallback once EMI limits are breached.",
    href: "/services/share-schemes",
  },
  {
    title: "Fractional CFO",
    body: "Board-ready management accounts, investor reporting, cash and runway modelling, and finance-function ownership for companies not yet at full CFO headcount.",
    href: "/services/fractional-cfo",
  },
  {
    title: "Core compliance",
    body: "Annual accounts, Corporation Tax returns, payroll, VAT registration and ongoing compliance for funded and scaling companies.",
    href: "/services/core-compliance",
  },
];

const founderMoments = [
  {
    title: "Filing an R&D claim",
    body: (
      <>
        The{" "}
        <a
          href="https://www.gov.uk/guidance/corporation-tax-research-and-development-tax-relief-for-large-companies"
          className={`underline underline-offset-2 ${focusRing}`}
        >
          merged scheme gives a 20% above-the-line credit
        </a>{" "}
        for accounting periods from April 2024. First-time claimants must{" "}
        <a
          href="https://www.gov.uk/guidance/tell-hmrc-that-youre-planning-to-claim-research-and-development-rd-tax-relief"
          className={`underline underline-offset-2 ${focusRing}`}
        >
          notify HMRC within 6 months of the period end
        </a>
        . A valid{" "}
        <a
          href="https://www.gov.uk/guidance/submit-detailed-information-before-you-claim-research-and-development-rd-tax-relief"
          className={`underline underline-offset-2 ${focusRing}`}
        >
          Additional Information Form
        </a>{" "}
        must reach HMRC before the CT600 claim or the claim is removed.
      </>
    ),
    href: "/services/rd-tax-claims",
  },
  {
    title: "Raising a round on SEIS or EIS",
    body: (
      <>
        <a
          href="https://www.gov.uk/guidance/venture-capital-schemes-apply-for-advance-assurance"
          className={`underline underline-offset-2 ${focusRing}`}
        >
          Advance assurance
        </a>{" "}
        is HMRC pre-clearance that a proposed share issue is likely to qualify. For SEIS, the company can raise{" "}
        <a
          href="https://www.gov.uk/guidance/venture-capital-schemes-apply-to-use-the-seed-enterprise-investment-scheme"
          className={`underline underline-offset-2 ${focusRing}`}
        >
          up to £250,000 (gross assets under £350,000, fewer than 25 FTE, within 3 years of trade)
        </a>
        . For EIS, up to{" "}
        <a
          href="https://www.gov.uk/guidance/venture-capital-schemes-apply-for-the-enterprise-investment-scheme"
          className={`underline underline-offset-2 ${focusRing}`}
        >
          £5m per year and £12m lifetime
        </a>
        .
      </>
    ),
    href: "/services/seis-eis-advance-assurance",
  },
  {
    title: "Setting up an EMI option pool",
    body: (
      <>
        <a
          href="https://www.gov.uk/tax-employee-share-schemes/enterprise-management-incentives-emis"
          className={`underline underline-offset-2 ${focusRing}`}
        >
          EMI allows up to £250,000 of unexercised option value per employee and £3m per company
        </a>{" "}
        (gross assets under £30m, fewer than 250 FTE). Grants must be notified to HMRC by 6 July following the tax year of grant.{" "}
        <a
          href="https://www.gov.uk/guidance/submit-your-employment-related-securities-ers-return"
          className={`underline underline-offset-2 ${focusRing}`}
        >
          Annual ERS returns are due by 6 July
        </a>{" "}
        each year, including nil returns.
      </>
    ),
    href: "/services/emi-scheme-setup",
  },
  {
    title: "Founder share hygiene at formation",
    body: (
      <>
        Where founders or employees acquire restricted securities at a funding round, a{" "}
        <a
          href="https://www.gov.uk/hmrc-internal-manuals/employment-related-securities/ersm30450"
          className={`underline underline-offset-2 ${focusRing}`}
        >
          section 431 joint election must be made within 14 days
        </a>{" "}
        of acquisition. Missing it is a common funded-startup trap. A{" "}
        <a
          href="https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg52521"
          className={`underline underline-offset-2 ${focusRing}`}
        >
          section 135 TCGA share-for-share exchange
        </a>{" "}
        is not a disposal, subject to the section 137 anti-avoidance test.
      </>
    ),
    href: "/services/share-schemes",
  },
  {
    title: "VAT and payroll as you scale",
    body: (
      <>
        VAT registration is mandatory once rolling 12-month taxable turnover reaches{" "}
        <a
          href="https://www.gov.uk/register-for-vat"
          className={`underline underline-offset-2 ${focusRing}`}
        >
          £90,000
        </a>
        . For SaaS, B2B place-of-supply rules may keep overseas revenue outside the threshold.{" "}
        <a
          href="https://www.gov.uk/national-insurance-rates-letters"
          className={`underline underline-offset-2 ${focusRing}`}
        >
          Employer NIC is 15% above a £5,000 secondary threshold
        </a>
        ; a solo-director company is excluded from the Employment Allowance.
      </>
    ),
    href: "/services/core-compliance",
  },
];

const calculatorLinks = [
  {
    title: "R&D relief estimator",
    body: "Estimate the merged scheme credit or ERIS payable credit on a set of qualifying costs. States which scheme applies based on your inputs.",
    href: "/calculators/rd-relief-estimator",
  },
  {
    title: "SEIS and EIS relief calculator",
    body: "Model the income tax and CGT relief available to investors under SEIS or EIS for a proposed raise.",
    href: "/calculators/seis-eis-relief-calculator",
  },
  {
    title: "EMI vs unapproved options calculator",
    body: "Compare the tax outcome of EMI versus unapproved options for a given grant value, exercise price and exit scenario.",
    href: "/calculators/emi-vs-unapproved-calculator",
  },
  {
    title: "Founder dividend vs salary calculator",
    body: "Model the optimal salary and dividend split for a founder-director, accounting for Corporation Tax, income tax bands and the Employment Allowance exclusion.",
    href: "/calculators/founder-dividend-vs-salary-calculator",
  },
];

const whySpecialist = [
  {
    area: "R&D: not every line of code qualifies",
    detail: (
      <>
        <a
          href="https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird100000"
          className={`underline underline-offset-2 ${focusRing}`}
        >
          Qualifying R&D must seek an advance in science or technology
        </a>
        , so a claim that stretches routine software work invites a HMRC compliance check, and an overclaim can be clawed back with interest and penalties long after the credit was banked. We assess each project on its technical facts and build claims that survive scrutiny.
      </>
    ),
  },
  {
    area: "SEIS and EIS: eligibility is easy to lose",
    detail:
      "A single borderline contract or an overlooked asset or headcount test can disqualify a round after investors have committed, and the fix is rarely available once shares are issued. We pressure-test eligibility before investor conversations begin, not after investment lands.",
  },
  {
    area: "EMI: a missed deadline is expensive to unwind",
    detail:
      "Miss the notification or ERS-return window and the affected options can lose their qualifying status, converting a tax-advantaged grant into an income-tax and NIC charge for the employee at exit. Restructuring after the fact is possible but costly. We run the filing calendar so it does not happen.",
  },
  {
    area: "Section 431 elections: the consequence outlives the window",
    detail:
      "Skip the joint election on restricted securities and the holder can face an income-tax charge on later share growth instead of a capital gain, a difference that only surfaces at exit when it can no longer be corrected. We flag and file it at the point of acquisition.",
  },
  {
    area: "IR35 and contractor work: we state the boundary only",
    detail: (
      <>
        This site covers funded and scaling product companies. IR35 and{" "}
        <a
          href="https://www.gov.uk/guidance/understanding-off-payroll-working-ir35"
          className={`underline underline-offset-2 ${focusRing}`}
        >
          off-payroll working depth
        </a>{" "}
        is out of scope for this firm; a specialist contractor tax adviser is the right home for it.
      </>
    ),
  },
  {
    area: "Loss-making and pre-profit companies: still worth engaging early",
    detail: (
      <>
        <a
          href="https://www.gov.uk/guidance/corporation-tax-calculating-and-claiming-a-loss"
          className={`underline underline-offset-2 ${focusRing}`}
        >
          Trading losses carry forward against future profits
        </a>
        , so banking them in annual returns has real value. Pre-trading expenditure is claimable if incurred within{" "}
        <a
          href="https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim46351"
          className={`underline underline-offset-2 ${focusRing}`}
        >
          7 years before trade starts
        </a>
        .
      </>
    ),
  },
];

const testimonials = [
  {
    quote:
      "We had submitted our first R&D claim ourselves, including a project that was a rebuild of an existing internal tool rather than genuinely novel work. When we engaged a specialist ahead of year two, they reviewed the prior claim, identified the overclaim, and we corrected it voluntarily. The revised claim was smaller but defensible. We have not had a compliance check since.",
    attribution: "SaaS founder, Series A, London, R&D merged scheme",
  },
  {
    quote:
      "We were about to run our SEIS round without advance assurance, on the assumption that we clearly qualified. Our accountant found that a prior consultancy contract we had run through the company was borderline under the qualifying trade test. We got advance assurance before approaching investors. Every investor conversation started with confirmation rather than a risk.",
    attribution: "Pre-seed founder, fintech, South East, SEIS advance assurance",
  },
  {
    quote:
      "We set up our EMI scheme two years into the company. At the point we started the process, we had missed the window to notify three early option grants. Those options lost their EMI qualifying status. We have since restructured the affected grants and now have a process that files the ERS return and grant notifications on the same calendar as our board meetings.",
    attribution: "CTO, software development company, Midlands, EMI scheme and ERS returns",
  },
];

const faqs: { question: string; answer: string }[] = [
  {
    question: "Do funded startups need a specialist accountant?",
    answer:
      "A generalist firm can file accounts and a Corporation Tax return. The compliance obligations that become material after investment (R&D claims, EIS compliance statements, EMI grant notifications, annual ERS returns, AIF submissions before CT600 claims) are encountered infrequently by a generalist and handled routinely by a specialist. The risk of getting one of them wrong, and the cost of correcting it, are both higher than the incremental cost of engaging a specialist from the outset.",
  },
  {
    question: "What makes you different from a generalist or a cheap online filing service?",
    answer:
      "Generalist firms and filing services cover annual accounts and standard CT returns well. We cover those too, but our focus is the specialist layer: R&D claims under the merged scheme and ERIS, SEIS and EIS advance assurance and compliance, EMI option scheme setup and ongoing compliance, share scheme hygiene, and the founder capital tax position at exit. These are not occasional services for us; they are the main work.",
  },
  {
    question: "Can you handle our R&D claim and our EMI scheme?",
    answer:
      "Yes. R&D and EMI are the two services we handle most often for funded and scaling companies. For R&D, we prepare the technical narrative, identify qualifying costs, and submit the Additional Information Form before the CT600. For EMI, we structure the option pool, coordinate the HMRC valuation process, prepare grant documentation, file the annual ERS return, and notify HMRC of grants by the 6 July deadline.",
  },
  {
    question: "Do you help with SEIS or EIS advance assurance before a round?",
    answer:
      "Yes. Advance assurance is HMRC pre-clearance that a proposed share issue is likely to qualify for SEIS or EIS. We prepare the application, submit it to HMRC, and manage the process through to clearance. We also prepare the EIS1 compliance statement and EIS3 certificates to investors after the round closes.",
  },
  {
    question: "We are pre-revenue and loss-making. Is it worth engaging you yet?",
    answer:
      "Yes, for two reasons. First, pre-trading expenditure is claimable against future profits if it falls within seven years before trade starts. Second, trading losses carry forward and set against future profits, so banking them in annual returns now has real value. The R&D claim notification deadline (6 months after the period end for first-time claimants) also applies from the earliest accounting period in which qualifying activity occurred.",
  },
  {
    question: "Do you work with SaaS and software-development companies specifically?",
    answer:
      "Yes. Both have a specific compliance profile: SaaS companies need VAT place-of-supply analysis for overseas B2B revenue and recurring revenue accounting; software development companies face project-level R&D qualification questions and IR35 boundary considerations. We have dedicated service and audience pages for both.",
  },
  {
    question: "Do you cover IR35 or contractor work?",
    answer:
      "We state the IR35 and off-payroll boundary where it is relevant to a funded company's working arrangements. Contractor-side IR35 depth (personal service companies, inside-IR35 deductions, umbrella payroll) is out of scope for this firm and belongs with a specialist contractor tax adviser.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Fees depend on the scope of engagement: company stage, whether R&D, SEIS/EIS or EMI work is involved, transaction volume, and how much of the finance function we are covering. We do not publish standard prices because the right scope varies significantly. Contact us with a summary of your situation and we will explain what a typical engagement looks like.",
  },
];

/* The closing panel's four proof-point pairs, unchanged from the hand-rolled
   markup they were lifted out of. `detail` was `sub`; the words are identical.
   C3 in the claims ledger ("24-hour response / Usually the same working day") is
   an owner-ruled row: it stays exactly where it already was.
   R3 N1: the hand-rolled `&#10003;` tick badge that used to sit beside each
   pair is gone from here, but LeadCTAPanel's proof-point row renders its own
   `Check` icon per item (packages/web-shared/design/marketing/LeadCTAPanel.tsx:174),
   so the rendered list still shows a tick; nothing to restore. */
const closingProofPoints = [
  {
    title: "Funded and scaling companies only",
    detail: "We do not take sole traders or personal service companies",
  },
  { title: "24-hour response", detail: "Usually the same working day" },
  {
    title: "All conversations are confidential",
    detail: "We never discuss one client's position with another",
  },
  {
    title: "UK-wide (HMRC)",
    detail: "Scottish income tax has its own bands; we flag where they change the outcome",
  },
];

export default function HomePage() {
  const recentPosts = getAllPosts()
    .slice(0, 3)
    .map((post) => ({ ...post, categorySlug: getCategorySlug(post) }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildOrganizationJsonLd() }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildWebsiteJsonLd() }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(faqs) }}
      />

      {/* Hero.
          R1 S2: `ground-dark` rebinds --focus-ring and --kit-focus-ring to white for
          this subtree (globals.css). Checked before applying, as the class comment
          requires: this section contains no light-ground card, only the two CTAs and
          the badge, all on the composited indigo ground, so nothing inherits a white
          ring onto a white ground. */}
      <section className="ground-dark relative flex items-center min-h-[520px] sm:min-h-[640px] lg:min-h-[720px] overflow-hidden bg-primary-950">
        {/* The gradient's terminal stop is darker than the ramp's bottom step
            (primary-950) and is NOT a ramp step of its own. Kept as an arbitrary
            value: snapping it to 950 would flatten the gradient visibly. */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-primary-900/70 to-[#0f0e2a]" />
        {/* Per-site motif, the marker generalist's hero carries and this one did
            not. Mounted AFTER the gradient so it paints over it, and under the
            z-10 copy column. The component's own contrast table already measures
            this exact ground (bg-primary-950): composited white 13.80,
            slate-300 9.29, both PASS. `patternId` is left at its default here and
            overridden on the second mount in the closing panel below, because two
            <pattern> elements sharing an id is invalid and the second silently
            resolves to the first. */}
        <StartupsBackdrop />
        <div className={`${siteContainerLg} relative z-10 py-16 sm:py-20 w-full`}>
          <div className="hero-reveal max-w-3xl">
            {/* Status pill, generalist/web/src/app/page.tsx:263-268: rounded-full,
                ring-1 ring-white/25, backdrop-blur-lg, and the live ping dot pair.
                Shape only. The text is still {siteConfig.name}; the ShieldCheck is
                kept because the dot replaces nothing it was saying. */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-400/10 border border-white/20 px-4 py-2 text-xs font-bold uppercase tracking-widest text-indigo-200 shadow-lg ring-1 ring-white/25 backdrop-blur-lg">
              <span className="relative flex h-2.5 w-2.5" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary-400" />
              </span>
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
              {siteConfig.name}
            </div>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white text-balance sm:text-5xl lg:text-7xl">
              Accountants for funded and scaling UK startups.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-indigo-100 sm:text-xl">
              R&amp;D merged scheme claims, SEIS and EIS advance assurance, EMI and share schemes, fractional CFO
              and core compliance. For post-formation, funded and scaling UK tech, SaaS and software companies.
              Not the commodity cheap-filing market.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              {/* Both CTAs move onto the shared recipes in
                  @/components/ui/layout-utils (which already carry
                  outline-[var(--focus-ring)], so `ground-dark` still governs the
                  ring). The hand-rolled secondary was `border-white/30`, which
                  measures 2.47 against this ground at the copy column's right
                  edge and is under the 3.0 graphic floor for a button's only
                  visible boundary; `btnOnDark` is border-white/40 at 3.20. That
                  is the same defect 569d3304 fixed on contractors-ir35.
                  `data-cta` tuples match generalist's naming so vw_cta_performance
                  reads across sites. Labels unchanged. */}
              <Link
                href="/contact"
                data-cta="hero_primary"
                data-cta-placement="hero"
                data-cta-goal="form"
                className={`${btnPrimary} px-6 py-3 text-base sm:px-10 sm:py-4 sm:text-lg`}
              >
                Speak to a startup specialist
              </Link>
              <Link
                href="/services/rd-tax-claims"
                data-cta="hero_secondary"
                data-cta-placement="hero"
                className={`${btnOnDark} px-6 py-3 text-base sm:px-10 sm:py-4 sm:text-lg`}
              >
                R&amp;D tax claims
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-2.5 text-sm text-indigo-300">
              <ShieldCheck className="h-4 w-4 flex-shrink-0" aria-hidden />
              <span className="font-medium">
                Tech, SaaS, software and fintech companies. UK-wide (HMRC).
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Key figures bar. ADOPTED
          packages/web-shared/design/marketing/StatsCounter.tsx.
          The band moves from the primary-900 dark ground to bg-white, because the
          kit component paints text-slate-900 / text-slate-500 and is written for a
          light strip (generalist/web/src/app/page.tsx:317-320 is the same band on
          the same ground). `ground-dark` therefore comes OFF with it: nothing here
          sits on a dark ground any more, so the light `--focus-ring` default is the
          correct one and the rebind would have put a white ring on white.
          The four gov.uk links now ride the component's own `href` slot, and the
          aria-label stays on the section so the band keeps its accessible name. */}
      <section className="border-b border-slate-200 bg-white py-8 sm:py-10" aria-label="Key startup tax figures 2026/27">
        <div className={siteContainerLg}>
          <StatsCounter stats={keyStats} />
        </div>
      </section>

      {/* Intro strip */}
      <section className="border-b border-slate-200 bg-slate-50 py-10 sm:py-12">
        <div className={siteContainerLg}>
          <p className="max-w-3xl text-lg leading-relaxed text-slate-700 sm:text-xl">
            The compliance obligations that matter most to a funded startup (R&amp;D claims, EIS compliance,
            EMI option scheme management, share scheme hygiene at formation and round) are encountered
            infrequently by a generalist firm. They are the main work here. Commodity annual accounts
            and CT returns are part of the engagement, not the reason for it.
          </p>
        </div>
      </section>

      {/* Who the site helps */}
      <section className="border-b border-slate-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Who we work with</Eyebrow>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Funded and scaling product companies. Not contractors, not agencies.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Solo contractors and personal service companies are out of scope, as are creative and
            marketing agencies. This site works with tech, SaaS, software
            and fintech companies that have passed formation and are growing.
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {audienceCards.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group block border border-slate-200 bg-slate-50 p-5 sm:p-6 transition-all hover:border-primary-600 hover:shadow-md ${focusRing}`}
              >
                <span className="text-base font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                  {item.title}
                </span>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.body}</p>
                <ArrowRight className="mt-3 h-4 w-4 text-slate-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Specialist services */}
      <section className="border-b border-slate-200 bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <Eyebrow>Specialist services</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
              Six service areas covering the funded startup compliance picture.
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600">
              From first R&amp;D claim through EMI pool and share scheme hygiene to fractional CFO.
            </p>
          </div>
          {/* ADOPTED packages/web-shared/design/marketing/ScrollGlowGroup.tsx as a
              pure wrapper: it flips data-glow on this div once the grid is on
              screen and the one-shot card pulse lives in globals.css. No child
              markup and no copy changes, it renders its children verbatim, and it
              no-ops under prefers-reduced-motion. Same mount as
              generalist/web/src/app/page.tsx:346. */}
          <ScrollGlowGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCards.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className={`group block border border-slate-200 bg-white p-6 sm:p-7 transition-all hover:border-primary-600 hover:shadow-md ${focusRing}`}
              >
                <h3 className="text-base font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{service.body}</p>
                <div className="mt-4 flex items-center text-primary-600 font-semibold text-sm">
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </ScrollGlowGroup>
        </div>
      </section>

      {/* Founder moments */}
      <section className="border-b border-slate-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>The moments that bring founders here</Eyebrow>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Five situations where specialist knowledge changes the outcome.
          </h2>
          <div className="mt-10 sm:mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
            {founderMoments.map((item) => (
              <article
                key={item.title}
                className="border border-slate-200 border-l-4 border-l-primary-600 bg-slate-50 p-6 sm:p-8"
              >
                <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-slate-600">{item.body}</p>
                <Link
                  href={item.href}
                  className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:opacity-70 transition-opacity ${focusRing}`}
                >
                  Service detail <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Free tools + research asset */}
      <section className="border-b border-slate-200 bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
            <div>
              <Eyebrow>Free tools</Eyebrow>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                Four calculators covering the questions founders ask most.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
                All four tools are scenario and estimate calculators. They state their assumptions openly
                and end at a prompt to speak to us for the real numbers. No sign-up, no data stored.
              </p>
              <div className="mt-8 space-y-3">
                {calculatorLinks.map((calc) => (
                  <Link
                    key={calc.href}
                    href={calc.href}
                    className={`group flex items-start justify-between gap-4 border border-slate-200 bg-white px-5 py-4 transition-all hover:border-primary-600 ${focusRing}`}
                  >
                    <div>
                      <div className="text-sm font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                        {calc.title}
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500">{calc.body}</p>
                    </div>
                    <ArrowRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <Eyebrow>Research asset</Eyebrow>
              <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                Startup Formation and Survival Index.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                How many UK tech and software companies are on the register, how many have been
                dissolved, and how formations have moved year by year across eight software and IT
                SIC codes, from live{" "}
                <a
                  href="https://developer.company-information.service.gov.uk/api/docs/"
                  className={`underline underline-offset-2 text-slate-800 hover:text-primary-600 ${focusRing}`}
                >
                  Companies House Advanced Search API
                </a>{" "}
                counts. It is a snapshot of the register rather than a cohort survival curve, and the
                page says so. The methodology and limitations are stated prominently. It is a
                compliance-awareness resource for founders, not a regulatory filing or investment advice.
              </p>
              <div className="mt-6">
                <Link
                  href="/research/startup-formation-survival-index"
                  className={`group flex items-center justify-between border border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-slate-800 hover:border-primary-600 hover:text-primary-600 transition-all ${focusRing}`}
                >
                  View the Startup Formation and Survival Index
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why a specialist */}
      <section className="border-b border-slate-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Why specialist matters</Eyebrow>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            A generalist handles the accounts. We handle the parts where getting it wrong is expensive.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            R&amp;D claims that survive a HMRC compliance check, SEIS eligibility checked before investors
            are approached, EMI options that retain their qualifying status, section 431 elections filed
            in the 14-day window: a generalist encounters these infrequently. They are the routine work here.
          </p>
          <div className="mt-12 overflow-x-auto border border-slate-200">
            <table className="w-full min-w-[28rem] text-left text-sm sm:text-base">
              <caption className="sr-only">
                How {siteConfig.name} handles specialist startup tax areas
              </caption>
              <thead>
                <tr className="bg-primary-950 text-white">
                  <th scope="col" className="px-4 py-3 font-bold text-sm uppercase tracking-wider sm:px-6 sm:py-4">
                    Area
                  </th>
                  <th scope="col" className="px-4 py-3 font-bold text-sm uppercase tracking-wider sm:px-6 sm:py-4">
                    Our approach
                  </th>
                </tr>
              </thead>
              <tbody>
                {whySpecialist.map((row, i) => (
                  <tr
                    key={row.area}
                    className={`border-b border-slate-200 last:border-0 ${i % 2 === 1 ? "bg-slate-50" : "bg-white"}`}
                  >
                    <th scope="row" className="px-4 py-3.5 font-semibold text-slate-900 sm:px-6 sm:py-4 align-top">
                      {row.area}
                    </th>
                    <td className="px-4 py-3.5 text-slate-600 sm:px-6 sm:py-4 align-top leading-relaxed">{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Anonymised social proof */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20" aria-labelledby="testimonials-heading">
        <div className={siteContainerLg}>
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <Eyebrow>Real outcomes</Eyebrow>
            <h2 id="testimonials-heading" className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
              What founders say
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Composite accounts based on patterns across our client base. Names, amounts and
              specific details anonymised. The compliance situations described are real.
            </p>
          </div>
          <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <figure
                key={i}
                className="relative bg-white border border-slate-200 p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow"
              >
                <Quote className="absolute top-4 right-4 h-6 w-6 text-indigo-100" aria-hidden />
                <blockquote className="text-base leading-relaxed text-slate-800 font-medium pr-8">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 pt-4 border-t border-slate-100 text-xs sm:text-sm font-semibold text-slate-500">
                  {t.attribution}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ. ADOPTED packages/web-shared/design/primitives/FaqSection.tsx with
          `alwaysRenderAnswers` (FaqSection.tsx:33-35, new this wave). The decline
          this replaces was correct while it stood: the kit accordion unmounted a
          closed answer, so buildFaqJsonLd(faqs) above would have asserted eight
          answers the server HTML did not carry. `alwaysRenderAnswers` force-mounts
          all eight and hides them with data-[state=closed]:hidden, so the schema
          and the markup read the same `faqs` binding and cannot drift.
          `eyebrow=""` rather than the kit default "FAQ": the default would author a
          label this page does not publish, and repeating "Common questions" as both
          eyebrow and heading would print the same words twice. The empty string
          takes the component's own `eyebrow ? ... : null` branch (FaqSection.tsx:40).
          `tone` is left at its "slate" default, NOT "white": the section ground is
          white, and a white card carries `border-transparent` at rest
          (accordion.tsx:18), so a white card would be invisible until hovered. The
          slate-50 card is the separation the hand-rolled border used to give.
          Question and answer strings are untouched. */}
      <FaqSection
        eyebrow=""
        title="Common questions"
        faqs={faqs}
        alwaysRenderAnswers
        className="border-t border-slate-200 bg-white py-12 sm:py-16 lg:py-20"
      />

      {/* CTA, on the kit panel.
          ADOPTED packages/web-shared/design/marketing/LeadCTAPanel.tsx. Every
          sentence this section published survives byte for byte: the eyebrow, the
          heading, the standfirst, the four proof-point pairs and the form heading
          are all passed in, and the panel's own defaults for `eyebrow` and
          `formTitle` are overridden so none of its authored copy appears. No
          `footnote` and no `formSubtitle`, so it adds nothing.
          `proofPoints` is populated here, unlike the five call sites in plan A11:
          these four pairs are copy this page already publishes, so passing them
          preserves them rather than authoring anything.
          The panel grounds on slate-900. `backdrop` is the kit's own per-site
          motif slot and paints the section's published indigo ground and gradient
          back over it, so the colour does not move.
          NOT `ground-dark`: this panel holds a white form card with focusable
          inputs, and custom properties inherit, so the rebind would put a white
          ring on a white ground. That is the case the class comment warns about. */}
      <LeadCTAPanel
        eyebrow="Get started"
        title="Talk to a startup specialist"
        description="Tell us about your company. We will explain what you need and what the position looks like, in plain English, with no obligation."
        proofPoints={closingProofPoints}
        formTitle="Get in touch"
        form={<LeadForm submitLabel="Send enquiry" />}
        backdrop={
          <>
            <div className="absolute inset-0 bg-primary-950" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-slate-900/0 to-slate-900/0 pointer-events-none" />
            {/* Second motif mount, over the two ground layers rather than instead
                of them, so the panel's published indigo ground does not move to the
                kit's slate-900. Distinct patternId, per the component's header note
                about duplicate <pattern> ids. Ground here is primary-950, the row
                the component already measures: composited white 13.80. */}
            <StartupsBackdrop patternId="startups-round-ladder-cta" />
          </>
        }
      />

      {/* Blog footer strip */}
      <section className="border-t border-slate-200 bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="text-center max-w-3xl mx-auto">
            <Eyebrow>Guides and analysis</Eyebrow>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Plain English guidance for UK founders.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Articles and guides on R&amp;D relief, SEIS and EIS, EMI and share schemes, founder tax
              and extraction, SaaS finance, and startup compliance. Written for founders and finance leads,
              not for accountants.
            </p>
            {/* Three most recent posts, the band generalist renders at :409-456 and
                this one did not: it published a standfirst and two buttons on a site
                with 37 links on /blog. `getAllPosts()` is the same server-side
                reader /blog uses, so no title, category or summary is authored here;
                every string in the list is post frontmatter already published. */}
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
                href="/services/seis-eis-advance-assurance"
                className="inline-flex items-center gap-2 text-primary-600 hover:opacity-70 font-semibold text-sm sm:text-base transition-opacity"
              >
                SEIS and EIS advance assurance
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
