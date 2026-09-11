"use client";

import Link from "next/link";
import { useId } from "react";
import { btnPrimary, btnSecondary } from "@/components/ui/layout-utils";

type CTASectionProps = {
  title: string;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

/** Closing panel for the locations index, the city pages and /about.
 *
 *  Deliberately kept on a LIGHT ground (`--surface`). The ported footer is navy,
 *  and this component is the last element before it on every consumer, so a navy
 *  panel here would put navy against navy. On `--surface` the navy `btnPrimary`
 *  label measures 17.15 and is the correct primary; `btnGold` is the dark-ground
 *  recipe and must not be used here.
 *
 *  Gold appears only as the decorative rule: a graphic, never text. `--surface` is
 *  #ffffff here, where gold text measures 2.75 and gold-strong 3.76, so both are
 *  barred from carrying text on this panel (DESIGN_DELTA.md §2). */
export function CTASection({
  title,
  description,
  primaryHref = "/contact",
  primaryLabel = "Speak to a specialist",
  secondaryHref = "/services",
  secondaryLabel = "View services",
}: CTASectionProps) {
  const headingId = useId();

  return (
    <section
      className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-10"
      aria-labelledby={headingId}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[var(--gold)]"
        aria-hidden
      />
      <h2
        id={headingId}
        className="max-w-2xl text-2xl font-semibold leading-tight tracking-tight text-[var(--navy)] sm:text-3xl"
      >
        {title}
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--ink-soft)] sm:text-lg">
        {description}
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link href={primaryHref} className={`${btnPrimary} w-full min-w-0 sm:w-auto`} data-cta="cta-section-primary">
          {primaryLabel}
        </Link>
        <Link href={secondaryHref} className={`${btnSecondary} w-full min-w-0 sm:w-auto`}>
          {secondaryLabel}
        </Link>
      </div>
    </section>
  );
}
