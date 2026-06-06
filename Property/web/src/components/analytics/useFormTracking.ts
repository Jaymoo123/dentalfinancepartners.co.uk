"use client";

/**
 * Lightweight form-lifecycle tracking. Wire the returned handlers into a lead
 * form to capture where users start, hesitate, abandon, error, and submit —
 * feeding vw_form_field_dropoff and the form-abandonment detector.
 *
 * Carries NO field values, only field names + outcome — no PII.
 */
import { useCallback, useRef } from "react";
import { track } from "@/lib/analytics/track";
import { setConverted } from "@/lib/intent/session";

export function useFormTracking(formId: string) {
  const startedRef = useRef(false);
  const completedRef = useRef(false);

  /** Call on the first focus of any field. Emits form_start once. */
  const onFieldFocus = useCallback(
    (field: string) => {
      if (!startedRef.current) {
        startedRef.current = true;
        track("form_start", { form_id: formId, first_field: field });
      }
      track("form_field_focus", { form_id: formId, field });
    },
    [formId],
  );

  /** Call on blur. An empty field blurred before submit is a friction point. */
  const onFieldBlur = useCallback(
    (field: string, hadValue: boolean) => {
      if (completedRef.current) return;
      if (!hadValue) {
        track("form_field_abandon", { form_id: formId, field, had_value: false });
      }
    },
    [formId],
  );

  /** Call on a validation/server error. error_kind only — never the value. */
  const onError = useCallback(
    (field: string, errorKind: string) => {
      track("form_error", { form_id: formId, field, error_kind: errorKind });
    },
    [formId],
  );

  /** Call when the form is submitted (passed validation, about to POST). */
  const onSubmit = useCallback(
    (fieldsCompleted: number) => {
      track("form_submit", { form_id: formId, fields_completed: fieldsCompleted });
    },
    [formId],
  );

  /** Call after a successful lead insert. Mirrors the GA generate_lead event. */
  const onLead = useCallback(
    (extra: Record<string, string | number | boolean> = {}) => {
      completedRef.current = true;
      setConverted(); // personalization: stop nagging a converted visitor
      track("lead_submitted", { form_id: formId, ...extra });
    },
    [formId],
  );

  return { onFieldFocus, onFieldBlur, onError, onSubmit, onLead };
}
