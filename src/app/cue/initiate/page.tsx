"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function InitiatePage() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

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
          <h1 className="font-[family-name:var(--font-geist)] font-black text-[60px] md:text-[100px] text-white tracking-tighter leading-none mb-8">
            INITIATED.
          </h1>
          <p className="font-[family-name:var(--font-geist-mono)] text-[16px] md:text-[20px] text-white/50 mb-12 max-w-lg mx-auto leading-relaxed">
            Your request is in the queue. Check your email for next steps. We'll be in touch within 24 hours.
          </p>
          <a 
            href="/cue"
            className="inline-block border border-white/20 text-white hover:bg-white hover:text-black transition-colors px-10 py-5 rounded-[25px] font-[family-name:var(--font-geist)] font-bold text-[14px] uppercase tracking-widest"
          >
            Return Home
          </a>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="bg-[#030303] min-h-screen flex flex-col justify-center px-6 selection:bg-white selection:text-black relative overflow-hidden">
      
      {/* Background ambient light */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[150px] rounded-full pointer-events-none mix-blend-screen"></div>

      <div className="max-w-4xl mx-auto w-full relative z-10">
        <motion.a 
          href="/cue"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-4 text-white/50 hover:text-white transition-colors font-[family-name:var(--font-geist-mono)] text-[12px] uppercase tracking-widest mb-20"
        >
          <span>←</span> Back to CUE
        </motion.a>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-[family-name:var(--font-geist)] font-black text-[60px] md:text-[80px] text-white tracking-tighter leading-[0.9] mb-8">
              ACTIVATE <br/> CUE.
            </h1>
            <p className="font-[family-name:var(--font-geist-mono)] text-[16px] text-white/40 leading-relaxed max-w-sm">
              We take on a limited number of clients per month to ensure absolute quality and speed. Drop your details below to get started.
            </p>
          </motion.div>

          <motion.form 
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-10 justify-center"
          >
            <div className="relative group">
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-transparent border-b border-white/20 text-white text-[24px] md:text-[32px] font-[family-name:var(--font-geist)] pt-4 pb-4 focus:outline-none focus:border-white transition-colors peer placeholder-transparent"
                placeholder="Name"
                id="name"
              />
              <label 
                htmlFor="name" 
                className="absolute left-0 top-6 text-white/30 text-[24px] md:text-[32px] font-[family-name:var(--font-geist)] transition-all peer-focus:-top-4 peer-focus:text-[14px] peer-focus:text-white/60 peer-valid:-top-4 peer-valid:text-[14px] peer-valid:text-white/60 pointer-events-none"
              >
                What's your name?
              </label>
            </div>

            <div className="relative group">
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent border-b border-white/20 text-white text-[24px] md:text-[32px] font-[family-name:var(--font-geist)] pt-4 pb-4 focus:outline-none focus:border-white transition-colors peer placeholder-transparent"
                placeholder="Email"
                id="email"
              />
              <label 
                htmlFor="email" 
                className="absolute left-0 top-6 text-white/30 text-[24px] md:text-[32px] font-[family-name:var(--font-geist)] transition-all peer-focus:-top-4 peer-focus:text-[14px] peer-focus:text-white/60 peer-valid:-top-4 peer-valid:text-[14px] peer-valid:text-white/60 pointer-events-none"
              >
                What's your email?
              </label>
            </div>

            {status === "error" && (
              <div className="text-red-500 font-[family-name:var(--font-geist-mono)] text-[14px]">
                {errorMessage}
              </div>
            )}

            <button 
              type="submit"
              disabled={status === "loading"}
              className="mt-6 w-full bg-white text-black py-6 rounded-[25px] font-[family-name:var(--font-geist)] font-black text-[18px] uppercase tracking-widest hover:bg-gray-200 transition-colors disabled:opacity-50 flex justify-center items-center h-[76px]"
            >
              {status === "loading" ? (
                <div className="w-6 h-6 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
              ) : (
                "Submit Request"
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </main>
  );
}
