"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useLabPerformance } from "@/context/LabPerformanceContext";

interface ScrollTextRevealProps {
  text: string;
  className?: string;
}

interface WordRevealProps {
  word: string;
  index: number;
  totalWords: number;
  progress: MotionValue<number>;
}

function Word({ word, index, totalWords, progress }: WordRevealProps) {
  // Staggered trigger windows for each word along the scroll progress line
  const start = index / totalWords;
  const end = (index + 1) / totalWords;
  
  // Fade from highly translucent to solid text
  const opacity = useTransform(progress, [start, end], [0.07, 1]);
  // Subtle lift up from the bottom
  const y = useTransform(progress, [start, end], [8, 0]);

  return (
    <span className="mr-[0.22em] inline-block relative">
      <motion.span 
        style={{ opacity, y }} 
        className="inline-block text-neutral-100 font-sans"
      >
        {word}
      </motion.span>
    </span>
  );
}

export default function ScrollTextReveal({ text, className = "" }: ScrollTextRevealProps) {
  const containerRef = useRef<HTMLParagraphElement | null>(null);
  const { reduceMotion } = useLabPerformance();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Trigger when top of container enters 85% of screen height
    // End when bottom of container passes 40% of screen height
    offset: ["start 85%", "end 40%"]
  });

  const words = text.split(" ");

  if (reduceMotion) {
    return (
      <p className={`text-neutral-100 ${className}`}>
        {text}
      </p>
    );
  }

  return (
    <p 
      ref={containerRef} 
      className={`flex flex-wrap relative leading-relaxed tracking-tight ${className}`}
    >
      {words.map((word, i) => (
        <Word
          key={i}
          word={word}
          index={i}
          totalWords={words.length}
          progress={scrollYProgress}
        />
      ))}
    </p>
  );
}
