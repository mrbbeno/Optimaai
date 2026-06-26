"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6 mix-blend-difference pointer-events-none"
    >
      <div className="pointer-events-auto bg-black/20 backdrop-blur-2xl border border-white/10 rounded-full px-5 py-2 flex items-center justify-between w-full max-w-6xl shadow-2xl">
        <div className="flex items-center gap-2">
          <span className="font-[family-name:var(--font-geist)] font-extrabold text-[14px] md:text-[16px] text-white tracking-widest">CUE</span>
          <span className="font-[family-name:var(--font-geist)] font-medium text-[10px] md:text-[12px] text-white/50 tracking-widest uppercase">by OPTIMAAI</span>
        </div>
        <button 
          onClick={() => window.location.href = "/cue/initiate"}
          className="relative group overflow-hidden rounded-full"
        >
          <div className="absolute inset-0 bg-white group-hover:scale-105 transition-transform duration-500 ease-out"></div>
          <div className="relative px-5 py-2 font-[family-name:var(--font-geist)] font-bold text-[11px] md:text-[12px] text-black uppercase tracking-widest">
            Initiate
          </div>
        </button>
      </div>
    </motion.nav>
  );
}

function StickyHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Hero Text Animations
  const textScale = useTransform(scrollYProgress, [0, 0.1], [1, 4]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.05, 0.1], [1, 0.5, 0]);
  const textFilter = useTransform(scrollYProgress, [0, 0.1], ["blur(0px)", "blur(20px)"]);
  
  // Subheadline comes in
  const deliveredScale = useTransform(scrollYProgress, [0.1, 0.3, 0.9], [0.8, 1, 2]);
  const deliveredOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="h-[200vh] relative bg-[#030303]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        
        {/* Glows */}
        <motion.div 
          className="absolute inset-0 mix-blend-screen"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0]) }}
        >
          {/* Main Blue Glow (Center) */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12)_0%,rgba(0,0,0,0)_50%)] pointer-events-none"></div>
          {/* Left Orange Glow (Smaller) */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_50%,rgba(249,115,22,0.06)_0%,rgba(0,0,0,0)_30%)] pointer-events-none"></div>
          {/* Right Yellow Glow (Smaller) */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_50%,rgba(234,179,8,0.06)_0%,rgba(0,0,0,0)_30%)] pointer-events-none"></div>
        </motion.div>

        {/* Phase 1: DEV WORK */}
        <motion.div 
          className="absolute text-center flex flex-col items-center z-10 w-full px-4 md:px-6"
          style={{ scale: textScale, opacity: textOpacity, filter: textFilter }}
        >
          <div className="font-[family-name:var(--font-geist-mono)] text-[10px] md:text-[12px] text-white/40 tracking-[0.3em] md:tracking-[0.5em] uppercase mb-4 md:mb-8">
            Async Subscription
          </div>
          <h1 className="font-[family-name:var(--font-geist)] font-black text-[20vw] md:text-[12vw] leading-[0.8] tracking-tighter text-white">
            DEV WORK.
          </h1>
        </motion.div>

        {/* Phase 2: DELIVERED */}
        <motion.div 
          className="absolute text-center z-20 w-full px-4 md:px-6 flex justify-center items-center"
          style={{ scale: deliveredScale, opacity: deliveredOpacity }}
        >
          <h2 className="font-[family-name:var(--font-geist)] font-black text-[8vw] md:text-[6vw] leading-[0.9] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 whitespace-nowrap">
            DELIVERED<br/>IN 48H.
          </h2>
        </motion.div>

      </div>
    </section>
  );
}

