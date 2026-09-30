import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, siteContainerLg } from "@/components/ui/layout-utils";
import { SlimHero } from "@accounting-network/web-shared/design/primitives/SlimHero";
import { NoticeCard } from "@accounting-network/web-shared/design/primitives/NoticeCard";
import BookingPicker from "@/components/forms/BookingPicker";

/**
 * Standalone booking page, linked from every nurture SMS/email as
 * /book?t=<signed lead token>. Nobody on our side attends a calendar: the lead
 * is telling us when a specialist should call, and the act of booking is the
 * contactability signal that promotes them for handoff.
 */

export const metadata: Metadata = {
  title: "Book your free review",
  description: "Pick a time for your free charity finance review call.",
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
          Pick a day and a time window that suits you. A charity finance specialist will call you
          then, no obligation.
        </p>
      </SlimHero>

      {/* White, not slate-50: the kit footer is slate-900 and the hero above is
          slate-900, so this page must not end on a navy-adjacent ground. */}
      <section className="bg-white py-12 sm:py-16 md:py-20">
        <div className={siteContainerLg}>
          <div className="mx-auto max-w-2xl">
            {token ? (
              <BookingPicker token={token} />
            ) : (
              <NoticeCard>
                <p className="text-base leading-relaxed text-slate-700">
                  This page needs the personal link from your email or text message. If you cannot
                  find it, use the contact form and we will arrange your review.
                </p>
                <Link href="/contact" className={`${btnPrimary} mt-6`}>
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
