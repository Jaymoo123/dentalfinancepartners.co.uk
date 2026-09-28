import type { ServiceTier } from "@accounting-network/web-shared/components/ServiceTiers";
import type { StatItemConfig } from "@accounting-network/web-shared/components/StatsBar";

/**
 * Service tiers for divorce-finances. Real copy from
 * _staging/divorce-core-copy/service-tiers.md. No pricing anywhere: tiers
 * describe handoff routes, not products.
 */
export const serviceTiers: ServiceTier[] = [
  {
    name: "Free tools and guides",
    description:
      "For anyone, at any stage, including \"we have only just started talking about this\". Our calculators estimate the full cost of divorce by route, check whether you qualify for help with court fees, price a consent order, sketch a realistic settlement range and compare mediation against solicitors, all using the current HMCTS fee schedule with the working shown. Alongside them sit plain-English guides to settlements, pensions, the family home and the process itself, written from official sources and dated so you know they are current.",
    features: [
      "Divorce cost calculator with July 2026 court fees",
      "Help with Fees eligibility checker",
      "Consent order and settlement range tools",
      "Plain-English guides, dated and sourced",
      "Free for everyone, always, no sign-up",
    ],
    cta: "Use the free calculators",
    ctaHref: "/calculators",
  },
  {
    name: "Our accountants on your settlement",
    description:
      "For when the numbers need professional hands. You cannot agree, there is a business, a serious pension or property abroad, disclosure is being dodged, or you simply want it done properly and once. Tell us about your situation and one of our accountants takes the money side: the settlement numbers, the pension valuations and the tax that follows. Where you also need a solicitor or an accredited mediator, we introduce you to an SRA-regulated firm we work with, only with your consent. We may receive a fee from that firm, and you remain free to walk away at any stage.",
    features: [
      "One of our accountants on the money side",
      "An SRA-regulated solicitor or an FMC-accredited mediator introduced where you need one",
      "Shared only with your consent, fee arrangement disclosed plainly",
      "No obligation to proceed",
    ],
    cta: "Tell us about your situation",
    ctaHref: "/contact",
    featured: true,
  },
  {
    name: "Support through the whole process",
    description:
      "For divorces that unfold over months, not weeks. A financial settlement is rarely one conversation: there is disclosure, negotiation or mediation, the order itself, then implementation, pension sharing, remortgaging, the transfer of the house. We stay with the money side across the whole sequence rather than a single step, and where a question is really one for a regulated financial adviser, such as what to do with pension rights after a sharing order, we say so plainly and point you to the right kind of professional. The legal work itself sits with the solicitor or mediator we introduce you to.",
    features: [
      "Support from first disclosure through to implementation",
      "The right help at each stage, not one hammer for every nail",
      "Honest signposting when you need a regulated financial adviser instead",
      "You choose if and when to proceed",
    ],
    cta: "Talk to us",
    ctaHref: "/contact",
  },
];

/**
 * Stats for StatsBar. Reflects the live 5-tool calculator fleet.
 */
export const siteStats: StatItemConfig[] = [
  { icon: "🧮", value: "5", label: "Free divorce finance calculators" },
  { icon: "📋", value: "3", label: "Ways we can help" },
  { icon: "📖", value: "gov.uk, HMCTS", label: "Sources for every figure" },
  { icon: "📅", value: "13 Jul 2026", label: "Court fee changes already built in" },
];
