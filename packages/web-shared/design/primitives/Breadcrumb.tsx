import Link from "next/link";
import { focusRing } from "../layout-utils";
import { buildBreadcrumb } from "../../schema/breadcrumb";
import { serialize } from "../../schema/serialize";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  /**
   * Absolute site origin, e.g. "https://example.co.uk". Per-site, and the only
   * reason this component cannot be brand-agnostic on its own: the BreadcrumbList
   * JSON-LD has to carry absolute URLs.
   */
  siteUrl: string;
  /** Light text palette for use over dark hero backgrounds. */
  onDark?: boolean;
};

export function Breadcrumb({ items, siteUrl, onDark = false }: BreadcrumbProps) {
  // serialize() rather than a bare JSON.stringify: it escapes `</` so a closing
  // </script> inside a crumb label cannot terminate the surrounding script tag.
  const jsonLd = serialize(buildBreadcrumb(items, { siteUrl }));

  const listColor = onDark ? "text-slate-300" : "text-slate-600";
  const linkHover = onDark ? "hover:text-white" : "hover:text-primary-700";
  const currentColor = onDark ? "font-semibold text-white" : "font-semibold text-slate-900";
  // CONTEXT.md Rule Zero (c), the standing accessibility floor: slate-400 is
  // correct on navy and stays, but on a light ground it measures 2.52:1 in
  // Edge against the cream hero surface, so the light branch is slate-500 at
  // 4.76:1. Both branches read slate-400 before this, which made the ternary a
  // no-op and is why the light case was never caught.
  const chevronColor = onDark ? "text-slate-400" : "text-slate-500";

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
