import { NextResponse, type NextRequest } from "next/server";
import crypto from "crypto";
import { renderToBuffer } from "@react-pdf/renderer";
import { HealthCheckPdf } from "@/lib/health-check/HealthCheckPdf";
import { runRules } from "@/lib/health-check/rules";
import { recordSubmission } from "@/lib/health-check/storage";
import { getResend, getFromAddress, getReplyTo } from "@/lib/resend";
import HealthCheckDelivery from "@/emails/HealthCheckDelivery";
import HealthCheckInternalAlert from "@/emails/HealthCheckInternalAlert";
import type {
  HealthCheckAnswers,
  AgencyType,
  RevenueBand,
  Entity,
  RdActivity,
  ContractorUse,
  International,
  ExitHorizon,
} from "@/lib/health-check/types";

export const runtime = "nodejs";
export const maxDuration = 60;

const AGENCY_TYPES: AgencyType[] = [
  "marketing", "creative", "digital", "advertising", "pr", "web-design",
  "seo", "ppc", "performance-marketing", "social-media", "ai", "saas",
  "ecommerce", "video-production", "branding", "influencer-marketing",
  "email-marketing", "recruitment", "crypto-web3", "other",
];
const REVENUE_BANDS: RevenueBand[] = [
  "under-50k", "50k-90k", "90k-250k", "250k-500k", "500k-1m", "1m-2m",
  "2m-5m", "over-5m",
];
const ENTITIES: Entity[] = ["sole-trader", "ltd", "ltd-group", "llp", "partnership", "none-yet"];
const RD_ACTIVITY: RdActivity[] = ["none", "occasional", "regular", "core"];
const CONTRACTOR_USE: ContractorUse[] = ["none", "occasional", "regular", "primary"];
const INTERNATIONAL: International[] = [
  "uk-only", "eu-clients", "us-clients", "uae-clients", "other-non-uk", "uae-move-planned",
];
const EXIT_HORIZONS: ExitHorizon[] = ["no-plan", "1-2y", "3-5y", "5y-plus"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asEnum<T extends string>(v: unknown, allowed: T[]): T | null {
  return typeof v === "string" && (allowed as string[]).includes(v) ? (v as T) : null;
}

function asInt(v: unknown, max = 100_000_000): number {
  if (typeof v !== "number" || !Number.isFinite(v)) return 0;
  const n = Math.max(0, Math.floor(v));
  return Math.min(n, max);
}

function asStr(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, max);
}

function asStrArr<T extends string>(v: unknown, allowed: T[]): T[] {
  if (!Array.isArray(v)) return [];
  const out: T[] = [];
  for (const x of v) {
    if (typeof x === "string" && (allowed as string[]).includes(x)) {
      out.push(x as T);
    }
  }
  return Array.from(new Set(out));
}

function validate(raw: unknown): HealthCheckAnswers | { error: string } {
  if (!raw || typeof raw !== "object") return { error: "Invalid payload" };
  const r = raw as Record<string, unknown>;
  const name = asStr(r.name, 120);
  if (!name) return { error: "Name is required" };
  const email = asStr(r.email, 254).toLowerCase();
  if (!email || !EMAIL_RE.test(email)) return { error: "Valid email is required" };
  const agencyType = asEnum(r.agencyType, AGENCY_TYPES);
  if (!agencyType) return { error: "Select your agency type" };
  const revenueBand = asEnum(r.revenueBand, REVENUE_BANDS);
  if (!revenueBand) return { error: "Select your revenue band" };
  const entity = asEnum(r.entity, ENTITIES);
  if (!entity) return { error: "Select your entity structure" };
  const rdActivity = asEnum(r.rdActivity, RD_ACTIVITY);
  if (!rdActivity) return { error: "Select your R&D activity level" };
  const contractorUse = asEnum(r.contractorUse, CONTRACTOR_USE);
  if (!contractorUse) return { error: "Select your contractor use" };
  const exitHorizon = asEnum(r.exitHorizon, EXIT_HORIZONS);
  if (!exitHorizon) return { error: "Select your exit horizon" };

  return {
    name,
    email,
    company: asStr(r.company, 120) || undefined,
    agencyType,
    revenueBand,
    entity,
    profitPreTax: asInt(r.profitPreTax),
    currentSalary: asInt(r.currentSalary),
    currentDividend: asInt(r.currentDividend),
    rdActivity,
    contractorUse,
    international: asStrArr(r.international, INTERNATIONAL),
    exitHorizon,
    topConcern: asStr(r.topConcern, 1000),
  };
}

