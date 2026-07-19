import type { ServiceTier } from "@accounting-network/web-shared/components/ServiceTiers";
import type { StatItemConfig } from "@accounting-network/web-shared/components/StatsBar";

export const serviceTiers: ServiceTier[] = [
  {
    name: "Self-serve",
    description: "Free tools for doctors who want instant estimates before speaking to anyone.",
    features: [
      "10 free medical tax calculators:",
      "NHS pension annual allowance",
      "Locum doctor tax liability",
      "Private practice incorporation comparison",
      "Salaried doctor take-home pay",
      "GP partner drawings planner",
      "Consultant private vs NHS comparison",
      "No email gate or sign-up required",
    ],
    cta: "Open free calculators",
    ctaHref: "/calculators",
  },
  {
    name: "Assisted",
    description: "For GPs, locums, and consultants who want specialist advice on a specific area.",
    features: [
      "NHS pension and annual allowance planning",
      "Locum tax returns and self-assessment",
      "Medical expense claims review",
      "GP tax and practice accounts",
      "Consultant tax planning",
      "Responds within one working day",
    ],
    cta: "Get in touch",
    ctaHref: "/contact",
    featured: true,
  },
  {
    name: "Full service",
    description: "End-to-end medical accounting for practice owners and consultants with complex structures.",
    features: [
      "Everything in Assisted",
      "GP partnership accounts",
      "Private practice incorporation",
      "Mixed NHS and private income structuring",
      "Ongoing tax planning and advisory",
      "Dedicated medical accountant",
    ],
    cta: "Discuss your situation",
    ctaHref: "/contact",
  },
];

// ponytail: stats verified from codebase — see comments
export const siteStats: StatItemConfig[] = [
  {
    icon: "🧮",
    value: "10",
    // registry.ts exports 10 tools in the tools array
    label: "Free calculators",
  },
  {
    icon: "📋",
    value: "6",
    // services/page.tsx sections array has 6 items
    label: "Service areas",
  },
  {
    icon: "📖",
    value: "9+",
    // 9 subdirectories under src/app/blog
    label: "Specialist guides",
  },
  {
    icon: "📅",
    value: "1 day",
    // Claimed on homepage (page.tsx) and contact page: "We respond within one working day"
    label: "Response time",
  },
];
