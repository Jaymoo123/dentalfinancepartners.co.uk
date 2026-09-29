import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, siteContainerLg, sectionY } from "@/components/ui/layout-utils";
import { SlimHero } from "@accounting-network/web-shared/design/primitives/SlimHero";
import { NoticeCard } from "@accounting-network/web-shared/design/primitives/NoticeCard";
import BookingPicker from "@/components/forms/BookingPicker";

/**
 * Standalone booking page, linked from every nurture SMS/email as
 * /book?t=<signed lead token>. Nobody on our side attends a calendar: the lead
 * is telling us when a specialist should call, and the act of booking is the
 * contactability signal that promotes them for handoff.
 *
 * CHROME ONLY. Every sentence below is the pre-port copy, byte for byte. The
 * one string this package authored on this route is the SlimHero `eyebrow`,
 * "Your callback", which the primitive requires and which is a structural label
 * rather than a claim.
 *
 * ADOPTED: packages/web-shared/design/primitives/SlimHero.tsx. Its own docblock
 * scopes it to exactly these three token-gated post-submit pages, and it carries
 * the h1, so the hand-rolled centred h1 and standfirst retire into it.
 * ADOPTED: packages/web-shared/design/primitives/NoticeCard.tsx, which replaces
 * the local slate-tinted bordered card. `tone`
 * stays the default "slate": nobody has done anything wrong when a link is
 * missing. `ground="slate"` because the section under the hero is slate-50, and
 * a card must not share its section's ground or it has no edge.
 *
 * The hero is slate-900 and the kit footer is slate-900 too, so the page must
 * not end on the hero (kit §9, navy must never touch navy). It does not: the
 * body section below is the last band.
 *
 * ADOPTION DECLINED: packages/web-shared/design/marketing/StickyCTA.tsx and
 * every modal/banner (no interruptive surface on this site, owner ruling),
 * packages/web-shared/design/marketing/LeadCTAPanel.tsx (a second capture
 * surface on a token-gated page, owner-gated), and
 * packages/web-shared/design/marketing/WhatToExpectCard.tsx (its default props
 * publish a fee line no page here authored, T12).
 */

export const metadata: Metadata = {
  title: "Book your free review",
  description: "Pick a time for your free startup finance review call.",
  robots: { index: false, follow: false },
};

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ t?: string }>;
}) {
  const params = await searchParams;
  const token = (params.t ?? "").trim();

  return (
    <>
      <SlimHero eyebrow="Your callback" title="Book your free review call">
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
          Pick a day and a time window that suits you. A startup accountant will call you
          then, no obligation.
        </p>
      </SlimHero>

      <section className={`bg-slate-50 ${sectionY}`}>
        <div className={siteContainerLg}>
          <div className="mx-auto max-w-2xl">
            {token ? (
              <div className="rounded-xl bg-white p-6 ring-1 ring-slate-200/70 sm:p-8">
                <BookingPicker token={token} />
              </div>
            ) : (
              <NoticeCard ground="slate">
                <p className="text-base text-slate-700">
                  This page needs the personal link from your email or text message. If you cannot
                  find it, use the contact form and we will arrange your review.
                </p>
                <Link href="/contact" className={`${btnPrimary} mt-4 text-base`}>
                  Go to the contact form
                </Link>
              </NoticeCard>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
