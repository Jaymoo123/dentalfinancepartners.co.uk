import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, siteContainerLg } from "@/components/ui/layout-utils";
import { Eyebrow } from "@/components/ui/page-blocks";
import { NoticeCard } from "@/components/ui/NoticeCard";
import { SlimHero } from "@/components/ui/SlimHero";
import { WhatToExpectCard } from "@/components/property/WhatToExpectCard";
import BookingPicker from "@/components/forms/BookingPicker";

/**
 * Standalone booking page, linked from every nurture SMS/email as
 * /book?t=<signed lead token>. Nobody on our side attends a calendar: the lead
 * is telling us when the partner firm should call, and the act of booking is the
 * contactability signal that promotes them for handoff.
 *
 * On the post-submit skeleton (DESIGN_SYSTEM §4d): `SlimHero`, then one light
 * section carrying the job. The hero is navy and the footer is navy, so the
 * light section below is not optional (§9).
 */

export const metadata: Metadata = {
  title: `Book your free review`,
  description: "Pick a time for your free property tax review call.",
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
      <SlimHero eyebrow="Free review" title="Book your free review call">
        <p className="mt-4 text-base leading-relaxed text-slate-300 sm:mt-6 sm:text-lg">
          Pick a day and a time window that suits you. A property tax specialist will call you then,
          no obligation.
        </p>
      </SlimHero>

      {/* Two columns, the /contact anatomy: the ask in the wide column and the
          reassurance beside it rather than below the fold. This is also what
          lets the section use the full container honestly. A lone `max-w-2xl`
          picker under a full-width heading was the first attempt and it left
          half the container empty, which is the clamp §0.1 exists to stop. */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <Eyebrow>Two taps</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">When suits you</h2>
          </div>
          <div className="mt-8 grid gap-8 sm:mt-10 sm:gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
            <div>
              {token ? (
                <BookingPicker token={token} />
              ) : (
                <NoticeCard>
                  <p className="text-base leading-relaxed text-slate-700">
                    This page needs the personal link from your email or text message. If you cannot
                    find it, use the contact form and we will arrange your review.
                  </p>
                  <Link href="/contact" className={`${btnPrimary} mt-4`}>
                    Go to the contact form
                  </Link>
                </NoticeCard>
              )}
            </div>

            <div className="space-y-6">
              {/* Expectation-setting IS the conversion work here. The lead has
                  already enquired; the only thing left to win is whether they
                  pick up when we ring. */}
              <WhatToExpectCard
                title="What the call covers"
                items={[
                  "About twenty minutes, by phone, at the time you pick",
                  "Your specialist has read your enquiry before they ring",
                  "Where you stand on Section 24, CGT, MTD or incorporation",
                  "A fixed fee quote only if you want to go further",
                  "If your position is already right, we will say so",
                ]}
              />
              <p className="text-sm leading-relaxed text-slate-600">
                Plans changed? Reply to any of our messages and we will move it. Or{" "}
                <Link href="/contact" className="font-semibold text-emerald-700 underline">
                  use the contact form
                </Link>{" "}
                and we will arrange it from there.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
