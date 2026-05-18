import Link from "next/link";
import { focusRing } from "./layout-utils";
import { buildBreadcrumbJsonLd } from "@/lib/schema";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  /** "light" inverts colours for dark backgrounds (e.g. crimson hero) */
  variant?: "default" | "light";
};

export function Breadcrumb({ items, variant = "default" }: BreadcrumbProps) {
  const jsonLd = buildBreadcrumbJsonLd(items);

  const linkClass =
    variant === "light"
      ? `text-white/70 hover:text-white transition-colors ${focusRing} rounded`
      : `hover:text-[var(--accent-strong)] transition-colors ${focusRing} rounded`;
  const lastClass =
    variant === "light" ? "font-medium text-white" : "font-medium text-[var(--ink-soft)]";
  const navClass =
    variant === "light"
      ? "flex flex-wrap items-center gap-2 text-sm text-white/70"
      : "flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]";
  const chevronClass =
    variant === "light"
      ? "h-4 w-4 flex-shrink-0 text-white/40"
      : "h-4 w-4 flex-shrink-0 text-[var(--border)]";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className={navClass}>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={index} className="flex items-center gap-2">
                {item.href && !isLast ? (
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                ) : (
                  <span className={isLast ? lastClass : ""}>{item.label}</span>
                )}
                {!isLast && (
                  <svg
                    className={chevronClass}
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
