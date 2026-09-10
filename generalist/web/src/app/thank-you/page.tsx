import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { btnSecondary, siteContainerLg } from "@/components/ui/layout-utils";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { NoticeCard } from "@accounting-network/web-shared/design/primitives/NoticeCard";
import { SlimHero } from "@accounting-network/web-shared/design/primitives/SlimHero";
import { WhatToExpectCard } from "@accounting-network/web-shared/design/marketing/WhatToExpectCard";
import { RelatedArticles } from "@accounting-network/web-shared/design/blog/RelatedArticles";
import { GeneralistBackdrop } from "@/components/layout/GeneralistBackdrop";
import { pageSummary } from "@/lib/page-summaries";
import { isSafeReturnPath } from "@accounting-network/web-shared/leads/capture-steps";
import BookingPicker from "@/components/forms/BookingPicker";

export const metadata: Metadata = {
  title: `Thank you`,
  description: "Your enquiry has been received.",
  robots: { index: false, follow: true },
};

/**
 * The "while you wait" reading row.
 *
 * Every destination is in `PAGE_SUMMARIES`, so each card carries the page's own
 * one-line summary rather than a bare title, and the sentence has one home.
 * No `/calculators/<slug>` here deliberately: a calculator never gets a card.
 */
const WHILE_YOU_WAIT = [
  { href: "/fundamentals", title: "The pillar guides for UK business owners" },
  { href: "/uk-tax-rates", title: "Every UK tax rate for the current tax year" },
  { href: "/guides", title: "Practical guides: year-end, switching, first 90 days" },
].map((item) => ({ ...item, excerpt: pageSummary(item.href) }));

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ bt?: string; rt?: string; confirmed?: string }>;
}) {
  const params = await searchParams;
  // `confirmed=1` is the only extra branch emitted anywhere on this site
  // (api/leads/confirm/[token] redirects 303 to it). There is no `optout=1`
  // branch because the opt-out route renders its own page and never lands here.
  const confirmed = params.confirmed === "1";
  const bookingToken = (params.bt ?? "").trim() || null;
  const rawRt = params.rt ?? "";
  const returnPath = isSafeReturnPath(rawRt) ? rawRt : null;

  if (confirmed) {
    return (
      <>
        <SlimHero
          eyebrow="Confirmed"
          title="That is confirmed"
          backdrop={<GeneralistBackdrop />}
        >
          <p className="mt-4 text-base leading-relaxed text-slate-300 sm:mt-6 sm:text-lg">
            Thanks, that is confirmed. An accountant will be in touch.
          </p>
        </SlimHero>

        <section className="bg-white py-12 sm:py-16 lg:py-20">
          <div className={siteContainerLg}>
            <div className="max-w-3xl">
              <Eyebrow>While you wait</Eyebrow>
              <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">Where to next</h2>
              <p className="mt-4 text-base leading-relaxed text-slate-700">
                Nothing else is needed from you. If it is useful in the meantime, these go deeper on
                the questions that come up most in a first call.
              </p>
            </div>
            <RelatedArticles className="mt-8 sm:mt-10" columns={3} items={WHILE_YOU_WAIT} />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link href="/blog" className={btnSecondary}>
                All articles and guides
              </Link>
              <Link href="/" className={btnSecondary}>
                Back to home
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <SlimHero eyebrow="Enquiry received" title="Thank you" backdrop={<GeneralistBackdrop />}>
        {/* Carve-out: this paragraph is byte-intact generalist copy. Only its
            position moved. Never synced to Property's variant. */}
        <p className="mt-4 text-base leading-relaxed text-slate-300 sm:mt-6 sm:text-lg">
          For specialist tax advisory work, including complex structuring and tax planning, we
          work closely with Aswatax, a firm of Chartered Tax Advisers. If your enquiry needs
          that level of advice, it may be their team who contacts you.
        </p>
      </SlimHero>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <Eyebrow>Almost done</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">One step left</h2>
          </div>

          {/* Endowed progress: steps 1 and 2 are genuinely done, so picking a
              time reads as finishing a nearly-complete journey. Nothing rests on
              hue: every step is direct-labelled. */}
          <ol className="mt-8 grid gap-3 sm:grid-cols-3 sm:gap-4">
            {[
              { label: "Enquiry received", done: true },
              { label: "Details received", done: true },
              { label: "Pick your callback time", done: false },
            ].map((step, i) => (
              <li
                key={step.label}
                {...(step.done ? {} : { "aria-current": "step" as const })}
                className={`flex items-center gap-3 rounded-xl p-4 ring-1 ${
                  step.done ? "bg-slate-50 ring-slate-200/70" : "bg-white ring-primary-600"
                }`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                    step.done
                      ? "bg-primary-600 text-white"
                      : "border-2 border-primary-600 bg-white text-primary-700"
                  }`}
                >
                  {step.done ? <Check aria-hidden className="h-4 w-4" strokeWidth={3} /> : i + 1}
                </span>
                <span
                  className={`text-sm ${step.done ? "font-semibold text-slate-600" : "font-bold text-slate-900"}`}
                >
                  {i + 1}. {step.label}
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-8 grid gap-8 sm:mt-10 sm:gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
            <div>
              {bookingToken ? (
                /* bg-slate-50 on a white section: a white card here would have
                   no edge. */
                <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200/70 sm:p-8">
                  <p className="mb-6 text-base font-semibold text-slate-900">
                    Want to skip the back and forth? Pick a time for your call now.
                  </p>
                  <BookingPicker token={bookingToken} />
                </div>
              ) : (
                /* No token means the submit route could not mint one. Do NOT
                   offer "book a time" here: the only place it could send them is
                   /contact, the form they have just filled in. */
                <NoticeCard tone="primary" title="That is everything we need">
                  <p className="text-base leading-relaxed text-slate-700">
                    Your enquiry is with us and an accountant will be in touch. There is nothing
                    else for you to do. Need to add anything? Send a follow-up through the{" "}
                    <Link
                      href="/contact"
                      className="font-semibold text-primary-700 underline underline-offset-2 hover:text-primary-800"
                    >
                      contact form
                    </Link>
                    .
                  </p>
                </NoticeCard>
              )}
            </div>

            <div className="space-y-6">
              <WhatToExpectCard
                title="What the call covers"
                items={[
                  "About twenty minutes, by phone, at the time you pick",
                  "Your accountant has read your enquiry before they ring",
                  "Where you stand on your structure, pay, VAT or year-end",
                  "A fixed fee quote only if you want to go further",
                  "If your position is already right, we will say so",
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <Eyebrow>While you wait</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">Where to next</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              Nothing else is needed from you. If it is useful before the call, these go deeper on
              the questions that come up most in a first conversation.
            </p>
          </div>
          <RelatedArticles className="mt-8 sm:mt-10" columns={3} items={WHILE_YOU_WAIT} />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Link href="/blog" className={btnSecondary}>
              All articles and guides
            </Link>
            {returnPath && (
              /* Revives the previously dead `rt` param. data-cta and
                 data-cta-placement feed vw_cta_performance; dropping either
                 silently kills a funnel row. */
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
