import type { GenericTool } from "@accounting-network/web-shared/tools/types";

export const makingAWillChecklist: GenericTool = {
  kind: "generic",
  slug: "making-a-will-checklist",
  name: "Making a Will Checklist",
  category: "Making a Will",
  oneLiner: "Get a personalised checklist of what to sort out before and while making a will.",
  metaTitle: "Making a Will Checklist | Personalised 2026/27",
  metaDescription:
    "Generate a personalised checklist for making a will, covering assets, executors, guardianship, trusts and the correct signing and witnessing process.",
  intro:
    "Making a will is more than filling in a template. This tool builds a personalised checklist based on your circumstances, covering what to decide before you write anything and how to make sure it's validly signed.",
  ctaLabel: "Get help drafting your will →",
  embedHeight: 680,
  fields: [
    { id: "ownProperty", label: "You own property (sole or shared)", type: "toggle", default: true },
    { id: "children", label: "You have children", type: "toggle", default: true },
    { id: "blendedFamily", label: "Blended family (children from a previous relationship, step-children)", type: "toggle", default: false },
    { id: "businessAssets", label: "You own a business or business assets", type: "toggle", default: false },
    { id: "foreignAssets", label: "You hold assets abroad", type: "toggle", default: false },
    { id: "previousWill", label: "You already have an existing will", type: "toggle", default: false },
  ],
  compute: (v) => {
    const ownProperty = Boolean(v.ownProperty);
    const children = Boolean(v.children);
    const blendedFamily = Boolean(v.blendedFamily);
    const businessAssets = Boolean(v.businessAssets);
    const foreignAssets = Boolean(v.foreignAssets);
    const previousWill = Boolean(v.previousWill);

    const rows: { label: string; value: string; strong?: boolean }[] = [
      { label: "List your assets", value: "Property, savings, investments, pensions, life insurance and personal possessions of value" },
      { label: "Choose your executor(s)", value: "One or more people (or a professional) to carry out your wishes; name a backup in case your first choice can't act" },
    ];

    if (children) {
      rows.push({ label: "Appoint a guardian", value: "Name who should look after any children under 18 if both parents die" });
    }
    if (ownProperty) {
      rows.push({ label: "Decide how property passes", value: "Confirm whether property is held as joint tenants or tenants in common, as this affects whether it can be left in your will at all" });
    }
    if (blendedFamily) {
      rows.push({ label: "Consider a trust for a blended family", value: "A life interest or discretionary trust can balance provision for a current partner and children from a previous relationship. Flag this for a specialist" });
    }
    if (businessAssets) {
      rows.push({ label: "Plan for business assets", value: "Check Business Relief eligibility and how business shares or a partnership interest should pass. Flag this for a specialist" });
    }
    if (foreignAssets) {
      rows.push({ label: "Address foreign assets", value: "You may need a separate will in the other jurisdiction, or specific wording to avoid conflicting succession rules" });
    }
    if (previousWill) {
      rows.push({ label: "Revoke your previous will", value: "A new will should expressly revoke all earlier wills and codicils to avoid confusion" });
    }

    rows.push(
      { label: "Sign correctly", value: "Sign in the presence of two independent witnesses, who then sign in your presence. Neither witness (or their spouse) can benefit under the will", strong: true },
      { label: "Store it safely", value: "Keep the original somewhere secure and tell your executor where it is; consider registering it with a will registry" },
      { label: "Review it periodically", value: "Revisit after marriage, divorce, a new child, or any major change in assets. Marriage automatically revokes an earlier will unless it was made in contemplation of that marriage" }
    );

    return {
      verdict: { text: `${rows.length}-point personalised checklist ready`, positive: true },
      headline: {
        label: "Your personalised will checklist",
        value: `${rows.length} items`,
      },
      rows,
      note:
        "This is a planning checklist, not a will template and not legal advice. It's designed to help you prepare before you write or instruct a will, not to replace professional drafting, particularly if a trust, business asset or blended family situation applies.",
    };
  },
  explainer: {
    heading: "DIY, online or solicitor: how to make a will",
    paragraphs: [
      "A DIY paper will kit costs very little, often under £30, but carries the highest risk of an invalid signature, ambiguous wording or a missed asset, any of which can cause serious problems (and cost) after death. An online will service, typically £50 to £150, adds some guided structure and basic checks but usually won't flag more complex issues like a blended family or a business interest.",
      "A solicitor-drafted will typically costs £300 to £1,000 or more for a straightforward single will, with mirror wills for a couple usually priced at a discount to double the single fee, and considerably more where trusts, business succession or cross-border assets are involved. The cost buys tailored advice on the situations a template can't handle well: protecting an inheritance for children from a first marriage while providing for a second spouse, structuring Business Relief correctly, or coordinating with a will in another country.",
      "Whichever route you choose, the will only becomes valid if it is signed correctly: you must sign (or acknowledge your signature) in the presence of two witnesses who are both present at the same time, and who then sign in your presence. A beneficiary or their spouse acting as a witness can void that person's inheritance under the will, even though the will itself remains valid, so choosing witnesses carefully matters.",
    ],
  },
  faqs: [
    {
      question: "What happens if I die without a will?",
      answer:
        "Your estate is distributed under the intestacy rules, a fixed legal order that may not match your wishes, particularly for unmarried partners (who have no automatic entitlement) or blended families. A will lets you choose who benefits and appoint guardians for children.",
    },
    {
      question: "Does marriage or divorce affect an existing will?",
      answer:
        "Marriage automatically revokes an earlier will unless it was made specifically in contemplation of that marriage. Divorce doesn't revoke the whole will but generally treats a former spouse as having died before you for the purposes of any gift or executor appointment to them, so both events call for a review.",
    },
    {
      question: "Can I write my own will without a solicitor?",
      answer:
        "Yes, there's no legal requirement to use a solicitor, provided it's validly signed and witnessed. It carries more risk of errors for anyone with property, a blended family, business assets or anything beyond the simplest estate.",
    },
    {
      question: "Who can't witness my will?",
      answer:
        "Anyone who is a beneficiary under the will, or married to one, shouldn't act as a witness, as it can void their own inheritance. Your executor can be a witness provided they aren't also a beneficiary.",
    },
    {
      question: "Do I need separate wills for assets in another country?",
      answer:
        "It depends on the country and how the assets are held. Some jurisdictions recognise a UK will, others require a local one, and conflicting wills can cause serious problems. This is worth checking with a specialist if you hold significant assets abroad.",
    },
    {
      question: "How often should I update my will?",
      answer:
        "Review it after any major life event, marriage, divorce, a new child or grandchild, a significant change in assets, or roughly every five years even without a specific trigger, to make sure it still reflects your wishes and circumstances.",
    },
  ],
};
