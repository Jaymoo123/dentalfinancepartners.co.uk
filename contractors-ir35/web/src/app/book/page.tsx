import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, siteContainerLg } from "@/components/ui/layout-utils";
import { SlimHero } from "@accounting-network/web-shared/design/primitives/SlimHero";
import ContractorsBackdrop from "@/components/layout/ContractorsBackdrop";
import { NoticeCard } from "@accounting-network/web-shared/design/primitives/NoticeCard";
import BookingPicker from "@/components/forms/BookingPicker";

/**
 * Standalone booking page, linked from every nurture email/SMS as
 * /book?t=<signed lead token>. Nobody on our side attends a calendar: the lead
 * is telling us when an accountant should call, and the act of booking is the
 * contactability signal that promotes them for handoff.
 */

export const metadata: Metadata = {
  title: `Book your free review`,
  description: "Pick a time for your free IR35 review call.",
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
      <SlimHero eyebrow="Your review" title="Book your free IR35 review call" backdrop={<ContractorsBackdrop />}>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-300 sm:text-lg">
          Pick a day and a time window that suits you. An accountant will call you then, no
          obligation.
        </p>
      </SlimHero>

      {/* The picker is the whole body and it is the page's only ask, so there is
          no LeadCTAPanel here: asking a second time for something the reader is
          in the middle of giving is not a closing ask. No `max-w-2xl` clamp
          either; the container IS the measure and the picker fills it. */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          {token ? (
            <BookingPicker token={token} />
          ) : (
            <NoticeCard tone="slate">
              <p className="text-base text-neutral-700">
                This page needs the personal link from your email or text message. If you cannot
                find it, use the contact form and we will arrange your review.
              </p>
              <Link href="/contact" className={`${btnPrimary} mt-4 rounded-xl text-base`}>
                Go to the contact form
              </Link>
            </NoticeCard>
          )}
        </div>
      </section>
    </>
  );
}
