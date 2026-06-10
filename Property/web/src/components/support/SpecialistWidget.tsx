"use client";

/**
 * Curated specialist widget — a topic-aware FAQ plus an honest "ask a specialist"
 * lead capture. Not a chatbot pretending to be a person: it answers common
 * questions and routes the rest to a real specialist (lead). Consent/SSR-safe,
 * no-op in /embed and /admin (gated via the intent context).
 */
import { useRef, useState } from "react";
import { niche } from "@/config/niche-loader";
import { submitLead, getSupabaseConfig } from "@accounting-network/web-shared/lib/supabase-client";
import { useFormTracking } from "@/components/analytics/useFormTracking";
import { getVisitorId, getSessionId } from "@/lib/analytics/ids";
import { track } from "@/lib/analytics/track";
import { useIntentContext } from "@/components/intent/IntentProvider";
import { getTopic } from "@/lib/intent/taxonomy";
import { faqForTopic } from "@/lib/support/faq";

type Status = "idle" | "loading" | "success" | "error";
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const inputClass =
  "mt-1 w-full rounded-lg border-2 border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/25";

export function SpecialistWidget() {
  const ctx = useIntentContext();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);
  const openedRef = useRef(false);
  const ft = useFormTracking("specialist_widget");

  // ctx is null in /embed, /admin, or when the visitor opted out.
  if (!ctx) return null;

  const topic = getTopic(ctx.pageTopic ?? ctx.entryTopic);
  const faqs = faqForTopic(topic?.key ?? null);
  const { supabaseUrl, supabaseKey } = getSupabaseConfig();
  const consentText = `I agree to my details being shared by ${niche.display_name} with specialist partners for the purpose of responding to my enquiry and providing specialist advice. See our Privacy Policy.`;

  const onToggle = () => {
    setOpen((v) => {
      const next = !v;
      if (next && !openedRef.current) {
        openedRef.current = true;
        track("support_opened", { topic: topic?.key ?? "" });
      }
      return next;
    });
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const data = new FormData(e.currentTarget);
    if (String(data.get("company_url") || "").trim() !== "") return; // honeypot
    const email = String(data.get("email") || "").trim();
    const question = String(data.get("question") || "").trim();
    if (!emailRe.test(email)) {
      setError("Enter a valid email address.");
      ft.onError("email", "validation");
      return;
    }
    if (!consent) {
      setError("Please tick the box to continue.");
      return;
    }
    ft.onSubmit(2);
    if (!supabaseUrl || !supabaseKey) {
      setStatus("error");
      setError("Form not connected. Email us directly, we reply same day.");
      return;
    }
    setStatus("loading");
    const topicTag = topic ? ` (${topic.key})` : "";
    const payload = {
      full_name: "—",
      email,
      phone: "",
      role: "Other",
      practice_name: "—",
      message: `[Specialist question${topicTag}] ${question || "No detail provided"}`,
      source: niche.content_strategy.source_identifier,
      source_url: typeof window !== "undefined" ? window.location.href : "",
      submitted_at: new Date().toISOString(),
      consent_given: consent,
      consent_text: consentText,
      consent_at: new Date().toISOString(),
      visitor_id: getVisitorId() || undefined,
      session_id: getSessionId() || undefined,
    };
    const result = await submitLead(payload, supabaseUrl, supabaseKey);
    if (!result.success) {
      setStatus("error");
      setError(result.error || "Something went wrong. Please try again.");
      ft.onError("form", "server");
      return;
    }
    ft.onLead({ source: payload.source, role: "specialist_widget" });
    setStatus("success");
    setConsent(false);
  }

  return (
    <div className="fixed bottom-24 right-4 z-[55] flex flex-col items-end print:hidden">
      {open && (
        <div className="mb-3 w-[min(92vw,22rem)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-slate-900 px-4 py-3 text-white">
            <div>
              <p className="text-sm font-bold">Ask a property tax specialist</p>
              <p className="text-[11px] text-slate-300">A specialist replies within one working day</p>
            </div>
            <button type="button" aria-label="Close" onClick={() => setOpen(false)} className="text-slate-300 hover:text-white">
              &times;
            </button>
          </div>
          <div className="max-h-[60vh] overflow-y-auto p-4">
            <div className="space-y-1.5">
              {faqs.map((f, i) => (
                <details key={i} className="rounded-lg border border-slate-200 bg-slate-50 p-2.5">
                  <summary className="cursor-pointer text-sm font-semibold text-slate-800">{f.q}</summary>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{f.a}</p>
                </details>
              ))}
            </div>
            {status === "success" ? (
              <div className="mt-4 rounded-lg border-2 border-emerald-200 bg-emerald-50 p-3">
                <p className="text-sm font-semibold text-emerald-900">
                  Thanks. A specialist will reply within one working day.
                </p>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="mt-4 space-y-2.5"
                noValidate
                onFocusCapture={(e) => {
                  const t = e.target;
                  if ((t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement) && t.name) ft.onFieldFocus(t.name);
                }}
                onBlurCapture={(e) => {
                  const t = e.target;
                  if ((t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement) && t.name)
                    ft.onFieldBlur(t.name, Boolean(t.value && t.value.trim()), t.name === "email" ? t.value.length : undefined);
                }}
              >
                <input type="text" name="company_url" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-px w-px opacity-0" />
                <p className="text-xs font-semibold text-slate-700">Or send a specialist your question:</p>
                <input type="email" name="email" required placeholder="Your email" autoComplete="email" maxLength={100} className={inputClass} />
                <textarea name="question" rows={2} maxLength={500} placeholder="Your question (optional)" className={inputClass} />
                <label className="flex items-start gap-2 text-[11px] leading-relaxed text-slate-500">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-emerald-600"
                  />
                  <span>
                    I agree to my details being shared with specialist partners to respond to my enquiry. See our{" "}
                    <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-700 underline">
                      Privacy Policy
                    </a>
                    .
                  </span>
                </label>
                {error && <p className="text-xs font-medium text-red-600">{error}</p>}
                <button
                  type="submit"
                  disabled={status === "loading" || !consent}
                  className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
                >
                  {status === "loading" ? "Sending..." : "Send to a specialist"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={onToggle}
        data-cta="specialist_widget"
        className="flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-2xl hover:bg-emerald-700"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {open ? "Close" : "Ask a specialist"}
      </button>
    </div>
  );
}
