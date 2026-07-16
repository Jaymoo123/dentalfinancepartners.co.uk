import type { GenericTool } from "@accounting-network/web-shared/tools/types";

export const investorVsTraderChecker: GenericTool = {
  kind: "generic",
  slug: "investor-vs-trader-checker",
  name: "Investor vs Trader Status Checker",
  category: "Status and Classification",
  oneLiner: "See how HMRC badges of trade apply to your crypto activity. Almost all individuals are investors (CGT), not traders.",
  metaTitle: "Crypto Investor vs Trader Status Checker | Crypto Tax Partners",
  metaDescription: "Check whether your UK crypto activity is likely investment (CGT at 18%/24%) or trading (income tax up to 45%). Badges-of-trade analysis. Trader status is rare and usually worse.",
  intro: "Answer three questions about your activity. The tool applies the HMRC badges of trade and shows whether your position looks like investment (CGT) or trading (income tax). Almost all individuals are investors.",
  embedHeight: 520,
  fields: [
    { id: "frequency", label: "How often do you typically trade?", type: "select", default: "occasional", options: [{ value: "occasional", label: "Occasionally (a few times a year)" }, { value: "regular", label: "Regularly (weekly)" }, { value: "intensive", label: "Very intensively (multiple times per day)" }] },
    { id: "organised", label: "Do you operate in a highly organised, business-like manner?", type: "select", default: "no", options: [{ value: "no", label: "No" }, { value: "yes", label: "Yes, with commercial infrastructure and systems" }], help: "HMRC considers whether you operate with the organisation and commerciality of a trade." },
    { id: "primaryIncome", label: "Is your crypto activity your primary source of income?", type: "select", default: "no", options: [{ value: "no", label: "No" }, { value: "yes", label: "Yes" }] },
  ],
  compute(v) {
    const freq = String(v.frequency ?? "occasional");
    const organised = v.organised === "yes";
    const primaryIncome = v.primaryIncome === "yes";

    let badgeCount = 0;
    if (freq === "intensive") badgeCount++;
    if (organised) badgeCount++;
    if (primaryIncome) badgeCount++;

    if (badgeCount === 0) {
      return {
        headline: { label: "Likely status", value: "Investor", sub: "Subject to CGT at 18%/24%", tone: "good" },
        verdict: { text: "Investor (CGT)", positive: true },
        note: "No badges of trade present. HMRC would almost certainly treat this as investment activity. CGT at 18%/24% applies.",
      };
    }
    if (badgeCount === 1) {
      return {
        headline: { label: "Likely status", value: "Investor (most likely)", sub: "One badge of trade present; CGT still most likely" },
        verdict: { text: "Investor (CGT) most likely", positive: true },
        note: "One badge of trade is present. CGT is still the most likely outcome, but specialist advice is worthwhile if high volumes are involved.",
      };
    }
    return {
      headline: { label: "Likely status", value: "Uncertain", sub: "Multiple badges of trade: specialist review recommended", tone: "warn" },
      verdict: { text: "Uncertain: specialist review recommended", positive: false },
      note: "Multiple badges of trade are present. HMRC could argue trading status, which would typically mean income tax rates up to 45% rather than CGT at 18%/24%. A specialist review is strongly advisable before filing.",
    };
  },
  explainer: {
    heading: "Investor vs trader: why it matters",
    paragraphs: [
      "HMRC's Cryptoassets Manual states that it is unlikely that an individual buying and selling cryptoassets would be regarded as carrying on a trade. Trading status is reserved for exceptional cases where the activity amounts to a financial trade on the facts.",
      "The badges of trade (frequency, organisation, profit motive, method of financing) are used to determine status. High volume alone does not create a trade: many high-frequency investors are still CGT taxpayers.",
      "Trader status is nearly always worse than investor status. Income tax rates run up to 45%, compared with CGT at 18%/24%. Losses would be income losses rather than capital losses, which has its own consequences.",
    ],
  },
  faqs: [
    { question: "Does HMRC always treat crypto as investment?", answer: "HMRC's default position is that crypto activity by individuals is investment subject to CGT. They will only argue trading where the activity genuinely amounts to a financial trade on the facts, which is a high bar." },
    { question: "Can I choose to be treated as a trader?", answer: "No. Tax status is determined by the facts. You cannot elect to be a trader to access income tax loss relief, and HMRC will look at the substance of the activity." },
  ],
};
