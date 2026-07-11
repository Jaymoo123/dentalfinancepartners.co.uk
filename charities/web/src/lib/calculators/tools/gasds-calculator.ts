import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";
import { gasdsClaim, GASDS } from "../charity-rules";

export const gasdsCalculator: GenericTool = {
  kind: "generic",
  slug: "gasds-small-donations-calculator",
  name: "GASDS Small Donations Calculator",
  category: "Gift Aid",
  oneLiner:
    "Work out your charity's top-up claim under the Gift Aid Small Donations Scheme, including the £8,000 cap and the matching rule.",
  metaTitle: "GASDS Calculator | Gift Aid Small Donations Scheme Claim",
  metaDescription:
    "Calculate what your charity can claim under GASDS: 25% top-up on cash and contactless donations of £30 or less, up to £8,000 of donations a year, subject to the 10-to-1 Gift Aid matching rule.",
  intro:
    "GASDS lets charities claim a 25% top-up on small cash and contactless donations of £30 or less, without Gift Aid declarations. The claim is capped at £8,000 of donations per tax year and limited to 10 times the donations you claim Gift Aid on. Enter your figures to see your top-up.",
  ctaLabel: "Get help maximising your Gift Aid and GASDS claims",
  embedHeight: 640,
  fields: [
    {
      id: "smallDonations",
      label: "Eligible small donations this tax year",
      type: "currency",
      default: 4000,
      step: 250,
      help: "Total cash and contactless donations of £30 or less each, collected in the UK this tax year. Cheques, bank transfers and donations with Gift Aid declarations do not count.",
    },
    {
      id: "giftAidDonations",
      label: "Donations you are claiming Gift Aid on this tax year",
      type: "currency",
      default: 1000,
      step: 100,
      help: "The matching rule limits GASDS to 10 times the donations on which you claim Gift Aid in the same tax year.",
    },
  ],
  compute: (v) => {
    const r = gasdsClaim(Number(v.smallDonations), Number(v.giftAidDonations));
    const bindingNote =
      r.binding === "annual-cap"
        ? `Your claim is capped by the ${gbp(GASDS.annualDonationsCap)} annual limit on small donations, so the maximum top-up of ${gbp(GASDS.annualDonationsCap * GASDS.topUpRate)} applies.`
        : r.binding === "matching"
          ? `Your claim is capped by the matching rule: you can only claim GASDS on ${GASDS.matchingMultiple} times the donations you claim Gift Aid on. Claiming Gift Aid on more donations this year would unlock a bigger GASDS claim.`
          : "Neither the £8,000 annual cap nor the matching rule limits this claim.";
    return {
      headline: {
        label: "GASDS top-up you can claim",
        value: gbp(r.topUp),
        sub: `On ${gbp(r.claimableDonations)} of eligible small donations`,
        tone: r.binding === "none" ? "good" : "warn",
      },
      rows: [
        { label: "Small donations entered", value: gbp(r.smallDonations) },
        { label: "Annual cap on donations", value: gbp(GASDS.annualDonationsCap) },
        {
          label: `Matching-rule cap (${GASDS.matchingMultiple} x Gift Aid donations)`,
          value: gbp(r.matchingCap),
        },
        { label: "Donations claimable", value: gbp(r.claimableDonations), strong: true },
        { label: "Top-up at 25%", value: gbp(r.topUp), strong: true },
      ],
      note: bindingNote,
    };
  },
  explainer: {
    heading: "How the Gift Aid Small Donations Scheme works",
    paragraphs: [
      "GASDS exists for the donations where a Gift Aid declaration is impractical: coins in a collection tin, cash in a bucket, a contactless tap at an event. Charities and CASCs can claim a top-up equal to 25% of eligible small donations, matching the Gift Aid rate, without needing any paperwork from the donor.",
      "A donation qualifies if it is £30 or less, made in cash or by contactless card, and collected in the UK. You cannot claim GASDS and Gift Aid on the same donation, and cheques, bank transfers, text donations and membership fees are excluded. Your charity must also make its GASDS claim within two years of the end of the tax year the donations were collected in.",
      "Two limits shape the claim. First, you can claim on at most £8,000 of small donations per tax year, giving a maximum top-up of £2,000. Second, the matching rule: your GASDS donations cannot exceed 10 times the donations on which you actually claim Gift Aid in the same year. A charity that claims Gift Aid on £500 of donations can claim GASDS on at most £5,000.",
      "Charities operating from community buildings, such as churches or village halls, and groups of connected charities have extra rules that can change the allowance per building. Those rules are outside this calculator; if they apply to you, take advice or work through the HMRC guidance carefully.",
    ],
  },
  faqs: [
    {
      question: "What counts as a small donation under GASDS?",
      answer:
        "A cash or contactless card donation of £30 or less, collected in the UK. Cheques, bank transfers, standing orders, text donations and anything covered by a Gift Aid declaration are excluded. The donor must not receive anything significant in return.",
    },
    {
      question: "What is the maximum GASDS claim?",
      answer:
        "You can claim the 25% top-up on up to £8,000 of eligible small donations per tax year, which is a maximum top-up of £2,000. Connected charities and community-building rules can alter this in specific cases.",
    },
    {
      question: "What is the matching rule?",
      answer:
        "Your GASDS claim is limited to 10 times the amount of donations you claim Gift Aid on in the same tax year. To claim the full £8,000 of GASDS donations you need to claim Gift Aid on at least £800 of donations that year. A charity that claims no Gift Aid at all cannot claim GASDS.",
    },
    {
      question: "Do we need Gift Aid declarations for GASDS donations?",
      answer:
        "No, that is the point of the scheme. You do need to be recognised as a charity by HMRC, keep records of how much was collected and where, and claim through the same Charities Online service used for Gift Aid.",
    },
    {
      question: "Is there a deadline for GASDS claims?",
      answer:
        "Yes, and it is shorter than Gift Aid. GASDS claims must be made within two years of the end of the tax year in which the donations were collected. Gift Aid itself allows four years, so do not assume the deadlines match.",
    },
    {
      question: "Can a new charity claim GASDS?",
      answer:
        "Yes. Since April 2017 there is no requirement to have a track record of Gift Aid claims in earlier years. The charity must be recognised by HMRC and must claim Gift Aid on some donations in the same year, because of the matching rule.",
    },
  ],
};
