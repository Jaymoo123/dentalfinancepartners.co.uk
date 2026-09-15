/**
 * Google Sheets append helper for the lead-sync webhook.
 *
 * Uses a Google service account to append a row to a Sheet via the Sheets v4
 * REST API. The OAuth2 service-account JWT is built and signed in-process with
 * Node's built-in crypto (RS256), so no `googleapis` / `google-auth-library`
 * dependency is needed. Node runtime only (PEM signing is unavailable on edge).
 *
 * Env (set in the Vercel project, server-side only):
 *   GOOGLE_SERVICE_ACCOUNT_B64    PREFERRED: the whole service-account JSON file,
 *                                 base64-encoded. One paste-safe single-line value
 *                                 (no multi-line PEM headaches).
 *   GOOGLE_SHEETS_CLIENT_EMAIL    fallback: service account email, used only if
 *   GOOGLE_SHEETS_PRIVATE_KEY     fallback: the PEM private key, the _B64 var is unset.
 *   GOOGLE_SHEETS_SPREADSHEET_ID  the long id from the sheet URL (/d/<ID>/edit)
 *   GOOGLE_SHEETS_TAB             optional tab name (defaults to "Leads")
 */
import crypto from "node:crypto";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SCOPE = "https://www.googleapis.com/auth/spreadsheets";

function base64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function getAccessToken(clientEmail: string, privateKey: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = base64url(
    JSON.stringify({
      iss: clientEmail,
      scope: SCOPE,
      aud: TOKEN_URL,
      iat: now,
      exp: now + 3600,
    }),
  );
  const signingInput = `${header}.${claim}`;
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(signingInput);
  signer.end();
  const signature = base64url(signer.sign(privateKey));
  const assertion = `${signingInput}.${signature}`;

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Google token exchange failed (${res.status}): ${detail}`);
  }
  const json = (await res.json()) as { access_token?: string };
  if (!json.access_token) {
    throw new Error("Google token exchange returned no access_token");
  }
  return json.access_token;
}

type Credentials = { clientEmail: string; privateKey: string };

// Resolve service-account credentials from either the preferred single base64
// var or the discrete fallback vars. Literal "\n" in a PEM is normalised to real
// newlines (a no-op if real newlines are already present).
function getCredentials(): Credentials | null {
  const b64 = process.env.GOOGLE_SERVICE_ACCOUNT_B64;
  if (b64) {
    try {
      const json = JSON.parse(Buffer.from(b64, "base64").toString("utf8")) as {
        client_email?: string;
        private_key?: string;
      };
      if (json.client_email && json.private_key) {
        return {
          clientEmail: json.client_email,
          privateKey: json.private_key.replace(/\\n/g, "\n"),
        };
      }
    } catch {
      // Malformed base64/JSON: fall through to discrete vars.
    }
  }
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const rawKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
  if (clientEmail && rawKey) {
    return { clientEmail, privateKey: rawKey.replace(/\\n/g, "\n") };
  }
  return null;
}

export function sheetsConfigured(): boolean {
  return Boolean(getCredentials() && process.env.GOOGLE_SHEETS_SPREADSHEET_ID);
}

// The Sheets API addresses row inserts by numeric sheet id (the `gid` in the tab's
// URL), not by tab name, so resolve the name we are configured with to its id.
async function getSheetId(
  spreadsheetId: string,
  tab: string,
  accessToken: string,
): Promise<number> {
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}` +
      `?fields=sheets.properties(sheetId,title)`,
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Sheets metadata failed (${res.status}): ${detail}`);
  }
  const json = (await res.json()) as {
    sheets?: { properties?: { sheetId?: number; title?: string } }[];
  };
  const match = json.sheets?.find((s) => s.properties?.title === tab);
  if (!match?.properties || typeof match.properties.sheetId !== "number") {
    const found = (json.sheets ?? []).map((s) => s.properties?.title).join(", ");
    throw new Error(`Sheets tab "${tab}" not found (tabs present: ${found})`);
  }
  return match.properties.sheetId;
}

/**
 * Insert a lead as the new row 2, directly under the header, pushing every
 * existing row down one.
 *
 * Newest-first is deliberate: the tracker is read top-down by whoever is
 * triaging, so a new lead must be the first thing they see rather than the last
 * row of a list that only grows. Inserting a whole row (rather than writing over
 * cells) is what keeps the triager's own columns attached to their lead, because
 * Sheets moves the entire row's contents down together.
 *
 * Two API calls, and they are not atomic. The ordering is chosen so the failure
 * mode is harmless: if the insert succeeds and the write fails, the sheet gains
 * one blank row, which is obvious and costs nothing. The reverse order could
 * overwrite a real lead.
 */
export async function prependLeadRow(values: (string | number)[]): Promise<void> {
  const creds = getCredentials();
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const tab = process.env.GOOGLE_SHEETS_TAB || "Leads";
  if (!creds || !spreadsheetId) {
    throw new Error(
      "Google Sheets env not configured (set GOOGLE_SERVICE_ACCOUNT_B64 or " +
        "GOOGLE_SHEETS_CLIENT_EMAIL+GOOGLE_SHEETS_PRIVATE_KEY, plus GOOGLE_SHEETS_SPREADSHEET_ID)",
    );
  }

  const accessToken = await getAccessToken(creds.clientEmail, creds.privateKey);
  const sheetId = await getSheetId(spreadsheetId, tab, accessToken);

  // startIndex is 0-based and the header occupies row 1, so index 1 is row 2.
  // inheritFromBefore:false takes formatting from the row below (a data row)
  // rather than from the header, which would style the lead as a heading.
  const insert = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requests: [
          {
            insertDimension: {
              range: { sheetId, dimension: "ROWS", startIndex: 1, endIndex: 2 },
              inheritFromBefore: false,
            },
          },
        ],
      }),
    },
  );
  if (!insert.ok) {
    const detail = await insert.text().catch(() => "");
    throw new Error(`Sheets row insert failed (${insert.status}): ${detail}`);
  }

  const write = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/` +
      `${encodeURIComponent(tab)}!A2?valueInputOption=RAW`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: [values] }),
    },
  );
  if (!write.ok) {
    const detail = await write.text().catch(() => "");
    throw new Error(`Sheets write failed (${write.status}): ${detail}`);
  }
}

