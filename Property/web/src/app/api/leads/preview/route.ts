/**
 * Internal email preview. Renders a nurture sequence's actual emails/SMS from the
 * REAL step definitions + template, using a SYNTHETIC (no-DB, no-PII) context, so
 * the owner can see exactly what a lead receives WITHOUT sending anything and
 * without the lead ever being involved. Token-gated (query `key`), noindex.
 *
 * Because it renders the same code the sender uses, it can never drift from the
 * real emails. It contains only the generic service copy (no lead PII).
 *
 * Usage (in a browser):
 *   /api/leads/preview?key=<LEAD_INTERNAL_SECRET or LEAD_NURTURE_TOKEN_SECRET>
 *   &sequence=detail_capture   (or contactability; default detail_capture)
 *   &missing=name,phone        (name / phone / name,phone; default name,phone)
 *   &unasked=1                 (1 = widget "we did not ask" framing; default 1)
 *   &name=                     (a first name to preview a named lead; default blank)
 */
import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import {
  buildPropertyLeadNurtureConfig,
  missingPhraseFor,
  type LeadSequenceVariant,
} from "@/config/lead-nurture";
import { firstNameOf } from "@accounting-network/web-shared/lead-nurture/config";
import type { LeadMessageContext } from "@accounting-network/web-shared/lead-nurture/config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authed(key: string): boolean {
  const secret = process.env.LEAD_INTERNAL_SECRET || process.env.LEAD_NURTURE_TOKEN_SECRET || "";
  if (!secret || !key) return false;
  const a = Buffer.from(key.padEnd(256, "\0"), "utf8");
  const b = Buffer.from(secret.padEnd(256, "\0"), "utf8");
  return a.length === b.length && timingSafeEqual(a, b);
}

function escAttr(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}
function escHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function GET(req: Request): Promise<Response> {
  const u = new URL(req.url);
  if (!authed(u.searchParams.get("key") ?? "")) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const variant: LeadSequenceVariant =
    u.searchParams.get("sequence") === "contactability" ? "contactability" : "detail_capture";
  const missing = (u.searchParams.get("missing") ?? "name,phone")
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s === "name" || s === "phone") as ("name" | "phone")[];
  const unasked = (u.searchParams.get("unasked") ?? "1") !== "0";
  const nameParam = (u.searchParams.get("name") ?? "").trim();

  const base = u.origin;
  const ctx: LeadMessageContext = {
    firstName: firstNameOf(nameParam),
    bookingUrl: `${base}/book?t=SAMPLE`,
    confirmUrl: `${base}/api/leads/confirm/SAMPLE`,
    optOutUrl: `${base}/api/leads/optout/SAMPLE`,
    optOutText: "Reply STOP to opt out.",
    siteUrl: base,
    detailsUrl: `${base}/complete?t=SAMPLE`,
    missingFields: missing,
    missingPhrase: missingPhraseFor(missing),
    contactUnasked: unasked,
    callGoalEcho: "understand your incorporation options",
    qualityScore: 3,
    variant: "t0_branded",
  };

  const config = buildPropertyLeadNurtureConfig(variant);
  const sections: string[] = [];
  config.steps.forEach((step, i) => {
    const msgs = step.buildMessages(ctx);
    const blocks: string[] = [];
    for (const m of msgs) {
      if (m.channel === "email") {
        blocks.push(
          `<div class="subj"><b>Subject:</b> ${escHtml(m.subject ?? "")}</div>` +
            `<iframe class="mail" srcdoc="${escAttr(m.html ?? "")}"></iframe>` +
            `<details><summary>Plain text</summary><pre>${escHtml(m.text ?? "")}</pre></details>`,
        );
      } else {
        blocks.push(
          `<div class="sms"><b>${m.channel.toUpperCase()}:</b> ${escHtml(
            m.body ?? (m.templateName ? `[template: ${m.templateName}]` : ""),
          )}</div>`,
        );
      }
    }
    if (blocks.length === 0) {
      blocks.push(`<div class="skip">(no message for this preview, e.g. VIP-only step)</div>`);
    }
    sections.push(
      `<section><h2>Step ${i}: ${escHtml(step.key)} <span class="delay">fires +${step.delayHours}h${
        step.preferMonday ? ", prefer Monday" : ""
      }</span></h2>${blocks.join("")}</section>`,
    );
  });

  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow">
<title>Nurture email preview</title>
<style>
  body{font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:#eef1f4;color:#0f172a;margin:0;padding:24px;}
  h1{font-size:18px;} .meta{color:#475569;font-size:13px;margin-bottom:18px;}
  section{background:#fff;border:1px solid #d9dee4;border-radius:8px;padding:16px;margin:0 0 18px;max-width:660px;}
  h2{font-size:15px;margin:0 0 10px;} .delay{color:#64748b;font-weight:400;font-size:12px;}
  .subj{font-size:13px;margin:0 0 8px;} iframe.mail{width:100%;height:520px;border:1px solid #e5e7eb;border-radius:6px;background:#f6f7f8;}
  .sms{background:#dcf8c6;border-radius:10px;padding:10px 12px;font-size:14px;max-width:420px;}
  details{margin-top:8px;font-size:12px;color:#475569;} pre{white-space:pre-wrap;background:#f8fafc;padding:10px;border-radius:6px;}
  .skip{color:#94a3b8;font-style:italic;} form{margin-bottom:18px;font-size:13px;} select,input{padding:4px 6px;margin-right:8px;}
</style></head><body>
<h1>Nurture email preview</h1>
<div class="meta">Sequence: <b>${escHtml(variant)}</b> &middot; missing: <b>${escHtml(
    missing.join(", ") || "none",
  )}</b> &middot; ${unasked ? "we did NOT ask (widget)" : "we asked"} &middot; name: <b>${escHtml(
    nameParam || "(blank)",
  )}</b><br>This is a synthetic preview rendered from the live code. No email was sent.</div>
${sections.join("")}
</body></html>`;

  return new Response(html, { headers: { "content-type": "text/html; charset=utf-8" } });
}
