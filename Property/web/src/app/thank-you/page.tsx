import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { btnPrimary, btnSecondary, siteContainerLg } from "@/components/ui/layout-utils";
import { Eyebrow } from "@/components/ui/page-blocks";
import { NoticeCard } from "@/components/ui/NoticeCard";
import { SlimHero } from "@/components/ui/SlimHero";
import { WhatToExpectCard } from "@/components/property/WhatToExpectCard";
import { RelatedArticles } from "@/components/blog/RelatedArticles";
import { relatedItemsFromLinks } from "@/lib/blog";
import { siteConfig } from "@/config/site";
import BookingPicker from "@/components/forms/BookingPicker";
import { isSafeReturnPath } from "@/lib/leads/capture-steps";

export const metadata: Metadata = {
  title: `Thank you`,
  description: "Your enquiry has been received.",
  robots: { index: false, follow: true },
  twitter: {
    card: "summary_large_image",
    title: `Thank you | ${siteConfig.name}`,
    description: "Your enquiry has been received.",
  },
};

/**
 * The post-submit surface, on the shipped page skeleton (DESIGN_SYSTEM §4b).
 *
 * It was the last pre-redesign page on the site: no hero, no brick backdrop,
 * square corners throughout, a `bg-emerald-600 p-6` block for the tick, and
 * `btnSecondary` reimplemented inline four times as `border-2 border-slate-300`.
 * Every branch below is the one that was already here. Only the treatment moved.
 *
 * `LeadCTAPanel` is deliberately NOT here, which is the one place this page
 * departs from §4b: the reader has just submitted the form, so the closing ask
 * is the callback slot, not a second enquiry form.
 *
 * Grounds on every branch: navy hero, then light. Nothing navy is allowed to
 * land on the navy footer (§9), which is why even the two short branches carry
 * a light section under the hero rather than ending on it.
 */

/**
 * The "while you wait" reading row.
 *
 * All three routes are in `PAGE_SUMMARIES`, so `relatedItemsFromLinks` resolves
 * a real excerpt for each rather than rendering a bare title. The labels are
 * curated anchor text and stay as the card titles (§2, carve-out 5).
 *
 * `kind` is set explicitly on the two pillars: `/landlord-tax` and `/section-24`
 * sit at the top level, so `kindFromHref` cannot tell they are guides (§2).
 *
 * No `/calculators/<slug>` here, deliberately. A calculator never gets a card
 * (§2); if a tool belongs on this page it belongs as a `CalculatorTabs` block.
 */
