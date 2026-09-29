import type { Metadata } from "next";
import Link from "next/link";
import { siteContainerLg, sectionY, focusRing } from "@/components/ui/layout-utils";
import { SlimHero } from "@accounting-network/web-shared/design/primitives/SlimHero";
import BookingPicker from "@/components/forms/BookingPicker";
import { isSafeReturnPath } from "@accounting-network/web-shared/leads/capture-steps";

/**
 * CHROME ONLY. Every sentence below is the pre-port copy, byte for byte,
 * including the "specialist firm from our partner network" sentence in the
 * confirmed branch: an owner item (plan section A10), not a design one. The
 * three h1 strings are the pre-port h1 strings, moved into SlimHero's `title`
 * rather than reworded. The one string authored here is the `eyebrow`, "Your
 * enquiry", which the primitive requires.
 *
 * ADOPTED: packages/web-shared/design/primitives/SlimHero.tsx, scoped by its own
 * docblock to exactly these three token-gated post-submit pages.
 *
 * ADOPTION DECLINED: packages/web-shared/design/primitives/NoticeCard.tsx.
 * Adopted on /book and /complete, where a single outcome card is the whole
 * payload. Here the body is a stack of paragraphs plus, on one branch, the
 * booking picker; NoticeCard bakes in `text-center` and a single ring-1 panel,
 * so boxing the stack inside one would either centre the picker's two-column
 * chip grids or give the page a panel inside a panel.
 * ADOPTION DECLINED: packages/web-shared/design/marketing/StickyCTA.tsx and every
 * modal/banner (no interruptive surface on this site, owner ruling) and
 * marketing/LeadCTAPanel.tsx (this page is the post-submit acknowledgement; a
 * capture form on it would be a new capture surface, which is owner-gated).
 *
 * THREE MUTUALLY EXCLUSIVE BRANCHES, ONE RENDERS. A naive grep counts three
 * `<h1>` and three heroes in this file; the served page has exactly one of each.
 */

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
};

const bodySection = `bg-slate-50 ${sectionY}`;
const bodyInner = "mx-auto max-w-2xl text-center";
const backLinkClass = `mt-8 inline-block font-medium text-primary-700 underline underline-offset-2 ${focusRing} rounded`;

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
        <SlimHero eyebrow="Your enquiry" title="You will not hear from us again about this enquiry" />
        <section className={bodySection}>
          <div className={siteContainerLg}>
            <div className={bodyInner}>
              <p className="text-base leading-relaxed text-slate-700">
                We have stopped the reminders. If you change your mind, the contact form is always open.
              </p>
              <Link href="/" className={backLinkClass}>
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
        <section className={bodySection}>
          <div className={siteContainerLg}>
            <div className={bodyInner}>
              <p className="text-base leading-relaxed text-slate-700">
                Thanks, that is confirmed. A specialist firm from our partner network will contact you
                directly.
              </p>
              <Link href="/" className={backLinkClass}>
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
      <section className={bodySection}>
        <div className={siteContainerLg}>
          <div className={bodyInner}>
            {nurtureArmed ? (
              <>
                <p className="text-base leading-relaxed text-slate-700">
                  We have just sent you a message to arrange your free startup finance review. Please
                  check your email and phone, and confirm to lock in your callback slot.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  For specialist tax advisory work, including complex structuring and tax planning, we work
                  closely with Aswatax, a firm of Chartered Tax Advisers. If your enquiry needs that level of
                  advice, it may be their team who contacts you.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Cannot see our email? Please check your spam or junk folder, and mark it as not spam so
                  our messages reach you.
                </p>
              </>
            ) : (
              <p className="text-base leading-relaxed text-slate-700">
                For specialist tax advisory work, including complex structuring and tax planning, we work
                closely with Aswatax, a firm of Chartered Tax Advisers. If your enquiry needs that level of
                advice, it may be their team who contacts you.
              </p>
            )}

            {bookingToken ? (
              <div className="mt-10 rounded-xl bg-white p-6 text-left ring-1 ring-slate-200/70 sm:p-8">
                <p className="mb-6 text-center text-base font-medium text-slate-900">
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
                  className={`font-medium text-primary-700 underline underline-offset-2 ${focusRing} rounded`}
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
