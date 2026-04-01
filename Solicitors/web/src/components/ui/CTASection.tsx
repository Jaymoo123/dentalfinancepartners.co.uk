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
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--copper)]/50 to-transparent"
        aria-hidden
      />
      <h2
        id={headingId}
        className="display-serif max-w-2xl text-2xl font-semibold leading-tight tracking-tight text-[var(--ink)] sm:text-3xl"
      >
        {title}
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
        {description}
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link href={primaryHref} className={`${btnPrimary} w-full min-w-0 sm:w-auto`}>
          {primaryLabel}
        </Link>
        <Link href={secondaryHref} className={`${btnSecondary} w-full min-w-0 sm:w-auto`}>
          {secondaryLabel}
        </Link>
      </div>
    </section>
  );
}
