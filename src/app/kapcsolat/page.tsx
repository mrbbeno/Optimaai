"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const selectOptions = {
  systems: ["Weboldal / webrendszer", "AI automatizáció", "Üzleti automatizáció"],
  situations: ["Még nincs weboldalam", "Van, de nem teljesít", "Meglévő rendszert bővítenék", "Új projekt, nulláról"],
  budgets: ["300 000 Ft alatt", "300 000 – 600 000 Ft", "600 000 – 1 500 000 Ft", "1 500 000 Ft felett", "Még nem tudom"],
  deadlines: ["Minél hamarabb", "1–2 hónapon belül", "3+ hónap múlva", "Még nincs konkrét határidő"]
};

const stepNames = ["Alapadatok", "Projekt célja", "Részletek", "Összegzés"];

export default function ContactPage() {
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
      if (!formData.project) newErrors.project = "A cég/projekt nevének megadása kötelező";
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
      x: direction > 0 ? 20 : -20,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -20 : 20,
      opacity: 0
    })
  };

  const isStepValid = (step: number) => {
    if (step === 1) {
      return formData.name.length > 0 && /\S+@\S+\.\S+/.test(formData.email) && formData.project.length > 0;
    }
    return true;
  };

  // Common Shadcn-style classes
  const inputClass = "flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";
  const labelClass = "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2.5 block";
  const optionButtonClass = "flex items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground transition-all cursor-pointer text-sm font-medium";
  const optionSelectedClass = "border-primary bg-primary/5 text-primary";

  return (
    <>
      <Navbar />
      
      <main className="relative pt-[160px] pb-32 bg-background min-h-screen">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
            
            {/* Left Column: Header + Info */}
            <div className="flex flex-col order-2 lg:order-1 lg:sticky lg:top-32">
              <div className="flex flex-col mb-12">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-[1.1] tracking-tight">
                  Készen állsz a <br className="hidden lg:block"/>
                  <span className="font-serif italic font-bold text-blue-600">szintlépésre?</span>
                </h1>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-[480px]">
                  Töltsd ki a rövid projekt-kalkulátort, és 24 órán belül egyedi, személyre szabott technológiai ajánlattal jelentkezünk. Nem telefonálgatunk.
                </p>
              </div>

              <div className="flex flex-col gap-8">
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
                  <div key={step.id} className="flex gap-5 items-start">
                    <div className="w-10 h-10 rounded-full border border-border bg-background flex items-center justify-center shrink-0 font-mono text-sm font-medium text-foreground">
                      {step.id}
                    </div>
                    <div className="flex flex-col pt-2">
                      <span className="font-semibold text-foreground">{step.title}</span>
                      <span className="text-sm text-muted-foreground leading-relaxed mt-1">{step.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground mb-1">Vagy írj közvetlenül:</p>
                <a href="mailto:info@optimaai.eu" className="font-medium text-foreground hover:text-primary transition-colors">
                  info@optimaai.eu
                </a>
              </div>
            </div>

            {/* Right Column: Shadcn Form Card */}
            <div className="order-1 lg:order-2 w-full">
              <div className="rounded-xl border bg-card text-card-foreground shadow-sm min-h-[600px] flex flex-col">
                
                <div className="p-6 md:p-10 flex-1 flex flex-col">
                  <AnimatePresence mode="wait">
                    {status === "sent" ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center text-center h-full flex-1 pt-10"
                      >
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                          <CheckCircle2 className="w-8 h-8 text-primary" />
                        </div>
                        <h2 className="text-2xl font-semibold tracking-tight mb-2">Sikeres küldés!</h2>
                        <p className="text-muted-foreground leading-relaxed max-w-sm mb-8">
                          24 órán belül jelentkezünk a megadott email címen a részletekkel.
                        </p>
                        <a href="/" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-8">
                          Vissza a főoldalra
                        </a>
                      </motion.div>
                    ) : (
                      <div key="form-container" className="w-full flex-1 flex flex-col">
                        
                        {/* Shadcn Progress Indicator */}
                        <div className="mb-10">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium tracking-tight">Lépés {currentStep} a 4-ből</span>
                            <span className="text-sm text-muted-foreground">{stepNames[currentStep - 1]}</span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                            <div 
                              className="h-full bg-primary transition-all duration-500 ease-in-out" 
                              style={{ width: `${(currentStep / 4) * 100}%` }}
                            />
                          </div>
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
                                <div className="space-y-6">
                                  <div>
                                    <h3 className="text-xl font-semibold tracking-tight mb-1">Alapadatok</h3>
                                    <p className="text-sm text-muted-foreground">Kérlek, add meg az elérhetőségeidet a kapcsolatfelvételhez.</p>
                                  </div>
                                  
                                  <div className="space-y-4 pt-4">
                                    <div className="space-y-2">
                                      <label className={labelClass}>Név</label>
                                      <input 
                                        type="text" 
                                        placeholder="Kovács János"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className={cn(inputClass, errors.name && "border-destructive focus-visible:ring-destructive")}
                                      />
                                      {errors.name && <p className="text-[0.8rem] font-medium text-destructive">{errors.name}</p>}
                                    </div>
                                    <div className="space-y-2">
                                      <label className={labelClass}>Email cím</label>
                                      <input 
                                        type="email" 
                                        placeholder="janos@ceged.hu"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        className={cn(inputClass, errors.email && "border-destructive focus-visible:ring-destructive")}
                                      />
                                      {errors.email && <p className="text-[0.8rem] font-medium text-destructive">{errors.email}</p>}
                                    </div>
                                    <div className="space-y-2">
                                      <label className={labelClass}>Cég vagy projekt neve</label>
                                      <input 
                                        type="text" 
                                        placeholder="Cég Kft."
                                        value={formData.project}
                                        onChange={(e) => setFormData({...formData, project: e.target.value})}
                                        className={cn(inputClass, errors.project && "border-destructive focus-visible:ring-destructive")}
                                      />
                                      {errors.project && <p className="text-[0.8rem] font-medium text-destructive">{errors.project}</p>}
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* STEP 2 */}
                              {currentStep === 2 && (
                                <div className="space-y-6">
                                  <div>
                                    <h3 className="text-xl font-semibold tracking-tight mb-1">Mire lenne szükséged?</h3>
                                    <p className="text-sm text-muted-foreground">Válaszd ki azokat a területeket, amikben segíteni tudunk.</p>
                                  </div>
                                  
                                  <div className="space-y-6 pt-4">
                                    <div className="space-y-3">
                                      <label className={labelClass}>Rendszer típusa (több is választható)</label>
                                      <div className="grid grid-cols-1 gap-2">
                                        {selectOptions.systems.map(opt => {
                                          const isSelected = formData.selectedSystems.includes(opt);
                                          return (
                                            <div
                                              key={opt}
                                              onClick={() => toggleSystem(opt)}
                                              className={cn(optionButtonClass, isSelected && optionSelectedClass)}
                                            >
                                              <span>{opt}</span>
                                              <div className={cn("w-4 h-4 rounded border flex items-center justify-center", isSelected ? "border-primary bg-primary text-primary-foreground" : "border-primary/20")}>
                                                {isSelected && <CheckCircle2 className="w-3 h-3" />}
                                              </div>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>

                                    <div className="space-y-3">
                                      <label className={labelClass}>Jelenlegi helyzet</label>
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {selectOptions.situations.map(opt => {
                                          const isSelected = formData.situation === opt;
                                          return (
                                            <div
                                              key={opt}
                                              onClick={() => setFormData({...formData, situation: opt})}
                                              className={cn(optionButtonClass, isSelected && optionSelectedClass)}
                                            >
                                              <span>{opt}</span>
                                              <div className={cn("w-4 h-4 rounded-full border flex items-center justify-center", isSelected ? "border-primary" : "border-primary/20")}>
                                                {isSelected && <div className="w-2 h-2 rounded-full bg-primary" />}
                                              </div>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* STEP 3 */}
                              {currentStep === 3 && (
                                <div className="space-y-6">
                                  <div>
                                    <h3 className="text-xl font-semibold tracking-tight mb-1">Keretek és időzítés</h3>
                                    <p className="text-sm text-muted-foreground">Segít nekünk, ha látjuk a projekt sarokszámait.</p>
                                  </div>
                                  
                                  <div className="space-y-6 pt-4">
                                    <div className="space-y-3">
                                      <label className={labelClass}>Tervezett büdzsé</label>
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {selectOptions.budgets.map(opt => {
                                          const isSelected = formData.budget === opt;
                                          return (
                                            <div
                                              key={opt}
                                              onClick={() => setFormData({...formData, budget: opt})}
                                              className={cn(optionButtonClass, isSelected && optionSelectedClass)}
                                            >
                                              <span>{opt}</span>
                                              <div className={cn("w-4 h-4 rounded-full border flex items-center justify-center", isSelected ? "border-primary" : "border-primary/20")}>
                                                {isSelected && <div className="w-2 h-2 rounded-full bg-primary" />}
                                              </div>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>

                                    <div className="space-y-3">
                                      <label className={labelClass}>Tervezett indulás</label>
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {selectOptions.deadlines.map(opt => {
                                          const isSelected = formData.deadline === opt;
                                          return (
                                            <div
                                              key={opt}
                                              onClick={() => setFormData({...formData, deadline: opt})}
                                              className={cn(optionButtonClass, isSelected && optionSelectedClass)}
                                            >
                                              <span>{opt}</span>
                                              <div className={cn("w-4 h-4 rounded-full border flex items-center justify-center", isSelected ? "border-primary" : "border-primary/20")}>
                                                {isSelected && <div className="w-2 h-2 rounded-full bg-primary" />}
                                              </div>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* STEP 4 */}
                              {currentStep === 4 && (
                                <div className="space-y-6">
                                  <div>
                                    <h3 className="text-xl font-semibold tracking-tight mb-1">Utolsó simítások</h3>
                                    <p className="text-sm text-muted-foreground">Bármi, amit megosztanál velünk előzetesen.</p>
                                  </div>
                                  
                                  <div className="space-y-6 pt-4">
                                    <div className="space-y-2">
                                      <label className={labelClass}>Egyéb megjegyzés, linkek, elképzelések</label>
                                      <textarea 
                                        rows={4}
                                        placeholder="Ide írhatod a részleteket..."
                                        value={formData.details}
                                        onChange={(e) => setFormData({...formData, details: e.target.value})}
                                        className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                      />
                                    </div>

                                    <div className="rounded-lg border bg-muted/50 p-4">
                                      <h4 className="text-sm font-semibold mb-3">Összefoglalás</h4>
                                      <dl className="space-y-2 text-sm">
                                        {[
                                          { label: "Név", value: formData.name },
                                          { label: "Email", value: formData.email },
                                          { label: "Igény", value: formData.selectedSystems.join(", ") },
                                          { label: "Büdzsé", value: formData.budget }
                                        ].map((item) => (
                                          <div key={item.label} className="flex justify-between items-center pb-2 border-b border-border/50 last:border-0 last:pb-0">
                                            <dt className="text-muted-foreground">{item.label}:</dt>
                                            <dd className="font-medium text-right max-w-[60%] truncate">
                                              {item.value || "Nincs megadva"}
                                            </dd>
                                          </div>
                                        ))}
                                      </dl>
                                    </div>
                                  </div>
                                </div>
                              )}

                            </motion.div>
                          </AnimatePresence>

                          {/* Navigation Buttons (Shadcn style) */}
                          <div className="mt-8 pt-6 border-t flex justify-between items-center w-full">
                            {currentStep > 1 ? (
                              <button
                                type="button"
                                onClick={prevStep}
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                              >
                                Vissza
                              </button>
                            ) : <div />}
                            
                            <button
                              type={currentStep === 4 ? "submit" : "button"}
                              onClick={currentStep === 4 ? undefined : nextStep}
                              disabled={!isStepValid(currentStep) || status === "sending"}
                              className={cn(
                                "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2",
                                !isStepValid(currentStep) && "opacity-50 cursor-not-allowed"
                              )}
                            >
                              {currentStep === 4 ? (status === "sending" ? "Küldés folyamatban..." : "Ajánlatkérés elküldése") : "Következő lépés"}
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
        </div>
      </main>

      <Footer />
    </>
  );
}
