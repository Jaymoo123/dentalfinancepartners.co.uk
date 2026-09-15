/**
 * Lead Tracker -> system. Turns the triager's dropdowns into actions.
 *
 * The tracker is where Umair already works, so it is the trigger rather than a
 * second place to do the same job. Three columns drive everything:
 *
 *   N "Sent to Omar or kept in-house"   Omar | In-house
 *   O "Send Email?"                     Send
 *   P "In-house Lead Contacted?"        Yes
 *
 * All three are ONE_OF_LIST with strict=True in the sheet, so Sheets itself
 * rejects any other value. We still compare exactly and treat anything
 * unrecognised as "do nothing, and say so".
 *
 *   N=Omar AND O=Send   introduce, then stop the chase
 *   P=Yes               stop the chase, no email
 *   O=Send, N<>Omar     NOTHING. Ambiguous instructions are reported, never guessed
 *   all blank           nothing
 *
 * Two keys are required to send because the send is irreversible and copies a
 * customer: setting either column alone does nothing, so one mis-click cannot
 * email anyone.
 *
 * There is no separate lock against overlapping cron passes. The database claim in
 * handoff-intro.claimIntro() is the concurrency guard: two passes racing the same
 * lead means one claim succeeds and the other gets a 409. Stopping the chase is
 * idempotent, so it needs no guard at all.
 */
import { adminSelect, adminUpdate, adminInsert } from "@/lib/supabase/admin";
import { recordLeadContactEvent } from "@accounting-network/web-shared/lead-nurture/send";
import { readTrackerRows, writeTrackerStatusBatch, type TrackerRow } from "./google-sheets";
import {
  alreadyClaimed,
  claimIntro,
  introBlockedReason,
  maxPerRun,
  releaseClaim,
  markIntroSent,
  resolveMode,
  sendIntro,
  type HandoffMode,
  type IntroLead,
} from "./handoff-intro";

const DEST_OMAR = "Omar";
// "In-house" is a valid column N value but is not itself a trigger: an in-house
// lead only acts once column P says the triager has actually contacted them.
const SEND_YES = "Send";
const CONTACTED_YES = "Yes";

export type TrackerAction =
  | "introduced"
  | "would_introduce"
  | "chase_stopped"
  | "skipped"
  | "blocked"
  | "ambiguous";

export type TrackerResult = {
  rowNumber: number;
  leadId: string;
  action: TrackerAction;
  detail: string;
};

export type TrackerRunReport = {
  mode: HandoffMode;
  tab: string;
  rowsRead: number;
  skippedNoId: number;
  goLiveAt: string | null;
  capped: boolean;
  /** Rows whose J-M status columns were refreshed this pass. */
  statusRowsWritten: number;
  /** True when this pass was the one-off self-arming watermark. */
  watermarkPass: boolean;
  /** Decisions claimed as historic by the watermark pass. */
  watermarkClaimed: number;
  results: TrackerResult[];
  counts: Record<TrackerAction, number>;
};

/**
 * OPTIONAL extra date gate. The watermark below is the real protection and needs
 * no configuration; this exists only so a date can be imposed by hand if anyone
 * ever wants one. Unset means no date gating, which is safe precisely because the
 * watermark has already claimed everything that predates first run.
 */
function goLiveAt(): Date | null {
  const raw = (process.env.LEAD_HANDOFF_GO_LIVE_AT || "").trim();
  if (!raw) return null;
  const d = new Date(raw);
  return Number.isNaN(d.getTime()) ? null : d;
}

/**
 * Has the system ever run? The answer is what makes the watermark automatic.
 *
 * Returns null when it has never run, which triggers a watermark pass instead of
 * a normal one. Fails CLOSED: if the control row cannot be read we report "never
 * run", so an unreadable database produces a harmless second watermark pass
 * rather than a flood of introductions.
 */
async function watermarkedAt(): Promise<string | null> {
  const res = await adminSelect<{ watermarked_at: string | null }>("lead_handoff_control", {
    select: "watermarked_at",
    id: "eq.1",
  });
  if (!res.ok || res.data.length === 0) return null;
  return res.data[0].watermarked_at;
}

/**
 * Claim every decision already in the sheet WITHOUT sending anything, then stamp
 * the control row so this never happens again.
 *
 * Claims go into the same table that enforces the dedupe, so a watermarked lead is
 * blocked by the identical constraint that stops a double send. There is no second
 * mechanism to drift out of step.
 *
 * Idempotent: ignoreDuplicates means a partially completed pass simply finishes.
 */
