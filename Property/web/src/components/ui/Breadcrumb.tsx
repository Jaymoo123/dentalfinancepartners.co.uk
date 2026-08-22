import Link from "next/link";
import { focusRing } from "./layout-utils";
import { buildBreadcrumbJsonLd } from "@/lib/schema";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  /** Light text palette for use over dark hero backgrounds. */
  onDark?: boolean;
};

export function Breadcrumb({ items, onDark = false }: BreadcrumbProps) {
  const jsonLd = buildBreadcrumbJsonLd(items);

  const listColor = onDark ? "text-slate-300" : "text-slate-600";
  const linkHover = onDark ? "hover:text-white" : "hover:text-emerald-700";
  const currentColor = onDark ? "font-semibold text-white" : "font-semibold text-slate-900";
  const chevronColor = onDark ? "text-slate-400" : "text-slate-400";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className={`flex flex-wrap items-center gap-2 text-sm ${listColor}`}>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={index} className="flex items-center gap-2">
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    // py-0.5 takes the hit area from 20px to 24px (WCAG 2.5.8).
                    // The list is `items-center`, so the extra padding does not
                    // shift the trail's baseline against the chevrons.
                    className={`${linkHover} inline-block py-0.5 transition-colors ${focusRing} rounded`}
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
                    className={`h-4 w-4 flex-shrink-0 ${chevronColor}`}
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
