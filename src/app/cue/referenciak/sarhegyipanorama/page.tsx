"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import React from "react";

const BlockRevealText = ({ children, delay = 0, inline = true }: { children: React.ReactNode, delay?: number, inline?: boolean }) => {
  const Component = inline ? "span" : "div";
  const MotionComponent = inline ? motion.span : motion.div;
  
  return (
    <Component className={`relative ${inline ? "inline-flex" : "block w-fit"}`}>
      {/* The Text (appears instantly at 50% of the animation when fully covered) */}
      <MotionComponent
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.01, delay: delay + 0.5 }}
        className={inline ? "inline-block" : "block"}
      >
        {children}
      </MotionComponent>
      {/* The Solid White Cover Block */}
      <MotionComponent
        className="absolute top-0 bottom-0 bg-white z-10"
        initial={{ left: "0%", right: "100%" }}
        whileInView={{
          left: ["0%", "0%", "100%"],
          right: ["100%", "0%", "0%"]
        }}
        viewport={{ once: true }}
        transition={{ 
          duration: 1.0, 
          times: [0, 0.5, 1], 
          ease: [0.76, 0, 0.24, 1], 
          delay 
        }}
      />
    </Component>
  );
};

export default function CueSarhegyiPanoramaCaseStudy() {
  return (
    <main className="bg-[#030303] min-h-screen text-white overflow-hidden selection:bg-white/30 selection:text-white pb-32">
      
      {/* Simple Navigation Back */}
      <div className="pt-12 px-6 md:px-12 max-w-7xl mx-auto">
        <Link href="/cue" className="inline-flex items-center text-[12px] font-[family-name:var(--font-geist-mono)] text-white/50 hover:text-white uppercase tracking-widest transition-colors duration-300">
          <ArrowLeft className="w-4 h-4 mr-3" />
          Back to Cue
        </Link>
      </div>

      <article className="max-w-7xl mx-auto px-6 md:px-12 pt-20">
        
        {/* Header Section */}
        <header className="mb-16 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="font-[family-name:var(--font-geist-mono)] text-[12px] text-white/40 uppercase tracking-widest mb-12 md:mb-20">
              Case Study // Sár-hegyi Panoráma
            </div>
            <h1 className="font-[family-name:var(--font-geist)] font-black text-[13vw] md:text-[8vw] leading-[1.0] tracking-tighter text-white mb-8 relative z-10 flex flex-col items-start">
              <BlockRevealText delay={0.2}>SÁR-HEGYI</BlockRevealText>
              <BlockRevealText delay={0.4}>PANORAMA</BlockRevealText>
              <BlockRevealText delay={0.6}>REAL ESTATE.</BlockRevealText>
            </h1>
          </motion.div>
        </header>

        {/* Hero Image */}
        <motion.div 
          className="w-full aspect-video md:aspect-auto md:h-[70vh] border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden relative mb-16 md:mb-32 bg-[#050505] group"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Subtle inner glows */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,rgba(0,0,0,0)_70%)] pointer-events-none z-10"></div>
          
          {/* Full Color Base Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/Sarhegyipanoramabg.jpeg" 
            alt="Sarhegyipanorama"
            className="absolute inset-0 w-full h-full object-cover opacity-80 pointer-events-none z-0 group-hover:scale-105 transition-transform duration-1000 ease-out"
          />
        </motion.div>

        {/* TL;DR Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 md:mb-32 border-b border-white/10 pb-16 md:pb-32">
          
          <div className="lg:col-span-4">
            <h2 className="font-[family-name:var(--font-geist-mono)] text-[12px] text-white/40 uppercase tracking-[0.5em] mb-4">
              Overview
            </h2>
            <h3 className="font-[family-name:var(--font-geist)] font-black text-[32px] md:text-[40px] leading-[0.9] tracking-tighter">
              AT A GLANCE.
            </h3>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-16">
            
            {/* The Client */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h4 className="font-[family-name:var(--font-geist-mono)] text-[12px] text-white/40 uppercase tracking-widest mb-4">The Client</h4>
              <p className="font-[family-name:var(--font-geist)] text-[16px] md:text-[20px] text-white/60 leading-relaxed">
                A real estate & land development project with an outdated, unbranded WordPress setup.
              </p>
            </motion.div>

            {/* The Stack */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h4 className="font-[family-name:var(--font-geist-mono)] text-[12px] text-white/40 uppercase tracking-widest mb-4">The Stack</h4>
              <div className="flex flex-wrap gap-2">
                {["Next.js (React)", "Supabase", "Vercel", "Resend API", "Slack"].map(tech => (
                  <span key={tech} className="font-[family-name:var(--font-geist-mono)] text-[10px] md:text-[12px] bg-white/5 px-3 py-1.5 rounded-full text-white/60">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* What We Did */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:col-span-2"
            >
              <h4 className="font-[family-name:var(--font-geist-mono)] text-[12px] text-white/40 uppercase tracking-widest mb-4">What We Did</h4>
              <p className="text-white/60 font-[family-name:var(--font-geist)] text-[24px] md:text-[32px] leading-[1.2] tracking-tight">
                Ripped out WordPress, built a custom interactive lot-selector application, designed a 4K 3D interior visualization system, and automated the entire sales funnel.
              </p>
            </motion.div>

          </div>
        </section>

        {/* The ROI */}
        <section>
          <div className="mb-8 md:mb-16">
            <h2 className="font-[family-name:var(--font-geist-mono)] text-[12px] text-white/40 uppercase tracking-[0.5em] mb-4">
              Impact
            </h2>
            <h3 className="font-[family-name:var(--font-geist)] font-black text-[48px] md:text-[100px] leading-[0.8] tracking-tighter">
              THE ROI.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            
            {/* ROI 1 */}
            <motion.div 
              className="bg-[#050505] rounded-[24px] md:rounded-[32px] p-6 md:p-12 border border-white/10 flex flex-col justify-between min-h-[250px] md:min-h-[350px] relative overflow-hidden group hover:border-white/30 transition-colors duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              <span className="font-[family-name:var(--font-geist-mono)] text-[12px] text-white/40 uppercase tracking-widest mb-4 block">Performance</span>
              <div className="mt-auto">
                <div className="font-[family-name:var(--font-geist)] font-black text-[48px] md:text-[80px] tracking-tighter text-white leading-none mb-4 group-hover:scale-105 transition-transform duration-500 origin-left">
                  {'<0.5s'}
                </div>
                <p className="font-[family-name:var(--font-geist)] text-[16px] text-white/60">Load speeds dropped from 6s to under 0.5s.</p>
              </div>
            </motion.div>

            {/* ROI 2 */}
            <motion.div 
              className="bg-[#050505] rounded-[24px] md:rounded-[32px] p-6 md:p-12 border border-white/10 flex flex-col justify-between min-h-[250px] md:min-h-[350px] md:col-span-2 relative overflow-hidden group hover:border-white/30 transition-colors duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              <span className="font-[family-name:var(--font-geist-mono)] text-[12px] text-white/40 uppercase tracking-widest mb-4 block">Infrastructure Costs</span>
              <div className="mt-auto">
                <div className="font-[family-name:var(--font-geist)] font-black text-[48px] md:text-[80px] tracking-tighter text-white leading-none mb-4 group-hover:scale-105 transition-transform duration-500 origin-left">
                  $0/MO
                </div>
                <p className="font-[family-name:var(--font-geist)] text-[16px] md:text-[20px] text-white/60">
                  Infrastructure costs were reduced to completely zero, providing massive long-term savings.
                </p>
              </div>
            </motion.div>

            {/* ROI 3 */}
            <motion.div 
              className="bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-16 flex flex-col justify-between min-h-[300px] md:min-h-[400px] md:col-span-3 text-black relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0)_70%)] pointer-events-none"></div>
              <span className="font-[family-name:var(--font-geist-mono)] text-[12px] text-black/60 uppercase tracking-widest mb-4 block relative z-10">Conversions</span>
              
              <div className="mt-auto flex flex-col lg:flex-row lg:items-end justify-between gap-12 relative z-10">
                <div className="w-full">
                  <div className="font-[family-name:var(--font-geist)] font-black text-[clamp(28px,9vw,100px)] tracking-tighter leading-[0.8] mb-6 whitespace-nowrap">
                    3–7 LEADS/WK
                  </div>
                  <p className="font-[family-name:var(--font-geist)] text-[18px] md:text-[24px] text-black/80 max-w-2xl font-medium">
                    Conversions jumped from 0 to 3–7 highly qualified leads/week with $0 ad spend (100% organic).
                  </p>
                </div>
                
                <Link href="/cue/initiate" className="bg-[#030303] text-white px-8 py-5 rounded-full font-[family-name:var(--font-geist)] font-bold text-[14px] uppercase tracking-widest hover:scale-105 transition-transform duration-300 shadow-xl whitespace-nowrap self-start lg:self-end shrink-0">
                  Start Your Project
                </Link>
              </div>
            </motion.div>

          </div>
        </section>

        {/* Technical Execution (Below ROI) */}
        <section className="mt-16 pt-16 md:mt-32 md:pt-32 border-t border-white/10">
          <div className="mb-8 md:mb-16">
            <h2 className="font-[family-name:var(--font-geist-mono)] text-[12px] text-white/40 uppercase tracking-[0.5em] mb-4">
              Execution
            </h2>
            <h3 className="font-[family-name:var(--font-geist)] font-black text-[32px] md:text-[60px] leading-[0.9] tracking-tighter">
              ENGINEERING HIGHLIGHTS.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            
            {/* Highlight 1: Re-architecture */}
            <motion.div 
              className="bg-[#050505] border border-white/10 rounded-[24px] md:rounded-[32px] p-6 md:p-12 group hover:bg-[#0a0a0a] transition-colors duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                <span className="font-[family-name:var(--font-geist-mono)] text-[14px]">01</span>
              </div>
              <h4 className="text-2xl font-bold mb-4 font-[family-name:var(--font-geist)] text-white">Legacy WP Takedown</h4>
              <p className="text-white/60 font-[family-name:var(--font-geist)] leading-relaxed">
                Ripped out a heavily bloated, compromised WordPress setup suffering from a backdoor redirect hack. Rebuilt from scratch on a secure Next.js & Supabase stack, replacing 24 plugins with custom logic and cutting TTFB dramatically.
              </p>
            </motion.div>

            {/* Highlight 2: 3D Assets */}
            <motion.div 
              className="bg-[#050505] border border-white/10 rounded-[24px] md:rounded-[32px] p-6 md:p-12 group hover:bg-[#0a0a0a] transition-colors duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                <span className="font-[family-name:var(--font-geist-mono)] text-[14px]">02</span>
              </div>
              <h4 className="text-2xl font-bold mb-4 font-[family-name:var(--font-geist)] text-white">4K 3D Visualization</h4>
              <p className="text-white/60 font-[family-name:var(--font-geist)] leading-relaxed">
                Because standard AI engines couldn't reliably convert the complex 2D blueprints, I manually modeled the interior architectures to produce crisp, 4K renderings that immediately boosted buyer trust and bridged the visualization gap.
              </p>
            </motion.div>

            {/* Highlight 3: Speed to Lead */}
            <motion.div 
              className="bg-[#050505] border border-white/10 rounded-[24px] md:rounded-[32px] p-6 md:p-12 md:col-span-2 group hover:bg-[#0a0a0a] transition-colors duration-500 flex flex-col md:flex-row gap-6 md:gap-16 items-start"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="md:w-1/3 shrink-0">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                  <span className="font-[family-name:var(--font-geist-mono)] text-[14px]">03</span>
                </div>
                <h4 className="text-2xl font-bold font-[family-name:var(--font-geist)] text-white">Speed-to-Lead<br/>Automation</h4>
              </div>
              <div className="md:w-2/3 flex flex-col justify-center">
                <p className="text-white/60 font-[family-name:var(--font-geist)] leading-relaxed mb-6">
                  Built a context-aware funnel where sales reps receive instant Slack notifications detailing the exact lot or house layout the buyer is viewing. 
                </p>
                <p className="text-white/60 font-[family-name:var(--font-geist)] leading-relaxed">
                  Integrated a proprietary newsletter engine via Resend with behavioral lead scoring (e.g. continuous activity triggers hot lead status), completely bypassing expensive third-party SaaS tools.
                </p>
              </div>
            </motion.div>

            {/* Highlight 4: AI & Security */}
            <motion.div 
              className="bg-white/5 border border-white/10 rounded-[24px] md:rounded-[32px] p-6 md:p-12 md:col-span-2 group relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.03)_0%,rgba(0,0,0,0)_50%)] pointer-events-none z-0"></div>
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
                <div className="max-w-xl">
                  <h4 className="text-2xl font-bold mb-4 font-[family-name:var(--font-geist)] text-white">AI-Ready & Bulletproof</h4>
                  <p className="text-white/60 font-[family-name:var(--font-geist)] leading-relaxed">
                    Secured the custom admin panel using Google OAuth restricted to specific email whitelists and a custom Slack-based 2FA. Future-proofed the entire platform for AI search agents (like Perplexity and ChatGPT) using tailored `llm.txt` files and structured JSON-LD semantic schemas.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 md:gap-4 mt-6 md:mt-0">
                  <div className="px-3 md:px-4 py-1 md:py-2 rounded-full border border-white/20 text-white/50 font-[family-name:var(--font-geist-mono)] text-[10px] md:text-xs">llm.txt</div>
                  <div className="px-3 md:px-4 py-1 md:py-2 rounded-full border border-white/20 text-white/50 font-[family-name:var(--font-geist-mono)] text-[10px] md:text-xs">JSON-LD</div>
                  <div className="px-3 md:px-4 py-1 md:py-2 rounded-full border border-white/20 text-white/50 font-[family-name:var(--font-geist-mono)] text-[10px] md:text-xs">OAuth</div>
                </div>
              </div>
            </motion.div>

          </div>
        </section>

      </article>
    </main>
  );
}
