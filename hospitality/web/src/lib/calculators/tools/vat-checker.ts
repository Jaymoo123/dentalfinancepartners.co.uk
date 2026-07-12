import type { GenericTool } from "@accounting-network/web-shared/tools/types";

// VAT decision tree implementing VAT Notice 709/1 (Catering, takeaway food) and
// VAT Notice 701/14 (Food products). Sources cited in FAQs.

export type ItemType =
  | "hot-food"
  | "cold-food"
  | "hot-drink"
  | "cold-drink"
  | "confectionery"
  | "crisps-snacks"
  | "ice-cream"
  | "alcohol";

export type ConsumptionType = "eat-in" | "takeaway" | "delivery";

// Excepted items under VAT Notice 701/14 Group 1 — always standard-rated even
// when cold and taken away.
const EXCEPTED_ITEMS: Set<ItemType> = new Set(["confectionery", "crisps-snacks", "ice-cream"]);

// Soft drinks (non-dairy, non-alcoholic) are also excepted — represented here
// by cold-drink (dairy-free context). Dairy-based drinks (milkshakes, plain
// milk) are zero-rated; we default cold-drink to excepted as the safe/standard
// case for carbonated and fruit drinks.
const SOFT_DRINK_EXCEPTED: Set<ItemType> = new Set(["cold-drink"]);

export interface VatResult {
  vatRate: 0 | 20;
  rationale: string;
  vatNoticeRef: string;
}

export function checkVat(
  itemType: ItemType,
  isHot: boolean,
  consumptionType: ConsumptionType,
  isAlcohol?: boolean,
): VatResult {
  // Alcohol always standard-rated
  if (isAlcohol || itemType === "alcohol") {
    return {
      vatRate: 20,
      rationale: "Alcohol is always standard-rated at 20%, regardless of temperature or consumption location.",
      vatNoticeRef: "VAT Notice 701/14 (Group 1, excepted items)",
    };
  }

  // Eat-in: all food and non-alcoholic drink is a catering supply, standard-rated
  if (consumptionType === "eat-in") {
    return {
      vatRate: 20,
      rationale:
        "Eating in makes this a catering supply. All food and non-alcoholic drinks consumed on the premises are standard-rated at 20%, regardless of temperature.",
      vatNoticeRef: "VAT Notice 709/1 (Catering and take-away food)",
    };
  }

  // Takeaway or delivery — hot food/drink standard-rated
  if (isHot || itemType === "hot-food" || itemType === "hot-drink") {
    return {
      vatRate: 20,
      rationale:
        "Hot food and hot drinks sold for takeaway or delivery are standard-rated at 20%. HMRC defines hot as food heated above ambient temperature for consumption hot.",
      vatNoticeRef: "VAT Notice 709/1 (hot take-away food and drink)",
    };
  }

  // Excepted items (confectionery, crisps, ice cream, soft drinks) — standard-rated
  // even when cold and taken away
  if (EXCEPTED_ITEMS.has(itemType)) {
    return {
      vatRate: 20,
      rationale: `${itemType === "confectionery" ? "Confectionery" : itemType === "crisps-snacks" ? "Crisps and savoury snacks" : "Ice cream"} is an excepted item under VAT Notice 701/14 and is always standard-rated at 20%, even when cold and taken away.`,
      vatNoticeRef: "VAT Notice 701/14 (Group 1, excepted items)",
    };
  }

  // Cold-drink (soft drinks): excepted and standard-rated
  if (SOFT_DRINK_EXCEPTED.has(itemType)) {
    return {
      vatRate: 20,
      rationale:
        "Cold soft drinks (carbonated, fruit juices, etc.) are excepted items and standard-rated at 20% even when sold cold for takeaway. Plain milk and unflavoured dairy drinks may be zero-rated; check VAT Notice 701/14 if applicable.",
      vatNoticeRef: "VAT Notice 701/14 (Group 1, excepted items: cold drinks)",
    };
  }

  // Cold food takeaway/delivery, non-excepted: zero-rated
  return {
    vatRate: 0,
    rationale:
      "Cold food sold for takeaway or delivery that is not an excepted item is zero-rated (0% VAT). This covers most cold sandwiches, salads, pastries sold cold, and cold prepared meals.",
    vatNoticeRef: "VAT Notice 701/14 (Group 1) and VAT Notice 709/1",
  };
}

