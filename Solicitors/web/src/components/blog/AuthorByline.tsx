import Link from "next/link";

/**
 * AuthorByline for Accounts for Lawyers blog posts. Dependency-free: the site
 * has no /team/[slug] pages and posts are authored by the editorial team, so
 * this renders a brand monogram + the team name + published/updated dates and
 * links to /about. No fabricated named author or technical reviewer.
 */

type Props = {
  authorName?: string;
  publishedDate?: string;
  updatedDate?: string;
  size?: "sm" | "md";
};

const STOPWORDS = new Set(["for", "the", "of", "and", "a", "an"]);

function initialsFrom(name: string): string {
  const letters = name
    .split(/\s+/)
    .filter((w) => w && !STOPWORDS.has(w.toLowerCase()))
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return letters || "AL";
}

function Monogram({ initials, size = 40 }: { initials: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      role="img"
      aria-label={`${initials} monogram`}
      className="rounded-full flex-shrink-0"
    >
      <rect width="32" height="32" rx="16" fill="var(--primary)" />
      <text
        x="50%"
        y="54%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="system-ui, sans-serif"
        fontSize="13"
        fontWeight="700"
        fill="#ffffff"
      >
        {initials}
      </text>
    </svg>
  );
}

function formatDate(iso?: string): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function AuthorByline({
  authorName,
  publishedDate,
  updatedDate,
  size = "md",
}: Props) {
  const name = authorName?.trim() || "Accounts for Lawyers Editorial Team";
  const initials = initialsFrom(name);
  const published = formatDate(publishedDate);
  const updated = formatDate(updatedDate);

  return (
    <div
      className={
        size === "sm"
          ? "flex items-center gap-3 text-sm"
          : "flex items-center gap-4 text-base"
      }
    >
      <Monogram initials={initials} size={size === "sm" ? 32 : 40} />
      <div className="leading-tight">
        <p className="font-medium text-[var(--ink)]">
          Written by{" "}
          <Link href="/about" className="hover:text-[var(--primary)]" rel="author">
            {name}
          </Link>
        </p>
        <p className="text-[var(--muted)] text-xs">
          Specialist accountants for UK solicitors and law firms
          {published && <> · Published {published}</>}
          {updated && updated !== published && <> · Updated {updated}</>}
        </p>
      </div>
    </div>
  );
}