/* ------------------------------------------------------------------ *
 * Read side: the triager's decision columns.
 *
 * The tracker is the surface Umair already works in, so it is the trigger for
 * the warm handoff rather than a second place to do the same job. This module
 * only ever READS his columns; it writes to J-M (the status columns it owns)
 * and never to N onward.
 *
 * Column letters are hard-coded because the sheet's A-I layout is already a
 * contract shared with the sync webhook and proposal_engine/export_raw_leads.py
 * (SHEET_WEBHOOK_COLS). Column I carries the lead id, which is the only join
 * key used here: never name, never email, both of which repeat.
 *
 * A column inserted to the LEFT of S shifts these and silently breaks both the
 * sync and the handoff. New columns go on the right.
 * ------------------------------------------------------------------ */

/** 0-based indexes into a sheet row, mirroring the live tracker layout. */
export const TRACKER_COLS = {
  leadId: 8, // I
  verified: 9, // J   system-owned
  nurtureStatus: 10, // K   system-owned
  bookedSlots: 11, // L   system-owned
  contactTrail: 12, // M   system-owned
  destination: 13, // N   Umair: "Omar" | "In-house"
  sendEmail: 14, // O   Umair: "Send"
  inHouseContacted: 15, // P   Umair: "Yes"
} as const;

export type TrackerRow = {
  /** 1-based sheet row number, for write-back and for human-readable reports. */
  rowNumber: number;
  leadId: string;
  destination: string;
  sendEmail: string;
  inHouseContacted: string;
};

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Read every data row of the tracker that carries a usable lead id.
 *
 * Rows whose column I is not a UUID are skipped rather than guessed at: a
 * non-UUID there means the sheet layout has drifted from the webhook contract,
 * and acting on a misaligned row could email the wrong person. The count of
 * skipped rows is returned so a caller can surface drift instead of silently
 * processing fewer leads than the sheet contains.
 */
