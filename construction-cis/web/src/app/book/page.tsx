import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, siteContainerLg } from "@/components/ui/layout-utils";
import { NoticeCard } from "@/components/ui/NoticeCard";
import { WhatToExpectCard } from "@/components/ui/WhatToExpectCard";
import BookingPicker from "@/components/forms/BookingPicker";

/**
 * Standalone booking page, linked from every nurture SMS/email as
 * /book?t=<signed lead token>. Nobody on our side attends a calendar: the lead
 * is telling us when the partner firm should call, and the act of booking is the
 * contactability signal that promotes them for handoff.
 *
 * On the post-submit skeleton (F.6): a shallow hero, then one light section
 * carrying the job in a [1.6fr_1fr] two-column body, ask left and reassurance
 * beside it rather than under the fold. The hero is the cream this site's
 * phase-5 heroes use, not navy: /book is noindex, it has no breadcrumb and no
 * hero CTA, and the closing band stays light so nothing dark meets the footer.
 *
 * The former narrow centred clamp on the body is gone (the acceptance test greps
 * these three routes for it, so it is not named here either). A lone narrow
 * picker under a full-width heading left half the container empty.
 */

export const metadata: Metadata = {
  title: `Book your free review`,
  description: "Pick a time for your free CIS tax review call.",
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
      <section className="bg-[var(--hero-cream)] py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <div className="section-label mb-6">Free review</div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Book your free review call
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-neutral-600">
              Pick a day and a time window that suits you. A specialist will call you then, no
              obligation.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <div className="section-label mb-4">Two taps</div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              When suits you
            </h2>
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
              <WhatToExpectCard
                title="What the call covers"
                items={[
                  "About twenty minutes, by phone, in the window you pick",
                  "Your specialist will have read your enquiry before they ring",
                  "Where you stand on CIS deductions, refunds and gross payment status",
                  "No obligation, and no work starts until you agree the scope",
                  "If your position is already right, we will say so",
                ]}
              />
              <p className="text-sm leading-relaxed text-neutral-600">
                Plans changed? Reply to any of our messages and we will move it. Or{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-[var(--accent-strong)] underline underline-offset-4"
                >
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
