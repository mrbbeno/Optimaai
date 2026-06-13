"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Play, Compass, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GradientBackground from "@/components/lab/festival/GradientBackground";
import ClickSparkCanvas from "@/components/lab/festival/ClickSparkCanvas";
import BubbleMenu from "@/components/lab/festival/BubbleMenu";
import MetallicMarquee from "@/components/lab/festival/MetallicMarquee";
import LanyardTicket from "@/components/lab/festival/LanyardTicket";
import { useLabPerformance } from "@/context/LabPerformanceContext";

export default function FestivalPage() {
  const { reduceMotion } = useLabPerformance();
  const [activeTab, setActiveTab] = useState("19 JUL");

  const acts = [
    { id: "19 JUL", artist: "MARTIN GARRIX", date: "19 JULY", stage: "MAIN STAGE", color: "from-pink-500/20 to-purple-600/30", outline: "border-pink-500/30" },
    { id: "20 JUL", artist: "ACRAZE", date: "20 JULY", stage: "LAB DOME", color: "from-orange-500/20 to-yellow-600/30", outline: "border-orange-500/30" },
    { id: "21 JUL", artist: "FISHER", date: "21 JULY", stage: "MAIN STAGE", color: "from-cyan-500/20 to-blue-600/30", outline: "border-cyan-500/30" },
  ];

  const handleToggleTab = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className="min-h-screen w-full bg-[#0B0B10] text-[#EDEDF2] overflow-x-hidden relative font-sans">
      
      {/* 1. Generative Background Mesh & Spark Canvas */}
      <GradientBackground />
      <ClickSparkCanvas />
      
      {/* 2. Floating Navigation System */}
      <BubbleMenu />

      {/* Header Navbar */}
      <nav id="hero" className="sticky top-0 w-full z-40 h-20 flex items-center justify-between px-6 md:px-12 backdrop-blur-md bg-[#0B0B10]/30 border-b border-white/[0.03]">
        <div className="flex items-center gap-8">
          <Link href="/lab" className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </Link>
          <span className="font-sans font-black text-[18px] tracking-tighter text-white">
            VIBRANT<span className="font-mono text-[9px] text-pink-500 uppercase tracking-widest ml-1.5">FESTIVAL</span>
          </span>
        </div>

        {/* Desktop Nav Items */}
        <div className="hidden lg:flex items-center gap-8 font-mono text-[11px] text-neutral-400">
          <a href="#hero" className="hover:text-white transition-colors">EXPERIENCE</a>
          <a href="#lineup" className="hover:text-white transition-colors">LINEUP</a>
          <a href="#tickets" className="hover:text-white transition-colors">TICKETS</a>
          <a href="#partners" className="hover:text-white transition-colors">PARTNERS</a>
        </div>

        <button 
          onClick={() => {
            document.getElementById("tickets")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="font-sans font-extrabold text-[11px] tracking-wider uppercase bg-[#CCFF00] hover:bg-[#b5e000] text-black py-2.5 px-5 rounded-full shadow-md transition-colors cursor-pointer"
        >
          Get Tickets ↗
        </button>
      </nav>

      {/* Main Layout Wrapper */}
      <main className="max-w-[1100px] mx-auto px-6 flex flex-col gap-28 md:gap-36 pt-8 md:pt-16 pb-24 relative z-10">
        
        {/* 1. HERO SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Title details */}
          <div className="flex flex-col gap-6 text-left items-start">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[12px] text-pink-400 font-bold tracking-widest italic select-none">
                Feel the Vibe
              </span>
            </div>

            <h1 className="font-sans font-black text-[60px] sm:text-[80px] md:text-[96px] leading-[0.85] tracking-tighter text-white uppercase select-none">
              MUSIC.<br />
              PEOPLE.<br />
              ENERGY.
            </h1>

            <p className="font-sans font-light text-[15px] sm:text-[17px] text-neutral-400 leading-relaxed max-w-[440px]">
              3 days of music, art and unforgettable moments with thousands of people from around the world.
            </p>

            {/* Event Markers */}
            <div className="flex flex-col gap-3 font-mono text-[11px] text-neutral-300 mt-2">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-pink-500" />
                <span>19–21 JULY 2025</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>BUDAPEST, HUNGARY</span>
              </div>
            </div>

            {/* CTA controls */}
            <div className="flex flex-wrap gap-4 pt-6">
              <button 
                onClick={() => {
                  document.getElementById("tickets")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="font-sans font-extrabold text-[12px] tracking-wider uppercase bg-[#CCFF00] hover:bg-[#b5e000] text-black py-4 px-8 rounded-xl shadow-lg transition-all hover:scale-[1.02] cursor-pointer"
              >
                Get Your Ticket ↗
              </button>

              <button 
                onClick={() => {
                  alert("Watch aftermovie simulation triggered!");
                }}
                className="font-sans font-extrabold text-[12px] tracking-wider uppercase border border-white/20 hover:border-white/40 bg-white/[0.02] hover:bg-white/[0.05] text-neutral-200 hover:text-white py-4 px-8 rounded-xl shadow-sm transition-all hover:scale-[1.02] flex items-center gap-2 cursor-pointer"
              >
                Watch Aftermovie <Play className="w-3.5 h-3.5 fill-current" />
              </button>
            </div>
          </div>

          {/* Right Hanging Lanyard Entry Card */}
          <div className="w-full h-full flex items-center justify-center relative">
            <LanyardTicket />
          </div>
        </section>

        {/* 2. SPONSOR CONTINUOUS MARQUEE */}
        <section id="partners" className="w-full flex flex-col gap-6">
          <div className="flex items-center gap-3 font-mono text-[9px] text-neutral-500 uppercase tracking-widest">
            <span>OUR PARTNERS</span>
            <div className="flex-1 h-[1px] bg-white/[0.04]" />
          </div>
          <MetallicMarquee />
        </section>

        {/* 3. LINEUP GRID SECTION */}
        <section id="lineup" className="scroll-mt-24 flex flex-col gap-10">
          <div className="flex flex-col gap-2 text-left border-b border-white/[0.06] pb-4">
            <span className="font-mono text-[9px] text-pink-500 tracking-widest uppercase">ACT SCHEDULE</span>
            <h2 className="font-sans font-black text-[32px] sm:text-[44px] leading-none text-white tracking-tight">
              THE FUTURE SOUNDS LIKE THIS
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_2.2fr] gap-10 items-start">
            {/* Left selector tab links */}
            <div className="flex flex-col gap-3">
              {acts.map((act) => (
                <button
                  key={act.id}
                  onClick={() => handleToggleTab(act.id)}
                  className={`group flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 cursor-pointer text-left ${
                    activeTab === act.id
                      ? "bg-white/[0.04] border-pink-500/50 text-pink-400"
                      : "bg-transparent border-white/[0.04] text-neutral-500 hover:border-white/[0.1] hover:text-neutral-300"
                  }`}
                >
                  <span className="font-mono text-[11px] font-bold">{act.id}</span>
                  <span className="font-sans font-bold text-[16px] truncate mx-4">{act.artist}</span>
                  <span className="font-mono text-[12px] opacity-0 group-hover:opacity-100 transition-opacity">➔</span>
                </button>
              ))}
              
              <button 
                onClick={() => alert("Full schedule list modal simulation!")}
                className="mt-4 font-mono text-[10px] uppercase tracking-widest py-3 px-6 border border-white/10 hover:border-white/30 text-neutral-400 hover:text-white rounded-xl transition-all cursor-pointer"
              >
                View Full Lineup
              </button>
            </div>

            {/* Right Card Stack showcase */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <AnimatePresence mode="wait">
                {acts.map((act) => {
                  const isCurrent = activeTab === act.id;
                  
                  return (
                    <motion.div
                      key={act.id}
                      initial={reduceMotion ? {} : { opacity: 0, scale: 0.95, y: 15 }}
                      animate={reduceMotion ? {} : { 
                        opacity: isCurrent ? 1.0 : 0.4, 
                        scale: isCurrent ? 1.0 : 0.95,
                        y: 0 
                      }}
                      className={`relative rounded-2xl p-5 border overflow-hidden bg-black/40 backdrop-blur-md flex flex-col justify-end aspect-[3/4] transition-all duration-300 ${
                        isCurrent ? `border-pink-500/40 shadow-[0_10px_25px_-12px_rgba(236,72,153,0.3)]` : "border-white/[0.03]"
                      }`}
                    >
                      {/* Shifting radial lighting inside card */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${act.color} opacity-40 pointer-events-none -z-10`} />

                      {/* Header Date tag */}
                      <div className="absolute top-5 left-5 font-mono text-[9px] text-pink-400 font-bold uppercase tracking-wider">
                        {act.date}
                      </div>

                      {/* Artist info */}
                      <div className="flex flex-col gap-1 text-left">
                        <span className="font-mono text-[8px] text-neutral-500 uppercase tracking-widest">ARTIST ACT</span>
                        <h3 className="font-sans font-black text-[20px] sm:text-[24px] text-white tracking-tight leading-none">
                          {act.artist}
                        </h3>
                        <span className="font-mono text-[10px] text-cyan-400 mt-2">{act.stage}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Extra act placeholder */}
              <div className="border border-dashed border-white/10 rounded-2xl p-5 flex flex-col items-center justify-center text-center aspect-[3/4]">
                <Compass className="w-8 h-8 text-neutral-600 animate-spin" style={{ animationDuration: "5s" }} />
                <span className="font-sans font-bold text-[14px] text-neutral-400 mt-4">MORE TBA...</span>
                <span className="font-mono text-[8px] text-neutral-600 uppercase tracking-widest mt-1">To Be Announced</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. TICKET CTAS REGISTER SECTION */}
        <section id="tickets" className="w-full scroll-mt-24">
          <div className="relative w-full rounded-3xl p-8 md:p-12 overflow-hidden border border-white/[0.06] bg-linear-to-r from-purple-900/40 via-[#FF007A]/10 to-cyan-500/10 backdrop-blur-md text-left flex flex-col md:flex-row md:items-center justify-between gap-8">
            {/* Border spotlight glow */}
            <div className="absolute inset-0 bg-radial from-cyan-500/5 via-transparent to-transparent pointer-events-none" />

            <div className="flex flex-col gap-2 max-w-[480px]">
              <span className="font-mono text-[9px] text-pink-400 tracking-wider font-extrabold uppercase flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-pink-400" /> READY FOR VIBRANT?
              </span>
              <h3 className="font-sans font-black text-[26px] sm:text-[34px] leading-tight text-white tracking-tight">
                Ready for the best weekend of your life?
              </h3>
              <p className="font-mono text-[11px] text-neutral-400 mt-2">
                Join +12,400 rave lovers already signed up. Tickets selling fast.
              </p>
            </div>

            <button 
              onClick={() => alert("Ticket purchase portal simulation!")}
              className="font-sans font-extrabold text-[12px] tracking-wider uppercase bg-[#CCFF00] hover:bg-[#b5e000] text-black py-4.5 px-9 rounded-xl shadow-lg transition-all hover:scale-[1.02] cursor-pointer shrink-0"
            >
              Get Your Ticket ↗
            </button>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer id="info" className="w-full border-t border-white/[0.03] bg-black/40 py-12 text-neutral-500 relative z-10">
        <div className="max-w-[1100px] mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <span className="font-sans font-black text-[15px] tracking-tight text-white">VIBRANT</span>
            <span className="font-mono text-[9px] uppercase tracking-widest">© 2025 — BUDAPEST RAVE PROJECT</span>
          </div>

          <div className="flex gap-8 font-mono text-[10px] uppercase tracking-wider">
            <a href="#hero" className="hover:text-white transition-colors">TOP</a>
            <a href="#lineup" className="hover:text-white transition-colors">ACTS</a>
            <a href="#tickets" className="hover:text-white transition-colors">TICKETS</a>
            <Link href="/lab" className="text-pink-400 hover:text-pink-300 transition-colors">EXIT LAB</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
