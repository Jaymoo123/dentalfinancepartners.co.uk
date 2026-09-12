import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { btnPrimary, btnSecondary, siteContainerLg } from "@/components/ui/layout-utils";
import { NoticeCard } from "@/components/ui/NoticeCard";
import { WhatToExpectCard } from "@/components/ui/WhatToExpectCard";
import { isSafeReturnPath } from "@accounting-network/web-shared/leads/capture-steps";
import BookingPicker from "@/components/forms/BookingPicker";

/**
 * The post-submit surface, on the F.6 skeleton shared with /book and /complete:
 * shallow cream hero, then one white section carrying the job in a [1.6fr_1fr]
 * two-column body. Every branch below is the one that was already here; only the
 * treatment moved.
 *
 * There is deliberately no LeadCTAPanel: the reader has just submitted the form,
 * so the closing ask is the callback slot, not a second enquiry form.
 *
 * `?rt=` is revived. The page computed `returnPath` and then threw it away with
 * `void returnPath;`, so a reader who enquired from an article had no way back
 * to it. It renders as a plain secondary link and carries NO `data-cta`: every
 * declared triple on this site is pinned in cta-attribute-diff.test.ts, and a
 * new id here would be a snapshot change this package is not allowed to make.
 */

export const metadata: Metadata = {
  title: "Thank you | Your enquiry is on its way",
  description:
    "Thanks for contacting Trade Tax Specialists. A specialist CIS accountant will be in touch to arrange a short call.",
  robots: { index: false },
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

  const steps = [
    { label: "Enquiry received", done: true },
    { label: "Details received", done: true },
    { label: "Pick your callback time", done: false },
  ];

  return (
    <>
      <section className="bg-[var(--hero-cream)] py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <div className="section-label mb-6">Received</div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Thank you.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-neutral-600">
              For specialist tax advisory work, including complex structuring and tax planning, we
              work closely with Aswatax, a firm of Chartered Tax Advisers. If your enquiry needs
              that level of advice, it may be their team who contacts you.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <div className="section-label mb-4">Almost done</div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              One step left
            </h2>
          </div>

          {/* Endowed progress. The ordinal is the point, so it stays an <ol> and
              every label keeps its visible number: a done step renders a tick
              AND its number in the label, never a tick alone. Three identical
              ticks would turn a sequence into a set. The step the reader is
              standing on carries aria-current="step". Nothing rests on hue: each
              step is direct-labelled. */}
          <ol className="mt-8 grid gap-3 sm:grid-cols-3 sm:gap-4">
            {steps.map((step, i) => (
              <li
                key={step.label}
                {...(step.done ? {} : { "aria-current": "step" as const })}
                className={`flex items-center gap-3 rounded-xl p-4 ring-1 ${
                  step.done
                    ? "bg-[var(--surface)] ring-neutral-200"
                    : "bg-white ring-[var(--btn-ground)]"
                }`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                    step.done
                      ? "bg-[var(--btn-ground)] text-white"
                      : "border-2 border-[var(--btn-ground)] bg-white text-[var(--accent-strong)]"
                  }`}
                >
                  {step.done ? <Check aria-hidden className="h-4 w-4" strokeWidth={3} /> : i + 1}
                </span>
                <span
                  className={`text-sm ${
                    step.done ? "font-semibold text-neutral-600" : "font-bold text-slate-900"
                  }`}
                >
                  {i + 1}. {step.label}
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-8 grid gap-8 sm:mt-10 sm:gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
            <div>
              {bookingToken ? (
                /* --surface on a white section: a white card here would have no
                   edge. */
                <div className="rounded-xl bg-[var(--surface)] p-6 ring-1 ring-neutral-200 sm:p-8">
                  <p className="text-base font-semibold text-slate-900">
                    Pick a time for your free review call
                  </p>
                  <p className="mt-2 mb-6 text-sm text-neutral-600">
                    Choose a day and window below. A specialist will call you then, no obligation.
                  </p>
                  <BookingPicker token={bookingToken} />
                </div>
              ) : (
                /* No token means the submit route could not mint one. Do NOT
                   offer "book a time" here: the only place it could send them is
                   /contact, the form they have just filled in. */
                <NoticeCard tone="accent" title="That is everything we need">
                  <p className="text-base leading-relaxed text-slate-700">
                    Your enquiry is with us and a specialist CIS accountant will be in touch to
                    arrange your free review. There is nothing else for you to do. Need to add
                    anything? Send a follow-up through the{" "}
                    <Link
                      href="/contact"
                      className="font-semibold text-[var(--accent-strong)] underline underline-offset-4"
                    >
                      contact form
                    </Link>
                    .
                  </p>
                </NoticeCard>
              )}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <Link href="/blog" className={bookingToken ? btnSecondary : btnPrimary}>
                  Browse CIS guides
                </Link>
                <Link href="/" className={btnSecondary}>
                  Back to home
                </Link>
                {returnPath && (
                  <Link href={returnPath} className={btnSecondary}>
                    Back to the page you were reading
                  </Link>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <WhatToExpectCard
                title="What the call covers"
                items={[
                  "About twenty minutes, by phone, in the window you pick",
                  "Your specialist will have read your enquiry before they ring",
                  "Where you stand on CIS deductions, refunds and gross payment status",
                  "No obligation, and no work starts until you agree the scope",
                  "If your position is already right, we will say so",
                ]}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
