import type { GenericTool } from "../types";
import { gbp } from "../format";

const RATES: Record<string, number> = { basic: 0.2, higher: 0.4, additional: 0.45 };
const RENT_A_ROOM_LIMIT = 7_500;

export const rentARoomReliefCalculator: GenericTool = {
  kind: "generic",
  slug: "rent-a-room-relief-calculator",
  name: "Rent-a-Room Relief Calculator",
  category: "Income tax",
  oneLiner:
    "Tax on letting a furnished room in your own home, comparing the £7,500 rent-a-room scheme with the normal basis.",
  metaTitle: "Rent-a-Room Relief Calculator | £7,500 Allowance (UK 2026/27)",
  metaDescription:
    "Free rent-a-room relief calculator. Compare the £7,500 rent-a-room scheme with the normal expenses basis on income from letting a furnished room in your own home. Instant result.",
  intro:
    "See the tax on letting a furnished room in your home, comparing the £7,500 rent-a-room scheme with the normal basis.",
  ctaLabel: "Letting a room? Get it right →",
  embedHeight: 640,
  fields: [
    { id: "roomRent", label: "Annual room income", type: "currency", default: 9_000 },
    {
      id: "expenses",
      label: "Expenses for the let room",
      type: "currency",
      default: 2_000,
      help: "The share of running costs attributable to the room, used only on the normal basis.",
    },
    {
      id: "band",
      label: "Your income tax band",
      type: "select",
      default: "higher",
      options: [
        { value: "basic", label: "Basic rate (20%)" },
        { value: "higher", label: "Higher rate (40%)" },
        { value: "additional", label: "Additional rate (45%)" },
      ],
    },
  ],
  compute: (v) => {
    const rate = RATES[String(v.band)] ?? 0.4;
    const rent = Number(v.roomRent);
    const expenses = Number(v.expenses);
    const schemeTaxable = Math.max(0, rent - RENT_A_ROOM_LIMIT);
    const normalTaxable = Math.max(0, rent - expenses);
    const schemeTax = schemeTaxable * rate;
    const normalTax = normalTaxable * rate;
    const useScheme = schemeTax <= normalTax;
    const best = Math.min(schemeTax, normalTax);
    return {
      headline: {
        label: "Tax on your room income",
        value: gbp(best),
        sub: rent <= RENT_A_ROOM_LIMIT ? "Within the £7,500 allowance" : `Best method: ${useScheme ? "rent-a-room scheme" : "normal basis"}`,
      },
      rows: [
        { label: "Rent-a-room scheme (£7,500 tax-free)", value: gbp(schemeTax) },
        { label: "Normal basis (income less expenses)", value: gbp(normalTax) },
        { label: "You would pay", value: gbp(best), strong: true },
      ],
      note: "Rent-a-room applies to letting a furnished room in your own home, not a separate buy-to-let. The £7,500 allowance is halved to £3,750 if anyone else also receives income from the same property. If your receipts are £7,500 or less the income is tax-free and need not be declared.",
    };
  },
  explainer: {
    heading: "How rent-a-room relief works",
    paragraphs: [
      "Rent-a-room relief lets you earn up to £7,500 a year tax-free from letting a furnished room in your own home, for example to a lodger. If your total receipts for the year are £7,500 or less, the income is exempt and you do not even need to declare it.",
      "If you earn more than £7,500, you choose between two methods. Under the scheme you simply pay tax on the receipts above £7,500, claiming no expenses. On the normal basis you instead pay tax on the profit, receipts less the actual expenses attributable to the let. The calculator shows both so you can pick the lower bill, and you can change your choice from year to year.",
      "The £7,500 limit is halved to £3,750 where someone else, such as a partner or joint owner, also receives income from letting the same property. The relief only covers a room in your own home, so it does not apply to a buy-to-let or a property you do not live in.",
      "Rent-a-room can be generous for live-in landlords, but the normal basis sometimes wins where expenses are high or the room income is well above the allowance. We can check which suits you.",
    ],
  },
  faqs: [
    {
      question: "How much can I earn tax-free from a lodger?",
      answer:
        "Up to £7,500 a year under rent-a-room relief, for letting a furnished room in your own home. If your receipts stay at or below £7,500, the income is exempt and need not be declared.",
    },
    {
      question: "Does rent-a-room relief apply to a buy-to-let?",
      answer:
        "No. It only covers letting a furnished room in the home you live in. Income from a separate buy-to-let property is taxed under the normal rental rules.",
    },
    {
      question: "Is the £7,500 allowance shared?",
      answer:
        "If anyone else also receives income from letting the same property, the allowance is halved to £3,750 each rather than £7,500.",
    },
  ],
};
