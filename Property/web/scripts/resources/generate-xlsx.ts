/**
 * Excel model generator for the premium resources system.
 *
 * Loops the builders registry (builders/index.ts) and writes one .xlsx per
 * category to public/resources/<topic>/<topic>-model.xlsx. Run manually / in CI
 * (NOT part of `next build`):
 *
 *   npm run resources:xlsx
 *
 * The generated files are COMMITTED (with fixed workbook created/modified
 * timestamps for byte-stable diffs). The generator imports the SAME locked
 * constants the site calculators use, so the spreadsheet rates and the on-site
 * math derive from one source and cannot drift; a golden test (added per builder
 * in Phase B/C) asserts the TS compute === the xlsx formula result before a
 * category's `enabled` flag is flipped.
 *
 * PHASE A: the builders registry is empty, so this writes nothing and exits 0.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { BUILDERS } from "./builders/index";

// Fixed timestamp so regenerating a workbook produces a byte-identical file
// (no spurious diffs from the current date). 2024-01-01T00:00:00Z.
const FIXED_DATE = new Date("2024-01-01T00:00:00Z");

// Fixed DOS date/time written into every ZIP entry header. exceljs pins the
// docProps timestamps (wb.created/modified) but its zip writer stamps each entry
// with the current wall-clock time, which would make the committed .xlsx differ
// on every regeneration. We rewrite those header fields to a constant so the
// file is byte-stable (set 2024-01-01 00:00:00 in the DOS date/time encoding).
//   DOS date: ((year-1980)<<9) | (month<<5) | day
//   DOS time: (hour<<11) | (minute<<5) | (second/2)
const DOS_DATE = (((2024 - 1980) << 9) | (1 << 5) | 1) & 0xffff; // 2024-01-01
const DOS_TIME = 0; // 00:00:00

/**
 * Overwrite the modification date/time in every ZIP local-file-header
 * (signature PK\x03\x04) and central-directory record (PK\x01\x02) so the archive
 * does not embed the current clock time. Operates on the raw buffer in place.
 */
function normalizeZipTimestamps(buf: Buffer): Buffer {
  for (let i = 0; i + 4 <= buf.length; i++) {
    const sig = buf.readUInt32LE(i);
    if (sig === 0x04034b50) {
      // Local file header: time at +10, date at +12.
      buf.writeUInt16LE(DOS_TIME, i + 10);
      buf.writeUInt16LE(DOS_DATE, i + 12);
    } else if (sig === 0x02014b50) {
      // Central directory header: time at +12, date at +14.
      buf.writeUInt16LE(DOS_TIME, i + 12);
      buf.writeUInt16LE(DOS_DATE, i + 14);
    }
  }
  return buf;
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// scripts/resources -> Property/web/public/resources
const PUBLIC_RESOURCES = path.resolve(__dirname, "../../public/resources");

async function main(): Promise<void> {
  if (BUILDERS.length === 0) {
    console.log("[resources:xlsx] No builders registered yet — nothing to generate.");
    return;
  }

  for (const entry of BUILDERS) {
    const wb = await entry.build();
    // Pin timestamps for byte-stable output.
    wb.created = FIXED_DATE;
    wb.modified = FIXED_DATE;

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
