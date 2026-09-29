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
  /**
   * Named colour recipe. Additive, 2026-09-29. Default `undefined` keeps the
   * `onDark` boolean in sole charge, so every existing caller renders
   * byte-identically (playbook 8, kit-prop rule).
   *
   * - `"default"` = the light-ground trail, identical to `onDark={false}`.
   * - `"onDark"`  = the slate-900 navy trail, identical to `onDark`.
   * - `"onBrand"` = white links, white/80 separator, white current crumb. For a
   *   MID-TONE brand hero ground (startups-tech `bg-primary-600`, ecommerce's
   *   amber band) where the `onDark` slate steps, written for navy, fall under
   *   the 4.5 text floor and the 3.0 graphic floor. Class recipe only: the
   *   site's brand hex never enters the kit.
   *
   * When both are passed, `tone` wins.
   */
  tone?: BreadcrumbTone;
};

export type BreadcrumbTone = "default" | "onDark" | "onBrand";

/**
 * Tone -> class recipe. `link` is the resting link colour (empty on the two
 * legacy tones, which inherit the `<ol>` colour exactly as they did before this
 * table existed); `list`, `hover`, `current` and `chevron` are the four strings
 * the component has always built inline.
 */
const TONES: Record<BreadcrumbTone, {
  list: string;
  link: string;
  hover: string;
  current: string;
  chevron: string;
}> = {
  default: {
    list: "text-slate-600",
    link: "",
    hover: "hover:text-primary-700",
    current: "font-semibold text-slate-900",
    chevron: "text-slate-500",
  },
  onDark: {
    list: "text-slate-300",
    link: "",
    hover: "hover:text-white",
    current: "font-semibold text-white",
    chevron: "text-slate-400",
  },
  onBrand: {
    // Measured on startups-tech `#4f46e5` (the darker of the two brand grounds
    // this serves): white 6.29 (text PASS), white/80 composited 4.63 (text
    // PASS), and the separator at white/80 clears the 3.0 graphic floor with
    // room. The `onDark` steps measure 4.23 and 2.39 on the same ground, which
    // is why 20 call sites across ecommerce and startups-tech were each
    // carrying a `crumbOnBrand` arbitrary-variant string before this tone.
    list: "text-white/80",
    link: "text-white",
    hover: "hover:text-white",
    current: "font-semibold text-white",
    chevron: "text-white/80",
  },
};

export function Breadcrumb({ items, siteUrl, onDark = false, tone }: BreadcrumbProps) {
  // serialize() rather than a bare JSON.stringify: it escapes `</` so a closing
  // </script> inside a crumb label cannot terminate the surrounding script tag.
  const jsonLd = serialize(buildBreadcrumb(items, { siteUrl }));

  // `tone` wins when passed; otherwise the boolean picks the same two legacy
  // rows, so an existing caller emits the identical class strings.
  const recipe = TONES[tone ?? (onDark ? "onDark" : "default")];
  const listColor = recipe.list;
  const linkColor = recipe.link;
  const linkHover = recipe.hover;
  const currentColor = recipe.current;
  // CONTEXT.md Rule Zero (c), the standing accessibility floor: slate-400 is
  // correct on navy and stays, but on a light ground it measures 2.52:1 in
  // Edge against the cream hero surface, so the light branch is slate-500 at
  // 4.76:1. Both branches read slate-400 before this, which made the ternary a
  // no-op and is why the light case was never caught.
  const chevronColor = recipe.chevron;

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
                    // `linkColor` is an empty string on both legacy tones, so the
                    // rendered class attribute is character-for-character what it
                    // was before the tone table (no stray double space: the
                    // template keeps a single separator either side).
                    className={`${linkColor} ${linkHover} inline-block py-0.5 transition-colors ${focusRing} rounded`.trim()}
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
