import type { Metadata } from "next";
import Link from "next/link";
import BookingPicker from "@/components/forms/BookingPicker";
import { isSafeReturnPath } from "@accounting-network/web-shared/leads/capture-steps";
import { PageHero } from "@/app/_parts/PageHero";
import { siteContainerLg } from "@/components/ui/layout-utils";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
};

/**
 * Post-submit acknowledgement. Noindex, so no breadcrumb in the hero.
 *
 * The `<main>` wrappers each of the three branches used to open on are gone:
 * the shell (W1) now emits one `<main id="main">` around every page, and a
 * nested `<main>` is invalid HTML and a duplicate landmark. The gutters moved to
 * the section container rather than being deleted with the wrapper.
 *
 * The return link below carries the ONLY pre-port `data-cta` on this site
 * (`thankyou-return-article` / `thank_you`, no goal). It is the whole of the
 * site's live CTA funnel history. Do not rename it, do not add a goal, do not
 * move it behind a different condition.
 */
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
      <>
        <PageHero eyebrow="Unsubscribed" title="You will not hear from us again about this enquiry" />
        <section className="bg-white py-12 sm:py-16">
          <div className={siteContainerLg}>
            <div className="mx-auto max-w-2xl">
              <p className="text-base leading-relaxed text-neutral-700">
                We have stopped the reminders. If you change your mind, the contact form is always
                open.
              </p>
              <Link href="/" className="mt-8 inline-block font-medium text-[var(--accent-strong)] underline">
                Back to the homepage
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  if (confirmed) {
    return (
      <>
        <PageHero eyebrow="Confirmed" title="Confirmed" />
        <section className="bg-white py-12 sm:py-16">
          <div className={siteContainerLg}>
            <div className="mx-auto max-w-2xl">
              <p className="text-base leading-relaxed text-neutral-700">
                Thanks, that is confirmed. A specialist firm from our partner network will contact
                you directly.
              </p>
              <Link href="/" className="mt-8 inline-block font-medium text-[var(--accent-strong)] underline">
                Back to the homepage
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero eyebrow="Received" title="Thanks, your enquiry is on its way.">
        {nurtureArmed ? (
          <>
            <p className="mt-4 text-lg leading-relaxed text-white/80">
              For specialist tax advisory work, including complex structuring and tax planning, we
              work closely with Aswatax, a firm of Chartered Tax Advisers. If your enquiry needs
              that level of advice, it may be their team who contacts you.
            </p>
            <p className="mt-3 text-sm text-white/70">
              Cannot see our email? Please check your spam or junk folder, and mark it as not spam
              so our messages reach you.
            </p>
          </>
        ) : (
          <p className="mt-4 text-lg leading-relaxed text-white/80">
            For specialist tax advisory work, including complex structuring and tax planning, we
            work closely with Aswatax, a firm of Chartered Tax Advisers. If your enquiry needs that
            level of advice, it may be their team who contacts you. You can also pick a callback
            time below.
          </p>
        )}
      </PageHero>

      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="mx-auto max-w-2xl">
            {bookingToken && (
              <div className="border border-neutral-200 p-4 sm:p-8">
                <p className="mb-6 text-center text-base font-semibold text-neutral-900">
                  Want to skip the back and forth? Pick a time for your call now.
                </p>
                <BookingPicker token={bookingToken} />
              </div>
            )}

            <div className="mt-8 flex flex-col items-center gap-3">
              <Link href="/" className="font-medium text-[var(--accent-strong)] underline">
                Back to the homepage
              </Link>
              {returnPath && (
                <Link
                  href={returnPath}
                  data-cta="thankyou-return-article"
                  data-cta-placement="thank_you"
                  className="font-medium text-[var(--accent-strong)] underline"
                >
                  Back to the page you were reading
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
