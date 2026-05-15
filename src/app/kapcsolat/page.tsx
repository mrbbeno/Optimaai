"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { cn } from "@/lib/utils";

const selectOptions = {
  systems: ["Weboldal / webrendszer", "AI automatizáció", "Ingatlan marketing platform"],
  situations: ["Még nincs weboldalam", "Van, de nem teljesít", "Meglévő rendszert bővítenék", "Új projekt, nulláról"],
  budgets: ["300 000 Ft alatt", "300 000 – 600 000 Ft", "600 000 – 1 500 000 Ft", "1 500 000 Ft felett", "Még nem tudom"],
  deadlines: ["Minél hamarabb", "1–2 hónapon belül", "3+ hónap múlva", "Még nincs konkrét határidő"]
};

const stepNames = ["KI VAGY?", "MI A PROJEKT?", "RÉSZLETEK", "UTOLSÓ SIMÍTÁSOK"];

export default function Contact() {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for back
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

  // Animation variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 40 : -40,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -40 : 40,
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
    <>
      <Navbar />
      
      <main className="relative pt-[160px] pb-32">
        <div className="grid-texture fixed inset-0 pointer-events-none z-0" />

        <div className="mx-auto max-w-[1440px] px-6 md:px-[64px] relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-[120px] items-start">
            
            {/* Left Column: Header + Info */}
            <div className="lg:sticky lg:top-[120px] flex flex-col order-2 lg:order-1">
              {/* Header inside left column for alignment */}
              <div className="flex flex-col mb-20">
                <span className="font-mono text-[11px] text-tertiary tracking-[0.15em] uppercase">KAPCSOLAT</span>
                <h1 className="mt-4 font-display text-[64px] md:text-[72px] font-[800] text-primary leading-[1.0] tracking-[-0.02em]">
                  Írj nekünk.
                </h1>
                <p className="mt-6 font-ui text-[17px] font-[300] text-secondary leading-[1.75] max-w-[520px]">
                  Nem telefonon dolgozunk — írásban pontosabb, gyorsabb és mindenki számára kényelmesebb. Töltsd ki az űrlapot, és 3–5 munkanapon belül részletes választ kapsz.
                </p>
              </div>

              <div className="flex flex-col border-t border-border">
                {[
                  { 
                    id: "01", 
                    title: "Töltsd ki az űrlapot", 
                    desc: "Minél több részletet adsz meg, annál pontosabb választ tudunk adni." 
                  },
                  { 
                    id: "02", 
                    title: "Mi átnézzük", 
                    desc: "Minden megkeresést egyenként olvasunk el. 3–5 munkanapon belül válaszolunk." 
                  },
                  { 
                    id: "03", 
                    title: "Emailben egyeztetünk", 
                    desc: "Ha a projekt összetettebb, rövid videóhívást is ajánlhatunk — de ez mindig opcionális, soha nem kötelező." 
                  }
                ].map((step) => (
                  <div key={step.id} className="grid grid-cols-[40px_1fr] py-[28px] border-b border-border gap-4">
                    <span className="font-mono text-[11px] text-tertiary">{step.id}</span>
                    <div className="flex flex-col gap-1">
                      <span className="font-ui text-[14px] font-[500] text-primary">{step.title}</span>
                      <span className="font-ui text-[13px] font-[300] text-secondary leading-relaxed">{step.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-12">
                <a href="mailto:info@optimaai.eu" className="font-mono text-[13px] text-accent hover:underline underline-offset-4">
                  info@optimaai.eu
                </a>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="order-1 lg:order-2">
              <AnimatePresence mode="wait">
                {status === "sent" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col pt-12"
                  >
                    <h2 className="font-display text-[56px] font-[800] text-primary">Megkaptuk.</h2>
                    <p className="mt-6 font-ui text-[16px] font-[300] text-secondary leading-[1.75]">
                      3–5 munkanapon belül írunk a megadott <br />
                      email címre. Addig is, nézd meg munkáinkat.
                    </p>
                    <Link href="/munkak" className="mt-8 text-accent font-mono text-[13px] hover:underline underline-offset-4 flex items-center gap-2">
                      Munkáink megtekintése →
                    </Link>
                  </motion.div>
                ) : (
                  <div key="form-container" className="w-full">
                    
                    {/* Progress Indicator */}
                    <div className="flex flex-col mb-[56px]">
                      <div className="flex justify-end mb-2">
                        <span className="font-mono text-[11px] text-tertiary">{currentStep} / 4</span>
                      </div>
                      <div className="flex items-center relative h-8">
                        {[1, 2, 3, 4].map((step, idx) => (
                          <div key={step} className={cn("flex items-center", idx < 3 ? "flex-1" : "")}>
                            <div className="relative flex flex-col items-center">
                              <div 
                                className={cn(
                                  "w-2 h-2 rounded-full transition-colors duration-500",
                                  currentStep >= step ? "bg-accent" : "bg-border"
                                )}
                              />
                              {currentStep === step && (
                                <span className="absolute top-5 font-mono text-[10px] text-tertiary tracking-[0.1em] whitespace-nowrap">
                                  {stepNames[idx]}
                                </span>
                              )}
                            </div>
                            {idx < 3 && (
                              <div className="h-[1px] flex-1 bg-border relative">
                                <motion.div 
                                  className="absolute inset-0 bg-accent origin-left"
                                  initial={false}
                                  animate={{ scaleX: currentStep > step ? 1 : 0 }}
                                  transition={{ duration: 0.6, ease: "easeInOut" }}
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="relative min-h-[400px]">
                      <AnimatePresence mode="wait" custom={direction} initial={false}>
                        <motion.div
                          key={currentStep}
                          custom={direction}
                          variants={variants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ 
                            x: { duration: direction === 0 ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] },
                            opacity: { duration: 0.25 }
                          }}
                          className="w-full"
                        >
                          {currentStep === 1 && (
                            <div className="flex flex-col">
                              <h2 className="font-display text-[36px] font-[700] text-primary mb-[40px]">Először ismerkedjünk meg.</h2>
                              <div className="flex flex-col gap-[40px]">
                                <div className="flex flex-col">
                                  <label className="font-mono text-[10px] text-tertiary tracking-[0.12em] uppercase mb-[10px]">NEVED</label>
                                  <input 
                                    type="text" 
                                    placeholder="Teljes neved"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className={cn(
                                      "bg-transparent border-b border-border py-4 font-ui text-[16px] font-[300] text-primary outline-none focus:border-accent transition-colors",
                                      errors.name && "border-red-500/50"
                                    )}
                                  />
                                  {errors.name && <span className="font-mono text-[11px] text-[#E05A5A] mt-2">{errors.name}</span>}
                                </div>
                                <div className="flex flex-col">
                                  <label className="font-mono text-[10px] text-tertiary tracking-[0.12em] uppercase mb-[10px]">EMAIL CÍM</label>
                                  <input 
                                    type="email" 
                                    placeholder="ahova válaszolhatunk"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className={cn(
                                      "bg-transparent border-b border-border py-4 font-ui text-[16px] font-[300] text-primary outline-none focus:border-accent transition-colors",
                                      errors.email && "border-red-500/50"
                                    )}
                                  />
                                  {errors.email && <span className="font-mono text-[11px] text-[#E05A5A] mt-2">{errors.email}</span>}
                                </div>
                                <div className="flex flex-col">
                                  <label className="font-mono text-[10px] text-tertiary tracking-[0.12em] uppercase mb-[10px]">CÉG / PROJEKT</label>
                                  <input 
                                    type="text" 
                                    placeholder="Ha van — ha nincs, hagyd üresen"
                                    value={formData.project}
                                    onChange={(e) => setFormData({...formData, project: e.target.value})}
                                    className="bg-transparent border-b border-border py-4 font-ui text-[16px] font-[300] text-primary outline-none focus:border-accent transition-colors"
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                          {currentStep === 2 && (
                            <div className="flex flex-col">
                              <h2 className="font-display text-[36px] font-[700] text-primary mb-[40px]">Mit szeretnél felépíteni?</h2>
                              <div className="flex flex-col">
                                <label className="font-mono text-[10px] text-tertiary tracking-[0.12em] uppercase mb-[10px]">RENDSZER TÍPUSA</label>
                                <div className="flex flex-col gap-[10px] mt-2">
                                  {selectOptions.systems.map(opt => (
                                    <button
                                      key={opt}
                                      type="button"
                                      onClick={() => toggleSystem(opt)}
                                      className={cn(
                                        "border px-6 py-[14px] font-ui text-[14px] transition-all rounded-[4px] text-left w-full",
                                        formData.selectedSystems.includes(opt)
                                          ? "border-accent text-primary bg-accent-subtle"
                                          : "border-border text-secondary hover:border-[#444]"
                                      )}
                                    >
                                      {opt}
                                    </button>
                                  ))}
                                </div>
                              </div>
                              <div className="flex flex-col mt-[40px]">
                                <label className="font-mono text-[10px] text-tertiary tracking-[0.12em] uppercase mb-[10px]">JELENLEGI HELYZET</label>
                                <div className="flex flex-col gap-[10px] mt-2">
                                  {selectOptions.situations.map(opt => (
                                    <button
                                      key={opt}
                                      type="button"
                                      onClick={() => setFormData({...formData, situation: opt})}
                                      className={cn(
                                        "border px-6 py-[14px] font-ui text-[14px] transition-all rounded-[4px] text-left w-full",
                                        formData.situation === opt
                                          ? "border-accent text-primary bg-accent-subtle"
                                          : "border-border text-secondary hover:border-[#444]"
                                      )}
                                    >
                                      {opt}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                          {currentStep === 3 && (
                            <div className="flex flex-col">
                              <h2 className="font-display text-[36px] font-[700] text-primary mb-[40px]">Még két gyors kérdés.</h2>
                              <div className="flex flex-col">
                                <label className="font-mono text-[10px] text-tertiary tracking-[0.12em] uppercase mb-[10px]">TERVEZETT BÜDZSÉ</label>
                                <div className="flex flex-col gap-[10px] mt-2">
                                  {selectOptions.budgets.map(opt => (
                                    <button
                                      key={opt}
                                      type="button"
                                      onClick={() => setFormData({...formData, budget: opt})}
                                      className={cn(
                                        "border px-6 py-[14px] font-ui text-[14px] transition-all rounded-[4px] text-left w-full",
                                        formData.budget === opt
                                          ? "border-accent text-primary bg-accent-subtle"
                                          : "border-border text-secondary hover:border-[#444]"
                                      )}
                                    >
                                      {opt}
                                    </button>
                                  ))}
                                </div>
                              </div>
                              <div className="flex flex-col mt-[40px]">
                                <label className="font-mono text-[10px] text-tertiary tracking-[0.12em] uppercase mb-[10px]">MIKOR KELLENE?</label>
                                <div className="flex flex-col gap-[10px] mt-2">
                                  {selectOptions.deadlines.map(opt => (
                                    <button
                                      key={opt}
                                      type="button"
                                      onClick={() => setFormData({...formData, deadline: opt})}
                                      className={cn(
                                        "border px-6 py-[14px] font-ui text-[14px] transition-all rounded-[4px] text-left w-full",
                                        formData.deadline === opt
                                          ? "border-accent text-primary bg-accent-subtle"
                                          : "border-border text-secondary hover:border-[#444]"
                                      )}
                                    >
                                      {opt}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                          {currentStep === 4 && (
                            <div className="flex flex-col">
                              <h2 className="font-display text-[36px] font-[700] text-primary mb-[40px]">Majdnem kész.</h2>
                              <div className="flex flex-col">
                                <label className="font-mono text-[10px] text-tertiary tracking-[0.12em] uppercase mb-[10px]">EGYÉB RÉSZLETEK (OPCIONÁLIS)</label>
                                <textarea 
                                  rows={5}
                                  placeholder="Bármi, amit fontosnak tartasz — kontextus, inspiráció, kérdések."
                                  value={formData.details}
                                  onChange={(e) => setFormData({...formData, details: e.target.value})}
                                  className="w-full bg-surface border border-border p-5 font-ui text-[15px] font-[300] text-primary outline-none focus:border-accent transition-all resize-none rounded-[4px]"
                                />
                              </div>

                              <div className="mt-[40px] border border-border rounded-[4px] p-6 bg-surface">
                                <span className="font-mono text-[10px] text-tertiary tracking-[0.12em] block mb-4">ÖSSZEFOGLALÁS</span>
                                <div className="flex flex-col">
                                  {[
                                    { label: "Neved", value: formData.name },
                                    { label: "Email", value: formData.email },
                                    { label: "Rendszer", value: formData.selectedSystems.join(", ") },
                                    { label: "Helyzet", value: formData.situation },
                                    { label: "Büdzsé", value: formData.budget },
                                    { label: "Határidő", value: formData.deadline }
                                  ].map((item) => (
                                    <div key={item.label} className="grid grid-cols-[100px_1fr] py-3 border-b border-border-subtle last:border-0">
                                      <span className="font-mono text-[11px] text-tertiary">{item.label}</span>
                                      <span className={cn("font-ui text-[13px]", !item.value ? "text-tertiary" : "text-primary")}>
                                        {item.value || "—"}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Navigation Buttons */}
                          <div className="mt-12 flex justify-between items-center w-full">
                            <div>
                              {currentStep > 1 && (
                                <button
                                  type="button"
                                  onClick={prevStep}
                                  className="font-ui text-[14px] text-tertiary hover:text-secondary transition-colors"
                                >
                                  ← Vissza
                                </button>
                              )}
                            </div>
                            
                            <button
                              type={currentStep === 4 ? "submit" : "button"}
                              onClick={currentStep === 4 ? undefined : nextStep}
                              disabled={!isStepValid(currentStep) || status === "sending"}
                              className={cn(
                                "border border-accent-border text-accent font-ui text-[14px] font-[500] py-[14px] px-[32px] rounded-[4px] transition-all duration-220",
                                !isStepValid(currentStep) ? "opacity-[0.35] cursor-not-allowed" : "hover:bg-accent hover:text-bg"
                              )}
                            >
                              {currentStep === 4 ? (status === "sending" ? "Küldés..." : "Elküldés →") : "Tovább →"}
                            </button>
                          </div>

                          {currentStep === 4 && (
                            <p className="mt-8 font-mono text-[10px] text-tertiary text-center leading-relaxed">
                              Az adataidat kizárólag a projekt-egyeztetéshez használjuk. <br />
                              Soha nem adjuk át harmadik félnek.
                            </p>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </form>
                  </div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
