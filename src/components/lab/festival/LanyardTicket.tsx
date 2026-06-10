"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useLabPerformance } from "@/context/LabPerformanceContext";

export default function LanyardTicket() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { reduceMotion } = useLabPerformance();

  // Motion values for swing rotations
  const rotateXVal = useMotionValue(0);
  const rotateZVal = useMotionValue(0);

  // Springs mimicking gravity pull snapping the lanyard back to vertical equilibrium
  const springX = useSpring(rotateXVal, { stiffness: 45, damping: 6, mass: 1.2 });
  const springZ = useSpring(rotateZVal, { stiffness: 35, damping: 5, mass: 1.5 });

  const [mouseSpeed, setMouseSpeed] = useState({ x: 0, y: 0 });
  const lastMouse = useRef({ x: 0, y: 0, time: Date.now() });

  useEffect(() => {
    if (reduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const dt = now - lastMouse.current.time;
      if (dt === 0) return;

      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;

      // Calculate cursor speed vector (px / ms)
      const vx = dx / dt;
      const vy = dy / dt;

      lastMouse.current = { x: e.clientX, y: e.clientY, time: now };

      // Apply torque forces relative to speed vectors
      // Horizontal motion swings Z-axis. Vertical motion swings X-axis.
      const forceScaleZ = 120;
      const forceScaleX = 90;

      // Add clamp to prevent excessive flipping
      const rotZ = Math.max(-28, Math.min(28, vx * forceScaleZ));
      const rotX = Math.max(-20, Math.min(20, vy * forceScaleX));

      rotateZVal.set(rotZ);
      rotateXVal.set(rotX);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [reduceMotion, rotateXVal, rotateZVal]);

  // Tick loop to slowly damp down oscillations back to 0 if mouse stops
  useEffect(() => {
    if (reduceMotion) return;

    const interval = setInterval(() => {
      // Gentle decay towards 0
      rotateXVal.set(rotateXVal.get() * 0.85);
      rotateZVal.set(rotateZVal.get() * 0.85);
    }, 40);

    return () => clearInterval(interval);
  }, [reduceMotion, rotateXVal, rotateZVal]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[520px] flex flex-col items-center select-none"
      style={{ perspective: "1000px" }}
    >
      
      {/* 1. Lanyard Strap (Hanging from top) */}
      <div className="absolute top-0 w-8 h-32 z-10 origin-top pointer-events-none">
        {/* Purple/Pink Strap Loop */}
        <div className="w-[14px] h-[110px] mx-auto border-r-[4px] border-l-[4px] border-b-[6px] border-pink-500/80 dark:border-pink-600/80 bg-[#1D1230]/70 rounded-b-xl shadow-md flex items-end justify-center pb-1 relative">
          <span className="font-mono text-[7px] text-pink-300 font-bold tracking-widest rotate-90 origin-center translate-y-[-45px] uppercase select-none whitespace-nowrap">
            VIBRANT
          </span>
          {/* Metal Ring Clip */}
          <div className="absolute bottom-[-16px] left-[50%] -translate-x-[50%] w-4 h-4 rounded-full border-2 border-neutral-400 bg-linear-to-r from-neutral-300 via-neutral-100 to-neutral-400 shadow-sm flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-neutral-900 border border-neutral-500" />
          </div>
        </div>
      </div>

      {/* 2. Hanging Pass Card (Snaps to Lanyard Clip) */}
      <motion.div
        style={{
          transformOrigin: "top center",
          rotateX: springX,
          rotateZ: springZ,
          transformStyle: "preserve-3d"
        }}
        whileHover={{ scale: 1.02, y: 5 }}
        className="absolute top-[115px] w-[220px] h-[340px] rounded-3xl p-5 overflow-hidden border border-white/[0.08] shadow-2xl bg-linear-to-b from-purple-900/60 to-black/90 backdrop-blur-md cursor-grab active:cursor-grabbing"
      >
        {/* Colorful Gradient mesh inside card */}
        <div className="absolute inset-0 bg-radial from-pink-500/25 via-cyan-500/10 to-transparent pointer-events-none -z-10 animate-pulse" style={{ animationDuration: "4s" }} />
        
        {/* Top bar */}
        <div className="flex justify-between items-center border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
            <span className="font-mono text-[9px] tracking-wider text-pink-400 font-bold uppercase">VIBRANT 2025</span>
          </div>
          <span className="font-mono text-[9px] text-neutral-500">ENTRY PASS</span>
        </div>

        {/* Branding details */}
        <div className="flex flex-col items-center text-center mt-6 gap-2">
          <div className="text-[28px] font-black tracking-tighter leading-none bg-linear-to-r from-pink-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
            VIBRANT
          </div>
          <div className="font-mono text-[8px] tracking-widest text-neutral-400 uppercase">FESTIVAL</div>
        </div>

        {/* 3 Day pass detail */}
        <div className="flex flex-col items-center mt-6">
          <span className="font-sans font-black text-[30px] leading-none text-white tracking-tight">3 DAY</span>
          <span className="font-mono text-[10px] tracking-widest text-cyan-400 font-semibold uppercase mt-0.5">PASS</span>
        </div>

        {/* QR Code Placeholder */}
        <div className="mt-8 flex justify-center">
          <div className="w-[85px] h-[85px] bg-white rounded-xl p-1.5 shadow-lg flex items-center justify-center relative group/qr">
            {/* Fake QR code blocks */}
            <div 
              className="w-full h-full bg-cover"
              style={{
                backgroundImage: `url('data:image/svg+xml;utf8,<svg viewBox=%220 0 100 100%22 xmlns=%22http://www.w3.org/2000/svg%22><path d=%22M0,0h30v10h-20v20h-10z M70,0h30v30h-10v-20h-20z M0,70h10v20h20v10h-30z M90,90v-20h10v30h-30v-10z M10,10h10v10h-10z M10,40h10v10h-10z M40,10h10v10h-10z M40,45h20v10h-20z M45,75h10v10h-10z M80,10h10v10h-10z M70,45h10v10h-10z M80,80h10v10h-10z%22 fill=%22black%22/></svg>')`
              }}
            />
            {/* Glow sweep over QR */}
            <div className="absolute inset-0 bg-radial from-pink-500/10 to-transparent opacity-0 group-hover/qr:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        </div>

        {/* Footer pass tag */}
        <div className="absolute bottom-5 left-0 w-full text-center">
          <span className="font-mono text-[8px] tracking-wider text-neutral-500 uppercase">#FEELTHEVIBE</span>
        </div>

      </motion.div>

    </div>
  );
}
