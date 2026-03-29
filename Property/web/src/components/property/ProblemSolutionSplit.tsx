export function ProblemSolutionSplit() {
  return (
    <div className="split-section">
      <div className="split-section-problem">
        <h3 className="mb-4 text-xl font-bold text-red-900">The Problem</h3>
        <ul className="space-y-3 text-sm leading-relaxed text-red-800">
          <li className="flex gap-2">
            <span className="mt-0.5 flex-shrink-0 text-red-600" aria-hidden>✗</span>
            <span>
              <strong>Section 24</strong> is costing higher-rate taxpayers thousands per year in lost mortgage interest relief
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-0.5 flex-shrink-0 text-red-600" aria-hidden>✗</span>
            <span>
              <strong>MTD is mandatory</strong> from April 2026 but most landlords do not know if they are affected or how to prepare
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-0.5 flex-shrink-0 text-red-600" aria-hidden>✗</span>
            <span>
              <strong>Incorporation decisions</strong> are made without proper modeling of CGT and SDLT upfront costs
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-0.5 flex-shrink-0 text-red-600" aria-hidden>✗</span>
            <span>
              <strong>No portfolio visibility</strong> — which properties are actually profitable after all costs?
            </span>
          </li>
        </ul>
      </div>

      <div className="split-section-solution">
        <h3 className="mb-4 text-xl font-bold text-emerald-900">The Solution</h3>
        <ul className="space-y-3 text-sm leading-relaxed text-emerald-800">
          <li className="flex gap-2">
            <span className="mt-0.5 flex-shrink-0 text-emerald-600" aria-hidden>✓</span>
            <span>
              <strong>Section 24 modeling</strong> with incorporation feasibility analysis showing upfront costs vs. long-term savings
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-0.5 flex-shrink-0 text-emerald-600" aria-hidden>✓</span>
            <span>
              <strong>MTD preparation</strong> before the deadline with software setup and quarterly reporting support
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-0.5 flex-shrink-0 text-emerald-600" aria-hidden>✓</span>
            <span>
              <strong>Data-driven decisions</strong> backed by proper financial modeling, not generic advice
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-0.5 flex-shrink-0 text-emerald-600" aria-hidden>✓</span>
            <span>
              <strong>Portfolio reporting</strong> showing property-level profitability, yield analysis, and cash flow
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
