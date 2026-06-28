"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCookieConsent } from "@/context/CookieConsentContext";

export default function CookieBanner() {
  const { consentState, acceptAll, declineAll } = useCookieConsent();
  const pathname = usePathname() || "";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isCue = pathname.startsWith("/cue") || pathname.includes("cue.optimaai.eu");

  return (
    <AnimatePresence>
      {consentState === "pending" && (
        <motion.div
          initial={{ y: 32, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 32, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={`fixed bottom-0 left-0 right-0 z-[9999] ${
            isCue 
              ? "bg-[#050505] border-t border-white/10 shadow-[0_-20px_40px_rgba(0,0,0,0.8)]" 
              : "bg-white border-t border-border shadow-2xl"
          }`}
        >
          {isCue ? (
            <div className="max-w-[1200px] mx-auto px-6 py-6 md:px-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-12">
              <div className="flex flex-col">
                <span className="font-[family-name:var(--font-geist)] font-black text-[20px] text-white uppercase tracking-tighter mb-2">
                  COOKIES.
                </span>
                <p className="font-[family-name:var(--font-geist-mono)] text-[12px] text-white/50 leading-relaxed max-w-xl mb-3">
                  We use cookies to operate the site. We only activate analytics if you consent. No marketing trackers.
                </p>
                <Link
                  href="/adatvedelem"
                  className="font-[family-name:var(--font-geist-mono)] text-[10px] text-white/40 hover:text-white uppercase tracking-widest transition-colors"
                >
                  Privacy Policy →
                </Link>
              </div>
              <div className="flex gap-4 w-full md:w-auto flex-shrink-0">
                <button
                  onClick={declineAll}
                  className="flex-1 md:flex-none border border-white/20 text-white hover:bg-white/5 font-[family-name:var(--font-geist)] font-bold text-[12px] uppercase tracking-widest px-6 py-3 rounded-full transition-all duration-300"
                >
                  Essential
                </button>
                <button
                  onClick={acceptAll}
                  className="flex-1 md:flex-none bg-white text-black hover:scale-105 font-[family-name:var(--font-geist)] font-bold text-[12px] uppercase tracking-widest px-6 py-3 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300"
                >
                  Accept
                </button>
              </div>
            </div>
          ) : (
            <div className="max-w-[1200px] mx-auto px-6 py-6 md:px-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-12">
            {/* Left side - text block */}
            <div className="flex flex-col">
              <span className="text-[18px] font-bold text-foreground mb-2">
                Sütiket használunk.
              </span>
              <p className="text-[13px] text-muted-foreground leading-[1.7] mb-3">
                Az oldal működéséhez szükséges sütiket mindig használjuk. Statisztikai célú sütiket (Google Analytics) csak beleegyezésed esetén aktiválunk — ezek segítenek megérteni, hogyan használják az oldalt a látogatók.
              </p>
              <Link
                href="/adatvedelem"
                className="font-mono text-[11px] text-blue-600 hover:underline underline-offset-4 w-fit"
              >
                Adatkezelési tájékoztató →
              </Link>
            </div>

            {/* Right side - buttons */}
            <div className="flex gap-3 w-full md:w-auto flex-shrink-0">
              <button
                onClick={declineAll}
                className="flex-1 md:flex-none bg-transparent border border-border text-muted-foreground text-[13px] font-normal px-6 py-[10px] rounded-md hover:bg-muted hover:text-foreground transition-all duration-200"
              >
                Csak szükséges
              </button>
              <button
                onClick={acceptAll}
                className="flex-1 md:flex-none bg-blue-600 text-white text-[13px] font-medium px-6 py-[10px] rounded-md hover:bg-blue-700 shadow-sm transition-all duration-200"
              >
                Elfogadom
              </button>
            </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
