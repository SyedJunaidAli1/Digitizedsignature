import { KeyboardLayout } from "../KeyboardLayout";

export function getKeyPositionFromEvent(
  e: KeyboardEvent,
  layout: KeyboardLayout,
  includeNumbers: boolean,
): Key | null {
  const baseLayout = KeyboardLayout[layout];
  if (!baseLayout) return null;

  // Resolve character from keyboard event
  const baseChar = e.key.length === 1 ? e.key.toUpperCase() : null;
  if (!baseChar) return null;

  // Number row support
  if (includeNumbers && baseChar >= "0" && baseChar <= "9") {
    return baseLayout[baseChar] ?? null;
  }

  return baseLayout[baseChar] ?? null;
}
