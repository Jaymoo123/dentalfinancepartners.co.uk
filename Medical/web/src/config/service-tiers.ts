import type { ServiceTier } from "@accounting-network/web-shared/components/ServiceTiers";

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
      "Free to use, and the one ask is skippable",
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
/* `siteStats` retired 2026-09-11 (design port phase 5). It was a four-tile
   strip rendered on / and /services. Both consumers now derive their own
   counts at the call site, so this export had no consumer left, and a stats
   array that nothing renders is exactly the kind of thing that goes stale
   unnoticed: two of its four values already had (a "1 day / Response time"
   turnaround promise, banned estate-wide, and a "9+ Specialist guides" that
   counted blog subdirectories rather than the six guides). Recover it from
   git history if a strip is wanted again; derive the numbers, never retype
   them. */
