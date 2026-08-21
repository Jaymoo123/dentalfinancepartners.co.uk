import type { GenericTool } from "../types";
import { gbp, pct } from "../format";

/**
 * Combined Business Property Relief + Agricultural Property Relief allowance,
 * IHTA 1984 s.124D as inserted by FA 2026 Sch 12 para 4, in force 6 April 2026.
 *
 * Ground truth: docs/property/house_positions.md §15.4 (+ §22.1 for the Pawson
 * investment line that decides whether a landlord gets into BPR at all).
 *  - s.124D(2)(a) quantum is £2,500,000, COMBINED across APR and BPR, and it is a
 *    rolling 7-year allowance (s.124D(3) allowance period), not a per-relief cap.
 *  - Below the allowance: 100% relief. Above it: 50% relief on the excess, so the
 *    excess is chargeable at half value, an effective 40% x 50% = 20% of the excess.
 *  - AIM and other "not listed" shares: 50% relief from 6 April 2026 and NOT
 *    affected by the allowance. Separate sub-tier, does not consume headroom.
 *  - Anti-forestalling: lifetime transfers on or after 30 October 2024 are caught
 *    where the donor dies on or after 6 April 2026 and within 7 years of the gift.
 *    Gifts before 30 October 2024 are not caught.
 *  - The allowance is transferable between spouses and civil partners, so a couple
 *    can shelter up to £5,000,000 across two deaths.
 *
 * STALE-PAGE WARNING carried from §15.4: the GOV.UK reforms summary still says
 * £1 million. It was published at announcement stage in October 2024 and never
 * updated post-enactment. Cite s.124D, never that page, for the quantum.
 */

/** IHTA 1984 s.124D(2)(a). Combined APR + BPR, per person, rolling 7 years. */
const ALLOWANCE_PER_PERSON = 2_500_000;

/** Relief rate above the allowance, and the flat rate on the AIM sub-tier. */
const RELIEF_ABOVE_ALLOWANCE = 0.5;

/**
 * Death rate of IHT.
 *
 * ponytail: fixed at 40% rather than a field. The 36% reduced charity rate and
 * the trust-side settlement allowance (s.124G to s.124K) are named as out of
 * scope in the note; add them only if a real reader asks for the trust case.
 */
const IHT_DEATH_RATE = 0.4;

