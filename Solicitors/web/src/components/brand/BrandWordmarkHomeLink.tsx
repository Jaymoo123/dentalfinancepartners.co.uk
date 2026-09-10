import Link from "next/link";
import { Scale } from "lucide-react";
import { focusRing } from "@/components/ui/layout-utils";

type BrandWordmarkHomeLinkProps = {
  className?: string;
  size?: "header" | "footer";
};

// The two halves of the visible wordmark. The accessible name is built from
// these so it always contains the text on screen - voice-control users say what
// they see (WCAG 2.5.3, Label in Name). Update these, not the label.
//
// Stored in title case and uppercased by CSS: the approved values render as
// "ACCOUNTS FOR LAWYERS" / "SPECIALIST ACCOUNTANTS", but a screen reader given
// a literal all-caps string reads it as an initialism.
export const WORDMARK_TOP = "Accounts for Lawyers";
export const WORDMARK_BOTTOM = "Specialist Accountants";
const HOME_LABEL = `${WORDMARK_TOP} ${WORDMARK_BOTTOM}, home`;

/**
 * Two-line stacked lockup: icon, tracked-out name, rule, descriptor.
 *
 * The site chrome does NOT render this component - the kit header and footer
 * build the same lockup themselves from `wordmarkIcon` / `wordmarkTop` /
 * `wordmarkBottom`, and this file is where those two strings and the icon come
 * from. It stays as the in-page lockup for non-chrome surfaces.
 *
 * Icon colour: `--brand-primary` on light (5.84:1, a graphic needs 3:1),
 * `rose-400` on dark (6.63:1). The brand hex measures 3.06:1 on slate-900, so
 * it must never carry the dark wordmark.
 *
 * `max-w-[13rem] sm:max-w-none` is the header contract's cap (DESIGN_SYSTEM
 * §7a): it is the ONE thing in the bar that changes width at `sm:`, which is
 * why no sibling may be introduced at that breakpoint.
 */
export function BrandWordmarkHomeLink({ className = "", size = "header" }: BrandWordmarkHomeLinkProps) {
  const isFooter = size === "footer";
  return (
    <Link
      href="/"
      aria-label={HOME_LABEL}
      title={HOME_LABEL}
      className={`group flex min-w-0 items-center gap-2 leading-none ${focusRing} rounded-xl px-1 py-0.5 ${
        isFooter ? "max-w-none" : "max-w-[13rem] sm:max-w-none"
      } ${className}`.trim()}
    >
      <Scale
        aria-hidden
        strokeWidth={2.25}
        className={`shrink-0 ${
          isFooter ? "h-6 w-6 text-rose-400" : "h-5 w-5 text-[var(--brand-primary)] sm:h-6 sm:w-6"
        }`}
      />
      <span className="flex min-w-0 flex-col leading-none">
        <span
          className={`font-bold uppercase tracking-[0.18em] sm:tracking-[0.2em] ${
            isFooter ? "text-xs text-white sm:text-sm" : "text-[0.65rem] text-slate-900 sm:text-xs"
          }`}
        >
          {WORDMARK_TOP}
        </span>
        <span
          aria-hidden
          className={`mt-0.5 h-0.5 w-full ${isFooter ? "bg-rose-400 sm:mt-1" : "bg-primary-600"}`}
        />
        <span
          className={`font-bold uppercase ${
            isFooter
              ? "pt-1.5 text-[0.65rem] tracking-[0.32em] text-white sm:pt-2 sm:text-xs sm:tracking-[0.38em]"
              : "pt-1 text-[0.6rem] tracking-[0.32em] text-slate-900 sm:text-[0.65rem] sm:tracking-[0.38em]"
          }`}
        >
          {WORDMARK_BOTTOM}
        </span>
      </span>
    </Link>
  );
}
