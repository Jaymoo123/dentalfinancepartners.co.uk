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

export async function appendLeadRow(values: (string | number)[]): Promise<void> {
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

  const range = `${encodeURIComponent(tab)}!A1`;
  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append` +
    `?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values: [values] }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Sheets append failed (${res.status}): ${detail}`);
  }
}
