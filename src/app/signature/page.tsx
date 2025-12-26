"use client";
import { useState, useEffect, useRef } from "react";
import {
  KeyboardLayout,
  keyboardLayouts,
  generatePath,
  CurveType,
} from "@/src/lib/util/constant";
import Options from "../components/Options";

const KeyboardSignature = () => {
  const [text, setText] = useState("");
  const [layout, setLayout] = useState<KeyboardLayout>(KeyboardLayout.QWERTY);
  const [curveType, setCurveType] = useState<CurveType>("linear");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Drawing Constants
  const SCALE = 100;
  const OFFSET_X = 50;
  const OFFSET_Y = 50;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Use the layout data from your constants.ts
    const currentLayoutData = keyboardLayouts[layout];

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Draw Keyboard Background
    Object.keys(currentLayoutData).forEach((key) => {
      const pos = currentLayoutData[key];
      const x = pos.x * SCALE + OFFSET_X;
      const y = pos.y * SCALE + OFFSET_Y;
      const isActive = text.toUpperCase().includes(key);

      ctx.beginPath();
      ctx.arc(x, y, 15, 0, Math.PI * 2);
      ctx.fillStyle = isActive
        ? "rgba(99, 102, 241, 0.2)"
        : "rgba(255, 255, 255, 0.02)";
      ctx.fill();
    });

    // 2. Draw Signature Path using your generatePath logic
    const points = text
      .toUpperCase()
      .split("")
      .map((char) => currentLayoutData[char])
      .filter((p) => !!p);

    if (points.length >= 2) {
      // Map your logical coordinates to Canvas pixels
      const pixelPoints = points.map((p) => ({
        x: p.x * SCALE + OFFSET_X,
        y: p.y * SCALE + OFFSET_Y,
      }));

      // Get the SVG Path string from your logic
      const pathData = generatePath(pixelPoints, curveType);

      // Draw the path to Canvas
      const path = new Path2D(pathData);

      ctx.shadowBlur = 15;
      ctx.shadowColor = "#6366f1";
      ctx.strokeStyle = "#6366f1";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke(path);
    }
  }, [text, layout, curveType]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="max-w-4xl w-full space-y-6">
        <div>
          <Options
            layout={layout}
            setLayout={setLayout}
            curveType={curveType}
            setCurveType={setCurveType}
          />
        </div>

        <div className="border rounded-3xl p-10 backdrop-blur-md">
          <canvas
            ref={canvasRef}
            width={750}
            height={300}
            className="w-full h-auto"
          />
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your signature..."
            className="w-full mt-10  border-b py-4 text-3xl text-center focus:outline-none focus:border-indigo-500 transition-all font-light tracking-widest"
          />
        </div>
      </div>
    </div>
  );
};

export default KeyboardSignature;
