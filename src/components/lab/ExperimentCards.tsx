"use client";

import React, { useState, useRef, useEffect, forwardRef } from "react";
import { motion } from "framer-motion";
import { useLabPerformance } from "@/context/LabPerformanceContext";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "./AnimatedBeam";
import { AnimatedList } from "./AnimatedList";
import { AnimatedThemeToggler } from "./AnimatedThemeToggler";
import TextPressure from "./TextPressure";
import GlassTiltCard from "./GlassTiltCard";

// 1. MUSIC VISUALIZER
function MusicVisualizerDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const bars = Array.from({ length: 24 });
  const { reduceMotion } = useLabPerformance();

  return (
    <div 
      className="absolute inset-0 w-full h-full flex items-end justify-center gap-[4px] p-6 pb-28 cursor-pointer overflow-hidden"
      onClick={() => setIsPlaying(!isPlaying)}
      style={{
        maskImage: "linear-gradient(to top, transparent 15%, black 75%)",
        WebkitMaskImage: "linear-gradient(to top, transparent 15%, black 75%)"
      }}
    >
      <div className="absolute inset-0 bg-linear-to-b from-transparent to-neutral-50/10 pointer-events-none" />
      {bars.map((_, i) => {
        const duration = 0.5 + ((i * 77) % 80) * 0.01;
        return (
          <motion.div
            key={i}
            className="w-full max-w-[8px] rounded-full bg-neutral-900/50 dark:bg-neutral-100/50"
            initial={{ height: 8 }}
            animate={
              isPlaying && !reduceMotion
                ? { height: [8, 110, 16, 80, 8] }
                : { height: 8 }
            }
            transition={{
              duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.03,
            }}
          />
        );
      })}
      
      <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/80 dark:bg-neutral-900/80 px-2.5 py-1 rounded-full border border-neutral-200/50 shadow-xs backdrop-blur-xs z-10">
        <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-500">
          {isPlaying ? "Active" : "Click to Play"}
        </span>
        <div className={`w-[6px] h-[6px] rounded-full ${isPlaying ? "bg-emerald-500 animate-pulse" : "bg-neutral-300"}`} />
      </div>
    </div>
  );
}

// 2. LIQUID BUTTONS
function LiquidButtonsDemo() {
  const [isHovered, setIsHovered] = useState(false);
  const { reduceMotion } = useLabPerformance();

  return (
    <div 
      className="absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        maskImage: "linear-gradient(to top, transparent 15%, black 70%)",
        WebkitMaskImage: "linear-gradient(to top, transparent 15%, black 70%)"
      }}
    >
      {/* SVG Goo Filter */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="goo-filter-bento">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix 
              in="blur" 
              mode="matrix" 
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9" 
              result="goo" 
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div 
        className="flex items-center justify-center relative w-full h-full pb-16"
        style={{ filter: reduceMotion ? "none" : "url(#goo-filter-bento)" }}
      >
        <motion.div 
          className="w-14 h-14 rounded-full bg-neutral-900/70 dark:bg-neutral-100/70 absolute"
          animate={isHovered && !reduceMotion ? { x: -26, scale: 1.08 } : { x: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 180, damping: 15 }}
        />
        <motion.div 
          className="w-12 h-12 rounded-full bg-neutral-950/80 dark:bg-white/80 absolute"
          animate={isHovered && !reduceMotion ? { x: 26, scale: 0.92 } : { x: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 180, damping: 15 }}
        />
        {/* Glow center */}
        <div className="w-5 h-5 rounded-full bg-white/20 dark:bg-black/20 z-10 pointer-events-none animate-pulse" />
      </div>
    </div>
  );
}

// 3. ANIMATED LIST (NOTIFICATION FEED)
interface NotificationItem {
  name: string;
  description: string;
  time: string;
  icon: string;
  color: string;
}

const notifications: NotificationItem[] = [
  {
    name: "Payment received",
    description: "OPTIMA Client",
    time: "15m ago",
    icon: "💸",
    color: "#00C9A7",
  },
  {
    name: "User signed up",
    description: "Lab Dashboard",
    time: "10m ago",
    icon: "👤",
    color: "#FFB800",
  },
  {
    name: "New message",
    description: "Support Agent",
    time: "5m ago",
    icon: "💬",
    color: "#FF3D71",
  },
  {
    name: "System Update",
    description: "Core Engine Sync",
    time: "2m ago",
    icon: "🗞️",
    color: "#1E86FF",
  },
];

