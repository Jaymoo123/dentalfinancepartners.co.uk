interface ROICardProps {
  value: string;
  label: string;
  context: string;
  trend?: "increasing" | "decreasing" | "new";
}

function ROICard({ value, label, context, trend }: ROICardProps) {
  return (
    <div className="roi-card">
      {trend && (
        <div className="mb-3">
          {trend === "increasing" && (
            <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">
              <span aria-hidden>↗</span> Rising
            </span>
          )}
          {trend === "new" && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700">
              <span aria-hidden>⚠</span> New 2026
            </span>
          )}
        </div>
      )}
      <div className="roi-card-value">{value}</div>
      <div className="roi-card-label">{label}</div>
      <div className="roi-card-context">{context}</div>
    </div>
  );
}

export function ROIMetrics() {
  return (
    <div className="roi-showcase">
      <ROICard
        value="£1,800"
        label="Avg. Section 24 cost"
        context="For £50k rental income, £20k mortgage interest at 40% tax rate"
        trend="increasing"
      />
      <ROICard
        value="5-7 years"
        label="Incorporation break-even"
        context="Typical timeline to recover CGT and SDLT costs through tax savings"
      />
      <ROICard
        value="£400/qtr"
        label="MTD penalty risk"
        context="Maximum penalty per quarter if you miss the April 2026 deadline"
        trend="new"
      />
    </div>
  );
}
