import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import BookingPicker from "@/components/forms/BookingPicker";
import { isSafeReturnPath } from "@/lib/leads/capture-steps";

export const metadata: Metadata = {
  title: `Thank you | ${siteConfig.name}`,
  description: "Your enquiry has been received.",
  robots: { index: false, follow: true },
  twitter: {
    card: "summary_large_image",
    title: `Thank you | ${siteConfig.name}`,
    description: "Your enquiry has been received.",
  },
};

const CheckIcon = () => (
  <div className="inline-block bg-emerald-600 p-6 mb-8">
    <svg className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  </div>
);

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
      <section className="bg-white py-20 sm:py-24">
        <div className={`${siteContainerLg} text-center`}>
          <div className="mx-auto max-w-2xl">
            <CheckIcon />
            <h1 className="text-2xl font-bold text-slate-900 sm:text-4xl">
              You will not hear from us again about this enquiry
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-700">
              We have stopped the reminders. If you change your mind, the contact form is always open.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/" className={`${btnPrimary} text-base px-8 py-3.5`}>
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (confirmed) {
    return (
      <section className="bg-white py-20 sm:py-24">
        <div className={`${siteContainerLg} text-center`}>
          <div className="mx-auto max-w-2xl">
            <CheckIcon />
            <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">Confirmed</h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-700">
              Thanks, that is confirmed. A specialist will be in touch.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/" className={`${btnPrimary} text-base px-8 py-3.5`}>
                Back to home
              </Link>
              <Link href="/blog" className="inline-flex items-center justify-center border-2 border-slate-300 bg-white px-8 py-3.5 text-base font-bold text-slate-900 transition-all hover:border-emerald-600 hover:bg-slate-50">
                Read property tax insights
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className={`${siteContainerLg} text-center`}>
        <div className="mx-auto max-w-2xl">
          <CheckIcon />
          <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">Thank you</h1>
          {nurtureArmed ? (
            <>
              <p className="mt-6 text-lg leading-relaxed text-slate-700">
                We have just sent you a message to arrange your free review. Please check your email and phone, and confirm to lock in your callback slot.
              </p>
              <p className="mt-4 text-base text-slate-600">
                Your message is with our team. We aim to respond within 24 hours, usually same day.
              </p>
              <p className="mt-4 text-sm text-slate-500">
                Cannot see our email? Please check your spam or junk folder, and mark it as not spam so our messages reach you.
              </p>
            </>
          ) : (
            <p className="mt-6 text-lg leading-relaxed text-slate-700">
              Your enquiry is with our team. We will be in touch within one working day, usually the same day. You can also pick a callback time below.
            </p>
          )}

          {/* Endowed progress: steps 1 and 2 are genuinely done (the submit route
              verifies details in real time), so picking a time reads as finishing
              a nearly-complete journey rather than starting a new one. */}
          <ol className="mx-auto mt-8 flex max-w-xl flex-col gap-3 text-left sm:flex-row sm:items-center sm:justify-center sm:gap-6">
            <li className="flex items-center gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-emerald-600">
                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-sm font-semibold text-slate-600">1. Enquiry received</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-emerald-600">
                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-sm font-semibold text-slate-600">2. Details verified</span>
            </li>
            <li aria-current="step" className="flex items-center gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center border-2 border-emerald-600 bg-white text-xs font-bold text-emerald-700">
                3
              </span>
              <span className="text-sm font-bold text-slate-900">3. Pick your callback time</span>
            </li>
          </ol>

          {bookingToken ? (
            <div className="mt-8 border-2 border-slate-200 bg-white p-3 text-left sm:p-8">
              <p className="mb-6 text-center text-base font-semibold text-slate-800">
                Want to skip the back and forth? Pick a time for your call now.
              </p>
              <BookingPicker token={bookingToken} />
            </div>
          ) : (
            <div className="mt-8">
              <p className="mb-4 text-sm font-semibold text-slate-700">
                Ready to book a time that works for you?
              </p>
              <Link href="/contact" className={`${btnPrimary} inline-flex text-base px-8 py-3.5`}>
                Book your free review
              </Link>
            </div>
          )}

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/" className="inline-flex items-center justify-center border-2 border-slate-300 bg-white px-8 py-3.5 text-base font-bold text-slate-900 transition-all hover:border-emerald-600 hover:bg-slate-50">
              Back to home
            </Link>
            <Link href="/blog" className="inline-flex items-center justify-center border-2 border-slate-300 bg-white px-8 py-3.5 text-base font-bold text-slate-900 transition-all hover:border-emerald-600 hover:bg-slate-50">
              Read property tax insights
            </Link>
            {returnPath && (
              <Link href={returnPath} data-cta="thankyou-return-article" data-cta-placement="thank_you" className="inline-flex items-center justify-center border-2 border-slate-300 bg-white px-8 py-3.5 text-base font-bold text-slate-900 transition-all hover:border-emerald-600 hover:bg-slate-50">
                Back to the page you were reading
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
