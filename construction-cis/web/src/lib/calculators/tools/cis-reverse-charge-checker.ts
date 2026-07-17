import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "../format";
import { VAT_STANDARD } from "../cis-tax";

/**
 * VAT Domestic Reverse Charge applicability checker for construction (CIS).
 *
 * Decision tree: HMRC VAT Notice 735 + CIS Regulations 2005.
 * DRC applies when ALL of the following are true:
 *   1. Supply is a specified construction service within CIS scope (not pure
 *      professional/architectural, not zero-rated new-build).
 *   2. Supplier is VAT-registered.
 *   3. Customer is VAT-registered.
 *   4. Customer is CIS-registered (i.e. in the CIS chain).
 *   5. Customer is NOT the end user and has NOT notified end-user / intermediary
 *      supplier status.
 *   6. Supply is standard-rated or reduced-rated (not zero-rated).
 *
 * When DRC applies: supplier charges £0 VAT and adds the statutory notice.
 * CIS deduction is always on the NET (VAT-exclusive) labour element.
 */

type DRCOutcome =
  | "applies"
  | "supplier_not_vat_registered"
  | "customer_not_vat_registered"
  | "customer_not_cis_registered"
  | "end_user"
  | "outside_cis_scope"
  | "zero_rated";

function decideDRC(v: {
  supplierVatRegistered: boolean;
  customerVatRegistered: boolean;
  customerCisRegistered: boolean;
  customerIsEndUser: boolean;
  withinCisScope: boolean;
  zeroRated: boolean;
}): DRCOutcome {
  if (!v.supplierVatRegistered) return "supplier_not_vat_registered";
  if (!v.customerVatRegistered) return "customer_not_vat_registered";
  if (!v.withinCisScope) return "outside_cis_scope";
  if (v.zeroRated) return "zero_rated";
  if (v.customerIsEndUser) return "end_user";
  if (!v.customerCisRegistered) return "customer_not_cis_registered";
  return "applies";
}

const OUTCOME_MESSAGES: Record<
  DRCOutcome,
  { headline: string; result: string; invoiceNote: string; explanation: string }
