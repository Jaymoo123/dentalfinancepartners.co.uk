import type { GenericTool } from "../types";
import { gbp, pct } from "../format";

/**
 * Statutory lease extension premium, LRHUDA 1993 Chapter II (s.42 route),
 * valued on the Schedule 13 components: term + reversion + 50% marriage value.
 *
 * Ground truth: docs/property/house_positions.md §31 + §31.3a.
 *  - Marriage value is STILL PAYABLE in 2026. LFRA 2024 abolishes it, but that
 *    provision is NOT commenced (only SI 2024/1018, SI 2025/57, SI 2025/131 exist).
 *  - Sch 13 para 4(2A): marriage value is nil only where the unexpired term
 *    EXCEEDS 80 years, so exactly 80 years is inside the charge.
 *  - Prescribed deferment/capitalisation rates are not in force; the rates
 *    consultation closes 23 Sep 2026. Post-Sportelli 5% remains the working rate.
 *  - Extensions completing today are +90 years, not 990.
 *
 * Fee stack (£2,600 to £4,400) is the range published on
 * content/blog/lease-extension-cost-uk.md, kept deliberately in step with it.
 */

/** Sch 13 para 4(2A) — marriage value is nil only where the term exceeds this. */
const MARRIAGE_VALUE_THRESHOLD_YEARS = 80;

/** Professional fee stack to budget on top of the premium (own + freeholder's, s.60). */
const FEES_LOW = 2_600;
const FEES_HIGH = 4_400;

/** Honest width on the headline: relativity and the rates are both negotiable. */
const RANGE_BAND = 0.2;

/**
 * Simplified relativity curve: short-lease value as a percentage of the
 * long-lease (no-Act) value, by unexpired term. Anchors sit mid-range in the
 * published "graphs of graphs" family, between the Gerald Eve and Savills 2015
 * curves, with straight-line interpolation between anchors.
 *
 * ponytail: a 12-point table beats fitting a curve that no two valuers agree on;
 * anyone holding a valuer's figure overrides it with the relativity field.
 */
const RELATIVITY_ANCHORS: [years: number, relativity: number][] = [
  [0, 0],
  [10, 24],
  [20, 41],
  [30, 56],
  [40, 68],
  [50, 77.5],
  [60, 85],
  [70, 90],
  [80, 94],
  [90, 96.8],
  [100, 98.5],
  [125, 100],
];

function derivedRelativity(years: number): number {
  const t = Math.min(125, Math.max(0, years));
  for (let i = 1; i < RELATIVITY_ANCHORS.length; i++) {
    const [x1, y1] = RELATIVITY_ANCHORS[i];
    if (t <= x1) {
      const [x0, y0] = RELATIVITY_ANCHORS[i - 1];
      return y0 + ((t - x0) / (x1 - x0)) * (y1 - y0);
    }
  }
  return 100;
}

interface PremiumInput {
  value: number;
  years: number;
  groundRent: number;
  defermentRate: number;
  capRate: number;
  relativityOverride: number;
}

interface PremiumParts {
  term: number;
  reversion: number;
  relativity: number;
  marriageValue: number;
  share: number;
  premium: number;
}

function premiumParts(o: PremiumInput): PremiumParts {
  const years = Math.max(0, o.years);
  const d = o.defermentRate / 100;
  const c = o.capRate / 100;
  const relativity = o.relativityOverride > 0 ? o.relativityOverride : derivedRelativity(years);

  // Term: the ground rent the freeholder gives up, as an annuity over the
  // unexpired term, capitalised at the capitalisation rate.
  const term = c > 0 ? (o.groundRent * (1 - Math.pow(1 + c, -years))) / c : o.groundRent * years;

  // Reversion: vacant possession value deferred over the unexpired term.
  const reversion = o.value * Math.pow(1 + d, -years);

  // Marriage value: the uplift the new lease creates, shared 50/50.
  // Before: leaseholder holds value x relativity, freeholder holds term + reversion.
  // After: leaseholder holds the full long-lease value, freeholder holds (near) nil.
  const marriageValue =
    years > MARRIAGE_VALUE_THRESHOLD_YEARS
      ? 0
      : Math.max(0, o.value - o.value * (relativity / 100) - term - reversion);
  const share = marriageValue / 2;

  return { term, reversion, relativity, marriageValue, share, premium: term + reversion + share };
}

