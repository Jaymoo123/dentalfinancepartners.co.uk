import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import BookingPicker from "@/components/forms/BookingPicker";
import { isSafeReturnPath } from "@accounting-network/web-shared/leads/capture-steps";

export const metadata: Metadata = {
  title: `Thank you | ${siteConfig.name}`,
  description: "Your enquiry has been received.",
  robots: { index: false, follow: true },
};

const CheckIcon = () => (
  <div className="inline-block bg-[var(--primary)] p-6 mb-8 rounded-full">
    <svg
      className="h-16 w-16 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  </div>
);

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ bt?: string; rt?: string; confirmed?: string; optout?: string }>;
}) {
  const params = await searchParams;
  const bookingToken = (params.bt ?? "").trim() || null;
  const rawRt = params.rt ?? "";
  const returnPath = isSafeReturnPath(rawRt) ? rawRt : null;
  const confirmed = params.confirmed === "1";
  const optedOut = params.optout === "1";

  const nurtureArmed = ["1", "true", "yes"].includes(
    (process.env.LEAD_NURTURE_ENABLED ?? "").trim().toLowerCase(),
  );

  if (optedOut) {
    return (
      <section className="bg-[var(--surface)] py-20 sm:py-24">
        <div className={`${siteContainerLg} text-center`}>
          <div className="mx-auto max-w-2xl">
            <CheckIcon />
            <h1 className="text-2xl font-bold text-[var(--ink)] sm:text-4xl">
              You will not hear from us again about this enquiry
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[var(--muted)]">
              We have stopped the reminders. If you change your mind, the contact form is always
              open.
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
      <section className="bg-[var(--surface)] py-20 sm:py-24">
        <div className={`${siteContainerLg} text-center`}>
          <div className="mx-auto max-w-2xl">
            <CheckIcon />
            <h1 className="text-4xl font-bold text-[var(--ink)] sm:text-5xl">Confirmed</h1>
            <p className="mt-6 text-lg leading-relaxed text-[var(--muted)]">
              Thanks, that is confirmed. A specialist accountant for solicitors will be in touch.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/" className={`${btnPrimary} text-base px-8 py-3.5`}>
                Back to home
              </Link>
              <Link
                href="/calculators"
                className="inline-flex items-center justify-center rounded-full border border-[var(--primary)]/25 px-8 py-3.5 text-base font-bold text-[var(--primary)] transition-all hover:border-[var(--primary)] hover:bg-[var(--primary)]/5"
              >
                Explore our calculators
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[var(--surface)] py-20 sm:py-24">
      <div className={`${siteContainerLg} text-center`}>
        <div className="mx-auto max-w-2xl">
          <CheckIcon />
          <h1 className="text-4xl font-bold text-[var(--ink)] sm:text-5xl">Thank you</h1>

          {nurtureArmed ? (
            <>
              <p className="mt-6 text-lg leading-relaxed text-[var(--muted)]">
                We have just sent you a message to arrange your free review. Please check your
                email and phone, and confirm to lock in your callback slot.
              </p>
              <p className="mt-4 text-base text-[var(--muted)]">
                Your message is with our team. We aim to respond within 24 hours, usually the
                same day.
              </p>
              <p className="mt-4 text-sm text-[var(--muted)]">
                Cannot see our email? Please check your spam or junk folder, and mark it as not
                spam so our messages reach you.
              </p>
            </>
          ) : (
            <p className="mt-6 text-lg leading-relaxed text-[var(--muted)]">
              Your enquiry is with our team. We will be in touch within one working day, usually
              the same day. You can also pick a callback time below.
            </p>
          )}

          {/* Endowed progress: 3-step ol, steps 1 and 2 done, step 3 is the CTA. */}
          <ol className="mx-auto mt-8 flex max-w-xl flex-col gap-3 text-left sm:flex-row sm:items-center sm:justify-center sm:gap-6">
            <li className="flex items-center gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--primary)]">
                <svg
                  className="h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-sm font-semibold text-[var(--muted)]">1. Enquiry received</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--primary)]">
                <svg
                  className="h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-sm font-semibold text-[var(--muted)]">2. Details received</span>
            </li>
            <li aria-current="step" className="flex items-center gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[var(--primary)] bg-[var(--surface)] text-xs font-bold text-[var(--primary)]">
                3
              </span>
              <span className="text-sm font-bold text-[var(--ink)]">3. Pick your callback time</span>
            </li>
          </ol>

          {bookingToken ? (
            <div className="mt-8 rounded-xl border-2 border-[var(--border)] bg-[var(--surface)] p-3 text-left sm:p-8">
              <p className="mb-6 text-center text-base font-semibold text-[var(--ink)]">
                Want to skip the back and forth? Pick a time for your call now.
              </p>
              <BookingPicker token={bookingToken} />
            </div>
          ) : (
            <div className="mt-8">
              <p className="mb-4 text-sm font-semibold text-[var(--muted)]">
                Ready to book a time that works for you?
              </p>
              <Link href="/contact" className={`${btnPrimary} inline-flex text-base px-8 py-3.5`}>
                Book your free review
              </Link>
            </div>
          )}

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-8 py-3.5 text-base font-bold text-[var(--ink)] transition-all hover:border-[var(--primary)] hover:bg-[var(--primary)]/5"
            >
              Back to home
            </Link>
            <Link
              href="/calculators"
              className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-8 py-3.5 text-base font-bold text-[var(--ink)] transition-all hover:border-[var(--primary)] hover:bg-[var(--primary)]/5"
            >
              Explore our calculators
            </Link>
            {returnPath && (
              <Link
                href={returnPath}
                data-cta="thankyou-return-article"
                data-cta-placement="thank_you"
                className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-8 py-3.5 text-base font-bold text-[var(--ink)] transition-all hover:border-[var(--primary)] hover:bg-[var(--primary)]/5"
              >
                Back to the page you were reading
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
