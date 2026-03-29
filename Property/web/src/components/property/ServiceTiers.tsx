import Link from "next/link";

const tiers = [
  {
    name: "DIY",
    description: "Use our calculators and guides to handle your property tax yourself.",
    features: [
      "Section 24 tax calculator",
      "Incorporation cost calculator",
      "MTD compliance checker",
      "Portfolio profitability calculator",
      "Property tax guides and articles",
      "Self-service tools",
    ],
    cta: "Try calculators",
    ctaHref: "#calculators",
    featured: false,
  },
  {
    name: "Assisted",
    description: "You keep records, we review and file everything. Best of both worlds.",
    features: [
      "Everything in DIY, plus:",
      "Annual Self Assessment review",
      "Tax return preparation and filing",
      "Expense optimisation review",
      "MTD quarterly submissions",
      "Email support (48hr response)",
      "Annual tax planning call",
    ],
    cta: "Book consultation",
    ctaHref: "/contact",
    featured: true,
  },
  {
    name: "Done-for-you",
    description: "We handle everything. You focus on your properties, we handle the tax.",
    features: [
      "Everything in Assisted, plus:",
      "Full bookkeeping service",
      "Receipt capture and storage",
      "Monthly profitability reports",
      "Property-by-property tracking",
      "Priority support (24hr response)",
      "Quarterly tax planning calls",
      "Incorporation feasibility analysis",
    ],
    cta: "Get started",
    ctaHref: "/contact",
    featured: false,
  },
];

export function ServiceTiers() {
  return (
    <div className="grid gap-8 md:grid-cols-3 items-start">
      {tiers.map((tier) => (
        <div
          key={tier.name}
          className={`relative flex flex-col bg-white border-2 transition-all h-full ${
            tier.featured 
              ? "border-emerald-600 shadow-lg md:scale-105" 
              : "border-slate-200 hover:border-emerald-600 hover:shadow-md"
          }`}
        >
          {tier.featured && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <div className="bg-emerald-600 px-6 py-1.5 text-xs font-bold text-white uppercase tracking-wider whitespace-nowrap">
                Most Popular
              </div>
            </div>
          )}
          <div className={`p-8 flex flex-col h-full ${tier.featured ? "pt-10" : ""}`}>
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-slate-900">{tier.name}</div>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">{tier.description}</p>
            </div>
            <ul className="flex-1 space-y-3 mb-8">
              {tier.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                  <span className="text-emerald-600 font-bold flex-shrink-0 text-lg">✓</span>
                  <span className={feature.endsWith(":") ? "font-bold text-slate-900" : ""}>{feature}</span>
                </li>
              ))}
            </ul>
            <Link
              href={tier.ctaHref}
              className={`block w-full text-center px-8 py-4 text-base font-bold transition-all border-t-4 mt-auto ${
                tier.featured
                  ? "bg-emerald-600 border-emerald-800 text-white hover:bg-emerald-700 active:border-t-2 active:translate-y-0.5"
                  : "bg-slate-50 border-slate-300 text-slate-900 hover:bg-slate-100 hover:border-emerald-600 active:border-t-2 active:translate-y-0.5"
              }`}
            >
              {tier.cta}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