const Notification = ({ name, description, icon, color, time }: NotificationItem) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[280px] sm:max-w-[320px] cursor-pointer overflow-hidden rounded-xl p-3.5",
        "transition-all duration-200 ease-in-out hover:scale-[102%]",
        "bg-white/95 dark:bg-neutral-950/90 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        "dark:[border:1px_solid_rgba(255,255,255,.1)] border border-neutral-150"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-9 items-center justify-center rounded-xl shrink-0"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-base">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden text-left">
          <figcaption className="flex flex-row items-center gap-1.5 text-[13px] font-medium text-neutral-900 dark:text-neutral-50">
            <span className="truncate">{name}</span>
            <span className="text-neutral-300 dark:text-neutral-700 font-normal">·</span>
            <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-light shrink-0">{time}</span>
          </figcaption>
          <p className="text-[11px] font-normal text-neutral-500 dark:text-neutral-450 truncate">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

function AnimatedListDemo() {
  return (
    <div 
      className="absolute inset-0 w-full h-full p-4 pt-12 overflow-hidden flex flex-col justify-start"
      style={{
        maskImage: "linear-gradient(to top, transparent 15%, black 65%)",
        WebkitMaskImage: "linear-gradient(to top, transparent 15%, black 65%)"
      }}
    >
      <AnimatedList delay={2200}>
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>
    </div>
  );
}

// 4. ANIMATED BEAM (INTEGRATIONS MAP)
const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-11 items-center justify-center rounded-full border border-neutral-200/50 bg-white dark:bg-neutral-900 dark:border-neutral-800 p-2.5 shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
});
Circle.displayName = "Circle";

