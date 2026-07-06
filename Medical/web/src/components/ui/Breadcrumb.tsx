import Link from "next/link";
import { focusRing } from "./layout-utils";
import { buildBreadcrumbJsonLd } from "@/lib/schema";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  /**
   * "default" (light background, dark text) or "light" (dark background,
   * light text). Use "light" when the breadcrumb sits inside a dark hero
   * section (e.g. the navy calculator hero).
   */
  variant?: "default" | "light";
  /**
   * When true, the component does not emit its own BreadcrumbList JSON-LD
   * script tag. Use this on pages that already include a BreadcrumbList
   * inside a @graph block to avoid emitting two BreadcrumbList blocks on
   * the same page.
   */
  suppressJsonLd?: boolean;
};

export function Breadcrumb({ items, variant = "default", suppressJsonLd = false }: BreadcrumbProps) {
  const jsonLd = suppressJsonLd ? null : buildBreadcrumbJsonLd(items);

  const olColour =
    variant === "light" ? "text-white/70" : "text-[var(--muted)]";
  const linkHover =
    variant === "light"
      ? "hover:text-[var(--copper)]"
      : "hover:text-[var(--accent-strong)]";
  const lastColour =
    variant === "light"
      ? "font-medium text-white"
      : "font-medium text-[var(--ink-soft)]";
  const chevColour =
    variant === "light" ? "text-white/40" : "text-[var(--border)]";

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      )}
      <nav aria-label="Breadcrumb" className="mb-6">
      <ol className={`flex flex-wrap items-center gap-2 text-sm ${olColour}`}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={`${linkHover} transition-colors ${focusRing} rounded`}
                >
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? lastColour : ""}>
                  {item.label}
                </span>
              )}
              {!isLast && (
                <svg
                  className={`h-4 w-4 flex-shrink-0 ${chevColour}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
    </>
  );
}
