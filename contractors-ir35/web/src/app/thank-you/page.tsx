import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, siteContainerLg } from "@/components/ui/layout-utils";
import { SlimHero } from "@accounting-network/web-shared/design/primitives/SlimHero";
import { isSafeReturnPath } from "@accounting-network/web-shared/leads/capture-steps";
import BookingPicker from "@/components/forms/BookingPicker";

export const metadata: Metadata = {
  title: "Thank you | Your enquiry is on its way",
  description:
    "Thank you for contacting Contractor Tax Accountants. We have received your enquiry and a specialist contractor accountant will be in touch shortly.",
  robots: { index: false, follow: true },
};

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ bt?: string; rt?: string; confirmed?: string; optout?: string }>;
}) {
  const params = await searchParams;
  const bookingToken = (params.bt ?? "").trim() || null;
  const rawRt = params.rt ?? "";
  const returnPath = isSafeReturnPath(rawRt) ? rawRt : null;

  // Suppress unused-var lint: returnPath is available for future use.
  void returnPath;

  return (
    <>
      <SlimHero eyebrow="Received" title="Thank you." />

      {/* The endowed-progress indicator opens the body rather than the hero.
          The recorded anatomy puts it inside the hero above the eyebrow, which
          the shared `SlimHero` cannot express (it exposes `eyebrow`, `title`,
          `children` and `backdrop`, nothing above the eyebrow) and whose navy
          ground the indicator's light-ground colours would fail on. Recorded in
          P6-1_SECONDARY_LEGAL.md. */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <ol className="flex max-w-2xl items-center gap-0 text-xs">
            <li className="flex items-center gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500 font-bold text-white">
                1
              </span>
              <span className="font-medium text-neutral-900">Enquiry received</span>
            </li>
            <span className="mx-2 flex-1 border-t border-neutral-300" aria-hidden="true" />
            <li className="flex items-center gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500 font-bold text-white">
                2
              </span>
              <span className="font-medium text-neutral-900">Details received</span>
            </li>
            <span className="mx-2 flex-1 border-t border-neutral-300" aria-hidden="true" />
            <li className="flex items-center gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-200 font-bold text-neutral-600">
                3
              </span>
              <span className="text-neutral-500">Pick your callback time</span>
            </li>
          </ol>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-600">
            For specialist tax advisory work, including complex structuring and tax planning, we
            work closely with Aswatax, a firm of Chartered Tax Advisers. If your enquiry needs
            that level of advice, it may be their team who contacts you.
          </p>

          {/* The picker card's ground is the opposite of its section's (§0.1):
              a white card on a white section has no edge. */}
          {bookingToken ? (
            <div className="mt-10 rounded-xl bg-neutral-50 p-6 ring-1 ring-neutral-200/70 sm:p-8">
              <p className="mb-6 text-base font-semibold text-neutral-900">
                Pick a time for your free IR35 review call
              </p>
              <p className="mb-6 text-sm text-neutral-600">
                Choose a day and window below. An accountant will call you then, no obligation.
              </p>
              <BookingPicker token={bookingToken} />
            </div>
          ) : (
            <>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600">
                In the meantime, you might find our IR35 guides useful.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link href="/blog" className={`${btnPrimary} rounded-xl`}>
                  Browse IR35 guides
                </Link>
                <Link
                  href="/"
                  className="inline-flex min-h-12 items-center text-sm font-medium text-neutral-700 underline decoration-primary-600 underline-offset-4 hover:text-neutral-900"
                >
                  Back to home
                </Link>
              </div>
            </>
          )}

          {!bookingToken && (
            <p className="mt-8 text-sm text-neutral-500">
              Need to add anything? Send a follow-up through the{" "}
              <Link
                href="/contact"
                className="font-medium text-primary-600 underline underline-offset-4 hover:text-primary-700"
              >
                contact form
              </Link>
              .
            </p>
          )}
        </div>
      </section>
    </>
  );
}