const Icons = {
  notion: () => (
    <svg width="18" height="18" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.017 4.313l55.333 -4.087c6.797 -0.583 8.543 -0.19 12.817 2.917l17.663 12.443c2.913 2.14 3.883 2.723 3.883 5.053v68.243c0 4.277 -1.553 6.807 -6.99 7.193L24.467 99.967c-4.08 0.193 -6.023 -0.39 -8.16 -3.113L3.3 79.94c-2.333 -3.113 -3.3 -5.443 -3.3 -8.167V11.113c0 -3.497 1.553 -6.413 6.017 -6.8z" fill="#ffffff" />
      <path d="M61.35 0.227l-55.333 4.087C1.553 4.7 0 7.617 0 11.113v60.66c0 2.723 0.967 5.053 3.3 8.167l13.007 16.913c2.137 2.723 4.08 3.307 8.16 3.113l64.257 -3.89c5.433 -0.387 6.99 -2.917 6.99 -7.193V20.64c0 -2.21 -0.873 -2.847 -3.443 -4.733L74.167 3.143c-4.273 -3.107 -6.02 -3.5 -12.817 -2.917zM25.92 19.523c-5.247 0.353 -6.437 0.433 -9.417 -1.99L8.927 11.507c-0.77 -0.78 -0.383 -1.753 1.557 -1.947l53.193 -3.887c4.467 -0.39 6.793 1.167 8.54 2.527l9.123 6.61c0.39 0.197 1.36 1.36 0.193 1.36l-54.933 3.307 -0.68 0.047zM19.803 88.3V30.367c0 -2.53 0.777 -3.697 3.103 -3.893L86 22.78c2.14 -0.193 3.107 1.167 3.107 3.693v57.547c0 2.53 -0.39 4.67 -3.883 4.863l-60.377 3.5c-3.493 0.193 -5.043 -0.97 -5.043 -4.083zm59.6 -54.827c0.387 1.75 0 3.5 -1.75 3.7l-2.91 0.577v42.773c-2.527 1.36 -4.853 2.137 -6.797 2.137 -3.107 0 -3.883 -0.973 -6.21 -3.887l-19.03 -29.94v28.967l6.02 1.363s0 3.5 -4.857 3.5l-13.39 0.777c-0.39 -0.78 0 -2.723 1.357 -3.11l3.497 -0.97v-38.3L30.48 40.667c-0.39 -1.75 0.58 -4.277 3.3 -4.473l14.367 -0.967 19.8 30.327v-26.83l-5.047 -0.58c-0.39 -2.143 1.163 -3.7 3.103 -3.89l13.4 -0.78z" fill="#000000" fillRule="evenodd" clipRule="evenodd" />
    </svg>
  ),
  openai: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path className="fill-neutral-900 dark:fill-neutral-100" d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
  ),
  googleDrive: () => (
    <svg width="22" height="22" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
      <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da" />
      <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z" fill="#00ac47" />
      <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335" />
      <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d" />
      <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc" />
      <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00" />
    </svg>
  ),
  whatsapp: () => (
    <svg width="22" height="22" viewBox="0 0 175.216 175.552" xmlns="http://www.w3.org/2000/svg">
      <path d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.559 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.524h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.929z" fill="#23b33a" />
      <path d="M68.772 55.603c-1.378-3.061-2.828-3.123-4.137-3.176l-3.524-.043c-1.226 0-3.218.46-4.902 2.3s-6.435 6.287-6.435 15.332 6.588 17.785 7.506 19.013 12.718 20.381 31.405 27.75c15.529 6.124 18.689 4.906 22.061 4.6s10.877-4.447 12.408-8.74 1.532-7.971 1.073-8.74-1.685-1.226-3.525-2.146-10.877-5.367-12.562-5.981-2.91-.919-4.137.921-4.746 5.979-5.819 7.206-2.144 1.381-3.984.462-7.76-2.861-14.784-9.124c-5.465-4.873-9.154-10.891-10.228-12.73s-.114-2.835.808-3.751c.825-.824 1.838-2.147 2.759-3.22s1.224-1.84 1.836-3.065.307-2.301-.153-3.22-4.032-10.011-5.666-13.647" fill="#ffffff" fillRule="evenodd" />
    </svg>
  ),
  googleDocs: () => (
    <svg width="16" height="22" viewBox="0 0 47 65" xmlns="http://www.w3.org/2000/svg">
      <path d="M29.375,0 L4.40625,0 C1.9828125,0 0,1.99431818 0,4.43181818 L0,60.5681818 C0,63.0056818 1.9828125,65 4.40625,65 L42.59375,65 C45.0171875,65 47,63.0056818 47,60.5681818 L47,17.7272727 L29.375,0 Z" fill="#4285F4" />
      <path d="M11.75,47.2727273 L35.25,47.2727273 L35.25,44.3181818 L11.75,44.3181818 L11.75,47.2727273 Z M11.75,53.1818182 L29.375,53.1818182 L29.375,50.2272727 L11.75,50.2272727 L11.75,53.1818182 Z M11.75,32.5 L11.75,35.4545455 L35.25,35.4545455 L35.25,32.5 L11.75,32.5 Z M11.75,41.3636364 L35.25,41.3636364 L35.25,38.4090909 L11.75,38.4090909 L11.75,41.3636364 Z" fill="#F1F1F1" />
      <path d="M2.9375,2.95454545 L2.9375,16.25 C2.9375,18.6985795 4.90929688,20.6818182 7.34375,20.6818182 L20.5625,20.6818182 L2.9375,2.95454545 Z" fill="#A1C2FA" transform="translate(26.437500, -2.954545)" />
    </svg>
  ),
  zapier: () => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 244 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M57.1877 45.2253L57.1534 45.1166L78.809 25.2914V15.7391H44.0663V25.2914H64.8181L64.8524 25.3829L43.4084 45.2253V54.7775H79.1579V45.2253H57.1877Z"
        fill="currentColor"
      />
      <path
        d="M100.487 14.8297C96.4797 14.8297 93.2136 15.434 90.6892 16.6429C88.3376 17.6963 86.3568 19.4321 85.0036 21.6249C83.7091 23.8321 82.8962 26.2883 82.6184 28.832L93.1602 30.3135C93.5415 28.0674 94.3042 26.4754 95.4482 25.5373C96.7486 24.5562 98.3511 24.0605 99.9783 24.136C102.118 24.136 103.67 24.7079 104.634 25.8519C105.59 26.9959 106.076 28.5803 106.076 30.6681V31.7091H95.9401C90.7807 31.7091 87.0742 32.8531 84.8206 35.1411C82.5669 37.429 81.442 40.4492 81.4458 44.2014C81.4458 48.0452 82.5707 50.9052 84.8206 52.7813C87.0704 54.6574 89.8999 55.5897 93.3089 55.5783C97.5379 55.5783 100.791 54.1235 103.067 51.214C104.412 49.426 105.372 47.3793 105.887 45.2024H106.27L107.723 54.7546H117.275V30.5651C117.275 25.5659 115.958 21.6936 113.323 18.948C110.688 16.2024 106.409 14.8297 100.487 14.8297ZM103.828 44.6475C102.312 45.9116 100.327 46.5408 97.8562 46.5408C95.8199 46.5408 94.4052 46.1843 93.6121 45.4712C93.2256 45.1338 92.9182 44.7155 92.7116 44.246C92.505 43.7764 92.4043 43.2671 92.4166 42.7543C92.3941 42.2706 92.4702 41.7874 92.6403 41.3341C92.8104 40.8808 92.071 40.4668 93.4062 40.1174C93.7687 39.7774 94.1964 39.5145 94.6633 39.3444C95.1303 39.1743 95.6269 39.1006 96.1231 39.1278H106.093V39.7856C106.113 40.7154 105.919 41.6374 105.527 42.4804C105.134 43.3234 104.553 44.0649 103.828 44.6475Z"
        fill="currentColor"
      />
      <path
        d="M175.035 15.7391H163.75V54.7833H175.035V15.7391Z"
        fill="currentColor"
      />
      <path
        d="M241.666 15.7391C238.478 15.7391 235.965 16.864 234.127 19.1139C232.808 20.7307 231.805 23.1197 231.119 26.2809H230.787L229.311 15.7391H219.673V54.7775H230.959V34.7578C230.959 32.2335 231.55 30.2982 232.732 28.9521C233.914 27.606 236.095 26.933 239.275 26.933H243.559V15.7391H241.666Z"
        fill="currentColor"
      />
      <path
        d="M208.473 17.0147C205.839 15.4474 202.515 14.6657 198.504 14.6695C192.189 14.6695 187.247 16.4675 183.678 20.0634C180.108 23.6593 178.324 28.6166 178.324 34.9352C178.233 38.7553 179.067 42.5407 180.755 45.9689C182.3 49.0238 184.706 51.5592 187.676 53.2618C190.665 54.9892 194.221 55.8548 198.344 55.8586C201.909 55.8586 204.887 55.3095 207.278 54.2113C209.526 53.225 211.483 51.6791 212.964 49.7211C214.373 47.7991 215.42 45.6359 216.052 43.3377L206.329 40.615C205.919 42.1094 205.131 43.4728 204.041 44.5732C202.942 45.6714 201.102 46.2206 198.521 46.2206C195.451 46.2206 193.163 45.3416 191.657 43.5837C190.564 42.3139 189.878 40.5006 189.575 38.1498H216.201C216.31 37.0515 216.367 36.1306 216.367 35.387V32.9561C216.431 29.6903 215.757 26.4522 214.394 23.4839C213.118 20.7799 211.054 18.5248 208.473 17.0147ZM198.178 23.9758C202.754 23.9758 205.348 26.2275 205.962 30.731H189.775C190.032 29.2284 190.655 27.8121 191.588 26.607C193.072 24.8491 195.268 23.972 198.178 23.9758Z"
        fill="currentColor"
      />
      <path
        d="M169.515 0.00366253C168.666 -0.0252113 167.82 0.116874 167.027 0.421484C166.234 0.726094 165.511 1.187 164.899 1.77682C164.297 2.3723 163.824 3.08658 163.512 3.87431C163.2 4.66204 163.055 5.50601 163.086 6.35275C163.056 7.20497 163.201 8.05433 163.514 8.84781C163.826 9.64129 164.299 10.3619 164.902 10.9646C165.505 11.5673 166.226 12.0392 167.02 12.3509C167.814 12.6626 168.663 12.8074 169.515 12.7762C170.362 12.8082 171.206 12.6635 171.994 12.3514C172.782 12.0392 173.496 11.5664 174.091 10.963C174.682 10.3534 175.142 9.63077 175.446 8.83849C175.75 8.04621 175.89 7.20067 175.859 6.35275C175.898 5.50985 175.761 4.66806 175.456 3.88115C175.151 3.09424 174.686 2.37951 174.09 1.78258C173.493 1.18565 172.782 0.414327C171.992 0.414327 171.15 0 169.515 0.00366253Z"
        fill="currentColor"
      />
      <path
        d="M146.201 14.6695C142.357 14.6695 139.268 15.8764 136.935 18.2902C135.207 20.0786 133.939 22.7479 133.131 26.2981H132.771L131.295 15.7563H121.657V66H132.942V45.3054H133.354C133.698 46.6852 134.181 48.0267 134.795 49.3093C135.75 51.3986 137.316 53.1496 139.286 54.3314C141.328 55.446 143.629 56.0005 145.955 55.9387C150.68 55.9387 154.277 54.0988 156.748 50.419C159.219 46.7392 160.455 41.6046 160.455 35.0153C160.455 28.6509 159.259 23.6689 156.869 20.0691C154.478 16.4694 150.922 14.6695 146.201 14.6695ZM147.345 42.9602C146.029 44.8668 143.97 45.8201 141.167 45.8201C140.012 45.8735 138.86 45.6507 137.808 45.1703C136.755 44.6898 135.832 43.9656 135.116 43.0574C133.655 41.2233 132.927 38.7122 132.931 35.5243V34.7807C132.931 31.5432 133.659 29.0646 135.116 27.3448C136.572 25.625 138.59 24.7747 141.167 24.7937C144.02 24.7937 146.092 25.6994 147.385 27.5107C148.678 29.322 149.324 31.8483 149.324 35.0896C149.332 38.4414 148.676 41.065 147.356 42.9602H147.345Z"
        fill="currentColor"
      />
      <path d="M39.0441 45.2253H0V54.789H39.0441V45.2253Z" fill="#FF4F00" />
    </svg>
  ),
  messenger: () => (
    <svg width="22" height="22" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path fill="#0084FF" d="M24,4C13,4,4,12.3,4,22.6c0,5.9,2.9,11.1,7.4,14.4c0.4,0.3,0.7,0.8,0.7,1.4v4.3c0,0.9,1,1.5,1.7,1l4.8-2.7c0.4-0.2,0.8-0.2,1.3-0.1C21.2,41.1,22.6,41.2,24,41.2c11,0,20-8.3,20-18.6S35,4,24,4z" />
      <path fill="#FFFFFF" d="M12.5,27.2l8.3-13.2c0.8-1.3,2.6-1.6,3.8-0.7l6.2,4.6c0.5,0.4,1.2,0.4,1.7,0l8.3-6.3c0.9-0.7,2.1,0.5,1.4,1.4l-8.3,13.2c-0.8,1.3-2.6,1.6-3.8,0.7l-6.2-4.6c-0.5-0.4-1.2-0.4-1.7,0l-8.3,6.3C13.1,29.3,11.8,28.1,12.5,27.2z" />
    </svg>
  ),
};

function AnimatedBeamDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full flex items-center justify-center p-6 pb-20 overflow-hidden"
      style={{
        maskImage: "linear-gradient(to top, transparent 15%, black 65%)",
        WebkitMaskImage: "linear-gradient(to top, transparent 15%, black 65%)"
      }}
    >
      <div className="flex w-full max-w-sm flex-col items-stretch justify-between gap-6 relative z-10">
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div1Ref}>
            <Icons.googleDrive />
          </Circle>
          <Circle ref={div5Ref}>
            <Icons.googleDocs />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div2Ref}>
            <Icons.notion />
          </Circle>
          <Circle ref={div4Ref} className="size-14 bg-neutral-900 border-neutral-800">
            <Icons.openai />
          </Circle>
          <Circle ref={div6Ref}>
            <Icons.zapier />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div3Ref}>
            <Icons.whatsapp />
          </Circle>
          <Circle ref={div7Ref}>
            <Icons.messenger />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div4Ref}
        curvature={-50}
        endYOffset={-10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div4Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div4Ref}
        curvature={50}
        endYOffset={10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div4Ref}
        curvature={-50}
        endYOffset={-10}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div4Ref}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div7Ref}
        toRef={div4Ref}
        curvature={50}
        endYOffset={10}
        reverse
      />
    </div>
  );
}

