"use client";

/**
 * NextStepOffer -- personalised end-of-content card.
 *
 * Reads useIntent("next_step") and, when a behaviour-matched offer exists,
 * renders a card pointing the reader at their topic's calculator or a free
 * specialist review. Returns null (renders nothing) when there is no
 * personalised offer (no topic, or already converted).
 *
 * Place this BEFORE the existing lead form at the bottom of blog posts and
 * /for/[slug] pages -- it does not replace the lead form, it adds a
 * secondary nudge upstream of it.
 *
 * cfp_ prefix, petrol-cyan palette.
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
    <aside className="my-10 rounded-2xl border border-cyan-200 bg-cyan-50 p-6 sm:p-8">
      <p className="text-xs font-bold uppercase tracking-wider text-cyan-700">
        {offer.reason}
      </p>
      <h3 className="mt-2 text-xl font-bold text-neutral-900">{offer.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-neutral-700">{offer.blurb}</p>
      <Link
        href={offer.href}
        data-cta="next_step"
        data-cta-goal={offer.href.startsWith("/contact") ? "form" : undefined}
        onClick={() => trackPersonalization("clicked", action)}
        className="mt-5 inline-flex items-center justify-center rounded-lg bg-cyan-700 px-5 py-2.5 font-semibold text-white hover:bg-cyan-800"
      >
        {buttonLabel}
      </Link>
    </aside>
  );
}
