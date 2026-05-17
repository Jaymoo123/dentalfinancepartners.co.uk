import type { HealthCheckAnswers, Opportunity } from "./types";

/**
 * Persistence layer for health check submissions.
 * Uses Supabase REST with service-role key (server-only).
 */

function config() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Health check storage requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY",
    );
  }
  return { url: url.replace(/\/$/, ""), key };
}

export type SubmissionInput = {
  answers: HealthCheckAnswers;
  opportunities: Opportunity[];
  ipHash?: string;
  userAgent?: string;
};

export type Submission = SubmissionInput & {
  id: string;
  submittedAt: string;
};

export async function recordSubmission(input: SubmissionInput): Promise<Submission> {
  const { url, key } = config();
  const payload = {
    email: input.answers.email.trim().toLowerCase(),
    name: input.answers.name,
    company: input.answers.company ?? null,
    agency_type: input.answers.agencyType,
    revenue_band: input.answers.revenueBand,
    entity: input.answers.entity,
    profit_pretax: input.answers.profitPreTax,
    current_salary: input.answers.currentSalary,
    current_dividend: input.answers.currentDividend,
    rd_activity: input.answers.rdActivity,
    contractor_use: input.answers.contractorUse,
    international: input.answers.international,
    exit_horizon: input.answers.exitHorizon,
    top_concern: input.answers.topConcern ?? null,
    opportunities: input.opportunities,
    ip_hash: input.ipHash ?? null,
    user_agent: input.userAgent ?? null,
  };

  const res = await fetch(`${url}/rest/v1/health_check_submissions`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Supabase ${res.status}: ${text}`);
  }
  const rows = (await res.json()) as Array<{ id: string; submitted_at: string }>;
  const row = rows[0];
  return {
    ...input,
    id: row.id,
    submittedAt: row.submitted_at,
  };
}
