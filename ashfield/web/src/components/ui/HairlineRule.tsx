export function HairlineRule({
  strong = false,
  className = "",
}: {
  strong?: boolean;
  className?: string;
}) {
  return <hr className={`${strong ? "rule-strong" : "rule"} ${className}`} aria-hidden="true" />;
}