export const bprAprAllowanceCalculator: GenericTool = {
  kind: "generic",
  slug: "bpr-apr-allowance-calculator",
  name: "BPR and APR Allowance Calculator",
  category: "Specialist Tax",
  oneLiner:
    "The combined £2.5m business and agricultural property relief allowance from 6 April 2026: what gets 100% relief, what drops to 50%, and the inheritance tax that leaves.",
  metaTitle: "BPR and APR Allowance Calculator | £2.5m Cap 2026",
  metaDescription:
    "Work out the combined £2.5m business and agricultural property relief allowance from 6 April 2026: 100% relief to the cap, 50% above it, AIM separate.",
  intro:
    "From 6 April 2026 the unlimited 100% rate of Business Property Relief and Agricultural Property Relief is replaced by a single combined allowance of £2,500,000 per person. Qualifying value inside the allowance keeps 100% relief. Value above it drops to 50% relief, which leaves an effective 20% of inheritance tax on the excess. AIM and other unquoted shares sit in a separate 50% sub-tier that does not touch the allowance at all.",
  ctaLabel: "Farm, trading business or mixed estate? Talk to us →",
  embedHeight: 940,
  fields: [
    {
      id: "agriculturalValue",
      label: "Qualifying agricultural property (APR)",
      type: "currency",
      default: 1_800_000,
      step: 50_000,
      help: "The agricultural value of land, farmhouses and farm buildings that already meet the occupation and ownership tests. Agricultural value only, so strip out development hope value, which never qualified for APR.",
    },
    {
      id: "businessValue",
      label: "Qualifying business property (BPR)",
      type: "currency",
      default: 1_200_000,
      step: 50_000,
      help: "Trading business interests and unquoted trading company shares that already meet the two-year ownership test and the mainly-trading test. A pure buy-to-let portfolio does not belong here: it is investment, not trading.",
    },
    {
      id: "aimShares",
      label: "AIM and other unquoted shares in the 50% sub-tier",
      type: "currency",
      default: 200_000,
      step: 25_000,
      help: "Shares designated as not listed on the markets of recognised stock exchanges, such as AIM. From 6 April 2026 the relief rate is 50%, and these shares do not use up the combined allowance.",
    },
    {
      id: "allowanceConsumed",
      label: "Allowance already used by gifts since 30 October 2024",
      type: "currency",
      default: 0,
      step: 50_000,
      help: "Enter the qualifying value you have given away on or after 30 October 2024. Those gifts eat the same allowance. Leave out anything you gave away before that date, and anything you have already survived by seven years.",
    },
    {
      id: "couple",
      label: "Married or in a civil partnership (show the combined view)",
      type: "toggle",
      default: false,
      help: "The allowance is transferable, so an allowance unused on the first death can pass to the survivor. A couple can shelter up to £5,000,000 across two deaths.",
    },
  ],
  compute: (v) => {
    const apr = Math.max(0, Number(v.agriculturalValue));
    const bpr = Math.max(0, Number(v.businessValue));
    const aim = Math.max(0, Number(v.aimShares));
    const consumed = Math.max(0, Number(v.allowanceConsumed));
    const couple = Boolean(v.couple);

    const allowance = ALLOWANCE_PER_PERSON * (couple ? 2 : 1);
    const available = Math.max(0, allowance - consumed);

    // APR and BPR share one pot. Value inside it keeps 100% relief; the rest
    // falls to 50% relief, so half of the excess stays chargeable.
    const combined = apr + bpr;
    const relievedFull = Math.min(combined, available);
    const excess = combined - relievedFull;
    const remaining = available - relievedFull;

    const chargeableExcess = excess * RELIEF_ABOVE_ALLOWANCE;

    // AIM sub-tier: flat 50%, and deliberately NOT netted against the allowance.
    const chargeableAim = aim * RELIEF_ABOVE_ALLOWANCE;

    const chargeable = chargeableExcess + chargeableAim;
    const iht = chargeable * IHT_DEATH_RATE;
    const effectiveOnExcess = IHT_DEATH_RATE * RELIEF_ABOVE_ALLOWANCE * 100;

    return {
      headline: {
        label: "Inheritance tax on the relieved property",
        value: gbp(iht),
        sub:
          excess > 0
            ? `${gbp(excess)} sits above the allowance and is relieved at 50%, not 100%`
            : consumed > 0 && remaining === 0
              ? "The allowance is fully used, so nothing further is relieved at 100%"
              : `${gbp(remaining)} of allowance is still unused`,
        tone: excess > 0 ? "warn" : combined > 0 ? "good" : "default",
      },
      rows: [
        { label: "Combined APR and BPR value entered", value: gbp(combined) },
        {
          label: "Allowance available for this transfer",
          value: gbp(available),
          strong: true,
        },
        { label: "Allowance remaining", value: gbp(remaining) },
        { label: "Value relieved at 100%", value: gbp(relievedFull) },
        { label: "Value relieved at 50%, the excess above the allowance", value: gbp(excess) },
        { label: "Chargeable value from the excess", value: gbp(chargeableExcess) },
        {
          label: "AIM and unquoted shares at 50%, separate sub-tier",
          value: aim > 0 ? `${gbp(aim)}, allowance untouched` : "£0",
        },
        { label: "Chargeable value from AIM and unquoted shares", value: gbp(chargeableAim) },
        { label: "Total chargeable value after relief", value: gbp(chargeable), strong: true },
        { label: "Inheritance tax at 40%", value: gbp(iht), strong: true },
        {
          label: "Effective rate on the value above the allowance",
          value:
            excess > 0
              ? `${pct(effectiveOnExcess)} of ${gbp(excess)}, which is ${gbp(chargeableExcess * IHT_DEATH_RATE)}`
              : "Nil, nothing sits above the allowance",
        },
        ...(couple
          ? [
              {
                label: "Couples view, the allowance is transferable",
                value: `${gbp(ALLOWANCE_PER_PERSON)} each, ${gbp(ALLOWANCE_PER_PERSON * 2)} combined`,
              },
            ]
          : []),
      ],
      note:
        (excess > 0
          ? `${gbp(excess)} of qualifying value sits above the allowance. Relief on it halves to 50%, so half stays chargeable and the effective inheritance tax cost of that slice is 20%. `
          : "") +
        (consumed > 0
          ? "Gifts of qualifying property made on or after 30 October 2024 have reduced the allowance shown above, because a death on or after 6 April 2026 and within seven years of the gift brings it inside the new rules. Earlier gifts, and gifts you survive by seven years, do not count. "
          : "") +
        "This tool assumes every figure you entered already qualifies, and that is the hard part rather than the arithmetic. Agricultural relief turns on occupation and ownership periods and on agricultural value rather than market value. Business relief turns on the mainly-trading test, where the Pawson line puts ordinary buy-to-let and most HMO letting firmly on the investment side and outside relief altogether. Borrowing also matters: a loan taken out to buy or improve the qualifying property reduces its relievable value first, before relief applies (IHTA 1984 s.162B), and this tool does not model liabilities, so enter values net of any such debt. Nil-rate bands, the residence nil-rate band and the trust rules are out of scope here, so this is the relief layer of the calculation and not a full estate computation. Get the qualification tested before you rely on any of these numbers.",
    };
  },
  explainer: {
    heading: "How the combined £2.5m allowance works from 6 April 2026",
    paragraphs: [
      "Until 5 April 2026, Business Property Relief and Agricultural Property Relief could take unlimited qualifying value out of an estate at 100%. From 6 April 2026 the two reliefs share a single allowance of £2,500,000 per person, inserted into the Inheritance Tax Act 1984 as section 124D by the Finance Act 2026. It is one pot, not one each: a farm and a trading company compete for the same headroom. It is also a rolling seven-year allowance rather than a once-per-death figure, so the allowance available on death is reduced by qualifying transfers already made inside the preceding seven years.",
      "Above the allowance nothing is lost entirely, it just gets worse. Qualifying value beyond the headroom is relieved at 50% instead of 100%, which means half of it remains chargeable. At the 40% death rate that produces an effective cost of 20% on every pound above the allowance. An estate £1,000,000 over the line therefore carries £200,000 of tax on that slice, where before April 2026 it carried none. That is the number worth planning against, because it is small enough to be survivable and large enough to force a sale if the estate is illiquid.",
      "AIM shares behave differently and the difference is easy to get wrong. Shares designated as not listed on the markets of recognised stock exchanges also drop to 50% relief from 6 April 2026, but they are expressly not affected by the new allowance. They neither consume headroom nor benefit from it. A holding of AIM shares is charged at an effective 20% however small the rest of the estate, and it leaves the full £2,500,000 available for the farm or the trading business. This calculator keeps the two on separate lines so the interaction stays visible.",
      "The obvious escape route, giving the assets away before the reform bites, was closed on the day it was announced. Lifetime transfers of qualifying property made on or after 30 October 2024, the date of the announcement, are brought inside the new rules where the donor dies on or after 6 April 2026 and within seven years of the gift. Gifting the farm in 2025 to beat the change therefore does not work if the donor dies inside the seven years. Transfers made before 30 October 2024 are genuinely outside it. Between spouses and civil partners the allowance is transferable in the same way as the nil-rate band, so an allowance unused on the first death can pass to the survivor and give the couple up to £5,000,000 across two deaths.",
    ],
  },
  faqs: [
    {
      question: "Is the allowance £1 million or £2.5 million?",
      answer:
        "£2,500,000. The £1 million figure comes from the announcement made at the Autumn Budget 2024 and it is still sitting on the GOV.UK summary page, which was never updated after the legislation was passed, which is why so many guides repeat it. The enacted figure, set by section 124D, is £2,500,000.",
    },
    {
      question: "Do agricultural and business property get an allowance each?",
      answer:
        "No, and this is the single most expensive misreading of the reform. There is one combined allowance covering both reliefs. A farmer with £2,000,000 of qualifying farmland and £1,500,000 of qualifying trading business has £3,500,000 of qualifying value chasing £2,500,000 of headroom, so £1,000,000 falls to 50% relief. Mixed estates need to decide in advance which assets take the 100% slice, because the allowance is applied to the estate rather than chosen asset by asset once someone has died.",
    },
    {
      question: "Does my buy-to-let portfolio use up the allowance?",
      answer:
        "No, because it never gets near the relief in the first place. Pawson v HMRC settled that passive residential letting is mainly investment, so it fails business relief outright and there is nothing for the allowance to apply to. That cuts both ways: a landlord with only rental property is unaffected by the April 2026 cap, but is also getting no relief at all on the portfolio. The estates that feel this reform are farms, development businesses holding work in progress, genuine serviced-accommodation operations and mixed estates that own a real trading business alongside the rentals.",
    },
    {
      question: "What happens to AIM shares?",
      answer:
        "They fall from 100% relief to 50% from 6 April 2026, which is a real cost, but they stay outside the allowance entirely. They do not eat into your £2,500,000 and they cannot shelter under it either. The practical effect is a flat effective inheritance tax rate of 20% on the AIM holding, whatever else the estate contains. Anyone who bought AIM stock purely as an inheritance tax shelter is now holding a higher-risk portfolio for half the relief it was bought for, which is worth revisiting on its own merits.",
    },
    {
      question: "Can I give the farm away now to avoid the cap?",
      answer:
        "Only if you survive it by seven years. Live those seven years and the gift falls out of the death calculation altogether, whatever date you made it on. Die inside them, on or after 6 April 2026, and the anti-forestalling rule pulls any gift made on or after 30 October 2024 into the new rules, so it consumes the allowance in exactly the way the gift was meant to avoid: a gift in 2025 followed by a death in 2028 is caught. A gift completed before 30 October 2024 is outside the rule even if you die within seven years of it. Gifting also carries a capital gains tax question and a gift with reservation of benefit question if you keep using the asset, so it is never a single-tax decision.",
    },
    {
      question: "Is the allowance transferable between spouses?",
      answer:
        "Yes. An allowance unused on the first death passes to the surviving spouse or civil partner, in the same way as the nil-rate band, so a couple can shelter up to £5,000,000 of qualifying property across two deaths. It has to be claimed, and it is only worth what was left over, so the classic mistake is the same as with the nil-rate band: leaving everything to the survivor spouse-exempt does not waste the allowance, but failing to hold qualifying property in a way that lets the survivor use it can. The couples toggle above shows the combined view.",
    },
    {
      question: "What is not in this calculator?",
      answer:
        "The nil-rate band, the residence nil-rate band and its taper above £2,000,000, the 36% reduced rate where at least a tenth of the estate goes to charity, the separate allowance rules for trusts, and any question of whether your assets actually qualify. It models the relief layer only: how much qualifying value gets 100%, how much drops to 50%, and the tax that leaves at the 40% death rate. Qualification is where the money and the arguments actually sit, and it is decided on occupation, trading activity and evidence rather than on a slider.",
    },
  ],
  workedExamples: [
    {
      heading: "A mixed farm and trading estate just above the allowance",
      inputs:
        "£1,800,000 of qualifying agricultural property, £1,200,000 of qualifying business property, £200,000 of AIM shares, no gifts since 30 October 2024, single person",
      steps: [
        "Combined APR and BPR value = £1,800,000 + £1,200,000 = £3,000,000",
        "Allowance available = £2,500,000, because nothing has been used by earlier gifts",
        "Value relieved at 100% = £2,500,000, leaving £0 of allowance remaining",
        "Excess above the allowance = £3,000,000 - £2,500,000 = £500,000, relieved at 50%",
        "Chargeable value from the excess = £500,000 x 50% = £250,000",
        "AIM shares sit in the separate 50% sub-tier and do not touch the allowance: £200,000 x 50% = £100,000 chargeable",
        "Total chargeable value = £250,000 + £100,000 = £350,000",
        "Inheritance tax at 40% = £140,000",
        "Effective rate on the £500,000 above the allowance = 20%, which is £100,000 of that bill, and the AIM shares account for the other £40,000",
      ],
    },
    {
      heading: "The same allowance after a gift caught by anti-forestalling",
      inputs:
        "£2,000,000 of qualifying agricultural property at death, £1,000,000 of qualifying business property given away in January 2025, no AIM shares, single person, death within seven years of the gift and after 6 April 2026",
      steps: [
        "The January 2025 gift is on or after 30 October 2024, so the anti-forestalling rule applies and it consumes allowance",
        "Allowance available at death = £2,500,000 - £1,000,000 = £1,500,000",
        "Value relieved at 100% = £1,500,000 of the £2,000,000 farm, leaving £0 of allowance remaining",
        "Excess above the allowance = £500,000, relieved at 50%",
        "Chargeable value = £500,000 x 50% = £250,000",
        "Inheritance tax at 40% = £100,000, the same 20% effective rate on the excess",
        "Had the gift been completed before 30 October 2024 the full £2,500,000 would still be available and the farm would be wholly relieved at 100%",
      ],
    },
  ],
  related: [
    {
      label: "April 2026 BPR and APR cap: the impact on property investors",
      href: "/blog/landlord-tax-essentials/iht-april-2026-bpr-apr-cap-property-impact",
    },
    {
      label: "Allocating the cap across a mixed trading and investment estate",
      href: "/blog/landlord-tax-essentials/iht-1m-bpr-apr-cap-mixed-trading-investing-landlord-allocation",
    },
    {
      label: "Agricultural Property Relief and the cap for mixed estates",
      href: "/blog/property-types-and-specialist-tax/agricultural-property-relief-mixed-estate-1m-cap",
    },
    {
      label: "Why pure buy-to-let fails BPR: the Pawson test",
      href: "/blog/landlord-tax-essentials/bpr-pure-btl-pawson-test-why-buy-to-let-fails-investment-line",
    },
    {
      label: "Serviced accommodation BPR eligibility: the Pawson test",
      href: "/blog/property-types-and-specialist-tax/serviced-accommodation-bpr-eligibility-pawson-test",
    },
    {
      label: "An inheritance tax decision framework for landlords, 2026 onwards",
      href: "/blog/landlord-tax-essentials/iht-property-investors-decision-framework-2026-onwards",
    },
  ],
};
