"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useLabPerformance } from "@/context/LabPerformanceContext";

interface ScrollRevealTextProps {
  text: string;
  className?: string;
}

interface WordRevealProps {
  word: string;
  index: number;
  totalWords: number;
  progress: MotionValue<number>;
}

function WordReveal({ word, index, totalWords, progress }: WordRevealProps) {
  const start = index / totalWords;
  const end = (index + 1) / totalWords;
  const opacity = useTransform(progress, [start, end], [0.12, 1]);

  return (
    <span className="mr-[0.25em] inline-block">
      <motion.span style={{ opacity }} className="inline-block">
        {word}
      </motion.span>
    </span>
  );
}

export default function ScrollRevealText({ text, className = "" }: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLParagraphElement | null>(null);
  const { reduceMotion } = useLabPerformance();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 45%"],
  });

  const words = text.split(" ");

  if (reduceMotion) {
    return (
      <p className={className}>
        {text}
      </p>
    );
  }

  return (
    <p ref={containerRef} className={`${className} flex flex-wrap relative`}>
      {words.map((word, i) => (
        <WordReveal
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
