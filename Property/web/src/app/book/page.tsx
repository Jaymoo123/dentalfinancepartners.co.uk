import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import BookingPicker from "@/components/forms/BookingPicker";
import { verifyLeadToken } from "@accounting-network/web-shared/lead-nurture/tokens";
import { recordLeadContactEvent } from "@accounting-network/web-shared/lead-nurture/send";
import { adminSelect } from "@/lib/supabase/admin";

/**
 * Standalone booking page, linked from every nurture SMS/email as
 * /book?t=<signed lead token>. Nobody on our side attends a calendar: the lead
 * is telling us when DJH should call, and the act of booking is the
 * contactability signal that promotes them for handoff.
 */

export const metadata: Metadata = {
  title: `Book your free review | ${siteConfig.name}`,
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

  // Record one booking_viewed engagement signal per lead per day. Best-effort:
  // never throws and never delays the page render.
  if (token) {
    try {
      const verdict = verifyLeadToken(token, "book");
      if (verdict.ok) {
        const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
        const existing = await adminSelect<{ id: string }>("lead_contact_events", {
          select: "id",
          lead_id: `eq.${verdict.leadId}`,
          event_type: "eq.booking_viewed",
          created_at: `gte.${since}`,
          limit: "1",
        });
        if (existing.data.length === 0) {
          await recordLeadContactEvent(verdict.leadId, "booking_viewed", "web");
        }
      }
    } catch {
      // best-effort: never block render on event recording failure
    }
  }

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className={siteContainerLg}>
        <div className="mx-auto max-w-2xl">
          <h1 className="text-center text-3xl font-bold text-slate-900 sm:text-4xl">
            Book your free review call
          </h1>
          <p className="mt-4 text-center text-lg leading-relaxed text-slate-700">
            Pick a day and a time window that suits you. A property tax specialist will call you
            then, no obligation.
          </p>
          <div className="mt-10">
            {token ? (
              <BookingPicker token={token} />
            ) : (
              <div className="border-2 border-slate-300 bg-slate-50 p-6 text-center">
                <p className="text-base text-slate-700">
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
