"use client";

import { useEffect, useRef } from "react";
import { useLabPerformance } from "@/context/LabPerformanceContext";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  decay: number;
  gravity: number;
}

export default function ClickSparkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { canvasEnabled, reduceMotion } = useLabPerformance();
  const particlesRef = useRef<Particle[]>([]);

  // Palette matching Vibrant: Hot Pink, Electric Cyan, Glowing Purple, Neon Orange
  const colors = [
    "rgba(236, 72, 153, 1)",  // Pink
    "rgba(6, 182, 212, 1)",  // Cyan
    "rgba(168, 85, 247, 1)", // Violet
    "rgba(249, 115, 22, 1)",  // Orange
    "rgba(253, 224, 71, 1)"   // Yellow sparkle
  ];

  useEffect(() => {
    if (!canvasEnabled || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frameId: number;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Spawn burst function
    const spawnBurst = (x: number, y: number) => {
      if (reduceMotion) return;
      const count = 35 + Math.floor(Math.random() * 15);
      
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        // Speeds distributed radially
        const speed = 2 + Math.random() * 6;
        
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - (1 + Math.random() * 2), // slightly upward bias
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 1.5 + Math.random() * 2,
          alpha: 1.0,
          decay: 0.015 + Math.random() * 0.02,
          gravity: 0.06 // falling physics
        });
      }
    };

    // Spawn tiny trails on mousemove
    const handleMouseMove = (e: MouseEvent) => {
      if (reduceMotion || Math.random() > 0.35) return; // limit frequency
      
      // Spawn 1-2 small faint dust particles
      particlesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5 - 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 0.8 + Math.random() * 1,
        alpha: 0.6,
        decay: 0.03 + Math.random() * 0.03,
        gravity: 0.02
      });
    };

    const handleClick = (e: MouseEvent) => {
      spawnBurst(e.clientX, e.clientY);
    };

    window.addEventListener("click", handleClick);
    window.addEventListener("mousemove", handleMouseMove);

    // Render loop
    const render = () => {
      // Clear with slight trailing opacity for motion blur
      ctx.fillStyle = "rgba(11, 11, 16, 0.25)";
      ctx.globalCompositeOperation = "source-over";
      ctx.fillRect(0, 0, width, height);

      // Light glow compositing mode for neon explosion particles
      ctx.globalCompositeOperation = "screen";

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        
        // Physics update
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity; // Gravity pull
        p.vx *= 0.97; // Drag/friction
        p.vy *= 0.97;
        p.alpha -= p.decay;

        // Clean up dead particles
        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Render particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        // Glow effect using double transparency layers
        ctx.fillStyle = p.color.replace("1)", `${p.alpha})`);
        ctx.fill();

        // Outer glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace("1)", `${p.alpha * 0.15})`);
        ctx.fill();
      }

      frameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, [canvasEnabled, reduceMotion]);

  if (!canvasEnabled) return null;

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-10" 
      style={{ mixBlendMode: "screen" }}
    />
  );
}
