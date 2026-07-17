"use client";

/**
 * Shared qualified lead capture used across the conversion surfaces.
 * Collects name + phone + email + message for callable / named / contextful leads.
 *
 * Site-specific values are injected via `siteConfig` and `submitLead` props so no
 * per-site forks live inside this component. Behind NEXT_PUBLIC_MINIFORMS_MULTISTEP
 * this splits into a two-step flow (role+message / contact details); with the flag
 * off it renders the original single step (rollback path).
 *
 * Analytics event names and props are LOCKED (deploy-watch queries depend on them):
 *   form_error, form_step_complete, flow:"multi"/"single", form_ids incl. calc_result_gate.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { btnPrimary } from "../components/ui/layout-utils";
import { useInViewOnce } from "../analytics/useInViewOnce";
import { getVisitorId, getSessionId } from "../analytics/ids";
import { setBookingNudge } from "../analytics/visitMemory";
import { flush as flushAnalytics } from "../analytics/track";
import {
  miniformsMultistepEnabled,
  validateStep1,
  validateStep2,
  buildRoleExtras,
  buildThankYouUrl,
  OTHER_ROLE_VALUE,
  MINI_MESSAGE_MIN_CHARS,
  MINI_MESSAGE_MIN_WORDS,
} from "./capture-steps";
import { useFormTracking } from "../analytics/react/useFormTracking";

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "mt-1 w-full min-h-12 touch-manipulation rounded-lg border-2 border-slate-300 bg-white px-3.5 py-3 text-base text-slate-900 shadow-sm focus:border-[var(--brand-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/25 transition-colors";
const backBtnClass =
  "inline-flex min-h-12 items-center justify-center rounded-lg border-2 border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/25";

const STEP1_ID = "about_you";
const STEP2_ID = "contact_details";
const MULTI_MESSAGE_PLACEHOLDER = "Briefly: your situation and what you want help with";
const SINGLE_MESSAGE_PLACEHOLDER = "A sentence or two about your situation helps us help you";

/** Per-site config injected by the consumer (never hardcoded in shared code). */
export interface MiniCaptureConfig {
  sourceIdentifier: string;
  consentText: string;
  nicheId: string;
  leadForm: {
    roleLabel: string;
    roleOptions: { value: string; label: string }[];
    placeholders: { name: string; email: string; phone: string };
  };
}

/** Submit function type — site provides its own lead submission path. */
export interface MiniCaptureSubmitResult {
  success: boolean;
  error?: string;
  bookingToken?: string;
  needsCheck?: boolean;
}

export type MiniCaptureSubmitFn = (
  payload: {
    full_name: string;
    email: string;
    phone: string;
    role: string;
    message: string;
    source: string;
    source_url?: string;
    submitted_at?: string;
    consent_given?: boolean;
    consent_text?: string;
    consent_at?: string;
    visitor_id?: string;
    session_id?: string;
    extras?: Record<string, unknown>;
  },
  honeypot: string,
) => Promise<MiniCaptureSubmitResult>;

