import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, siteContainerLg } from "@/components/ui/layout-utils";
import { MedicalBackdrop } from "@/components/layout/MedicalBackdrop";
import { SlimHero } from "@accounting-network/web-shared/design/primitives/SlimHero";
import { NoticeCard } from "@accounting-network/web-shared/design/primitives/NoticeCard";
import { verifyLeadToken, mintLeadToken } from "@accounting-network/web-shared/lead-nurture/tokens";
import { computeMissingContact } from "@accounting-network/web-shared/lead-nurture/lead-nurture-shared";
import { adminSelect } from "@/lib/supabase/admin";
import DetailsForm from "@/components/forms/DetailsForm";

/**
 * "Complete your details" page, linked from a nurture email as
 * /complete?t=<signed profile token>. Noindexed.
 *
 * F.6 skeleton: `SlimHero`, then one light section carrying the job (navy must
 * never touch the navy footer). No `LeadCTAPanel`, no breadcrumb, no CTA row in
 * the hero, no tick badge. The three hand-rolled notice cards are now
 * `NoticeCard`; the token and `adminSelect` logic below is byte-unchanged, as is
 * `robots index:false`.
 *
 * `DetailsForm` is a live capture surface and gets a WHITE card on a slate-50
 * section: a lead form rendered bare on a coloured ground is what shipped
 * invisible field labels on 88 article pages here.
 *
 * `SlimHero.eyebrow` is required and has no default; "Review call" is the only
 * string added, and both its words already appear in the standfirst below.
 */

export const metadata: Metadata = {
  title: `Complete your details`,
  description:
    "Add the last detail we need to arrange your review call with a specialist medical accountant.",
  robots: { index: false, follow: false },
};

function NeedsLinkCard() {
  return (
    <NoticeCard ground="slate">
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
        <NoticeCard ground="slate">
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
        inner = (
          <div className="rounded-xl bg-white p-5 ring-1 ring-slate-200/70 sm:p-8">
            <DetailsForm token={token} missing={missing} />
          </div>
        );
      }
    }
  }

  return (
    <>
      <SlimHero
        eyebrow="Review call"
        title="Complete your details"
        backdrop={<MedicalBackdrop tone="navy" />}
      >
        <p className="mt-4 text-base leading-relaxed text-slate-300 sm:mt-6 sm:text-lg">
          Add the last detail we need and a specialist firm from our partner network will be
          in touch to arrange your review call. Sending it commits you to nothing, and scope and
          fees are agreed with that firm.
        </p>
      </SlimHero>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="mx-auto max-w-2xl">{inner}</div>
        </div>
      </section>
    </>
  );
}
