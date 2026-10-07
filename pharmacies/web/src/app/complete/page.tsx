import type { Metadata } from "next";
import Link from "next/link";
import { SlimHero } from "@accounting-network/web-shared/design/primitives/SlimHero";
import { NoticeCard } from "@accounting-network/web-shared/design/primitives/NoticeCard";
import { btnPrimary, siteContainerLg, sectionY } from "@/components/ui/layout-utils";
import { verifyLeadToken, mintLeadToken } from "@accounting-network/web-shared/lead-nurture/tokens";
import { computeMissingContact } from "@accounting-network/web-shared/lead-nurture/lead-nurture-shared";
import { adminSelect } from "@/lib/supabase/admin";
import DetailsForm from "@/components/forms/DetailsForm";
import PharmaciesBackdrop from "@/components/layout/PharmaciesBackdrop";
import { siteConfig } from "@/config/site";

/**
 * "Complete your details" page, linked from a nurture email as
 * /complete?t=<signed profile token>. A lead who came in without a name and/or a
 * phone (the email-only "Ask a specialist" widget) fills the gap here so we can
 * forward them. The token identifies the lead; the page only ever asks for the
 * field(s) still below floor, never email. Noindexed like /book.
 *
 * CHROME ONLY. Every sentence on this route is the pre-port sentence, byte for
 * byte. The one string authored here is the two-word `eyebrow` SlimHero
 * requires; it is handed to the manager in the receipt as a candidate
 * niche.config.json key.
 *
 * ADOPTED: packages/web-shared/design/primitives/SlimHero.tsx, scoped by its
 * own docblock (:5-13) to exactly these three token-gated post-submit pages.
 * ADOPTED: packages/web-shared/design/primitives/NoticeCard.tsx on all three
 * outcome cards below. Its docblock (:5-17) names them: the "needs the
 * personal link" card, the expired-link card and the "You are all set" card
 * were three of the eight near-copies it was extracted to kill. `tone` is
 * meaning, not decoration (:11-14), so the two dead ends are `slate` and the
 * good outcome is `primary`. The `primary` tone's `bg-primary-50
 * ring-primary-600/40` replaces a hand-rolled `border-[var(--brand-primary)]`
 * on `bg-slate-50`: the brand hex at 12.18 on white was a near-black hairline
 * where the ramp's own tint reads as a tone.
 *
 * ADOPTION DECLINED: packages/web-shared/design/marketing/WhatToExpectCard.tsx.
 * `items` must always be passed (the defaults publish a fee line this site
 * never promises, :22-27) and this route publishes no "what happens next"
 * list to pass. Writing one is authored copy.
 */

export const metadata: Metadata = {
  title: "Complete your details",
  description: "Add the last detail we need to arrange your free pharmacy finance review.",
  robots: { index: false, follow: false },
  alternates: { canonical: `${siteConfig.url}/complete` },
};

/** Shared "needs the personal link" fallback, cloned from /book. */
function NeedsLinkCard() {
  return (
    <NoticeCard tone="slate">
      <p className="text-base text-slate-600">
        This page needs the personal link from your email or text message. If you cannot find it,
        use the contact form and we will arrange your review.
      </p>
      <Link href="/contact" className={`${btnPrimary} mt-4 text-base`}>
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
        <NoticeCard tone="slate">
          <p className="text-base text-slate-600">
            This link has expired or is not valid. No problem, you can still reach us through the
            contact form and we will arrange your review.
          </p>
          <Link href="/contact" className={`${btnPrimary} mt-4 text-base`}>
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
        inner = (
          <NoticeCard tone="primary" title="You are all set">
            <p className="text-base text-slate-600">
              We have everything we need. One of our pharmacy accounting specialists will contact you
              directly about your enquiry. If you would like to pick a time that suits you, you can
              book a callback below.
            </p>
            {bookingToken && (
              <Link href={`/book?t=${bookingToken}`} className={`${btnPrimary} mt-4 text-base`}>
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
      {/* Kit ground `bg-slate-900`, the one ground PharmaciesBackdrop was
          measured on in phase 1, so no new contrast row is owed and
          `sectionClassName` is deliberately not passed. */}
      <SlimHero
        eyebrow="Your details"
        title="Complete your details"
        backdrop={<PharmaciesBackdrop patternId="pharmacies-dispensary-shelving-complete" />}
      >
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
          Add the last detail we need and one of our pharmacy accounting specialists will be in
          touch to arrange your free pharmacy finance review, no obligation.
        </p>
      </SlimHero>

      {/* White, not a tinted band: hero above is slate-900 and the kit footer
          is slate-900, so this page must not end on the hero. */}
      <section className={`bg-white ${sectionY}`}>
        <div className={siteContainerLg}>
          <div className="mx-auto max-w-2xl">{inner}</div>
        </div>
      </section>
    </>
  );
}