> = {
  applies: {
    headline: "DRC applies. Do NOT charge VAT",
    result: "Domestic Reverse Charge applies",
    invoiceNote:
      "Reverse charge: customer to account to HMRC for the output VAT on this supply. VAT Act 1994 s.55A.",
    explanation:
      "You are a VAT-registered subcontractor supplying CIS construction services to a VAT-registered, CIS-registered contractor who is not the end user. The domestic reverse charge applies. You do not add VAT to your invoice. Instead, you show the net amount, state the VAT rate that applies (20%), and include the statutory notice above. The contractor self-accounts for the VAT with HMRC. Your CIS deduction (0%, 20% or 30%) is calculated on the net labour element only, entirely separate from the VAT.",
  },
  supplier_not_vat_registered: {
    headline: "DRC does not apply. You are not VAT-registered",
    result: "Normal invoice, no VAT charged",
    invoiceNote:
      "No VAT (supplier is not VAT-registered). CIS deduction applies to the net labour amount in the usual way.",
    explanation:
      "The domestic reverse charge only operates between two VAT-registered businesses. Because you are not VAT-registered, you cannot charge VAT and the reverse charge does not apply. Your invoice shows the net amount only. CIS deductions still apply at the applicable rate on the labour element.",
  },
  customer_not_vat_registered: {
    headline: "DRC does not apply. Customer is not VAT-registered",
    result: "Normal VAT invoice, charge VAT at the standard rate",
    invoiceNote:
      "VAT at 20% charged in the usual way. Customer is not VAT-registered, so the reverse charge does not apply.",
    explanation:
      "The domestic reverse charge only applies when both parties are VAT-registered. Your customer is not VAT-registered, so you charge VAT at 20% in the normal way and account for it to HMRC on your VAT return. CIS deduction applies to the net labour amount.",
  },
  customer_not_cis_registered: {
    headline: "DRC does not apply. Customer is not CIS-registered",
    result: "Normal VAT invoice, charge VAT at the standard rate",
    invoiceNote:
      "VAT at 20% charged in the usual way. Customer is not in the CIS chain, so the reverse charge does not apply.",
    explanation:
      "The domestic reverse charge only applies within the CIS chain. Your customer is VAT-registered but not CIS-registered, which means they are outside the CIS chain for this supply (for example, a non-construction business commissioning building work). You charge VAT at 20% in the normal way. Note: if the customer is actually an end user (property owner commissioning their own premises), select the end user option instead.",
  },
  end_user: {
    headline: "DRC does not apply. Customer is the end user",
    result: "Normal VAT invoice, charge VAT at the standard rate",
    invoiceNote:
      "VAT at 20% charged in the usual way. Customer has confirmed end user status, so the reverse charge does not apply.",
    explanation:
      "Where the customer is the end user (the person who will use or occupy the building rather than sell on construction services), the domestic reverse charge does not apply, even if they are VAT-registered and CIS-registered. A property developer who occupies the completed building, or a business commissioning its own premises, is an end user. The customer should confirm their end user status in writing. You charge VAT at 20% in the normal way.",
  },
  outside_cis_scope: {
    headline: "DRC does not apply. Services outside CIS scope",
    result: "Normal VAT invoice, charge VAT at the standard rate",
    invoiceNote:
      "VAT at 20% charged in the usual way. Services are not specified construction operations for CIS purposes.",
    explanation:
      "The domestic reverse charge only covers supplies that fall within the CIS specified construction operations. Pure professional or architectural services, surveying, consultancy fees, drilling for oil/gas, and certain plant-and-machinery installations that are not part of a building are excluded. Zero-rated new-build residential construction is also excluded (addressed separately below). If your supply is entirely professional or architectural, you charge VAT at the appropriate rate in the normal way.",
  },
  zero_rated: {
    headline: "DRC does not apply. Supply is zero-rated",
    result: "Zero-rated VAT invoice: 0% VAT, no reverse charge",
    invoiceNote:
      "Zero-rated supply, VAT 0%. The domestic reverse charge does not apply to zero-rated supplies.",
    explanation:
      "The domestic reverse charge does not apply to zero-rated supplies. Construction of new residential dwellings, certain conversions and certain other supplies are zero-rated for VAT. You charge VAT at 0% in the usual way and include the zero-rated supply on your VAT return. CIS deductions still apply to the labour element at the applicable rate.",
  },
};

