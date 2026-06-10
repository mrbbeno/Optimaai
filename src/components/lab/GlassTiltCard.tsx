"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useLabPerformance } from "@/context/LabPerformanceContext";

interface GlassTiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxRotation?: number;
}

export default function GlassTiltCard({
  children,
  className = "",
  maxRotation = 12,
}: GlassTiltCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const { reduceMotion } = useLabPerformance();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Map mouse positions to 3D rotation angles
  const rotateX = useTransform(springY, [-0.5, 0.5], [maxRotation, -maxRotation]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-maxRotation, maxRotation]);

  // Glare position styling
  const glareX = useTransform(springX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(springY, [-0.5, 0.5], ["0%", "100%"]);

  const backgroundGlare = useTransform(
    [glareX, glareY],
    ([gx, gy]) =>
      `radial-gradient(circle 220px at ${gx} ${gy}, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 100%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || reduceMotion) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Relative cursor coordinates inside the card
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    // Normalized coordinates (-0.5 to 0.5)
    const normalizedX = (px / width) - 0.5;
    const normalizedY = (py / height) - 0.5;

    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-[1000px] w-full"
    >
      <motion.div
        style={{
          rotateX: reduceMotion ? 0 : rotateX,
          rotateY: reduceMotion ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`relative w-full rounded-2xl border border-white/40 bg-white/70 backdrop-blur-md shadow-sm transition-shadow duration-300 hover:shadow-md overflow-hidden ${className}`}
      >
        {/* Glossy Glare Reflection Layer */}
        {!reduceMotion && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-20 mix-blend-overlay opacity-0 hover:opacity-100 transition-opacity duration-300"
            style={{
              background: backgroundGlare,
            }}
          />
        )}
        
        {/* Child elements rendered in 3D container */}
        <div style={{ transform: "translateZ(20px)" }} className="relative z-10 w-full h-full">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
