"use client";

/**
 * NextStepOffer -- personalised end-of-content card for Medical Accountants UK.
 *
 * Reads useIntent("next_step") and, when a behaviour-matched offer exists,
 * renders a card pointing the reader at their topic's calculator or a free
 * specialist review. Returns null when there is no personalised offer (no
 * topic, or already converted).
 *
 * Place this BEFORE the existing lead form at the bottom of blog posts.
 * Styled with navy/copper brand tokens.
 */
import Link from "next/link";
import { useIntent, trackPersonalization } from "./IntentProvider";

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
    <aside className="my-10 rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70 sm:p-8">
      <p className="text-xs font-bold uppercase tracking-wider text-[var(--copper-deep)]">
        {offer.reason}
      </p>
      <h3 className="mt-2 text-xl font-bold text-slate-900">{offer.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-700">{offer.blurb}</p>
      <Link
        href={offer.href}
        data-cta="next_step"
        data-cta-goal={offer.href.startsWith("/contact") ? "form" : undefined}
        onClick={() => trackPersonalization("clicked", action)}
        className="mt-5 inline-flex min-h-12 items-center justify-center rounded-xl bg-[var(--btn-ground)] px-5 py-2.5 font-semibold text-white transition-colors hover:bg-[var(--btn-ground-hover)]"
      >
        {buttonLabel}
      </Link>
    </aside>
  );
}
