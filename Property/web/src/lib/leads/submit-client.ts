/**
 * Client-side helper: submit a Property lead through the server chokepoint
 * (/api/leads/submit) instead of the shared direct-to-Supabase insert. The
 * server validates, verifies the phone/email in real time, saves with the
 * service role, enrols the lead into the contactability sequence, and fires the
 * instant follow-up. It returns a verification verdict so the form can show a
 * "verifying your details" state and, if the number looks wrong, ask the person
 * to check it.
 *
 * Only the PHONE-bearing lead surfaces (the contact form + MiniCapture) use this.
 * Email-only surfaces (SpecialistWidget, ResourceGate) keep the shared path.
 */

export interface PropertyLeadPayload {
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
}

export interface PropertyLeadResult {
  success: boolean;
  error?: string;
  leadId?: string;
  /** Signed token for the native /book slot picker (thank-you page embed). */
  bookingToken?: string;
  verify?: {
    phone: "valid_mobile" | "valid_landline" | "voip" | "invalid" | "unknown";
    email: "deliverable" | "undeliverable" | "risky" | "unknown";
  };
  /** True when the saved contact details look wrong and the user should re-check. */
  needsCheck?: boolean;
}

export async function submitPropertyLead(
  payload: PropertyLeadPayload,
  honeypot = "",
): Promise<PropertyLeadResult> {
  try {
    const res = await fetch("/api/leads/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, enquiry_ref: honeypot }),
    });
    let json: PropertyLeadResult = { success: false };
    try {
      json = (await res.json()) as PropertyLeadResult;
    } catch {
      /* non-JSON */
    }
    if (!res.ok) {
      return { success: false, error: json.error || `Request failed (${res.status})` };
    }
    const needsCheck = json.verify?.phone === "invalid";
    return { ...json, success: true, needsCheck };
  } catch {
    return { success: false, error: "Network error. Please try again." };
  }
}
