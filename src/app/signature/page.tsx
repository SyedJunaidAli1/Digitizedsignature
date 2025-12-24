"use client";
import { useEffect, useState } from "react";

const SignaturePage = () => {
  const [keys, setKeys] = useState<string[]>([]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key.length === 1) {
        setKeys((prev) => [...prev, e.key]);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-center">Type your name</h1>
      <p className="mt-2">{keys.join(" ")}</p>
    </div>
  );
};

export default SignaturePage;
