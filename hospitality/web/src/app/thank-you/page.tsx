import type { Metadata } from "next";
import Link from "next/link";
import BookingPicker from "@/components/forms/BookingPicker";
import { isSafeReturnPath } from "@accounting-network/web-shared/leads/capture-steps";
import { SlimHero } from "@accounting-network/web-shared/design/primitives/SlimHero";
import HospitalityBackdrop from "@/components/layout/HospitalityBackdrop";

// "Your enquiry" is the one string this package authors on this route (SlimHero's eyebrow
// is required with no fallback); same convention as startups-tech's SlimHero eyebrow on the
// equivalent page. Three mutually exclusive branches below, each renders exactly one
// SlimHero / one <h1>.
//
// WhatToExpectCard (packages/web-shared/design/marketing/WhatToExpectCard.tsx) DECLINED on
// this route, same reason as /contact: no items list is published on any of the three
// branches today (only prose paragraphs), and locked rule 17 requires items fed from
// existing copy. See W6 receipt.

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
};

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ confirmed?: string; bt?: string; optout?: string; rt?: string }>;
}) {
  const params = await searchParams;
  const confirmed = params.confirmed === "1";
  const optedOut = params.optout === "1";
  // Signed booking token from the submit response: enables the inline native
  // slot picker at the highest-intent moment, straight after the form.
  const bookingToken = (params.bt ?? "").trim() || null;
  const rawRt = params.rt ?? "";
  const returnPath = isSafeReturnPath(rawRt) ? rawRt : null;
  // The enhanced "we have just messaged you" copy is only truthful once nurture
  // is armed. While dormant we must not tell people to watch for outreach that
  // will never arrive, so we fall back to honest "we will be in touch" copy.
  const nurtureArmed = ["1", "true", "yes"].includes(
    (process.env.LEAD_NURTURE_ENABLED ?? "").trim().toLowerCase(),
  );

  if (optedOut) {
    return (
      <div className="ground-dark">
        <SlimHero eyebrow="Your enquiry" title="You will not hear from us again about this enquiry" backdrop={<HospitalityBackdrop patternId="hospitality-table-setting-thankyou-optout" />} />
        <div className="mx-auto max-w-2xl px-6 py-16 text-center">
          <p className="text-slate-600">
            We have stopped the reminders. If you change your mind, the contact form is always open.
          </p>
          <Link href="/" className="mt-8 inline-block font-medium underline">
            Back to the homepage
          </Link>
        </div>
      </div>
    );
  }

  if (confirmed) {
    return (
      <div className="ground-dark">
        <SlimHero eyebrow="Your enquiry" title="Confirmed" backdrop={<HospitalityBackdrop patternId="hospitality-table-setting-thankyou-confirmed" />} />
        <div className="mx-auto max-w-2xl px-6 py-16 text-center">
          <p className="text-slate-600">
            Thanks, that is confirmed. A specialist firm from our partner network will contact you
            directly.
          </p>
          <Link href="/" className="mt-8 inline-block font-medium underline">
            Back to the homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="ground-dark">
      <SlimHero eyebrow="Your enquiry" title="Thanks, your enquiry is on its way." backdrop={<HospitalityBackdrop patternId="hospitality-table-setting-thankyou-default" />} />
      <div className="mx-auto max-w-2xl px-6 py-16 text-center">
      {nurtureArmed ? (
        <>
          <p className="mt-4 text-slate-600">
            We have just sent you a message to arrange your free hospitality tax review. Please
            check your email and phone, and confirm to lock in your callback slot.
          </p>
          <p className="mt-3 text-sm text-slate-500">
            For specialist tax advisory work, including complex structuring and tax planning, we work
            closely with Aswatax, a firm of Chartered Tax Advisers. If your enquiry needs that level of
            advice, it may be their team who contacts you.
          </p>
          <p className="mt-3 text-sm text-slate-500">
            Cannot see our email? Please check your spam or junk folder, and mark it as not spam so
            our messages reach you.
          </p>
        </>
      ) : (
        <p className="mt-4 text-slate-600">
          For specialist tax advisory work, including complex structuring and tax planning, we work
          closely with Aswatax, a firm of Chartered Tax Advisers. If your enquiry needs that level of
          advice, it may be their team who contacts you. You can also pick a callback time below.
        </p>
      )}

      {bookingToken && (
        <div className="mt-10 rounded-md border border-slate-200 p-4 text-left sm:p-8">
          <p className="mb-6 text-center text-base font-semibold text-slate-900">
            Want to skip the back and forth? Pick a time for your call now.
          </p>
          <BookingPicker token={bookingToken} />
        </div>
      )}

      <div className="mt-8 flex flex-col items-center gap-3">
        <Link href="/" className="font-medium underline">
          Back to the homepage
        </Link>
        {returnPath && (
          <Link
            href={returnPath}
            data-cta="thankyou-return-article"
            data-cta-placement="thank_you"
            className="font-medium underline"
          >
            Back to the page you were reading
          </Link>
        )}
      </div>
      </div>
    </div>
  );
}
