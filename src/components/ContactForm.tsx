"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const projectTypes = [
  "Web Development",
  "AI Automation",
  "Real Estate System",
];

export default function ContactForm() {
  const [projectType, setProjectType] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <form className="space-y-10">
      <div className="grid grid-cols-1 gap-10">
        <div className="space-y-3">
          <label htmlFor="name" className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground/80">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="John Doe"
            className="w-full bg-transparent border-b border-border/60 py-2 focus:border-accent focus:outline-none transition-all text-lg font-medium placeholder:text-muted-foreground/30"
          />
        </div>

        <div className="space-y-3">
          <label htmlFor="email" className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground/80">
            Business Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="john@example.com"
            className="w-full bg-transparent border-b border-border/60 py-2 focus:border-accent focus:outline-none transition-all text-lg font-medium placeholder:text-muted-foreground/30"
          />
        </div>

        <div className="space-y-3 relative">
          <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground/80">
            System Type
          </label>
          <div 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full border-b border-border/60 py-2 flex items-center justify-between cursor-pointer group"
          >
            <span className={cn("text-lg font-medium", !projectType && "text-muted-foreground/30")}>
              {projectType || "Select a project type"}
            </span>
            <ChevronDown className={cn("transition-transform duration-300 opacity-40", isDropdownOpen && "rotate-180 opacity-100")} size={18} />
          </div>
          
          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-4 bg-background border border-border rounded-2xl shadow-2xl z-20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
              {projectTypes.map((type) => (
                <div
                  key={type}
                  onClick={() => {
                    setProjectType(type);
                    setIsDropdownOpen(false);
                  }}
                  className="px-6 py-4 hover:bg-muted cursor-pointer transition-colors text-sm font-bold tracking-tight"
                >
                  {type}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-3">
          <label htmlFor="message" className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground/80">
            Project Vision
          </label>
          <textarea
            id="message"
            rows={4}
            placeholder="What system are we building?"
            className="w-full bg-transparent border-b border-border/60 py-2 focus:border-accent focus:outline-none transition-all text-lg font-medium resize-none placeholder:text-muted-foreground/30"
          />
        </div>
      </div>

      <button
        type="submit"
        className="group relative w-full md:w-auto inline-flex items-center justify-center px-12 py-5 font-bold text-background bg-foreground rounded-full overflow-hidden transition-all hover:scale-[1.02] active:scale-95 elevation-1"
      >
        <span className="relative z-10 text-[15px]">Let's build your system</span>
        <div className="absolute inset-0 bg-accent transform translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
      </button>
    </form>
  );
}
