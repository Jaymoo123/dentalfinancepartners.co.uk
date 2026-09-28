import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, siteContainerLg, sectionY } from "@/components/ui/layout-utils";
import { SlimHero } from "@accounting-network/web-shared/design/primitives/SlimHero";
import { NoticeCard } from "@accounting-network/web-shared/design/primitives/NoticeCard";
import { verifyLeadToken, mintLeadToken } from "@accounting-network/web-shared/lead-nurture/tokens";
import { computeMissingContact } from "@accounting-network/web-shared/lead-nurture/lead-nurture-shared";
import { adminSelect } from "@/lib/supabase/admin";
import DetailsForm from "@/components/forms/DetailsForm";

/**
 * "Complete your details" page, linked from a nurture email as
 * /complete?t=<signed profile token>. A lead who came in without a name and/or a
 * phone (the email-only "Ask a specialist" widget) fills the gap here so we can
 * forward them. The token identifies the lead; the page only ever asks for the
 * field(s) still below floor, never email. Noindexed like /book.
 */

export const metadata: Metadata = {
  title: "Complete your details",
  description: "Add the last detail we need to arrange your free review call.",
  robots: { index: false, follow: false },
};

/**
 * Shared "needs the personal link" fallback, cloned from /book.
 *
 * ADOPTED: packages/web-shared/design/primitives/NoticeCard.tsx. Its docblock
 * says it exists because eight near-copies of this card had started to drift
 * across /book, /complete, BookingPicker and DetailsForm; two of those eight
 * are in this file. `tone="slate"` is the neutral dead end, which is the
 * component's stated meaning for a state that is nobody's fault.
 */
function NeedsLinkCard() {
  return (
    <NoticeCard>
      <p className="text-base leading-relaxed text-neutral-600">
        This page needs the personal link from your email or text message. If you cannot find it,
        use the contact form and we will arrange your review.
      </p>
      <Link href="/contact" className={`${btnPrimary} mt-6`}>
        Go to the contact form
      </Link>
    </NoticeCard>
  );
}

export default async function CompletePage({
  searchParams,
}: {
  searchParams: Promise<{ t?: string }>;
}) {
  const params = await searchParams;
  const token = (params.t ?? "").trim();

  let inner: React.ReactNode;

  if (!token) {
    inner = <NeedsLinkCard />;
  } else {
    const verdict = verifyLeadToken(token, "profile");
    if (!verdict.ok) {
      inner = (
        <NoticeCard>
          <p className="text-base leading-relaxed text-neutral-600">
            This link has expired or is not valid. No problem, you can still reach us through the
            contact form and we will arrange your review.
          </p>
          <Link href="/contact" className={`${btnPrimary} mt-6`}>
            Go to the contact form
          </Link>
        </NoticeCard>
      );
    } else {
      let missing: ("name" | "phone")[] = ["name", "phone"];
      let allSet = false;
      try {
        const res = await adminSelect<{ full_name: string | null; phone: string | null }>("leads", {
          select: "full_name,phone",
          id: `eq.${verdict.leadId}`,
          limit: "1",
        });
        const row = res.data[0];
        if (row) {
          const m = computeMissingContact(row);
          if (m.length === 0) allSet = true;
          else missing = m;
        }
      } catch {
        // best-effort: fall through to form asking for both
      }

      if (allSet) {
        let bookingToken: string | null = null;
        try {
          bookingToken = mintLeadToken(verdict.leadId, "book");
        } catch {
          bookingToken = null;
        }
        /* `tone="primary"` is the good outcome the reader wanted, which is the
           component's own rule that tone is meaning and not decoration. It
           paints bg-primary-50 (#fffbeb) with a primary-600 ring: the body
           text neutral-600 measures 7.55:1 on that ground, and the ring is
           #9e6615 at 40% composited on #fffbeb = 2.2:1, which is decoration on
           a card edge and carries no information on its own. The old card was
           bg-amber-50 with a full-strength border in the raw brand hex
           #c9861b, which is the 3.04 decoration-only colour. */
        inner = (
          <NoticeCard tone="primary" title="You are all set">
            <p className="text-base leading-relaxed text-neutral-600">
              We have everything we need. A specialist firm from our partner network may contact you
              directly about your enquiry. If you would like to pick a time that suits you, you can
              book a callback below.
            </p>
            {bookingToken && (
              <Link href={`/book?t=${bookingToken}`} className={`${btnPrimary} mt-6`}>
                Book a callback
              </Link>
            )}
          </NoticeCard>
        );
      } else {
        inner = <DetailsForm token={token} missing={missing} />;
      }
    }
  }

  return (
    <>
      {/* ADOPTED: packages/web-shared/design/primitives/SlimHero.tsx. See the
          adoption note on src/app/book/page.tsx: same three-page contract,
          same empty backdrop slot, same 11.90:1 on-dark measurements. */}
      <SlimHero eyebrow="Your enquiry" title="Complete your details">
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
          Add the last detail we need and a specialist firm from our partner network will be in
          touch to arrange your free review call, no obligation.
        </p>
      </SlimHero>

      {/* White, so the page does not end on the navy hero above the slate-900
          kit footer. */}
      <section className={`bg-white ${sectionY}`}>
        <div className={siteContainerLg}>
          <div className="mx-auto max-w-2xl">{inner}</div>
        </div>
      </section>
    </>
  );
}
