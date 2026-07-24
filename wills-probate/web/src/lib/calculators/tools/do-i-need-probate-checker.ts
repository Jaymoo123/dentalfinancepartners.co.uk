import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "../format";

export const doINeedProbateChecker: GenericTool = {
  kind: "generic",
  slug: "do-i-need-probate-checker",
  name: "Do I Need Probate Checker",
  category: "Probate Process",
  oneLiner: "Answer a few questions about the estate to see whether probate is likely to be needed.",
  metaTitle: "Do I Need Probate? Quick Checker | 2026/27",
  metaDescription:
    "Check whether probate is likely to be needed for an estate based on property ownership, bank balances, shares and how assets were held with a spouse.",
  intro:
    "Not every estate needs a grant of probate. Whether it's required depends on how assets were owned, how much is in each account, and what each institution's own rules require. Answer these questions to get a steer.",
  ctaLabel: "Check your position with a specialist →",
  embedHeight: 620,
  fields: [
    { id: "soleProperty", label: "Property owned solely by the deceased (not jointly)", type: "toggle", default: false },
    {
      id: "jointProperty",
      label: "Jointly owned property",
      type: "select",
      default: "none",
      options: [
        { value: "none", label: "No jointly owned property" },
        { value: "joint-tenants", label: "Joint tenants (passes automatically to survivor)" },
        { value: "tenants-in-common", label: "Tenants in common (deceased's share is part of the estate)" },
      ],
    },
    { id: "bankTotalSole", label: "Total in accounts held solely by the deceased", type: "currency", default: 15_000, step: 1_000 },
    { id: "premiumBonds", label: "Premium Bonds over £5,000 held solely by the deceased", type: "toggle", default: false },
    { id: "sharesOrInvestments", label: "Shares or investments held solely by the deceased", type: "toggle", default: false },
    { id: "everythingToSpouseJointly", label: "Everything else was jointly owned and passes automatically to a spouse/civil partner", type: "toggle", default: false },
  ],
  compute: (v) => {
    const soleProperty = Boolean(v.soleProperty);
    const jointProperty = v.jointProperty as string;
    const bankTotalSole = Number(v.bankTotalSole);
    const premiumBonds = Boolean(v.premiumBonds);
    const sharesOrInvestments = Boolean(v.sharesOrInvestments);
    const everythingToSpouseJointly = Boolean(v.everythingToSpouseJointly);

    const rows: { label: string; value: string; strong?: boolean }[] = [];
    let score: "yes" | "likely" | "probably-not" = "probably-not";

    if (soleProperty || jointProperty === "tenants-in-common") {
      score = "yes";
      rows.push({ label: "Property in the estate", value: "Almost always needs probate to sell or transfer it" });
    } else if (jointProperty === "joint-tenants") {
      rows.push({ label: "Jointly owned property (joint tenants)", value: "Passes automatically by survivorship, no probate needed for the property itself" });
    }

    if (sharesOrInvestments) {
      if (score !== "yes") score = "likely";
      rows.push({ label: "Shares or investments", value: "Registrars usually require a grant of probate to transfer or sell these" });
    }

    if (bankTotalSole > 20_000) {
      if (score !== "yes") score = "likely";
      rows.push({ label: "Sole bank balances", value: `${gbp(bankTotalSole)} is above the level most banks require probate for` });
    } else if (bankTotalSole > 0) {
      rows.push({ label: "Sole bank balances", value: `${gbp(bankTotalSole)} may be released without probate by some banks, but each sets its own limit (typically £5,000 to £50,000)` });
    }

    if (premiumBonds) {
      if (score !== "yes") score = "likely";
      rows.push({ label: "Premium Bonds", value: "NS&I generally requires a grant for balances over £5,000" });
    }

    if (score === "probably-not" && everythingToSpouseJointly) {
      rows.push({ label: "Jointly owned assets to spouse/civil partner", value: "Pass automatically by survivorship" });
    }

    const verdictText =
      score === "yes"
        ? "Probate is very likely needed"
        : score === "likely"
        ? "Probate is likely needed"
        : "Probate is probably not needed";

    return {
      verdict: { text: verdictText, positive: score !== "yes" },
      headline: {
        label: "Probate assessment",
        value: verdictText,
      },
      rows: rows.length
        ? rows
        : [{ label: "No triggers identified", value: "Based on your answers, no institution is likely to require a grant" }],
      note:
        "Banks, building societies and investment platforms each set their own threshold for releasing funds without a grant, commonly somewhere between £5,000 and £50,000, so always check directly with each institution holding assets. This is a general steer, not a determination, and a specialist can confirm your exact position.",
    };
  },
  explainer: {
    heading: "When probate is and isn't needed",
    paragraphs: [
      "Probate (or letters of administration where there's no will) gives the personal representatives legal authority to deal with the deceased's assets. Whether you need it depends on how each asset was owned and how much is involved, not on the size of the estate as a whole. Property owned solely by the deceased, or as tenants in common, almost always needs a grant before it can be sold or transferred, because the Land Registry requires it.",
      "Jointly owned property held as joint tenants passes automatically to the survivor by the right of survivorship and does not need probate for that asset, though probate may still be needed for other parts of the estate. Bank accounts, building society accounts and NS&I products (including Premium Bonds) each have their own internal threshold, commonly somewhere between £5,000 and £50,000, below which they will often release funds on production of a death certificate and some proof of entitlement, without insisting on a grant.",
      "Shares, investment funds and most pension death benefits held outside a trust structure typically do require a grant to transfer or sell, regardless of value, because registrars follow a stricter policy than banks. If most of the estate was jointly held with a spouse or civil partner and passes automatically, and the remaining sole assets are modest, probate may not be needed at all, but it's worth checking directly with each institution before assuming so.",
    ],
  },
  faqs: [
    {
      question: "What is the threshold below which banks don't need probate?",
      answer:
        "There is no single legal threshold, each bank and building society sets its own internal limit, commonly between £5,000 and £50,000. Above that limit they will normally insist on seeing a grant of probate or letters of administration before releasing funds.",
    },
    {
      question: "Do I need probate for a jointly owned bank account?",
      answer:
        "Usually not. Most joint accounts pass automatically to the surviving account holder by survivorship, without needing a grant, though the bank will still want to see a death certificate.",
    },
    {
      question: "What about a small estate with no property?",
      answer:
        "If the deceased held no property solely (or as tenants in common), and all sole accounts fall under each institution's own threshold, probate may not be needed. Always confirm directly with each institution rather than assuming.",
    },
    {
      question: "Do Premium Bonds always need probate?",
      answer:
        "NS&I will generally release Premium Bonds and other NS&I products without a grant for holdings under £5,000, but require one above that, subject to NS&I's current published limits.",
    },
    {
      question: "Is probate needed if there's a will but everything is jointly owned?",
      answer:
        "If every asset passes automatically by survivorship or nomination, a grant may not be legally required even where a will exists, though the will still matters for anything that doesn't pass automatically, and for record purposes.",
    },
  ],
};
