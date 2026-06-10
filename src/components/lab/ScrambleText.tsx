"use client";

import React from "react";
import { useScramble } from "@/lib/lab/core/use-scramble";

interface ScrambleTextProps {
  text: string;
  className?: string;
  speed?: number;
}

export default function ScrambleText({ text, className = "", speed = 30 }: ScrambleTextProps) {
  const { displayText, scramble, reset } = useScramble(text, speed);

  return (
    <span 
      className={`cursor-default inline-block select-none ${className}`} 
      onMouseEnter={scramble}
      onMouseLeave={reset}
    >
      {displayText}
    </span>
  );
}
