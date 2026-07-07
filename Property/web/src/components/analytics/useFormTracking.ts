"use client";

/**
 * Lightweight form-lifecycle tracking. Wire the returned handlers into a lead
 * form to capture where users start, hesitate, abandon, error, and submit —
 * feeding vw_form_field_dropoff and the form-abandonment detector.
 *
 * Pass opts.flow = "multi" for stepped forms to activate step-level helpers.
 * Carries NO field values, only field names + outcome — no PII.
 */
import { useCallback, useRef } from "react";
import { track } from "@accounting-network/web-shared/analytics/track";
import { setConverted } from "@accounting-network/web-shared/analytics/visitMemory";

interface FormTrackingOpts {
  flow?: "single" | "multi";
}

export function useFormTracking(formId: string, opts?: FormTrackingOpts) {
  const startedRef = useRef(false);
  const completedRef = useRef(false);
  const flow = opts?.flow ?? "single";

  /** Call on the first focus of any field. Emits form_start once. */
  const onFieldFocus = useCallback(
    (field: string) => {
      if (!startedRef.current) {
        startedRef.current = true;
        track("form_start", { form_id: formId, first_field: field, flow });
      }
      track("form_field_focus", { form_id: formId, field, flow });
    },
    [formId, flow],
  );

  /** Call on blur. An empty field blurred before submit is a friction point. */
  const onFieldBlur = useCallback(
    (field: string, hadValue: boolean, charLen?: number) => {
      if (completedRef.current) return;
      if (!hadValue) {
        track("form_field_abandon", { form_id: formId, field, had_value: false, flow });
      } else if (field === "email" && typeof charLen === "number") {
        // Reached + typed into email but not yet submitted: a high-intent
        // friction point. LENGTH only (a number), never the value (PII).
        track("form_field_abandon", { form_id: formId, field, had_value: true, char_len: charLen, flow });
      }
    },
    [formId, flow],
  );

  /** Call on a validation/server error. error_kind only — never the value.
   *  Optional step param for multi-step forms (additive, ignored if undefined). */
  const onError = useCallback(
    (field: string, errorKind: string, step?: number) => {
      track("form_error", { form_id: formId, field, error_kind: errorKind, flow, step });
    },
    [formId, flow],
  );

  /** Call when the form is submitted (passed validation, about to POST). */
  const onSubmit = useCallback(
    (fieldsCompleted: number) => {
      track("form_submit", { form_id: formId, fields_completed: fieldsCompleted, flow });
    },
    [formId, flow],
  );

  /** Call after a successful lead insert. Mirrors the GA generate_lead event. */
  const onLead = useCallback(
    (extra: Record<string, string | number | boolean> = {}) => {
      completedRef.current = true;
      setConverted(); // personalization: stop nagging a converted visitor
      track("lead_submitted", { form_id: formId, ...extra, flow });
    },
    [formId, flow],
  );

  /** Call when a step becomes visible to the user. */
  const onStepView = useCallback(
    (step: number, stepId: string) => {
      track("form_step_view", { form_id: formId, step, step_id: stepId, flow });
    },
    [formId, flow],
  );

  /** Call when the user completes a step and advances. */
  const onStepComplete = useCallback(
    (step: number, stepId: string, extra?: { ms_on_step?: number; lead_role?: string }) => {
      track("form_step_complete", { form_id: formId, step, step_id: stepId, flow, ...extra });
    },
    [formId, flow],
  );

  /** Call when the user navigates back to a previous step. */
  const onStepBack = useCallback(
    (fromStep: number, toStep: number) => {
      track("form_step_back", { form_id: formId, from_step: fromStep, to_step: toStep, flow });
    },
    [formId, flow],
  );

  return { onFieldFocus, onFieldBlur, onError, onSubmit, onLead, onStepView, onStepComplete, onStepBack };
}
