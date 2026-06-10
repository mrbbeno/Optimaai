"use client";

import { useState, useCallback, useRef } from "react";
import { useLabPerformance } from "@/context/LabPerformanceContext";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*()_+-=[]{}|;:,.<>?";

export function useScramble(originalText: string, speed = 30) {
  const [displayText, setDisplayText] = useState(originalText);
  const { reduceMotion } = useLabPerformance();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = useCallback(() => {
    if (reduceMotion) return; // Skip for accessibility / low motion
    if (intervalRef.current) clearInterval(intervalRef.current);

    let iteration = 0;
    const length = originalText.length;

    intervalRef.current = setInterval(() => {
      setDisplayText(() => {
        return originalText
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return originalText[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");
      });

      if (iteration >= length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
      
      iteration += 1 / 3; // Gradually resolve (takes ~3 frames per character)
    }, speed);
  }, [originalText, speed, reduceMotion]);

  const reset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayText(originalText);
  }, [originalText]);

  return { displayText, scramble, reset };
}
