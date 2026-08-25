import { GlassCard } from "./GlassCard";

// §5 count-up: final value is server-rendered; interactions.ts animates 0 -> final
// only when JS + motion allow. Pass the fully formatted value (en-GB, £/%, etc.).
export function GlassStat({
  value,
  label,
  caption,
  className = "",
}: {
  value: string;
  label: string;
  caption?: string;
  className?: string;
}) {
  return (
    <GlassCard className={`px-7 py-6 ${className}`}>
      <p className="type-stat text-ink" data-countup>
        {value}
      </p>
      <p className="type-eyebrow mt-3">{label}</p>
      {caption ? <p className="type-caption mt-1 !text-ink-70">{caption}</p> : null}
    </GlassCard>
  );
}
