import { NextResponse, type NextRequest } from "next/server";
import { upsertPending } from "@/lib/newsletter/subscribers";
import { mintToken } from "@/lib/newsletter/tokens";
import { getResend, getFromAddress, getReplyTo } from "@/lib/resend";
import ConfirmEmail from "@/emails/ConfirmEmail";
import { siteConfig } from "@/config/site";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let payload: { email?: unknown; agencyType?: unknown; source?: unknown; sourceUrl?: unknown };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }
  const agencyType =
    typeof payload.agencyType === "string" && payload.agencyType.length < 80
      ? payload.agencyType
      : undefined;
  const source =
    typeof payload.source === "string" && payload.source.length < 80
      ? payload.source
      : undefined;
  const sourceUrl =
    typeof payload.sourceUrl === "string" && payload.sourceUrl.length < 500
      ? payload.sourceUrl
      : undefined;

  try {
    await upsertPending({ email, agencyType, source, sourceUrl });
  } catch (err) {
    console.error("subscribe/upsertPending", err);
    return NextResponse.json(
      { ok: false, error: "Could not record subscription" },
      { status: 500 },
    );
  }

  const token = mintToken(email, "confirm");
  const base = siteConfig.url.replace(/\/$/, "");
  const confirmUrl = `${base}/api/newsletter/confirm/${encodeURIComponent(token)}`;

  try {
    await getResend().emails.send({
      from: getFromAddress(),
      replyTo: getReplyTo(),
      to: email,
      subject: "Confirm your subscription to The Agency Founder Tax Brief",
      react: ConfirmEmail({ confirmUrl }),
      headers: {
        "List-Unsubscribe": `<${base}/newsletter>`,
      },
    });
  } catch (err) {
    console.error("subscribe/resend.send", err);
    // Still 200, record exists, user can retry
  }

  return NextResponse.json({ ok: true });
}