function StickyProcess() {
  const steps = [
    { num: "01", title: "SUBSCRIBE.", desc: "Pay once. Infinite requests." },
    { num: "02", title: "REQUEST.", desc: "Drop a task. We code." },
    { num: "03", title: "RECEIVE.", desc: "Delivered async. Repeat." }
  ];

  return (
    <section id="process" className="pt-32 md:pt-64 pb-16 max-w-5xl mx-auto px-4 md:px-6 relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="mb-16 md:mb-24 text-center sticky top-[10vh] md:top-[12vh] z-10"
      >
        <h2 className="font-[family-name:var(--font-geist)] font-black text-[18vw] md:text-[8vw] text-white tracking-tighter leading-none">
          PROCESS.
        </h2>
      </motion.div>
      
      <div className="flex flex-col gap-4 md:gap-6 relative z-30">
        {steps.map((step, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="sticky w-full top-[calc(25vh+var(--stack-mobile))] md:top-[calc(36vh+var(--stack-desktop))]"
            style={{ 
              "--stack-mobile": `${i * 20}px`,
              "--stack-desktop": `${i * 40}px` 
            } as React.CSSProperties}
          >
            {/* The Card */}
            <div className="bg-[#050505] border border-white/10 rounded-[24px] md:rounded-[32px] p-6 md:p-16 shadow-[0_-20px_40px_rgba(0,0,0,0.8)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-10 overflow-hidden relative">
              {/* Subtle top glow on the card edge */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
              
              <div className="font-[family-name:var(--font-geist)] font-black text-[60px] md:text-[140px] leading-none text-white/[0.03] select-none">
                {step.num}
              </div>
              
              <div className="flex-1 w-full text-left md:text-right">
                <h3 className="font-[family-name:var(--font-geist)] font-black text-[32px] md:text-[64px] text-white tracking-tighter leading-[0.9] mb-4 md:mb-6">
                  {step.title}
                </h3>
                <p className="font-[family-name:var(--font-geist-mono)] text-[16px] md:text-[28px] text-white/50 tracking-tight">
                  {step.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Solid background block that acts as a wiper to erase the PROCESS text from bottom to top */}
      <div className="h-[20vh] w-full relative z-20">
        <div className="absolute inset-y-0 left-[-50vw] right-[-50vw] bg-[#030303]"></div>
      </div>
    </section>
  );
}

function Scope() {
  const tags = [
    "Landing pages", "API integrations", "Auth flows", 
    "Admin dashboards", "Email templates", "Performance", 
    "Database schemas", "Webhooks", "UI components", 
    "SEO optimization", "Form logic", "Cron jobs", 
    "Complex animations", "Stripe", "Supabase"
  ];

  return (
    <section className="py-24 md:py-40 bg-[#030303] px-4 md:px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 md:gap-20">
        <div className="w-full lg:w-1/2">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="font-[family-name:var(--font-geist)] font-black text-[40px] md:text-[72px] text-white tracking-tighter leading-[0.9] mb-6 md:mb-8">
              ANYTHING IN CODE.
            </h2>
            <p className="font-[family-name:var(--font-geist)] text-[16px] md:text-[20px] text-white/50 max-w-md">
              Each request is a single focused deliverable. Larger ideas get broken into 48-hour chunks. We build until it's done.
            </p>
          </motion.div>
        </div>
        
        <div className="w-full lg:w-1/2 flex flex-wrap gap-4 content-start">
          {tags.map((tag, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white/[0.03] border border-white/10 rounded-full px-5 py-3 font-[family-name:var(--font-geist-mono)] text-[12px] text-white/60 hover:text-white hover:bg-white/10 transition-all cursor-default"
            >
              {tag}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-40 bg-[#0a0a0a] px-4 md:px-6 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 md:gap-20">
        
        {/* Left: The CUE Black Card */}
        <div className="w-full lg:w-1/2 flex justify-center order-2 lg:order-1">
          <motion.div 
            initial={{ opacity: 0, y: 50, rotateX: 10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="w-full max-w-[500px] relative rounded-none overflow-visible shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
            style={{ perspective: "2000px" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/Card.png" alt="CUE Membership Card" className="w-full h-auto block pointer-events-none" />
          </motion.div>
        </div>

        {/* Right: The Brutalist Pricing Text */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center order-1 lg:order-2">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-8 md:mb-12"
          >
            <div className="font-[family-name:var(--font-geist-mono)] text-[10px] md:text-[12px] text-white/40 uppercase tracking-widest mb-4">
              Monthly Retainer
            </div>
            <div className="flex items-baseline gap-2 md:gap-4 mb-2">
              <div className="font-[family-name:var(--font-geist)] font-black text-[48px] md:text-[80px] text-white leading-none tracking-tighter">
                $2,495
              </div>
              <div className="font-[family-name:var(--font-geist-mono)] text-[12px] md:text-[16px] text-white/30 uppercase tracking-widest">
                / Month
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            style={{ transformOrigin: "left" }}
            className="w-full h-px bg-white/10 mb-12"
          ></motion.div>
          
          <ul className="flex flex-col gap-6 mb-16">
            {[
              "One active request at a time",
              "Avg. 48 hour delivery",
              "Unlimited projects & repositories",
              "Pause or cancel anytime"
            ].map((f, i) => (
              <motion.li 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: "-100px" }}
                className="flex items-center gap-6"
              >
                <span className="font-[family-name:var(--font-geist-mono)] text-[12px] text-white/20">0{i + 1}</span>
                <span className="font-[family-name:var(--font-geist)] text-[18px] md:text-[20px] text-white/80 tracking-tight">{f}</span>
              </motion.li>
            ))}
          </ul>
          
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-50px" }}
            onClick={() => window.location.href = "/cue/initiate"}
            className="w-full bg-white text-black hover:bg-gray-200 transition-colors py-6 font-[family-name:var(--font-geist)] font-black text-[16px] tracking-widest uppercase flex items-center justify-center gap-4 rounded-[25px]"
          >
            Activate Cue
          </motion.button>
        </div>

      </div>
    </section>
  );
}

function FAQItem({ q, a }: { q: string, a: string }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-white/10">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 text-left flex justify-between items-center group"
      >
        <span className="font-[family-name:var(--font-geist)] font-bold text-[18px] md:text-[24px] text-white/70 group-hover:text-white transition-colors">
          {q}
        </span>
        <span className="font-[family-name:var(--font-geist)] text-[32px] text-white/30 group-hover:text-white transition-colors" style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)'}}>
          +
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="font-[family-name:var(--font-geist-mono)] text-[14px] md:text-[16px] text-white/40 pb-8 max-w-3xl leading-relaxed">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQ() {
  const faqs = [
    {
      q: "What counts as one request?",
      a: "Any task a senior dev can complete in under 4 hours. Larger work gets broken into focused steps automatically."
    },
    {
      q: "Do you do calls or meetings?",
      a: "Never. Everything is async — Trello, email, or Loom. This is how we maintain our speed and low prices."
    },
    {
      q: "What if I'm not happy with the result?",
      a: "We do revisions until it's exactly what you want. No questions asked."
    },
    {
      q: "Can I pause my subscription?",
      a: "Yes. If you don't have enough tasks for a full month, just pause and resume when you're ready."
    }
  ];

  return (
    <section className="py-24 md:py-40 bg-[#030303] px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="font-[family-name:var(--font-geist)] font-black text-[40px] md:text-[72px] text-white tracking-tighter leading-none mb-10 md:mb-16"
        >
          FAQ.
        </motion.h2>
        <div>
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <FAQItem q={faq.q} a={faq.a} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-24 md:py-40 bg-blue-600 px-4 md:px-6 relative overflow-hidden flex items-center justify-center min-h-[70vh] md:min-h-screen">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,rgba(0,0,0,0)_70%)] mix-blend-overlay pointer-events-none"></div>
      
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="text-center relative z-10 w-full max-w-5xl"
      >
        <h2 className="font-[family-name:var(--font-geist)] font-black text-[18vw] md:text-[12vw] leading-[0.8] tracking-tighter text-white uppercase break-words mb-8 md:mb-10">
          STOP WAITING.
        </h2>
        <button 
          onClick={() => window.location.href = "/cue/initiate"}
          className="bg-black text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-[family-name:var(--font-geist)] font-bold text-[14px] md:text-[18px] uppercase tracking-widest hover:scale-105 transition-transform duration-300 shadow-2xl"
        >
          Activate Cue
        </button>
      </motion.div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="bg-[#030303] selection:bg-blue-500/30 selection:text-white min-h-screen">
      <Navbar />
      <StickyHero />
      <StickyProcess />
      <Scope />
      <Pricing />
      <FAQ />
      <CTA />
    </main>
  );
}
