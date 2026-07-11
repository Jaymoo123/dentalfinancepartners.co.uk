"use client";

/**
 * Reusable QUALIFIED lead capture used across the conversion surfaces (calculator
 * result, resource block, mobile tool, exit-intent, blog inline). Collects name +
 * phone + email + message, all required, for callable / named / contextful leads
 * fit for partner handoff. Topic-aware, acknowledgement-based, honeypot-protected, and
 * fully stitched to the first-party journey (visitor_id/session_id) so it fires
 * form_start / form_submit / lead_submitted.
 *
 * Behind the NEXT_PUBLIC_MINIFORMS_MULTISTEP flag (miniformsMultistepEnabled) this
 * splits into a two-step qualified flow: step 1 "About you" (role + message), step 2
 * "Contact details" (name + email + phone). With the flag OFF it renders the original
 * single step unchanged (the rollback path); the only flag-off difference is that
 * events stamp flow:"single". The multi path can redirect to /thank-you on success
 * (postSubmit="redirect") mirroring the main LeadForm.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { btnPrimary } from "@/components/ui/layout-utils";
import { niche } from "@/config/niche-loader";
import { siteConfig } from "@/config/site";
import { submitPropertyLead, type PropertyLeadPayload } from "@/lib/leads/submit-client";
import { useFormTracking } from "@/components/analytics/useFormTracking";
import { getVisitorId, getSessionId } from "@accounting-network/web-shared/analytics/ids";
import { useInViewOnce } from "@accounting-network/web-shared/analytics/useInViewOnce";
import { setBookingNudge } from "@accounting-network/web-shared/analytics/visitMemory";
import { flush as flushAnalytics } from "@accounting-network/web-shared/analytics/track";
import { trackExperimentView, trackExperimentAction } from "@/lib/experiments/exposure";
import {
  miniformsMultistepEnabled,
  validateStep1,
  validateStep2,
  buildRoleExtras,
  buildThankYouUrl,
  OTHER_ROLE_VALUE,
  MINI_MESSAGE_MIN_CHARS,
  MINI_MESSAGE_MIN_WORDS,
} from "@/lib/leads/capture-steps";

type Status = "idle" | "loading" | "success" | "error";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const inputClass =
  "mt-1 w-full min-h-12 touch-manipulation rounded-lg border-2 border-slate-300 bg-white px-3.5 py-3 text-base text-slate-900 shadow-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/25 transition-colors";
const backBtnClass =
  "inline-flex min-h-12 items-center justify-center rounded-lg border-2 border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-600/25";

// Step ids passed to the tracking hook (form_step_view / form_step_complete).
const STEP1_ID = "about_you";
const STEP2_ID = "contact_details";
// Message-field placeholder defaults, resolved from the flag (a surface can override).
const MULTI_MESSAGE_PLACEHOLDER = "Briefly: your property situation and what you want help with";
const SINGLE_MESSAGE_PLACEHOLDER = "A sentence or two about your situation helps us help you";

export function MiniCapture({
  formId,
  role = "Other",
  messagePrefix,
  heading,
  blurb,
  submitLabel = "Request a callback",
  successText = "Thanks. Check your phone and email now. Reply to our message to confirm your callback.",
  className = "my-8 rounded-2xl border-l-4 border-emerald-600 bg-slate-50 p-6 sm:p-8",
  messagePlaceholder,
  messageMinLength,
  messageMinWords,
  postSubmit = "inline",
  experimentKey,
  exposeOnView = true,
  onSuccess,
}: {
  /** Surface id for analytics (form tracking + GA label), e.g. "calc_result". */
  formId: string;
  /** Lead role written to the leads table on the single (flag-off) path (default "Other").
   *  On the multi path the role comes from the step-1 select instead. */
  role?: string;
  /** Prefix for the lead message on the single path, e.g. "[Calculator result: section-24]".
   *  Not baked into the message on the multi path (the raw message is sent + form_id in extras). */
  messagePrefix: string;
  heading: string;
  blurb: string;
  submitLabel?: string;
  successText?: string;
  className?: string;
  /** Placeholder (background text) for the message field. Defaults to a flag-aware
   *  prompt; a surface can override it to encourage more detail. */
  messagePlaceholder?: string;
  /** Minimum message length (chars) before submit is allowed. Defaults are computed
   *  from the flag (multi: MINI_MESSAGE_MIN_CHARS, single: 10). Raise it on a surface
   *  that wants a fuller message. */
  messageMinLength?: number;
  /** Minimum message word count. Defaults are computed from the flag (multi:
   *  MINI_MESSAGE_MIN_WORDS, single: 0). Combined with messageMinLength, a surface
   *  (e.g. the result gate) can require "a couple of sentences" of flesh. */
  messageMinWords?: number;
  /** Success behaviour on the multi (flag-on) path: "inline" keeps the success panel,
   *  "redirect" navigates to /thank-you like the main LeadForm. Ignored when the flag
   *  is off (always inline). Default "inline". */
  postSubmit?: "inline" | "redirect";
  /** Parent A/B experiment this capture belongs to (e.g. "exit_intent_offer").
   *  Drives experiment_view (on scroll-into-view, unless exposeOnView=false) +
   *  experiment_action (on first field focus = engaged the capture). */
  experimentKey?: string;
  /** Set false when the parent surface already fires the exposure itself (e.g.
   *  the exit-intent modal fires it once on open for both arms). */
  exposeOnView?: boolean;
  /** Called after a successful lead submit (e.g. so a result-gate can reveal the
   *  result). The lead is already recorded + the visitor marked converted. */
  onSuccess?: () => void;
}) {
  const multi = miniformsMultistepEnabled();
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [sourceUrl, setSourceUrl] = useState("");
  // Multi-step state. step index 0/1 (announced as step 1/2); direction drives the
  // slide; selectedRole is controlled only for roleDetail visibility.
  const [step, setStep] = useState<0 | 1>(0);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [selectedRole, setSelectedRole] = useState("");
  const ft = useFormTracking(formId, { flow: multi ? "multi" : "single" });
  // Stable (useCallback-memoised) reference so the step-change effect below depends
  // on a value that does not churn every render (ft itself is a fresh object).
  const { onStepView } = ft;

  // Message floors + placeholder resolve from the flag so rollback restores today's
  // light floor (10 chars / 0 words) while the multi path uses the qualified floor.
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

  // Building-block funnel: exposure on scroll-into-view (unless the parent fires
  // its own), and the proximal "engaged the capture" action on first field focus.
  const startedExpRef = useRef(false);
  const expRef = useInViewOnce<HTMLElement>(() => {
    if (experimentKey && exposeOnView) trackExperimentView(experimentKey, formId);
    // First honest exposure of step 1 (reuse the same view detection as the experiment).
    if (multi && !step1ViewFiredRef.current) {
      step1ViewFiredRef.current = true;
      onStepView(1, STEP1_ID);
    }
  });
  const markStarted = useCallback(() => {
    if (startedExpRef.current) return;
    startedExpRef.current = true;
    if (experimentKey) trackExperimentAction(experimentKey, formId);
  }, [experimentKey, formId]);

  useEffect(() => {
    if (typeof window !== "undefined") setSourceUrl(window.location.href);
  }, []);

  // On step change (not the initial mount): announce + move focus to the step header
  // (never an input, which would auto-pop the iOS keyboard inside the fixed modals),
  // fire form_step_view(2) the first time step 2 is reached, and reset the step timer.
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

  const consentText = `${siteConfig.leadConsentText} See our Privacy Policy.`;

  // Single-path validator: unchanged four-field logic. Floors come from the resolved
  // values, which are 10/0 with the flag off so behaviour is byte-for-byte with today.
  const validate = useCallback((data: FormData) => {
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
          ? "Please add a little more detail, a couple of sentences about the property or situation, rough figures, and what you'd like us to work out, so a specialist can give you a genuinely useful answer."
          : "Tell us a sentence or two about your situation.";
    }
    return errs;
  }, [resolvedMinLength, resolvedMinWords]);

  // Focus the first invalid field (with scroll, unlike the header focus) after a
  // client-side validation failure. ids follow `${formId}-<suffix>`.
  const focusField = useCallback((suffix: string) => {
    requestAnimationFrame(() => {
      const el = formRef.current?.querySelector<HTMLElement>(`#${formId}-${suffix}`);
      el?.focus();
    });
  }, [formId]);

  // Emit the earliest floor-biting signal (client-side) for the step-1 fields.
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

  // Step 1 -> Step 2. Validate the role-and-message step; on error render + focus the
  // first invalid field; on pass record the step completion and slide forward.
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

  // Step 2 -> Step 1. No validation on the way back.
  function onBack() {
    ft.onStepBack(2, 1);
    setFieldErrors({});
    setErrorMessage(null);
    setDirection("back");
    setStep(0);
  }

  async function onSubmitMulti(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Enter in a step-1 input triggers implicit form submission; treat it as
    // Continue (otherwise step-2 errors would render inside the hidden panel).
    if (step === 0) {
      onNext();
      return;
    }
    setErrorMessage(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    const honeypotValue = String(data.get("enquiry_ref") || "").trim();

    // Defence in depth: a step-1 error jumps back to step 0 and shows it.
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
    ft.onStepComplete(2, STEP2_ID); // immediately before form_submit
    ft.onSubmit(5); // passed validation, about to POST (role + message + name + email + phone)

    setStatus("loading");
    const payload: PropertyLeadPayload = {
      full_name: s2.fullName,
      email: s2.email,
      phone: s2.phone,
      role: s1.role,
      message: s1.message,
      source: niche.content_strategy.source_identifier,
      source_url: sourceUrl,
      submitted_at: new Date().toISOString(),
      // Legitimate-interests acknowledgement: submitting IS the affirmative act, so
      // this is always true; consent_text records the exact wording shown (Annex B.1).
      consent_given: true,
      consent_text: consentText,
      consent_at: new Date().toISOString(),
      visitor_id: getVisitorId() || undefined,
      session_id: getSessionId() || undefined,
      extras: { ...(buildRoleExtras(s1.role, s1.roleDetail) ?? {}), form_id: formId },
    };

    const result = await submitPropertyLead(payload, honeypotValue);
    if (!result.success) {
      setStatus("error");
      setErrorMessage(result.error || "Something went wrong. Please try again or use the full form below.");
      ft.onError("form", "server");
      return;
    }

    ft.onLead({ source: payload.source, role: formId });

    if (typeof window !== "undefined" && "gtag" in window) {
      const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag;
      if (gtag) gtag("event", "generate_lead", { event_category: "engagement", event_label: `${niche.niche_id}_${formId}`, value: 1 });
    }

    if (result.needsCheck) {
      // Lead was recorded but the phone number looks wrong. Keep the user on step 2
      // with their values intact and ask them to re-check.
      setStatus("idle");
      setFieldErrors({ phone: "That number does not look right. Please check it and submit again." });
      return;
    }

    if (postSubmit === "redirect") {
      // Mirror LeadForm's redirect-success: notify the parent, persist the booking
      // capability, then flush the first-party queue and navigate (SPA nav fires no
      // pagehide, so the queued lead_submitted / step events would otherwise wait).
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
    // Capture honeypot value; the server decides what to do with it (never silently drops).
    const honeypotValue = String(data.get("enquiry_ref") || "").trim();

    const errs = validate(data);
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;
    ft.onSubmit(4); // passed validation, about to POST

    setStatus("loading");
    const userMessage = String(data.get("message") || "").trim();
    const payload: PropertyLeadPayload = {
      full_name: String(data.get("full_name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      role,
      message: `${messagePrefix}: ${userMessage}`,
      source: niche.content_strategy.source_identifier,
      source_url: sourceUrl,
      submitted_at: new Date().toISOString(),
      // Legitimate-interests acknowledgement: submitting IS the affirmative act, so
      // this is always true; consent_text records the exact wording shown (Annex B.1).
      consent_given: true,
      consent_text: consentText,
      consent_at: new Date().toISOString(),
      visitor_id: getVisitorId() || undefined,
      session_id: getSessionId() || undefined,
    };

    const result = await submitPropertyLead(payload, honeypotValue);
    if (!result.success) {
      setStatus("error");
      setErrorMessage(result.error || "Something went wrong. Please try again or use the full form below.");
      ft.onError("form", "server");
      return;
    }

    ft.onLead({ source: payload.source, role: formId });

    if (typeof window !== "undefined" && "gtag" in window) {
      const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag;
      if (gtag) gtag("event", "generate_lead", { event_category: "engagement", event_label: `${niche.niche_id}_${formId}`, value: 1 });
    }

    if (result.needsCheck) {
      // Lead was recorded but the phone number looks wrong. Stay on the form.
      setStatus("idle");
      setFieldErrors({ phone: "That number does not look right. Please check it and submit again." });
      return;
    }

    setStatus("success");
    form.reset();
    onSuccess?.();
  }

  const consentNotice = (
    /* Data-sharing acknowledgement (legitimate interests, not consent):
       submitting is the affirmative act, so this is a notice, not a tick-box
       (data-sharing agreement Annex B.1). */
    <p className="text-xs leading-relaxed text-slate-500">
      {siteConfig.leadConsentText} See our{" "}
      <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-700 underline">Privacy Policy</a>.
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
        <div role="status" className="mt-5 rounded-lg border-2 border-emerald-200 bg-emerald-50 p-4">
          <p className="text-sm font-semibold text-emerald-900">{successText}</p>
        </div>
      ) : multi ? (
        <form
          ref={formRef}
          onSubmit={onSubmitMulti}
          {...focusHandlers}
          className="mt-5"
          noValidate
          aria-busy={status === "loading"}
        >
          {/* Honeypot — non-semantic name so autofill/password managers don't target it (was company_url) */}
          <input type="text" name="enquiry_ref" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-px w-px opacity-0" />

          {/* Visually-hidden live region: announces the active step to assistive tech. */}
          <p className="sr-only" aria-live="polite">
            {step === 0 ? "Step 1 of 2, about you" : "Step 2 of 2, contact details"}
          </p>

          <div className="overflow-hidden">
            {/* Step 1: About you (role + message). Stays mounted; hidden keeps its
                values in FormData and out of the tab order. */}
            <div hidden={step !== 0} className={step === 0 ? activeClass : undefined}>
              <div className="space-y-4">
                <p ref={step1HeaderRef} tabIndex={-1} className="text-xs font-semibold uppercase tracking-wide text-emerald-700 outline-none">
                  Step 1 of 2, about you
                </p>

                <div>
                  <label htmlFor={`${formId}-role`} className="block text-sm font-semibold text-slate-900">
                    {niche.lead_form.role_label}
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
                    {niche.lead_form.role_options.map((opt) => (
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

            {/* Step 2: Contact details (name + email + phone). Consent stays co-located
                with the submit button (contractual wording, unaltered). */}
            <div hidden={step !== 1} className={step === 1 ? activeClass : undefined}>
              <div className="space-y-4">
                <p ref={step2HeaderRef} tabIndex={-1} className="text-xs font-semibold uppercase tracking-wide text-emerald-700 outline-none">
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
                    placeholder={niche.lead_form.placeholders.name}
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
                      placeholder={niche.lead_form.placeholders.email}
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
                      placeholder={niche.lead_form.placeholders.phone}
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
        <form
          onSubmit={onSubmitSingle}
          {...focusHandlers}
          className="mt-5 space-y-4"
          noValidate
          aria-busy={status === "loading"}
        >
          {/* Honeypot — non-semantic name so autofill/password managers don't target it (was company_url) */}
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
              placeholder={niche.lead_form.placeholders.name}
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
                placeholder={niche.lead_form.placeholders.email}
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
                placeholder={niche.lead_form.placeholders.phone}
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
