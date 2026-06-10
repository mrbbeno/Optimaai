"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useLabPerformance } from "@/context/LabPerformanceContext";
import MagneticButton from "./MagneticButton";
import ScrollRevealText from "./ScrollRevealText";
import { Cpu, Eye, Zap } from "lucide-react";

// D1: Reactive Wave Canvas
function ReactiveWaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { canvasEnabled, motionMode, reduceMotion } = useLabPerformance();
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    if (!canvasEnabled || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frameId: number;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = 180;

    const resize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = 180;
    };

    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.tx = e.clientX - rect.left;
      mouseRef.current.ty = e.clientY - rect.top;
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    let offset = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Damp mouse tracking
      const mouse = mouseRef.current;
      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;

      // Draw horizontal wave grid
      ctx.strokeStyle = "rgba(0, 0, 0, 0.04)";
      ctx.lineWidth = 1;
      
      const waveCount = motionMode === "high" ? 4 : 2;
      const step = reduceMotion ? 0.003 : motionMode === "high" ? 0.012 : 0.006;
      offset += step;

      for (let j = 0; j < waveCount; j++) {
        ctx.beginPath();
        
        const phase = j * (Math.PI / 4);
        const amplitude = 12 + j * 6;

        for (let x = 0; x <= width; x += 10) {
          // Base math for wave
          let waveY = height / 2 + Math.sin(x * 0.008 + offset + phase) * amplitude;

          // Mouse influence
          const dx = x - mouse.x;
          const dist = Math.abs(dx);
          if (dist < 100 && !reduceMotion) {
            const force = (100 - dist) / 100;
            // Pull wave center to mouse y coordinates
            waveY += (mouse.y - waveY) * force * 0.4;
          }

          if (x === 0) {
            ctx.moveTo(x, waveY);
          } else {
            ctx.lineTo(x, waveY);
          }
        }
        
        ctx.stroke();
      }

      frameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, [canvasEnabled, motionMode, reduceMotion]);

  if (!canvasEnabled) {
    return (
      <div className="h-[180px] w-full bg-neutral-50 border border-neutral-200/50 rounded-xl flex items-center justify-center font-mono text-[10px] text-neutral-400">
        Canvas Disabled (Low Power Mode Active)
      </div>
    );
  }

  return (
    <div className="relative h-[180px] w-full bg-neutral-50/30 border border-neutral-200/50 rounded-xl overflow-hidden cursor-pointer">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-xs py-0.5 px-2 rounded-full border border-neutral-200/40 text-[9px] font-mono text-neutral-500 uppercase tracking-wider">
        Interactive Wave Grid
      </div>
      <div className="absolute bottom-3 right-3 text-[9px] font-mono text-neutral-400">
        Cursor shifts grid wavelengths
      </div>
    </div>
  );
}

