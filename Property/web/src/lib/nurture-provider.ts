/**
 * Resend email provider adapter for the shared nurture engine (Property).
 *
 * Returns an EmailProvider that delegates to the site's configured
 * Resend instance. The provider is built at request-handler time so env
 * vars are read inside the request lifecycle.
 *
 * EN-06: the engine requires fromAddress and replyTo from NurtureConfig.
 * The provider itself is identity-agnostic; it just sends what it is told.
 *
 * Note: this is a separate module from lib/resend.ts which serves the
 * internal lead-notification pipeline (not the nurture engine).
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
