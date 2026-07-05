/**
 * Excel model generator for the Accounts for Lawyers premium resources.
 *
 * Writes one .xlsx per resource topic to public/resources/<topic>/<topic>-model.xlsx.
 * Run manually (NOT part of `next build`):
 *
 *   npm run resources:xlsx            (from Solicitors/web/)
 *
 * Generated files are committed with fixed workbook timestamps so regeneration
 * produces byte-identical output (no spurious git diffs from wall-clock time).
 *
 * The builders import the same locked compute libs the site calculators use, so
 * spreadsheet rates and on-site maths derive from a single source and cannot drift.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { BUILDERS } from "./builders/index.js";

// Fixed timestamp: 2024-01-01T00:00:00Z for byte-stable xlsx diffs.
const FIXED_DATE = new Date("2024-01-01T00:00:00Z");

// DOS date/time for ZIP entry headers.
const DOS_DATE = (((2024 - 1980) << 9) | (1 << 5) | 1) & 0xffff; // 2024-01-01
const DOS_TIME = 0; // 00:00:00

/**
 * Rewrite modification timestamp in every ZIP local-file-header (PK\x03\x04)
 * and central-directory record (PK\x01\x02) so the archive is byte-stable.
 */
function normalizeZipTimestamps(buf: Buffer): Buffer {
  for (let i = 0; i + 4 <= buf.length; i++) {
    const sig = buf.readUInt32LE(i);
    if (sig === 0x04034b50) {
      buf.writeUInt16LE(DOS_TIME, i + 10);
      buf.writeUInt16LE(DOS_DATE, i + 12);
    } else if (sig === 0x02014b50) {
      buf.writeUInt16LE(DOS_TIME, i + 12);
      buf.writeUInt16LE(DOS_DATE, i + 14);
    }
  }
  return buf;
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// scripts/resources/ -> Solicitors/web/public/resources/
const PUBLIC_RESOURCES = path.resolve(__dirname, "../../public/resources");

async function main(): Promise<void> {
  if (BUILDERS.length === 0) {
    console.log("[resources:xlsx] No builders registered — nothing to generate.");
    return;
  }

  for (const entry of BUILDERS) {
    const wb = await entry.build();
    wb.created = FIXED_DATE;
    wb.modified = FIXED_DATE;
    wb.creator = "Accounts for Lawyers";
    wb.lastModifiedBy = "Accounts for Lawyers";

    const outDir = path.join(PUBLIC_RESOURCES, entry.topic);
    await mkdir(outDir, { recursive: true });
    const outPath = path.join(outDir, entry.fileName);

    const buffer = await wb.xlsx.writeBuffer();
    const stable = normalizeZipTimestamps(Buffer.from(buffer));
    await writeFile(outPath, stable);
    console.log(`[resources:xlsx] Wrote ${path.relative(process.cwd(), outPath)}`);
  }

  console.log(`[resources:xlsx] Done — ${BUILDERS.length} workbook(s).`);
}

main().catch((err) => {
  console.error("[resources:xlsx] Failed:", err);
  process.exitCode = 1;
});
