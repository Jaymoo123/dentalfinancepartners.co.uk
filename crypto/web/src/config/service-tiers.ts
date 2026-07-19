import type { ServiceTier } from "@accounting-network/web-shared/components/ServiceTiers";

// ponytail: figures from docs/crypto/rates_ledger.json only; no invented numbers.

export const serviceTiers: ServiceTier[] = [
  {
    name: "CGT Filing",
    description:
      "Investors with straightforward buy, hold and disposal activity across one or two exchanges who need a clean CGT computation and Self Assessment filed on time.",
    features: [
      "s104 pool calculation and same-day/30-day bed-and-breakfast matching",
      "Annual CGT exempt amount applied (currently £3,000)",
      "Capital loss identification and carry-forward",
      "Self Assessment return prepared and filed",
      "CARF readiness check included",
      "Unlimited email support",
    ],
    cta: "Get in touch",
    ctaHref: "/contact",
    featured: false,
  },
  {
    name: "Full Position Review",
    description:
      "Active traders, DeFi participants and staking holders with multi-exchange or multi-wallet history, income receipts and the investor vs trader question to answer.",
    features: [
      "Everything in CGT Filing",
      "Cross-exchange and cross-wallet reconciliation (Koinly, CoinTracker, raw CSV)",
      "Staking, mining and airdrop income treatment under miscellaneous income rules",
      "DeFi disposal and liquidity-pool analysis",
      "Investor vs trader status opinion with written rationale",
      "NFT creator or trader income classification",
    ],
    cta: "Get in touch",
    ctaHref: "/contact",
    featured: true,
  },
  {
    name: "Disclosure and Advisory",
    description:
      "Anyone holding an HMRC nudge letter, with undisclosed gains across prior years, or requiring corporate crypto structuring and ongoing advisory.",
    features: [
      "Everything in Full Position Review",
      "HMRC Cryptoasset Nudge Letter response and voluntary disclosure",
      "Prior-year amendment or disclosure (up to 20 years for deliberate errors)",
      "Penalty mitigation strategy and written disclosure report",
      "Business and corporate crypto: CT treatment, readily-convertible-asset payroll",
      "Priority response commitment",
    ],
    cta: "Get in touch",
    ctaHref: "/contact",
    featured: false,
  },
];