// D2: Glass Morph Cards Stack
function GlassMorphPlayground() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { reduceMotion } = useLabPerformance();

  const cardsData = [
    { title: "Layer A", blur: "backdrop-blur-xs", bg: "bg-white/10", border: "border-white/20", scale: 0.9, y: -20, rotate: -6 },
    { title: "Layer B", blur: "backdrop-blur-md", bg: "bg-white/35", border: "border-white/40", scale: 0.95, y: -10, rotate: -2 },
    { title: "Layer C", blur: "backdrop-blur-xl", bg: "bg-white/60", border: "border-white/60", scale: 1.0, y: 0, rotate: 2 },
  ];

  return (
    <div 
      className="h-[180px] w-full bg-radial from-rose-50/20 via-neutral-50/50 to-indigo-50/20 border border-neutral-200/50 rounded-xl flex items-center justify-center relative overflow-hidden"
    >
      <div className="relative w-52 h-24 flex items-center justify-center">
        {cardsData.map((c, index) => (
          <motion.div
            key={c.title}
            className={`absolute w-36 h-20 rounded-xl border ${c.border} ${c.bg} ${c.blur} shadow-sm p-3 flex flex-col justify-between cursor-pointer`}
            animate={
              hoveredIndex === index && !reduceMotion
                ? { scale: c.scale + 0.08, y: c.y - 12, rotate: c.rotate + 4, zIndex: 30 }
                : hoveredIndex !== null && !reduceMotion
                ? { scale: c.scale - 0.02, y: c.y, rotate: c.rotate - 2, opacity: 0.7 }
                : { scale: c.scale, y: c.y, rotate: c.rotate, opacity: 1 }
            }
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="flex justify-between items-center">
              <div className="w-5 h-5 rounded-full bg-neutral-900/10 flex items-center justify-center text-[7px] font-mono font-bold">0{index + 1}</div>
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-900/20" />
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="font-mono text-[9px] text-neutral-800 font-semibold">{c.title}</div>
              <div className="font-sans text-[7px] text-neutral-500 font-light">{c.blur} overlay</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-xs py-0.5 px-2 rounded-full border border-neutral-200/40 text-[9px] font-mono text-neutral-500 uppercase tracking-wider">
        Interactive Glass Depth
      </div>
    </div>
  );
}

// MAIN LAYOUT
export default function InteractivePlayground() {
  const {
    motionMode,
    canvasEnabled,
    reduceMotion,
    setMotionMode,
    setCanvasEnabled,
    setReduceMotion
  } = useLabPerformance();

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const magneticRef = useRef<HTMLDivElement | null>(null);

  // Read mouse spring values for playground statistics
  const handleMagneticMove = (e: React.MouseEvent) => {
    if (!magneticRef.current) return;
    const rect = magneticRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setMousePos({
      x: Math.round((e.clientX - cx) * 0.3),
      y: Math.round((e.clientY - cy) * 0.3)
    });
  };

  return (
    <div className="flex flex-col gap-12 w-full">
      
      {/* 1. Live State Switch Control Panel (Apple-inspired Control Center) */}
      <div className="w-full bg-white/70 border border-neutral-200/50 backdrop-blur-md rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs relative overflow-hidden">
        
        <div className="flex flex-col gap-1 z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="font-sans font-medium text-[16px] text-neutral-900">Lab Performance Engine</h3>
          </div>
          <p className="font-sans text-[13px] text-neutral-500 font-light">
            Real-time toggles to dynamically modify the page rendering and motion layers.
          </p>
        </div>

        {/* Control Switches (Segmented Control Style) */}
        <div className="flex flex-wrap items-center gap-1.5 z-10 p-1.5 bg-neutral-100/80 rounded-full border border-neutral-200/50">
          
          {/* Switch 1: Canvas Rendering */}
          <button 
            onClick={() => setCanvasEnabled(!canvasEnabled)}
            className={`flex items-center gap-1.5 py-2 px-4 rounded-full text-[12px] font-mono transition-all cursor-pointer ${
              canvasEnabled 
                ? "bg-white text-neutral-950 shadow-sm border border-neutral-200/50" 
                : "text-neutral-500 hover:text-neutral-700 transparent border border-transparent"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Canvas: {canvasEnabled ? "ON" : "OFF"}
          </button>

          <div className="w-px h-4 bg-neutral-300/50" />

          {/* Switch 2: High Motion vs Low Power */}
          <button 
            onClick={() => setMotionMode(motionMode === "high" ? "low" : "high")}
            className={`flex items-center gap-1.5 py-2 px-4 rounded-full text-[12px] font-mono transition-all cursor-pointer ${
              motionMode === "high" 
                ? "bg-white text-neutral-950 shadow-sm border border-neutral-200/50" 
                : "text-neutral-500 hover:text-neutral-700 transparent border border-transparent"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            {motionMode === "high" ? "HIGH MOTION" : "LOW POWER"}
          </button>

          <div className="w-px h-4 bg-neutral-300/50" />

          {/* Switch 3: Reduce Motion */}
          <button 
            onClick={() => setReduceMotion(!reduceMotion)}
            className={`flex items-center gap-1.5 py-2 px-4 rounded-full text-[12px] font-mono transition-all cursor-pointer ${
              reduceMotion 
                ? "bg-rose-50 text-rose-600 shadow-sm border border-rose-200/50" 
                : "text-neutral-500 hover:text-neutral-700 transparent border border-transparent"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            {reduceMotion ? "REDUCED MOTION" : "STANDARD"}
          </button>

        </div>
      </div>

      {/* 2. Demos Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        
        {/* Play 1: Magnetic Button */}
        <div 
          ref={magneticRef}
          onMouseMove={handleMagneticMove}
          onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
          className="border border-neutral-200/50 bg-white/50 backdrop-blur-xs rounded-2xl p-6 flex flex-col justify-between h-[280px]"
        >
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400">Experiment 01</span>
              <h4 className="font-sans font-medium text-[16px] text-neutral-950">Magnetic Spring Pull</h4>
            </div>
            
            {/* Live Stats Display */}
            <div className="flex items-center gap-3 font-mono text-[10px] text-neutral-400 bg-neutral-50 border border-neutral-200/30 py-1 px-3 rounded-full">
              <span>dX: {reduceMotion ? 0 : mousePos.x}px</span>
              <span className="text-neutral-200">|</span>
              <span>dY: {reduceMotion ? 0 : mousePos.y}px</span>
            </div>
          </div>

          <div className="flex items-center justify-center my-6 h-28 border border-dashed border-neutral-200 rounded-xl relative overflow-hidden bg-neutral-50/20">
            <MagneticButton 
              className="py-3 px-6 bg-neutral-950 text-white rounded-xl text-[13px] font-mono hover:bg-neutral-900 transition-colors shadow-xs"
            >
              Hover Near Button
            </MagneticButton>
          </div>

          <p className="font-sans text-[12px] text-neutral-400 font-light">
            Senses the mouse coordinate radius (70px) and moves towards it using custom Framer Motion spring physics.
          </p>
        </div>

        {/* Play 2: Fluid Background Canvas */}
        <div className="border border-neutral-200/50 bg-white/50 backdrop-blur-xs rounded-2xl p-6 flex flex-col justify-between h-[280px]">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400">Experiment 02</span>
            <h4 className="font-sans font-medium text-[16px] text-neutral-950">Fluid Background Canvas</h4>
          </div>

          <div className="my-4">
            <ReactiveWaveCanvas />
          </div>

          <p className="font-sans text-[12px] text-neutral-400 font-light">
            Dynamically renders wave vectors that deform near the mouse cursor, and freezes automatically in reduced motion.
          </p>
        </div>

        {/* Play 3: Glass Morph Cards */}
        <div className="border border-neutral-200/50 bg-white/50 backdrop-blur-xs rounded-2xl p-6 flex flex-col justify-between h-[280px]">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400">Experiment 03</span>
            <h4 className="font-sans font-medium text-[16px] text-neutral-950">Glassmorphism & Depth</h4>
          </div>

          <div className="my-4">
            <GlassMorphPlayground />
          </div>

          <p className="font-sans text-[12px] text-neutral-400 font-light">
            Staggers cards in 3D coordinates. Hovering pulls the active card forward and pushes neighboring nodes backward.
          </p>
        </div>

        {/* Play 4: Text Reveal System */}
        <div className="border border-neutral-200/50 bg-white/50 backdrop-blur-xs rounded-2xl p-6 flex flex-col justify-between h-[280px]">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400">Experiment 04</span>
            <h4 className="font-sans font-medium text-[16px] text-neutral-950">Scroll Text Reveal</h4>
          </div>

          <div className="relative h-[120px] my-3 overflow-y-scroll border border-neutral-100 rounded-xl bg-neutral-50/30 p-4 scrollbar-none">
            <div className="h-[25vh] flex flex-col justify-between">
              <span className="font-mono text-[9px] text-neutral-400 tracking-wider block">↓ Scroll inside this box to trigger reveal</span>
              
              <ScrollRevealText 
                text="The beauty of interfaces lies in details. We engineer custom micro-animations with spring-based calculations to bring layouts to life. Smooth, performant, and delightful."
                className="font-sans text-[15px] font-light leading-relaxed text-neutral-900 select-none max-w-[400px]"
              />
              
              <div className="h-4" />
            </div>
          </div>

          <p className="font-sans text-[12px] text-neutral-400 font-light">
            Word-by-word reveal that calculates page or viewport scroll percentage and transforms opacity dynamically.
          </p>
        </div>

      </div>
    </div>
  );
}
