"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  range?: number;
  strength?: number;
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  range = 80,
  strength = 0.35
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  
  // Create motion values for coordinate translation
  const xVal = useMotionValue(0);
  const yVal = useMotionValue(0);

  // Apply spring physics configurations for Apple-level elastic snap back
  const springConfig = { stiffness: 150, damping: 15, mass: 0.8 };
  const x = useSpring(xVal, springConfig);
  const y = useSpring(yVal, springConfig);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Distance vector from element center to mouse cursor
      const dx = clientX - centerX;
      const dy = clientY - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < range) {
        setIsHovered(true);
        // Pull position towards mouse coordinates scaling with distance
        xVal.set(dx * strength);
        yVal.set(dy * strength);
      } else {
        setIsHovered(false);
        // Reset coordinate values (spring pulls back to zero)
        xVal.set(0);
        yVal.set(0);
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      xVal.set(0);
      yVal.set(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [range, strength, xVal, yVal]);

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className="inline-block relative z-10"
    >
      <motion.button
        onClick={onClick}
        whileTap={{ scale: 0.96 }}
        className={`relative overflow-hidden cursor-pointer select-none transition-all duration-300 ${className}`}
      >
        {/* Subtle background glow when cursor snaps button */}
        <span 
          className="absolute inset-0 bg-radial from-cyan-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 rounded-full"
          style={{ opacity: isHovered ? 1.0 : 0 }}
        />
        <span className="relative z-10">{children}</span>
      </motion.button>
    </motion.div>
  );
}
