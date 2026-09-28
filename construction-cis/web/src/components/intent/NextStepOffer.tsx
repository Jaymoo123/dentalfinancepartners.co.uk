"use client";

/**
 * NextStepOffer -- personalised end-of-content card.
 *
 * Reads useIntent("next_step") and, when a behaviour-matched offer exists,
 * renders a card pointing the reader at their topic's calculator or a free
 * specialist review. Returns null (renders nothing) when there is no
 * personalised offer (control arm, no topic, or already converted).
 *
 * Place this BEFORE the existing lead form at the bottom of blog posts and
 * /for/[slug] pages -- it does not replace the lead form, it adds a
 * secondary nudge upstream of it.
 */
import Link from "next/link";
import { useIntent, trackPersonalization } from "./IntentProvider";
import { btnPrimary } from "@/components/ui/layout-utils";

export function NextStepOffer() {
  const action = useIntent("next_step");
  if (!action) return null;

  const offer = action.offer;
  const buttonLabel =
    offer.kind === "tool"
      ? "Open the calculator"
      : offer.kind === "guide"
        ? "Get the free guide"
        : "Talk to a specialist";

  return (
    <aside className="my-10 rounded-xl border border-primary-200 bg-primary-50 p-6 sm:p-8">
      <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent-strong)]">
        {offer.reason}
      </p>
      <h3 className="mt-2 text-xl font-bold text-[var(--ink)]">{offer.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{offer.blurb}</p>
      <Link
        href={offer.href}
        data-cta="next_step"
        data-cta-goal={offer.href.startsWith("/contact") ? "form" : undefined}
        onClick={() => trackPersonalization("clicked", action)}
        className={`${btnPrimary} mt-5`}
      >
        {buttonLabel}
      </Link>
    </aside>
  );
}
