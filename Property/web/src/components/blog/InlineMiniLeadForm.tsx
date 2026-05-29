"use client";

import { useCallback, useEffect, useState } from "react";
import { btnPrimary } from "@/components/ui/layout-utils";
import { niche } from "@/config/niche-loader";
import { submitLead, getSupabaseConfig } from "@accounting-network/web-shared/lib/supabase-client";

type Status = "idle" | "loading" | "success" | "error";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  "mt-1 w-full min-h-12 touch-manipulation rounded-lg border-2 border-slate-300 bg-white px-3.5 py-3 text-base text-slate-900 shadow-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/25 transition-colors";

export function InlineMiniLeadForm({ topic }: { topic?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [sourceUrl, setSourceUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSourceUrl(window.location.href);
    }
  }, []);

  const { supabaseUrl, supabaseKey } = getSupabaseConfig();

  const validate = useCallback((data: FormData) => {
    const errs: Record<string, string> = {};
    const email = String(data.get("email") || "").trim();
    if (!emailRe.test(email)) errs.email = "Enter a valid email address.";
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
      setErrorMessage("Form not connected. Email us directly, we respond same day.");
      return;
    }

    setStatus("loading");
    const situation = String(data.get("situation") || "").trim();
    const topicTag = topic ? ` (${topic})` : "";
    const payload = {
      full_name: "—",
      email: String(data.get("email") || "").trim(),
      phone: "",
      role: "Other",
      practice_name: "—",
      message: `[Inline mini-form${topicTag}] ${situation || "No detail provided"}`,
      source: niche.content_strategy.source_identifier,
      source_url: sourceUrl,
      submitted_at: new Date().toISOString(),
    };

    const result = await submitLead(payload, supabaseUrl, supabaseKey);
    if (!result.success) {
      setStatus("error");
      setErrorMessage(result.error || "Something went wrong. Please try again or use the full form below.");
      return;
    }

    if (typeof window !== "undefined" && "gtag" in window) {
      const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag;
      if (gtag) {
        gtag("event", "generate_lead", {
          event_category: "engagement",
          event_label: `${niche.niche_id}_inline_mini`,
          value: 1,
        });
      }
    }

    setStatus("success");
    form.reset();
  }

  return (
    <section
      className="my-12 border-l-4 border-emerald-600 bg-slate-50 p-6 sm:p-8"
      aria-labelledby="inline-mini-heading"
    >
      <h3 id="inline-mini-heading" className="text-xl font-bold text-slate-900 sm:text-2xl">
        Want this checked against your specific situation?
      </h3>
      <p className="mt-2 text-sm text-slate-700 leading-relaxed">
        Drop your email and a one-line summary. We reply within 24 hours, no phone call needed.
      </p>

      {status === "success" ? (
        <div role="status" className="mt-5 rounded-lg border-2 border-emerald-200 bg-emerald-50 p-4">
          <p className="text-sm font-semibold text-emerald-900">
            Thanks. We&apos;ll be in touch within 24 hours.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-5 space-y-4" noValidate aria-busy={status === "loading"}>
          <div className="grid gap-4 sm:grid-cols-[1fr_2fr]">
            <div>
              <label htmlFor="mini-email" className="block text-sm font-semibold text-slate-900">
                Email
              </label>
              <input
                type="email"
                id="mini-email"
                name="email"
                required
                autoComplete="email"
                maxLength={100}
                placeholder={niche.lead_form.placeholders.email}
                className={inputClass}
                aria-invalid={!!fieldErrors.email}
                aria-describedby={fieldErrors.email ? "mini-email-error" : undefined}
              />
              {fieldErrors.email && (
                <p id="mini-email-error" className="mt-1.5 text-xs font-medium text-red-600">
                  {fieldErrors.email}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="mini-situation" className="block text-sm font-semibold text-slate-900">
                Your situation <span className="font-normal text-slate-500">(optional)</span>
              </label>
              <input
                type="text"
                id="mini-situation"
                name="situation"
                maxLength={200}
                placeholder="e.g. UK landlord with a Lisbon flat, never claimed FTC before"
                className={inputClass}
              />
            </div>
          </div>

          {errorMessage && (
            <div role="alert" className="rounded-lg border-2 border-red-200 bg-red-50 p-3">
              <p className="text-sm font-medium text-red-800">{errorMessage}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className={`${btnPrimary} w-full sm:w-auto`}
          >
            {status === "loading" ? "Sending..." : "Get a quick reply"}
          </button>
        </form>
      )}
    </section>
  );
}
