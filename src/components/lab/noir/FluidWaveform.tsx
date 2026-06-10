"use client";

import { useEffect, useRef } from "react";
import { useScroll } from "framer-motion";
import { AudioSignalManager } from "./AudioSignalManager";
import { useLabPerformance } from "@/context/LabPerformanceContext";

interface FluidWaveformProps {
  className?: string;
}

export default function FluidWaveform({ className = "" }: FluidWaveformProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { canvasEnabled, reduceMotion } = useLabPerformance();

  // Track the scroll progress of the container section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    if (!canvasEnabled || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frameId: number;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    let phase = 0;

    const animate = () => {
      // Create slight motion trail (semi-transparent clearRect)
      ctx.fillStyle = "rgba(11, 11, 16, 0.08)"; // Deep near-black background
      ctx.fillRect(0, 0, width, height);

      // Read values from scroll progress and audio signal manager
      const scrollVal = scrollYProgress.get();
      const audioAmp = AudioSignalManager.amplitude;
      
      // Phase shifts faster when music is active
      const speed = reduceMotion ? 0.005 : 0.015 + audioAmp * 0.035;
      phase += speed;

      // Map scroll value to wave wavenumber (frequency)
      // Top of screen: slow waves. Bottom of screen: compressed/high-freq waves.
      const wavenumberBase = 0.003 + scrollVal * 0.009;
      
      // Waves settings
      const waves = [
        {
          wavenumber: wavenumberBase,
          amplitude: height * (0.12 + audioAmp * 0.18),
          phaseOffset: 0,
          color: "rgba(6, 182, 212, 0.45)", // Cyan
          lineWidth: 2
        },
        {
          wavenumber: wavenumberBase * 1.5,
          amplitude: height * (0.08 + audioAmp * 0.12),
          phaseOffset: Math.PI / 3,
          color: "rgba(139, 92, 246, 0.35)", // Violet
          lineWidth: 1.5
        },
        {
          wavenumber: wavenumberBase * 0.7,
          amplitude: height * (0.15 + audioAmp * 0.22),
          phaseOffset: Math.PI * 0.7,
          color: "rgba(99, 102, 241, 0.25)", // Indigo
          lineWidth: 3
        },
        {
          wavenumber: wavenumberBase * 2.2,
          amplitude: height * (0.04 + audioAmp * 0.06),
          phaseOffset: Math.PI * 1.2,
          color: "rgba(236, 72, 153, 0.15)", // Pink accent
          lineWidth: 1
        }
      ];

      // Enable atmospheric glow on the canvas lines
      ctx.shadowBlur = reduceMotion ? 0 : 15 + audioAmp * 20;

      waves.forEach((w) => {
        ctx.strokeStyle = w.color;
        ctx.shadowColor = w.color;
        ctx.lineWidth = w.lineWidth;
        ctx.beginPath();

        for (let x = 0; x < width; x += 4) {
          // Mathematical wave function: sine + noise factor based on audio
          const y = height / 2 + 
            Math.sin(x * w.wavenumber + phase + w.phaseOffset) * w.amplitude +
            Math.cos(x * 0.02 - phase * 1.5) * (audioAmp * 15);

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });

      // Reset shadow blur
      ctx.shadowBlur = 0;

      // Draw subtle background grids that react to scroll
      ctx.strokeStyle = "rgba(255, 255, 255, 0.005)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      const scrollOffset = (scrollVal * 100) % gridSize;

      for (let y = scrollOffset; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameId);
    };
  }, [canvasEnabled, reduceMotion, scrollYProgress]);

  if (!canvasEnabled) {
    return (
      <div ref={containerRef} className={`w-full h-full min-h-[300px] bg-[#0B0B10] flex items-center justify-center ${className}`}>
        <div className="w-full h-[1px] bg-indigo-500/20" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative w-full h-full min-h-[300px] bg-[#0B0B10] overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Cinematic noise overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-4 mix-blend-overlay bg-[url('data:image/svg+xml;utf8,<svg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22><filter id=%22noise%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/></svg>')] bg-repeat" />
    </div>
  );
}
