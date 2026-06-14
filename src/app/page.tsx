"use client";

import { motion } from "framer-motion";
import DotField from "@/components/DotField";
import TechCarousel from "@/components/TechCarousel";
import ServiceCards from "@/components/ServiceCards";
import References from "@/components/References";
import Process from "@/components/Process";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen bg-background relative overflow-hidden">
        
        {/* ══════════════════════════════════════════
            HERO SECTION — Ultra Minimal Shadcn
        ══════════════════════════════════════════ */}
        <section className="relative px-6 md:px-12 z-10 flex items-center min-h-screen">
          
          {/* Subtle Background Effects */}
          <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
          <div className="absolute inset-0 flex items-center justify-center -z-10">
            <div className="w-[800px] h-[600px] bg-blue-50/50 rounded-full blur-3xl opacity-50" />
          </div>

          <div className="absolute inset-0 z-0 pointer-events-auto">
            <DotField
              dotRadius={1.5}
              dotSpacing={14}
              bulgeStrength={67}
              sparkle={false}
              waveAmplitude={0}
            />
          </div>
          
          {/* Centered Column */}
          <div className="mx-auto max-w-[1200px] w-full z-10 relative pointer-events-none flex flex-col items-center text-center">
            <div className="flex flex-col gap-8 max-w-3xl pointer-events-auto items-center">
              
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="inline-flex items-center rounded-lg border border-border bg-white px-4 py-1.5 text-sm font-medium w-fit shadow-sm"
              >
                Prémium Webfejlesztés & AI
              </motion.div>

              {/* Headline */}
              <div className="relative mt-2">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                  className="text-[44px] md:text-[60px] lg:text-[72px] font-bold leading-[1.05] tracking-tight text-foreground relative z-10 pt-2 mx-auto"
                >
                  Modern Rendszerek.<br />
                  <span className="font-serif italic font-bold text-blue-600 tracking-normal whitespace-nowrap">Valós Eredmények.</span>
                </motion.h1>
              </div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="text-lg md:text-xl text-muted-foreground leading-relaxed mt-2"
              >
                Célzottan fejlesztett weboldalak és AI automatizációs rendszerek. Nem sablonokat árulunk, hanem üzleti infrastruktúrát építünk.
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2 w-full"
              >
                <Link href="/kapcsolat" className="btn-primary w-full sm:w-auto h-12 px-8 shadow-md hover:shadow-lg transition-all text-base">
                  Kezdjük el a munkát
                </Link>
                <Link href="#referenciak" className="btn-outline w-full sm:w-auto h-12 px-8 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 text-base">
                  Projektjeink
                </Link>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Tech Carousel */}
        <div className="border-y border-border/40 bg-white/50 backdrop-blur-sm relative z-20">
          <TechCarousel />
        </div>

        {/* Main Content Blocks */}
        <ServiceCards />

        <References />

        <Process />

        {/* ══════════════════════════════════════════
            CTA — Shadcn Minimalist Black/White Block
        ══════════════════════════════════════════ */}
        <section className="px-6 md:px-12 py-32 bg-background border-t border-border/40 relative z-10">
          <div className="mx-auto max-w-[800px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center flex flex-col items-center"
            >
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-black mb-6">
                Készen állsz a <span className="font-serif italic font-bold text-blue-600 text-[1.1em]">szintlépésre?</span>
              </h2>
              
              <p className="text-xl text-muted-foreground max-w-[600px] leading-relaxed">
                Beszéljük át a projektet kötelezettségek nélkül. Modern, fókuszált fejlesztés kompromisszumok nélkül.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto">
                <Link
                  href="/kapcsolat"
                  className="btn-primary w-full sm:w-auto h-12 px-10 text-base flex items-center justify-center gap-2"
                >
                  Kezdjük el a közös munkát
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              <p className="text-sm text-muted-foreground mt-6 font-medium">
                Válasz 24 órán belül.
              </p>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
