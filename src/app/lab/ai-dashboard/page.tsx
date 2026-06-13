"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Cpu, Database, Network, Activity, RefreshCw } from "lucide-react";

// Helper component for counting up numbers
function DigitalCounter({ target, duration = 1.5, suffix = "" }: { target: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = target;
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 20);
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

export default function AiDashboardPage() {
  const [activeTab, setActiveTab] = useState<"cluster" | "logs">("cluster");
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const logs = [
    { time: "17:59:42", level: "INFO", msg: "Model engine parameters synchronized successfully." },
    { time: "17:59:43", level: "WARN", msg: "Damping coefficient exceeded threshold. Correcting..." },
    { time: "17:59:45", level: "INFO", msg: "Node connections recalculated: 15 active nodes." },
    { time: "17:59:47", level: "INFO", msg: "Low power mode checks verified. System stable." },
  ];

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-[#1D1D1F] font-sans pb-24">
      {/* Top Navbar */}
      <header className="sticky top-0 w-full z-40 h-16 flex items-center justify-between px-6 bg-white/80 border-b border-neutral-200/40 backdrop-blur-md">
        <Link href="/lab" className="flex items-center gap-2 font-mono text-[11px] tracking-wider text-neutral-500 hover:text-neutral-900 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Lab
        </Link>
        <div className="flex items-center gap-4">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-[10px] tracking-widest uppercase">
            OPTIMA ENGINE STACK
          </span>
        </div>
      </header>

      {/* Main Grid Content */}
      <main className="max-w-[1200px] mx-auto px-6 mt-12 flex flex-col gap-10">
        
        {/* Title block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-neutral-200/40 pb-6">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400">Node telemetry portal</span>
            <h1 className="text-[36px] font-bold tracking-tight text-neutral-950">AI Agent Console</h1>
          </div>
          <button 
            onClick={handleRefresh}
            className="flex items-center gap-2 font-mono text-[11px] py-2 px-4 rounded-xl border border-neutral-200 bg-white shadow-2xs hover:bg-neutral-50 cursor-pointer text-neutral-600 transition-all active:scale-98"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
            Sync Metrics
          </button>
        </div>

        {/* 1. KEY STATS ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Active Threads", value: 34, icon: Cpu, suffix: "", desc: "Real-time task solvers" },
            { label: "Data Pipeline", value: 92, icon: Database, suffix: "%", desc: "Throughput efficiency" },
            { label: "Total Nodes", value: 15, icon: Network, suffix: "", desc: "Virtual mesh elements" },
            { label: "Processor load", value: 48, icon: Activity, suffix: "%", desc: "GPU core distribution" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white border border-neutral-200/50 rounded-2xl p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between h-[140px]"
            >
              <div className="flex justify-between items-center text-neutral-400">
                <span className="font-mono text-[10px] uppercase tracking-wider">{stat.label}</span>
                <stat.icon className="w-4 h-4 text-neutral-500" />
              </div>
              <div className="flex flex-col gap-0.5 mt-2">
                <span className="text-[32px] font-bold tracking-tight text-neutral-950">
                  <DigitalCounter target={stat.value} suffix={stat.suffix} />
                </span>
                <span className="font-sans text-[11px] text-neutral-400 font-light">{stat.desc}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 2. DYNAMIC WORKSPACE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Visualization Center */}
          <div className="bg-white border border-neutral-200/50 rounded-2xl p-6 lg:col-span-2 shadow-2xs flex flex-col justify-between min-h-[350px]">
            <div className="flex justify-between items-center border-b border-neutral-100 pb-3">
              <span className="font-sans font-medium text-[15px] text-neutral-950">Connection Matrix</span>
              <div className="flex gap-2">
                <button 
                  onClick={() => setActiveTab("cluster")}
                  className={`py-1 px-3 rounded-lg text-[10px] font-mono transition-colors cursor-pointer ${activeTab === "cluster" ? "bg-neutral-950 text-white" : "bg-neutral-50 text-neutral-500 hover:bg-neutral-100"}`}
                >
                  CLUSTER MAP
                </button>
                <button 
                  onClick={() => setActiveTab("logs")}
                  className={`py-1 px-3 rounded-lg text-[10px] font-mono transition-colors cursor-pointer ${activeTab === "logs" ? "bg-neutral-950 text-white" : "bg-neutral-50 text-neutral-500 hover:bg-neutral-100"}`}
                >
                  SYSTEM LOGS
                </button>
              </div>
            </div>

            <div className="my-6 flex-grow flex items-center justify-center min-h-[220px] bg-neutral-50/20 border border-neutral-100 rounded-xl relative overflow-hidden">
              <AnimatePresence mode="wait">
                {activeTab === "cluster" ? (
                  <motion.div 
                    key="cluster"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center p-6"
                  >
                    {/* Pulsing grid graphic */}
                    <div className="relative w-28 h-28 flex items-center justify-center">
                      <div className="absolute inset-0 border border-indigo-500/20 rounded-full animate-ping" style={{ animationDuration: "3s" }} />
                      <div className="absolute w-20 h-20 border border-indigo-500/40 rounded-full animate-ping" style={{ animationDuration: "2s" }} />
                      <div className="w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/60 flex items-center justify-center">
                        <Network className="w-5 h-5 text-indigo-600" />
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-neutral-400 mt-4 uppercase tracking-widest">Dynamic Nodes Map Sync</span>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="logs"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full p-4 flex flex-col justify-start gap-3 text-left overflow-y-scroll"
                  >
                    {logs.map((log, idx) => (
                      <div key={idx} className="font-mono text-[10px] leading-relaxed flex items-start gap-4">
                        <span className="text-neutral-400">{log.time}</span>
                        <span className={`font-bold ${log.level === "WARN" ? "text-amber-500" : "text-indigo-500"}`}>{log.level}</span>
                        <span className="text-neutral-600 font-light">{log.msg}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <p className="font-sans text-[12px] text-neutral-400 font-light">
              Aggregated nodes monitoring dashboard. Use the sync button to clear buffers and trigger counter morphs.
            </p>
          </div>

          {/* Secondary Stats Center */}
          <div className="bg-white border border-neutral-200/50 rounded-2xl p-6 shadow-2xs flex flex-col justify-between min-h-[350px]">
            <div className="flex flex-col gap-1 border-b border-neutral-100 pb-3">
              <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400">Node weight distribution</span>
              <h3 className="font-sans font-medium text-[15px] text-neutral-950">Active Threads Weight</h3>
            </div>

            {/* Stack bar graph */}
            <div className="flex flex-col gap-4 my-6">
              {[
                { name: "Task Allocator", weight: 78, color: "bg-neutral-900" },
                { name: "Mesh Generator", weight: 44, color: "bg-neutral-500" },
                { name: "SVG Goo Matrix", weight: 92, color: "bg-indigo-500" },
                { name: "Canvas Rendering", weight: 65, color: "bg-neutral-300" },
              ].map((item) => (
                <div key={item.name} className="flex flex-col gap-1">
                  <div className="flex justify-between font-mono text-[10px] text-neutral-500">
                    <span>{item.name}</span>
                    <span>{item.weight}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full ${item.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${item.weight}%` }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <Link 
              href="/lab" 
              className="py-3 w-full bg-neutral-950 hover:bg-neutral-900 text-white rounded-xl text-[12px] font-mono text-center block transition-colors shadow-2xs"
            >
              Exit Console
            </Link>
          </div>

        </div>

      </main>
    </div>
  );
}
