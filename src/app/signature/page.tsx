'use client'
import React, { useState, useEffect, useRef } from 'react';

// Organized Key Map (Row by Row)
const KEYBOARD_LAYOUT = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm']
];

// Map characters to [x, y] coordinates
const KEY_MAP = {};
KEYBOARD_LAYOUT.forEach((row, rowIndex) => {
  row.forEach((key, keyIndex) => {
    // Offset rows to mimic a real keyboard staggering
    const offset = rowIndex * 20; 
    KEY_MAP[key] = [100 + keyIndex * 60 + offset, 80 + rowIndex * 70];
  });
});

const KeyboardSignature = () => {
  const [text, setText] = useState('');
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear and Setup
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 1. Draw the "Ghost" Keyboard Background
    ctx.font = '14px Inter, sans-serif';
    ctx.textAlign = 'center';
    
    Object.keys(KEY_MAP).forEach(key => {
      const [x, y] = KEY_MAP[key];
      const isActive = text.toLowerCase().includes(key);
      
      // Draw Key Circle/Background
      ctx.beginPath();
      ctx.arc(x, y, 18, 0, Math.PI * 2);
      ctx.fillStyle = isActive ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.03)';
      ctx.fill();
      
      // Draw Key Letter
      ctx.fillStyle = isActive ? '#818cf8' : '#3f3f46';
      ctx.fillText(key.toUpperCase(), x, y + 5);
    });

    // 2. Draw the Signature Line
    const points = text.toLowerCase().split('').map(char => KEY_MAP[char]).filter(p => !!p);
    
    if (points.length >= 2) {
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#6366f1';
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#6366f1';
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      ctx.moveTo(points[0][0], points[0][1]);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i][0], points[i][1]);
      }
      ctx.stroke();
      ctx.shadowBlur = 0; // Reset shadow for other elements
    }
  }, [text]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#09090b] text-white p-6">
      <div className="max-w-3xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            KEYBOARD SIGNATURE
          </h1>
          <p className="text-zinc-500">Visualize the geometry of your typing.</p>
        </div>

        <div className="relative bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm shadow-2xl">
          <canvas 
            ref={canvasRef} 
            width={750} 
            height={300} 
            className="w-full h-auto"
          />
          
          <div className="mt-8 relative">
            <input
              type="text"
              autoFocus
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Start typing..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-4 px-6 text-2xl text-center focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-zinc-700"
            />
          </div>
        </div>

        <div className="flex justify-between text-xs text-zinc-600 uppercase tracking-widest px-2">
          <span>Generative Art v1.0</span>
          <span>Based on QWERTY Coordinates</span>
        </div>
      </div>
    </div>
  );
};

export default KeyboardSignature;