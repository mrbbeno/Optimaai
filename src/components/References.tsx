"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const references = [
  {
    id: "ref-1",
    client: "GoStayDirect",
    title: "gostaydirect.eu",
    url: "https://gostaydirect.eu",
    description: "Közvetlen B2C katalógus és keresőrendszer, amely mentes a nagy foglalási oldalak súlyos jutalékaitól. A foglalási szándék és az elérhetőségek azonnal a szállásadóhoz érkeznek. A Next.js és Supabase alapú struktúra sallangoktól mentesen és villámgyorsan prezentálja a kínálatot.",
    tags: ["Next.js", "Supabase", "B2C Platform", "Közvetlen Lead"],
  },
  {
    id: "ref-2",
    client: "Sár-hegyi Panoráma",
    title: "sarhegyipanorama.hu",
    url: "https://sarhegyipanorama.hu",
    description: "Sablonok helyett egyedi fejlesztésű webes felület, amely méltó módon prezentálja a gyöngyösi beruházást. Strukturált vizuális rendszer az állapotkövetéshez, ami felesleges közvetítők nélkül, azonnali és közvetlen kapcsolatfelvételt biztosít az érdeklődőknek.",
    tags: ["Egyedi arculat", "Interaktív UI", "Lead Generálás"],
  }
];

export default function References() {
  return (
    <section id="referenciak" className="px-6 md:px-12 py-32 bg-slate-50 relative z-10">
      <div className="mx-auto max-w-[1200px]">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
              Kiemelt Referenciáink
            </h2>
            <p className="text-lg text-muted-foreground">
              Valós üzleti problémák, amiket modern webes technológiákkal és mesterséges intelligenciával oldottunk meg.
            </p>
          </div>
        </div>

        {/* Typographic List Layout */}
        <div className="flex flex-col border-t border-border mt-12">
          {references.map((ref, index) => (
            <motion.a
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              key={ref.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="group relative flex flex-col lg:flex-row lg:items-center gap-6 py-12 md:py-16 border-b border-border/60 hover:bg-muted/20 transition-colors duration-500 px-4 md:px-8 -mx-4 md:-mx-8 cursor-pointer rounded-xl block"
            >
              {/* Number */}
              <div className="text-xl md:text-2xl font-light text-muted-foreground/60 w-16 md:w-24 shrink-0">
                0{index + 1}
              </div>

              {/* Core Info */}
              <div className="flex-1 lg:w-2/5 shrink-0">
                <span className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-3 block">
                  {ref.client}
                </span>
                <h3 className="text-3xl md:text-5xl font-serif italic font-black tracking-tighter text-foreground group-hover:translate-x-2 transition-transform duration-500 ease-out">
                  {ref.title}
                </h3>
              </div>

              {/* Description */}
              <div className="flex-1 lg:w-2/5 lg:px-8">
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  {ref.description}
                </p>
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {ref.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="text-xs font-medium text-muted-foreground bg-white border border-border px-2.5 py-1 rounded-md shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover Arrow */}
              <div className="absolute top-8 right-8 lg:static lg:w-16 flex justify-end opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 ease-out">
                <div className="w-12 h-12 rounded-full border border-blue-600 bg-blue-600 flex items-center justify-center shadow-sm">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
        
      </div>
    </section>
  );
}
