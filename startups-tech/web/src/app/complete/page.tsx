import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, siteContainerLg, sectionY } from "@/components/ui/layout-utils";
import { SlimHero } from "@accounting-network/web-shared/design/primitives/SlimHero";
import { NoticeCard } from "@accounting-network/web-shared/design/primitives/NoticeCard";
import { verifyLeadToken, mintLeadToken } from "@accounting-network/web-shared/lead-nurture/tokens";
import { computeMissingContact } from "@accounting-network/web-shared/lead-nurture/lead-nurture-shared";
import { adminSelect } from "@/lib/supabase/admin";
import DetailsForm from "@/components/forms/DetailsForm";
import StartupsBackdrop from "@/components/layout/StartupsBackdrop";

/**
 * "Complete your details" page, linked from a nurture email as
 * /complete?t=<signed profile token>. A lead who came in without a name and/or a
 * phone (the email-only capture widget) fills the gap here so we can forward
 * them. The token identifies the lead; the page only ever asks for the field(s)
 * still below floor, never email. Noindexed like /book.
 *
 * CHROME ONLY. Every sentence below is the pre-port copy, byte for byte,
 * except the two former "partner network" sentences, which were rewritten to firm
 * voice on 2026-09-28 (owner ruling: the brand IS the firm on every surface).
 * The one string authored here is the SlimHero `eyebrow`, "Your
 * enquiry", which the primitive requires and which is a structural label.
 *
 * ADOPTED: packages/web-shared/design/primitives/SlimHero.tsx (scoped by its own
 * docblock to exactly these three token-gated pages; it carries the h1) and
 * packages/web-shared/design/primitives/NoticeCard.tsx, which replaces four
 * near-identical local cards: two slate-tinted dead-end cards and the
 * indigo-tinted good-outcome card. `tone` is meaning, not
 * decoration: "slate" for a dead end nobody caused, "primary" for the outcome
 * the reader wanted. `ground="slate"` on all of them because the body section
 * paints slate-50.
 *
 * ADOPTION DECLINED: packages/web-shared/design/marketing/StickyCTA.tsx and
 * every modal/banner (no interruptive surface on this site, owner ruling),
 * marketing/LeadCTAPanel.tsx (a second capture surface on a token-gated page is
 * owner-gated) and marketing/WhatToExpectCard.tsx (default props publish a fee
 * line no page here authored, T12).
 */

export const metadata: Metadata = {
  title: "Complete your details",
  description: "Add the last detail we need to arrange your free startup finance review.",
  robots: { index: false, follow: false },
};

/** Shared "needs the personal link" fallback, cloned from /book. */
function NeedsLinkCard() {
  return (
    <NoticeCard ground="slate">
      <p className="text-base text-slate-700">
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
        <NoticeCard ground="slate">
          <p className="text-base text-slate-700">
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
            <p className="text-base text-slate-700">
              We have everything we need. One of our startup tax specialists will contact you
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
        inner = (
          <div className="rounded-xl bg-white p-6 ring-1 ring-slate-200/70 sm:p-8">
            <DetailsForm token={token} missing={missing} />
          </div>
        );
      }
    }
  }

  return (
    <>
      <SlimHero eyebrow="Your enquiry" title="Complete your details" backdrop={<StartupsBackdrop />}>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
          Add the last detail we need and one of our startup tax specialists will be in
          touch to arrange your free startup finance review, no obligation.
        </p>
      </SlimHero>

      <section className={`bg-slate-50 ${sectionY}`}>
        <div className={siteContainerLg}>
          <div className="mx-auto max-w-2xl">{inner}</div>
        </div>
      </section>
    </>
  );
}
