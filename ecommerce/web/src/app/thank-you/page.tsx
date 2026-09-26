import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, btnSecondary, siteContainerLg, sectionY } from "@/components/ui/layout-utils";
import { SlimHero } from "@accounting-network/web-shared/design/primitives/SlimHero";
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

/**
 * ADOPTED: packages/web-shared/design/primitives/SlimHero.tsx, declined in
 * every phase from 1 to 5 and correct here: its docblock names /thank-you,
 * /book and /complete as the three pages it exists for. All three branches
 * below open on it and none of them ends on it.
 *
 * HOST CONTRACT: the component writes `relative overflow-hidden` on its own
 * section and `relative z-10` on its own container, so the contract binds the
 * `backdrop` slot rather than the call site. No backdrop is passed: this site
 * owns no brick/texture motif component, so the slot stays empty and nothing
 * can paint over the copy. No breadcrumb by design, this route is noindex.
 *
 * Body sections are WHITE, not a tinted band: the hero is slate-900 and the
 * kit footer is slate-900, so navy must never be the last thing on the page.
 * Eyebrow `onDark` and any standfirst are slate-300 on slate-900 = 11.90:1.
 */
const bodyClass = `bg-white ${sectionY}`;

/**
 * DECLINED on this route, with reasons, for the 9.1 kit-adoption gate:
 *
 * - packages/web-shared/design/primitives/NoticeCard.tsx. ADOPTED on /book and
 *   /complete, declined here. This page is not a card: it is a centred column
 *   carrying a tick, a three-step progress list and an inline booking picker,
 *   and NoticeCard is a single ring-1 panel with `text-center` baked in. Boxing
 *   the whole outcome would be a redesign of the page, not an adoption.
 * - packages/web-shared/design/marketing/LeadCTAPanel.tsx. A lead-capture
 *   surface; this page is what a lead lands on AFTER capturing. Owner gate.
 * - packages/web-shared/design/marketing/StickyCTA.tsx. Banned estate-wide as
 *   an interruption.
 * - packages/web-shared/design/primitives/FaqSection.tsx. Declined six times on
 *   this site: a Radix accordion with no `forceMount`, so closed answers are
 *   absent from the server HTML. Not re-litigated, and this route has no FAQ.
 */

/**
 * A DARK ISLAND inside a white section (bg-neutral-900 chip, brand-amber tick
 * at 5.90:1, which passes the 3.0 graphic floor and is unchanged).
 *
 * NO FOCUS RING APPLIED, deliberately. `focusRingOnBrand`
 * (src/components/ui/layout-utils.ts:64-79) names this call site, but the
 * element is a plain <div> wrapping a plain <svg>: no href, no tabIndex, no
 * interactive role, so it can never take focus and a ring on it would be
 * unreachable markup. The recipe's real consumer is the one focusable dark
 * island on the site, src/components/forms/BookingPicker.tsx:27 (the selected
 * slot button), which is outside this package's lease. Reported, not applied.
 *
 * The tick duplicates the heading, so it is aria-hidden rather than announced.
 */
const CheckIcon = () => (
  <div className="mb-8 inline-block bg-neutral-900 p-6">
    <svg
      aria-hidden="true"
      className="h-16 w-16 text-[var(--brand-primary)]"
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
      <SlimHero eyebrow="Your enquiry" title="You will not hear from us again about this enquiry" />
      <section className={bodyClass}>
        <div className={`${siteContainerLg} text-center`}>
          <div className="mx-auto max-w-2xl">
            <CheckIcon />
            <p className="mt-6 text-lg leading-relaxed text-neutral-600">
              We have stopped the reminders. If you change your mind, the contact form is always
              open.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/" className={btnPrimary}>
                Back to home
              </Link>
            </div>
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
        <div className={`${siteContainerLg} text-center`}>
          <div className="mx-auto max-w-2xl">
            <CheckIcon />
            <p className="mt-6 text-lg leading-relaxed text-neutral-600">
              Thanks, that is confirmed. A specialist firm from our partner network will contact you
              directly.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/" className={btnPrimary}>
                Back to home
              </Link>
              <Link href="/calculators" className={btnSecondary}>
                Explore our seller calculators
              </Link>
            </div>
          </div>
        </div>
      </section>
      </>
    );
  }

  return (
    <>
    <SlimHero eyebrow="Your enquiry" title="Thank you" />
    <section className={bodyClass}>
      <div className={`${siteContainerLg} text-center`}>
        <div className="mx-auto max-w-2xl">
          <CheckIcon />
          {nurtureArmed ? (
            <>
              <p className="mt-6 text-lg leading-relaxed text-neutral-600">
                We have just sent you a message to arrange your free review call. Please check your
                email and phone, and confirm to lock in your callback slot.
              </p>
              <p className="mt-4 text-base text-neutral-500">
                For specialist tax advisory work, including complex structuring and tax planning, we
                work closely with Aswatax, a firm of Chartered Tax Advisers. If your enquiry needs
                that level of advice, it may be their team who contacts you.
              </p>
              <p className="mt-4 text-sm text-neutral-500">
                Cannot see our email? Please check your spam or junk folder, and mark it as not spam
                so our messages reach you.
              </p>
            </>
          ) : (
            <p className="mt-6 text-lg leading-relaxed text-neutral-600">
              For specialist tax advisory work, including complex structuring and tax planning, we
              work closely with Aswatax, a firm of Chartered Tax Advisers. If your enquiry needs that
              level of advice, it may be their team who contacts you. You can also pick a callback
              time below.
            </p>
          )}

          {/* Endowed progress: 3-step journey. Step 2 is "Details received"; the
              live step is picking a callback window.

              The two completed steps paint DARK ISLANDS (bg-neutral-900 chips)
              inside this white section. NO FOCUS RING APPLIED: both are
              <span> elements with no href, tabIndex or interactive role, so
              neither is focusable and `focusRingOnBrand` has nothing to ring
              here. Their ticks are aria-hidden: the adjacent text label
              already says which step it is. */}
          <ol className="mx-auto mt-8 flex max-w-xl flex-col gap-3 text-left sm:flex-row sm:items-center sm:justify-center sm:gap-6">
            <li className="flex items-center gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-neutral-900">
                <svg
                  aria-hidden="true"
                  className="h-4 w-4 text-[var(--brand-primary)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-sm font-semibold text-neutral-500">1. Enquiry received</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-neutral-900">
                <svg
                  aria-hidden="true"
                  className="h-4 w-4 text-[var(--brand-primary)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-sm font-semibold text-neutral-500">2. Details received</span>
            </li>
            <li aria-current="step" className="flex items-center gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center border-2 border-[var(--brand-primary)] bg-white text-xs font-bold text-neutral-900">
                3
              </span>
              <span className="text-sm font-bold text-neutral-900">3. Pick your callback time</span>
            </li>
          </ol>

          {bookingToken ? (
            <div className="mt-8 border border-neutral-200 bg-white p-3 text-left sm:p-8">
              <p className="mb-6 text-center text-base font-semibold text-neutral-900">
                Want to skip the back and forth? Pick a time for your call now.
              </p>
              <BookingPicker token={bookingToken} />
            </div>
          ) : (
            <div className="mt-8">
              <p className="mb-4 text-sm font-semibold text-neutral-600">
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
              Explore seller calculators
            </Link>
            {returnPath && (
              <Link
                href={returnPath}
                data-cta="thankyou-return-article"
                data-cta-placement="thank_you"
                className={btnSecondary}
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
