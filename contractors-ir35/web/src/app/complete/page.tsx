import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, siteContainerLg } from "@/components/ui/layout-utils";
import { SlimHero } from "@accounting-network/web-shared/design/primitives/SlimHero";
import { NoticeCard } from "@accounting-network/web-shared/design/primitives/NoticeCard";
import { verifyLeadToken, mintLeadToken } from "@accounting-network/web-shared/lead-nurture/tokens";
import { computeMissingContact } from "@accounting-network/web-shared/lead-nurture/lead-nurture-shared";
import { adminSelect } from "@/lib/supabase/admin";
import DetailsForm from "@/components/forms/DetailsForm";

/**
 * "Complete your details" page, linked from a nurture email as
 * /complete?t=<signed profile token>. A lead who came in without a name and/or a
 * phone fills the gap here so we can call them. The token identifies the lead;
 * the page only ever asks for the field(s) still below floor, never email.
 * Noindexed like /book.
 */

export const metadata: Metadata = {
  title: `Complete your details`,
  description: "Add the last detail we need to arrange your free IR35 review.",
  robots: { index: false, follow: false },
};

/** Shared "needs the personal link" fallback. */
function NeedsLinkCard() {
  return (
    <NoticeCard tone="slate">
      <p className="text-base text-neutral-700">
        This page needs the personal link from your email or text message. If you cannot find it,
        use the contact form and we will arrange your review.
      </p>
      <Link href="/contact" className={`${btnPrimary} mt-4 rounded-xl text-base`}>
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
          <p className="text-base text-neutral-700">
            This link has expired or is not valid. No problem, you can still reach us through the
            contact form and we will arrange your review.
          </p>
          <Link href="/contact" className={`${btnPrimary} mt-4 rounded-xl text-base`}>
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
            <p className="text-base text-neutral-700">
              We have everything we need. An accountant from our partner network will be in touch
              shortly. If you would like to pick a time that suits you, you can book a callback below.
            </p>
            {bookingToken && (
              <Link href={`/book?t=${bookingToken}`} className={`${btnPrimary} mt-4 rounded-xl text-base`}>
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
      <SlimHero eyebrow="One last thing" title="Complete your details">
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-300 sm:text-lg">
          Add the last detail we need and an accountant from our partner network will be in touch
          to arrange your free IR35 review, no obligation.
        </p>
      </SlimHero>

      {/* The branch body is the page's only ask, whichever branch resolves. No
          LeadCTAPanel: the reader has already converted and is mid-repair. No
          `max-w-2xl` clamp; the container IS the measure. */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>{inner}</div>
      </section>
    </>
  );
}
