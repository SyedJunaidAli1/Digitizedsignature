"use client";
import { layouts, KeyboardLayout } from "@/src/lib/keyboard";
import { useEffect, useState } from "react";

const KEY_SIZE = 48;

export function Keyboard() {
  const layout = layouts[KeyboardLayout.QWERTY];
  const [pressed, setPressed] = useState<string | null>(null);

  useEffect(() => {
    const down = (e: KeyboardEvent) => setPressed(e.code);
    const up = () => setPressed(null);

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  return (
    <div className="relative mx-auto mt-10 w-fit">
      {Object.entries(layout).map(([code, key]) => (
        <div
          key={code}
          className={`absolute rounded-md border text-xs flex items-center justify-center
            ${pressed === code ? "bg-muted text-muted-foreground" :""}`}
          style={{
            left: key.x * KEY_SIZE,
            top: key.y * KEY_SIZE,
            width: (key.w ?? 1) * KEY_SIZE,
            height: KEY_SIZE,
          }}
        >
          {code.replace("Key", "").replace("Digit", "")}
        </div>
      ))}
    </div>
  );
}
