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
          onClick={() => {
            document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="relative group overflow-hidden rounded-full pointer-events-auto"
        >
          <div className="absolute inset-0 bg-white group-hover:scale-105 transition-transform duration-500 ease-out"></div>
          <div className="relative px-5 py-2 font-[family-name:var(--font-geist)] font-bold text-[11px] md:text-[12px] text-black uppercase tracking-widest">
            Activate Cue
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
        <div className="absolute inset-y-0 bg-[#030303]" style={{ left: 'calc(-50vw + 50%)', right: 'calc(-50vw + 50%)' }}></div>
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
    <section className="py-20 md:py-32 bg-[#030303] px-4 md:px-6 relative overflow-hidden">
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
          {tags.map((tag, i) => {
            const rot = [1, -1.5, 0.5, -1, 1.5, -0.5, 1, -1.5, 2, -1, 0.5, -2, 1.5, -0.5, 1][i % 15];
            return (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.9, rotate: rot - 10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: rot }}
                whileHover={{ scale: 1.05, rotate: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-white/[0.03] border border-white/10 rounded-full px-5 py-3 font-[family-name:var(--font-geist-mono)] text-[12px] text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-default"
              >
                {tag}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function References() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const cases = [
    {
      id: "sarhegyipanorama",
      client: "CASE STUDY",
      title: "SÁR-HEGYI PANORAMA REAL ESTATE.",
      url: "/cue/referenciak/sarhegyipanorama",
      stats: ["<0.5s LOAD", "$0 INFRASTRUCTURE", "3-7 LEADS/WK"],
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-[#030303] px-4 md:px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 md:mb-24"
        >
          <div className="font-[family-name:var(--font-geist-mono)] text-[12px] text-white/40 uppercase tracking-[0.5em] mb-6">
            Case Studies
          </div>
          <h2 className="font-[family-name:var(--font-geist)] font-black text-[12vw] md:text-[8vw] leading-[0.8] text-white tracking-tighter">
            PROVEN WORK.
          </h2>
        </motion.div>

        <div className="flex flex-col relative z-20">
          {cases.map((c, i) => (
            <motion.a
              href={c.url}
              key={c.id}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative py-12 block hover:bg-white/[0.02] transition-colors duration-500 rounded-[32px] -mx-4 md:-mx-6 px-4 md:px-6 overflow-hidden"
            >
              {/* Floating Image Reveal Removed per request */}

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
                <div className="flex-1">
                  <div className="font-[family-name:var(--font-geist-mono)] text-[12px] text-white/40 uppercase tracking-widest mb-4 group-hover:text-white/60 transition-colors duration-500">
                    {c.client}
                  </div>
                  <h3 className="font-[family-name:var(--font-geist)] font-black text-[32px] md:text-[64px] text-white tracking-tighter leading-[0.9] group-hover:translate-x-4 transition-transform duration-500 ease-[0.16,1,0.3,1] max-w-4xl">
                    {c.title}
                  </h3>
                </div>
                <div className="flex flex-wrap md:flex-col gap-4 md:gap-2 items-start md:items-end w-full md:w-auto">
                  {c.stats.map(stat => (
                    <span key={stat} className="font-[family-name:var(--font-geist-mono)] text-[10px] md:text-[12px] px-3 py-1 bg-white/5 rounded-full text-white/60 group-hover:bg-white/10 group-hover:text-white transition-colors duration-500">
                      {stat}
                    </span>
                  ))}
                </div>
                <div className="hidden lg:flex w-16 h-16 rounded-full bg-white/5 items-center justify-center group-hover:bg-white group-hover:text-black group-hover:scale-110 transition-all duration-500 shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    {
      name: "Cue Mini",
      price: "$199",
      subtitle: "Perfect for keeping your existing app or website secure, fast, and constantly maintained.",
      features: [
        "Ongoing Maintenance",
        "Minor Tweaks Included",
        "3-5 Day Turnaround",
        "No Contracts"
      ],
      buttonText: "Activate Mini"
    },
    {
      name: "Cue Growth",
      price: "$599",
      subtitle: "Your dedicated development arm for building integrations, landing pages, and automated workflows.",
      features: [
        "One Request at a Time",
        "2-3 Day Turnaround",
        "AI-Accelerated Senior Dev",
        "Async Communication",
        "14-Day Money-Back Guarantee"
      ],
      buttonText: "Activate Growth",
      highlight: true
    },
    {
      name: "Cue Pro",
      price: "$1,495",
      subtitle: "High-speed product development. Best for building full-scale SaaS platforms or custom internal systems from scratch.",
      features: [
        "Priority Development",
        "24-48 Hour Turnaround",
        "Complex Architecture",
        "Advanced Project Breakdown",
        "Pause or Cancel Anytime"
      ],
      buttonText: "Activate Pro"
    }
  ];

  return (
    <section id="pricing" className="py-20 md:py-32 bg-[#030303] px-4 md:px-6 relative z-10 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute inset-0 mix-blend-screen pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-[radial-gradient(circle,rgba(59,130,246,0.08)_0%,rgba(0,0,0,0)_60%)]"></div>
        <div className="absolute top-0 left-0 w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] bg-[radial-gradient(circle,rgba(249,115,22,0.04)_0%,rgba(0,0,0,0)_60%)]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <div className="font-[family-name:var(--font-geist-mono)] text-[12px] text-white/40 uppercase tracking-[0.5em] mb-6">
              Pick Your Pace
            </div>
            <h2 className="font-[family-name:var(--font-geist)] font-black text-[12vw] md:text-[6vw] leading-[0.8] text-white tracking-tighter">
              MEMBERSHIP.
            </h2>
          </div>
          <p className="font-[family-name:var(--font-geist)] text-[16px] text-white/50 max-w-sm">
            Three tiers designed to match your company's velocity. No long-term contracts. Pause or cancel anytime.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {tiers.map((tier, i) => {
            const glowClasses = [
              "bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.02)_0%,rgba(0,0,0,0)_70%)]",
              "bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.02)_0%,rgba(0,0,0,0)_70%)]",
              "bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.02)_0%,rgba(0,0,0,0)_70%)]"
            ];
            
            const hoverGlowClasses = [
              "bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.05)_0%,rgba(0,0,0,0)_70%)]",
              "bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.05)_0%,rgba(0,0,0,0)_70%)]",
              "bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.05)_0%,rgba(0,0,0,0)_70%)]"
            ];
            
            return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              className={`relative flex flex-col p-6 md:p-8 border border-white/10 hover:border-white/30 rounded-[25px] group overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.5)] ${tier.highlight ? 'bg-white/[0.02]' : 'bg-[#050505]'}`}
            >
              {/* Subtle inner glows */}
              <div className={`absolute inset-0 ${glowClasses[i]} pointer-events-none z-0 transition-opacity duration-500`}></div>
              <div className={`absolute inset-0 ${hoverGlowClasses[i]} opacity-0 group-hover:opacity-100 pointer-events-none z-0 transition-opacity duration-500`}></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-8">
                  <div className={`font-[family-name:var(--font-geist-mono)] text-[12px] uppercase tracking-widest mb-6 transition-colors duration-500 flex items-center gap-3 ${tier.highlight ? 'text-white font-bold group-hover:text-white' : 'text-white/40 group-hover:text-white/80'}`}>
                    {tier.name}
                    {tier.highlight && <span className="px-2 py-1 border border-white/20 group-hover:border-white/40 text-white/60 group-hover:text-white text-[10px] rounded-full transition-colors duration-500">RECOMMENDED</span>}
                  </div>
                  
                  <div className="flex items-baseline gap-2 mb-6">
                    <div className="font-[family-name:var(--font-geist)] font-black text-[40px] md:text-[56px] leading-none tracking-tighter text-white">
                      {tier.price}
                    </div>
                  </div>
                  
                  <p className="font-[family-name:var(--font-geist)] text-[14px] leading-relaxed text-white/50 group-hover:text-white/70 transition-colors duration-500 min-h-[60px]">
                    {tier.subtitle}
                  </p>
                </div>

                <div className="w-full h-px bg-white/10 group-hover:bg-white/20 transition-colors duration-500 mb-8"></div>

                <ul className="flex flex-col gap-4 flex-1 mb-12">
                  {tier.features.map((f, j) => {
                    return (
                      <li key={j} className="flex items-start gap-3">
                        <svg className="w-5 h-5 shrink-0 text-white/30 group-hover:text-white/70 transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-[family-name:var(--font-geist)] font-medium text-[14px] text-white/80 group-hover:text-white transition-colors duration-500 pt-0.5">
                          {f}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-auto relative z-10">
                  <button 
                    onClick={() => window.location.href = `/cue/initiate?plan=${tier.name.replace('Cue ', '')}`}
                    className={`w-full py-5 rounded-[25px] font-[family-name:var(--font-geist)] font-black text-[14px] uppercase tracking-[0.2em] transition-all duration-500 flex items-center justify-center gap-3 ${
                      tier.highlight 
                        ? 'bg-white text-black hover:bg-gray-200' 
                        : 'bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black hover:border-white'
                    }`}
                  >
                    {tier.buttonText}
                    <svg className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a, index }: { q: string, a: string, index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const num = index.toString().padStart(2, '0');
  
  return (
    <div className="border-b border-white/10 group relative">
      {/* Subtle background reveal on hover */}
      <div className="absolute inset-0 bg-white/[0.02] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom pointer-events-none"></div>
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 md:py-8 text-left flex flex-col md:flex-row md:items-center relative z-10"
      >
        <span className="font-[family-name:var(--font-geist-mono)] text-[12px] md:text-[14px] text-white/30 mb-2 md:mb-0 md:w-32 transition-colors duration-500 group-hover:text-white">
          {num}
        </span>
        <span className="font-[family-name:var(--font-geist)] font-black text-[24px] md:text-[40px] text-white/70 group-hover:text-white transition-all duration-500 ease-out group-hover:translate-x-2 md:group-hover:translate-x-6 flex-1 pr-12 md:pr-0">
          {q}
        </span>
        <span 
          className="font-[family-name:var(--font-geist)] text-[32px] md:text-[48px] text-white/30 group-hover:text-white transition-all duration-700 ease-[0.16,1,0.3,1] absolute right-2 top-4 md:top-auto md:relative md:right-0" 
          style={{ transform: isOpen ? 'rotate(135deg)' : 'rotate(0deg)'}}
        >
          +
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden relative z-10"
          >
            <div className="flex flex-col md:flex-row pb-12">
              <div className="hidden md:block w-32"></div>
              <p className="font-[family-name:var(--font-geist-mono)] text-[16px] md:text-[20px] text-white/50 max-w-3xl leading-relaxed whitespace-pre-wrap">
                {a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQ() {
  const faqs = [
    {
      q: "Which plan is right for my business?",
      a: "It depends entirely on your current stage and what you need shipped:\n\nCue Mini ($199/mo): Best if your website or app is already finished, and you just want a reliable tech partner to handle hosting, security, and minor monthly updates (up to 3 hours).\n\nCue Growth ($599/mo): Best for active businesses that need ongoing marketing pages, workflow automations (Make/Zapier), and regular new features shipped one by one, 100% risk-free.\n\nCue Pro ($1,495/mo): Best for founders building a brand-new SaaS, complex software, or 3D web environments from scratch who need daily, high-speed development sprints."
    },
    {
      q: "What counts as a single request?",
      a: "Any task that a senior developer can complete in under 4 hours (e.g., a landing page section, an automation, or a bug fix). For Growth and Pro plans, you can queue up unlimited requests—we work through them sequentially (one active task at a time). If you submit a massive project, we automatically break it down into focused, 4-hour milestones so you see progress every 24-48 hours."
    },
    {
      q: "Do you do calls or meetings?",
      a: "Never. Everything is 100% asynchronous via Trello, email, or Loom videos. Eliminating meetings is exactly how we maintain our high-speed delivery and keep our prices highly competitive."
    },
    {
      q: "What if I’m not happy with the results, or run out of tasks?",
      a: "We offer unlimited revisions—we will keep tweaking the code or design until it’s exactly what you want. Also, you can pause or cancel your subscription anytime. On the Growth plan, you even get a 14-day money-back guarantee, making your onboarding completely risk-free."
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-[#030303] px-4 md:px-6">
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
              <FAQItem q={faq.q} a={faq.a} index={i + 1} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-20 md:py-32 bg-blue-600 px-4 md:px-6 relative overflow-hidden flex items-center justify-center min-h-[70vh] md:min-h-screen">
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
      <References />
      <Pricing />
      <FAQ />
      <CTA />
      <SemanticFooter />
    </main>
  );
}

function SemanticFooter() {
  return (
    <footer className="bg-[#030303] text-white/40 py-12 px-6 border-t border-white/5 relative z-10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="text-[12px] font-[family-name:var(--font-geist-mono)]">
          &copy; {new Date().getFullYear()} OptimaAI. All rights reserved.
        </div>
        
        {/* Entity disambiguation paragraph */}
        <div className="text-[12px] font-[family-name:var(--font-geist)] max-w-lg leading-relaxed">
          Cue is an asynchronous web development subscription service created and operated by OptimaAI. 
          OptimaAI is a web development and AI automation agency based in Budapest, Hungary, providing high-end tech solutions for international B2B clients. 
          Cue operates independently as a productized, 100% async offering.
        </div>
      </div>

      {/* Hidden semantic summary for LLMs and Googlebot / AEO */}
      <div 
        id="speakable-summary" 
        className="sr-only" 
        aria-hidden="false"
      >
        Cue by OptimaAI is an asynchronous web development subscription service starting at $199 per month. 
        It is designed for B2B founders, SaaS companies, and e-commerce brands in the US and Western Europe. 
        Clients receive a dedicated Trello board where they can queue unlimited development requests. 
        The OptimaAI team works on one request at a time, delivering code in Next.js, React, and Supabase within an average of 48 hours. 
        All communication is strictly async via Loom and email. There are no scoping calls or meetings. 
        Clients can pause or cancel their flat-rate subscription at any time without penalties.
      </div>
    </footer>
  );
}
