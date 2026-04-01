"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { btnPrimary } from "@/components/ui/layout-utils";
import { niche } from "@/config/niche-loader";

const fieldClass =
  "mt-1 w-full min-h-12 touch-manipulation rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3.5 py-3 text-base text-[var(--ink)] shadow-sm focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/25";

type FormStatus = "idle" | "loading" | "success" | "error";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// UK phone: at least 10 digits total (ignoring spaces, dashes, parens, +)
const ukPhoneRe = /^[\d\s+().-]{10,}$/;

function hasMinDigits(phone: string, min: number): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= min;
}

type LeadFormProps = {
  /** When false, successful submit shows inline message instead of redirecting */
  redirectOnSuccess?: boolean;
  submitLabel?: string;
};

export function LeadForm({
  redirectOnSuccess = true,
  submitLabel = "Send enquiry",
}: LeadFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [sourceUrl, setSourceUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSourceUrl(window.location.href);
    }
  }, []);

  const supabaseUrl = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_SUPABASE_URL : undefined;
  const supabaseKey = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY : undefined;

  const validate = useCallback((data: FormData) => {
    const errs: Record<string, string> = {};
    const fullName = String(data.get("fullName") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const role = String(data.get("role") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (fullName.length < 2) errs.fullName = "Enter your name.";
    if (!emailRe.test(email)) errs.email = "Enter a valid email address.";
    
    // Phone: must have at least 10 digits and only allowed chars
    if (!ukPhoneRe.test(phone)) {
      errs.phone = "Use only digits, spaces, +, -, ( ) — e.g. 07700 900123 or +44 20 1234 5678";
    } else if (!hasMinDigits(phone, 10)) {
      errs.phone = "Enter at least 10 digits.";
    }
    
    if (!role) errs.role = "Tell us whether you are an associate, owner, or group.";

    if (message.length > 0 && message.length < 10) {
      errs.message = "If you add a note, a sentence or two is enough — but not just a word or two.";
    }

    return errs;
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    const errs = validate(data);
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    if (!supabaseUrl || !supabaseKey) {
      setStatus("error");
      setErrorMessage(
        "This form is not connected yet. Email us using the address on this page — we will pick it up the same day.",
      );
      return;
    }

    setStatus("loading");
    const payload = {
      full_name: String(data.get("fullName") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      role: String(data.get("role") || "").trim(),
      practice_name: String(data.get("practiceName") || "").trim() || "—",
      message: String(data.get("message") || "").trim(),
      source: niche.content_strategy.source_identifier,
      source_url: sourceUrl || String(data.get("sourceUrl") || "").trim(),
      submitted_at: new Date().toISOString(),
    };

    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": supabaseKey,
          "Authorization": `Bearer ${supabaseKey}`,
          "Prefer": "return=minimal"
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text().catch(() => "");
        console.error("Form submission failed:", res.status, errorText);
        throw new Error(`Request failed (${res.status})`);
      }

      console.log("Form submission success");

      // Track conversion in Google Analytics
      if (typeof window !== "undefined" && "gtag" in window) {
        const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag;
        if (gtag) {
          gtag("event", "generate_lead", {
            event_category: "engagement",
            event_label: `${niche.niche_id}_${payload.role}`,
            value: 1,
          });
        }
      }

      setStatus("success");
      form.reset();
      if (redirectOnSuccess) {
        router.push("/thank-you");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setStatus("error");
      const errMsg = err instanceof Error ? err.message : String(err);
      setErrorMessage(
        `That did not go through (${errMsg}). Try again, or email us — either works.`
      );
    }
  }

  if (status === "success" && !redirectOnSuccess) {
    return (
      <div
        className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-900"
        role="status"
      >
        <p className="font-semibold">Thank you — we have your message.</p>
        <p className="mt-2 text-sm">We will come back within one working day.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6"
      noValidate
      aria-busy={status === "loading" ? "true" : "false"}
    >
      <input type="hidden" name="sourceUrl" value={sourceUrl} readOnly />
      <input type="hidden" name="practiceName" value="" readOnly />

      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-[var(--ink)]">
          Your name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          autoComplete="name"
          required
          placeholder={niche.lead_form.placeholders.name}
          className={fieldClass}
          aria-invalid={fieldErrors.fullName ? "true" : "false"}
          aria-describedby={fieldErrors.fullName ? "err-fullName" : undefined}
        />
        {fieldErrors.fullName ? (
          <p id="err-fullName" className="mt-1 text-sm text-red-700">
            {fieldErrors.fullName}
          </p>
        ) : null}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[var(--ink)]">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder={niche.lead_form.placeholders.email}
            className={fieldClass}
            aria-invalid={fieldErrors.email ? "true" : "false"}
            aria-describedby={fieldErrors.email ? "err-email" : undefined}
          />
          {fieldErrors.email ? (
            <p id="err-email" className="mt-1 text-sm text-red-700">
              {fieldErrors.email}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-[var(--ink)]">
            Phone number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            placeholder={niche.lead_form.placeholders.phone}
            className={fieldClass}
            aria-invalid={fieldErrors.phone ? "true" : "false"}
            aria-describedby={fieldErrors.phone ? "err-phone" : undefined}
          />
          {fieldErrors.phone ? (
            <p id="err-phone" className="mt-1 text-sm text-red-700">
              {fieldErrors.phone}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium text-[var(--ink)]">
          {niche.lead_form.role_label}
        </label>
        <select
          id="role"
          name="role"
          required
          defaultValue=""
          className={fieldClass}
          aria-invalid={fieldErrors.role ? "true" : "false"}
          aria-describedby={fieldErrors.role ? "err-role" : undefined}
        >
          <option value="" disabled>
            Please select
          </option>
          {niche.lead_form.role_options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {fieldErrors.role ? (
          <p id="err-role" className="mt-1 text-sm text-red-700">
            {fieldErrors.role}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[var(--ink)]">
          What&apos;s on your mind?{" "}
          <span className="font-normal text-[var(--muted)]">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={`${fieldClass} min-h-[9rem] resize-y py-3`}
          placeholder={niche.lead_form.placeholders.message}
          aria-invalid={fieldErrors.message ? "true" : "false"}
          aria-describedby={fieldErrors.message ? "err-message" : undefined}
        />
        {fieldErrors.message ? (
          <p id="err-message" className="mt-1 text-sm text-red-700">
            {fieldErrors.message}
          </p>
        ) : null}
      </div>

      {status === "error" && errorMessage ? (
        <div
          className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-900"
          role="alert"
        >
          {errorMessage}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className={`${btnPrimary} w-full min-w-0 sm:min-w-[12rem]`}
      >
        {status === "loading" ? "Sending…" : submitLabel}
      </button>

      <p className="text-xs leading-relaxed text-[var(--muted)]">We do not share your details with third parties.</p>
    </form>
  );
}
