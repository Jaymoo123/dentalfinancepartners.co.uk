// §2: eyebrow (real small-caps + 24px hairline) above a serif heading. Sentence case only.
export function SectionHeading({
  eyebrow,
  children,
  as: Tag = "h2",
  className = "",
}: {
  eyebrow?: string;
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const typeClass = Tag === "h1" ? "type-h1" : Tag === "h3" ? "type-h3" : "type-h2";
  return (
    <div className={className}>
      {eyebrow ? (
        <p className="type-eyebrow mb-4 flex items-center gap-3">
          <span className="rule w-6 shrink-0" aria-hidden="true" />
          {eyebrow}
        </p>
      ) : null}
      <Tag className={typeClass}>{children}</Tag>
    </div>
  );
}