function hashIp(ip: string): string {
  return crypto.createHash("sha256").update(ip).digest("hex").slice(0, 32);
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // SEC-HP: server-side honeypot check. enquiry_ref non-empty = bot fill.
  // Return a plausible success shape so the bot receives no signal, but do not
  // process the submission or send any emails.
  if (
    body &&
    typeof body === "object" &&
    typeof (body as Record<string, unknown>).enquiry_ref === "string" &&
    ((body as Record<string, unknown>).enquiry_ref as string).trim()
  ) {
    return NextResponse.json({ ok: true, submissionId: "bot", topThreeTitles: [], counts: { high: 0, medium: 0, low: 0, info: 0 } });
  }

  const validated = validate(body);
  if ("error" in validated) {
    return NextResponse.json({ ok: false, error: validated.error }, { status: 400 });
  }
  const answers = validated;

  const opportunities = runRules(answers);

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "";
  const userAgent = req.headers.get("user-agent") || "";

  let submission;
  try {
    submission = await recordSubmission({
      answers,
      opportunities,
      ipHash: ip ? hashIp(ip) : undefined,
      userAgent: userAgent.slice(0, 500),
    });
  } catch (err) {
    console.error("health-check/recordSubmission", err);
    return NextResponse.json(
      { ok: false, error: "Could not record submission" },
      { status: 500 },
    );
  }

  // Generate PDF
  let pdfBuffer: Buffer;
  try {
    pdfBuffer = await renderToBuffer(
      HealthCheckPdf({
        answers,
        opportunities,
        generatedAt: new Date(),
        submissionId: submission.id,
      }),
    );
  } catch (err) {
    console.error("health-check/renderPdf", err);
    return NextResponse.json(
      { ok: false, error: "Could not generate report" },
      { status: 500 },
    );
  }

  const firstName = answers.name.split(" ")[0] || answers.name;
  const topThreeTitles = opportunities
    .filter((o) => o.severity === "high")
    .slice(0, 3)
    .map((o) => o.title);

  // Send to the submitter, with PDF attached
  try {
    await getResend().emails.send({
      from: getFromAddress(),
      replyTo: getReplyTo(),
      to: answers.email,
      subject: `Your Agency Finance Health Check, ${answers.company || answers.name}`,
      react: HealthCheckDelivery({ firstName, topThreeTitles }),
      attachments: [
        {
          filename: "agency-finance-health-check.pdf",
          content: pdfBuffer,
        },
      ],
    });
  } catch (err) {
    console.error("health-check/sendDelivery", err);
  }

  // Internal alert
  try {
    await getResend().emails.send({
      from: getFromAddress(),
      to: getReplyTo(),
      replyTo: answers.email,
      subject: `[Health check] ${answers.name}${answers.company ? `, ${answers.company}` : ""}`,
      react: HealthCheckInternalAlert({
        answers,
        opportunities,
        submissionId: submission.id,
      }),
    });
  } catch (err) {
    console.error("health-check/sendInternalAlert", err);
  }

  return NextResponse.json({
    ok: true,
    submissionId: submission.id,
    topThreeTitles,
    counts: {
      high: opportunities.filter((o) => o.severity === "high").length,
      medium: opportunities.filter((o) => o.severity === "medium").length,
      low: opportunities.filter((o) => o.severity === "low").length,
      info: opportunities.filter((o) => o.severity === "info").length,
    },
  });
}
