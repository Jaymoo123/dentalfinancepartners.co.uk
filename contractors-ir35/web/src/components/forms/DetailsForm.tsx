"use client";

/**
 * "Complete your details" form. A lead who arrived missing a name and/or phone
 * supplies the missing detail(s) from the personal link in a nurture email. It
 * renders ONLY the field(s) that are actually missing (never email, never a
 * message): a lead who has already given their name only sees the phone box, and
 * vice versa. Posts to /api/leads/complete with the signed profile token.
 *
 * House style: sharp inputs, cyan/ink, honeypot on a non-semantic field name,
 * no em-dashes in copy.
 */

import { useState } from "react";
import Link from "next/link";
import { btnPrimary } from "@/components/ui/layout-utils";
import { isNameOk, isPhoneOk } from "@/lib/leads/field-floors";

const inputClass =
  "mt-1 w-full min-h-12 touch-manipulation border border-neutral-300 bg-white px-3.5 py-3 text-base text-neutral-900 placeholder:text-neutral-400 transition-colors focus:border-cyan-700 focus:outline-none";

type MissingField = "name" | "phone";

type Status =
  | "idle"
  | "loading"
  | "success" // full completion, nothing left
  | "partial" // saved, but still missing the other field
  | "error"; // network / server error

/** Human label for the leftover field in the partial-completion message. */
function remainingLabel(fields: MissingField[]): string {
  return fields
    .map((f) => (f === "name" ? "your name" : "your phone number"))
    .join(" and ");
}

export default function DetailsForm({
  token,
  missing,
}: {
  token: string;
  missing: MissingField[];
}) {
  const needsName = missing.includes("name");
  const needsPhone = missing.includes("phone");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [remaining, setRemaining] = useState<MissingField[]>([]);
  const [bookingToken, setBookingToken] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    setNameError(null);
    setPhoneError(null);

    let ok = true;
    if (needsName && !isNameOk(name)) {
      setNameError("Please enter your full name.");
      ok = false;
    }
    if (needsPhone && !isPhoneOk(phone)) {
      setPhoneError("Please enter a phone number we can call you on.");
      ok = false;
    }
    if (!ok) return;

    const form = e.currentTarget;
    const honeypot = String(
      new FormData(form).get("enquiry_ref") || "",
    ).trim();

    const payload: Record<string, string> = { token, enquiry_ref: honeypot };
    if (needsName) payload.full_name = name.trim();
    if (needsPhone) payload.phone = phone.trim();

    setStatus("loading");
    try {
      const res = await fetch("/api/leads/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        stillMissing?: MissingField[];
        bookingToken?: string;
      };

      if (res.ok && json.success) {
        if (json.stillMissing && json.stillMissing.length > 0) {
          setRemaining(json.stillMissing);
          setStatus("partial");
          return;
        }
        setBookingToken(json.bookingToken ?? null);
        setStatus("success");
        return;
      }

      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-cyan-200 bg-cyan-50 p-6 text-center">
        <p className="text-lg font-bold text-neutral-900">Thank you, that is everything we need</p>
        <p className="mt-2 text-base text-neutral-700">
          An accountant will be in touch shortly. If you would like to pick a time that suits
          you, you can book a callback below.
        </p>
        {bookingToken && (
          <Link href={`/book?t=${bookingToken}`} className={`${btnPrimary} mt-4 text-base`}>
            Book a callback
          </Link>
        )}
      </div>
    );
  }

  if (status === "partial") {
    return (
      <div className="border border-cyan-200 bg-cyan-50 p-6 text-center">
        <p className="text-lg font-bold text-neutral-900">Thank you</p>
        <p className="mt-2 text-base text-neutral-700">
          We have saved that. We still need {remainingLabel(remaining)}. We will pop you a quick
          note so you can add it, or you can reply to any of our messages.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="text-left" noValidate aria-busy={status === "loading"}>
      {/* Honeypot: non-semantic name so autofill/password managers do not target it. */}
      <input
        type="text"
        name="enquiry_ref"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] top-[-9999px] h-px w-px opacity-0"
      />

      {needsName && (
        <div className="mb-4">
          <label htmlFor="complete-name" className="block text-sm font-semibold text-neutral-900">
            Full name
          </label>
          <input
            type="text"
            id="complete-name"
            name="full_name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            maxLength={100}
            placeholder="e.g. Jane Smith"
            className={inputClass}
            aria-invalid={!!nameError}
          />
          {nameError && <p className="mt-1.5 text-xs font-medium text-red-600">{nameError}</p>}
        </div>
      )}

      {needsPhone && (
        <div className="mb-4">
          <label htmlFor="complete-phone" className="block text-sm font-semibold text-neutral-900">
            Phone
          </label>
          <input
            type="tel"
            id="complete-phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
            maxLength={20}
            placeholder="A number we can call you on"
            className={inputClass}
            aria-invalid={!!phoneError}
          />
          {phoneError && <p className="mt-1.5 text-xs font-medium text-red-600">{phoneError}</p>}
        </div>
      )}

      <button type="submit" disabled={status === "loading"} className={`${btnPrimary} w-full sm:w-auto`}>
        {status === "loading" ? "Saving your details..." : "Save my details"}
      </button>

      {status === "error" && (
        <p className="mt-3 text-sm font-semibold text-red-700">
          Something went wrong saving your details. Please try again.
        </p>
      )}

      <p className="mt-3 text-xs text-neutral-500">
        We only use this to arrange your free review. See our{" "}
        <a
          href="/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-cyan-700 underline"
        >
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
