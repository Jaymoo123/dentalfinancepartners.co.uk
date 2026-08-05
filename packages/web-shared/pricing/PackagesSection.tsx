"use client";

/**
 * Self-serve package pricing surface (experiment pkg_pricing_v1).
 *
 * Renders the 3 priced subscription tiers, an add-on note, the full-width
 * project-work (fixed quote) card, a trust strip, an FAQ, and the signup
 * modal. Visual language mirrors ServiceTiers.tsx (which stays untouched, it
 * has ~14 consumers) with a price block added per card.
 *
 * Signup is a standard form fill through the site's existing
 * POST /api/leads/submit chokepoint. The row is distinguished purely by
 * extras: { form_id: "package_signup", package_id, package_price }.
 *
 * Funnel events (all existing allowlist names, measurable per tier via
 * props.package_id): cta_click -> form_start -> form_submit -> lead_submitted,
 * plus experiment_view/experiment_action on the pkg_pricing_v1 surface.
 */
import { useEffect, useRef, useState } from "react";
import { track } from "../analytics/track";
import { getSessionId, getVisitorId } from "../analytics/ids";
import { useFormTracking } from "../analytics/react/useFormTracking";
import { assignVariant } from "../experiments/assign";
import { setActiveExperiment } from "../analytics/experiments/active";
import {
  trackExperimentAction,
  useExperimentInView,
} from "../experiments/react/exposure";
import type { SiteExperimentRegistry } from "../experiments/types";
import type { PackagesConfig, PackageTier } from "./types";

const EXPERIMENT_KEY = "pkg_pricing_v1";
const FORM_ID = "package_signup";
const ADVISORY_ID = "advisory_project";
const SURFACE = "pricing_page";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  "mt-1 w-full min-h-12 touch-manipulation rounded-lg border-2 border-slate-300 bg-white px-3.5 py-3 text-base text-slate-900 shadow-sm focus:border-[var(--brand-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/25 transition-colors";

const DEFAULT_FAQ = [
  {
    q: "What exactly is included?",
    a: "Each package covers the statutory compliance work listed on the card: the returns, accounts and filings named there, the software to keep your records straight, and answers to compliance questions by email. Tax planning and advisory work is scoped separately as project work with a fixed quote.",
  },
  {
    q: "How does onboarding work?",
    a: "Choose a package and complete the short signup form. No payment is taken today. We contact you within 1 working day to confirm scope, collect what we need, and get you set up. If you are switching accountants we handle the professional handover letter for you.",
  },
  {
    q: "Is there a contract or minimum term?",
    a: "No fixed term. You can cancel with 1 month's notice. If you join partway through your accounting year we will agree any catch-up work and price it before you commit.",
  },
  {
    q: "Do prices include VAT?",
    a: "Prices are shown exclusive of VAT. Where VAT applies it is added at the standard rate and shown clearly before you confirm anything.",
  },
];

interface SelectedPackage {
  id: string;
  name: string;
  price: string;
  priceValue: number | null;
  advisory: boolean;
}

function isQaMode(): boolean {
  if (typeof window === "undefined") return false;
  return (
    new URLSearchParams(window.location.search).get("qa") === "1" ||
    localStorage.getItem("qa_mode") !== null
  );
}

