import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, btnSecondary, siteContainerLg, sectionY } from "@/components/ui/layout-utils";
import { isSafeReturnPath } from "@accounting-network/web-shared/leads/capture-steps";
import BookingPicker from "@/components/forms/BookingPicker";

export const metadata: Metadata = {
  title: `Thank you`,
  description: "Your enquiry has been received.",
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

  // Suppress unused-var lint: returnPath is available for future use (e.g. "back to article" CTA).
  void returnPath;

  return (
    <section className={`${sectionY} bg-[#fafaf7]`}>
      <div className={siteContainerLg}>
        <div className="max-w-2xl">
          {/* Endowed-progress: 3-step indicator showing where the lead is */}
          <ol className="mb-10 flex items-center gap-0 text-xs">
            <li className="flex items-center gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
                1
              </span>
              <span className="font-medium text-neutral-900">Enquiry received</span>
            </li>
            <span className="mx-2 flex-1 border-t border-neutral-300" aria-hidden="true" />
            <li className="flex items-center gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
                2
              </span>
              <span className="font-medium text-neutral-900">Details received</span>
            </li>
            <span className="mx-2 flex-1 border-t border-neutral-300" aria-hidden="true" />
            <li className="flex items-center gap-2">
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-bold ${
                  bookingToken
                    ? "bg-neutral-200 text-neutral-600"
                    : "bg-neutral-200 text-neutral-600"
                }`}
              >
                3
              </span>
              <span className="text-neutral-500">Pick your callback time</span>
            </li>
          </ol>

          <p className="font-mono text-xs uppercase tracking-widest text-orange-500">
            Received
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
            Thank you.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-neutral-600">
            Your message is with an accountant on the team. We aim to reply within one
            working day, usually the same day.
          </p>

          {bookingToken ? (
            <div className="mt-10 border border-neutral-200 bg-white p-6 shadow-sm">
              <p className="mb-6 text-base font-semibold text-neutral-900">
                Pick a time for your free review call
              </p>
              <p className="mb-6 text-sm text-neutral-600">
                Choose a day and window below. An accountant will call you then, no obligation.
              </p>
              <BookingPicker token={bookingToken} />
            </div>
          ) : (
            <>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                Need to add anything? Send a follow-up through the{" "}
                <Link
                  href="/contact"
                  className="font-medium text-neutral-900 underline underline-offset-4 hover:text-orange-600"
                >
                  contact form
                </Link>
                .
              </p>
              <div className="mt-12 flex flex-col gap-3 sm:flex-row">
                <Link href="/" className={btnPrimary}>
                  Back to home
                </Link>
                <Link href="/calculators" className={btnSecondary}>
                  Try the free calculators
                </Link>
              </div>
            </>
          )}

          {!bookingToken && (
            <p className="mt-8 text-sm text-neutral-500">
              Prefer to explore on your own?{" "}
              <Link href="/calculators" className="font-medium text-orange-600 underline underline-offset-4">
                Try the free calculators
              </Link>
              .
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
