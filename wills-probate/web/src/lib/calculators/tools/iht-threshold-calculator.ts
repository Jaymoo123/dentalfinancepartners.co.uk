import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "../format";
import { combinedThreshold, ihtDue, NRB, RNRB } from "../estate-tax";

export const ihtThresholdCalculator: GenericTool = {
  kind: "generic",
  slug: "iht-threshold-calculator",
  name: "IHT Threshold Calculator",
  category: "Inheritance Tax",
  oneLiner:
    "Work out your combined nil-rate band and residence nil-rate band, and the inheritance tax due on the excess.",
  metaTitle: "IHT Threshold Calculator | Nil-Rate Band 2026/27",
  metaDescription:
    "Calculate the combined nil-rate band and residence nil-rate band available to an estate, including transferred allowances, and the inheritance tax due above it.",
  intro:
    "Every estate has a tax-free threshold before inheritance tax applies, built from the nil-rate band, the residence nil-rate band, and any unused allowance transferred from a late spouse or civil partner. This calculator works out your combined threshold and the IHT due above it.",
  ctaLabel: "Get help reducing your inheritance tax bill →",
  embedHeight: 660,
  fields: [
    { id: "estateValue", label: "Total estate value", type: "currency", default: 600_000, step: 10_000 },
    {
      id: "maritalStatus",
      label: "Marital status",
      type: "select",
      default: "single",
      options: [
        { value: "single", label: "Single / divorced" },
        { value: "married-cp", label: "Married / civil partnership" },
        { value: "widowed-with-transfer", label: "Widowed, with transferable allowance" },
      ],
    },
    { id: "homeToDescendants", label: "Home left to children/grandchildren", type: "toggle", default: true },
    {
      id: "widowedTransferPct",
      label: "% of late spouse's allowance unused and transferable",
      type: "number",
      default: 100,
      min: 0,
      max: 100,
      suffix: "%",
      advanced: true,
    },
    { id: "charityTenPct", label: "At least 10% of the estate left to charity", type: "toggle", default: false, advanced: true },
  ],
  compute: (v) => {
    const estateValue = Number(v.estateValue);
    const maritalStatus = v.maritalStatus as string;
    const homeToDescendants = Boolean(v.homeToDescendants);
    const widowedTransferPct = Number(v.widowedTransferPct);
    const charityTenPct = Boolean(v.charityTenPct);

    const married = maritalStatus === "married-cp";
    const transferPct = maritalStatus === "widowed-with-transfer" ? widowedTransferPct : 0;

    const threshold = combinedThreshold({
      married,
      widowedTransferPct: transferPct,
      homeToDescendants,
      estateValue,
    });
    const taxable = Math.max(0, estateValue - threshold.total);
    const iht = ihtDue(taxable, charityTenPct);

    return {
      headline: {
        label: "Inheritance tax due",
        value: gbp(iht),
        sub: taxable > 0 ? `On ${gbp(taxable)} above your ${gbp(threshold.total)} threshold` : "Estate is within the tax-free threshold",
        tone: iht === 0 ? "good" : "default",
      },
      rows: [
        { label: "Standard nil-rate band", value: gbp(NRB) },
        { label: "Residence nil-rate band (after any taper)", value: gbp(threshold.rnrb) },
        ...(transferPct > 0
          ? [{ label: `Transferred allowance from late spouse (${widowedTransferPct}%)`, value: gbp(threshold.nrb - NRB + (threshold.rnrb > 0 ? threshold.rnrb - RNRB : 0)) }]
          : []),
        { label: "Total tax-free threshold", value: gbp(threshold.total), strong: true },
        { label: "Taxable excess", value: gbp(taxable) },
        { label: `Rate applied (${charityTenPct ? "36% charity rate" : "40% standard rate"})`, value: charityTenPct ? "36%" : "40%" },
        { label: "Inheritance tax due", value: gbp(iht), strong: true },
      ],
      note: married
        ? "As a married couple or civil partnership, this figure is for one estate. On the second death, any unused nil-rate band and residence nil-rate band from the first spouse to die can normally be transferred, roughly doubling the threshold available."
        : "The residence nil-rate band only applies where a home (or its sale proceeds) passes to children, grandchildren or other direct descendants, and it tapers away by £1 for every £2 the estate sits over £2,000,000.",
      workedExamples: [
        {
          title: "Single person, home to children, £600,000 estate",
          inputs: { estateValue: gbp(600_000), maritalStatus: "Single", homeToDescendants: "Yes" },
          result: { threshold: gbp(NRB + RNRB), taxable: gbp(600_000 - (NRB + RNRB)) },
        },
        {
          title: "Widow with full transferred allowance, £1,000,000 estate",
          inputs: { estateValue: gbp(1_000_000), maritalStatus: "Widowed, 100% transferable", homeToDescendants: "Yes" },
          result: { threshold: gbp((NRB + RNRB) * 2), note: "Combined threshold covers the whole estate" },
        },
      ],
    };
  },
  explainer: {
    heading: "How the inheritance tax threshold is built up",
    paragraphs: [
      "Every estate starts with the standard nil-rate band of £325,000, frozen at that level. On top of this, the residence nil-rate band adds a further £175,000 where a home, or the proceeds of one, passes to children, grandchildren or other direct descendants. Together these give a single person's estate a threshold of up to £500,000 before inheritance tax applies at 40% on the excess.",
      "The residence nil-rate band tapers away for larger estates, reducing by £1 for every £2 the total estate sits over £2,000,000, so it disappears entirely once the estate reaches £2,350,000. Married couples and civil partners can transfer any unused nil-rate band and residence nil-rate band from the first death to the survivor's estate, which can raise a combined estate's threshold to £1,000,000 or more.",
      "Where at least 10% of the net estate (calculated on a defined baseline) is left to charity, the rate on the taxable portion falls from 40% to 36%. Working out the correct threshold, especially where there has been a previous marriage, a second death, or downsizing from a larger home, is one of the most common areas where estates either overpay or under-claim, so it is worth checking your figures with a specialist.",
    ],
  },
  faqs: [
    {
      question: "Can I use both the nil-rate band and residence nil-rate band?",
      answer:
        "Yes, they stack. A single estate with a home passing to direct descendants gets the full £325,000 nil-rate band plus £175,000 residence nil-rate band, a combined £500,000 threshold, before any transferred allowance from a late spouse.",
    },
    {
      question: "What if the home was sold before death, for example to move into care?",
      answer:
        "The residence nil-rate band can still be available under the 'downsizing' rules, provided the deceased owned a qualifying home at some point after 8 July 2015 and assets of equivalent value pass to direct descendants. This is a more complex calculation and worth getting checked.",
    },
    {
      question: "Does leaving everything to my spouse avoid inheritance tax completely?",
      answer:
        "Transfers between UK-domiciled spouses and civil partners are exempt from inheritance tax regardless of amount. Tax becomes due when the estate eventually passes to non-exempt beneficiaries, typically on the second death, at which point both the transferred and the survivor's own thresholds apply.",
    },
    {
      question: "How does the residence nil-rate band taper actually work?",
      answer:
        "For every £2 an estate's value sits above £2,000,000, £1 of residence nil-rate band is lost. At £2,350,000 the full £175,000 has gone. This is based on the value of the estate before reliefs and exemptions, so lifetime gifting can sometimes bring an estate back under the taper threshold.",
    },
    {
      question: "What counts towards the 10% charity threshold for the reduced 36% rate?",
      answer:
        "The 10% test is calculated on a defined 'baseline amount', broadly the estate after deducting reliefs, exemptions and the nil-rate band, not simply 10% of the gross estate. Getting this calculation right usually needs professional input.",
    },
  ],
};