export const leaseExtensionPremiumCalculator: GenericTool = {
  kind: "generic",
  slug: "lease-extension-premium-calculator",
  name: "Lease Extension Premium Calculator",
  category: "Leasehold",
  oneLiner:
    "The statutory premium to extend a flat lease, itemised into capitalised ground rent, reversion and marriage value, as an honest range rather than a single figure.",
  metaTitle: "Lease Extension Premium Calculator | Marriage Value 2026",
  metaDescription:
    "Estimate the statutory premium to extend a flat lease under Schedule 13, itemised by component. Includes marriage value below 80 years, which still applies in 2026.",
  intro:
    "Estimate the premium to extend the lease on a flat under the statutory section 42 route, broken into the three Schedule 13 components. Marriage value below 80 years is included, because it still applies: the 2024 Act abolishes it, but that provision is not yet in force.",
  ctaLabel: "Planning a lease extension? Talk to us →",
  embedHeight: 860,
  fields: [
    {
      id: "propertyValue",
      label: "Flat value with a long lease",
      type: "currency",
      default: 300_000,
      step: 5_000,
      help: "What the flat would be worth with a long lease already in place, not what it is worth today with the short one.",
    },
    {
      id: "unexpiredYears",
      label: "Unexpired lease term (years)",
      type: "number",
      default: 82,
      step: 1,
      min: 1,
      max: 999,
      help: "Years left to run today. The valuation date is the date your section 42 notice is given, so use the term at the date you expect to serve.",
    },
    {
      id: "groundRent",
      label: "Annual ground rent",
      type: "currency",
      default: 150,
      step: 25,
      help: "The rent currently payable. This calculator treats it as fixed. A rent that escalates or doubles on review capitalises to considerably more.",
    },
    {
      id: "defermentRate",
      label: "Deferment rate",
      type: "number",
      default: 5,
      step: 0.25,
      suffix: "%",
      advanced: true,
      help: "The rate used to discount the reversion. 5% for flats since the Sportelli decision, and still the working rate because the 2024 Act power to prescribe rates is not in force.",
    },
    {
      id: "capitalisationRate",
      label: "Ground rent capitalisation rate",
      type: "number",
      default: 7,
      step: 0.25,
      suffix: "%",
      advanced: true,
      help: "The yield applied to the ground rent income stream. Tribunals commonly adopt 6% to 8% for a modest fixed rent, with lower rates for larger or reviewable rents.",
    },
    {
      id: "relativityOverride",
      label: "Relativity override",
      type: "number",
      default: 0,
      step: 0.5,
      suffix: "%",
      advanced: true,
      help: "Relativity is the short-lease value as a percentage of the long-lease value. Leave at 0 to use our simplified approximation of the published relativity graphs, or enter your valuer's figure to override it.",
    },
  ],
  compute: (v) => {
    const value = Number(v.propertyValue);
    const years = Math.max(0, Number(v.unexpiredYears));
    const groundRent = Number(v.groundRent);
    const defermentRate = Number(v.defermentRate);
    const capRate = Number(v.capitalisationRate);
    const relativityOverride = Number(v.relativityOverride);

    const p = premiumParts({ value, years, groundRent, defermentRate, capRate, relativityOverride });
    const low = p.premium * (1 - RANGE_BAND);
    const high = p.premium * (1 + RANGE_BAND);

    const overCliff = years > MARRIAGE_VALUE_THRESHOLD_YEARS;
    const nearCliff = overCliff && years <= 83;

    // What the same flat costs once it has slipped below the cliff. Only worth
    // showing to someone close enough for it to be a live decision.
    const showCliffCost = overCliff && years <= 85;
    const at79 = showCliffCost
      ? premiumParts({ value, years: 79, groundRent, defermentRate, capRate, relativityOverride })
      : null;

    return {
      headline: {
        label: "Estimated statutory premium",
        value: `${gbp(low)} to ${gbp(high)}`,
        sub: overCliff
          ? `Midpoint ${gbp(p.premium)}, no marriage value while the term is over 80 years`
          : `Midpoint ${gbp(p.premium)}, including ${gbp(p.share)} of marriage value`,
        tone: nearCliff ? "warn" : "default",
      },
      rows: [
        { label: `Capitalised ground rent, the term, at ${pct(capRate)}`, value: gbp(p.term) },
        {
          label: `Reversion, ${gbp(value)} deferred ${years} years at ${pct(defermentRate)}`,
          value: gbp(p.reversion),
        },
        { label: "Relativity applied to the short-lease value", value: pct(p.relativity) },
        {
          label: "Marriage value, the uplift the new lease creates",
          value: overCliff ? "Nil, term is over 80 years" : gbp(p.marriageValue),
        },
        { label: "Freeholder's 50% share of marriage value", value: gbp(p.share) },
        { label: "Premium midpoint", value: gbp(p.premium), strong: true },
        ...(at79
          ? [
              {
                label: "Premium midpoint if you wait until 79 years are left",
                value: gbp(at79.premium),
              },
            ]
          : []),
        { label: "Professional fees to budget on top", value: `${gbp(FEES_LOW)} to ${gbp(FEES_HIGH)}` },
        {
          label: "Indicative all-in range, premium plus fees",
          value: `${gbp(low + FEES_LOW)} to ${gbp(high + FEES_HIGH)}`,
          strong: true,
        },
      ],
      note:
        (nearCliff
          ? "Your lease is close to the 80-year cliff. The valuation date is the date your section 42 notice is given, so serving notice before the term crosses 80 fixes the no-marriage-value basis even though the claim itself will take months. "
          : overCliff
            ? ""
            : "Marriage value applies here because the unexpired term is 80 years or less. ") +
        "This is a simplified Schedule 13 estimate for the statutory route, not a valuation. Actual premiums turn on the relativity your valuer negotiates and, where the premium is disputed, on the rates the First-tier Tribunal determines, which is why the range matters more than the midpoint. Marriage value still applies in 2026: the Leasehold and Freehold Reform Act 2024 abolishes it, but that provision is not in force. The consultation on prescribed deferment and capitalisation rates closes on 23 September 2026 and the new rates could move premiums in either direction. Get a RICS valuation before you serve a notice.",
    };
  },
  explainer: {
    heading: "How a statutory lease extension premium is built up",
    paragraphs: [
      "A statutory extension under Chapter II of the Leasehold Reform, Housing and Urban Development Act 1993 gives you your existing term plus 90 years at a peppercorn rent, and Schedule 13 sets what you pay for it. The premium has three parts. The term is the ground rent the freeholder gives up, valued as an income stream over the years left to run and capitalised at a yield. The reversion is the freeholder's right to get the flat back when the lease ends, valued by discounting the flat's value back over the unexpired term at the deferment rate. Marriage value is the uplift in total value that the new lease creates, and where it applies the freeholder takes half of it.",
      "The 80-year cliff is the single most expensive date in leasehold. Schedule 13 treats marriage value as nil only where the unexpired term exceeds 80 years, so a lease at 80 years and one month pays none and a lease at exactly 80 years pays half the uplift to the freeholder. Because relativity falls away faster as the term shortens, that uplift is not a small number: crossing the line can add several thousand pounds to a modest flat and considerably more to an expensive one. The valuation date is the date your section 42 notice is given, not the date the extension completes, so serving the notice before the term crosses 80 locks in the cheaper basis while you negotiate.",
      "Marriage value still applies in 2026, whatever you may have read. The Leasehold and Freehold Reform Act 2024 does abolish it, and the freeholders' judicial review of that abolition was dismissed in October 2025, but abolition on the statute book is not the same as abolition in force. Commencement needs regulations the government has not made. Only three commencement instruments exist under the Act, and none of them touches the valuation provisions, so on legislation.gov.uk the removal of Schedule 13 still sits under changes yet to be applied. A claim served today pays marriage value in full. The same goes for the 990-year term: an extension completing now is your term plus 90 years.",
      "The three rate knobs are where valuers actually argue. The deferment rate has stood at 5% for flats since the Sportelli decision, and it stays the working rate because the 2024 Act power to prescribe rates is not in force, with the consultation on those rates closing on 23 September 2026. The capitalisation rate applied to the ground rent usually lands between 6% and 8% for a modest fixed rent. Relativity, the short-lease value as a percentage of the long-lease value, is the loosest of the three: the published graphs disagree with each other by several percentage points at the same term, and every percentage point moves the marriage value directly. Our figure is a simplified approximation of the published graph family, which is why the headline is a range and why your own valuer's relativity is worth having.",
    ],
  },
  faqs: [
    {
      question: "Has marriage value been abolished?",
      answer:
        "Not yet in any way that affects your bill. The Leasehold and Freehold Reform Act 2024 abolishes it, but that provision has not been commenced, and only three commencement instruments have been made under the Act, none of which covers the valuation rules. A statutory lease extension completing in 2026 on a lease with 80 years or fewer unexpired pays marriage value in full, split 50/50 with the freeholder under Schedule 13. A great deal of 2026 web content says otherwise and is wrong.",
    },
    {
      question: "What exactly happens at 80 years?",
      answer:
        "Schedule 13 says marriage value is taken to be nil where the unexpired term exceeds 80 years. At 80 years and one day there is none; at exactly 80 years there is, and the freeholder takes half the uplift the new lease creates. The valuation date is the date your section 42 notice is given, so if you are anywhere near the line, serving the notice is the cheapest thing you will ever do. Gathering quotes for three months while the term slips past 80 is the most expensive form of procrastination in leasehold.",
    },
    {
      question: "How accurate is this estimate?",
      answer:
        "It applies the Schedule 13 components with standard rates and a simplified relativity curve, so it will put you in the right area and show you which component is driving the cost. It is not a valuation. Relativity is negotiated rather than fixed, the published graphs disagree, escalating ground rents capitalise to far more than fixed ones, and a disputed premium is settled by the First-tier Tribunal on evidence. Treat the range as a budgeting tool and commission a RICS valuation before serving notice.",
    },
    {
      question: "Should I wait for the reforms to make it cheaper?",
      answer:
        "For a lease near or below 80 years, waiting is a gamble with a certain downside. The prescribed deferment and capitalisation rates need secondary legislation that does not exist yet, the consultation closes on 23 September 2026, realistic commencement is 2027-28 at the earliest, and the new rates could push premiums up as easily as down. Meanwhile your term shortens every month, the reversion grows and relativity falls. A leaseholder at 95 years can afford to watch. A leaseholder at 82 is trading an avoidable cost for an unquantifiable saving.",
    },
    {
      question: "What else do I pay on top of the premium?",
      answer:
        "Budget roughly £2,600 to £4,400 for the professional fee stack: your own solicitor and valuer, plus the freeholder's reasonable costs of investigating the claim, valuing the flat and granting the new lease, which you pay under section 60 of the 1993 Act. The 2024 Act repeals section 60, but that repeal is not in force either. Fees are usually quoted before VAT. If the premium goes to tribunal, each side bears its own costs of those proceedings.",
    },
    {
      question: "Do I need to have owned the flat for two years?",
      answer:
        "No. The two-year qualifying ownership rule was abolished with effect from 31 January 2025, and that is one of the few parts of the 2024 Act genuinely in force. A buyer can serve a statutory notice on the day they complete. That makes buying a short-lease flat and extending immediately a workable plan, provided you price the premium properly rather than assuming marriage value has gone.",
    },
    {
      question: "Is the premium tax deductible against my rental income?",
      answer:
        "No. The premium and the professional fees are capital expenditure, so a landlord cannot set them against rents in the year they are paid. Recurring ground rent you pay out is a revenue expense and deductible, but the one-off cost of buying a longer lease is not. The consolation is that the premium and fees go into your capital gains base cost, reducing the taxable gain when you sell.",
    },
  ],
  workedExamples: [
    {
      heading: "The same flat above and below the 80-year cliff",
      inputs:
        "Flat worth £300,000 with a long lease, £150 a year fixed ground rent, deferment 5%, capitalisation 7%, relativity derived from the term",
      steps: [
        "At 84 years unexpired, term = £150 x (1 - 1.07^-84) / 0.07 = £2,136",
        "Reversion = £300,000 x 1.05^-84 = £4,980",
        "Marriage value = nil, because 84 years exceeds the 80-year threshold in Schedule 13",
        "Premium midpoint = £2,136 + £4,980 = £7,115, shown as a range of £5,692 to £8,539",
        "At 79 years unexpired on the same flat, term = £2,133 and reversion = £6,356",
        "Relativity at 79 years = 93.6%, so the short-lease value is £280,800",
        "Marriage value = £300,000 - £280,800 - £2,132.63 - £6,355.75 = £10,712, and the freeholder takes half, £5,356",
        "Premium midpoint = £2,133 + £6,356 + £5,356 = £13,844, shown as a range of £11,075 to £16,613",
        "Five years of lease, and the premium nearly doubles. That is the cliff, and marriage value is the whole of the difference",
      ],
    },
    {
      heading: "A short lease where marriage value dominates",
      inputs:
        "Flat worth £450,000 with a long lease, 65 years unexpired, £250 a year fixed ground rent, deferment 5%, capitalisation 7%, relativity derived from the term",
      steps: [
        "Term = £250 x (1 - 1.07^-65) / 0.07 = £3,527",
        "Reversion = £450,000 x 1.05^-65 = £18,876",
        "Relativity at 65 years = 87.5%, so the short-lease value is £393,750",
        "Marriage value = £450,000 - £393,750 - £3,527.48 - £18,875.92 = £33,847",
        "Freeholder's 50% share = £16,923",
        "Premium midpoint = £3,527 + £18,876 + £16,923 = £39,327, shown as a range of £31,461 to £47,192",
        "Marriage value is 43% of the premium here, and it grows every year the lease is left alone",
      ],
    },
  ],
  related: [
    { label: "Lease extension cost UK: premium, marriage value and fees", href: "/blog/property-types-and-specialist-tax/lease-extension-cost-uk" },
    { label: "What is actually in force under the Leasehold and Freehold Reform Act 2024", href: "/blog/property-types-and-specialist-tax/leasehold-reform-act-2024-what-is-in-force" },
    { label: "What a lease extension solicitor does", href: "/blog/property-types-and-specialist-tax/lease-extension-solicitor-what-they-do" },
    { label: "Lease extension vs freehold purchase", href: "/blog/property-types-and-specialist-tax/lease-extension-vs-freehold-purchase" },
    { label: "Lease extensions: surrender and regrant", href: "/blog/property-types-and-specialist-tax/lease-extensions-in-the-uk-surrender-and-regrant" },
    { label: "Ground rent rules in the UK", href: "/blog/property-types-and-specialist-tax/ground-rent-rules-uk" },
  ],
};