async function runWatermarkPass(
  rows: TrackerRow[],
  leads: Map<string, IntroLead>,
): Promise<number> {
  const claims: { lead_id: string; email_norm: string; mode: string }[] = [];
  const seen = new Set<string>();
  for (const r of rows) {
    // Only rows that ALREADY carry a decision. A row the triager has not touched
    // yet is not history, it is pending work: claiming it would silently block a
    // legitimate introduction the first time he does decide on it.
    if (!r.destination && !r.sendEmail && !r.inHouseContacted) continue;
    const lead = leads.get(r.leadId);
    if (!lead?.email) continue;
    const norm = lead.email.trim().toLowerCase();
    // One claim per person: the unique index would reject the second anyway, and
    // claiming the first is enough to block the pair.
    if (seen.has(norm)) continue;
    seen.add(norm);
    claims.push({ lead_id: lead.id, email_norm: norm, mode: "watermark" });
  }

  let claimed = 0;
  for (let i = 0; i < claims.length; i += 200) {
    const batch = claims.slice(i, i + 200);
    const res = await adminInsert<{ lead_id: string }>("lead_handoff_intros", batch, {
      onConflict: "lead_id",
      ignoreDuplicates: true,
    });
    if (res.ok) claimed += res.data.length;
    else console.error("[tracker-sync] watermark claim failed", res.status, res.error);
  }

  await adminUpdate(
    "lead_handoff_control",
    { id: "eq.1" },
    {
      watermarked_at: new Date().toISOString(),
      watermark_rows: claimed,
      updated_at: new Date().toISOString(),
    },
  );
  return claimed;
}

async function fetchLeads(ids: string[]): Promise<Map<string, IntroLead>> {
  const out = new Map<string, IntroLead>();
  // PostgREST in.() has a practical URL length limit; 100 ids per call is safe.
  for (let i = 0; i < ids.length; i += 100) {
    const batch = ids.slice(i, i + 100);
    const res = await adminSelect<IntroLead>("leads", {
      select: "id,email,full_name,phone,message,role,source,status,created_at",
      id: `in.(${batch.join(",")})`,
    });
    if (!res.ok) {
      console.error("[tracker-sync] lead fetch failed", res.status, res.error);
      continue;
    }
    for (const l of res.data) out.set(l.id, l);
  }
  return out;
}

/**
 * End the automated chase. Mirrors raw-supply's halt semantics exactly.
 *
 * Deliberately NOT stopNurture(): that records an opted_out consent event the
 * enquirer never made. A human taking the lead over is not an objection.
 */
async function stopChase(leadId: string, reason: string): Promise<void> {
  const nowIso = new Date().toISOString();
  await adminUpdate(
    "lead_nurture_state",
    { lead_id: `eq.${leadId}` },
    { status: "stopped", next_action_at: null, updated_at: nowIso },
  ).catch(() => {});
  // Only close a lead that is still in play, so a 'forwarded' or 'converted'
  // lead is never dragged backwards by a late tracker edit.
  await adminUpdate(
    "leads",
    { id: `eq.${leadId}`, status: "in.(new,nurturing)" },
    { status: "forwarded" },
  ).catch(() => {});
  await recordLeadContactEvent(leadId, "handed_off", "system", {
    reason,
    source: "lead_tracker",
  }).catch(() => {});
}


/* ------------------------------------------------------------------ *
 * Status write-back (columns J-M)
 *
 * These four were seeded once when the tracker was created and then never
 * maintained, because the sync webhook writes columns A-I only. Every lead from
 * 2026-09-08 onward had them blank. Refreshing them each pass is what lets the
 * triager see, in the sheet he already works in, that the chase has stopped
 * without asking anyone.
 *
 * Forward-only by design: historic rows are left exactly as they are.
 * ------------------------------------------------------------------ */

type StatusBits = {
  verified: string;
  nurtureStatus: string;
  bookedSlots: string;
  contactTrail: string;
};

/** Compact, human-readable trail. The sheet is read by a person, not parsed. */
function summariseTrail(events: { event_type: string; channel: string | null }[]): string {
  if (events.length === 0) return "";
  const counts = new Map<string, number>();
  for (const e of events) {
    const key = e.channel ? `${e.event_type}/${e.channel}` : e.event_type;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([k, n]) => (n > 1 ? `${k} x${n}` : k))
    .join(", ")
    .slice(0, 480); // a sheet cell holds far more, but a wall of text helps nobody
}

