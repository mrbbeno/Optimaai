"use client";

import { useEffect, useRef } from "react";
import { AudioSignalManager } from "./AudioSignalManager";
import { useLabPerformance } from "@/context/LabPerformanceContext";

interface AudioBlobProps {
  className?: string;
  colorStart?: string;
  colorEnd?: string;
}

export default function AudioBlob({
  className = "",
  colorStart = "rgba(99, 102, 241, 0.4)", // Indigo
  colorEnd = "rgba(168, 85, 247, 0.45)"   // Purple
}: AudioBlobProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { canvasEnabled, reduceMotion } = useLabPerformance();
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0, active: false });

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

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.tx = e.clientX - rect.left;
      mouseRef.current.ty = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    // Listen to mouse events on the canvas parent for better tracking
    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove);
      parent.addEventListener("mouseleave", handleMouseLeave);
    }

    // Vertex data structure for the blob
    const numPoints = 12;
    const baseRadius = Math.min(width, height) * 0.25;
    const points: { x: number; y: number; ox: number; oy: number; angle: number; speed: number; noiseOffset: number }[] = [];

    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2;
      points.push({
        x: 0,
        y: 0,
        ox: Math.cos(angle) * baseRadius, // original relative coordinates
        oy: Math.sin(angle) * baseRadius,
        angle,
        speed: 0.8 + Math.random() * 0.4,
        noiseOffset: Math.random() * 100
      });
    }

    let time = 0;

    // Smooth animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const center = { x: width / 2, y: height / 2 };
      
      // Update mouse spring physics
      const mouse = mouseRef.current;
      if (mouse.active) {
        mouse.x += (mouse.tx - mouse.x) * 0.08;
        mouse.y += (mouse.ty - mouse.y) * 0.08;
      } else {
        // Return mouse virtual point to center
        mouse.x += (center.x - mouse.x) * 0.05;
        mouse.y += (center.y - mouse.y) * 0.05;
      }

      const amp = AudioSignalManager.amplitude;
      time += reduceMotion ? 0.005 : 0.015 + amp * 0.02;

      // Update and compute vertex coordinates
      points.forEach((p, idx) => {
        // Generative noise displacement
        const noiseFactor = reduceMotion ? 4 : 15 + amp * 45;
        const currentRadius = baseRadius + Math.sin(time * p.speed + p.noiseOffset) * noiseFactor;
        
        let targetX = Math.cos(p.angle) * currentRadius;
        let targetY = Math.sin(p.angle) * currentRadius;

        // Mouse hover distortion field calculation
        const worldX = center.x + targetX;
        const worldY = center.y + targetY;

        const dx = worldX - mouse.x;
        const dy = worldY - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        const forceThreshold = 180;
        if (dist < forceThreshold && !reduceMotion) {
          // Push vertices away from the cursor to simulate fluid pressure
          const force = (forceThreshold - dist) / forceThreshold;
          const pushDistance = force * (35 + amp * 40);
          
          const pushX = (dx / dist) * pushDistance;
          const pushY = (dy / dist) * pushDistance;

          targetX += pushX;
          targetY += pushY;
        }

        // Apply smooth interpolation to coordinates
        const curX = center.x + targetX;
        const curY = center.y + targetY;

        p.x += (curX - p.x) * 0.2;
        p.y += (curY - p.y) * 0.2;
      });

      // Draw the fluid blob using cubic cardinal splines (Bézier curves)
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      for (let i = 0; i < numPoints; i++) {
        const p0 = points[i];
        const p1 = points[(i + 1) % numPoints];
        
        // Midpoint coordinates for Bezier control points
        const xc = (p0.x + p1.x) / 2;
        const yc = (p0.y + p1.y) / 2;
        
        ctx.quadraticCurveTo(p0.x, p0.y, xc, yc);
      }

      ctx.closePath();

      // Premium styling: Gradient + radial glow
      const gradient = ctx.createRadialGradient(
        center.x - baseRadius * 0.3, 
        center.y - baseRadius * 0.3, 
        baseRadius * 0.1, 
        center.x, 
        center.y, 
        baseRadius * 1.8
      );
      
      gradient.addColorStop(0, "rgba(139, 92, 246, 0.8)"); // Bright purple
      gradient.addColorStop(0.4, "rgba(99, 102, 241, 0.6)"); // Indigo
      gradient.addColorStop(0.7, "rgba(6, 182, 212, 0.35)");  // Cyan glow
      gradient.addColorStop(1, "rgba(11, 11, 16, 0)");       // Ambient fade

      ctx.fillStyle = gradient;
      
      // Draw outer atmospheric blur/glow
      ctx.shadowBlur = reduceMotion ? 0 : 40 + amp * 40;
      ctx.shadowColor = "rgba(139, 92, 246, 0.4)";
      
      ctx.fill();

      // Reset shadows before drawing inner accent lines
      ctx.shadowBlur = 0;

      // Draw delicate neon orbital lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;
      ctx.stroke();

      frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (parent) {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(frameId);
    };
  }, [canvasEnabled, reduceMotion, colorStart, colorEnd]);

  if (!canvasEnabled) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#0B0B10]">
        <div className="w-48 h-48 rounded-full bg-indigo-500/10 border border-indigo-500/20 blur-xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
