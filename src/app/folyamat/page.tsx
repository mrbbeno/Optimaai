"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const phases = [
  {
    id: "01",
    title: "Feltárás és Stratégia",
    desc: "Az első megbeszélés nem projektkickoff — hanem diagnózis. Megértjük az üzleti célt, a célközönséget, a versenykörnyezetet és a konverziós útvonalat. A kimenete egy dokumentált rendszertérkép, nem egy ajánlat.",
    time: "3–5 munkanap"
  },
  {
    id: "02",
    title: "Rendszertervezés",
    desc: "Az architektúra, az információs hierarchia és az automatizációs folyamatok megtervezése az első pixel megjelenése előtt. Ez az a fázis, ahol a legtöbb ügynökség átugorja a problémát — mi itt töltjük a legtöbb időt.",
    time: "1–2 hét"
  },
  {
    id: "03",
    title: "Fejlesztés",
    desc: "Egyedi kódbázis, egyedi design, nulla sablon. Minden komponens a célra van optimalizálva. A fejlesztés iteratív — heti checkpoint-ok, valós idejű hozzáférés a staging environmenthez.",
    time: "2–6 hét (projekt mérettől függően)"
  },
  {
    id: "04",
    title: "Leszállítás és Növekedés",
    desc: "Átadás, dokumentáció, csapatoktatás. A rendszer leszállítása nem a kapcsolat vége — hanem az alapja. Ahol szükséges, folyamatos fejlesztés és rendszernövekedés.",
    time: "Folyamatos, opcionális"
  }
];

export default function Process() {
  return (
    <>
      <Navbar />
      
      <main className="relative pt-32">
        <div className="grid-texture fixed inset-0 pointer-events-none z-0" />

        {/* HEADER */}
        <section className="relative px-6 md:px-12 z-10 mb-32">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex items-center gap-4 mb-12">
              <span className="label-mono !text-[12px]">HOGYAN DOLGOZUNK</span>
            </div>
            <h1 className="font-display text-[56px] md:text-[72px] text-primary max-w-[800px] leading-tight">
              Egy projekt, négy fázis.
            </h1>
            <p className="mt-12 font-ui text-[18px] text-secondary max-w-[580px] leading-[1.8]">
              Minden Optimaai projekt ugyanazon az átgondolt folyamaton megy végig — a feltáró egyeztetéstől a leszállított rendszerig.
            </p>
          </div>
        </section>

        {/* PHASES */}
        <section className="relative z-10">
          {phases.map((phase) => (
            <div key={phase.id} className="w-full border-b border-border py-24 md:py-32 px-6 md:px-12 first:border-t">
              <div className="mx-auto max-w-[1440px] grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 md:gap-24 items-center">
                
                {/* Left side: Large number */}
                <div className="relative">
                  <span className="font-display text-[100px] md:text-[140px] text-tertiary opacity-15 leading-none">
                    {phase.id}
                  </span>
                  <div className="mt-8">
                    <h2 className="font-display text-[40px] md:text-[48px] text-primary leading-tight">
                      {phase.title}
                    </h2>
                  </div>
                </div>

                {/* Right side: Description */}
                <div className="flex flex-col gap-10">
                  <p className="font-ui text-[18px] text-secondary leading-[1.8]">
                    {phase.desc}
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="label-mono !text-[12px] !text-accent">IDŐIGÉNY:</span>
                    <span className="font-mono text-[13px] text-primary">{phase.time}</span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </>
  );
}
