"use client";

/**
 * NextStepOffer -- personalised end-of-content card.
 *
 * Reads useIntent("next_step") and, when a behaviour-matched offer exists,
 * renders a card pointing the reader at their topic's calculator or a review.
 * Returns null when there is no personalised offer (no topic, or the visitor
 * has already converted).
 *
 * MOUNTED NOWHERE BY W7. Its two mount points live in files W7 does not own,
 * so they are handed to M1 with exact targets in docs/pharmacies/_port/W7_RECEIPT.md:
 *   app/blog/[category]/[slug]/page.tsx:319  (W2's file)
 *   app/services/[slug]/page.tsx:248         (W3's file)
 *   app/for/[slug]/page.tsx:152              (W3's file)
 * It goes BEFORE the closing lead form: it does not replace the form, it adds a
 * secondary nudge upstream of it.
 */
import Link from "next/link";
import { useIntent, trackPersonalization } from "@accounting-network/web-shared/support/IntentProvider";
import { btnPrimary } from "@/components/ui/layout-utils";
import { ruleLabel } from "@/lib/intent/labels";

export function NextStepOffer() {
  const action = useIntent("next_step");
  if (!action) return null;

  const offer = action.offer;
  const buttonLabel =
    offer.kind === "tool"
      ? "Open the calculator"
      : offer.kind === "guide"
        ? "Get the free guide"
        : "Speak to a pharmacy accountant";

  return (
    <aside className="my-10 rounded-xl border border-primary-200 bg-primary-50 p-6 sm:p-8">
      <p className="text-xs font-bold uppercase tracking-wider text-primary-800">{offer.reason}</p>
      <h3 className="mt-2 text-xl font-bold text-slate-900">{offer.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-700">{offer.blurb}</p>
      <Link
        href={offer.href}
        data-cta="next_step"
        data-cta-placement="next_step"
        data-cta-goal={offer.href.startsWith("/contact") ? "form" : undefined}
        onClick={() => trackPersonalization("clicked", action, ruleLabel)}
        className={`${btnPrimary} mt-5`}
      >
        {buttonLabel}
      </Link>
    </aside>
  );
}
