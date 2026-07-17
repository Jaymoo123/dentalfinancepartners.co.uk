import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import BookingPicker from "@/components/forms/BookingPicker";

/**
 * Standalone booking page, linked from every nurture email/SMS as
 * /book?t=<signed lead token>. Nobody on our side attends a calendar: the lead
 * is telling us when an accountant should call, and the act of booking is the
 * contactability signal that promotes them for handoff.
 */

export const metadata: Metadata = {
  title: `Book your free review | ${siteConfig.name}`,
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
    <section className="bg-white py-16 sm:py-20">
      <div className={siteContainerLg}>
        <div className="mx-auto max-w-2xl">
          <h1 className="text-center text-3xl font-bold text-neutral-900 sm:text-4xl">
            Book your free IR35 review call
          </h1>
          <p className="mt-4 text-center text-lg leading-relaxed text-neutral-700">
            Pick a day and a time window that suits you. An accountant will call you then, no
            obligation.
          </p>
          <div className="mt-10">
            {token ? (
              <BookingPicker token={token} />
            ) : (
              <div className="border-2 border-neutral-300 bg-neutral-50 p-6 text-center">
                <p className="text-base text-neutral-700">
                  This page needs the personal link from your email or text message. If you cannot
                  find it, use the contact form and we will arrange your review.
                </p>
                <Link href="/contact" className={`${btnPrimary} mt-4 text-base`}>
                  Go to the contact form
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
