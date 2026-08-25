import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "../format";

export const probateDiyVsSolicitor: GenericTool = {
  kind: "generic",
  slug: "probate-diy-vs-solicitor",
  name: "Probate DIY vs Solicitor Comparison",
  category: "Probate Process",
  oneLiner: "Compare the cost and time of handling probate yourself against using a fixed-fee or full solicitor service.",
  metaTitle: "Probate DIY vs Solicitor | Cost & Time Compared 2026/27",
  metaDescription:
    "Compare handling probate yourself against a fixed-fee service or full solicitor, weighing cost, time commitment and complexity flags like disputes or foreign assets.",
  intro:
    "Many executors handle straightforward probate themselves. Others, especially with a complex estate, get better value from a specialist. This tool compares the routes on cost and time, and flags when a specialist is worth the extra spend.",
  ctaLabel: "Speak to a probate specialist →",
  embedHeight: 700,
  fields: [
    { id: "estateValue", label: "Total estate value", type: "currency", default: 400_000, step: 10_000 },
    { id: "disputeRisk", label: "Risk of a dispute between beneficiaries or a will challenge", type: "toggle", default: false },
    { id: "insolvent", label: "Estate may be insolvent (debts exceed assets)", type: "toggle", default: false },
    { id: "foreignAssets", label: "Foreign assets involved", type: "toggle", default: false },
    { id: "iht400Needed", label: "Full IHT400 account required", type: "toggle", default: false },
    { id: "trustsInvolved", label: "A trust is created or affected by the estate", type: "toggle", default: false },
  ],
  compute: (v) => {
    const estateValue = Number(v.estateValue);
    const disputeRisk = Boolean(v.disputeRisk);
    const insolvent = Boolean(v.insolvent);
    const foreignAssets = Boolean(v.foreignAssets);
    const iht400Needed = Boolean(v.iht400Needed);
    const trustsInvolved = Boolean(v.trustsInvolved);

    const redFlags = [
      disputeRisk && "risk of a beneficiary dispute or will challenge",
      insolvent && "the estate may be insolvent",
      foreignAssets && "foreign assets are involved",
      iht400Needed && "a full IHT400 account is required",
      trustsInvolved && "a trust is created or affected",
    ].filter(Boolean) as string[];

    const diyLow = 300;
    const diyHigh = 900;
    const fixedFeeLow = redFlags.length ? 3000 : 1500;
    const fixedFeeHigh = redFlags.length ? 6000 : 3000;
    const fullServiceLow = Math.max(fixedFeeHigh, estateValue * 0.01);
    const fullServiceHigh = Math.max(fixedFeeHigh * 1.5, estateValue * 0.04);

    const recommend = redFlags.length > 0;

    return {
      verdict: {
        text: recommend ? "Specialist support recommended" : "DIY or fixed-fee is likely to suit this estate",
        positive: !recommend,
      },
      headline: {
        label: recommend ? "Specialist recommended" : "DIY or fixed-fee likely suitable",
        value: recommend ? redFlags.join(", ") : "No red flags identified",
      },
      rows: [
        { label: "DIY probate (court fee, copies, valuations)", value: `${gbp(diyLow)} to ${gbp(diyHigh)}, plus 20 to 40 hours of your own time` },
        { label: "Fixed-fee probate service", value: `${gbp(fixedFeeLow)} to ${gbp(fixedFeeHigh)}, plus a few hours liaising` },
        { label: "Full solicitor service", value: `${gbp(fullServiceLow)} to ${gbp(fullServiceHigh)}, minimal time commitment from you` },
        {
          label: "Recommendation",
          value: recommend
            ? "Many executors handle probate themselves, but complex estates like this one benefit from a specialist"
            : "Many executors handle an estate like this themselves; a fixed-fee service is a good middle ground if you'd rather not",
          strong: true,
        },
      ],
      note:
        "This compares typical cost and time bands, not legal advice on whether you personally should act as executor. If you're ever unsure about your legal duties or personal liability as an executor, get that checked before proceeding.",
      workedExamples: [
        {
          title: "Simple estate, no red flags",
          inputs: { estateValue: gbp(300_000), disputeRisk: "No", iht400Needed: "No" },
          result: { note: "DIY or a fixed-fee service both work well here" },
        },
        {
          title: "Complex estate, dispute risk and IHT400",
          inputs: { estateValue: gbp(800_000), disputeRisk: "Yes", iht400Needed: "Yes" },
          result: { note: "A specialist is recommended given the combined complexity" },
        },
      ],
    };
  },
  explainer: {
    heading: "Choosing between DIY probate and a specialist",
    paragraphs: [
      "Many executors handle a straightforward estate themselves: gathering valuations, completing the online application, and dealing with each institution directly. It takes time, usually somewhere between 20 and 40 hours spread over several months, but keeps costs down to the court fee, extra copies and any valuations.",
      "A fixed-fee probate service sits in the middle, handling the application and forms for an agreed price, while you or the family still do some of the legwork like clearing a property or dealing with personal effects. This suits estates that are moderately complex but not contentious.",
      "A full solicitor service makes most sense where there's a real risk of a dispute, the estate could be insolvent, foreign assets or trusts are involved, or a full IHT400 account with HMRC is required. These situations carry personal liability risk for the executor if handled incorrectly, and the cost of getting it wrong (bearing personal liability for an incorrect distribution, for example) usually outweighs the professional fee.",
    ],
  },
  faqs: [
    {
      question: "Am I personally liable if I get something wrong doing DIY probate?",
      answer:
        "Yes. Executors and administrators can be held personally liable for distributing an estate incorrectly, including paying the wrong inheritance tax figure or distributing to the wrong beneficiaries. This risk is a key reason complex estates often justify professional help.",
    },
    {
      question: "How much time does DIY probate actually take?",
      answer:
        "Typically 20 to 40 hours across the whole process for a straightforward estate, spread over several months while you wait for valuations, HMRC clearance and the grant itself. It's rarely a continuous block of work.",
    },
    {
      question: "What's the difference between a fixed-fee service and a full solicitor service?",
      answer:
        "A fixed-fee service usually covers preparing and submitting the probate application and IHT forms for an agreed price, with you handling asset collection and distribution. A full service manages the entire estate administration end to end, for a correspondingly higher fee.",
    },
    {
      question: "Is it ever worth paying a percentage fee?",
      answer:
        "Percentage fees can work out reasonable on smaller, complex estates but become expensive on larger, straightforward ones. Always ask for a fixed-fee alternative quote to compare before agreeing to a percentage basis.",
    },
    {
      question: "What if I start DIY and it turns out to be more complicated than expected?",
      answer:
        "You can hand over to a solicitor partway through if things turn out more complex than expected, for example if a dispute emerges or an asset turns out to be abroad. It's better to get it checked early than after a mistake has been made.",
    },
  ],
};
