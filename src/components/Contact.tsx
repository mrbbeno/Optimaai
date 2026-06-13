"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";

const selectOptions = {
  systems: ["Weboldal / webrendszer", "AI automatizáció", "Ingatlan marketing platform"],
  situations: ["Még nincs weboldalam", "Van, de nem teljesít", "Meglévő rendszert bővítenék", "Új projekt, nulláról"],
  budgets: ["300 000 Ft alatt", "300 000 – 600 000 Ft", "600 000 – 1 500 000 Ft", "1 500 000 Ft felett", "Még nem tudom"],
  deadlines: ["Minél hamarabb", "1–2 hónapon belül", "3+ hónap múlva", "Még nincs konkrét határidő"]
};

const stepNames = ["Alapadatok", "Projekt célja", "Részletek", "Összegzés"];

export default function Contact() {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project: "",
    selectedSystems: [] as string[],
    situation: "",
    budget: "",
    deadline: "",
    details: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleSystem = (system: string) => {
    setFormData(prev => ({
      ...prev,
      selectedSystems: prev.selectedSystems.includes(system)
        ? prev.selectedSystems.filter(s => s !== system)
        : [...prev.selectedSystems, system]
    }));
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.name) newErrors.name = "A név megadása kötelező";
      if (!formData.email) {
        newErrors.email = "Az email megadása kötelező";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Érvénytelen email formátum";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setDirection(1);
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setDirection(-1);
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    setStatus("sending");
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("sent");
      } else {
        throw new Error("Hiba a küldés során");
      }
    } catch (error) {
      console.error(error);
      alert("Valami hiba történt. Kérlek, próbáld meg később vagy írj közvetlenül a info@optimaai.eu címre.");
      setStatus("idle");
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 30 : -30,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -30 : 30,
      opacity: 0
    })
  };

  const isStepValid = (step: number) => {
    if (step === 1) {
      return formData.name.length > 0 && /\S+@\S+\.\S+/.test(formData.email);
    }
    return true;
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-slate-50 relative z-10 border-t border-border/40 overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-6 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Header + Info */}
          <div className="flex flex-col order-2 lg:order-1">
            <div className="flex flex-col mb-12">
              <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold tracking-widest uppercase w-fit mb-6 shadow-sm border border-blue-200">
                Kapcsolat
              </span>
              <h2 className="text-4xl md:text-6xl font-bold text-foreground leading-[1.1] tracking-tight">
                Készen állsz a <br className="hidden md:block"/>
                <span className="font-serif italic font-bold text-blue-600">szintlépésre?</span>
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-[480px]">
                Töltsd ki a rövid projekt-kalkulátort, és 24 órán belül egyedi, személyre szabott technológiai ajánlattal jelentkezünk. Nem telefonálgatunk.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {[
                { 
                  id: "01", 
                  title: "Mesélj a projektről", 
                  desc: "Pár kattintás, hogy lássuk, mire van szükséged." 
                },
                { 
                  id: "02", 
                  title: "Villámgyors elemzés", 
                  desc: "Átnézzük a helyzeted, és összerakjuk a tervet." 
                },
                { 
                  id: "03", 
                  title: "Konkrét javaslat", 
                  desc: "Küldjük az árakat és az ütemtervet 24 órán belül." 
                }
              ].map((step) => (
                <div key={step.id} className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-white border border-border shadow-sm flex items-center justify-center shrink-0 font-mono text-sm font-bold text-blue-600">
                    {step.id}
                  </div>
                  <div className="flex flex-col pt-1">
                    <span className="font-semibold text-foreground text-lg">{step.title}</span>
                    <span className="text-sm text-muted-foreground leading-relaxed">{step.desc}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 pt-12 border-t border-border">
              <p className="text-sm text-muted-foreground mb-2">Vagy írj közvetlenül:</p>
              <a href="mailto:info@optimaai.eu" className="font-mono text-xl font-semibold text-foreground hover:text-blue-600 transition-colors">
                info@optimaai.eu
              </a>
            </div>
          </div>

          {/* Right Column: Form Card */}
          <div className="order-1 lg:order-2 w-full">
            <div className="bg-white border border-border shadow-2xl shadow-black/[0.04] rounded-[2rem] p-8 md:p-12 relative overflow-hidden min-h-[640px] flex flex-col">
              
              <AnimatePresence mode="wait">
                {status === "sent" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center h-full flex-1 pt-10"
                  >
                    <div className="w-24 h-24 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mb-8">
                      <CheckCircle2 className="w-12 h-12 text-blue-600" />
                    </div>
                    <h2 className="text-4xl font-bold text-foreground tracking-tight mb-4">Sikeres küldés!</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-sm mb-10">
                      24 órán belül jelentkezünk a megadott email címen a részletekkel.
                    </p>
                    <button 
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                      className="bg-foreground text-background font-medium text-sm py-4 px-8 rounded-full transition-all hover:scale-105 hover:shadow-lg"
                    >
                      Vissza a főoldalra
                    </button>
                  </motion.div>
                ) : (
                  <div key="form-container" className="w-full flex-1 flex flex-col">
                    
                    {/* Minimal Progress Bar */}
                    <div className="flex items-center gap-2 mb-12">
                      {[1, 2, 3, 4].map((step) => (
                        <div 
                          key={step} 
                          className={cn(
                            "h-2 rounded-full transition-all duration-500",
                            currentStep === step ? "w-12 bg-blue-600" : currentStep > step ? "w-4 bg-blue-600" : "w-4 bg-slate-100"
                          )}
                        />
                      ))}
                      <span className="ml-auto font-mono text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-md">
                        {stepNames[currentStep - 1]}
                      </span>
                    </div>

                    <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                      <AnimatePresence mode="wait" custom={direction} initial={false}>
                        <motion.div
                          key={currentStep}
                          custom={direction}
                          variants={variants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                          className="w-full flex-1"
                        >
                          
                          {/* STEP 1 */}
                          {currentStep === 1 && (
                            <div className="flex flex-col h-full">
                              <h3 className="text-2xl font-bold text-foreground mb-8">Először ismerkedjünk meg.</h3>
                              <div className="flex flex-col gap-6">
                                <div className="flex flex-col">
                                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">Teljes Neved</label>
                                  <input 
                                    type="text" 
                                    placeholder="Kovács János"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className={cn(
                                      "w-full bg-slate-50 border border-border rounded-xl px-4 py-4 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 focus:bg-white transition-all shadow-sm",
                                      errors.name && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                    )}
                                  />
                                  {errors.name && <span className="font-mono text-xs text-red-500 mt-2">{errors.name}</span>}
                                </div>
                                <div className="flex flex-col">
                                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">Email Címed</label>
                                  <input 
                                    type="email" 
                                    placeholder="janos@ceged.hu"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className={cn(
                                      "w-full bg-slate-50 border border-border rounded-xl px-4 py-4 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 focus:bg-white transition-all shadow-sm",
                                      errors.email && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                    )}
                                  />
                                  {errors.email && <span className="font-mono text-xs text-red-500 mt-2">{errors.email}</span>}
                                </div>
                                <div className="flex flex-col">
                                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">Cég / Projekt (Opcionális)</label>
                                  <input 
                                    type="text" 
                                    placeholder="Ha van..."
                                    value={formData.project}
                                    onChange={(e) => setFormData({...formData, project: e.target.value})}
                                    className="w-full bg-slate-50 border border-border rounded-xl px-4 py-4 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 focus:bg-white transition-all shadow-sm"
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                          {/* STEP 2 */}
                          {currentStep === 2 && (
                            <div className="flex flex-col h-full">
                              <h3 className="text-2xl font-bold text-foreground mb-8">Mit szeretnél felépíteni?</h3>
                              
                              <div className="flex flex-col mb-8">
                                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Milyen rendszert keresel?</label>
                                <div className="grid grid-cols-1 gap-3">
                                  {selectOptions.systems.map(opt => (
                                    <button
                                      key={opt}
                                      type="button"
                                      onClick={() => toggleSystem(opt)}
                                      className={cn(
                                        "px-5 py-4 transition-all rounded-xl text-left w-full font-medium text-[15px] border",
                                        formData.selectedSystems.includes(opt)
                                          ? "border-blue-600 text-blue-700 bg-blue-50 ring-1 ring-blue-600/20"
                                          : "border-border text-muted-foreground hover:border-blue-300 hover:bg-slate-50 bg-white shadow-sm"
                                      )}
                                    >
                                      {opt}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <div className="flex flex-col">
                                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Jelenlegi helyzeted</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  {selectOptions.situations.map(opt => (
                                    <button
                                      key={opt}
                                      type="button"
                                      onClick={() => setFormData({...formData, situation: opt})}
                                      className={cn(
                                        "px-4 py-3 transition-all rounded-xl text-left w-full font-medium text-sm border",
                                        formData.situation === opt
                                          ? "border-blue-600 text-blue-700 bg-blue-50 ring-1 ring-blue-600/20"
                                          : "border-border text-muted-foreground hover:border-blue-300 hover:bg-slate-50 bg-white shadow-sm"
                                      )}
                                    >
                                      {opt}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* STEP 3 */}
                          {currentStep === 3 && (
                            <div className="flex flex-col h-full">
                              <h3 className="text-2xl font-bold text-foreground mb-8">Még két gyors kérdés.</h3>
                              
                              <div className="flex flex-col mb-8">
                                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Tervezett büdzsé</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  {selectOptions.budgets.map(opt => (
                                    <button
                                      key={opt}
                                      type="button"
                                      onClick={() => setFormData({...formData, budget: opt})}
                                      className={cn(
                                        "px-4 py-3 transition-all rounded-xl text-left w-full font-medium text-sm border",
                                        formData.budget === opt
                                          ? "border-blue-600 text-blue-700 bg-blue-50 ring-1 ring-blue-600/20"
                                          : "border-border text-muted-foreground hover:border-blue-300 hover:bg-slate-50 bg-white shadow-sm"
                                      )}
                                    >
                                      {opt}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <div className="flex flex-col">
                                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Mikorra kellene elkészülnie?</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  {selectOptions.deadlines.map(opt => (
                                    <button
                                      key={opt}
                                      type="button"
                                      onClick={() => setFormData({...formData, deadline: opt})}
                                      className={cn(
                                        "px-4 py-3 transition-all rounded-xl text-left w-full font-medium text-sm border",
                                        formData.deadline === opt
                                          ? "border-blue-600 text-blue-700 bg-blue-50 ring-1 ring-blue-600/20"
                                          : "border-border text-muted-foreground hover:border-blue-300 hover:bg-slate-50 bg-white shadow-sm"
                                      )}
                                    >
                                      {opt}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* STEP 4 */}
                          {currentStep === 4 && (
                            <div className="flex flex-col h-full">
                              <h3 className="text-2xl font-bold text-foreground mb-8">Majdnem kész.</h3>
                              
                              <div className="flex flex-col mb-8">
                                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Egyéb részletek (opcionális)</label>
                                <textarea 
                                  rows={4}
                                  placeholder="Bármi, amit fontosnak tartasz..."
                                  value={formData.details}
                                  onChange={(e) => setFormData({...formData, details: e.target.value})}
                                  className="w-full bg-slate-50 border border-border rounded-xl p-4 text-sm text-foreground outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 focus:bg-white transition-all resize-none shadow-sm"
                                />
                              </div>

                              <div className="border border-border rounded-xl p-5 bg-slate-50 shadow-sm">
                                <span className="font-mono text-[10px] text-muted-foreground tracking-widest block mb-4 uppercase font-bold">Összefoglalás</span>
                                <div className="flex flex-col gap-2">
                                  {[
                                    { label: "Név", value: formData.name },
                                    { label: "Email", value: formData.email },
                                    { label: "Rendszer", value: formData.selectedSystems.join(", ") },
                                    { label: "Büdzsé", value: formData.budget }
                                  ].map((item) => (
                                    <div key={item.label} className="flex justify-between items-center text-sm border-b border-border/50 pb-2 last:border-0 last:pb-0">
                                      <span className="text-muted-foreground">{item.label}</span>
                                      <span className="font-medium text-foreground text-right max-w-[60%] truncate">
                                        {item.value || "—"}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                        </motion.div>
                      </AnimatePresence>

                      {/* Navigation Buttons */}
                      <div className="mt-auto pt-8 flex justify-between items-center w-full">
                        {currentStep > 1 ? (
                          <button
                            type="button"
                            onClick={prevStep}
                            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
                          >
                            <ArrowLeft className="w-4 h-4" /> Vissza
                          </button>
                        ) : <div />}
                        
                        <button
                          type={currentStep === 4 ? "submit" : "button"}
                          onClick={currentStep === 4 ? undefined : nextStep}
                          disabled={!isStepValid(currentStep) || status === "sending"}
                          className={cn(
                            "flex items-center gap-2 font-semibold text-sm py-3 px-8 rounded-full transition-all duration-200",
                            !isStepValid(currentStep) 
                              ? "bg-muted text-muted-foreground cursor-not-allowed" 
                              : "bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5"
                          )}
                        >
                          {currentStep === 4 ? (status === "sending" ? "Küldés..." : "Elküldés") : "Tovább"}
                          {currentStep !== 4 && <ArrowRight className="w-4 h-4" />}
                        </button>
                      </div>

                    </form>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
