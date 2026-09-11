import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, btnSecondary, siteContainerLg, sectionY } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import BookingPicker from "@/components/forms/BookingPicker";
import { isSafeReturnPath } from "@accounting-network/web-shared/leads/capture-steps";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Your enquiry has been received.",
  robots: { index: false, follow: true },
  twitter: {
    card: "summary_large_image",
    title: `Thank you | ${siteConfig.name}`,
    description: "Your enquiry has been received.",
  },
};

/** Navy plate, gold tick: 6.23 on navy, the sanctioned gold job. */
const CheckIcon = () => (
  <div className="inline-block rounded-2xl bg-[var(--navy)] p-6 mb-8">
    <svg className="h-16 w-16 text-[var(--gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  </div>
);

/** Completed step marker, same navy/gold pairing at 24px. */
const StepDone = () => (
  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[var(--navy)]">
    <svg className="h-4 w-4 text-[var(--gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  </span>
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
      <section className="bg-[var(--background)]">
        <div className={`${siteContainerLg} ${sectionY} text-center`}>
          <div className="mx-auto max-w-2xl">
            <CheckIcon />
            <h1 className="font-serif text-2xl font-semibold text-[var(--ink)] sm:text-4xl">
              You will not hear from us again about this enquiry
            </h1>
            <p className="mt-6 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              We have stopped the reminders. If you change your mind, the contact form is always open.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/" className={btnPrimary}>
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
      <section className="bg-[var(--background)]">
        <div className={`${siteContainerLg} ${sectionY} text-center`}>
          <div className="mx-auto max-w-2xl">
            <CheckIcon />
            <h1 className="font-serif text-3xl font-semibold text-[var(--ink)] sm:text-5xl">Confirmed</h1>
            <p className="mt-6 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              Thanks, that is confirmed. A specialist firm from our partner network will contact you directly.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/" className={btnPrimary}>
                Back to home
              </Link>
              <Link href="/calculators" className={btnSecondary}>
                Explore our dental finance calculators
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[var(--background)]">
      <div className={`${siteContainerLg} ${sectionY} text-center`}>
        <div className="mx-auto max-w-2xl">
          <CheckIcon />
          <h1 className="font-serif text-3xl font-semibold text-[var(--ink)] sm:text-5xl">Thank you</h1>
          {nurtureArmed ? (
            <>
              <p className="mt-6 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                We have just sent you a message to arrange your free dental practice finance review. Please check your email and phone, and confirm to lock in your callback slot.
              </p>
              <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
                For specialist tax advisory work, including practice structuring and tax planning, we work closely with Aswatax, a firm of Chartered Tax Advisers. If your enquiry needs that level of advice, it may be their team who contacts you.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                Cannot see our email? Please check your spam or junk folder, and mark it as not spam so our messages reach you.
              </p>
            </>
          ) : (
            <p className="mt-6 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              For specialist tax advisory work, including practice structuring and tax planning, we work closely with Aswatax, a firm of Chartered Tax Advisers. If your enquiry needs that level of advice, it may be their team who contacts you. You can also pick a callback time below.
            </p>
          )}

          {/* Endowed progress: 3-step journey. Step 2 label is "Details received"
              (no real-time phone verify on Dentists), step 3 = pick callback time. */}
          <ol className="mx-auto mt-8 flex max-w-xl flex-col gap-3 text-left sm:flex-row sm:items-center sm:justify-center sm:gap-6">
            <li className="flex items-center gap-2">
              <StepDone />
              <span className="text-sm font-semibold text-[var(--muted)]">1. Enquiry received</span>
            </li>
            <li className="flex items-center gap-2">
              <StepDone />
              <span className="text-sm font-semibold text-[var(--muted)]">2. Details received</span>
            </li>
            <li aria-current="step" className="flex items-center gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 border-[var(--gold)] bg-[var(--surface)] text-xs font-bold text-[var(--navy)]">
                3
              </span>
              <span className="text-sm font-bold text-[var(--navy)]">3. Pick your callback time</span>
            </li>
          </ol>

          {bookingToken ? (
            <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 text-left sm:p-8">
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
              <Link href="/contact" className={btnPrimary}>
                Book your free review
              </Link>
            </div>
          )}

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/" className={btnSecondary}>
              Back to home
            </Link>
            <Link href="/calculators" className={btnSecondary}>
              Explore dental finance calculators
            </Link>
            {returnPath && (
              <Link href={returnPath} data-cta="thankyou-return-article" data-cta-placement="thank_you" className={btnSecondary}>
                Back to the page you were reading
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
