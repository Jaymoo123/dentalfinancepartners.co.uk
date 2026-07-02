"use client";

/**
 * Native callback slot picker: next 10 weekdays x 3 call windows, posted to
 * /api/leads/book with the lead's signed booking token. Used inline on the
 * thank-you page (highest-intent moment, straight after submit) and standalone
 * on /book (linked from every nurture SMS/email).
 *
 * Deliberately NOT a month calendar: the lead is telling us when to call them,
 * not booking a scarce resource, so two taps beat a date grid (mobile-first).
 * House style: sharp corners, emerald/slate, no em-dashes in copy.
 */

import { useMemo, useState } from "react";
import Link from "next/link";
import { btnPrimary } from "@/components/ui/layout-utils";
import { upcomingWeekdays, CALL_WINDOWS } from "@/lib/leads/booking";
import { setBookingDone } from "@accounting-network/web-shared/analytics/visitMemory";

type Status = "idle" | "submitting" | "done" | "error" | "expired";

const chipBase =
  "flex min-h-12 touch-manipulation flex-col items-center justify-center border-2 px-1.5 sm:px-3 py-2 text-sm font-bold transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600";
const chipIdle = "border-slate-300 bg-white text-slate-900 hover:border-emerald-600 hover:bg-emerald-50";
const chipSelected = "border-emerald-600 bg-emerald-600 text-white";

export default function BookingPicker({ token }: { token: string }) {
  const days = useMemo(() => upcomingWeekdays(10), []);
  const [date, setDate] = useState<string | null>(null);
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
        setBookingDone();
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
      <div className="border-2 border-emerald-600 bg-emerald-50 p-6 text-center">
        <p className="text-lg font-bold text-slate-900">Callback booked</p>
        <p className="mt-2 text-base text-slate-700">
          {confirmedLabel ? (
            <>
              We have you down for <strong>{confirmedLabel}</strong>.
            </>
          ) : (
            "Your slot is saved."
          )}{" "}
          A property tax specialist will call you then. If your plans change, just reply to any of
          our messages.
        </p>
        <p className="mt-3 text-sm text-slate-600">
          The call takes about 20 minutes. Your specialist will have read your enquiry before they
          ring.
        </p>
      </div>
    );
  }

  if (status === "expired") {
    return (
      <div className="border-2 border-slate-300 bg-slate-50 p-6 text-center">
        <p className="text-base text-slate-700">
          This booking link has expired. No problem, you can still reach us through the contact
          form and we will arrange your review.
        </p>
        <Link href="/contact" className={`${btnPrimary} mt-4 text-base`}>
          Go to the contact form
        </Link>
      </div>
    );
  }

  return (
    <div className="text-left">
      <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
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

      <p className="mb-3 mt-6 text-sm font-semibold uppercase tracking-wide text-slate-500">
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
          {status === "submitting" ? "Booking your callback…" : "Book my free review call"}
        </button>
        {status === "error" && (
          <p className="mt-3 text-sm font-semibold text-red-700">
            Something went wrong saving your slot. Please try again.
          </p>
        )}
        <p className="mt-3 text-xs text-slate-500">
          No obligation. A property tax specialist will call you in your chosen window.
        </p>
      </div>
    </div>
  );
}
