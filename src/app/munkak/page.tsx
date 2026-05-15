"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const projects = [
  {
    id: "01",
    name: "Sárhegyi Panoráma Lakópark",
    type: "Ingatlan Marketing Rendszer",
    result: "+68% konverzió",
    desc: "Integrált digitális értékesítési ökoszisztéma egy prémium lakóparknak. A rendszer magában foglalja a project landing oldalt, az automatizált lead-kezelést és a foglalási folyamatot — az érdeklődőt emberi beavatkozás nélkül vezeti végig a vásárlási döntésig.",
    metrics: [
      { value: "68%", label: "Konverzióarány-növekedés" },
      { value: "3 hét", label: "Leszállítási idő" },
      { value: "Automatizált", label: "Lead kvalifikáció" }
    ]
  },
  {
    id: "02",
    name: "GoStayDirect",
    type: "Saját Termék · Foglalási Platform",
    result: "0% OTA jutalék",
    desc: "A GoStayDirect az Optimaai saját terméke — egy direkt foglalási platform, amelyet mi magunk fejlesztettünk és üzemeltetünk Balaton-parti nyaralók tulajdonosainak. Az OTA-platformok (Airbnb, Booking.com) kihagyásával a tulajdonosok magasabb profitmarzzsal, saját ügyfélbázissal és teljes adatfelügyelettel működhetnek.",
    metrics: [
      { value: "0%", label: "OTA jutalék" },
      { value: "2×", label: "Profitmarzs" },
      { value: "Saját", label: "CRM és ügyfélbázis" }
    ]
  },
  {
    id: "03",
    name: "Aranykereszt.hu",
    type: "Weboldal + Arculatfrissítés",
    result: "Prémium brand élmény",
    desc: "Teljes digitális arculatfrissítés és egyedi fejlesztésű, reszponzív weboldal egészségügyi szolgáltató számára. A projekt fókuszában a páciensélmény modernizálása és a szolgáltatások letisztult, bizalmat gerjesztő bemutatása állt.",
    metrics: [
      { value: "100%", label: "Egyedi tervezés" },
      { value: "Saját", label: "Arculati rendszer" },
      { value: "Gyors", label: "Betöltési sebesség" }
    ]
  }
];

export default function Projects() {
  const [openProject, setOpenProject] = useState<string | null>(null);

  return (
    <>
      <Navbar />
      
      <main className="relative pt-32 min-h-[100svh]">
        <div className="grid-texture fixed inset-0 pointer-events-none z-0" />

        {/* HEADER */}
        <section className="relative px-6 md:px-12 z-10 mb-32">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex items-center gap-4 mb-12">
              <span className="font-mono text-[11px] text-secondary uppercase tracking-[0.15em]">REFERENCIÁK</span>
            </div>
            <h1 className="font-display text-[56px] md:text-[72px] text-primary max-w-[800px] leading-tight">
              Rendszerek, amelyek ma is futnak.
            </h1>
            <p className="mt-12 font-ui text-[18px] text-secondary max-w-[580px] leading-[1.8]">
              Nem mockupokat mutatunk. Csak olyan projekteket, amelyek mérhető eredményt hoztak.
            </p>
          </div>
        </section>

        {/* PROJECT ACCORDION LIST */}
        <section className="relative px-6 md:px-12 z-10 pb-32">
          <div className="mx-auto max-w-[1440px]">
            
            {/* Table Header (Desktop only) */}
            <div className="grid grid-cols-[80px_1fr_1fr_200px] gap-8 pb-6 border-b border-border hidden md:grid">
              <span className="font-mono text-[12px] text-secondary tracking-widest uppercase">#</span>
              <span className="font-mono text-[12px] text-secondary tracking-widest uppercase">Projekt neve</span>
              <span className="font-mono text-[12px] text-secondary tracking-widest uppercase">Típus</span>
              <span className="font-mono text-[12px] text-secondary tracking-widest uppercase text-right">Eredmény</span>
            </div>

            {/* List */}
            <div className="flex flex-col">
              {projects.map((project) => (
                <div key={project.id} className="border-b border-border">
                  <button
                    onClick={() => setOpenProject(openProject === project.id ? null : project.id)}
                    className="w-full grid grid-cols-1 md:grid-cols-[80px_1fr_1fr_200px] gap-4 md:gap-8 py-8 items-center text-left hover:bg-surface transition-colors px-4 -mx-4 group"
                  >
                    <span className="font-mono text-[12px] text-tertiary hidden md:block">
                      {project.id}
                    </span>
                    <span className="font-display text-[28px] md:text-[32px] text-primary group-hover:text-accent transition-colors">
                      {project.name}
                    </span>
                    <span className="font-ui text-[14px] text-secondary">
                      {project.type}
                    </span>
                    <div className="flex items-center justify-between md:justify-end gap-4">
                      <span className="font-mono text-[13px] text-primary font-medium">
                        {project.result}
                      </span>
                      <motion.div
                        animate={{ rotate: openProject === project.id ? 180 : 0 }}
                        className="text-tertiary"
                      >
                        <ChevronDown size={20} />
                      </motion.div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {openProject === project.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="py-12 px-4 md:px-0 grid grid-cols-1 lg:grid-cols-2 gap-16 border-t border-border-subtle">
                          <div className="flex flex-col">
                            <p className="font-ui text-[16px] text-secondary leading-[1.8]">
                              {project.desc}
                            </p>
                          </div>
                          <div className="flex flex-col gap-8">
                            {project.metrics.map((m, idx) => (
                              <div key={idx} className="flex flex-col border-b border-border pb-4 last:border-0">
                                <span className="font-mono text-[32px] md:text-[40px] text-primary leading-tight">
                                  {m.value}
                                </span>
                                <span className="font-ui text-[12px] text-secondary uppercase tracking-wider mt-1">
                                  {m.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
