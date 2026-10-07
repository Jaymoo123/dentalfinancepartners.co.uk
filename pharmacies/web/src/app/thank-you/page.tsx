import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { SlimHero } from "@accounting-network/web-shared/design/primitives/SlimHero";
import BookingPicker from "@/components/forms/BookingPicker";
import { isSafeReturnPath } from "@accounting-network/web-shared/leads/capture-steps";
import { siteContainerLg, sectionY } from "@/components/ui/layout-utils";
import PharmaciesBackdrop from "@/components/layout/PharmaciesBackdrop";
import { siteConfig } from "@/config/site";

/**
 * CHROME ONLY. Every sentence below is the pre-port copy, byte for byte,
 * including the Aswatax post-submit intro, which is deliberate, verified live
 * estate-wide, and never shown pre-submit. The three h1 strings are the
 * pre-port h1 strings, moved into SlimHero's `title` rather than reworded. The
 * one string authored here is the `eyebrow`, "Your enquiry", which the
 * primitive requires; it is byte-identical to startups-tech's own mount on this
 * route and is handed to the manager in the receipt as a candidate
 * niche.config.json key.
 *
 * `data-cta="thankyou-return-article"` and `data-cta-placement="thank_you"` on
 * the return link are preserved byte for byte: that pair is live segmentation.
 *
 * ADOPTED: packages/web-shared/design/primitives/SlimHero.tsx, scoped by its
 * own docblock (:5-13) to exactly these three token-gated post-submit pages.
 * It carries no breadcrumb by design, which is right: this route is noindex.
 *
 * ADOPTION DECLINED: packages/web-shared/design/primitives/NoticeCard.tsx.
 * Adopted on /book and /complete, where one outcome card IS the whole payload.
 * Here the body is a stack of three paragraphs and, on one branch, the booking
 * picker; NoticeCard bakes in `text-center` and a single `ring-1` panel (:38),
 * so boxing that stack would centre the picker's day-and-time grid and read as
 * one disclaimer wrapping three different jobs.
 * ADOPTION DECLINED: packages/web-shared/design/marketing/WhatToExpectCard.tsx.
 * Its `items` must be passed explicitly (defaults publish a fee line this site
 * never promises, :22-27) and the three paragraphs this route publishes are
 * prose, not a four-item list. Mapping them would mean writing four new
 * sentences.
 */

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
  alternates: { canonical: `${siteConfig.url}/thank-you` },
};

/**
 * One shell for all three branches, so the hero, the ground sequence and the
 * container cannot drift between them. White body, not a tinted band: the hero
 * is slate-900 and the kit footer is slate-900, so this page must not end on
 * the hero.
 *
 * Kit ground `bg-slate-900` is the one ground PharmaciesBackdrop was measured
 * on in phase 1, so no new contrast row is owed and `sectionClassName` is
 * deliberately not passed.
 */
function ThankYouShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <SlimHero
        eyebrow="Your enquiry"
        title={title}
        backdrop={<PharmaciesBackdrop patternId="pharmacies-dispensary-shelving-thank-you" />}
      />
      <section className={`bg-white ${sectionY}`}>
        <div className={siteContainerLg}>
          <div className="mx-auto max-w-2xl">{children}</div>
        </div>
      </section>
    </>
  );
}

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
      <ThankYouShell title="You will not hear from us again about this enquiry">
        <p className="text-base leading-relaxed text-slate-600">
          We have stopped the reminders. If you change your mind, the contact form is always open.
        </p>
        <Link href="/" className="mt-8 inline-block font-medium underline">
          Back to the homepage
        </Link>
      </ThankYouShell>
    );
  }

  if (confirmed) {
    return (
      <ThankYouShell title="Confirmed">
        <p className="text-base leading-relaxed text-slate-600">
          Thanks, that is confirmed. One of our pharmacy accounting specialists will contact you
          directly.
        </p>
        <Link href="/" className="mt-8 inline-block font-medium underline">
          Back to the homepage
        </Link>
      </ThankYouShell>
    );
  }

  return (
    <ThankYouShell title="Thanks, your enquiry is on its way.">
      {nurtureArmed ? (
        <>
          <p className="text-base leading-relaxed text-slate-600">
            We have just sent you a message to arrange your free pharmacy finance review. Please
            check your email and phone, and confirm to lock in your callback slot.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            For specialist tax advisory work, including practice structuring and tax planning, we
            work closely with Aswatax, a firm of Chartered Tax Advisers. If your enquiry needs
            that level of advice, it may be their team who contacts you.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Cannot see our email? Please check your spam or junk folder, and mark it as not spam so
            our messages reach you.
          </p>
        </>
      ) : (
        <p className="text-base leading-relaxed text-slate-600">
          For specialist tax advisory work, including practice structuring and tax planning, we
          work closely with Aswatax, a firm of Chartered Tax Advisers. If your enquiry needs that
          level of advice, it may be their team who contacts you. You can also pick a callback
          time below.
        </p>
      )}

      {bookingToken && (
        <div className="mt-10 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200/70 sm:p-8">
          <p className="mb-6 text-base font-semibold text-slate-900">
            Want to skip the back and forth? Pick a time for your call now.
          </p>
          <BookingPicker token={bookingToken} />
        </div>
      )}

      <div className="mt-8 flex flex-col items-start gap-3">
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
    </ThankYouShell>
  );
}
