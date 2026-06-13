"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Ingyenes Konzultáció & Audit",
    description: "Átnézzük a jelenlegi weboldalad és belső folyamataid. Megkeressük, pontosan hol veszít időt és pénzt a vállalkozásod."
  },
  {
    num: "02",
    title: "Személyre Szabott Demó",
    description: "Nem látatlanban adunk ajánlatot. Összerakunk egy rövid, működő prototípust, hogy már a döntés előtt lásd a rendszert működés közben."
  },
  {
    num: "03",
    title: "Élesítés & Támogatás",
    description: "Kulcsrakészen átadjuk a platformot, majd folyamatos üzemeltetéssel biztosítjuk a háttérben a megbízható és stabil futást."
  }
];

export default function Process() {
  return (
    <section id="folyamat" className="px-6 md:px-12 py-32 bg-background relative z-10">
      <div className="mx-auto max-w-[1200px]">
        
        {/* Section Header */}
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Hogyan dolgozunk?
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Tudjuk, hogy a cégvezetők utálják a túlbonyolított, hónapokig tartó, átláthatatlan fejlesztéseket. Nálunk a folyamat pofonegyszerű és azonnali értéket ad.
          </p>
        </div>

        {/* Steps Container */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          
          {/* Decorative Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-[1px] bg-border z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.2, ease: "easeOut" }}
              className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left"
            >
              {/* Number Circle */}
              <div className="w-16 h-16 rounded-full bg-white border-2 border-blue-600 shadow-sm flex items-center justify-center text-xl font-bold text-blue-600 mb-8 mx-auto md:mx-0">
                {step.num}
              </div>

              {/* Text Content */}
              <h3 className="text-2xl font-semibold tracking-tight text-black mb-4">
                {step.title}
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
