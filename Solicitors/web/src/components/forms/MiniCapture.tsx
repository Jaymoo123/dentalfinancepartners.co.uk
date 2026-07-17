"use client";

import React from "react";

/**
 * Thin site adapter: wires the shared MiniCapture to the Solicitors site.
 *
 * Consumers import from "@/components/forms/MiniCapture" and get an
 * identical prop surface to the old local component, so no call sites change.
 *
 * Multi-step mode: enabled at deploy via NEXT_PUBLIC_MINIFORMS_MULTISTEP=1.
 * Single-step (default) preserves existing single-role behaviour via `role` prop.
 */
import { MiniCapture as SharedMiniCapture } from "@accounting-network/web-shared/leads/MiniCapture";
import type {
  MiniCaptureConfig,
  MiniCaptureSubmitFn,
  MiniCaptureSubmitResult,
} from "@accounting-network/web-shared/leads/MiniCapture";
import {
  trackExperimentView,
  trackExperimentAction,
} from "@accounting-network/web-shared/experiments/react/exposure";
import { niche } from "@/config/niche-loader";
import { siteConfig } from "@/config/site";
import { submitSolicitorLead } from "@/lib/leads/submit-client";

// ---------------------------------------------------------------------------
// Site-level config (built once, stable reference across renders)
// ---------------------------------------------------------------------------

/** Firm-type segment options for the multi-step flow. */
const ROLE_OPTIONS: MiniCaptureConfig["leadForm"]["roleOptions"] = [
  { value: "LLP partner", label: "LLP partner" },
  { value: "Sole practitioner", label: "Sole practitioner" },
  { value: "Partnership", label: "Partnership" },
  { value: "Barrister", label: "Barrister" },
  { value: "Other", label: "Other" },
];

const miniCaptureConfig: MiniCaptureConfig = {
  sourceIdentifier: niche.content_strategy.source_identifier, // "solicitors"
  consentText: siteConfig.leadConsentText,
  nicheId: niche.niche_id, // "solicitors"
  leadForm: {
    roleLabel: "Firm type",
    roleOptions: ROLE_OPTIONS,
    placeholders: {
      name: niche.lead_form.placeholders.name,
      email: niche.lead_form.placeholders.email,
      phone: niche.lead_form.placeholders.phone,
    },
  },
};

/** Adapts submitSolicitorLead to the shared MiniCaptureSubmitFn contract. */
const submitFn: MiniCaptureSubmitFn = async (payload, honeypot): Promise<MiniCaptureSubmitResult> => {
  const result = await submitSolicitorLead(
    {
      full_name: payload.full_name,
      email: payload.email,
      phone: payload.phone,
      role: payload.role,
      message: payload.message,
      source: payload.source,
      source_url: payload.source_url,
      submitted_at: payload.submitted_at,
      consent_given: payload.consent_given,
      consent_text: payload.consent_text,
      consent_at: payload.consent_at,
      visitor_id: payload.visitor_id,
      session_id: payload.session_id,
      extras: payload.extras,
    },
    honeypot,
  );
  return { success: result.success, error: result.error };
};

// ---------------------------------------------------------------------------
// Drop-in re-export with same props as the old local MiniCapture
// ---------------------------------------------------------------------------

export function MiniCapture(props: Omit<
  React.ComponentProps<typeof SharedMiniCapture>,
  "siteConfig" | "submitLead" | "onExperimentView" | "onExperimentAction"
>) {
  return (
    <SharedMiniCapture
      {...props}
      siteConfig={miniCaptureConfig}
      submitLead={submitFn}
      onExperimentView={trackExperimentView}
      onExperimentAction={trackExperimentAction}
    />
  );
}
