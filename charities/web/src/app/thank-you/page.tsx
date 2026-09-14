import type { Metadata } from "next";
import Link from "next/link";
import { SlimHero } from "@accounting-network/web-shared/design/primitives/SlimHero";
import { siteContainerLg } from "@/components/ui/layout-utils";
import BookingPicker from "@/components/forms/BookingPicker";
import { isSafeReturnPath } from "@accounting-network/web-shared/leads/capture-steps";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
};

// Body section under the slim navy hero. White, because the hero is slate-900
// and the kit footer is slate-900 too: navy must never touch navy, so none of
// the three token-gated pages may end on the hero.
const bodyClass = "bg-white py-12 sm:py-16 md:py-20";
const innerClass = "mx-auto max-w-2xl text-center";
const leadClass = "text-base leading-relaxed text-slate-700 sm:text-lg";
const noteClass = "mt-3 text-sm leading-relaxed text-slate-600";
const backLinkClass = "font-semibold text-primary-700 underline underline-offset-2";

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
      <>
        <SlimHero
          eyebrow="Your enquiry"
          title="You will not hear from us again about this enquiry"
        />
        <section className={bodyClass}>
          <div className={siteContainerLg}>
            <div className={innerClass}>
              <p className={leadClass}>
                We have stopped the reminders. If you change your mind, the contact form is always open.
              </p>
              <Link href="/" className={`${backLinkClass} mt-8 inline-block`}>
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
        <SlimHero eyebrow="Your enquiry" title="Confirmed" />
        <section className={bodyClass}>
          <div className={siteContainerLg}>
            <div className={innerClass}>
              <p className={leadClass}>
                Thanks, that is confirmed. A specialist firm from our partner network will contact you
                directly.
              </p>
              <Link href="/" className={`${backLinkClass} mt-8 inline-block`}>
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
      <SlimHero eyebrow="Your enquiry" title="Thanks, your enquiry is on its way." />
      <section className={bodyClass}>
        <div className={siteContainerLg}>
          <div className={innerClass}>
            {nurtureArmed ? (
              <>
                <p className={leadClass}>
                  We have just sent you a message to arrange your free charity finance review. Please
                  check your email and phone, and confirm to lock in your callback slot.
                </p>
                <p className={noteClass}>
                  For specialist tax advisory work, including complex structuring and tax planning, we work
                  closely with Aswatax, a firm of Chartered Tax Advisers. If your enquiry needs that level of
                  advice, it may be their team who contacts you.
                </p>
                <p className={noteClass}>
                  Cannot see our email? Please check your spam or junk folder, and mark it as not spam so
                  our messages reach you.
                </p>
              </>
            ) : (
              <p className={leadClass}>
                For specialist tax advisory work, including complex structuring and tax planning, we work
                closely with Aswatax, a firm of Chartered Tax Advisers. If your enquiry needs that level of
                advice, it may be their team who contacts you.
              </p>
            )}

            {bookingToken ? (
              <div className="mt-10 rounded-xl bg-slate-50 p-6 text-left ring-1 ring-slate-200/70 sm:p-8">
                <p className="mb-6 text-center text-base font-bold text-slate-900">
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
                  className={backLinkClass}
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
