import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, siteContainerLg } from "@/components/ui/layout-utils";
import { SolicitorsBackdrop } from "@/components/layout/SolicitorsBackdrop";
import { SlimHero } from "@accounting-network/web-shared/design/primitives/SlimHero";
import { NoticeCard } from "@accounting-network/web-shared/design/primitives/NoticeCard";
import { verifyLeadToken, mintLeadToken } from "@accounting-network/web-shared/lead-nurture/tokens";
import { computeMissingContact } from "@accounting-network/web-shared/lead-nurture/lead-nurture-shared";
import { adminSelect } from "@/lib/supabase/admin";
import DetailsForm from "@/components/forms/DetailsForm";

/**
 * "Complete your details" page, linked from a nurture email as
 * /complete?t=<signed profile token>. A lead who came in without a name and/or a
 * phone fills the gap here. The page only ever asks for the field(s) still below
 * floor. Noindexed.
 *
 * F.6 skeleton: `SlimHero`, then one light section carrying the job (navy must
 * never touch the navy footer). No `LeadCTAPanel`, no breadcrumb, no CTA row in
 * the hero, no tick badge.
 *
 * The three hand-rolled notice cards are now `NoticeCard`. The token and
 * `adminSelect` logic below is byte-unchanged, as is `robots index:false`.
 *
 * DEPARTURE from F.6's ask-left / reassurance-right grid: this route has no
 * reassurance copy of its own and the phase-6 hard rule forbids authoring any,
 * so the ask runs single-column on `siteContainerLg` rather than borrowing
 * /contact's `WhatToExpectCard` items (net-new text here) or letting that
 * component's four Property defaults render.
 *
 * `SlimHero.eyebrow` is required and has no default; "Free review" is the only
 * string added, and both its words already appear in the standfirst below.
 */

export const metadata: Metadata = {
  title: `Complete your details`,
  description:
    "Add the last detail we need to arrange your free review with a specialist accountant for solicitors.",
  robots: { index: false, follow: false },
};

function NeedsLinkCard() {
  return (
    <NoticeCard>
      <p className="text-base leading-relaxed text-slate-700">
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
        <NoticeCard>
          <p className="text-base leading-relaxed text-slate-700">
            This link has expired or is not valid. No problem, you can still reach us through
            the contact form and we will arrange your review.
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
        const res = await adminSelect<{ full_name: string | null; phone: string | null }>(
          "leads",
          {
            select: "full_name,phone",
            id: `eq.${verdict.leadId}`,
            limit: "1",
          },
        );
        const row = res.data[0];
        if (row) {
          const m = computeMissingContact(row);
          if (m.length === 0) allSet = true;
          else missing = m;
        }
      } catch {
        // best-effort: fall through to the form asking for both
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
            <p className="text-base leading-relaxed text-slate-700">
              We have everything we need. A specialist firm from our partner network may contact
              you directly about your enquiry. If you would like to pick a time that suits you,
              you can book a callback below.
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
      <SlimHero
        eyebrow="Free review"
        title="Complete your details"
        backdrop={<SolicitorsBackdrop tone="navy" />}
      >
        <p className="mt-4 text-base leading-relaxed text-slate-300 sm:mt-6 sm:text-lg">
          Add the last detail we need and a specialist firm from our partner network will be in
          touch to arrange your free review, no obligation.
        </p>
      </SlimHero>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>{inner}</div>
      </section>
    </>
  );
}
