import Link from "next/link";
import { getTeamMember } from "@/app/team/[slug]/data";

/**
 * AuthorByline — reusable byline component for blog posts, pillar guides,
 * and any editorial page. Resolves the author slug against the team data
 * file and renders a monogram + name + role. Falls back to a plain name
 * for legacy posts whose frontmatter `author` is a free-text name.
 */

type Props = {
  /** Slug from /team/[slug], e.g. "james-whitfield" */
  authorSlug?: string;
  /** Free-text fallback if no slug */
  authorName?: string;
  /** ISO date string */
  publishedDate?: string;
  /** ISO date string */
  updatedDate?: string;
  /** Size variant */
  size?: "sm" | "md";
};

function MonogramSmall({
  initials,
  color,
  size = 32,
}: {
  initials: string;
  color: string;
  size?: number;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      role="img"
      aria-label={`${initials} monogram`}
      className="rounded-full flex-shrink-0"
    >
      <rect width="32" height="32" rx="16" fill={color} />
      <text
        x="50%"
        y="54%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="Inter, system-ui, sans-serif"
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
  authorSlug,
  authorName,
  publishedDate,
  updatedDate,
  size = "md",
}: Props) {
  const member = authorSlug ? getTeamMember(authorSlug) : null;
  const name = member?.name ?? authorName ?? "Editorial Team";
  const role = member?.role ?? "Editorial";
  const initials =
    member?.initials ??
    name
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  const color = member?.monogramColor ?? "#4f46e5";

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
      <MonogramSmall
        initials={initials}
        color={color}
        size={size === "sm" ? 32 : 40}
      />
      <div className="leading-tight">
        <p className="font-semibold text-slate-900">
          {member ? (
            <Link
              href={`/team/${member.slug}`}
              className="hover:text-indigo-600"
              rel="author"
            >
              {name}
            </Link>
          ) : (
            name
          )}
        </p>
        <p className="text-slate-600 text-xs">
          {role}
          {published && <> · Published {published}</>}
          {updated && updated !== published && <> · Updated {updated}</>}
        </p>
      </div>
    </div>
  );
}