const WHILE_YOU_WAIT = [
  { href: "/landlord-tax", label: "Landlord tax explained: what you pay in 2026/27", kind: "guide" as const },
  { href: "/section-24", label: "Section 24 and mortgage interest relief", kind: "guide" as const },
  { href: "/services/property-tax-advice", label: "What a property tax consultation covers" },
];

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
        <SlimHero eyebrow="Unsubscribed" title="You will not hear from us again about this enquiry">
          <p className="mt-4 text-base leading-relaxed text-slate-300 sm:mt-6 sm:text-lg">
            We have stopped the reminders. Nothing further will be sent about this enquiry.
          </p>
        </SlimHero>

        {/* The ONE section on this page with no visual, deliberately. §0.2 is a
            rule about body sections that sell; this is an unsubscribe
            confirmation, and putting a reading grid in front of someone who has
            just asked us to stop would be exactly the wrong read. */}
        <section className="bg-white py-12 sm:py-16 lg:py-20">
          <div className={siteContainerLg}>
            <div className="max-w-3xl">
              <Eyebrow>If you change your mind</Eyebrow>
              <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">The contact form is always open</h2>
              <p className="mt-4 text-base leading-relaxed text-slate-700">
                Opting out of the reminders does not close the door. Start a new enquiry whenever the question
                comes back round, and it reaches the same specialists.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
              <Link href="/contact" className={btnPrimary}>
                Start a new enquiry
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

  if (confirmed) {
    return (
      <>
        <SlimHero eyebrow="Confirmed" title="That is confirmed">
          <p className="mt-4 text-base leading-relaxed text-slate-300 sm:mt-6 sm:text-lg">
            Thanks, that is confirmed. A specialist will be in touch.
          </p>
        </SlimHero>

        <section className="bg-white py-12 sm:py-16 lg:py-20">
          <div className={siteContainerLg}>
            <div className="max-w-3xl">
              <Eyebrow>While you wait</Eyebrow>
              <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">Where to next</h2>
              <p className="mt-4 text-base leading-relaxed text-slate-700">
                Nothing else is needed from you. If it is useful in the meantime, the guides go deeper on the
                questions that come up most in a first call.
              </p>
            </div>
            <RelatedArticles
              className="mt-8 sm:mt-10"
              columns={3}
              items={relatedItemsFromLinks(WHILE_YOU_WAIT)}
            />
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
      <SlimHero eyebrow="Enquiry received" title="Thank you">
        {nurtureArmed ? (
          <>
            <p className="mt-4 text-base leading-relaxed text-slate-300 sm:mt-6 sm:text-lg">
              We have just sent you a message to arrange your free review. Please check your email and phone,
              and confirm to lock in your callback slot.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              Your message is with our team. We aim to respond within 24 hours, usually same day.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Cannot see our email? Please check your spam or junk folder, and mark it as not spam so our
              messages reach you.
            </p>
          </>
        ) : (
          <p className="mt-4 text-base leading-relaxed text-slate-300 sm:mt-6 sm:text-lg">
            Your enquiry is with our team. We will be in touch within one working day, usually the same day.
            You can also pick a callback time below.
          </p>
        )}
      </SlimHero>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <Eyebrow>Almost done</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">One step left</h2>
          </div>

          {/* Endowed progress: steps 1 and 2 are genuinely done (the submit route
              verifies details in real time), so picking a time reads as finishing
              a nearly-complete journey rather than starting a new one.

              Colour is meaning (§5 rule 3): emerald filled for what is done,
              emerald outline for the step the reader is standing on. Nothing here
              rests on hue, because each step is direct-labelled. */}
          <ol className="mt-8 grid gap-3 sm:grid-cols-3 sm:gap-4">
            {[
              { label: "Enquiry received", done: true },
              { label: "Details verified", done: true },
              { label: "Pick your callback time", done: false },
            ].map((step, i) => (
              <li
                key={step.label}
                {...(step.done ? {} : { "aria-current": "step" as const })}
                className={`flex items-center gap-3 rounded-xl p-4 ring-1 ${
                  step.done ? "bg-slate-50 ring-slate-200/70" : "bg-white ring-emerald-600"
                }`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                    step.done
                      ? "bg-emerald-600 text-white"
                      : "border-2 border-emerald-600 bg-white text-emerald-700"
                  }`}
                >
                  {step.done ? <Check aria-hidden className="h-4 w-4" strokeWidth={3} /> : i + 1}
                </span>
                <span className={`text-sm ${step.done ? "font-semibold text-slate-600" : "font-bold text-slate-900"}`}>
                  {i + 1}. {step.label}
                </span>
              </li>
            ))}
          </ol>

          {/* Two columns, the /contact anatomy, so the reassurance sits beside
              the picker instead of below the fold and the section uses the full
              container honestly. */}
          <div className="mt-8 grid gap-8 sm:mt-10 sm:gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
            <div>
              {bookingToken ? (
                /* bg-slate-50 on a white section: a white card here would have
                   no edge (§4a rule 3). */
                <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200/70 sm:p-8">
                  <p className="mb-6 text-base font-semibold text-slate-900">
                    Want to skip the back and forth? Pick a time for your call now.
                  </p>
                  <BookingPicker token={bookingToken} />
                </div>
              ) : (
                /* No token means the submit route could not mint one, which in
                   practice means LEAD_NURTURE_TOKEN_SECRET is unset. Do NOT
                   offer "book a time" here: the only place it could send them is
                   /contact, which is the form they have just filled in. Say what
                   is actually true instead. */
                <NoticeCard tone="emerald" title="That is everything we need">
                  <p className="text-base leading-relaxed text-slate-700">
                    Your enquiry is with our team and a property tax specialist will be in touch
                    within one working day, usually the same day. There is nothing else for you to
                    do.
                  </p>
                </NoticeCard>
              )}
            </div>

            <div className="space-y-6">
              <WhatToExpectCard
                title="What the call covers"
                items={[
                  "About twenty minutes, by phone, at the time you pick",
                  "Your specialist has read your enquiry before they ring",
                  "Where you stand on Section 24, CGT, MTD or incorporation",
                  "A fixed fee quote only if you want to go further",
                  "If your position is already right, we will say so",
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* §0.2: a section does not ship as prose alone. This was a standfirst and
          a row of three buttons, which is exactly the wall-of-text-plus-links
          shape the rule exists to stop. `RelatedArticles` is the site's one card
          grid, so the reading list is a visual and every item is a real crawlable
          link rather than a button. */}
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
          <RelatedArticles className="mt-8 sm:mt-10" columns={3} items={relatedItemsFromLinks(WHILE_YOU_WAIT)} />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Link href="/blog" className={btnSecondary}>
              All articles and guides
            </Link>
            {returnPath && (
              /* data-cta / data-cta-placement feed vw_cta_performance. Moving the
                 link is fine; dropping either attribute silently kills a funnel
                 row (§7). */
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
