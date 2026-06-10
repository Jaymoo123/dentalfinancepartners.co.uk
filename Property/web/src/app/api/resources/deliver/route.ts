/**
 * Resource delivery — emails a LEAD the download links for an unlocked category
 * resource (the working Excel model + the written guide).
 *
 * This is SEPARATE from the internal lead webhooks (/api/leads/notify + sync):
 * those email the TEAM on every lead; this one emails the EXTERNAL lead their
 * downloads. ResourceGate calls it client-side after a successful lead insert,
 * as a best-effort extra on top of the inline reveal (so the download works even
 * if this send fails or the from-domain is not yet verified).
 *
 * Phase A: every resource asset is `enabled: false`, so this route accepts the
 * POST shape but returns gracefully ("not available yet") without sending — there
 * is nothing to deliver until a category is flipped on. The validation, email
 * re-check and rate-limit are all in place so flipping a flag is all it takes.
 *
 * RISK (documented in the spec): emailing external users requires a Resend-
 * verified from-domain. Until then the inline reveal is the primary delivery
 * path and this is additive.
 */
import { NextResponse, type NextRequest } from "next/server";
import { getResend, getFromAddress } from "@/lib/resend";
import { siteConfig } from "@/config/site";
import {
  resourceForTopic,
  isXlsxEnabled,
  isGuideEnabled,
  hasEnabledResource,
} from "@/lib/resources/registry";
import { TOPICS, type TopicKey } from "@/lib/intent/taxonomy";

export const runtime = "nodejs";
export const maxDuration = 30;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_TOPICS = new Set<string>(TOPICS.map((t) => t.key));

// Naive in-memory rate-limit (per warm lambda instance). Caps obvious abuse;
// the durable guard is the lead insert + consent upstream. Keyed by email.
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const prior = (hits.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  prior.push(now);
  hits.set(key, prior);
  // Opportunistic cleanup so the map can't grow unbounded on a long-lived lambda.
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(k);
    }
  }
  return prior.length > RATE_MAX;
}

type DeliverBody = {
  topic?: string;
  email?: string;
  visitor_id?: string;
  session_id?: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    resendSet: Boolean(process.env.RESEND_API_KEY),
    // Phase A: false until a category asset is flipped on.
    anyResourceEnabled: TOPICS.some((t) => hasEnabledResource(t.key)),
  });
}

export async function POST(req: NextRequest) {
  let body: DeliverBody;
  try {
    body = (await req.json()) as DeliverBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const topic = String(body.topic || "").trim();
  const email = String(body.email || "").trim();

  // Validate topic ∈ RESOURCES and email shape (re-validated server-side; the
  // client gate already checks but never trust the client).
  if (!topic || !VALID_TOPICS.has(topic)) {
    return NextResponse.json({ ok: false, error: "Unknown topic" }, { status: 400 });
  }
  if (!emailRe.test(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }
  if (rateLimited(email.toLowerCase())) {
    return NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429 });
  }

  const resource = resourceForTopic(topic as TopicKey);
  const xlsxReady = isXlsxEnabled(resource);
  const guideReady = isGuideEnabled(resource);

  // Phase A / not-yet-authored category: nothing enabled to deliver. Return
  // gracefully (200) so the client's best-effort call is a no-op, not an error.
  if (!resource || (!xlsxReady && !guideReady)) {
    return NextResponse.json({ ok: true, delivered: false, reason: "no-enabled-asset" });
  }

  // Build absolute links from the verified asset entries.
  const base = siteConfig.url.replace(/\/$/, "");
  const links: { label: string; href: string }[] = [];
  if (xlsxReady && resource.xlsx) {
    links.push({ label: resource.xlsx.label, href: `${base}${resource.xlsx.file}` });
  }
  if (guideReady && resource.guide) {
    links.push({ label: resource.guide.label, href: `${base}/resources/${resource.guide.slug}` });
  }

  const linkRows = links
    .map(
      (l) =>
        `<tr><td style="padding:10px 0;"><a href="${escapeHtml(l.href)}" style="color:#047857;font-weight:600;text-decoration:underline;">${escapeHtml(l.label)}</a></td></tr>`,
    )
    .join("");

  const html = `<!doctype html><html lang="en"><body style="margin:0;padding:24px;background:#f1f5f9;font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;border-radius:12px;">
      <tr><td style="padding:28px 28px 8px;">
        <h1 style="margin:0 0 8px;font-size:20px;color:#0f172a;">${escapeHtml(resource.magnetTitle)}</h1>
        <p style="margin:0;color:#475569;font-size:14px;line-height:1.6;">Here are your downloads. They are always the latest version, so feel free to come back to these links.</p>
        <table role="presentation" width="100%" style="margin-top:16px;">${linkRows}</table>
        <p style="margin:20px 0 0;color:#94a3b8;font-size:12px;line-height:1.6;">You received this because you requested it on ${escapeHtml(siteConfig.url)}. These figures are for general guidance, not advice for your specific situation.</p>
      </td></tr>
    </table></body></html>`;

  const text = [
    resource.magnetTitle,
    "",
    "Here are your downloads:",
    ...links.map((l) => `- ${l.label}: ${l.href}`),
    "",
    "These figures are for general guidance, not advice for your specific situation.",
  ].join("\n");

  try {
    const { error } = await getResend().emails.send({
      from: getFromAddress(),
      to: email,
      subject: `Your download: ${resource.magnetTitle}`,
      html,
      text,
    });
    if (error) {
      console.error("resources/deliver: resend error", error);
      return NextResponse.json({ ok: false, error: "Send failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("resources/deliver: send threw", err);
    return NextResponse.json({ ok: false, error: "Send failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, delivered: true });
}
