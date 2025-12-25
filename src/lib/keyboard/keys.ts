export type PhysicalKey =
  | `Key${string}`
  | `Digit${number}`
  | "Space"
  | "Minus"
  | "Equal"
  | "BracketLeft"
  | "BracketRight"
  | "Backslash"
  | "Semicolon"
  | "Quote"
  | "Comma"
  | "Period"
  | "Slash";

export type KeyPosition = {
  x: number;
  y: number;
  w?: number; // width for UI (space, enter, etc.)
};
