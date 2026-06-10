"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { AudioSignalManager } from "./AudioSignalManager";
import { useLabPerformance } from "@/context/LabPerformanceContext";

interface GlassCardProps {
  title: string;
  duration: string;
  streams: string;
  isActive: boolean;
  onClick: () => void;
}

export default function GlassCard({
  title,
  duration,
  streams,
  isActive,
  onClick
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { reduceMotion } = useLabPerformance();

  // Motion values for 3D rotation
  const rotateXVal = useMotionValue(0);
  const rotateYVal = useMotionValue(0);

  // Springs for smooth, lag-free tilt transitions
  const springConfig = { stiffness: 120, damping: 18, mass: 0.5 };
  const rotateX = useSpring(rotateXVal, springConfig);
  const rotateY = useSpring(rotateYVal, springConfig);

  // Spotlight coordinates relative to card bounds
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse offset relative to card center
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Update spotlight
    setSpotlightPos({ x, y });

    if (reduceMotion) return;

    const centerX = width / 2;
    const centerY = height / 2;

    const dx = x - centerX;
    const dy = y - centerY;

    // Maximum rotation limits
    const maxTilt = 10;
    const rx = -(dy / centerY) * maxTilt;
    const ry = (dx / centerX) * maxTilt;

    rotateXVal.set(rx);
    rotateYVal.set(ry);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateXVal.set(0);
    rotateYVal.set(0);
  };

  // Mini canvas visualizer animation loop
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frameId: number;
    const numBars = 6;
    const barWidth = 3;
    const gap = 2;
    
    canvas.width = numBars * (barWidth + gap) - gap;
    canvas.height = 16;

    const bars = Array.from({ length: numBars }, (_, i) => ({
      height: 2,
      targetHeight: 2,
      noiseOffset: i * 1.5
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const amp = AudioSignalManager.amplitude;
      const isPlaying = AudioSignalManager.isPlaying;

      bars.forEach((b, idx) => {
        // Calculate new target height
        if (isActive && isPlaying) {
          // React to frequencies or general amplitude
          const freqVal = AudioSignalManager.frequencies[idx % 32];
          b.targetHeight = 2 + freqVal * (canvas.height - 4);
        } else if (isActive) {
          // Breathing motion when selected but paused
          b.targetHeight = 2 + Math.sin(Date.now() * 0.005 + b.noiseOffset) * 3;
        } else {
          // Flat when idle
          b.targetHeight = 2;
        }

        // Lerp height
        b.height += (b.targetHeight - b.height) * 0.25;

        // Draw bar
        ctx.fillStyle = isActive ? "#06B6D4" : "rgba(255,255,255,0.2)"; // Cyan when active
        ctx.fillRect(
          idx * (barWidth + gap), 
          canvas.height - b.height, 
          barWidth, 
          b.height
        );
      });

      frameId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(frameId);
  }, [isActive]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY
      }}
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 cursor-pointer p-6 flex flex-col justify-between aspect-video md:aspect-[4/3] bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.12] ${
        isActive ? "border-cyan-500/30 bg-cyan-950/[0.04]" : ""
      }`}
    >
      {/* 3D Inner glare spotlight overlay */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(255, 255, 255, 0.05), transparent 80%)`,
        }}
      />

      {/* Track index / state */}
      <div className="flex justify-between items-start z-10 pointer-events-none">
        <span className="font-mono text-[10px] text-neutral-600 tracking-wider">
          {isActive ? "SELECTED" : "TRACK"}
        </span>

        {/* Dynamic mini-visualizer */}
        <canvas ref={canvasRef} className="block w-[28px] h-[16px]" />
      </div>

      {/* Song details */}
      <div className="flex flex-col gap-1.5 z-10 pointer-events-none">
        <h3 className={`font-sans font-bold text-[18px] sm:text-[22px] tracking-tight transition-colors duration-300 ${
          isActive ? "text-cyan-400" : "text-neutral-200 group-hover:text-white"
        }`}>
          {title}
        </h3>
        
        <div className="flex justify-between items-center mt-2 font-mono text-[10px] text-neutral-500">
          <span>{streams} plays</span>
          <span>{duration}</span>
        </div>
      </div>
    </motion.div>
  );
}
