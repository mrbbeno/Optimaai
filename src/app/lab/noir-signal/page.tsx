"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, VolumeX, Volume2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import AudioBlob from "@/components/lab/noir/AudioBlob";
import FluidWaveform from "@/components/lab/noir/FluidWaveform";
import MagneticButton from "@/components/lab/noir/MagneticButton";
import GlassCard from "@/components/lab/noir/GlassCard";
import ScrollTextReveal from "@/components/lab/noir/ScrollTextReveal";
import AudioPlayer from "@/components/lab/noir/AudioPlayer";
import { AudioSignalManager } from "@/components/lab/noir/AudioSignalManager";
import { useLabPerformance } from "@/context/LabPerformanceContext";

export default function NoirSignalPage() {
  const [activeTrack, setActiveTrack] = useState("VOID WALK");
  const [isPlaying, setIsPlaying] = useState(false);
  const { reduceMotion } = useLabPerformance();

  const tracks = [
    { title: "VOID WALK", duration: "03:42", streams: "1.2M" },
    { title: "GLASS ECHOES", duration: "04:15", streams: "920K" },
    { title: "NEON BREATH", duration: "03:10", streams: "2.4M" },
    { title: "SILENT SIGNAL", duration: "05:01", streams: "480K" }
  ];

  // Sync state with global AudioSignalManager
  useEffect(() => {
    setActiveTrack(AudioSignalManager.trackName);
    setIsPlaying(AudioSignalManager.isPlaying);

    const unsubscribe = AudioSignalManager.addListener((event) => {
      if (event === "trackChange") {
        setActiveTrack(AudioSignalManager.trackName);
      } else if (event === "playStateChange") {
        setIsPlaying(AudioSignalManager.isPlaying);
      }
    });

    return unsubscribe;
  }, []);

  const handleTrackSelect = (trackName: string) => {
    AudioSignalManager.selectTrack(trackName);
    AudioSignalManager.isPlaying = true;
  };

  const handleTogglePlay = () => {
    AudioSignalManager.isPlaying = !AudioSignalManager.isPlaying;
  };

  return (
    <div className="min-h-screen w-full bg-[#0B0B10] text-[#EDEDF2] overflow-x-hidden relative pb-32">
      {/* Dynamic atmospheric grid background */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.02]" 
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} 
      />

      {/* Ambient shifting gradient backglow */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] aspect-square rounded-full bg-radial from-violet-500/10 via-transparent to-transparent pointer-events-none blur-3xl -z-10" />
      <div className="absolute bottom-[20%] right-[-10%] w-[50%] aspect-square rounded-full bg-radial from-cyan-500/5 via-transparent to-transparent pointer-events-none blur-3xl -z-10" />

      {/* Floating Header */}
      <header className="sticky top-0 w-full z-40 h-16 flex items-center justify-between px-6 md:px-12 backdrop-blur-md bg-[#0B0B10]/40 border-b border-white/[0.03]">
        <Link 
          href="/lab" 
          className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-neutral-400 hover:text-cyan-400 transition-colors duration-300"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Laboratory
        </Link>
        <div className="flex items-center gap-2 font-mono text-[9px] tracking-widest text-neutral-500 uppercase">
          <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" /> SONIC SANDBOX // V1.2
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-[1000px] mx-auto px-6 flex flex-col gap-24 md:gap-36 pt-8 md:pt-16 relative z-10">
        
        {/* 1. HERO — SONIC FIELD */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-[70vh]">
          {/* Left Hero Details */}
          <div className="flex flex-col gap-6 text-left items-start">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-mono text-[9px] uppercase tracking-widest text-cyan-400">AUDIO-REACTIVE LAB</span>
            </div>
            
            <div className="flex flex-col gap-3">
              <h1 className="font-sans font-black text-[56px] sm:text-[76px] tracking-tighter leading-[0.9] text-white">
                NOIR SIGNAL
              </h1>
              <p className="font-sans font-light text-[15px] sm:text-[17px] text-neutral-400 leading-relaxed max-w-[420px]">
                Experimental electronic artist blending atmospheric analog noise with heavy cybernetic bass. 
              </p>
            </div>

            {/* Interaction Callouts */}
            <div className="flex flex-wrap gap-4 pt-4">
              <MagneticButton
                onClick={handleTogglePlay}
                className="bg-white hover:bg-neutral-100 text-[#0B0B10] font-sans text-[12px] font-semibold tracking-wider uppercase py-3.5 px-6 rounded-xl shadow-md flex items-center gap-2 hover:scale-[1.02]"
              >
                {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                {isPlaying ? "Mute Simulation" : "Listen Live"}
              </MagneticButton>

              <MagneticButton
                onClick={() => {
                  document.getElementById("discography")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] hover:border-white/[0.18] text-neutral-200 font-sans text-[12px] font-medium tracking-wider uppercase py-3.5 px-6 rounded-xl hover:scale-[1.02]"
              >
                Release Archive
              </MagneticButton>
            </div>
          </div>

          {/* Right Fluid AudioBlob Canvas */}
          <div className="aspect-square w-full max-w-[380px] md:max-w-none mx-auto border border-white/[0.03] bg-white/[0.01] rounded-3xl relative overflow-hidden flex items-center justify-center p-4">
            {/* Visualizer Background Glare */}
            <div className="absolute inset-0 bg-radial from-cyan-500/5 via-transparent to-transparent pointer-events-none" />
            <AudioBlob className="w-full h-full" />
            
            <div className="absolute bottom-4 left-4 font-mono text-[8px] tracking-widest text-neutral-500 pointer-events-none uppercase">
              INTERACTION: CURSOR WARPS DISTORTION FIELD
            </div>
          </div>
        </section>

        {/* 2. FULL WIDTH CINEMATIC VISUALIZER */}
        <section className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-1 border-b border-white/[0.06] pb-3 text-left">
            <span className="font-mono text-[9px] text-cyan-400 tracking-widest uppercase">SOUNDSCAPE</span>
            <h2 className="font-sans font-medium text-[20px] text-neutral-200 tracking-tight">Active Waveform Field</h2>
          </div>

          <div className="w-full h-[220px] sm:h-[300px] border border-white/[0.04] rounded-3xl overflow-hidden relative shadow-lg">
            <FluidWaveform className="w-full h-full" />
            
            <div className="absolute top-4 right-4 pointer-events-none font-mono text-[8px] tracking-widest text-neutral-500 bg-[#0B0B10]/75 backdrop-blur-md px-2 py-1 border border-white/[0.05] rounded-full uppercase">
              SCROLL DEPTH COMPRESSES FREQUENCY
            </div>
          </div>
        </section>

        {/* 3. RELEASE GRID (TRACKS) */}
        <section id="discography" className="scroll-mt-24 flex flex-col gap-10">
          <div className="flex flex-col gap-1 border-b border-white/[0.06] pb-3 text-left">
            <span className="font-mono text-[9px] text-violet-400 tracking-widest uppercase">TRACK DECK</span>
            <h2 className="font-sans font-medium text-[20px] text-neutral-200 tracking-tight">Discography Releases</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {tracks.map((track) => (
              <GlassCard
                key={track.title}
                title={track.title}
                duration={track.duration}
                streams={track.streams}
                isActive={activeTrack === track.title}
                onClick={() => handleTrackSelect(track.title)}
              />
            ))}
          </div>
        </section>

        {/* 4. STORY SECTION (SCROLL NARRATIVE) */}
        <section className="min-h-[50vh] flex flex-col justify-center items-center py-20 relative overflow-hidden">
          <div className="max-w-[620px] flex flex-col gap-6 text-left w-full relative z-10 px-4">
            <ScrollTextReveal
              text="Sound is not linear."
              className="font-sans text-[28px] sm:text-[36px] font-light tracking-tight text-white mb-2"
            />
            <ScrollTextReveal
              text="It bends, collapses and expands."
              className="font-sans text-[28px] sm:text-[36px] font-light tracking-tight text-white mb-2"
            />
            <ScrollTextReveal
              text="Every signal leaves a trace in space."
              className="font-sans text-[28px] sm:text-[36px] font-light tracking-tight text-white"
            />
          </div>
        </section>

      </main>

      {/* 5. AUDIO PLAYER */}
      <AudioPlayer />
    </div>
  );
}
