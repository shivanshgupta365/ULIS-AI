import type { MaskResult, UserCaseInput } from "@/lib/types";

const INPUT_KEY = "ulis:input";
const MASK_KEY = "ulis:mask";

/**
 * Session-only persistence (PRD privacy requirement: nothing stored
 * permanently). Data lives in sessionStorage and is cleared on demand.
 */

export function saveInput(input: UserCaseInput): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(INPUT_KEY, JSON.stringify(input));
}

export function loadInput(): UserCaseInput | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(INPUT_KEY);
  return raw ? (JSON.parse(raw) as UserCaseInput) : null;
}

export function saveMask(mask: MaskResult): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(MASK_KEY, JSON.stringify(mask));
}

export function loadMask(): MaskResult | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(MASK_KEY);
  return raw ? (JSON.parse(raw) as MaskResult) : null;
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(INPUT_KEY);
  sessionStorage.removeItem(MASK_KEY);
}
