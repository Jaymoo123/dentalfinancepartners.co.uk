/**
 * Minimal inline trend sparkline (SVG line + faint area). Pure presentational,
 * server-renderable. Colour comes from the parent via `currentColor`, so wrap it
 * in a `text-emerald-600` (etc.) element. Stretches to the container width.
 */
export function Sparkline({
  values,
  height = 32,
  className,
}: {
  values: number[];
  height?: number;
  className?: string;
}) {
  if (!values || values.length === 0) {
    return <div className={className} style={{ height }} aria-hidden />;
  }
  const w = 100; // viewBox units; the SVG stretches to the container width
  const max = Math.max(1, ...values);
  const n = values.length;
  const step = n > 1 ? w / (n - 1) : w;
  const pts = values.map((v, i) => {
    const x = i * step;
    const y = height - (v / max) * (height - 2) - 1;
    return [x, y] as const;
  });
  const line = pts
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");
  const area = `${line} L${w},${height} L0,${height} Z`;
  return (
    <svg
      viewBox={`0 0 ${w} ${height}`}
      preserveAspectRatio="none"
      className={className}
      style={{ height, width: "100%" }}
      aria-hidden
    >
      <path d={area} fill="currentColor" fillOpacity={0.12} />
      <path
        d={line}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        vectorEffect="non-scaling-stroke"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
