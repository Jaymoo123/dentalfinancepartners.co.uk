import type { Metadata } from "next";
import { siteContainerLg, sectionY } from "@/components/ui/layout-utils";
import BookingPicker from "@/components/forms/BookingPicker";
import { LeadForm } from "@/components/forms/LeadForm";

/**
 * Standalone booking page, linked from every nurture SMS/email as
 * /book?t=<signed lead token>. Nobody on our side attends a calendar: the lead
 * is telling us when a dental accountant should call, and the act of booking is
 * the contactability signal that promotes them for handoff.
 */

export const metadata: Metadata = {
  title: "Book a call",
  description: "Pick a time for your dental practice finance call, or send us the details now.",
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
    <section className="bg-[var(--background)]">
      <div className={`${siteContainerLg} ${sectionY}`}>
        <div className="mx-auto max-w-2xl">
          <h1 className="text-center font-serif text-3xl font-semibold text-[var(--ink)] sm:text-4xl">
            Book a call
          </h1>
          <p className="mt-4 text-center text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            Pick a day and a time window that suits you. An accountant will call you then.
          </p>
          <div className="mt-10">
            {token ? (
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-8">
                <BookingPicker token={token} />
              </div>
            ) : (
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
                <p className="text-base leading-relaxed text-[var(--muted)]">
                  This page normally opens from the personal link in your email or text message. Send
                  us your details below instead and we will arrange your call.
                </p>
                <div className="mt-6">
                  <LeadForm redirectOnSuccess submitLabel="Send enquiry" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