// 5. TEXT PRESSURE (VARIABLE TYPOGRAPHY)
function TextPressureDemo() {
  return (
    <div 
      className="absolute inset-0 w-full h-full flex items-center justify-center p-6 pb-20 overflow-hidden text-neutral-900 dark:text-neutral-100"
      style={{
        maskImage: "linear-gradient(to top, transparent 15%, black 65%)",
        WebkitMaskImage: "linear-gradient(to top, transparent 15%, black 65%)"
      }}
    >
      <div className="w-full h-32 flex items-center justify-center relative">
        <TextPressure
          text="Motion"
          flex
          alpha={false}
          stroke={false}
          width
          weight
          italic
          textColor="currentColor"
          strokeColor="#000000"
          minFontSize={48}
        />
      </div>
    </div>
  );
}

// 6. ANIMATED THEME TOGGLER (SWITCH)
function AnimatedThemeTogglerDemo() {
  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center pb-20 overflow-hidden">
      <AnimatedThemeToggler />
    </div>
  );
}

// 7. 3D PRODUCT UI (DRAG/HOVER ROTATOR)
function Product3DRotatorDemo() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [rotation, setRotation] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
  };

  useEffect(() => {
    const handleMouseUp = () => {
      isDragging.current = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - startX.current;
      startX.current = e.clientX;
      setRotation((prev) => (prev + dx * 0.8) % 360);
    };

    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      onMouseDown={handleMouseDown}
      className="absolute inset-0 w-full h-full cursor-ew-resize flex items-center justify-center select-none overflow-hidden"
      style={{
        maskImage: "linear-gradient(to top, transparent 15%, black 65%)",
        WebkitMaskImage: "linear-gradient(to top, transparent 15%, black 65%)"
      }}
    >
      <div 
        className="w-24 h-24 border-2 border-dashed border-neutral-900/25 dark:border-neutral-100/25 rounded-full flex items-center justify-center relative transition-transform duration-75 ease-out pb-12"
        style={{ transform: `rotateY(${rotation}deg) rotateX(35deg)` }}
      >
        <div className="w-12 h-12 border border-neutral-900 bg-white/70 dark:bg-neutral-900 dark:border-neutral-800 dark:bg-neutral-800/80 absolute shadow-md flex items-center justify-center" />
        <div className="absolute text-[11px] font-mono text-neutral-900 dark:text-neutral-200 select-none pb-12">3D</div>
      </div>
      
      <div className="absolute top-4 right-4 pointer-events-none bg-white/80 dark:bg-neutral-900/80 px-2.5 py-1 rounded-full border border-neutral-200/50 shadow-xs backdrop-blur-xs z-10">
        <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-500">
          Drag to Rotate
        </span>
      </div>
    </div>
  );
}

