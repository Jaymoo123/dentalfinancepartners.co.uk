import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import BookingPicker from "@/components/forms/BookingPicker";

/**
 * Standalone booking page, linked from every nurture SMS/email as
 * /book?t=<signed lead token>. The lead picks a callback window for the
 * specialist accountant for solicitors to call them.
 */

export const metadata: Metadata = {
  title: `Book your free review | ${siteConfig.name}`,
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
    <section className="bg-[var(--surface)] py-16 sm:py-20">
      <div className={siteContainerLg}>
        <div className="mx-auto max-w-2xl">
          <h1 className="text-center text-3xl font-bold text-[var(--ink)] sm:text-4xl">
            Book your free review call
          </h1>
          <p className="mt-4 text-center text-lg leading-relaxed text-[var(--muted)]">
            Pick a day and a time window that suits you. A specialist accountant for solicitors
            will call you then, no obligation.
          </p>
          <div className="mt-10">
            {token ? (
              <BookingPicker token={token} />
            ) : (
              <div className="rounded-xl border-2 border-[var(--border)] bg-[var(--surface)] p-6 text-center">
                <p className="text-base text-[var(--muted)]">
                  This page needs the personal link from your email or text message. If you
                  cannot find it, use the contact form and we will arrange your review.
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
