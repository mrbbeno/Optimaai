"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function RoiCalculator() {
  const [hours, setHours] = useState(15);
  const [teamSize, setTeamSize] = useState(5);

  // Math logic:
  // Assuming automation saves 70% of manual work.
  // Weekly hours saved = hours * teamSize * 0.7
  // Yearly hours saved = weekly * 52
  // Value = yearly hours * 8000 HUF (approx hourly cost)
  
  const savedWeekly = hours * teamSize * 0.7;
  const savedYearly = Math.round(savedWeekly * 52);
  const savedMoney = savedYearly * 8000;
  
  // Format money: e.g. 15 000 000 Ft
  const formattedMoney = new Intl.NumberFormat('hu-HU', { 
    style: 'currency', 
    currency: 'HUF', 
    maximumFractionDigits: 0 
  }).format(savedMoney);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
      className="shad-card p-6 md:p-8 flex flex-col gap-8 bg-white/95 backdrop-blur-xl shadow-2xl shadow-blue-900/5 border-border/60 relative overflow-hidden w-full max-w-[500px] ml-auto pointer-events-auto"
    >
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="relative z-10">
        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">Automatizációs ROI Kalkulátor</h3>
        <p className="text-sm text-muted-foreground mt-1">Számold ki, mennyi erőforrást szabadíthat fel egy egyedi rendszer.</p>
      </div>

      <div className="flex flex-col gap-6 relative z-10">
        {/* Slider 1 */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-end">
            <label className="text-sm font-semibold text-foreground">Heti manuális adminisztráció / fő</label>
            <span className="text-lg font-bold text-blue-600">{hours} óra</span>
          </div>
          <input 
            type="range" 
            min="1" max="40" 
            value={hours} 
            onChange={(e) => setHours(Number(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        {/* Slider 2 */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-end">
            <label className="text-sm font-semibold text-foreground">Csapat mérete</label>
            <span className="text-lg font-bold text-blue-600">{teamSize} fő</span>
          </div>
          <input 
            type="range" 
            min="1" max="50" 
            value={teamSize} 
            onChange={(e) => setTeamSize(Number(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>
      </div>

      <div className="bg-muted/40 p-6 rounded-xl flex flex-col gap-5 border border-border/50 relative z-10">
        <div>
          <div className="text-sm font-semibold text-muted-foreground mb-1 uppercase tracking-wider">Éves szinten felszabaduló idő*</div>
          <div className="text-3xl font-bold text-foreground">{savedYearly.toLocaleString('hu-HU')} óra</div>
        </div>
        <div className="h-px w-full bg-border/50"></div>
        <div>
          <div className="text-sm font-semibold text-muted-foreground mb-1 uppercase tracking-wider">Becsült pénzügyi megtakarítás</div>
          <div className="text-3xl font-bold text-green-600">{formattedMoney}</div>
        </div>
      </div>

      <p className="text-[11px] text-muted-foreground leading-tight relative z-10">
        *A kalkuláció átlagos, 70%-os folyamat-automatizálási rátával és 8000 Ft-os teljes munkáltatói órabérköltséggel számol. A valós eredmények a projekt specifikációjától függnek.
      </p>
    </motion.div>
  );
}
