"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as any },
};

export default function Services() {
  return (
    <>
      <Navbar />
      
      <main className="relative pt-32">
        <div className="grid-texture fixed inset-0 pointer-events-none z-0" />

        {/* HEADER */}
        <section className="relative px-6 md:px-12 z-10 mb-32">
          <div className="mx-auto max-w-[1440px]">
            <motion.div {...fadeInUp} className="flex items-center gap-4 mb-12">
              <span className="label-mono !text-[12px]">SZOLGÁLTATÁSOK</span>
            </motion.div>
            <motion.h1 
              {...fadeInUp}
              className="font-display text-[56px] md:text-[72px] text-primary max-w-[800px] leading-tight"
            >
              Három rendszer. <br /> Egy cél: növekedés.
            </motion.h1>
            <motion.p 
              {...fadeInUp}
              className="mt-12 font-ui text-[18px] text-secondary max-w-[580px] leading-[1.8]"
            >
              Nem csomagokat kínálunk. Minden projektet az üzleti eredményből visszafelé tervezünk.
            </motion.p>
          </div>
        </section>

        {/* DETAILED SERVICES */}
        <section className="relative z-10">
          {[
            {
              id: "01",
              title: "Prémium Webrendszerek",
              tech: "Next.js · TypeScript · Figma · Vercel",
              desc: "Egy weboldal csak akkor értékes, ha teljesít. Az Optimaai által fejlesztett webrendszerek nem csupán vizuálisan prémiumok — hanem a Google keresési eredményein is rangsorolnak, a látogatókat ügyfelekké konvertálják, és az üzleti infrastruktúra szerves részévé válnak.\n\nMinden projekt 100%-ban egyedi kódbázison épül. Nem Webflow, nem WordPress, nem sablon. A végeredmény egy olyan digitális eszköz, amely éveken át kiszolgálja a vállalkozást.",
              includes: [
                "Stratégiai UX és IA tervezés",
                "Egyedi vizuális design rendszer",
                "Next.js alapú fejlesztés (SSG/SSR)",
                "On-page SEO architektúra",
                "Teljesítmény optimalizáció (Core Web Vitals 95+)",
                "CMS integráció (ahol szükséges)",
                "Analytics és konverzió-tracking",
              ],
              when: "Ha a jelenlegi weboldalad nem rangsorol, nem konvertál, vagy nem képviseli méltóan a vállalkozásodat.",
            },
            {
              id: "02",
              title: "AI Automatizációs Rendszerek",
              tech: "Make · n8n · OpenAI · Zapier · Airtable",
              desc: "Az ismétlődő üzleti folyamatok manuális kezelése drága és lassú. Az Optimaai AI automatizációs rendszerei átveszik a rutinfeladatokat — a lead-kvalifikációtól az ajánlatgeneráláson át az ügyfélkommunikációig.\n\nAz eredmény: a csapatod a valóban fontos munkára koncentrálhat, miközben a rendszer 24 órában, 7 napon át dolgozik.",
              includes: [
                "Üzleti folyamat feltárás és optimalizáció",
                "Automatizált lead-kezelési rendszer",
                "AI-alapú ügyfélkommunikáció",
                "Ajánlat- és dokumentumgenerálás",
                "CRM integráció",
                "Teljesítmény-riportálás",
              ],
              when: "Ha manuálisan kezelsz olyan folyamatokat, amelyek automatizálhatók lennének, és ez idő- és pénzbe kerül.",
            },
            {
              id: "03",
              title: "Ingatlan Marketing Platformok",
              tech: "Next.js · Booking API · CRM · Meta Ads integráció",
              desc: "Az ingatlanpiac digitális értékesítése szakértelmet igényel — mind a technológia, mind a marketing oldalán. Az Optimaai ingatlan marketing platformjai az érdeklődő első érintkezési pontjától a szerződéskötésig végigkísérik a folyamatot.",
              includes: [
                "Property landing oldalak (fejlesztőknek)",
                "Direkt foglalási rendszerek (hospitality)",
                "Automatizált lead-kezelés és CRM",
                "Virtuális túra integráció",
                "SEO-optimalizált tartalom",
                "Meta és Google hirdetés landing oldal integráció",
              ],
              when: "Ha fejlesztőként vagy üzemeltetőként profi digitális jelenlétet akarsz az ingatlanpiacon.",
            },
          ].map((service) => (
            <div 
              key={service.id}
              className="w-full border-t border-border px-6 md:px-12 py-32"
            >
              <div className="mx-auto max-w-[1440px] grid grid-cols-1 lg:grid-cols-[30%_70%] gap-16 md:gap-24">
                {/* Left side */}
                <div className="flex flex-col gap-6">
                  <span className="font-display text-[48px] text-tertiary opacity-30">{service.id}</span>
                  <h2 className="font-display text-[40px] md:text-[48px] text-primary leading-tight">
                    {service.title}
                  </h2>
                  <div className="font-mono text-[11px] text-accent tracking-wider uppercase">
                    {service.tech}
                  </div>
                </div>

                {/* Right side */}
                <div className="flex flex-col">
                  <div className="font-ui text-[18px] text-secondary leading-[1.8] whitespace-pre-wrap mb-16">
                    {service.desc}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                      <h4 className="label-mono !text-[12px] tracking-widest">MI TARTOZIK BELE</h4>
                      <ul className="space-y-4">
                        {service.includes.map((item) => (
                          <li key={item} className="font-ui text-[15px] text-secondary flex items-start gap-4">
                            <span className="text-tertiary mt-1">—</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-surface p-8 border border-border-subtle rounded-sharp">
                      <h4 className="label-mono !text-[12px] tracking-widest">MIKOR AJÁNLJUK</h4>
                      <p className="font-ui text-[15px] text-secondary leading-relaxed italic">
                        „{service.when}”
                      </p>
                    </div>
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
