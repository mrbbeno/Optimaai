"use client";

import { motion } from "framer-motion";
import { Monitor, Cpu, Workflow } from "lucide-react";

const services = [
  {
    id: "01",
    title: "Prémium Weboldalak",
    description: "Elfelejtheted a lassú és sebezhető WordPress oldalakat. Olyan modern felületeket fejlesztünk, amelyek tökéletesen futnak mobilon, a Google kereső első helyeire lőnek, és beépített, dinamikus árkalkulátorokkal azonnal kiszolgálják az érdeklődőket.",
    icon: <Monitor className="w-5 h-5" />,
    badge: "Next.js & React"
  },
  {
    id: "02",
    title: "AI & Automatizáció",
    description: "24/7-ben működő AI-megoldások, amelyek emberi beavatkozás nélkül kezelik a bejövő leadeket. Automatikus válaszok az ügyfelek összetett kérdéseire, intelligens kiértékelés, és azonnali adatfeldolgozás mesterséges intelligenciával.",
    icon: <Cpu className="w-5 h-5" />,
    badge: "OpenAI & Claude"
  },
  {
    id: "03",
    title: "Üzleti Automatizációk",
    description: "Összekötjük a naptárad, a számlázód (pl. Billingo), az e-mail rendszered és a CRM-ed. Ha egy ügyfél foglal, a rendszer magától küldi a visszaigazolást, kiállítja a díjbekérőt, beírja a naptárba, és hónapokkal később visszahívja a régi vendéget.",
    icon: <Workflow className="w-5 h-5" />,
    badge: "CRM & API"
  }
];

export default function ServiceCards() {
  return (
    <section id="szolgaltatasok" className="px-6 md:px-12 py-32 bg-background relative z-10">
      <div className="mx-auto max-w-[1200px]">
        
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground mb-4">
            Szolgáltatásaink.
          </h2>
          <p className="text-lg text-muted-foreground max-w-[800px]">
            Eszközök és rendszerek, amelyekkel skálázhatóvá és modernné tesszük a vállalkozásodat.
          </p>
        </div>

        {/* Shadcn Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
            >
              
              {/* Card Header */}
              <div className="flex flex-col space-y-1.5 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-blue-600">
                    {service.icon}
                  </div>
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full">
                    {service.badge}
                  </span>
                </div>
                <h3 className="font-semibold leading-none tracking-tight text-xl">
                  {service.title}
                </h3>
              </div>
              
              {/* Card Content */}
              <div className="p-6 pt-0 flex-1">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
