import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { btnPrimary, btnSecondary, siteContainerLg } from "@/components/ui/layout-utils";
import { MedicalBackdrop } from "@/components/layout/MedicalBackdrop";
import { SlimHero } from "@accounting-network/web-shared/design/primitives/SlimHero";
import BookingPicker from "@/components/forms/BookingPicker";
import { isSafeReturnPath } from "@accounting-network/web-shared/leads/capture-steps";

/**
 * The post-submit surface, on the F.6 skeleton: `SlimHero`, then light sections.
 * Every branch below is the one that was already here; only the treatment moved.
 *
 * F.6's departures are honoured: no `LeadCTAPanel` (the reader has just
 * submitted the form, so the closing ask is the callback slot, not a second
 * enquiry form), no breadcrumb (noindex), a shallow hero with no CTA row, and
 * no tick badge, so the old `CheckIcon` is deleted rather than restyled.
 *
 * Grounds: navy hero, then light. Nothing navy may land on the navy footer,
 * which is why even the two short branches carry a light section.
 *
 * THE ASWATAX PARAGRAPHS ARE OWNER-APPROVED POST-SUBMIT COPY (deployed
 * 2026-09-09 across the estate) and are byte-unchanged here. They are correctly
 * post-submit only and must never be moved anywhere pre-submit.
 *
 * `SlimHero.eyebrow` is required and has no default. "Enquiry received" is the
 * only string added, and it already exists verbatim on this route as step 1 of
 * the progress list. Every h1 and standfirst is byte-identical to the pre-port
 * page, so the fallback is a one-line revert.
 */

export const metadata: Metadata = {
  title: `Thank you`,
  description: "Your enquiry has been received.",
  robots: { index: false, follow: true },
};

/** Endowed progress: steps 1 and 2 are done, step 3 is the job on this page. */
const STEPS = [
  { label: "1. Enquiry received", done: true },
  { label: "2. Details received", done: true },
  { label: "3. Pick your callback time", done: false },
];

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
      <>
        <SlimHero
          eyebrow="Enquiry received"
          title="You will not hear from us again about this enquiry"
          backdrop={<MedicalBackdrop tone="navy" />}
        >
          <p className="mt-4 text-base leading-relaxed text-slate-300 sm:mt-6 sm:text-lg">
            We have stopped the reminders. If you change your mind, the contact form is always
            open.
          </p>
        </SlimHero>

        <section className="bg-white py-12 sm:py-16 lg:py-20">
          <div className={siteContainerLg}>
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <Link href="/" className={btnPrimary}>
                Back to home
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
        <SlimHero
          eyebrow="Enquiry received"
          title="Confirmed"
          backdrop={<MedicalBackdrop tone="navy" />}
        >
          <p className="mt-4 text-base leading-relaxed text-slate-300 sm:mt-6 sm:text-lg">
            Thanks, that is confirmed. A specialist firm from our partner network will contact you directly.
          </p>
        </SlimHero>

        <section className="bg-white py-12 sm:py-16 lg:py-20">
          <div className={siteContainerLg}>
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <Link href="/" className={btnPrimary}>
                Back to home
              </Link>
              <Link href="/calculators" className={btnSecondary}>
                Explore our calculators
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <SlimHero
        eyebrow="Enquiry received"
        title="Thank you"
        backdrop={<MedicalBackdrop tone="navy" />}
      >
        {nurtureArmed ? (
          <>
            <p className="mt-4 text-base leading-relaxed text-slate-300 sm:mt-6 sm:text-lg">
              We have just sent you a message to arrange your free review. Please check your
              email and phone, and confirm to lock in your callback slot.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              For specialist tax advisory work, including practice structuring and tax planning,
              we work closely with Aswatax, a firm of Chartered Tax Advisers. If your enquiry
              needs that level of advice, it may be their team who contacts you.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Cannot see our email? Please check your spam or junk folder, and mark it as not
              spam so our messages reach you.
            </p>
          </>
        ) : (
          <p className="mt-4 text-base leading-relaxed text-slate-300 sm:mt-6 sm:text-lg">
            For specialist tax advisory work, including practice structuring and tax planning,
            we work closely with Aswatax, a firm of Chartered Tax Advisers. If your enquiry
            needs that level of advice, it may be their team who contacts you. You can also pick
            a callback time below.
          </p>
        )}
      </SlimHero>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          {/* Colour is meaning: brand-filled for what is done, brand outline for
              the step the reader is standing on. Nothing rests on hue, because
              every step is direct-labelled. */}
          <ol className="grid gap-3 sm:grid-cols-3 sm:gap-4">
            {STEPS.map((step, i) => (
              <li
                key={step.label}
                {...(step.done ? {} : { "aria-current": "step" as const })}
                className={`flex items-center gap-3 rounded-xl p-4 ring-1 ${
                  step.done ? "bg-slate-50 ring-slate-200/70" : "bg-white ring-[var(--btn-ground)]"
                }`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                    step.done
                      ? "bg-[var(--btn-ground)] text-white"
                      : "border-2 border-[var(--btn-ground)] bg-white text-[var(--copper-deep)]"
                  }`}
                >
                  {step.done ? <Check aria-hidden className="h-4 w-4" strokeWidth={3} /> : i + 1}
                </span>
                <span
                  className={`text-sm ${
                    step.done ? "font-semibold text-slate-600" : "font-bold text-slate-900"
                  }`}
                >
                  {step.label}
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-8 sm:mt-10">
            {bookingToken ? (
              /* slate-50 card on a white section, so it has an edge. */
              <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200/70 sm:p-8">
                <p className="mb-6 text-base font-semibold text-slate-900">
                  Want to skip the back and forth? Pick a time for your call now.
                </p>
                <BookingPicker token={bookingToken} />
              </div>
            ) : (
              <>
                <p className="mb-4 text-sm font-semibold text-slate-700">
                  Ready to book a time that works for you?
                </p>
                <Link href="/contact" className={btnPrimary}>
                  Book your free review
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <Link href="/" className={btnSecondary}>
              Back to home
            </Link>
            <Link href="/calculators" className={btnSecondary}>
              Explore our calculators
            </Link>
            {returnPath && (
              /* data-cta / data-cta-placement feed vw_cta_performance. Moving the
                 link is fine; dropping either attribute kills a funnel row. */
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
      </section>
    </>
  );
}
