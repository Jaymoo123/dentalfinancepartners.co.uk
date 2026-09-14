import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, siteContainerLg } from "@/components/ui/layout-utils";
import BookingPicker from "@/components/forms/BookingPicker";
import { PageHero } from "@/app/_parts/PageHero";
import { NoticeCard } from "@accounting-network/web-shared/design/primitives/NoticeCard";

/**
 * Standalone booking page, linked from every nurture SMS/email as
 * /book?t=<signed lead token>. Nobody on our side attends a calendar: the lead
 * is telling us when a crypto tax specialist should call, and the act of booking is
 * the contactability signal that promotes them for handoff.
 *
 * Chrome: this is a noindex flow page, so the hero carries no breadcrumb (a trail
 * to a page no crawler may index is fiction) and the page adds nothing else above
 * the one job. The global header and footer come from the shell and are not
 * suppressed here.
 */

export const metadata: Metadata = {
  title: "Book your free review",
  description: "Pick a time for your free crypto tax review call.",
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
      <PageHero eyebrow="Free call" title="Book your free review call">
        <p className="mt-4 text-lg leading-relaxed text-white/80">
          Pick a day and a time window that suits you. A crypto tax specialist will call you then,
          no obligation.
        </p>
      </PageHero>

      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="mx-auto max-w-2xl">
            {token ? (
              <BookingPicker token={token} />
            ) : (
              <NoticeCard>
                <p className="text-base text-neutral-700">
                  This page needs the personal link from your email or text message. If you cannot
                  find it, use the contact form and we will arrange your review.
                </p>
                <Link href="/contact" className={`${btnPrimary} mt-4`}>
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
