"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Kapcsolat", href: "/kapcsolat" },
  { name: "Optima Lab", href: "https://lab.optimaai.eu" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-3rem)] md:w-auto">
      <nav
        className={cn(
          "flex flex-col md:flex-row md:items-center bg-white/70 backdrop-blur-md border border-black/5 px-6 py-3 shadow-sm transition-all duration-300 ease-in-out overflow-hidden rounded-3xl md:rounded-full",
          menuOpen ? "max-h-[400px] rounded-3xl" : "max-h-[48px]"
        )}
      >
        <div className="flex items-center justify-between w-full md:w-auto h-[24px]">
          <Link
            href="/"
            className="font-mono text-[13px] font-medium tracking-[0.2em] text-[#1D1D1F]"
            onClick={() => setMenuOpen(false)}
          >
            OPTIMA<span className="text-[#9CA3AF]">AI</span>
          </Link>
          <button
            className="md:hidden text-neutral-600 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12v0M4 6v0M4 18v0M8 12h12M8 6h12M8 18h12" />
              </svg>
            )}
          </button>
        </div>

        <div
          className={cn(
            "flex-col md:flex-row md:items-center gap-4 md:gap-6 mt-6 md:mt-0 md:ml-8 w-full md:w-auto",
            menuOpen ? "flex" : "hidden md:flex"
          )}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-inter text-[13px] text-neutral-500 hover:text-neutral-950 transition-colors font-light text-center md:text-left"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-px w-full md:h-4 md:w-px bg-black/10"></div>
          <a
            href="https://cue.optimaai.eu"
            target="_blank"
            rel="noopener noreferrer"
            className="font-inter text-[12px] py-1.5 px-4 bg-neutral-100 hover:bg-neutral-200 rounded-full text-neutral-600 transition-colors font-medium flex items-center justify-center gap-1.5 w-full md:w-auto"
            onClick={() => setMenuOpen(false)}
          >
            CUE
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>
      </nav>
    </div>
  );
}
