import type { Metadata } from "next";
import Link from "next/link";
import { SlimHero } from "@accounting-network/web-shared/design/primitives/SlimHero";
import { NoticeCard } from "@accounting-network/web-shared/design/primitives/NoticeCard";
import { btnPrimary, siteContainerLg, sectionY } from "@/components/ui/layout-utils";
import BookingPicker from "@/components/forms/BookingPicker";
import PharmaciesBackdrop from "@/components/layout/PharmaciesBackdrop";
import { siteConfig } from "@/config/site";

/**
 * Standalone booking page, linked from every nurture SMS/email as
 * /book?t=<signed lead token>. Nobody on our side attends a calendar: the lead
 * is telling us when a pharmacy finance specialist should call, and the act of booking is
 * the contactability signal that promotes them for handoff.
 *
 * CHROME ONLY. The h1 and the standfirst are the pre-port strings, byte for
 * byte, moved into SlimHero's `title` and `children`. The "needs the personal
 * link" sentence is unchanged. The one string authored on this route is the
 * two-word `eyebrow` the primitive requires; it matches ecommerce's own /book
 * mount and is handed to the manager in the receipt as a candidate
 * niche.config.json key.
 *
 * ADOPTED: packages/web-shared/design/primitives/SlimHero.tsx. Its docblock
 * (:5-13) names /thank-you, /book and /complete as the three pages it exists
 * for: no breadcrumb (this route is noindex, so a trail would be fiction) and
 * no CTA row (the page has exactly one job below). HOST CONTRACT: the
 * component writes `relative overflow-hidden` on its own section and
 * `relative z-10` on its own container (:50,52), so the contract binds its
 * `backdrop` slot, not this call site.
 * ADOPTED: packages/web-shared/design/primitives/NoticeCard.tsx. Its docblock
 * (:5-8) names this exact card: there were eight near-copies of the "needs the
 * personal link" panel across /book, /complete, BookingPicker and DetailsForm,
 * and they had started to drift. `tone="slate"` because a missing link is a
 * neutral dead end nobody got wrong (:11-14), and the default `ground="white"`
 * because the section below is `bg-white`.
 *
 * ADOPTION DECLINED: packages/web-shared/design/marketing/WhatToExpectCard.tsx.
 * `items` must always be passed, because the defaults publish a fee line this
 * site never promises (:22-27). This route publishes no such list: its only
 * two sentences are already the h1's standfirst, and the four items would have
 * to be written here ("Instant text and email from us", "Initial call to
 * understand your situation", and two more). Authored copy, which the owner
 * ruling forbids. The sentences this route DOES publish about the call itself
 * ("The call takes about 20 minutes...") live in BookingPicker's booked state,
 * which is a different surface and a different moment.
 */

export const metadata: Metadata = {
  title: "Book your free review",
  description: "Pick a time for your free pharmacy finance review call.",
  robots: { index: false, follow: false },
  alternates: { canonical: `${siteConfig.url}/book` },
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
      {/* SlimHero's own ground is the kit's `bg-slate-900`, which is the one
          ground PharmaciesBackdrop was measured on in phase 1 (its header
          comment carries that row), so no new contrast row is owed here and
          `sectionClassName` is deliberately not passed. */}
      <SlimHero
        eyebrow="Your callback"
        title="Book your free review call"
        backdrop={<PharmaciesBackdrop patternId="pharmacies-dispensary-shelving-book" />}
      >
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
          Pick a day and a time window that suits you. A pharmacy finance specialist will call you
          then, no obligation.
        </p>
      </SlimHero>

      {/* White, not a tinted band: the hero above is slate-900 and the kit
          footer is slate-900, so this page must not end on the hero. */}
      <section className={`bg-white ${sectionY}`}>
        <div className={siteContainerLg}>
          <div className="mx-auto max-w-2xl">
            {token ? (
              <BookingPicker token={token} />
            ) : (
              <NoticeCard tone="slate">
                <p className="text-base text-slate-600">
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
