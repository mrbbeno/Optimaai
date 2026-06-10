"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Instrument_Serif } from "next/font/google";
import Image from "next/image";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export default function LuxuryLandingPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Scale and Y transformations for parallax editorial layout
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.06]);
  const heroY = useTransform(scrollYProgress, [0, 0.4], [0, -80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div 
      ref={containerRef}
      className="min-h-[250vh] bg-[#F9F9F6] text-[#2C2C2A] antialiased relative w-full font-sans"
    >
      {/* Minimal navigation */}
      <header className="fixed top-0 left-0 w-full z-40 h-16 flex items-center justify-between px-6 border-b border-neutral-200/20 backdrop-blur-xs">
        <Link href="/lab" className="flex items-center gap-2 font-mono text-[11px] tracking-wider text-neutral-400 hover:text-neutral-900 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Lab
        </Link>
        <span className={`${instrumentSerif.className} text-[20px] italic tracking-wide`}>
          Maison Optima
        </span>
      </header>

      {/* 1. HERO COVER SECTION (Slow Scale Image) */}
      <section className="h-screen w-full relative flex items-center justify-center overflow-hidden">
        {/* Slowly scaling background mockup image */}
        <motion.div 
          style={{ scale: imageScale }}
          className="absolute inset-0 z-0 bg-neutral-100 flex items-center justify-center"
        >
          <Image 
            src="/optima_luxury_mockup.png" 
            alt="Luxury Editorial Mockup"
            fill
            className="object-cover opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-[#F9F9F6]/20 pointer-events-none" />
        </motion.div>

        {/* Center Editorial Headline */}
        <motion.div 
          style={{ y: heroY, opacity: textOpacity }}
          className="z-10 text-center max-w-[800px] flex flex-col gap-6 px-6"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#2C2C2A]/70">COLLECTION ARCHIVE</span>
          <h1 className={`${instrumentSerif.className} text-[68px] sm:text-[96px] md:text-[112px] font-normal leading-[0.9] tracking-tight italic`}>
            Silence & Forms
          </h1>
          <div className="h-[1px] w-20 bg-[#2C2C2A] mx-auto mt-2" />
          <p className="font-sans text-[15px] font-light max-w-[400px] mx-auto leading-relaxed mt-2 opacity-80">
            A luxury interface concept framing slow image scaling transformations and refined editorial grids.
          </p>
        </motion.div>

        <div className="absolute bottom-12 left-0 right-0 text-center font-mono text-[9px] uppercase tracking-widest text-[#2C2C2A]/60">
          Scroll down to enter Maison
        </div>
      </section>

      {/* 2. EDITORIAL PARALLAX SECTION */}
      <section className="min-h-screen w-full flex flex-col justify-center py-32 px-6 md:px-16 relative z-10 bg-[#FBFBFD] border-t border-neutral-100">
        <div className="max-w-[1000px] mx-auto w-full grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-20 items-center">
          
          <div className="flex flex-col gap-8">
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">Chapter I</span>
            <h2 className={`${instrumentSerif.className} text-[44px] md:text-[56px] leading-[1.0] italic font-normal`}>
              The Architecture of Space.
            </h2>
            <p className="font-sans text-[14px] text-neutral-500 font-light leading-relaxed">
              Every detail is calibrated. We avoid decorative excess. True luxury in interfaces lies in whitespace, typography layout proportions, and intentional motion dynamics.
            </p>
            <div className="h-[1px] w-16 bg-[#2C2C2A]/20" />
            <span className="font-mono text-[11px] text-neutral-400 italic">Est. 2026</span>
          </div>

          {/* Staggered double image container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:pl-12">
            <div className="aspect-[3/4] w-full rounded-2xl bg-neutral-50 border border-neutral-100 overflow-hidden relative shadow-2xs">
              <Image 
                src="/optima_luxury_mockup.png" 
                alt="Detail A"
                fill
                className="object-cover"
              />
            </div>
            <div className="aspect-[3/4] w-full rounded-2xl bg-neutral-50 border border-neutral-100 overflow-hidden relative shadow-2xs mt-12 sm:mt-24">
              <Image 
                src="/optima_luxury_mockup.png" 
                alt="Detail B"
                fill
                className="object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 3. SIGNATURE RETURN SECTION */}
      <section className="h-screen w-full flex flex-col items-center justify-center text-center px-6 relative z-10 bg-[#F9F9F6]">
        <div className="max-w-[600px] flex flex-col items-center gap-8">
          <h2 className={`${instrumentSerif.className} text-[48px] md:text-[64px] font-normal leading-[1.05]`}>
            Simplicity is the <br /> <span className="italic">ultimate sophistication.</span>
          </h2>
          <div className="h-[1px] w-12 bg-[#2C2C2A]/40" />
          <p className="font-sans text-[14px] text-neutral-500 font-light leading-relaxed max-w-[420px]">
            The Luxury Landing concept implements slow parallax transitions and premium serif layouts. It demonstrates an refined, cinematic narrative flow.
          </p>
          <div className="mt-4">
            <Link 
              href="/lab" 
              className={`${instrumentSerif.className} italic text-[18px] py-3 px-8 border border-neutral-300 hover:border-[#2C2C2A] transition-colors rounded-full text-neutral-800`}
            >
              Return to Laboratory
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
