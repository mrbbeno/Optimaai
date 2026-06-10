"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Play, Pause, Disc } from "lucide-react";
import Image from "next/image";

export default function MusicArtistPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState("Vaporous Grid");

  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Transform vertical scroll into horizontal slider translation
  const xTranslation = useTransform(scrollYProgress, [0.35, 0.75], ["0%", "-45%"]);

  const tracks = [
    { name: "Vaporous Grid", duration: "03:42", streams: "1.2M" },
    { name: "Silicon Echoes", duration: "04:15", streams: "920K" },
    { name: "Canvas Waveform", duration: "03:10", streams: "2.4M" },
    { name: "Spring Physics", duration: "05:01", streams: "480K" },
  ];

  const discography = [
    { title: "MORTISE", year: "2026", tracks: 8, image: "/optima_music_mockup.png" },
    { title: "TENON", year: "2025", tracks: 11, image: "/optima_music_mockup.png" },
    { title: "DOWEL", year: "2024", tracks: 6, image: "/optima_music_mockup.png" },
    { title: "SPLINE", year: "2023", tracks: 14, image: "/optima_music_mockup.png" },
  ];

  return (
    <div 
      ref={containerRef} 
      className="min-h-[400vh] bg-[#0A0A0B] text-neutral-100 font-sans relative"
    >
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full z-40 h-16 flex items-center justify-between px-6 border-b border-neutral-800/40 backdrop-blur-md bg-[#0A0A0B]/60">
        <Link href="/lab" className="flex items-center gap-2 font-mono text-[11px] tracking-wider text-neutral-400 hover:text-white transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Lab
        </Link>
        <span className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
          ECHO MUSIC LAB
        </span>
      </header>

      {/* 1. HERO SECTION (Dark immersive) */}
      <section className="h-screen w-full flex flex-col justify-center px-6 md:px-16 pt-16 relative overflow-hidden bg-radial from-neutral-900/40 via-transparent to-transparent">
        <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

        <div className="max-w-[800px] flex flex-col gap-6 z-10">
          <span className="font-mono text-[11px] text-neutral-500 uppercase tracking-widest block">SOUNDS OF OPTIMA</span>
          <h1 className="text-[56px] sm:text-[80px] md:text-[100px] font-black leading-[0.9] tracking-tighter">
            ECHO ARCHIVE
          </h1>
          <p className="text-[16px] md:text-[19px] font-light text-neutral-400 max-w-[480px] leading-relaxed mt-2">
            An interactive musician framework designed with fluid motion sliders and audio-visual waveform controls.
          </p>
        </div>

        {/* Vinyl spinning graphic */}
        <div className="absolute right-[-10%] md:right-[5%] bottom-[5%] md:bottom-auto md:top-[25%] opacity-10 md:opacity-30 pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="w-[380px] h-[380px] rounded-full border-4 border-dashed border-neutral-700 flex items-center justify-center"
          >
            <div className="w-56 h-56 rounded-full border border-neutral-500 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-neutral-950 border border-neutral-800" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. AUDIO PLAYER SECTION (Live simulated interface) */}
      <section className="min-h-screen w-full flex flex-col justify-center px-6 md:px-16 py-32 border-t border-neutral-800/40 relative z-10">
        <div className="max-w-[1000px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-16 items-center">
          
          {/* Tracks list */}
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
              <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider">TRACKLISTING</span>
              <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider">[4 SONGS]</span>
            </div>

            <div className="flex flex-col">
              {tracks.map((track) => (
                <div 
                  key={track.name}
                  onClick={() => {
                    setCurrentTrack(track.name);
                    setIsPlaying(true);
                  }}
                  className={`group flex items-center justify-between py-5 border-b border-neutral-900 cursor-pointer transition-colors ${currentTrack === track.name ? "text-white" : "text-neutral-500 hover:text-neutral-300"}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[11px] text-neutral-700">
                      {currentTrack === track.name && isPlaying ? (
                        <span className="flex gap-0.5 h-3 items-end">
                          <span className="w-0.5 bg-indigo-500 animate-pulse h-3" />
                          <span className="w-0.5 bg-indigo-500 animate-pulse h-1.5" />
                          <span className="w-0.5 bg-indigo-500 animate-pulse h-2" />
                        </span>
                      ) : "•"}
                    </span>
                    <span className="font-sans font-medium text-[16px]">{track.name}</span>
                  </div>
                  <div className="flex items-center gap-12 font-mono text-[12px]">
                    <span className="hidden sm:inline text-neutral-600">{track.streams} plays</span>
                    <span>{track.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating Player Deck */}
          <div className="border border-neutral-800 bg-neutral-950/60 rounded-2xl p-6 flex flex-col gap-6 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-radial from-indigo-500/5 via-transparent to-transparent pointer-events-none" />
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center relative overflow-hidden group">
                <Disc className={`w-8 h-8 text-neutral-600 ${isPlaying ? "animate-spin" : ""}`} style={{ animationDuration: "3s" }} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider">CURRENTLY PLAYING</span>
                <span className="font-sans font-medium text-[15px] text-white line-clamp-1">{currentTrack}</span>
              </div>
            </div>

            {/* Slider bar */}
            <div className="flex flex-col gap-1.5 mt-2">
              <div className="h-1 bg-neutral-800 rounded-full overflow-hidden relative">
                <motion.div 
                  className="h-full bg-white" 
                  animate={isPlaying ? { width: ["0%", "100%"] } : {}}
                  transition={isPlaying ? { duration: 180, ease: "linear", repeat: Infinity } : { duration: 0 }}
                />
              </div>
              <div className="flex justify-between font-mono text-[9px] text-neutral-600">
                <span>0:00</span>
                <span>3:42</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mt-2">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-12 h-12 rounded-full bg-white text-neutral-950 flex items-center justify-center hover:scale-105 transition-all cursor-pointer shadow-xs"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 3. DISCOGRAPHY SECTION (Horizontal scroll parallax) */}
      <section className="h-screen w-full sticky top-0 overflow-hidden flex flex-col justify-center border-t border-neutral-900 z-20">
        <div className="w-full px-6 md:px-16 mb-12">
          <div className="max-w-[1000px] mx-auto flex justify-between items-end border-b border-neutral-800 pb-4">
            <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider">Parallax discography slider</span>
            <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider">Scroll vertically to slide</span>
          </div>
        </div>

        {/* Horizontal Container Slider */}
        <div className="w-full overflow-hidden">
          <motion.div 
            ref={sliderRef}
            style={{ x: xTranslation }}
            className="flex gap-8 pl-6 md:pl-16 w-[200vw]"
          >
            {discography.map((album) => (
              <div 
                key={album.title}
                className="w-[280px] sm:w-[350px] shrink-0 border border-neutral-900 bg-neutral-950 p-5 rounded-2xl flex flex-col gap-4 shadow-sm"
              >
                <div className="aspect-square w-full relative rounded-xl bg-neutral-900 border border-neutral-800 overflow-hidden">
                  <Image 
                    src={album.image} 
                    alt={album.title}
                    fill
                    className="object-cover opacity-80"
                  />
                </div>
                <div className="flex flex-col gap-1 mt-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-sans font-semibold text-[17px] text-white">{album.title}</h4>
                    <span className="font-mono text-[11px] text-neutral-500">{album.year}</span>
                  </div>
                  <span className="font-mono text-[10px] text-neutral-600 uppercase tracking-wider">{album.tracks} Songs</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Spacing container to anchor the sticky scroll track */}
      <div className="h-screen" />

      {/* 4. FOOTER RETURN */}
      <section className="h-screen w-full flex flex-col items-center justify-center text-center relative z-30 bg-[#0A0A0B]">
        <div className="max-w-[600px] flex flex-col items-center gap-8">
          <h2 className="text-[44px] md:text-[60px] font-bold tracking-tight">SOUND MEETS DIGITAL</h2>
          <p className="font-sans text-[14px] text-neutral-400 font-light leading-relaxed">
            The musician interface design wraps audio tracks in an immersive, horizontal-glide timeline. It demonstrates high-performance slider translates.
          </p>
          <div className="mt-4 flex items-center gap-4">
            <Link 
              href="/lab" 
              className="font-mono text-[11px] uppercase tracking-wider py-3.5 px-6 border border-neutral-800 text-neutral-300 hover:text-white hover:border-white transition-all rounded-xl"
            >
              Return to Laboratory
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
