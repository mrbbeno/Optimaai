"use client";

import React from "react";

export default function MetallicMarquee() {
  const logos = [
    // Coca-Cola (Stylized representation)
    {
      name: "Coca-Cola",
      path: (
        <svg className="h-10 w-24 fill-current" viewBox="0 0 100 35" xmlns="http://www.w3.org/2000/svg">
          <text x="50%" y="65%" textAnchor="middle" fontFamily="'Brush Script MT', cursive, sans-serif" fontSize="26" fontWeight="bold" fontStyle="italic">CocaCola</text>
        </svg>
      )
    },
    // Red Bull
    {
      name: "Red Bull",
      path: (
        <svg className="h-9 w-24 fill-current" viewBox="0 0 100 30" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="15" r="9" />
          <path d="M 28 15 L 43 19 L 43 11 Z" />
          <path d="M 72 15 L 57 19 L 57 11 Z" />
          <text x="50%" y="28%" textAnchor="middle" fontFamily="sans-serif" fontSize="6" fontWeight="900" letterSpacing="1.5">RED BULL</text>
        </svg>
      )
    },
    // Heineken
    {
      name: "Heineken",
      path: (
        <svg className="h-8 w-24 fill-current" viewBox="0 0 100 25" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4 L16 16 L6 9 L18 9 L8 16 Z" fill="#FF0000" />
          <text x="58" y="18" fontFamily="sans-serif" fontSize="17" fontWeight="bold" letterSpacing="0.5">Heineken</text>
        </svg>
      )
    },
    // Samsung
    {
      name: "Samsung",
      path: (
        <svg className="h-6 w-28 fill-current" viewBox="0 0 120 20" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="60" cy="10" rx="58" ry="10" fill="none" stroke="currentColor" strokeWidth="1" />
          <text x="50%" y="70%" textAnchor="middle" fontFamily="sans-serif" fontSize="10" fontWeight="900" letterSpacing="1">SAMSUNG</text>
        </svg>
      )
    },
    // Levi's
    {
      name: "Levi's",
      path: (
        <svg className="h-9 w-20 fill-current" viewBox="0 0 80 30" xmlns="http://www.w3.org/2000/svg">
          <path d="M 5 2 L 75 2 L 75 22 Q 60 22 55 26 Q 50 22 5 22 Z" />
          <text x="50%" y="60%" textAnchor="middle" fill="#000" fontFamily="sans-serif" fontSize="11" fontWeight="900">LEVI'S</text>
        </svg>
      )
    },
    // JBL
    {
      name: "JBL",
      path: (
        <svg className="h-8 w-16 fill-current" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
          <text x="18" y="24" fontFamily="sans-serif" fontSize="22" fontWeight="900" letterSpacing="-1">JBL</text>
          <polygon points="35,6 48,15 35,24" />
        </svg>
      )
    },
    // Absolut
    {
      name: "Absolut",
      path: (
        <svg className="h-6 w-24 fill-current" viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg">
          <text x="50%" y="75%" textAnchor="middle" fontFamily="'Times New Roman', serif" fontSize="13" fontWeight="900" letterSpacing="2">ABSOLUT.</text>
        </svg>
      )
    }
  ];

  // Double list to allow infinite marquee scroll loop
  const marqueeItems = [...logos, ...logos, ...logos];

  return (
    <div className="w-full relative overflow-hidden py-8 border-y border-white/[0.04] bg-[#0B0B10]/20 backdrop-blur-xs select-none">
      
      {/* Dynamic light sweep gradient overlay */}
      <svg className="absolute w-0 h-0">
        <defs>
          <linearGradient id="chrome-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="20%" stopColor="#7a7a7a" />
            <stop offset="40%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#555555" />
            <stop offset="80%" stopColor="#dcdcdc" />
            <stop offset="100%" stopColor="#3a3a3a" />
          </linearGradient>
          
          <filter id="metallic-bevel">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" result="blur" />
            <feSpecularLighting in="blur" specularExponent="30" specularConstant="1.2" lightingColor="#ffffff" result="spec">
              <feDistantLight azimuth="225" elevation="60" />
            </feSpecularLighting>
            <feComposite in="spec" in2="SourceGraphic" operator="in" result="specOut" />
            <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k2="1" k3="0.8" result="lit" />
          </filter>
        </defs>
      </svg>

      {/* Slide track */}
      <div 
        className="flex gap-20 w-max items-center animate-marquee"
        style={{
          animation: "marquee 22s linear infinite"
        }}
      >
        {marqueeItems.map((logo, idx) => (
          <div
            key={idx}
            className="text-neutral-400 flex items-center justify-center relative group"
            style={{
              filter: "url(#metallic-bevel)",
              color: "url(#chrome-grad)"
            }}
          >
            {/* Logo path SVG */}
            {logo.path}

            {/* Light shine sweep effect */}
            <div 
              className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-out"
              style={{ mixBlendMode: "overlay" }}
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
      `}</style>
    </div>
  );
}
