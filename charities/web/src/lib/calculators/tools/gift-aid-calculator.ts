import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";
import { giftAid, type DonorBand } from "../charity-rules";

export const giftAidCalculator: GenericTool = {
  kind: "generic",
  slug: "gift-aid-calculator",
  name: "Gift Aid Calculator",
  category: "Gift Aid",
  oneLiner:
    "Work out how much Gift Aid your charity can claim on a donation, and what a higher-rate donor can reclaim.",
  metaTitle: "Gift Aid Calculator | What Your Charity Claims and Donors Reclaim",
  metaDescription:
    "Calculate Gift Aid on any donation: the 25p per £1 your charity reclaims from HMRC, what higher and additional-rate donors get back through Self Assessment, and the real net cost of giving.",
  intro:
    "Gift Aid adds 25p to every £1 donated by a UK taxpayer, at no cost to the donor. Enter a donation and the donor's tax band to see what the charity receives, what the donor can personally reclaim, and the true net cost of the gift.",
  ctaLabel: "Get help with your Gift Aid claims",
  embedHeight: 620,
  fields: [
    {
      id: "donation",
      label: "Donation amount",
      type: "currency",
      default: 100,
      step: 10,
      help: "The amount the donor actually gives (the net donation).",
    },
    {
      id: "band",
      label: "Donor's income tax band",
      type: "select",
      default: "basic",
      options: [
        { value: "basic", label: "Basic rate (20%)" },
        { value: "higher", label: "Higher rate (40%)" },
        { value: "additional", label: "Additional rate (45%)" },
        { value: "none", label: "Pays no UK income or capital gains tax" },
      ],
      help: "Scottish income tax bands differ slightly for donor relief; the charity's 25% claim is the same UK-wide.",
    },
  ],
  compute: (v) => {
    const r = giftAid(Number(v.donation), v.band as DonorBand);
    if (!r.eligible) {
      return {
        headline: { label: "Charity receives", value: gbp(r.donation), tone: "warn" },
        verdict: { text: "Gift Aid cannot be claimed on this donation", positive: false },
        rows: [
          { label: "Donation", value: gbp(r.donation) },
          { label: "Gift Aid claim", value: gbp(0), strong: true },
        ],
        note:
          "The donor must have paid at least as much UK income tax or capital gains tax this year as all charities will reclaim on their donations. If not, HMRC can ask the donor to pay the difference, so no Gift Aid declaration should be made.",
      };
    }
    return {
      headline: {
        label: "Charity receives",
        value: gbp(r.charityReceives),
        sub: `Includes ${gbp(r.charityClaim)} reclaimed from HMRC (25p per £1 donated)`,
        tone: "good",
      },
      rows: [
        { label: "Donation (net gift)", value: gbp(r.donation) },
        { label: "Gross donation (donation plus basic-rate tax)", value: gbp(r.gross) },
        { label: "Gift Aid the charity claims from HMRC", value: gbp(r.charityClaim), strong: true },
        { label: "Donor reclaims via Self Assessment", value: gbp(r.donorRelief), strong: r.donorRelief > 0 },
        { label: "Real net cost to the donor", value: gbp(r.netCostToDonor), strong: true },
      ],
      note:
        r.donorRelief > 0
          ? "Higher and additional-rate donors claim the extra relief through their Self Assessment tax return (or by asking HMRC to adjust their tax code). The charity's claim is unaffected."
          : "The charity needs a valid Gift Aid declaration before it can claim. Claims go to HMRC through the Charities Online service, usually within a few weeks.",
    };
  },
  explainer: {
    heading: "How Gift Aid works in 2026/27",
    paragraphs: [
      "Gift Aid lets a charity (or CASC) reclaim the basic-rate income tax a UK taxpayer has already paid on their donation. Because basic rate is 20%, a £100 donation is treated as £125 before tax, and the charity reclaims the £25 difference from HMRC. That is the familiar 25p per £1 figure: it is 20% of the gross donation, which works out at 25% of the net gift.",
      "The donor must complete a Gift Aid declaration and must have paid at least as much UK income tax or capital gains tax in the year as all the charities they support will reclaim. Council tax and VAT do not count. If a donor stops paying tax, they should tell the charities they give to, otherwise HMRC can recover the shortfall from the donor.",
      "Donors who pay tax above the basic rate get a second layer of relief personally. A higher-rate (40%) donor can reclaim 20% of the gross donation and an additional-rate (45%) donor 25% of the gross, through Self Assessment or a tax-code adjustment. On a £100 gift, that is £25 back for a higher-rate donor, so the charity receives £125 at a real cost to the donor of £75.",
      "For small cash and contactless donations of £30 or less, charities can also claim a top-up under the Gift Aid Small Donations Scheme without needing declarations. Our GASDS calculator covers that separately.",
    ],
  },
  faqs: [
    {
      question: "How much Gift Aid can a charity claim per £1 donated?",
      answer:
        "25p per £1. The charity reclaims the basic-rate tax (20%) on the gross donation, which equals 25% of the amount the donor actually gives. So a £100 donation brings the charity £125 in total.",
    },
    {
      question: "What does the donor need to do?",
      answer:
        "Complete a Gift Aid declaration (one declaration can cover past and future gifts to that charity) and make sure they have paid enough UK income tax or capital gains tax in the year to cover everything charities will reclaim on their donations. There is nothing to pay: the charity claims from HMRC.",
    },
    {
      question: "How do higher-rate taxpayers claim their extra relief?",
      answer:
        "Through their Self Assessment tax return, or by asking HMRC to adjust their tax code. The relief is the difference between their marginal rate and basic rate, applied to the gross donation: 20% of the gross for a 40% taxpayer, 25% of the gross for a 45% taxpayer.",
    },
    {
      question: "Can Gift Aid be claimed on donations from non-taxpayers?",
      answer:
        "No. If the donor has not paid enough UK tax to cover the claim, HMRC can require the donor to make up the difference. Charities should not accept a Gift Aid declaration from someone who says they do not pay UK income or capital gains tax.",
    },
    {
      question: "Does the donor get less if they give through Gift Aid?",
      answer:
        "No, the opposite. The donation costs the donor the same (or less, for higher-rate taxpayers who reclaim relief), while the charity receives 25% more. The extra money comes from tax the donor has already paid.",
    },
    {
      question: "Are Scottish taxpayers treated differently?",
      answer:
        "The charity's claim is the same across the UK: 25p per £1, based on the UK basic rate. Donor-side relief for Scottish taxpayers follows Scottish income tax rates and bands, so the personal reclaim can differ from the figures shown here. This site's calculations use the England, Wales and Northern Ireland bands.",
    },
  ],
};
