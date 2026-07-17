import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, siteContainerLg, sectionY } from "@/components/ui/layout-utils";
import { isSafeReturnPath } from "@accounting-network/web-shared/leads/capture-steps";
import BookingPicker from "@/components/forms/BookingPicker";

export const metadata: Metadata = {
  title: "Thank you | We'll be in touch",
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
    <section className={`${sectionY} bg-white`}>
      <div className={siteContainerLg}>
        <div className="max-w-2xl">
          {/* Endowed-progress: 3-step indicator showing where the lead is */}
          <ol className="mb-10 flex items-center gap-0 text-xs">
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

          <p className="font-mono text-xs uppercase tracking-widest text-cyan-700">
            Received
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
            Thank you.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-neutral-600">
            We have received your enquiry and will come back to you within one working day. You will hear from a specialist contractor accountant, not a sales team.
          </p>

          {bookingToken ? (
            <div className="mt-10 border border-neutral-200 bg-white p-6 shadow-sm">
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
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                In the meantime, you might find our IR35 guides useful.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link href="/blog" className={btnPrimary}>
                  Browse IR35 guides
                </Link>
                <Link
                  href="/"
                  className="inline-flex min-h-12 items-center text-sm font-medium text-neutral-700 underline decoration-cyan-700 underline-offset-4 hover:text-neutral-900"
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
                className="font-medium text-cyan-700 underline underline-offset-4 hover:text-cyan-800"
              >
                contact form
              </Link>
              .
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
