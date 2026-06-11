/**
 * Resend email provider adapter for the shared nurture engine.
 * (GAP-5 adoption pattern — mirrors generalist/web/src/lib/nurture-provider.ts.)
 *
 * Returns an EmailProvider that delegates to the site's configured
 * Resend instance. The provider is built at request-handler time so env
 * vars are read inside the request lifecycle.
 *
 * EN-06: the engine requires fromAddress and replyTo from config.
 * The provider itself is identity-agnostic — it just sends what it's told.
 *
 * Note: this deliberately does NOT reuse lib/resend.ts — that module carries
 * the health-check delivery identity (RESEND_FROM_* env names with hardcoded
 * fallbacks, an EN-06 anti-pattern the nurture engine refuses to inherit).
 */

import type { EmailProvider } from "@accounting-network/web-shared/nurture/send";
import { Resend } from "resend";

let cachedResend: Resend | null = null;

function getResend(): Resend {
  if (cachedResend) return cachedResend;
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error("RESEND_API_KEY is not set (EN-06: engine refuses without identity config)");
  }
  cachedResend = new Resend(key);
  return cachedResend;
}

export function buildResendProvider(): EmailProvider {
  return {
    send: async (params) => {
      const { data, error } = await getResend().emails.send({
        from: params.from,
        to: params.to,
        replyTo: params.replyTo,
        subject: params.subject,
        html: params.html,
        text: params.text,
        headers: params.headers,
      });
      if (error) {
        throw new Error(`Resend send error: ${JSON.stringify(error)}`);
      }
      return data?.id ? { id: data.id } : null;
    },
  };
}
