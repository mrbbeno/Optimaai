"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import BlobCursor from "@/components/lab/BlobCursor";
import { ExternalLink, ArrowDown } from "lucide-react";
import TextPressure from "@/components/lab/TextPressure";
import { researchArticles } from "@/lib/researchData";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function LabPage() {


  return (
    <>
      <BlobCursor />
      {/* Floating Navbar */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center w-full pointer-events-none">
        <nav className="pointer-events-auto flex items-center gap-6 px-6 py-3 bg-white/70 backdrop-blur-md border border-neutral-200/50 shadow-sm rounded-full">
          <Link href="/lab" className="font-sans font-medium text-[15px] tracking-tight hover:opacity-70 transition-opacity">
            OPTIMA <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest ml-1">LAB</span>
          </Link>
          <div className="h-4 w-px bg-neutral-200 hidden md:block" />
          <div className="hidden md:flex items-center gap-5">
            <a href="#featured" className="font-sans text-[13px] text-neutral-500 hover:text-neutral-950 transition-colors font-light">Featured</a>
            <a href="#clients" className="font-sans text-[13px] text-neutral-500 hover:text-neutral-950 transition-colors font-light">Clients</a>
            <a href="#tools" className="font-sans text-[13px] text-neutral-500 hover:text-neutral-950 transition-colors font-light">Tools</a>
            <a href="#experiments" className="font-sans text-[13px] text-neutral-500 hover:text-neutral-950 transition-colors font-light">R&D</a>
            <a href="#research" className="font-sans text-[13px] text-neutral-500 hover:text-neutral-950 transition-colors font-light">Research</a>
          </div>
          <div className="h-4 w-px bg-neutral-200 hidden md:block" />
          <Link href="/" className="font-sans text-[12px] py-1.5 px-4 bg-neutral-100 hover:bg-neutral-200 rounded-full text-neutral-600 transition-colors font-mono flex items-center gap-1.5">
            Agency Site <ExternalLink className="w-3 h-3" />
          </Link>
        </nav>
      </div>

      {/* Main Container */}
      <main className="w-full flex-grow flex flex-col pb-32">
        
        {/* HERO SECTION */}
        <section className="min-h-screen flex flex-col justify-center items-center relative pt-20 px-4 md:px-8">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="flex flex-col items-center gap-12 w-full max-w-[800px] z-10"
          >
            <motion.div variants={fadeInUp} className="flex items-center justify-center gap-2">
              <span className="font-mono text-[11px] text-neutral-400 uppercase tracking-widest">
                — DIGITAL ART GALLERY v2.0
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
            </motion.div>

            <motion.div variants={fadeInUp} className="w-full h-[100px] sm:h-[160px] relative mt-4">
              <TextPressure 
                text="OPTIMA LAB" 
                textColor="#1D1D1F" 
                flex={true} 
                alpha={false} 
                stroke={false} 
                width={true} 
                weight={true} 
                italic={true} 
              />
            </motion.div>

            <motion.p 
              variants={fadeInUp}
              className="font-sans text-[18px] md:text-[22px] font-light text-neutral-500 leading-relaxed max-w-[500px] text-center"
            >
              An experimental playground for premium interfaces, fluid motion, and creative coding.
            </motion.p>

            <motion.a 
              variants={fadeInUp}
              href="#research"
              className="mt-4 px-6 py-3 rounded-full border border-neutral-200/80 bg-white/50 backdrop-blur-sm hover:bg-white text-neutral-900 font-sans text-[14px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all flex items-center gap-2 group"
            >
              Explore Research & Notes
              <ArrowDown className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 transition-colors" />
            </motion.a>


          </motion.div>
        </section>






        {/* --- NEW CONTENT SECTIONS --- */}
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col gap-32 w-full pt-16">
          
          {/* 1. MISSION & TECH STACK */}
          <motion.section id="mission" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col items-center text-center max-w-[800px] mx-auto gap-8 pt-16 scroll-mt-24">
            <div className="flex flex-col gap-2 items-center">
              <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400">Mission</span>
            </div>
            <p className="font-sans text-[20px] md:text-[24px] font-light text-neutral-800 leading-relaxed">
              Az Optima AI Lab célja olyan AI-alapú rendszerek fejlesztése, amelyek automatizálják az ismétlődő folyamatokat, növelik a hatékonyságot és segítik a vállalkozásokat a digitális fejlődésben.
            </p>
            
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {["OpenAI", "Claude", "n8n", "LangChain", "Python", "Next.js", "Supabase", "PostgreSQL"].map((tech, i) => (
                <div key={i} className="px-4 py-1.5 rounded-full border border-neutral-200/60 bg-white/50 font-mono text-[10px] text-neutral-500 hover:text-neutral-900 transition-colors cursor-default uppercase tracking-wide">
                  {tech}
                </div>
              ))}
            </div>
          </motion.section>

          {/* 2. FEATURED PROJECTS */}
          <motion.section id="featured" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col gap-12 scroll-mt-24">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400">Featured</span>
              <h2 className="font-sans text-[28px] md:text-[34px] font-medium text-neutral-950">
                Featured Projects
              </h2>
              <p className="font-sans text-[14px] text-neutral-500 font-light">A legfontosabb projektek kiemelve.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: "AI Sales Agent", desc: "Automatikus leadkezelés és ügyfélminősítés.", status: "Aktív", date: "2026.06.10" },
                { name: "AI Website Builder", desc: "AI segítségével generált weboldalak.", status: "Béta", date: "2026.05.28" },
                { name: "AI Research Agent", desc: "Automatikus kutatási és elemzési rendszer.", status: "Aktív", date: "2026.06.05" },
                { name: "Voice Assistant", desc: "Beszédalapú AI asszisztens.", status: "Prototípus", date: "2026.06.01" }
              ].map((proj, i) => (
                <div key={i} className="group border border-neutral-200/50 bg-white/50 rounded-2xl p-6 flex flex-col justify-between h-[200px] hover:shadow-md hover:border-neutral-300/50 transition-all">
                  <div className="flex flex-col gap-2">
                    <h3 className="font-sans font-medium text-[18px] text-neutral-950">{proj.name}</h3>
                    <p className="font-sans text-[14px] text-neutral-500 font-light leading-relaxed">{proj.desc}</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-neutral-100 pt-4 mt-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${proj.status === "Aktív" ? "bg-emerald-500" : proj.status === "Béta" ? "bg-amber-500" : "bg-indigo-500"}`} />
                      <span className="font-mono text-[10px] text-neutral-500 uppercase">{proj.status}</span>
                    </div>
                    <span className="font-mono text-[10px] text-neutral-400">{proj.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* 3. CLIENT PROJECTS */}
          <motion.section id="clients" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col gap-12 scroll-mt-24">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400">Work</span>
              <h2 className="font-sans text-[28px] md:text-[34px] font-medium text-neutral-950">
                Client Projects
              </h2>
              <p className="font-sans text-[14px] text-neutral-500 font-light">Valós ügyfélprojektek bemutatása.</p>
            </div>
            
            <div className="flex flex-col gap-6">
              {[
                { 
                  name: "Real Estate Lead Generation Platform", 
                  client: "Helyi ingatlanközvetítő", 
                  goal: "Modern weboldal és leadgeneráló rendszer kialakítása.",
                  solution: ["Egyedi weboldal", "SEO optimalizálás", "Kapcsolati űrlapok", "Automatizált értesítések"],
                  result: "Több érdeklődő, gyorsabb kapcsolatfelvétel, egyszerűbb ügyfélkezelés.",
                  status: "Elkészült" 
                }
              ].map((proj, i) => (
                <div key={i} className="border border-neutral-200/50 bg-white/50 rounded-2xl p-8 flex flex-col lg:flex-row gap-12">
                  <div className="flex flex-col gap-6 lg:w-1/3">
                    <div className="flex flex-col gap-2">
                      <h3 className="font-sans font-medium text-[20px] text-neutral-950 leading-tight">{proj.name}</h3>
                      <p className="font-mono text-[11px] text-neutral-400 uppercase tracking-widest">{proj.client}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="font-mono text-[10px] text-neutral-500 uppercase">{proj.status}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-8 lg:w-2/3">
                    <div className="flex flex-col gap-2">
                      <h4 className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">Cél</h4>
                      <p className="font-sans text-[14px] text-neutral-700 font-light">{proj.goal}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h4 className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">Megoldás</h4>
                      <ul className="flex flex-wrap gap-2">
                        {proj.solution.map((item, j) => (
                          <li key={j} className="font-sans text-[12px] bg-neutral-100/80 px-3 py-1 rounded-full text-neutral-600 border border-neutral-200/50">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h4 className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">Eredmény</h4>
                      <p className="font-sans text-[14px] text-neutral-700 font-light">{proj.result}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* 4. INTERNAL TOOLS */}
          <motion.section id="tools" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col gap-12 scroll-mt-24">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400">Infrastructure</span>
              <h2 className="font-sans text-[28px] md:text-[34px] font-medium text-neutral-950">
                Internal Tools
              </h2>
              <p className="font-sans text-[14px] text-neutral-500 font-light">Saját fejlesztésű rendszerek és platformok.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: "Optima AI Agent", desc: "Központi AI motor és orchestrátor.", status: "Aktív", date: "2026.06.08" },
                { name: "Lead Scoring Engine", desc: "Automatikus potenciál becslő rendszer.", status: "Béta", date: "2026.05.20" },
                { name: "Automation Dashboard", desc: "Belső munkafolyamatok kezelőfelülete.", status: "Aktív", date: "2026.06.01" },
                { name: "AI Workflow Builder", desc: "Vizuális folyamattervező modul.", status: "Fejlesztés alatt", date: "2026.06.09" }
              ].map((tool, i) => (
                <div key={i} className="border border-neutral-200/50 bg-white/30 rounded-xl p-5 flex flex-col gap-4 justify-between hover:bg-white/60 transition-colors shadow-sm">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-sans font-medium text-[15px] text-neutral-900">{tool.name}</h3>
                    <p className="font-sans text-[13px] text-neutral-500 font-light">{tool.desc}</p>
                  </div>
                  <div className="flex flex-col gap-1 pt-3 border-t border-neutral-100">
                    <span className="font-mono text-[9px] text-neutral-400 uppercase">{tool.status}</span>
                    <span className="font-mono text-[9px] text-neutral-300">{tool.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* 5. EXPERIMENTS */}
          <motion.section id="experiments" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col gap-12 scroll-mt-24">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400">R&D</span>
              <h2 className="font-sans text-[28px] md:text-[34px] font-medium text-neutral-950">
                Experiments
              </h2>
              <p className="font-sans text-[14px] text-neutral-500 font-light">Kísérleti fejlesztések és prototípusok.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: "Voice AI", desc: "Valós idejű hangalapú interakció modul.", status: "Prototípus", date: "2026.06.05" },
                { name: "Multi-Agent Systems", desc: "Egymással kommunikáló AI ágensek hálózata.", status: "Kutatás", date: "2026.05.15" },
                { name: "AI Meeting Assistant", desc: "Automatikus jegyzetelő és feladat-kiosztó.", status: "Béta", date: "2026.06.02" },
                { name: "Intelligent Document Processing", desc: "Számla és szerződés adatkinyerő engine.", status: "Aktív", date: "2026.05.30" }
              ].map((exp, i) => (
                <div key={i} className="border border-dashed border-neutral-300/60 bg-neutral-50/30 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-sans font-medium text-[16px] text-neutral-900">{exp.name}</h3>
                    <p className="font-sans text-[13px] text-neutral-500 font-light">{exp.desc}</p>
                  </div>
                  <div className="flex flex-col sm:items-end gap-1 shrink-0">
                    <span className="font-mono text-[10px] text-indigo-500/80 uppercase">{exp.status}</span>
                    <span className="font-mono text-[9px] text-neutral-400">{exp.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* 6. RESEARCH & NOTES */}
          <motion.section id="research" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col gap-12 scroll-mt-24">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400">Knowledge Base</span>
              <h2 className="font-sans text-[28px] md:text-[34px] font-medium text-neutral-950">
                Research & Notes
              </h2>
              <p className="font-sans text-[14px] text-neutral-500 font-light">Tudásbázis és szakmai cikkek.</p>
            </div>
            
            <div className="flex flex-col">
              {researchArticles.map((note, i) => (
                <Link href={`/lab/research/${note.slug}`} key={i} className="group py-6 border-b border-neutral-200/50 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:pl-2 transition-all cursor-pointer">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-sans font-medium text-[16px] text-neutral-900 group-hover:text-indigo-600 transition-colors">{note.title}</h3>
                    <p className="font-sans text-[14px] text-neutral-500 font-light">{note.summary}</p>
                  </div>
                  <span className="font-mono text-[11px] text-neutral-400 shrink-0">{note.date}</span>
                </Link>
              ))}
            </div>
          </motion.section>

          {/* 7. BUILD LOG */}
          <motion.section id="log" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col gap-12 scroll-mt-24">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400">Changelog</span>
              <h2 className="font-sans text-[28px] md:text-[34px] font-medium text-neutral-950">
                Build Log
              </h2>
              <p className="font-sans text-[14px] text-neutral-500 font-light">Időrendi fejlesztési napló.</p>
            </div>
            
            <div className="flex flex-col border-t border-neutral-200/60">
              {[
                { date: "2026.06.10", version: "Update", updates: ["AI Sales Agent fejlesztés", "Dashboard optimalizálás", "Új automatizációs funkciók"] },
                { date: "2026.06.03", version: "Release", updates: ["Voice Assistant prototípus", "CRM integráció"] }
              ].map((log, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-6 md:gap-16 py-8 border-b border-neutral-200/60 group hover:bg-neutral-50/50 transition-colors px-4 -mx-4 rounded-xl">
                  <div className="flex flex-col gap-1 shrink-0 md:w-48">
                    <span className="font-mono text-[14px] text-neutral-950 font-medium">{log.date}</span>
                    <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">{log.version}</span>
                  </div>
                  <ul className="flex flex-col gap-3 w-full">
                    {log.updates.map((update, j) => (
                      <li key={j} className="font-sans text-[15px] text-neutral-600 font-light flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 mt-2 shrink-0 group-hover:bg-neutral-400 transition-colors" />
                        <span className="leading-relaxed">{update}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.section>



        </div>
        {/* --- END OF NEW SECTIONS --- */}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-neutral-200/40 bg-[#FBFBFD] pt-16 flex flex-col">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 w-full">
          <div className="flex flex-col gap-2">
            <span className="font-sans font-medium text-[15px] tracking-tight text-neutral-900">
              OPTIMA LAB
            </span>
            <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
              © {new Date().getFullYear()} — all rights reserved
            </span>
          </div>

          <div className="flex flex-wrap gap-x-10 gap-y-4">
            <a href="mailto:info@optimaai.eu" className="font-sans text-[13px] text-neutral-500 hover:text-neutral-900 transition-colors">
              info@optimaai.eu
            </a>
            <Link href="/" className="font-sans text-[13px] text-neutral-500 hover:text-neutral-900 transition-colors">
              Main Agency
            </Link>
            <Link href="/adatvedelem" className="font-sans text-[13px] text-neutral-500 hover:text-neutral-900 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/aszf" className="font-sans text-[13px] text-neutral-500 hover:text-neutral-900 transition-colors">
              Terms
            </Link>
          </div>
        </div>

        {/* Massive full-width OPTIMAAI text at the very bottom (Static) */}
        <div className="w-full max-w-[1200px] mx-auto mt-24 px-6 pb-8 opacity-[0.07] pointer-events-none select-none">
          <svg className="w-full h-auto" viewBox="0 0 1000 180" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
            <text 
              x="50%" 
              y="55%" 
              dominantBaseline="middle" 
              textAnchor="middle" 
              className="font-sans font-bold" 
              fontSize="190" 
              letterSpacing="0.02em"
              fill="#1D1D1F"
            >
              OPTIMAAI
            </text>
          </svg>
        </div>
      </footer>
    </>
  );
}
