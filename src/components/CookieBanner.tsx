"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCookieConsent } from "@/context/CookieConsentContext";

export default function CookieBanner() {
  const { consentState, acceptAll, declineAll } = useCookieConsent();

  return (
    <AnimatePresence>
      {consentState === "pending" && (
        <motion.div
          initial={{ y: 32, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 32, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[9999] bg-surface-raised border-t border-border"
        >
          <div className="max-w-[1200px] mx-auto px-6 py-6 md:px-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-12">
            {/* Left side - text block */}
            <div className="flex flex-col">
              <span className="font-syne text-[18px] font-bold text-primary mb-2">
                Sütiket használunk.
              </span>
              <p className="font-ui text-[13px] font-light text-secondary leading-[1.7] mb-3">
                Az oldal működéséhez szükséges sütiket mindig használjuk. Statisztikai célú sütiket (Google Analytics) csak beleegyezésed esetén aktiválunk — ezek segítenek megérteni, hogyan használják az oldalt a látogatók.
              </p>
              <Link
                href="/adatvedelem"
                className="font-mono text-[11px] text-accent hover:underline underline-offset-4 w-fit"
              >
                Adatkezelési tájékoztató →
              </Link>
            </div>

            {/* Right side - buttons */}
            <div className="flex gap-3 w-full md:w-auto flex-shrink-0">
              <button
                onClick={declineAll}
                className="flex-1 md:flex-none bg-transparent border border-border text-secondary font-ui text-[13px] font-normal px-6 py-[10px] rounded-[4px] hover:border-muted hover:text-primary transition-all duration-200"
              >
                Csak szükséges
              </button>
              <button
                onClick={acceptAll}
                className="flex-1 md:flex-none bg-accent text-[#080809] font-ui text-[13px] font-medium px-6 py-[10px] rounded-[4px] hover:brightness-110 transition-all duration-200"
              >
                Elfogadom
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