export async function readTrackerRows(): Promise<{
  rows: TrackerRow[];
  skippedNoId: number;
  tab: string;
}> {
  const creds = getCredentials();
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const tab = process.env.GOOGLE_SHEETS_TAB || "Leads";
  if (!creds || !spreadsheetId) {
    throw new Error("Google Sheets env not configured");
  }

  const accessToken = await getAccessToken(creds.clientEmail, creds.privateKey);
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/` +
      `${encodeURIComponent(tab)}!A2:P?majorDimension=ROWS`,
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Sheets read failed (${res.status}): ${detail}`);
  }
  const json = (await res.json()) as { values?: string[][] };
  const values = json.values ?? [];

  const rows: TrackerRow[] = [];
  let skippedNoId = 0;
  const cell = (r: string[], i: number) => (r[i] ?? "").trim();

  values.forEach((r, idx) => {
    // Range starts at row 2, so sheet row = index + 2.
    const rowNumber = idx + 2;
    const leadId = cell(r, TRACKER_COLS.leadId);
    if (!leadId) return; // genuinely blank row, not drift
    if (!UUID_RE.test(leadId)) {
      skippedNoId += 1;
      return;
    }
    rows.push({
      rowNumber,
      leadId,
      destination: cell(r, TRACKER_COLS.destination),
      sendEmail: cell(r, TRACKER_COLS.sendEmail),
      inHouseContacted: cell(r, TRACKER_COLS.inHouseContacted),
    });
  });

  return { rows, skippedNoId, tab };
}

/**
 * Re-resolve which sheet row currently holds each lead id.
 *
 * Rows MOVE. Every new lead is inserted at row 2 and pushes everything below it
 * down, so a row number captured at the start of a pass can point at a different
 * person by the time the pass writes. Writing a status against the wrong row would
 * put one enquirer's handoff state on another enquirer's line, in the sheet a human
 * makes routing decisions from.
 *
 * So the row number is resolved again, from column I, immediately before writing,
 * and anything that cannot be matched is skipped rather than written by position.
 */
export async function resolveRowsByLeadId(): Promise<Map<string, number>> {
  const creds = getCredentials();
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const tab = process.env.GOOGLE_SHEETS_TAB || "Leads";
  if (!creds || !spreadsheetId) throw new Error("Google Sheets env not configured");

  const accessToken = await getAccessToken(creds.clientEmail, creds.privateKey);
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/` +
      `${encodeURIComponent(tab)}!I2:I?majorDimension=COLUMNS`,
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Sheets row resolve failed (${res.status}): ${detail}`);
  }
  const json = (await res.json()) as { values?: string[][] };
  const column = json.values?.[0] ?? [];
  const map = new Map<string, number>();
  column.forEach((id, idx) => {
    const trimmed = (id ?? "").trim();
    // First occurrence wins: a duplicated id is a sheet fault, and the newest row
    // (nearest the top) is the one a human is looking at.
    if (trimmed && !map.has(trimmed)) map.set(trimmed, idx + 2);
  });
  return map;
}

/**
 * Write the system-owned status columns for many rows in one call.
 *
 * Each update is addressed by LEAD ID, not by the row number the caller happened
 * to read: see resolveRowsByLeadId above for why. A lead whose row cannot be found
 * is skipped and counted, never written by position.
 *
 * Writes J to M only, and column K may carry a handoff failure rather than the
 * nurture status: a refusal nobody can see is worse than the problem it prevents,
 * because everyone believes the partner firm was emailed. Column N onward belongs
 * to the triager and is never touched.
 */
export async function writeTrackerStatusBatch(
  updates: {
    leadId: string;
    verified: string;
    nurtureStatus: string;
    bookedSlots: string;
    contactTrail: string;
  }[],
): Promise<{ written: number; unmatched: number }> {
  if (updates.length === 0) return { written: 0, unmatched: 0 };

  const creds = getCredentials();
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const tab = process.env.GOOGLE_SHEETS_TAB || "Leads";
  if (!creds || !spreadsheetId) throw new Error("Google Sheets env not configured");

  const rows = await resolveRowsByLeadId();
  const data: { range: string; values: string[][] }[] = [];
  let unmatched = 0;
  for (const u of updates) {
    const rowNumber = rows.get(u.leadId);
    if (!rowNumber) {
      unmatched += 1;
      continue;
    }
    data.push({
      range: `${tab}!J${rowNumber}:M${rowNumber}`,
      values: [[u.verified, u.nurtureStatus, u.bookedSlots, u.contactTrail]],
    });
  }
  if (data.length === 0) return { written: 0, unmatched };

  const accessToken = await getAccessToken(creds.clientEmail, creds.privateKey);
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchUpdate`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ valueInputOption: "RAW", data }),
    },
  );
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Sheets status batch write failed (${res.status}): ${detail}`);
  }
  return { written: data.length, unmatched };
}
