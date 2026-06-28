"use client";

import { useState, Suspense, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

function InitiateContent() {
  const searchParams = useSearchParams();
  const initialPlan = searchParams.get("plan") || "Growth";
  
  const [formData, setFormData] = useState({ name: "", email: "", plan: initialPlan });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Update formData if the URL query parameter changes
  useEffect(() => {
    const planFromUrl = searchParams.get("plan");
    if (planFromUrl && ["Mini", "Growth", "Pro"].includes(planFromUrl)) {
      setFormData(prev => ({ ...prev, plan: planFromUrl }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/cue/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit request.");
      }

      setStatus("success");
    } catch (error: any) {
      console.error(error);
      setStatus("error");
      setErrorMessage(error.message || "An unexpected error occurred.");
    }
  };

  if (status === "success") {
    return (
      <main className="bg-[#030303] min-h-screen flex items-center justify-center px-6 selection:bg-white selection:text-black">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl text-center"
        >
          <h1 className="font-[family-name:var(--font-geist)] font-black text-[40px] md:text-[64px] text-white tracking-tighter leading-none mb-4 md:mb-6">
            ACTIVATED.
          </h1>
          <p className="font-[family-name:var(--font-geist-mono)] text-[16px] md:text-[20px] text-white/50 mb-12 max-w-lg mx-auto leading-relaxed">
            Your request has been received. Please check your inbox for the onboarding link and next steps.
          </p>
          <a 
            href="/cue#pricing"
            className="inline-block border border-white/20 text-white hover:bg-white hover:text-black transition-colors px-10 py-5 rounded-[25px] font-[family-name:var(--font-geist)] font-bold text-[14px] uppercase tracking-widest"
          >
            Return Home
          </a>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="bg-[#030303] min-h-[100dvh] lg:h-[100dvh] overflow-x-hidden overflow-y-auto lg:overflow-hidden flex flex-col px-6 md:px-12 py-8 md:py-12 selection:bg-white selection:text-black relative">
      
      {/* Background ambient light */}
      <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-orange-600/5 blur-[150px] rounded-full pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none mix-blend-screen"></div>

      <div className="w-full max-w-[1600px] mx-auto relative z-10 flex flex-col h-full flex-1">
        
        {/* Nav / Back */}
        <div className="flex justify-between items-start mb-12 md:mb-16">
          <motion.a 
            href="/cue#pricing"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-4 text-white/50 hover:text-white transition-colors font-[family-name:var(--font-geist-mono)] text-[12px] uppercase tracking-widest"
          >
            <span>←</span> CUE
          </motion.a>
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-[family-name:var(--font-geist-mono)] text-[12px] uppercase tracking-widest text-white/30 text-right flex flex-col gap-1"
          >
            <span>Available slots</span>
            <span className="text-white text-[16px] font-bold">02</span>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center flex-1">
          
          {/* Left: Massive Typography */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <h1 className="font-[family-name:var(--font-geist)] font-black text-[56px] md:text-[100px] lg:text-[120px] xl:text-[140px] text-white tracking-tighter leading-[0.85] uppercase mb-6 md:mb-8">
              Initiate <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">Sequence.</span>
            </h1>
            <p className="font-[family-name:var(--font-geist-mono)] text-[12px] md:text-[14px] text-white/40 leading-relaxed max-w-sm uppercase tracking-widest">
              High-speed, asynchronous development. Fill out the details to secure your spot.
            </p>
          </motion.div>

          {/* Right: Brutalist Form */}
            <motion.form 
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col gap-8 md:gap-10 lg:pl-12 xl:pl-24 pb-12 lg:pb-0"
          >
            {/* Step 1 */}
            <div className="flex flex-col gap-4 relative group">
              <span className="font-[family-name:var(--font-geist-mono)] text-[10px] text-white/30 uppercase tracking-widest">01 / Plan</span>
              <div className="flex gap-3 md:gap-4">
                {["Mini", "Growth", "Pro"].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setFormData({ ...formData, plan: p })}
                    className={`flex-1 py-4 border rounded-[10px] font-[family-name:var(--font-geist)] font-bold text-[10px] md:text-[12px] uppercase tracking-widest transition-all duration-300 ${
                      formData.plan === p 
                        ? "border-white bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]" 
                        : "border-white/20 bg-transparent text-white/50 hover:border-white/50 hover:text-white"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col gap-2 relative group">
              <span className="font-[family-name:var(--font-geist-mono)] text-[10px] text-white/30 uppercase tracking-widest transition-colors group-focus-within:text-white">02 / Name</span>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-transparent border-b border-white/20 text-white text-[20px] md:text-[32px] font-[family-name:var(--font-geist)] font-medium py-3 focus:outline-none focus:border-white transition-colors placeholder-white/5"
                placeholder="John Doe"
              />
            </div>

            {/* Step 3 */}
            <div className="flex flex-col gap-2 relative group">
              <span className="font-[family-name:var(--font-geist-mono)] text-[10px] text-white/30 uppercase tracking-widest transition-colors group-focus-within:text-white">03 / Email</span>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent border-b border-white/20 text-white text-[20px] md:text-[32px] font-[family-name:var(--font-geist)] font-medium py-3 focus:outline-none focus:border-white transition-colors placeholder-white/5"
                placeholder="hello@example.com"
              />
            </div>

            {status === "error" && (
              <div className="text-red-500 font-[family-name:var(--font-geist-mono)] text-[12px] uppercase tracking-widest">
                {errorMessage}
              </div>
            )}

            {/* Submit */}
            <div className="pt-4">
              <button 
                type="submit"
                disabled={status === "loading"}
                className="w-full relative overflow-hidden group bg-white text-black py-6 rounded-[25px] font-[family-name:var(--font-geist)] font-black text-[14px] md:text-[16px] uppercase tracking-[0.2em] transition-all duration-500 disabled:opacity-50 flex justify-center items-center h-[80px] shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]"
              >
                <div className="absolute inset-0 bg-[#050505] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1] pointer-events-none z-0"></div>
                <span className="relative z-10 group-hover:text-white transition-colors duration-700 ease-[0.16,1,0.3,1] flex items-center gap-4">
                  {status === "loading" ? (
                    <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin group-hover:border-white/20 group-hover:border-t-white"></div>
                  ) : (
                    <>
                      Initialize <span className="text-[18px] group-hover:translate-x-2 transition-transform duration-500 ease-[0.16,1,0.3,1]">→</span>
                    </>
                  )}
                </span>
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </main>
  );
}

export default function InitiatePage() {
  return (
    <Suspense fallback={<main className="bg-[#030303] min-h-screen"></main>}>
      <InitiateContent />
    </Suspense>
  );
}
