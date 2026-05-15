"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Szolgáltatások", href: "/szolgaltatasok" },
  { name: "Munkáink", href: "/munkak" },
  { name: "Folyamat", href: "/folyamat" },
  { name: "Kapcsolat", href: "/kapcsolat" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ESC billentyűre bezár
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  // Scroll lock amíg nyitva van
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[1000] h-16 w-full transition-all duration-300 px-6 md:px-[64px]",
        isScrolled && !menuOpen
          ? "bg-[#080809ec] backdrop-blur-[20px] saturate-[180%] border-b border-border" 
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between">
        {/* Left: Brand */}
        <Link 
          href="/" 
          className="font-mono text-[13px] font-medium tracking-[0.2em] text-white"
          onClick={() => setMenuOpen(false)}
        >
          OPTIMAAI
        </Link>

        {/* Center: Desktop Navigation */}
        <div className="hidden items-center md:flex">
          {navLinks.map((link, idx) => (
            <div key={link.name} className="flex items-center">
              <Link
                href={link.href}
                className="font-ui text-[13px] text-secondary transition-colors duration-150 hover:text-primary"
              >
                {link.name}
              </Link>
              {idx < navLinks.length - 1 && (
                <span className="mx-4 text-tertiary text-[13px]">·</span>
              )}
            </div>
          ))}
        </div>

        {/* Right: CTA */}
        <div className="flex items-center gap-6">
          <Link href="/kapcsolat" className="border border-accent text-accent font-ui text-[13px] font-[400] px-5 py-2 rounded-[4px] hidden md:flex items-center gap-2 hover:bg-accent hover:text-bg transition-all">
            Írj nekünk →
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="text-white md:hidden relative z-[1002] p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[999] flex flex-col bg-[#080809f7]"
            onClick={() => setMenuOpen(false)}
          >
            <div 
              className="flex flex-col items-center justify-center h-full px-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col w-full max-w-[400px]">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="font-display text-[36px] text-primary py-5 border-b border-border text-center"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href="/kapcsolat"
                  className="mt-12 text-accent border border-accent rounded-[4px] py-4 font-ui text-[15px] font-[400] text-center uppercase tracking-widest hover:bg-accent hover:text-bg transition-all"
                  onClick={() => setMenuOpen(false)}
                >
                  Írj nekünk →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
