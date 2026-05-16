import Link from "next/link";
import { focusRing } from "./layout-utils";
import { buildBreadcrumbJsonLd } from "@/lib/schema";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  /** "dark" (default) for light backgrounds, "light" for dark hero backgrounds */
  variant?: "dark" | "light";
};

export function Breadcrumb({ items, variant = "dark" }: BreadcrumbProps) {
  const jsonLd = buildBreadcrumbJsonLd(items);
  const isLight = variant === "light";

  const baseColor = isLight ? "text-slate-200" : "text-slate-600";
  const currentColor = isLight ? "font-semibold text-white" : "font-semibold text-slate-900";
  const linkHover = isLight ? "hover:text-white" : "hover:text-indigo-700";
  const arrowColor = isLight ? "text-slate-300" : "text-slate-400";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className={`flex flex-wrap items-center gap-2 text-sm ${baseColor}`}>
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
                  <span className={isLast ? currentColor : ""}>
                    {item.label}
                  </span>
                )}
                {!isLast && (
                  <svg
                    className={`h-4 w-4 flex-shrink-0 ${arrowColor}`}
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
