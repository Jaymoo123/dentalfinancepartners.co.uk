import Link from "next/link";
import { Home } from "lucide-react";
import { focusRing } from "@/components/ui/layout-utils";

type BrandWordmarkHomeLinkProps = {
  className?: string;
  size?: "header" | "footer";
};

// The two halves of the visible wordmark. The accessible name is built from
// these so it always contains the text on screen — voice-control users say
// what they see (WCAG 2.5.3, Label in Name). Update these, not the label.
const WORDMARK_TOP = "Property";
const WORDMARK_BOTTOM = "Accountants UK";
const HOME_LABEL = `${WORDMARK_TOP} ${WORDMARK_BOTTOM}, home`;

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
      <Home
        aria-hidden
        strokeWidth={2.25}
        className={`logo-house shrink-0 text-emerald-600 ${isFooter ? "h-6 w-6" : "h-5 w-5 sm:h-6 sm:w-6"}`}
      />
      <span className="flex min-w-0 flex-col leading-none">
        <span
          className={`font-bold uppercase tracking-[0.18em] text-slate-900 sm:tracking-[0.2em] ${
            isFooter ? "text-xs sm:text-sm" : "text-[0.65rem] sm:text-xs"
          }`}
        >
          {WORDMARK_TOP}
        </span>
        <span
          aria-hidden
          className={`mt-0.5 h-0.5 w-full bg-emerald-600 ${isFooter ? "sm:mt-1" : ""}`}
        />
        <span
          className={`font-bold uppercase text-slate-900 ${
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
