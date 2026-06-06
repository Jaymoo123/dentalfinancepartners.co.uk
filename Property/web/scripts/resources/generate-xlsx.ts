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
    await writeFile(outPath, Buffer.from(buffer));
    console.log(`[resources:xlsx] Wrote ${path.relative(process.cwd(), outPath)}`);
  }

  console.log(`[resources:xlsx] Done — ${BUILDERS.length} workbook(s).`);
}

main().catch((err) => {
  console.error("[resources:xlsx] Failed:", err);
  process.exitCode = 1;
});