async function buildStatus(leadIds: string[]): Promise<Map<string, StatusBits>> {
  const out = new Map<string, StatusBits>();
  if (leadIds.length === 0) return out;

  const verified = new Map<string, boolean>();
  const nurture = new Map<string, string>();
  const trail = new Map<string, { event_type: string; channel: string | null }[]>();

  for (let i = 0; i < leadIds.length; i += 100) {
    const batch = leadIds.slice(i, i + 100);
    const idFilter = `in.(${batch.join(",")})`;

    const v = await adminSelect<{ lead_id: string; verify_pass: boolean }>(
      "lead_verification",
      { select: "lead_id,verify_pass", lead_id: idFilter },
    );
    if (v.ok) for (const r of v.data) verified.set(r.lead_id, r.verify_pass);

    const n = await adminSelect<{ lead_id: string; status: string }>("lead_nurture_state", {
      select: "lead_id,status",
      lead_id: idFilter,
    });
    if (n.ok) for (const r of n.data) nurture.set(r.lead_id, r.status);

    const e = await adminSelect<{ lead_id: string; event_type: string; channel: string | null }>(
      "lead_contact_events",
      { select: "lead_id,event_type,channel", lead_id: idFilter },
    );
    if (e.ok) {
      for (const r of e.data) {
        const list = trail.get(r.lead_id) ?? [];
        list.push({ event_type: r.event_type, channel: r.channel });
        trail.set(r.lead_id, list);
      }
    }
  }

  for (const id of leadIds) {
    const events = trail.get(id) ?? [];
    // "Booked call slots" in the seeded data recorded that a call was arranged.
    const booked = events.filter((x) => x.event_type === "booked").length;
    out.set(id, {
      verified: verified.get(id) ? "yes" : "",
      nurtureStatus: nurture.get(id) ?? "",
      bookedSlots: booked > 0 ? String(booked) : "",
      contactTrail: summariseTrail(events),
    });
  }
  return out;
}

function blank(counts: Record<string, number>): Record<TrackerAction, number> {
  return {
    introduced: counts.introduced ?? 0,
    would_introduce: counts.would_introduce ?? 0,
    chase_stopped: counts.chase_stopped ?? 0,
    skipped: counts.skipped ?? 0,
    blocked: counts.blocked ?? 0,
    ambiguous: counts.ambiguous ?? 0,
  };
}

/**
 * One pass over the tracker.
 *
 * In "report" mode nothing is sent and nothing is claimed: it answers "what would
 * happen if this were armed", which is the only safe first thing to run against a
 * sheet that already contains 121 historic decisions.
 */
