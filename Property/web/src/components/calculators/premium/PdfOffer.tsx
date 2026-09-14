"use client";

/**
 * The paid workings-PDF block, rendered under the revealed premium result on the
 * three premium tools only, and only while the site_flags row says on. Renders
 * nothing at all otherwise, so the flag-off page is what the site renders today.
 *
 * The click saves the figures then goes to Stripe; if the save fails or takes
 * more than two seconds the buyer still reaches Stripe, and the owner asks them
 * for the figures. Our plumbing never blocks a purchase.
 */
import { useEffect, useState } from "react";
import type { CalcValues, GridRow, PremiumResult } from "@/lib/calculators/premium/types";
import { PDF_TOOLS, PDF_CTA_ID, buildPdfRequest } from "@/lib/calculators/premium/pdfRequest";

export type Offer = { enabled: boolean; link?: string; price_gbp?: number };

/**
 * Reads the flag once per mount, only for the three offered tools. Returns the
 * offer while it is on, else null. PremiumCalculator uses the same value to hide
 * the free workings and uncap the inputs column, so flag off restores today's
 * layout exactly.
 */
export function usePdfOffer(toolId: string): Offer | null {
  const eligible = PDF_TOOLS.has(toolId);
  const [offer, setOffer] = useState<Offer | null>(null);

  useEffect(() => {
    if (!eligible) return;
    let live = true;
    fetch("/api/calc/pdf-offer")
      .then((r) => r.json())
      .then((d: Offer) => {
        if (live) setOffer(d);
      })
      .catch(() => {});
    return () => {
      live = false;
    };
  }, [eligible]);

  return eligible && offer?.enabled && offer.link ? offer : null;
}

export function PdfOffer(props: {
  offer: Offer;
  toolId: string;
  placement: string;
  values: CalcValues;
  rows: GridRow[];
  scenario?: string;
  result: PremiumResult;
}) {
  const { offer, placement } = props;
  const [saving, setSaving] = useState(false);
  const link = offer.link ?? "";
  const price = offer.price_gbp ?? 29;

  async function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    setSaving(true);
    let target = link;
    try {
      const body = buildPdfRequest(props);
      if (body) {
        const res = await fetch("/api/calc/pdf-request", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          signal: AbortSignal.timeout(2000),
        });
        const data = (await res.json()) as { id?: string };
        if (data.id) target = `${link}?client_reference_id=${encodeURIComponent(data.id)}`;
      }
    } catch {
      // fall through to the bare payment link
    }
    window.location.assign(target);
  }

  return (
    <div className="mt-6 border-t border-slate-200 pt-6 text-center">
      <p className="text-base font-bold text-slate-900">
        Want this as a dated PDF with every step shown?
      </p>
      <p className="mt-1 text-sm text-slate-600">
        Full computation from the figures above, £{price}. Sent to your email within one working
        day.
      </p>
      <a
        href={link}
        onClick={handleClick}
        aria-disabled={saving}
        data-cta={PDF_CTA_ID}
        data-cta-placement={placement}
        data-cta-goal="purchase"
        className="mt-5 inline-flex min-h-14 w-full touch-manipulation items-center justify-center rounded-xl bg-emerald-600 px-8 py-4 text-lg font-bold shadow-[0_8px_20px_-10px_rgba(5,150,105,0.6)] text-white transition-colors duration-150 hover:bg-emerald-700 active:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
      >
        {saving ? "Saving your figures" : `Get the PDF, £${price}`}
      </a>
      <p className="mt-3 text-xs text-slate-500">
        Computation from the figures you entered, not advice.
      </p>
    </div>
  );
}