export function MiniCapture({
  formId,
  role = "Other",
  messagePrefix,
  heading,
  blurb,
  submitLabel = "Request a callback",
  successText = "Thanks. Check your phone and email now. Reply to our message to confirm your callback.",
  className = "my-8 rounded-2xl border-l-4 border-[var(--brand-primary)] bg-slate-50 p-6 sm:p-8",
  messagePlaceholder,
  messageMinLength,
  messageMinWords,
  postSubmit = "inline",
  experimentKey,
  exposeOnView = true,
  onSuccess,
  siteConfig,
  submitLead,
  onExperimentView,
  onExperimentAction,
}: {
  formId: string;
  role?: string;
  messagePrefix: string;
  heading: string;
  blurb: string;
  submitLabel?: string;
  successText?: string;
  className?: string;
  messagePlaceholder?: string;
  messageMinLength?: number;
  messageMinWords?: number;
  postSubmit?: "inline" | "redirect";
  experimentKey?: string;
  exposeOnView?: boolean;
  onSuccess?: () => void;
  siteConfig: MiniCaptureConfig;
  submitLead: MiniCaptureSubmitFn;
  onExperimentView?: (key: string, formId: string) => void;
  onExperimentAction?: (key: string, formId: string) => void;
}) {
  const multi = miniformsMultistepEnabled();
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [sourceUrl, setSourceUrl] = useState("");
  const [step, setStep] = useState<0 | 1>(0);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [selectedRole, setSelectedRole] = useState("");
  const ft = useFormTracking(formId, { flow: multi ? "multi" : "single" });
  const { onStepView } = ft;

  const resolvedMinLength = messageMinLength ?? (multi ? MINI_MESSAGE_MIN_CHARS : 10);
  const resolvedMinWords = messageMinWords ?? (multi ? MINI_MESSAGE_MIN_WORDS : 0);
  const resolvedPlaceholder =
    messagePlaceholder ?? (multi ? MULTI_MESSAGE_PLACEHOLDER : SINGLE_MESSAGE_PLACEHOLDER);

  const formRef = useRef<HTMLFormElement>(null);
  const step1HeaderRef = useRef<HTMLParagraphElement>(null);
  const step2HeaderRef = useRef<HTMLParagraphElement>(null);
  const stepStartRef = useRef<number>(Date.now());
  const didMountRef = useRef(false);
  const step1ViewFiredRef = useRef(false);
  const step2ViewFiredRef = useRef(false);
  const startedExpRef = useRef(false);

  const expRef = useInViewOnce<HTMLElement>(() => {
    if (experimentKey && exposeOnView) onExperimentView?.(experimentKey, formId);
    if (multi && !step1ViewFiredRef.current) {
      step1ViewFiredRef.current = true;
      onStepView(1, STEP1_ID);
    }
  });

  const markStarted = useCallback(() => {
    if (startedExpRef.current) return;
    startedExpRef.current = true;
    if (experimentKey) onExperimentAction?.(experimentKey, formId);
  }, [experimentKey, formId, onExperimentAction]);

  useEffect(() => {
    if (typeof window !== "undefined") setSourceUrl(window.location.href);
  }, []);

  function isQaMode(): boolean {
    if (typeof window === "undefined") return false;
    return new URLSearchParams(window.location.search).get("qa") === "1" ||
      localStorage.getItem("qa_mode") !== null;
  }

  useEffect(() => {
    if (!multi) return;
    if (step === 1 && !step2ViewFiredRef.current) {
      step2ViewFiredRef.current = true;
      onStepView(2, STEP2_ID);
    }
    stepStartRef.current = Date.now();
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    const header = step === 0 ? step1HeaderRef.current : step2HeaderRef.current;
    if (header) {
      requestAnimationFrame(() => header.focus({ preventScroll: true }));
    }
  }, [step, multi, onStepView]);

  const consentText = `${siteConfig.consentText} See our Privacy Policy.`;

  const validate = useCallback(
    (data: FormData) => {
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const errs: Record<string, string> = {};
      if (String(data.get("full_name") || "").trim().length < 2) errs.full_name = "Enter your name.";
      if (!emailRe.test(String(data.get("email") || "").trim())) errs.email = "Enter a valid email address.";
      const digits = String(data.get("phone") || "").replace(/\D/g, "");
      if (digits.length < 10) errs.phone = "Enter a phone number we can call you on.";
      const message = String(data.get("message") || "").trim();
      const wordCount = message ? message.split(/\s+/).filter(Boolean).length : 0;
      if (message.length < resolvedMinLength || wordCount < resolvedMinWords) {
        errs.message =
          resolvedMinWords > 0 || resolvedMinLength > 10
            ? "Please add a little more detail, a couple of sentences about your situation, so a specialist can give you a genuinely useful answer."
            : "Tell us a sentence or two about your situation.";
      }
      return errs;
    },
    [resolvedMinLength, resolvedMinWords],
  );

  const focusField = useCallback(
    (suffix: string) => {
      requestAnimationFrame(() => {
        const el = formRef.current?.querySelector<HTMLElement>(`#${formId}-${suffix}`);
        el?.focus();
      });
    },
    [formId],
  );

  const emitStep1Floor = useCallback(
    (errs: Record<string, string>, message: string) => {
      if (errs.role) ft.onError("role", "role_missing", 1);
      if (errs.roleDetail) ft.onError("roleDetail", "role_missing", 1);
      if (errs.message) {
        const trimmed = message.trim();
        const kind = trimmed.length < resolvedMinLength ? "min_length" : "min_words";
        ft.onError("message", kind, 1);
      }
    },
    [ft, resolvedMinLength],
  );

  function readStep1(data: FormData) {
    return {
      role: String(data.get("role") || "").trim(),
      roleDetail: String(data.get("roleDetail") || "").trim(),
      message: String(data.get("message") || "").trim(),
    };
  }
  function readStep2(data: FormData) {
    return {
      fullName: String(data.get("full_name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
    };
  }

  function onNext() {
    const form = formRef.current;
    if (!form) return;
    const s1 = readStep1(new FormData(form));
    const errs = validateStep1(s1, { minChars: resolvedMinLength, minWords: resolvedMinWords });
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      emitStep1Floor(errs, s1.message);
      const firstInvalid = errs.role ? "role" : errs.roleDetail ? "roleDetail" : "message";
      focusField(firstInvalid);
      return;
    }
    setFieldErrors({});
    ft.onStepComplete(1, STEP1_ID, { ms_on_step: Date.now() - stepStartRef.current, lead_role: s1.role });
    setDirection("forward");
    setStep(1);
  }

  function onBack() {
    ft.onStepBack(2, 1);
    setFieldErrors({});
    setErrorMessage(null);
    setDirection("back");
    setStep(0);
  }

  async function onSubmitMulti(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (step === 0) {
      onNext();
      return;
    }
    setErrorMessage(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    const honeypotValue = String(data.get("enquiry_ref") || "").trim();

    const s1 = readStep1(data);
    const s1Errs = validateStep1(s1, { minChars: resolvedMinLength, minWords: resolvedMinWords });
    if (Object.keys(s1Errs).length > 0) {
      setFieldErrors(s1Errs);
      emitStep1Floor(s1Errs, s1.message);
      setDirection("back");
      setStep(0);
      return;
    }

    const s2 = readStep2(data);
    const s2Errs = validateStep2(s2);
    if (Object.keys(s2Errs).length > 0) {
      setFieldErrors(s2Errs);
      const firstInvalid = s2Errs.fullName ? "name" : s2Errs.email ? "email" : "phone";
      focusField(firstInvalid);
      return;
    }

    setFieldErrors({});
    ft.onStepComplete(2, STEP2_ID);
    ft.onSubmit(5);

    setStatus("loading");
    const consentAt = new Date().toISOString();
    const payload = {
      full_name: s2.fullName,
      email: s2.email,
      phone: s2.phone,
      role: s1.role,
      message: s1.message,
      source: siteConfig.sourceIdentifier,
      source_url: sourceUrl,
      submitted_at: new Date().toISOString(),
      consent_given: true,
      consent_text: consentText,
      consent_at: consentAt,
      visitor_id: getVisitorId() || undefined,
      session_id: getSessionId() || undefined,
      extras: { ...(buildRoleExtras(s1.role, s1.roleDetail) ?? {}), form_id: formId, ...(isQaMode() ? { qa: true } : {}) },
    };

    const result = await submitLead(payload, honeypotValue);
    if (!result.success) {
      setStatus("error");
      setErrorMessage(result.error || "Something went wrong. Please try again or use the full form below.");
      ft.onError("form", "server");
      return;
    }

    ft.onLead({ source: payload.source, role: formId });

    if (typeof window !== "undefined" && "gtag" in window) {
      const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag;
      if (gtag) gtag("event", "generate_lead", { event_category: "engagement", event_label: `${siteConfig.nicheId}_${formId}`, value: 1 });
    }

    if (result.needsCheck) {
      setStatus("idle");
      setFieldErrors({ phone: "That number does not look right. Please check it and submit again." });
      return;
    }

    if (postSubmit === "redirect") {
      onSuccess?.();
      if (result.bookingToken) setBookingNudge(result.bookingToken, Date.now() + 14 * 24 * 3600000);
      setTimeout(() => {
        flushAnalytics();
        router.push(
          buildThankYouUrl(result.bookingToken, window.location.pathname + window.location.search + window.location.hash),
        );
      }, 800);
      return;
    }

    setStatus("success");
    form.reset();
    onSuccess?.();
  }

  async function onSubmitSingle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    const honeypotValue = String(data.get("enquiry_ref") || "").trim();

    const errs = validate(data);
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;
    ft.onSubmit(4);

    setStatus("loading");
    const userMessage = String(data.get("message") || "").trim();
    const consentAt = new Date().toISOString();
    const payload = {
      full_name: String(data.get("full_name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      role,
      message: `${messagePrefix}: ${userMessage}`,
      source: siteConfig.sourceIdentifier,
      source_url: sourceUrl,
      submitted_at: new Date().toISOString(),
      consent_given: true,
      consent_text: consentText,
      consent_at: consentAt,
      visitor_id: getVisitorId() || undefined,
      session_id: getSessionId() || undefined,
      ...(isQaMode() ? { extras: { qa: true } } : {}),
    };

    const result = await submitLead(payload, honeypotValue);
    if (!result.success) {
      setStatus("error");
      setErrorMessage(result.error || "Something went wrong. Please try again or use the full form below.");
      ft.onError("form", "server");
      return;
    }

    ft.onLead({ source: payload.source, role: formId });

    if (typeof window !== "undefined" && "gtag" in window) {
      const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag;
      if (gtag) gtag("event", "generate_lead", { event_category: "engagement", event_label: `${siteConfig.nicheId}_${formId}`, value: 1 });
    }

    if (result.needsCheck) {
      setStatus("idle");
      setFieldErrors({ phone: "That number does not look right. Please check it and submit again." });
      return;
    }

    setStatus("success");
    form.reset();
    onSuccess?.();
  }

  // Consent is acknowledgement-by-submission (owner decision 2026-07-17): notice text only, no checkbox.
  const consentNotice = (
    <p className="text-xs leading-relaxed text-slate-500">
      {siteConfig.consentText} See our{" "}
      <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="font-semibold text-[var(--brand-primary)] underline">Privacy Policy</a>.
    </p>
  );

  const focusHandlers = {
    onFocusCapture: (e: React.FocusEvent<HTMLFormElement>) => {
      const t = e.target as HTMLElement & { name?: string };
      if (t?.name) {
        ft.onFieldFocus(t.name);
        markStarted();
      }
    },
    onBlurCapture: (e: React.FocusEvent<HTMLFormElement>) => {
      const t = e.target as HTMLElement & { name?: string; value?: string };
      if (t?.name) ft.onFieldBlur(t.name, Boolean(t.value && t.value.trim()));
    },
  };

  const activeClass =
    direction === "forward"
      ? "animate-in fade-in slide-in-from-right-8 duration-300 motion-reduce:animate-none"
      : "animate-in fade-in slide-in-from-left-8 duration-300 motion-reduce:animate-none";

  return (
    <section ref={expRef} className={className} aria-labelledby={`${formId}-heading`}>
      <h3 id={`${formId}-heading`} className="text-xl font-bold text-slate-900 sm:text-2xl">
        {heading}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-700">{blurb}</p>

      {status === "success" ? (
        <div role="status" className="mt-5 rounded-lg border-2 border-green-200 bg-green-50 p-4">
          <p className="text-sm font-semibold text-green-900">{successText}</p>
        </div>
      ) : multi ? (
        <form ref={formRef} onSubmit={onSubmitMulti} {...focusHandlers} className="mt-5" noValidate aria-busy={status === "loading"}>
          <input type="text" name="enquiry_ref" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-px w-px opacity-0" />
          <p className="sr-only" aria-live="polite">
            {step === 0 ? "Step 1 of 2, about you" : "Step 2 of 2, contact details"}
          </p>
          <div className="overflow-hidden">
            <div hidden={step !== 0} className={step === 0 ? activeClass : undefined}>
              <div className="space-y-4">
                <p ref={step1HeaderRef} tabIndex={-1} className="text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)] outline-none">
                  Step 1 of 2, about you
                </p>
                <div>
                  <label htmlFor={`${formId}-role`} className="block text-sm font-semibold text-slate-900">
                    {siteConfig.leadForm.roleLabel}
                  </label>
                  <select
                    id={`${formId}-role`}
                    name="role"
                    required
                    autoComplete="off"
                    className={inputClass}
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    aria-invalid={!!fieldErrors.role}
                    aria-describedby={fieldErrors.role ? `${formId}-role-error` : undefined}
                  >
                    <option value="" disabled>Select...</option>
                    {siteConfig.leadForm.roleOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  {fieldErrors.role && (
                    <p id={`${formId}-role-error`} className="mt-1.5 text-xs font-medium text-red-600">{fieldErrors.role}</p>
                  )}
                </div>
                {selectedRole === OTHER_ROLE_VALUE && (
                  <div>
                    <label htmlFor={`${formId}-roleDetail`} className="block text-sm font-semibold text-slate-900">
                      Tell us what best describes you
                    </label>
                    <input
                      type="text"
                      id={`${formId}-roleDetail`}
                      name="roleDetail"
                      required
                      autoComplete="off"
                      maxLength={150}
                      className={inputClass}
                      aria-invalid={!!fieldErrors.roleDetail}
                      aria-describedby={fieldErrors.roleDetail ? `${formId}-roleDetail-error` : undefined}
                    />
                    {fieldErrors.roleDetail && (
                      <p id={`${formId}-roleDetail-error`} className="mt-1.5 text-xs font-medium text-red-600">{fieldErrors.roleDetail}</p>
                    )}
                  </div>
                )}
                <div>
                  <label htmlFor={`${formId}-message`} className="block text-sm font-semibold text-slate-900">How can we help?</label>
                  <textarea
                    id={`${formId}-message`}
                    name="message"
                    required
                    rows={3}
                    maxLength={1000}
                    placeholder={resolvedPlaceholder}
                    className={inputClass}
                    aria-invalid={!!fieldErrors.message}
                    aria-describedby={fieldErrors.message ? `${formId}-message-error` : undefined}
                  />
                  {fieldErrors.message && (
                    <p id={`${formId}-message-error`} className="mt-1.5 text-xs font-medium text-red-600">{fieldErrors.message}</p>
                  )}
                </div>
                <button type="button" onClick={onNext} className={`${btnPrimary} w-full sm:w-auto`}>
                  Continue
                </button>
              </div>
            </div>
            <div hidden={step !== 1} className={step === 1 ? activeClass : undefined}>
              <div className="space-y-4">
                <p ref={step2HeaderRef} tabIndex={-1} className="text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)] outline-none">
                  Step 2 of 2, contact details
                </p>
                <div>
                  <label htmlFor={`${formId}-name`} className="block text-sm font-semibold text-slate-900">Full name</label>
                  <input
                    type="text"
                    id={`${formId}-name`}
                    name="full_name"
                    required
                    autoComplete="name"
                    maxLength={100}
                    placeholder={siteConfig.leadForm.placeholders.name}
                    className={inputClass}
                    aria-invalid={!!fieldErrors.fullName}
                    aria-describedby={fieldErrors.fullName ? `${formId}-name-error` : undefined}
                  />
                  {fieldErrors.fullName && (
                    <p id={`${formId}-name-error`} className="mt-1.5 text-xs font-medium text-red-600">{fieldErrors.fullName}</p>
                  )}
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor={`${formId}-email`} className="block text-sm font-semibold text-slate-900">Email</label>
                    <input
                      type="email"
                      id={`${formId}-email`}
                      name="email"
                      required
                      autoComplete="email"
                      maxLength={100}
                      placeholder={siteConfig.leadForm.placeholders.email}
                      className={inputClass}
                      aria-invalid={!!fieldErrors.email}
                      aria-describedby={fieldErrors.email ? `${formId}-email-error` : undefined}
                    />
                    {fieldErrors.email && (
                      <p id={`${formId}-email-error`} className="mt-1.5 text-xs font-medium text-red-600">{fieldErrors.email}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor={`${formId}-phone`} className="block text-sm font-semibold text-slate-900">Phone</label>
                    <input
                      type="tel"
                      id={`${formId}-phone`}
                      name="phone"
                      required
                      autoComplete="tel"
                      maxLength={20}
                      placeholder={siteConfig.leadForm.placeholders.phone}
                      className={inputClass}
                      aria-invalid={!!fieldErrors.phone}
                      aria-describedby={fieldErrors.phone ? `${formId}-phone-error` : undefined}
                    />
                    {fieldErrors.phone && (
                      <p id={`${formId}-phone-error`} className="mt-1.5 text-xs font-medium text-red-600">{fieldErrors.phone}</p>
                    )}
                  </div>
                </div>
                {errorMessage && (
                  <div role="alert" className="rounded-lg border-2 border-red-200 bg-red-50 p-3">
                    <p className="text-sm font-medium text-red-800">{errorMessage}</p>
                  </div>
                )}
                {consentNotice}
                <div className="flex items-center gap-3">
                  <button type="button" onClick={onBack} className={backBtnClass}>Back</button>
                  <button type="submit" disabled={status === "loading"} className={`${btnPrimary} flex-1`}>
                    {status === "loading" ? "Verifying your details..." : submitLabel}
                  </button>
                </div>
                <p className="text-xs leading-relaxed text-slate-500">
                  You&apos;ll get a text and email from us right away. A quick reply locks in your callback.
                </p>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <form onSubmit={onSubmitSingle} {...focusHandlers} className="mt-5 space-y-4" noValidate aria-busy={status === "loading"}>
          <input type="text" name="enquiry_ref" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-px w-px opacity-0" />
          <div>
            <label htmlFor={`${formId}-name`} className="block text-sm font-semibold text-slate-900">Full name</label>
            <input
              type="text"
              id={`${formId}-name`}
              name="full_name"
              required
              autoComplete="name"
              maxLength={100}
              placeholder={siteConfig.leadForm.placeholders.name}
              className={inputClass}
              aria-invalid={!!fieldErrors.full_name}
            />
            {fieldErrors.full_name && <p className="mt-1.5 text-xs font-medium text-red-600">{fieldErrors.full_name}</p>}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor={`${formId}-email`} className="block text-sm font-semibold text-slate-900">Email</label>
              <input
                type="email"
                id={`${formId}-email`}
                name="email"
                required
                autoComplete="email"
                maxLength={100}
                placeholder={siteConfig.leadForm.placeholders.email}
                className={inputClass}
                aria-invalid={!!fieldErrors.email}
              />
              {fieldErrors.email && <p className="mt-1.5 text-xs font-medium text-red-600">{fieldErrors.email}</p>}
            </div>
            <div>
              <label htmlFor={`${formId}-phone`} className="block text-sm font-semibold text-slate-900">Phone</label>
              <input
                type="tel"
                id={`${formId}-phone`}
                name="phone"
                required
                autoComplete="tel"
                maxLength={20}
                placeholder={siteConfig.leadForm.placeholders.phone}
                className={inputClass}
                aria-invalid={!!fieldErrors.phone}
              />
              {fieldErrors.phone && <p className="mt-1.5 text-xs font-medium text-red-600">{fieldErrors.phone}</p>}
            </div>
          </div>
          <div>
            <label htmlFor={`${formId}-message`} className="block text-sm font-semibold text-slate-900">How can we help?</label>
            <textarea
              id={`${formId}-message`}
              name="message"
              required
              rows={3}
              maxLength={1000}
              placeholder={resolvedPlaceholder}
              className={inputClass}
              aria-invalid={!!fieldErrors.message}
            />
            {fieldErrors.message && <p className="mt-1.5 text-xs font-medium text-red-600">{fieldErrors.message}</p>}
          </div>
          {consentNotice}
          {errorMessage && (
            <div role="alert" className="rounded-lg border-2 border-red-200 bg-red-50 p-3">
              <p className="text-sm font-medium text-red-800">{errorMessage}</p>
            </div>
          )}
          <button type="submit" disabled={status === "loading"} className={`${btnPrimary} w-full sm:w-auto`}>
            {status === "loading" ? "Verifying your details..." : submitLabel}
          </button>
          <p className="text-xs leading-relaxed text-slate-500">
            You&apos;ll get a text and email from us right away. A quick reply locks in your callback.
          </p>
        </form>
      )}
    </section>
  );
}