export async function runTrackerSync(): Promise<TrackerRunReport> {
  const mode = resolveMode();
  const gate = goLiveAt();
  const cap = maxPerRun();
  const { rows, skippedNoId, tab } = await readTrackerRows();

  const actionable = rows.filter(
    (r) => r.destination || r.sendEmail || r.inHouseContacted,
  );
  // Every row, not just the actionable ones: the J-M status write-back below
  // refreshes rows that carry no decision yet, which is precisely the set that
  // has been sitting blank since the webhook started writing only A-I.
  const leads = await fetchLeads(rows.map((r) => r.leadId));

  // THE WATERMARK. First run ever, in any mode, claims every decision already in
  // the sheet and sends nothing. This is what stops the 121 historic decisions
  // firing retrospectively, and it needs no script, no env var and no arming-day
  // ordering, because it is the same code path every run takes.
  if ((await watermarkedAt()) === null) {
    const claimed = await runWatermarkPass(rows, leads);
    return {
      mode,
      tab,
      rowsRead: rows.length,
      skippedNoId,
      goLiveAt: gate ? gate.toISOString() : null,
      capped: false,
      statusRowsWritten: 0,
      watermarkPass: true,
      watermarkClaimed: claimed,
      results: [],
      counts: blank({}),
    };
  }

  const results: TrackerResult[] = [];
  const counts: Record<string, number> = {};
  const bump = (a: TrackerAction) => {
    counts[a] = (counts[a] ?? 0) + 1;
  };
  const push = (r: TrackerRow, action: TrackerAction, detail: string) => {
    results.push({ rowNumber: r.rowNumber, leadId: r.leadId, action, detail });
    bump(action);
  };

  let sentThisRun = 0;
  let capped = false;
  // Lead id -> what to show the triager in column K when a handoff did not send.
  // Without this a refusal exists only in a run report nobody reads, and everyone
  // carries on believing the partner firm was emailed.
  const notSent = new Map<string, string>();

  for (const row of actionable) {
    const lead = leads.get(row.leadId);
    if (!lead) {
      push(row, "skipped", "lead id in sheet has no matching lead row");
      continue;
    }

    // Optional belt-and-braces date gate. The watermark is the real protection.
    if (gate && new Date(lead.created_at) < gate) {
      push(row, "skipped", `lead predates go-live (${lead.created_at})`);
      continue;
    }

    // A lead already claimed is historic or already introduced: it does nothing at
    // all, not even a chase stop, so a months-old tracker decision cannot produce
    // fresh events on a lead that was dealt with long ago.
    if (await alreadyClaimed(lead)) {
      push(row, "skipped", "already handled (watermarked as historic, or introduced)");
      continue;
    }

    const wantsIntro = row.destination === DEST_OMAR && row.sendEmail === SEND_YES;
    const wantsStopOnly = row.inHouseContacted === CONTACTED_YES;
    const ambiguous =
      row.sendEmail === SEND_YES && row.destination !== DEST_OMAR;

    if (ambiguous) {
      const detail = `column O is "${SEND_YES}" but column N is "${row.destination || "blank"}", so no action taken`;
      notSent.set(row.leadId, `NOT SENT: ${detail}`);
      push(row, "ambiguous", detail);
      continue;
    }

    if (wantsIntro) {
      const blocked = await introBlockedReason(lead);
      if (blocked) {
        notSent.set(lead.id, `NOT SENT: ${blocked}`);
        push(row, "blocked", blocked);
        continue;
      }
      if (sentThisRun >= cap) {
        capped = true;
        push(row, "skipped", `per-run cap of ${cap} reached, will retry next pass`);
        continue;
      }
      if (mode === "report") {
        push(row, "would_introduce", "report mode, nothing claimed and nothing sent");
        continue;
      }

      const claim = await claimIntro(lead, mode);
      if (!claim.claimed) {
        push(row, "skipped", claim.reason ?? "claim refused");
        continue;
      }
      const outcome = await sendIntro(lead, mode);
      if (!outcome.ok) {
        // Release so a transient failure retries rather than silently losing it.
        await releaseClaim(lead.id);
        notSent.set(lead.id, `NOT SENT: ${outcome.reason}`);
        push(row, "blocked", `send failed, claim released: ${outcome.reason}`);
        continue;
      }
      await markIntroSent(lead.id, outcome.providerId, mode);
      sentThisRun += 1;
      await stopChase(lead.id, "handed_to_partner");
      push(
        row,
        "introduced",
        outcome.degraded
          ? `sent in ${mode} mode, without the quoted replies`
          : `sent in ${mode} mode`,
      );
      continue;
    }

    if (wantsStopOnly) {
      if (mode === "report") {
        push(row, "would_introduce", "report mode: would stop the chase, no email");
        continue;
      }
      await stopChase(lead.id, "kept_in_house");
      push(row, "chase_stopped", "in-house lead contacted, automated chase ended");
      continue;
    }

    push(row, "skipped", "decision recorded but no action column set");
  }

  // Status write-back. Forward-only: historic rows keep whatever they hold, so a
  // sheet full of months-old triage notes is never rewritten by this system.
  // Best-effort: a Sheets failure here must not fail a pass that has already sent.
  let statusRowsWritten = 0;
  try {
    if (mode !== "report") {
      const fresh = rows.filter((r) => {
        const lead = leads.get(r.leadId);
        if (!lead) return false;
        return gate ? new Date(lead.created_at) >= gate : true;
      });
      const bits = await buildStatus(fresh.map((r) => r.leadId));
      const updates = fresh
        .map((r) => {
          const b = bits.get(r.leadId);
          if (!b) return null;
          // Column K shows the handoff failure when there is one, because that is
          // the thing a human needs to act on. Otherwise it shows nurture status.
          const failure = notSent.get(r.leadId);
          return { leadId: r.leadId, ...b, nurtureStatus: failure ?? b.nurtureStatus };
        })
        .filter((u): u is NonNullable<typeof u> => u !== null);
      const wrote = await writeTrackerStatusBatch(updates);
      statusRowsWritten = wrote.written;
      if (wrote.unmatched > 0) {
        console.error(
          `[tracker-sync] ${wrote.unmatched} row(s) could not be matched by lead id, not written`,
        );
      }
    }
  } catch (err) {
    console.error("[tracker-sync] status write-back failed", err);
  }

  return {
    mode,
    tab,
    rowsRead: rows.length,
    skippedNoId,
    goLiveAt: gate ? gate.toISOString() : null,
    capped,
    statusRowsWritten,
    watermarkPass: false,
    watermarkClaimed: 0,
    results,
    counts: blank(counts),
  };
}
