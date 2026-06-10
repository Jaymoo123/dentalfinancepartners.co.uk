/**
 * Frontmatter validator — CT-02.
 *
 * assertFrontmatter(data, manifest, filePath) throws with filename + field path
 * on any required-field violation, turning a missing date or empty metaDescription
 * into a build-time error rather than a silently-defaulted gap.
 *
 * Anti-pattern this replaces: `fm.date ?? ""` — silently ships a post with no date.
 */

export interface FrontmatterField {
  /** Field key in the frontmatter object. */
  key: string;
  /** Validation rule for the field value. */
  type: "nonEmptyString" | "isoDate";
}

/**
 * Validates parsed frontmatter data against a manifest of required fields.
 * Throws with `"<filePath>: missing required frontmatter \"<field>\""` on any
 * violation so the error names both the file and the field — the CT-02 contract.
 *
 * @param data      - Parsed frontmatter object (from gray-matter `data`).
 * @param manifest  - Required fields and their validation rules.
 * @param filePath  - Path of the content file (used in error messages only).
 */
export function assertFrontmatter(
  data: Record<string, unknown>,
  manifest: FrontmatterField[],
  filePath: string
): void {
  for (const field of manifest) {
    const value = data[field.key];

    if (field.type === "nonEmptyString") {
      if (typeof value !== "string" || value.trim() === "") {
        throw new Error(
          `${filePath}: missing required frontmatter "${field.key}"`
        );
      }
    } else if (field.type === "isoDate") {
      if (typeof value !== "string" || value.trim() === "") {
        throw new Error(
          `${filePath}: missing required frontmatter "${field.key}"`
        );
      }
      // Must be parseable as a real date (ISO-like: YYYY-MM-DD or full ISO 8601)
      const d = new Date(value);
      if (isNaN(d.getTime())) {
        throw new Error(
          `${filePath}: missing required frontmatter "${field.key}" (not a valid date: "${value}")`
        );
      }
    }
  }
}

/**
 * The standard required-field manifest shared by all adopted sites.
 * Sites with a clean corpus (pre-flight shows 0 violations) wire this into
 * their blog.ts after the matter() call; sites with violations do NOT adopt
 * until a backfill sweep clears the corpus.
 */
export const STANDARD_MANIFEST: FrontmatterField[] = [
  { key: "slug",            type: "nonEmptyString" },
  { key: "title",           type: "nonEmptyString" },
  { key: "date",            type: "isoDate"        },
  { key: "category",        type: "nonEmptyString" },
  { key: "metaDescription", type: "nonEmptyString" },
];
