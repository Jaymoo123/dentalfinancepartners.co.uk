import type { Metadata } from "next";
import Link from "next/link";
import BookingPicker from "@/components/forms/BookingPicker";
import { isSafeReturnPath } from "@accounting-network/web-shared/leads/capture-steps";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
};

const shellClass = "mx-auto max-w-2xl px-6 py-24 text-center";
const headingClass = "text-3xl font-semibold tracking-tight text-neutral-900";
const backLinkClass = "mt-8 inline-block font-medium underline";

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
  // The "we have just messaged you" copy is only truthful once nurture is armed.
  // While dormant we must not tell people to watch for outreach that will never
  // arrive, so we fall back to honest "we will be in touch" copy.
  const nurtureArmed = ["1", "true", "yes"].includes(
    (process.env.LEAD_NURTURE_ENABLED ?? "").trim().toLowerCase(),
  );

  if (optedOut) {
    return (
      <main className={shellClass}>
        <h1 className={headingClass}>You will not hear from us again about this enquiry</h1>
        <p className="mt-4 text-neutral-600">
          We have stopped the reminders. If you change your mind, the contact form is always open.
        </p>
        <Link href="/" className={backLinkClass}>
          Back to the homepage
        </Link>
      </main>
    );
  }

  if (confirmed) {
    return (
      <main className={shellClass}>
        <h1 className={headingClass}>Confirmed</h1>
        <p className="mt-4 text-neutral-600">
          Thanks, that is confirmed. A specialist firm from our partner network will contact you
          directly.
        </p>
        <Link href="/" className={backLinkClass}>
          Back to the homepage
        </Link>
      </main>
    );
  }

  return (
    <main className={shellClass}>
      <h1 className={headingClass}>Thanks, your enquiry is on its way.</h1>
      {nurtureArmed ? (
        <>
          <p className="mt-4 text-neutral-600">
            We have just sent you a message to arrange your free charity finance review. Please
            check your email and phone, and confirm to lock in your callback slot.
          </p>
          <p className="mt-3 text-sm text-neutral-500">
            Cannot see our email? Please check your spam or junk folder, and mark it as not spam so
            our messages reach you.
          </p>
        </>
      ) : (
        <p className="mt-4 text-neutral-600">
          We&apos;ll come back to you within 24 hours. A specialist firm from our partner network may
          contact you directly about your enquiry.
        </p>
      )}

      {bookingToken ? (
        <div className="mt-10 rounded-lg border border-neutral-200 bg-white p-4 text-left sm:p-8">
          <p className="mb-6 text-center text-base font-medium text-neutral-900">
            Want to skip the back and forth? Pick a time for your call now.
          </p>
          <BookingPicker token={bookingToken} />
        </div>
      ) : null}

      <div className="mt-8 flex flex-col items-center gap-3">
        <Link href="/" className={backLinkClass}>
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
    </main>
  );
}