export const vatCheckerTool: GenericTool = {
  kind: "generic",
  slug: "food-drink-vat-rate-checker",
  name: "Food and Drink VAT Rate Checker",
  category: "Food and Drink VAT",
  oneLiner:
    "Enter the item type, temperature and whether it is eat-in, takeaway or delivery to get the correct 0% or 20% VAT rate under HMRC's VAT Notices 709/1 and 701/14.",
  metaTitle: "Food and Drink VAT Rate Checker | 0% or 20%? 2026/27",
  metaDescription:
    "Instant VAT verdict for food and drink: hot or cold, eat-in or takeaway, delivery. Applies the full VAT Notice 709/1 and 701/14 decision tree including excepted items (confectionery, crisps, ice cream, soft drinks).",
  intro:
    "VAT on food depends on temperature, where it is eaten and the product type. Hot takeaway food is standard-rated. Cold takeaway is zero-rated unless it is an excepted item. All eat-in food is standard-rated as a catering supply. Use this checker to confirm the correct rate.",
  ctaLabel: "Get expert help with food and drink VAT",
  embedHeight: 640,
  fields: [
    {
      id: "itemType",
      label: "Item type",
      type: "select",
      default: "cold-food",
      options: [
        { value: "cold-food", label: "Cold food (sandwiches, salads, cold pastries, etc.)" },
        { value: "hot-food", label: "Hot food (cooked meals, hot pasties, chips, etc.)" },
        { value: "hot-drink", label: "Hot drink (coffee, tea, hot chocolate)" },
        { value: "cold-drink", label: "Cold drink (soft drinks, juice, water)" },
        { value: "confectionery", label: "Confectionery (chocolate, sweets, cereal bars)" },
        { value: "crisps-snacks", label: "Crisps and savoury snacks" },
        { value: "ice-cream", label: "Ice cream, lollies or frozen dessert" },
        { value: "alcohol", label: "Alcohol (beer, wine, spirits, alcopops)" },
      ],
      help: "Select the category that best describes the item. Confectionery, crisps, ice cream and soft drinks are excepted items always charged at 20%.",
    },
    {
      id: "consumptionType",
      label: "How is it consumed?",
      type: "select",
      default: "takeaway",
      options: [
        { value: "eat-in", label: "Eat in (consumed on the premises)" },
        { value: "takeaway", label: "Takeaway (customer takes it away)" },
        { value: "delivery", label: "Delivery (delivered to customer)" },
      ],
      help: "Eating in always triggers the catering supply rate (20%). Takeaway and delivery depend on temperature and item type.",
    },
  ],
  compute: (v) => {
    const itemType = v.itemType as ItemType;
    const consumptionType = v.consumptionType as ConsumptionType;
    const isHot = itemType === "hot-food" || itemType === "hot-drink";
    const result = checkVat(itemType, isHot, consumptionType);

    return {
      headline: {
        label: "VAT rate",
        value: result.vatRate === 20 ? "20% (Standard rate)" : "0% (Zero rate)",
        tone: result.vatRate === 20 ? "warn" : "good",
      },
      rows: [
        { label: "Item type", value: String(v.itemType).replace(/-/g, " ") },
        { label: "Consumption", value: String(v.consumptionType) },
        { label: "VAT rate", value: `${result.vatRate}%`, strong: true },
        { label: "HMRC reference", value: result.vatNoticeRef },
      ],
      note: result.rationale,
    };
  },
  explainer: {
    heading: "Food and drink VAT rules explained (VAT Notice 709/1 and 701/14)",
    paragraphs: [
      "UK VAT on food and drink is not a simple rule: it depends on what the item is, whether it is hot or cold, and whether it is eaten on the premises or taken away. Getting it wrong is one of the most common VAT errors for hospitality businesses.",
      "All food and drink consumed on the premises (eat-in) is treated as a catering supply and is standard-rated at 20%. This applies whether the item is hot or cold, and whether you run a restaurant, a cafe, a pub or a hotel breakfast.",
      "For food sold to take away or delivered, the general rule is that cold food is zero-rated. But there are important exceptions. Hot food (heated above ambient temperature for consumption hot) is always standard-rated on takeaway. And certain product categories are excepted from zero-rating even when sold cold: confectionery, chocolates and sweets; crisps and savoury snacks; ice cream and frozen desserts; and most cold drinks (soft drinks, juices, carbonated drinks).",
      "Cold sandwiches, salads, cold pastries and most cold prepared foods sold for takeaway are zero-rated. A cold sausage roll is zero-rated; a hot one is standard-rated. A bag of crisps is always standard-rated. This is the logic HMRC sets out in VAT Notices 701/14 and 709/1.",
    ],
  },
  faqs: [
    {
      question: "Is VAT charged on takeaway food?",
      answer:
        "It depends on the food. Hot takeaway food (chips, hot pasties, cooked meals sold hot) is standard-rated at 20%. Cold food sold for takeaway is zero-rated unless it is an excepted item: confectionery, crisps, ice cream and cold soft drinks are always standard-rated even when cold. See VAT Notice 709/1.",
    },
    {
      question: "Is a hot drink from a cafe standard-rated?",
      answer:
        "Yes. Hot drinks (coffee, tea, hot chocolate) are standard-rated at 20% whether sold for takeaway or consumed in. Cold drinks are also standard-rated as an excepted item under VAT Notice 701/14.",
    },
    {
      question: "Are cold sandwiches zero-rated?",
      answer:
        "Yes, if sold for takeaway or delivery. A cold sandwich, wrap or salad is zero-rated. If the same item is sold for eating in, it becomes a catering supply and is standard-rated at 20%.",
    },
    {
      question: "What are excepted items for VAT?",
      answer:
        "Excepted items are food or drink categories that cannot be zero-rated. Under VAT Notice 701/14 these include confectionery (chocolate, sweets, cereal bars), crisps and savoury snacks, ice cream and frozen desserts, and most cold drinks (soft drinks, juices). They are always standard-rated at 20%.",
    },
    {
      question: "Is there VAT on alcohol?",
      answer:
        "Yes, always. Alcohol (beer, wine, spirits, alcopops, cider) is always standard-rated at 20%, whether sold for takeaway, delivery or for on-site consumption.",
    },
    {
      question: "Does delivery change the VAT rate?",
      answer:
        "Delivery follows the same rules as takeaway: hot food is standard-rated, cold non-excepted food is zero-rated, excepted items are standard-rated. A separate delivery charge is itself standard-rated if the underlying supply is standard-rated.",
    },
  ],
};
