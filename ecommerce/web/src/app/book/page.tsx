import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, siteContainerLg, sectionY } from "@/components/ui/layout-utils";
import { SlimHero } from "@accounting-network/web-shared/design/primitives/SlimHero";
import { NoticeCard } from "@accounting-network/web-shared/design/primitives/NoticeCard";
import BookingPicker from "@/components/forms/BookingPicker";

/**
 * Standalone booking page, linked from every nurture SMS/email as
 * /book?t=<signed lead token>. Nobody on our side attends a calendar: the lead
 * is telling us when a specialist should call, and the act of booking is
 * the contactability signal that promotes them for handoff.
 */

export const metadata: Metadata = {
  title: "Book your free review",
  description: "Pick a time for your free call about your online selling accounts, VAT and tax.",
  robots: { index: false, follow: false },
};

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ t?: string }>;
}) {
  const params = await searchParams;
  const token = (params.t ?? "").trim();

  return (
    <>
      {/* ADOPTED: packages/web-shared/design/primitives/SlimHero.tsx, declined
          in phases 1 to 5 and correct here: its docblock names /book,
          /complete and /thank-you as the three pages it exists for. It takes
          no breadcrumb by design (this route is noindex, so a trail would be
          fiction) and no CTA row (the page has exactly one job below).

          HOST CONTRACT: the component already writes `relative overflow-hidden`
          on its own section and `relative z-10` on its own container, so the
          contract binds the `backdrop` slot, not the call site. No backdrop is
          passed: this site has no brick/texture motif component (a monorepo
          grep for HeroBrickBackdrop finds only sibling sites' own files), so
          the slot stays empty and nothing can paint over the copy.

          Eyebrow `onDark` is slate-300 on slate-900 = 11.90:1. That is the
          same branch phase 3 declined on the #8a5e1a brand hero at 3.83:1; the
          ground is what differs, not the component.

          Standfirst text-slate-300 on slate-900 = 11.90:1. */}
      <SlimHero eyebrow="Your callback" title="Book your free review call">
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
          Pick a day and a time window that suits you. A specialist will call you then, no
          obligation.
        </p>
      </SlimHero>

      {/* White, not a tinted band: the hero above is slate-900 and the kit
          footer is slate-900, so this page must not end on the hero. */}
      <section className={`bg-white ${sectionY}`}>
        <div className={siteContainerLg}>
          <div className="mx-auto max-w-2xl">
            {token ? (
              <BookingPicker token={token} />
            ) : (
              /* ADOPTED: packages/web-shared/design/primitives/NoticeCard.tsx,
                 declined five times on this site for having no outcome state
                 to carry. This IS one. `tone="slate"` is the neutral dead end
                 (no personal link), which is nobody's fault, and it renders
                 its children as nodes, not as an authored string, so the
                 escaped-markup class of defect cannot apply. */
              <NoticeCard>
                <p className="text-base leading-relaxed text-neutral-600">
                  This page needs the personal link from your email or text message. If you cannot
                  find it, use the contact form and we will arrange your review.
                </p>
                <Link href="/contact" className={`${btnPrimary} mt-6`}>
                  Go to the contact form
                </Link>
              </NoticeCard>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
