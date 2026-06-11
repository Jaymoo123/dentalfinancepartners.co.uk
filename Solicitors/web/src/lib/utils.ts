/**
 * Minimal className utility — combines class strings, filtering falsy values.
 * No external dependencies (Solicitors site does not have clsx/tailwind-merge).
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
