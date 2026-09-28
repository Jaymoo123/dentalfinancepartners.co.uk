"use client";

/**
 * Native callback slot picker: next 10 weekdays x 3 call windows.
 * Posted to /api/leads/book with the lead's signed booking token.
 * Used inline on the thank-you page and standalone on /book.
 * CIS palette: orange #f97316 + slate-900.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { btnPrimary, focusRing } from "@/components/ui/layout-utils";
import { NoticeCard } from "@/components/ui/NoticeCard";
import { upcomingWeekdays, CALL_WINDOWS } from "@/lib/leads/booking";

type Status = "idle" | "submitting" | "done" | "error" | "expired";

/* Chips are rounded-xl to match btnPrimary, and the selected ground is
   --btn-ground (orange-700, 5.18 with white on it). It was bg-orange-500, which
   measures 2.80 and failed the text floor on the one control the whole page
   exists to get pressed. */
const chipBase = `flex min-h-12 touch-manipulation flex-col items-center justify-center rounded-xl border-2 px-1.5 sm:px-3 py-2 text-sm font-bold transition-all duration-150 ${focusRing}`;
const chipIdle =
  "border-neutral-300 bg-white text-slate-900 hover:border-[var(--btn-ground)] hover:bg-[var(--accent-whisper)]";
const chipSelected = "border-[var(--btn-ground)] bg-[var(--btn-ground)] text-white";

export default function BookingPicker({ token }: { token: string }) {
  const days = useMemo(() => upcomingWeekdays(10), []);
  const [date, setDate] = useState<string | null>(null);

  const viewedFired = useRef(false);
  useEffect(() => {
    if (!token || viewedFired.current) return;
    viewedFired.current = true;
    fetch("/api/leads/booking-viewed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    }).catch(() => {});
  }, []);

  const [windowKey, setWindowKey] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [confirmedLabel, setConfirmedLabel] = useState<string | null>(null);

  async function submit() {
    if (!date || !windowKey || status === "submitting") return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/leads/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, date, window: windowKey }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        label?: string;
        error?: string;
      };
      if (res.ok && json.success) {
        setConfirmedLabel(json.label ?? null);
        setStatus("done");
      } else if (res.status === 401 || res.status === 410) {
        setStatus("expired");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <NoticeCard tone="accent" title="Callback booked">
        <p className="text-base leading-relaxed text-slate-700">
          {confirmedLabel ? (
            <>
              We have you down for <strong>{confirmedLabel}</strong>.
            </>
          ) : (
            "Your slot is saved."
          )}{" "}
          A specialist will call you then. If your plans change, just reply to any of our messages.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-neutral-600">
          The call takes about 20 minutes. Your specialist will have read your enquiry before they ring.
        </p>
      </NoticeCard>
    );
  }

  if (status === "expired") {
    return (
      <NoticeCard>
        <p className="text-base leading-relaxed text-slate-700">
          This booking link has expired. No problem, you can still reach us through the contact
          form and we will arrange your review.
        </p>
        <Link href="/contact" className={`${btnPrimary} mt-4`}>
          Go to the contact form
        </Link>
      </NoticeCard>
    );
  }

  return (
    <div className="text-left">
      <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-600">
        1. Pick a day
      </p>
      <div className="grid grid-cols-5 gap-1 sm:gap-2">
        {days.map((d) => (
          <button
            key={d.iso}
            type="button"
            onClick={() => setDate(d.iso)}
            aria-pressed={date === d.iso}
            className={`${chipBase} ${date === d.iso ? chipSelected : chipIdle}`}
          >
            <span className="text-xs font-semibold opacity-80">{d.weekday}</span>
            <span>
              {d.day} {d.month}
            </span>
          </button>
        ))}
      </div>

      <p className="mb-3 mt-6 text-sm font-semibold uppercase tracking-wide text-neutral-600">
        2. Pick a time that suits you
      </p>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {CALL_WINDOWS.map((w) => (
          <button
            key={w.key}
            type="button"
            onClick={() => setWindowKey(w.key)}
            aria-pressed={windowKey === w.key}
            className={`${chipBase} ${windowKey === w.key ? chipSelected : chipIdle}`}
          >
            <span>{w.label}</span>
            <span className="text-xs font-semibold opacity-80">{w.hours}</span>
          </button>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={submit}
          disabled={!date || !windowKey || status === "submitting"}
          className={`${btnPrimary} w-full sm:w-auto`}
        >
          {status === "submitting" ? "Booking your callback..." : "Book my free review call"}
        </button>
        {status === "error" && (
          <p className="mt-3 text-sm font-semibold text-[var(--form-error)]">
            Something went wrong saving your slot. Please try again.
          </p>
        )}
        <p className="mt-3 text-xs text-neutral-600">
          No obligation. A specialist will call you in your chosen window.
        </p>
      </div>
    </div>
  );
}
