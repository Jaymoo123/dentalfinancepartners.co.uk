import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, siteContainerLg } from "@/components/ui/layout-utils";
import BookingPicker from "@/components/forms/BookingPicker";
import { SlimHero } from "@accounting-network/web-shared/design/primitives/SlimHero";
import { NoticeCard } from "@accounting-network/web-shared/design/primitives/NoticeCard";
import HospitalityBackdrop from "@/components/layout/HospitalityBackdrop";

/**
 * Standalone booking page, linked from every nurture SMS/email as
 * /book?t=<signed lead token>. Nobody on our side attends a calendar: the lead
 * is telling us when a hospitality tax specialist should call, and the act of booking is
 * the contactability signal that promotes them for handoff.
 */

export const metadata: Metadata = {
  title: "Book your free review",
  description: "Pick a time for your free hospitality tax review call.",
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
      <div className="ground-dark">
        {/* "Your callback" is the one string this package authors on this route (SlimHero's
            eyebrow is required with no fallback); same convention as startups-tech's
            SlimHero eyebrow on the equivalent page. */}
        <SlimHero eyebrow="Your callback" title="Book your free review call" backdrop={<HospitalityBackdrop patternId="hospitality-table-setting-book-hero" />}>
          <p className="mt-4 text-lg leading-relaxed text-slate-300">
            Pick a day and a time window that suits you. A hospitality tax specialist will call you then, no
            obligation.
          </p>
        </SlimHero>
      </div>
      <section className="bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="mx-auto max-w-2xl">
            <div className="mt-2">
              {token ? (
                <BookingPicker token={token} />
              ) : (
                <NoticeCard>
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
        </div>
      </section>
    </>
  );
}
