"use client";

import React from "react";

const row1Logos = [
  { slug: "nextdotjs", title: "Next.js" },
  { slug: "vercel", title: "Vercel" },
  { slug: "react", title: "React" },
  { slug: "tailwindcss", title: "Tailwind CSS" },
  { slug: "supabase", title: "Supabase" },
  { slug: "postgresql", title: "PostgreSQL" },
  { slug: "typescript", title: "TypeScript" },
  { slug: "prisma", title: "Prisma" },
  { slug: "docker", title: "Docker" },
];

const row2Logos = [
  { slug: "openai", title: "ChatGPT", customUrl: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" },
  { slug: "anthropic", title: "Anthropic" },
  { slug: "n8n", title: "n8n" },
  { slug: "make", title: "Make" },
  { slug: "hubspot", title: "HubSpot" },
  { slug: "stripe", title: "Stripe" },
  { slug: "paypal", title: "PayPal" },
  { slug: "googlecalendar", title: "Google Calendar" },
  { slug: "whatsapp", title: "WhatsApp" },
  { slug: "resend", title: "Resend" },
];

export default function TechCarousel() {
  return (
    <section className="py-16 bg-muted/10 overflow-hidden border-t border-border/40">
      <div className="flex flex-col gap-12 relative max-w-[100vw]">
        {/* Left/Right fading edges */}
        <div className="absolute top-0 bottom-0 left-0 w-32 md:w-64 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-32 md:w-64 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

        {/* Row 1: Left moving */}
        <div className="flex w-max animate-scroll-left hover:[animation-play-state:paused]">
          <div className="flex gap-16 md:gap-32 pr-16 md:pr-32 items-center">
            {[...row1Logos, ...row1Logos].map((logo, idx) => (
              <img 
                key={`row1-${idx}`}
                src={`https://cdn.simpleicons.org/${logo.slug}`} 
                alt={logo.title} 
                title={logo.title}
                className="w-10 h-10 md:w-12 md:h-12 object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer"
              />
            ))}
          </div>
        </div>

        {/* Row 2: Right moving */}
        <div className="flex w-max animate-scroll-right hover:[animation-play-state:paused]">
          <div className="flex gap-16 md:gap-32 pr-16 md:pr-32 items-center">
            {[...row2Logos, ...row2Logos].map((logo, idx) => (
              <img 
                key={`row2-${idx}`}
                src={logo.customUrl || `https://cdn.simpleicons.org/${logo.slug}`} 
                alt={logo.title} 
                title={logo.title}
                className="w-10 h-10 md:w-12 md:h-12 object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer"
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
