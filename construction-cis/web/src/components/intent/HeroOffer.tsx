"use client";

/**
 * HeroOffer -- personalised CTA slot for the homepage hero section.
 *
 * Reads useIntent("hero_cta") and, when a behaviour-matched offer exists
 * (treatment arm, topic-derived), renders a personalized CTA replacing the
 * generic hero button. Control arm (or no topic) returns null so the static
 * hero CTA in page.tsx shows through unchanged.
 *
 * Usage in page.tsx: replace the static primary hero CTA with:
 *   <HeroOffer fallback={<Link href="/cis-refund" ...>Check your CIS refund</Link>} />
 */
import Link from "next/link";
import { useIntent, trackPersonalization } from "./IntentProvider";
import { btnPrimary } from "@/components/ui/layout-utils";

interface HeroOfferProps {
  /** The static CTA rendered when there is no personalised offer (control arm or no topic). */
  fallback: React.ReactNode;
}

export function HeroOffer({ fallback }: HeroOfferProps) {
  const action = useIntent("hero_cta");

  if (!action) return <>{fallback}</>;

  const offer = action.offer;

  return (
    <Link
      href={offer.href}
      data-cta="hero_cta"
      data-cta-goal={offer.href.startsWith("/contact") ? "form" : undefined}
      onClick={() => trackPersonalization("clicked", action)}
      className={`${btnPrimary} text-base sm:text-lg px-6 py-3 sm:px-10 sm:py-4 text-center`}
    >
      {offer.title}
    </Link>
  );
}
