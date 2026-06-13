"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, MapPin, Grid, Layers, Compass, Plus, X } from "lucide-react";
import Image from "next/image";

export default function RealEstateConceptPage() {
  const [activePlan, setActivePlan] = useState<"ground" | "roof" | null>(null);

  const units: Array<{ name: string; size: string; beds: number; plan: "ground" | "roof" }> = [
    { name: "Ground Suite", size: "145 sqm", beds: 3, plan: "ground" },
    { name: "Penthouse Loft", size: "210 sqm", beds: 4, plan: "roof" },
  ];

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-[#1D1D1F] font-sans pb-24 relative">
      {/* Dynamic Header */}
      <header className="sticky top-0 w-full z-40 h-16 flex items-center justify-between px-6 bg-white/80 border-b border-neutral-200/40 backdrop-blur-md">
        <Link href="/lab" className="flex items-center gap-2 font-mono text-[11px] tracking-wider text-neutral-500 hover:text-neutral-900 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Lab
        </Link>
        <span className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
          ARCHITECTURAL SYSTEM LAB
        </span>
      </header>

      {/* Main Container */}
      <main className="max-w-[1200px] mx-auto px-6 mt-12 flex flex-col gap-16">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-neutral-200/40 pb-6">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400">Blueprint layouts & structural sliders</span>
            <h1 className="text-[36px] font-bold tracking-tight text-neutral-950">Optima Pavilion</h1>
          </div>
          <div className="flex items-center gap-2 text-neutral-500 font-mono text-[11px] bg-neutral-100/50 py-1.5 px-3 rounded-full border border-neutral-200/30">
            <MapPin className="w-3.5 h-3.5 text-neutral-400" />
            <span>Engadin Valley, Switzerland</span>
          </div>
        </div>

        {/* 1. ARCHITECTURE COVER PHOTO */}
        <div className="h-[450px] w-full rounded-2xl bg-neutral-100 border border-neutral-200/40 overflow-hidden relative shadow-2xs">
          <Image 
            src="/optima_real_estate_mockup.png" 
            alt="Optima Pavilion Exterior"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay Grid */}
          <div 
            className="absolute inset-0 z-10 opacity-[0.04] pointer-events-none" 
            style={{
              backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />
        </div>

        {/* 2. SPECIFICATIONS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 border-b border-neutral-200 pb-3">
              <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">01 / Concept</span>
            </div>
            <h3 className="text-[20px] font-medium text-neutral-900 leading-tight">Minimalist Concrete Pavilion</h3>
            <p className="text-[13px] text-neutral-500 leading-relaxed font-light">
              Designed as a quiet retreat inside the Swiss Alps, the Pavilion maps concrete volumetric block assemblies against deep panoramic scenery windows.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 border-b border-neutral-200 pb-3">
              <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">02 / Engineering</span>
            </div>
            <h3 className="text-[20px] font-medium text-neutral-900 leading-tight">Vector Wireframe Alignments</h3>
            <p className="text-[13px] text-neutral-500 leading-relaxed font-light">
              In this prototype, we explore real estate pages that focus on wireframe structures. By rendering simple floor plan blueprints in line art vectors, we build immediate spatial comprehension.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 border-b border-neutral-200 pb-3">
              <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">03 / Key Coordinates</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 font-mono text-[11px]">
              {[
                { label: "FACING", val: "South-West", icon: Compass },
                { label: "LEVELS", val: "2 Storeys", icon: Layers },
                { label: "TOTAL AREA", val: "355 sqm", icon: Grid },
              ].map((spec) => (
                <div key={spec.label} className="border border-neutral-200/50 bg-white p-3 rounded-xl flex flex-col gap-1.5 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-neutral-400">
                    <spec.icon className="w-3.5 h-3.5" />
                    <span className="text-[8px] uppercase tracking-wider">{spec.label}</span>
                  </div>
                  <span className="font-sans font-medium text-neutral-900 text-[12px]">{spec.val}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 3. INTERACTIVE BLUEPRINT DRAWER SECTION */}
        <section className="border border-neutral-200/50 bg-white rounded-2xl p-6 shadow-2xs mt-8">
          <div className="flex flex-col gap-2 max-w-[500px] mb-8">
            <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400">Interactive blueprint viewer</span>
            <h3 className="font-sans font-medium text-[20px] text-neutral-950">Floor Plan Blueprint Drawer</h3>
            <p className="font-sans text-[13px] text-neutral-500 font-light leading-relaxed">
              Select a pavilion unit below to open the architectural blueprint floor plans drawer overlay.
            </p>
          </div>

          {/* Unit list */}
          <div className="flex flex-col border-t border-neutral-100">
            {units.map((unit) => (
              <div 
                key={unit.name}
                onClick={() => setActivePlan(unit.plan)}
                className="group flex items-center justify-between py-5 border-b border-neutral-100 cursor-pointer hover:bg-neutral-50/50 transition-colors px-4 -mx-4 rounded-xl"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="font-sans font-medium text-[15px] text-neutral-950">{unit.name}</span>
                  <span className="font-sans text-[12px] text-neutral-400 font-light">{unit.size} • {unit.beds} Bedrooms</span>
                </div>
                <button className="h-8 w-8 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-400 group-hover:text-neutral-900 group-hover:border-neutral-400 transition-colors shadow-2xs cursor-pointer">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Blueprint drawer overlay */}
      <AnimatePresence>
        {activePlan && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-900/10 backdrop-blur-xs z-50 flex items-center justify-end"
          >
            {/* Drawer container */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="w-full max-w-[500px] h-full bg-[#111] text-white p-8 flex flex-col justify-between shadow-2xl relative"
            >
              {/* Close Button */}
              <button 
                onClick={() => setActivePlan(null)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center border border-neutral-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col gap-6">
                <span className="font-mono text-[9px] text-indigo-400 uppercase tracking-widest">— ARCHITECTURAL BLUEPRINT</span>
                <h4 className="text-[28px] font-bold tracking-tight">
                  {activePlan === "ground" ? "Ground Floor Suite" : "Penthouse Loft Suite"}
                </h4>
                
                {/* Blueprint graphics */}
                <div className="aspect-square w-full border border-dashed border-neutral-800 bg-neutral-950 rounded-xl relative flex items-center justify-center p-6 mt-4">
                  {/* Draw blueprint elements */}
                  <svg className="w-full h-full text-indigo-500/20" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.5">
                    {/* Outline walls */}
                    <rect x="20" y="20" width="160" height="160" />
                    <line x1="100" y1="20" x2="100" y2="180" />
                    <line x1="20" y1="100" x2="180" y2="100" />
                    
                    {/* Inner structures */}
                    <circle cx="60" cy="60" r="20" strokeDasharray="3,3" />
                    <rect x="120" y="120" width="40" height="40" />
                    <line x1="140" y1="120" x2="140" y2="160" />

                    {/* Dotted metrics */}
                    <text x="25" y="35" className="text-[6px] font-mono fill-indigo-400/50 stroke-none">W: 16.0m</text>
                    <text x="25" y="45" className="text-[6px] font-mono fill-indigo-400/50 stroke-none">H: 16.0m</text>
                  </svg>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <p className="font-sans text-[12px] text-neutral-400 font-light leading-relaxed">
                  Blueprints are synchronized via spatial SVG coordinates, allowing precise layout shifts.
                </p>
                <button 
                  onClick={() => setActivePlan(null)}
                  className="w-full py-3.5 bg-white text-neutral-950 font-mono text-[12px] rounded-xl hover:brightness-95 transition-all cursor-pointer text-center"
                >
                  Close Plan
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
