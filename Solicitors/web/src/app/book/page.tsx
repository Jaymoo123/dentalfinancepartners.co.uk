import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, siteContainerLg } from "@/components/ui/layout-utils";
import { SolicitorsBackdrop } from "@/components/layout/SolicitorsBackdrop";
import { SlimHero } from "@accounting-network/web-shared/design/primitives/SlimHero";
import { NoticeCard } from "@accounting-network/web-shared/design/primitives/NoticeCard";
import BookingPicker from "@/components/forms/BookingPicker";

/**
 * Standalone booking page, linked from every nurture SMS/email as
 * /book?t=<signed lead token>. The lead picks a callback window for the
 * specialist accountant for solicitors to call them.
 *
 * F.6 skeleton: `SlimHero`, then ONE light section carrying the job. The hero
 * is navy and the footer is navy, so the light section below is not optional.
 * F.6's four deliberate departures are honoured: no `LeadCTAPanel`, no
 * breadcrumb (the route is noindex, so a trail to it would be fiction), a
 * shallow hero with no CTA row, and no tick badge.
 *
 * DEPARTURE from F.6's ask-left / reassurance-right grid: this route has no
 * reassurance copy of its own, and the phase-6 hard rule forbids authoring any.
 * `WhatToExpectCard` is deliberately NOT mounted here: its items would have to
 * be borrowed from /contact (net-new text on this route) or defaulted, and its
 * defaults are four Property strings. Single column on `siteContainerLg`, no
 * `max-w-2xl` clamp.
 *
 * `SlimHero.eyebrow` is required and has no default, so "Free review" is the
 * ONLY string added to this route. Every word in it already appears in the h1
 * below it. The h1 and standfirst are byte-identical to the pre-port page, so
 * the fallback is a one-line revert.
 *
 * Token logic and `robots index:false, follow:false` are untouched.
 */

export const metadata: Metadata = {
  title: `Book your free review`,
  description: "Pick a time for your free review call with a specialist accountant for solicitors.",
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
      <SlimHero
        eyebrow="Free review"
        title="Book your free review call"
        backdrop={<SolicitorsBackdrop tone="navy" />}
      >
        <p className="mt-4 text-base leading-relaxed text-slate-300 sm:mt-6 sm:text-lg">
          Pick a day and a time window that suits you. A specialist accountant for solicitors
          will call you then, no obligation.
        </p>
      </SlimHero>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          {token ? (
            <BookingPicker token={token} />
          ) : (
            <NoticeCard>
              <p className="text-base leading-relaxed text-slate-700">
                This page needs the personal link from your email or text message. If you
                cannot find it, use the contact form and we will arrange your review.
              </p>
              <Link href="/contact" className={`${btnPrimary} mt-4 text-base`}>
                Go to the contact form
              </Link>
            </NoticeCard>
          )}
        </div>
      </section>
    </>
  );
}