export function PackagesSection({
  config,
  registry,
  compact = false,
}: {
  config: PackagesConfig;
  registry: SiteExperimentRegistry;
  /** Homepage embed: tiers + project-work card only (no trust strip / FAQ). */
  compact?: boolean;
}) {
  const [selected, setSelected] = useState<SelectedPackage | null>(null);

  // Bind the single-arm experiment so props.exp = "pkg_pricing_v1:on" stamps
  // every event this visitor fires (same mechanics as makeUseExperiment).
  useEffect(() => {
    const exp =
      registry.experiments.find(
        (e) => e.key === EXPERIMENT_KEY && e.status === "running",
      ) ?? null;
    const v = assignVariant(getVisitorId() || "", exp);
    if (v) setActiveExperiment(EXPERIMENT_KEY, v);
  }, [registry]);

  const viewRef = useExperimentInView<HTMLDivElement>(EXPERIMENT_KEY, SURFACE);

  function choose(pkg: SelectedPackage) {
    track("cta_click", {
      cta: FORM_ID,
      package_id: pkg.id,
      ...(pkg.priceValue !== null ? { package_price: pkg.priceValue } : {}),
    });
    trackExperimentAction(EXPERIMENT_KEY, SURFACE, { package_id: pkg.id });
    setSelected(pkg);
  }

  return (
    <div ref={viewRef}>
      {/* Tier cards */}
      <div className="grid gap-6 sm:gap-8 md:grid-cols-3 items-start">
        {config.tiers.map((tier) => (
          <TierCard key={tier.id} tier={tier} onChoose={choose} />
        ))}
      </div>
      {config.addOnNote && (
        <p className="mt-4 text-center text-xs sm:text-sm text-slate-500">{config.addOnNote}</p>
      )}

      {/* Project work card */}
      <div className="mt-10 sm:mt-14 border-2 border-slate-200 bg-slate-50 p-6 sm:p-8">
        <div className="md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Project work</h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-2xl">{config.advisory.blurb}</p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              {config.advisory.projectTypes.map((t) => (
                <li key={t} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                  <span className="text-[var(--brand-primary)] font-bold">✓</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 md:mt-0 md:text-center md:flex-shrink-0">
            <div className="text-2xl font-bold text-slate-900">{config.advisory.fromPrice}</div>
            <div className="text-xs text-slate-500">fixed quote, agreed before any work starts</div>
            <button
              type="button"
              onClick={() =>
                choose({
                  id: ADVISORY_ID,
                  name: "Project work",
                  price: config.advisory.fromPrice,
                  priceValue: null,
                  advisory: true,
                })
              }
              className="mt-3 w-full md:w-auto px-6 py-3 text-sm font-bold rounded-lg bg-white border-2 border-[var(--brand-primary)] text-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-white transition-all min-h-[48px] shadow-sm"
            >
              Request a fixed quote
            </button>
          </div>
        </div>
      </div>

      {/* Trust strip */}
      {!compact && (
      <div className="mt-10 grid gap-4 sm:grid-cols-3 text-center">
        {[
          "No fixed term. Cancel with 1 month's notice.",
          "All prices exclude VAT.",
          "We reply within 1 working day.",
        ].map((t) => (
          <div key={t} className="border border-slate-200 bg-white px-4 py-3 text-xs sm:text-sm font-semibold text-slate-700">
            {t}
          </div>
        ))}
      </div>
      )}

      {/* FAQ */}
      {!compact && (
      <div className="mt-12 sm:mt-16 max-w-3xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 text-center">Common questions</h2>
        <dl className="mt-6 space-y-6">
          {[...DEFAULT_FAQ, ...(config.faq ?? [])].map((item) => (
            <div key={item.q}>
              <dt className="font-bold text-slate-900 text-sm sm:text-base">{item.q}</dt>
              <dd className="mt-1.5 text-sm text-slate-600 leading-relaxed">{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
      )}

      {selected && (
        <SignupModal config={config} pkg={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

function TierCard({
  tier,
  onChoose,
}: {
  tier: PackageTier;
  onChoose: (pkg: SelectedPackage) => void;
}) {
  return (
    <div
      className={`relative flex flex-col bg-white border-2 transition-all h-full ${
        tier.featured
          ? "border-[var(--brand-primary)] shadow-lg md:scale-105"
          : "border-slate-200 hover:border-[var(--brand-primary)] hover:shadow-md"
      }`}
    >
      {tier.featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <div className="bg-[var(--brand-primary)] px-4 sm:px-6 py-1.5 text-xs font-bold text-white uppercase tracking-wider whitespace-nowrap">
            Most popular
          </div>
        </div>
      )}
      <div className={`p-6 sm:p-8 flex flex-col h-full ${tier.featured ? "pt-8 sm:pt-10" : ""}`}>
        <div className="text-center mb-4 sm:mb-6">
          <div className="text-lg sm:text-xl font-bold text-slate-900">{tier.name}</div>
          <div className="mt-3">
            <span className="text-4xl sm:text-5xl font-bold text-slate-900">{tier.price}</span>
            <span className="ml-1 text-sm text-slate-500">/month + VAT</span>
          </div>
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">{tier.description}</p>
        </div>
        <ul className="flex-1 space-y-2 sm:space-y-3 mb-6 sm:mb-8">
          {tier.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-slate-700">
              <span className="text-[var(--brand-primary)] font-bold flex-shrink-0 text-base sm:text-lg">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() =>
            onChoose({
              id: tier.id,
              name: tier.name,
              price: tier.price,
              priceValue: tier.priceValue,
              advisory: false,
            })
          }
          className={`w-full text-center px-6 py-3 sm:px-8 sm:py-3.5 text-sm sm:text-base font-bold rounded-lg transition-all mt-auto min-h-[48px] flex items-center justify-center shadow-sm ${
            tier.featured
              ? "bg-[var(--brand-primary)] text-white hover:opacity-90 active:translate-y-0.5"
              : "bg-white border-2 border-slate-300 text-slate-900 hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] active:translate-y-0.5"
          }`}
        >
          Get started
        </button>
      </div>
    </div>
  );
}

type Status = "idle" | "loading" | "success" | "error";

function SignupModal({
  config,
  pkg,
  onClose,
}: {
  config: PackagesConfig;
  pkg: SelectedPackage;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const ft = useFormTracking(FORM_ID);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => headingRef.current?.focus({ preventScroll: true }));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);
    const form = e.currentTarget;
    const data = new FormData(form);

    const fullName = String(data.get("full_name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const businessType = String(data.get("business_type") || "").trim();
    const projectType = String(data.get("project_type") || "").trim();
    const honeypot = String(data.get("enquiry_ref") || "").trim();

    const errs: Record<string, string> = {};
    if (fullName.length < 2) errs.full_name = "Enter your name.";
    if (!EMAIL_RE.test(email)) errs.email = "Enter a valid email address.";
    if (phone.replace(/\D/g, "").length < 10) errs.phone = "Enter a phone number we can call you on.";
    if (!businessType) errs.business_type = "Choose the option closest to you.";
    if (pkg.advisory && !projectType) errs.project_type = "Choose the type of project.";
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) {
      for (const [field] of Object.entries(errs)) ft.onError(field, "validation");
      return;
    }

    ft.onSubmit(pkg.advisory ? 5 : 4);
    setStatus("loading");

    const message = pkg.advisory
      ? `Fixed-quote request: ${projectType}`
      : `Package signup: ${pkg.name} (${pkg.price}/month)`;
    const consentAt = new Date().toISOString();

    try {
      const res = await fetch("/api/leads/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enquiry_ref: honeypot,
          full_name: fullName,
          email,
          phone,
          role: businessType,
          message,
          source_url: typeof window !== "undefined" ? window.location.href : undefined,
          submitted_at: new Date().toISOString(),
          consent_given: true,
          consent_text: `${config.consentText} See our Privacy Policy.`,
          consent_at: consentAt,
          visitor_id: getVisitorId() || undefined,
          session_id: getSessionId() || undefined,
          extras: {
            form_id: FORM_ID,
            package_id: pkg.id,
            ...(pkg.priceValue !== null ? { package_price: pkg.priceValue } : {}),
            ...(pkg.advisory && projectType ? { project_type: projectType } : {}),
            ...(isQaMode() ? { qa: true } : {}),
          },
        }),
      });
      const json = (await res.json().catch(() => null)) as
        | { success?: boolean; error?: string }
        | null;
      if (!res.ok || !json?.success) {
        setStatus("error");
        setErrorMessage(json?.error || "Something went wrong. Please try again.");
        ft.onError("form", "server");
        return;
      }
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
      ft.onError("form", "server");
      return;
    }

    ft.onLead({ package_id: pkg.id });
    if (typeof window !== "undefined" && "gtag" in window) {
      const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag;
      if (gtag)
        gtag("event", "generate_lead", {
          event_category: "engagement",
          event_label: `${FORM_ID}_${pkg.id}`,
          value: 1,
        });
    }
    setStatus("success");
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="package-signup-heading"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full sm:max-w-md max-h-[92vh] overflow-y-auto bg-white p-6 sm:p-8 rounded-t-2xl sm:rounded-xl shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="package-signup-heading"
              ref={headingRef}
              tabIndex={-1}
              className="text-xl font-bold text-slate-900 outline-none"
            >
              {pkg.advisory ? "Request a fixed quote" : `Get started: ${pkg.name}`}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {pkg.advisory
                ? `Project work, ${pkg.price}. We agree a fixed quote before any work starts.`
                : `${pkg.price}/month + VAT. No payment taken today.`}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex-shrink-0 text-2xl leading-none text-slate-400 hover:text-slate-700 min-h-[44px] min-w-[44px]"
          >
            ×
          </button>
        </div>

        {status === "success" ? (
          <div role="status" className="mt-6 rounded-lg border-2 border-green-200 bg-green-50 p-4">
            <p className="text-sm font-semibold text-green-900">
              {pkg.advisory
                ? "Thanks. We will contact you within 1 working day with a fixed quote for your project."
                : "Thanks, you are on the list. We will contact you within 1 working day to complete your onboarding. No payment is taken until everything is agreed."}
            </p>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mt-5 space-y-4"
            noValidate
            aria-busy={status === "loading"}
            onFocusCapture={(e) => {
              const t = e.target as HTMLElement & { name?: string };
              if (t?.name && t.name !== "enquiry_ref") ft.onFieldFocus(t.name);
            }}
          >
            <input
              type="text"
              name="enquiry_ref"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute left-[-9999px] top-[-9999px] h-px w-px opacity-0"
            />
            <div>
              <label htmlFor="pkg-name" className="block text-sm font-semibold text-slate-900">Full name</label>
              <input type="text" id="pkg-name" name="full_name" required autoComplete="name" maxLength={100} className={inputClass} aria-invalid={!!fieldErrors.full_name} />
              {fieldErrors.full_name && <p className="mt-1.5 text-xs font-medium text-red-600">{fieldErrors.full_name}</p>}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="pkg-email" className="block text-sm font-semibold text-slate-900">Email</label>
                <input type="email" id="pkg-email" name="email" required autoComplete="email" maxLength={100} className={inputClass} aria-invalid={!!fieldErrors.email} />
                {fieldErrors.email && <p className="mt-1.5 text-xs font-medium text-red-600">{fieldErrors.email}</p>}
              </div>
              <div>
                <label htmlFor="pkg-phone" className="block text-sm font-semibold text-slate-900">Phone</label>
                <input type="tel" id="pkg-phone" name="phone" required autoComplete="tel" maxLength={20} className={inputClass} aria-invalid={!!fieldErrors.phone} />
                {fieldErrors.phone && <p className="mt-1.5 text-xs font-medium text-red-600">{fieldErrors.phone}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="pkg-business" className="block text-sm font-semibold text-slate-900">Which best describes you?</label>
              <select id="pkg-business" name="business_type" required defaultValue="" className={inputClass} aria-invalid={!!fieldErrors.business_type}>
                <option value="" disabled>Select...</option>
                {config.businessTypes.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {fieldErrors.business_type && <p className="mt-1.5 text-xs font-medium text-red-600">{fieldErrors.business_type}</p>}
            </div>
            {pkg.advisory && (
              <div>
                <label htmlFor="pkg-project" className="block text-sm font-semibold text-slate-900">What kind of project?</label>
                <select id="pkg-project" name="project_type" required defaultValue="" className={inputClass} aria-invalid={!!fieldErrors.project_type}>
                  <option value="" disabled>Select...</option>
                  {config.advisory.projectTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                {fieldErrors.project_type && <p className="mt-1.5 text-xs font-medium text-red-600">{fieldErrors.project_type}</p>}
              </div>
            )}
            {errorMessage && (
              <div role="alert" className="rounded-lg border-2 border-red-200 bg-red-50 p-3">
                <p className="text-sm font-medium text-red-800">{errorMessage}</p>
              </div>
            )}
            <p className="text-xs leading-relaxed text-slate-500">
              {config.consentText} See our{" "}
              <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="font-semibold text-[var(--brand-primary)] underline">Privacy Policy</a>.
            </p>
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full px-6 py-3.5 text-base font-bold bg-[var(--brand-primary)] text-white hover:opacity-90 transition-all min-h-[48px] disabled:opacity-60"
            >
              {status === "loading"
                ? "Sending..."
                : pkg.advisory
                  ? "Request my fixed quote"
                  : "Complete signup"}
            </button>
            <p className="text-center text-xs text-slate-500">
              No payment taken today. We contact you within 1 working day.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
