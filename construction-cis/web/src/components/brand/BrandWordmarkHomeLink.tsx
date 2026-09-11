import Link from "next/link";
import { HardHat } from "lucide-react";
import { focusRing } from "@/components/ui/layout-utils";

type BrandWordmarkHomeLinkProps = {
  className?: string;
  size?: "header" | "footer";
  /** "navy" swaps the lockup for a dark ground (footer, navy bands). */
  tone?: "light" | "navy";
};

// The two halves of the visible wordmark. The accessible name is built from these
// so it always contains the text on screen: voice-control users say what they see
// (WCAG 2.5.3, Label in Name). Update these, not the label. The old label used
// siteConfig.tagline, which stopped matching the visible text once line 2 became
// the descriptor.
const WORDMARK_TOP = "TRADE TAX SPECIALISTS";
const WORDMARK_BOTTOM = "CIS ACCOUNTANTS";
const HOME_LABEL = `${WORDMARK_TOP} ${WORDMARK_BOTTOM}, home`;

export function BrandWordmarkHomeLink({
  className = "",
  size = "header",
  tone = "light",
}: BrandWordmarkHomeLinkProps) {
  const isFooter = size === "footer";
  const onNavy = tone === "navy";
  // The wordmark text is never orange. Only the icon and the rule carry the brand,
  // at primary-600 on light (3.56, graphics floor) and primary-300 on navy (8.67).
  const brand = onNavy ? "text-primary-300" : "text-primary-600";
  const rule = onNavy ? "bg-primary-300" : "bg-primary-600";
  const ink = onNavy ? "text-white" : "text-neutral-900";

  return (
    <Link
      href="/"
      aria-label={HOME_LABEL}
      title={HOME_LABEL}
      className={`group flex min-w-0 items-center gap-2 leading-none ${focusRing} rounded-xl px-1 py-0.5 ${
        isFooter ? "max-w-none" : "max-w-[13rem] sm:max-w-none"
      } ${className}`.trim()}
    >
      <HardHat
        aria-hidden
        strokeWidth={2.25}
        className={`shrink-0 ${brand} ${isFooter ? "h-6 w-6" : "h-5 w-5 sm:h-6 sm:w-6"}`}
      />
      <span className="flex min-w-0 flex-col leading-none">
        <span
          className={`font-bold uppercase tracking-[0.18em] sm:tracking-[0.2em] ${ink} ${
            isFooter ? "text-xs sm:text-sm" : "text-[0.65rem] sm:text-xs"
          }`}
        >
          {WORDMARK_TOP}
        </span>
        <span aria-hidden className={`mt-0.5 h-0.5 w-full ${rule} ${isFooter ? "sm:mt-1" : ""}`} />
        <span
          className={`font-bold uppercase ${ink} ${
            isFooter
              ? "pt-1.5 text-[0.65rem] tracking-[0.32em] sm:pt-2 sm:text-xs sm:tracking-[0.38em]"
              : "pt-1 text-[0.6rem] tracking-[0.32em] sm:text-[0.65rem] sm:tracking-[0.38em]"
          }`}
        >
          {WORDMARK_BOTTOM}
        </span>
      </span>
    </Link>
  );
}
