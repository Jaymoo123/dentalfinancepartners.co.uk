import type { ServiceTier } from "@accounting-network/web-shared/components/ServiceTiers";
import type { StatItemConfig } from "@accounting-network/web-shared/components/StatsBar";

// Tiers grounded in the 6 services on /services: IR35 review, Ltd accounts,
// salary/dividend, expenses, pension, self-assessment.
export const serviceTiers: ServiceTier[] = [
  {
    name: "DIY",
    description: "Use our free tools to understand your position before you speak to anyone.",
    features: [
      "10 free contractor calculators:",
      "IR35 take-home (outside and inside)",
      "Umbrella vs limited comparison",
      "Dividend and corporation tax",
      "Optimal salary and dividend split",
      "IR35 status indicator",
      "Day rate to take-home",
      "Guides covering IR35, expenses, pension and more",
    ],
    cta: "Open calculators",
    ctaHref: "/calculators",
  },
  {
    name: "Assisted",
    description: "A free discovery call to review your IR35 position and structure, with no obligation.",
    features: [
      "IR35 status review (contract and working practices)",
      "Umbrella vs limited company comparison for your day rate",
      "Salary and dividend planning overview",
      "Contractor expenses and allowances check",
      "Plain English, no jargon, no hard sell",
    ],
    cta: "Book a free call",
    ctaHref: "/contact",
    featured: true,
  },
  {
    name: "Done for you",
    description: "Full ongoing accountancy for contractors and PSC directors. Fixed monthly fee, quoted after a call.",
    features: [
      "Annual limited company accounts and CT600",
      "Corporation tax return and Companies House filing",
      "Self assessment return (director)",
      "Optimised salary and dividend plan each tax year",
      "PSC employer pension contributions built into planning",
      "Contractor expenses review and claims support",
      "Fixed monthly fee, no surprises",
    ],
    cta: "Get a quote",
    ctaHref: "/contact",
  },
];

// Stats verifiable from the codebase:
// - 10 calculators: registry.ts imports 10 GenericTool entries (0 bespoke)
// - 58 guides: 58 .md files under contractors-ir35/web/content/blog/
// - 6 services: services page defines 6 service cards
// - 24h response: stated in page.tsx keyStats + contact section
export const siteStats: StatItemConfig[] = [
  { icon: "🧮", value: "10", label: "Free calculators" },
  { icon: "📄", value: "58", label: "Contractor guides" },
  { icon: "⚙️", value: "6", label: "Core services covered" },
  { icon: "⏱️", value: "24h", label: "Response guarantee" },
];
