"use client";

import React from "react";
import { motion } from "framer-motion";

export default function GradientBackground() {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#0B0B10] overflow-hidden pointer-events-none -z-20">
      {/* 1. Shifting Radial Color Meshes */}
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.15, 0.9, 1]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[-10%] left-[-10%] w-[60%] aspect-square rounded-full bg-radial from-violet-600/15 via-purple-600/5 to-transparent blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -100, 50, 0],
          y: [0, 80, -60, 0],
          scale: [1, 0.85, 1.1, 1]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-[-15%] right-[-10%] w-[55%] aspect-square rounded-full bg-radial from-cyan-600/15 via-blue-600/5 to-transparent blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, 60, -80, 0],
          y: [0, 90, -40, 0],
          scale: [0.9, 1.1, 0.95, 0.9]
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[30%] left-[25%] w-[45%] aspect-square rounded-full bg-radial from-[#FF007A]/10 via-transparent to-transparent blur-3xl"
      />

      {/* 2. Scrolling Neon Gridlines */}
      <div 
        className="absolute inset-0 opacity-[0.035]" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(236, 72, 153, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(6, 182, 212, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at 50% 50%, black 60%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 50%, black 60%, transparent 100%)",
          animation: "scrollGrid 60s linear infinite"
        }} 
      />

      {/* 3. Cinematic Grain Overlay */}
      <div className="absolute inset-0 opacity-4 mix-blend-overlay bg-[url('data:image/svg+xml;utf8,<svg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22><filter id=%22noise%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/></svg>')] bg-repeat" />

      {/* CSS Styles for scrolling grid animation */}
      <style>{`
        @keyframes scrollGrid {
          0% {
            background-position: 0px 0px;
          }
          100% {
            background-position: 0px 3600px;
          }
        }
      `}</style>
    </div>
  );
}