export const cisReverseChargeChecker: GenericTool = {
  kind: "generic",
  slug: "cis-reverse-charge-checker",
  name: "CIS VAT Domestic Reverse Charge Checker",
  category: "CIS Compliance",
  oneLiner:
    "Instantly check whether the VAT domestic reverse charge applies to your construction invoice, and get the exact wording to put on it.",
  metaTitle: "CIS VAT Domestic Reverse Charge Checker | 2026/27 Decision Tool",
  metaDescription:
    "Check whether the domestic reverse charge applies to your construction invoice in seconds. Answer six questions and get the exact invoice wording you need, plus how the CIS deduction interacts with DRC.",
  intro:
    "The VAT domestic reverse charge (DRC) applies to most CIS construction services between VAT-registered businesses. Getting it wrong means either charging VAT you should not (forcing your customer to claim it back) or not charging VAT you should, risking HMRC penalties. This checker applies the full HMRC VAT Notice 735 decision tree and gives you the exact wording for your invoice.",
  ctaLabel: "Get your CIS invoicing reviewed by a specialist →",
  embedHeight: 720,
  fields: [
    {
      id: "supplierVatRegistered",
      label: "Are you (the supplier) VAT-registered?",
      type: "toggle",
      default: true,
      help: "The domestic reverse charge only operates between VAT-registered businesses. If you are not VAT-registered, it never applies.",
    },
    {
      id: "customerVatRegistered",
      label: "Is your customer VAT-registered?",
      type: "toggle",
      default: true,
      help: "Both parties must be VAT-registered for DRC to apply. Check your customer's VAT number at HMRC's VAT number checker before issuing the invoice.",
    },
    {
      id: "customerCisRegistered",
      label: "Is your customer registered under the Construction Industry Scheme (CIS)?",
      type: "toggle",
      default: true,
      help: "The reverse charge applies within the CIS chain. Your customer should be a registered contractor or subcontractor who will use your services in their own CIS supply. If your customer is outside the CIS (for example a retailer commissioning a building) this is not in scope.",
    },
    {
      id: "customerIsEndUser",
      label: "Has the customer confirmed they are an end user or intermediary supplier?",
      type: "toggle",
      default: false,
      help: "An end user is the business or person who will actually use or occupy the building (not sell on construction services). A property developer who occupies completed premises is an end user. If the customer is buying the service to sell on as part of their own CIS supply chain, they are NOT an end user. The customer should confirm this in writing.",
    },
    {
      id: "withinCisScope",
      label: "Are the services within CIS scope (specified construction operations)?",
      type: "toggle",
      default: true,
      help: "Specified construction operations include building, demolition, repairs, decorating, groundworks, installation of systems (heating, lighting, plumbing) and similar trades. Excluded: pure professional/architectural services, surveying, consultancy, drilling for oil/gas, and certain plant installations not integral to a building.",
    },
    {
      id: "zeroRated",
      label: "Is the supply zero-rated (for example, new-build residential construction)?",
      type: "toggle",
      default: false,
      help: "The reverse charge does not apply to zero-rated supplies. New residential dwellings, certain conversions and some other supplies attract 0% VAT, in which case charge 0% in the usual way.",
    },
    {
      id: "netLabour",
      label: "Net labour value on this invoice (for illustrative wording only)",
      type: "currency",
      default: 3000,
      step: 100,
      help: "Used only to generate the invoice wording example and show the CIS deduction on the labour amount. VAT and CIS are calculated on this figure, independent of each other.",
    },
    {
      id: "cisRate",
      label: "Your CIS deduction rate",
      type: "select",
      default: "registered",
      options: [
        { value: "gps", label: "0% (Gross Payment Status)" },
        { value: "registered", label: "20% (CIS registered)" },
        { value: "unregistered", label: "30% (not CIS registered)" },
      ],
    },
  ],
  compute: (v) => {
    const supplierVatRegistered = Boolean(v.supplierVatRegistered);
    const customerVatRegistered = Boolean(v.customerVatRegistered);
    const customerCisRegistered = Boolean(v.customerCisRegistered);
    const customerIsEndUser = Boolean(v.customerIsEndUser);
    const withinCisScope = Boolean(v.withinCisScope);
    const zeroRated = Boolean(v.zeroRated);
    const netLabour = Math.max(0, Number(v.netLabour));
    const cisRateKey = String(v.cisRate ?? "registered") as keyof typeof CIS_RATE_MAP;

    const CIS_RATE_MAP = { gps: 0, registered: 0.20, unregistered: 0.30 };
    const cisRate = CIS_RATE_MAP[cisRateKey] ?? 0.20;

    const outcome = decideDRC({
      supplierVatRegistered,
      customerVatRegistered,
      customerCisRegistered,
      customerIsEndUser,
      withinCisScope,
      zeroRated,
    });

    const msg = OUTCOME_MESSAGES[outcome];
    const drcApplies = outcome === "applies";

    // VAT amounts
    const vatCharged = drcApplies ? 0 : zeroRated ? 0 : supplierVatRegistered ? netLabour * VAT_STANDARD : 0;
    const reverseChargeVatRef = drcApplies ? netLabour * VAT_STANDARD : 0;

    // CIS deduction is always on the NET (VAT-exclusive) labour amount
    const cisDeducted = netLabour * cisRate;
    const netReceived = netLabour + vatCharged - cisDeducted;

    // Build the illustrative invoice wording
    const invoiceWording = drcApplies
      ? `Net labour: ${gbp(netLabour)} | VAT charged: £0.00 | ${msg.invoiceNote} (reference amount the customer must account for: ${gbp(reverseChargeVatRef)}) | CIS deducted by contractor: ${gbp(cisDeducted)} (${(cisRate * 100).toFixed(0)}% of net labour) | Net received by you: ${gbp(netReceived)}`
      : `Net labour: ${gbp(netLabour)} | VAT charged: ${gbp(vatCharged)} | Total invoice: ${gbp(netLabour + vatCharged)} | CIS deducted by contractor: ${gbp(cisDeducted)} (${(cisRate * 100).toFixed(0)}% of net labour) | Net received by you: ${gbp(netReceived)}`;

    return {
      headline: {
        label: "DRC decision",
        value: msg.result,
        sub: msg.headline,
      },
      rows: [
        {
          label: "Outcome",
          value: msg.result,
          strong: true,
        },
        {
          label: "VAT you charge on this invoice",
          value: drcApplies
            ? "£0.00 (reverse charge applies)"
            : zeroRated
            ? "£0.00 (zero-rated supply)"
            : !supplierVatRegistered
            ? "£0.00 (not VAT-registered)"
            : gbp(vatCharged) + " (20%)",
        },
        ...(drcApplies
          ? [
              {
                label: "Reference VAT amount customer must self-account (20%)",
                value: gbp(reverseChargeVatRef),
              },
            ]
          : []),
        {
          label: "CIS deduction base (net labour, VAT-exclusive)",
          value: gbp(netLabour),
        },
        {
          label: `CIS deducted by contractor (${(cisRate * 100).toFixed(0)}% of net labour)`,
          value: gbp(cisDeducted),
        },
        {
          label: "Estimated net received after CIS",
          value: gbp(netReceived),
        },
        {
          label: "Invoice wording (illustrative)",
          value: invoiceWording,
        },
      ],
      note: msg.explanation,
    };
  },
  explainer: {
    heading: "How the VAT domestic reverse charge works in construction",
    paragraphs: [
      "The VAT domestic reverse charge for construction came into force on 1 March 2021, replacing the previous system where subcontractors charged VAT and contractors claimed it back. Under DRC, when it applies, the subcontractor issues an invoice showing the net amount only, states the VAT rate that would otherwise apply, and the contractor self-accounts for that VAT directly to HMRC. The subcontractor receives no VAT and claims no VAT on that invoice.",
      "DRC was introduced to eliminate 'missing trader' VAT fraud, where subcontractors collected VAT from contractors but disappeared before paying it to HMRC. HMRC VAT Notice 735 (updated to reflect the construction industry rules) sets out the full conditions. The core requirement is that both parties are VAT-registered, both are within the CIS chain, and the customer is not the end user of the construction services.",
      "The CIS deduction regime operates entirely independently of DRC. The contractor withholds CIS at 0%, 20% or 30% on the VAT-exclusive net labour amount, regardless of whether DRC applies. On a £3,000 net labour invoice with DRC applying, the subcontractor receives £3,000 minus the CIS deduction. The £600 reverse-charge VAT was never part of what they invoice or receive.",
      "Getting DRC wrong in either direction carries risk. Charging VAT when DRC should apply means your customer has to recover the VAT, creating a cash flow burden and potential disputes. Not applying DRC when it should apply means the subcontractor may be assessed for VAT they should not have charged, and the contractor may face penalties for failing to self-account.",
      "Worked example 1, DRC applies. A VAT-registered roofing subcontractor (20% CIS rate) invoices a VAT-registered, CIS-registered roofing contractor for labour on a commercial re-roof. The contractor is not the end user and will bill the building owner in their own supply chain. Net labour: £3,000. Result: no VAT charged by the subcontractor. Invoice note reads 'Reverse charge: customer to account to HMRC for the output VAT on this supply'. The contractor self-accounts for £600 output VAT. The contractor also withholds £600 CIS (20% of the £3,000 net labour). The subcontractor receives £2,400. The £600 VAT and the £600 CIS are entirely independent: one is a VAT liability handled by the customer, the other is a tax withholding on the subcontractor's income.",
      "Worked example 2, end user exemption. A VAT-registered plastering subcontractor invoices a property developer who is refurbishing offices they will occupy themselves. The developer has confirmed end user status in writing. Net labour: £2,500, CIS rate 20%. Result: DRC does not apply even though both parties are VAT-registered and CIS-registered. The subcontractor charges VAT at 20% (£500) in the normal way, making a total invoice of £3,000. The contractor withholds CIS of £500 (20% of the £2,500 net labour). The subcontractor receives £2,000 after CIS and accounts for the £500 VAT on their own VAT return. End user confirmation in writing should be retained by the subcontractor.",
    ],
  },
  faqs: [
    {
      question: "Does DRC apply if the customer is VAT-registered but not CIS-registered?",
      answer:
        "No. Both conditions must be met: VAT-registered AND CIS-registered. A retail business or restaurant commissioning building work may be VAT-registered but is not in the CIS chain. In that case you charge VAT at 20% in the normal way. The customer might be the end user in any event, which is an additional override.",
    },
    {
      question: "What exactly goes on the invoice when DRC applies?",
      answer:
        "Show the net amount, the VAT rate that applies (20%), the VAT amount for reference (what the customer must self-account), and the statutory notice: 'Reverse charge: customer to account to HMRC for the output VAT on this supply. VAT Act 1994 s.55A.' You do not show a 'total payable' that includes VAT because you are not charging it. The contractor pays you the net amount and handles the VAT with HMRC directly.",
    },
    {
      question: "What is the '20% CIS deduction on what amount' question, and does it include VAT?",
      answer:
        "No. CIS is always deducted on the net (VAT-exclusive) labour amount only. Materials are also excluded from the CIS base. If your invoice is £3,000 net labour with DRC applying, the contractor deducts 20% of £3,000 = £600 and pays you £2,400. The reverse-charge VAT of £600 that the contractor self-accounts to HMRC is entirely separate and never affects the CIS calculation.",
    },
    {
      question: "What if my customer says they are an end user but I am not sure?",
      answer:
        "You can rely on a written statement from the customer confirming end user status. If the customer gives you a written end user declaration and it turns out to be wrong, the liability for the incorrectly accounted VAT passes to the customer, not to you. Get the declaration before you issue the invoice and keep it on file. HMRC provides example wording in VAT Notice 735.",
    },
    {
      question: "Does DRC apply to my VAT return? What boxes do I fill in?",
      answer:
        "As the supplier under DRC, you include the net value of the supply in Box 6 (total value of sales) of your VAT return but do not include any VAT in Box 1 (VAT due on sales). As the customer self-accounting for the reverse charge, you include the VAT amount in both Box 1 (output tax) and Box 4 (input tax you are reclaiming), and the net value in both Box 6 and Box 7. The net effect on the customer is usually zero if they are fully taxable, but the amounts must still be entered correctly.",
    },
    {
      question: "Does DRC apply to zero-rated new residential construction?",
      answer:
        "No. The domestic reverse charge does not apply to zero-rated supplies. New residential dwellings and certain conversions attract 0% VAT. In that case you charge 0% VAT in the normal way on your subcontract invoice, and the reverse charge does not apply regardless of whether both parties are in the CIS chain.",
    },
    {
      question: "What if I supply mixed services, some DRC, some not?",
      answer:
        "Where a single supply is a mixture of services within and outside CIS scope, HMRC's guidance says the predominant element determines the VAT treatment for the whole supply. Where genuinely separate supplies are on the same invoice, each is treated on its own merits. In practice, if most of your invoice is for CIS construction operations and there is a small ancillary professional element, DRC most likely applies to the whole supply. If in doubt, take specialist advice or split the invoice.",
    },
  ],
};
