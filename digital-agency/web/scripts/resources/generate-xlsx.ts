/**
 * Excel model generator for the Agency Founder Finance gated resources system.
 *
 * Loops the builders registry (builders/index.ts) and writes one .xlsx per
 * category to public/resources/<topic>/<filename>. Run manually:
 *
 *   npm run resources:xlsx --workspace digital-agency/web
 *
 * Generated files are COMMITTED. Fixed workbook timestamps produce byte-stable
 * diffs. The generator imports the SAME locked constants the site calculators
 * use, so workbook rates and on-site math always derive from one source.
 *
 * Golden tests (scripts/resources/builders/*.test.ts) assert that workbook
 * formula cells equal the compute-lib outputs before a category's `enabled`
 * flag is flipped.
 *
 * Storage prefix: aff (FROZEN). No ptp_/dfp_/cfp_/bfp_ keys.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { BUILDERS } from "./builders/index.js";

// Fixed timestamp so regenerating a workbook produces a byte-identical file.
const FIXED_DATE = new Date("2024-01-01T00:00:00Z");

// Fixed DOS date/time written into every ZIP entry header. exceljs pins the
// docProps timestamps but its zip writer stamps each entry with the current
// wall-clock time. We rewrite those header fields to a constant.
const DOS_DATE = (((2024 - 1980) << 9) | (1 << 5) | 1) & 0xffff; // 2024-01-01
const DOS_TIME = 0; // 00:00:00

/**
 * Overwrite the modification date/time in every ZIP local-file-header
 * (signature PK\x03\x04) and central-directory record (PK\x01\x02) so the
 * archive does not embed the current clock time.
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
// scripts/resources -> digital-agency/web/public/resources
const PUBLIC_RESOURCES = path.resolve(__dirname, "../../public/resources");

async function main(): Promise<void> {
  if (BUILDERS.length === 0) {
    console.log("[resources:xlsx] No builders registered yet -- nothing to generate.");
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

  console.log(`[resources:xlsx] Done -- ${BUILDERS.length} workbook(s).`);
}

main().catch((err) => {
  console.error("[resources:xlsx] Failed:", err);
  process.exitCode = 1;
});
