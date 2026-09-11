import type { CSSProperties } from "react";

/**
 * Brand mark for the Dental Finance Partners wordmark lockup.
 *
 * PLACEHOLDER pending owner sign-off at the phase-2 walk (added 2026-09-11).
 * A simple geometric tooth outline, not a clinical illustration. One file to
 * change if the owner picks something else.
 *
 * Local inline SVG on purpose: the icon library the sibling sites use is NOT a declared dependency of
 * this site and resolves only by sibling hoisting, the shape that made the
 * estate undeployable for nine days (playbook T24). Do not import it here.
 *
 * Satisfies the kit's `WordmarkIcon` structural type
 * (packages/web-shared/design/chrome/SiteHeader.tsx). `stroke="currentColor"`
 * so `text-primary-600` / `text-primary-400` colour it the way the sibling
 * sites colour theirs.
 */
export function DentalMark({
  className,
  strokeWidth = 2,
  style,
  "aria-hidden": ariaHidden,
}: {
  className?: string;
  strokeWidth?: number;
  "aria-hidden"?: boolean;
  style?: CSSProperties;
}) {
  return (
    <svg
      className={className}
      style={style}
      aria-hidden={ariaHidden}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 5.5C10.4 4 8.6 3.4 7 4c-1.8.7-2.8 2.6-2.6 4.9.2 2 .8 3.4 1.3 5.3.4 1.6.6 3.2 1 4.8.3 1.2 1.6 1.5 2.2.5.7-1.2.9-2.7 1.3-4.1.3-1 .7-1.6 1.8-1.6s1.5.6 1.8 1.6c.4 1.4.6 2.9 1.3 4.1.6 1 1.9.7 2.2-.5.4-1.6.6-3.2 1-4.8.5-1.9 1.1-3.3 1.3-5.3C20.8 6.6 19.8 4.7 18 4c-1.6-.6-3.4 0-5 1.5Z" />
    </svg>
  );
}

export default DentalMark;
