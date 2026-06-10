"use client";

import { useRef, useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import { useLabPerformance } from "@/context/LabPerformanceContext";

export function useMagnetic(range = 80, strength = 0.35) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { reduceMotion } = useLabPerformance();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    if (reduceMotion) {
      x.set(0);
      y.set(0);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < range) {
        // pull towards mouse
        x.set(distanceX * strength);
        y.set(distanceY * strength);
      } else {
        // snap back
        x.set(0);
        y.set(0);
      }
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    const element = ref.current;
    element?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      element?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [range, strength, reduceMotion, x, y]);

  return { ref, x: springX, y: springY };
}