// MAIN EXPORTS GRID
export default function ExperimentCardsGrid() {
  const experiments = [
    { 
      title: "Music Visualizer", 
      desc: "Interactive frequency sound waves reacting to state toggles.", 
      demo: <MusicVisualizerDemo />,
      gridClass: "col-span-1 md:col-span-2 md:row-span-1"
    },
    { 
      title: "Liquid Buttons", 
      desc: "Smooth CSS SVG liquid goo transformations on hover state.", 
      demo: <LiquidButtonsDemo />,
      gridClass: "col-span-1 md:col-span-1 md:row-span-1"
    },
    { 
      title: "Notification Stream", 
      desc: "Dynamic sequencial list animating new actions live.", 
      demo: <AnimatedListDemo />,
      gridClass: "col-span-1 md:col-span-1 md:row-span-2"
    },
    { 
      title: "Integrations Map", 
      desc: "Interactive SVG animated beams mapping connection nodes.", 
      demo: <AnimatedBeamDemo />,
      gridClass: "col-span-1 md:col-span-2 md:row-span-1"
    },
    { 
      title: "Variable Typography", 
      desc: "Dynamic variable font weight and width pressure on cursor hover.", 
      demo: <TextPressureDemo />,
      gridClass: "col-span-1 md:col-span-2 md:row-span-1"
    },
    { 
      title: "Theme Switcher", 
      desc: "Animated rotation micro-interaction spring theme switcher.", 
      demo: <AnimatedThemeTogglerDemo />,
      gridClass: "col-span-1 md:col-span-1 md:row-span-1"
    },
    { 
      title: "3D Product Modeling", 
      desc: "Draggable virtual rotation modeling on pure CSS / canvas.", 
      demo: <Product3DRotatorDemo />,
      gridClass: "col-span-1 md:col-span-2 md:row-span-1"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full auto-rows-[250px] md:auto-rows-[255px]">
      {experiments.map((exp, index) => (
        <motion.div
          key={exp.title}
          className={`${exp.gridClass} h-full`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="h-full">
            <GlassTiltCard maxRotation={5} className="group/card relative w-full h-full min-h-[250px] rounded-2xl border border-neutral-200/50 bg-white/70 backdrop-blur-md shadow-sm transition-all duration-300 hover:shadow-lg hover:border-indigo-500/30 overflow-hidden flex flex-col justify-end">
              <div className="absolute inset-0 w-full h-full z-0 overflow-hidden p-[1px]">
                {exp.demo}
              </div>

              <div className="relative z-10 pointer-events-none mt-auto flex flex-col gap-1 text-left p-6">
                <h3 className="font-sans font-medium text-[16px] text-neutral-950 transition-colors duration-300">
                  {exp.title}
                </h3>
                <p className="font-sans text-[13px] text-neutral-500 leading-relaxed font-light transition-colors duration-300">
                  {exp.desc}
                </p>
              </div>
            </GlassTiltCard>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
