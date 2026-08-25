/**
 * Minimal className utility — combines class strings, filtering falsy values.
 * No external dependencies.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
