"use client";

import { useState } from "react";
import { ExternalLink, Menu, X } from "lucide-react";

export function LabNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-3rem)] md:w-auto">
      <nav 
        className={`flex flex-col md:flex-row md:items-center bg-white/70 backdrop-blur-md border border-neutral-200/50 px-6 py-3 shadow-sm transition-all duration-300 ease-in-out overflow-hidden
          ${isOpen ? 'max-h-[300px] rounded-[24px]' : 'max-h-[48px] rounded-full'}
        `}
      >
        <div className="flex items-center justify-between w-full md:w-auto h-[24px]">
          {/* Brand */}
          <a href="#" className="font-mono text-[13px] font-medium tracking-[0.2em] text-[#1D1D1F]" onClick={() => setIsOpen(false)}>
            OPTIMA<span className="text-[#9CA3AF]">LAB</span>
          </a>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-neutral-600 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Links */}
        <div 
          className={`flex-col md:flex-row md:items-center gap-4 md:gap-6 mt-6 md:mt-0 md:ml-8 w-full md:w-auto
            ${isOpen ? 'flex' : 'hidden md:flex'}
          `}
        >
          <a href="#featured" onClick={() => setIsOpen(false)} className="font-sans text-[13px] text-neutral-500 hover:text-neutral-950 transition-colors font-light text-center md:text-left">Featured</a>
          <a href="#clients" onClick={() => setIsOpen(false)} className="font-sans text-[13px] text-neutral-500 hover:text-neutral-950 transition-colors font-light text-center md:text-left">Clients</a>
          <a href="#tools" onClick={() => setIsOpen(false)} className="font-sans text-[13px] text-neutral-500 hover:text-neutral-950 transition-colors font-light text-center md:text-left">Tools</a>
          <a href="#experiments" onClick={() => setIsOpen(false)} className="font-sans text-[13px] text-neutral-500 hover:text-neutral-950 transition-colors font-light text-center md:text-left">R&D</a>
          <a href="#research" onClick={() => setIsOpen(false)} className="font-sans text-[13px] text-neutral-500 hover:text-neutral-950 transition-colors font-light text-center md:text-left">Research</a>
          
          <div className="h-px w-full md:h-4 md:w-px bg-neutral-200" />
          
          <a href="https://optimaai.eu" className="font-sans text-[12px] py-1.5 px-4 bg-neutral-100 hover:bg-neutral-200 rounded-full text-neutral-600 transition-colors font-mono flex items-center justify-center gap-1.5 w-full md:w-auto">
            Agency Site <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </nav>
    </div>
  );
}
