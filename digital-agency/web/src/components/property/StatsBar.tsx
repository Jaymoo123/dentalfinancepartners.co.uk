export interface StatItemProps {
  icon: string;
  value: string;
  label: string;
}

export function StatItem({ icon, value, label }: StatItemProps) {
  return (
    <div className="stat-item">
      <div className="stat-item-icon text-2xl" aria-hidden="true">
        {icon}
      </div>
      <div className="stat-item-value">{value}</div>
      <div className="stat-item-label">{label}</div>
    </div>
  );
}

export function StatsBar() {
  return (
    <div className="stats-bar">
      <StatItem icon="💰" value="£18k+" label="Avg. Section 24 saving" />
      <StatItem icon="⚡" value="24hr" label="Response time" />
      <StatItem icon="📊" value="100+" label="Landlords served" />
      <StatItem icon="✓" value="60+" label="Topics covered" />
    </div>
  );
}
